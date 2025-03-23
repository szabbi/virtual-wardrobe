package hu.unideb.inf.virtualwardrobe.service;

import hu.unideb.inf.virtualwardrobe.service.dto.LoginDto;
import hu.unideb.inf.virtualwardrobe.service.dto.RegistrationDto;

public interface AuthService {
    void registration(RegistrationDto dto);
    String login(LoginDto dto);
}
