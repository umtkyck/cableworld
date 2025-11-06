# 🚀 Deploy CableWorld Website to Free Domain

Get your CableWorld website live on the internet in under 10 minutes with a free domain!

## 📋 Quick Options

| Service | Free Domain | Best For | Deploy Time | SSL |
|---------|-------------|----------|-------------|-----|
| **Vercel** ⭐ | yourapp.vercel.app | Next.js apps | 2 min | ✅ Free |
| **Netlify** | yourapp.netlify.app | Static sites | 3 min | ✅ Free |
| **Railway** | yourapp.railway.app | Full-stack apps | 5 min | ✅ Free |
| **Render** | yourapp.onrender.com | Any app | 5 min | ✅ Free |

**Recommended: Vercel** - Made by Next.js creators, perfect integration!

---

## 🌟 Option 1: Vercel (Recommended)

**Why Vercel?**
- ✅ Built specifically for Next.js
- ✅ Automatic deployments from GitHub
- ✅ Free SSL certificate
- ✅ Free subdomain (cableworld.vercel.app)
- ✅ Serverless functions support
- ✅ Environment variables
- ✅ Automatic preview deployments for PRs

### Step-by-Step Deployment

#### 1. Push to GitHub (if not already done)

```bash
# Already done! Your code is at:
# https://github.com/umtkyck/cableworld
```

#### 2. Sign up for Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub

#### 3. Import Your Project

1. Click **"Add New"** → **"Project"**
2. Find **"cableworld"** repository
3. Click **"Import"**

#### 4. Configure Build Settings

Vercel will auto-detect Next.js. Verify these settings:

```
Framework Preset: Next.js
Root Directory: website
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

#### 5. Add Environment Variables

Click **"Environment Variables"** and add:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
```

#### 6. Deploy!

1. Click **"Deploy"**
2. Wait 1-2 minutes
3. Your site will be live at: **`cableworld.vercel.app`** (or similar)

#### 7. Custom Domain (Optional - Free)

Vercel gives you `cableworld.vercel.app` for free, but you can also:

**Option A: Use Vercel's domain**
- Already done! Use `cableworld.vercel.app`

**Option B: Connect free domain from Freenom**
1. Get free domain from [freenom.com](https://freenom.com) (.tk, .ml, .ga, .cf, .gq)
2. In Vercel: **Settings** → **Domains**
3. Add your domain (e.g., `cableworld.tk`)
4. Update DNS records at Freenom:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cableworld.vercel.app
   ```

**Option C: Use GitHub Pages subdomain**
- Get `username.github.io/cableworld` (see Option 3 below)

---

## 🎨 Option 2: Netlify

**Why Netlify?**
- ✅ Great for static sites
- ✅ Free subdomain
- ✅ Drag-and-drop deployment
- ✅ Form handling
- ✅ Split testing

### Quick Deploy

#### Method 1: GitHub Integration

1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click **"Add new site"** → **"Import an existing project"**
4. Select **GitHub** → **cableworld**
5. Configure:
   ```
   Base directory: website
   Build command: npm run build
   Publish directory: .next
   ```
6. Add environment variables
7. Click **"Deploy site"**

Your site: `random-name-123.netlify.app`

#### Method 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Go to website folder
cd website

# Build
npm run build

# Deploy
netlify deploy --prod
```

#### Custom Domain

In Netlify dashboard:
1. **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Follow DNS instructions

---

## 🚂 Option 3: Railway

**Why Railway?**
- ✅ Good for full-stack apps
- ✅ Database hosting included
- ✅ Easy environment variables
- ✅ GitHub integration

### Deploy Steps

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select **cableworld**
5. Add environment variables:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   ```
6. Railway auto-detects Next.js and deploys

Your site: `cableworld.railway.app`

---

## 🎯 Option 4: Render

**Why Render?**
- ✅ Free SSL
- ✅ Auto-deploy from GitHub
- ✅ Good documentation

### Deploy Steps

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click **"New"** → **"Web Service"**
4. Connect **cableworld** repository
5. Settings:
   ```
   Name: cableworld
   Root Directory: website
   Build Command: npm install && npm run build
   Start Command: npm start
   ```
6. Add environment variables
7. Click **"Create Web Service"**

Your site: `cableworld.onrender.com`

---

## 🆓 Free Domain Options

### 1. Freenom (Completely Free)

**Free domains**: .tk, .ml, .ga, .cf, .gq

1. Go to [freenom.com](https://freenom.com)
2. Search for available domain (e.g., "cableworld")
3. Select domain → **"Get it now"**
4. Checkout (it's free!)
5. Manage DNS in Freenom
6. Connect to Vercel/Netlify

**Example**: `cableworld.tk` or `cableworld.ml`

### 2. EU.org (Free Subdomain)

**Free domains**: yourname.eu.org

1. Go to [nic.eu.org](https://nic.eu.org)
2. Register account
3. Request subdomain
4. Wait for approval (1-2 days)
5. Configure DNS

**Example**: `cableworld.eu.org`

### 3. GitHub Pages

**Free domain**: username.github.io/cableworld

1. Enable GitHub Pages in repo settings
2. Deploy static export

**Example**: `umtkyck.github.io/cableworld`

### 4. Free DNS from Cloudflare

Use Cloudflare for:
- Free SSL
- CDN
- DDoS protection
- DNS management

1. Sign up at [cloudflare.com](https://cloudflare.com)
2. Add your domain (from Freenom or elsewhere)
3. Update nameservers
4. Enable free features

---

## 🔧 Vercel CLI Deployment (Advanced)

For developers who prefer command line:

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Go to project
cd website

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Add environment variables
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
vercel env add STRIPE_SECRET_KEY
```

---

## 📝 Pre-Deployment Checklist

Before deploying, make sure:

- [ ] Code is pushed to GitHub
- [ ] Website builds locally (`npm run build`)
- [ ] Environment variables are ready
- [ ] Stripe keys are configured
- [ ] No sensitive data in code
- [ ] `.env.local` is in `.gitignore`
- [ ] API routes are working

---

## 🎨 After Deployment

### 1. Test Your Live Site

Visit your deployment URL and test:
- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] Quote upload page works
- [ ] Styling looks correct
- [ ] Mobile responsive
- [ ] Checkout page loads
- [ ] Forms work (if any)

