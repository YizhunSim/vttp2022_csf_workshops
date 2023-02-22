package vttp2022sdfassessment.server.controllers;

import java.io.IOException;
import java.io.StringReader;
import java.text.Format;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import vttp2022sdfassessment.server.models.Post;
import vttp2022sdfassessment.server.repositories.PostCache;
import vttp2022sdfassessment.server.services.PostService;
import vttp2022sdfassessment.server.services.S3Service;

@RestController
@RequestMapping(path = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "*")
public class PostingController {

    @Autowired
    private PostService postSvc;

    @Autowired
    private S3Service s3Service;

    @PostMapping(path = "/post", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> createPost(
            @RequestPart String name,
            @RequestPart String email,
            @RequestPart String phone,
            @RequestPart String title,
            @RequestPart String description,
            @RequestPart MultipartFile image) {

        System.out.printf("name: %s\n", name);
        System.out.printf("email: %s\n", email);
        System.out.printf("phone: %s\n", phone);
        System.out.printf("title: %s\n", title);
        System.out.printf("description: %s\n", description);
        System.out.printf("image: %s\n", image.getOriginalFilename());
        System.out.printf("content type: %s\n", image.getContentType());

        String postingId = UUID.randomUUID().toString().substring(0, 8);

        // Create the post object from request form from angular
        Post post = new Post();
        post.setPosting_id(postingId);
        post.setPosting_date(new Date());
        post.setName(name);
        post.setPhone(phone);
        post.setEmail(email);
        post.setTitle(title);
        post.setDescription(description);

        // Post image is set in postService
        postSvc.saveToCacheAndS3(post, image);

        if (post.getImage().isEmpty()) {
            JsonObject resp = Json.createObjectBuilder()
                    .add("error", "Unable to upload to redis cache")
                    .build();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(resp.toString());

        }
        JsonObject payload = Json.createObjectBuilder()
                .add("postingid", post.getPosting_id())
                .add("postingDate", post.getPosting_date().toString())
                .add("name", post.getName())
                .add("email", post.getEmail())
                .add("phone", post.getPhone())
                .add("title", post.getTitle())
                .add("description", post.getDescription())
                .add("image", post.getImage())
                .build();

        return ResponseEntity.ok(payload.toString());

    }

    @PutMapping(path = "/posting/{posting_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> updatePost(@RequestBody String payload, @PathVariable String posting_id) {
        System.out.println(">>> Update Post: " + payload);

        // Get posting from request body
        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject json = reader.readObject();

        // If posting found in redis
        if (postSvc.isPostInCache(posting_id)) {
            // Create the post object from request form from angular
            Post post = new Post();
            post.setPosting_id(posting_id);
            post.setPosting_date(new Date());
            post.setName(json.getString("name"));
            post.setPhone(json.getString("phone"));
            post.setEmail(json.getString("email"));
            post.setTitle(json.getString("title"));
            post.setDescription(json.getString("description"));
            post.setImage(json.getString("image"));

            postSvc.savePost(post);

            JsonObject resp = Json.createObjectBuilder()
                    .add("message", "Accepted " + posting_id)
                    .build();
            
            return ResponseEntity.ok(resp.toString());

        // If posting not found in redis
        } else{ 
            JsonObject resp = Json.createObjectBuilder()
            .add("message", "Posting ID " + posting_id +" not found")
            .build();

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(resp.toString());
        }
    }

}
