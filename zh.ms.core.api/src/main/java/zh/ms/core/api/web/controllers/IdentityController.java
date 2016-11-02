package zh.ms.core.api.web.controllers;

import java.lang.reflect.InvocationTargetException;

import javax.annotation.Resource;

import org.hibernate.validator.constraints.Length;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import zh.framework.validator.constraints.IsCNMainLandMobilePhone;
import zh.framework.validator.constraints.IsUUID;
import zh.ms.core.api.bll.services.BLLContext;
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
@Validated
public class IdentityController {
	@Resource
	BLLContext bllContext;

	@RequestMapping(value = "registerByMobilePhone", method = { RequestMethod.POST })
	public UserApiModel registerByMobilePhone(@IsUUID String appId, @IsCNMainLandMobilePhone String mobilePhone,
			@Length(min = 6, max = 32) String pwd)
			throws InstantiationException, IllegalAccessException, InvocationTargetException {
		UserMain userMain = bllContext.UserMainService.registerByMobilePhone(appId, mobilePhone, pwd);
		UserApiModel userApiModel = UserApiModel.fromUserMain(userMain);

		return userApiModel;
	}

	@RequestMapping(value = "loginByMobilePhone", method = { RequestMethod.POST })
	public UserApiModel loginByMobilePhone(@IsUUID String appId, @IsCNMainLandMobilePhone String mobilePhone,
			@Length(min = 6, max = 32) String pwd)
			throws InstantiationException, IllegalAccessException, InvocationTargetException {
		UserMain userMain = bllContext.UserMainService.loginByMobilePhone(appId, mobilePhone, pwd);
		UserApiModel userApiModel = UserApiModel.fromUserMain(userMain);
		return userApiModel;
	}
}
