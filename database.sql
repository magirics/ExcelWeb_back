
CREATE TABLE data_table(
	id_data_table int not null GENERATED BY DEFAULT AS IDENTITY,
	table_name varchar(80) not null,
	description varchar(250),
	date_create timestamp default current_timestamp,
	user_create varchar(80) default 'default',
	date_update timestamp default current_timestamp,
	user_update varchar(80) default 'default',
	primary key (id_data_table)
);

CREATE TABLE data_field(
	id_data_field int not null GENERATED BY DEFAULT AS IDENTITY,
	id_data_table int not null,
	field_name varchar(80) not null,
	date_create timestamp default current_timestamp,
	user_create varchar(80) default 'default',
	date_update timestamp default current_timestamp,
	user_update varchar(80) default 'default',
	primary key (id_data_field),
	foreign key (id_data_table) references data_table(id_data_table)
);

CREATE TABLE project(
	id_project int not null GENERATED BY DEFAULT AS IDENTITY,
	name varchar(80) not null,
	description varchar(250),
	date_create timestamp default current_timestamp,
	user_create varchar(80) default 'default',
	date_update timestamp default current_timestamp,
	user_update varchar(80) default 'default',
	primary key (id_project)
);

CREATE TABLE sheet(
	id_sheet int not null GENERATED BY DEFAULT AS IDENTITY,
	id_project int not null,
	title varchar(80) not null,
	nivel int default 0 not null,
	is_query BOOLEAN not null default FALSE,
	id_query int null,
	is_plain BOOLEAN not null default FALSE,
	id_plain int null,
	date_create timestamp default current_timestamp,
	user_create varchar(80) default 'default',
	date_update timestamp default current_timestamp,
	user_update varchar(80) default 'default',
	primary key (id_project)
);

CREATE TABLE query(
	id_query int not null GENERATED BY DEFAULT AS IDENTITY,
	id_data_table int not null,
	name varchar(80) not null,
	date_create timestamp default current_timestamp,
	user_create varchar(80) default 'default',
	date_update timestamp default current_timestamp,
	user_update varchar(80) default 'default',
	primary key (id_query),
	foreign key (id_data_table) references data_table(id_data_table)
);

CREATE TABLE query_field(
	id_query_field int not null GENERATED BY DEFAULT AS IDENTITY,
	id_query int not null,
	filed_name varchar(80) not null,
	is_active int not null,
	primary key (id_query_field),
	foreign key (id_query) references query(id_query)
);

CREATE TABLE plain(
	id_plain int not null GENERATED BY DEFAULT AS IDENTITY,
	name varchar(80) not null,
	full_text varchar(5000) not null,
	primary key (id_plain)
);