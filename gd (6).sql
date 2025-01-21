-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 21, 2025 at 09:37 AM
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
(1, 'Course Files', '#008000', 'staff'),
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
(476, 'ip-s06', 'A22EC0062', '2025-01-20 17:54:24');

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
(148, 60, 'TONI ANWAR shared the resource \"Testing\" .', '2025-01-21 08:33:12');

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
  `owner` varchar(100) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `sharer_id` varchar(10) NOT NULL,
  `shared_at` datetime DEFAULT current_timestamp(),
  `latest_access_time` timestamp NULL DEFAULT NULL,
  `share_to` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `resources`
--

INSERT INTO `resources` (`resource_id`, `category_id`, `ref_name`, `sessem`, `description`, `owner`, `link`, `sharer_id`, `shared_at`, `latest_access_time`, `share_to`) VALUES
(60, 2, 'Testing', '2024/2025-1', 'Testing', 'Ali', 'https://drive.google.com/drive/folders/???', '12085', '2025-01-21 16:33:12', NULL, 'all');

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
('admin@gmail.com', 60, NULL),
('kewheng@graduate.utm.my ', 60, NULL),
('kuantong@graduate.utm.my ', 60, NULL),
('kwekcong@graduate.utm.my ', 60, NULL),
('leowhong@graduate.utm.my ', 60, NULL),
('msmd2@live.utm.my', 60, NULL);

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
('12085', NULL, 'tonianwar@utm.my', 'Pensyarah', NULL, '2025-01-21 08:26:12', 'TONI ANWAR', 0),
('A16CS4016', NULL, 'msmd2@live.utm.my', 'Pelajar FSKSM', NULL, '2025-01-19 05:58:19', 'MD MIRZA SHIHAB', 0),
('A22EC0058', NULL, 'kewheng@graduate.utm.my ', 'Pelajar FSKSM', NULL, '2024-12-15 23:29:09', 'KEW JIAN HENG', 0),
('A22EC0062', '$2b$10$wQ81gfKLY5SySfvIoCpuZ.zjT4EqyzbSAyl16FiZBd58iepbgi1oi', 'kuantong@graduate.utm.my ', 'Pelajar FSKSM', '1737033268038-profile-pic-A22EC0062.png', '2024-12-17 07:44:41', 'KUAN JI TONG', 1),
('A22EC0067', '$2b$10$fFeN4.Y5eK02hmgKXjSIGeJz9Rk0e/CaVV6txlbrETc2wcsmCWJVq', 'leowhong@graduate.utm.my ', 'Pelajar FSKSM', NULL, '2024-12-20 01:41:06', 'LEOW YAN HONG', 1),
('A22EC0122', NULL, 'kwekcong@graduate.utm.my ', 'Pelajar FSKSM', NULL, '2024-12-15 23:24:23', 'KWEK JIA CONG', 0),
('ADMIN', '$2b$10$DeXV14ZI/7DZwzbyXVVm1.6iOG8DEmKsGTjgUnfpjqSs4tbspLB3O', 'admin@gmail.com', 'Admin', '1737032662575-profile-pic-ADMIN.png', '2025-01-02 05:58:12', 'Admin', 1);

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
(115, 'A22EC0067', 'LEOW YAN HONG logged out from the system', '2025-01-20 21:34:43'),
(116, 'A22ec0067', 'LEOW YAN HONG logged into the system', '2025-01-20 21:34:48'),
(117, 'A22EC0062', 'KUAN JI TONG logged into the system', '2025-01-20 22:25:18'),
(118, 'A22EC0062', 'KUAN JI TONG logged out from the system', '2025-01-21 04:05:52'),
(119, 'Admin', 'Admin logged into the system', '2025-01-21 04:05:57'),
(120, 'Admin', 'Admin logged into the system', '2025-01-21 15:33:45'),
(121, 'ADMIN', 'Admin logged out from the system', '2025-01-21 16:24:09'),
(122, 'A22EC0062', 'KUAN JI TONG logged into the system', '2025-01-21 16:24:13'),
(123, 'A22EC0062', 'KUAN JI TONG logged out from the system', '2025-01-21 16:26:03'),
(124, '12085', 'TONI ANWAR registered to the system', '2025-01-21 16:26:12'),
(125, '12085', 'TONI ANWAR shared the resource \"Testing\" .', '2025-01-21 16:33:12');

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
('admin@gmail.com', 148, 0),
('kewheng@graduate.utm.my ', 148, 0),
('kuantong@graduate.utm.my ', 148, 0),
('kwekcong@graduate.utm.my ', 148, 0),
('leowhong@graduate.utm.my ', 148, 0),
('msmd2@live.utm.my', 148, 0);

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
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `group_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=483;

--
-- AUTO_INCREMENT for table `group_members`
--
ALTER TABLE `group_members`
  MODIFY `group_member_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=149;

--
-- AUTO_INCREMENT for table `resources`
--
ALTER TABLE `resources`
  MODIFY `resource_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `user_log`
--
ALTER TABLE `user_log`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;

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
  ADD CONSTRAINT `FK_RESOURCE` FOREIGN KEY (`resource_id`) REFERENCES `resources` (`resource_id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
