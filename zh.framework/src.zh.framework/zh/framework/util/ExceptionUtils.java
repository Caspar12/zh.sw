package zh.framework.util;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


public abstract class ExceptionUtils {

    public static Throwable getRootCause(Throwable throwable) {
        Throwable cause;
        while ((cause = throwable.getCause()) != null) {
            throwable = cause;
        }
        return throwable;
    }

    public static List<Throwable> getCausalChain(Throwable throwable) {
        List<Throwable> causes = new ArrayList<Throwable>(4);
        while (throwable != null) {
            causes.add(throwable);
            throwable = throwable.getCause();
        }
        return Collections.unmodifiableList(causes);
    }

    public static String getAsString(Throwable throwable) {
        StringWriter stringWriter = new StringWriter(50);
        throwable.printStackTrace(new PrintWriter(stringWriter));
        return stringWriter.toString();
    }

}