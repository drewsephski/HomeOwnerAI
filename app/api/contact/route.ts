import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  console.log('Contact API called');
  
  try {
    const body = await request.json();
    console.log('Request body:', body);
    
    const { name, email, message, emailContent } = body;

    // Validate required fields
    if (!name || !email || !emailContent) {
      console.log('Missing required fields:', { name, email, emailContent });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email format:', email);
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Get client IP from headers
    const clientIP = request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   'Unknown';

    // Create HTML version of the email
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Business Information</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        .container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            border-bottom: 2px solid #e9ecef;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #2c3e50;
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .header .subtitle {
            color: #6c757d;
            margin: 5px 0 0 0;
            font-size: 14px;
        }
        .contact-info {
            background-color: #f8f9fa;
            border-left: 4px solid #007bff;
            padding: 20px;
            margin: 20px 0;
            border-radius: 0 4px 4px 0;
        }
        .contact-info h3 {
            margin: 0 0 15px 0;
            color: #2c3e50;
            font-size: 18px;
        }
        .contact-info p {
            margin: 5px 0;
            font-size: 14px;
        }
        .contact-info .label {
            font-weight: 600;
            color: #495057;
            display: inline-block;
            min-width: 80px;
        }
        .business-content {
            background-color: #ffffff;
            border: 1px solid #e9ecef;
            border-radius: 6px;
            padding: 25px;
            margin: 20px 0;
        }
        .business-content h3 {
            color: #2c3e50;
            margin: 0 0 20px 0;
            font-size: 18px;
            border-bottom: 1px solid #e9ecef;
            padding-bottom: 10px;
        }
        .business-content pre {
            white-space: pre-wrap;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 14px;
            line-height: 1.6;
            color: #333;
            margin: 0;
        }
        .additional-message {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 6px;
            padding: 20px;
            margin: 20px 0;
        }
        .additional-message h3 {
            color: #856404;
            margin: 0 0 15px 0;
            font-size: 16px;
        }
        .additional-message p {
            margin: 0;
            font-size: 14px;
            color: #856404;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
            font-size: 12px;
            color: #6c757d;
            text-align: center;
        }
        .metadata {
            background-color: #f8f9fa;
            border-radius: 4px;
            padding: 15px;
            margin-top: 20px;
            font-size: 11px;
            color: #6c757d;
        }
        .metadata div {
            margin: 3px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📋 New Business Information Submission</h1>
            <p class="subtitle">A potential client has shared their business details</p>
        </div>

        <div class="contact-info">
            <h3>👤 Contact Information</h3>
            <p><span class="label">Name:</span> ${name}</p>
            <p><span class="label">Email:</span> ${email}</p>
            <p><span class="label">Date:</span> ${new Date().toLocaleString()}</p>
        </div>

        <div class="business-content">
            <h3>🏢 Business Information</h3>
            <pre>${emailContent.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
        </div>

        ${message ? `
        <div class="additional-message">
            <h3>💬 Additional Message</h3>
            <p>${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
        </div>
        ` : ''}

        <div class="metadata">
            <div><strong>Technical Information:</strong></div>
            <div>IP Address: ${clientIP}</div>
            <div>User Agent: ${request.headers.get('user-agent') || 'Unknown'}</div>
            <div>Timestamp: ${new Date().toISOString()}</div>
        </div>

        <div class="footer">
            <p>This email was sent automatically from your business contact form.</p>
            <p>Please respond within 24 hours to provide excellent customer service.</p>
        </div>
    </div>
</body>
</html>
    `;

    const plainTextContent = `NEW BUSINESS INFORMATION SUBMISSION
==========================================

CONTACT INFORMATION
-------------------
Name: ${name}
Email: ${email}
Date: ${new Date().toLocaleString()}

BUSINESS INFORMATION
--------------------
${emailContent}

${message ? `
ADDITIONAL MESSAGE
------------------
${message}
` : ''}

TECHNICAL INFORMATION
---------------------
IP Address: ${clientIP}
User Agent: ${request.headers.get('user-agent') || 'Unknown'}
Timestamp: ${new Date().toISOString()}

---
This email was sent automatically from your business contact form.
Please respond within 24 hours to provide excellent customer service.`;

    console.log('Preparing to send email via Resend');

    try {
      const { error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: ['drewsepeczi@gmail.com'],
        subject: `📋 New Business Information from ${name}`,
        text: plainTextContent,
        html: htmlContent,
      });

      if (error) {
        console.error('Resend error:', error);
        return NextResponse.json(
          { error: 'Failed to send email' },
          { status: 500 }
        );
      }

      console.log('Email sent successfully');
      return NextResponse.json(
        { success: true, message: 'Email sent successfully' },
        { status: 200 }
      );

    } catch (resendError) {
      console.error('Resend API error:', resendError);
      return NextResponse.json(
        { error: 'Email service unavailable' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}