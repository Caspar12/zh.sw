package zh.framework.validator;

import java.util.UUID;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import zh.framework.validator.constraints.IsUUID;

/**
 * @author 陈志杭
 * @qq 279397942@qq.com
 * @createdDate 2016年10月29日
 * @description 验证是否UUID
 */
public class IsUUIDValidator implements ConstraintValidator<IsUUID, String> {

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * javax.validation.ConstraintValidator#initialize(java.lang.annotation.
	 * Annotation)
	 */
	@Override
	public void initialize(IsUUID constraintAnnotation) {

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see javax.validation.ConstraintValidator#isValid(java.lang.Object,
	 * javax.validation.ConstraintValidatorContext)
	 */
	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		// TODO Auto-generated method stub
		try {
			UUID kUuid = UUID.fromString(value);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

}
