package zh.ms.core.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.beanvalidation.MethodValidationPostProcessor;

import zh.framework.exceptions.ZhException;

@ComponentScan(basePackages = { "zh.ms.user.api.web.controllers", "zh.ms.user.api.web.configs" })

public class Starter extends zh.ms.framework.api.Starter {

	public static void main(String[] args) {
		SpringApplication.run(Starter.class, args);
	}
}