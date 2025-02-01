# MySQL

To access MySql terminal, open a MySQL8 Command Line Terminal from the Windows start menu.

## Access Databases

```code
mysql> mysql -u root -p

Enter password: **********
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 28
Server version: 8.0.40 MySQL Community Server - GPL

Copyright (c) 2000, 2024, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
```

## Show Databases

```code
mysql> show databases;

+--------------------+
| Database           |
+--------------------+
| dinner_app         |
| information_schema |
| mysql              |
| performance_schema |
| sakila             |
| sys                |
| world              |
+--------------------+
7 rows in set (0.00 sec)
  ```

## Show Tables

```code
mysql> show tables;

+----------------------+
| Tables_in_dinner_app |
+----------------------+
| ingredients          |
| instructions         |
| recipes              |
+----------------------+
3 rows in set (0.01 sec)
```

## Describe Tables

```code
mysql> describe ingredients;

+-----------+--------------+------+-----+---------+----------------+
| Field     | Type         | Null | Key | Default | Extra          |
+-----------+--------------+------+-----+---------+----------------+
| id        | int          | NO   | PRI | NULL    | auto_increment |
| recipe_id | int          | YES  | MUL | NULL    |                |
| name      | varchar(255) | NO   |     | NULL    |                |
| quantity  | varchar(255) | NO   |     | NULL    |                |
| unit      | varchar(50)  | NO   |     | NULL    |                |
+-----------+--------------+------+-----+---------+----------------+
5 rows in set (0.01 sec)
```
