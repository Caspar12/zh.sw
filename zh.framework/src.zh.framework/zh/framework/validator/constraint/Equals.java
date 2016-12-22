package zh.framework.validator.constraint;

import static java.lang.annotation.ElementType.ANNOTATION_TYPE;
import static java.lang.annotation.ElementType.CONSTRUCTOR;
import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.ElementType.PARAMETER;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Constraint;
import javax.validation.Payload;
import javax.validation.ReportAsSingleViolation;
import javax.validation.constraints.NotNull;

import zh.framework.validator.EqualsValidator;
import zh.framework.validator.IsCNMainLandMobilePhoneValidator;

/**
 * @author 陈志杭
 * @qq 279397942@qq.com
 * @createdDate 2016年10月29日
 * @description
 */

@Documented
@Constraint(validatedBy = { EqualsValidator.class })
@Target({ java.lang.annotation.ElementType.TYPE, ANNOTATION_TYPE, })
@Retention(RUNTIME)
public @interface Equals {
	String message()

	default "{zh.framework.validator.constraints.Equals.message}";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};

	/**
	 * 需要比较的字段名称
	 * 
	 * @return
	 */
	String firstField() default "";

	/**
	 * 需要比较的字段名称
	 * 
	 * @return
	 */
	String secondField() default "";
};