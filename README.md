# Modern Portfolio Web Application

A high-end, production-ready portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Features a premium design with smooth animations, dark mode, and comprehensive content management.

![Portfolio Preview](https://via.placeholder.com/1200x600?text=Portfolio+Preview)

## ✨ Features

### Design & UX
- **Premium Aesthetic**: Large typography, balanced whitespace, subtle gradients, and glass effects
- **Dark Mode**: System-aware theme with smooth transitions
- **Responsive Design**: Pixel-perfect across all devices (mobile, tablet, desktop)
- **Smooth Animations**: Framer Motion powered micro-interactions with reduced motion support
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation


### Pages & Features
6. **Contact** - Form with validation and spam protection

- **ESLint**: Code quality enforcement

## 🚀 Quick Start

- npm, yarn, or pnpm

### Installation

1. **Clone or download the project**
   ```bash
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example env file
   copy .env.local.example .env.local
   
   # Edit .env.local with your actual values
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```


All portfolio content is centralized in the `/content` folder for easy editing:

### `/content/profile.ts`
  name: "Your Name",
  role: "Your Role",
  tagline: "Your value proposition...",
  email: "your@email.com",
  // ... more fields
};
```

### `/content/projects.ts`
Your project portfolio with detailed case studies.
```typescript
export const projects: Project[] = [
  {
    slug: "project-slug",
    title: "Project Title",
    description: "Short description...",
    // ... more fields
  },
];
```

### `/content/experience.ts`
Work history, education, and certifications.
```typescript
export const experiences: Experience[] = [
  {
    company: "Company Name",
    role: "Your Role",
    // ... more fields
  },
```

### `/content/skills.ts`
Skills organized by category, education, and certifications.

## 🎨 Customization

### Colors & Theme
Edit `tailwind.config.ts` and `app/globals.css` to customize the color scheme:
```css
:root {
  --primary: 240 5.9% 10%;
  --secondary: 240 4.8% 95.9%;
  /* ... more variables */
}
```

### Fonts

### Images
- Replace `/public/favicon.ico` and icon files
- Add project images to public folder or use external URLs
- Update image paths in content files

## 📧 Contact Form Setup

The contact form requires an email service integration. Choose one:

### Option 1: Nodemailer (SMTP)
1. Install: `npm install nodemailer @types/nodemailer`
2. Configure `.env.local`:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   CONTACT_EMAIL=your-email@gmail.com
   ```
3. Uncomment nodemailer code in `/app/api/contact/route.ts`

### Option 2: SendGrid
1. Install: `npm install @sendgrid/mail`
2. Add `SENDGRID_API_KEY` to `.env.local`
3. Update the API route accordingly

### Option 3: Resend
1. Install: `npm install resend`
2. Add `RESEND_API_KEY` to `.env.local`
3. Update the API route accordingly

## 🏗️ Build & Deploy

### Build for Production

## 🚀 Deployment (Public Link)

- **Build Command**: `npm run build`
- **Output Directory**: `.next` (managed by Next.js)
- **Install Command**: `npm install`
### Deploy to Vercel (Recommended - Easiest)

Vercel is built by the creators of Next.js and requires zero configuration.


   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your portfolio repo
   - Vercel auto-detects Next.js - no config needed

3. **Configure Environment Variables** (Optional)
   - Add `NEXT_PUBLIC_SITE_URL` with your domain
   - Add email service credentials if using contact form
   - Variables: Settings → Environment Variables

4. **Deploy**
   - Click "Deploy"
   - Your site goes live in ~60 seconds
   - Auto-deploy on every push to main

**Custom Domain** (Optional):
- Settings → Domains → Add your domain
- Follow DNS configuration instructions

**Config File**: None required! Vercel auto-configures Next.js.

---

### Deploy to Netlify

Netlify supports Next.js with their Essential Next.js plugin.

**Browser-Only Steps:**

1. **Push to GitHub**
   - Create repo and push code

2. **Import to Netlify**
   - Go to [app.netlify.com](https://app.netlify.com) → "Add new site" → "Import"
   - Connect GitHub and select your repo

3. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Netlify auto-detects Next.js

4. **Environment Variables** (Optional)
   - Site settings → Environment variables
   - Add `NEXT_PUBLIC_SITE_URL` and email credentials

5. **Deploy**
   - Click "Deploy site"
   - Auto-deploy enabled by default

**Fix for 404 on Refresh:**
Create `public/_redirects` file (already included in deployment configs):
```
/*    /index.html   200
```

**Config File**: `netlify.toml` (see below in config files section)

---

### Deploy to Cloudflare Pages

Cloudflare Pages offers fast, global CDN deployment.

**Browser-Only Steps:**

1. **Push to GitHub**

2. **Import to Cloudflare**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → Workers & Pages → "Create application" → "Pages" → "Connect to Git"
   - Select your repository

3. **Build Configuration**
   - Framework preset: **Next.js**
   - Build command: `npm run build`
   - Build output directory: `.next`
   - Node version: `18` or higher

4. **Environment Variables** (Optional)
   - Settings → Environment Variables
   - Add `NEXT_PUBLIC_SITE_URL` and credentials

5. **Deploy**
   - Click "Save and Deploy"
   - Live in ~2 minutes

**Fix for 404 on Refresh:**
Create `public/_redirects` file:
```
/*    /index.html   200
```

**Config File**: Not required, but you can use `_redirects` for SPA routing.

---

### Deploy to Render

Render supports full-stack deployments with automatic HTTPS.

**Browser-Only Steps:**

1. **Push to GitHub**

2. **Create Web Service**
   - Go to [dashboard.render.com](https://dashboard.render.com) → "New +" → "Web Service"
   - Connect GitHub repo

3. **Configuration**
   - Name: Your portfolio name
   - Environment: **Node**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Instance Type: Free tier available

4. **Environment Variables**
   - Add `NODE_VERSION=18`
   - Add `NEXT_PUBLIC_SITE_URL`
   - Add email credentials (optional)

5. **Deploy**
   - Click "Create Web Service"
   - Auto-deploy on git push

---

## 📋 Deployment Config Files

### netlify.toml
Create this file in your project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

### public/_redirects (Netlify & Cloudflare)
Create this file in `/public` folder:

```
/*    /index.html   200
```

### vercel.json (Optional - Usually Not Needed)
Vercel auto-configures, but if you need custom headers:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

---

## 🔧 Post-Deployment Checklist

After deploying, complete these steps:

- [ ] Update `portfolioUrl` in `/content/profile.ts` with your live URL
- [ ] Update `NEXT_PUBLIC_SITE_URL` in platform environment variables
- [ ] Test all pages on the live site
- [ ] Test dark mode toggle
- [ ] Test contact form submission
- [ ] Test mobile responsiveness
- [ ] Run Lighthouse audit (aim for 90+ scores)
- [ ] Add custom domain (optional)
- [ ] Enable analytics (Vercel/Cloudflare/Google Analytics)
- [ ] Submit sitemap to Google Search Console
- [ ] Share your portfolio link!

---

## 🌐 Update Live URLs in Portfolio

After deployment, update these files with your actual URLs:

**1. `/content/profile.ts`**
```typescript
portfolioUrl: "https://your-actual-domain.com",
```

**2. `/content/projects.ts`** (for PolyBookShop)
```typescript
links: {
  live: "https://polybookshop-live-url.com",
  github: "https://github.com/yourusername/polybookshop",
},
videoUrl: "https://youtube.com/embed/YOUR_VIDEO_ID", // or /polybookshop-demo.mp4
```

**3. `.env.local`** (add this variable)
```bash
NEXT_PUBLIC_SITE_URL=https://your-actual-domain.com
```

---

### Deploy to Other Platforms
- **AWS Amplify**: Configure build settings (same as above)
- **Railway**: Full stack support with auto-scaling
- **Docker**: Add Dockerfile (Next.js supports standalone output)

---

## 📁 Project Structure

```
Portfolio/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── api/               # API routes
│   ├── contact/           # Contact page
│   ├── experience/        # Experience page
│   ├── projects/          # Projects pages
│   ├── error.tsx          # Error boundary
│   ├── layout.tsx         # Root layout
│   ├── loading.tsx        # Loading state
│   ├── not-found.tsx      # 404 page
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── home/             # Home page components
│   ├── experience/       # Experience components
│   ├── layout/           # Layout components
│   └── ui/               # Reusable UI components
├── content/              # Content data files
│   ├── profile.ts        # Personal info
│   ├── projects.ts       # Project data
│   ├── experience.ts     # Work history
│   └── skills.ts         # Skills & education
├── lib/                  # Utility functions
├── public/               # Static assets
└── package.json          # Dependencies
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run postbuild` - Generate sitemap (runs after build)

## 🎯 Key Technologies

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Theme**: next-themes
- **Icons**: Lucide React
- **Image Optimization**: next/image

## 📱 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## 🤝 Contributing

This is a personal portfolio template. Feel free to fork and customize it for your own use!

## 📄 License

MIT License - feel free to use this for your own portfolio!

## 🙏 Credits

Built with ❤️ by Hussain Mohammed

- Design inspired by modern portfolio best practices
- Icons from [Lucide](https://lucide.dev/)
- Fonts from [Google Fonts](https://fonts.google.com/)

## 📞 Support

If you have questions or run into issues:
1. Check the documentation above
2. Review the example content files
3. Open an issue on GitHub
4. Contact me at hussain@example.com

---

**Note**: Remember to replace all placeholder content with your actual information before deploying!

### Quick Checklist Before Deployment:
- [ ] Update all content in `/content` folder
- [ ] Replace placeholder images
- [ ] Configure email service for contact form
- [ ] Update social media links
- [ ] Add your resume PDF to `/public`
- [ ] Update `NEXT_PUBLIC_SITE_URL` in `.env.local`
- [ ] Test on mobile devices
- [ ] Run `npm run build` to check for errors
- [ ] Set up analytics (optional)
