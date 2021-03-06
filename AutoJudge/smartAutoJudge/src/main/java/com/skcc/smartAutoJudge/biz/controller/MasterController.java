package com.skcc.smartAutoJudge.biz.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.skcc.smartAutoJudge.biz.service.MasterService;

@CrossOrigin
@RestController
@RequestMapping("/MasterInfo")
public class MasterController {

	@Autowired
	private MasterService masterservice;
	
	@GetMapping("/getFactoryInfo")
	@ResponseBody
	public List<Map<String, Object>> getFactoryInfo() {
				
		List<Map<String, Object>> factory = masterservice.getFactoryInfo();

		return factory;
		
	}
	
	@GetMapping("/getAreaInfo")
	@ResponseBody
	public List<Map<String, Object>> getAreaInfo(@RequestParam("FAB_ID") String strFactory) {
			
		List<Map<String, Object>> area = masterservice.getAreaInfo(strFactory);

		return area;
		
	}
	
	@GetMapping("/getEqpGrpInfo")
	@ResponseBody
	public List<Map<String, Object>> getEqpGrpInfo(@RequestParam("FAB_ID") String strFactory, @RequestParam("AREA_ID") String strArea) {
				
		List<Map<String, Object>> eqpgrp = masterservice.getEqpGrpInfo(strFactory, strArea);

		return eqpgrp;
		
	}
	
	@GetMapping("/getEqpInfo")
	@ResponseBody
	public List<Map<String, Object>> getEqpInfo(@RequestParam("FAB_ID") String strFactory, @RequestParam("AREA_ID") String strArea, @RequestParam("EQP_GRP") String strEqpGrp) {
				
		List<Map<String, Object>> eqpgrp = masterservice.getEqpInfo(strFactory, strArea, strEqpGrp);

		return eqpgrp;
	}
	
	@GetMapping("/getAlarmInfo")
	@ResponseBody
	public List<Map<String, Object>> getAlarmInfo(@RequestParam("FAB_ID") String strFactory, @RequestParam("AREA_ID") String strArea) {
				
		List<Map<String, Object>> alramList = masterservice.getAlarmInfo(strFactory, strArea);

		return alramList;
	}
}


