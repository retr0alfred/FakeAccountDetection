import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { followers, following, posts, isPrivate } = await req.json();

    let score = 0;
    if (followers < 50) score += 30;
    if (following > 5000) score += 20;
    if (posts < 3) score += 30;
    if (isPrivate) score += 10;

    return NextResponse.json({ fakeScore: score });
  } catch (error) {
    return NextResponse.json({ error: "Error processing data" }, { status: 500 });
  }
}
