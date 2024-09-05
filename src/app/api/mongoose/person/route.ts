import { connectToDB } from "@/lib/database/connectToDB";
import { models, Schema, model, Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

const personSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: "Story" }],
});

const Person = models.Person || model("Person", personSchema);

export const POST = async (request: NextRequest) => {
  try {
    const req = request.nextUrl.pathname;

    // await connectToDB();
    // const { name, age } = await request.json();
    // const user = { name, age, _id: new Types.ObjectId() };
    console.log({ req });
    // const newUser = await Person.create(user);
    return NextResponse.json({ newUser: req });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({ error });
  }
};
