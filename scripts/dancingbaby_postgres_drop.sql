ALTER TABLE "analysis_session" DROP CONSTRAINT IF EXISTS "analysis_session_fk0";

ALTER TABLE "analysis_session" DROP CONSTRAINT IF EXISTS "analysis_session_fk1";

ALTER TABLE "analysis_session" DROP CONSTRAINT IF EXISTS "analysis_session_fk2";

ALTER TABLE "analysis_session" DROP CONSTRAINT IF EXISTS "analysis_session_fk3";

ALTER TABLE "analysis_session" DROP CONSTRAINT IF EXISTS "analysis_session_fk4";

ALTER TABLE "content" DROP CONSTRAINT IF EXISTS "content_fk0";

ALTER TABLE "assessments" DROP CONSTRAINT IF EXISTS "assessments_fk0";

ALTER TABLE "questions" DROP CONSTRAINT IF EXISTS "questions_fk0";

DROP TABLE IF EXISTS "accounts";

DROP TABLE IF EXISTS "analysis_session";

DROP TABLE IF EXISTS "file_types";

DROP TABLE IF EXISTS "users";

DROP TABLE IF EXISTS "content";

DROP TABLE IF EXISTS "assessments";

DROP TABLE IF EXISTS "questions";

