package zh.ms.core.api.bll;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.UUID;

import javax.annotation.Resource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import antlr.RecognitionException;
import zh.framework.utils.I18NUtils;
import zh.ms.core.api.dal.DALContext;
import zh.ms.core.api.dal.models.UserMain;

/**
 * @author 陈志杭
 * @qq 279397942@qq.com
 * @createdDate 2016年11月3日
 * @description
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(zh.ms.core.api.Starter.class)
@WebAppConfiguration
public class UserServiceImplTest {
	@Resource
	BLLContext bllContext;
	@Resource
	DALContext dalContext;
	@Resource
	I18NUtils i18NUtils;

	@Test
	public void save() {
		UserMain userMain = new UserMain();
	 
		dalContext.UserMainDao.save(userMain);
	}

	 
	public void find() {
		String msString = "";

		try {

			msString = i18NUtils.getMessage("zh.framework.validator.constraints.IsUUID.message");
			System.out.println("zh.framework.validator.constraints.IsUUID.message:" + msString);
		} catch (Exception e) {
			e.printStackTrace();
		}

		try {
			msString = i18NUtils.getMessage("usermain.service.exception.mobilephone.or.password.error");
			System.out.println("usermain.service.exception.mobilephone.or.password.error:" + msString);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
