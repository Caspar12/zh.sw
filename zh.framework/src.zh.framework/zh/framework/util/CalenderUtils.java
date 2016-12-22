package zh.framework.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Random;

public class CalenderUtils {

	/**
	 * 返回yyyy年MM月dd日 hh时mm分ss秒SSS毫秒
	 * 
	 * @return yyyy年MM月dd日 hh时mm分ss秒SSS毫秒
	 */
	public static String getCNCurrentyyyyMMddhhmmssSSS() {
		Calendar cal = Calendar.getInstance();
		java.util.Date date = cal.getTime();

		SimpleDateFormat sdFormat = new SimpleDateFormat("yyyy年MM月dd日 hh时mm分ss秒SSS毫秒");
		return sdFormat.format(date);
	}

	/**
	 * 返回yyyyMMddHHmmss + 5位随机数
	 * 
	 * @return yyyyMMddHHmmss + 5位随机数
	 */
	public static String getCalenderRandomFileName() {

		SimpleDateFormat simpleDateFormat;

		simpleDateFormat = new SimpleDateFormat("yyyyMMddHHmmss");

		Date date = new java.util.Date();

		String str = simpleDateFormat.format(date);

		Random random = new Random();

		int rannum = (int) (random.nextDouble() * (99999 - 10000 + 1)) + 10000;// 获取5位随机数

		return rannum + str;// 当前时间
	}

}
