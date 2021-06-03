package com.skcc.AutoJudge.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class JobDao {
	
	@Autowired
	private SqlSessionTemplate sqlSessionTemplate;

	public List<Map<String, Object>> getJobList(Map<String,Object> param) {
        return sqlSessionTemplate.selectList("GetJobInfo.getJobList", param);
	}
	
	public int setCreateJob_Insert(Map<String, Object> param) {

		return sqlSessionTemplate.insert("setJobInfo.setCreateJob_Insert", param);
	}

}
