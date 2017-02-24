package zh.framework.model.excel;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.util.List;

/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2017/1/21
 * @description
 */
@Data
@ToString
@Builder
public class Book {


    private String name;
    private List<Sheet> sheets;
}
