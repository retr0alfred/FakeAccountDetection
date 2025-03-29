import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }

  try {
    const response = await axios.get(`https://www.instagram.com/${username}/?__a=1`);
    const userData = response.data.graphql?.user;

    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      username: userData.username,
      followers: userData.edge_followed_by.count,
      following: userData.edge_follow.count,
      posts: userData.edge_owner_to_timeline_media.count,
      isPrivate: userData.is_private,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
