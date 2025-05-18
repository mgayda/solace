import { NextRequest, NextResponse } from "next/server";
import { searchAdvocates } from "@/services/advocateService";
import { SearchParamsSchema } from "../../schemas/advocates/searchParamsSchema";

export const getAdvocates = async (req: NextRequest) => {
  try {
    const searchParams = Object.fromEntries(req.nextUrl.searchParams);
    const parsedSearchParams = SearchParamsSchema.safeParse(searchParams);

    if (!parsedSearchParams.success) {
      return NextResponse.json(
        { error: "Invalid search parameters" },
        { status: 400 }
      );
    }

    const { query, limit, offset } = parsedSearchParams.data;

    const { data, total } = await searchAdvocates({ query, limit, offset });

    return NextResponse.json({ data, total }, { status: 200 });
  } catch (error) {
    console.error(`Failed to GET advocates: ${error}`);
    return NextResponse.json(
      { error: "Failed to GET advocates" },
      { status: 500 }
    );
  }
};
