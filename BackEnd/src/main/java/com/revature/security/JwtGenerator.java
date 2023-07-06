package com.revature.security;

import com.revature.models.Customer;
import com.revature.services.CustomerService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import io.jsonwebtoken.security.Keys;

import java.util.Date;

@Component
public class JwtGenerator {
    private SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    @Autowired
    private CustomerService customerService;

    //Generate a new JWT
    public String generateToken(Authentication auth){

        //Get the username
        String username = auth.getName();

        //Date JWT created
        Date currentDate = new Date();

        //JWT expiration
        //24 hours
        Date expireDate = new Date(currentDate.getTime() + (1000 * 60 * 60 * 24));

        //Retrieve Customer role and id
        Customer customer = customerService.getCustomerByUsername(username);

        //Build JWT
        String token = Jwts.builder()
                .setSubject(username)
                //TODO: set user ID and user role in custom claims.
                //TODO: This is how we can send specific data in the JWT payload!
                .claim("Id", customer.getId())
                .claim("Role", customer.getRole().getRoleTitle())
                .setIssuedAt(currentDate)
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS512, secretKey)// We need a secret key which SHOULD NOT be shared, otherwise bad
                .compact();

        return token;
    }

    // Validate an existing JWT
    public boolean validateToken(String token){

        try{
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch (Exception e){
            throw new AuthenticationCredentialsNotFoundException("JWT token is expired or invalid");
        }

    }

    // Get the username from the JWT
    public String getUsernameFromToken(String token){
        // We need to parse the jwt and extract the subject from the token
        Claims claims = Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }
}
