package ftn.isa2018.model;

import java.io.Serializable;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "mesto")
public class Mesto implements Serializable{
	@Id
	@Column(name = "oznaka",unique=true, nullable=false)
	private String oznaka;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "mestasala")
	private Sala salamesta;
	public String getOznaka() {
		return oznaka;
	}

	public void setOznaka(String oznaka) {
		this.oznaka = oznaka;
	}
}
