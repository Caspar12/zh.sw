package zh.framework.utils;

import java.util.Locale;

import javax.annotation.Resource;

import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;

/**
 * @author 陈志杭
 * @qq 279397942@qq.com
 * @createdDate 2016年10月31日
 * @description 基于Spring的国际化工具
 */
@Resource
public class I18NUtils {
	@Resource
	private static MessageSource messageSource;

	public static String getMessage(String key) {
		Locale locale = LocaleContextHolder.getLocale();
		return messageSource.getMessage(key, null, locale);
	}

	public static String getMessage(String key, Object[] args) {
		Locale locale = LocaleContextHolder.getLocale();
		return messageSource.getMessage(key, args, locale);
	}
}
