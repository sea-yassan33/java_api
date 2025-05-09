package com.javaproject.sampleApi.dao;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.javaproject.sampleApi.dto.MemoTableEntity;

@Service
public class MemoDataDao {

	private final Integer DELETE_FLAG = 1;
	
	@PersistenceContext
	private EntityManager entityManager;
	
	@SuppressWarnings("unchecked")
	public List<MemoTableEntity> getMemoAll(){
		String sql = "SELECT * FROM memo_table WHERE delet_flag = 0 ORDER BY id ASC";
		Query query = entityManager.createNativeQuery(sql, MemoTableEntity.class);
		return query.getResultList();
	}
	
	@Transactional
	public void saveMemo(MemoTableEntity memoDto) {
		entityManager.persist(memoDto);
	}
	
	@Transactional
	public void updateMemo(Long id, String newName, String newContent) {
		MemoTableEntity memoDto = entityManager.find(MemoTableEntity.class, id);
		if(memoDto != null) {
			memoDto.setName(newName);
			memoDto.setContent(newContent);
			memoDto.setUpdate_date(LocalDateTime.now());
		}else {
			throw new IllegalArgumentException("Memo with id " + id + " not found");
		}
	}
	
	@Transactional
	public void deleteMemo(Long id) {
		MemoTableEntity memoDto = entityManager.find(MemoTableEntity.class, id);
		if(memoDto != null) {
			memoDto.setUpdate_date(LocalDateTime.now());
			memoDto.setDelet_flag(DELETE_FLAG);
		}else {
			throw new IllegalArgumentException("Memo with id " + id + " not found");
		}
	}
}
