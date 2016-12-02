package zh.ms.core.api.dal;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

/**
 * @author 陈志杭
 * @qq 279397942@qq.com
 * @createdDate 2016年10月29日
 * @description
 */
@Component
public class DALContext {
	@Resource
	public UserMainDao UserMainDao;
}
