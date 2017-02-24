package zh.framework.util;

import org.apache.commons.lang3.StringUtils;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

/**
 * User: qiujingwang
 * Date: 16-3-20
 * Time: 下午4:44
 * 创建日期操作类
 */
public abstract class DateUtils {

    public static final String HMS = "HHmmss";
    public static final String YM = "yyyyMM";
    public static final String YMD = "yyyyMMdd";
    public static final String YMDHM = "yyyyMMddHHmm";
    public static final String YMDHMS = "yyyyMMddHHmmss";
    public static final String YYMMDDHHMMSSSSS = "yyMMddHHmmssSSS";

    public static final String H_M = "HH:mm";
    public static final String H_M_S = "HH:mm:ss";
    public static final String Y_M_D = "yyyy-MM-dd";
    public static final String Y_M_D_HM = "yyyy-MM-dd HH:mm";
    public static final String Y_M_D_HMS = "yyyy-MM-dd HH:mm:ss";

    private final static DateTimeFormatter DATE_FORMAT = DateTimeFormat.forPattern(YMD); //yyyyMMdd
    private final static DateTimeFormatter TIME_FORMAT = DateTimeFormat.forPattern(YMDHMS); //yyyyMMddHHmmss
    private final static DateTimeFormatter YM_FORMAT = DateTimeFormat.forPattern(YM); //yyyyMM

    /**
     * 描述：根据某个月(格式yyyyMM)获取其下一个月(yyyyMM)
     */
    public static String getNextYearMonth(String yearMonth) {
        return YM_FORMAT.print(YM_FORMAT.parseDateTime(yearMonth).plusMonths(1));
    }

    /**
     * 描述：根据某个月(格式yyyyMM)获取其上一个月(yyyyMM)
     */
    public static String getPrevYearMonth(String yearMonth) {
        return YM_FORMAT.print(YM_FORMAT.parseDateTime(yearMonth).plusMonths(-1));
    }


    public static Date getNowDate() {
        return new Date();
    }

    public static String formatDate(Date date, String pattern) {
        if (date != null) {
            if (StringUtils.isEmpty(pattern)) {
                pattern = Y_M_D;
            }
            final DateTimeFormatter formatter = DateTimeFormat.forPattern(pattern);
            return formatter.print(new DateTime(date.getTime()));
        }
        return "";
    }

    // 获取当前时间
    public static String getNowTimeYYYYMMddHHMMSS() {
        return TIME_FORMAT.print(DateTime.now());
    }

    // 获取当前时间
    public static String getNowTimeYYYYMMddHHMM() {
        return DateTimeFormat.forPattern(YMDHMS).print(DateTime.now());
    }

    // 获取当前日期
    public static String getNowDateYYYYMMdd() {
        return DATE_FORMAT.print(DateTime.now());
    }

    // 获取当前日期
    public static String getNowDateYYYYMM() {
        return DateTimeFormat.forPattern(YM).print(DateTime.now());
    }

    /**
     * 格式化 字符串日期
     *
     * @param src           原字符串日期
     * @param srcPattern    原日期格式
     * @param targetPattern 返回的日期的格式
     * @return 返回日期
     */
    public static String formatDateYYYYMMdd(String src, String srcPattern, String targetPattern) {
        DateTimeFormatter srcFormatter = DateTimeFormat.forPattern(srcPattern);
        DateTimeFormatter targetFormatter = DateTimeFormat.forPattern(targetPattern);

        return targetFormatter.print(srcFormatter.parseDateTime(src));
    }

    /**
     * 智能转换日期
     *
     * @param date
     * @return
     */
    public static String smartFormat(Date date) {
        String dateStr = null;
        if (date == null) {
            dateStr = "";
        } else {
            try {
                dateStr = formatDate(date, Y_M_D_HMS);
                //时分秒
                if (dateStr.endsWith(" 00:00:00")) {
                    dateStr = dateStr.substring(0, 10);
                }
                //时分
                else if (dateStr.endsWith("00:00")) {
                    dateStr = dateStr.substring(0, 16);
                }
                //秒
                else if (dateStr.endsWith(":00")) {
                    dateStr = dateStr.substring(0, 16);
                }
            } catch (Exception ex) {
                throw new IllegalArgumentException("转换日期失败: " + ex.getMessage(), ex);
            }
        }
        return dateStr;
    }

