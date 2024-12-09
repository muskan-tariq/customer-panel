import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, Facebook, Instagram, Twitter } from 'lucide-react';
import { useState } from 'react';
import emailService from '../../services/emailService';
import { toast } from 'react-hot-toast';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailService.sendContactEmail(formData);
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.div 
        className="relative h-[200px] bg-white border-b border-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-[450] text-[#303030] tracking-[-0.02em]"
            style={{ 
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Contact Us
          </motion.h1>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-[450] text-[#303030] mb-6 tracking-[-0.01em]"
              style={{ 
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
              }}
            >
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-[450] text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#FF66C4] focus:border-[#FF66C4] transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-[450] text-gray-700 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#FF66C4] focus:border-[#FF66C4] transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-[450] text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#FF66C4] focus:border-[#FF66C4] transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-[450] text-gray-700 mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#FF66C4] focus:border-[#FF66C4] transition-colors"
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="w-full bg-[#FF66C4] text-white py-3 rounded-md hover:bg-[#ff4db7] transition-colors flex items-center justify-center gap-2 font-[450] disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-[450] text-[#303030] mb-6 tracking-[-0.01em]"
              style={{ 
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
              }}
            >
              Get in Touch
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-pink-50 rounded-full">
                  <Mail className="w-6 h-6 text-[#FF66C4]" />
                </div>
                <div>
                  <h3 className="font-[450] text-[#303030] mb-1">Email Us</h3>
                  <p className="text-gray-600">info@sameglow.co</p>
                  <p className="text-gray-600">support@sameglow.co</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-pink-50 rounded-full">
                  <Phone className="w-6 h-6 text-[#FF66C4]" />
                </div>
                <div>
                  <h3 className="font-[450] text-[#303030] mb-1">Call Us</h3>
                  <p className="text-gray-600">+63 912 345 6789</p>
                  <p className="text-gray-600">+63 998 765 4321</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-pink-50 rounded-full">
                  <MapPin className="w-6 h-6 text-[#FF66C4]" />
                </div>
                <div>
                  <h3 className="font-[450] text-[#303030] mb-1">Visit Us</h3>
                  <p className="text-gray-600">123 Beauty Street, Makati City</p>
                  <p className="text-gray-600">Metro Manila, Philippines</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-pink-50 rounded-full">
                  <Clock className="w-6 h-6 text-[#FF66C4]" />
                </div>
                <div>
                  <h3 className="font-[450] text-[#303030] mb-1">Business Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Saturday: 9:00 AM - 4:00 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-6">
              <h3 className="font-[450] text-[#303030] mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <motion.a
                  href="#"
                  className="p-3 bg-pink-50 rounded-full hover:bg-[#FF66C4] transition-colors group"
                  whileHover={{ y: -2 }}
                >
                  <Facebook className="w-5 h-5 text-[#FF66C4] group-hover:text-white" />
                </motion.a>
                <motion.a
                  href="#"
                  className="p-3 bg-pink-50 rounded-full hover:bg-[#FF66C4] transition-colors group"
                  whileHover={{ y: -2 }}
                >
                  <Instagram className="w-5 h-5 text-[#FF66C4] group-hover:text-white" />
                </motion.a>
                <motion.a
                  href="#"
                  className="p-3 bg-pink-50 rounded-full hover:bg-[#FF66C4] transition-colors group"
                  whileHover={{ y: -2 }}
                >
                  <Twitter className="w-5 h-5 text-[#FF66C4] group-hover:text-white" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs; 