# EmailJS Setup Guide

## Overview
The "পরামর্শ দিন" (Give Advice) button uses EmailJS to send advice/feedback emails directly from the frontend without requiring a backend email service.

## Setup Steps

### 1. Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Create Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. Note down the **Service ID**

### 3. Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Design your template with these variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{subject}}` - Email subject
   - `{{message}}` - Email message
   - `{{to_name}}` - Recipient name
4. Save the template and note down the **Template ID**

### 4. Get Public Key
1. Go to "Account" → "API Keys"
2. Copy your **Public Key**

### 5. Configure Environment Variables
Create a `.env.local` file in the project root with:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### 6. Example Email Template
```html
<h2>নতুন পরামর্শ</h2>
<p><strong>প্রেরক:</strong> {{from_name}}</p>
<p><strong>ইমেইল:</strong> {{from_email}}</p>
<p><strong>বিষয়:</strong> {{subject}}</p>
<p><strong>বার্তা:</strong></p>
<p>{{message}}</p>
```

## Features
- ✅ Bengali language support
- ✅ Form validation
- ✅ Loading states
- ✅ Success/error notifications
- ✅ Responsive design
- ✅ Professional UI

## Usage
The advice button is now integrated into the political dashboard. Users can:
1. Click "পরামর্শ দিন" button
2. Fill out the form with their name, email, subject, and message
3. Submit to send the advice via email

## Security Notes
- EmailJS public key is safe to expose in frontend
- Service and template IDs are also public
- EmailJS handles the email sending securely
- No sensitive data is stored in the frontend

## Troubleshooting
- Ensure all environment variables are set correctly
- Check EmailJS dashboard for any service issues
- Verify template variables match the code
- Check browser console for any JavaScript errors
