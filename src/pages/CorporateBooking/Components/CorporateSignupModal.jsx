import React, { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import {
  useLoginAgent,
  useVerifyAgentOtp,
  useResendAgentOtp
} from "../../../ApiHooks/useAgentHook"; // ⬅️ uses OTP hooks

const CorporateSignupModal = ({ open, onClose }) => {
  const loginMutation = useLoginAgent();
  const verifyMutation = useVerifyAgentOtp();
  const resendMutation = useResendAgentOtp();

  const [step, setStep] = useState("form"); // 'form' | 'otp'
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    gstNumber: "",
    city: "",
    role: "corporate",
  });
  const [otp, setOtp] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(120); // resend cooldown

  useEffect(() => {
    if (!open) {
      setStep("form");
      setForm({
        name: "",
        email: "",
        phone: "",
        companyName: "",
        gstNumber: "",
        city: "",
        role: "corporate",
      });
      setOtp("");
      setSecondsLeft(120);
    }
  }, [open]);

  useEffect(() => {
    if (step !== "otp") return;
    if (secondsLeft <= 0) return;
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [step, secondsLeft]);

  const disabledForm = useMemo(() => {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    const phoneOk = /^\d{7,}$/.test(form.phone);
    return !form.name.trim() || !emailOk || !phoneOk || loginMutation.isPending;
  }, [form, loginMutation.isPending]);

  const disabledOtp = useMemo(() => {
    return otp.trim().length !== 6 || verifyMutation.isPending;
  }, [otp, verifyMutation.isPending]);

  const onSubmitForm = (e) => {
    e.preventDefault();
    loginMutation.mutate(
      {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        role: "corporate",
        // If you later persist these, include them too:
        // companyName: form.companyName, gstNumber: form.gstNumber, city: form.city
      },
      {
        onSuccess: (resp) => {
          // toast.success(resp?.message || "OTP sent to your email");
          setStep("otp");
          setSecondsLeft(120);
        },
        onError: (err) => {
          const msg = err?.response?.data?.message || "Signup failed";
          console.error(msg);
        },
      }
    );
  };

  const onVerifyOtp = (e) => {
    e.preventDefault();
    verifyMutation.mutate(
      { email: form.email.trim().toLowerCase(), otp: otp.trim() },
      {
        onSuccess: (resp) => {
          if (resp?.ok) {
            // toast.success(resp?.message || "Login successful");
            localStorage.setItem("user_email", resp?.data?.email || form.email.trim().toLowerCase());
            onClose?.();
          } else {
            console.error(resp?.message || "Verification failed");
          }
        },
        onError: (error) => {
          const msg = error?.response?.data?.message || "Invalid or expired OTP";
          console.error(msg);
        },
      }
    );
  };

  const onResend = () => {
    if (secondsLeft > 0) return;
    resendMutation.mutate(
      {
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        name: form.name.trim(),
        role: "corporate",
      },
      {
        onSuccess: (resp) => {
          // toast.success(resp?.message || "OTP re-sent");
          setSecondsLeft(120);
        },
        onError: (err) => {
          console.error(err?.response?.data?.message || "Failed to resend OTP");
        },
      }
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      {/* Dialog */}
      <div className="relative mx-auto mt-16 w-[92%] max-w-2xl bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">
            {step === "form" ? "Corporate Booking Signup" : "Enter OTP"}
          </h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === "form" ? (
          <form onSubmit={onSubmitForm} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-yellow"
                placeholder="Corporate Contact Name"
                required
              />
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-yellow"
                  placeholder="you@company.com"
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

            {/* Optional business info (UI only for now) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name (optional)</label>
                <input
                  type="text"
                  value={form.companyName}
                  onChange={(e) => setForm((s) => ({ ...s, companyName: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-yellow"
                  placeholder="Company Pvt Ltd"
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">GST No. (optional)</label>
                <input
                  type="text"
                  value={form.gstNumber}
                  onChange={(e) => setForm((s) => ({ ...s, gstNumber: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-yellow"
                  placeholder="22AAAAA0000A1Z5"
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">City (optional)</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm((s) => ({ ...s, city: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-yellow"
                  placeholder="Gurugram"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={disabledForm}
              className={`w-full rounded-lg px-4 py-2 font-semibold text-white transition ${
                disabledForm ? "bg-gray-400 cursor-not-allowed" : "bg-primary-green hover:brightness-110"
              }`}
            >
              {loginMutation.isPending ? "Sending OTP..." : "Get OTP"}
            </button>

            <p className="text-xs text-gray-500 text-center">
              By continuing you agree to receive a one-time password on your email.
            </p>
          </form>
        ) : (
          <form onSubmit={onVerifyOtp} className="space-y-4">
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
              className={`w-full rounded-lg px-4 py-2 font-semibold text-white transition ${
                disabledOtp ? "bg-gray-400 cursor-not-allowed" : "bg-primary-green hover:brightness-110"
              }`}
            >
              {verifyMutation.isPending ? "Verifying..." : "Verify & Continue"}
            </button>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <button type="button" onClick={() => setStep("form")} className="underline underline-offset-2">
                Change email
              </button>

              <button
                type="button"
                onClick={onResend}
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

export default CorporateSignupModal;
