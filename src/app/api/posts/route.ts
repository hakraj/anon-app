import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import Post from '../../../../models/Post';

interface Data {
    [key: string]: string;
}

export async function GET() {
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
        const newpost: Data = await req.json()

        const doc: Data = Object.entries(newpost).reduce((result: Data, [key, value]) => {
            if (value.trim().length > 0) {
                result[key] = value;
            }
            return result;
        }, {});

        if (Object.keys(doc).length === 0) {
            return NextResponse.json({ success: false, err: "empty post" });
        }

        await dbConnect()

        const post = await Post.create(doc) /* create a new model in the database */
        return NextResponse.json({ success: true, data: post })
    } catch (error) {
        return NextResponse.json({ success: false, err: error })
    }
}
