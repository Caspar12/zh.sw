package zh.ms.persistence.spring.data.jpa.support;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.beans.factory.support.BeanDefinitionRegistryPostProcessor;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.autoconfigure.orm.jpa.JpaProperties;
import org.springframework.boot.bind.RelaxedPropertyResolver;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.ApplicationListener;
import org.springframework.context.EnvironmentAware;
import org.springframework.core.Ordered;
import org.springframework.core.PriorityOrdered;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.Environment;
import org.springframework.core.env.MutablePropertySources;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.persistenceunit.PersistenceUnitManager;
import org.springframework.stereotype.Component;
import zh.ms.framework.listener.ApplicationReadyEventListener;
import zh.ms.persistence.spring.data.jpa.context.TestConfigurationProperties;

import javax.annotation.Resource;
import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/21
 * @description 多数据源配置文件动态注入 注入处理器
 */
@Component
public class MultipleDataSourceBeanDefinitionRegistryPostProcessor
        implements ApplicationListener<ApplicationReadyEvent>, BeanDefinitionRegistryPostProcessor, EnvironmentAware, PriorityOrdered,
        ApplicationContextAware {
    @Resource(name = "t")
    TestConfigurationProperties testConfigurationProperties;

    BeanDefinitionRegistry registry = null;
    ConfigurableListableBeanFactory beanFactory = null;
    Environment environment = null;
    ApplicationContext applicationContext = null;

    @Override
    public void postProcessBeanDefinitionRegistry(BeanDefinitionRegistry registry) throws BeansException {
        this.registry = registry;
    }

    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {
        this.beanFactory = beanFactory;
    }

    @Override
    public void setEnvironment(Environment environment) {
        this.environment = environment;


        RelaxedPropertyResolver propertyResolver = new RelaxedPropertyResolver(environment);
        Map<String, Object> jpaProperties = propertyResolver.getSubProperties("zh.datasource.spring.jpa");
        JpaProperties k = propertyResolver.getProperty("zh.datasource.spring.jpa", JpaProperties.class);
        JpaProperties k1 = propertyResolver.getProperty("zh.datasource", JpaProperties.class);
        ConfigurableEnvironment configurableEnvironment = (ConfigurableEnvironment) environment;
        MutablePropertySources mutablePropertySources = configurableEnvironment.getPropertySources();


    }

    @Resource
    JpaProperties jpaProperties;
    @Resource
    EntityManagerFactoryBuilder entityManagerFactoryBuilder;

    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE + 2;
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
//this.environment.getProperty();
//        DataSourceBuilder.create().driverClassName()
//
//                LocalContainerEntityManagerFactoryBean
//        localContainerEntityManagerFactoryBean = entityManagerFactoryBuilder
//                .dataSource(dataSource)
//                .properties(getVendorProperties(dataSource))
//                .packages("com.wisely.demo.domain.one") //设置实体类所在位置
//                .persistenceUnit("primaryPersistenceUnit")
//
//                .build();
//        return localContainerEntityManagerFactoryBean.setPersistenceProvider();
    }


    private Map<String, String> getVendorProperties(DataSource dataSource) {
        Map<String, String> result = new HashMap<>();
        Map<String, String> resultk = jpaProperties.getHibernateProperties(dataSource);
        RelaxedPropertyResolver propertyResolver = new RelaxedPropertyResolver(this.environment);
        Map<String, Object> result1 = propertyResolver.getSubProperties("zh.datasource.spring.jpa.");
        for (Map.Entry<String, Object> entry : result1.entrySet()) {
            result.put(entry.getKey(), entry.getValue().toString());
        }
        return result;
    }
}
