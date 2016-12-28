package zh.ms.framework.listener;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.MessageSource;
import org.springframework.context.support.AbstractResourceBasedMessageSource;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

/**
 * @author 陈志杭
 * @qq 279397942@qq.com
 * @createdDate 2016年12月10日
 * @description 监听Spring容器初始化完成事件
 */
@Component
@Slf4j
public class ApplicationReadyEventListener implements ApplicationListener<ApplicationReadyEvent> {
    @Autowired(required = false)
    private MessageSource messageSource;

    /*
     * (non-Javadoc)
     *
     * @see
     * org.springframework.context.ApplicationListener#onApplicationEvent(org.
     * springframework.context.ApplicationEvent)
     */
    /*
     * (non-Javadoc)
	 * 
	 * @see
	 * org.springframework.context.ApplicationListener#onApplicationEvent(org.
	 * springframework.context.ApplicationEvent)
	 */
    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
//		log.info(" init applicaton");

        printI18NMessage();

    }

    /**
     * 打印初始化国际化资源信息
     */
    private void printI18NMessage() {
        if (messageSource == null || AbstractResourceBasedMessageSource.class.isAssignableFrom(messageSource.getClass()) == false)
            return;
        AbstractResourceBasedMessageSource abstractResourceBasedMessageSource = (AbstractResourceBasedMessageSource) messageSource;

        List<String> resources = abstractResourceBasedMessageSource.getBasenameSet().stream()
                .collect(Collectors.toList());
        String fileNames = StringUtils.join(resources.toArray(), ",");
        if (log.isInfoEnabled()) {
            log.info("I18N load:{}", fileNames);
        }

    }
}
