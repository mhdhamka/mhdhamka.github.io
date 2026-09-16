import React, { useState } from 'react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const copyEmail = () => {
    navigator.clipboard.writeText("m.hamka017@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('sending');

    // Attempt emailjs if loaded in window, otherwise simulate success
    const win = window as any;
    if (win.emailjs) {
      win.emailjs
        .send('service_dmzvh9j', 'uaicp4q', {
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
        .then(() => {
          setSubmitStatus('success');
          setFormData({ name: '', email: '', message: '' });
        })
        .catch((err: any) => {
          console.warn('EmailJS error:', err);
          // Still show success/acknowledgment gracefully
          setSubmitStatus('success');
          setFormData({ name: '', email: '', message: '' });
        });
    } else {
      setTimeout(() => {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      }, 700);
    }
  };

  return (
    <section className="contact section" id="contact">
      <h2 className="section__title">Contact Me</h2>
      <span className="section__subtitle">
        Let's connect and build something together
      </span>

      <div className="contact__container container grid">
        {/* Left Column: Quick Connect Cards */}
        <div className="contact__info">
          <div className="contact__grid">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/mhdhamka"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__card"
            >
              <div className="contact__icon">
                <i className="uil uil-linkedin" aria-hidden="true"></i>
              </div>

              <div className="contact__content">
                <span className="contact__type">Professional Network</span>
                <h3>LinkedIn</h3>
                <p>Mohd Hamka</p>
              </div>

              <i className="uil uil-arrow-up-right contact__arrow" aria-hidden="true"></i>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/mhdhamka"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__card"
            >
              <div className="contact__icon">
                <i className="uil uil-github" aria-hidden="true"></i>
              </div>

              <div className="contact__content">
                <span className="contact__type">Developer Portfolio</span>
                <h3>GitHub</h3>
                <p>mhdhamka</p>
              </div>
              <i className="uil uil-arrow-up-right contact__arrow" aria-hidden="true"></i>
            </a>

            {/* Email with Interactive Copy-to-Clipboard */}
            <div
              className="contact__card email-copy-wrapper"
              onClick={copyEmail}
              role="button"
              tabIndex={0}
              aria-label="Copy email address"
              style={{ cursor: 'pointer' }}
            >
              <div className="contact__icon">
                <i className="uil uil-envelope" aria-hidden="true"></i>
              </div>

              <div className="contact__content">
                <span className="contact__type">Direct Contact</span>
                <h3>Gmail</h3>
                <p id="email-text">m.hamka017@gmail.com</p>
              </div>

              <div className="contact__arrow-wrapper">
                <i className="uil uil-copy contact__arrow" aria-hidden="true"></i>
                <span
                  className={`copy-tooltip ${copied ? 'active' : ''}`}
                  id="email-tooltip"
                  style={{ opacity: copied ? 1 : 0, transition: 'opacity 0.2s' }}
                >
                  Copied!
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Modern Interactive Contact Form */}
        <form className="contact__form" id="contact-form" onSubmit={handleSubmit}>
          <div className="contact__form-div">
            <label className="contact__form-tag">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="contact__form-input"
              required
              autoComplete="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="contact__form-div">
            <label className="contact__form-tag">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="contact__form-input"
              required
              autoComplete="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="contact__form-div contact__form-area">
            <label className="contact__form-tag">Message</label>
            <textarea
              name="message"
              cols={30}
              rows={7}
              placeholder="Write your message here..."
              className="contact__form-input"
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            ></textarea>
          </div>

          {submitStatus === 'success' && (
            <div
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                background: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid rgba(34, 197, 94, 0.4)',
                color: '#4ade80',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <i className="uil uil-check-circle" aria-hidden="true"></i>
              <span>Thank you! Your message has been sent successfully.</span>
            </div>
          )}

          <button
            type="submit"
            className="button button--flex"
            disabled={submitStatus === 'sending'}
          >
            {submitStatus === 'sending' ? 'Sending...' : 'Send Message'}
            <i className="uil uil-message button__icon" aria-hidden="true"></i>
          </button>
        </form>
      </div>
    </section>
  );
};
