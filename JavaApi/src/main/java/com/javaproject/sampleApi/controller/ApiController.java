package com.javaproject.sampleApi.controller;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.javaproject.sampleApi.dao.DataSpDao;
import com.javaproject.sampleApi.dao.DataSpRepository;
import com.javaproject.sampleApi.dto.DataSpEntity;
import com.javaproject.sampleApi.dto.SampleMessage;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class ApiController {
	
	// 初期化
	private DataSpRepository dataSpRepository;
	private DataSpDao dataSpDao;
    public ApiController(DataSpRepository dataSpRepository,DataSpDao dataSpDao) {
        this.dataSpRepository = dataSpRepository;
        this.dataSpDao = dataSpDao;
    }
    
	
	@GetMapping("/helloAPI")
	public SampleMessage hello() {
		String message = "ようこそ。Java Api 入門！";
		SampleMessage msg = new SampleMessage();
		msg.setMessage(message);
		return msg;
	}
	/**
	 * 最新のデータから特定のデータ数を取得する場合
	 * url: /api/sp500_all_data?late={数字} <br>
	 * @param requestValueStr
	 * 
	 */
	// SP500のデータの取得
	@GetMapping("/sp500_all_data")
	public List<DataSpEntity> spAll(@RequestParam(value = "late",required = false) String requestValueStr) {
		List<DataSpEntity> dataSp = new ArrayList<DataSpEntity>();
		if (requestValueStr == null || requestValueStr.isEmpty()) {
			//引数がない場合
			dataSp = dataSpRepository.findAll();
			return dataSp;
		}
		// 数値かどうか
		if (isNum(requestValueStr)) {
			int valueInt = Integer.valueOf(requestValueStr);
			dataSp = dataSpDao.getLataData(valueInt);
			//id昇順
			dataSp.sort(Comparator.comparing(DataSpEntity::getId));
			
		}
		
		return dataSp;
	}
	
	// 正の数字の判定
	private boolean isNum(String str) {
		if (str == null || str.isEmpty()) {
			return false;
		}
		return str.matches("\\d+");
	}
}
