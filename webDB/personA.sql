-- 202132118_박혜정

use webdb2023;

create table personA (
loginid varchar(10) not null,
password varchar(10) not null,
name varchar(20) not null,
address varchar(50) null,
tel varchar(13) not null, 
birth varchar(8) not null, 
class varchar(2) not null, /*00 : CEO, 01 : 관리자, 02 : 일반고객 */
point int, 
PRIMARY KEY(loginid)
);

insert into personA values('bhwang99','bhwang99','왕보현','서울','010-8340-3779','00000000','02',0);

insert into personA values('gamza','gamza','왕감자','서울','010-8340-3000','20000000','02',0);

insert into personA values('hevlyoy26', '0408', '박혜정', '강원도', '010-4943-2006', '20001026', '01', 0);