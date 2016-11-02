package zh.framework.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import zh.framework.utils.ValidUtils;
import zh.framework.validator.constraints.IsCNMainLandMobilePhone;

/**
 * @author 陈志杭
 * @qq 279397942@qq.com
 * @createdDate 2016年10月29日
 * @description 验证是否中国大陆手机
 */
public class IsCNMainLandMobilePhoneValidator implements ConstraintValidator<IsCNMainLandMobilePhone, String> {

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * javax.validation.ConstraintValidator#initialize(java.lang.annotation.
	 * Annotation)
	 */
	@Override
	public void initialize(IsCNMainLandMobilePhone constraintAnnotation) {

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see javax.validation.ConstraintValidator#isValid(java.lang.Object,
	 * javax.validation.ConstraintValidatorContext)
	 */
	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		return ValidUtils.isCNMainlandMobilePhone(value);
	}

}
