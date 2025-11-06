# CableWorld Mockups & Test Screens

This folder contains interactive HTML mockups and test screens for both web and mobile applications of the CableWorld platform.

## 📁 Folder Structure

```
mockups/
├── index.html              # Main navigation page for all mockups
├── README.md              # This file
├── web/                   # Web application mockups
│   ├── 01-homepage.html
│   ├── 02-quote-upload.html
│   └── 03-quote-results.html
├── mobile/                # Mobile application mockups
│   ├── 01-welcome-screen.html
│   ├── 02-home-screen.html
│   ├── 03-quote-upload.html
│   └── 04-order-tracking.html
└── assets/                # Shared assets (currently empty)
```

## 🚀 Getting Started

### Viewing Mockups

1. **Open Index Page**: Open `mockups/index.html` in your web browser to see all available mockups
2. **Direct Access**: Navigate to specific mockup files in `web/` or `mobile/` folders
3. **Live Server**: For best experience, use a local web server:
   ```bash
   # Python 3
   cd mockups
   python -m http.server 8000

   # Node.js (if you have http-server installed)
   npx http-server mockups -p 8000
   ```
   Then open http://localhost:8000

## 📱 Mobile Mockups

All mobile mockups are designed with iPhone-style frames (375x812px) to simulate the actual mobile experience.

### Available Mobile Screens

1. **Welcome Screen** (`mobile/01-welcome-screen.html`)
   - Onboarding experience
   - App features showcase
   - Get Started and Sign In CTAs

2. **Home Screen** (`mobile/02-home-screen.html`)
   - Dashboard with stats
   - Recent orders list
   - Quick action buttons
   - Bottom tab navigation

3. **Quote Upload** (`mobile/03-quote-upload.html`)
   - Three upload methods: Camera, Photo Library, Files
   - Supported format display
   - Feature highlights

4. **Order Tracking** (`mobile/04-order-tracking.html`)
   - Interactive map placeholder
   - Real-time tracking status
   - Timeline with shipping updates
   - Delivery information

## 💻 Web Mockups

Full-width responsive mockups showcasing the desktop experience.

### Available Web Screens

1. **Homepage** (`web/01-homepage.html`)
   - Hero section with gradient background
   - Statistics showcase
   - Feature grid (6 features)
   - How It Works (4 steps)
   - Call-to-action section
   - Footer with multiple columns

2. **Quote Upload** (`web/02-quote-upload.html`)
   - Large drag-and-drop upload zone
   - Supported format badges
   - Feature cards
   - Sample diagram library
   - Stats in dark gradient card

3. **Quote Results** (`web/03-quote-results.html`)
   - Two-column layout (main content + sidebar)
   - Harness specifications with confidence score
   - Components table with availability
   - DFM (Design for Manufacturing) analysis
   - Price breakdown card
   - What's Next information

## 🎨 Design System

### Colors

```css
Primary: #092c47    /* Dark Blue */
Accent:  #13bf87    /* Green */
Yellow:  #ffc118    /* Warning/Highlight */
Purple:  #4800e3    /* Tertiary Accent */
```

### Typography

- Font Family: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif`
- Headings: Bold (700) with varying sizes
- Body: Regular (400) at 1rem base size

### Components

- **Cards**: White background, rounded corners (1rem), subtle shadow
- **Buttons**: Primary (green), Secondary (outlined), with hover states
- **Badges**: Small labels with background color coding
- **Navigation**: Sticky header (web), bottom tabs (mobile)

## 🧪 Testing Purposes

These mockups are designed for:

1. **User Testing**: Share with users to gather feedback on UI/UX
2. **Stakeholder Demos**: Present to investors, partners, or team members
3. **Development Reference**: Visual guide for frontend developers
4. **Design Validation**: Test color schemes, layouts, and interactions
5. **Marketing Materials**: Screenshots for pitch decks and documentation

## 📊 Technical Details

### Web Mockups

- **Framework Reference**: Next.js 14 with App Router
- **Styling**: Inline CSS (for standalone viewing)
- **Layout**: Responsive grid system
- **Components**: Navigation, Hero, Cards, Tables, Forms

### Mobile Mockups

- **Framework Reference**: React Native 0.73
- **Device**: iPhone X/11/12/13/14 frame (375x812px)
- **Components**: Bottom tabs, Status bar, Headers, Cards
- **Interactions**: Hover states, transitions, animations

## 🔄 Updates

To update mockups:

1. Edit the HTML files directly
2. Maintain consistent styling with existing design system
3. Update `index.html` if adding new mockups
4. Test in multiple browsers (Chrome, Safari, Firefox)

## 📝 Notes

- All mockups are **standalone HTML files** with inline CSS
- No external dependencies required
- Safe to share via email, cloud storage, or GitHub
- Mobile mockups include device frame for realistic presentation
- All interactive elements are visual only (no backend integration)

## 🔗 Related Documentation

- Main Project: `/README.md`
- Website Code: `/website`
- Mobile Code: `/mobile`
- Business Plan: `/docs/BUSINESS_PLAN.md`
- API Integrations: `/docs/API_INTEGRATIONS.md`

## 📧 Feedback

For questions or suggestions about these mockups, please:
- Open an issue on GitHub
- Contact the development team
- Submit a pull request with improvements

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Mockup Count**: 7 screens (3 web + 4 mobile)
