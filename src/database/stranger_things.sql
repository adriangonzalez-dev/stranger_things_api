create database stranger_things;

use stranger_things;

create table species (
	id int not null auto_increment primary key,
	name varchar(100) not null
)

create table genres (
	id int not null auto_increment primary key,
	name varchar(100) not null
)

create table location (
	id int not null auto_increment primary key,
	name varchar(100) not null
)

create table seasons (
	id int not null auto_increment primary key,
	name varchar(100) not null
)

create table characters_ (
	id int not null auto_increment primary key,
	name varchar(100) not null,
	birth int,
	alias varchar(100),
	ocupation varchar(100),
	actor varchar(100) not null,
	history text not null,
	genre_id int not null,
	species_id int not null,
	location_id int not null,
	foreign key (genre_id) references genres(id),
	foreign key (species_id) references species(id),
	foreign key (location_id) references location(id)
)

create table images(
	id int not null auto_increment primary key,
	src varchar(250) not null,
	public_id varchar(200),
	character_id int not null,
	foreign key (character_id) references characters_(id)
)

create table episodes(
	id int not null auto_increment primary key,
	title varchar(100) not null,
	season_id int not null,
	foreign key (season_id) references seasons(id)
)

create table episode_character(
	id int not null auto_increment primary key,
	episode_id int not null,
	character_id int not null,
	foreign key (episode_id) references episodes(id),
	foreign key (character_id) references characters_(id)
)

create table users(
	id int not null auto_increment primary key,
	username varchar(100) not null,
	email varchar(100) not null,
	pass varchar(100) not null,
	avatar varchar(100) not null
)
