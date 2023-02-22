package vttp2022sdfassessment.server.repositories;

public class Queries {
    public static final String SQL_INSERT_INTO_POSTINGS = "INSERT INTO postings (posting_id, posting_date, name, email, phone, title, description, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
}
