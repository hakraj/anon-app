import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/dbConnect";
import Post from "../../../../../models/Post";
import url from 'url';




export async function GET(req: Request) {
  try {
    const user = url.parse(req.url, true).query;

    const doc = { "author.email": user.email }

    await dbConnect()

    const posts = await Post.find(doc) /* find all the data in our database */
    return NextResponse.json({ success: true, data: posts })
  } catch (error) {
    return NextResponse.json({ success: false })
  }
}
