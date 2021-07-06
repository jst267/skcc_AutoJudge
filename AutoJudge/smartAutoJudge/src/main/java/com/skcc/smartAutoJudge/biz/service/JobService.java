package com.skcc.smartAutoJudge.biz.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.task.TaskRejectedException;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.skcc.smartAutoJudge.biz.config.AsyncConfig;
import com.skcc.smartAutoJudge.biz.dao.ActivityDao;
import com.skcc.smartAutoJudge.biz.dao.JobDao;
import com.skcc.smartAutoJudge.biz.dao.ScenarioDao;
import com.skcc.smartAutoJudge.common.constants.GeneralConstants;
import com.skcc.smartAutoJudge.core.job.ThreadManagement;
import com.skcc.smartAutoJudge.core.message.AutoJudgeHeader;
import com.skcc.smartAutoJudge.core.parser.JsonParser;
import com.skcc.smartAutoJudge.core.protocol.HttpService;


@Service
public class JobService {

	ThreadManagement tmn = new ThreadManagement();
	
	
	@Autowired
	private JobDao jobDAO;
	
	@Autowired
	private ScenarioDao scenarioDAO;
	
	@Autowired
	private ActivityDao activityDAO;
	
	/** AsyncConfig */
    @Resource(name = "asyncConfig")
    private AsyncConfig asyncConfig;
			
