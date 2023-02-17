package vttp2022.csf.server.repositories;

public class PostException extends Exception{
    public PostException (){
        super();
    }

    public PostException(String message, Throwable throwable){
        super(message, throwable);
    }
}
