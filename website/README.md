# Loombotic Website

Modern, professional website for Loombotic - the instant cable harness manufacturing platform.

## Features

- **🎨 Modern Design**: Clean, professional UI inspired by Xometry with Tailwind CSS
- **⚡ Next.js 14**: Built with the latest Next.js App Router for optimal performance
- **📱 Fully Responsive**: Mobile-first design that works on all devices
- **🎭 Smooth Animations**: Framer Motion animations and custom CSS transitions
- **🎯 Conversion Optimized**: Designed to guide users to get quotes quickly
- **♿ Accessible**: WCAG 2.1 AA compliant

## Pages

- **Homepage** (`/`): Hero section, features, how it works, benefits, testimonials, CTA
- **Quote Page** (`/quote`): Interactive file upload with drag-and-drop
- **Navigation**: Full-featured nav with dropdowns
- **Footer**: Comprehensive footer with links and social media

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS 3.4
- **Language**: TypeScript
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

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

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

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

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

## License

Copyright © 2024 Loombotic. All rights reserved.

## Support

For questions or issues, contact: support@loombotic.com
