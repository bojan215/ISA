package ftn.isa2018.service;

import ftn.isa2018.model.*;

import java.util.List;

public interface RegUserService {

    List<RegUser> findAll();

    List<RegUser> findByName(String name);

    List<RegUser> findBySurname(String surname);

    List<RegUser> findByNameAndSurname(String name, String surname);

    RegUser findOne(Long id);

    RegUser save(RegUser usr);

    RegUser delete(Long id);

}
