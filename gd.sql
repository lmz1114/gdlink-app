/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.5.2-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: gd
-- ------------------------------------------------------
-- Server version	11.5.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(30) DEFAULT NULL,
  `color` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `unique_category_name` (`category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES
(1,'Course Files','#008000'),
(2,'Meeting','#FF0000'),
(3,'Workshop','#0504AA');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favourite_resources`
--

DROP TABLE IF EXISTS `favourite_resources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `favourite_resources` (
  `user_id` varchar(10) NOT NULL,
  `resource_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`user_id`,`resource_id`),
  KEY `resource_id` (`resource_id`),
  CONSTRAINT `favourite_resources_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `favourite_resources_ibfk_2` FOREIGN KEY (`resource_id`) REFERENCES `resources` (`resource_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favourite_resources`
--

LOCK TABLES `favourite_resources` WRITE;
/*!40000 ALTER TABLE `favourite_resources` DISABLE KEYS */;
INSERT INTO `favourite_resources` VALUES
('A22EC0062',3,'2024-12-26 10:40:18');
/*!40000 ALTER TABLE `favourite_resources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resources`
--

DROP TABLE IF EXISTS `resources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `resources` (
  `resource_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) DEFAULT NULL,
  `ref_name` varchar(50) DEFAULT NULL,
  `sessem` varchar(15) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `owner` varchar(100) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `sharer_id` varchar(10) NOT NULL,
  `shared_at` datetime DEFAULT current_timestamp(),
  `latest_access_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`resource_id`),
  KEY `fk_category_id` (`category_id`),
  KEY `fk_sharer_id` (`sharer_id`),
  FULLTEXT KEY `ref_name` (`ref_name`,`description`),
  CONSTRAINT `fk_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_sharer_id` FOREIGN KEY (`sharer_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resources`
--

LOCK TABLES `resources` WRITE;
/*!40000 ALTER TABLE `resources` DISABLE KEYS */;
INSERT INTO `resources` VALUES
(1,1,'OOP-SPACE','2023/2024-2','Course files submission for SECJ2154/SCSJ2154','hakim@utmspace.edu.my','https://drive.google.com/drive/folders/???','A22EC0062','2024-12-24 21:25:33','2024-12-25 13:36:12'),
(2,2,'SE Department Meeting','2023/2024-2','Mesyuarat Jabatan SE Bil. 2 2023/2024','radziahm@utm.my','https://drive.google.com/drive/folders/???','A22EC0062','2024-12-24 21:26:29','2024-12-26 10:40:35'),
(3,1,'SECJ3304 - 05','2024/2025-1','Course files submission for IP Course Section 05','kwek@utm.my','https://drive.google.com/drive/folders/','A22EC0067','2024-12-25 13:38:27',NULL);
/*!40000 ALTER TABLE `resources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sharing`
--

DROP TABLE IF EXISTS `sharing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sharing` (
  `receiver_id` varchar(10) NOT NULL,
  `resource_id` int(11) NOT NULL,
  `latest_access_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`resource_id`,`receiver_id`),
  KEY `fk_receiver_id` (`receiver_id`),
  CONSTRAINT `fk_receiver_id` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_resource_id` FOREIGN KEY (`resource_id`) REFERENCES `resources` (`resource_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sharing`
--

LOCK TABLES `sharing` WRITE;
/*!40000 ALTER TABLE `sharing` DISABLE KEYS */;
INSERT INTO `sharing` VALUES
('A22EC0058',1,NULL),
('A22EC0067',1,NULL),
('A22EC0122',1,NULL),
('A22EC0058',2,NULL),
('A22EC0067',2,NULL),
('A22EC0122',2,NULL),
('A22EC0058',3,NULL),
('A22EC0062',3,'2024-12-26 10:40:23'),
('A22EC0122',3,NULL);
/*!40000 ALTER TABLE `sharing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` varchar(10) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(20) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `name` varchar(50) NOT NULL,
  `is_pass_changed` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
('A22EC0058',NULL,'kewheng@graduate.utm.my ','Pelajar FSKSM',NULL,'2024-12-16 07:29:09','KEW JIAN HENG',0),
('A22EC0062','$2b$10$9FjrA8/Les7fs.sCqAtpWuAJj2DkB4q1Pvruq8CqLpwtNfZbVEnna','kuantong@graduate.utm.my ','Pelajar FSKSM','1734591132560-kwek.jpg','2024-12-17 15:44:41','KUAN JI TONG',1),
('A22EC0067',NULL,'leowhong@graduate.utm.my ','Pelajar FSKSM',NULL,'2024-12-20 09:41:06','LEOW YAN HONG',0),
('A22EC0122',NULL,'kwekcong@graduate.utm.my ','Pelajar FSKSM',NULL,'2024-12-16 07:24:23','KWEK JIA CONG',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2024-12-26 18:44:37
