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
	
	public List<Map<String, Object>> getEqpGrpListForSNROCNT(String strFactroy, String strArea, String strEqpGrp) {
		
		List<Map<String,Object>> epgGrpList = new ArrayList<Map<String, Object>>();
		Map<String,Object> param = new HashMap<String,Object>();
		
		param.put("FAB_ID", strFactroy);
		param.put("AREA_ID", strArea);
		param.put("EQP_GRP", strEqpGrp);
		
		epgGrpList = scenarioDAO.getEqpGrpListForSNROCNT(param);
		
		return epgGrpList;
	}
	
	public List<Map<String, Object>> getScenarioFromEqpGrp(String strFactroy, String strArea, String strEqpGrp) {
		
		List<Map<String,Object>> epgGrpList = new ArrayList<Map<String, Object>>();
		Map<String,Object> param = new HashMap<String,Object>();
		
		param.put("FAB_ID", strFactroy);
		param.put("AREA_ID", strArea);
		param.put("EQP_GRP", strEqpGrp);
		
		epgGrpList = scenarioDAO.getEqpGrpListForSNROCNT(param);
		
		String strSNROList = epgGrpList.get(0).get("SNRO_LIST").toString();
		String[] arrSNROList = strSNROList.split(",");
		
		List<Map<String,Object>> result = new ArrayList<Map<String, Object>>();
		for(int i = 0; i <arrSNROList.length; i++)
		{
			param.clear();
			param.put("FAB_ID", strFactroy);
			param.put("AREA_ID", strArea);
			param.put("SNRO_ID", arrSNROList[i]);
			
			List<Map<String,Object>> scenario = new ArrayList<Map<String, Object>>();
			
			scenario = scenarioDAO.getScenarioFromEqpGrp(param);
			
			Map<String,Object> resultMap = new HashMap<String,Object>();
			resultMap.put("SNRO_ID", scenario.get(0).get("SNRO_ID"));
			resultMap.put("SNRO_NM", scenario.get(0).get("SNRO_NM"));
			resultMap.put("SNRO_DESC", scenario.get(0).get("SNRO_DESC"));
			resultMap.put("TRY_LIMIT_CNT", scenario.get(0).get("TRY_LIMIT_CNT"));
			
			result.add(resultMap);
		}
		
	
		return result;
	}
	
	
	public List<Map<String, Object>> getAllScenarioList(String strFactroy, String strArea, String strEqpGrp) {
		
		List<Map<String,Object>> scenarioList = new ArrayList<Map<String, Object>>();
		Map<String,Object> param = new HashMap<String,Object>();
		
		param.put("FAB_ID", strFactroy);
		param.put("AREA_ID", strArea);
		param.put("EQP_GRP", strEqpGrp);
		
		scenarioList = scenarioDAO.getEqpGrpListForSNROCNT(param);
		
		String strSNROList = scenarioList.get(0).get("SNRO_LIST").toString();
		String[]  arrSNROList = strSNROList.split(",");
		
		List<String> SNRO_ID = new ArrayList<String>();
		
		for(int i = 0; i < arrSNROList.length; i++)
		{
			SNRO_ID.add(arrSNROList[i]);
		}
		
		param.clear();
		param.put("FAB_ID", strFactroy);
		param.put("AREA_ID", strArea);
		param.put("SNRO_ID", SNRO_ID);
		
		List<Map<String,Object>> result = new ArrayList<Map<String, Object>>();
		result = scenarioDAO.getAllScenarioList(param);
		
		return result;
	}
	
	public int setScenarioPool(String strFactroy, String strArea, String strEqpGrp, String strSNROId) {
		
		List<Map<String,Object>> epgGrpList = new ArrayList<Map<String, Object>>();
		Map<String,Object> param = new HashMap<String,Object>();
		
		param.put("FAB_ID", strFactroy);
		param.put("AREA_ID", strArea);
		param.put("EQP_GRP", strEqpGrp);
		
		epgGrpList = scenarioDAO.getEqpGrpListForSNROCNT(param);
		
		String strSNROList = epgGrpList.get(0).get("SNRO_LIST").toString();

		strSNROList = strSNROList + "," + strSNROId;
		
		param.clear();
		
		param.put("FAB_ID", strFactroy);
		param.put("AREA_ID", strArea);
		param.put("EQP_GRP", strEqpGrp);
		param.put("SNRO_LIST", strSNROList);
		

	    int setScenarioPool = scenarioDAO.setScenarioPool(param);
		
	    return setScenarioPool;
	}
	
	public int removeScenarioPool(String strFactroy, String strArea, String strEqpGrp, String strSNROId) {
		
		List<Map<String,Object>> epgGrpList = new ArrayList<Map<String, Object>>();
		Map<String,Object> param = new HashMap<String,Object>();
		
		param.put("FAB_ID", strFactroy);
		param.put("AREA_ID", strArea);
		param.put("EQP_GRP", strEqpGrp);
		
		epgGrpList = scenarioDAO.getEqpGrpListForSNROCNT(param);
		
		String strSNROList = epgGrpList.get(0).get("SNRO_LIST").toString();
		
		if(strSNROList.contains(","+ strSNROId))
		{
			strSNROList = strSNROList.replace(","+ strSNROId, "");
		}
		else if(strSNROList.contains(strSNROId + ","))
		{
			strSNROList = strSNROList.replace(strSNROId + ",", "");
		}
		
		param.clear();
		
		param.put("FAB_ID", strFactroy);
		param.put("AREA_ID", strArea);
		param.put("EQP_GRP", strEqpGrp);
		param.put("SNRO_LIST", strSNROList);
		

	    int setScenarioPool = scenarioDAO.setScenarioPool(param);
		
	    return setScenarioPool;
	}
}
