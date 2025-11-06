# 🚀 Deploy CableWorld in 5 Minutes

**Get your website live RIGHT NOW with these simple steps!**

---

## 🌟 Recommended: Vercel (Easiest & Free)

### Step 1: Open Vercel (30 seconds)

👉 **Click here**: [https://vercel.com/new](https://vercel.com/new)

### Step 2: Sign In with GitHub (30 seconds)

1. Click **"Continue with GitHub"**
2. Authorize Vercel

### Step 3: Import Repository (1 minute)

1. Find **"cableworld"** in the list
2. Click **"Import"**
3. Set **Root Directory** to: `website`
4. Click **"Deploy"**

### Step 4: Add Environment Variables (2 minutes)

While it's deploying, add your Stripe keys:

1. Go to **"Settings"** → **"Environment Variables"**
2. Add these variables:

```
Name: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
Value: pk_test_YOUR_KEY_FROM_STRIPE

Name: STRIPE_SECRET_KEY
Value: sk_test_YOUR_KEY_FROM_STRIPE
```

3. Click **"Save"**
4. Click **"Redeploy"** to apply changes

### Step 5: Get Your URL! (1 minute)

Your website is now live at:
```
https://cableworld-xxx.vercel.app
```

**That's it!** 🎉

---

## ✅ What You Get (All Free!)

✨ **Free subdomain**: cableworld.vercel.app
✨ **Free SSL certificate**: Automatic HTTPS
✨ **Free hosting**: Unlimited websites
✨ **Free bandwidth**: 100GB/month
✨ **Free CDN**: Global edge network
✨ **Auto-deploy**: Every push to GitHub
✨ **Preview URLs**: For every pull request

---

## 🎯 Quick Test

Once deployed, test your live site:

1. **Homepage**: `https://your-site.vercel.app`
2. **Quote Page**: `https://your-site.vercel.app/quote`
3. **Checkout**: `https://your-site.vercel.app/checkout?quote_id=TEST&amount=100`

Use test card: **4242 4242 4242 4242**

---

## 🎨 Custom Domain (Optional)

Want `cableworld.com` instead of `cableworld.vercel.app`?

### Free Options:

**Option 1: Free Domain from Freenom**

1. Go to [freenom.com](https://freenom.com)
2. Search for "cableworld"
3. Choose .tk, .ml, .ga, .cf, or .gq (all free!)
4. Register (it's free)
5. In Vercel, add your custom domain
6. Update DNS at Freenom

**Example**: `cableworld.tk` or `cableworld.ml`

**Option 2: Keep Vercel Domain**

Just use your free `cableworld.vercel.app` - it works perfectly!

---

## 🔧 Get Your Stripe Keys

Don't have Stripe keys yet?

1. Go to [stripe.com/register](https://stripe.com/register)
2. Sign up (free)
3. Go to **Developers** → **API Keys**
4. Copy **Publishable key** (starts with `pk_test_`)
5. Click **"Reveal test key"** and copy **Secret key** (starts with `sk_test_`)

Use these in Vercel environment variables (Step 4 above).

---

## 🎬 Alternative: One-Click Deploy

Click this button to deploy instantly:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/umtkyck/cableworld&root-directory=website&env=NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,STRIPE_SECRET_KEY&envDescription=Stripe%20API%20keys%20for%20payment%20processing&project-name=cableworld&repository-name=cableworld)

*Note: You'll need to set environment variables after deployment*

---

## 🐛 Troubleshooting

### Build Failed?

**Check these:**
- ✅ Root directory is set to `website`
- ✅ Build command is `npm run build`
- ✅ Node version is 18 or higher

**Fix**: In Vercel → **Settings** → **General** → verify settings

### Environment Variables Not Working?

**Fix**:
1. Add variables in Vercel dashboard
2. Make sure names match exactly
3. Click **"Redeploy"** after adding

### Can't See Changes?

**Fix**:
1. Push changes to GitHub
2. Vercel auto-deploys in 1-2 minutes
3. Check **Deployments** tab for status

---

## 📱 What's Next?

Now that your site is live:

1. ✅ **Share the link** with your team
2. ✅ **Test all features** on the live site
3. ✅ **Collect feedback** from users
4. ✅ **Make improvements** (push to GitHub → auto-deploy)
5. ⏭️ **Add custom domain** (optional)
6. ⏭️ **Deploy mobile app** (see mobile deployment guide)

---

## 🎯 Pro Tips

### Automatic Deployments

Every time you push to GitHub:
```bash
git add .
git commit -m "Update homepage"
git push
```
→ Vercel automatically deploys in 1-2 minutes!

### Preview Deployments

Create a new branch:
```bash
git checkout -b new-feature
git push origin new-feature
```
→ Vercel creates a preview URL for testing!

### Monitor Performance

1. Go to Vercel dashboard
2. Click **Analytics**
3. See visitor stats, page speed, etc.

---

## 💡 Need Help?

### Deployment Issues

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Support**: support@vercel.com
- **Community**: https://github.com/vercel/vercel/discussions

### CableWorld Issues

- **GitHub Issues**: https://github.com/umtkyck/cableworld/issues
- **Documentation**: See `DEPLOYMENT.md` for detailed guide

---

## 🎉 Success Checklist

After deployment, you should have:

- [x] Live website at Vercel URL
- [x] SSL certificate (HTTPS)
- [x] Stripe environment variables configured
- [x] Automatic deployments from GitHub
- [x] Website accessible worldwide
- [x] Mobile-responsive design
- [x] Working payment integration

**Congratulations! Your CableWorld website is now LIVE!** 🚀

---

## 🔗 Quick Links

- **Deploy Now**: [vercel.com/new](https://vercel.com/new)
- **Vercel Dashboard**: [vercel.com/dashboard](https://vercel.com/dashboard)
- **Get Stripe Keys**: [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)
- **Free Domains**: [freenom.com](https://freenom.com)
- **Full Deployment Guide**: See `DEPLOYMENT.md`

---

**Total Time**: 5 minutes
**Total Cost**: $0 (completely free!)
**Result**: Professional website live on the internet! ✨
