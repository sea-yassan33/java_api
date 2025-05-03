package com.javaproject.sampleApi.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(ApiController.class)
class ApiControllerTest  {

	@Autowired
    private MockMvc mockMvc;
	
    @Test
    void testHelloAPI() throws Exception {
        mockMvc.perform(get("/api/helloAPI"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("ようこそ。Java Api 入門！"));
    }

}
