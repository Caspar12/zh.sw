package zh.framework.model;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2017/1/19
 * @description
 */
@Data

@ToString
public class GenericResponse<T> implements Serializable {
    private T data;
    private int code = 0;
    private String message;
    private boolean success = true;

    public static <T> GenericResponse<T> create(T data) {
        GenericResponse<T> res = new GenericResponse<T>();
        res.setData(data);
        return res;
    }
}
