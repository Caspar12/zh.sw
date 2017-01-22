package zh.framework.util;

/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2017/1/19
 * @description
 */
public class ByteUtils {
    /**
     * MB字节转B字节
     *
     * @param mbSize MB字节数
     * @return 字节数
     */
    public static long convertMByteToByte(long mbSize) {
        return convertKByteToByte(convertMByteToKByte(mbSize));
    }

       /**
     * KB字节转B字节
     *
     * @param kbSize KB字节数
     * @return 字节数
     */
       public static long convertKByteToByte(long kbSize) {
        return kbSize / 1024;
    }

    /**
     * MB字节转KB字节
     *
     * @param mbSize MB字节数
     * @return KB字节数
     */
    public static long convertMByteToKByte(long mbSize) {
        return mbSize / 1024;
    }
}
