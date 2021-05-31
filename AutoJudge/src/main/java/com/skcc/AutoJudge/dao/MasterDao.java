package com.skcc.AutoJudge.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class MasterDao {
	
	@Autowired
	private SqlSessionTemplate sqlSessionTemplate;

	public List<Map<String, Object>> getFactoryInfo() {
        return sqlSessionTemplate.selectList("GetMasterInfo.getFactoryInfo");
        
	}

	public List<Map<String, Object>> getAreaInfo(Map<String,Object> param) {
        return sqlSessionTemplate.selectList("GetMasterInfo.getAreaInfo", param);  
	}
	
	public List<Map<String, Object>> getEqpGrpInfo(Map<String,Object> param) {
        return sqlSessionTemplate.selectList("GetMasterInfo.getEqpGrpInfo",param);    
	}
	
	public List<Map<String, Object>> getEqpInfo(Map<String,Object> param) {
        return sqlSessionTemplate.selectList("GetMasterInfo.getEqpInfo", param);     
	}
	
	public List<Map<String, Object>> getAlarmInfo(Map<String,Object> param) {
        return sqlSessionTemplate.selectList("GetMasterInfo.getAlarmInfo", param);     
	}

}
