import { connectToDB } from "@/lib/database/connectToDB";
import { model, models, Schema, Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
const storySchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "Person" },
  title: String,
  fans: [{ type: Schema.Types.ObjectId, ref: "Person" }],
});

const Story = models.Story || model("Story", storySchema);

export const POST = async (request: NextRequest) => {
  try {
    await connectToDB();
    const { title, author } = await request.json();
    const str = { title, author };
    const story = await Story.create(str);
    return NextResponse.json({ story });
  } catch (error) {
    return NextResponse.json({ error });
  }
};

export const GET = async (request: NextRequest) => {
  try {
    const url = request.nextUrl.searchParams;
    const title = url.has("title") && url.get("title");
    const query = title?.toString().split("-").join(" ").toString();
    await connectToDB();
    const results = await Story.findOne({ title: query }).populate("author");
    return NextResponse.json({ results });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
};
