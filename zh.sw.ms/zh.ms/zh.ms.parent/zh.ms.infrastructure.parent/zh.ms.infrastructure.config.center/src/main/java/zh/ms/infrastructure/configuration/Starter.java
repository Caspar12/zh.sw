package zh.ms.infrastructure.configuration;

import org.springframework.boot.SpringApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

@EnableConfigServer
public class Starter  {
	public static void main(String[] args) {
		SpringApplication.run(Starter.class, args);
	}
}
