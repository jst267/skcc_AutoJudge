package com.skcc.smartAutoJudge.biz.service;

import org.kie.api.runtime.rule.FactHandle;
import org.kie.api.KieServices;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;

import com.skcc.smartAutoJudge.biz.model.Equipment;

public class ruleService {

	
	public int getEqpSpecData(String strType, String strEqpId) {
		
		int iEqpSpecData = -1;
	
		try {
			KieServices ks = KieServices.Factory.get();
			KieContainer kContainer = ks.getKieClasspathContainer();
			KieSession kSession = kContainer.newKieSession("ksession-rule");

			Equipment eqp = new Equipment();
			eqp.setType(strType);
			eqp.setEqpId(strEqpId);

			FactHandle fact1;
			fact1 = kSession.insert(eqp);
			kSession.fireAllRules();

			iEqpSpecData = eqp.getEqpSpecData();


		} catch (Throwable t) {
			t.printStackTrace();
		}
		
		return iEqpSpecData;
	
	}
	
	public boolean getDecesion(String strType, int spec) {
		
		boolean iEqpSpecData = false;
		
		try {
			KieServices ks = KieServices.Factory.get();
			KieContainer kContainer = ks.getKieClasspathContainer();
			KieSession kSession = kContainer.newKieSession("ksession-rule");

			Equipment eqp = new Equipment();
			eqp.setType(strType);
			eqp.setValidation(spec);

			FactHandle fact1;
			fact1 = kSession.insert(eqp);
			kSession.fireAllRules();

			iEqpSpecData = eqp.isDecesion();

		} catch (Throwable t) {
			t.printStackTrace();
		}

		return iEqpSpecData;
		
		
	}
	
}
