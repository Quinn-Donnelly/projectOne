package com.revature.api.beans;

import java.io.Serializable;
import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Request implements Serializable {
	
	private static final long serialVersionUID = 1354526190633936324L;
	@JsonProperty("request_id")
	private int requestID;
	@JsonProperty("requester_id")
	private int requesterID;
	@JsonProperty("resolver_id")
	private int resolverID;
	@JsonProperty("date_of_request")
	private Timestamp dateOfRequest;
	@JsonProperty("date_of_resolution")
	private Timestamp dateOfResolution;
	private String status;
	private String title;
	private String description;
	@JsonProperty("resolution_note")
	private String resolutionNote;
	private float amount;
	
	public Request() {
		super();
	}

	public Request(int requestID, int requesterID, int resolverID, Timestamp dateOfRequest, Timestamp dateOfResolution,
			String status, String title, String description, String resolutionNote, float amount) {
		super();
		this.requestID = requestID;
		this.requesterID = requesterID;
		this.resolverID = resolverID;
		this.dateOfRequest = dateOfRequest;
		this.dateOfResolution = dateOfResolution;
		this.status = status;
		this.title = title;
		this.description = description;
		this.resolutionNote = resolutionNote;
		this.amount = amount;
	}

	public int getRequestID() {
		return requestID;
	}

	public void setRequestID(int requestID) {
		this.requestID = requestID;
	}

	public int getRequesterID() {
		return requesterID;
	}

	public void setRequesterID(int requesterID) {
		this.requesterID = requesterID;
	}

	public int getResolverID() {
		return resolverID;
	}

	public void setResolverID(int resolverID) {
		this.resolverID = resolverID;
	}

	public Timestamp getDateOfRequest() {
		return dateOfRequest;
	}

	public void setDateOfRequest(Timestamp dateOfRequest) {
		this.dateOfRequest = dateOfRequest;
	}

	public Timestamp getDateOfResolution() {
		return dateOfResolution;
	}

	public void setDateOfResolution(Timestamp dateOfResolution) {
		this.dateOfResolution = dateOfResolution;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getResolutionNote() {
		return resolutionNote;
	}

	public void setResolutionNote(String resolutionNote) {
		this.resolutionNote = resolutionNote;
	}

	public float getAmount() {
		return amount;
	}

	public void setAmount(float amount) {
		this.amount = amount;
	}

	@Override
	public String toString() {
		return "Request [requestID=" + requestID + ", requesterID=" + requesterID + ", resolverID=" + resolverID
				+ ", dateOfRequest=" + dateOfRequest + ", dateOfResolution=" + dateOfResolution + ", status=" + status
				+ ", title=" + title + ", description=" + description + ", resolutionNote=" + resolutionNote
				+ ", amount=" + amount + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + Float.floatToIntBits(amount);
		result = prime * result + ((dateOfRequest == null) ? 0 : dateOfRequest.hashCode());
		result = prime * result + ((dateOfResolution == null) ? 0 : dateOfResolution.hashCode());
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + requestID;
		result = prime * result + requesterID;
		result = prime * result + ((resolutionNote == null) ? 0 : resolutionNote.hashCode());
		result = prime * result + resolverID;
		result = prime * result + ((status == null) ? 0 : status.hashCode());
		result = prime * result + ((title == null) ? 0 : title.hashCode());
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
		Request other = (Request) obj;
		if (Float.floatToIntBits(amount) != Float.floatToIntBits(other.amount))
			return false;
		if (dateOfRequest == null) {
			if (other.dateOfRequest != null)
				return false;
		} else if (!dateOfRequest.equals(other.dateOfRequest))
			return false;
		if (dateOfResolution == null) {
			if (other.dateOfResolution != null)
				return false;
		} else if (!dateOfResolution.equals(other.dateOfResolution))
			return false;
		if (description == null) {
			if (other.description != null)
				return false;
		} else if (!description.equals(other.description))
			return false;
		if (requestID != other.requestID)
			return false;
		if (requesterID != other.requesterID)
			return false;
		if (resolutionNote == null) {
			if (other.resolutionNote != null)
				return false;
		} else if (!resolutionNote.equals(other.resolutionNote))
			return false;
		if (resolverID != other.resolverID)
			return false;
		if (status == null) {
			if (other.status != null)
				return false;
		} else if (!status.equals(other.status))
			return false;
		if (title == null) {
			if (other.title != null)
				return false;
		} else if (!title.equals(other.title))
			return false;
		return true;
	}
}
