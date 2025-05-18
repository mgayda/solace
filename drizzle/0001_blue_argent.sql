ALTER TABLE "advocates" RENAME COLUMN "payload" TO "specialties";--> statement-breakpoint
ALTER TABLE "advocates" ALTER COLUMN "phone_number" SET DATA TYPE text;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_first_name" ON "advocates" USING btree ("first_name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_last_name" ON "advocates" USING btree ("last_name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_city" ON "advocates" USING btree ("city");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_degree" ON "advocates" USING btree ("degree");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_specialties" ON "advocates" USING btree ("specialties");