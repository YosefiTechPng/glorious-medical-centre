# Glorious Medical Centre — Website

Built by **YosefiTechPng** 🇵🇬
Stack: HTML, CSS, JavaScript (frontend) + Node.js / Express / Nodemailer (backend)

---

## 📁 Project Structure
```
glorious-medical-centre/
├── public/
│   ├── index.html
│   ├── about.html
│   ├── services.html
│   ├── doctors.html
│   ├── appointments.html
│   ├── contact.html
│   ├── favicon.png
│   ├── css/style.css
│   └── js/main.js
├── server.js
├── package.json
├── .env.example
└── .gitignore
```

---

## 🚀 Setup Instructions

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Then edit `.env` with your real email credentials:
```
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
CLINIC_EMAIL=clinic_email@gmail.com
PORT=3000
```

> **Note:** For Gmail, you need an **App Password**, not your regular password.
> Generate one at: https://myaccount.google.com/apppasswords
> (Requires 2-Step Verification to be turned on for your Google account first)

### 3. Run locally
```bash
npm start
```
Visit `http://localhost:3000`

For development with auto-restart:
```bash
npm run dev
```

---

## ✅ What's Included

- 6 fully responsive pages (Home, About, Services, Doctors, Appointments, Contact)
- Working appointment booking form → sends email via Nodemailer
- Working contact form → sends email via Nodemailer
- FAQ accordion (vanilla JS)
- WhatsApp floating button (update the number in each HTML file)
- Back-to-top button
- Scroll fade-in animations
- Mobile hamburger menu
- SEO meta tags on every page
- Loading spinner
- Active nav link highlighting

---

## 🔧 Things YOU Need To Customize

1. **WhatsApp number** — search all HTML files for `https://wa.me/` and add the real number, e.g. `https://wa.me/67512345678`
2. **Doctor names & photos** — currently placeholders in `doctors.html`
3. **Real Google Map embed** — currently a styled placeholder card with a "Get Directions" link
4. **Social media links** — Facebook/Instagram `#` links in the footer
5. **Email credentials** — `.env` file (see above)

---

## 📦 Deploying to Vercel

1. Push this project to your GitHub repo
2. Go to vercel.com → New Project → Import your repo
3. Add Environment Variables in Vercel dashboard (same as your `.env`):
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `CLINIC_EMAIL`
4. Deploy
5. Connect your Namecheap domain in Vercel → Settings → Domains

---

*Website built by **YosefiTechPng** — Modern, affordable websites for PNG businesses*
*Contact: immanuelklupi@gmail.com | yosefitechpng.com*
