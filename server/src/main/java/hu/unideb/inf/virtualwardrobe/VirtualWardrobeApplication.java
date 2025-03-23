package hu.unideb.inf.virtualwardrobe;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.ui.ModelMap;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class VirtualWardrobeApplication {
	public static void main(String[] args) {
		SpringApplication.run(VirtualWardrobeApplication.class, args);
	}

	@Bean
	ModelMapper modelMapper() {
		ModelMapper m = new ModelMapper();
		return m;
	}

}