### 2. Configure Custom Domain (Optional)

If using Vercel with Freenom domain:

**At Freenom:**
```
Type: A Record
Name: @
Target: 76.76.21.21

Type: CNAME
Name: www
Target: cableworld.vercel.app
```

**At Vercel:**
1. Go to project settings
2. Click **Domains**
3. Add your custom domain
4. Wait for DNS propagation (5 min - 24 hours)

### 3. Set Up Analytics (Optional)

Vercel includes free analytics:
1. Go to project dashboard
2. Click **Analytics** tab
3. View visitor stats, page views, etc.

### 4. Enable Preview Deployments

Every PR automatically gets a preview URL:
- Push to branch → automatic preview
- Share preview link for testing
- Merge to main → deploy to production

---

## 🚨 Troubleshooting

### Build Fails

**Error**: `npm install failed`
```bash
# Solution: Check package.json is valid
cd website
npm install
npm run build
```

**Error**: `Module not found`
```bash
# Solution: Install missing dependencies
npm install
```

### Environment Variables Not Working

**Problem**: Stripe keys not working on deployed site

**Solution**:
1. Check variables are added in Vercel/Netlify dashboard
2. Redeploy after adding variables
3. Verify variable names match exactly
4. Web variables must start with `NEXT_PUBLIC_` to be accessible client-side

### Domain Not Connecting

**Problem**: Custom domain shows error

**Solution**:
1. Wait 24 hours for DNS propagation
2. Check DNS records are correct
3. Verify nameservers at domain registrar
4. Use [whatsmydns.net](https://whatsmydns.net) to check propagation

### Site is Slow

**Solution**:
1. Enable CDN (Cloudflare)
2. Optimize images
3. Use Vercel Image Optimization
4. Enable caching

---

## 💰 Cost Comparison

| Service | Free Tier | Paid Plans | Best For |
|---------|-----------|------------|----------|
| **Vercel** | Unlimited sites, 100GB bandwidth | $20/mo | Next.js apps |
| **Netlify** | 100GB bandwidth | $19/mo | Static sites |
| **Railway** | $5 free credit/mo | $5/mo usage | Full-stack |
| **Render** | 750 hours/mo | $7/mo | Any app |

**Recommendation**: Start with Vercel free tier - perfect for CableWorld!

---

## 🎯 Recommended Setup (Best & Free)

```
✅ Hosting: Vercel (free)
✅ Domain: cableworld.vercel.app (free)
✅ SSL: Vercel SSL (free)
✅ CDN: Vercel Edge Network (free)
✅ Analytics: Vercel Analytics (free)
✅ Total Cost: $0/month
```

**Upgrade Later**:
- Custom domain: $10-15/year
- Vercel Pro: $20/month (if needed)
- Database: Railway/Supabase (free tier)

---

## 📱 Next Steps

1. **Deploy Now**: Follow Option 1 (Vercel) above
2. **Test Site**: Visit your .vercel.app URL
3. **Share Link**: Send link to stakeholders
4. **Collect Feedback**: Use deployed site for demos
5. **Custom Domain**: Add when ready (optional)

---

## 🔗 Useful Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Netlify Dashboard**: https://app.netlify.com
- **Freenom**: https://freenom.com (free domains)
- **Cloudflare**: https://cloudflare.com (free DNS/CDN)
- **Check DNS**: https://whatsmydns.net
- **SSL Check**: https://www.ssllabs.com/ssltest

---

## 🎬 Quick Start (TL;DR)

**Fastest way to deploy right now:**

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import `cableworld` repository
4. Set root directory to `website`
5. Add Stripe environment variables
6. Click Deploy
7. Get your free `cableworld.vercel.app` domain

**Done in 5 minutes!** ✨

---

**Questions?** The CableWorld website will be live and accessible worldwide with free SSL, CDN, and automatic deployments from GitHub!
