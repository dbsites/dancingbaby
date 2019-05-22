CREATE TABLE "accounts" (
	"_id" serial NOT NULL,
	"username" varchar NOT NULL,
	"password" varchar NOT NULL,
	"create_timestamp" timestamp with time zone NOT NULL,
	CONSTRAINT accounts_pk PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "analysis_session" (
	"_id" serial NOT NULL,
	"account_id" bigint NOT NULL,
	"user_id" bigint NOT NULL,
	"copyrighted_content_id" bigint NOT NULL,
	"suspected_content_id" bigint NOT NULL,
	"assessment_id" bigint NOT NULL,
	"factors_against" integer NOT NULL,
	"factors_toward" integer NOT NULL,
	"start_timestamp" time with time zone NOT NULL,
	"completed_timestamp" time with time zone NOT NULL,
	CONSTRAINT analysis_session_pk PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "file_types" (
	"_id" serial NOT NULL,
	"description" varchar NOT NULL,
	CONSTRAINT file_types_pk PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "users" (
	"_id" serial NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"organization" varchar NOT NULL,
	CONSTRAINT users_pk PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "content" (
	"_id" serial NOT NULL,
	"copyrighted" BOOLEAN NOT NULL,
	"file_type_id" bigint NOT NULL,
	"url" varchar NOT NULL,
	"published_date" DATE NOT NULL,
	"author" varchar NOT NULL,
	"view_count" bigint NOT NULL,
	CONSTRAINT content_pk PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "assessments" (
	"_id" serial NOT NULL,
	"question_id" bigint NOT NULL,
	"answer" TEXT NOT NULL,
	CONSTRAINT assessments_pk PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "questions" (
	"_id" serial NOT NULL,
	"question_text" varchar NOT NULL,
	"create_date" DATE NOT NULL,
	"weight" integer NOT NULL,
	CONSTRAINT questions_pk PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "analysis_session" ADD CONSTRAINT "analysis_session_fk0" FOREIGN KEY ("account_id") REFERENCES "accounts"("_id");
ALTER TABLE "analysis_session" ADD CONSTRAINT "analysis_session_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("_id");
ALTER TABLE "analysis_session" ADD CONSTRAINT "analysis_session_fk2" FOREIGN KEY ("copyrighted_content_id") REFERENCES "content"("_id");
ALTER TABLE "analysis_session" ADD CONSTRAINT "analysis_session_fk3" FOREIGN KEY ("suspected_content_id") REFERENCES "content"("_id");
ALTER TABLE "analysis_session" ADD CONSTRAINT "analysis_session_fk4" FOREIGN KEY ("assessment_id") REFERENCES "assessments"("_id");



ALTER TABLE "content" ADD CONSTRAINT "content_fk0" FOREIGN KEY ("file_type_id") REFERENCES "file_types"("_id");

ALTER TABLE "assessments" ADD CONSTRAINT "assessments_fk0" FOREIGN KEY ("question_id") REFERENCES "questions"("_id");


