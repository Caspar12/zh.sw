package zh.ms.infrastructure.registration;

import org.springframework.boot.SpringApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;
import zh.ms.framework.MicroServiceApplication;

@MicroServiceApplication
@EnableEurekaServer
public class Starter {
	public static void main(String[] args) {
		SpringApplication.run(Starter.class, args);
	}
}
