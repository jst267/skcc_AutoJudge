package com.skcc.smartAutoJudge.biz.config;

import java.util.concurrent.Executor;
import java.util.concurrent.ThreadPoolExecutor;

import javax.annotation.Resource;

import org.springframework.aop.interceptor.AsyncUncaughtExceptionHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurer;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import com.skcc.smartAutoJudge.common.constants.GeneralConstants;


 
@Configuration
@EnableAsync
public class AsyncConfig implements AsyncConfigurer {

    /** 샘플 Thread */
    @Resource(name = "executor")
    private ThreadPoolTaskExecutor executor;
 
    /**
     * 샘플 Thread 생성
     *
     * @return
     */
    @Bean(name = "executor")
    @Override
    public Executor getAsyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(GeneralConstants.TASK_CORE_POOL_SIZE);
        executor.setMaxPoolSize(GeneralConstants.TASK_MAX_POOL_SIZE);
        executor.setQueueCapacity(GeneralConstants.TASK_QUEUE_CAPACITY);
        executor.setBeanName(GeneralConstants.EXECUTOR_BEAN_NAME);
        executor.initialize();
        return executor;
    }
 
    /**
     * 샘플 Thread 등록 가능 여부
     *
     * @return 실행중인 task 개수가 최대 개수(max + queue)보다 크거나 같으면 false
     */
    public boolean isTaskExecute() {
        boolean rtn = true;
        
        System.out.println("EXECUTOR.getActiveCount() : " + executor.getActiveCount());
 
        // 실행중인 task 개수가 최대 개수(max + queue)보다 크거나 같으면 false
        if (executor.getActiveCount() >= (GeneralConstants.TASK_MAX_POOL_SIZE + GeneralConstants.TASK_QUEUE_CAPACITY)) {
            rtn = false;
        }
 
        return rtn;
    }
 
    /**
     * 샘플 Thread 등록 가능 여부
     *
     * @param createCnt : 생성 개수
     * @return 실행중인 task 개수 + 실행할 개수가 최대 개수(max + queue)보다 크면 false
     */
    public boolean isSampleTaskExecute(int createCnt) {
        boolean rtn = true;
 
        // 실행중인 task 개수 + 실행할 개수가 최대 개수(max + queue)보다 크거나 같으면 false
        if ((executor.getActiveCount() + createCnt) > (GeneralConstants.TASK_MAX_POOL_SIZE + GeneralConstants.TASK_QUEUE_CAPACITY)) {
            rtn = false;
        }
 
        return rtn;
    }

 
    /* (non-Javadoc)
     * @see org.springframework.scheduling.annotation.AsyncConfigurer#getAsyncUncaughtExceptionHandler()
     */
    @Override
    public AsyncUncaughtExceptionHandler getAsyncUncaughtExceptionHandler() {
        return new AsyncExceptionHandler();
    }
    
    public ThreadGroup getThreadPool() {
    	
    	String test = executor.getThreadNamePrefix();
    	
    	return executor.getThreadGroup();
    	
    }
    
   
}
