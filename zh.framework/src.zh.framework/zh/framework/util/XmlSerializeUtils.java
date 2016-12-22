package zh.framework.util;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;

public class XmlSerializeUtils {

	/**
	 * 以xml方式序列化对象到文件中
	 * 
	 * @param object
	 *            序列化对象
	 * @param filePath
	 *            保存文件位置
	 * @throws IOException
	 *             创建文件失败
	 */
	public static void toFile(Object object, String filePath) throws IOException {

		XStream xStream = new XStream(new DomDriver("UTF-8"));
		FileOutputStream fs;
		FileUtils.createNewFileIsNotExists(filePath);
		fs = new FileOutputStream(filePath);
		xStream.toXML(object, fs);

	}

	/**
	 * 以xml方式序列化对象
	 * 
	 * @param obj
	 *            序列化对象
	 * @return obj 序列化对象字符串
	 */
	public static String toXml(Object obj) {
		XStream xStream = new XStream(new DomDriver("UTF-8"));
		String xml = xStream.toXML(obj);
		return xml;
	}

	/**
	 * 以xml方式从文件中反序列化
	 * 
	 * @param filePath
	 *            文件路径
	 * @return
	 * @throws FileNotFoundException
	 *             文件路径不存在
	 * 
	 */
	@SuppressWarnings("unchecked")
	public static <T> T fromFile(String filePath) throws FileNotFoundException {
		XStream xStream = new XStream(new DomDriver("UTF-8"));
		FileInputStream fs = null;
		fs = new FileInputStream(filePath);
		Object object = xStream.fromXML(fs);
		if (object == null)
			return null;
		return (T) object;
	}

	@SuppressWarnings("unchecked")
	public static <T> T fromXml(String xml) {
		XStream xStream = new XStream(new DomDriver("UTF-8"));
		Object object = xStream.fromXML(xml);
		if (object == null)
			return null;
		return (T) object;
	}
}
