-- 202132118_박혜정

use webdb2023;

create table purchase (
purchase_id int NOT NULL auto_increment,
loginid varchar(10) NOT NULL,
mer_id int NOT NULL ,
date varchar(30) NOT NULL,
price int,
point int,
qty int,
total int,
payYN  varchar(1) NOT NULL default 'N',
cancel varchar(1) NOT NULL default 'N',
refund varchar(1) NOT NULL default 'N',
PRIMARY KEY(purchase_id)
);

