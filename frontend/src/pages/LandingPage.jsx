import Navbar from '../components/Navbar'
import './LandingPage.css'

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="badge-icon">★</span>
              <span>Trusted by over 2 million users worldwide</span>
            </div>
            <h1 className="hero-title">
              Banking
              <span className="title-accent"> Redefined</span>
              <br />
              For The Modern Era
            </h1>
            <p className="hero-description">
              Experience seamless financial management with VaultBank. 
              From instant transfers to intelligent savings, we're building 
              the future of banking, today.
            </p>
            <div className="hero-cta">
              <a href="/signup" className="cta-primary">
                Open Your Account
                <span className="cta-arrow">→</span>
              </a>
              <a href="#features" className="cta-secondary">
                Explore Features
              </a>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-number">$2.5B+</div>
                <div className="stat-label">Secured Assets</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <div className="stat-number">99.9%</div>
                <div className="stat-label">Uptime</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <div className="stat-number">256-bit</div>
                <div className="stat-label">Encryption</div>
              </div>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="card-mockup card-primary">
              <div className="card-header">
                <div className="card-logo">TD Bank</div>
                <div className="card-chip"></div>
              </div>
              <div className="card-number">•••• •••• •••• 4829</div>
              <div className="card-footer">
                <div className="card-holder">
                  <div className="card-label">Card Holder</div>
                  <div className="card-name">Alex Johnson</div>
                </div>
                <div className="card-expiry">
                  <div className="card-label">Expires</div>
                  <div className="card-name">12/28</div>
                </div>
              </div>
            </div>

            <div className="card-mockup card-secondary">
              <div className="balance-header">Total Balance</div>
              <div className="balance-amount">$24,582.00</div>
              <div className="balance-change positive">+12.5% this month</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="features-container">
          <div className="section-header">
            <h2 className="section-title">Everything You Need</h2>
            <p className="section-subtitle">
              Powerful features designed for the modern banking experience
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="bi bi-lightning-charge" />
              </div>
              <h3 className="feature-title">Instant Transfers</h3>
              <p className="feature-description">
                Send and receive money instantly, anywhere in the world,
                with zero fees on all transactions.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="bi bi-shield-lock" />
              </div>
              <h3 className="feature-title">Bank-Level Security</h3>
              <p className="feature-description">
                Your money is protected with 256-bit encryption and
                multi-factor authentication.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="bi bi-graph-up-arrow" />
              </div>
              <h3 className="feature-title">Smart Analytics</h3>
              <p className="feature-description">
                Get intelligent insights into your spending patterns
                and personalized saving recommendations.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="bi bi-credit-card" />
              </div>
              <h3 className="feature-title">Virtual Cards</h3>
              <p className="feature-description">
                Create unlimited virtual cards for online shopping
                and subscription management.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="bi bi-globe2" />
              </div>
              <h3 className="feature-title">Global Access</h3>
              <p className="feature-description">
                Access your account anywhere, anytime, with our mobile
                and web applications.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="bi bi-bullseye" />
              </div>
              <h3 className="feature-title">Savings Goals</h3>
              <p className="feature-description">
                Set and track multiple savings goals with automated
                transfers and progress tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-description">
            Join millions of users who trust VaultBank with their finances
          </p>
          <a href="/signup" className="cta-button">
            Create Free Account
            <span className="cta-arrow">→</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section">
              <h4 className="footer-title">TDBank</h4>
              <p className="footer-text">
                Modern banking for the digital age. Secure, fast, and intuitive.
              </p>
            </div>
            
            <div className="footer-section">
              <h5 className="footer-heading">Product</h5>
              <ul className="footer-links">
                <li><a href="/">Features</a></li>
                <li><a href="/">Pricing</a></li>
                <li><a href="/">Security</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h5 className="footer-heading">Company</h5>
              <ul className="footer-links">
                <li><a href="/">About</a></li>
                <li><a href="/">Careers</a></li>
                <li><a href="/">Contact</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h5 className="footer-heading">Legal</h5>
              <ul className="footer-links">
                <li><a href="/">Privacy</a></li>
                <li><a href="/">Terms</a></li>
                <li><a href="/">Compliance</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2026 TD Bank. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
