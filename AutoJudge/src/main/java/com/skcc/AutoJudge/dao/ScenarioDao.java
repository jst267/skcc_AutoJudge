package com.skcc.AutoJudge.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ScenarioDao {
	
	@Autowired
	private SqlSessionTemplate sqlSessionTemplate;
	
	
	public List<Map<String, Object>> getScenarioList(Map<String,Object> param) {
        return sqlSessionTemplate.selectList("GetScenarioInfo.getScenarioList", param);
        
	}
	
	public List<Map<String, Object>> getEqpGrpListForSNROCNT(Map<String,Object> param) {
        return sqlSessionTemplate.selectList("GetScenarioInfo.getEqpGrpListForSNROCNT", param);
        
	}
	
	public List<Map<String, Object>> getScenarioFromEqpGrp(Map<String,Object> param) {
        return sqlSessionTemplate.selectList("GetScenarioInfo.getScenarioFromEqpGrp", param);
        
	}	
	
	public List<Map<String, Object>> getAllScenarioList(Map<String,Object> param) {
        return sqlSessionTemplate.selectList("GetScenarioInfo.getAllScenarioList", param);
        
	}	
	
	public int setScenarioPool(Map<String,Object> param) {
        return sqlSessionTemplate.insert("SetScenarioInfo.setScenarioPool", param);
        
	}
	
}
