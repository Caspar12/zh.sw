package zh.ms.framework.configs;

import javax.annotation.Resource;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration; 
import org.springframework.util.AntPathMatcher;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import org.springframework.validation.beanvalidation.MethodValidationPostProcessor;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * @author 陈志杭
 * @qq 279397942@qq.com
 * @createdDate 2016年11月4日
 * @description 配置Url路径大小写不敏感 <br />
 *              接口注解验证 <br />
 *              语言位置 <br />
 */
@Configuration
public class StarterConfig extends WebMvcConfigurerAdapter  {
	@Resource
	private MessageSource messageSource;

	@Override
	public void configurePathMatch(PathMatchConfigurer configurer) {
		AntPathMatcher antPathMatcher = new AntPathMatcher();
		antPathMatcher.setCaseSensitive(false);
		configurer.setPathMatcher(antPathMatcher);
		super.configurePathMatch(configurer);
	}

	@Bean
	public MethodValidationPostProcessor methodValidationPostProcessor() {
		MethodValidationPostProcessor methodValidationPostProcessor = new MethodValidationPostProcessor();
		methodValidationPostProcessor.setValidatorFactory(validator());
		return methodValidationPostProcessor;
	}

	@Bean
	public LocalValidatorFactoryBean validator() {
		LocalValidatorFactoryBean validatorFactoryBean = new LocalValidatorFactoryBean();
		validatorFactoryBean.setValidationMessageSource(messageSource);
		return validatorFactoryBean;
	}
}
