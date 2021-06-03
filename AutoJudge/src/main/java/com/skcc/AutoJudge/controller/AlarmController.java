package com.skcc.AutoJudge.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.task.TaskRejectedException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.skcc.AutoJudge.service.ActivityService;
import com.skcc.AutoJudge.service.JobService;

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
			 @RequestParam("EQP_GRP") String strEqpGrp,  @RequestParam("EQP_ID") String strEqpId, @RequestParam("ALARM_ID") String strAlarmId) throws InterruptedException {
				
		try {
			jobservice.executor(strFactory, strArea, strEqpGrp, strEqpId, strAlarmId);
		}
		catch (TaskRejectedException e) {
			
		}

	}

}
