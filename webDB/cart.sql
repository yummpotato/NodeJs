-- 202132118_박혜정

use webdb2023;

create table cart (
cart_id int NOT NULL auto_increment,
loginid varchar(10) NOT NULL,
mer_id int NOT NULL,
date varchar(30) NOT NULL,
PRIMARY KEY(cart_id)
);

delete from cartA;