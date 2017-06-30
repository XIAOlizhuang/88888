set names utf8;
drop database if exists xiaomi;
create database xiaomi charset=utf8;
use xiaomi;
create table t_login(
    uid INT PRIMARY KEY AUTO_INCREMENT,
    uname varchar(20),
    upwd varchar(20)
);
insert into t_login values(null,"tom","123456");
insert into t_login values(null,"pp","654321");
create table xiaomi_product(
      pid INT PRIMARY KEY AUTO_INCREMENT,
      pname VARCHAR(64),
      price FLOAT(8,2),
      pic VARCHAR(32)
);
insert into xiaomi_product values
(1,'小米MIX',3499,'imgs/xmsj-list/1.jpg'),
(2,'小米5s Plus',2299,'imgs/xmsj-list/2.jpg'),
(3,'小米6 硅胶保护套',49,'imgs/xmsj-list/3.jpg'),
(4,'小米手机5s',49,'imgs/xmsj-list/4.jpg'),
(5,'小米MIX 超薄肤感软胶保护套',29,'imgs/xmsj-list/5.jpg'),
(6,'小米平板2 炫彩透明保护壳',39,'imgs/xmsj-list/6.jpg'),
(7,'小米note2高保护套',9.9,'imgs/xmsj-list/7.jpg'),
(8,'小米note2智能翻盖保护套',39,'imgs/xmsj-list/8.jpg'),
(9,'小米4c保护套',29,'imgs/xmsj-list/9.jpg'),
(10,'小米5s智能保护套',79,'imgs/xmsj-list/10.jpg'),
(11,'小米MIX 智能显示保护套',59,'imgs/xmsj-list/11.jpg'),
(12,'小米5',1599,'imgs/xmsj-list/12.jpg'),
(13,'5000mAh 小米移动电源保护套',19.9,'imgs/xmsj-list/13.jpg'),
(14,'小米支架式自拍杆',89,'imgs/xmsj-list/14.jpg'),
(15,'小米指环支架',19,'imgs/xmsj-list/15.jpg'),
(16,'小米自拍杆',49,'imgs/xmsj-list/16.jpg'),
(17,'小米平板3 智能翻盖保护套',69,'imgs/xmsj-list/17.jpg'),
(18,'小米5s Plus超薄软胶保护套',69,'imgs/xmsj-list/18.jpg'),
(19,'小米note2 保护壳',49,'imgs/xmsj-list/19.png'),
(20,'小米6高透软胶保护套',19,'imgs/xmsj-list/20.jpg'),
(21,'小米6',2499,'imgs/xmsj-list/21.jpg'),
(22,'小米note2',2799,'imgs/xmsj-list/22.jpg'),
(23,'红米4x',699,'imgs/xmsj-list/23.png'),
(24,'小米平板2保护套',49,'imgs/xmsj-list/24.jpg'),
(25,'小米note2',2799,'imgs/xmsj-list/25.jpg'),
(26,'红米4x',699,'imgs/xmsj-list/26.jpg'),
(27,'小米平板2布纹智能翻盖保护套',49,'imgs/xmsj-list/27.jpg'),
(28,'USB Type-C',5,'imgs/xmsj-list/28.jpg'),
(29,'手机USB Type-C数据线 120cm',29,'imgs/xmsj-list/29.jpg'),
(30,'小米万能遥控器',79,'imgs/xmsj-list/30.jpg'),
(31,'小米移动电源10000mAh高配的保护套',29,'imgs/xmsj-list/31.jpg'),
(32,'小米5 标准高透贴膜',19,'imgs/xmsj-list/32.jpg'),
(33,'小米5c硅胶保护套',49,'imgs/xmsj-list/33.jpg');

create table xiaomi_cart(
    id INT PRIMARY KEY AUTO_INCREMENT,
    uid INT,
    productId INT,
    count INT
);
insert into xiaomi_cart values(null,1,1,2);
insert into xiaomi_cart values(null,1,2,1);