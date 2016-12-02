package zh.framework.exceptions;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author 陈志杭
 * @qq 279397942@qq.com
 * @createdDate 2016年12月2日
 * @description
 */
@EqualsAndHashCode(callSuper = false)
@Data
public class ValidationException extends javax.validation.ValidationException {

	private Integer code;
	/**
	 * 
	 */
	private static final long serialVersionUID = -3134099610951450142L;

	public ValidationException(String message) {
		super(message);
	}

	public ValidationException() {
		super();
	}

	public ValidationException(String message, Throwable cause) {
		super(message, cause);
	}

	public ValidationException(Throwable cause) {
		super(cause);
	}

	public ValidationException(String message, Integer code) {
		super(message);
		this.code = code;
	}

}
