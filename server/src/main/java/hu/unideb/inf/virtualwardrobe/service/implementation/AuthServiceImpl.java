package hu.unideb.inf.virtualwardrobe.service.implementation;

import hu.unideb.inf.virtualwardrobe.data.entity.UserEntity;
import hu.unideb.inf.virtualwardrobe.data.repository.UserRepository;
import hu.unideb.inf.virtualwardrobe.service.AuthService;
import hu.unideb.inf.virtualwardrobe.service.dto.LoginDto;
import hu.unideb.inf.virtualwardrobe.service.dto.RegistrationDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;


    @Override
    public void registration(RegistrationDto dto) {
        UserEntity entity = modelMapper.map(dto, UserEntity.class);
        entity.setPassword(passwordEncoder.encode(entity.getPassword()));

        userRepository.save(entity);
    }

    @Override
    public String login(LoginDto dto) {
        return null;
    }
}
