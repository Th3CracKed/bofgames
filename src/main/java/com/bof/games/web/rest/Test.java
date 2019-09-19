package com.bof.games.web.rest;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class Test {

    private static final String ENTITY_NAME = "test";

    private String value = "{\"key\": \"Test Initial\"}";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;


    @GetMapping("/test")
    public String getTest() {
        return this.value;
    }

}

