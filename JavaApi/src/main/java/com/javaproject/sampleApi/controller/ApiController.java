package com.javaproject.sampleApi.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.javaproject.sampleApi.dto.SampleMessage;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class ApiController {
	@GetMapping("/helloAPI")
	public SampleMessage hello() {
		String message = "ようこそ。Java Api 入門！";
		SampleMessage msg = new SampleMessage();
		msg.setMessage(message);
		return msg;
	}
}
