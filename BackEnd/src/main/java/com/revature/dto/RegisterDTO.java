package com.revature.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RegisterDTO {

    private String firstName;

    private String lastName;

    private String email;

    private String username;

    private String password;

    private String streetAddress;

    private String city;

    private String state;

    private String zip;

    private String phone;


}
