import React from "react";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <main className="home-container">
        {/* Hero Section */}
        <div className="hero-section">
          <h1 className="hero-title">Welcome to Job RaShPi</h1>
          <p className="hero-subtitle">
            Start preparing for your dream job with our premium resources and tools!
          </p>
          <button className="cta-button">Get Started</button>
        </div>

        {/* Key Features Section */}
        <section className="features-section">
          <h2 className="section-title">Why Choose Job RaShPi?</h2>
          <div className="features-container">
            <div className="feature-card">
              <h3>Interactive Practice</h3>
              <p>Access hundreds of coding problems with real-time solutions.</p>
            </div>
            <div className="feature-card">
              <h3>Mock Interviews</h3>
              <p>Prepare for interviews with our curated questions and expert advice.</p>
            </div>
            <div className="feature-card">
              <h3>Job Listings</h3>
              <p>Explore job openings at top companies and apply directly.</p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-container">
            <div className="step-card">
              <h3>1. Sign Up</h3>
              <p>Create an account to access all features.</p>
            </div>
            <div className="step-card">
              <h3>2. Explore</h3>
              <p>Browse through coding challenges, resources, and mock tests.</p>
            </div>
            <div className="step-card">
              <h3>3. Apply</h3>
              <p>Get job recommendations and apply directly.</p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section">
          <h2 className="section-title">What Our Users Say</h2>
          <div className="testimonials-container">
            <div className="testimonial-card">
              <p>
                "Job RaShPi helped me crack my dream job at Google. Their resources are top-notch!"
              </p>
              <h4>- Akshay Sharma</h4>
            </div>
            <div className="testimonial-card">
              <p>
                "The mock interviews were super helpful. I felt so confident during my actual
                interview."
              </p>
              <h4>- Priya Gupta</h4>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-container">
            <div className="faq-item">
              <h3>How much does it cost?</h3>
              <p>Job RaShPi offers both free and premium plans starting at ₹499/month.</p>
            </div>
            <div className="faq-item">
              <h3>What languages are supported?</h3>
              <p>We support all major programming languages like C++, Python, Java, and more.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
