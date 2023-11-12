package com.example.CarSharing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class CarSharingApplication {

	public static void main(String[] args) {
		SpringApplication.run(CarSharingApplication.class, args);
	}

}
