package ftn.isa2018.controller;


import ftn.isa2018.model.Message;
import ftn.isa2018.model.RegUser;
import ftn.isa2018.model.AdminUser;

import ftn.isa2018.service.AdminUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;



@RestController
public class AdminUserController {

    @Autowired
    private AdminUserService adminUserService;

    @RequestMapping(value = "/getCinema/{id}", method = RequestMethod.GET)
    public ResponseEntity<List<AdminUser>> getCinema(@PathVariable("id") Long id){
    	AdminUser user = adminUserService.findOne(id);
        List<AdminUser> ret = user.getCinemaList();
        return new ResponseEntity<List<AdminUser>>(ret, HttpStatus.OK);
    }
    
    @RequestMapping(value = "/getTheatre/{id}", method = RequestMethod.GET)
    public ResponseEntity<List<AdminUser>> getTheatre(@PathVariable("id") Long id){
    	AdminUser user = adminUserService.findOne(id);
        List<AdminUser> ret = user.getTheatreList();
        return new ResponseEntity<List<AdminUser>>(ret, HttpStatus.OK);
    }
    
}
