package com.javaproject.sampleApi.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	/**
	 * メモ新規登録
	 */
	@PostMapping("/create/")
	public ResponseEntity<String> createMemo(@RequestBody MemoTableEntity memoRequest) {
		int deletFlagInt = 0;
		LocalDateTime nowTimeStamp = LocalDateTime.now();
		MemoTableEntity memoDto = new MemoTableEntity();
		memoDto.setName(memoRequest.getName());
		memoDto.setContent(memoRequest.getContent());
		memoDto.setCreate_date(nowTimeStamp);
		memoDto.setUpdate_date(nowTimeStamp);
		memoDto.setDelet_flag(deletFlagInt);
		memoDataDao.saveMemo(memoDto);
		return ResponseEntity.ok("新規登録OK");
	}
	
	/**
	 * メモ更新
	 */
	@PutMapping("/update/{id}")
	public ResponseEntity<String> updateMemo(@PathVariable Long id, @RequestBody MemoTableEntity request){
		memoDataDao.updateMemo(id, request.getName(), request.getContent());
		return ResponseEntity.ok("更新成功");
	}
	
	/**
	 * メモ削除
	 */
	@PutMapping("/delete/{id}")
	public ResponseEntity<String> deleteMemo(@PathVariable Long id, @RequestBody MemoTableEntity request){
		memoDataDao.deleteMemo(id);
		return ResponseEntity.ok("更新成功");
	}

}
