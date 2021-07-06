package com.skcc.smartAutoJudge.common.constants;

public class GeneralConstants {
	
    /** 샘플 기본 Thread 수 */
    public static final int TASK_CORE_POOL_SIZE = 2;
    /** 샘플 최대 Thread 수 */
    public static final int TASK_MAX_POOL_SIZE = 30;
    /** 샘플 QUEUE 수 */
    public static final int TASK_QUEUE_CAPACITY = 0;
    /** 샘플 Thread Bean Name */
    public static final String EXECUTOR_BEAN_NAME = "executor";
    
        
    /** Request TimeOut */
    public static final int TIMEOUT = 100000;
	
	
    /** ACTIVITY_TYPE */
    public static final String ACTIVITY_TYPE_ACTION = "ACTION";
    public static final String ACTIVITY_TYPE_CONNECTION = "CONNECTION";
    public static final String ACTIVITY_TYPE_BIZ = "BIZ";
    
    
    /** JOB_STATUS */
    public static final String JOB_STATUS_START = "START";
    public static final String JOB_STATUS_RUNNING = "RUNNING";
    public static final String JOB_STATUS_STOP = "STOP";
    public static final String JOB_STATUS_END = "END";
    
    
    /** Target System */  
    public static final String RTD = "RTD";
    public static final String RTS = "RTS";
    
    
    /** SUCCESS & FAIL */
    
    public static final String SUCCESS = "SUCCESS";
    public static final String FAIL = "FAIL";

}
