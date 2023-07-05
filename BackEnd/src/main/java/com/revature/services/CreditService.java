package com.revature.services;

import com.revature.daos.CreditDAO;
import com.revature.daos.StatusDAO;
import com.revature.models.Credit;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CreditService {

    private final CreditDAO creditDAO;
    private final StatusDAO statusDAO;

    public CreditService(CreditDAO creditDAO, StatusDAO statusDAO) {
        this.creditDAO = creditDAO;
        this.statusDAO = statusDAO;
    }

    public List<Credit> getAllCredit() { return creditDAO.findAll(); }

    public List<Credit> getCreditByStatus(String status){
        List<Credit> targetList = creditDAO.findAll()
                .stream()
                .filter( credit -> credit.getStatus().equals( statusDAO.findByStatusName(status) ) )
                .collect(Collectors.toList());
        return targetList;
    }

    //TODO:Credit not found exception
    public Credit getCreditById(int id){ return creditDAO.findById(id).orElseThrow(); }

    public Credit createCredit(Credit credit){ return creditDAO.save(credit); }


}