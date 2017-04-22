package zh.framework.util;

import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.collections.map.HashedMap;
import org.apache.commons.lang3.StringUtils;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * User: qiujingwang
 * Date: 2016/2/22
 * Time: 12:43
 */
public abstract class EnumUtils {
    /**
     * 从指定的枚举类中根据property搜寻匹配指定值的枚举实例
     *
     * @param <T>       指定的枚举类型
     * @param enumClass 指定的枚举类型
     * @param property  指定属性
     * @param propValue 指定属性的值
     * @return 枚举对象实例
     */
    public static <T extends Enum<T>> T fromEnumValue(Class<T> enumClass, String property, Object propValue) {
        T[] enumConstants = enumClass.getEnumConstants();
        String methodName = "get" + StringUtils.capitalize(property);
        for (T t : enumConstants) {
            Object constantPropValue;
            try {
                constantPropValue = t.getDeclaringClass().getDeclaredMethod(methodName).invoke(t);
                if (constantPropValue.equals(propValue)) {
                    return t;
                }
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
        throw new EnumConstantNotPresentException(enumClass, String.valueOf(propValue));
    }

    /**
     * 通过枚举对象获取指定属性的值
     *
     * @param enumObject 枚举对象
     * @param property   枚举对象中的属性
     * @return 属性对应值
     */
    public static String getEnumProperty(Enum enumObject, String property) {
        return getEnumPropertyEx(enumObject, property).toString();
    }

    /**
     * 通过枚举对象获取指定属性的值
     *
     * @param enumObject 枚举对象
     * @param property   枚举对象中的属性
     * @return 属性对应值
     */
    public static Object getEnumPropertyEx(Enum enumObject, String property) {
        String methodName = "get" + StringUtils.capitalize(property);
        Object constantPropValue;
        try {
            constantPropValue = enumObject.getDeclaringClass().getDeclaredMethod(methodName).invoke(enumObject);
        } catch (Exception e) {
            throw new RuntimeException(
                    String.format("could not found settable filed [%s] in [%s]", property, enumObject.getDeclaringClass())
                    , e);
        }

        return constantPropValue;
    }

    /**
     * 通过枚举对象获取枚举描述值（desc)
     *
     * @param enumObject 枚举对象
     * @return 枚举描述值
     */
    public static String getEnumDesc(Enum enumObject) {
        return getEnumProperty(enumObject, "desc");
    }

    /**
     * 通过枚举对象获取枚举描述值（desc)
     *
     * @param code 枚举对象
     * @return 枚举描述值
     */
    public static <T extends Enum<T>> String getEnumDescByCode(String code, Class<T> clazz) {
        Enum<?> enumObject = null;
        try {
            enumObject = EnumUtils.fromEnumValue(clazz, "code", code.trim());
        } catch (EnumConstantNotPresentException ex) {
            return code;
        }
        return getEnumDesc(enumObject);
    }

    public static <T extends Enum<T>> T resolveFromCode(String code, Class<T> clazz) {
        return EnumUtils.fromEnumValue(clazz, "code", code.trim());
    }

    public static <T extends Enum<T>> T resolveByCode(Object code, Class<T> clazz) {
        return EnumUtils.fromEnumValue(clazz, "code", code);
    }

    public static <T, TEnum extends Enum<TEnum>> T getProperty(Class<TEnum> clazz, Object code, String propertyName) {
        T value = null;
        try {
            TEnum tEnum = EnumUtils.resolveByCode(code, clazz);
            value = (T) EnumUtils.getEnumPropertyEx(tEnum, propertyName);
        } catch (Exception ex) {

        }
        return value;
    }

    /**
     * 反射类举类,转为List map
     *
     * @param className
     * @param properties
     * @return
     * @throws ClassNotFoundException
     * @throws IllegalAccessException
     * @throws NoSuchMethodException
     * @throws InvocationTargetException
     */
    public static List<Map<String, Object>> reflectToMap(String className, String[] properties) throws ClassNotFoundException, IllegalAccessException, NoSuchMethodException, InvocationTargetException {

        List<Map<String, Object>> resultList = new ArrayList<>();
        Class<Enum> clazz = (Class<Enum>) Class.forName(className);//通过反射获取枚举对象
        Enum[] enumConstants = clazz.getEnumConstants();
        for (Enum t : enumConstants) {
            Map<String, Object> resultModel = new HashedMap();
            if (properties != null && properties.length > 0) {
                for (String property : properties) {
                    if (StringUtils.isBlank(property)) continue;
                    Object value = PropertyUtils.getProperty(t, property);
                    resultModel.put(property, value);
                }
            }
            resultList.add(resultModel);
        }
        return resultList;

    }
}
