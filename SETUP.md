# 🚀 QUICK SETUP GUIDE

This guide will help you get your portfolio up and running in minutes!

## Step 1: Install Dependencies ✅

Already done! If you need to reinstall:
```bash
npm install
```

## Step 2: Customize Your Content 📝

### A. Personal Information (`/content/profile.ts`)
Replace placeholder data with your information:
- Name, role, tagline
- Email, location, availability
- Social media links (GitHub, LinkedIn, Twitter)
- Skills list
- Resume URL

### B. Projects (`/content/projects.ts`)
Add your projects:
- Update project details (title, description, role, year)
- Replace image URLs with your project screenshots
- Add live demo and GitHub links
- Describe problem, solution, impact
- List tech stack and key features

**Pro Tip**: Use [Unsplash](https://unsplash.com) for temporary project images.

### C. Experience (`/content/experience.ts`)
Add your work history:
- Company, role, dates, location
- Key achievements (be specific!)
- Technologies used
- Education and certifications

### D. Skills (`/content/skills.ts`)
Organize your skills:
- Frontend, Backend, DevOps, Tools
- Update education details
- Add certifications

## Step 3: Set Up Images 🖼️

### Required Images:
1. **Favicon & Icons** (in `/public`):
   - `favicon.ico`
   - `apple-touch-icon.png`
   - `og-image.png` (1200x630px for social sharing)

2. **Project Images**:
   - Hero images (1200x600px recommended)
   - Gallery images (800x600px recommended)
   - Use high-quality screenshots or mockups

### Quick Image Resources:
- **Mockups**: [Shots.so](https://shots.so), [Screely](https://screely.com)
- **Free Photos**: [Unsplash](https://unsplash.com), [Pexels](https://pexels.com)
- **Favicon Generator**: [RealFaviconGenerator](https://realfavicongenerator.net)

## Step 4: Configure Email (Contact Form) 📧

Choose one email service:

### Option A: Gmail (Easiest)
1. Enable 2FA on your Gmail account
2. Generate an app password: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Create `.env.local`:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   CONTACT_EMAIL=your-email@gmail.com
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```
4. Install nodemailer:
   ```bash
   npm install nodemailer @types/nodemailer
   ```
5. Uncomment nodemailer code in `/app/api/contact/route.ts`

### Option B: SendGrid (Recommended for Production)
1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Create API key
3. Add to `.env.local`:
   ```env
   SENDGRID_API_KEY=your-api-key
   CONTACT_EMAIL=your-email@example.com
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```
4. Update `/app/api/contact/route.ts` with SendGrid code

### Option C: Skip for Now
The form will log submissions to console. Configure later!

## Step 5: Test Locally 🧪

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and check:
- [ ] All pages load correctly
- [ ] Navigation works
- [ ] Dark mode toggle works
- [ ] Command Palette (Cmd/Ctrl+K) works
- [ ] Contact form validates input
- [ ] Project filtering works
- [ ] Mobile responsive design looks good

## Step 6: Build & Deploy 🚀

### Test Production Build:
```bash
npm run build
npm run start
```

### Deploy to Vercel (5 minutes):
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repo
5. Add environment variables (from `.env.local`)
6. Deploy!

### Other Platforms:
- **Netlify**: Connect GitHub repo, configure build settings
- **AWS Amplify**: Similar to Netlify
- **Self-hosted**: Run `npm run build` and serve the `.next` folder

## Customization Tips 🎨

### Change Colors:
Edit `app/globals.css` (lines 4-45) - update HSL values:
```css
--primary: 240 5.9% 10%;  /* Change to your brand color */
```

### Change Fonts:
Edit `app/layout.tsx` (lines 8-18):
```typescript
import { YourFont } from "next/font/google";
```

### Modify Layout:
- Navbar: `/components/layout/navbar.tsx`
- Footer: `/components/layout/footer.tsx`
- Theme: `/components/theme-provider.tsx`

## Common Issues & Solutions 🔧

### "Module not found" errors
```bash
npm install
```

### Images not loading
- Check image URLs in content files
- Ensure images are in `/public` folder
- Verify `next.config.mjs` has correct domains

### Contact form not working
- Check console for errors
- Verify `.env.local` file exists and has correct values
- Test with a simple console.log in API route

### Build errors
```bash
npm run lint  # Check for code issues
npm run build # See specific error messages
```

## Next Steps 🎯

Once your portfolio is live:
1. **Add Analytics**: Google Analytics, Plausible, or Vercel Analytics
2. **Set Up SEO**: Update metadata in each page
3. **Create Resume**: Add PDF to `/public/resume.pdf`
4. **Share**: Add your portfolio URL to LinkedIn, GitHub, Twitter
5. **Iterate**: Update projects and content regularly

## Need Help? 💬

- Review the main [README.md](README.md)
- Check component code for examples
- Look at the content files for structure
- Test each feature step by step

---

## Quick Reference 📋

### Important Files:
- **Content**: `/content/*.ts`
- **Config**: `.env.local`, `next.config.mjs`
- **Styles**: `app/globals.css`, `tailwind.config.ts`
- **Components**: `/components/ui/*.tsx`

### Commands:
- `npm run dev` - Development
- `npm run build` - Production build
- `npm run start` - Run production
- `npm run lint` - Check code

### Ports:
- Dev: [http://localhost:3000](http://localhost:3000)
- Production: [http://localhost:3000](http://localhost:3000)

---

**You're all set! 🎉 Start by editing `/content/profile.ts` and see your changes live!**
