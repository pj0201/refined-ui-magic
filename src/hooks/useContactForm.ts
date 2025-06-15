
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';

// Define the shape of the form data
export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  position: string;
  phone: string;
  industry: string;
  employees: string;
  consultationType: string;
  contactMethod: string;
  urgency: string;
  budget: string;
  timeline: string;
  message: string;
}

// Initial state for the form data
const initialFormData: ContactFormData = {
  name: '',
  email: '',
  company: '',
  position: '',
  phone: '',
  industry: '',
  employees: '',
  consultationType: '',
  contactMethod: '',
  urgency: '',
  budget: '',
  timeline: '',
  message: ''
};

interface UseContactFormProps {
  subject: string;
  setOpen: (open: boolean) => void;
}

export const useContactForm = ({ subject, setOpen }: UseContactFormProps) => {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: keyof ContactFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("必須項目を入力してください");
      return;
    }

    setIsSubmitting(true);

    try {
      const serviceId = 'service_vf5jkap';
      const templateId = 'template_w93kdji';
      const publicKey = '5sOygxcn87FCfc_uL';

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company,
        position: formData.position,
        phone: formData.phone,
        industry: formData.industry,
        employees: formData.employees,
        consultation_type: formData.consultationType,
        contact_method: formData.contactMethod,
        urgency: formData.urgency,
        budget: formData.budget,
        timeline: formData.timeline,
        message: formData.message,
        subject: subject,
        to_email: 'mtdgjtwpmt23468@gmail.com',
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      toast.success("お問い合わせを送信しました。ありがとうございます！");
      
      setFormData(initialFormData);
      setOpen(false);

    } catch (error) {
      console.error('メール送信エラー:', error);
      toast.error("送信に失敗しました。しばらく後に再度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    handleChange,
    handleSelectChange,
    handleSubmit
  };
};
