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

import com.skcc.smartAutoJudge.biz.service.ScenarioService;

@CrossOrigin
@RestController
@RequestMapping("/ScenarioInfo")
public class ScenarioController {
	
	@Autowired
	private ScenarioService scenarioservice;
	
	@GetMapping("/getScenarioList")
	@ResponseBody
	public List<Map<String, Object>> getScenarioList(@RequestParam("FAB_ID") String strFactory, @RequestParam("AREA_ID") String strArea, @RequestParam("EQP_GRP") String strEqpGrp
			, @RequestParam("EQP_ID") String strEqp) {
				
		List<Map<String, Object>> scenarioList = scenarioservice.getScenarioList(strFactory, strArea, strEqpGrp, strEqp);

		return scenarioList;	
	}
	
	@GetMapping("/getEqpGrpListForSNROCNT")
	@ResponseBody
	public List<Map<String, Object>> getEqpGrpListForSNROCNT(@RequestParam("FAB_ID") String strFactory, @RequestParam("AREA_ID") String strArea, @RequestParam("EQP_GRP") String strEqpGrp) {
				
		List<Map<String, Object>> scenarioList = scenarioservice.getEqpGrpListForSNROCNT(strFactory, strArea, strEqpGrp);

		return scenarioList;		
	}
	
	@GetMapping("/getScenarioFromEqpGrp")
	@ResponseBody
	public List<Map<String, Object>> getScenarioFromEqpGrp(@RequestParam("FAB_ID") String strFactory, @RequestParam("AREA_ID") String strArea, @RequestParam("EQP_GRP") String strEqpGrp) {
				
		List<Map<String, Object>> scenario = scenarioservice.getScenarioFromEqpGrp(strFactory, strArea, strEqpGrp);

		return scenario;		
	}
	
	@GetMapping("/getAllScenarioList")
	@ResponseBody
	public List<Map<String, Object>> getAllScenarioList(@RequestParam("FAB_ID") String strFactory, @RequestParam("AREA_ID") String strArea, @RequestParam("EQP_GRP") String strEqpGrp) {
				
		List<Map<String, Object>> scenario = scenarioservice.getAllScenarioList(strFactory, strArea, strEqpGrp);

		return scenario;	
	}
	
	@GetMapping("/addScenarioPool")
	@ResponseBody
	public int setScenarioPool(@RequestParam("FAB_ID") String strFactory, @RequestParam("AREA_ID") String strArea, @RequestParam("EQP_GRP") String strEqpGrp,
			 @RequestParam("SNRO_ID") String strSNROId) {
				
		int scenario = scenarioservice.setScenarioPool(strFactory, strArea, strEqpGrp, strSNROId);

		return scenario;	
	}
	
	@GetMapping("/removeScenarioPool")
	@ResponseBody
	public int removeScenarioPool(@RequestParam("FAB_ID") String strFactory, @RequestParam("AREA_ID") String strArea, @RequestParam("EQP_GRP") String strEqpGrp,
			 @RequestParam("SNRO_ID") String strSNROId) {
				
		int scenario = scenarioservice.removeScenarioPool(strFactory, strArea, strEqpGrp, strSNROId);

		return scenario;	
	}
	
	@GetMapping("/getEQPMappingList")
	@ResponseBody
	public List<Map<String, Object>> getEQPMappingList(@RequestParam("FAB_ID") String strFactory, @RequestParam("AREA_ID") String strArea, @RequestParam("EQP_GRP") String strEqpGrp) {
				
		List<Map<String, Object>> eqpList = scenarioservice.getEQPMappingList(strFactory, strArea, strEqpGrp);

		return eqpList;	
	}
	
	@GetMapping("/getScenarioFromAlarm")
	@ResponseBody
	public List<Map<String, Object>> getScenarioFromAlarm(@RequestParam("FAB_ID") String strFactory, @RequestParam("AREA_ID") String strArea, @RequestParam("EQP_GRP") String strEqpGrp,
			 @RequestParam("ALARM_ID") String strAlarmId) {
		List<Map<String, Object>> eqpList = scenarioservice.getScenarioFromAlarm(strFactory, strArea, strEqpGrp, strAlarmId);

		return eqpList;	
	}
	
	@GetMapping("/setScenarioForEQP")
	@ResponseBody
	public boolean setScenarioForEQP(@RequestParam("FAB_ID") String strFactory, @RequestParam("AREA_ID") String strArea, @RequestParam("EQP_GRP") String strEqpGrp,
			@RequestParam("EQP_ID") String strEqp, @RequestParam("ALARM_ID") String strAlarmId, @RequestParam("SNRO_ID") String strSNROId, @RequestParam("AUTO_FLAG") String strAutoFlag) {

		boolean isSuccess = scenarioservice.setScenarioForEQP(strFactory, strArea, strEqpGrp, strEqp, strAlarmId, strSNROId, strAutoFlag);
		
		return isSuccess;	
	}
	
	@GetMapping("/removeScenarioForEQP")
	@ResponseBody
	public boolean removeScenarioForEQP(@RequestParam("FAB_ID") String strFactory, @RequestParam("AREA_ID") String strArea, @RequestParam("EQP_GRP") String strEqpGrp,
			@RequestParam("EQP_ID") String strEqp, @RequestParam("ALARM_ID") String strAlarmId, @RequestParam("SNRO_ID") String strSNROId, @RequestParam("AUTO_FLAG") String strAutoFlag) {

		boolean isSuccess = scenarioservice.removeScenarioForEQP(strFactory, strArea, strEqpGrp, strEqp, strAlarmId, strSNROId, strAutoFlag);
		
		return isSuccess;	
	}
	

}
