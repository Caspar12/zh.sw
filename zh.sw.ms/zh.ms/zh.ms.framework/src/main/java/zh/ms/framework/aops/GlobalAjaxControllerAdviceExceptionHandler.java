package zh.ms.framework.aops;

import java.io.IOException;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javassist.CannotCompileException;
import javassist.NotFoundException;
import zh.framework.models.ExecResult;
import zh.framework.utils.JsonUtils;
import zh.framework.utils.LogUtils;
import zh.framework.utils.ReflectUtils;

/**
 * @author 陈志杭
 * @qq 279397942@qq.com
 * @createdDate 2016年10月28日
 * @description 全局Ajax异常处理类
 */
@ControllerAdvice(annotations = { RestController.class })
public class GlobalAjaxControllerAdviceExceptionHandler {
	@Resource
	HttpServletRequest request;
	@Resource
	HttpServletResponse response;

	@ExceptionHandler(value = ConstraintViolationException.class)
	public ModelAndView jsonErrorHandler(HttpServletRequest req, HttpServletResponse response,
			ConstraintViolationException e) throws IOException {
		ExecResult<Map<String, String>> r = new ExecResult<>();
		Map<String, String> map = new LinkedHashMap<>();
		Set<ConstraintViolation<?>> constraintViolationExceptions = ((ConstraintViolationException) e)
				.getConstraintViolations();

		Iterator<ConstraintViolation<?>> iterator = constraintViolationExceptions.iterator();
		String[] paramNames = null;
		String methodName = null;
		while (iterator.hasNext()) {

			ConstraintViolation<?> constraintViolation = iterator.next();

			if (StringUtils.isBlank(r.getMessage())) {
				r.setMessage(constraintViolation.getMessage());
			}
			String key = constraintViolation.getPropertyPath().toString();
			String value = constraintViolation.getMessage();
			if (constraintViolation.getExecutableParameters() != null) {
				if (paramNames == null) {
					Class<?> methodOfClass = constraintViolation.getRootBeanClass();
					methodName = key.split("\\.")[0];
					try {
						paramNames = ReflectUtils.getMethodParameterNames(methodOfClass, methodName,
								constraintViolation.getExecutableParameters());
					} catch (NotFoundException | CannotCompileException e1) {
						e1.printStackTrace();
						if (LogUtils.getDefaultLogger().isErrorEnabled()) {
							LogUtils.getDefaultLogger().error(this.getClass().getName(), e1);
						}
					}
				}
				if (paramNames != null) {

					String index_str = key.split("\\.")[1].replaceAll("arg", "");
					Integer index = Integer.valueOf(index_str);
					key = paramNames[index];
				}
			}
			map.put(key, value);
		}
		r.setCode(Integer.MIN_VALUE);
		r.setData(map);
		r.setSuccess(false);
		return toJsonResult(r);
	}

	@ExceptionHandler(value = Exception.class)
	public ModelAndView exceptionHandler(HttpServletRequest req, HttpServletResponse response, Exception e)
			throws IOException {
		ExecResult<Map<String, String>> r = new ExecResult<>();
		r.setMessage(e.getMessage());
		r.setSuccess(false);
		r.setCode(Integer.MIN_VALUE);
		r.setData(null);
		return toJsonResult(r);
	}

	private ModelAndView toJsonResult(ExecResult<?> execResult) throws IOException {
		response.setContentType("application/json");
		response.getWriter().write(JsonUtils.toJson(execResult));
		return null;
	}

}
