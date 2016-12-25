package zh.plugin.mybatis.util;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.builder.xml.XMLMapperBuilder;
import org.apache.ibatis.executor.ErrorContext;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import zh.framework.util.ExceptionUtil;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

/**
 * @author 陈志杭
 * @date 2016-12-13 16:00
 * @description MyBatis mapper xml 配置文件热加载
 */
@Component
@Slf4j
@Data
public class MyBatisMapperRefresher implements DisposableBean, InitializingBean, ApplicationContextAware {
    /**
     * 扫描周期，单位秒
     */
    @Value("${mybatis.mapperRefresher.periodSeconds:5}")
    private int periodSeconds = 5;
    /**
     * 初始化完成,延迟扫描时间，单位秒
     */
    @Value("${mybatis.mapperRefresher.initialDelaySeconds:5}")
    private int initialDelay = 5;
    /**
     * 是否启用
     */
    @Value("${mybatis.mapperRefresher.enabled:false}")
    private boolean enabled = false;
    private ConfigurableApplicationContext context = null;
    private transient Resource[] basePackage = null;
    private HashMap<String, String> fileMapping = new HashMap<String, String>();
    private Scanner scanner = null;
    private ScheduledExecutorService service = null;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.context = (ConfigurableApplicationContext) applicationContext;

    }

    @Override
    public void afterPropertiesSet() throws Exception {
        if (enabled == false) {
            log.info("MyBatisMapperRefresher is Disabled");
            return;
        }

        try {
            service = Executors.newScheduledThreadPool(1);
            // 获取xml所在包
            SqlSessionFactoryBean config = context.getBean(SqlSessionFactoryBean.class);
            Field field = config.getClass().getDeclaredField("mapperLocations");
            field.setAccessible(true);
            basePackage = (Resource[]) field.get(config);
            // 触发文件监听事件
            scanner = new Scanner();
            scanner.scan();
            service.scheduleAtFixedRate(new Task(), MyBatisMapperRefresher.this.initialDelay, MyBatisMapperRefresher.this.periodSeconds, TimeUnit.SECONDS);

        } catch (Exception e1) {
            log.error("can not starter Mybatis xml refresher,exception:{}", ExceptionUtil.getAsString(e1));
        }

    }

    class Task implements Runnable {
        @Override
        public void run() {
            try {
                if (scanner.isChanged()) {
                    scanner.reloadXML();
                }
            } catch (Exception ex) {
                log.error("MyBatisMapperRefresher,exception:{}", ExceptionUtil.getAsString(ex));
            }
        }
    }

    @SuppressWarnings({"rawtypes"})
    class Scanner {
        private Resource[] mapperXmlFiles;

        public Scanner() {
            mapperXmlFiles = MyBatisMapperRefresher.this.basePackage;
        }

        public void reloadXML() throws Exception {
            SqlSessionFactory factory = context.getBean(SqlSessionFactory.class);
            Configuration configuration = factory.getConfiguration();
            // 移除加载项
            removeConfig(configuration);
            // 重新扫描加载

            Resource[] resources = mapperXmlFiles;
            if (resources != null) {
                for (int i = 0; i < resources.length; i++) {
                    if (resources[i] == null) {
                        continue;
                    }
                    try {
                        XMLMapperBuilder xmlMapperBuilder = new XMLMapperBuilder(resources[i].getInputStream(),
                                configuration, resources[i].toString(), configuration.getSqlFragments());
                        xmlMapperBuilder.parse();
                    } catch (Exception e) {
                        log.error("please fixup to repeat hot swap,failed to parse mapping resource: {},exception:{}", resources[i].getFilename(), ExceptionUtil.getAsString(e));
                        break;
                    } finally {
                        ErrorContext.instance().reset();
                    }
                }
            }
        }


        private void removeConfig(Configuration configuration) throws Exception {
            Class<?> classConfig = configuration.getClass();
            clearMap(classConfig, configuration, "mappedStatements");
            clearMap(classConfig, configuration, "caches");
            clearMap(classConfig, configuration, "resultMaps");
            clearMap(classConfig, configuration, "parameterMaps");
            clearMap(classConfig, configuration, "keyGenerators");
            clearMap(classConfig, configuration, "sqlFragments");
            clearSet(classConfig, configuration, "loadedResources");

        }

        private void clearMap(Class<?> classConfig, Configuration configuration, String fieldName) throws Exception {
            Field field = classConfig.getDeclaredField(fieldName);
            field.setAccessible(true);
            Map mapConfig = (Map) field.get(configuration);
            mapConfig.clear();
        }

        private void clearSet(Class<?> classConfig, Configuration configuration, String fieldName) throws Exception {
            Field field = classConfig.getDeclaredField(fieldName);
            field.setAccessible(true);
            Set setConfig = (Set) field.get(configuration);
            setConfig.clear();
        }

        public void scan() throws IOException {
            if (!fileMapping.isEmpty()) {
                return;
            }

            Resource[] resources = mapperXmlFiles;
            if (resources != null) {
                for (int i = 0; i < resources.length; i++) {
                    String multi_key = getValue(resources[i]);
                    String fileName = resources[i].getFilename();
                    fileMapping.put(fileName, multi_key);
                    log.info("monitor Mybatis mapper file:{}", resources[i].getFile().getAbsolutePath());
                }
            }

        }

        private String getValue(Resource resource) throws IOException {
            String contentLength = String.valueOf((resource.contentLength()));
            String lastModified = String.valueOf((resource.lastModified()));
            return new StringBuilder(contentLength).append(lastModified).toString();
        }

        public boolean isChanged() throws IOException {
            boolean isChanged = false;

            Resource[] resources = mapperXmlFiles;
            if (resources != null) {
                for (int i = 0; i < resources.length; i++) {
                    String name = resources[i].getFilename();
                    String value = fileMapping.get(name);
                    String multi_key = getValue(resources[i]);
                    if (!multi_key.equals(value)) {
                        isChanged = true;
                        fileMapping.put(name, multi_key);
                        log.info("reload Mybatis mapper file:{}", resources[i].getFile().getAbsolutePath());
                    }
                }
            }

            return isChanged;
        }

    }

    @Override
    public void destroy() throws Exception {
        if (service != null) {
            service.shutdownNow();
        }
    }

}