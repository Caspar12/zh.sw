package zh.ms.user.api.dal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.Repository;

import zh.ms.user.api.dal.models.UserMain;

/**
 * @author 陈志杭
 * @qq 279397942@qq.com
 * @createdDate 2016年10月29日
 * @description
 */
@org.springframework.stereotype.Repository
public interface UserMainDao extends org.springframework.data.repository.CrudRepository<UserMain, String> {

	/**
	 * @param mobilePhone
	 */
	boolean existsByAppIdAndMobilePhone(String appId, String mobilePhone);

	/**
	 * @param appId
	 * @param mobilePhone
	 */
	UserMain findByAppIdAndMobilePhone(String appId, String mobilePhone);

	/**
	 * @param appId
	 * @param mobilePhone
	 * @param pwdMD5
	 * @return
	 */
	UserMain findByAppIdAndMobilePhoneAndPassword(String appId, String mobilePhone, String pwdMD5);

}
