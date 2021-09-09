-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 07 sep. 2021 à 08:31
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomaniasql_dev`
--

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `likes` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`id`, `userId`, `content`, `attachment`, `likes`, `createdAt`, `updatedAt`) VALUES
(2, 2, 'Merci pour l\'invitation.', 'http://localhost:3000/images/giphy_(2).gif1630841477967.gif', 0, '2021-09-05 11:31:17', '2021-09-05 11:31:17'),
(3, 3, 'On se fait une pause ?', 'http://localhost:3000/images/giphy_(1).gif1630841564687.gif', 0, '2021-09-05 11:32:44', '2021-09-05 11:32:44'),
(37, 11, 'Hello', 'http://localhost:3000/images/giphy.gif1630921956035.gif', 0, '2021-09-06 09:52:36', '2021-09-06 09:52:36');

-- --------------------------------------------------------

--
-- Structure de la table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20210818121203-create-user.js'),
('20210818121507-create-message.js');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(2, 'haya@gmail.com', 'haya', '$2b$10$VbDTwyxGwzz.M51EUhXilO2XFJntOQIkClX1ydS38BzuqU/XRJVPq', 1, '2021-09-05 11:30:23', '2021-09-06 08:42:23'),
(3, 'ysera@gmail.com', 'Ysera', '$2b$10$4jYHQlSXGT7ZTLrXjLdPX.ThrKG.YoEjD1v3p9XEVJ83QrAR8TW0W', 0, '2021-09-05 11:32:32', '2021-09-05 11:32:32'),
(4, 'kangor@gmail.com', 'Kangor', '$2b$10$ZsTCAfXAOSbM9uJctvcSduJugHgLsH0Ese3rT7HLohdjb35DXkkA.', 0, '2021-09-06 07:11:30', '2021-09-06 07:11:30'),
(11, 'byfabe@gmail.com', 'Zheyn', '$2b$10$Qnztoa7Pgrlp7s0oqxDIQOWZDIWl/zYrRvtzhyfE0Ut7oHpy2RQFy', 1, '2021-09-06 09:13:13', '2021-09-06 09:13:13');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
