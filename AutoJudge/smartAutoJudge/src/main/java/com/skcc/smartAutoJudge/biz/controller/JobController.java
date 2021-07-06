package com.skcc.smartAutoJudge.biz.controller;

import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.skcc.smartAutoJudge.biz.service.JobService;

@CrossOrigin
@RestController
@RequestMapping("/JobInfo")
public class JobController {

	@Autowired
	private JobService jobservice;

	@GetMapping("/makeJobInfo")
	@ResponseBody
	public void makeJobInfo() throws Exception {

//		long test = Thread.currentThread().getId();
//
//		for (int i = 0; i < 10; i++) {
//			jobservice.executor("M16", "ETCH", "G-ETK-01", "6ETK4106", ("쓰레드" + i));
//		}
	}

	@GetMapping("/getJobList")
	@ResponseBody
	public void getJobList(@RequestParam("START_TM") String strStartTm) throws Exception {


	}

}
