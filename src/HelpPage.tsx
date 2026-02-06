import React, { useState } from 'react';
import './index.css';

// Navigation helper function
const navigate = (path: string) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

// Icon Components
const Icons = {
  ChevronDown: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6,9 12,15 18,9"/>
    </svg>
  ),
  ArrowLeft: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="19" y1="12" x2="5" y2="12"/>
      <polyline points="12,19 5,12 12,5"/>
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
  )
};

// Header Component
const Header: React.FC = () => {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(229, 231, 235, 0.3)',
      zIndex: 1000,
      transition: 'all 0.3s ease',
      padding: '16px 0'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
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
            <img src="..//assets/Logo_full_4k.png" alt="Cirqle Logo" style={{ width: '90px', height: '60px', borderRadius: '12px' }} />
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

        {/* Back to Home Button */}
        <a
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'white',
            color: '#1f787c',
            padding: '12px 20px',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '14px',
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
          <Icons.ArrowLeft />
          Back to Home
        </a>
      </div>
    </header>
  );
};

// FAQ Data
const allFAQs = [
  {
    category: "General",
    questions: [
      {
        q: "What is Cirqle?",
        a: "Cirqle is a comprehensive asset and property management app that helps you track your belongings, organize them by location, monitor their value, manage warranties and insurance, and even track air quality at your properties."
      },
      {
        q: "Who is Cirqle for?",
        a: "Cirqle is perfect for homeowners, renters, property managers, or anyone who wants to keep a detailed inventory of their assets, track depreciation, manage multiple properties, and monitor environmental conditions."
      }
    ]
  },
  {
    category: "Assets Management",
    questions: [
      {
        q: "What can I track as an asset?",
        a: "You can track electronics (phones, laptops, TVs), home appliances (refrigerators, washing machines, AC), furniture, vehicles, jewelry, and any valuable items you own. Each asset can have details like brand, model, purchase price, invoice, warranty, and insurance information."
      },
      {
        q: "How do I add an asset?",
        a: "Tap the '+' button on the Assets tab, fill in asset details (name, category, brand, model, purchase amount), optionally upload an invoice/receipt, and assign it to a property or room."
      },
      {
        q: "Can I upload invoices for my assets?",
        a: "Yes! You can upload invoices in PDF, PNG, or JPEG format (up to 10MB). Take a photo with your camera or select an existing file. This helps with warranty claims and insurance."
      },
      {
        q: "How does asset depreciation work?",
        a: "Cirqle automatically calculates depreciation based on purchase amount and current value. You can filter assets by depreciation levels (e.g., 30%+ depreciation) to identify aging items."
      },
      {
        q: "Can I track EMI/loan payments for assets?",
        a: "Yes! When adding an asset, you can enable EMI tracking by providing the monthly amount and end date. The app helps you keep track of ongoing payment obligations."
      },
      {
        q: "What warranty and insurance tracking features are available?",
        a: "You can record warranty provider, end date, and insurance coverage (provider name, end date) for each asset. Filter assets by 'Under Warranty' or 'Insured' to quickly find covered items."
      }
    ]
  },
  {
    category: "Properties & Rooms",
    questions: [
      {
        q: "What is a property in Cirqle?",
        a: "A property is a physical location (home, office, vacation home) where you store your assets. You can add multiple properties, assign assets to them, and organize assets by rooms within each property."
      },
      {
        q: "Can I manage multiple properties?",
        a: "Yes! Add unlimited properties, set one as 'Primary,' and track assets across all locations. Perfect for managing multiple homes, rental properties, or office spaces."
      },
      {
        q: "How do I add location coordinates to my property?",
        a: "Long-press on any property card, select 'Add Location,' and pin your property on the map. This enables air quality monitoring, directions, and location sharing."
      },
      {
        q: "What is Room Management?",
        a: "Rooms help you organize assets within a property (e.g., Living Room, Kitchen, Bedroom). Tap 'Manage' on any property to add rooms and assign assets to specific rooms for better organization."
      }
    ]
  },
  {
    category: "Air Quality Monitoring",
    questions: [
      {
        q: "How does air quality monitoring work?",
        a: "Once you add GPS coordinates to a property, Cirqle automatically fetches real-time Air Quality Index (AQI) data for that location. Refresh manually anytime to get updated readings."
      },
      {
        q: "Why is air quality important for my assets?",
        a: "Poor air quality affects sensitive electronics and appliances (AC units, air purifiers, refrigerators). Monitoring AQI helps you understand environmental impact on asset health and performance."
      },
      {
        q: "What do AQI levels mean?",
        a: "1-50 (Good): Safe air quality\n51-100 (Fair/Moderate): Acceptable\n101-150 (Moderate/Poor): May affect sensitive devices\n150+ (Poor/Hazardous): High risk to appliances and health"
      }
    ]
  },
  {
    category: "Finance & Analytics",
    questions: [
      {
        q: "Can I see my total asset portfolio value?",
        a: "Yes! The Finance tab shows total portfolio value, depreciation trends, assets under warranty/insurance, EMI obligations, and detailed charts visualizing your asset distribution by category and property."
      },
      {
        q: "How can I filter my assets?",
        a: "Use filters on the Assets tab: All Assets, Electronics, Home Appliances, High Value (₹50K+), High Depreciation (30%+), Under Warranty, Insured, With/Without Invoice."
      },
      {
        q: "Can I transfer assets between properties?",
        a: "Yes! Select assets, tap 'Bulk Transfer,' choose destination property and room. Perfect for moving items or reorganizing your inventory."
      }
    ]
  },
  {
    category: "Data & Privacy",
    questions: [
      {
        q: "Is my data secure?",
        a: "Yes! All data is securely stored and transmitted using encryption. Invoices and documents are stored on secure cloud servers. Your asset information is private and only accessible to you."
      },
      {
        q: "Can I export or share my asset information?",
        a: "Currently, you can share property locations via Google Maps. Future updates will include asset inventory export (CSV/PDF) and sharing features for insurance claims or moving purposes."
      }
    ]
  }
];

