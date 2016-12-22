package zh.framework.util;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.digest.DigestUtils;

/**
 * @author 陈志杭
 * @qq 279397942@qq.com
 * @createdDate 2016年10月27日
 * 
 */
public class CodecUtils {
	public static String md5(String data) {
		return DigestUtils.md5Hex(data);
	}

	public static String encodeBase64(String data) {
		return Base64.encodeBase64String(data.getBytes());
	}

	public static String decodeBase64(String data) {
		return new String(Base64.decodeBase64(data));
	}
}
