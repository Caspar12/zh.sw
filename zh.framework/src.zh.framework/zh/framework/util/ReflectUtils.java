package zh.framework.util;

import javassist.*;
import javassist.bytecode.CodeAttribute;
import javassist.bytecode.LocalVariableAttribute;
import javassist.bytecode.MethodInfo;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.PropertyUtils;

import javax.validation.ValidationException;
import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.io.File;
import java.io.UnsupportedEncodingException;
import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.text.MessageFormat;
import java.util.*;

/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2015/1/21
 * @description 反射类帮助类
 */
public class ReflectUtils {

    /**
     * 查询类型所在的文件名
     *
     * @param pClass 类类型
     * @return
     * @throws UnsupportedEncodingException 文件路径转码失败
     */
    public static String getClassOfFileName(Class<?> pClass) throws UnsupportedEncodingException {
        String jarFilePath = pClass.getProtectionDomain().getCodeSource().getLocation().getFile();

        jarFilePath = java.net.URLDecoder.decode(jarFilePath, "UTF-8");

        File file = new File(jarFilePath);

        return file.getName();
    }

    /**
     * 获取调用当前方法的类名
     *
     * @return 获取调用当前方法的类名
     */
    public static String getInvokeCurrentMethodClassName() {
        return Thread.currentThread().getStackTrace()[1].getClassName();
    }

    /**
     * 包含String类型的基本类型
     *
     * @param pType
     * @return
     */
    public static Boolean isBasePrimitive(Class<?> pType) {
        return pType.isPrimitive() || (isNumeric(pType) || isString(pType));
    }

    public static boolean isDouble(Object pValue) {
        return pValue instanceof Double;
    }

    public static boolean isInteger(Object pValue) {
        return pValue instanceof Integer;
    }

    public static boolean isFloat(Object pValue) {
        return pValue instanceof Float;
    }

    public static boolean isLong(Object pValue) {
        return pValue instanceof Long;
    }

    public static boolean isShort(Object pValue) {
        return pValue instanceof Short;
    }

    public static boolean isString(Object pValue) {
        return pValue instanceof String;
    }

    public static boolean isString(Class<?> type) {
        return type.isAssignableFrom(String.class);
    }

    /**
     * 是否数字类型, double,float,integer,long
     *
     * @param type 类类型
     * @return true / false
     */
    public static boolean isNumeric(Class<?> type) {

        List<Class<?>> classList = new ArrayList<>();

        classList.add(Double.class);
        classList.add(double.class);
        classList.add(Float.class);
        classList.add(float.class);
        classList.add(Short.class);
        classList.add(short.class);
        classList.add(Integer.class);
        classList.add(int.class);
        classList.add(Long.class);
        classList.add(long.class);

        for (Class<?> class1 : classList) {
            if (type.isAssignableFrom(class1)) {
                return true;
            }
        }
        return false;

    }

    /**
     * 是否日期类型,Calendar,Date两种类型
     *
     * @param type 类类型
     * @return true / false
     */
    public static boolean isDateTime(Class<?> type) {
        List<Class<?>> classList = new ArrayList<>();

        classList.add(Calendar.class);
        classList.add(Date.class);

        for (Class<?> class1 : classList) {
            if (type.isAssignableFrom(class1)) {
                return true;
            }
        }
        return false;
    }

    public static List<PropertyDescriptor> findPropertyDescriptorBySuperType(Class<?> pClass, Class<?> pSupperClass) {

        List<PropertyDescriptor> results = new ArrayList<>();

        Field[] declaredFields = pClass.getDeclaredFields();

        for (Field field : declaredFields) {

            PropertyDescriptor propertyDescriptor = ReflectUtils.getPropertyDescriptor(pClass, field.getName());

            Class<?> propertyType = propertyDescriptor.getPropertyType();
            Class<?> propertySuperClass = propertyType.getSuperclass();
            boolean isAssignableFrom = propertySuperClass != null && propertySuperClass.isAssignableFrom(pSupperClass)
                    && !propertySuperClass.isAssignableFrom(Object.class);

            if (isAssignableFrom) {
                results.add(propertyDescriptor);
            }
        }
        return results;
    }

    public static List<PropertyDescriptor> findPropertyDescriptorByType(Class<?> pClass, Class<?> type) {

        List<PropertyDescriptor> results = new ArrayList<>();

        Field[] declaredFields = pClass.getDeclaredFields();

        for (Field field : declaredFields) {

            PropertyDescriptor propertyDescriptor = ReflectUtils.getPropertyDescriptor(pClass, field.getName());

            Class<?> propertyType = propertyDescriptor.getPropertyType();
            boolean isAssignableFrom = propertyType != null && propertyType.isAssignableFrom(type)
                    && !propertyType.isAssignableFrom(Object.class);

            if (isAssignableFrom) {
                results.add(propertyDescriptor);
            }
        }
        return results;
    }

