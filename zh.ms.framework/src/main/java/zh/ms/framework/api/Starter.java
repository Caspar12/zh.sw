package zh.ms.framework.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.beanvalidation.MethodValidationPostProcessor;

@SpringBootApplication
@EnableAutoConfiguration
@Configuration

public class Starter {

	public static void main(String[] args) {
		SpringApplication.run(Starter.class, args);
	}

	@Bean
	public MethodValidationPostProcessor getMethodValidationPostProcessor() {
		return new MethodValidationPostProcessor();
	}
}