-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: yq-admin-ele-db
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `sys_department`
--

DROP TABLE IF EXISTS `sys_department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_department` (
                                `id` int NOT NULL AUTO_INCREMENT,
                                `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                                `parent_id` int NOT NULL DEFAULT '0',
                                `sort` int DEFAULT NULL,
                                `is_enable` tinyint DEFAULT '1',
                                `created_at` datetime DEFAULT NULL,
                                `updated_at` datetime DEFAULT NULL,
                                `deleted_at` datetime DEFAULT NULL,
                                PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_department`
--

LOCK TABLES `sys_department` WRITE;
/*!40000 ALTER TABLE `sys_department` DISABLE KEYS */;
INSERT INTO `sys_department` VALUES (1,'Mason • 石匠',0,1,1,'2024-10-22 22:29:15','2024-10-29 14:42:08',NULL);
/*!40000 ALTER TABLE `sys_department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_menu`
--

DROP TABLE IF EXISTS `sys_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_menu` (
                          `id` bigint NOT NULL AUTO_INCREMENT,
                          `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                          `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                          `parent_id` int NOT NULL DEFAULT '0',
                          `sort` int DEFAULT NULL,
                          `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                          `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                          `is_link` tinyint DEFAULT NULL,
                          `is_enable` tinyint DEFAULT NULL,
                          `is_affix` tinyint DEFAULT NULL,
                          `is_keep_alive` tinyint DEFAULT NULL,
                          `created_at` datetime DEFAULT NULL,
                          `updated_at` datetime DEFAULT NULL,
                          `deleted_at` datetime DEFAULT NULL,
                          PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_menu`
--

LOCK TABLES `sys_menu` WRITE;
/*!40000 ALTER TABLE `sys_menu` DISABLE KEYS */;
INSERT INTO `sys_menu` VALUES (1,'dashboard','/dashboard',0,1,'仪表盘','home',0,1,0,0,'2024-10-22 22:29:15','2025-03-09 21:35:57',NULL),(2,'system','/system',0,3,'系统管理','system',0,1,0,1,'2024-10-22 22:29:15','2025-03-09 19:20:55',NULL),(3,'accountManage','/system/accountManage',2,1,'账号管理','',0,1,0,1,'2024-10-22 22:29:15','2025-03-14 13:10:23',NULL),(4,'roleManage','/system/roleManage',2,1,'角色管理','',0,1,0,1,'2024-10-22 22:29:15','2025-03-14 13:10:28',NULL),(5,'menuManage','/system/menuManage',2,1,'菜单管理','',0,1,0,1,'2024-10-22 22:29:15','2025-03-14 13:10:40',NULL),(6,'departmentManage','/system/departmentManage',2,1,'部门管理','',0,1,0,1,'2024-10-22 22:29:15','2025-03-14 13:10:35',NULL),(10,'menu','/menu',0,4,'路由缓存','menu',0,1,0,1,'2024-06-20 15:52:44','2025-03-09 19:21:01',NULL),(11,'menu1','/menu/menu1',10,1,'菜单1','',0,1,0,1,'2024-06-20 15:52:44','2025-03-14 13:11:35',NULL),(12,'menu2','/menu/menu2',10,1,'菜单2','',0,1,0,1,'2024-06-20 15:52:44','2025-03-14 13:11:40',NULL),(13,'menu21','/menu/menu2/menu21',12,1,'菜单2-1','',0,1,0,1,'2024-06-20 15:52:44','2025-03-14 13:11:52',NULL),(14,'menu22','/menu/menu2/menu22',12,1,'菜单2-2','',0,1,0,1,'2024-06-20 15:52:44','2025-03-14 13:11:47',NULL),(15,'menu221','/menu/menu2/menu22/menu221',14,1,'菜单2-2-1','',0,1,0,1,'2024-06-20 15:52:44','2025-03-14 13:11:57',NULL),(16,'menu222','/menu/menu2/menu22/menu222',14,1,'菜单2-2-2','',0,1,0,1,'2024-06-20 15:52:44','2025-03-14 13:12:11',NULL),(17,'menu23','/menu/menu2/menu23',12,1,'菜单2-3','',0,1,0,1,'2024-06-20 15:52:44','2025-03-14 13:12:03',NULL),(18,'menu3','/menu/menu3',10,1,'菜单3','',0,1,0,1,'2024-06-20 15:52:44','2025-03-14 13:12:16',NULL),(24,'user','/user',0,2,'个人中心','user-center',0,1,0,0,'2024-11-16 15:34:37','2025-03-09 19:20:48',NULL),(25,'components','/components',0,5,'组件中心','zhujianzhongxin',0,1,0,0,'2025-03-09 19:20:03','2025-03-14 13:20:28',NULL),(26,'workbench','/dashboard/workbench',1,1,'工作台','',0,1,1,0,'2025-03-09 19:25:44','2025-03-09 21:35:52',NULL),(27,'icon-picker','/components/icon-picker',25,2,'图标选择器','',0,1,0,0,'2025-03-09 19:55:48','2025-03-14 13:26:18',NULL),(28,'icon-view','/components/icon-view',25,1,'图标预览','',0,1,0,0,'2025-03-14 13:26:10','2025-03-14 13:26:10',NULL);
/*!40000 ALTER TABLE `sys_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_role`
--

DROP TABLE IF EXISTS `sys_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_role` (
                          `id` bigint NOT NULL AUTO_INCREMENT,
                          `role` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                          `role_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                          `is_super` tinyint NOT NULL DEFAULT '0',
                          `remark` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                          `created_at` datetime DEFAULT NULL,
                          `updated_at` datetime DEFAULT NULL,
                          PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_role`
--

LOCK TABLES `sys_role` WRITE;
/*!40000 ALTER TABLE `sys_role` DISABLE KEYS */;
INSERT INTO `sys_role` VALUES (1,'super_admin','超级管理员',1,NULL,'2024-10-22 22:29:15','2024-10-22 22:29:15'),(2,'user','普通用户',0,'','2024-10-22 22:29:15','2024-10-22 23:03:02');
/*!40000 ALTER TABLE `sys_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_role_menu`
--

DROP TABLE IF EXISTS `sys_role_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_role_menu` (
                               `role_id` bigint NOT NULL,
                               `menu_id` bigint NOT NULL,
                               `created_at` datetime DEFAULT NULL,
                               `updated_at` datetime DEFAULT NULL,
                               PRIMARY KEY (`role_id`,`menu_id`) USING BTREE,
                               UNIQUE KEY `sys_role_menu_menuId_roleId_unique` (`role_id`,`menu_id`) USING BTREE,
                               KEY `menu_id` (`menu_id`) USING BTREE,
                               CONSTRAINT `sys_role_menu_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `sys_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
                               CONSTRAINT `sys_role_menu_ibfk_2` FOREIGN KEY (`menu_id`) REFERENCES `sys_menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_role_menu`
--

LOCK TABLES `sys_role_menu` WRITE;
/*!40000 ALTER TABLE `sys_role_menu` DISABLE KEYS */;
INSERT INTO `sys_role_menu` VALUES (1,1,'2024-10-22 22:29:15','2024-10-22 22:29:15'),(1,2,'2024-10-22 22:29:15','2024-10-22 22:29:15'),(1,3,'2024-10-22 22:29:15','2024-10-22 22:29:15'),(1,4,'2024-10-22 22:29:15','2024-10-22 22:29:15'),(1,5,'2024-10-22 22:29:15','2024-10-22 22:29:15'),(1,6,'2024-10-22 22:29:15','2024-10-22 22:29:15'),(1,10,'2024-10-22 22:29:15','2024-10-22 22:29:15'),(1,11,'2024-10-22 22:29:15','2024-10-22 22:29:15'),(1,12,'2024-10-22 22:29:15','2024-10-22 22:29:15'),(1,13,'2024-10-22 22:29:15','2024-10-22 22:29:15'),(1,14,'2024-10-22 22:29:15','2024-10-22 22:29:15'),(1,15,'2024-10-22 22:29:15','2024-10-22 22:29:15'),(1,16,'2024-10-22 22:29:15','2024-10-22 22:29:15'),(1,17,'2024-10-22 22:29:15','2024-10-22 22:29:15'),(1,18,'2024-10-22 22:29:15','2024-10-22 22:29:15'),(1,24,'2024-11-16 15:34:37','2024-11-16 15:34:37'),(1,25,'2025-03-09 19:20:03','2025-03-09 19:20:03'),(1,26,'2025-03-09 19:25:44','2025-03-09 19:25:44'),(1,27,'2025-03-09 19:55:48','2025-03-09 19:55:48'),(1,28,'2025-03-14 13:26:10','2025-03-14 13:26:10'),(2,1,'2024-10-22 23:03:02','2024-10-22 23:03:02'),(2,10,'2024-10-22 23:03:02','2024-10-22 23:03:02'),(2,11,'2024-10-22 23:03:02','2024-10-22 23:03:02'),(2,12,'2024-10-22 23:03:02','2024-10-22 23:03:02'),(2,13,'2024-10-22 23:03:02','2024-10-22 23:03:02'),(2,14,'2024-10-22 23:03:02','2024-10-22 23:03:02'),(2,15,'2024-10-22 23:03:02','2024-10-22 23:03:02'),(2,16,'2024-10-22 23:03:02','2024-10-22 23:03:02'),(2,17,'2024-10-22 23:03:02','2024-10-22 23:03:02'),(2,18,'2024-10-22 23:03:02','2024-10-22 23:03:02');
/*!40000 ALTER TABLE `sys_role_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_user`
--

DROP TABLE IF EXISTS `sys_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_user` (
                          `id` bigint NOT NULL AUTO_INCREMENT,
                          `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                          `username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                          `password` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                          `dept_id` int NOT NULL DEFAULT '1',
                          `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                          `phone` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                          `avatar` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                          `remark` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                          `created_at` datetime DEFAULT NULL,
                          `updated_at` datetime DEFAULT NULL,
                          `deleted_at` datetime DEFAULT NULL,
                          PRIMARY KEY (`id`) USING BTREE,
                          UNIQUE KEY `username` (`username`) USING BTREE,
                          KEY `dept_id` (`dept_id`) USING BTREE,
                          CONSTRAINT `sys_user_ibfk_1` FOREIGN KEY (`dept_id`) REFERENCES `sys_department` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_user`
--

LOCK TABLES `sys_user` WRITE;
/*!40000 ALTER TABLE `sys_user` DISABLE KEYS */;
INSERT INTO `sys_user` VALUES (13,'Mason • 一勺','Mason','$2b$10$lNa7kr.QvhS8p1ZIMJfciOMgqEK0RPkj7L1W3Gz5uZVvx16j9T/2C',1,'547471919@qq.com','15170536808',NULL,'要走很多很多弯路','2025-03-09 14:00:00','2025-03-09 16:22:05',NULL);
/*!40000 ALTER TABLE `sys_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_user_role`
--

DROP TABLE IF EXISTS `sys_user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_user_role` (
                               `user_id` bigint NOT NULL,
                               `role_id` bigint NOT NULL,
                               `created_at` datetime DEFAULT NULL,
                               `updated_at` datetime DEFAULT NULL,
                               `deleted_at` datetime DEFAULT NULL,
                               PRIMARY KEY (`user_id`,`role_id`) USING BTREE,
                               UNIQUE KEY `sys_user_role_roleId_userId_unique` (`user_id`,`role_id`) USING BTREE,
                               KEY `role_id` (`role_id`) USING BTREE,
                               CONSTRAINT `sys_user_role_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `sys_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
                               CONSTRAINT `sys_user_role_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `sys_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_user_role`
--

LOCK TABLES `sys_user_role` WRITE;
/*!40000 ALTER TABLE `sys_user_role` DISABLE KEYS */;
INSERT INTO `sys_user_role` VALUES (13,1,'2025-03-09 14:00:00','2025-03-09 16:22:05',NULL);
/*!40000 ALTER TABLE `sys_user_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-14 17:38:29
