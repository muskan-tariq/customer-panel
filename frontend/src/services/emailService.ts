import axios from 'axios';
import { API_URL } from '../config/api';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

class EmailService {
  async sendContactEmail(data: ContactFormData): Promise<void> {
    try {
      await axios.post(`${API_URL}/email/contact`, data);
    } catch (error) {
      console.error('Error sending contact email:', error);
      throw error;
    }
  }
}

export default new EmailService(); 