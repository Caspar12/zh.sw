package zh.ms.persistence.contract.config;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.context.annotation.Profile;

import javax.annotation.Resource;

/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/24
 * @description 导入数据库连接配置
 */
@Configuration
@ImportResource("classpath:config/spring-data-jpa.xml")
public class DataSourceJavaConfig {

}
