package zh.ms.persistence.spring.data.jpa.context;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.support.BeanDefinitionRegistryPostProcessor;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.autoconfigure.orm.jpa.JpaProperties;
import org.springframework.boot.bind.RelaxedPropertyResolver;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.*;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.stereotype.Component;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.annotation.Resource;
import javax.persistence.EntityManager;
import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/21
 * @description
 */

@ImportResource
@Configuration
@Component
@EnableTransactionManagement
@EnableJpaRepositories(entityManagerFactoryRef = "entityManagerFactoryPrimary", transactionManagerRef = "transactionManagerPrimary", basePackages = {"com.wisely.demo.dao.one"})
//设置dao（repo）所在位置
public class TestConfigurationProperties implements EnvironmentAware {
    @Bean(name = "t")
    @ConfigurationProperties(prefix = "zh.datasource")
    public DataSource getDatasource() {
        DataSource dataSource = DataSourceBuilder.create().build();
        return dataSource;
    }

    @ConfigurationProperties(prefix = "zh.datasource1")
    public DataSource getDatasource2() {
        DataSource dataSource = DataSourceBuilder.create().build();
        return dataSource;
    }

    @Autowired
    private JpaProperties jpaProperties;

    @Resource(name = "t")
    DataSource dataSource;

    @Bean(name = "entityManagerPrimary")
    @Primary
    public EntityManager entityManager(EntityManagerFactoryBuilder builder, DataSource datasourcek) {
        EntityManager entityManager = entityManagerFactoryPrimary(builder, datasourcek).getObject().createEntityManager();

        return entityManager;
    }

    @Bean(name = "entityManagerFactoryPrimary")
    @Primary
    public LocalContainerEntityManagerFactoryBean entityManagerFactoryPrimary(EntityManagerFactoryBuilder builder, DataSource datasourcek) {
        LocalContainerEntityManagerFactoryBean localContainerEntityManagerFactoryBean = builder
                .dataSource(dataSource)
                .properties(getVendorProperties(dataSource))
                .packages("com.wisely.demo.domain.one") //设置实体类所在位置
                .persistenceUnit("primaryPersistenceUnit")

                .build();

        return localContainerEntityManagerFactoryBean;
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

    @Bean(name = "transactionManagerPrimary")
    @Primary
    PlatformTransactionManager transactionManagerPrimary(EntityManagerFactoryBuilder builder, DataSource datasourcek) {
        PlatformTransactionManager platformTransactionManager = new JpaTransactionManager(entityManagerFactoryPrimary(builder, datasourcek).getObject());
        return platformTransactionManager;
    }

    private Environment environment;

    @Override
    public void setEnvironment(Environment environment) {
        this.environment = environment;
    }
}
