CREATE TABLE IF NOT EXISTS `memo_tb` (
  `memo_id` int(11) NOT NULL AUTO_INCREMENT,
  `class_code` varchar(20) NOT NULL,
  `memo_title` varchar(20) NOT NULL,
  `memo_content` varchar(100) NOT NULL,
  PRIMARY KEY (`memo_id`),
  KEY `class_code` (`class_code`),
  CONSTRAINT `memo_tb_ibfk_1` FOREIGN KEY (`class_code`) REFERENCES `class_tb` (`class_code`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;