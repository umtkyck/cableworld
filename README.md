# CableWorld - Cable & Wire Harness Manufacturing Platform

Complete digital platform for instant cable harness manufacturing with AI-powered quoting, global manufacturer network, and seamless ordering.

## 🎯 Project Overview

CableWorld revolutionizes the cable and wire harness industry by providing instant quotes (< 60 seconds), automated design parsing, and access to a global network of vetted manufacturers. Think "Xometry for Cable Harnesses."

## 📁 Repository Structure

```
cableworld/
├── docs/                           # Business & technical documentation
│   ├── BUSINESS_PLAN.md           # Complete business plan
│   ├── DIAGRAM_INPUT_SYSTEM.md    # User flow & technical architecture
│   ├── QUOTING_SYSTEM.md          # Fast quoting engine architecture
│   ├── API_INTEGRATIONS.md        # Supplier & manufacturer APIs
│   ├── PAYMENT_SYSTEM.md          # Payment processing system
│   └── VIDEO_ADVERTISEMENTS.md    # Marketing video scripts
│
├── website/                        # Next.js web application
│   ├── app/                       # Next.js 14 app directory
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Homepage
│   │   └── quote/                # Quote flow pages
│   ├── components/                # React components
│   │   ├── Navigation.tsx        # Site navigation
│   │   ├── Footer.tsx            # Site footer
│   │   └── home/                 # Homepage sections
│   └── package.json              # Dependencies
│
├── mobile/                         # React Native mobile apps
│   ├── src/
│   │   ├── screens/              # Mobile screens
│   │   ├── components/           # Reusable components
│   │   ├── navigation/           # App navigation
│   │   ├── services/             # API services
│   │   └── theme/                # Design system
│   ├── ios/                      # iOS native code
│   ├── android/                  # Android native code
│   └── package.json              # Dependencies
│
├── backend/                        # Backend services
│   ├── api/                      # REST API
│   │   ├── auth/                # Authentication endpoints
│   │   ├── quotes/              # Quote generation
│   │   ├── orders/              # Order management
│   │   └── payments/            # Payment processing
│   ├── services/                 # Business logic
│   │   ├── parser/              # AI diagram parsing
│   │   ├── pricing/             # Price calculation
│   │   └── suppliers/           # Supplier integrations
│   └── database/                 # Database schemas
│
├── infrastructure/                # DevOps & deployment
│   ├── docker/                   # Docker configurations
│   ├── kubernetes/               # K8s manifests
│   ├── terraform/                # Infrastructure as code
│   └── scripts/                  # Deployment scripts
│
└── README.md                      # This file
```

## 🚀 Quick Start

### Website (Next.js)
```bash
cd website
npm install
npm run dev
# Visit http://localhost:3000
```

### Mobile App (React Native)
```bash
cd mobile
npm install
npm run android  # or npm run ios
```

### Backend API
```bash
cd backend
npm install
npm run dev
# API runs on http://localhost:8000
```

## 📚 Documentation

All comprehensive documentation is in the `/docs` folder:

- **[Business Plan](docs/BUSINESS_PLAN.md)** - Market analysis, revenue model, go-to-market strategy
- **[Diagram Input System](docs/DIAGRAM_INPUT_SYSTEM.md)** - AI parsing & component matching
- **[Quoting System](docs/QUOTING_SYSTEM.md)** - Fast quote generation architecture
- **[API Integrations](docs/API_INTEGRATIONS.md)** - Digikey, Mouser, manufacturer APIs
- **[Payment System](docs/PAYMENT_SYSTEM.md)** - Multi-payment processing
- **[Video Ads](docs/VIDEO_ADVERTISEMENTS.md)** - Marketing video scripts

## 🎨 Design System

### Colors
- **Primary**: `#092c47` (Dark Blue)
- **Accent Green**: `#13bf87`
- **Accent Yellow**: `#ffc118`
- **Accent Blue**: `#4800e3`

### Typography
- **Display**: Helvetica Neue
- **Body**: Inter

## 🔧 Technology Stack

### Frontend
- **Web**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Mobile**: React Native 0.73, TypeScript

### Backend
- **API**: Node.js, Express, TypeScript
- **Database**: PostgreSQL, Redis, MongoDB
- **Queue**: BullMQ
- **Storage**: AWS S3

### AI/ML
- **Parsing**: OpenAI GPT-4 Vision, Custom CNN
- **OCR**: Google Cloud Vision
- **DFM**: Custom rule engine

### Infrastructure
- **Hosting**: AWS, Vercel
- **CI/CD**: GitHub Actions
- **Monitoring**: Datadog, Sentry

## 📦 Key Features

### For Website
- ✅ Instant quote generation (< 60 seconds)
- ✅ AI-powered diagram parsing
- ✅ 3D harness visualization
- ✅ Real-time component pricing
- ✅ DFM analysis
- ✅ Multi-payment support

### For Mobile
- ✅ Camera-based diagram upload
- ✅ Push notifications for order updates
- ✅ Real-time order tracking
- ✅ Offline quote drafts
- ✅ Fingerprint/Face ID authentication

## 🌟 Business Metrics

- **Target**: $5M ARR in Year 1
- **Quote Speed**: < 60 seconds
- **Conversion Rate**: 25-35%
- **Customer Satisfaction**: > 4.5/5
- **On-Time Delivery**: > 95%

## 🔐 Environment Variables

Create `.env` files in each directory:

### Website (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_STRIPE_KEY=pk_test_...
```

### Backend (.env)
```env
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
OPENAI_API_KEY=sk-...
STRIPE_SECRET_KEY=sk_test_...
DIGIKEY_CLIENT_ID=...
MOUSER_API_KEY=...
```

### Mobile (.env)
```env
API_URL=http://localhost:8000
GOOGLE_MAPS_API_KEY=...
```

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## 📝 Development Workflow

1. **Planning**: Review business documentation
2. **Design**: Follow design system in Figma
3. **Development**: Build features with tests
4. **Review**: Code review required
5. **Deploy**: Automated CI/CD pipeline

## 🧪 Testing

```bash
# Website
cd website && npm test

# Mobile
cd mobile && npm test

# Backend
cd backend && npm test
```

## 📈 Roadmap

### Phase 1: MVP (Months 1-3)
- [x] Business plan & documentation
- [x] Website design & development
- [ ] Mobile app development
- [ ] Backend API development
- [ ] AI parsing engine
- [ ] Payment integration

### Phase 2: Beta (Months 4-6)
- [ ] Manufacturer onboarding (10 partners)
- [ ] Beta customer testing
- [ ] API integrations (Digikey, Mouser)
- [ ] 3D visualization
- [ ] Real-time quoting

### Phase 3: Launch (Months 7-12)
- [ ] Public launch
- [ ] Marketing campaigns
- [ ] Scale to 50+ manufacturers
- [ ] Enterprise features
- [ ] Mobile app launch

## 📞 Support

- **Email**: support@cableworld.com
- **Website**: https://cableworld.com
- **Documentation**: https://docs.cableworld.com

## 📄 License

Copyright © 2024 CableWorld. All rights reserved.

## 🏆 Team

- **CEO/Founder**: [Name]
- **CTO**: [Name]
- **Lead Engineer**: [Name]
- **Product Designer**: [Name]

---

**Built with ❤️ by the CableWorld Team**