// Help Page Component
const HelpPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Header />

      {/* Hero Section */}
      <section style={{
        paddingTop: '120px',
        paddingBottom: '60px',
        background: 'linear-gradient(135deg, #f8fffe 0%, #f0fdf4 50%, #ecfdf5 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '-5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(31, 120, 124, 0.08) 0%, rgba(16, 185, 129, 0.08) 100%)',
          filter: 'blur(60px)'
        }} />

        <div className="container" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
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
            HELP CENTER
          </div>

          <h1 style={{
            fontSize: '56px',
            fontWeight: '800',
            lineHeight: '1.1',
            marginBottom: '24px',
            color: '#1a2038',
            letterSpacing: '-1.5px'
          }}>
            Frequently Asked{' '}
            <span style={{
              background: 'linear-gradient(135deg, #1f787c 0%, #10b981 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Questions
            </span>
          </h1>

          <p style={{
            fontSize: '20px',
            color: '#6b7280',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Everything you need to know about Cirqle and how it can help you manage your assets effectively.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section style={{
        padding: '80px 0 120px',
        backgroundColor: '#f9fafb'
      }}>
        <div className="container" style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          {allFAQs.map((category, catIndex) => (
            <div key={catIndex} style={{ marginBottom: '60px' }}>
              <h2 style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#1f787c',
                marginBottom: '24px',
                paddingBottom: '16px',
                borderBottom: '3px solid #1f787c'
              }}>
                {category.category}
              </h2>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                {category.questions.map((faq, qIndex) => {
                  const globalIndex = `${catIndex}-${qIndex}`;
                  const isOpen = openIndex === globalIndex;

                  return (
                    <div
                      key={qIndex}
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
                        onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
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
                          <Icons.ChevronDown />
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
            </div>
          ))}

          {/* Contact Support */}
          <div style={{
            marginTop: '80px',
            textAlign: 'center',
            padding: '48px',
            backgroundColor: 'white',
            borderRadius: '24px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#1a2038',
              marginBottom: '16px'
            }}>
              Still have questions?
            </h3>
            <p style={{
              fontSize: '18px',
              color: '#6b7280',
              marginBottom: '24px',
              lineHeight: '1.6'
            }}>
              Contact us at{' '}
              <a
                href="mailto:help@cirqlelife.com"
                style={{
                  color: '#1f787c',
                  fontWeight: '600',
                  textDecoration: 'none'
                }}
              >
                help@cirqlelife.com
              </a>
              <br />
              or visit our Help Center in the app settings
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#1a2038',
        color: 'white',
        padding: '40px 0',
        textAlign: 'center'
      }}>
        <div className="container" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <p style={{
            color: '#9ca3af',
            fontSize: '14px',
            marginBottom: '12px'
          }}>
            © 2025 Cirqlelife. All rights reserved.
          </p>
          <div style={{
            display: 'flex',
            gap: '24px',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
              style={{
                color: '#10b981',
                fontSize: '14px',
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              Home
            </a>
            <span style={{ color: '#9ca3af', fontSize: '14px' }}>•</span>
            <a
              href="/help"
              onClick={(e) => {
                e.preventDefault();
                navigate('/help');
              }}
              style={{
                color: '#10b981',
                fontSize: '14px',
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              Help Center
            </a>
            <span style={{ color: '#9ca3af', fontSize: '14px' }}>•</span>
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
                fontWeight: '500'
              }}
            >
              Terms & Conditions
            </a>
            <span style={{ color: '#9ca3af', fontSize: '14px' }}>•</span>
            <a
              href="/privacy"
              onClick={(e) => {
                e.preventDefault();
                navigate('/privacy');
              }}
              style={{
                color: '#10b981',
                fontSize: '14px',
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HelpPage;
