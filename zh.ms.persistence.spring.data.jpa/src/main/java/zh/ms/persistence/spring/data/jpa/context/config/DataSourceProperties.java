package zh.ms.persistence.spring.data.jpa.context.config;

import org.springframework.boot.autoconfigure.orm.jpa.JpaProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.ArrayList;
import java.util.List;

/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/22
 * @description
 */
@ConfigurationProperties("zh")
public class DataSourceProperties {
    List<JpaProperties> jpaPropertiesList = new ArrayList<>();
}
