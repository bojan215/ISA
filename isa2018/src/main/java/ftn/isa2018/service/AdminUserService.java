package ftn.isa2018.service;

import ftn.isa2018.model.*;

import java.util.List;

public interface AdminUserService {

    List<AdminUser> findAll();

    List<AdminUser> findByName(String name);

    AdminUser findOne(Long id);

    AdminUser save(AdminUser usr);

    AdminUser delete(Long id);

}
