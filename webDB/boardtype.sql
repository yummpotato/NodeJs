-- 202132118_박혜정

use webdb2023;

create table boardtype (
type_id int NOT NULL auto_increment,
title varchar(200) not null,
description varchar(400) ,
write_YN varchar(1) not null,
re_YN varchar(1) not null,
numPerPage int not null,
PRIMARY KEY(type_id)
);

insert into boardtype (title, description, write_YN, re_YN, numPerPage) value ('공지사항', '정식으로 선언한다.', 'N', 'Y', 5);
select * from boardtype;