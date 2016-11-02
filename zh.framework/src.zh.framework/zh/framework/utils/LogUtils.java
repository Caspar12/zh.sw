package zh.framework.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author 陈志杭
 * @qq 279397942@qq.com
 * @createdDate 2016年10月26日
 * 
 */
public class LogUtils {
	/**
	 * 获取默认日志Logger
	 * 1.调用类类型名称
	 * 2.条件1Logger,不存在获取默认root Logger
	 * @return
	 */
	public static Logger getDefaultLogger() {
		String className = ReflectUtils.getInvokeCurrentMethodClassName();
		return LoggerFactory.getLogger(className);
	}
}
