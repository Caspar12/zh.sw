package zh.site.manager.web.ui.admin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



/**
 * @author 陈志杭
 * @qq 279397942@qq.com
 * @createdDate 2016年12月10日
 * @description 微服务启动注解
 */
//@EnableZuulServer
@EnableZuulProxy
@SpringBootApplication
@RestController
public class Starter extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(Starter.class);
    }

    public static void main(String[] args) {
        SpringApplication application = new SpringApplication(Starter.class);
        application.run(args);
    }

    @RequestMapping(value = "/helloworld")
    public String helloworld() {
        return "helloworld";
    }


}
