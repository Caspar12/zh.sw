package zh.ms.framework.util;

import org.springframework.boot.context.properties.ConfigurationProperties;
import zh.ms.framework.context.properties.ConfigurationPropertiesBindingPostProcessor;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.lang.annotation.Annotation;

/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/24
 * @description
 */
@Component
public class ConfigurationPropertiesUtils {
    @Resource
    ConfigurationPropertiesBindingPostProcessor configurationPropertiesBindingPostProcessor;

    public <T> T getConfigurationProperties(String key, Class<T> tClass) throws IllegalAccessException, InstantiationException {
        Object bean = tClass.newInstance();
        configurationPropertiesBindingPostProcessor.postProcessBeforeInitialization(bean, createConfigurationProperties(key));
        return (T) bean;
    }

    private ConfigurationProperties createConfigurationProperties(String prefix) {
        return new ConfigurationProperties() {

            @Override
            public Class<? extends Annotation> annotationType() {
                return ConfigurationProperties.class;
            }

            @Override
            public String value() {
                return prefix;
            }

            @Override
            public String prefix() {
                return value();
            }

            @Override
            public boolean ignoreInvalidFields() {
                return false;
            }

            @Override
            public boolean ignoreNestedProperties() {
                return false;
            }

            @Override
            public boolean ignoreUnknownFields() {
                return true;
            }

            @Override
            public boolean exceptionIfInvalid() {
                return true;
            }

            @Override
            public String[] locations() {
                return new String[0];
            }

            @Override
            public boolean merge() {
                return true;
            }
        };
    }
}
