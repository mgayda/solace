import {
  getAdvocateCount,
  getAdvocates,
} from "../repositories/advocateRepository";
import { advocates } from "../db/schema";
import { ilike, or, sql } from "drizzle-orm";

export const searchAdvocates = async (options: {
  query?: string;
  limit?: number;
  offset?: number;
}) => {
  try {
    const { query = "", limit = 0, offset = 10 } = options;
    const formattedQuery = query.toLowerCase();

    const where = query
      ? or(
          ilike(advocates.firstName, `%${formattedQuery}%`),
          ilike(advocates.lastName, `%${formattedQuery}%`),
          ilike(advocates.city, `%${formattedQuery}%`),
          ilike(advocates.degree, `%${formattedQuery}%`),
          sql`CAST(${
            advocates.yearsOfExperience
          } AS TEXT) ILIKE ${`%${formattedQuery}%`}`,
          sql`${advocates.specialties}::text ILIKE ${`%${formattedQuery}%`}`
        )
      : undefined;

    const getAdvocatesQuery = getAdvocates({
      where,
      limit,
      offset,
    });
    const getAdvocateCountQuery = getAdvocateCount({ where });

    const [data, total] = await Promise.all([
      getAdvocatesQuery,
      getAdvocateCountQuery,
    ]);

    return { data, total };
  } catch (error) {
    console.log(`Error in advocate service: ${error}`);
    throw error;
  }
};
