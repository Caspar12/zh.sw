package zh.ms.framework.utils;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import zh.web.utils.WebUtil;

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
		return WebUtil.isAjax(request);
	}
}
