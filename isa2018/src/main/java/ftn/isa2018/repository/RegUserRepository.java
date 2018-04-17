package ftn.isa2018.repository;

import ftn.isa2018.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface RegUserRepository extends JpaRepository<RegUser, Long> {

    Optional<RegUser> findById(Long id);

    List<RegUser> findByName(String ime);

    List<RegUser> findBySurname(String prezime);

    List<RegUser> findByNameAndSurname(String ime, String prezime);

}
