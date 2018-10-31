DROP TABLE IF EXISTS `lahairstyle`.`video`;
CREATE TABLE  `lahairstyle`.`video` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_bin NOT NULL,
  `description` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `date` int(11) NOT NULL,
  `videoid` varchar(45) COLLATE utf8_bin NOT NULL COMMENT 'id from youtube',
  `thumbnail` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `search` text COLLATE utf8_bin,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=232 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;