-- 202132118_박혜정

use webdb2023;

create table board (
board_id int NOT NULL auto_increment,
type_id int ,
p_id int, 
loginid varchar(10) NOT NULL,
password varchar(20) NOT NULL,
title varchar(200) ,
date varchar(30) NOT NULL,
content text,
PRIMARY KEY(board_id)
);

insert into board (type_id, p_id, loginid, password, title, date, content) value (1, 1, 'bhwang99', 'bhwang99', '떡볶이먹고싶음', '2023.11.14 : 2시 6분 59초', '엽떡쨩');

insert into board (type_id, p_id, loginid, password, title, date, content) value (3, 1, 'bhwang99', 'bhwang99', '떡볶자', '2023.11.14 : 2시 6분 59초', '엽쨩');

insert into board (type_id, p_id, loginid, password, title, date, content) value (1, 1, 'gamza', 'gamza', '말랑말랑말랑카우', '2023.11.14 : 2시 6분 59초', '말랑말랑');

insert into board (type_id, p_id, loginid, password, title, date, content) value (1, 1, 'gamza', 'gamza', '특별한 소스', '2023.11.14 : 2시 6분 59초', '양상추');

insert into board (type_id, p_id, loginid, password, title, date, content) value (1, 1, 'bhwang99', 'bhwang99', '치즈피클', '2023.11.14 : 2시 6분 59초', '양파까지');

insert into board (type_id, p_id, loginid, password, title, date, content) value (1, 1, 'gamza', 'gamza', '골라맛디쉬', '2023.11.14 : 2시 6분 59초', '핫소스인더디핑');

insert into board (type_id, p_id, loginid, password, title, date, content) value (1, 1, 'gamza', 'gamza', '너란 I 너만의 느낌', '2023.11.14 : 2시 6분 59초', '그 특별함');

insert into board (type_id, p_id, loginid, password, title, date, content) value (3, 1, 'gamza', 'gamza', '아름다운 갤럭시', '2023.11.14 : 2시 6분 59초', '판타지');

insert into board (type_id, p_id, loginid, password, title, date, content) value (3, 1, 'bhwang99', 'bhwang99', '막걸리걸 교수님', '2023.11.14 : 2시 6분 59초', '해리포퉈');

insert into board (type_id, p_id, loginid, password, title, date, content) value (1, 1, 'potato', '0000', '감자국 공주님', '2023.11.14 : 2시 6분 59초', '깔깔');

select * from board;
commit;