package hu.unideb.inf.virtualwardrobe.service.implementation;

import hu.unideb.inf.virtualwardrobe.service.UserService;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Override
    public UserDetailsService getUserDetailsService() {
        return null;
    }
}