    /**
     * 获取类类型某属性的属性描述类型
     *
     * @param pBeanClass    类类型
     * @param pPropertyName 属性名称
     * @return 指定属性描述类型
     */
    public static PropertyDescriptor getPropertyDescriptor(Class<?> pBeanClass, String pPropertyName) {
        PropertyDescriptor propertyDescriptor = null;

        try {
            propertyDescriptor = new PropertyDescriptor(pPropertyName, pBeanClass);
        } catch (IntrospectionException e) {

            e.printStackTrace();
        }

        return propertyDescriptor;
    }

    /**
     * 获取类型中所有属性描述类型
     *
     * @param type
     * @return 所有属性描述类型
     */
    public static List<PropertyDescriptor> getPropertyDescriptors(Class<?> type) {
        List<PropertyDescriptor> propertyDescriptors = new ArrayList<>();
        Field[] fields = type.getDeclaredFields();
        for (Field field : fields) {
            String fieldName = field.getName();

            try {
                PropertyDescriptor propertyDescriptor = new PropertyDescriptor(fieldName, type);

                propertyDescriptors.add(propertyDescriptor);
            } catch (IntrospectionException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        return propertyDescriptors;
    }

    /**
     * 类类型中，某个属性是否属性指定类型
     *
     * @param pBeanClass    类类型
     * @param pPropertyName 属性名称
     * @param pFromClass    指定属性类型
     * @return true / false
     */
    public static boolean isPropertyTypeAssignableFrom(Class<?> pBeanClass, String pPropertyName, Class<?> pFromClass) {
        PropertyDescriptor propertyDescriptor = getPropertyDescriptor(pBeanClass, pPropertyName);
        if (propertyDescriptor == null) {
            return false;
        }
        Class<?> propertyType = propertyDescriptor.getPropertyType();
        return propertyType.isAssignableFrom(pFromClass);
    }

    /**
     * 类类型中，某个属性的父类型是否指定类型
     *
     * @param pBeanClass    类类型
     * @param pPropertyName 属性名称
     * @param pFromClass    指定属性类型
     * @return true / false
     */
    public static boolean isPropertySuperTypeAssignableFrom(Class<?> pBeanClass, String pPropertyName,
                                                            Class<?> pFromClass) {
        PropertyDescriptor propertyDescriptor = getPropertyDescriptor(pBeanClass, pPropertyName);
        if (propertyDescriptor == null) {
            return false;
        }
        Class<?> propertyType = propertyDescriptor.getPropertyType();
        return propertyType.getSuperclass().isAssignableFrom(pFromClass);
    }

    public static Field getDeclaredField(Class<?> pClass, String pField) {
        try {
            Field field = pClass.getDeclaredField(pField);
            return field;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 获取类类型某属性第index个泛型类型
     *
     * @param pBeanClass    类类型
     * @param pPropertyName 属性名称
     * @param index         第几个泛型
     * @return 泛型类型
     */
    public static Class<?> getPropertyGenericType(Class<?> pBeanClass, String pPropertyName, int index) {

        return getFieldGenericType(pBeanClass,pPropertyName,index);

    }

    /**
     * 获取泛型类类型的第index个泛型类型
     *
     * @param pClass 类类型
     * @param index  第几个泛型
     * @return 泛型类型
     */
    public static Class<?> getGenericSuperclassType(Class<?> pClass, int index) {
        Type genType = pClass.getGenericSuperclass();
        if (!(genType instanceof ParameterizedType)) {
            return Object.class;
        }
        Type[] params = ((ParameterizedType) genType).getActualTypeArguments();
        if (index >= params.length || index < 0) {
            throw new RuntimeException("Index outof bounds");
        }
        if (!(params[index] instanceof Class)) {
            return Object.class;
        }
        return (Class<?>) params[index];
    }
    /**
     * 获取泛型类类型的第index个泛型类型
     *
     * @param pClass 类类型
     * @param name   field name
     * @param index  第几个泛型
     * @return 泛型类型
     */
    public static Class<?> getFieldGenericType(Class<?> pClass, String name, int index) {
        Field[] fs = pClass.getDeclaredFields(); // 得到所有的fields

        for (Field f : fs) {
            if (!f.getName().equals(name)) continue;
            Class fieldClazz = f.getType(); // 得到field的class及类型全路径
            if (fieldClazz.isPrimitive()) continue;  //【1】 //判断是否为基本类型
            if (fieldClazz.getName().startsWith("java.lang")) continue; //getName()返回field的类型全路径；
            if (fieldClazz.isAssignableFrom(Iterable.class)) //【2】
            {
                Type fc = f.getGenericType(); // 关键的地方，如果是List类型，得到其Generic的类型

                if (fc == null) continue;

                if (fc instanceof ParameterizedType) // 【3】如果是泛型参数的类型
                {
                    ParameterizedType pt = (ParameterizedType) fc;

                    Class genericClazz = (Class) pt.getActualTypeArguments()[0]; //【4】 得到泛型里的class类型对象。

                    return genericClazz;
                }
            }
        }
        return null;
    }
    /**
     * 获取类类型里面有某一类型注解的所有字段
     *
     * @param type           类类型
     * @param annotationType 注解类型
     * @return 所有有某一类型注解的所有字段
     */

    public static List<Field> findDeclaredFields(Class<?> type, Class<Annotation> annotationType) {
        List<Field> result = new ArrayList<>();
        Field[] fields = type.getDeclaredFields();
        for (Field field : fields) {
            if (field.getAnnotation(annotationType) != null) {
                result.add(field);
            }
        }
        return result;
    }

    public static void setProperty(Object pBean, String pPropertyName, Object pValue)
            throws IllegalAccessException, InvocationTargetException {
        BeanUtils.setProperty(pBean, pPropertyName, pValue);
    }

    public static Object getProperty(Object pBean, String pPropertyName)
            throws IllegalAccessException, InvocationTargetException, NoSuchMethodException {
        return PropertyUtils.getProperty(pBean, pPropertyName);
    }

    public static Object getIndexedProperty(Object pBean, String pPropertyName, int pIndex)
            throws IllegalAccessException, InvocationTargetException, NoSuchMethodException {
        return PropertyUtils.getIndexedProperty(pBean, pPropertyName, pIndex);
    }
    /**
     * 获取对象所有属性
     *
     * @param bean
     * @return
     * @throws IllegalAccessException
     * @throws NoSuchMethodException
     * @throws InvocationTargetException
     */
    public static Map<String, Object> getProperties(Object bean) throws IllegalAccessException, NoSuchMethodException, InvocationTargetException {

        return getProperties(bean, null);
    }

    /**
     * 获取对象属性
     *
     * @param bean
     * @param includeProperties 获取属性的名称,null获取全部
     * @return
     * @throws IllegalAccessException
     * @throws NoSuchMethodException
     * @throws InvocationTargetException
     */
    public static Map<String, Object> getProperties(Object bean, List<String> includeProperties) throws IllegalAccessException, NoSuchMethodException, InvocationTargetException {

        Map<String, Object> map = new TreeMap<>();
        if (bean == null) return map;
        List<PropertyDescriptor> propertyDescriptors = ReflectUtils.getPropertyDescriptors(bean.getClass());
        for (PropertyDescriptor propertyDescriptor : propertyDescriptors) {
            String name = propertyDescriptor.getName();
            if (includeProperties != null && !includeProperties.contains(name)) {
                continue;
            }
            Object value = PropertyUtils.getProperty(bean, name);
            map.put(name, value);
        }
        return map;
    }
    /**
     * beanUtils.copyProperties复制相同名称属性
     *
     * @param dest
     * @param src
     */
    public static void copyBeanProperties(Object dest, Object src) {
        try {
            BeanUtils.copyProperties(dest, src);
        } catch (Exception e) {
            throw new ValidationException("对象转换失败", e);
        }
    }

    /**
     * beanUtils.copyProperties复制相同名称属性
     *
     * @param src
     * @param clz
     * @return
     */
    public static Object copyBeanProperties(Object src, Class clz) {
        try {
            Object dest = clz.newInstance();
            BeanUtils.copyProperties(dest, src);
            return dest;
        } catch (Exception e) {
            throw new ValidationException("对象转换失败", e);
        }
    }
    /**
     * 复制相同名称属性
     *
     * @param pDest 目標对象实例
     * @param pSrc  源对象实例
     */
    public static void copyProperties(Object pDest, Object pSrc) {
        try {
            PropertyUtils.copyProperties(pDest, pSrc);
        } catch (IllegalAccessException e) {
            throw new ValidationException("对象转换失败", e);
        } catch (InvocationTargetException e) {
            throw new ValidationException("对象转换失败", e);
        } catch (NoSuchMethodException e) {
            throw new ValidationException("对象转换失败", e);
        }
    }

    /**
     * 从复制源List对象实例,复制名称相同属性到新对象T实例
     * @param src
     * @param type
     * @param <T>
     * @return
     */
    public static <T,TSrc> List<T> copyListItemProperties(List<TSrc> src, Class<T> type) {
        List<T> results = new ArrayList<T>();
        if (src == null) return results;
        src.forEach(p -> {
            T item = copyProperties(p, type);
            results.add(item);
        });
        return results;
    }

    /**
     * 从复制源对象实例,复制名称相同属性到新对象T实例
     *
     * @param src  源对象实例
     * @param type 新对象T类型
     * @return 新对象T类型
     */
    public static <T> T copyProperties(Object src, Class<T> type) {
        T instance = null;
        try {
            instance = type.newInstance();
            copyProperties(instance, src);
        } catch (InstantiationException e) {
            throw new ValidationException("对象转换,创建目标对象失败", e);
        } catch (IllegalAccessException e) {
            throw new ValidationException("对象转换,创建目标对象失败", e);
        }
        return instance;
    }

    /**
     * 比较同一类型class,orig 中非NULL值的属性和dest不同的值到resultBean里面
     *
     * @param dest   要比较的BEAN
     * @param orig   原来BEAN
     * @param result 结果BEAN
     * @throws InvocationTargetException
     * @throws IllegalAccessException
     */
    public static void differBeanNotNullPropertyToOtherBean(Object dest, Object orig, Object result)
            throws IllegalAccessException, InvocationTargetException {
        // Validate existence of the specified beans
        if (dest == null) {
            throw new IllegalArgumentException("No destination bean specified");
        }
        if (orig == null) {
            throw new IllegalArgumentException("No origin bean specified");
        }
        if (result == null) {
            throw new IllegalArgumentException("No result bean specified");
        }

        if (!dest.getClass().toString().equals(orig.getClass().toString())) {
            throw new IllegalArgumentException("No same bean class");
        }
        if (orig instanceof Map) {
            throw new IllegalArgumentException("No support map");
        }

		/* if (orig is a standard JavaBean) */
        PropertyDescriptor origDescriptors[] = PropertyUtils.getPropertyDescriptors(orig);
        for (int i = 0; i < origDescriptors.length; i++) {
            String name = origDescriptors[i].getName();
            if ("class".equals(name)) {
                continue; // No point in trying to set an object's class
            }
            if (PropertyUtils.isReadable(orig, name) && PropertyUtils.isWriteable(dest, name)) {
                try {
                    Object value1 = PropertyUtils.getSimpleProperty(orig, name);
                    Object value2 = PropertyUtils.getSimpleProperty(dest, name);
                    if (value2 != null && !value2.equals(value1)) {
                        if (PropertyUtils.isReadable(result, name) && PropertyUtils.isWriteable(result, name)) {
                            BeanUtils.copyProperty(result, name, value2);
                        }
                    }
                } catch (NoSuchMethodException e) {
                }
            }
        }

    }

    /**
     * 从源对象orig中复制同名属性,并且属性值不为空的属性值到dest对象
     *
     * @param dest 目标对象实例
     * @param orig 源对象实例
     * @throws NoSuchMethodException
     * @throws InvocationTargetException
     * @throws IllegalAccessException
     */
    public static void copyOrigNotNullPropertyToDest(Object dest, Object orig)
            throws IllegalAccessException, InvocationTargetException, NoSuchMethodException {

		/* if (orig is a standard JavaBean) */
        PropertyDescriptor origDescriptors[] = PropertyUtils.getPropertyDescriptors(orig);
        for (int i = 0; i < origDescriptors.length; i++) {
            String name = origDescriptors[i].getName();
            if ("class".equals(name)) {
                continue; // No point in trying to set an object's class
            }
            if (PropertyUtils.isReadable(orig, name) && PropertyUtils.isWriteable(dest, name)) {

                Object value1 = PropertyUtils.getProperty(orig, name);
                if (value1 != null) {
                    if (PropertyUtils.isReadable(dest, name) && PropertyUtils.isWriteable(dest, name)) {
                        BeanUtils.copyProperty(dest, name, value1);
                    }
                }
            }
        }
    }

    /**
     * 当dest实例的属性值为空时,从src实例相同属性名称中复制属性值
     *
     * @param dest dest实例
     * @param src  src实例
     * @throws NoSuchMethodException
     * @throws InvocationTargetException
     * @throws IllegalAccessException
     */
    public static void copyDestPropertyIsNullFromSrc(Object dest, Object src)
            throws IllegalAccessException, InvocationTargetException, NoSuchMethodException {
        /* if (orig is a standard JavaBean) */
        PropertyDescriptor destDescriptors[] = PropertyUtils.getPropertyDescriptors(dest);
        for (int i = 0; i < destDescriptors.length; i++) {
            String name = destDescriptors[i].getName();
            if ("class".equals(name)) {
                continue; // No point in trying to set an object's class
            }
            if (PropertyUtils.isReadable(dest, name) && PropertyUtils.isWriteable(dest, name)) {

                Object destValue = PropertyUtils.getProperty(dest, name);
                if (destValue == null) {
                    if (PropertyUtils.isReadable(src, name) && PropertyUtils.isWriteable(src, name)) {
                        Object srcValue = PropertyUtils.getProperty(src, name);
                        if (srcValue != null) {
                            BeanUtils.setProperty(dest, name, srcValue);
                        }
                    }
                }

            }
        }
    }

    /**
     * 获取所有同名方法第一个方法全部参数名称
     *
     * @return 方法全部参数名称
     * @throws NotFoundException 打不到方法
     */
    public static String[] getMethodParameterNames(Class<?> clazz, String methodName) throws NotFoundException {

        ClassPool pool = ClassPool.getDefault();
        CtClass cc = pool.get(clazz.getName());
        CtMethod cm = cc.getDeclaredMethod(methodName);

        // 使用javaassist的反射方法获取方法的参数名
        MethodInfo methodInfo = cm.getMethodInfo();
        CodeAttribute codeAttribute = methodInfo.getCodeAttribute();
        LocalVariableAttribute attr = (LocalVariableAttribute) codeAttribute.getAttribute(LocalVariableAttribute.tag);
        if (attr == null) {
            throw new NotFoundException(MessageFormat.format("找不到方法:{0}", methodName));
        }

        String[] paramNames = new String[cm.getParameterTypes().length];
        int pos = Modifier.isStatic(cm.getModifiers()) ? 0 : 1;
        for (int i = 0; i < paramNames.length; i++) {
            paramNames[i] = attr.variableName(i + pos);
        }
        return paramNames;

    }

    /**
     * 获取所有同名方法中与实参数量相同,且所有实参类型相同的惟一的方法参数名称
     *
     * @param clazz      方法所属类型
     * @param methodName 方法名
     * @param realParams 方法调用的实参
     * @return 方法全部参数名称
     * @throws NotFoundException      找不到对应方法
     * @throws CannotCompileException 找到多个同名方法
     */
    public static String[] getMethodParameterNames(Class<?> clazz, String methodName, Object[] realParams)
            throws NotFoundException, CannotCompileException {
        ClassPool pool = ClassPool.getDefault();
        CtClass cc = pool.get(clazz.getName());
        CtMethod[] cm = cc.getDeclaredMethods(methodName);
        List<CtMethod> fiterCm = new ArrayList<>(cm.length);
        for (CtMethod method : cm) {
            CtClass[] paramTypes = method.getParameterTypes();
            if (paramTypes.length != realParams.length) {
                continue;
            }
            boolean isFined = true;
            for (int i = 0; i < paramTypes.length; i++) {
                CtClass paramType = paramTypes[0];
                Object realParam = realParams[0];
                if (realParam == null) {
                    isFined = false;
                    break;
                }
                CtClass realParamType = pool.get(realParam.getClass().getName());
                if (paramType.subtypeOf(realParamType) == false) {
                    isFined = false;
                    break;
                }
            }
            if (isFined) {
                fiterCm.add(method);
            }
        }
        if (fiterCm.size() > 1) {
            throw new CannotCompileException(
                    MessageFormat.format("找到多个同名,并且参数数目相同,参数类型无法区分的方法,方法名:{0}", methodName));
        }
        CtMethod method = fiterCm.get(0);
        // 使用javaassist的反射方法获取方法的参数名
        MethodInfo methodInfo = method.getMethodInfo();
        CodeAttribute codeAttribute = methodInfo.getCodeAttribute();
        LocalVariableAttribute attr = (LocalVariableAttribute) codeAttribute.getAttribute(LocalVariableAttribute.tag);
        if (attr == null) {
            throw new NotFoundException(MessageFormat.format("找不到方法:{0}", methodName));
        }

        String[] paramNames = new String[method.getParameterTypes().length];
        int pos = Modifier.isStatic(method.getModifiers()) ? 0 : 1;
        for (int i = 0; i < paramNames.length; i++) {
            paramNames[i] = attr.variableName(i + pos);
        }
        return paramNames;
    }

    public void test() {

    }

    public void test(Integer iI) {

    }

    public void test(int ii) {

    }

    public void test(String iS) {

    }
}
