drop database if exists second_hand;

create database second_hand;

use second_hand;

create table postings (
    posting_id varchar(8) not null,
    posting_date date not null,
    name varchar(200) not null,
    email varchar(128),
    phone varchar(20) DEFAULT "",
    title varchar(256),
    description text,
    image varchar(256),
    primary key (posting_id)
);