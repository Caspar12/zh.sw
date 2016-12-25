package zh.ms.persistence.contract.category.model;

import java.util.UUID;

import javax.persistence.*;

import lombok.Data;
import lombok.ToString;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConfigurationPropertiesBinding;

/**
 * @author 陈志杭
 * @qq 279397942@qq.com
 * @createdDate 2016年12月19日
 * @description 分类模型
 */
@Entity
@Table
@Data
@ToString
public class Category {
    /**
     * Id
     */
    @Id
    @Column(nullable = false, unique = true)
    private UUID id;
    /**
     * 父分类Id
     */
    @Column(nullable = true)
    private UUID parentId;
    /**
     * 分类名称
     */
    @Column(nullable = true, length = 32)
    private String name;

}
