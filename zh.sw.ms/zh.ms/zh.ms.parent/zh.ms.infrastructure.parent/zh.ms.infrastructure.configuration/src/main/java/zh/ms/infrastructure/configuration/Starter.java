package zh.ms.infrastructure.configuration;

import org.springframework.boot.SpringApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.config.server.EnableConfigServer;

import zh.ms.framework.MicroServiceApplication;

@EnableDiscoveryClient
@MicroServiceApplication
@EnableConfigServer
public class Starter  {
	public static void main(String[] args) {
		SpringApplication.run(Starter.class, args);
	}
}