	 /**
     * 시뮬레이션 테스트용 함수
     *
     * @param str
	 * @throws Exception 
     */
    @Async("executor")
    public void executor(String strFactory, String strArea, String strEqpGrp, String strEqpId, String strAlarmId) throws Exception {
 	   	
    	
    	try {
            // 등록 가능 여부 체크
            if (asyncConfig.isTaskExecute()) {      	
           	
//            	Thread.currentThread().setName("쓰레드5");
//            	
//            	System.out.println(Thread.currentThread().getState().toString());
//            	
//            	tmn.threadWait(Thread.currentThread());
            	
            	
            	System.out.println(Thread.currentThread().getState().toString());
                // task 사용         	
            	//job 생성            	
            	if(createJob(strFactory, strArea, strEqpGrp, strEqpId, strAlarmId))
            	{
            		processSNRO(strFactory, strArea, strEqpGrp, strEqpId, strAlarmId);
            	}
            	else
            	{
            		return ;
            	}
            	
            	boolean flag = true;
            	
            	while(flag) {
            		System.out.println("동작 시작함");
            		flag = false;
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
    
    @Async("executor")
    public void executor(String id) throws Exception {
 	   	
    	
//    	ThreadManagement tmn = new ThreadManagement();
    	
		try {
			// 등록 가능 여부 체크
			if (asyncConfig.isTaskExecute()) {

                Thread currentThread = Thread.currentThread();
                ThreadGroup threadGroup = currentThread.getThreadGroup();
                while (threadGroup.getParent() != null) {
                    threadGroup = threadGroup.getParent();
                }
                int activeCount = threadGroup.activeCount();
                System.out.println("activeCount: " + activeCount);
                // NOTE:
                // The number of thread is changing so additional 5 is for guaranteeing
                // enough space.
                Thread[] activeThreads = new Thread[activeCount + 5];
                int enumeratedCount = threadGroup.enumerate(activeThreads);
                System.out.println("enumeratedCount: " + enumeratedCount);
                Thread finalizerThread = null;
                for (int i = 0; i < enumeratedCount; i++) {
                	System.out.println(activeThreads[i].getName() + " ::: " + activeThreads[i].getState().toString());
                    if (activeThreads[i].getName().equals("쓰레드5")) {
                    	
                    	System.out.println(activeThreads[i].getState().toString());
                    	tmn.threadNotify(activeThreads[i]);
//                    	activeThreads[i].notify();
                    }
                }

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
			
		scenarioList = getSNROList(strFactory, strArea, strEqpGrp, strEqpId, strAlarmId, null);
    	
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
    		
    		if(jobList == null || jobList.size() == 0)
    		{
    	    	//없으면 Insert 해서 JOB 생성
    			String strJobId = strEqpId + "." + strAlarmId + "." + strSNROId; // JobId 룰 : 장비Id.알람Id.시나리오Id
    			
    			Thread.currentThread().setName(strJobId);	
    			
            	param.clear();
        		param.put("FAB_ID", strFactory);
        		param.put("AREA_ID", strArea);
        		param.put("EQP_GRP", strEqpGrp);
        		param.put("EQP_ID", strEqpId);
        		param.put("ALARM_ID", strAlarmId);
        		param.put("SNRO_ID", strSNROId);
        		param.put("JOB_ID", strJobId);
        		param.put("JOB_STATUS", "START");
        		param.put("THREAD_ID", strJobId);
    			
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
    
    
    public void processSNRO(String strFactory, String strArea, String strEqpGrp, String strEqpId, String strAlarmId) throws Exception {
    
    
    	//해당 장비와 해당 알람에 매핑되어있는 시나리오 체크
    	List<Map<String,Object>> scenarioList = new ArrayList<Map<String, Object>>();
    	List<Map<String,Object>> jobList = new ArrayList<Map<String, Object>>();
    	List<Map<String,Object>> activityInfo = new ArrayList<Map<String, Object>>();
    	Map<String,Object> param = new HashMap<String,Object>();
    	
    	jobList = getJobList(strFactory, strArea, strEqpGrp, strEqpId, strAlarmId);
		String strSNRO = jobList.get(0).get("SNRO_ID").toString();
		
		scenarioList = getActivityList(strFactory, strArea, strSNRO);
    	
		String[] activityList = scenarioList.get(0).get("ACTIVITY_LIST").toString().split(",");
		
    	for(int i = 0; i<activityList.length; i++)
    	{
    		String activityNM = activityList[i];
    		String activtyType = null;
    		
    		param.clear();
    		param.put("FAB_ID", strFactory);
    		param.put("AREA_ID", strArea);
    		param.put("ACTIVITY_NM", activityNM);
    		
    		activityInfo = activityDAO.getActivityInfo(param);   		
    		activtyType =  activityInfo.get(0).get("ACTIVITY_TYPE").toString();
    		
    		if(activtyType.equals(GeneralConstants.ACTIVITY_TYPE_ACTION))
    		{
    			String strJobStatus = jobList.get(0).get("JOB_STATUS").toString();
    			String strJobId = jobList.get(0).get("JOB_ID").toString();
    			
    			if(strJobStatus.equals(GeneralConstants.JOB_STATUS_START))
    			{
    				param.clear();
    				param.put("FAB_ID", strFactory);
    				param.put("AREA_ID", strArea);
    				param.put("EQP_GRP", strEqpGrp);
    				param.put("EQP_ID", strEqpId);
    				param.put("JOB_ID", strJobId);
    				param.put("JOB_STATUS", GeneralConstants.JOB_STATUS_RUNNING);
    				
    				jobDAO.setJobStatus_Update(param);
    				continue;
    			}
    			else if(strJobStatus.equals(GeneralConstants.JOB_STATUS_END))
    			{
    				continue; // 
    			}
    		}
    		else if(activtyType.equals(GeneralConstants.ACTIVITY_TYPE_CONNECTION))
    		{
    			String strActivityId = activityInfo.get(0).get("ACTIVITY_ID").toString();
    			
    			String[] arrActivityId = strActivityId.split("_");
    			String strTargetSys = arrActivityId[arrActivityId.length - 1];
    			String strResult = null;
    			
    			if(strTargetSys.equals(GeneralConstants.RTD))
    			{
	    			Map<String, Object> headerMap = new HashMap<String,Object>();
	    			Map<String, Object> bodyMap = new HashMap<String,Object>();
	    			AutoJudgeHeader headerMsg = new AutoJudgeHeader();
	    			String strMsg = null;
	    			String sendUrl = "http://localhost:8081/getRTD?type=gold";	 //RTD URL로 변경필요
	    			
	    			headerMap.clear();
	    			headerMap.put("targeSys", strTargetSys);	
	    			headerMap = headerMsg.addHeaderWithMap(headerMap);
	    			
	    			bodyMap.clear();
	    			bodyMap.put("FAB", strFactory);
	    			bodyMap.put("AREA", strArea);
	    			bodyMap.put("EQP", strEqpId);
	    			bodyMap.put("EQP_GRP", strEqpGrp);
	    			
	    			
	    			Map<String, Object> Message = new HashMap<String,Object>();
	    			Message.put("header", headerMap);
	    			Message.put("body", bodyMap);
	    			
	    			JsonParser jsonparser = new JsonParser();
	    			strMsg = jsonparser.MapToJsonString(Message);
	    			
	
	    			strResult = HttpService.sendGetJsonStr(sendUrl, strMsg, GeneralConstants.TIMEOUT);
	    			
	    			if(strResult.equals(GeneralConstants.SUCCESS))
	    			{
	    				continue;
	    			}
	    			else if(strResult.equals(GeneralConstants.FAIL))
	    			{
//	    				Thread.currentThread().wait(); //sleep
	    				
	    			}    			
    			}
    					
    		}
    		else if(activtyType.equals(GeneralConstants.ACTIVITY_TYPE_BIZ))
    		{
    			ruleService service = new ruleService();
    			
    			int iEqpSpecData = service.getEqpSpecData("LoadSpecData" , strEqpId);
    			
    			boolean isJudgeOk = service.getDecesion("CheckSpecData" ,iEqpSpecData);
    			
    			if(isJudgeOk)
    			{
    				//pass
    			}
    			else
    			{
    				//fail
    			}
    			
    			
    			
    		}
    		
    	}
    	
    }
    
    public List<Map<String,Object>> getJobList(String strFactory, String strArea, String strEqpGrp, String strEqpId, String strAlarmId){
    	
    	List<Map<String,Object>> JobList = new ArrayList<Map<String, Object>>();
		Map<String,Object> param = new HashMap<String,Object>();
		
		param.clear();
		param.put("FAB_ID", strFactory);
		param.put("AREA_ID", strArea);
		param.put("EQP_GRP", strEqpGrp);
		param.put("EQP_ID", strEqpId);
		param.put("ALARM_ID", strAlarmId);
    	
		
		JobList = jobDAO.getJobList(param);
    	
    	return JobList;
    }
    
    
    public List<Map<String,Object>> getSNROList(String strFactory, String strArea, String strEqpGrp, String strEqpId, String strAlarmId, String strSNRO){
    	
    	List<Map<String,Object>> scenarioList = new ArrayList<Map<String, Object>>();
		Map<String,Object> param = new HashMap<String,Object>();
		
		param.clear();
		param.put("FAB_ID", strFactory);
		param.put("AREA_ID", strArea);
		param.put("EQP_GRP", strEqpGrp);
		param.put("EQP_ID", strEqpId);
		param.put("ALARM_ID", strAlarmId);
		param.put("SNRO_ID", strSNRO);
    			
		scenarioList = scenarioDAO.getScenarioList(param);
	
    	
    	return scenarioList;
    }
    
    public List<Map<String,Object>> getActivityList(String strFactory, String strArea, String strSNRO){
        
    	
		List<Map<String,Object>> activity = new ArrayList<Map<String, Object>>();
		Map<String,Object> param = new HashMap<String,Object>();
		
		param.put("FAB_ID", strFactory);
		param.put("AREA_ID", strArea);
		param.put("SNRO_ID", strSNRO);
		activity = activityDAO.getActivityList(param);
		
		
		return activity;
    	
    	
    }
   
   
    
}
