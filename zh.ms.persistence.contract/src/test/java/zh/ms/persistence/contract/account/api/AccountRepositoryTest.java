package zh.ms.persistence.contract.account.api;

import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import zh.ms.persistence.contract.Starter;
import zh.ms.persistence.contract.account.model.Account;
import zh.ms.persistence.contract.category.api.CategoryRepository;
import zh.ms.persistence.contract.category.model.Category;

import javax.annotation.Resource;
import java.util.UUID;

/**
 * @author 陈志杭
 * @qq 279397942@qq.com
 * @createdDate 2016年12月20日
 * @description
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Starter.class)
@Slf4j
public class AccountRepositoryTest {
    @Resource
    AccountRepository accountDao;
    @Resource
    CategoryRepository categoryDao;

    @Test
    public void insertAdminAccount() {
        Account account = new Account();
        account.setAccount("admin");
        account.setCategoryId(UUID.randomUUID());
        account.setHeaderImg("https://ss0.baidu.com/73F1bjeh1BF3odCf/it/u=1612872009,4168571233&fm=85&s=172048A451063EEC0419908E0300C092");
        account.setId(UUID.randomUUID());
        account.setNickName("admin");
        account.setPassword("123456");
        accountDao.save(account);

        Category category = new Category();
        category.setId(UUID.randomUUID());
        category.setName("test");
        category.setParentId(null);
        categoryDao.save(category);
    }

    @Test
    public void findAll() {
        Iterable<Account> accounts = accountDao.findAll();
        accounts.forEach(x -> log.info(x.toString()));
    }
}
