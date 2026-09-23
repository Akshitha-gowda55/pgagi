import { NextRequest, NextResponse } from "next/server";
import { getSocialPosts } from "@/services/social/socialService";
import { mapSocialPosts } from "@/services/social/socialMapper";

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;

    const page = Math.max(
      1,
      Number(params.get("page") ?? "1"),
    );

    const pageSize = Math.max(
      1,
      Number(params.get("pageSize") ?? "6"),
    );

    const query = params.get("query") ?? "";

    const result = getSocialPosts({
      page,
      pageSize,
      query,
    });

    return NextResponse.json({
      items: mapSocialPosts(result.items),
      page: result.page,
      hasMore: result.hasMore,
      total: result.total,
    });
  } catch (error) {
    console.error("Social API error:", error);

    return NextResponse.json(
      {
        message: "Failed to load social posts",
      },
      {
        status: 500,
      },
    );
  }
}
