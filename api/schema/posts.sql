-- Drop the existing "posts" table if it exists
DROP TABLE IF EXISTS posts;

-- Create the "posts" table with the new structure
CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT current_timestamp,
    content TEXT NOT NULL,
    tag VARCHAR(255) NOT NULL
);
