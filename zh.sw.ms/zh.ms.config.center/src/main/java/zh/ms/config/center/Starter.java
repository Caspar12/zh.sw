package zh.ms.config.center;

import org.springframework.boot.SpringApplication;
import org.springframework.cloud.config.server.EnableConfigServer;
@EnableConfigServer
public class Starter extends zh.ms.framework.Starter {

	public static void main(String[] args) {
		SpringApplication.run(Starter.class, args);
	}
}