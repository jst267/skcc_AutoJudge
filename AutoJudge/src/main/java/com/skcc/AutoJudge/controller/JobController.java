package com.skcc.AutoJudge.controller;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.task.TaskRejectedException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.skcc.AutoJudge.config.AsyncConfig;
import com.skcc.AutoJudge.service.JobService;

@CrossOrigin
@RestController
@RequestMapping("/JobInfo")
public class JobController {

	@Autowired
	private JobService jobservice;
	
	@GetMapping("/MakeJobInfo")
	@ResponseBody
	public void MakeJobInfo() throws InterruptedException {
		
				

 

	}
	
}
