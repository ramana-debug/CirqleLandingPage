# Cirqle Landing Page 

A modern, responsive landing page built with React TypeScript for the Cirqle mobile application by Cirqlelife.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **TypeScript**: Built with TypeScript for type safety and better development experience
- **SEO Optimized**: Includes proper meta tags, structured data, and semantic HTML
- **Performance**: Optimized for fast loading and smooth interactions
- **Accessible**: Built with accessibility best practices
- **Screenshot Slideshow**: Dynamic app preview with rotating screenshots
- **Professional Branding**: Cirqle by Cirqlelife branding throughout

## 📱 Sections

1. **Hero Section**: Eye-catching introduction with app slideshow and floating elements
2. **Features**: Showcase of key app features with interactive cards
3. **Screenshots**: Visual preview of the app interface
4. **Download**: App store download links and additional features
5. **Footer**: Contact information and company details

## 🛠️ Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Navigate to your project directory:**
   ```bash
   cd landing-page
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:3000
   ```

## 📝 Customization

### Update App Store Links

In `src/App.tsx`, update the download links in the `DownloadSection` component:

```typescript
// App Store Button
href="https://apps.apple.com/app/your-app" // Replace with your actual App Store link

// Google Play Button  
href="https://play.google.com/store/apps/details?id=your.app" // Replace with your actual Play Store link
```

### Add Real App Screenshots

Replace the placeholder slideshow content in the `AppSlideshow` component with your actual app screenshots.

### Update Contact Information

Contact email is already set to: `ramana.g@cirqlelife.com`

### Update Meta Tags

In `public/index.html`, the meta tags are already configured for Cirqle by Cirqlelife.

### Customize Colors

The app uses a consistent color scheme:
- Primary: `#1f787c`
- Secondary: `#10b981`
- Text: `#1a2038`
- Gray: `#6b7280`

## 🎨 Key Components

- **Header**: Fixed navigation with logo and menu
- **AppSlideshow**: Auto-rotating screenshot carousel
- **HeroSection**: Main landing area with CTA buttons
- **FeaturesSection**: 6 feature cards with hover effects
- **ScreenshotsSection**: App preview mockups
- **DownloadSection**: App store buttons and feature highlights
- **Footer**: Company information and links

## 📱 Mobile Optimization

- Responsive grid layouts
- Touch-friendly button sizes
- Optimized font sizes for mobile
- Hidden floating elements on mobile
- Collapsible navigation menu
- Mobile-first design approach

## 🔧 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🚀 Deployment Options

### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`

### Vercel
1. Import your project
2. Framework preset: Create React App
3. Deploy

### GitHub Pages
```bash
npm run deploy
```

## 📊 Performance Features

- Professional SVG icons (no emoji dependencies)
- Optimized animations with CSS transforms
- Minimal external dependencies
- Responsive images and layouts
- Compressed production build
- Lazy loading ready

## 🔍 SEO Features

- Semantic HTML structure
- Meta tags for social media sharing
- Structured data markup (JSON-LD)
- Proper heading hierarchy
- Fast loading times
- Mobile-friendly design

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📞 Contact

For any questions or support:
- Email: ramana.g@cirqlelife.com
- Website: www.cirqlelife.com

## 🏢 About

**Cirqle** is a smart asset management platform developed by **Cirqlelife**. The platform helps users track portfolios, monitor properties, and manage assets with intelligent insights.

## 📄 License

© 2025 Cirqlelife. All rights reserved.

---

**Built with ❤️ in India for Cirqlelife**
