package com.revature.controllers;

import com.revature.daos.CustomerDAO;
import com.revature.daos.RoleDAO;
import com.revature.dto.AuthResponseDTO;
import com.revature.dto.LoginDTO;
import com.revature.dto.RegisterDTO;
import com.revature.models.Customer;
import com.revature.models.Role;
import com.revature.security.JwtGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final CustomerDAO customerDAO;

    private final RoleDAO roleDAO;

    private final PasswordEncoder passwordEncoder;

    private final JwtGenerator jwtGenerator;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, CustomerDAO customerDAO,
                          RoleDAO roleDAO, PasswordEncoder passwordEncoder, JwtGenerator jwtGenerator) {
        this.authenticationManager = authenticationManager;
        this.customerDAO = customerDAO;
        this.roleDAO = roleDAO;
        this.passwordEncoder = passwordEncoder;
        this.jwtGenerator = jwtGenerator;
    }

    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody RegisterDTO registerDTO){

        //Verify username or email does not already exist
        if( customerDAO.existsByUsername(registerDTO.getUsername()) || customerDAO.existsByEmail(registerDTO.getEmail())){
            return new ResponseEntity<String>("Username or email already exists", HttpStatus.BAD_REQUEST);
        }

        //Build user from registerDTO
        Customer c = new Customer(
                registerDTO.getFirstName(),
                registerDTO.getLastName(),
                registerDTO.getUsername(),
                registerDTO.getEmail(),
                passwordEncoder.encode(registerDTO.getPassword()),
                registerDTO.getStreetAddress(),
                registerDTO.getCity(),
                registerDTO.getState(),
                registerDTO.getZip(),
                registerDTO.getPhone(),
                roleDAO.getByRoleTitle("Customer")
        );

        ////Save the new user to the DB
        customerDAO.save(c);

        return new ResponseEntity<>("User successfully registered", HttpStatus.CREATED);
    }

    @PostMapping("login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDTO loginDTO){

        //Authenticate the user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword())
        );

        // Store the authentication inside of the SecurityContext
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtGenerator.generateToken(authentication);

        return new ResponseEntity<AuthResponseDTO>(new AuthResponseDTO(token), HttpStatus.OK);
    }


}
