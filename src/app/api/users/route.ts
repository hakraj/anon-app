import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import url from 'url';
import User from '../../../../models/User';

export async function GET(req: Request) {
    try {
        const user = url.parse(req.url, true).query;

        await dbConnect()

        const res = await User.find(user) /* find all the data in our database */
        return NextResponse.json({ success: true, data: res })
    } catch (error) {
        return NextResponse.json({ success: false })
    }
}

export async function POST(req: Request) {
    try {
        const newUser = await req.json()

        await dbConnect()

        const res = await User.create(newUser) /* create a new model in the database */
        return NextResponse.json({ success: true, data: res })
    } catch (error) {
        return NextResponse.json({ success: false, err: error })
    }
}
