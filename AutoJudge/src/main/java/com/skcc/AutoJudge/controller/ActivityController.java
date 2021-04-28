package com.skcc.AutoJudge.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.skcc.AutoJudge.service.ActivityService;

@CrossOrigin
@RestController
@RequestMapping("/ActivityInfo")
public class ActivityController {
	
	@Autowired
	private ActivityService activityservice;
	
	@GetMapping("/getActivityList")
	@ResponseBody
	public List<Map<String, Object>> getActivityList(@RequestParam("FAB_ID") String strFactory, @RequestParam("AREA_ID") String strArea, @RequestParam("SNRO_ID") String strSNRO) {
				
		List<Map<String, Object>> activityList = activityservice.getActivityList(strFactory, strArea, strSNRO);

		return activityList;
		
	}

}
