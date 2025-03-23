package hu.unideb.inf.virtualwardrobe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class VirtualWardrobeApplication {
	public static void main(String[] args) {
		SpringApplication.run(VirtualWardrobeApplication.class, args);
	}

}
