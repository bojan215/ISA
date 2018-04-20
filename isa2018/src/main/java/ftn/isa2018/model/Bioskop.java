package ftn.isa2018.model;

import java.io.Serializable;

import java.util.ArrayList;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import antlr.collections.List;


@Entity
@Table(name = "bioskop")
public class Bioskop implements Serializable {
	@Id
    @GeneratedValue
    @Column(name = "bioId", nullable = false, unique=true)
	private Long id;
	@Column(name = "naziv")
	private String naziv;
	@Column(name = "adresa")
	private String adresa;
	@Column(name = "opis")
	private String opis;
	/*@Column(name = "ocena")
	private String ocena;*/
	@OneToMany(mappedBy = "bioskopprojekcija", cascade = CascadeType.ALL)
	private java.util.List <Projekcija> projekcija = new ArrayList<Projekcija>();
	@OneToMany(mappedBy = "bioskopsala", cascade = CascadeType.ALL)
	private java.util.List<Sala> sala;
	
	@OneToMany(mappedBy = "bioskoprekvizit", cascade = CascadeType.ALL)
	private java.util.List<Rekvizit> rekviziti;
	
	
	
	public String getNaziv() {
		return naziv;
	}
	
	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public java.util.List<Projekcija> getProjekcija() {
		return projekcija;
	}

	public void setProjekcija(ArrayList<Projekcija> projekcija) {
		this.projekcija = projekcija;
	}

	public java.util.List<Sala> getSala() {
		return sala;
	}

	public void setSala(ArrayList<Sala> sala) {
		this.sala = sala;
	}

	public String getAdresa() {
		return adresa;
	}

	public void setAdresa(String adresa) {
		this.adresa = adresa;
	}

	public String getOpis() {
		return opis;
	}

	public void setOpis(String opis) {
		this.opis = opis;
	}
	
	/*public String getOcena() {
		return ocena;
	}

	public void setOcena(String ocena) {
		this.ocena = ocena;
	}*/
	
	public java.util.List<Rekvizit> getRekvizit() {
		return rekviziti;
	}

	public void setRekvizit(ArrayList<Rekvizit> rekviziti) {
		this.rekviziti = rekviziti;
	}
	
}
