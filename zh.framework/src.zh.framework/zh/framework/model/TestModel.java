package zh.framework.model;

import lombok.Data;

/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2017/6/16
 * @description
 */
@Data
public class TestModel {
    private String name;
    private String value;

    private TestModel2 testModel;
}