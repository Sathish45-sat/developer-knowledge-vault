package com.knowledgevault.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackages = "com.knowledgevault.repository")
@EnableMongoAuditing
public class MongoConfig {
    // Basic Mongo configuration setup for future custom configurations.
}
