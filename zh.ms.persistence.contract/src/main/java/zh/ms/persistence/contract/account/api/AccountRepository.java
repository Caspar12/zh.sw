package zh.ms.persistence.contract.account.api;

import org.springframework.data.repository.PagingAndSortingRepository;

import org.springframework.data.repository.RepositoryDefinition;
import org.springframework.stereotype.Repository;
import zh.ms.persistence.contract.account.model.Account;

import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceUnit;
import java.util.UUID;

/**
 * @author 陈志杭
 * @qq 279397942@qq.com
 * @createdDate 2016年12月19日
 * @description
 */
@Repository
public interface AccountRepository extends PagingAndSortingRepository<Account, UUID> {

}