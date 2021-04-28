package com.skcc.AutoJudge.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skcc.AutoJudge.dao.ActivityDao;

@Service
public class ActivityService {
	
	@Autowired
	private ActivityDao activityDAO;

	public List<Map<String, Object>> getActivityList(String strFactroy, String strArea, String strSNRO) {
		
		List<Map<String,Object>> activity = new ArrayList<Map<String, Object>>();
		Map<String,Object> param = new HashMap<String,Object>();
		
		param.put("FAB_ID", strFactroy);
		param.put("AREA_ID", strArea);
		param.put("SNRO_ID", strSNRO);
		activity = activityDAO.getActivityList(param);
		
		List<Map<String,Object>> result = new ArrayList<Map<String, Object>>();
		for(int i = 0; i < activity.size(); i++)
		{			
			String strActivityList = activity.get(i).get("ACTIVITY_LIST").toString();
			String[] arrActivityList = strActivityList.split(",");
			String strSNRONM = activity.get(i).get("SNRO_NM").toString();
								
			for(int j = 0; j < arrActivityList.length; j++)
			{
				Map<String,Object> resultMap = new HashMap<String,Object>();
				resultMap.put("ACTIVITY_ID", arrActivityList[j]);
				
				//ACTIVITY_DESC Rule
				String strACTDesc = "[" + strSNRONM + "(" + arrActivityList[j] + ")" + "]";		
				resultMap.put("ACTIVITY_DESC", strACTDesc);

				result.add(resultMap);
			}
		}
		
		
		return result;
	}

}
