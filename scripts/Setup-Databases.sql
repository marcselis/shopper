USE [master]
GO

IF  NOT EXISTS (SELECT name FROM master.dbo.sysdatabases WHERE name = N'Marketing')
CREATE DATABASE [Marketing]
GO