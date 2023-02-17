package vttp2022.csf.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vttp2022.csf.server.models.Post;
import vttp2022.csf.server.repositories.PostRepository;

@Service
public class PostServices {
    @Autowired
    private PostRepository postRepo;

    public boolean createPost(Post post) {
        return postRepo.insertPost(post);
    }
}
