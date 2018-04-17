package ftn.isa2018.service;

import java.util.List;

import ftn.isa2018.model.User;

public interface UserService {

    List<User> findAll();

    User findOne(Long id);

    User save(User user);

    User delete(Long id);

    User findByEmail(String email);

}
