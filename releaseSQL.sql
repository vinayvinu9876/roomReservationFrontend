

CREATE TABLE `features` (
   `id` int NOT NULL AUTO_INCREMENT,
   `feature_name` varchar(300) NOT NULL,
   `feature_desc` varchar(1000) NOT NULL,
   `status` varchar(100) NOT NULL,
   `created_at` timestamp NOT NULL DEFAULT (now()),
   `updated_at` timestamp NOT NULL DEFAULT (now()),
   `total_available` int NOT NULL,
   PRIMARY KEY (`id`),
   KEY `fk_features_rooms` (`status`)
 );

CREATE TABLE `media` (
   `id` int NOT NULL AUTO_INCREMENT,
   `filename` varchar(500) NOT NULL,
   `url` text NOT NULL,
   `created_on` timestamp NOT NULL DEFAULT (now()),
   `updated_on` date NOT NULL DEFAULT (curdate()),
   PRIMARY KEY (`id`)
 );

 CREATE TABLE `priority` (
   `id` int NOT NULL AUTO_INCREMENT,
   `role_ids` varchar(150) DEFAULT NULL,
   `name` varchar(100) NOT NULL,
   `desc` varchar(1000) NOT NULL,
   `created_on` timestamp NOT NULL DEFAULT (now()),
   `updated_on` timestamp NOT NULL DEFAULT (now()),
   `status` varchar(30) NOT NULL,
   `priority_no` int NOT NULL,
   PRIMARY KEY (`id`)
 );

 CREATE TABLE `room_down_time` (
   `id` int NOT NULL AUTO_INCREMENT,
   `room_id` int NOT NULL,
   `desc` varchar(1000) NOT NULL,
   `start` time NOT NULL DEFAULT (curtime()),
   `end` time NOT NULL DEFAULT (curtime()),
   `day` varchar(20) NOT NULL,
   `created_at` timestamp NOT NULL DEFAULT (now()),
   `updated_at` timestamp NOT NULL DEFAULT (now()),
   `status` varchar(100) NOT NULL DEFAULT (_utf8mb4'1'),
   PRIMARY KEY (`id`)
 );

 CREATE TABLE `room_features` (
   `id` int NOT NULL AUTO_INCREMENT,
   `feature_id` int NOT NULL,
   `room_id` int NOT NULL,
   `created_at` timestamp NOT NULL DEFAULT (now()),
   `updated_at` timestamp NOT NULL DEFAULT (now()),
   `status` varchar(100) NOT NULL,
   `total_available` int NOT NULL,
   PRIMARY KEY (`id`)
 );

CREATE TABLE `room_media` (
   `id` int NOT NULL AUTO_INCREMENT,
   `room_id` int NOT NULL,
   `media_id` int NOT NULL,
   `status` varchar(100) NOT NULL,
   PRIMARY KEY (`id`)
 );

 CREATE TABLE `room_reservation` (
   `reservation_id` int NOT NULL AUTO_INCREMENT,
   `room_id` int NOT NULL,
   `start_timestamp` timestamp NOT NULL,
   `end_timestamp` timestamp NOT NULL DEFAULT (now()),
   `reservation_description` varchar(1000) DEFAULT NULL,
   `headed_by` varchar(200) DEFAULT NULL,
   `meeting_title` varchar(200) DEFAULT NULL,
   `reserved_by_name` varchar(150) DEFAULT NULL,
   `reserved_by_email` varchar(100) NOT NULL,
   `created_at` timestamp NOT NULL DEFAULT (now()),
   `updated_at` timestamp NOT NULL DEFAULT (now()),
   `status` varchar(100) NOT NULL,
   `priority_id` int NOT NULL,
   `attendees_email` text COMMENT 'comma separated emails of of attendees',
   `no_of_attendees` int NOT NULL,
   PRIMARY KEY (`reservation_id`)
 );

 CREATE TABLE `rooms` (
   `room_id` int NOT NULL AUTO_INCREMENT,
   `room_name` varchar(300) NOT NULL,
   `room_desc` varchar(1000) DEFAULT NULL,
   `room_capacity` int DEFAULT NULL,
   `status` varchar(40) NOT NULL,
   `created_at` timestamp NOT NULL DEFAULT (now()),
   `updated_at` timestamp NOT NULL DEFAULT (now()),
   PRIMARY KEY (`room_id`)
 );

