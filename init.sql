-- init.sql
CREATE TABLE IF NOT EXISTS mytable (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  age INT
);

-- データの初期挿入
INSERT INTO mytable (name, age) VALUES ('Alice', 30);
INSERT INTO mytable (name, age) VALUES ('Bob', 25);
