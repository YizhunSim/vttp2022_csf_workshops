package vttp2022.csf.server.services;

import java.io.StringReader;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import vttp2022.csf.server.models.MarvelCharacter;

@Service
public class MarvelAPIService {
    @Value("${MARVEL_API_PUBLIC_KEY}")
    private String publicKey;

    @Value("${MARVEL_API_PRIVATE_KEY}")
    private String privateKey;

    private static final String MARVEL_CHARACTERS_URL = "https://gateway.marvel.com:443/v1/public/characters";

    public List<MarvelCharacter> getCharacterById(Integer characterId) {
        String urlWithAuthParams = createUrlWithAuthParams();
        // build url with params and query params
        final String url = UriComponentsBuilder
                .fromUriString(urlWithAuthParams)
                .path("/%d".formatted(characterId))
                .toUriString();

        return getCharacters(url);
    }

    public List<MarvelCharacter> getCharactersByName(String nameStartsWith, Integer limit, Integer offset) {
        String urlWithAuthParams = createUrlWithAuthParams();

        // build url with params and query params
        final String url = UriComponentsBuilder
                .fromUriString(urlWithAuthParams)
                .queryParam("nameStartsWith", nameStartsWith)
                .queryParam("limit", limit)
                .queryParam("offset", offset)
                .toUriString();

        return getCharacters(url);
    }

    private String createUrlWithAuthParams() {
        // Create authentication params and hash
        Long ts = System.currentTimeMillis(); // current Timestamp
        String signature = "%d%s%s".formatted(ts, privateKey, publicKey);
        String hash = "";

        try {
            // Create hash from signature
            MessageDigest md5 = MessageDigest.getInstance("MD5");
            md5.update(signature.getBytes()); // signature -> bytes
            byte[] h = md5.digest(); // hashes bytes
            hash = HexFormat.of().formatHex(h); // bytes -> hex string
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }

        // build url with params and query params
        return UriComponentsBuilder
                .fromUriString(MARVEL_CHARACTERS_URL)
                .queryParam("ts", ts)
                .queryParam("apikey", publicKey)
                .queryParam("hash", hash)
                .toUriString();

    }

    private List<MarvelCharacter> getCharacters(String url) {
        // Create GET request
        RequestEntity<Void> req = RequestEntity
                .get(url)
                .accept(MediaType.APPLICATION_JSON)
                .build();

        // Make GET reponse and receive response
        RestTemplate template = new RestTemplate();
        ResponseEntity<String> resp = template.exchange(req, String.class);

        List<MarvelCharacter> characters = new LinkedList<>();

        // String -> JsonObject
        try (JsonReader reader = Json.createReader(new StringReader(resp.getBody()))) {
            JsonObject json = reader.readObject();

            // get results form jsonArray
            JsonArray results = json.getJsonObject("data").getJsonArray("results");

            // Map each JsonValue in results array into Marvel Character object
            characters = results.stream()
                    .map(jv -> jv.asJsonObject()) // JsonValue as JsonObject
                    .map(jo -> MarvelCharacter.createFromJson(jo)) // JsonObect -> MarvelCharacter
                    .toList();
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
        return characters;
    }

}
