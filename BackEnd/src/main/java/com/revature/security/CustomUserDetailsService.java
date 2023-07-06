package com.revature.security;

import com.revature.daos.CustomerDAO;
import com.revature.models.Customer;
import com.revature.models.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final CustomerDAO customerDAO;

    @Autowired
    public CustomUserDetailsService(CustomerDAO customerDAO) {
        this.customerDAO = customerDAO;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Customer c = customerDAO.findByUsername(username).orElseThrow();
        return new User(c.getUsername(),c.getPassword(),mapRoleToAuthority(c.getRole()));
    }

    private Collection<GrantedAuthority> mapRoleToAuthority(Role role){
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();

        grantedAuthorities.add(new SimpleGrantedAuthority(role.getRoleTitle()));
        return grantedAuthorities;
    }
}
