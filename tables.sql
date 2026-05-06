CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(100)
    );

CREATE TABLE userprofile (
    profile_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(100) NOT NULL,
    bio VARCHAR(300),
    major VARCHAR(100),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE interest (
  interest_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE user_interest (
  user_id INT NOT NULL,
  interest_id INT NOT NULL,
  PRIMARY KEY (user_id, interest_id),
  FOREIGN KEY (user_id) REFERENCES user(user_id),
  FOREIGN KEY (interest_id) REFERENCES interest(interest_id)
);

CREATE TABLE photo(
    photo_id INT AUTO_INCREMENT PRIMARY KEY,
    profile_id INT NOT NULL,
    FOREIGN KEY (profile_id) REFERENCES userprofile(profile_id),
    url VARCHAR(300) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE `match` (
    match_id INT AUTO_INCREMENT PRIMARY KEY,
    user_a_id INT NOT NULL,
    user_b_id INT NOT NULL,
    match_score FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(100) 
    );

CREATE TABLE messagethread (
    thread_id INT AUTO_INCREMENT PRIMARY KEY,
    match_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (match_id) REFERENCES `match`(match_id)
    );

CREATE TABLE message (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    thread_id INT NOT NULL,
    sender_user_id INT NOT NULL,
    body VARCHAR(2000) NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (thread_id) REFERENCES messagethread(thread_id),
    FOREIGN KEY (sender_user_id) REFERENCES user (user_id)
    );

CREATE TABLE swipe (
    swipe_id INT AUTO_INCREMENT PRIMARY KEY,
    swiper_user_id INT NOT NULL,
    target_user_id INT NOT NULL,
    direction VARCHAR(25) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (swiper_user_id) REFERENCES user(user_id),
    FOREIGN KEY (target_user_id) REFERENCES user(user_id)
    );
