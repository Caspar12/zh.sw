package zh.framework.util;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * @author 陈志杭
 * @param <T>
 * @qq 279397942@qq.com
 * @createdDate 2016年10月27日
 * 
 */
public class JsonUtils {
	static Gson gson;
	static Object syncObj = new Object();

	static Gson getInstance() {
		if (gson != null) {
			return gson;
		}

		synchronized (syncObj) {
			if (gson != null) {
				return gson;
			}
			gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
		}
		return gson;
	}

	public static void toFile(Object object, String filePath) throws IOException {
		FileUtils.write(filePath, toJson(object));
	}

	public static String toJson(Object object) {
		String json = getInstance().toJson(object);
		return json;
	}

	public static <T> T fromFile(String filePath, Class<T> type) throws FileNotFoundException {
		FileReader fileReader = new FileReader(filePath);
		T r = getInstance().fromJson(fileReader, type);
		return r;
	}

	public static <T> T fromJson(String json, Class<T> type) {
		return getInstance().fromJson(json, type);
	}
}
