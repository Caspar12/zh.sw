package zh.framework.validator;

import java.lang.reflect.InvocationTargetException;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import lombok.extern.slf4j.Slf4j;
import zh.framework.util.ReflectUtils;
import zh.framework.validator.constraint.Equals;
import zh.framework.validator.constraint.IsCNMainLandMobilePhone;

/**
 * @author 陈志杭
 * @qq 279397942@qq.com
 * @createdDate 2016年10月29日
 * @description 验证是否中国大陆手机
 */
@Slf4j
public class EqualsValidator implements ConstraintValidator<Equals, Object> {

	Equals constraintAnnotation;

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * javax.validation.ConstraintValidator#initialize(java.lang.annotation.
	 * Annotation)
	 */
	@Override
	public void initialize(Equals constraintAnnotation) {
		this.constraintAnnotation = constraintAnnotation;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see javax.validation.ConstraintValidator#isValid(java.lang.Object,
	 * javax.validation.ConstraintValidatorContext)
	 */
	@Override
	public boolean isValid(Object value, ConstraintValidatorContext context) {
		String firstField = this.constraintAnnotation.firstField();
		String secondField = this.constraintAnnotation.secondField();

		try {
			Object firstObj = ReflectUtils.getProperty(value, firstField);
			Object secondObj = ReflectUtils.getProperty(value, secondField);
			return firstObj == null && secondObj == null || firstObj != null && firstObj.equals(secondObj);
		} catch (IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
			log.error("无法反射字段:{},{}", firstField, secondField);
			return false;

		}
	}

}
