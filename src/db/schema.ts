import { sql } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  jsonb,
  serial,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

const advocates = pgTable(
  "advocates",
  {
    id: serial("id").primaryKey(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    city: text("city").notNull(),
    degree: text("degree").notNull(),
    specialties: jsonb("specialties").$type<string[]>().default([]).notNull(),
    yearsOfExperience: integer("years_of_experience").notNull(),
    phoneNumber: text("phone_number").notNull(),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    firstNameIdx: index("idx_first_name").on(table.firstName),
    lastNameIdx: index("idx_last_name").on(table.lastName),
    cityIdx: index("idx_city").on(table.city),
    degreeIdx: index("idx_degree").on(table.degree),
    specialtiesIdx: index("idx_specialties").on(table.specialties),
  })
);

export { advocates };
