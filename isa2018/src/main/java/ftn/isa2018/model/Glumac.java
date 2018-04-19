package ftn.isa2018.model;

import java.io.Serializable;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity

@Table(name = "glumac")
public class Glumac implements Serializable {
	@Id
	@Column(name = "glIme")
	private String ime;
	@Column(name = "glPrezime")
	private String prezime;
	
	
	public String getIme() {
		return ime;
	}
	public void setIme(String ime) {
		this.ime = ime;
	}
	public String getPrezime() {
		return prezime;
	}
	public void setPrezime(String prezime) {
		this.prezime = prezime;
	} 
}
