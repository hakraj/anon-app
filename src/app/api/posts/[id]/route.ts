import { NextResponse } from 'next/server';
import dbConnect from '../../../../../lib/dbConnect';
import Post from '../../../../../models/Post';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    const post = await Post.findById(params.id)
    if (!post) {
      return NextResponse.json({ success: false, err: "no pot" })
    }
    return NextResponse.json({ success: true, data: post })
  } catch (error) {
    return NextResponse.json({ success: false })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const newpost = await req.json()

    await dbConnect()

    const post = await Post.findByIdAndUpdate(params.id, newpost, {
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

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    const deletedPost = await Post.deleteOne({ _id: params.id })
    if (!deletedPost) {
      return NextResponse.json({ success: false })
    }
    return NextResponse.json({ success: true, data: {} })
  } catch (error) {
    return NextResponse.json({ success: false })
  }
}

