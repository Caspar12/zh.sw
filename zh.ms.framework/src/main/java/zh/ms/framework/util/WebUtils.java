package zh.ms.framework.util;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
 

/**
 * @author 陈志杭
 * @qq 279397942@qq.com
 * @createdDate 2016年11月7日
 * @description
 */
public class WebUtils {
	@Resource
	private static HttpServletRequest request;

	public static boolean isAjax() {
		//TODO: not finish
		return false;
	}
}