    /**
     * 智能转换日期
     *
     * @param text
     * @return
     */
    public static Date smartFormat(String text) {
        Date date = null;
        try {
            if (text == null || text.length() == 0) {
                date = null;
            } else if (text.length() == 10) {
                date = smartFormatStringToDate(text, Y_M_D);
            } else if (text.length() == 13) {
                date = new Date(Long.parseLong(text));
            } else if (text.length() == 16) {
                date = smartFormatStringToDate(text, Y_M_D_HM);
            } else if (text.length() == 19) {
                date = smartFormatStringToDate(text, Y_M_D_HMS);
            } else {
                throw new IllegalArgumentException("日期长度不符合要求!");
            }
        } catch (Exception e) {
            throw new IllegalArgumentException("日期转换失败!");
        }
        return date;
    }

    /**
     * 获取当前日期
     *
     * @param format
     * @return
     */
    public static String getNow(String format) {
        return formatDate(new Date(), format);
    }


    /**
     * (智能)把字符串格式化成日期
     *
     * @param argDateStr
     * @param argFormat
     * @return
     */
    public static Date smartFormatStringToDate(String argDateStr, String argFormat) throws Exception {
        if (argDateStr == null || argDateStr.trim().length() < 1) {
            return null;
        }
        String strFormat = argFormat;
        if (StringUtils.isEmpty(strFormat)) {
            strFormat = Y_M_D;
            if (argDateStr.length() > 16) {
                strFormat = Y_M_D_HMS;
            } else if (argDateStr.length() > 10) {
                strFormat = Y_M_D_HM;
            }
        }
        SimpleDateFormat sdfFormat = new SimpleDateFormat(strFormat);
        //严格模式
        sdfFormat.setLenient(false);
        try {
            return sdfFormat.parse(argDateStr);
        } catch (ParseException e) {
            throw new Exception(e);
        }
    }

    /**
     * 把字符串格式化成日期
     *
     * @param str
     * @param srcPattern
     * @return
     * @throws ParseException
     */
    public static Date formatDate(String str, String srcPattern) throws ParseException {
        if (StringUtils.trimToNull(str) == null) {
            return null;
        }

        SimpleDateFormat df = new SimpleDateFormat(srcPattern);
        Date date = df.parse(str);
        return date;
    }

