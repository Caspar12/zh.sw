package zh.ms.framework;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ComponentScans;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@ApplicationBoot
public class Starter {

	@RequestMapping(value = "/helloworld")
	public String helloworld() {
		return "helloworld:" + this.getClass().getCanonicalName();
	}

	public static void main(String[] args) {
		SpringApplication.run(Starter.class, args);
	}
}