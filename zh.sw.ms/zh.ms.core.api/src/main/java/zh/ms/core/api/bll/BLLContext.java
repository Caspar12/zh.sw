package zh.ms.core.api.bll;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

/**
 * @author 陈志杭
 * @qq 279397942@qq.com
 * @createdDate 2016年10月31日
 * @description
 */
@Component
public class BLLContext {

	@Resource
	public UserMainService UserMainService;
	
	private void test() {
		
	}
}
