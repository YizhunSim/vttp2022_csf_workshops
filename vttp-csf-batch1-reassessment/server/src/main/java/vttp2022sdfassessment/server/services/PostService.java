package vttp2022sdfassessment.server.services;

import java.io.IOException;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import vttp2022sdfassessment.server.models.Post;
import vttp2022sdfassessment.server.repositories.PostCache;
import vttp2022sdfassessment.server.repositories.PostRepository;

@Service
public class PostService {
    @Autowired
    private PostCache postCache;

    @Autowired
    private S3Service s3Service;

    @Autowired
    private PostRepository postRepository;

    public void saveToCacheAndS3(Post post, MultipartFile image) {
        // Upload Image to S3
        String imageUrlS3 = "";
        try {
            String key = s3Service.upload(image);
            
            imageUrlS3 = "https://blappy.sgp1.digitaloceanspaces.com/myobjects/" + key;
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
        System.out.println(">>> Image uploaded to S3: " + imageUrlS3);

        post.setImage(imageUrlS3);
        
        // Post to redis
        postCache.savePost(post);
    }

    public void savePost(Post post){
        postRepository.savePost(post);
    }

    public boolean isPostInCache(String postingId) {
        return postCache.getPostingById(postingId);
    }

}
