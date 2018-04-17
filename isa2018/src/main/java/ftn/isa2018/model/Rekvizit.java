package ftn.isa2018.model;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "rekvizit")
public class Rekvizit implements Serializable{
	@Id
	@Column(name = "oznaka",unique=true, nullable=false)
	private String oznaka;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "bioskoprekvizit")
	private Bioskop bioskoprekvizit;
	
	@Column(name = "naziv")
	private String naziv;
	
	@Column(name = "opis")
	private String opis;
	
	
	public String getOznaka() {
		return oznaka;
	}

	public void setOznaka(String oznaka) {
		this.oznaka = oznaka;
	}
	
	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}
	
	public String getOpis() {
		return opis;
	}

	public void setOpis(String opis) {
		this.opis = opis;
	}
	
}