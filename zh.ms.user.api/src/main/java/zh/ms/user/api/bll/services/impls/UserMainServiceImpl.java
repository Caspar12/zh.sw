package zh.ms.user.api.bll.services.impls;

import java.text.MessageFormat;
import java.util.UUID;

import javax.annotation.Resource;
import javax.validation.ConstraintViolationException;
import javax.validation.ValidationException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import zh.framework.utils.CodecUtils;
import zh.framework.utils.I18NUtils;
import zh.ms.user.api.bll.services.UserMainService;
import zh.ms.user.api.dal.DALContext;
import zh.ms.user.api.dal.models.UserMain;

/**
 * @author 陈志杭
 * @qq 279397942@qq.com
 * @createdDate 2016年10月31日
 * @description
 */
@Service
public class UserMainServiceImpl implements UserMainService {

	@Resource
	DALContext dalContext;

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * zh.ms.user.api.bll.services.UserMainService#registerByMobilePhone(java.
	 * lang.String, java.lang.String, java.lang.String)
	 */
	@Override
	public UserMain registerByMobilePhone(String appId, String mobilePhone, String pwd) {
		
		if (dalContext.UserMainDao.existsByAppIdAndMobilePhone(appId, mobilePhone)) {
			throw new ValidationException(I18NUtils.getMessage("usermain.service.exception.exists.mobilephone",
					new Object[] { mobilePhone }));
		}
		String pwdMD5 = codecPwd(pwd);
		UserMain userMain = new UserMain();
		userMain.setAccount("");
		userMain.setAppId(appId);
		userMain.setId(UUID.randomUUID().toString());
		userMain.setMobilePhone(mobilePhone);
		userMain.setPassword(pwdMD5);
		dalContext.UserMainDao.save(userMain);
		return userMain;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * zh.ms.user.api.bll.services.UserMainService#loginByMobilePhone(java.lang.
	 * String, java.lang.String, java.lang.String)
	 */
	@Override
	public UserMain loginByMobilePhone(String appId, String mobilePhone, String pwd) {
		String pwdMD5 = codecPwd(pwd);
		UserMain userMain = dalContext.UserMainDao.findByAppIdAndMobilePhoneAndPassword(appId, mobilePhone, pwdMD5);
		if (userMain == null) {
			throw new ValidationException(I18NUtils.getMessage(
					"usermain.service.exception.mobilephone.or.password.error", new Object[] { mobilePhone }));
		}
		return userMain;
	}

	/**
	 * MD5加密密码，后MD5字符串全大写
	 * 
	 * @param pwd
	 *            原始密码
	 * @return 编码后的密码
	 */
	private String codecPwd(String pwd) {
		String pwdMD5 = CodecUtils.md5(pwd).toUpperCase();
		return pwdMD5;
	}
}
