package ftn.isa2018.controller;

//import ftn.isa2018.model.MailManager;
import ftn.isa2018.model.*;
import ftn.isa2018.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;


@RestController
public class UserController {

    @Autowired 
    private UserService userService;
    @Autowired
    private RegUserService regUserService;
   // @Autowired
    //private MailSlanje mailSlanje;
    
    @RequestMapping(value = "/login", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity<User> login(@RequestBody TempUser tempUser){
        if (tempUser.getEmail() != null && tempUser.getPassword() != null) {
        	
            User user = userService.findByEmail(tempUser.getEmail());
            
           
            if(user != null) {
                if (user.getPassword().equals(tempUser.getPassword())) {
                    if (user instanceof RegUser) {
                    	//dodati kad se uradi verifikacija mejla
                        //if (((RegUser) user).isActive())
                    	System.out.println("Uspesno ulogovan korsnik "+user.getName());
                    	
                            return new ResponseEntity<User>(user, HttpStatus.OK); 
                            
                        //else
                       //     return new ResponseEntity<>(HttpStatus.FORBIDDEN);
                    } else
                        return new ResponseEntity<User>(user, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(HttpStatus.FORBIDDEN);
                }
            }else
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        else
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @RequestMapping(
            value = "/registerUser",
            method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<RegUser> registerUser(@RequestBody RegUser usr) throws Exception {
        if (usr.getName() != null && usr.getSurname() != null && usr.getCity() != null && usr.getPhoneNum() != null && usr.getEmail() != null && usr.getPassword() != null) {
        	RegUser savedGuest = regUserService.save(usr);
        	
            //mailSlanje.sendMail(usr);
        	System.out.println(usr.getName()+usr.getType().toString());  
        	System.out.println("Uspesno poslat mejl");
            return new ResponseEntity<RegUser>(savedGuest, HttpStatus.CREATED);
        }
        else {
            return new ResponseEntity<RegUser>(usr, HttpStatus.FORBIDDEN);
        }
    }
    
    @RequestMapping(value = "/confirm", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity<User> confirmRegistration(@RequestBody TempUser user) throws Exception{
        if (user.getEmail() != null) {
            User userRegistered = userService.findByEmail(user.getEmail());
            if(userRegistered instanceof RegUser){
                ((RegUser) userRegistered).setActive(true);
                RegUser saved = regUserService.save((RegUser)userRegistered);
                return new ResponseEntity<User>(saved, HttpStatus.OK);
            }else{
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }
        }
        else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @RequestMapping(value = "/updateRegUser", method = RequestMethod.PUT, consumes = "application/json")
    public ResponseEntity<User> updateUser(@RequestBody User user) throws Exception{
        if (user.getEmail() != null && user.getName() != null && user.getSurname() != null && user.getCity() != null && user.getPhoneNum() != null) {
            User userRegistered = userService.findOne(user.getId());

            RegUser saved = null;
            if(userRegistered instanceof RegUser){
                userRegistered.setName(user.getName());
                userRegistered.setSurname(user.getSurname());
                userRegistered.setEmail(user.getEmail());
                userRegistered.setCity(user.getCity());
                userRegistered.setPhoneNum(user.getPhoneNum());
                saved = regUserService.save((RegUser)userRegistered);
            }
            if(saved != null)
                return new ResponseEntity<User>(saved, HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

}
