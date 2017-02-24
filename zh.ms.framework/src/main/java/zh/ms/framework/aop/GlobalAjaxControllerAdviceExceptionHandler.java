package zh.ms.framework.aop;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;
import zh.framework.model.GenericResponse;
import zh.framework.util.ExceptionUtils;
import zh.framework.util.JsonUtils;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.ValidationException;
import java.io.IOException;
import java.util.*;

/**
 * @author 陈志杭
 * @qq 279397942@qq.com
 * @createdDate 2016年10月28日
 * @description 全局Ajax异常处理类
 */
@ControllerAdvice
@Slf4j
public class GlobalAjaxControllerAdviceExceptionHandler {

    static final int VALIDATION_EXCEPTION_CODE = -999999;

    @Resource
    HttpServletRequest request;
    @Resource
    HttpServletResponse response;

    @ExceptionHandler(value = ConstraintViolationException.class)
    public ModelAndView jsonErrorHandler(HttpServletRequest req, HttpServletResponse response,
                                         ConstraintViolationException e) throws IOException {
        GenericResponse<List<String>> r = new GenericResponse<>();
        List<String> allMessages = new ArrayList<>();
        Set<ConstraintViolation<?>> constraintViolationExceptions = ((ConstraintViolationException) e)
                .getConstraintViolations();

        Iterator<ConstraintViolation<?>> iterator = constraintViolationExceptions.iterator();

        while (iterator.hasNext()) {
            ConstraintViolation<?> constraintViolation = iterator.next();
            allMessages.add(constraintViolation.getMessage());
        }
        if (allMessages.size() > 0) {
            r.setMessage(allMessages.get(0));
        }
        r.setCode(VALIDATION_EXCEPTION_CODE);
        r.setData(allMessages);
        r.setSuccess(false);
        log.info("{},{}", e.getMessage(), ExceptionUtils.getAsString(e));
        return toJsonResult(r);
    }

    @ExceptionHandler(value = ValidationException.class)
    public ModelAndView jsonErrorHandlerValidationException(HttpServletRequest req, HttpServletResponse response,
                                                            ValidationException e) throws IOException {
        GenericResponse<String> r = new GenericResponse<>();
        r.setCode(VALIDATION_EXCEPTION_CODE);
        r.setMessage(e.getMessage());
        r.setSuccess(false);
        log.debug("{},{}", e.getMessage(), ExceptionUtils.getAsString(e));
        return toJsonResult(r);
    }

    @ExceptionHandler(value = HttpMessageNotReadableException.class)
    public ModelAndView httpMessageNotReadableException(HttpServletRequest req, HttpServletResponse response,
                                                        HttpMessageNotReadableException e) throws IOException {
        if (e.getCause() != null && e.getCause().getCause() != null && e.getCause().getCause() instanceof zh.framework.exceptions.ValidationException) {
            return jsonErrorHandlerValidationException(req, response, (zh.framework.exceptions.ValidationException) e.getCause().getCause());
        } else {
            return exceptionHandler(req, response, e);
        }
    }

    @ExceptionHandler(value = zh.framework.exceptions.ValidationException.class)
    public ModelAndView jsonErrorHandlerValidationException(HttpServletRequest req, HttpServletResponse response,
                                                            zh.framework.exceptions.ValidationException e) throws IOException {
        GenericResponse<Object> r = new GenericResponse<>();
        r.setCode(e.getCode() == 0 ? VALIDATION_EXCEPTION_CODE : e.getCode());
        r.setMessage(e.getMessage());
        r.setSuccess(false);
        r.setData(e.getData());
        log.debug("{},{}", e.getMessage(), ExceptionUtils.getAsString(e));
        return toJsonResult(r);
    }

    @ExceptionHandler(value = org.springframework.validation.BindException.class)
    public ModelAndView bindExceptionHandler(HttpServletRequest req, HttpServletResponse response, org.springframework.validation.BindException e) throws IOException {
        GenericResponse<Map<String, String>> r = new GenericResponse<>();
        Map<String, String> allErrors = new HashMap<>();
        e.getFieldErrors().forEach(p -> {
            allErrors.put(p.getField(), p.getDefaultMessage());
        });
        r.setCode(VALIDATION_EXCEPTION_CODE);
        r.setMessage(e.getFieldError().getDefaultMessage());
        r.setData(allErrors);
        r.setSuccess(false);
        log.info("{}", ExceptionUtils.getAsString(e));
        return toJsonResult(r);
    }

    @ExceptionHandler(value = org.springframework.web.bind.MethodArgumentNotValidException.class)
    public ModelAndView methodArgumentNotValidExceptionHandler(HttpServletRequest req, HttpServletResponse response, org.springframework.web.bind.MethodArgumentNotValidException e) throws IOException {
        GenericResponse<Map<String, String>> r = new GenericResponse<>();
        Map<String, String> allErrors = new HashMap<>();
        e.getBindingResult().getFieldErrors().forEach(p -> {
            allErrors.put(p.getField(), p.getDefaultMessage());
        });
        r.setCode(VALIDATION_EXCEPTION_CODE);
        r.setMessage(e.getBindingResult().getFieldError().getDefaultMessage());
        r.setData(allErrors);
        r.setSuccess(false);
        log.info("{}", ExceptionUtils.getAsString(e));
        return toJsonResult(r);
    }

    @ExceptionHandler(value = Exception.class)
    public ModelAndView exceptionHandler(HttpServletRequest req, HttpServletResponse response, Exception e)
            throws IOException {
        GenericResponse<Map<String, String>> r = new GenericResponse<>();
        r.setMessage("业务异常,请稍候重试");
        r.setSuccess(false);
        r.setCode(Integer.MIN_VALUE);
        r.setData(null);
        log.error("{}", ExceptionUtils.getAsString(e));
        return toJsonResult(r);
    }

    private ModelAndView toJsonResult(GenericResponse<?> execResult) throws IOException {
        response.reset();
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
        response.getWriter().write(JsonUtils.toJson(execResult));
        return null;
    }

}
