-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 23, 2025 at 05:50 AM
-- Server version: 11.5.2-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gd`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(30) DEFAULT NULL,
  `color` varchar(10) DEFAULT NULL,
  `accessibility` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`, `color`, `accessibility`) VALUES
(1, 'Course Files', '#008000', 'staff,lecturer'),
(2, 'Meeting', '#FF0000', 'lecturer,staff'),
(3, 'Workshop', '#0504AA', 'lecturer,staff'),
(4, 'Research', '#ff1284', 'staff,lecturer,student'),
(5, 'Timetable', '#d36eff', 'staff'),
(6, 'Internship', '#575cff', 'student,lecturer,staff'),
(7, 'Course Coordination', '#47ffff', 'lecturer'),
(8, 'Event', '#8a1cff', 'student,lecturer,staff');

-- --------------------------------------------------------

--
-- Table structure for table `favourite_resources`
--

CREATE TABLE `favourite_resources` (
  `user_id` varchar(10) NOT NULL,
  `resource_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `group_id` int(11) NOT NULL,
  `group_name` varchar(20) NOT NULL,
  `creator` varchar(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`group_id`, `group_name`, `creator`, `created_at`) VALUES
(476, 'ip-s06', 'A22EC0062', '2025-01-20 17:54:24'),
(483, 'ip-s06', 'A22EC0067', '2025-01-21 09:22:39'),
(484, 'ip-s07', 'A22EC0062', '2025-01-22 07:23:50');

-- --------------------------------------------------------

--
-- Table structure for table `group_members`
--

CREATE TABLE `group_members` (
  `group_member_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `member_email` varchar(255) NOT NULL,
  `role` enum('admin','member') DEFAULT 'member',
  `joined_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `group_members`
--

INSERT INTO `group_members` (`group_member_id`, `group_id`, `member_email`, `role`, `joined_at`) VALUES
(41, 476, 'kwekcong@graduate.utm.my', 'member', '2025-01-23 04:45:38');

-- --------------------------------------------------------

--
-- Table structure for table `group_sharing`
--

CREATE TABLE `group_sharing` (
  `group_id` int(11) NOT NULL,
  `resource_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notification_id` int(11) NOT NULL,
  `resource_id` int(11) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`notification_id`, `resource_id`, `message`, `created_at`) VALUES
(205, 77, 'FC UTM shared the resource \"SECJ2013-03\" with you.', '2025-01-22 18:24:38'),
(206, 78, 'FC UTM shared the resource \"SECJ2013-09\" with you.', '2025-01-22 18:25:09'),
(207, 79, 'FC UTM shared the resource \"SECR3104-03\" with you.', '2025-01-22 18:25:37'),
(208, 80, 'FC UTM shared the resource \"SECJ3104-01\" with you.', '2025-01-22 18:26:34'),
(209, 81, 'FC UTM shared the resource \"SECV3104-01\" with you.', '2025-01-22 18:27:24'),
(210, 82, 'FC UTM shared the resource \"SECV3104-01\" with you.', '2025-01-22 18:29:16'),
(211, 83, 'FC UTM shared the resource \"SECJ2154-07\" with you.', '2025-01-22 18:32:16'),
(212, 83, 'FC UTM edited the resource \"SECJ2154-07\".', '2025-01-22 18:38:46'),
(213, 83, 'FC UTM unshared the resource \"SECJ2154-07\" with you.', '2025-01-22 18:38:46'),
(214, 83, 'FC UTM shared the resource \"SECJ2154-07\" with you.', '2025-01-22 18:38:46'),
(215, 82, 'FC UTM edited the resource \"SECV3104-01\".', '2025-01-22 18:45:31'),
(216, 82, 'FC UTM edited the resource \"SECV3104-01\".', '2025-01-22 18:47:13'),
(217, 82, 'FC UTM edited the resource \"SECV3104-01\".', '2025-01-22 18:50:36'),
(218, 82, 'FC UTM edited the resource \"SECV3104-01\".', '2025-01-22 18:52:09'),
(219, 82, 'FC UTM edited the resource \"SECV3104-01\".', '2025-01-22 18:55:09'),
(220, 82, 'FC UTM edited the resource \"SECV3104-01\".', '2025-01-22 18:59:20'),
(221, 82, 'FC UTM edited the resource \"SECV3104-01\".', '2025-01-22 19:02:51'),
(222, 82, 'FC UTM edited the resource \"SECV3104-01\".', '2025-01-22 19:05:53'),
(223, 82, 'FC UTM unshared the resource \"SECV3104-01\" with you.', '2025-01-22 19:05:53'),
(224, 82, 'FC UTM shared the resource \"SECV3104-01\" with you.', '2025-01-22 19:05:53'),
(225, 82, 'FC UTM edited the resource \"SECV3104-01\".', '2025-01-22 19:06:28'),
(226, 82, 'FC UTM unshared the resource \"SECV3104-01\" with you.', '2025-01-22 19:06:28'),
(227, 82, 'FC UTM shared the resource \"SECV3104-01\" with you.', '2025-01-22 19:06:28'),
(228, 81, 'FC UTM edited the resource \"SECV3104-01\".', '2025-01-22 19:55:37'),
(229, 81, 'FC UTM unshared the resource \"SECV3104-01\" with you.', '2025-01-22 19:55:37'),
(230, 81, 'FC UTM shared the resource \"SECV3104-01\" with you.', '2025-01-22 19:55:37'),
(231, 81, 'FC UTM edited the resource \"SECV3104-01\".', '2025-01-22 20:17:08'),
(232, 81, 'FC UTM edited the resource \"SECV3104-01\".', '2025-01-22 20:18:08'),
(233, 81, 'FC UTM unshared the resource \"SECV3104-01\" with you.', '2025-01-22 20:18:08'),
(234, 81, 'FC UTM shared the resource \"SECV3104-01\" with you.', '2025-01-22 20:18:08'),
(235, 82, 'FC UTM edited the resource \"SECV3104-01\".', '2025-01-22 20:18:48'),
(236, 82, 'FC UTM unshared the resource \"SECV3104-01\" with you.', '2025-01-22 20:18:48'),
(237, 82, 'FC UTM shared the resource \"SECV3104-01\" with you.', '2025-01-22 20:18:48'),
(238, 83, 'FC UTM edited the resource \"SECJ2154-07\".', '2025-01-22 20:19:09'),
(239, 83, 'FC UTM unshared the resource \"SECJ2154-07\" with you.', '2025-01-22 20:19:09'),
(240, 83, 'FC UTM shared the resource \"SECJ2154-07\" with you.', '2025-01-22 20:19:09'),
(241, 84, 'KUAN JI TONG shared the resource \"CC001\" with you.', '2025-01-22 20:20:54'),
(242, 85, 'KUAN JI TONG shared the resource \"CC002\" with you.', '2025-01-22 20:21:12'),
(243, 86, 'KUAN JI TONG shared the resource \"CC003\" with you.', '2025-01-22 20:21:35'),
(244, 87, 'KUAN JI TONG shared the resource \"CC004\" with you.', '2025-01-22 20:21:53'),
(245, 88, 'KUAN JI TONG shared the resource \"CC005\" with you.', '2025-01-22 20:22:09'),
(246, 89, 'KUAN JI TONG shared the resource \"CC006\" with you.', '2025-01-22 20:22:35'),
(247, 90, 'KUAN JI TONG shared the resource \"CC007\" with you.', '2025-01-22 20:22:53'),
(248, 91, 'KUAN JI TONG shared the resource \"CC007\" with you.', '2025-01-22 20:23:11'),
(249, 77, 'FC UTM edited the resource \"SECJ2013-03\".', '2025-01-23 04:15:32'),
(250, 77, 'FC UTM unshared the resource \"SECJ2013-03\" with you.', '2025-01-23 04:15:32'),
(251, 77, 'FC UTM shared the resource \"SECJ2013-03\" with you.', '2025-01-23 04:15:32'),
(252, NULL, 'KUAN JI TONG shared the resource \"Testing\" with you.', '2025-01-23 04:21:33'),
(253, NULL, 'KUAN JI TONG deleted the resource \"Testing\".', '2025-01-23 04:23:45'),
(254, NULL, 'KUAN JI TONG shared the resource \"ABCD\" with you.', '2025-01-23 04:24:06'),
(255, NULL, 'KUAN JI TONG shared the resource \"Testing\" with you.', '2025-01-23 04:25:45'),
(256, NULL, 'KUAN JI TONG deleted the resource \"Testing\".', '2025-01-23 04:28:59'),
(257, NULL, 'KUAN JI TONG deleted the resource \"ABCD\".', '2025-01-23 04:29:02'),
(258, 84, 'KUAN JI TONG edited the resource \"CC001\".', '2025-01-23 04:32:01'),
(259, 84, 'KUAN JI TONG unshared the resource \"CC001\" with you.', '2025-01-23 04:32:01'),
(260, 84, 'KUAN JI TONG shared the resource \"CC001\" with you.', '2025-01-23 04:32:01'),
(261, 84, 'KUAN JI TONG edited the resource \"CC001\".', '2025-01-23 04:32:16'),
(262, 84, 'KUAN JI TONG unshared the resource \"CC001\" with you.', '2025-01-23 04:32:16'),
(263, 84, 'KUAN JI TONG shared the resource \"CC001\" with you.', '2025-01-23 04:32:16'),
(264, 85, 'KUAN JI TONG edited the resource \"CC002\".', '2025-01-23 04:32:28'),
(265, 85, 'KUAN JI TONG unshared the resource \"CC002\" with you.', '2025-01-23 04:32:28'),
(266, 85, 'KUAN JI TONG shared the resource \"CC002\" with you.', '2025-01-23 04:32:28'),
(267, 85, 'KUAN JI TONG edited the resource \"CC002\".', '2025-01-23 04:32:34'),
(268, 85, 'KUAN JI TONG unshared the resource \"CC002\" with you.', '2025-01-23 04:32:34'),
(269, 85, 'KUAN JI TONG shared the resource \"CC002\" with you.', '2025-01-23 04:32:34'),
(270, 86, 'KUAN JI TONG edited the resource \"CC003\".', '2025-01-23 04:32:44'),
(271, 86, 'KUAN JI TONG unshared the resource \"CC003\" with you.', '2025-01-23 04:32:44'),
(272, 86, 'KUAN JI TONG shared the resource \"CC003\" with you.', '2025-01-23 04:32:44'),
(273, 86, 'KUAN JI TONG edited the resource \"CC003\".', '2025-01-23 04:33:37'),
(274, 86, 'KUAN JI TONG unshared the resource \"CC003\" with you.', '2025-01-23 04:33:37'),
(275, 86, 'KUAN JI TONG shared the resource \"CC003\" with you.', '2025-01-23 04:33:37'),
(276, 86, 'KUAN JI TONG edited the resource \"CC003\".', '2025-01-23 04:36:03'),
(277, 86, 'KUAN JI TONG unshared the resource \"CC003\" with you.', '2025-01-23 04:36:03'),
(278, 86, 'KUAN JI TONG shared the resource \"CC003\" with you.', '2025-01-23 04:36:03'),
(279, 86, 'KUAN JI TONG edited the resource \"CC003\".', '2025-01-23 04:37:58'),
(280, 86, 'KUAN JI TONG unshared the resource \"CC003\" with you.', '2025-01-23 04:37:58'),
(281, 86, 'KUAN JI TONG shared the resource \"CC003\" with you.', '2025-01-23 04:37:58'),
(282, 86, 'KUAN JI TONG edited the resource \"CC003\".', '2025-01-23 04:38:17'),
(283, 86, 'KUAN JI TONG unshared the resource \"CC003\" with you.', '2025-01-23 04:38:17'),
(284, 86, 'KUAN JI TONG shared the resource \"CC003\" with you.', '2025-01-23 04:38:17'),
(285, 86, 'KUAN JI TONG edited the resource \"CC003\".', '2025-01-23 04:45:04'),
(286, 86, 'KUAN JI TONG unshared the resource \"CC003\" with you.', '2025-01-23 04:45:04'),
(287, 86, 'KUAN JI TONG shared the resource \"CC003\" with you.', '2025-01-23 04:45:04'),
(288, 86, 'KUAN JI TONG edited the resource \"CC003\".', '2025-01-23 04:45:09'),
(289, 86, 'KUAN JI TONG unshared the resource \"CC003\" with you.', '2025-01-23 04:45:09'),
(290, 86, 'KUAN JI TONG shared the resource \"CC003\" with you.', '2025-01-23 04:45:09'),
(291, 86, 'KUAN JI TONG edited the resource \"CC003\".', '2025-01-23 04:46:07'),
(292, 86, 'KUAN JI TONG unshared the resource \"CC003\" with you.', '2025-01-23 04:46:07'),
(293, 86, 'KUAN JI TONG shared the resource \"CC003\" with you.', '2025-01-23 04:46:07'),
(294, 86, 'KUAN JI TONG edited the resource \"CC003\".', '2025-01-23 04:47:15'),
(295, 86, 'KUAN JI TONG unshared the resource \"CC003\" with you.', '2025-01-23 04:47:15'),
(296, 86, 'KUAN JI TONG shared the resource \"CC003\" with you.', '2025-01-23 04:47:15'),
(297, 87, 'KUAN JI TONG edited the resource \"CC004\".', '2025-01-23 04:47:31'),
(298, 87, 'KUAN JI TONG unshared the resource \"CC004\" with you.', '2025-01-23 04:47:31'),
(299, 87, 'KUAN JI TONG shared the resource \"CC004\" with you.', '2025-01-23 04:47:31'),
(300, 87, 'KUAN JI TONG edited the resource \"CC004\".', '2025-01-23 04:47:35'),
(301, 87, 'KUAN JI TONG unshared the resource \"CC004\" with you.', '2025-01-23 04:47:35'),
(302, 87, 'KUAN JI TONG shared the resource \"CC004\" with you.', '2025-01-23 04:47:35'),
(303, 88, 'KUAN JI TONG edited the resource \"CC005\".', '2025-01-23 04:48:01'),
(304, 88, 'KUAN JI TONG unshared the resource \"CC005\" with you.', '2025-01-23 04:48:01'),
(305, 88, 'KUAN JI TONG shared the resource \"CC005\" with you.', '2025-01-23 04:48:01'),
(306, 88, 'KUAN JI TONG edited the resource \"CC005\".', '2025-01-23 04:48:08'),
(307, 88, 'KUAN JI TONG unshared the resource \"CC005\" with you.', '2025-01-23 04:48:08'),
(308, 88, 'KUAN JI TONG shared the resource \"CC005\" with you.', '2025-01-23 04:48:08'),
(309, 89, 'KUAN JI TONG edited the resource \"CC006\".', '2025-01-23 04:48:29'),
(310, 89, 'KUAN JI TONG unshared the resource \"CC006\" with you.', '2025-01-23 04:48:29'),
(311, 89, 'KUAN JI TONG shared the resource \"CC006\" with you.', '2025-01-23 04:48:29'),
(312, 89, 'KUAN JI TONG edited the resource \"CC006\".', '2025-01-23 04:48:38'),
(313, 89, 'KUAN JI TONG unshared the resource \"CC006\" with you.', '2025-01-23 04:48:38'),
(314, 89, 'KUAN JI TONG shared the resource \"CC006\" with you.', '2025-01-23 04:48:38'),
(315, 90, 'KUAN JI TONG edited the resource \"CC007\".', '2025-01-23 04:48:47'),
(316, 90, 'KUAN JI TONG unshared the resource \"CC007\" with you.', '2025-01-23 04:48:47'),
(317, 90, 'KUAN JI TONG shared the resource \"CC007\" with you.', '2025-01-23 04:48:47'),
(318, 90, 'KUAN JI TONG edited the resource \"CC007\".', '2025-01-23 04:48:53'),
(319, 90, 'KUAN JI TONG unshared the resource \"CC007\" with you.', '2025-01-23 04:48:53'),
(320, 90, 'KUAN JI TONG shared the resource \"CC007\" with you.', '2025-01-23 04:48:53'),
(321, 90, 'KUAN JI TONG edited the resource \"CC007\".', '2025-01-23 04:49:04'),
(322, 90, 'KUAN JI TONG unshared the resource \"CC007\" with you.', '2025-01-23 04:49:04'),
(323, 90, 'KUAN JI TONG shared the resource \"CC007\" with you.', '2025-01-23 04:49:04'),
(324, 90, 'KUAN JI TONG edited the resource \"CC007\".', '2025-01-23 04:49:12'),
(325, 90, 'KUAN JI TONG unshared the resource \"CC007\" with you.', '2025-01-23 04:49:12'),
(326, 90, 'KUAN JI TONG shared the resource \"CC007\" with you.', '2025-01-23 04:49:12'),
(327, 91, 'KUAN JI TONG edited the resource \"CC008\".', '2025-01-23 04:49:23'),
(328, 91, 'KUAN JI TONG unshared the resource \"CC008\" with you.', '2025-01-23 04:49:23'),
(329, 91, 'KUAN JI TONG shared the resource \"CC008\" with you.', '2025-01-23 04:49:23'),
(330, 91, 'KUAN JI TONG edited the resource \"CC008\".', '2025-01-23 04:49:27'),
(331, 91, 'KUAN JI TONG unshared the resource \"CC008\" with you.', '2025-01-23 04:49:27'),
(332, 91, 'KUAN JI TONG shared the resource \"CC008\" with you.', '2025-01-23 04:49:27');

-- --------------------------------------------------------

--
-- Table structure for table `resources`
--

CREATE TABLE `resources` (
  `resource_id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `ref_name` varchar(50) DEFAULT NULL,
  `sessem` varchar(15) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `sharer_id` varchar(10) NOT NULL,
  `shared_at` datetime DEFAULT current_timestamp(),
  `latest_access_time` timestamp NULL DEFAULT NULL,
  `share_to` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `resources`
--

INSERT INTO `resources` (`resource_id`, `category_id`, `ref_name`, `sessem`, `description`, `link`, `sharer_id`, `shared_at`, `latest_access_time`, `share_to`) VALUES
(77, 1, 'SECJ2013-03', '2024/2025-1', 'Course files submission for DSA Course Section 03', 'https://drive.google.com/drive/folders/', 'FC001', '2025-01-23 12:15:32', '2025-01-23 04:15:33', 'lecturers'),
(78, 1, 'SECJ2013-09', '2024/2025-1', 'Course files submission for DSA Course Section 09', 'https://drive.google.com/drive/folders/', 'FC001', '2025-01-23 02:25:09', '2025-01-22 20:19:47', 'specific users'),
(79, 1, 'SECR3104-03', '2024/2025-1', 'Course files submission for AD Course (R) Section 03', 'https://drive.google.com/drive/folders/', 'FC001', '2025-01-23 02:25:37', '2025-01-22 20:19:30', 'specific users'),
(80, 1, 'SECJ3104-01', '2024/2025-1', 'Course files submission for AD Course (J) Section 01', 'https://drive.google.com/drive/folders/', 'FC001', '2025-01-23 02:26:34', '2025-01-23 04:15:19', 'specific users'),
(81, 1, 'SECV3104-01', '2024/2025-1', 'Course files submission for AD Course (V) Section 01', 'https://drive.google.com/drive/folders/', 'FC001', '2025-01-23 04:18:08', '2025-01-22 20:18:30', 'specific users'),
(82, 1, 'SECV3104-01', '2024/2025-1', 'Course files submission for AD Course (V) Section 01', 'https://drive.google.com/drive/folders/', 'FC001', '2025-01-23 04:18:48', '2025-01-22 20:18:48', 'specific users'),
(83, 1, 'SECJ2154-07', '2024/2025-1', 'Course files submission for OOP Course Section 07', 'https://drive.google.com/drive/folders/', 'FC001', '2025-01-23 04:19:09', '2025-01-23 04:15:22', 'specific users'),
(84, 8, 'CC001', '2024/2025-1', 'Coding Competition 1', 'https://drive.google.com/drive/folders/', 'A22EC0062', '2025-01-23 12:32:16', '2025-01-23 04:32:16', 'all'),
(85, 8, 'CC002', '2024/2025-1', 'Coding Competition 2', 'https://drive.google.com/drive/folders/', 'A22EC0062', '2025-01-23 12:32:34', '2025-01-23 04:32:34', 'all'),
(86, 8, 'CC003', '2024/2025-1', 'Coding Competition 3', 'https://drive.google.com/drive/folders/', 'A22EC0062', '2025-01-23 12:47:15', '2025-01-23 04:47:15', 'all'),
(87, 8, 'CC004', '2024/2025-1', 'Coding Competition 4', 'https://drive.google.com/drive/folders/', 'A22EC0062', '2025-01-23 12:47:35', '2025-01-23 04:47:35', 'all'),
(88, 8, 'CC005', '2024/2025-1', 'Coding Competition 5', 'https://drive.google.com/drive/folders/', 'A22EC0062', '2025-01-23 12:48:08', '2025-01-23 04:48:08', 'all'),
(89, 8, 'CC006', '2024/2025-1', 'Coding Competition 6', 'https://drive.google.com/drive/folders/', 'A22EC0062', '2025-01-23 12:48:38', '2025-01-23 04:48:38', 'all'),
(90, 8, 'CC007', '2024/2025-1', 'Coding Competition 7', 'https://drive.google.com/drive/folders/', 'A22EC0062', '2025-01-23 12:49:12', '2025-01-23 04:49:12', 'all'),
(91, 8, 'CC008', '2024/2025-1', 'Coding Competition 8', 'https://drive.google.com/drive/folders/', 'A22EC0062', '2025-01-23 12:49:27', '2025-01-23 04:49:27', 'all');

-- --------------------------------------------------------

--
-- Table structure for table `sharing`
--

CREATE TABLE `sharing` (
  `receiver_email` varchar(255) NOT NULL,
  `resource_id` int(11) NOT NULL,
  `latest_access_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `sharing`
--

INSERT INTO `sharing` (`receiver_email`, `resource_id`, `latest_access_time`) VALUES
('academicoffice@fc.utm.my', 86, NULL),
('academicoffice@fc.utm.my', 87, NULL),
('academicoffice@fc.utm.my', 88, NULL),
('academicoffice@fc.utm.my', 89, NULL),
('academicoffice@fc.utm.my', 90, NULL),
('academicoffice@fc.utm.my', 91, NULL),
('kewheng@graduate.utm.my ', 86, NULL),
('kewheng@graduate.utm.my ', 87, NULL),
('kewheng@graduate.utm.my ', 88, NULL),
('kewheng@graduate.utm.my ', 89, NULL),
('kewheng@graduate.utm.my ', 90, NULL),
('kewheng@graduate.utm.my ', 91, NULL),
('kwekcong@graduate.utm.my ', 86, NULL),
('kwekcong@graduate.utm.my ', 87, NULL),
('kwekcong@graduate.utm.my ', 88, NULL),
('kwekcong@graduate.utm.my ', 89, NULL),
('kwekcong@graduate.utm.my ', 90, NULL),
('kwekcong@graduate.utm.my ', 91, NULL),
('leowhong@graduate.utm.my ', 86, NULL),
('leowhong@graduate.utm.my ', 87, NULL),
('leowhong@graduate.utm.my ', 88, NULL),
('leowhong@graduate.utm.my ', 89, NULL),
('leowhong@graduate.utm.my ', 90, NULL),
('leowhong@graduate.utm.my ', 91, NULL),
('msmd2@live.utm.my', 86, NULL),
('msmd2@live.utm.my', 87, NULL),
('msmd2@live.utm.my', 88, NULL),
('msmd2@live.utm.my', 89, NULL),
('msmd2@live.utm.my', 90, NULL),
('msmd2@live.utm.my', 91, NULL),
('tonianwar@utm.my', 77, '2025-01-23 04:16:06'),
('tonianwar@utm.my', 78, '2025-01-23 04:16:04'),
('tonianwar@utm.my', 79, '2025-01-22 19:56:48'),
('tonianwar@utm.my', 80, '2025-01-22 20:08:07'),
('tonianwar@utm.my', 81, NULL),
('tonianwar@utm.my', 82, NULL),
('tonianwar@utm.my', 83, NULL),
('tonianwar@utm.my', 86, NULL),
('tonianwar@utm.my', 87, NULL),
('tonianwar@utm.my', 88, NULL),
('tonianwar@utm.my', 89, NULL),
('tonianwar@utm.my', 90, NULL),
('tonianwar@utm.my', 91, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(10) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(20) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `name` varchar(50) NOT NULL,
  `is_pass_changed` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `password`, `email`, `role`, `picture`, `created_at`, `name`, `is_pass_changed`) VALUES
('12085', NULL, 'tonianwar@utm.my', 'Pensyarah', NULL, '2025-01-23 04:15:59', 'TONI ANWAR', 0),
('A16CS4016', NULL, 'msmd2@live.utm.my', 'Pelajar FSKSM', NULL, '2025-01-19 05:58:19', 'MD MIRZA SHIHAB', 0),
('A22EC0058', NULL, 'kewheng@graduate.utm.my ', 'Pelajar FSKSM', NULL, '2024-12-15 23:29:09', 'KEW JIAN HENG', 0),
('A22EC0062', '$2b$10$wQ81gfKLY5SySfvIoCpuZ.zjT4EqyzbSAyl16FiZBd58iepbgi1oi', 'kuantong@graduate.utm.my ', 'Pelajar FSKSM', '1737033268038-profile-pic-A22EC0062.png', '2024-12-17 07:44:41', 'KUAN JI TONG', 1),
('A22EC0067', '$2b$10$S3L2deiZ.kYkggF9W/gVc.rN2q.lXIXdBfFtLYgeMqepV.jgBPzFa', 'leowhong@graduate.utm.my ', 'Pelajar FSKSM', NULL, '2024-12-20 01:41:06', 'LEOW YAN HONG', 1),
('A22EC0122', NULL, 'kwekcong@graduate.utm.my ', 'Pelajar FSKSM', NULL, '2024-12-15 23:24:23', 'KWEK JIA CONG', 0),
('ADMIN', '$2b$10$DeXV14ZI/7DZwzbyXVVm1.6iOG8DEmKsGTjgUnfpjqSs4tbspLB3O', 'admin@gmail.com', 'Admin', '1737032662575-profile-pic-ADMIN.png', '2025-01-02 05:58:12', 'Admin', 1),
('FC001', '$2b$10$wQ81gfKLY5SySfvIoCpuZ.zjT4EqyzbSAyl16FiZBd58iepbgi1oi', 'academicoffice@fc.utm.my', 'Academic Office', NULL, '2025-01-22 18:18:04', 'FC UTM', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_log`
--

CREATE TABLE `user_log` (
  `log_id` int(11) NOT NULL,
  `user_id` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT '',
  `action` text NOT NULL,
  `action_time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `user_log`
--

INSERT INTO `user_log` (`log_id`, `user_id`, `action`, `action_time`) VALUES
(258, 'FC001', 'FC UTM logged out from the system', '2025-01-23 02:23:32'),
(259, 'FC001', 'FC UTM logged into the system', '2025-01-23 02:23:41'),
(260, 'FC001', 'FC UTM shared the resource \"SECJ2013-03\".', '2025-01-23 02:24:38'),
(261, 'FC001', 'FC UTM shared the resource \"SECJ2013-09\".', '2025-01-23 02:25:09'),
(262, 'FC001', 'FC UTM shared the resource \"SECR3104-03\".', '2025-01-23 02:25:37'),
(263, 'FC001', 'FC UTM shared the resource \"SECJ3104-01\".', '2025-01-23 02:26:34'),
(264, 'FC001', 'FC UTM shared the resource \"SECV3104-01\".', '2025-01-23 02:27:24'),
(265, 'FC001', 'FC UTM shared the resource \"SECV3104-01\".', '2025-01-23 02:29:16'),
(266, 'FC001', 'FC UTM shared the resource \"SECJ2154-07\".', '2025-01-23 02:32:16'),
(267, 'FC001', 'FC UTM edited the resource \"SECJ2154-07\".', '2025-01-23 02:38:46'),
(268, 'FC001', 'FC UTM edited the resource \"SECV3104-01\".', '2025-01-23 02:45:31'),
(269, 'FC001', 'FC UTM edited the resource \"SECV3104-01\".', '2025-01-23 02:47:13'),
(270, 'FC001', 'FC UTM edited the resource \"SECV3104-01\".', '2025-01-23 02:50:36'),
(271, 'FC001', 'FC UTM edited the resource \"SECV3104-01\".', '2025-01-23 02:52:09'),
(272, 'FC001', 'FC UTM edited the resource \"SECV3104-01\".', '2025-01-23 02:55:09'),
(273, 'FC001', 'FC UTM edited the resource \"SECV3104-01\".', '2025-01-23 02:59:20'),
(274, 'FC001', 'FC UTM edited the resource \"SECV3104-01\".', '2025-01-23 03:02:51'),
(275, 'FC001', 'FC UTM edited the resource \"SECV3104-01\".', '2025-01-23 03:05:53'),
(276, 'FC001', 'FC UTM edited the resource \"SECV3104-01\".', '2025-01-23 03:06:28'),
(277, 'FC001', 'FC UTM logged out from the system', '2025-01-23 03:50:39'),
(280, 'FC001', 'FC UTM logged into the system', '2025-01-23 03:55:27'),
(281, 'FC001', 'FC UTM edited the resource \"SECV3104-01\".', '2025-01-23 03:55:37'),
(282, 'FC001', 'FC UTM logged out from the system', '2025-01-23 03:56:20'),
(285, 'FC001', 'FC UTM logged into the system', '2025-01-23 03:57:13'),
(286, 'FC001', 'FC UTM logged out from the system', '2025-01-23 03:58:37'),
(289, 'FC001', 'FC UTM logged into the system', '2025-01-23 04:17:00'),
(290, 'FC001', 'FC UTM edited the resource \"SECV3104-01\".', '2025-01-23 04:17:08'),
(291, 'FC001', 'FC UTM logged out from the system', '2025-01-23 04:17:12'),
(294, 'FC001', 'FC UTM logged into the system', '2025-01-23 04:17:48'),
(295, 'FC001', 'FC UTM edited the resource \"SECV3104-01\".', '2025-01-23 04:18:08'),
(296, 'FC001', 'FC UTM logged out from the system', '2025-01-23 04:18:14'),
(297, 'FC001', 'FC UTM logged into the system', '2025-01-23 04:18:23'),
(298, 'FC001', 'FC UTM edited the resource \"SECV3104-01\".', '2025-01-23 04:18:48'),
(299, 'FC001', 'FC UTM edited the resource \"SECJ2154-07\".', '2025-01-23 04:19:09'),
(300, 'FC001', 'FC UTM logged out from the system', '2025-01-23 04:19:56'),
(301, 'A22EC0062', 'KUAN JI TONG logged into the system', '2025-01-23 04:20:01'),
(302, 'A22EC0062', 'KUAN JI TONG shared the resource \"CC001\".', '2025-01-23 04:20:54'),
(303, 'A22EC0062', 'KUAN JI TONG shared the resource \"CC002\".', '2025-01-23 04:21:12'),
(304, 'A22EC0062', 'KUAN JI TONG shared the resource \"CC003\".', '2025-01-23 04:21:35'),
(305, 'A22EC0062', 'KUAN JI TONG shared the resource \"CC004\".', '2025-01-23 04:21:53'),
(306, 'A22EC0062', 'KUAN JI TONG shared the resource \"CC005\".', '2025-01-23 04:22:09'),
(307, 'A22EC0062', 'KUAN JI TONG shared the resource \"CC006\".', '2025-01-23 04:22:35'),
(308, 'A22EC0062', 'KUAN JI TONG shared the resource \"CC007\".', '2025-01-23 04:22:53'),
(309, 'A22EC0062', 'KUAN JI TONG shared the resource \"CC007\".', '2025-01-23 04:23:11'),
(310, 'A22EC0062', 'KUAN JI TONG logged out from the system', '2025-01-23 04:26:34'),
(314, 'A22EC0062', 'KUAN JI TONG logged into the system', '2025-01-23 12:08:42'),
(315, 'A22EC0062', 'KUAN JI TONG logged out from the system', '2025-01-23 12:09:15'),
(316, 'FC001', 'FC UTM logged into the system', '2025-01-23 12:09:26'),
(317, 'FC001', 'FC UTM edited the resource \"SECJ2013-03\".', '2025-01-23 12:15:32'),
(318, 'FC001', 'FC UTM logged out from the system', '2025-01-23 12:15:51'),
(319, '12085', 'TONI ANWAR registered to the system', '2025-01-23 12:15:59'),
(320, '12085', 'TONI ANWAR logged out from the system', '2025-01-23 12:16:29'),
(321, 'A22EC0062', 'KUAN JI TONG logged into the system', '2025-01-23 12:19:10'),
(322, 'A22EC0062', 'KUAN JI TONG shared the resource \"Testing\".', '2025-01-23 12:21:33'),
(323, 'A22EC0062', 'KUAN JI TONG deleted the resource \"Testing\".', '2025-01-23 12:23:45'),
(324, 'A22EC0062', 'KUAN JI TONG shared the resource \"ABCD\".', '2025-01-23 12:24:06'),
(325, 'A22EC0062', 'KUAN JI TONG shared the resource \"Testing\".', '2025-01-23 12:25:45'),
(326, 'A22EC0062', 'KUAN JI TONG deleted the resource \"Testing\".', '2025-01-23 12:28:59'),
(327, 'A22EC0062', 'KUAN JI TONG deleted the resource \"ABCD\".', '2025-01-23 12:29:02'),
(328, 'A22EC0062', 'KUAN JI TONG logged out from the system', '2025-01-23 12:29:05'),
(329, 'FC001', 'FC UTM logged into the system', '2025-01-23 12:29:09'),
(330, 'FC001', 'FC UTM logged out from the system', '2025-01-23 12:30:46'),
(331, 'A22EC0062', 'KUAN JI TONG logged into the system', '2025-01-23 12:30:50'),
(332, 'A22EC0062', 'KUAN JI TONG logged out from the system', '2025-01-23 12:31:03'),
(333, 'A22ec0067', 'LEOW YAN HONG logged into the system', '2025-01-23 12:31:08'),
(334, 'A22EC0067', 'LEOW YAN HONG logged out from the system', '2025-01-23 12:31:43'),
(335, 'A22EC0062', 'KUAN JI TONG logged into the system', '2025-01-23 12:31:47'),
(336, 'A22EC0062', 'KUAN JI TONG edited the resource \"CC001\".', '2025-01-23 12:32:01'),
(337, 'A22EC0062', 'KUAN JI TONG edited the resource \"CC001\".', '2025-01-23 12:32:16'),
(338, 'A22EC0062', 'KUAN JI TONG edited the resource \"CC002\".', '2025-01-23 12:32:28'),
(339, 'A22EC0062', 'KUAN JI TONG edited the resource \"CC002\".', '2025-01-23 12:32:34'),
(340, 'A22EC0062', 'KUAN JI TONG edited the resource \"CC003\".', '2025-01-23 12:32:44'),
(341, 'A22EC0062', 'KUAN JI TONG edited the resource \"CC003\".', '2025-01-23 12:33:37'),
(342, 'A22EC0062', 'KUAN JI TONG edited the resource \"CC003\".', '2025-01-23 12:36:03'),
(343, 'A22EC0062', 'KUAN JI TONG edited the resource \"CC003\".', '2025-01-23 12:37:58'),
(344, 'A22EC0062', 'KUAN JI TONG edited the resource \"CC003\".', '2025-01-23 12:38:17'),
(345, 'A22EC0062', 'KUAN JI TONG edited the resource \"CC003\".', '2025-01-23 12:45:04'),
(346, 'A22EC0062', 'KUAN JI TONG edited the resource \"CC003\".', '2025-01-23 12:45:09'),
(347, 'A22EC0062', 'KUAN JI TONG edited the resource \"CC003\".', '2025-01-23 12:46:07'),
(348, 'A22EC0062', 'KUAN JI TONG edited the resource \"CC003\".', '2025-01-23 12:47:15'),
(349, 'A22EC0062', 'KUAN JI TONG edited the resource \"CC004\".', '2025-01-23 12:47:31'),
(350, 'A22EC0062', 'KUAN JI TONG edited the resource \"CC004\".', '2025-01-23 12:47:35'),
(351, 'A22EC0062', 'KUAN JI TONG edited the resource \"CC005\".', '2025-01-23 12:48:01'),
(352, 'A22EC0062', 'KUAN JI TONG edited the resource \"CC005\".', '2025-01-23 12:48:08'),
(353, 'A22EC0062', 'KUAN JI TONG edited the resource \"CC006\".', '2025-01-23 12:48:29'),
(354, 'A22EC0062', 'KUAN JI TONG edited the resource \"CC006\".', '2025-01-23 12:48:38'),
(355, 'A22EC0062', 'KUAN JI TONG edited the resource \"CC007\".', '2025-01-23 12:48:47'),
(356, 'A22EC0062', 'KUAN JI TONG edited the resource \"CC007\".', '2025-01-23 12:48:53'),
(357, 'A22EC0062', 'KUAN JI TONG edited the resource \"CC007\".', '2025-01-23 12:49:04'),
(358, 'A22EC0062', 'KUAN JI TONG edited the resource \"CC007\".', '2025-01-23 12:49:12'),
(359, 'A22EC0062', 'KUAN JI TONG edited the resource \"CC008\".', '2025-01-23 12:49:23'),
(360, 'A22EC0062', 'KUAN JI TONG edited the resource \"CC008\".', '2025-01-23 12:49:27');

-- --------------------------------------------------------

--
-- Table structure for table `user_notification`
--

CREATE TABLE `user_notification` (
  `user_email` varchar(255) NOT NULL,
  `notification_id` int(11) NOT NULL,
  `read_status` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `user_notification`
--

INSERT INTO `user_notification` (`user_email`, `notification_id`, `read_status`) VALUES
('academicoffice@fc.utm.my', 281, 0),
('academicoffice@fc.utm.my', 282, 0),
('academicoffice@fc.utm.my', 283, 0),
('academicoffice@fc.utm.my', 287, 0),
('academicoffice@fc.utm.my', 288, 0),
('academicoffice@fc.utm.my', 289, 0),
('academicoffice@fc.utm.my', 296, 0),
('academicoffice@fc.utm.my', 302, 0),
('academicoffice@fc.utm.my', 308, 0),
('academicoffice@fc.utm.my', 314, 0),
('academicoffice@fc.utm.my', 320, 0),
('academicoffice@fc.utm.my', 321, 0),
('academicoffice@fc.utm.my', 322, 0),
('academicoffice@fc.utm.my', 326, 0),
('academicoffice@fc.utm.my', 332, 0),
('admin@gmail.com', 241, 0),
('admin@gmail.com', 242, 0),
('admin@gmail.com', 243, 0),
('admin@gmail.com', 244, 0),
('admin@gmail.com', 245, 0),
('admin@gmail.com', 246, 0),
('admin@gmail.com', 247, 0),
('admin@gmail.com', 248, 0),
('admin@gmail.com', 263, 0),
('admin@gmail.com', 269, 0),
('admin@gmail.com', 275, 0),
('admin@gmail.com', 276, 0),
('admin@gmail.com', 277, 0),
('kewheng@graduate.utm.my ', 214, 0),
('kewheng@graduate.utm.my ', 238, 0),
('kewheng@graduate.utm.my ', 239, 0),
('kewheng@graduate.utm.my ', 260, 0),
('kewheng@graduate.utm.my ', 261, 0),
('kewheng@graduate.utm.my ', 262, 0),
('kewheng@graduate.utm.my ', 266, 0),
('kewheng@graduate.utm.my ', 267, 0),
('kewheng@graduate.utm.my ', 268, 0),
('kewheng@graduate.utm.my ', 281, 0),
('kewheng@graduate.utm.my ', 282, 0),
('kewheng@graduate.utm.my ', 283, 0),
('kewheng@graduate.utm.my ', 287, 0),
('kewheng@graduate.utm.my ', 288, 0),
('kewheng@graduate.utm.my ', 289, 0),
('kewheng@graduate.utm.my ', 296, 0),
('kewheng@graduate.utm.my ', 302, 0),
('kewheng@graduate.utm.my ', 308, 0),
('kewheng@graduate.utm.my ', 314, 0),
('kewheng@graduate.utm.my ', 320, 0),
('kewheng@graduate.utm.my ', 321, 0),
('kewheng@graduate.utm.my ', 322, 0),
('kewheng@graduate.utm.my ', 326, 0),
('kewheng@graduate.utm.my ', 332, 0),
('kuanjitong99@gmail.com', 224, 0),
('kuanjitong99@gmail.com', 225, 0),
('kuanjitong99@gmail.com', 226, 0),
('kuantong@graduate.utm.my ', 214, 0),
('kuantong@graduate.utm.my', 227, 0),
('kuantong@graduate.utm.my', 235, 0),
('kuantong@graduate.utm.my', 236, 0),
('kwekcong@graduate.utm.my ', 214, 0),
('kwekcong@graduate.utm.my ', 238, 0),
('kwekcong@graduate.utm.my ', 239, 0),
('kwekcong@graduate.utm.my ', 260, 0),
('kwekcong@graduate.utm.my ', 261, 0),
('kwekcong@graduate.utm.my ', 262, 0),
('kwekcong@graduate.utm.my ', 266, 0),
('kwekcong@graduate.utm.my ', 267, 0),
('kwekcong@graduate.utm.my ', 268, 0),
('kwekcong@graduate.utm.my ', 281, 0),
('kwekcong@graduate.utm.my ', 282, 0),
('kwekcong@graduate.utm.my ', 283, 0),
('kwekcong@graduate.utm.my ', 287, 0),
('kwekcong@graduate.utm.my ', 288, 0),
('kwekcong@graduate.utm.my ', 289, 0),
('kwekcong@graduate.utm.my', 293, 0),
('kwekcong@graduate.utm.my', 294, 0),
('kwekcong@graduate.utm.my', 295, 0),
('kwekcong@graduate.utm.my ', 296, 0),
('kwekcong@graduate.utm.my ', 302, 0),
('kwekcong@graduate.utm.my ', 308, 0),
('kwekcong@graduate.utm.my ', 314, 0),
('kwekcong@graduate.utm.my ', 320, 0),
('kwekcong@graduate.utm.my ', 321, 0),
('kwekcong@graduate.utm.my ', 322, 0),
('kwekcong@graduate.utm.my ', 326, 0),
('kwekcong@graduate.utm.my ', 332, 0),
('leowhong@graduate.utm.my ', 214, 0),
('leowhong@graduate.utm.my ', 238, 0),
('leowhong@graduate.utm.my ', 239, 0),
('leowhong@graduate.utm.my ', 260, 0),
('leowhong@graduate.utm.my ', 261, 0),
('leowhong@graduate.utm.my ', 262, 0),
('leowhong@graduate.utm.my ', 266, 0),
('leowhong@graduate.utm.my ', 267, 0),
('leowhong@graduate.utm.my ', 268, 0),
('leowhong@graduate.utm.my ', 281, 0),
('leowhong@graduate.utm.my ', 282, 0),
('leowhong@graduate.utm.my ', 283, 0),
('leowhong@graduate.utm.my ', 287, 0),
('leowhong@graduate.utm.my ', 288, 0),
('leowhong@graduate.utm.my ', 289, 0),
('leowhong@graduate.utm.my ', 296, 0),
('leowhong@graduate.utm.my ', 302, 0),
('leowhong@graduate.utm.my ', 308, 0),
('leowhong@graduate.utm.my ', 314, 0),
('leowhong@graduate.utm.my ', 320, 0),
('leowhong@graduate.utm.my ', 321, 0),
('leowhong@graduate.utm.my ', 322, 0),
('leowhong@graduate.utm.my ', 326, 0),
('leowhong@graduate.utm.my ', 332, 0),
('msmd2@live.utm.my', 214, 0),
('msmd2@live.utm.my', 238, 0),
('msmd2@live.utm.my', 239, 0),
('msmd2@live.utm.my', 260, 0),
('msmd2@live.utm.my', 261, 0),
('msmd2@live.utm.my', 262, 0),
('msmd2@live.utm.my', 266, 0),
('msmd2@live.utm.my', 267, 0),
('msmd2@live.utm.my', 268, 0),
('msmd2@live.utm.my', 281, 0),
('msmd2@live.utm.my', 282, 0),
('msmd2@live.utm.my', 283, 0),
('msmd2@live.utm.my', 287, 0),
('msmd2@live.utm.my', 288, 0),
('msmd2@live.utm.my', 289, 0),
('msmd2@live.utm.my', 296, 0),
('msmd2@live.utm.my', 302, 0),
('msmd2@live.utm.my', 308, 0),
('msmd2@live.utm.my', 314, 0),
('msmd2@live.utm.my', 320, 0),
('msmd2@live.utm.my', 321, 0),
('msmd2@live.utm.my', 322, 0),
('msmd2@live.utm.my', 326, 0),
('msmd2@live.utm.my', 332, 0),
('tonianwar@utm.my', 205, 0),
('tonianwar@utm.my', 206, 0),
('tonianwar@utm.my', 207, 0),
('tonianwar@utm.my', 208, 0),
('tonianwar@utm.my', 209, 0),
('tonianwar@utm.my', 210, 0),
('tonianwar@utm.my', 211, 0),
('tonianwar@utm.my', 212, 0),
('tonianwar@utm.my', 213, 0),
('tonianwar@utm.my', 215, 0),
('tonianwar@utm.my', 216, 0),
('tonianwar@utm.my', 217, 0),
('tonianwar@utm.my', 218, 0),
('tonianwar@utm.my', 219, 0),
('tonianwar@utm.my', 220, 0),
('tonianwar@utm.my', 221, 0),
('tonianwar@utm.my', 222, 0),
('tonianwar@utm.my', 223, 0),
('tonianwar@utm.my', 228, 0),
('tonianwar@utm.my', 229, 0),
('tonianwar@utm.my', 234, 0),
('tonianwar@utm.my', 237, 0),
('tonianwar@utm.my', 240, 0),
('tonianwar@utm.my', 251, 0),
('tonianwar@utm.my', 281, 0),
('tonianwar@utm.my', 282, 0),
('tonianwar@utm.my', 283, 0),
('tonianwar@utm.my', 287, 0),
('tonianwar@utm.my', 288, 0),
('tonianwar@utm.my', 289, 0),
('tonianwar@utm.my', 296, 0),
('tonianwar@utm.my', 302, 0),
('tonianwar@utm.my', 308, 0),
('tonianwar@utm.my', 314, 0),
('tonianwar@utm.my', 320, 0),
('tonianwar@utm.my', 321, 0),
('tonianwar@utm.my', 322, 0),
('tonianwar@utm.my', 326, 0),
('tonianwar@utm.my', 332, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `unique_category_name` (`category_name`);

--
-- Indexes for table `favourite_resources`
--
ALTER TABLE `favourite_resources`
  ADD PRIMARY KEY (`user_id`,`resource_id`),
  ADD KEY `resource_id` (`resource_id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`group_id`),
  ADD KEY `creator` (`creator`);

--
-- Indexes for table `group_members`
--
ALTER TABLE `group_members`
  ADD PRIMARY KEY (`group_member_id`),
  ADD UNIQUE KEY `group_id` (`group_id`,`member_email`),
  ADD KEY `member_id` (`member_email`);

--
-- Indexes for table `group_sharing`
--
ALTER TABLE `group_sharing`
  ADD PRIMARY KEY (`group_id`,`resource_id`),
  ADD KEY `group_sharing_ibfk_2` (`resource_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `FK_RESOURCE` (`resource_id`);

--
-- Indexes for table `resources`
--
ALTER TABLE `resources`
  ADD PRIMARY KEY (`resource_id`),
  ADD KEY `fk_category_id` (`category_id`),
  ADD KEY `fk_sharer_id` (`sharer_id`);
ALTER TABLE `resources` ADD FULLTEXT KEY `ref_name_2` (`ref_name`,`description`);

--
-- Indexes for table `sharing`
--
ALTER TABLE `sharing`
  ADD PRIMARY KEY (`receiver_email`,`resource_id`),
  ADD KEY `fk_resource_id` (`resource_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_log`
--
ALTER TABLE `user_log`
  ADD PRIMARY KEY (`log_id`),
  ADD KEY `FK_user_action_log_users` (`user_id`);

--
-- Indexes for table `user_notification`
--
ALTER TABLE `user_notification`
  ADD PRIMARY KEY (`user_email`,`notification_id`),
  ADD KEY `FK_notification_id` (`notification_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `group_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=485;

--
-- AUTO_INCREMENT for table `group_members`
--
ALTER TABLE `group_members`
  MODIFY `group_member_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=333;

--
-- AUTO_INCREMENT for table `resources`
--
ALTER TABLE `resources`
  MODIFY `resource_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT for table `user_log`
--
ALTER TABLE `user_log`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=361;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `favourite_resources`
--
ALTER TABLE `favourite_resources`
  ADD CONSTRAINT `favourite_resources_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `favourite_resources_ibfk_2` FOREIGN KEY (`resource_id`) REFERENCES `resources` (`resource_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `groups`
--
ALTER TABLE `groups`
  ADD CONSTRAINT `groups_ibfk_1` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `group_members`
--
ALTER TABLE `group_members`
  ADD CONSTRAINT `group_members_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `group_sharing`
--
ALTER TABLE `group_sharing`
  ADD CONSTRAINT `group_sharing_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `group_sharing_ibfk_2` FOREIGN KEY (`resource_id`) REFERENCES `resources` (`resource_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `FK_RESOURCE` FOREIGN KEY (`resource_id`) REFERENCES `resources` (`resource_id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `resources`
--
ALTER TABLE `resources`
  ADD CONSTRAINT `fk_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_sharer_id` FOREIGN KEY (`sharer_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `sharing`
--
ALTER TABLE `sharing`
  ADD CONSTRAINT `fk_resource_id` FOREIGN KEY (`resource_id`) REFERENCES `resources` (`resource_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_log`
--
ALTER TABLE `user_log`
  ADD CONSTRAINT `FK_user_action_log_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_notification`
--
ALTER TABLE `user_notification`
  ADD CONSTRAINT `FK_notification_id` FOREIGN KEY (`notification_id`) REFERENCES `notifications` (`notification_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
