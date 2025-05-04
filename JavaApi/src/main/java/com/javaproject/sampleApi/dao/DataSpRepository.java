package com.javaproject.sampleApi.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.javaproject.sampleApi.dto.DataSpEntity;

public interface DataSpRepository extends JpaRepository<DataSpEntity, Integer>{
}
