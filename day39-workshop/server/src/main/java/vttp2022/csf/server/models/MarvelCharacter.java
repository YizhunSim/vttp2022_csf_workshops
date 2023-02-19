package vttp2022.csf.server.models;

import java.util.List;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;

public class MarvelCharacter {
    /*
         "results": [
        { 
            "id": 1011054,
            "name": "Spider-Man (1602)",
            "description": "",
            "thumbnail": {
                "path": "http://i.annihil.us/u/prod/marvel/i/mg/e/03/5317713c9e746",
                "extension": "jpg"
            },
        
     */

     private Integer characterId;
     private String name;
     private String description;
     private String imagePath;
     private List<String> comments;

    public Integer getCharacterId() {
        return characterId;
    }
    public void setCharacterId(Integer characterId) {
        this.characterId = characterId;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getImagePath() {
        return imagePath;
    }
    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
    public List<String> getComments() {
        return comments;
    }
    public void setComments(List<String> comments) {
        this.comments = comments;
    }
    
    public static MarvelCharacter createFromJson(JsonObject json){
        // JsonObject from Marvel API -> Marvel Character
        MarvelCharacter mc = new MarvelCharacter();
        mc.setCharacterId(json.getInt("id"));
        mc.setName(json.getString("name"));
        mc.setDescription(json.getString("description"));

        // get path and extension from thumbnail(json) object
        JsonObject thumbnail = json.getJsonObject("thumbnail");
        String path = thumbnail.getString("path");
        String extension = thumbnail.getString("extension");
        mc.setImagePath("%s.%s".formatted(path, extension));
        return mc;
    }

    public static MarvelCharacter createFromCache(JsonObject json){
        // JsonObject from redis -> Marvel Character
        MarvelCharacter mc = new MarvelCharacter();
        mc.setCharacterId(json.getInt("characterId"));
        mc.setName(json.getString("name"));
        mc.setDescription(json.getString("description"));
        mc.setImagePath(json.getString("imagePath"));
        return mc;
    }

    public JsonObject toJson (){
        JsonObjectBuilder job = Json.createObjectBuilder()
        .add("characterId", characterId)
        .add("name", name)
        .add("description", description)
        .add("imagePath", imagePath);

        // create JsonArray of comment if comment is not null
        if (comments != null){
            JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
            comments.forEach(c -> arrBuilder.add(c));
            JsonArray commentsArray = arrBuilder.build();
            job.add("comments", commentsArray);
        }

        return job.build();

    }
     
}
