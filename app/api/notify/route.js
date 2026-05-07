import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, skill_category, village, phone } = await req.json();

    const { data, error } = await resend.emails.send({
      from: 'KaamSetu <onboarding@resend.dev>',
      to: [process.env.ADMIN_EMAIL || 'xpertwebcoder@gmail.com'],
      subject: 'New Worker Registration: ' + name,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #4f46e5;">New Worker Registered on KaamSetu</h2>
          <p>A new worker has submitted their profile for review.</p>
          <hr style="border: 1px solid #eee;" />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Category:</strong> ${skill_category}</p>
          <p><strong>Village:</strong> ${village}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <hr style="border: 1px solid #eee;" />
          <p>Please log in to the admin dashboard to approve this profile.</p>
          <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/dashboard" 
             style="background: #4f46e5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 8px; display: inline-block; margin-top: 10px;">
            Go to Admin Dashboard
          </a>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
