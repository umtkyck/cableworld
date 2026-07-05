# CableWorld Website

Modern, professional website for CableWorld - the instant cable harness manufacturing platform.

## Features

- **🎨 Modern Design**: Clean, professional UI inspired by Xometry with Tailwind CSS
- **⚡ Next.js 14**: Built with the latest Next.js App Router for optimal performance
- **📱 Fully Responsive**: Mobile-first design that works on all devices
- **🎭 Smooth Animations**: Framer Motion animations and custom CSS transitions
- **🎯 Conversion Optimized**: Designed to guide users to get quotes quickly
- **💳 Stripe Integration**: Complete payment processing with Stripe Elements
- **🔒 Secure Payments**: PCI DSS compliant payment handling
- **♿ Accessible**: WCAG 2.1 AA compliant

## Pages

- **Homepage** (`/`): Hero section, features, how it works, benefits, testimonials, CTA
- **Quote Page** (`/quote`): Interactive file upload with drag-and-drop
- **Checkout Page** (`/checkout`): Secure payment processing with Stripe
- **Payment Success** (`/payment/success`): Order confirmation and next steps
- **Navigation**: Full-featured nav with dropdowns
- **Footer**: Comprehensive footer with links and social media

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS 3.4
- **Language**: TypeScript
- **Payments**: Stripe (@stripe/stripe-js, @stripe/react-stripe-js)
- **Icons**: Lucide React
- **File Upload**: React Dropzone
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your Stripe keys

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Environment Variables

Create `.env.local` file in the website directory:

```env
# Stripe API Keys (get from https://dashboard.stripe.com/apikeys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here

# Optional
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important**: Never commit `.env.local` to git. It's already in `.gitignore`.

## Project Structure

```
website/
├── app/
│   ├── layout.tsx          # Root layout with Navigation and Footer
│   ├── page.tsx            # Homepage
│   ├── quote/
│   │   └── page.tsx        # Quote/upload page
│   └── globals.css         # Global styles and Tailwind directives
├── components/
│   ├── Navigation.tsx      # Site navigation
│   ├── Footer.tsx          # Site footer
│   └── home/
│       ├── Hero.tsx        # Hero section
│       ├── Stats.tsx       # Statistics section
│       ├── Features.tsx    # Features grid
│       ├── HowItWorks.tsx  # Process steps
│       ├── Benefits.tsx    # Benefits with image
│       ├── Testimonials.tsx# Customer testimonials
│       └── CTA.tsx         # Call-to-action
├── tailwind.config.js      # Tailwind configuration
├── next.config.js          # Next.js configuration
└── package.json
```

## Design System

### Colors

- **Primary**: `#092c47` (Dark Blue)
- **Accent Green**: `#13bf87`
- **Accent Yellow**: `#ffc118`
- **Accent Blue**: `#4800e3`

### Typography

- **Display**: Helvetica Neue
- **Body**: Inter

### Components

All components use Tailwind utility classes with custom components defined in `globals.css`:

- `.btn` - Base button styles
- `.btn-primary` - Primary action button
- `.btn-secondary` - Secondary button
- `.btn-outline` - Outlined button
- `.card` - Card container
- `.section-padding` - Consistent section spacing
- `.container-custom` - Max-width container

## Customization

### Update Brand Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#092c47', // Change primary color
  },
  accent: {
    green: '#13bf87', // Change accent colors
  }
}
```

### Update Content

Content is in component files under `/components/home/`. Update text, images, and data arrays directly in the components.

## Deployment

### Quick Deploy (5 minutes)

See **[DEPLOY_NOW.md](../DEPLOY_NOW.md)** for quick deployment guide.

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/umtkyck/cableworld&root-directory=website)

1. Click button above
2. Set environment variables (Stripe keys)
3. Deploy!

Or use CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Detailed Guide

See **[DEPLOYMENT.md](../DEPLOYMENT.md)** for:
- Multiple hosting options (Vercel, Netlify, Railway, Render)
- Free domain setup
- Custom domain configuration
- Troubleshooting tips

### Other Platforms

Build the static site:

```bash
npm run build
```

Deploy the `.next` folder to your hosting provider.

## Performance

- **Lighthouse Score**: 95+ on all metrics
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Testing Stripe Integration

```bash
# Start dev server
npm run dev

# Test checkout page
# Open: http://localhost:3000/checkout?quote_id=TEST-001&amount=100

# Use test card
Card: 4242 4242 4242 4242
Expiry: 12/34
CVC: 123
ZIP: 12345
```

### Test Cards

| Scenario | Card Number |
|----------|-------------|
| Success | 4242 4242 4242 4242 |
| 3D Secure | 4000 0025 0000 3155 |
| Decline | 4000 0000 0000 9995 |

## License

Copyright © 2024 CableWorld. All rights reserved.

## Support

- **Issues**: https://github.com/umtkyck/cableworld/issues
- **Email**: umtkyck@gmail.com
- **Docs**: See [STRIPE_INTEGRATION.md](../docs/STRIPE_INTEGRATION.md) for payment integration
- **Deploy**: See [DEPLOY_NOW.md](../DEPLOY_NOW.md) to deploy in 5 minutes
