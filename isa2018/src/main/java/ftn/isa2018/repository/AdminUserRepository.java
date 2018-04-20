package ftn.isa2018.repository;

import ftn.isa2018.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface AdminUserRepository extends JpaRepository<AdminUser, Long> {

    Optional<AdminUser> findById(Long id);

    List<AdminUser> findByName(String naziv);


}
