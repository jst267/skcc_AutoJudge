package com.skcc.smartAutoJudge.core.message;

import java.util.HashMap;
import java.util.Map;

public class AutoJudgeHeader {

	//factory
		//company
		//sendSys
		//targeSys
		//messageType
		//
	
	
//	public final Map<String, String> header = Collections.unmodifiableMap(new HashMap<String, String>() {
//        {
//            put("company", "skcc");
//            put("snedSys", "AutoJudge");
//            put("targetSys", "");
//            put("messageType", "Json");
//        }
//    });
//	
	
	 public static final HashMap<String, Object> header = new HashMap<String, Object>(){
	     {
	       put("company", "skcc");
	       put("snedSys", "AutoJudge");
	       put("messageType", "Json");	
	     }
	 };

	 
	 public Map<String, Object> getHeader() {		 
		 return header;
	 }


	 public Map<String, Object> addHeaderWithString(String Key, String Value) {
		 
		 header.put(Key, Value);		 
		 return header;		 
	 }
	 
	 public Map<String, Object> addHeaderWithMap(Map<String, Object> addMap) {	 
		 header.putAll(addMap);		 
		 return header;		 
	 }
}
