package vttp2022.csf.server.models;

import org.bson.Document;

import jakarta.json.Json;
import jakarta.json.JsonObject;

public class Game {
    private int id;
    private String name;
    private int year;
    private int ranking;
    private int usersRated;

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    
    public int getYear() {
        return year;
    }
    public void setYear(int year) {
        this.year = year;
    }
    public int getRanking() {
        return ranking;
    }
    public void setRanking(int ranking) {
        this.ranking = ranking;
    }
    public int getUsersRated() {
        return usersRated;
    }
    public void setUsersRated(int usersRated) {
        this.usersRated = usersRated;
    }

    public static Game create(Document doc){
        Game game = new Game();
        game.setId(doc.getInteger("gid"));
        game.setName(doc.getString("name"));
        game.setYear(doc.getInteger("year"));
        game.setRanking(doc.getInteger("ranking"));
        game.setUsersRated(doc.getInteger("users_rated"));
        return game;
    }

    public JsonObject toJson(){
        return Json.createObjectBuilder()
        .add("gameId", this.id)
        .add("name", this.name)
        .add("year", this.year)
        .add("ranking", this.ranking)
        .add("users_rated", this.usersRated)
        .build();
    }

    @Override
    public String toString() {
        return "Game [id=" + id + ", name=" + name + ", year=" + year + ", ranking=" + ranking + ", usersRated="
                + usersRated + "]";
    }
    
}
