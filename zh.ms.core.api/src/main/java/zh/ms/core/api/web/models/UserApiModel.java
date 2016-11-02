package zh.ms.core.api.web.models;

import java.lang.reflect.InvocationTargetException;

import zh.framework.utils.ReflectUtils;
import zh.ms.core.api.dal.models.UserMain;

/**
 * @author 陈志杭
 * @qq 279397942@qq.com
 * @createdDate 2016年10月29日
 * @description
 */
public class UserApiModel {

	public static UserApiModel fromUserMain(UserMain userMain)
			throws InstantiationException, IllegalAccessException, InvocationTargetException {
		return ReflectUtils.copyProperties(userMain, UserApiModel.class);
	}

	String id;
	String account;
	String mobilePhone;
	String appId;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getMobilePhone() {
		return mobilePhone;
	}

	public void setMobilePhone(String mobilePhone) {
		this.mobilePhone = mobilePhone;
	}

	public String getAppId() {
		return appId;
	}

	public void setAppId(String appId) {
		this.appId = appId;
	}

}