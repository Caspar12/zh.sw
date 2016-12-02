package zh.ms.framework.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import zh.ms.framework.interceptors.GlobalAjaxControllerAdviceExceptionHandler;

@SpringBootApplication
@EnableAutoConfiguration
@Configuration
@ComponentScan(basePackageClasses = { StarterConfig.class, GlobalAjaxControllerAdviceExceptionHandler.class })
public class Starter {

	public static void main(String[] args) {
		SpringApplication.run(Starter.class, args);
	}
}