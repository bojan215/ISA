package ftn.isa2018.model;

//import  ftn.isa2018.model.Reservation;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;


@Entity
@Table(name = "adminUser")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class AdminUser extends User implements Serializable{

	
	
	
	@LazyCollection(LazyCollectionOption.FALSE)  
    @ManyToMany(cascade = CascadeType.REFRESH ) //izbacuje mi gresku za fetch o.O
    @JoinColumn(name = "id")
    @JsonIgnore
    private List<AdminUser> cinemaList = new ArrayList<AdminUser>();
	@LazyCollection(LazyCollectionOption.FALSE) 
    @ManyToMany(cascade = CascadeType.REFRESH )
    @JoinColumn(name = "id")
    @JsonIgnore
    private List<AdminUser> theatreList = new ArrayList<AdminUser>();
	@LazyCollection(LazyCollectionOption.FALSE) 
    @ManyToMany(cascade = CascadeType.REFRESH )
    @JoinColumn(name = "id") 
    @JsonIgnore
    private List<AdminUser> sentList = new ArrayList<AdminUser>();
    @Column(name = "active", nullable = false)
    private boolean active; 



    public AdminUser() {
    }
    public AdminUser(User user) {
        super(user);
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public List<AdminUser> getCinemaList() {
        return cinemaList;
    }

    public void setCinemaList(List<AdminUser> cinemaList) {
        this.cinemaList = cinemaList;
    }

    public List<AdminUser> getTheatreList() {
        return theatreList;
    }

    public void setTheatreList(List<AdminUser> theatreList) {
        this.theatreList = theatreList;
    }

    public List<AdminUser> getSentList() {
        return sentList;
    }

    public void setSentList(List<AdminUser> sentList) {
        this.sentList = sentList;
    }


}
