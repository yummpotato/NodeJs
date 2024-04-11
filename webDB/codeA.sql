-- 202132118_박혜정

use webdb2023;

create table codeA (
main_id varchar(4) not null,
sub_id varchar(4) not null,
main_name varchar(100) not null,
sub_name varchar(100) not null,
start varchar(8) not null,
end varchar(8) not null,
PRIMARY KEY(main_id,sub_id,start,end)
);

insert into codeA values('0000','0001','의류','남성복','20231001','20301231'); 

insert into codeA values('0000','0002','의류','여성복','20221001','20291231'); 

insert into codeA values('0000','0003','의류','학생복','20201001','20301231'); 

