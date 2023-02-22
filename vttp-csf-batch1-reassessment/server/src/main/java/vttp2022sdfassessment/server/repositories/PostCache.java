package vttp2022sdfassessment.server.repositories;

import java.io.StringReader;
import java.time.Duration;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import vttp2022sdfassessment.server.models.Post;

@Repository
public class PostCache {
    
    @Autowired
    @Qualifier("POST_CACHE")
    RedisTemplate<String, String> redisTemplate;

    public void savePost(Post post){
        redisTemplate.opsForValue().set(post.getPosting_id(),
        post.toJson().toString(), Duration.ofMinutes(15)
        );
    }

    public boolean getPostingById(String postingId) {
        String value = redisTemplate.opsForValue().get(postingId);
  
        // if character not found, return empty object
        if (value == null){
          return false;
        }
       
        redisTemplate.delete(postingId);
        return true;
      }
  
}
