import { GET } from "../app/api/advocates/route";
import { describe, it, expect, vi } from "vitest";
import { NextRequest } from "next/server";
import { advocateData } from "../db/seed/advocates";

const advocate = advocateData[0];

vi.mock("@/services/advocateService", () => ({
  searchAdvocates: vi.fn(() =>
    Promise.resolve({
      data: [advocate],
      total: 1,
    })
  ),
}));

describe("GET /api/advocates", () => {
  it("returns advocates and total count", async () => {
    const request = new NextRequest(
      "http://localhost/api/advocates?query=john&limit=10&offset=0",
      { method: "GET" }
    );

    const response = await GET(request);
    const responseJson = await response.json();

    expect(response.status).toBe(200);
    expect(responseJson.data[0]).toStrictEqual(advocate);
    expect(responseJson.total).toBe(1);
  });
});
