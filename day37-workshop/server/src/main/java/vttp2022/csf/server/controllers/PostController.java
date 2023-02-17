package vttp2022.csf.server.controllers;

import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import vttp2022.csf.server.models.Post;
import vttp2022.csf.server.repositories.PostException;
import vttp2022.csf.server.services.PostServices;

@Controller
@RequestMapping(path = "/api")
@CrossOrigin(origins = "*")
public class PostController {
    @Autowired
    private PostServices postServices;

    @PostMapping(path = "/post", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> createPost(@RequestPart String comments, @RequestPart MultipartFile picture) {
        Post post = new Post();
        String postId = UUID.randomUUID().toString().substring(0, 8);
        post.setId(postId);
        post.setComment(comments);
        try {
            post.setPicture(picture.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
        // save post to db
        // If cannot post, return HTTP status 500 with error message
        if (!postServices.createPost(post)) {
            JsonObject err = Json.createObjectBuilder()
                    .add("Message",  "Unable to create post")
                    .build();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err.toString());
        } else {
            JsonObject resp = Json.createObjectBuilder()
                    .add("Message", "Post: %s Created Post Successfully".formatted(post.getId()))
                    .build();
            return ResponseEntity.ok(resp.toString());
        }

    }

}
