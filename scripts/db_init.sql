--
-- postgreSQL database dump
--

-- Dumped from database version 9.5.6
-- Dumped by pg_dump version 10.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: dbdb; Type: DATABASE; Schema: -; Owner: dbadmin
--

\connect dbdb

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

CREATE TABLE "accounts" (
	"_id" serial NOT NULL,
	"username" varchar NOT NULL,
	"password" varchar NOT NULL,
	"create_timestamp" timestamp with time zone NOT NULL DEFAULT NOW(),
	CONSTRAINT "accounts_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "analysis_session" (
	"_id" serial NOT NULL,
	"account_id" bigint NOT NULL,
	"user_id" bigint NOT NULL,
	"primary_content_id" bigint NOT NULL,
	"secondary_content_id" bigint NOT NULL,
	"factors_against" integer NOT NULL,
	"factors_toward" integer NOT NULL,
	"start_timestamp" timestamp with time zone NOT NULL,
	"completed_timestamp" timestamp with time zone NOT NULL,
	CONSTRAINT "analysis_session_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "users" (
	"_id" serial NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"organization" varchar NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "content" (
	"_id" serial NOT NULL,
	"content_type" varchar NOT NULL,
	"file_type" varchar NOT NULL,
	"url" varchar,
	"published_date" DATE,
	"author" varchar,
	"view_count" bigint,
	CONSTRAINT "content_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "assessments" (
	"_id" serial NOT NULL,
	"question_number" varchar NOT NULL,
	"answer" TEXT NOT NULL,
	"analysis_session_id" bigint NOT NULL,
	CONSTRAINT "assessments_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "questions" (
	"_id" serial NOT NULL,
	"question_number" varchar NOT NULL,
	"question_text" varchar NOT NULL,
	"create_date" DATE NOT NULL DEFAULT CURRENT_DATE,
	"no_fair_use" numeric(2,1) NOT NULL,
	"no_infringement" numeric(2,1) NOT NULL,
	"yes_fair_use" numeric(2,1) NOT NULL,
	"yes_infringement" numeric(2,1) NOT NULL,
	"branch_on" varchar,
	"parent_question" varchar,
	CONSTRAINT "questions_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "session" (
	"sid" varchar NOT NULL,
	"sess" json NOT NULL,
	"expire" timestamp with time zone NOT NULL,
	CONSTRAINT "session_pk" PRIMARY KEY ("sid")
) WITH (
  OIDS=FALSE
);

-- COPY accounts (username, password) FROM stdin;
-- smozingo	password
-- nkatz	password
-- \.

-- COPY questions (question_number, question_text,  weight) FROM stdin;
-- 21	Is this video dope?	1
-- 22	Is this video funky?	1
-- \.
 

-- COPY questions (question_number, question_text,  parent_question_number, weight) FROM stdin;
-- 21a	Is this video too dope?	1	21
-- 21b	Is this video the dopest?	1	21
-- \.

ALTER TABLE "analysis_session" ADD CONSTRAINT "analysis_session_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("_id");
ALTER TABLE "analysis_session" ADD CONSTRAINT "analysis_session_fk2" FOREIGN KEY ("primary_content_id") REFERENCES "content"("_id");
ALTER TABLE "analysis_session" ADD CONSTRAINT "analysis_session_fk3" FOREIGN KEY ("secondary_content_id") REFERENCES "content"("_id");

ALTER TABLE "users" ADD CONSTRAINT "users_uniq_0" UNIQUE ("first_name", "last_name", "organization");

ALTER TABLE "questions" ADD CONSTRAINT "question_number_text_uq" UNIQUE ("question_number", "question_text");

ALTER TABLE "assessments" ADD CONSTRAINT "assessments_fk0" FOREIGN KEY ("analysis_session_id") REFERENCES "analysis_session"("_id");
--
-- Name: public; Type: ACL; Schema: -; Owner: mmadmin
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM dbadmin;
GRANT ALL ON SCHEMA public TO dbadmin;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- postgreSQL database dump complete
--

