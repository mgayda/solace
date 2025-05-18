import { advocates } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type Advocate = InferSelectModel<typeof advocates>;
