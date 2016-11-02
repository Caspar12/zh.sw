package zh.ms.user.api.web.controllers;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.ConstraintViolationException;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import org.springframework.web.servlet.ModelAndView;

import zh.framework.models.ExecResult;
import zh.framework.utils.JsonUtils;

/**
 * @author 陈志杭
 * @qq 279397942@qq.com
 * @createdDate 2016年10月28日
 * @description 全局异常处理类
 */
@ControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(value = ConstraintViolationException.class)
	public ModelAndView jsonErrorHandler(HttpServletRequest req, HttpServletResponse response,
			ConstraintViolationException e) throws IOException {
		ExecResult<String> r = new ExecResult<>();

		r.setCode(Integer.MIN_VALUE);
		r.setData(null);
		r.setMessage(e.getConstraintViolations().iterator().next().getMessage());
		r.setSuccess(false);
		response.setContentType("application/json");
	    response.getWriter().write(JsonUtils.toJson(r));

		return null;
	}
}
