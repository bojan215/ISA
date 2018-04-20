package ftn.isa2018.model;

import java.io.Serializable;
import java.util.ArrayList;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
@Entity
@Table(name = "pozoriste")
public class Pozoriste implements Serializable{
	@Id
	@Column(name = "pozId", nullable=false, unique=true)
	private Long id;
	
	
	@Column(name = "naziv")
	private String naziv;
	@Column(name = "adresa")
	private String adresa;
	@Column(name = "opis")
	private String opis;
	/*@Column(name = "ocena")
	private String ocena;*/
	@OneToMany(mappedBy = "pozoristepredstava", cascade = CascadeType.ALL)
	private java.util.List<Predstava> predstava = new ArrayList<Predstava>();
	@OneToMany(mappedBy = "pozoristesala", cascade = CascadeType.ALL)
	private java.util.List<Sala> sala = new ArrayList<Sala>();
	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public java.util.List<Predstava> getPredstava() {
		return predstava;
	}

	public void setPredstava(ArrayList<Predstava> predstava) {
		this.predstava = predstava;
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
	}
*/
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	
}
