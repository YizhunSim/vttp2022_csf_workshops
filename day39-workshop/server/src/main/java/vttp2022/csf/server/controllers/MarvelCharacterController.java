package vttp2022.csf.server.controllers;

import java.io.StringReader;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import vttp2022.csf.server.models.MarvelCharacter;
import vttp2022.csf.server.services.MarvelCharacterService;

@RestController
@RequestMapping(path = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "*")
public class MarvelCharacterController {
    @Autowired
    private MarvelCharacterService marvelCharacterService;

    @GetMapping(path = "/characters")
    public ResponseEntity<String> getCharacters(
            @RequestParam String nameStartsWith,
            @RequestParam(defaultValue = "20") Integer limit,
            @RequestParam(defaultValue = "0") Integer offset) {

        // get list of characters matching nameStartsWith
        List<MarvelCharacter> characters = marvelCharacterService.getCharacters(nameStartsWith, limit, offset);

        // List<MarvelCharacter> -> JsonArray
        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();

        // add each MarvelCharacter -> JsonObject
        characters.forEach(mc -> arrBuilder.add(mc.toJson()));

        JsonArray resp = arrBuilder.build();

        return ResponseEntity.ok(resp.toString());
    }

    @GetMapping(path = "/character/{characterId}")
    public ResponseEntity<String> getCharacterById(@PathVariable Integer characterId) {
        MarvelCharacter character = marvelCharacterService.getCharacterById(characterId);

        // Marvel Character -> JsonObject
        JsonObject resp = character.toJson();

        return ResponseEntity.ok(resp.toString());
    }

    @PostMapping(path = "/character/{characterId}")
    public ResponseEntity<String> postComment(@PathVariable Integer characterId, @RequestBody String body) {
        // request body
        /*
         {
            ... : ...,
            ... : ...,
            ... : ...,
            comment : some comment here
         }
         */
        
        // get comment from request body
        // String -> JsonObject
        try (JsonReader reader = Json.createReader(new StringReader(body))) {
            JsonObject json = reader.readObject();
            String comment = json.getString("comment");
            
            if(!marvelCharacterService.createComment(characterId, comment)){
                JsonObject resp = Json.createObjectBuilder()
                .add("error", "Unable to post comment")
                .build();

                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(resp.toString());
            }
            
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
        JsonObject resp = Json.createObjectBuilder()
        .add("Message", "Comment created successfully")
        .build();

        return ResponseEntity.ok(resp.toString());

    }
}
