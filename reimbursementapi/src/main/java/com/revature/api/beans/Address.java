package com.revature.api.beans;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Address implements Serializable {
	private static final long serialVersionUID = 7786508577155399832L;
	@JsonProperty("address_id")
	private int addressID;
	private String country;
	private String state;
	private int zipcode;
	private String street;
	@JsonProperty("apartment_number")
	private int apartmentNumber;
	
	public Address() {
		super();
	}
	
	public Address(int addressID, String country, String state, int zipcode, String street, int apartmentNumber) {
		super();
		this.addressID = addressID;
		this.country = country;
		this.state = state;
		this.zipcode = zipcode;
		this.street = street;
		this.apartmentNumber = apartmentNumber;
	}

	public int getAddressID() {
		return addressID;
	}

	public void setAddressID(int addressID) {
		this.addressID = addressID;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public int getZipcode() {
		return zipcode;
	}

	public void setZipcode(int zipcode) {
		this.zipcode = zipcode;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public int getApartmentNumber() {
		return apartmentNumber;
	}

	public void setApartmentNumber(int apartmentNumber) {
		this.apartmentNumber = apartmentNumber;
	}

	@Override
	public String toString() {
		return "Address [addressID=" + addressID + ", country=" + country + ", state=" + state + ", zipcode=" + zipcode
				+ ", street=" + street + ", apartmentNumber=" + apartmentNumber + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + addressID;
		result = prime * result + apartmentNumber;
		result = prime * result + ((country == null) ? 0 : country.hashCode());
		result = prime * result + ((state == null) ? 0 : state.hashCode());
		result = prime * result + ((street == null) ? 0 : street.hashCode());
		result = prime * result + zipcode;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Address other = (Address) obj;
		if (addressID != other.addressID)
			return false;
		if (apartmentNumber != other.apartmentNumber)
			return false;
		if (country == null) {
			if (other.country != null)
				return false;
		} else if (!country.equals(other.country))
			return false;
		if (state == null) {
			if (other.state != null)
				return false;
		} else if (!state.equals(other.state))
			return false;
		if (street == null) {
			if (other.street != null)
				return false;
		} else if (!street.equals(other.street))
			return false;
		if (zipcode != other.zipcode)
			return false;
		return true;
	}
}
