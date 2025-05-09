package com.javaproject.sampleApi.dao;

import java.util.List;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

import org.springframework.stereotype.Service;

import com.javaproject.sampleApi.dto.MemoTableEntity;

@Service
public class MemoDataDao {

	@PersistenceContext
	private EntityManager entityManager;
	
	@SuppressWarnings("unchecked")
	public List<MemoTableEntity> getMemoAll(){
		String sql = "SELECT * FROM memo_table ORDER BY id ASC";
		Query query = entityManager.createNativeQuery(sql, MemoTableEntity.class);
		return query.getResultList();
	}
}
