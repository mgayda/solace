import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function POST() {
  try {
    const records = await db.insert(advocates).values(advocateData).returning();

    return Response.json({ advocates: records }, { status: 201 });
  } catch (error) {
    console.error(`Failed to seed advocates: ${error}`);
    return Response.json(
      { error: "Failed to seed advocates" },
      { status: 500 }
    );
  }
}
