package zh.ms.core.api.web.controllers;

import java.lang.reflect.InvocationTargetException;
import java.util.Locale;

import javax.annotation.Resource;

import org.hibernate.validator.constraints.Length;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import zh.framework.utils.I18NUtils;
import zh.framework.validator.constraints.IsCNMainLandMobilePhone;
import zh.framework.validator.constraints.IsUUID;
import zh.ms.core.api.bll.BLLContext;
import zh.ms.core.api.dal.models.UserMain;
import zh.ms.core.api.web.models.UserApiModel;

/**
 * 
 * @author 陈志杭
 * @qq 279397942@qq.com
 * @createdDate 2016年10月25日
 *
 */
@RestController
@RequestMapping(value = "identity")

public class IdentityController {
	@Resource
	BLLContext bllContext;
	@Resource
	I18NUtils i18NUtils;

	@RequestMapping(value = "registerByMobilePhone")
	public UserApiModel registerByMobilePhone(String appId, String mobilePhone, String pwd)
			throws InstantiationException, IllegalAccessException, InvocationTargetException {
		UserMain userMain = bllContext.UserMainService.registerByMobilePhone(appId, mobilePhone, pwd);
		UserApiModel userApiModel = UserApiModel.fromUserMain(userMain);
		return userApiModel;
	}

	@RequestMapping(value = "loginByMobilePhone")
	public UserApiModel loginByMobilePhone(String appId, String mobilePhone, String pwd)
			throws InstantiationException, IllegalAccessException, InvocationTargetException {
		UserMain userMain = bllContext.UserMainService.loginByMobilePhone(appId, mobilePhone, pwd);
		UserApiModel userApiModel = UserApiModel.fromUserMain(userMain);
		return userApiModel;
	}
}
