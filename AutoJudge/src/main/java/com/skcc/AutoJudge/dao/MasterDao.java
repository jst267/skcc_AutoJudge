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
		// userMapper 라는 부분과 5단계에 있는 mapper.xml 파일의 namespace를 동일하게 맞춰준다
        //.getUserInfo 와 5단계에 있는 <select id= 부분를 동일하게 맞춰준다.
        return sqlSessionTemplate.selectList("GetMasterInfo.getFactoryInfo");
        
	}

	public List<Map<String, Object>> getAreaInfo(Map<String,Object> param) {
		// userMapper 라는 부분과 5단계에 있는 mapper.xml 파일의 namespace를 동일하게 맞춰준다
        //.getUserInfo 와 5단계에 있는 <select id= 부분를 동일하게 맞춰준다.
        return sqlSessionTemplate.selectList("GetMasterInfo.getAreaInfo", param);
        
	}
	
	public List<Map<String, Object>> getEqpGrpInfo(Map<String,Object> param) {
		// userMapper 라는 부분과 5단계에 있는 mapper.xml 파일의 namespace를 동일하게 맞춰준다
        //.getUserInfo 와 5단계에 있는 <select id= 부분를 동일하게 맞춰준다.
        return sqlSessionTemplate.selectList("GetMasterInfo.getEqpGrpInfo",param);
        
	}
	
	public List<Map<String, Object>> getEqpInfo(Map<String,Object> param) {
		// userMapper 라는 부분과 5단계에 있는 mapper.xml 파일의 namespace를 동일하게 맞춰준다
        //.getUserInfo 와 5단계에 있는 <select id= 부분를 동일하게 맞춰준다.
        return sqlSessionTemplate.selectList("GetMasterInfo.getEqpInfo", param);
        
	}
}
