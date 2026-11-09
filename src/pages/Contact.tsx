import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, Github, Instagram, Send, MapPin, Phone, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { GlassButton } from '../components/GlassButton';
import { GlassInput } from '../components/GlassInput';
import { AtmosphericOrb } from '../components/AtmosphericOrb';
import { useTheme } from '../contexts/ThemeContext';

export function Contact() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const socialLinks = [
    {
      icon: <Mail size={18} />,
      label: 'Email Direct',
      value: 'Irsalshydiq@gmail.com',
      link: 'mailto:Irsalshydiq@gmail.com'
    },
    {
      icon: <Linkedin size={18} />,
      label: 'LinkedIn',
      value: 'in/LmIrsalshydiq',
      link: 'https://linkedin.com/in/LmIrsalshydiq'
    },
    {
      icon: <Github size={18} />,
      label: 'GitHub',
      value: '@irsalshydiq',
      link: 'https://github.com/irsalshydiq'
    },
    {
      icon: <Instagram size={18} />,
      label: 'Instagram',
      value: '@irsalshydiq',
      link: 'https://instagram.com/irsalshydiq'
    }
  ];

  const contactInfo = [
    {
      icon: <MapPin size={18} />,
      label: 'Location Base',
      value: 'Bandung, West Java, Indonesia (UTC+7)'
    },
    {
      icon: <Phone size={18} />,
      label: 'Direct Line / WhatsApp',
      value: '+62 821-8727-0634'
    }
  ];

  return (
    <div className="relative min-h-screen pt-12 md:pt-16 pb-24 px-6 overflow-hidden">
      {/* Background Atmospheric Orbs */}
      <div className="absolute inset-0 pointer-events-none flex justify-between">
        <AtmosphericOrb
          color="lavender"
          size={520}
          className="top-12 -left-20 opacity-40 dark:opacity-15"
        />
        <AtmosphericOrb
          color="peach"
          size={480}
          className="top-96 -right-20 opacity-35 dark:opacity-15"
        />
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="caption-uppercase text-[#777169] block mb-2">Inquiries</span>
          <h1 className="display-xl mb-4 font-display font-light">
            Start a Conversation
          </h1>
          <p className="body-md text-[#4e4e4e] dark:text-[#a8a29e]">
            Have an upcoming project, design challenge, or full-time opportunity? Reach out via the form below or connect directly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Main Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <GlassCard className="p-8 md:p-10">
              <div className="mb-6 pb-4 border-b border-[#e7e5e4] dark:border-[#292524]">
                <h2 className="title-md font-medium text-[#0c0a09] dark:text-white">
                  Send a Dispatch
                </h2>
                <p className="body-sm text-[#777169] mt-1">
                  Expected response time is typically within 24 business hours.
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 px-6 rounded-[16px] bg-[#f0efed] dark:bg-[#1c1917] border border-[#e7e5e4] dark:border-[#292524] text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-[#16a34a]/10 text-[#16a34a] flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={24} />
                  </div>
                  <h3 className="title-md font-medium text-[#0c0a09] dark:text-white mb-2">
                    Dispatch Received
                  </h3>
                  <p className="body-sm text-[#4e4e4e] dark:text-[#a8a29e] max-w-md mx-auto">
                    Thank you for writing. Your message has been safely logged and I will review it shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <GlassInput
                      label="Your Full Name"
                      type="text"
                      name="name"
                      placeholder="e.g. Jane Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <GlassInput
                      label="Email Address"
                      type="email"
                      name="email"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <GlassInput
                    label="Subject"
                    type="text"
                    name="subject"
                    placeholder="Project Inquiry / Opportunity"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />

                  <GlassInput
                    label="Message & Context"
                    multiline
                    rows={6}
                    name="message"
                    placeholder="Please describe your project, timeline, and goals..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />

                  <div className="pt-2">
                    <GlassButton
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      <span>Send Dispatch</span>
                      <Send size={15} />
                    </GlassButton>
                  </div>
                </form>
              )}
            </GlassCard>
          </motion.div>

          {/* Right Rail: Contact Information & Availability */}
          <div className="space-y-6">
            {/* Availability Indicator */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GlassCard className="p-6">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <div>
                    <h3 className="title-sm text-[#0c0a09] dark:text-white font-medium">
                      Currently Available
                    </h3>
                    <p className="caption text-[#777169]">
                      Open for Q1–Q2 freelance and full-time engagements
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Direct Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <GlassCard className="p-6">
                <h3 className="caption-uppercase text-[12px] text-[#777169] mb-4 font-semibold tracking-[0.96px]">
                  Coordinates
                </h3>
                <div className="space-y-4">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#f0efed] dark:bg-[#292524] flex items-center justify-center flex-shrink-0 text-[#0c0a09] dark:text-white mt-0.5">
                        {info.icon}
                      </div>
                      <div>
                        <p className="caption text-[#777169]">{info.label}</p>
                        <p className="body-sm font-medium text-[#0c0a09] dark:text-white">{info.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Channels & Social */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <GlassCard className="p-6">
                <h3 className="caption-uppercase text-[12px] text-[#777169] mb-4 font-semibold tracking-[0.96px]">
                  Digital Channels
                </h3>
                <div className="space-y-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        flex items-center justify-between p-3 rounded-[12px]
                        transition-colors duration-150 group
                        ${isLight ? 'hover:bg-[#f0efed]' : 'hover:bg-[#292524]'}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#f0efed] dark:bg-[#292524] flex items-center justify-center text-[#0c0a09] dark:text-white">
                          {social.icon}
                        </div>
                        <div>
                          <p className="body-sm font-medium text-[#0c0a09] dark:text-white leading-tight">
                            {social.label}
                          </p>
                          <p className="caption text-[#777169]">{social.value}</p>
                        </div>
                      </div>
                      <ArrowUpRight size={14} className="text-[#a8a29e] group-hover:text-[#0c0a09] dark:group-hover:text-white transition-colors" />
                    </a>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
