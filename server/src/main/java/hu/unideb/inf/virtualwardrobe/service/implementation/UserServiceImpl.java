package hu.unideb.inf.virtualwardrobe.service.implementation;

import hu.unideb.inf.virtualwardrobe.service.UserService;
import org.springframework.security.core.userdetails.UserDetailsService;

public class UserServiceImpl implements UserService {
    @Override
    public UserDetailsService getUserDetailsService() {
        return null;
    }
}
