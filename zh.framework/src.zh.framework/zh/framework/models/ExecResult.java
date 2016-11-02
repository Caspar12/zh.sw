package zh.framework.models;

public class ExecResult<T> {
	public ExecResult() {
		this.success = true;
		this.message = "";
		this.code = 0;
	}

	boolean success;
	String message;
	int code;
	T data;

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}
}
