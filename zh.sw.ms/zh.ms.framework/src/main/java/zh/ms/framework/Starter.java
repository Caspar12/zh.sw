package zh.ms.framework;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import zh.ms.framework.interceptors.GlobalAjaxControllerAdviceExceptionHandler;

@RestController
@SpringBootApplication
@EnableAutoConfiguration
@Configuration
@ComponentScan(basePackages = { "zh.ms.**.controllers", "zh.ms.**.contracts.apis", "zh.ms.**.contracts.models",
		"zh.ms.**.bll.impls", }, basePackageClasses = { StarterConfig.class,
				GlobalAjaxControllerAdviceExceptionHandler.class })
public class Starter {

	@RequestMapping(value = "/helloworld")
	public String helloworld() {
		return "helloworld";
	}

	public static void main(String[] args) {
		SpringApplication.run(Starter.class, args);
	}
}