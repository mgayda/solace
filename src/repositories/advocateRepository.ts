import db from "@/db";
import { advocates } from "@/db/schema";
import { SQL, sql } from "drizzle-orm";

export const getAdvocates = async (options: {
  where?: SQL;
  limit: number;
  offset: number;
}) => {
  const { where, limit, offset } = options;

  return await db
    .select()
    .from(advocates)
    .where(where)
    .limit(limit)
    .offset(offset);
};

export const getAdvocateCount = async (options: { where?: SQL }) => {
  const { where } = options;

  const response = await db
    .select({ count: sql<number>`count(*)` })
    .from(advocates)
    .where(where);

  return Number(response[0]?.count ?? 0);
};
