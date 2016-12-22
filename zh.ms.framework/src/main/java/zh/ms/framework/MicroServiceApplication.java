package zh.ms.framework;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author 陈志杭
 * @qq 279397942@qq.com
 * @createdDate 2016年12月10日
 * @description 微服务启动注解
 */
@RestController
@SpringBootApplication
@ComponentScan(basePackages = { "zh.ms.**.controller", "zh.ms.**.contract.api", "zh.ms.**.contract.model",
		"zh.ms.**.contract.api.impl", "zh.ms.**.config", "zh.ms.**.aop", "zh.ms.**.listener" })
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
public @interface MicroServiceApplication {

}
