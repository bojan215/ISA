package ftn.isa2018.service;

import ftn.isa2018.model.User;
import ftn.isa2018.repository.UserRepository;
import ftn.isa2018.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override 
    public User findOne(Long id) {
    	Optional<User> userList = userRepository.findById(id);
    	if(userList.isPresent()) {
            User user = userList.get();
            return user;
        }else
            return null;
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public User delete(Long id) {
    	Optional<User> user = userRepository.findById(id);
        if(user == null){
            userRepository.delete(user.get());
        }else{
            try{
                throw new Exception("Korisnik nije pronadjen!");
            }catch (Exception e){
                e.printStackTrace();
            }
        }

        return user.get();
    }

    @Override
    public User findByEmail(String email) {
        List<User> userList = userRepository.findByEmail(email);
        if(!userList.isEmpty()) {
            User user = userList.get(0);
            return user;
        }else
            return null;
    }
}
