CREATE TABLE IF NOT EXISTS `class_tb` (
  `class_code` varchar(20) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `professor_id` int(11) NOT NULL,
  `start_time` tinyint(4) NOT NULL,
  `end_time` tinyint(4) NOT NULL,
  `location` varchar(20) DEFAULT NULL,
  `dayofweek` varchar(10) NOT NULL,
  `selected_flag` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`class_code`),
  KEY `subject_id` (`subject_id`),
  KEY `professor_id` (`professor_id`),
  CONSTRAINT `class_tb_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `subject_tb` (`subject_id`),
  CONSTRAINT `class_tb_ibfk_2` FOREIGN KEY (`professor_id`) REFERENCES `professor_tb` (`professor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
