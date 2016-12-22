package zh.ms.persistence.contract;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ImportResource;

/**
 * @author 陈志杭
 * @qq 279397942@qq.com
 * @createdDate 2016年12月20日
 * @description
 */
@ImportResource("classpath:spring-data-jpa.xml")
@SpringBootApplication
public class Starter {
    public static void main(String[] args) {
        SpringApplication.run(Starter.class, args);
    }
}
