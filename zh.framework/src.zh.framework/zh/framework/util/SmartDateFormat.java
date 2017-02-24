package zh.framework.util;

import java.text.FieldPosition;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: qiujingwang
 * Date: 2016-3-13
 * Description:处理json时间转换
 */
public class SmartDateFormat extends SimpleDateFormat {
    @Override
    public StringBuffer format(Date date, StringBuffer toAppendTo, FieldPosition pos) {
        return new StringBuffer(DateUtils.smartFormat(date));
    }

    @Override
    public Date parse(String text) throws ParseException {
        return DateUtils.smartFormat(text);
    }

}
