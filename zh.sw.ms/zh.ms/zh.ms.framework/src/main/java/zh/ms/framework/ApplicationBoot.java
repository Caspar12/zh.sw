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
 * @description
 */
@RestController
@SpringBootApplication
@ComponentScan(basePackages = { "zh.ms.**.controllers", "zh.ms.**.contracts.apis", "zh.ms.**.contracts.models",
		"zh.ms.**.contracts.api.impls", "zh.ms.**.configs", "zh.ms.**.aops", "zh.ms.**.listeners" })
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
public @interface ApplicationBoot {

}
