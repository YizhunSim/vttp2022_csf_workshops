drop database if exists feeds;

create database feeds;

use feeds;

create table posts (
    post_id varchar(8) not null,
    comments MEDIUMTEXT not null,
    picture MEDIUMBLOB not null,
    primary key (post_id)
);