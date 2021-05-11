package com.skcc.AutoJudge.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ActivityDao {
	
	@Autowired
	private SqlSessionTemplate sqlSessionTemplate;

	public List<Map<String, Object>> getActivityList(Map<String, Object> param) {

		return sqlSessionTemplate.selectList("GetActivityInfo.getActivityList", param);

	}
	
	
	public List<Map<String, Object>> getActivityDesc(Map<String, Object> param) {

		return sqlSessionTemplate.selectList("GetActivityInfo.getActivityDesc", param);

	}
}
