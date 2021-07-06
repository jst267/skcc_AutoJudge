package com.skcc.smartAutoJudge.core.protocol;

import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

public class HttpService {
	
	public static String sendGetJsonStr(String sendUrl, String jsonValue, int timeOut) throws Exception {
		
//		String inputLine = null;
//		StringBuffer outResult = new StringBuffer();
//		
//		try {
//			URL url = new URL(sendUrl);
//			HttpURLConnection con = (HttpURLConnection) url.openConnection();
//			con.setRequestMethod("POST");
//			con.setRequestProperty("Content-Type", "application/json");
//			con.setRequestProperty("Accept-Charset", "UTF-8");
//			con.setConnectTimeout(timeOut);
//			con.setDoOutput(true);
//			
//			OutputStream os = con.getOutputStream();
//			os.write(jsonValue.getBytes("UTF-8"));
//			os.flush();
//			
//			BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream(), "UTF-8"));
//			while((inputLine = in.readLine()) != null) {
//				outResult.append(inputLine);
//			}
//			
//			con.disconnect();
//			
//			
//		}catch(Exception e) {
//			e.printStackTrace();
//		}
//		
		
		String result = null;
		
		try {
			
			HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
			factory.setReadTimeout(timeOut); // 읽기시간초과, ms
			factory.setConnectTimeout(timeOut); // 연결시간초과, ms
			HttpClient httpClient = HttpClientBuilder.create().setMaxConnTotal(100).setMaxConnPerRoute(5).build();
			factory.setHttpClient(httpClient); // 동기실행에 사용될 HttpClient 세팅
			RestTemplate restTemplate = new RestTemplate(factory);
			result = restTemplate.getForObject(sendUrl, String.class);


		} catch (Exception e) {
			e.printStackTrace();
		}

		return result;
		
	}
	
	
}
