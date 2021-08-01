-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 02. Aug 2021 um 01:37
-- Server-Version: 10.4.17-MariaDB
-- PHP-Version: 7.4.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `games`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `galaxywar`
--

CREATE TABLE `galaxywar` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gold_coins` int(255) DEFAULT 0,
  `coins` int(255) DEFAULT 0,
  `spaceships` int(255) DEFAULT 0,
  `bullets` int(255) DEFAULT 0,
  `flames` int(255) DEFAULT 0,
  `backgrounds` int(255) DEFAULT 0,
  `entry_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `galaxywar`
--

INSERT INTO `galaxywar` (`id`, `name`, `password`, `gold_coins`, `coins`, `spaceships`, `bullets`, `flames`, `backgrounds`, `entry_date`) VALUES
(2, 'King66', '123456', 0, 0, 0, 0, 0, 0, '2021-08-01 23:36:46');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `galaxywar`
--
ALTER TABLE `galaxywar`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `galaxywar`
--
ALTER TABLE `galaxywar`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
