package com.javaproject.sampleApi.dto;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="memo_table")
public class MemoTableEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String name;
	private String content;
	private LocalDateTime create_date;
	private LocalDateTime update_date;
	private Integer delet_flag;
	
	// 【id】getter/setter
	public Integer getId() {
		return id;
		};
	public void setId(Integer id) {
		this.id = id;
		};
	
	// 【name】getter/setter
	public String getName() {
		return name;
		};
	public void setName(String name) {
		this.name = name;
		};
	
	// 【content】getter/setter
	public String getContent() {
		return content;
		};
	public void setContent(String content) {
		this.content = content;
		};
	
	// 【create_date】getter/setter
	public LocalDateTime getCreate_date() {
		return create_date;
	};
	public void setCreate_date(LocalDateTime create_date) {
		this.create_date = create_date;
		};
	
	// 【update_date】getter/setter
	public LocalDateTime getUpdate_date() {
		return update_date;
		};
	public void setUpdate_date(LocalDateTime update_date) {
		this.update_date = update_date;
		};
		
	// 【delet_flag】getter/setter
	public Integer getDelet_flag() {
		return delet_flag;
		};
	public void setDelet_flag(Integer delet_flag) {
		this.delet_flag = delet_flag;
		};
}
