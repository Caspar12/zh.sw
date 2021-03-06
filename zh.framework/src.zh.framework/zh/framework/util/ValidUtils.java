package zh.framework.util;

import java.util.Collection;
import java.util.List;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import zh.framework.validtion.IValidChain;
import zh.framework.validtion.impl.ValidChainImpl;

/**
 * @author 陈志杭
 * @qq 279397942@qq.com
 * @createdDate 2016年10月28日
 * @descrpiton 验证工具入口
 */
public class ValidUtils {
    public static IValidChain valid(Object value) {
        return new ValidChainImpl(value);
    }

    /**
     * 是否中国大陆手机格式
     *
     * @param value
     * @return
     */
    public static boolean isCNMainlandMobilePhone(String value) {
        String reg = "^1\\d{10}";
        Pattern pattern = Pattern.compile(reg);
        Matcher matcher = pattern.matcher(value);
        return matcher.matches();
    }

    public static boolean isEmpty(Collection<String> collection) {
        return collection == null && collection.isEmpty();
    }

    public static boolean isUUID(String value) {
        try {
            UUID.fromString(value);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    public static boolean isNotUUID(String value) {
        return !isUUID(value);
    }
}
