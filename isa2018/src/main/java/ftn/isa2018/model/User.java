package ftn.isa2018.model;



import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import ftn.isa2018.model.UserType;
@Entity
@Table(name = "user")
@Inheritance(strategy = InheritanceType.JOINED)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User {

	@Id
    @GeneratedValue
    @Column(name = "id")
	private long id; 
	@Column(name = "email", nullable = false)
	private String email;
	@Column(name = "name", nullable = false)
	private String name; 
	public String getName() {
		return name;
	}
	
    @Enumerated(EnumType.STRING)
    private UserType type;
	public UserType getType() {
		return type;
	}

	public void setType(UserType type) {
		this.type = type;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getPhoneNum() {
		return phoneNum;
	}

	public void setPhoneNum(String phoneNum) {
		this.phoneNum = phoneNum;
	}
	
	@Column(name = "surname", nullable = false)
	private String surname;
	@Column(name = "city", nullable = false)
	private String city;
	@Column(name = "phoneNum", nullable = false)
	private String phoneNum;
	@Column(name = "password", nullable = false)
	private String password;
	
	public User(String name, String surname,String city,String phoneNum, String password, String email, UserType type) {
        this.name = name;
        this.surname = surname;
        this.password = password;
        this.email = email;
        this.city = city;
        this.phoneNum = phoneNum;
        this.type=type;
    }

    public User(User user){
        this.name = user.name;
        this.surname = user.surname;
        this.password = user.password;
        this.email = user.email;
        this.city = user.city;
        this.phoneNum = user.phoneNum;
        this.type=user.type;
    }
    public User() {
    }


	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        User user = (User) o;

        return id == user.id;
    }
	
	
	
	
	
}
