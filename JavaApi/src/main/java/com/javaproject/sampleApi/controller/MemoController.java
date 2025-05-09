package com.javaproject.sampleApi.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.javaproject.sampleApi.dao.MemoDataDao;
import com.javaproject.sampleApi.dto.MemoTableEntity;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/memo")
public class MemoController {
	
	// 初期化
	private MemoDataDao memoDataDao;
	public MemoController(MemoDataDao memoDataDao) {
		this.memoDataDao = memoDataDao;
	}

	/**
	 * メモAPI
	 * url: /api/memo/all/
	 */
	@GetMapping("/all/")
	public List<MemoTableEntity> memoAll(){
		List<MemoTableEntity> memoList = new ArrayList<MemoTableEntity>();
		memoList = memoDataDao.getMemoAll();
		return memoList;
	}

}
