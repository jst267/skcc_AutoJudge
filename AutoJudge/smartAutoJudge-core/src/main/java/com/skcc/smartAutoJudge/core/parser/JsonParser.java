package com.skcc.smartAutoJudge.core.parser;

import java.util.Map;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonParser {

	public String MapToJsonString(Map<String, Object> map) throws ParseException {
		 
		ObjectMapper mapper = new ObjectMapper();
		String json = "";
		try {
			 json = mapper.writeValueAsString(map);
		}

		catch (JsonProcessingException e) {
			e.printStackTrace();
		}	
		
		return json;

    }
	
	
	public JSONObject MapToJson(Map<String, Object> map) throws ParseException {
 
		ObjectMapper mapper = new ObjectMapper();
		JSONObject jObject = new JSONObject();
		String json = "";
		try {
			 json = mapper.writeValueAsString(map);
		}

		catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
		System.out.println(json);
		
		JSONParser parser = new JSONParser();
		Object obj = parser.parse(json);

		JSONObject jsonObj = (JSONObject) obj;
		
		
		return jsonObj;

    }
	
	
}
