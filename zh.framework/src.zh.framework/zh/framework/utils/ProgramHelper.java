package zh.framework.utils;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.AbstractMap;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.UUID;

import javax.imageio.ImageIO;

import org.apache.commons.lang3.StringUtils;

public class ProgramHelper {

	public static String UUIDString() {
		return UUID.randomUUID().toString();
	}

	public static <T> Boolean Contains(List<T> pList, T pFindItem) {

		if (pList == null) {
			return false;
		}

		for (T item : pList) {
			if (item.getClass().isAssignableFrom(String.class)) {
				String item_str = (String) item;
				String findItem_str = (String) pFindItem;
				if (item_str.equalsIgnoreCase(findItem_str)) {
					return true;
				}

			} else {
				if (item == pFindItem) {
					return true;
				}
			}
		}
		return false;
	}

	public static boolean isNullOrEmpty(String pStr) {
		return StringUtils.isEmpty(pStr);
	}

	public static boolean isNullOrEmpty(Collection<?> pCollection) {
		return pCollection == null || pCollection.isEmpty();
	}

	public static <E> List<E> copyTo(List<E> src) {
		List<E> arrayList = new ArrayList<>(src.size());
		Collections.copy(arrayList, src);
		return arrayList;
	}

	public static boolean isNullOrEmpty(Map<?, ?> pMap) {
		return pMap == null || pMap.size() == 0;
	}

	public static void whenLengthGtAddString(int pLength, String pAppendSeparator, String pAppendContent,
			StringBuilder pStringBuffer) {
		if (pStringBuffer.length() > pLength) {

			pStringBuffer.append(pAppendSeparator);
		}
		pStringBuffer.append(pAppendContent);
	}

	public static void whenLengthGtAddString(int pLength, String pAppendSeparator, Collection<String> pCollection,
			StringBuilder pStringBuffer) {
		if (pCollection != null) {
			for (String content : pCollection) {
				whenLengthGtAddString(pLength, pAppendSeparator, content, pStringBuffer);
			}
		}
	}

	public static String toFirstLower(String pString) {
		String firString = pString.substring(0, 1).toLowerCase();
		return firString + pString.substring(1, pString.length());
	}

	public static boolean isAssignableFrom(Class<?> pClass, Class<?> pIsAssignableFromClass) {
		return pClass.isAssignableFrom(pIsAssignableFromClass) && pClass != Object.class;
	}

	public static boolean isDebug() {
		return false;
	}

	public static Entry<Boolean, Double> tryToDouble(String pObject) {
		try {
			Double pOutValue = Double.valueOf(pObject);
			return new AbstractMap.SimpleEntry<>(true, pOutValue);
		} catch (Exception e) {
			return new AbstractMap.SimpleEntry<>(false, null);
		}
	}

	public static Entry<Boolean, Integer> tryToInteger(String pObject) {
		try {
			Integer pOutValue = Integer.valueOf(pObject);
			return new AbstractMap.SimpleEntry<>(true, pOutValue);
		} catch (Exception e) {
			return new AbstractMap.SimpleEntry<>(false, null);
		}
	}

	public static boolean isImage(File pFile) {
		try {
			BufferedImage image = ImageIO.read(pFile);
			if (image == null) {
				return false;
			}

			return true;
		} catch (IOException ex) {
			return false;
		}
	}

	/**
	 * 判断文件是否为图片<br>
	 * <br>
	 * 
	 * @param pInput
	 *            文件名<br>
	 * @param pImgeFlag
	 *            判断具体文件类型<br>
	 * @return 检查后的结果<br>
	 * @throws Exception
	 */
	public static boolean isImageByFileExt(String pInput, String pImgeFlag) throws Exception {
		// 文件名称为空的场合
		if (isNullOrEmpty(pInput)) {
			// 返回不和合法
			return false;
		}
		// 获得文件后缀名
		String tmpName = pInput.substring(pInput.lastIndexOf(".") + 1, pInput.length());
		// 声明图片后缀名数组
		String imgeArray[][] = { { "bmp", "0" }, { "dib", "1" }, { "gif", "2" }, { "jfif", "3" }, { "jpe", "4" },
				{ "jpeg", "5" }, { "jpg", "6" }, { "png", "7" }, { "tif", "8" }, { "tiff", "9" }, { "ico", "10" } };
		// 遍历名称数组
		for (int i = 0; i < imgeArray.length; i++) {
			// 判断单个类型文件的场合
			if (!isNullOrEmpty(pImgeFlag) && imgeArray[i][0].equals(tmpName.toLowerCase())
					&& imgeArray[i][1].equals(pImgeFlag)) {
				return true;
			}
			// 判断符合全部类型的场合
			if (isNullOrEmpty(pImgeFlag) && imgeArray[i][0].equals(tmpName.toLowerCase())) {
				return true;
			}
		}
		return false;
	}

	public static boolean isImageByFileExt(String pInput) throws Exception {
		return isImageByFileExt(pInput, null);
	}
}
