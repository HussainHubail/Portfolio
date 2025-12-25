"use client";

import { useState } from "react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";
import { Mail, Linkedin, Phone, MapPin, Send, Phone as PhoneIcon } from "lucide-react";
import { profile } from "@/content/profile";

export default function ContactPage() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // honeypot (changed from honeypot to website)
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check - if filled, silently fail (bot likely)
    if (formData.website && formData.website.trim() !== "") {
      showToast("Something went wrong. Please try again.", "error");
      return;
    }

    // Validation
    if (!formData.name.trim()) {
      showToast("Please enter your name", "warning");
      return;
    }

    if (!formData.email.trim()) {
      showToast("Please enter your email", "warning");
      return;
    }

    if (!validateEmail(formData.email)) {
      showToast("Please enter a valid email address", "warning");
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      showToast("Message must be at least 10 characters", "warning");
      return;
    }

    if (formData.message.trim().length > 2000) {
      showToast("Message must be less than 2000 characters", "warning");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "New Contact Form Submission",
          message: formData.message,
          website: formData.website,
        }),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        showToast("Message sent successfully! I'll get back to you soon.", "success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          website: "",
        });
      } else if (response.status === 429) {
        showToast("Too many requests. Please try again in a minute.", "error");
      } else {
        const errorMsg = data.error || "Failed to send message";
        showToast(errorMsg, "error");
      }
    } catch (error) {
      showToast(
        "Failed to send message. Please try emailing me directly at " + profile.email,
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+973 39011560",
      href: "tel:+97339011560",
    },
    {
      icon: MapPin,
      label: "Location",
      value: profile.location,
      href: null,
    },
    {
      icon: PhoneIcon,
      label: "Phone",
      value: profile.phone || "Contact me",
      href: profile.phone ? `tel:${profile.phone}` : null,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Connect on LinkedIn",
      href: profile.social.linkedin,
    },
  ];

  return (
    <Section id="contact" className="pt-32 pb-16">
      <SectionHeader
        title="Get in Touch"
        description="Have a question or want to collaborate? I'd love to hear from you!"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Form */}
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot field (hidden from users) */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or idea..."
                  rows={6}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>Sending...</>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                This form is protected by a simple spam filter. Your data will only be used to respond to your inquiry.
              </p>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <p className="text-muted-foreground mb-6">
                Feel free to reach out through the form or any of the channels below. 
                I typically respond within 24-48 hours.
              </p>

              <div className="space-y-4">
                {contactMethods.map((method) => {
                  const Icon = method.icon;
                  const content = (
                    <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-accent transition-colors">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium mb-1">{method.label}</div>
                        <div className="text-sm text-muted-foreground">
                          {method.value}
                        </div>
                      </div>
                    </div>
                  );

                  return method.href ? (
                    <a
                      key={method.label}
                      href={method.href}
                      target={method.href.startsWith("http") ? "_blank" : undefined}
                      rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={method.label}>{content}</div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4">Availability</h3>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="font-medium text-green-600 dark:text-green-400">
                  {profile.availability}
                </span>
              </div>
              <p className="text-muted-foreground">
                I'm currently a senior year ICT student at Bahrain Polytechnic, open to internships, 
                project collaborations, and learning opportunities. Let's connect and discuss how we can work together!
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4">What to Expect</h3>
              <ul className="space-y-3">
                {[
                  "Quick response within 24-48 hours",
                  "Professional and friendly communication",
                  "Eager to learn and collaborate",
                  "Open to feedback and new ideas",
                  "Confidentiality of your information",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
  );
}
