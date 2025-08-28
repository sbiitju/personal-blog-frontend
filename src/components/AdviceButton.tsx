"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Send, Loader2, X } from "lucide-react";
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from "@/config/emailjs.config";
import { useDomain } from "@/hooks/useDomain";
import { useGetUserByDomain } from "@/hooks/auth.hook";

interface AdviceFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function AdviceButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<AdviceFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const domain = useDomain();
  const { data: userData } = useGetUserByDomain(domain);
  const emailJs = userData?.data?.emailJs || {};

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const serviceId = emailJs.serviceId || EMAILJS_CONFIG.SERVICE_ID;
      const templateId = emailJs.templateId || EMAILJS_CONFIG.TEMPLATE_ID;
      const publicKey = emailJs.publicKey || EMAILJS_CONFIG.PUBLIC_KEY;
      const toEmail = emailJs.toEmail;

      if (!serviceId || !templateId || !publicKey) {
        toast.error("ইমেইল কনফিগারেশন অনুপস্থিত। অ্যাডমিন সেটিংস থেকে কনফিগার করুন।");
        setIsLoading(false);
        return;
      }
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: "Admin",
        to_email: toEmail,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      toast.success("আপনার পরামর্শ সফলভাবে পাঠানো হয়েছে!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsOpen(false);
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error("পরামর্শ পাঠাতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-[#e7000b] to-[#86383c] text-white hover:from-[#d6000a] hover:to-[#7a3236] transition-all duration-300 font-bengali-medium"
        size="lg"
      >
        <Send className="w-4 h-4 mr-2" />
        পরামর্শ দিন
      </Button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-xl font-bengali-semibold text-gray-900">পরামর্শ দিন</h2>
                <p className="text-sm text-gray-600 font-bengali-normal mt-1">
                  আপনার মূল্যবান পরামর্শ আমাদের কাছে পাঠান
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeModal}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-bengali-medium">নাম *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="আপনার নাম লিখুন"
                  required
                  className="font-bengali-normal"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="font-bengali-medium">ইমেইল *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="আপনার ইমেইল লিখুন"
                  required
                  className="font-bengali-normal"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject" className="font-bengali-medium">বিষয় *</Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="পরামর্শের বিষয় লিখুন"
                  required
                  className="font-bengali-normal"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message" className="font-bengali-medium">পরামর্শ *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="আপনার পরামর্শ বিস্তারিত লিখুন..."
                  rows={4}
                  required
                  className="font-bengali-normal resize-none"
                />
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeModal}
                  className="font-bengali-medium"
                >
                  বাতিল
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-[#e7000b] to-[#86383c] text-white hover:from-[#d6000a] hover:to-[#7a3236] transition-all duration-300 font-bengali-medium"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      পাঠানো হচ্ছে...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      পাঠান
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
