package com.skcc.AutoJudge.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.skcc.AutoJudge.service.ScenarioService;

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

}
