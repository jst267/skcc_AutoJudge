package com.skcc.smartAutoJudge.core.job;

public class ThreadManagement extends Thread {
	
	public void threadWait(Thread thread) throws Exception {
		
		try {
			
			thread.wait();
			
		}
		catch(Exception e) {
			
			//System.out.println(e.getMessage().toString());

			
		}
		
	}
	
	public void threadNotify(Thread thread) throws Exception {
		
		try {
			thread.notify();
		}
		catch(Exception e) {
			
		}
		
	}
	

}
