-- MySQL dump 10.13  Distrib 8.0.30, for Linux (x86_64)
--
-- Host: localhost    Database: patient_registration
-- ------------------------------------------------------
-- Server version	8.0.30-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `hospitals`
--

DROP TABLE IF EXISTS `hospitals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hospitals` (
  `hospital_id` int NOT NULL AUTO_INCREMENT,
  `hospital_name` varchar(255) NOT NULL,
  PRIMARY KEY (`hospital_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hospitals`
--

LOCK TABLES `hospitals` WRITE;
/*!40000 ALTER TABLE `hospitals` DISABLE KEYS */;
INSERT INTO `hospitals` VALUES (1,'Apollo Hospitals'),(2,'Jawaharlal Nehru Medical College and Hospital'),(3,'Indira Gandhi Institute of Medical Sciences (IGIMS)'),(4,'AIIMS - All India Institute Of Medical Science');
/*!40000 ALTER TABLE `hospitals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patients` (
  `patient_id` int NOT NULL AUTO_INCREMENT,
  `patient_name` varchar(255) NOT NULL,
  `patient_address` varchar(255) NOT NULL,
  `patient_phone` varchar(255) NOT NULL,
  `patient_email` varchar(255) NOT NULL,
  `patient_password` varchar(255) NOT NULL,
  `patient_photo` varchar(255) NOT NULL,
  `patient_psychiatrist_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`patient_id`),
  KEY `idx_patient_email` (`patient_email`),
  KEY `fk_patient_psychiatrist_id` (`patient_psychiatrist_id`),
  CONSTRAINT `fk_patient_psychiatrist_id` FOREIGN KEY (`patient_psychiatrist_id`) REFERENCES `psychiatrists` (`psychiatrist_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patients`
--

LOCK TABLES `patients` WRITE;
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;
INSERT INTO `patients` VALUES (1,'pat 11','dummy address','+919876543210','pat11@gmail.com','$2a$08$un8APLWYTdRVXH3TKq9jxu/w/g8S4yY02JcfvhaN0TTTeY8ZZdgVe','public/uploads/profiles/image-26217a08f094f24e6b615326d0a3825ae67cede5.jpeg',1,'2022-08-20 06:51:18','2022-08-20 06:51:18'),(2,'pat 12','dummy address','+919876543210','pat12@gmail.com','$2a$08$yqqwHxh3FVH5yJ2cU98HperErH5gXCczeARFzkQJGfwah9098rmF6','public/uploads/profiles/image-e106fb4a69c74a4a6d82664f88ae42575803f6cd.jpeg',1,'2022-08-20 06:52:02','2022-08-20 06:52:02'),(3,'pat 13','dummy address','+919876543210','pat13@gmail.com','$2a$08$ZRQb0GZtbEluFzyFdb4z4e.S0SKghdRDP1a0cDOFMeUdGqNxXjwuq','public/uploads/profiles/image-ed146e30c4ccc2d18fdb1c6a85f4fc35802a3d4f.jpeg',1,'2022-08-20 06:52:11','2022-08-20 06:52:11'),(4,'pat 14','dummy address','+919876543210','pat14@gmail.com','$2a$08$prIgm.6dWs8BPXFLpNt.Peh5LLwYvoXdi2YoVrjPmzm1OKFVx2kEC','public/uploads/profiles/image-2db3801b457239357950b2f0087d5437f653d0c0.jpeg',2,'2022-08-20 06:53:27','2022-08-20 06:53:27'),(5,'pat 15','dummy address','+919876543210','pat15@gmail.com','$2a$08$//NaW0LJqWROecj2Y0ZEOObfLxQQdPgNQw16LPoUi0jL.09CwaT2C','public/uploads/profiles/image-5128049617e6e741aad4301122d06b591d69595f.jpeg',3,'2022-08-20 06:54:07','2022-08-20 06:54:07'),(6,'pat 16','dummy address','+919876543210','pat16@gmail.com','$2a$08$F6GCtR02wESoafpKsYnO3.XmDsBf9OOdSz6aza6RtqNWFcT.cDWAC','public/uploads/profiles/image-0cae2169836bd6dd122bb9e64b4fa7a5fa6e6ec0.jpeg',3,'2022-08-20 06:54:18','2022-08-20 06:54:18'),(7,'pat 17','dummy address','+919876543210','pat17@gmail.com','$2a$08$kvzVOzvIgvKlfMwKSfMVSOgJm9V9lCuUivB627k8oIlPS8n.QZ9mK','public/uploads/profiles/image-c258390ae2216fcdf5339d444fe9f43b7397aacf.jpeg',4,'2022-08-20 06:54:42','2022-08-20 06:54:42'),(8,'pat 18','dummy address','+919876543210','pat18@gmail.com','$2a$08$0AqdEBJoUeCfYkcry4IAOej7dr73hAAF/olcHz8VLPWnO7P/S8eZ6','public/uploads/profiles/image-9efeef9d55f60fd2da829a13320aa6a02c4ff776.jpeg',4,'2022-08-20 06:54:51','2022-08-20 06:54:51'),(9,'pat 19','dummy address','+919876543210','pat19@gmail.com','$2a$08$COjrpyyoLvqotTdURBbu1.7iRNo/WN9PdhazJ67.xNS4Gc6WkqZbu','public/uploads/profiles/image-0e10d139f484d9e827643e05873cca8fecc56491.jpeg',4,'2022-08-20 06:54:58','2022-08-20 06:54:58'),(10,'pat 110','dummy address','+919876543210','pat110@gmail.com','$2a$08$IbE9onxQMnC/0lOpM57fe.N.ntENrJgDBhybC1x4tPbjjvt4WTwvC','public/uploads/profiles/image-07b1650f1c444b07812d0e54a9c5c49595e44438.jpeg',5,'2022-08-20 06:55:19','2022-08-20 06:55:19'),(11,'pat 111','dummy address','+919876543210','pat111@gmail.com','$2a$08$PhJewwuu9Aa4yGyHcv/ngeN4vtJjWcvi1E27CJybHz67PA6uZqwKS','public/uploads/profiles/image-391d3e61f91ffe259b90e8534c94a222e0e15b4a.jpeg',5,'2022-08-20 06:55:28','2022-08-20 06:55:28'),(12,'pat 112','dummy address','+919876543210','pat112@gmail.com','$2a$08$Usxgmqil/QLizmy..Nn51upEul1QieASJvgl4lu1cAr69YMgqvW2W','public/uploads/profiles/image-5c22b7d1f4d22bc438a54fd7128d79740a4927cb.jpeg',5,'2022-08-20 06:55:40','2022-08-20 06:55:40'),(13,'pat 21','dummy address','+919876543210','pat21@gmail.com','$2a$08$Wu7.Ts4thkCqhKsftdisROfjcCU64HL3OI7OqZhcWLb2/GaR/mz5C','public/uploads/profiles/image-4824d62f907b68e9d6892c32ced0893bf41e306e.jpeg',6,'2022-08-20 06:57:51','2022-08-20 06:57:51'),(14,'pat 22','dummy address','+919876543210','pat22@gmail.com','$2a$08$SMGsPOauMsOzkxBKVGlxtOFWw4fIYDckuNgnQxhTjKlLF0/U9EXyS','public/uploads/profiles/image-9d267ec74b7a8d55f5efd19513f8de94b7003780.jpeg',6,'2022-08-20 06:57:58','2022-08-20 06:57:58'),(15,'pat 23','dummy address','+919876543210','pat23@gmail.com','$2a$08$.hzgNhaNj1O5xbojVMlvcuoajHRbCRNS2MtSaQfAimjqA0FPwxXqC','public/uploads/profiles/image-7296ea61a2cf24f6dba4e37e0a82754731fef224.jpeg',8,'2022-08-20 06:58:24','2022-08-20 06:58:24'),(16,'pat 24','dummy address','+919876543210','pat24@gmail.com','$2a$08$TgKoe7c0OaTwf4H9.PIBu.VmhDffPqaQU8pddD14fJXB.lG856n2S','public/uploads/profiles/image-974fe9a41399a271f0b254ae14ca8ce32802ee4b.jpeg',8,'2022-08-20 06:58:35','2022-08-20 06:58:35'),(17,'pat 25','dummy address','+919876543210','pat25@gmail.com','$2a$08$aSfV1.G5dVwMW7F8EvYEOOh5sRQP.UAzd0738WDR9.oQOfHW77gLi','public/uploads/profiles/image-38e779b29143be1620a48ed5662f13332841d032.jpeg',8,'2022-08-20 06:58:41','2022-08-20 06:58:41'),(18,'pat 26','dummy address','+919876543210','pat26@gmail.com','$2a$08$uZW/SJcqcRz2gVtSbOAmsOmz2zIQlObZAsyPFbXZ5Y6WwD2ty/F/2','public/uploads/profiles/image-1d34e0ede0a354caad6c041154ed5a43fd31a12b.jpeg',9,'2022-08-20 06:58:58','2022-08-20 06:58:58'),(19,'pat 27','dummy address','+919876543210','pat27@gmail.com','$2a$08$8qZ1D7PW0DVzlAvWf/SW5up1TeIB28dZpFEEmrScA.yNi8vvgRYMi','public/uploads/profiles/image-1a63adcff657c97c7ae325a32c0ff60d0b8965d4.jpeg',10,'2022-08-20 06:59:13','2022-08-20 06:59:13'),(20,'pat 28','dummy address','+919876543210','pat28@gmail.com','$2a$08$xOqXCTAiO0x3cCP380GtMevcDazBSe0dPoBJ7j//8A6HGOGdNG0XO','public/uploads/profiles/image-e52a62f6d824d604efd8e199d59ad78381cc01e9.jpeg',10,'2022-08-20 06:59:20','2022-08-20 06:59:20'),(21,'pat 29','dummy address','+919876543210','pat29@gmail.com','$2a$08$yHgWiOmWPmYjcok1JDR3uujqsJVQCNmKqzNqmLDNgyvYP.AQAXpbe','public/uploads/profiles/image-76ede81cd9826a863713513b153e5a5c0ceef660.jpeg',10,'2022-08-20 06:59:26','2022-08-20 06:59:26'),(22,'pat 210','dummy address','+919876543210','pat210@gmail.com','$2a$08$Zn7qUcyzk6P6vD366IB9pu5HKDQtZwLBW/iGEM.xJliHyvx4JefCe','public/uploads/profiles/image-fcb387ff4b05728f2e5d6aa0e71640ed1d58db78.jpeg',10,'2022-08-20 06:59:35','2022-08-20 06:59:35'),(23,'pat 211','dummy address','+919876543210','pat211@gmail.com','$2a$08$/iA3BoM9QIThZie6MaLYTuHdRO6xRVDxst5F7R./PGcl79QdrZXLW','public/uploads/profiles/image-22de81387ebaccc52a25def81dce447e10fef5b3.jpeg',11,'2022-08-20 07:00:13','2022-08-20 07:00:13'),(24,'pat 212','dummy address','+919876543210','pat212@gmail.com','$2a$08$IGsl.PqGhvMH1T0K7XFs..UOUAgz5Gy5lAjWlLFS0htyvXrtMzZA.','public/uploads/profiles/image-d122e194c1f60bcbfec48ac490ce502a5188485f.jpeg',11,'2022-08-20 07:00:18','2022-08-20 07:00:18'),(25,'pat 31','dummy address','+919876543210','pat31@gmail.com','$2a$08$qCcK.OuT4zrl4Tu1nu8kC.aBYzipFVZf6hQA2PJti1rh1sYnTqCBC','public/uploads/profiles/image-978d15f7491363d33d3fe440c401d8953149db17.jpeg',12,'2022-08-20 07:02:35','2022-08-20 07:02:35'),(26,'pat 32','dummy address','+919876543210','pat32@gmail.com','$2a$08$HGN/nwlxX6uKgu9KtguJa.HT9dXbYxECJBTekNRv4fPh2ccm.VwFG','public/uploads/profiles/image-96e52ba94b05f0eb80bbcc4bfd4e648c43852816.jpeg',12,'2022-08-20 07:02:47','2022-08-20 07:02:47'),(27,'pat 33','dummy address','+919876543210','pat33@gmail.com','$2a$08$Mirb3ybhVwPIlqQMnr3gtO1EFlJgOkuTBpW5nmTICkSzEfdryCHLC','public/uploads/profiles/image-d5407dce19c292178c28f146f18976ce84f0cae6.jpeg',12,'2022-08-20 07:02:57','2022-08-20 07:02:57'),(28,'pat 34','dummy address','+919876543210','pat34@gmail.com','$2a$08$i2Nz3NnwkEel3ciNq6U9fuitu2T90BMYbt9clPrepwrMjwNyR53Lm','public/uploads/profiles/image-ef169ac0d7484d05fa3a7d3be773e6ac48fc1157.jpeg',13,'2022-08-20 07:03:36','2022-08-20 07:03:36'),(29,'pat 35','dummy address','+919876543210','pat35@gmail.com','$2a$08$qba0xCIjyLheLkuomJVsSexveEb4fc6eKJeHZJRgdd8EVtGSKpjb6','public/uploads/profiles/image-c6d77b434f2030e7a2938d98080411347491de78.jpeg',13,'2022-08-20 07:03:43','2022-08-20 07:03:43'),(30,'pat 36','dummy address','+919876543210','pat36@gmail.com','$2a$08$yMp0OSrIzSUkaJ0wnd9rDO0HgQI5yzzt5VBcL3twn676SBE7tQMPO','public/uploads/profiles/image-ade4630a6380b479cc02aef9eacccc0d6b223f31.jpeg',15,'2022-08-20 07:04:05','2022-08-20 07:04:05'),(31,'pat 37','dummy address','+919876543210','pat37@gmail.com','$2a$08$s7DeOB6RjLPX0RyWALriUOqcIz3t9Wvw/1uo8kqEL1xBdojk1r.yy','public/uploads/profiles/image-dc82f4987f8445c8f259420ae18e911313115fae.jpeg',16,'2022-08-20 07:04:36','2022-08-20 07:04:36'),(32,'pat 38','dummy address','+919876543210','pat38@gmail.com','$2a$08$cJdvEth3BMnARHA4gm6AfOChnJ0/36eB78zeW4dcNYoW5griP5cku','public/uploads/profiles/image-b077d0d9a3ec4dec3d97b16ef0219f4bb90f7e50.jpeg',16,'2022-08-20 07:04:47','2022-08-20 07:04:47'),(33,'pat 39','dummy address','+919876543210','pat39@gmail.com','$2a$08$51Bqb8gl8GlrVoKem6mUd.rP2XsijfzPUkjNU6gpFaNaNPqmZlzKO','public/uploads/profiles/image-2db6c3fc3225c96043620298e27fbd15113eba42.jpeg',16,'2022-08-20 07:04:52','2022-08-20 07:04:52'),(34,'pat 41','dummy address','','pat41@gmail.com','$2a$08$pYIRuB9v0qPHO.HdadvPa.yuOkRb8zIqOYQZ3ZzedXOFfJxt/VRp6','public/uploads/profiles/image-ebe5be93d2fc803172210e32642aaf34289d4d5d.jpeg',17,'2022-08-20 07:08:43','2022-08-20 07:08:43'),(35,'pat 42','dummy address','9876543210','pat42@gmail.com','$2a$08$5GKahjQen72aMVX/RmJICOaeSo7J.Nyu5reV7fzx8cEdQamm9EUpK','public/uploads/profiles/image-17050dcbd91adef435afe3c01975a0c9d5a9a6db.jpeg',17,'2022-08-20 07:09:33','2022-08-20 07:09:33'),(36,'pat 43','dummy address','+19876543210','pat43@gmail.com','$2a$08$N1RDgs6Ii7QbPxtqXO3EVuwwnwGls3jbHvIutkgjibIoMUrC.IATm','public/uploads/profiles/image-abfe03ff74564b216658a8d4b47e8210af62450b.jpeg',17,'2022-08-20 07:12:38','2022-08-20 07:12:38'),(37,'pat 44','dummy address','+9876543210','pat44@gmail.com','$2a$08$RJvc989ntN9BTRB.QKYt1uYwPytPoy0CW922u2Uczy3nlCvZJK27i','public/uploads/profiles/image-791fe28231627c81b20e356af168ca88580ec99d.jpeg',17,'2022-08-20 07:13:08','2022-08-20 07:13:08'),(38,'pat 45','dummy address','+919876543210','pat45@gmail.com','$2a$08$Hq3ytE1jPOC0U9oAJpm9ueLq4hdQogH.Ib158QEW2A9U6ezuJhEse','public/uploads/profiles/image-7ae18a5f912740ff3ab9d1b0d062b242ffbf55fe.jpeg',17,'2022-08-20 07:19:45','2022-08-20 07:19:45'),(39,'pat 46','dummy address','09876543210','pat46@gmail.com','$2a$08$59KCcCg/S4KS/d17yEea3eO5RTk9/cl3QYMmjDQBMcWL.D8i6SudC','public/uploads/profiles/image-731b7fca9439cd0c958f5d02427795c3bbb693f9.jpeg',18,'2022-08-20 07:20:13','2022-08-20 07:20:13'),(40,'pat 47','dummy address','9876543210','pat47@gmail.com','$2a$08$5qU7rb3u/H1YvEp1mOZ0U.lAX4Hr9sxmXZdGG8bhf8.A1jKY8pFf2','public/uploads/profiles/image-7792ed44ac7c97bc39da41a105b19e432fb7203e.jpeg',18,'2022-08-20 07:20:27','2022-08-20 07:20:27'),(41,'pat 48','dummy address','919876543210','pat48@gmail.com','$2a$08$Fo7b5jH2tqSWGAU8Rf9WTudruIPWSgCIrVKODx6260BB1mSZLLjlW','public/uploads/profiles/image-2b24adcc71c22fab5234475c62f26e5aefe3a314.jpeg',18,'2022-08-20 07:20:39','2022-08-20 07:20:39'),(42,'pat 49','dummy address','919876543210','pat49@gmail.com','$2a$08$UB7mfrr7wtxUj.o3hGYqLePIjwxiAAtX1P8AygKQfDg/mtNv3eTbq','public/uploads/profiles/image-362e5cc612360b04dd5f730ef6412d46d828cf08.jpeg',19,'2022-08-20 07:20:59','2022-08-20 07:20:59'),(43,'pat 410','dummy address','91-9876543210','pat410@gmail.com','$2a$08$THj0zNW.I9ztb.MOKm4GIOBGaeXXVSmbTIIShylxoL33qqjJMnGIq','public/uploads/profiles/image-07294f667f704dd069d20baf6d76f550f345719f.jpeg',19,'2022-08-20 07:21:15','2022-08-20 07:21:15'),(44,'pat 411','dummy address','91 9876543210','pat411@gmail.com','$2a$08$8QTP2FbZdBH4W2sLKiwtNeVzyBezk/GfoLSYG3jnPC.n3W2Rw6f0C','public/uploads/profiles/image-571b8de30c837cf92e2199ce332478b243037db9.jpeg',19,'2022-08-20 07:21:45','2022-08-20 07:21:45'),(45,'pat 412','dummy address','+91 9876543210','pat412@gmail.com','$2a$08$.ldR9FCo91VoDRkvL6C9t.rSNm0mnBkYEspGazQbdb/eDyyJU9BOq','public/uploads/profiles/image-bddb8b334d7068bd41232d816e7b0376e91ee12b.jpeg',19,'2022-08-20 07:21:57','2022-08-20 07:21:57'),(46,'pat 413','dummy address','+91 9876543210','pat413@gmail.com','$2a$08$cv30bo0ieAuOa9c/7fB2t.QxTEQdeV8TsAbib79CxrOPq3kX2867.','public/uploads/profiles/image-985e7e50f16eb8caf1dd397d0d17a4ddcb0cf33c.jpeg',21,'2022-08-20 07:22:23','2022-08-20 07:22:23'),(47,'pat 414','dummy address','+91-9876543210','pat414@gmail.com','$2a$08$tl.YnKyC3jKH7dUNBf1.jOKgEj20MM6uUdDNdqQuc3Vk3rawzVqdu','public/uploads/profiles/image-96e7b6c7070dbd1705c0d2a410f6e6958ce04420.jpeg',21,'2022-08-20 07:22:34','2022-08-20 07:22:34'),(48,'pat 415','dummy address','+91-9876543210','pat415@gmail.com','$2a$08$XoGC0UZTbEMJxqzr4BsMBOxIT3uJdJ5AHP5L7392j7ZJzfBxe/cLu','public/uploads/profiles/image-c9ba0b1e81e5ec0085dab5d11a7a3fab6c1c2569.jpeg',21,'2022-08-20 07:23:12','2022-08-20 07:23:12'),(49,'pat 416','dummy address','+91-9876543210','pat416@gmail.com','$2a$08$4SyjofpiANcadLtJfOmjeeV0QYH.eLArvyuHtODqaCIqlJ7blnxka','public/uploads/profiles/image-e4ad5c1451b2f9ba6e8e5d7665292f8691825300.jpeg',22,'2022-08-20 07:23:40','2022-08-20 07:23:40'),(50,'pat 417','dummy address','+91-9876543210','pat417@gmail.com','$2a$08$GkHAsvEHpfrFu3TA3ApbKuL0K8eobQaBNjdZz6BKoHYZxte4lKnua','public/uploads/profiles/image-cb273f21ce5f862311f832866a2f048852467c63.jpeg',22,'2022-08-20 07:23:46','2022-08-20 07:23:46'),(51,'pat 418','dummy address','+91-9876543210','pat418@gmail.com','$2a$08$frHrvyQbsLP9Am0gFlFOm.4evA8iqVEjV8jSW3muAbQWGrTgju902','public/uploads/profiles/image-2699bcd24fd7380fa15969c3afe49cd088babd60.jpeg',22,'2022-08-20 07:23:52','2022-08-20 07:23:52'),(52,'pat 419','dummy address','+91-9876543210','pat419@gmail.com','$2a$08$Yfqsvij2W71XLN7rU.AL6OxxWFQtDKt8d2UhvQ.f1pkoQHPqOL3AW','public/uploads/profiles/image-dd4aef127b7dac2f631d309b30590552dc2f8105.jpeg',22,'2022-08-20 07:24:01','2022-08-20 07:24:01'),(53,'pat 420','dummy address','+91-9876543210','pat420@gmail.com','$2a$08$rMBFYhLPjMArIxi5GYe60ODzBaqAG7/KPOB./msoQxdbD.6/XhPrq','public/uploads/profiles/image-967d9bf5bea34b3ed7f54544a09fabe7f9c7bbee.jpeg',22,'2022-08-20 07:24:33','2022-08-20 07:24:33'),(54,'pat 421','dummy address','+91-9876543210','pat421@gmail.com','$2a$08$fc8K79rztTu2sm51yRVnLu4trb3H.9i0jFy2GBcqsnrwU2N.Kt/hq','public/uploads/profiles/image-4e5963cbd9906e5e80e71020d033922ffcd544ae.jpeg',23,'2022-08-20 07:24:55','2022-08-20 07:24:55'),(55,'pat 422','dummy address','+91-9876543210','pat422@gmail.com','$2a$08$xOU8ZTCJXvhbORf/9K4cR.zaBqwQq70NDlDuNfowlapNRCSuODxR2','public/uploads/profiles/image-a83f8ae58521f07bebf698cbc115429fcdbac648.jpeg',23,'2022-08-20 07:25:02','2022-08-20 07:25:02'),(56,'pat 423','dummy address','+91-9876543210','pat423@gmail.com','$2a$08$AQr4rlmj6kgybotPrMWyge6MpFtKRzdxB.aN1dlgQsUOq.g2UhDmK','public/uploads/profiles/image-318e8462b1baf80299aeec98b5051c3314b8d886.jpeg',23,'2022-08-20 07:25:08','2022-08-20 07:25:08');
/*!40000 ALTER TABLE `patients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `psychiatrists`
--

DROP TABLE IF EXISTS `psychiatrists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `psychiatrists` (
  `psychiatrist_id` int NOT NULL AUTO_INCREMENT,
  `psychiatrist_name` varchar(255) NOT NULL,
  `psychiatrist_hospital_id` int NOT NULL,
  `psychiatrist_email` varchar(255) NOT NULL,
  `psychiatrist_password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`psychiatrist_id`),
  UNIQUE KEY `psychiatrist_email` (`psychiatrist_email`),
  KEY `idx_psychiatrist_email` (`psychiatrist_email`),
  KEY `fk_psychiatrist_hospital_id` (`psychiatrist_hospital_id`),
  CONSTRAINT `fk_psychiatrist_hospital_id` FOREIGN KEY (`psychiatrist_hospital_id`) REFERENCES `hospitals` (`hospital_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `psychiatrists`
--

LOCK TABLES `psychiatrists` WRITE;
/*!40000 ALTER TABLE `psychiatrists` DISABLE KEYS */;
INSERT INTO `psychiatrists` VALUES (1,'psy11',1,'psy11@gmail.com','$2a$08$EsApNip1FS1cfWC2Mr8Wbe1dniwxAR.HScQkODbg5Olt/dEdh4FyC','2022-08-20 06:44:02','2022-08-20 06:44:02'),(2,'psy12',1,'psy12@gmail.com','$2a$08$EChI/jsFMdBwB/efgLZe0O7it3crDPjUDlxztc3JQZTSmFo8sphVy','2022-08-20 06:44:10','2022-08-20 06:44:10'),(3,'psy13',1,'psy13@gmail.com','$2a$08$3aD/x83faWFcVi787NrTj.Pw2yEDRuZCV4qyhDEHqWoHCV2HedXca','2022-08-20 06:44:16','2022-08-20 06:44:16'),(4,'psy14',1,'psy14@gmail.com','$2a$08$SnzBh0zPnfiq3.4uPbHFJui5ep26pRvty7sSrzDdvQhzk7UQ.o5Hm','2022-08-20 06:44:40','2022-08-20 06:44:40'),(5,'psy15',1,'psy15@gmail.com','$2a$08$msaw.ocmIH/Zq7wEZQJanOqKT5pWK3LgIiCdNFXDoZuDu9gGW/tt6','2022-08-20 06:44:49','2022-08-20 06:44:49'),(6,'psy21',2,'psy21@gmail.com','$2a$08$/.fpAqHWVXd9669DoydctuTYjKaOblR2PmkttIt0UWaOD2951HLiq','2022-08-20 06:56:17','2022-08-20 06:56:17'),(7,'psy22',2,'psy22@gmail.com','$2a$08$sXXT4bVyCVNSiurudHJrkO3RJiBOiqS.ttRNhb9uH51ScoYXGItVW','2022-08-20 06:56:51','2022-08-20 06:56:51'),(8,'psy23',2,'psy23@gmail.com','$2a$08$w2yQ/Cdw4pwml9ncKf1lCuoSS0gxGJDo7fzoxWOqtJgXkt4dlE66i','2022-08-20 06:56:57','2022-08-20 06:56:57'),(9,'psy24',2,'psy24@gmail.com','$2a$08$hXjZHnOwV5wMyUcGGsJIee535Ec96dkSKbfZzeriyqnySyCN81Ts2','2022-08-20 06:57:02','2022-08-20 06:57:02'),(10,'psy25',2,'psy25@gmail.com','$2a$08$WLaJ94vbJIM8.UaTcycyeuApYZStjv2CKHZMegUo.Z10Xye0t3U5C','2022-08-20 06:57:10','2022-08-20 06:57:10'),(11,'psy26',2,'psy26@gmail.com','$2a$08$0G2NltV49RlpSDHuf1AKsesscYYC6Y/lyMeo7aZMLmLoGHijgbeMa','2022-08-20 06:57:17','2022-08-20 06:57:17'),(12,'psy31',3,'psy31@gmail.com','$2a$08$hdGPyfBM/BIw0gDi/M0I2.G7.DdRQN6CYfuXYYP9yod5QeRJyLdbe','2022-08-20 07:00:44','2022-08-20 07:00:44'),(13,'psy32',3,'psy32@gmail.com','$2a$08$xSTlXc7tcWJbHzNGOo/BKOfxccJtFCmpqVQcsZP65h22C0ydsmpbC','2022-08-20 07:00:50','2022-08-20 07:00:50'),(14,'psy33',3,'psy33@gmail.com','$2a$08$WxxoOoB79kQSYovSZ5hijOfKxUNi9AsLAoJkVTEjVTDs83PJVoxby','2022-08-20 07:00:56','2022-08-20 07:00:56'),(15,'psy34',3,'psy34@gmail.com','$2a$08$hD.DFOcP2boANZ/6G/0kquawGQrKqHbqNzNY62DceVAj519MABtaC','2022-08-20 07:01:02','2022-08-20 07:01:02'),(16,'psy35',3,'psy35@gmail.com','$2a$08$7d15UBzn015WwMucwUQrz.C0CI4bFUm90hHjRpqdNpbekiSA8lDcu','2022-08-20 07:01:08','2022-08-20 07:01:08'),(17,'psy41',4,'psy41@gmail.com','$2a$08$fztVPM2XboqUzAPnjptpLe4lvzqnCNULejFcmp.gCd24XJCnm6iOW','2022-08-20 07:06:33','2022-08-20 07:06:33'),(18,'psy42',4,'psy42@gmail.com','$2a$08$YQYjg/ZWM.SMzbAe.vEHOOKdZc0j2LAjUolCk9JryjarJ8pCW5e8.','2022-08-20 07:06:41','2022-08-20 07:06:41'),(19,'psy43',4,'psy43@gmail.com','$2a$08$bq6aXyr5ryHZ.cM4Hx2E3eRR2YMAW/pWxBwjD4V8l.nqwF8337BdO','2022-08-20 07:06:47','2022-08-20 07:06:47'),(20,'psy44',4,'psy44@gmail.com','$2a$08$qngDl3vO7zpqw2yMMPCaS.juWx34l72ipCsLcfi3WsC87tHyZobb2','2022-08-20 07:06:54','2022-08-20 07:06:54'),(21,'psy45',4,'psy45@gmail.com','$2a$08$LBPOY9lBjzvTylEwVlQK9.wFwYTiMyYSkk1B.TkiMlmyhb99zqWJ6','2022-08-20 07:07:01','2022-08-20 07:07:01'),(22,'psy46',4,'psy46@gmail.com','$2a$08$aEngqL3nkQc5gFAi0fdR1.rQ4r2DED5fPRTDZe5cOFpvhPmpRxNI6','2022-08-20 07:07:07','2022-08-20 07:07:07'),(23,'psy47',4,'psy47@gmail.com','$2a$08$n.Fclqb1MUHzcBw3ey1bnOCw9tEmx8sjO6bsjtcJ89T5NJwtmDymu','2022-08-20 07:07:14','2022-08-20 07:07:14');
/*!40000 ALTER TABLE `psychiatrists` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-20 13:16:11