package com.skcc.AutoJudge.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.task.TaskRejectedException;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.skcc.AutoJudge.config.AsyncConfig;
import com.skcc.AutoJudge.dao.JobDao;
import com.skcc.AutoJudge.dao.ScenarioDao;


@Service
public class JobService {

	
	@Autowired
	private JobDao jobDAO;
	
	@Autowired
	private ScenarioDao scenarioDAO;
	
	/** AsyncConfig */
    @Resource(name = "asyncConfig")
    private AsyncConfig asyncConfig;
			
	 /**
     * 시뮬레이션 테스트용 함수
     *
     * @param str
	 * @throws InterruptedException 
     */
    @Async("executor")
    public void executor(String strFactory, String strArea, String strEqpGrp, String strEqpId, String strAlarmId) throws InterruptedException {

    	
    	try {
            // 등록 가능 여부 체크
            if (asyncConfig.isTaskExecute()) {
                // task 사용         	
            	//job 생성            	
            	if(createJob(strFactory, strArea, strEqpGrp, strEqpId, strAlarmId))
            	{
            		
            	}
            	else
            	{
            		return ;
            	}
            	

            } else {
                System.out.println("==============>>>>>>>>>>>> THREAD 개수 초과");
            }
        } catch (TaskRejectedException e) {
            // TaskRejectedException : 개수 초과시 발생
            System.out.println("==============>>>>>>>>>>>> THREAD ERROR");
            System.out.println("TaskRejectedException : 등록 개수 초과");
            System.out.println("==============>>>>>>>>>>>> THREAD END");
        }
    }
    
    public boolean createJob(String strFactory, String strArea, String strEqpGrp, String strEqpId, String strAlarmId) {
    	
    	//해당 장비와 해당 알람에 매핑되어있는 시나리오 체크
    	List<Map<String,Object>> scenarioList = new ArrayList<Map<String, Object>>();
		Map<String,Object> param = new HashMap<String,Object>();
		
		param.clear();
		param.put("FAB_ID", strFactory);
		param.put("AREA_ID", strArea);
		param.put("EQP_GRP", strEqpGrp);
		param.put("EQP_ID", strEqpId);
		param.put("ALARM_ID", strAlarmId);
				
    	scenarioList = scenarioDAO.getScenarioList(param);
    	
    	if(scenarioList != null && scenarioList.size() > 0)
    	{
        	List<Map<String,Object>> jobList = new ArrayList<Map<String, Object>>();
        	String strSNROId = scenarioList.get(0).get("SNRO_ID").toString();
        	
        	param.clear();
    		param.put("FAB_ID", strFactory);
    		param.put("AREA_ID", strArea);
    		param.put("EQP_GRP", strEqpGrp);
    		param.put("EQP_ID", strEqpId);
    		param.put("ALARM_ID", strAlarmId);
    		param.put("SNRO_ID", strSNROId);
    		
    		jobList = jobDAO.getJobList(param);
    		
    		if(jobList != null && jobList.size() > 0)
    		{
    	    	//없으면 Insert 해서 JOB 생성
    			String strJobId = strEqpId + "." + strAlarmId + "." + strSNROId; // JobId 룰 : 장비Id.알람Id.시나리오Id
    			
            	param.clear();
        		param.put("FAB_ID", strFactory);
        		param.put("AREA_ID", strArea);
        		param.put("EQP_GRP", strEqpGrp);
        		param.put("EQP_ID", strEqpId);
        		param.put("ALARM_ID", strAlarmId);
        		param.put("SNRO_ID", strSNROId);
        		param.put("JOB_ID", strJobId);
        		param.put("JOB_STATUS", "START");
    			
    	    	int isSuccess = jobDAO.setCreateJob_Insert(param);
    	    	
    	    	if(isSuccess > 0)
    	    		return true;
    	    	
    		}
    		else
    		{
    			return false;
    		}
    		
        	
    	}
    	else
    	{
    		return false;
    	}
    	
   
    	
    	
    	
    	
    	return false;
    }
    
    
    
    
}
