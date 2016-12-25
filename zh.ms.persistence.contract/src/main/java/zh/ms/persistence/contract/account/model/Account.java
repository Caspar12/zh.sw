package zh.ms.persistence.contract.account.model;

import java.util.UUID;

import javax.persistence.*;

import lombok.Data;
import lombok.ToString;

/**
 * @author 陈志杭
 * @qq 279397942@qq.com
 * @createdDate 2016年12月19日
 * @description 账号模型
 */
@Entity
@Table
@Data
@ToString
public class Account {
    /**
     * id
     */
    @Id
    @Column(nullable = false, unique = true)
    private UUID id;
    /**
     * 分类Id
     *
     * @see zh.ms.persistence.contract.category.model.Category
     */
    @Column(nullable = false)
    private UUID categoryId;
    /**
     * 账号
     */
    @Column(nullable = false, length = 32)
    private String account;
    /**
     * 密码,md5
     */
    @Column(nullable = false, length = 32)
    private String password;
    /**
     * 昵称
     */
    @Column(nullable = true, length = 32)
    private String nickName;
    /**
     * 头像
     */
    @Column(nullable = true, length = 512)
    private String headerImg;
}
