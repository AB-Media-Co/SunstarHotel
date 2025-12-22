/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from "react";
import { ArrowForward as ArrowForwardIcon, Close as CloseIcon } from '@mui/icons-material';
import TestimonialSection from "../../Components/TestimonialSection";
import CommonUseEnquiryForm from "../../Components/CommonUseEnquiryForm";
import { useEnquiryForm } from "../../ApiHooks/useEnquiryFormHook";
import {
  useGetAgentByEmail,
  useLoginAgent,
  useVerifyAgentOtp,
  useResendAgentOtp
} from "../../ApiHooks/useAgentHook";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useGetMetas } from "../../ApiHooks/useMetaHook";
import Partnerlogos from "../Home/Components/Partnerlogos";
import { SeoData } from "../../Data/SeoData";
import { useGetTravelAgentPage } from "../../ApiHooks/useTravelAgentPage";
import FAQSectionWithAPI from "../../Components/FAQSectionWithAPI";
import useUpdatePagesHook from "../../ApiHooks/useUpdatePagesHook";
import CompnayCards from "../About/Components/CompnayCards";
import SunstarInfoCards from "../InTheMedia/Component/SunstarInfoCards";

/* --------------------- Modal --------------------- */
const AgentSignupModal = ({ open, onClose }) => {
  const loginMutation = useLoginAgent();
  const verifyMutation = useVerifyAgentOtp();
  const resendMutation = useResendAgentOtp();

  const [step, setStep] = useState("form");
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "agent", companyName: "" });
  const [otp, setOtp] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(120);

  useEffect(() => {
    if (!open) {
      setStep("form");
      setForm({ name: "", email: "", phone: "", role: "agent", companyName: "" });
      setOtp("");
      setSecondsLeft(120);
    }
  }, [open]);

  useEffect(() => {
    if (step !== "otp" || secondsLeft <= 0) return;
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [step, secondsLeft]);

  const disabledForm = useMemo(() =>
    !form.name.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ||
    !/^\d{7,}$/.test(form.phone) ||
    loginMutation.isPending
    , [form, loginMutation.isPending]);

  const disabledOtp = useMemo(() => otp.trim().length !== 6 || verifyMutation.isPending, [otp, verifyMutation.isPending]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    loginMutation.mutate(
      { name: form.name.trim(), email: form.email.trim().toLowerCase(), phone: form.phone.trim(), role: "agent" },
      {
        onSuccess: () => { setStep("otp"); setSecondsLeft(120); },
        onError: (err) => console.error(err?.response?.data?.message || "Sign up / login failed"),
      }
    );
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    verifyMutation.mutate(
      { email: form.email.trim().toLowerCase(), otp: otp.trim() },
      {
        onSuccess: (resp) => {
          if (resp?.ok) {
            localStorage.setItem("user_email", resp?.data?.email || form.email.trim().toLowerCase());
            onClose?.();
          } else console.error(resp?.message || "Verification failed");
        },
        onError: (error) => console.error(error?.response?.data?.message || "Invalid or expired OTP"),
      }
    );
  };

  const handleResend = () => {
    if (secondsLeft > 0) return;
    resendMutation.mutate(
      { email: form.email.trim().toLowerCase(), phone: form.phone.trim(), name: form.name.trim(), role: "agent" },
      {
        onSuccess: () => setSecondsLeft(120),
        onError: (err) => console.error(err?.response?.data?.message || "Failed to resend OTP"),
      }
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000]">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative mx-auto mt-20 w-[92%] max-w-xl bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">
            {step === "form" ? "Join as Travel Agent" : "Enter OTP"}
          </h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <CloseIcon fontSize="small" />
          </button>
        </div>

        {step === "form" ? (
          <form onSubmit={handleSubmitForm} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-yellow"
                placeholder="Agent Name"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-yellow"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value.replace(/\D/g, "") }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-yellow"
                  placeholder="9876543210"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company (optional)</label>
              <input
                type="text"
                value={form.companyName}
                onChange={(e) => setForm((s) => ({ ...s, companyName: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-yellow"
                placeholder="Company Name"
              />
            </div>

            <button
              type="submit"
              disabled={disabledForm}
              className={`w-full flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-semibold text-white transition
                ${disabledForm ? "bg-gray-400 cursor-not-allowed" : "bg-primary-yellow hover:brightness-110"}`}
            >
              {loginMutation.isPending ? "Sending OTP..." : "Get OTP"}
              {!loginMutation.isPending && <ArrowForwardIcon fontSize="small" />}
            </button>

            <p className="text-xs text-gray-500 text-center">
              By continuing you agree to receive a one-time password on your email.
            </p>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <p className="text-sm text-gray-600">
              We sent a 6-digit code to <b>{form.email}</b>. Enter it below to verify your login.
            </p>

            <input
              type="text"
              inputMode="numeric"
              pattern="\d*"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="w-full text-center tracking-[0.5em] text-2xl rounded-lg border border-gray-300 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-primary-yellow"
              placeholder="______"
              autoFocus
            />

            <button
              type="submit"
              disabled={disabledOtp}
              className={`w-full flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-semibold text-white transition
                ${disabledOtp ? "bg-gray-400 cursor-not-allowed" : "bg-primary-green hover:brightness-110"}`}
            >
              {verifyMutation.isPending ? "Verifying..." : "Verify & Continue"}
            </button>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <button type="button" onClick={() => setStep("form")} className="underline underline-offset-2">
                Change email
              </button>

              <button
                type="button"
                onClick={handleResend}
                disabled={secondsLeft > 0 || resendMutation.isPending}
                className={`underline underline-offset-2 ${secondsLeft > 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                title={secondsLeft > 0 ? `Resend in ${secondsLeft}s` : "Resend OTP"}
              >
                {secondsLeft > 0 ? `Resend in ${secondsLeft}s` : (resendMutation.isPending ? "Resending..." : "Resend OTP")}
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              Didn’t receive the email? Check your spam folder or try resending.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
/* ------------------- end Modal ------------------- */

/* ------------------ Sections ------------------ */
const HeroSection = ({ title, description, imageSrc, onSignupClick, buttonText, showProfileBtn, loadingAgent, isApprovalPending }) => {
  const navigate = useNavigate();
  const onViewProfile = () => navigate("/user/profile", { state: { tab: "agent" } });

  return (
    <section
      className="relative h-[100vh] md:h-[100vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${imageSrc})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="relative content mx-auto h-full flex flex-col justify-center pt-20 items-start px-4">
        <h1 className="text-mobile/h3 md:text-desktop/h2 text-primary-white max-w-2xl font-bold">{title}</h1>
        <p className="mt-4 text-mobile/body/2 md:text-desktop/body/2/regular text-primary-white max-w-2xl">{description}</p>

        {!loadingAgent && showProfileBtn ? (
          <button onClick={onViewProfile} className="mt-8 bg-primary-white text-primary-yellow px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition duration-300 flex items-center">
            View My Profile
          </button>
        ) : isApprovalPending ? (
          <button disabled title="Your account is verified but pending approval" className="mt-8 bg-primary-white/70 text-primary-yellow/70 px-8 py-3 rounded-lg font-bold cursor-not-allowed transition duration-300 flex items-center">
            Approval Pending
          </button>
        ) : (
          <button onClick={onSignupClick} className="mt-8 bg-primary-white text-primary-yellow px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition duration-300 flex items-center">
            {buttonText} <ArrowForwardIcon className="ml-2" />
          </button>
        )}
      </div>
    </section>
  );
};

const BenefitsSection = ({ benefits = [], align = "left" }) => {
  const isCenter = align === "center";
  const textAlign = isCenter ? "text-center" : "text-left";
  const itemAlign = isCenter ? "items-center" : "items-start";

  return (
    <section className="md:py-16 py-10">
      <div className="content max-w-screen-xl mx-auto px-4">
        <h2 className="text-mobile/h3 md:text-desktop/h3 text-gray-700 font-bold mb-12 text-start">
          Why Partner With Us?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          {benefits.map((item, index) => (
            <article
              key={index}
              className={`h-[93%] bg-white p-6 rounded-xl text-gray-700 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col ${itemAlign} ${textAlign}`}
            >
              <div className={`${isCenter ? "mx-auto" : ""} mb-4 flex items-center justify-center`}>
                {item?.icon ? (
                  <img src={item.icon} alt={item.title ? `${item.title} icon` : "Benefit icon"} className="block w-[4rem] object-contain" loading="lazy" />
                ) : null}
              </div>

              <h3 className="text-lg font-bold mb-2 text-gray-900">{item.title}</h3>
              <p className="text-mobile/body/2 pb-4 md:text-desktop/body/1 text-primary-gray leading-relaxed">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorksSection = ({ steps }) => (
  <section className="md:py-16 py-10 px-2 bg-gray-50">
    <div className="content mx-auto">
      <h2 className="text-mobile/h3 md:text-desktop/h3 text-gray-700 text-start font-bold mb-12">
        How It Works
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {steps.map((item, index) => (
          <div key={index} className="flex flex-col items-start text-start">
            <div className="bg-primary-green text-white rounded-full w-24 h-24 flex items-center justify-center mb-4">
              <img src={item.icon} alt="" className="w-16 h-16" />
            </div>
            <h3 className="text-lg font-bold text-gray-700 mb-2">{item.title}</h3>
            <p className="text-mobile/body/2 md:text-desktop/body/1 text-primary-gray">{item.desc}</p>
          </div>
        ))}
      </div>

    </div>
  </section>
);

/* ------------- Enquiry form ------------- */
const AgentRegistrationForm = ({ page = 'Agent Registration', gid = [226066483] }) => {
  const { mutate, isLoading } = useEnquiryForm();
  const formFields = [
    { name: "agentName", placeholder: "Name", required: true },
    { name: "companyName", placeholder: "Company Name", required: true },
    { name: "phone", type: "tel", placeholder: "Phone", required: true },
    { name: "email", type: "email", placeholder: "Email", required: true },
    { name: "cityState", placeholder: "City / State", required: true },
    { name: "gstDetails", placeholder: "Company GST Details", required: true },
    { name: "requirements", type: "textarea", placeholder: "Your Requirements / Queries", rows: 4, colSpan: "md:col-span-2", required: true },
  ];

  const handleSubmit = (formData, callbacks) => {
    mutate(
      { ...formData, page, gid },
      {
        onSuccess: () => {
          callbacks.onSuccess();
          alert("Thank you for registering! Our team will contact you shortly.");
        },
        onError: callbacks.onError,
      }
    );
  };

  return (
    <CommonUseEnquiryForm
      title="Agent Registration Form"
      subtitle="Register now to join our travel agent network"
      fields={formFields}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      submitButtonText="Submit & Join Now"
    />
  );
};
/* ----------------- end legacy form ---------------- */

const TravelAgent = () => {
  const [openSignup, setOpenSignup] = useState(false);
  const { offeringSection } = useUpdatePagesHook();

  // meta
  const { data: metas } = useGetMetas();
  const travelagent = Array.isArray(metas) ? metas.find((m) => m.page === "travel-agent") : null;

  // agent status
  const userInfo = localStorage.getItem("user_email") || "";
  const { data: agentRec, isLoading: loadingAgent } = useGetAgentByEmail(userInfo);
  const isAgent = !!agentRec && agentRec?.role === "agent";
  const isApproved = agentRec?.approved ?? false;
  const isVerified = agentRec?.isVerified ?? false;
  const showProfileBtn = !loadingAgent && isAgent && isApproved;
  const isApprovalPending = !loadingAgent && isAgent && isVerified && !isApproved;

  // ✅ API: Travel Agent page
  const { data, isFetching } = useGetTravelAgentPage();


  // ---------- HERO from API (fallback to static bg) ----------
  const heroContent = {
    title: data?.hero?.heading,
    description: data?.hero?.description,
    imageSrc:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    buttonText: "Login Or Sign Up"
  };

  // ---------- PARTNER WITH US: keep your icons, use API text ----------
  const partnerIcons = [
    "/images/t1.svg",
    "/images/t2.svg",
    "/images/t3.svg",
    "/images/t4.svg",
    "/images/t5.svg",
    "/images/t6.svg",
    "/images/t7.svg"
  ];

  const benefits = useMemo(() => {
    const apiCards = data?.partnerWithUs?.cards || [];
    if (!apiCards.length) {
      // fallback to your old hardcoded text + icons
      return [
        { icon: '/images/t1.svg', title: 'Earn Commission', desc: 'Attractive commission structure to maximize your earnings on every booking.' },
        { icon: '/images/t2.svg', title: 'Exclusive Discounts', desc: 'Offer your clients up to 5% off on standard online room rates.' },
        { icon: '/images/t3.svg', title: 'Free Rooms', desc: 'Get 1 complimentary room for every 15 rooms booked (valid for group bookings only).' },
        { icon: '/images/t4.svg', title: 'Exclusive Gifts', desc: 'Enjoy surprise rewards and special gifts after every 25 nights booked through your account.' },
        { icon: '/images/t5.svg', title: 'Dedicated Support', desc: 'Quick resolutions and smooth coordination through our single-window partner support system.' },
        { icon: '/images/t6.svg', title: 'Marketing Materials', desc: 'Access to ready-to-use banners, booking kits, brochures, and other promotional content.' },
        { icon: '/images/t7.svg', title: 'Award-Winning Hospitality', desc: 'Recognized for excellence in service, cleanliness, dining, and guest satisfaction.' }
      ];
    }
    // map api cards onto your icons by index
    return apiCards.map((c, i) => ({
      icon: partnerIcons[i % partnerIcons.length],
      title: c.title,
      desc: c.description
    }));
  }, [data]);

  // ---------- HOW IT WORKS: keep your icons, use API text ----------
  const howIcons = [
    "/images/1a.svg",
    "/images/2a.svg",
    "/images/3a.svg",
    "/images/4a.svg",
    "/images/5a.svg",
  ];

  const steps = useMemo(() => {
    const apiCards = data?.howItWorks?.cards || [];
    if (!apiCards.length) {
      return [
        { icon: '/images/1a.svg', title: 'Register', desc: 'Sign up as a travel agent with us — quick, simple, and absolutely free.' },
        { icon: '/images/2a.svg', title: 'Submit for Approval', desc: 'Once registered, submit your details for verification. Our team will review and approve your application promptly.' },
        { icon: '/images/3a.svg', title: 'Get Portal Access', desc: 'After approval, unlock your personal agent dashboard to manage bookings and track commissions with ease.' },
        { icon: '/images/4a.svg', title: 'Book & Earn', desc: 'Start booking rooms with instant confirmation and earn attractive commissions on every successful booking.' },
        { icon: '/images/5a.svg', title: 'Unlock Exclusive Gifts', desc: 'Get surprise rewards like free meals, room upgrades, or special discounts — gifted after every 25 nights booked!' }
      ];
    }
    return apiCards.map((c, i) => ({
      icon: howIcons[i % howIcons.length],
      title: c.title,
      desc: c.description
    }));
  }, [data]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div>
      <Helmet>
        <title>{travelagent?.metaTitle || 'Tour & Travel - Sunstar Hotels'}</title>
        <meta name="description" content={travelagent?.metaDescription || ''} />
        <meta name="keywords" content={travelagent?.metaKeywords?.join(', ') || ''} />
        <meta property="og:title" content={SeoData.travelAgent.title} />
        <meta property="og:description" content={SeoData.travelAgent.description} />
      </Helmet>

      <HeroSection
        {...heroContent}
        onSignupClick={() => setOpenSignup(true)}
        showProfileBtn={showProfileBtn}
        loadingAgent={loadingAgent}
        isApprovalPending={isApprovalPending}
      />

      {/* API-powered, icon-preserving sections */}
      <BenefitsSection benefits={benefits} />
      {/* <CompnayCards data={offeringSection?.travelAgent} /> */}
      <Partnerlogos category="Travel Agent" />
      <TestimonialSection page="travel-agent" head="What Our Partners Say" />
      <HowItWorksSection steps={steps} />

      <AgentRegistrationForm />

      <div className="relative flex flex-col justify-between content items-center mt-10 py-10 z-0">
        <ImageGallery />
      </div>

      {/* <SunstarInfoCards
        infoCards={offeringSection?.travelAgent}
      /> */}

      <FAQSectionWithAPI pageName="Travel Agent" />

      {/* Modal */}
      <AgentSignupModal open={openSignup} onClose={() => setOpenSignup(false)} />
    </div>
  );
};

export default TravelAgent;
