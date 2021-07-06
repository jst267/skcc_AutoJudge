package com.skcc.smartAutoJudge.biz.controller;

import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.task.TaskRejectedException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.skcc.smartAutoJudge.biz.service.ActivityService;
import com.skcc.smartAutoJudge.biz.service.JobService;

@CrossOrigin
@RestController
@RequestMapping("/AutoJudgeAlarm")
public class AlarmController {
	
	@Autowired
	private JobService jobservice;

	@Autowired
	private ActivityService activityservice;
	
	@GetMapping("/receiveFDCAlarm")
	@ResponseBody
	public void receiveFDCAlarm(@RequestParam("FAB_ID") String strFactory, @RequestParam("AREA_ID") String strArea, 
			 @RequestParam("EQP_GRP") String strEqpGrp,  @RequestParam("EQP_ID") String strEqpId, @RequestParam("ALARM_ID") String strAlarmId) throws Exception {
				
		try {
			jobservice.executor(strFactory, strArea, strEqpGrp, strEqpId, strAlarmId);
		}
		catch (TaskRejectedException e) {
			
		}

	}
	
	
	@GetMapping("/test")
	@ResponseBody
	public void receiveFDCAlarm(@RequestParam("ID") String strId) throws Exception {
		
		jobservice.executor(strId);
		
		
//		long Id = Long.parseLong(strId);
//		
//
//		ThreadGroup rootGroup = Thread.currentThread().getThreadGroup();
//		ThreadGroup parentGroup;
//		while ((parentGroup = rootGroup.getParent()) != null) {
//		    rootGroup = parentGroup;
//		}
//		 
//		Thread[] threads = new Thread[rootGroup.activeCount()];
//		while (rootGroup.enumerate(threads, true) == threads.length) {
//		    threads = new Thread[threads.length * 2];
//		}
//		 
//		for (Thread t : threads) {
//		    if (t.getId() == Id) {
//		    	System.out.println("쓰레드 찾음");
//		    }
//		}


	}

}
