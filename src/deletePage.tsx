import React, { useState } from 'react';
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
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  @media (max-width: 768px) {
    .hero-title {
      font-size: 32px !important;
    }
    
    .hero-subtitle {
      font-size: 16px !important;
    }
    
    .section-title {
      font-size: 28px !important;
    }
    
    .mobile-stack {
      flex-direction: column !important;
      gap: 20px !important;
    }
    
    .mobile-full-width {
      width: 100% !important;
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

// Icon Components
const Icons = {
  Shield: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Trash: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3,6 5,6 21,6"/>
      <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
      <line x1="10" y1="11" x2="10" y2="17"/>
      <line x1="14" y1="11" x2="14" y2="17"/>
    </svg>
  ),
  User: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Lock: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <circle cx="12" cy="16" r="1"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  Key: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="7" cy="7" r="5"/>
      <path d="m14,12 8,-8"/>
      <path d="m19,7 2,2"/>
    </svg>
  ),
  Mail: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  Mobile: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
      <line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>
  ),
  Settings: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  ArrowLeft: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="19" y1="12" x2="5" y2="12"/>
      <polyline points="12,19 5,12 12,5"/>
    </svg>
  ),
  Check: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20,6 9,17 4,12"/>
    </svg>
  ),
  Info: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="16" x2="12" y2="12"/>
      <line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  ),
  Warning: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m21.73,18-8-14a2,2 0 0,0 -3.46,0l-8,14A2,2 0 0,0 4,21H20a2,2 0 0,0 1.73-3Z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9,18 15,12 9,6"/>
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

        {/* Back Button */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#6b7280',
            textDecoration: 'none',
            fontWeight: '500',
            fontSize: '15px',
            transition: 'color 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#1f787c'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
        >
          <Icons.ArrowLeft />
          Back to Home
        </a>
      </div>
    </header>
  );
};

// Step Card Component
interface StepCardProps {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  isHighlighted?: boolean;
}

