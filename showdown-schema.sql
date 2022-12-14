CREATE TABLE schools (
  school_handle VARCHAR(25) PRIMARY KEY CHECK (school_handle = lower(school_handle)),
  school_name TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  logo_url TEXT,
  facebook_url TEXT,
  instagram_url TEXT
);

CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  gender TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  school_handle TEXT NOT NULL CHECK (school_handle = lower(school_handle)),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  paid BOOLEAN NOT NULL DEFAULT FALSE
);

-- CREATE TABLE competitions (
--   id SERIAL PRIMARY KEY,
--   competition TEXT NOT NULL,
--   description TEXT NOT NULL,
--   school_handle TEXT NOT NULL 
--     REFERENCES schools(school_handle), 
--   username TEXT NOT NULL 
--     REFERENCES users(username) 
-- );

CREATE TABLE competitions (
  id SERIAL PRIMARY KEY,
  competition_handle TEXT NOT NULL,
  competition_name TEXT NOT NULL,
  description TEXT NOT NULL,
  gender TEXT, 
  logo_url TEXT 
);

CREATE TABLE schools_competitions (
  school_handle TEXT NOT NULL,
  competition_id SERIAL NOT NULL,
  score INT,
  CONSTRAINT fk_school
    FOREIGN KEY(school_handle)
	    REFERENCES schools(school_handle),
    FOREIGN KEY(competition_id)
	    REFERENCES competitions(id),
  UNIQUE (school_handle, competition_id)
);

CREATE TABLE users_competitions (
  username TEXT NOT NULL,
  competition_id INT NOT NULL,
  score INT,
  CONSTRAINT fk_user
    FOREIGN KEY(username)
	    REFERENCES users(username),
    FOREIGN KEY(competition_id)
	    REFERENCES competitions(id),
  UNIQUE (username, competition_id)
);