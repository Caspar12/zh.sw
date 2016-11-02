package zh.framework.utils;

import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.io.File;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.Date;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.PropertyUtils;

public class ReflectUtils {

	/**
	 * 查询类型所在的文件名
	 * 
	 * @param pClass
	 *            类类型
	 * @return
	 * @throws UnsupportedEncodingException
	 *             文件路径转码失败
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
	 * @param type
	 *            类类型
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
	 * @param type
	 *            类类型
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
	 * @param pBeanClass
	 *            类类型
	 * @param pPropertyName
	 *            属性名称
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
	 * @param pBeanClass
	 *            类类型
	 * @param pPropertyName
	 *            属性名称
	 * @param pFromClass
	 *            指定属性类型
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
	 * @param pBeanClass
	 *            类类型
	 * @param pPropertyName
	 *            属性名称
	 * @param pFromClass
	 *            指定属性类型
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
	 * @param pBeanClass
	 *            类类型
	 * @param pPropertyName
	 *            属性名称
	 * @param index
	 *            第几个泛型
	 * @return 泛型类型
	 */
	public static Class<?> getPropertyGenericType(Class<?> pBeanClass, String pPropertyName, int index) {

		PropertyDescriptor propertyDescriptor = getPropertyDescriptor(pBeanClass, pPropertyName);

		return getGenericType(propertyDescriptor.getPropertyType(), index);

	}

	/**
	 * 获取类类型第index个泛型类型
	 * 
	 * @param pBeanClass
	 *            类类型
	 * @param index
	 *            第几个泛型
	 * @return 泛型类型
	 */
	public static Class<?> getGenericType(Class<?> pClass, int index) {
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
	 * 获取类类型里面有某一类型注解的所有字段
	 * 
	 * @param type
	 *            类类型
	 * @param annotationType
	 *            注解类型
	 * @return 所有有某一类型注解的所有字段
	 */
	@SuppressWarnings("unchecked")
	public static List<Field> findDeclaredFields(Class<?> type, Class annotationType) {
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
	 * 复制相同名称属性
	 * 
	 * @param pDest
	 *            目標对象实例
	 * @param pSrc
	 *            源对象实例
	 * @throws IllegalAccessException
	 * @throws InvocationTargetException
	 */
	public static void copyProperties(Object pDest, Object pSrc)
			throws IllegalAccessException, InvocationTargetException {
		BeanUtils.copyProperties(pDest, pSrc);
	}

	/**
	 * 从复制源对象实例,复制名称相同属性到新对象T实例
	 * 
	 * @param src
	 *            源对象实例
	 * @param type
	 *            新对象T类型
	 * @return 新对象T类型
	 * @throws InstantiationException
	 * @throws IllegalAccessException
	 * @throws InvocationTargetException
	 */
	public static <T> T copyProperties(Object src, Class<T> type)
			throws InstantiationException, IllegalAccessException, InvocationTargetException {
		T instance = type.newInstance();
		BeanUtils.copyProperties(instance, src);
		return instance;
	}

	/**
	 * 比较同一类型class,orig 中非NULL值的属性和dest不同的值到resultBean里面
	 * 
	 * @param dest
	 *            要比较的BEAN
	 * @param orig
	 *            原来BEAN
	 * @param result
	 *            结果BEAN
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
	 * @param dest
	 *            目标对象实例
	 * @param orig
	 *            源对象实例
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
	 * @param dest
	 *            dest实例
	 * @param src
	 *            src实例
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
}
