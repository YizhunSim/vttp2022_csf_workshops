package vttp2022.csf.server.repositories;

public class Queries {
    public static final String SQL_INSERT_POSTS = "INSERT INTO posts (post_id, comments, picture) VALUES (?, ?, ?);";

    public static final String SQL_INSERT_INTO_POSTS = """
            INSERT INTO posts (post_id, comments, picture)
            VALUES (?, ?, ?)
            """;
}
