package vttp2022.csf.server.controllers;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonValue;
import vttp2022.csf.server.models.Game;
import vttp2022.csf.server.services.GameServices;

@Controller
@RequestMapping(path = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
//@CrossOrigin(origins="*") // Add CORS header to the response
public class GamesController {
    @Autowired
    private GameServices gameSvc;
    @GetMapping("/games")
    public ResponseEntity<String> getGames(@RequestParam(defaultValue = "20") int limit, @RequestParam(defaultValue = "0") int offset){
        List<Game> games = gameSvc.retrieveGames(limit, offset);
        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
        games.stream().forEach(g -> {
            arrBuilder.add(g.toJson());
        });

        JsonValue resp = Json.createObjectBuilder()
        .add("games", arrBuilder.build())
        .add("limit", limit)
        .add("offset", offset)
        .add("total", games.size())
        .add("timestamp", new Date().toString())
        .build();

        System.out.printf(">>> getGames: %s\n", resp.toString());
        return ResponseEntity.ok(resp.toString());
    }
}
