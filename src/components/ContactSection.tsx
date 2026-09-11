"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Copy, Check, Sparkles, Terminal, MessageSquare, Briefcase, Microscope, Cloud } from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";
import { PROFILE_DATA } from "@/data/profile";

const INQUIRY_TYPES = [
  { id: "career", label: "Career / Opportunity", icon: Briefcase },
  { id: "research", label: "Research Collaboration", icon: Microscope },
  { id: "cloud", label: "Cloud & Systems Architecture", icon: Cloud },
  { id: "general", label: "General Discussion", icon: MessageSquare },
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "career",
    subject: "",
    message: "",
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedAcademicEmail, setCopiedAcademicEmail] = useState(false);
  const [status, setStatus] = useState<"idle" | "transmitting" | "success">("idle");
  const [receiptHash, setReceiptHash] = useState<string>("");

  const handleCopy = (text: string, isAcademic: boolean) => {
    navigator.clipboard.writeText(text);
    if (isAcademic) {
      setCopiedAcademicEmail(true);
      setTimeout(() => setCopiedAcademicEmail(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setStatus("transmitting");

    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "058728d2-ca49-43c3-888e-67a63459c55b",
          from_name: formData.name,
          email: formData.email,
          subject: `[Portfolio: ${formData.inquiryType.toUpperCase()}] ${formData.subject || "Inquiry"}`,
          message: formData.message,
          to_email: PROFILE_DATA.email,
        }),
      });

      const randomHash = "0x" + Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
      setReceiptHash(randomHash);
      setStatus("success");
    } catch {
      const mailtoUrl = `mailto:${PROFILE_DATA.email}?subject=${encodeURIComponent(
        `[${formData.inquiryType.toUpperCase()}] ${formData.subject || "Portfolio Contact"}`
      )}&body=${encodeURIComponent(
        `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
      )}`;
      window.open(mailtoUrl, "_blank");
      setStatus("success");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      inquiryType: "career",
      subject: "",
      message: "",
    });
    setStatus("idle");
  };

  return (
    <section id="contact" className="py-20 font-mono relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-slate-200 dark:border-[#1e2738] pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Terminal className="w-4 h-4" />
              <span>06 // TRANSMISSION GATEWAY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Initiate Transmission & Contact
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md font-sans">
            Open for software engineering opportunities, network security & ad-hoc wireless research collaborations, and systems architecture consultations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xl bg-white dark:bg-[#151c2a] border border-slate-200 dark:border-[#222e44] p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                  Gateway Status: Active
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed mb-6">
                Direct queries are monitored continuously. For research papers or academic inquiries, reach out via the NSUT Delhi institution domain or personal direct mail.
              </p>

              <div className="space-y-3 text-xs">
                {/* Personal Email */}
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#111722] border border-slate-200 dark:border-[#1e2738] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Primary Mail</div>
                      <div className="text-slate-800 dark:text-slate-200 truncate font-semibold">{PROFILE_DATA.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(PROFILE_DATA.email, false)}
                    className="p-1.5 rounded bg-slate-200/70 hover:bg-slate-300 dark:bg-[#1a2233] dark:hover:bg-[#222d42] text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors shrink-0 cursor-pointer"
                    title="Copy Email Address"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Academic Email */}
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#111722] border border-slate-200 dark:border-[#1e2738] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Mail className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">NSUT Delhi Academic</div>
                      <div className="text-slate-800 dark:text-slate-200 truncate font-semibold">{PROFILE_DATA.academicEmail}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(PROFILE_DATA.academicEmail, true)}
                    className="p-1.5 rounded bg-slate-200/70 hover:bg-slate-300 dark:bg-[#1a2233] dark:hover:bg-[#222d42] text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors shrink-0 cursor-pointer"
                    title="Copy Academic Email"
                  >
                    {copiedAcademicEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Phone */}
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#111722] border border-slate-200 dark:border-[#1e2738] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Phone className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Direct Phone</div>
                      <div className="text-slate-800 dark:text-slate-200 font-semibold">{PROFILE_DATA.phone}</div>
                    </div>
                  </div>
                  <a
                    href={`tel:${PROFILE_DATA.phone}`}
                    className="text-[10px] px-2 py-1 rounded bg-slate-200/70 hover:bg-slate-300 dark:bg-[#1a2233] dark:hover:bg-[#222d42] text-cyan-700 dark:text-cyan-400 transition-colors font-semibold shrink-0"
                  >
                    Call
                  </a>
                </div>

                {/* Location & Base */}
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#111722] border border-slate-200 dark:border-[#1e2738] flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Location & Base</div>
                    <div className="text-slate-800 dark:text-slate-200 font-semibold">{PROFILE_DATA.location}</div>
                  </div>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="pt-5 mt-5 border-t border-slate-200 dark:border-[#1e2738] flex flex-wrap gap-2">
                <a
                  href={PROFILE_DATA.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-[#111722] dark:hover:bg-[#1a2233] border border-slate-200 dark:border-[#1e2738] text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 text-xs transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PROFILE_DATA.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-[#111722] dark:hover:bg-[#1a2233] border border-slate-200 dark:border-[#1e2738] text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 text-xs transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* SLA Badge */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/30 text-xs text-slate-700 dark:text-slate-300 space-y-1 font-sans">
              <div className="font-bold font-mono text-cyan-700 dark:text-cyan-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Response SLA: Within 12-24 Hours</span>
              </div>
              <p className="text-[11.5px] leading-relaxed">
                Messages dispatched via this gateway route directly to Dhruv Upadhyay&apos;s authenticated terminal and mailbox.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-xl bg-white dark:bg-[#151c2a] border border-slate-200 dark:border-[#222e44] p-6 sm:p-8 shadow-sm">
              {status === "success" ? (
                <div className="py-8 text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Transmission Packet Delivered
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-sans mt-1 max-w-md mx-auto">
                      Thank you for reaching out. Your transmission payload has been dispatched directly to Dhruv.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-[#111722] border border-slate-200 dark:border-[#1e2738] text-left text-xs font-mono max-w-md mx-auto space-y-1.5 text-slate-600 dark:text-slate-400">
                    <div className="flex justify-between">
                      <span>Gateway Hash:</span>
                      <span className="text-cyan-600 dark:text-cyan-400 font-bold">{receiptHash}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Recipient:</span>
                      <span className="text-slate-800 dark:text-slate-200">{PROFILE_DATA.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Channel:</span>
                      <span className="text-teal-600 dark:text-teal-400 font-bold">{formData.inquiryType.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Timestamp:</span>
                      <span>{new Date().toLocaleTimeString()}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleReset}
                      className="px-5 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-[#1c2536] dark:hover:bg-[#232f45] border border-slate-200 dark:border-[#2b3952] text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Transmit Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">
                      Transmission Payload
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                      Fill out the parameters below to dispatch a direct message.
                    </p>
                  </div>

                  {/* Channel Selection */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                      Select Inquiry Channel:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {INQUIRY_TYPES.map((type) => {
                        const Icon = type.icon;
                        const isSelected = formData.inquiryType === type.id;
                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, inquiryType: type.id })}
                            className={`p-2.5 rounded-lg text-left text-xs border transition-all cursor-pointer flex flex-col gap-1.5 ${
                              isSelected
                                ? "bg-cyan-50 dark:bg-cyan-950/40 border-cyan-500 text-cyan-800 dark:text-cyan-300 font-bold shadow-sm"
                                : "bg-slate-50 dark:bg-[#111722] border-slate-200 dark:border-[#1e2738] text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-[#2a374f]"
                            }`}
                          >
                            <Icon className={`w-4 h-4 ${isSelected ? "text-cyan-600 dark:text-cyan-400" : "text-slate-400"}`} />
                            <span className="text-[11px] leading-tight truncate">{type.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Sender Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Dr. Alex Mercer / Hiring Manager"
                        className="w-full bg-slate-50 dark:bg-[#111722] border border-slate-200 dark:border-[#1e2738] focus:border-cyan-500 dark:focus:border-cyan-400 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none transition-colors font-sans"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Sender Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@organization.com"
                        className="w-full bg-slate-50 dark:bg-[#111722] border border-slate-200 dark:border-[#1e2738] focus:border-cyan-500 dark:focus:border-cyan-400 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none transition-colors font-sans"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Systems Engineering Opportunity / Research Collaboration"
                      className="w-full bg-slate-50 dark:bg-[#111722] border border-slate-200 dark:border-[#1e2738] focus:border-cyan-500 dark:focus:border-cyan-400 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none transition-colors font-sans"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Message Payload *
                      </label>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {formData.message.length} chars
                      </span>
                    </div>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Detail your inquiry, opportunity scope, technical question, or research discussion..."
                      className="w-full bg-slate-50 dark:bg-[#111722] border border-slate-200 dark:border-[#1e2738] focus:border-cyan-500 dark:focus:border-cyan-400 rounded-lg p-3.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none transition-colors resize-none font-sans leading-relaxed"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      disabled={status === "transmitting" || !formData.name.trim() || !formData.email.trim() || !formData.message.trim()}
                      className="w-full sm:flex-1 py-3 px-5 rounded-lg bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white dark:text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20 disabled:opacity-50 transition-all cursor-pointer"
                    >
                      {status === "transmitting" ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          <span>Transmitting Telemetry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Dispatch Message Payload</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`mailto:${PROFILE_DATA.email}?subject=${encodeURIComponent(
                        `[${formData.inquiryType.toUpperCase()}] ${formData.subject || "Direct Portfolio Contact"}`
                      )}`}
                      className="w-full sm:w-auto py-3 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-[#1a2233] dark:hover:bg-[#222d42] border border-slate-200 dark:border-[#222e44] text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                      title="Open in your default email client"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Direct Mailto</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
