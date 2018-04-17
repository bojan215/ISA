package ftn.isa2018.service;

import ftn.isa2018.model.*;
import ftn.isa2018.repository.RegUserRepository;
import ftn.isa2018.service.RegUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RegUserImplService implements RegUserService{

    @Autowired
    private RegUserRepository regUserRepository;

    @Override
    public List<RegUser> findAll() {
        return regUserRepository.findAll();
    }

    @Override
    public RegUser findOne(Long id) {
    	Optional<RegUser> userList = regUserRepository.findById(id);
    	if(userList.isPresent()) {
    		RegUser user = userList.get();
            return user;
        }else
            return null;
    }

    @Override
    public RegUser save(RegUser usr) {
        return regUserRepository.save(usr);
    }

    @Override
    public RegUser delete(Long id) {
    	Optional<RegUser> usr = regUserRepository.findById(id);
        if(usr == null){
        	regUserRepository.delete(usr.get());
        }else{
            try{
                throw new Exception("Korisnik nije pronadjen!");
            }catch (Exception e){
                e.printStackTrace();
            }
        }
        regUserRepository.delete(usr.get());
        return usr.get();

    }

    @Override
    public List<RegUser> findByName(String ime) {
        List<RegUser> guestList = regUserRepository.findByName(ime);
        return guestList;
    }

    @Override
    public List<RegUser> findBySurname(String prezime) {
        List<RegUser> guestList = regUserRepository.findBySurname(prezime);
        return guestList;
    }

    @Override
    public List<RegUser> findByNameAndSurname(String ime, String prezime) {
        List<RegUser> guestList = regUserRepository.findByNameAndSurname(ime, prezime);
        return guestList;
    }
}
