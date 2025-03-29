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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_department`
--

LOCK TABLES `sys_department` WRITE;
/*!40000 ALTER TABLE `sys_department` DISABLE KEYS */;
INSERT INTO `sys_department` VALUES (1,'Mason • 石匠',0,1,1,'2024-10-22 22:29:15','2024-10-29 14:42:08',NULL),(8,'前端开发',1,1,1,'2025-03-28 20:01:57','2025-03-28 20:01:57',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_menu`
--

LOCK TABLES `sys_menu` WRITE;
/*!40000 ALTER TABLE `sys_menu` DISABLE KEYS */;
INSERT INTO `sys_menu` VALUES (1,'dashboard','/dashboard',0,1,'仪表盘','icon-chart-bar',0,1,0,0,'2024-10-22 22:29:15','2025-03-23 17:30:25',NULL),(2,'system','/system',0,3,'系统管理','icon-tiaojianfenzu',0,1,0,0,'2024-10-22 22:29:15','2025-03-27 13:02:14',NULL),(3,'accountManage','/system/accountManage',2,1,'账号管理','',0,1,0,0,'2024-10-22 22:29:15','2025-03-27 13:02:25',NULL),(4,'roleManage','/system/roleManage',2,1,'角色管理','',0,1,0,0,'2024-10-22 22:29:15','2025-03-27 13:02:31',NULL),(5,'menuManage','/system/menuManage',2,1,'菜单管理','',0,1,0,0,'2024-10-22 22:29:15','2025-03-27 13:02:36',NULL),(6,'departmentManage','/system/departmentManage',2,1,'部门管理','',0,1,0,0,'2024-10-22 22:29:15','2025-03-27 13:02:41',NULL),(10,'menu','/menu',0,4,'路由缓存','icon-lock',0,1,0,1,'2024-06-20 15:52:44','2025-03-23 17:34:27',NULL),(11,'menu1','/menu/menu1',10,1,'菜单1','',0,1,0,1,'2024-06-20 15:52:44','2025-03-14 13:11:35',NULL),(12,'menu2','/menu/menu2',10,1,'菜单2','',0,1,0,1,'2024-06-20 15:52:44','2025-03-14 13:11:40',NULL),(13,'menu21','/menu/menu2/menu21',12,1,'菜单2-1','',0,1,0,1,'2024-06-20 15:52:44','2025-03-14 13:11:52',NULL),(14,'menu22','/menu/menu2/menu22',12,1,'菜单2-2','',0,1,0,1,'2024-06-20 15:52:44','2025-03-14 13:11:47',NULL),(15,'menu221','/menu/menu2/menu22/menu221',14,1,'菜单2-2-1','',0,1,0,1,'2024-06-20 15:52:44','2025-03-14 13:11:57',NULL),(16,'menu222','/menu/menu2/menu22/menu222',14,1,'菜单2-2-2','',0,1,0,1,'2024-06-20 15:52:44','2025-03-14 13:12:11',NULL),(17,'menu23','/menu/menu2/menu23',12,1,'菜单2-3','',0,1,0,1,'2024-06-20 15:52:44','2025-03-14 13:12:03',NULL),(18,'menu3','/menu/menu3',10,1,'菜单3','',0,1,0,1,'2024-06-20 15:52:44','2025-03-14 13:12:16',NULL),(24,'user','/user',0,9,'个人中心','icon-guanli',0,1,0,0,'2024-11-16 15:34:37','2025-03-23 19:31:39',NULL),(25,'business-components','/business-components',0,5,'组件中心','icon-dianlinengyuan',0,1,0,0,'2025-03-09 19:20:03','2025-03-27 17:31:35',NULL),(26,'workbench','/dashboard/workbench',1,1,'工作台','',0,1,1,0,'2025-03-09 19:25:44','2025-03-09 21:35:52',NULL),(27,'icon-picker','/business-components/icon-picker',25,2,'图标选择器','',0,1,0,0,'2025-03-09 19:55:48','2025-03-16 18:52:59',NULL),(28,'icon-view','/business-components/icon-view',25,1,'图标预览','',0,1,0,0,'2025-03-14 13:26:10','2025-03-16 18:52:53',NULL),(29,'image-crepping','/business-components/image-cropping',25,3,'图片裁剪','',0,1,0,0,'2025-03-14 19:11:09','2025-03-16 18:53:06',NULL),(30,'form-generator','/business-components/form-generator',25,4,'表单生成器','',0,1,0,0,'2025-03-14 20:55:45','2025-03-23 11:57:33',NULL),(31,'basic-components','/basic-components',0,6,'基础组件','icon-code',0,1,0,0,'2025-03-15 22:51:00','2025-03-23 17:40:12',NULL),(32,'table','/basic-components/table',31,1,'表格','',0,1,0,0,'2025-03-15 23:03:14','2025-03-15 23:03:14',NULL),(33,'form','/basic-components/form',31,2,'表单','',0,1,0,0,'2025-03-15 23:06:05','2025-03-15 23:06:05',NULL),(34,'custom-table','/basic-components/table/custom-table',32,1,'自定义表格','',0,1,0,0,'2025-03-16 19:04:39','2025-03-16 19:04:39',NULL),(35,'configurable-table','/basic-components/table/configurable-table',32,1,'配置型表格','',0,1,0,0,'2025-03-16 19:07:20','2025-03-18 16:36:15',NULL),(36,'dynamic-form','/basic-components/form/dynamic-form',33,1,'动态表单','',0,1,0,0,'2025-03-16 19:10:56','2025-03-16 20:48:51',NULL),(38,'step-form','/basic-components/form/step-form',33,2,'分步表单','',0,1,0,0,'2025-03-16 20:52:06','2025-03-16 20:52:06',NULL),(39,'column','/column',31,3,'分栏','',0,1,0,0,'2025-03-16 20:53:36','2025-03-16 20:53:36',NULL),(40,'tree','/tree',31,4,'树状图','',0,1,0,0,'2025-03-16 20:54:27','2025-03-16 20:54:27',NULL),(41,'qx-monitor','/qx-monitor',0,7,'七星监控','icon-AloT',0,1,0,0,'2025-03-23 15:24:34','2025-03-23 17:40:34',NULL),(42,'config','/config',0,8,'系统配置','icon-jingbao',0,1,0,0,'2025-03-23 15:26:24','2025-03-23 17:33:29',NULL),(43,'config-setting','/config/config-setting',42,1,'系统设置','',0,1,0,0,'2025-03-23 15:40:10','2025-03-23 15:44:42',NULL),(44,'config-api','/config/config-api',42,2,'API管理','',0,1,0,0,'2025-03-23 15:42:14','2025-03-23 15:44:52',NULL),(45,'config-log','/config/config-log',42,3,'系统日志','',0,1,0,0,'2025-03-23 15:43:09','2025-03-23 15:45:00',NULL),(46,'editor','/business-components/editor',25,5,'富文本编辑器','',0,1,0,0,'2025-03-23 21:18:54','2025-03-23 21:47:33',NULL),(47,'vue-directive','/vue-directive',31,5,'自定义指令','',0,1,0,0,'2025-03-23 22:07:29','2025-03-23 22:07:29','2025-03-23 22:08:41'),(48,'vue-directive','/vue-directive',0,6,'指令中心','icon-icon-test6',0,1,0,0,'2025-03-23 22:09:25','2025-03-23 22:10:31',NULL),(49,'template','/template',0,6,'模板中心','icon-modular',0,1,0,0,'2025-03-24 18:39:02','2025-03-24 18:41:18',NULL),(50,'aigc','/template/aigc',49,1,'AIGC模板','',0,1,0,0,'2025-03-24 20:35:01','2025-03-24 20:35:01',NULL),(51,'classify-list','/basic-components/column/classify-list',39,1,'左分类右列表','',0,1,0,0,'2025-03-27 12:51:29','2025-03-27 13:07:13',NULL),(52,'tree-list','/basic-components/column/tree-list',39,2,'左树右列表','',0,1,0,0,'2025-03-27 12:52:27','2025-03-27 13:07:27',NULL),(53,'flat-tree','/tree/flat-tree',40,1,'水平树状图','',0,1,0,0,'2025-03-27 12:56:50','2025-03-27 12:56:50',NULL),(54,'flow-chart','/business-components/flow chart',0,1,'流程图','',0,1,0,0,'2025-03-27 17:31:01','2025-03-27 17:31:01','2025-03-27 17:31:08'),(55,'flow-chart','/business-components/flow-chart',25,1,'流程图','',0,1,0,0,'2025-03-27 17:32:31','2025-03-27 17:32:31',NULL),(56,'camera','/business-components/camera',25,3,'摄像头','',0,1,0,0,'2025-03-27 17:51:10','2025-03-27 17:54:47',NULL),(57,'video-conversation','/business-components/video-conversation',25,3,'视频聊天','',0,1,0,0,'2025-03-28 10:26:53','2025-03-28 10:27:10',NULL),(58,'toast','/basic-components/toast',31,5,'提示框','',0,1,0,0,'2025-03-28 14:02:08','2025-03-28 14:02:08',NULL),(59,'mason-pro-form','/basic-components/mason-pro-form',31,5,'基础表单二次封装','',0,1,0,0,'2025-03-29 16:36:11','2025-03-29 16:36:11',NULL),(60,'mason-pro-input','/basic-components/mason-pro-form/mason-pro-input',59,1,'mason-pro-input','',0,1,0,0,'2025-03-29 16:53:08','2025-03-29 16:53:08',NULL);
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
INSERT INTO `sys_role` VALUES (1,'super_admin','超级管理员',1,NULL,'2024-10-22 22:29:15','2024-10-22 22:29:15'),(2,'user','普通用户',0,'','2024-10-22 22:29:15','2025-03-27 15:22:13');
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
INSERT INTO `sys_role_menu` VALUES (1,1,'2024-10-22 22:29:15','2024-10-22 22:29:15'),(1,2,'2024-10-22 22:29:15','2024-10-22 22:29:15'),(1,3,'2024-10-22 22:29:15','2024-10-22 22:29:15'),(1,4,'2024-10-22 22:29:15','2024-10-22 22:29:15'),(1,5,'2024-10-22 22:29:15','2024-10-22 22:29:15'),(1,6,'2024-10-22 22:29:15','2024-10-22 22:29:15'),(1,10,'2024-10-22 22:29:15','2024-10-22 22:29:15'),(1,11,'2024-10-22 22:29:15','2024-10-22 22:29:15'),(1,12,'2024-10-22 22:29:15','2024-10-22 22:29:15'),(1,13,'2024-10-22 22:29:15','2024-10-22 22:29:15'),(1,14,'2024-10-22 22:29:15','2024-10-22 22:29:15'),(1,15,'2024-10-22 22:29:15','2024-10-22 22:29:15'),(1,16,'2024-10-22 22:29:15','2024-10-22 22:29:15'),(1,17,'2024-10-22 22:29:15','2024-10-22 22:29:15'),(1,18,'2024-10-22 22:29:15','2024-10-22 22:29:15'),(1,24,'2024-11-16 15:34:37','2024-11-16 15:34:37'),(1,25,'2025-03-09 19:20:03','2025-03-09 19:20:03'),(1,26,'2025-03-09 19:25:44','2025-03-09 19:25:44'),(1,27,'2025-03-09 19:55:48','2025-03-09 19:55:48'),(1,28,'2025-03-14 13:26:10','2025-03-14 13:26:10'),(1,29,'2025-03-14 19:11:09','2025-03-14 19:11:09'),(1,30,'2025-03-14 20:55:45','2025-03-14 20:55:45'),(1,31,'2025-03-15 22:51:00','2025-03-15 22:51:00'),(1,32,'2025-03-15 23:03:14','2025-03-15 23:03:14'),(1,33,'2025-03-15 23:06:05','2025-03-15 23:06:05'),(1,34,'2025-03-16 19:04:39','2025-03-16 19:04:39'),(1,35,'2025-03-16 19:07:20','2025-03-16 19:07:20'),(1,36,'2025-03-16 19:10:56','2025-03-16 19:10:56'),(1,38,'2025-03-16 20:52:06','2025-03-16 20:52:06'),(1,39,'2025-03-16 20:53:36','2025-03-16 20:53:36'),(1,40,'2025-03-16 20:54:27','2025-03-16 20:54:27'),(1,41,'2025-03-23 15:24:34','2025-03-23 15:24:34'),(1,42,'2025-03-23 15:26:24','2025-03-23 15:26:24'),(1,43,'2025-03-23 15:40:10','2025-03-23 15:40:10'),(1,44,'2025-03-23 15:42:14','2025-03-23 15:42:14'),(1,45,'2025-03-23 15:43:09','2025-03-23 15:43:09'),(1,46,'2025-03-23 21:18:54','2025-03-23 21:18:54'),(1,48,'2025-03-23 22:09:25','2025-03-23 22:09:25'),(1,49,'2025-03-24 18:39:02','2025-03-24 18:39:02'),(1,50,'2025-03-24 20:35:01','2025-03-24 20:35:01'),(1,51,'2025-03-27 12:51:29','2025-03-27 12:51:29'),(1,52,'2025-03-27 12:52:27','2025-03-27 12:52:27'),(1,53,'2025-03-27 12:56:50','2025-03-27 12:56:50'),(1,55,'2025-03-27 17:32:31','2025-03-27 17:32:31'),(1,56,'2025-03-27 17:51:10','2025-03-27 17:51:10'),(1,57,'2025-03-28 10:26:53','2025-03-28 10:26:53'),(1,58,'2025-03-28 14:02:08','2025-03-28 14:02:08'),(1,59,'2025-03-29 16:36:11','2025-03-29 16:36:11'),(1,60,'2025-03-29 16:53:08','2025-03-29 16:53:08'),(2,1,'2025-03-27 15:22:13','2025-03-27 15:22:13'),(2,11,'2025-03-27 15:22:13','2025-03-27 15:22:13'),(2,12,'2025-03-27 15:22:13','2025-03-27 15:22:13'),(2,13,'2025-03-27 15:22:13','2025-03-27 15:22:13'),(2,14,'2025-03-27 15:22:13','2025-03-27 15:22:13'),(2,15,'2025-03-27 15:22:13','2025-03-27 15:22:13'),(2,16,'2025-03-27 15:22:13','2025-03-27 15:22:13'),(2,17,'2025-03-27 15:22:13','2025-03-27 15:22:13'),(2,18,'2025-03-27 15:22:13','2025-03-27 15:22:13'),(2,24,'2025-03-27 15:22:13','2025-03-27 15:22:13'),(2,25,'2025-03-27 15:22:13','2025-03-27 15:22:13'),(2,26,'2025-03-27 15:22:13','2025-03-27 15:22:13'),(2,27,'2025-03-27 15:22:13','2025-03-27 15:22:13'),(2,28,'2025-03-27 15:22:13','2025-03-27 15:22:13'),(2,29,'2025-03-27 15:22:13','2025-03-27 15:22:13'),(2,30,'2025-03-27 15:22:13','2025-03-27 15:22:13'),(2,31,'2025-03-27 15:22:13','2025-03-27 15:22:13'),(2,32,'2025-03-27 15:22:13','2025-03-27 15:22:13'),(2,33,'2025-03-27 15:22:13','2025-03-27 15:22:13'),(2,34,'2025-03-27 15:22:13','2025-03-27 15:22:13'),(2,35,'2025-03-27 15:22:13','2025-03-27 15:22:13'),(2,36,'2025-03-27 15:22:13','2025-03-27 15:22:13'),(2,38,'2025-03-27 15:22:13','2025-03-27 15:22:13'),(2,39,'2025-03-27 15:22:13','2025-03-27 15:22:13'),(2,40,'2025-03-27 15:22:13','2025-03-27 15:22:13'),(2,46,'2025-03-27 15:22:13','2025-03-27 15:22:13'),(2,48,'2025-03-27 15:22:13','2025-03-27 15:22:13'),(2,49,'2025-03-27 15:22:13','2025-03-27 15:22:13'),(2,51,'2025-03-27 15:22:13','2025-03-27 15:22:13'),(2,52,'2025-03-27 15:22:13','2025-03-27 15:22:13'),(2,53,'2025-03-27 15:22:13','2025-03-27 15:22:13');
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_user`
--

LOCK TABLES `sys_user` WRITE;
/*!40000 ALTER TABLE `sys_user` DISABLE KEYS */;
INSERT INTO `sys_user` VALUES (13,'Mason','Mason','$2b$10$lNa7kr.QvhS8p1ZIMJfciOMgqEK0RPkj7L1W3Gz5uZVvx16j9T/2C',1,'547471919@qq.com','15170536808',NULL,'要走很多很多弯路','2025-03-09 14:00:00','2025-03-27 15:23:21',NULL),(14,'一勺','Coder','$2b$10$bdzkQNruFEncSkCjApsMleKg4au1/hyPDfQtvOdCa5VxSXlcltVD.',8,'547471919@qq.com','15170536808',NULL,'一个小小的前端工程师','2025-03-27 15:15:10','2025-03-28 20:02:31',NULL);
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
INSERT INTO `sys_user_role` VALUES (13,1,'2025-03-09 14:00:00','2025-03-27 15:23:21',NULL),(14,2,'2025-03-27 15:15:10','2025-03-28 20:02:31',NULL);
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

-- Dump completed on 2025-03-29 21:21:21
