package zh.framework.util;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;
import zh.framework.model.TestModel;
import zh.framework.model.TestModel2;

public class XmlSerializeUtils {

    /**
     * 创建默认XStream格式化工具配置
     *
     * @return
     */
    public static XStream createDefaultXStream() {
        XStream xStream = new XStream(new DomDriver("UTF-8"));
        xStream.autodetectAnnotations(true);
        return xStream;
    }

    /**
     * 创建默认XStream格式化工具配置
     *
     * @return
     */
    public static XStream createDefaultXStream(Object value) {
        XStream xStream = createDefaultXStream();
        xStream.alias("root", value.getClass());
        return xStream;
    }


    /**
     * 以xml方式序列化对象到文件中
     *
     * @param object   序列化对象
     * @param filePath 保存文件位置
     * @throws IOException 创建文件失败
     */
    public static void toFile(Object object, String filePath) throws IOException {

        XStream xStream = createDefaultXStream(object);
        FileOutputStream fs;
        FileUtils.createNewFileIsNotExists(filePath);
        fs = new FileOutputStream(filePath);
        xStream.toXML(object, fs);

    }

    /**
     * 以xml方式序列化对象
     *
     * @param obj 序列化对象
     * @return obj 序列化对象字符串
     */
    public static String toXml(Object obj) {
        XStream xStream = createDefaultXStream(obj);
        String xml = xStream.toXML(obj);
        return xml;
    }

    /**
     * 以xml方式从文件中反序列化
     *
     * @param filePath 文件路径
     * @return
     * @throws FileNotFoundException 文件路径不存在
     */
    @SuppressWarnings("unchecked")
    public static <T> T fromFile(String filePath) throws FileNotFoundException {
        XStream xStream = createDefaultXStream();
        FileInputStream fs = null;
        fs = new FileInputStream(filePath);
        Object object = xStream.fromXML(fs);
        if (object == null)
            return null;
        return (T) object;
    }

    /**
     * 反序列化
     *
     * @param xml
     * @param <T>
     * @return
     */
    @SuppressWarnings("unchecked")
    public static <T> T fromXml(String xml) {
        XStream xStream = createDefaultXStream();
        Object object = xStream.fromXML(xml);
        if (object == null)
            return null;
        return (T) object;
    }

    /**
     * 反序列化
     *
     * @param xml
     * @param o   映射属性的对象
     * @param <T>
     * @return
     */
    @SuppressWarnings("unchecked")
    public static <T> T fromXml(String xml, Object o) {
        XStream xStream = createDefaultXStream(o);
        Object object = xStream.fromXML(xml, o);
        if (object == null)
            return null;
        return (T) object;
    }

    public static void main(String[] args) {

        TestModel testModel = new TestModel();
        testModel.setName("name");
        testModel.setValue("value");
        TestModel2 testModel2 = new TestModel2();
        testModel2.setName2("name2");
        testModel2.setValue2("value2");
        testModel.setTestModel(testModel2);
        String xml = toXml(testModel);
        System.out.println(xml);

        testModel = new TestModel();
        testModel = fromXml(xml, testModel);
        System.out.println(testModel);

    }
}
