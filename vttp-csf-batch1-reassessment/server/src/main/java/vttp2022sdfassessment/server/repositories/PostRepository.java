package vttp2022sdfassessment.server.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import vttp2022sdfassessment.server.models.Post;

import static vttp2022sdfassessment.server.repositories.Queries.*;

@Repository
public class PostRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public boolean savePost(Post post){
       return jdbcTemplate.update(SQL_INSERT_INTO_POSTINGS,
        post.getPosting_id(),
        post.getPosting_date(),
        post.getName(),
        post.getEmail(),
        post.getPhone(),
        post.getTitle(),
        post.getDescription(),
        post.getImage()) > 0;
    }
}
