package com.skcc.AutoJudge.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skcc.AutoJudge.dao.MasterDao;

@Service
public class MasterService {

	@Autowired
	private MasterDao masterDAO;

	public List<Map<String, Object>> getFactoryInfo() {
		return masterDAO.getFactoryInfo();
	}
	
	public List<Map<String, Object>> getAreaInfo(String strFactroy) {
		
		List<Map<String,Object>> area = new ArrayList<Map<String, Object>>();
		Map<String,Object> param = new HashMap<String,Object>();
		
		param.put("FAB_ID", strFactroy);
		area = masterDAO.getAreaInfo(param);
		
		return area;
	}
	
	public List<Map<String, Object>> getEqpGrpInfo(String strFactroy, String strArea) {
		List<Map<String,Object>> eqpgrp = new ArrayList<Map<String, Object>>();
		Map<String,Object> param = new HashMap<String,Object>();
		
		param.put("FAB_ID", strFactroy);
		param.put("AREA_ID", strArea);
		eqpgrp = masterDAO.getEqpGrpInfo(param);
		
		return eqpgrp;
	}
	
	public List<Map<String, Object>> getEqpInfo(String strFactroy, String strArea, String strEqpGrp) {
		
		List<Map<String,Object>> eqpgrp = new ArrayList<Map<String, Object>>();
		Map<String,Object> param = new HashMap<String,Object>();
		
		param.put("FAB_ID", strFactroy);
		param.put("AREA_ID", strArea);
		param.put("EQP_GRP", strEqpGrp);
		eqpgrp = masterDAO.getEqpInfo(param);
		
		return eqpgrp;
	}
	
}
