package com.skcc.smartAutoJudge.biz.model;

public class Equipment {
	
	private String EqpGrp;
	private String EqpId;
	private String Type;
	private boolean decesion;
	public boolean isDecesion() {
		return decesion;
	}
	public void setDecesion(boolean decesion) {
		this.decesion = decesion;
	}
	private int Validation;
	
	public int getValidation() {
		return Validation;
	}
	public void setValidation(int validation) {
		Validation = validation;
	}
	public String getType() {
		return Type;
	}
	public void setType(String type) {
		Type = type;
	}
	private int EqpSpecData;
	
	public String getEqpGrp() {
		return EqpGrp;
	}
	public void setEqpGrp(String eqpGrp) {
		EqpGrp = eqpGrp;
	}
	public String getEqpId() {
		return EqpId;
	}
	public void setEqpId(String eqpId) {
		EqpId = eqpId;
	}
	public int getEqpSpecData() {
		return EqpSpecData;
	}
	public void setEqpSpecData(int eqpSpecData) {
		EqpSpecData = eqpSpecData;
	}
	
}