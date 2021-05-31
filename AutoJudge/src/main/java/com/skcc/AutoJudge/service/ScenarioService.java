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
		
		for(int i = 0 ; i < scenario.size(); i++)
		{
//			String strEqpId = scenario.get(i).get("EQP_ID").toString();
//			String strSCNRId = scenario.get(i).get("SNRO_ID").toString();
			
			scenario.get(i).put("id", i);
		}
		
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
		String[] arrSNROList = null;
		List<Map<String,Object>> result = new ArrayList<Map<String, Object>>();
		String strSNROList = "";
		
		param.put("FAB_ID", strFactroy);
		param.put("AREA_ID", strArea);
		param.put("EQP_GRP", strEqpGrp);
		
		epgGrpList = scenarioDAO.getEqpGrpListForSNROCNT(param);
		
		if(epgGrpList != null && epgGrpList.size() > 0)
			strSNROList = epgGrpList.get(0).get("SNRO_LIST") != null ?  epgGrpList.get(0).get("SNRO_LIST").toString() : null;
		
		if(strSNROList != null)
		{
			arrSNROList = strSNROList.split(",");
		
			for(int i = 0; i <arrSNROList.length; i++)
			{
				param.clear();
				param.put("FAB_ID", strFactroy);
				param.put("AREA_ID", strArea);
				param.put("SNRO_ID", arrSNROList[i]);
				
				List<Map<String,Object>> scenario = new ArrayList<Map<String, Object>>();
				
				scenario = scenarioDAO.getScenarioFromEqpGrp(param);
				
				if(scenario != null && scenario.size() > 0)
				{
					Map<String,Object> resultMap = new HashMap<String,Object>();
					resultMap.put("SNRO_ID", scenario.get(0).get("SNRO_ID"));
					resultMap.put("SNRO_NM", scenario.get(0).get("SNRO_NM"));
					resultMap.put("SNRO_DESC", scenario.get(0).get("SNRO_DESC"));
					resultMap.put("TRY_LIMIT_CNT", scenario.get(0).get("TRY_LIMIT_CNT"));
					result.add(resultMap);
				}							
			}
		}
		
		
	
		return result;
	}
	
	
	public List<Map<String, Object>> getAllScenarioList(String strFactroy, String strArea, String strEqpGrp) {
		
		List<Map<String,Object>> scenarioList = new ArrayList<Map<String, Object>>();
		Map<String,Object> param = new HashMap<String,Object>();
		List<String> SNRO_ID = new ArrayList<String>();
		
		param.put("FAB_ID", strFactroy);
		param.put("AREA_ID", strArea);
		param.put("EQP_GRP", strEqpGrp);
		
		scenarioList = scenarioDAO.getEqpGrpListForSNROCNT(param);
		
		String strSNROList = scenarioList.get(0).get("SNRO_LIST") != null ?  scenarioList.get(0).get("SNRO_LIST").toString() : null;
		
		if(strSNROList != null)
		{
			String[]  arrSNROList = strSNROList.split(",");
			
			
			for(int i = 0; i < arrSNROList.length; i++)
			{
				SNRO_ID.add(arrSNROList[i]);
			}
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
		
		String strSNROList = epgGrpList.get(0).get("SNRO_LIST") != null ?  epgGrpList.get(0).get("SNRO_LIST").toString() : null;
		   int iSNROCnt = epgGrpList.get(0).get("SNRO_CNT") != null ?  Integer.parseInt(epgGrpList.get(0).get("SNRO_CNT").toString()) : 0;

		if(strSNROList == null)
		{
			strSNROList = strSNROId;
		}
		else
		{
			strSNROList = strSNROList + "," + strSNROId;
		}
		
		iSNROCnt = iSNROCnt + 1; 
		
		param.clear();
		
		param.put("FAB_ID", strFactroy);
		param.put("AREA_ID", strArea);
		param.put("EQP_GRP", strEqpGrp);
		param.put("SNRO_LIST", strSNROList);
		param.put("SNRO_CNT", iSNROCnt);
		

	    int setScenarioPool = scenarioDAO.setScenarioPool(param);
		
	    return setScenarioPool;
	}
	
	public int removeScenarioPool(String strFactroy, String strArea, String strEqpGrp, String strSNROId) {
		
		List<Map<String,Object>> epgGrpList = new ArrayList<Map<String, Object>>();
		Map<String,Object> param = new HashMap<String,Object>();
		
		param.put("FAB_ID", strFactroy);
		param.put("AREA_ID", strArea);
		param.put("EQP_GRP", strEqpGrp);
		
		
		if(CheckSNRO_EQP_MAPPING(strFactroy, strArea, strEqpGrp, strSNROId))
		{
			
			return -1;
		}
		else
		{
			epgGrpList = scenarioDAO.getEqpGrpListForSNROCNT(param);
			
			String strSNROList = epgGrpList.get(0).get("SNRO_LIST") != null ?  epgGrpList.get(0).get("SNRO_LIST").toString() : null;
			   int iSNROCnt = epgGrpList.get(0).get("SNRO_CNT") != null ?  Integer.parseInt(epgGrpList.get(0).get("SNRO_CNT").toString()) : 0;
	
			if(strSNROList != null)
			{
				if(strSNROList.contains(","+ strSNROId))
				{
					strSNROList = strSNROList.replace(","+ strSNROId, "");
				}
				else if(strSNROList.contains(strSNROId + ","))
				{
					strSNROList = strSNROList.replace(strSNROId + ",", "");
				}
				else if(strSNROList.contains(strSNROId))
				{
					strSNROList = strSNROList.replace(strSNROId, "");
				}
			}
			iSNROCnt = iSNROCnt - 1;
			
			param.clear();
			
			param.put("FAB_ID", strFactroy);
			param.put("AREA_ID", strArea);
			param.put("EQP_GRP", strEqpGrp);
			param.put("SNRO_LIST", strSNROList);
			param.put("SNRO_CNT", iSNROCnt);
			
	
		    int setScenarioPool = scenarioDAO.setScenarioPool(param);
			
		    return setScenarioPool;
		}
	}
	
	
	
	public boolean CheckSNRO_EQP_MAPPING(String strFactroy, String strArea, String strEqpGrp, String strSNROId) {
		
		Map<String,Object> param = new HashMap<String,Object>();
		
		param.put("FAB_ID", strFactroy);
		param.put("AREA_ID", strArea);
		param.put("EQP_GRP", strEqpGrp);
		param.put("SNRO_ID", strSNROId);
		
		List<Map<String,Object>> SNRO_CNT = scenarioDAO.getScenarioListCNT(param);
		int cnt = Integer.parseInt(SNRO_CNT.get(0).get("CNT").toString());
		
		if(cnt > 0)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	public List<Map<String, Object>> getEQPMappingList(String strFactroy, String strArea, String strEqpGrp) {
		
		List<Map<String,Object>> eqpList = new ArrayList<Map<String, Object>>();
		Map<String,Object> param = new HashMap<String,Object>();
		
		param.put("FAB_ID", strFactroy);
		param.put("AREA_ID", strArea);
		param.put("EQP_GRP", strEqpGrp);
		
		eqpList = scenarioDAO.getEQPMappingList(param);
		
		return eqpList;
	}
	
	public List<Map<String, Object>> getScenarioFromAlarm(String strFactroy, String strArea, String strEqpGrp, String strAlarmId) {
		
		List<Map<String,Object>> epgGrpList = new ArrayList<Map<String, Object>>();
		Map<String,Object> param = new HashMap<String,Object>();
		String[] arrSNROList = null;
		List<Map<String,Object>> result = new ArrayList<Map<String, Object>>();
		String strSNROList = "";
		
		param.put("FAB_ID", strFactroy);
		param.put("AREA_ID", strArea);
		param.put("EQP_GRP", strEqpGrp);
		
		epgGrpList = scenarioDAO.getEqpGrpListForSNROCNT(param);
		
		if(epgGrpList != null && epgGrpList.size() > 0)
			strSNROList = epgGrpList.get(0).get("SNRO_LIST") != null ?  epgGrpList.get(0).get("SNRO_LIST").toString() : null;
		
		if(strSNROList != null && strAlarmId.isEmpty() == false)
		{
			arrSNROList = strSNROList.split(",");
		
			for(int i = 0; i <arrSNROList.length; i++)
			{
				param.clear();
				param.put("FAB_ID", strFactroy);
				param.put("AREA_ID", strArea);
				param.put("SNRO_ID", arrSNROList[i]);
				param.put("ALARM_ID", strAlarmId);
				
				List<Map<String,Object>> scenario = new ArrayList<Map<String, Object>>();
				
				scenario = scenarioDAO.getScenarioFromAlarm(param);
				
				if(scenario != null && scenario.size() > 0)
				{
					Map<String,Object> resultMap = new HashMap<String,Object>();
					resultMap.put("SNRO_ID", scenario.get(0).get("SNRO_ID"));
					resultMap.put("SNRO_NM", scenario.get(0).get("SNRO_NM"));
					resultMap.put("SNRO_DESC", scenario.get(0).get("SNRO_DESC"));
					resultMap.put("TRY_LIMIT_CNT", scenario.get(0).get("TRY_LIMIT_CNT"));
					result.add(resultMap);
				}							
			}
		}
		
		
	
		return result;
	}
	
	public boolean setScenarioForEQP(String strFactroy, String strArea, String strEqpGrp, String strEqp, String strAlarmId, String strSNROId, String strAutoFlag) {
		
		List<Map<String,Object>> scenario = new ArrayList<Map<String, Object>>();
		List<Map<String,Object>> scenarioList = new ArrayList<Map<String, Object>>();
		Map<String,Object> param = new HashMap<String,Object>();
		
		param.clear();
		param.put("FAB_ID", strFactroy);
		param.put("AREA_ID", strArea);
		param.put("SNRO_ID", strSNROId);
		param.put("ALARM_ID", strAlarmId);
		
		scenario = scenarioDAO.getScenarioFromAlarm(param);
		
		if(scenario != null && scenario.size() > 0)
		{		
			param.clear();
			param.put("FAB_ID", strFactroy);
			param.put("AREA_ID", strArea);
			param.put("EQP_GRP", strEqpGrp);
			param.put("EQP_ID", strEqp);
			param.put("ALARM_ID", strAlarmId);
			param.put("SNRO_ID", strSNROId);
			
			scenarioList = scenarioDAO.getScenarioList(param);
			
			if(scenarioList != null && scenarioList.size() > 0)
			{
				param.clear();
				param.put("FAB_ID", strFactroy);
				param.put("AREA_ID", strArea);
				param.put("EQP_GRP", strEqpGrp);
				param.put("EQP_ID", strEqp);
				param.put("ALARM_ID", strAlarmId.toString());
				param.put("SNRO_ID", strSNROId.toString());
				param.put("AUTO_FLAG", strAutoFlag.toString());
				
				int result = scenarioDAO.setScenarioForEQP_Update(param);
				if(result > 0)
					return true;
			}
			else
			{
				String strSNRONm = strSNROId.toString() + "_" + strAlarmId.toString().substring(0,3);
				
				param.clear();
				param.put("FAB_ID", strFactroy);
				param.put("AREA_ID", strArea);
				param.put("EQP_GRP", strEqpGrp);
				param.put("EQP_ID", strEqp);
				param.put("ALARM_ID", strAlarmId.toString());
				param.put("SNRO_ID", strSNROId.toString());
				param.put("SNRO_NM", strSNRONm);
				param.put("AUTO_FLAG", strAutoFlag.toString());
				
				int result = scenarioDAO.setScenarioForEQP_Insert(param);
				if(result > 0)
					return true;
			}
		}
		else
		{
			return false;
		}
	
		return false;
	}
	
	public boolean removeScenarioForEQP(String strFactroy, String strArea, String strEqpGrp, String strEqp, String strAlarmId, String strSNROId, String strAutoFlag) {
		
		Map<String,Object> param = new HashMap<String,Object>();
		
		param.clear();
		param.put("FAB_ID", strFactroy);
		param.put("AREA_ID", strArea);
		param.put("EQP_GRP", strEqpGrp);
		param.put("EQP_ID", strEqp);
		param.put("ALARM_ID", strAlarmId);
		param.put("SNRO_ID", strSNROId);
		param.put("AUTO_FLAG", strAutoFlag.toString());
		
		int result = scenarioDAO.setScenarioForEQP_Delete(param);
		
		return false;
	}
}
