package zh.framework.util;

import org.apache.commons.logging.Log;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author 陈志杭
 * @qq 279397942@qq.com
 * @createdDate 2016年10月26日
 */
public class LogUtils {
    /**
     * 获取默认日志Logger<br />
     * 1.调用类类型名称<br />
     * 2.条件1 Logger,不存在获取默认root Logger
     *
     * @return
     */
    public static Logger getDefaultLogger() {
        String className = ReflectUtils.getInvokeCurrentMethodClassName();
        return LoggerFactory.getLogger(className);
    }

    public static void error(Logger logger, String msg, Exception ex) {
        if (logger.isErrorEnabled() == false) return;
        logger.error(msg, ExceptionUtils.getAsString(ex));
    }

    public static void error(String msg, Exception ex) {
        Logger logger = getDefaultLogger();
        if (logger.isErrorEnabled() == false) return;
        logger.error(msg, ExceptionUtils.getAsString(ex));
    }
}
