package zh.ms.framework.util;

import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;


/**
 * @author 陈志杭
 * @qq 279397942@qq.com
 * @createdDate 2016年11月7日
 * @description
 */
@Component
public class WebUtils {
    @Resource
    private HttpServletRequest request;

    public boolean isAjax() {
        //TODO: not finish
        return false;
    }
}
