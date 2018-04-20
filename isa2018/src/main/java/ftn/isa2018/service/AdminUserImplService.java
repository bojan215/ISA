package ftn.isa2018.service;

import ftn.isa2018.model.*;
import ftn.isa2018.repository.AdminUserRepository;
import ftn.isa2018.service.RegUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AdminUserImplService implements AdminUserService{

    @Autowired
    private AdminUserRepository adminUserRepository;

    @Override
    public List<AdminUser> findAll() {
        return adminUserRepository.findAll();
    }

    @Override
    public AdminUser findOne(Long id) {
    	Optional<AdminUser> userList = adminUserRepository.findById(id);
    	if(userList.isPresent()) {
    		AdminUser user = userList.get();
            return user;
        }else
            return null;
    }

    @Override
    public AdminUser save(AdminUser usr) {
        return adminUserRepository.save(usr);
    }

    @Override
    public AdminUser delete(Long id) {
    	Optional<AdminUser> usr = adminUserRepository.findById(id);
        if(usr == null){
        	adminUserRepository.delete(usr.get());
        }else{
            try{
                throw new Exception("Korisnik nije pronadjen!");
            }catch (Exception e){
                e.printStackTrace();
            }
        }
        adminUserRepository.delete(usr.get());
        return usr.get();

    }

    @Override
    public List<AdminUser> findByName(String naziv) {
        List<AdminUser> guestList = adminUserRepository.findByName(naziv);
        return guestList;
    }
}