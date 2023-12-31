package com.revature.security;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtGenerator jwtGenerator;

    private final CustomUserDetailsService customUserDetailsService;

    public JwtAuthenticationFilter(JwtGenerator jwtGenerator, CustomUserDetailsService customUserDetailsService) {
        this.jwtGenerator = jwtGenerator;
        this.customUserDetailsService = customUserDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        //Get the token from the request
        String token = getJWTFromRequest(request);

        //Validate the token, get the username and role
        if (token != null && jwtGenerator.validateToken(token)){
            // We can get the username from the token
            String username = jwtGenerator.getUsernameFromToken(token);

            System.out.println(username);

            //Retrieve User details
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);


            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities()
            );

            authenticationToken.setDetails( new WebAuthenticationDetailsSource().buildDetails(request));

            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }

        filterChain.doFilter(request, response);

    }

    private String getJWTFromRequest(HttpServletRequest request){

        // Get the token from the header
        String bearerToken = request.getHeader("Authorization");

        if (bearerToken != null && bearerToken.startsWith("Bearer ")){
            return bearerToken.substring(7, bearerToken.length());
        }
        return null;
    }
}
