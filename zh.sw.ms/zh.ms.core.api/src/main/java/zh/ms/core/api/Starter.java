package zh.ms.core.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.validation.Validator;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import org.springframework.validation.beanvalidation.MethodValidationPostProcessor;

import antlr.RecognitionException;
import zh.framework.exceptions.ZhException;

@ComponentScan(basePackages = { "zh.ms.core.api.web", "zh.ms.core.api.bll", "zh.ms.core.api.dal",
		"zh.framework.utils" })
public class Starter extends zh.ms.framework.Starter {

	public static void main(String[] args) {
		SpringApplication.run(Starter.class, args);

	}

}