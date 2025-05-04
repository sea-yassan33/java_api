package com.javaproject.sampleApi.dao;

import java.util.List;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

import org.springframework.stereotype.Service;

import com.javaproject.sampleApi.dto.DataSpEntity;

@Service
public class DataSpDao {
	
	@PersistenceContext
	private EntityManager entityManager;
	
	@SuppressWarnings("unchecked")
	public List<DataSpEntity> getLataData(int limitStr){
		String sql = "SELECT * FROM data_sp ORDER BY id DESC";
		Query query = entityManager.createNativeQuery(sql,DataSpEntity.class);
		query.setMaxResults(limitStr);
		return query.getResultList();
	}
}
