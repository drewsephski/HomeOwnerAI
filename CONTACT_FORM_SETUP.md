# Contact Form Setup Instructions

## Resend Configuration

To enable the contact form to send emails, you need to configure Resend:

### 1. Get a Resend API Key

1. Sign up for a Resend account at [https://resend.com](https://resend.com)
2. Go to your dashboard and create an API key
3. Copy the API key (it starts with `re_`)

### 2. Add Environment Variables

Add the following to your `.env.local` file:

```env
RESEND_API_KEY=your_resend_api_key_here
```

### 3. Configure Domain (Optional but Recommended)

For better deliverability, configure a custom domain in Resend:

1. Go to Resend dashboard → Domains
2. Add your domain (e.g., `homeownerai.com`)
3. Follow the DNS setup instructions
4. Update the `from` address in `/app/api/contact/route.ts` to use your verified domain

### 4. Test the Contact Form

1. Start your development server: `bun dev`
2. Navigate to `/contact`
3. Fill out the form and submit
4. Check if you receive an email at `drewsepeczi@gmail.com`

## Current Configuration

- **Recipient**: drewsepeczi@gmail.com
- **From Address**: contact@homeownerai.com (needs domain verification)
- **Form Location**: `/contact`
- **API Endpoint**: `/api/contact`

## CTAs Updated

All CTAs now point to `/contact` instead of `/setup`:
- Pricing page "Get Started" buttons
- How-it-works page "Start Your 48-Hour Setup" 
- Pricing page CTA section buttons

## Features

- Form validation (name, email, message required)
- Email formatting with HTML and text versions
- IP and user agent tracking
- Success state with confirmation
- Error handling and user feedback
- Responsive design
