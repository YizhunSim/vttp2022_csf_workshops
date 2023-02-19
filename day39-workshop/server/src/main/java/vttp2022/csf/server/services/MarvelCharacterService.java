package vttp2022.csf.server.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vttp2022.csf.server.models.MarvelCharacter;
import vttp2022.csf.server.repositories.CommentRepository;
import vttp2022.csf.server.repositories.MarvelCharacterCache;

@Service
public class MarvelCharacterService {
    @Autowired
    private MarvelCharacterCache marvelCharacterCache;

    @Autowired
    private MarvelAPIService marvelAPIService;

    @Autowired
    private CommentRepository commentRepo;

    public List<MarvelCharacter> getCharacters(String nameStartsWith, Integer limit, Integer offset) {

        // Call the marvel Service
       List<MarvelCharacter> characters = marvelAPIService.getCharactersByName(
        nameStartsWith,
        limit,
        offset);

        // cache results in redis
        marvelCharacterCache.saveCharacters(characters);

        return characters;
    }

    public MarvelCharacter getCharacterById(Integer characterId) {
        MarvelCharacter character;

        // Retrieve character from redis cache
        Optional<MarvelCharacter> optCharacter = marvelCharacterCache.getCharacterById(characterId);

        // if character is present
        if (optCharacter.isPresent()){
            // retrieve character from redis cache
            System.out.println("Character: %d found in cache".formatted(characterId));
            character = optCharacter.get();
        } else{ // if character not found in redis cache
            System.out.println("Character: %d not found in cache. Retrieving character from Marvel API".formatted(characterId));

            // retrieve retrieve character from Marvel API
            List<MarvelCharacter> characters = marvelAPIService.getCharacterById(characterId);

            // cache results in redis
            marvelCharacterCache.saveCharacters(characters);

            character = characters.get(0); // get first item in list
        }

        // Retrieve list of comments from mongodb
        Optional<List<String>> optComments = commentRepo.getCommentsByCharacterId(characterId);

        // check if character has comments
        if (optComments.isPresent()){
            character.setComments(optComments.get());
        }

        return character;
  
    }

    public boolean createComment(Integer characterId, String comment) {
        return commentRepo.createComment(characterId, comment);
    }
}
