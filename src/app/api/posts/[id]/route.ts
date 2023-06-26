import { NextResponse } from 'next/server';
import dbConnect from '../../../../../lib/dbConnect';
import Post from '../../../../../models/Post';

export async function GET(req: Request) {
    try {
        const id = await req.json()

        await dbConnect()

        const post = await Post.findById(id)
        if (!post) {
            return NextResponse.json({ success: false })
        }
        return NextResponse.json({ success: true, data: post })
    } catch (error) {
        return NextResponse.json({ success: false })
    }
}

export async function PUT(req: Request,) {
    try {
        const { id, newpost } = await req.json()

        await dbConnect()

        const post = await Post.findByIdAndUpdate(id, newpost, {
            new: true,
            runValidators: true,
        })
        if (!post) {
            return NextResponse.json({ success: false })
        }
        return NextResponse.json({ success: true, data: post })
    } catch (error) {
        return NextResponse.json({ success: false })
    }
}

export async function DELETE(req: Request,) {
    try {
        const id = await req.json()

        await dbConnect()

        const deletedPost = await Post.deleteOne({ _id: id })
        if (!deletedPost) {
            return NextResponse.json({ success: false })
        }
        return NextResponse.json({ success: true, data: {} })
    } catch (error) {
        return NextResponse.json({ success: false })
    }
}