const StepCard: React.FC<StepCardProps> = ({ 
  number, 
  title, 
  description, 
  icon, 
  color, 
  isHighlighted = false 
}) => {
  return (
    <div style={{
      backgroundColor: isHighlighted ? `${color}05` : 'white',
      borderRadius: '20px',
      padding: '32px',
      boxShadow: isHighlighted ? `0 8px 25px ${color}20` : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: isHighlighted ? `2px solid ${color}20` : '1px solid #f1f5f9',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decoration for highlighted cards */}
      {isHighlighted && (
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${color}10 0%, ${color}05 100%)`,
          filter: 'blur(40px)'
        }} />
      )}
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Step Number and Icon */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: color,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            fontWeight: '700'
          }}>
            {number}
          </div>
          
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            backgroundColor: `${color}15`,
            color: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {icon}
          </div>
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
          lineHeight: '1.6',
        }}>
          {description}
        </p>
      </div>
    </div>
  );
};

// Emergency Contact Component
const EmergencyContact: React.FC = () => {
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('contact@cirqlelife.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <div style={{
      backgroundColor: '#fff7ed',
      borderRadius: '20px',
      padding: '32px',
      border: '2px solid #fed7aa',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '-30%',
        right: '-10%',
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.1) 0%, rgba(251, 146, 60, 0.05) 100%)',
        filter: 'blur(30px)'
      }} />
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            backgroundColor: '#fb923c',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Icons.Warning />
          </div>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#ea580c',
            margin: 0
          }}>
            Can't Access Your Account?
          </h3>
        </div>

        <p style={{
          fontSize: '15px',
          color: '#9a3412',
          lineHeight: '1.6',
          marginBottom: '24px'
        }}>
          If you're unable to log into your account by any means (forgot password, account locked, etc.), 
          you can send a delete request directly to our support team.
        </p>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '20px',
          border: '1px solid #fed7aa',
          marginBottom: '20px'
        }}>
          <h4 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#1a2038',
            marginBottom: '12px'
          }}>
            Email Template for Deletion Request:
          </h4>
          
          <div style={{
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            padding: '16px',
            fontSize: '14px',
            color: '#4b5563',
            fontFamily: 'monospace',
            lineHeight: '1.5',
            border: '1px solid #e5e7eb'
          }}>
            <strong>Subject:</strong> Account Deletion Request - [Your Email]<br/><br/>
            <strong>Body:</strong><br/>
            Dear Cirqle Support Team,<br/><br/>
            I request the complete deletion of my account and all associated data from your servers. 
            My account email is: [Your Email Address]<br/><br/>
            I understand that this action is irreversible and all my data will be permanently deleted.<br/><br/>
            Thank you,<br/>
            [Your Name]
          </div>
        </div>

        <button
          onClick={copyEmail}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: emailCopied ? '#10b981' : '#fb923c',
            color: 'white',
            padding: '14px 24px',
            borderRadius: '12px',
            border: 'none',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            width: '100%',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            if (!emailCopied) {
              e.currentTarget.style.backgroundColor = '#ea580c';
            }
          }}
          onMouseLeave={(e) => {
            if (!emailCopied) {
              e.currentTarget.style.backgroundColor = '#fb923c';
            }
          }}
        >
          {emailCopied ? <Icons.Check /> : <Icons.Mail />}
          {emailCopied ? 'Email Copied!' : 'Copy Email: contact@cirqlelife.com'}
        </button>
      </div>
    </div>
  );
};

// Data Types Component
const DataTypesInfo: React.FC = () => {
  const dataTypes = [
    {
      name: 'Personal Assets',
      description: 'All your tracked assets, properties, and their details',
      icon: <Icons.Shield />,
      color: '#1f787c'
    },
    {
      name: 'Properties & Rooms',
      description: 'Property data and room organization within properties',
      icon: <Icons.Settings />,
      color: '#8b5cf6'
    },
    {
      name: 'Community Data',
      description: 'Posts, comments, reviews, likes, and community interactions',
      icon: <Icons.User />,
      color: '#10b981'
    },
    {
      name: 'Financial Data',
      description: 'Portfolio values, depreciation records, and analytics',
      icon: <Icons.Mobile />,
      color: '#059669'
    },
    {
      name: 'Documents & Files',
      description: 'Uploaded receipts, invoices, warranties, and insurance papers',
      icon: <Icons.Shield />,
      color: '#f59e0b'
    },
    {
      name: 'Account Information',
      description: 'Profile details, preferences, and login credentials',
      icon: <Icons.User />,
      color: '#ef4444'
    }
  ];

  return (
    <div style={{
      backgroundColor: '#f8fffe',
      borderRadius: '20px',
      padding: '32px',
      border: '1px solid #a7f3d0'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '24px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          backgroundColor: '#10b981',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Icons.Info />
        </div>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: '#1a2038',
          margin: 0
        }}>
          What Data Gets Deleted?
        </h3>
      </div>

      <p style={{
        fontSize: '15px',
        color: '#6b7280',
        lineHeight: '1.6',
        marginBottom: '24px'
      }}>
        When you delete your account, the following data types will be permanently removed from our servers:
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px'
      }}>
        {dataTypes.map((item, index) => (
          <div key={index} style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid #d1fae5',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: `${item.color}15`,
              color: item.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              {item.icon}
            </div>
            <div>
              <h4 style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#1a2038',
                marginBottom: '4px'
              }}>
                {item.name}
              </h4>
              <p style={{
                fontSize: '13px',
                color: '#6b7280',
                lineHeight: '1.4',
                margin: 0
              }}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        backgroundColor: '#fef3c7',
        borderRadius: '12px',
        padding: '16px',
        marginTop: '20px',
        border: '1px solid #fbbf24'
      }}>
        <p style={{
          fontSize: '14px',
          color: '#92400e',
          margin: 0,
          fontWeight: '500'
        }}>
          <strong>Important:</strong> This action is irreversible. Once deleted, your data cannot be recovered. 
          We recommend exporting any important data before proceeding with deletion.
        </p>
      </div>
    </div>
  );
};

// Main Delete Data Page Component
const DeleteDataPage: React.FC = () => {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <Header />
      
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #f8fffe 0%, #f0fdf4 50%, #ecfdf5 100%)',
        paddingTop: '120px',
        paddingBottom: '80px',
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
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(220, 38, 38, 0.1)',
              padding: '8px 16px',
              borderRadius: '24px',
              marginBottom: '24px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#dc2626'
            }}>
              <Icons.Warning />
              <span>Account & Data Deletion</span>
            </div>

            <h1 className="hero-title" style={{
              fontSize: '48px',
              fontWeight: '800',
              lineHeight: '1.1',
              marginBottom: '24px',
              color: '#1a2038',
              letterSpacing: '-1.5px'
            }}>
              Delete Your Account &{' '}
              <span className="text-gradient">Associated Data</span>
            </h1>
            
            <p className="hero-subtitle" style={{
              fontSize: '20px',
              color: '#6b7280',
              lineHeight: '1.6',
              marginBottom: '40px'
            }}>
              We provide multiple secure methods to delete your account and all associated data. 
              Choose the option that works best for your situation.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section style={{
        padding: '80px 0',
        backgroundColor: '#ffffff'
      }}>
        <div className="container">
          <div style={{
            textAlign: 'center',
            marginBottom: '60px'
          }}>
            <h2 style={{
              fontSize: '36px',
              fontWeight: '800',
              color: '#1a2038',
              marginBottom: '16px',
              letterSpacing: '-1px'
            }}>
              How to Delete Your Data
            </h2>
            
            <p style={{
              fontSize: '18px',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Follow these step-by-step instructions based on your access level to the app
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '32px',
            marginBottom: '60px'
          }}>
            <StepCard
              number="1"
              title="In-App Deletion (Preferred)"
              description="If you can access your account, use the in-app deletion features for immediate data removal."
              icon={<Icons.Mobile />}
              color="#1f787c"
              isHighlighted={true}
            />

            <StepCard
              number="2"
              title="Password Recovery Method"
              description="If you forgot your password, use the password reset feature to regain access and then delete your data."
              icon={<Icons.Key />}
              color="#8b5cf6"
            />

            <StepCard
              number="3"
              title="Email Support Request"
              description="If you cannot access your account by any means, send a deletion request to our support team."
              icon={<Icons.Mail />}
              color="#fb923c"
            />
          </div>

          {/* Detailed Steps for In-App Deletion */}
          <div style={{
            backgroundColor: '#f8fffe',
            borderRadius: '20px',
            padding: '40px',
            marginBottom: '40px',
            border: '1px solid #a7f3d0'
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#1a2038',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              Method 1: In-App Deletion (Recommended)
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              {/* Delete All Data */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #d1fae5'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: '#1f787c',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icons.Trash />
                  </div>
                  <h4 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1a2038',
                    margin: 0
                  }}>
                    Delete All Data
                  </h4>
                </div>
                
                <ol style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  lineHeight: '1.6',
                  paddingLeft: '20px',
                  margin: 0
                }}>
                  <li>Open the Cirqle app</li>
                  <li>Login with your email and password</li>
                  <li>Navigate to Settings (bottom right tab)</li>
                  <li>Scroll down to "Data Management" section</li>
                  <li>Tap the "Delete All Data" button</li>
                  <li>Confirm the deletion when prompted</li>
                </ol>
                
                <div style={{
                  backgroundColor: '#fef3c7',
                  borderRadius: '8px',
                  padding: '12px',
                  marginTop: '16px',
                  border: '1px solid #fbbf24'
                }}>
                  <p style={{
                    fontSize: '12px',
                    color: '#92400e',
                    margin: 0,
                    fontWeight: '500'
                  }}>
                    This removes all your assets, properties, and documents but keeps your account active.
                  </p>
                </div>
              </div>

              {/* Delete Account */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #fecaca'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: '#dc2626',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icons.User />
                  </div>
                  <h4 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1a2038',
                    margin: 0
                  }}>
                    Delete Account
                  </h4>
                </div>
                
                <ol style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  lineHeight: '1.6',
                  paddingLeft: '20px',
                  margin: 0
                }}>
                  <li>Open the Cirqle app</li>
                  <li>Login with your email and password</li>
                  <li>Navigate to Settings (bottom right tab)</li>
                  <li>Scroll down to "Account Actions" section</li>
                  <li>Tap the "Delete Account" button</li>
                  <li>Enter your password for confirmation</li>
                  <li>Confirm permanent account deletion</li>
                </ol>
                
                <div style={{
                  backgroundColor: '#fee2e2',
                  borderRadius: '8px',
                  padding: '12px',
                  marginTop: '16px',
                  border: '1px solid #fca5a5'
                }}>
                  <p style={{
                    fontSize: '12px',
                    color: '#991b1b',
                    margin: 0,
                    fontWeight: '500'
                  }}>
                    This permanently deletes your account and ALL associated data. Cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Password Recovery Method */}
          <div style={{
            backgroundColor: '#faf5ff',
            borderRadius: '20px',
            padding: '40px',
            marginBottom: '40px',
            border: '1px solid #d8b4fe'
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#1a2038',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              Method 2: Password Recovery
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              marginBottom: '24px'
            }}>
              {[
                { step: '1', title: 'Forgot Password', desc: 'Tap "Forgot Password?" on the login screen' },
                { step: '2', title: 'Enter Email', desc: 'Provide your registered email address' },
                { step: '3', title: 'Check Email', desc: 'Look for verification code in your email' },
                { step: '4', title: 'Reset Password', desc: 'Create a new password using the code' },
                { step: '5', title: 'Login & Delete', desc: 'Login with new password and follow Method 1' }
              ].map((item, index) => (
                <div key={index} style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid #e9d5ff',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#8b5cf6',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: '700',
                    margin: '0 auto 12px'
                  }}>
                    {item.step}
                  </div>
                  <h4 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#1a2038',
                    marginBottom: '6px'
                  }}>
                    {item.title}
                  </h4>
                  <p style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    margin: 0,
                    lineHeight: '1.4'
                  }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div style={{
              backgroundColor: '#ede9fe',
              borderRadius: '12px',
              padding: '16px',
              border: '1px solid #c4b5fd'
            }}>
              <p style={{
                fontSize: '14px',
                color: '#5b21b6',
                margin: 0,
                fontWeight: '500',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}>
                <Icons.Info />
                If you don't receive the reset email, check your spam folder or contact support.
              </p>
            </div>
          </div>

          {/* Emergency Contact */}
          <EmergencyContact />
        </div>
      </section>

      {/* Data Types Section */}
      <section style={{
        padding: '80px 0',
        backgroundColor: '#f8f9fa'
      }}>
        <div className="container">
          <DataTypesInfo />
        </div>
      </section>

      {/* Important Notes Section */}
      <section style={{
        padding: '80px 0',
        backgroundColor: '#ffffff'
      }}>
        <div className="container">
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '36px',
              fontWeight: '800',
              color: '#1a2038',
              marginBottom: '24px',
              letterSpacing: '-1px'
            }}>
              Important Information
            </h2>

            <div style={{
              display: 'grid',
              gap: '24px',
              marginBottom: '40px',
              textAlign: 'left'
            }}>
              {/* Data Retention */}
              <div style={{
                backgroundColor: '#f0f9ff',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #bae6fd'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#0c4a6e',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Icons.Info />
                  Data Retention Period
                </h3>
                <p style={{
                  fontSize: '15px',
                  color: '#075985',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  After account deletion, your data will be completely removed from our servers within 30 days. 
                  During this period, the data is marked for deletion and is not accessible to anyone, including our support team.
                </p>
              </div>

              {/* Backup Recommendation */}
              <div style={{
                backgroundColor: '#f0fdf4',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #bbf7d0'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#14532d',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Icons.Shield />
                  Backup Recommendation
                </h3>
                <p style={{
                  fontSize: '15px',
                  color: '#15803d',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  Before deleting your account, we recommend exporting any important data such as asset lists, 
                  financial reports, or uploaded documents that you might need for future reference.
                </p>
              </div>

              {/* Processing Time */}
              <div style={{
                backgroundColor: '#fffbeb',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #fed7aa'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#92400e',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Icons.Settings />
                  Processing Time
                </h3>
                <p style={{
                  fontSize: '15px',
                  color: '#a16207',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  In-app deletions are processed immediately. Email requests for account deletion will be processed 
                  within 5-7 business days after verification of your identity for security purposes.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }} className="mobile-stack">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/');
                }}
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
                className="mobile-full-width"
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
              
              <a
                href="mailto:contact@cirqlelife.com?subject=Account Deletion Request&body=Dear Cirqle Support Team,%0D%0A%0D%0AI request the complete deletion of my account and all associated data from your servers.%0D%0AMy account email is: [Your Email Address]%0D%0A%0D%0AI understand that this action is irreversible and all my data will be permanently deleted.%0D%0A%0D%0AThank you,%0D%0A[Your Name]"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                  color: 'white',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '16px',
                  boxShadow: '0 4px 16px rgba(220, 38, 38, 0.3)',
                  transition: 'all 0.3s ease',
                  border: 'none'
                }}
                className="mobile-full-width"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(220, 38, 38, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(220, 38, 38, 0.3)';
                }}
              >
                <Icons.Mail />
                Send Deletion Request
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#1a2038',
        color: 'white',
        padding: '60px 0 40px'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px',
            marginBottom: '40px'
          }}>
            {/* Brand section */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}>
                  <img src="/assets/Logo_full_4k.png" alt="Cirqle Logo" style={{ width: '60px', height: '40px', borderRadius: '12px' }} />
                </div>
                <span style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  letterSpacing: '-0.5px'
                }}>
                  Cirqle
                </span>
              </div>
              
              <p style={{
                fontSize: '14px',
                color: '#9ca3af',
                lineHeight: '1.6',
                margin: 0
              }}>
                Smart asset management with secure data handling and user privacy protection.
              </p>
            </div>

            {/* Support */}
            <div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '700',
                marginBottom: '16px'
              }}>
                Support
              </h3>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <a
                  href="mailto:contact@cirqlelife.com"
                  style={{
                    color: '#9ca3af',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#10b981'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                >
                  contact@cirqlelife.com
                </a>
                
                <a
                  href="/privacy"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/privacy');
                  }}
                  style={{
                    color: '#9ca3af',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#10b981'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                >
                  Privacy Policy
                </a>
                
                <a
                  href="/terms"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/terms');
                  }}
                  style={{
                    color: '#9ca3af',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '600',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#34d399'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div style={{
            borderTop: '1px solid #374151',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <p style={{
              color: '#9ca3af',
              fontSize: '14px',
              margin: 0
            }}>
              © 2025 Cirqlelife. Your privacy and data security are our priority.
            </p>
            
            <div style={{
              fontSize: '14px',
              color: '#9ca3af'
            }}>
              Made with ♥ in India
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DeleteDataPage;