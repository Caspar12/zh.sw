package zh.ms.persistence.contract.category.api;

import org.springframework.data.repository.PagingAndSortingRepository;

import org.springframework.stereotype.Repository;
import zh.ms.persistence.contract.category.model.Category;

import java.util.UUID;

/**
 * @author 陈志杭
 * @qq 279397942@qq.com
 * @createdDate 2016年12月19日
 * @description 分类基础模型接口
 */
@Repository
public interface CategoryDao extends PagingAndSortingRepository<Category, UUID> {

}
