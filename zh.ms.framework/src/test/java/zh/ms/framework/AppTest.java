package zh.ms.framework;

import lombok.Data;
import lombok.ToString;
import org.apache.commons.beanutils.PropertyUtils;

import java.lang.reflect.InvocationTargetException;
import java.util.Date;

/**
 * Unit test for simple App.
 */
public class AppTest {
    @org.junit.Test
    public void a() throws IllegalAccessException, NoSuchMethodException, InvocationTargetException {
        T model = new T();
        model.setName("name");
        model.setDt(new Date());
        T2 model2 = new T2();
        PropertyUtils.copyProperties(model2, model);
        System.out.println(model2);

    }

    @Data
    @ToString
    public class T {
        private String name;
        private Integer value;
        private Integer value10;
        private Date dt;
    }

    @Data
    @ToString
    public class T2 {
        private String name;
        private Date value;
        private Integer value9;
        private Date dt;
    }
}
