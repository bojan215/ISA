package ftn.isa2018.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
@Entity
@Table(name = "projekcija")
public class Projekcija implements Serializable{
	
	@Id

	//?spisak karata sa popustima
	@Column(name = "prId" , unique=true, nullable=false)
	private String id;
	@Column(name = "prNaziv")
	private String naziv;
	
	//dodati Poster img
	//dodati prosecnu ocenu
	@Column(name = "prTrajanje")
	private String trajanje;
	@Column(name = "prCena")
	private String cena;
	@Column(name = "prSala")
	private Sala sala;
	@Column(name = "prTermin")
	private Date termin;
	@Enumerated(EnumType.STRING)
	@Column(name = "prZanr")
	private ZanrType zanr;
	@Column(name = "prImeRed")
	private String imeReditelj;
	//Many to many glumci mogu glumiti u vise filmova
	private ArrayList<Glumac> glumci;
	@Column(name = "prOpis")
	private String opis; 
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bioproj")
	private Bioskop bioskopprojekcija;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getNaziv() {
		return naziv;
	}
	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}
	
	public String getCena() {
		return cena;
	}
	public void setCena(String cena) {
		this.cena = cena;
	}
	
	public Sala getSala() {
		return sala;
	}
	public void setSala(Sala sala) {
		this.sala = sala;
	}
/*
	public Zanr getZanr() {
		return zanr;
	}
	public void setZanr(Zanr zanr) {
		this.zanr = zanr;
	}
	*/
	public String getImeReditelj() {
		return imeReditelj;
	}
	public void setImeReditelj(String imeReditelj) {
		this.imeReditelj = imeReditelj;
	}
	public ArrayList<Glumac> getGlumci() {
		return glumci;
	}
	public void setGlumci(ArrayList<Glumac> glumci) {
		this.glumci = glumci;
	}
	public String getOpis() {
		return opis;
	}
	public void setOpis(String opis) {
		this.opis = opis;
	}
	
	public String getTrajanje() {
		return trajanje;
	}
	public void setTrajanje(String trajanje) {
		this.trajanje = trajanje;
	}
	public Date getTermin() {
		return termin;
	}
	public void setTermin(Date termin) {
		this.termin = termin;
	}
	
}