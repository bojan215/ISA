package ftn.isa2018.model;

//import  ftn.isa2018.model.Reservation;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "regUser")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class RegUser extends User implements Serializable{
	

	  @OneToMany(mappedBy = "oglaskorisnik", cascade = CascadeType.ALL)
	    @JsonIgnore
	    private List<Oglas> oglasi = new ArrayList<Oglas>();
	  
    @ManyToMany(cascade = CascadeType.REFRESH /*, fetch = FetchType.EAGER*/) //izbacuje mi gresku za fetch o.O
    @JoinColumn(name = "id")
    @JsonIgnore
    private List<RegUser> friendList = new ArrayList<RegUser>();

    @ManyToMany(cascade = CascadeType.REFRESH /*, fetch = FetchType.EAGER*/)
    @JoinColumn(name = "id")
    @JsonIgnore
    private List<RegUser> pendingList = new ArrayList<RegUser>();

    @ManyToMany(cascade = CascadeType.REFRESH /*, fetch = FetchType.EAGER*/)
    @JoinColumn(name = "id")
    @JsonIgnore
    private List<RegUser> sentList = new ArrayList<RegUser>();
    @Column(name = "active", nullable = false)
    private boolean active;


    /*
    @ManyToMany(mappedBy = "acceptedRegUsers")
    @JsonIgnore
    private Set<Reservation> reservations;


   

    public Set<Reservation> getReservations() {

        return reservations;
    }

    public void setReservations(Set<Reservation> reservations) {
        this.reservations = reservations;
    }
    */
    public RegUser() {
    }
    public RegUser(User user) {
        super(user);
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public List<RegUser> getFriendList() {
        return friendList;
    }

    public void setFriendList(List<RegUser> friendList) {
        this.friendList = friendList;
    }

    public List<RegUser> getPendingList() {
        return pendingList;
    }

    public void setPendingList(List<RegUser> pendingList) {
        this.pendingList = pendingList;
    }

    public List<RegUser> getSentList() {
        return sentList;
    }

    public void setSentList(List<RegUser> sentList) {
        this.sentList = sentList;
    }

    public List<Oglas> getOglasi() {
        return oglasi;
    }

    public void setOglasi(List<Oglas> oglasi) {
        this.oglasi = oglasi;
    }

}
