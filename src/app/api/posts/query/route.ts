import { NextResponse } from 'next/server';
import url from 'url';
import dbConnect from '../../../../../lib/dbConnect';
import Post from '../../../../../models/Post';
import { FilterQuery } from 'mongoose';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type QueryConditions = {
    $and: { [key: string]: any }[];
} | {
    [key: string]: { [key: string]: any };
};

export async function GET(req: Request) {
    try {
        const { qtitle, qcontent } = url.parse(req.url, true).query;

        await dbConnect()

        const query: FilterQuery<any> = {
            $or: [
                (qcontent && {
                    $and: [
                        { title: { $exists: false } },
                        { content: { $regex: qcontent, $options: 'i' } }
                    ]
                }) as QueryConditions,
                (qtitle && {
                    $and: [
                        { title: { $regex: qtitle, $options: 'i' } },
                        { content: { $exists: false } }
                    ]
                }) as QueryConditions,
                (qtitle && { title: { $regex: qtitle, $options: 'i' } }) as QueryConditions,              // Find posts where title field is the queried value
                (qcontent && { content: { $regex: qcontent, $options: 'i' } }) as QueryConditions            // Find posts where content field is the queried value
            ].filter(Boolean) as QueryConditions[]
        }

        const posts = await Post.find(query)

        if (!posts) {
            return NextResponse.json({ success: false })
        }
        return NextResponse.json({ success: true, data: posts })

    }
    catch (error) {
        return NextResponse.json({ success: false, cau: error })
    }

}

