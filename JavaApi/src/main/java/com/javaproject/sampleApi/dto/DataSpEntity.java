package com.javaproject.sampleApi.dto;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="data_sp")
public class DataSpEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private LocalDateTime Date;
	private Double Open;
	private Double High;
	private Double Low;
	private Double Close;
	
	//ID
	public Integer getId() {
    	return id;
    	}
    public void setId(Integer id) {
    	this.id = id;
    	}
    //Date
    public LocalDateTime getDate() {
    	return Date;
    	}
    public void setDate(LocalDateTime Date) {
    	this.Date = Date;
    	}
    //Open
    public Double getOpen() {
    	return Open;
    	}
    public void setOpen(Double Open) {
    	this.Open = Open;
    	}
    //High
    public Double getHigh() {
    	return High;
    	}
    public void setHigh(Double High) {
    	this.High = High;
    	}
    //Low
    public Double getLow() {
    	return Low;
    	}
    public void setLow(Double Low) {
    	this.Low = Low;
    	}
    //Close
    public Double getClose() {
    	return Close;
    	}
    public void setClose(Double Close) {
    	this.Close = Close;
    	}
}
