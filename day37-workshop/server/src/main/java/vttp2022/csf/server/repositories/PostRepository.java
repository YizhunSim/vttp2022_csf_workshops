package vttp2022.csf.server.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import vttp2022.csf.server.models.Post;

import static vttp2022.csf.server.repositories.Queries.*;

import java.io.ByteArrayInputStream;

@Repository
public class PostRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public boolean insertPost(Post post) {
        System.out.println(">>> post: "+ post);
        return jdbcTemplate.update(SQL_INSERT_POSTS,
                post.getId(),
                post.getComment(),
                new ByteArrayInputStream(post.getPicture())) > 0;
    }

}
