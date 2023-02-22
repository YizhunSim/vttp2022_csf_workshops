package vttp2022sdfassessment.server.models;

import java.util.Date;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;

public class Post {
    private String posting_id;
    private Date posting_date;
    private String name;
    private String email;
    private String phone;
    private String title;
    private String description;
    private String image;

    public String getPosting_id() {
        return posting_id;
    }

    public void setPosting_id(String posting_id) {
        this.posting_id = posting_id;
    }

    public Date getPosting_date() {
        return posting_date;
    }

    public void setPosting_date(Date posting_date) {
        this.posting_date = posting_date;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    /*
    {
    postingid: <generated posting id>,
    postingDate: <posting date>,
    name: <name>,
    email: <email>,
    phone: <phone>,
    title: <title>,
    description: <description>,
    image: <image URL from Spaces/S3>
    } 
     */

    public JsonObject toJson() {
        return Json.createObjectBuilder()
                .add("posting_id", posting_id)
                .add("posting_date", posting_date.toString())
                .add("name", name)
                .add("email", email)
                .add("phone", phone)
                .add("title", title)
                .add("description", description)
                .add("image", image)
                .build();
    }
}
