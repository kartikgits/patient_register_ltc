drop database if exists `patient_registration`;

create database `patient_registration`;

use `patient_registration`;

set FOREIGN_KEY_CHECKS=0;

create table `patient_registration`.`hospitals` (
    `hospital_id` int(11) NOT NULL AUTO_INCREMENT,
    `hospital_name` varchar(255) NOT NULL,
    PRIMARY KEY (`hospital_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table `patient_registration`.`psychiatrists` (
    `psychiatrist_id` int(11) NOT NULL AUTO_INCREMENT,
    `psychiatrist_name` varchar(255) NOT NULL,
    `psychiatrist_hospital_id` int(11) NOT NULL,
    `psychiatrist_email` varchar(255) UNIQUE NOT NULL,
    `psychiatrist_password` varchar(255) NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`psychiatrist_id`),
    index idx_psychiatrist_email (`psychiatrist_email`),
    KEY `fk_psychiatrist_hospital_id` (`psychiatrist_hospital_id`),
    CONSTRAINT `fk_psychiatrist_hospital_id` FOREIGN KEY (`psychiatrist_hospital_id`) REFERENCES `hospitals` (`hospital_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table `patient_registration`.`patients` (
    `patient_id` int(11) NOT NULL AUTO_INCREMENT,
    `patient_name` varchar(255) NOT NULL,
    `patient_address` varchar(255) NOT NULL,
    `patient_phone` varchar(255) NOT NULL,
    `patient_email` varchar(255) NOT NULL,
    `patient_password` varchar(255) NOT NULL,
    `patient_photo` varchar(255) NOT NULL,
    `patient_psychiatrist_id` int(11) NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`patient_id`),
    index idx_patient_email (`patient_email`),
    KEY `fk_patient_psychiatrist_id` (`patient_psychiatrist_id`),
    CONSTRAINT `fk_patient_psychiatrist_id` FOREIGN KEY (`patient_psychiatrist_id`) REFERENCES `psychiatrists` (`psychiatrist_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

set FOREIGN_KEY_CHECKS=1;