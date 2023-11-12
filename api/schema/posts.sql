
CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT current_timestamp,
    content TEXT NOT NULL,
    tag VARCHAR(255)[] NOT NULL
);
