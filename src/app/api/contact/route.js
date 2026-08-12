import { NextResponse } from "next/server";
import { connectToDB } from "@/lib2/mongodb";
import Contact from "@/models/contact";
import nodemailer from "nodemailer";

export async function POST(req) {
  const { name, phone, email, message } = await req.json();

  try {
    await connectToDB();

    // Save to DB
    await Contact.create({ name, phone, email, message });

    // Send Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail
        pass: process.env.EMAIL_PASS, // Gmail App Password
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER, // Your email
      subject: "New Contact Submission",
      html: `
        <h2>Contact Details</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Mongo/Email Error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
