package com.revature;

import com.revature.daos.AccountDAO;
import com.revature.daos.CustomerDAO;
import com.revature.models.Account;
import com.revature.models.Customer;
import com.revature.services.AccountService;
import com.revature.services.CustomerService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.mockito.Mockito.when;

@SpringBootTest
@RunWith(MockitoJUnitRunner.class) //allows us to use mockito and JUnit for our tests. mockito "mocks a class"
	//we test our classes using mockito to "mock" our database/classes so as to not mess up our db
public class RevaTrustApplicationTests {


	@Test
	public void contextLoads() {
	}



}
