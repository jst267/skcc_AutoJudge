package com.skcc.AutoJudge.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skcc.AutoJudge.dao.ScenarioDao;

@Service
public class ScenarioService {
	
	@Autowired
	private ScenarioDao scenarioDAO;

	public List<Map<String, Object>> getScenarioList(String strFactroy, String strArea, String strEqpGrp, String strEqp) {
		
		List<Map<String,Object>> scenario = new ArrayList<Map<String, Object>>();
		Map<String,Object> param = new HashMap<String,Object>();
		
		param.put("FAB_ID", strFactroy);
		param.put("AREA_ID", strArea);
		param.put("EQP_GRP", strEqpGrp);
		param.put("EQP_ID", strEqp);
		scenario = scenarioDAO.getScenarioList(param);
		
		return scenario;
	}

}
