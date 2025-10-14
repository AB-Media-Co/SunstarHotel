// DevOwnersStats.jsx
import React, { useEffect, useState, useCallback } from "react";
import {
  getOwnersStatsAPI,
  updateOwnersStatsAPI,
  trackOwnersStatusAPI,
  resetOwnersStatsAPI,
} from "../../../../ApiHooks/dev-owners-stats";

const DevOwnersStats = () => {
  const [open, setOpen] = useState(false);

  // close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div>
      <button
        className="myGlobalButton "
        onClick={() => setOpen(true)}
      >
        Manage Dev & Owners Stats
      </button>
      {open && <StatsModal onClose={() => setOpen(false)} />}
    </div>
  );
};

export default DevOwnersStats;

const StatsModal = ({ onClose }) => {
  const [stats, setStats] = useState({ approvedCount: 0, rejectedCount: 0, revivedCount: 0 });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [justSaved, setJustSaved] = useState(false);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getOwnersStatsAPI(); // expects pure stats object
      setStats({
        approvedCount: data?.approvedCount ?? 0,
        rejectedCount: data?.rejectedCount ?? 0,
        revivedCount: data?.revivedCount ?? 0,
      });
      setError("");
    } catch (e) {
      setError(e?.message || "Failed to load stats");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const save = async () => {
    try {
      setSaving(true);
      setJustSaved(false);
      const payload = {
        approvedCount: Number(stats.approvedCount) || 0,
        rejectedCount: Number(stats.rejectedCount) || 0,
        revivedCount: Number(stats.revivedCount) || 0,
      };
      const updated = await updateOwnersStatsAPI(payload);
      setStats(updated);
      setError("");
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 1200);
    } catch (e) {
      setError(e?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };


  const reset = async () => {
    if (!window.confirm("Reset all counts to 0?")) return;
    try {
      const updated = await resetOwnersStatsAPI();
      setStats(updated);
      setError("");
    } catch (e) {
      setError(e?.message || "Reset failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      {/* Panel */}
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold tracking-tight">Dev & Owners Stats</h2>
          <button
            className="px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 active:scale-[0.98]"
            onClick={onClose}
            aria-label="Close"
          >
            Close
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {error && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          {loading ? (
            <Skeleton />
          ) : (
            <>
              {/* Stat cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard
                  label="Approved"
                  value={stats.approvedCount}
                  tone="emerald"
                  onChange={(v) => setStats((p) => ({ ...p, approvedCount: v }))}
                />
                <StatCard
                  label="Rejected"
                  value={stats.rejectedCount}
                  tone="amber"
                  onChange={(v) => setStats((p) => ({ ...p, rejectedCount: v }))}
                />
                <StatCard
                  label="Revived"
                  value={stats.revivedCount}
                  tone="indigo"
                  onChange={(v) => setStats((p) => ({ ...p, revivedCount: v }))}
                />
              </div>

              {/* Actions */}
              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  onClick={save}
                  disabled={saving}
                  className="rounded-lg px-4 py-2 bg-cyan-600 text-white hover:bg-cyan-700 disabled:opacity-60 active:scale-[0.99]"
                >
                  {saving ? "Saving…" : "Save Counts"}
                </button>
                <button
                  onClick={reset}
                  className="rounded-lg px-4 py-2 bg-gray-100 hover:bg-gray-200 active:scale-[0.99]"
                >
                  Reset to 0
                </button>
                {justSaved && (
                  <span className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-md">
                    Saved ✓
                  </span>
                )}
              </div>

            </>
          )}
        </div>
      </div>
    </div>
  );
};

/* ---------- small UI pieces ---------- */

const tones = {
  emerald: {
    ring: "ring-emerald-200",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    inputRing: "focus:ring-emerald-400",
    chip: "bg-emerald-100 hover:bg-emerald-200 text-emerald-700",
  },
  amber: {
    ring: "ring-amber-200",
    bg: "bg-amber-50",
    text: "text-amber-700",
    inputRing: "focus:ring-amber-400",
    chip: "bg-amber-100 hover:bg-amber-200 text-amber-800",
  },
  indigo: {
    ring: "ring-indigo-200",
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    inputRing: "focus:ring-indigo-400",
    chip: "bg-indigo-100 hover:bg-indigo-200 text-indigo-700",
  },
};

const StatCard = ({ label, value, onChange, tone = "emerald" }) => {
  const t = tones[tone] || tones.emerald;
  return (
    <div className={`rounded-xl border p-4 ring-1 ${t.ring}`}>
      <div className="flex items-center justify-between mb-2">
        <span className={`text-sm ${t.text}`}>{label}</span>
        <span className="text-xs text-gray-400">editable</span>
      </div>
      <div className="flex items-end justify-between gap-3">
        {/* <div className="text-3xl font-semibold tabular-nums">{value ?? 0}</div> */}
        <input
          type="number"
          min={0}
          value={value ?? 0}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
          className={`w-28 rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 ${t.inputRing}`}
        />
      </div>
    </div>
  );
};

const Chip = ({ children, onClick, tone = "emerald" }) => {
  const t = tones[tone] || tones.emerald;
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-md ${t.chip} active:scale-[0.99]`}
    >
      {children}
    </button>
  );
};

const Skeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    {[0, 1, 2].map((i) => (
      <div key={i} className="rounded-xl border p-4">
        <div className="h-4 w-24 bg-gray-200 rounded mb-3 animate-pulse" />
        <div className="flex items-end justify-between">
          <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-28 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    ))}
  </div>
);
