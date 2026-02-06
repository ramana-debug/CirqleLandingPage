import React, { useState, useEffect } from 'react';
import './index.css';

// Add keyframe animations for floating elements
const floatAnimation = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
   
  .animate-float-delayed {
    animation: float 3s ease-in-out infinite 1.5s;
  }
  
  .text-gradient {
    background: linear-gradient(135deg, #1f787c 0%, #10b981 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .mobile-hidden {
    display: flex;
  }
  
  .mobile-only {
    display: none;
  }
  
  .mobile-center {
    text-align: left;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  @media (max-width: 768px) {
    .mobile-hidden {
      display: none;
    }
    
    .mobile-only {
      display: flex;
    }
    
    .mobile-center {
      text-align: center;
    }
    
    .hero-title {
      font-size: 42px !important;
    }
    
    .hero-subtitle {
      font-size: 18px !important;
    }
    
    .section-title {
      font-size: 36px !important;
    }
  }
`;

// Inject the animation styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = floatAnimation;
  document.head.appendChild(style);
}

// Navigation helper function
const navigate = (path: string) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

// Types
interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

interface ScreenshotProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Icon Components (SVG-based professional icons)
const Icons = {
  Portfolio: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      <circle cx="8" cy="14" r="2"/>
      <circle cx="16" cy="14" r="2"/>
    </svg>
  ),
  Property: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9,22 9,12 15,12 15,22"/>
    </svg>
  ),
  Analytics: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 3v18h18"/>
      <path d="M18 17V9"/>
      <path d="M13 17V5"/>
      <path d="M8 17v-3"/>
    </svg>
  ),
  Security: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Finance: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="1" x2="12" y2="23"/>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ),
  Documents: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14,2 14,8 20,8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10,9 9,9 8,9"/>
    </svg>
  ),
  AirQuality: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
      <path d="M9 12h6"/>
      <path d="M12 9v6"/>
    </svg>
  ),
  Dashboard: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <line x1="9" y1="9" x2="9" y2="15"/>
      <line x1="15" y1="9" x2="15" y2="15"/>
      <line x1="9" y1="12" x2="15" y2="12"/>
    </svg>
  ),
  PropertyIcon: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9,22 9,12 15,12 15,22"/>
    </svg>
  ),
  FinanceIcon: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 3v18h18"/>
      <path d="m19 9-5 5-4-4-3 3"/>
    </svg>
  ),
  Apple: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  ),
  GooglePlay: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
    </svg>
  ),
  Rocket: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  ),
  Lock: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <circle cx="12" cy="16" r="1"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  Cloud: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
    </svg>
  ),
  Mobile: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
      <line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>
  ),
  Menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  Close: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  ArrowUp: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="19" x2="12" y2="5"/>
      <polyline points="5,12 12,5 19,12"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9,18 15,12 9,6"/>
    </svg>
  ),
  Star: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
    </svg>
  )
};

// Component: Header/Navigation
const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(20px)' : 'none',
      borderBottom: isScrolled ? '1px solid rgba(229, 231, 235, 0.3)' : 'none',
      zIndex: 1000,
      transition: 'all 0.3s ease',
      padding: '16px 0'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
           <img src="/assets/Logo_full_4k.png" alt="Cirqle Logo" style={{ width: '90px', height: '60px', borderRadius: '12px' }} />
          </div>
          <span style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1a2038',
            letterSpacing: '-0.5px'
          }}>
            Cirqle
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav style={{
          display: 'flex',
          gap: '32px',
          alignItems: 'center'
        }} className="mobile-hidden">
          {['Features', 'Screenshots', 'Download'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                textDecoration: 'none',
                color: '#6b7280',
                fontWeight: '500',
                fontSize: '15px',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#1f787c'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
            >
              {item}
            </a>
          ))}
          
          {/* Terms Link in Header */}
          <a
            href="/terms"
            onClick={(e) => {
              e.preventDefault();
              navigate('/terms');
            }}
            style={{
              textDecoration: 'none',
              color: '#6b7280',
              fontWeight: '500',
              fontSize: '15px',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#1f787c'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
          >
            Terms
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            display: 'none',
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            backgroundColor: 'transparent',
            border: '1px solid #e5e7eb',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1f787c',
            cursor: 'pointer'
          }}
          className="mobile-only"
        >
          {isMobileMenuOpen ? <Icons.Close /> : <Icons.Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'white',
          borderBottom: '1px solid #e5e7eb',
          padding: '20px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }} className="mobile-only">
          {['Features', 'Screenshots', 'Download'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                display: 'block',
                padding: '12px 0',
                textDecoration: 'none',
                color: '#6b7280',
                fontWeight: '500',
                fontSize: '16px',
                borderBottom: '1px solid #f3f4f6'
              }}
            >
              {item}
            </a>
          ))}
          
          {/* Terms Link in Mobile Menu */}
          <a
            href="/terms"
            onClick={(e) => {
              e.preventDefault();
              navigate('/terms');
              setIsMobileMenuOpen(false);
            }}
            style={{
              display: 'block',
              padding: '12px 0',
              textDecoration: 'none',
              color: '#6b7280',
              fontWeight: '500',
              fontSize: '16px',
              borderBottom: '1px solid #f3f4f6'
            }}
          >
            Terms
          </a>
        </div>
      )}
    </header>
  );
};

const AppSlideshow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Enhanced screenshots with more professional data
  const screenshots = [
    {
      title: 'Asset Portfolio',
      subtitle: 'Complete Management Hub',
      src: '/assets/My_Assets.png',
      description: 'Track and manage your complete asset portfolio with intelligent insights',
      color: '#1f787c',
      features: ['Portfolio Tracking', 'Real-time Values', 'Depreciation Analysis']
    },
    {
      title: 'Property Organization',
      subtitle: 'Smart Location Management',
      src: '/assets/My_Properties.png',
      description: 'Organize assets by properties with environmental monitoring',
      color: '#10b981',
      features: ['Air Quality Monitor', 'Location-based Assets', 'Property Analytics']
    },
    {
      title: 'Financial Dashboard',
      subtitle: 'Portfolio Analytics',
      src: '/assets/Finance.png',
      description: 'Comprehensive financial overview with performance insights',
      color: '#8b5cf6',
      features: ['Financial Analytics', 'Insurance Tracking', 'Performance Metrics']
    },
    {
      title: 'Visual Analytics',
      subtitle: 'Data Visualization',
      src: '/assets/Analytics_Pie_Chart.png',
      description: 'Interactive charts for portfolio breakdown and analysis',
      color: '#059669',
      features: ['Pie Chart Analysis', 'Category Distribution', 'Visual Insights']
    },
    {
      title: 'Performance Metrics',
      subtitle: 'Advanced Analytics',
      src: '/assets/Analytics_Bar_Graph.png',
      description: 'Detailed performance metrics with category-wise analysis',
      color: '#dc2626',
      features: ['Bar Chart Analysis', 'Performance Tracking', 'Comparative Data']
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % screenshots.length);
    }, 5000); // Slower transition for better viewing

    return () => clearInterval(timer);
  }, [screenshots.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % screenshots.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '32px',
      padding: '40px 20px'
    }}>
      {/* Modern Phone Frame */}
      <div style={{
        width: '320px',
        height: '640px',
        backgroundColor: '#1a1a1a',
        borderRadius: '40px',
        boxShadow: '0 30px 80px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        padding: '10px',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)'
      }}>
        {/* Screen Container */}
        <div style={{
          width: '100%',
          height: '100%',
          borderRadius: '30px',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#ffffff'
        }}>
          {/* Screenshot Image */}
          <img
            src={screenshots[currentSlide].src}
            alt={screenshots[currentSlide].title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top center',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              backgroundColor: '#ffffff'
            }}
            onError={(e) => {
              console.error('Image failed to load:', screenshots[currentSlide].src);
              const target = e.currentTarget as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement!.innerHTML += `
                <div style="
                  display: flex; 
                  align-items: center; 
                  justify-content: center; 
                  height: 100%; 
                  background: linear-gradient(135deg, ${screenshots[currentSlide].color}20 0%, ${screenshots[currentSlide].color}05 100%);
                  color: #6b7280; 
                  text-align: center; 
                  font-size: 16px; 
                  font-weight: 600;
                  flex-direction: column;
                  gap: 16px;
                ">
                  <div style="
                    width: 60px; 
                    height: 60px; 
                    background-color: ${screenshots[currentSlide].color}; 
                    border-radius: 50%; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center;
                    color: white;
                    font-size: 24px;
                    font-weight: 700;
                  ">
                    ${screenshots[currentSlide].title.charAt(0)}
                  </div>
                  <div style="font-size: 18px; font-weight: 700; color: ${screenshots[currentSlide].color};">
                    ${screenshots[currentSlide].title}
                  </div>
                  <div style="font-size: 14px; color: #6b7280; max-width: 200px; line-height: 1.4;">
                    ${screenshots[currentSlide].description}
                  </div>
                </div>
              `;
            }}
          />

          {/* Modern Overlay with Gradient */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(transparent 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%)',
            padding: '40px 24px 20px',
            color: 'white'
          }}>
            {/* Feature Pills */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              marginBottom: '16px'
            }}>
              {screenshots[currentSlide].features.slice(0, 2).map((feature, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: '10px',
                    fontWeight: '600',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    textShadow: '0 1px 2px rgba(0,0,0,0.8)'
                  }}
                >
                  {feature}
                </span>
              ))}
            </div>

            <h3 style={{
              fontSize: '16px',
              fontWeight: '800',
              marginBottom: '6px',
              textShadow: '0 2px 4px rgba(0,0,0,0.8)',
              letterSpacing: '-0.3px'
            }}>
              {screenshots[currentSlide].title}
            </h3>
            
            <p style={{
              fontSize: '12px',
              opacity: 0.95,
              lineHeight: '1.4',
              textShadow: '0 1px 2px rgba(0,0,0,0.8)',
              marginBottom: '16px'
            }}>
              {screenshots[currentSlide].description}
            </p>

            {/* Enhanced Navigation Dots */}
            <div style={{
              display: 'flex',
              gap: '8px',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {screenshots.map((_, index) => (
                <button
                  key={index}
                  style={{
                    width: index === currentSlide ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: index === currentSlide 
                      ? 'rgba(255, 255, 255, 0.9)' 
                      : 'rgba(255, 255, 255, 0.4)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Screen Reflection Effect */}
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          right: '10px',
          bottom: '10px',
          borderRadius: '30px',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, transparent 40%)',
          pointerEvents: 'none',
          zIndex: 2
        }} />
      </div>

      {/* Modern Control Buttons */}
      <div style={{
        display: 'flex',
        gap: '12px',
        alignItems: 'center'
      }}>
        <button
          onClick={prevSlide}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: 'white',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            color: '#6b7280'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.color = screenshots[currentSlide].color;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.color = '#6b7280';
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15,18 9,12 15,6"/>
          </svg>
        </button>

        <div style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#6b7280',
          minWidth: '60px',
          textAlign: 'center'
        }}>
          {currentSlide + 1} / {screenshots.length}
        </div>

        <button
          onClick={nextSlide}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: 'white',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            color: '#6b7280'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.color = screenshots[currentSlide].color;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.color = '#6b7280';
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9,18 15,12 9,6"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

// Component: Hero Section
const HeroSection: React.FC = () => {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #f8fffe 0%, #f0fdf4 50%, #ecfdf5 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '80px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '-5%',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(31, 120, 124, 0.08) 0%, rgba(16, 185, 129, 0.08) 100%)',
        filter: 'blur(60px)'
      }} />
      
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '60px',
        alignItems: 'center',
        zIndex: 1
      }}>
        <div className="mobile-center">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(31, 120, 124, 0.1)',
            padding: '8px 16px',
            borderRadius: '24px',
            marginBottom: '24px',
            fontSize: '14px',
            fontWeight: '500',
            color: '#1f787c'
          }}>
            <Icons.Star />
            <span>Smart Asset Management Platform</span>
          </div>

          <h1 className="hero-title" style={{
            fontSize: '56px',
            fontWeight: '800',
            lineHeight: '1.1',
            marginBottom: '24px',
            color: '#1a2038',
            letterSpacing: '-1.5px'
          }}>
            Smart Asset Management for{' '}
            <span className="text-gradient">Modern Professionals</span>
          </h1>
          
          <p className="hero-subtitle" style={{
            fontSize: '20px',
            color: '#6b7280',
            lineHeight: '1.6',
            marginBottom: '40px',
            maxWidth: '500px'
          }}>
            Track your assets, organize by properties and rooms, connect with your community, and make informed decisions with intelligent insights.
            Complete asset ecosystem management in one powerful platform.
          </p>

          <div style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '48px',
            flexWrap: 'wrap'
          }}>
            <a
              href="#download"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                background: 'linear-gradient(135deg, #1f787c 0%, #10b981 100%)',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '16px',
                boxShadow: '0 4px 16px rgba(31, 120, 124, 0.3)',
                transition: 'all 0.3s ease',
                border: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(31, 120, 124, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(31, 120, 124, 0.3)';
              }}
            >
              Download Now
              <Icons.ChevronRight />
            </a>
            
            <a
              href="#features"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: 'white',
                color: '#1f787c',
                padding: '16px 32px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '16px',
                border: '2px solid #e5f3f0',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f0fdf4';
                e.currentTarget.style.borderColor = '#1f787c';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.borderColor = '#e5f3f0';
              }}
            >
              Explore Features
            </a>
          </div>

          {/* Trust indicators */}
          <div style={{
            display: 'flex',
            gap: '32px',
            paddingTop: '24px',
            borderTop: '1px solid #e5f3f0',
            flexWrap: 'wrap'
          }}>
            {[
              { number: 'Portfolio', label: 'Management' },
              { number: 'Property', label: 'Organization' },
              { number: 'Analytics', label: '& Insights' }
            ].map((stat, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#1f787c',
                  marginBottom: '4px'
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#6b7280',
                  fontWeight: '500'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Mockup with Slideshow */}
        <div style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <AppSlideshow />

          {/* Enhanced Floating cards */}
          <div className="animate-float" style={{
            position: 'absolute',
            top: '10%',
            left: '-15%',
            width: '100px',
            height: '80px',
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <Icons.Property />
            <span style={{
              fontSize: '12px',
              fontWeight: '600',
              color: '#1f787c'
            }}>
              Properties
            </span>
          </div>
          
          <div className="animate-float-delayed" style={{
            position: 'absolute',
            bottom: '15%',
            right: '-20%',
            width: '120px',
            height: '80px',
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: '#10b981'
            }}>
              <Icons.ArrowUp />
              <span style={{
                fontSize: '16px',
                fontWeight: '700'
              }}>
                +12.5%
              </span>
            </div>
            <span style={{
              fontSize: '12px',
              fontWeight: '600',
              color: '#6b7280'
            }}>
              Portfolio Growth
            </span>
          </div>

          {/* Additional floating elements */}
          <div className="animate-float" style={{
            position: 'absolute',
            top: '25%',
            right: '-25%',
            width: '90px',
            height: '70px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            animationDelay: '0.5s'
          }}>
            <Icons.Security />
            <span style={{
              fontSize: '11px',
              fontWeight: '600',
              color: '#059669'
            }}>
              Insured
            </span>
          </div>

          <div className="animate-float-delayed" style={{
            position: 'absolute',
            bottom: '35%',
            left: '-20%',
            width: '110px',
            height: '70px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            animationDelay: '1.5s'
          }}>
            <Icons.AirQuality />
            <span style={{
              fontSize: '11px',
              fontWeight: '600',
              color: '#16a34a'
            }}>
              Air Quality
            </span>
          </div>

          <div className="animate-float" style={{
            position: 'absolute',
            top: '60%',
            right: '-10%',
            width: '80px',
            height: '60px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            animationDelay: '2s'
          }}>
            <Icons.Documents />
            <span style={{
              fontSize: '10px',
              fontWeight: '600',
              color: '#6366f1'
            }}>
              Docs
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Component: Feature Card
const FeatureCard: React.FC<FeatureProps> = ({ icon, title, description, color }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '32px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #f1f5f9',
      transition: 'all 0.3s ease',
      height: '100%'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '16px',
        backgroundColor: color + '10',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: color,
        marginBottom: '24px'
      }}>
        {icon}
      </div>
      
      <h3 style={{
        fontSize: '20px',
        fontWeight: '700',
        color: '#1a2038',
        marginBottom: '12px',
        lineHeight: '1.3'
      }}>
        {title}
      </h3>
      
      <p style={{
        fontSize: '15px',
        color: '#6b7280',
        lineHeight: '1.6'
      }}>
        {description}
      </p>
    </div>
  );
};

// Component: Features Section
const FeaturesSection: React.FC = () => {
  const features: FeatureProps[] = [
    {
      icon: <Icons.Portfolio />,
      title: 'Asset Management',
      description: 'Track current values, monitor depreciation, and get insights into your asset portfolio performance with real-time analytics and comprehensive reporting.',
      color: '#1f787c'
    },
    {
      icon: <Icons.Property />,
      title: 'Property & Room Organization',
      description: 'Organize assets by properties and rooms with smart location mapping. Track assets room-by-room for precise inventory management.',
      color: '#10b981'
    },
    {
      icon: <Icons.AirQuality />,
      title: 'Community Connection',
      description: 'Connect with neighbors, share experiences, post reviews, and collaborate with your community. Build meaningful connections while managing assets.',
      color: '#16a34a'
    },
    {
      icon: <Icons.Security />,
      title: 'Insurance & Warranty',
      description: 'Keep track of insurance coverage, warranty periods, and get timely notifications for renewals and claims management.',
      color: '#059669'
    },
    {
      icon: <Icons.Finance />,
      title: 'Financial Analytics',
      description: 'Comprehensive financial reporting with depreciation analysis, risk assessment, and investment insights for better decision making.',
      color: '#8b5cf6'
    },
    {
      icon: <Icons.Documents />,
      title: 'Document Management',
      description: 'Store and organize invoices, warranties, insurance papers, and other important documents securely in the cloud.',
      color: '#6366f1'
    }
  ];

  return (
    <section id="features" style={{
      padding: '50px 0',
      backgroundColor: '#ffffff'
    }}>
      <div className="container">
        <div style={{
          textAlign: 'center',
          marginBottom: '80px'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(31, 120, 124, 0.1)',
            padding: '8px 16px',
            borderRadius: '24px',
            marginBottom: '24px',
            fontSize: '14px',
            fontWeight: '600',
            color: '#1f787c'
          }}>
            FEATURES
          </div>

          <h2 className="section-title" style={{
            fontSize: '48px',
            fontWeight: '800',
            color: '#1a2038',
            marginBottom: '20px',
            letterSpacing: '-1px'
          }}>
            Everything You Need to{' '}
            <span className="text-gradient">Manage Assets</span>
          </h2>
          
          <p style={{
            fontSize: '20px',
            color: '#6b7280',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            From tracking valuables to monitoring environmental impacts, our comprehensive suite of tools 
            helps you make informed decisions about your assets.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '32px'
        }}>
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Component: Screenshots Section
const ScreenshotsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  const screenshots = [
    {
      id: 'assets',
      src: '/assets/My_Assets.png',
      title: 'Asset Portfolio',
      subtitle: 'Complete Asset Management',
      description: 'Track and manage your complete assets with detailed insights, depreciation analysis, and real-time value monitoring.',
      features: ['Assets Overview', 'Depreciation Tracking', 'Asset Health Scores', 'Smart Sorting & Filtering'],
      color: '#1f787c'
    },
    {
      id: 'properties',
      src: '/assets/My_Properties.png',
      title: 'Property Hub',
      subtitle: 'Smart Organization',
      description: 'Organize assets by properties with integrated air quality monitoring and comprehensive location-based insights.',
      features: ['Location Management', 'Air Quality Monitoring', 'Property Analytics', 'Asset Allocation'],
      color: '#10b981'
    },
    {
      id: 'finance',
      src: '/assets/Finance.png',
      title: 'Financial Analytics',
      subtitle: 'Portfolio Insights',
      description: 'Comprehensive financial dashboard with depreciation analysis, portfolio value tracking, and insurance management.',
      features: ['Portfolio Value', 'Depreciation Analysis', 'Insurance Tracking', 'Risk Assessment'],
      color: '#8b5cf6'
    },
    {
      id: 'analytics-pie',
      src: '/assets/Analytics_Pie_Chart.png',
      title: 'Visual Analytics',
      subtitle: 'Data Visualization',
      description: 'Interactive charts and visual insights for better understanding of your portfolio distribution and performance.',
      features: ['Pie Chart Analysis', 'Category Breakdown', 'Portfolio Distribution', 'Interactive Insights'],
      color: '#059669'
    },
    {
      id: 'analytics-bar',
      src: '/assets/Analytics_Bar_Graph.png',
      title: 'Performance Metrics',
      subtitle: 'Detailed Analysis',
      description: 'Advanced analytics with bar charts showing detailed performance metrics and comparative analysis across categories.',
      features: ['Performance Charts', 'Category Analysis', 'Comparative Metrics', 'Customizable Views'],
      color: '#dc2626'
    }
  ];

  return (
    <section id="screenshots" style={{
      padding: '120px 0',
      backgroundColor: '#ffffff',
      position: 'relative'
    }}>
      {/* Background Elements */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '-10%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(31, 120, 124, 0.03) 0%, rgba(16, 185, 129, 0.03) 100%)',
        filter: 'blur(60px)'
      }} />
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '80px'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(31, 120, 124, 0.08)',
            padding: '10px 20px',
            borderRadius: '30px',
            marginBottom: '24px',
            fontSize: '14px',
            fontWeight: '600',
            color: '#1f787c',
            border: '1px solid rgba(31, 120, 124, 0.1)'
          }}>
            <Icons.Mobile />
            APP INTERFACE
          </div>

          <h2 style={{
            fontSize: '48px',
            fontWeight: '800',
            color: '#1a2038',
            marginBottom: '24px',
            letterSpacing: '-1.2px',
            lineHeight: '1.1'
          }}>
            Experience the{' '}
            <span style={{
              background: 'linear-gradient(135deg, #1f787c 0%, #10b981 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Future of Asset Management
            </span>
          </h2>
          
          <p style={{
            fontSize: '20px',
            color: '#6b7280',
            maxWidth: '650px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: '400'
          }}>
            Intuitive design meets powerful functionality. Explore our comprehensive interface 
            designed for modern professionals.
          </p>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '60px',
          overflowX: 'auto',
          padding: '0 20px'
        }}>
          <div style={{
            display: 'flex',
            backgroundColor: '#f8f9fa',
            borderRadius: '16px',
            padding: '6px',
            gap: '4px',
            border: '1px solid #e9ecef'
          }}>
            {screenshots.map((screen, index) => (
              <button
                key={screen.id}
                onClick={() => setActiveTab(index)}
                style={{
                  padding: '12px 20px',
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: activeTab === index ? 'white' : 'transparent',
                  color: activeTab === index ? screen.color : '#6b7280',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === index ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none',
                  whiteSpace: 'nowrap'
                }}
              >
                {screen.title}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Display */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth > 768 ? '1fr 400px' : '1fr',
          gap: '80px',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }} className="screenshot-grid">
          {/* Content Section */}
          <div style={{
            order: window.innerWidth > 768 ? 1 : 2
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: `${screenshots[activeTab].color}15`,
              color: screenshots[activeTab].color,
              padding: '8px 16px',
              borderRadius: '24px',
              fontSize: '13px',
              fontWeight: '600',
              marginBottom: '24px'
            }}>
              {screenshots[activeTab].subtitle}
            </div>

            <h3 style={{
              fontSize: window.innerWidth > 768 ? '36px' : '28px',
              fontWeight: '800',
              color: '#1a2038',
              marginBottom: '20px',
              letterSpacing: '-0.8px'
            }}>
              {screenshots[activeTab].title}
            </h3>

            <p style={{
              fontSize: '18px',
              color: '#6b7280',
              lineHeight: '1.7',
              marginBottom: '32px'
            }}>
              {screenshots[activeTab].description}
            </p>

            {/* Feature List */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginBottom: '40px'
            }}>
              {screenshots[activeTab].features.map((feature, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '12px',
                  border: '1px solid #e9ecef'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: screenshots[activeTab].color
                  }} />
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href="#download"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: screenshots[activeTab].color,
                color: 'white',
                padding: '14px 28px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '15px',
                transition: 'all 0.3s ease',
                boxShadow: `0 4px 16px ${screenshots[activeTab].color}30`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 8px 25px ${screenshots[activeTab].color}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 4px 16px ${screenshots[activeTab].color}30`;
              }}
            >
              Try This Feature
              <Icons.ChevronRight />
            </a>
          </div>

          {/* Phone Mockup */}
          <div style={{
            order: window.innerWidth > 768 ? 2 : 1,
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            marginBottom: window.innerWidth > 768 ? '0' : '40px'
          }}>
            {/* Enhanced Phone Frame */}
            <div style={{
              width: window.innerWidth > 768 ? '320px' : '280px',
              height: window.innerWidth > 768 ? '640px' : '560px',
              backgroundColor: '#1a1a1a',
              borderRadius: '40px',
              padding: '12px',
              position: 'relative',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)',
              background: 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)'
            }}>
              {/* Screen Container */}
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '28px',
                overflow: 'hidden',
                position: 'relative',
                backgroundColor: '#ffffff'
              }}>
                <img
                  src={screenshots[activeTab].src}
                  alt={screenshots[activeTab].title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top',
                    transition: 'opacity 0.5s ease'
                  }}
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML += `
                      <div style="
                        display: flex; 
                        align-items: center; 
                        justify-content: center; 
                        height: 100%; 
                        background: linear-gradient(135deg, ${screenshots[activeTab].color}20 0%, ${screenshots[activeTab].color}05 100%);
                        color: #6b7280; 
                        text-align: center; 
                        font-size: 16px; 
                        font-weight: 500;
                        flex-direction: column;
                        gap: 12px;
                      ">
                        <div style="width: 48px; height: 48px; background-color: ${screenshots[activeTab].color}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; font-weight: 700;">
                          ${screenshots[activeTab].title.charAt(0)}
                        </div>
                        <div>Loading ${screenshots[activeTab].title}</div>
                      </div>
                    `;
                  }}
                />
              </div>

              {/* Screen Reflection Effect */}
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                right: '12px',
                bottom: '12px',
                borderRadius: '28px',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
                pointerEvents: 'none'
              }} />
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div style={{
          marginTop: '100px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          textAlign: 'center'
        }}>
          {[
            { value: '5+', label: 'Core Features', desc: 'Essential tools for asset management' },
            { value: '100%', label: 'Mobile Optimized', desc: 'Perfect experience on any device' },
            { value: '24/7', label: 'Data Sync', desc: 'Real-time updates across platforms' },
            { value: '∞', label: 'Scalability', desc: 'Grows with your portfolio' }
          ].map((stat, index) => (
            <div key={index} style={{
              padding: '32px 24px',
              backgroundColor: '#f8f9fa',
              borderRadius: '20px',
              border: '1px solid #e9ecef'
            }}>
              <div style={{
                fontSize: '32px',
                fontWeight: '800',
                color: screenshots[activeTab].color,
                marginBottom: '8px'
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#1a2038',
                marginBottom: '4px'
              }}>
                {stat.label}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.4'
              }}>
                {stat.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Component: FAQ Section (Home Page - Preview)
const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Only show 3 questions on home page
  const previewFaqs = [
    {
      q: "What is Cirqle?",
      a: "Cirqle is a comprehensive asset and property management app that helps you track your belongings, organize them by location, monitor their value, manage warranties and insurance, and even track air quality at your properties."
    },
    {
      q: "How do I add an asset?",
      a: "Tap the '+' button on the Assets tab, fill in asset details (name, category, brand, model, purchase amount), optionally upload an invoice/receipt, and assign it to a property or room."
    },
    {
      q: "Can I manage multiple properties?",
      a: "Yes! Add unlimited properties, set one as 'Primary,' and track assets across all locations. Perfect for managing multiple homes, rental properties, or office spaces."
    }
  ];

  const ChevronDown = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6,9 12,15 18,9"/>
    </svg>
  );

  return (
    <section id="faq" style={{
      padding: '120px 0',
      backgroundColor: '#f9fafb',
      position: 'relative'
    }}>
      <div className="container">
        <div style={{
          textAlign: 'center',
          marginBottom: '80px'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(31, 120, 124, 0.1)',
            padding: '8px 16px',
            borderRadius: '24px',
            marginBottom: '24px',
            fontSize: '14px',
            fontWeight: '600',
            color: '#1f787c'
          }}>
            FREQUENTLY ASKED QUESTIONS
          </div>

          <h2 className="section-title" style={{
            fontSize: '48px',
            fontWeight: '800',
            color: '#1a2038',
            marginBottom: '20px',
            letterSpacing: '-1px'
          }}>
            Have Questions?{' '}
            <span className="text-gradient">We've Got Answers</span>
          </h2>

          <p style={{
            fontSize: '20px',
            color: '#6b7280',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Quick answers to common questions about Cirqle
          </p>
        </div>

        <div style={{
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginBottom: '40px'
          }}>
            {previewFaqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    border: '1px solid #e5e7eb',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    boxShadow: isOpen ? '0 4px 12px rgba(0, 0, 0, 0.08)' : '0 1px 3px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    style={{
                      width: '100%',
                      padding: '24px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      gap: '20px'
                    }}
                  >
                    <span style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#1a2038',
                      flex: 1
                    }}>
                      {faq.q}
                    </span>
                    <div style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      color: '#1f787c',
                      flexShrink: 0
                    }}>
                      <ChevronDown />
                    </div>
                  </button>

                  {isOpen && (
                    <div style={{
                      padding: '0 24px 24px',
                      fontSize: '16px',
                      color: '#6b7280',
                      lineHeight: '1.7',
                      whiteSpace: 'pre-line'
                    }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* View All FAQs Button */}
          <div style={{
            textAlign: 'center',
            marginTop: '40px'
          }}>
            <a
              href="/help"
              onClick={(e) => {
                e.preventDefault();
                navigate('/help');
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                background: 'linear-gradient(135deg, #1f787c 0%, #10b981 100%)',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '16px',
                boxShadow: '0 4px 16px rgba(31, 120, 124, 0.3)',
                transition: 'all 0.3s ease',
                border: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(31, 120, 124, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(31, 120, 124, 0.3)';
              }}
            >
              View All FAQs
              <Icons.ChevronRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Component: Download Section
const DownloadSection: React.FC = () => {
  return (
    <section id="download" style={{
      padding: '120px 0',
      background: 'linear-gradient(135deg, #1f787c 0%, #10b981 100%)',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-20%',
        width: '800px',
        height: '800px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.1)',
        filter: 'blur(100px)'
      }} />
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '60px'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            padding: '8px 16px',
            borderRadius: '24px',
            marginBottom: '24px',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            DOWNLOAD NOW
          </div>

          <h2 style={{
            fontSize: '48px',
            fontWeight: '800',
            marginBottom: '20px',
            letterSpacing: '-1px'
          }}>
            Start Your Asset Management Journey
          </h2>
          
          <p style={{
            fontSize: '20px',
            color: 'rgba(255, 255, 255, 0.9)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Available for Android devices. Start managing your assets smarter today.
          </p>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
          marginBottom: '40px',
          flexWrap: 'wrap'
        }}>
          {/* Google Play Button */}
          <a
            href="https://play.google.com/store/apps/details?id=com.cirqlelife.cirqle"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)',
              color: 'white',
              padding: '20px 28px',
              borderRadius: '16px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.3s ease',
              minWidth: '200px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Icons.GooglePlay />
            <div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>Get it on</div>
              <div style={{ fontSize: '16px', fontWeight: '700' }}>Google Play</div>
            </div>
          </a>
        </div>

        {/* Feature highlights */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '32px',
          marginTop: '60px'
        }}>
          {[
            { icon: <Icons.Rocket />, title: 'Free to Start', desc: 'Basic features available for free' },
            { icon: <Icons.Lock />, title: 'Secure & Private', desc: 'Your data is encrypted and protected' },
            { icon: <Icons.Cloud />, title: 'Cloud Sync', desc: 'Access your data from any device' },
            { icon: <Icons.Mobile />, title: 'Mobile First', desc: 'Optimized for smartphones and tablets' }
          ].map((feature, index) => (
            <div key={index} style={{
              textAlign: 'center',
              padding: '32px 24px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ 
                marginBottom: '16px',
                color: 'rgba(255, 255, 255, 0.9)'
              }}>
                {feature.icon}
              </div>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '700', 
                marginBottom: '8px' 
              }}>
                {feature.title}
              </h3>
              <p style={{ 
                fontSize: '14px', 
                opacity: 0.9, 
                lineHeight: '1.4' 
              }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Component: Footer
const Footer: React.FC = () => {
  const supportLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Delete Data', href: '/deleteUserData' }
  ];

  return (
    <footer style={{
      backgroundColor: '#1a2038',
      color: 'white',
      padding: '80px 0 40px'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '50px',
          marginBottom: '50px'
        }}>
          {/* Brand section */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '24px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '12px',
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <img src="/assets/Logo_full_4k.png" alt="Cirqle Logo" style={{ width: '90px', height: '60px', borderRadius: '12px' }} />
              </div>
              <span style={{
                fontSize: '24px',
                fontWeight: '700',
                letterSpacing: '-0.5px'
              }}>
                Cirqle
              </span>
            </div>
            
            <p style={{
              fontSize: '16px',
              color: '#9ca3af',
              lineHeight: '1.6',
              marginBottom: '24px',
              maxWidth: '300px'
            }}>
              Smart asset management for the modern world. Track, monitor, and manage your portfolio with intelligent insights.
            </p>
            
            <div style={{
              fontSize: '14px',
              color: '#9ca3af'
            }}>
              A product by{' '}
              <span style={{
                color: '#10b981',
                fontWeight: '600'
              }}>
                Cirqlelife
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              marginBottom: '24px'
            }}>
              Product
            </h3>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              {['Features', 'Screenshots', 'Download'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  style={{
                    color: '#9ca3af',
                    textDecoration: 'none',
                    fontSize: '16px',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#10b981'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                >
                  {item}
                </a>
              ))}
              <a
                href="/help"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/help');
                }}
                style={{
                  color: '#9ca3af',
                  textDecoration: 'none',
                  fontSize: '16px',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#10b981'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
              >
                Help
              </a>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              marginBottom: '24px'
            }}>
              Support
            </h3>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              {supportLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    if (item.href.startsWith('/')) {
                      e.preventDefault();
                      navigate(item.href);
                    }
                  }}
                  style={{
                    color: item.name === 'Terms of Service' ? '#9ca3af' : '#9ca3af',
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: item.name === 'Terms of Service' ? '400' : '400',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#10b981'}
                  onMouseLeave={(e) => e.currentTarget.style.color = item.name === 'Terms of Service' ? '#9ca3af' : '#9ca3af'}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              marginBottom: '24px'
            }}>
              Contact
            </h3>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                color: '#9ca3af',
                fontSize: '16px'
              }}>
                <a 
                  href="mailto:contact@cirqlelife.com"
                  style={{
                    color: '#9ca3af',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#10b981'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                >
                  contact@cirqlelife.com
                </a>
              </div>
              
              {/* <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                color: '#9ca3af',
                fontSize: '16px'
              }}>
                <span style={{ minWidth: '20px' }}>🌐</span>
                <span>https://cirqlelife.com</span>
              </div> */}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div style={{
          borderTop: '1px solid #374151',
          paddingTop: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <p style={{
            color: '#9ca3af',
            fontSize: '14px'
          }}>
            © 2025 Cirqlelife. All rights reserved.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '24px',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <a
              href="/terms"
              onClick={(e) => {
                e.preventDefault();
                navigate('/terms');
              }}
              style={{
                color: '#10b981',
                fontSize: '14px',
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#34d399'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#10b981'}
            >
              Terms & Conditions
            </a>
            <span style={{
              color: '#9ca3af',
              fontSize: '14px'
            }}>
              Made with ♥ in India
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Landing Page Component
const LandingPage: React.FC = () => {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ScreenshotsSection />
      <FAQSection />
      <DownloadSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
