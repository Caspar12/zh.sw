package zh.ms.service.contract.account.api;

import zh.ms.persistence.contract.account.model.Account;
import zh.ms.service.contract.account.model.accountservice.LoginRequest;
import zh.ms.service.contract.account.model.accountservice.LoginResponse;

import javax.validation.Valid;

/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/20
 * @description
 */
public interface AccountService {
    /**
     * @param request
     * @return
     */

    LoginResponse login(@Valid LoginRequest request);

}
