import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import Post from '../../../../models/Post';

interface Data {
  [key: string]: string;
}

export async function GET(req: Request) {
  try {

    await dbConnect()

    const posts = await Post.find({}) /* find all the data in our database */
    return NextResponse.json({ success: true, data: posts })
  } catch (error) {
    return NextResponse.json({ success: false })
  }
}

export async function POST(req: Request) {
  try {
    const { author, note } = await req.json()

    const doc: Data = Object.entries(note).reduce((result: Data, [key, value]) => {
      if (typeof value === 'string' && value.trim().length > 0) {
        result[key] = value;
      }
      return result;
    }, {});

    if (Object.keys(doc).length === 0) {
      return NextResponse.json({ success: false, err: "empty post" });
    }

    const newpost = { author: author, ...doc };

    await dbConnect()

    const post = await Post.create(newpost) /* create a new model in the database */
    return NextResponse.json({ success: true, data: post })
  } catch (error) {
    return NextResponse.json({ success: false, err: "falied" })
  }
}
