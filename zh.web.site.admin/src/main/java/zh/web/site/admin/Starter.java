package zh.web.site.admin;

import org.springframework.boot.SpringApplication;
import zh.ms.framework.MicroServiceApplication;

/**
 * @author 陈志杭
 * @qq 279397942@qq.com
 * @createdDate 2016年12月20日
 * @description
 */
@MicroServiceApplication
public class Starter {
    public static void main(String[] args) {

        SpringApplication application = new SpringApplication(Starter.class);

        application.run(args);

    }
}