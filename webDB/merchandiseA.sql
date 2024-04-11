-- 202132118_박혜정

use webdb2023;

create table merchandiseA (
mer_id int NOT NULL auto_increment,
category varchar(4) not null,
name varchar(100) not null,
price int not null,
stock int not null, 
brand varchar(100) not null, 
supplier varchar(100) not null, 
image varchar(100), 
sale_yn varchar(1),
sale_price int,
PRIMARY KEY(mer_id)
);

insert into merchandiseA (category, name, price, stock, brand, supplier, image, sale_yn, sale_price) value('의류', '셔츠', 150000, 1, '우영미', '우영미', '/images/womenCloth1.png', 'Y', 0);

insert into merchandiseA (category, name, price, stock, brand, supplier, image, sale_yn, sale_price) value('의류', '노란 원피스', 15000, 5, '프라다', '프라다', '/images/kim.jpg', 'N', 0);

insert into merchandiseA (category, name, price, stock, brand, supplier, image, sale_yn, sale_price) value('의류', '교복 원피스', 30000, 30, '페라가모', '페라가모', '/images/shin.jpg', 'N', 0);

insert into merchandiseA (category, name, price, stock, brand, supplier, image, sale_yn, sale_price) value('식품', '신라면', 1500, 100, '농심', '농심', '/images/remen.jpeg', 'Y', 1000);

insert into merchandiseA (category, name, price, stock, brand, suppler, image, sale_yn, sale_price) value('가전', '스타일러', 300000, 10, 'LG', 'LG', '/images/styler.png', 'N', 0);

insert into merchandiseA (category, name, price, stock, brand, supplier, image, sale_yn, sale_price) value('도서', '나미야잡화점의기적', 8000, 8, '가도카와 쇼텐', '가도카와 쇼텐', '/images/book1.jpeg', 'N', 0);

insert into merchandiseA (category, name, price, stock, brand, supplier, image, sale_yn, sale_price) value('스포츠', '테니스 라켓', 7000, 4, '나이키', '나이키', '/images/tennis.jpeg', 'Y', 6000);

insert into merchandiseA (category, name, price, stock, brand, supplier, image, sale_yn, sale_price) value('자동차', '팰리세이드', 150000, 3, '현대자동차', '현대자동차', '/images/car1.jpeg', 'N', 0);

insert into merchandiseA (category, name, price, stock, brand, supplier, image, sale_yn, sale_price) value('자동차', '아반떼', 150000, 3, '현대자동차', '현대자동차', '/images/car1.jpeg', 'N', 0);

insert into merchandiseA (category, name, price, stock, brand, supplier, image, sale_yn, sale_price) value('생활용품', '손톱깎이', 800, 500, '다이소', '다이소', '/images/nail.jpeg', 'N', 0);

insert into merchandiseA (category, name, price, stock, brand, supplier, image, sale_yn, sale_price) value('완구', '티니핑놀이', 19000, 6, '티니핑', '티니핑', '/images/toy1.jpeg', 'Y', 18000);
