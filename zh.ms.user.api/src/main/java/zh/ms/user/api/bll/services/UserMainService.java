package zh.ms.user.api.bll.services;

import org.hibernate.validator.constraints.Length;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import zh.framework.validator.constraints.IsCNMainLandMobilePhone;
import zh.framework.validator.constraints.IsUUID;
import zh.ms.user.api.dal.models.UserMain;

/**
 * @author 陈志杭
 * @qq 279397942@qq.com
 * @createdDate 2016年10月31日
 * @description
 */

@Service
public interface UserMainService {
	/**
	 * 使用手机注册用户信息，MD5加密pwd密码
	 * 
	 * @param appId
	 *            应用程序Id
	 * @param mobilePhone
	 *            手机账号
	 * @param pwd
	 *            密码
	 */
	@Transactional
	public UserMain registerByMobilePhone(@IsUUID String appId, @IsCNMainLandMobilePhone String mobilePhone,
			@Length(min = 6, max = 32) String pwd);

	/**
	 * 按手机登录
	 * 
	 * @param appId
	 *            应用程序Id
	 * @param mobilePhone
	 *            手机账号
	 * @param pwd
	 *            密码
	 * @return 用户信息
	 */
	@Transactional(readOnly = true)
	public UserMain loginByMobilePhone(@IsUUID String appId, @IsCNMainLandMobilePhone String mobilePhone,
			@Length(min = 6, max = 32) String pwd);
}