    /**
     * 获取明天日期
     *
     * @return 格式 yyyy-MM-dd
     */
    public static String getNextDay() {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.DATE, calendar.get(Calendar.DATE) + 1);
        return formatDate(calendar.getTime(), null);
    }

    /**
     * 获取当前日期的上一周星期一的日期。注意只返回yyyy-MM-dd格式的数据。
     *
     * @return
     */
    public static String getMondayDateForLastWeek() {
        Calendar cal = Calendar.getInstance();
        // n为推迟的周数，1本周，-1向前推迟一周，2下周，依次类推
        int n = -1;
        cal.setFirstDayOfWeek(Calendar.MONDAY);
        cal.add(Calendar.DATE, n * 7);
        // 想周几，这里就传几Calendar.MONDAY（TUESDAY...）
        cal.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
        return new SimpleDateFormat("yyyy-MM-dd").format(cal.getTime());
    }

    /**
     * 获取当前日期的上一周星期日的日期。注意只返回yyyy-MM-dd格式的数据。
     *
     * @return
     */
    public static String getSundayDateForLastWeek() {
        Calendar cal = Calendar.getInstance();
        // n为推迟的周数，1本周，-1向前推迟一周，2下周，依次类推
        int n = -1;
        cal.setFirstDayOfWeek(Calendar.MONDAY);
        cal.add(Calendar.DATE, n * 7);
        // 想周几，这里就传几Calendar.MONDAY（TUESDAY...）
        cal.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
        return new SimpleDateFormat("yyyy-MM-dd").format(cal.getTime());
    }

    public static String getLastDayOfMonth(String year, String month) {
        Calendar cal = Calendar.getInstance();
        // 年
        cal.set(Calendar.YEAR, Integer.parseInt(year));
        // 月，因为Calendar里的月是从0开始，所以要-1
        cal.set(Calendar.MONTH, Integer.parseInt(month) - 1);
        // 日，设为一号
        cal.set(Calendar.DATE, 1);
        // 月份加一，得到下个月的一号
        cal.add(Calendar.MONTH, 1);
        // 下一个月减一为本月最后一天
        cal.add(Calendar.DATE, -1);
        return String.valueOf(cal.get(Calendar.DAY_OF_MONTH));// 获得月末是几号
    }

    /**
     * 取得指定日期所在周的第一天
     */
    public static Date getFirstDayOfWeek(Date date) {
        Calendar c = new GregorianCalendar();
        c.setFirstDayOfWeek(Calendar.MONDAY);
        c.setTime(date);
        c.set(Calendar.DAY_OF_WEEK, c.getFirstDayOfWeek()); // Monday
        return c.getTime();
    }

    /**
     * 取得指定日期所在周的最后一天
     */
    public static Date getLastDayOfWeek(Date date) {
        Calendar c = new GregorianCalendar();
        c.setFirstDayOfWeek(Calendar.MONDAY);
        c.setTime(date);
        c.set(Calendar.DAY_OF_WEEK, c.getFirstDayOfWeek() + 6); // Sunday
        return c.getTime();
    }

    /**
     * 获取指定日期在当年中的所在周数。
     *
     * @param dateStr 年月日 时分秒。
     */
    public static int getWeekOfYearByDate(String dateStr) {
        Calendar calendar = Calendar.getInstance();// new GregorianCalendar();
        Date date = null;
        try {
            date = DateUtils.formatDate(dateStr,
                    DateUtils.Y_M_D_HMS);
            calendar.setTime(date);
        } catch (ParseException e) {
            throw new RuntimeException("DateUtils.getWeekOfYearByDate():" + e.getMessage());
        }
        return calendar.get(Calendar.WEEK_OF_YEAR);
    }

    /**
     * 将指定格式的字符串转换成日期类型
     *
     * @param dateStr    待转换的日期字符串
     * @param dateFormat 日期格式字符串
     * @return Date
     */
    public static Date convertStrToDate(String dateStr, String dateFormat) {
        if (dateStr == null || dateStr.equals("")) {
            return null;
        }
        SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
        try {
            return sdf.parse(dateStr);
        } catch (Exception e) {
            throw new RuntimeException("DateUtils.convertStrToDate():" + e.getMessage());
        }
    }

    /**
     * 计算两个日期之间的相隔的天数
     *
     * @param startdate
     * @param enddate
     * @return
     */
    public static long dateDiffDay(Date startdate, Date enddate) {
        return timeDiff("dd", startdate, enddate);
    }

    /**
     * 计算两个日期之间的相隔的月(近似值，按一月30天计算，忽略闰年和闰月的差别)
     *
     * @param startdate
     * @param enddate
     * @return
     */
    public static long dateDiffMonth(Date startdate, Date enddate) {
        return timeDiff("MM", startdate, enddate);
    }

    /**
     * 计算两个日期之间的相隔的年(近似值，按一年365天计算，忽略闰年和闰月的差别)
     *
     * @param startdate
     * @param enddate
     * @return
     */
    public static long dateDiffYear(Date startdate, Date enddate) {
        return timeDiff("yy", startdate, enddate);
    }

    /**
     * 计算两个日期之间的相隔的年、月、日。注意：只有计算相隔天数是准确的，相隔年和月都是 近似值，按一年365天，一月30天计算，忽略闰年和闰月的差别。
     *
     * @param datepart  两位的格式字符串，yy表示年，MM表示月，dd表示日
     * @param startdate 开始日期
     * @param enddate   结束日期
     * @return long 如果enddate>startdate，返回一个大于0的实数，否则返回一个小于等于0的实数
     */
    private static long dateDiff(String datepart, Date startdate, Date enddate) {
        if (datepart == null || datepart.equals("")) {
            throw new IllegalArgumentException("DateUtils.dateDiff()方法非法参数值："
                    + datepart);
        }

        long days = (enddate.getTime() - startdate.getTime())
                / (60 * 60 * 24 * 1000);

        if (datepart.equals("yy")) {
            days = days / 365;
        } else if (datepart.equals("MM")) {
            days = days / 30;
        } else if (datepart.equals("dd")) {
            return days;
        } else {
            throw new IllegalArgumentException("DateUtils.dateDiff()方法非法参数值："
                    + datepart);
        }
        return days;
    }

    /**
     * 计算两个日期之间的相隔的秒
     *
     * @param startdate
     * @param enddate
     * @return
     */
    public static long timeDiffSeconds(Date startdate, Date enddate) {
        return timeDiff("ss", startdate, enddate);
    }

    /**
     * 计算两个日期之间的相隔的分
     *
     * @param startdate
     * @param enddate
     * @return
     */
    public static long timeDiffMinute(Date startdate, Date enddate) {
        return timeDiff("mm", startdate, enddate);
    }

    /**
     * 计算两个日期之间的相隔的时
     *
     * @param startdate
     * @param enddate
     * @return
     */
    public static long timeDiffHour(Date startdate, Date enddate) {
        return timeDiff("HH", startdate, enddate);
    }

    /**
     * 计算两个日期之间的相隔的时、分、秒
     *
     * @param timepart  两位的格式字符串，HH表示时，mm表示分，ss表示秒
     * @param startdate 开始日期
     * @param enddate   结束日期
     * @return long 如果enddate>startdate，返回一个大于0的实数，否则返回一个小于等于0的实数
     */
    private static long timeDiff(String timepart, Date startdate, Date enddate) {
        if (timepart == null || timepart.equals("")) {
            throw new IllegalArgumentException("DateUtils.timeDiff()方法非法参数值："
                    + timepart);
        }

        long times = (enddate.getTime() - startdate.getTime())
                / 1000;

        if (timepart.equals("HH")) {
            times = times / 3600;
        } else if (timepart.equals("mm")) {
            times = times / 60;
        } else if (timepart.equals("ss")) {
            return times;
        } else {
            throw new IllegalArgumentException("DateUtils.timeDiff()方法非法参数值："
                    + timepart);
        }
        return times;
    }

    /**
     * 把日期对象加减年、月、日后得到新的日期对象
     *
     * @param datepart 年、月、日
     * @param number   如果是 减就 -1
     *                 加减因子
     * @param date     需要加减年、月、日的日期对象
     * @return Date 新的日期对象
     */
    public static Date addDate(String datepart, int number, Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        if (datepart.equals("yy")) {
            cal.add(Calendar.YEAR, number);
        } else if (datepart.equals("MM")) {
            cal.add(Calendar.MONTH, number);
        } else if (datepart.equals("dd")) {
            cal.add(Calendar.DATE, number);
        } else if (datepart.equals("HH")) {
            cal.add(Calendar.HOUR, number);
        } else {
            throw new IllegalArgumentException("DateUtils.addDate()方法非法参数值：" + datepart);
        }

        return cal.getTime();
    }

    /**
     * 传入年和月，获取指定年月的最后一天
     *
     * @param year
     * @param month
     * @return
     */
    public static String getLastDayOfMonth(int year, int month) {
        Calendar cal = Calendar.getInstance();
        //设置年份
        cal.set(Calendar.YEAR, year);
        //设置月份
        cal.set(Calendar.MONTH, month - 1);
        //获取某月最大天数
        int lastDay = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
        //设置日历中月份的最大天数
        cal.set(Calendar.DAY_OF_MONTH, lastDay);
        //格式化日期
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String lastDayOfMonth = sdf.format(cal.getTime());
        return lastDayOfMonth;
    }

    /**
     * 获取过去的天数
     *
     * @param date
     * @return
     */
    public static long pastDays(Date date) {
        long t = new Date().getTime() - date.getTime();
        return t / (24 * 60 * 60 * 1000);
    }

    /**
     * 获取过去的小时
     *
     * @param date
     * @return
     */
    public static long pastHour(Date date) {
        long t = new Date().getTime() - date.getTime();
        return t / (60 * 60 * 1000);
    }

    /**
     * 获取过去的分钟
     *
     * @param date
     * @return
     */
    public static long pastMinutes(Date date) {
        long t = new Date().getTime() - date.getTime();
        return t / (60 * 1000);
    }

    /**
     * 转换为时间（天,时:分:秒.毫秒）
     *
     * @param timeMillis
     * @return
     */
    public static String formatDateTime(long timeMillis) {
        long day = timeMillis / (24 * 60 * 60 * 1000);
        long hour = (timeMillis / (60 * 60 * 1000) - day * 24);
        long min = ((timeMillis / (60 * 1000)) - day * 24 * 60 - hour * 60);
        long s = (timeMillis / 1000 - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60);
        long sss = (timeMillis - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000 - min * 60 * 1000 - s * 1000);
        return (day > 0 ? day + "," : "") + hour + ":" + min + ":" + s + "." + sss;
    }

    /**
     * 获取两个日期之间的天数
     *
     * @param before
     * @param after
     * @return
     */
    public static long getDistanceOfTwoDate(Date before, Date after) {
        long beforeTime = before.getTime();
        long afterTime = after.getTime();
        return (afterTime - beforeTime) / (1000 * 60 * 60 * 24);
    }

    /**
     * 得到系统当前时间的Timestamp对象
     *
     * @return 系统当前时间的Timestamp对象
     */
    public static Timestamp getCurrTimestamp() {
        return new Timestamp(System.currentTimeMillis());
    }

    /**
     * 获取当前unix时间的毫秒数。
     *
     * @return
     * @version 1.0
     * @data 2013-8-9 上午9:50:43
     */
    public static long getCurrentTimeMillis() {
        return getCurrTimestamp().getTime();
    }

    /**
     * 获取当前unix时间的秒数。
     *
     * @return
     * @version 1.0
     * @data 2013-8-9 上午9:50:43
     */
    public static long getCurrentUnixTimeSecond() {
        return getCurrTimestamp().getTime() / 1000;
    }
}
