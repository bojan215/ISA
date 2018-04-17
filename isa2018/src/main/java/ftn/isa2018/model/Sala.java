package ftn.isa2018.model;

import java.io.Serializable;
import java.util.ArrayList;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
@Entity
@Table(name = "sala")
public class Sala implements Serializable {
	@Id
    @GeneratedValue
	@Column(name = "slId" , nullable=false, unique=true)
	private Long id;
	@Column(name = "slNaziv")
	private String naziv;
	//Dodati segmente u sali
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bioId")
	private Bioskop bioskopsala;
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pozId") 
	private Pozoriste pozoristesala;
	@OneToMany(mappedBy = "salamesta", cascade = CascadeType.ALL)
	private java.util.List<Mesto> mesto = new ArrayList<Mesto>();
	
	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public java.util.List<Mesto> getMesto() {
		return mesto;
	}

	public void setMesto(ArrayList<Mesto> mesto) {
		this.mesto = mesto;
	}
}
