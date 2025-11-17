// components/LoyaltyProgram.jsx
import React, { useEffect, useState, useRef } from 'react';
import { ChevronDown, Plus, Trash2, Save, X, RotateCcw, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  useGetLoyaltyProgram,
  useUpsertLoyaltyProgram,
  useAddTier,
  useUpdateTier,
  useDeleteTier,
  useSeedLoyaltyProgram
} from '../../../../ApiHooks/useLoyaltyProgramHook'; // update path if needed

const emptyTier = () => ({
  level: '',
  name: '',
  requirement_text: '',
  benefit_text: '',
  unlock_after_nights: 0,
  style: {}
});

const emptyHow = () => ({ title: '', description: '', icon: '' });

const defaultProgram = {
  title: 'Join Sunstar Rewards.',
  subtitle: "Sunstar's loyalty program for frequent travelers—earn perks and exclusive benefits every time you stay with us.",
  hero_cta: { text: 'See your benefits', link: '/benefits' },
  loyal_guest: {
    heading: 'Become a Loyal Sunstar Guest',
    description: 'A rewarding loyalty program built for our most valued guests — like you, who choose comfort, consistency, and care with every stay.'
  },
  tiers: [
    { level: 1, name: 'Smart Traveller', requirement_text: 'Complete 5 nights in 365 days', benefit_text: '5% discount on future bookings', unlock_after_nights: 5 },
    { level: 2, name: 'Frequent Explorer', requirement_text: 'Complete 10 nights in 365 days', benefit_text: '10% discount on all bookings', unlock_after_nights: 10 },
    { level: 3, name: 'Elite Guest', requirement_text: 'Complete 20 nights in 365 days', benefit_text: '15% discount on all bookings', unlock_after_nights: 20 }
  ],
  how_it_works: [
    { title: 'Stay with Us', description: 'Book your stay directly through our official website or contact numbers. Every night you stay counts towards your rewards.', icon: 'bed' },
    { title: 'Track Your Nights', description: 'We automatically track your completed nights within a 365-day period. You do not need to sign up again or carry a membership card.', icon: 'clock' },
    { title: 'Unlock Rewards', description: 'Your loyalty starts paying off after just 5 nights. Unlock bigger benefits as you stay more.', icon: 'medal' }
  ],
  sidebar_widget: { member_type: 'Guest', stays: 0 }


};

const SectionHeader = ({ label, section, count, setExpandedSection, expandedSection }) => (
  <button
    onClick={() => setExpandedSection(expandedSection === section ? null : section)}
    className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
  >
    <div className="flex items-center gap-3">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      {count !== undefined && <span className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded-full">{count}</span>}
    </div>
    <ChevronDown size={18} className={`text-slate-400 transition-transform ${expandedSection === section ? 'rotate-180' : ''}`} />
  </button>
);

const InputField = ({ label, value, onChange, placeholder, type = 'text', rows = 1 }) => (
  <label className="flex flex-col gap-2">
    <span className="text-sm font-medium text-slate-700">{label}</span>
    {rows > 1 ? (
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent resize-none"
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent"
      />
    )}
  </label>
);

export default function LoyaltyProgram() {
  const { data, isLoading, isError } = useGetLoyaltyProgram();
  const program = data?.data || data; // Handle both { data: {...} } and direct {...} response
  const upsertMutation = useUpsertLoyaltyProgram();
  const addTierMutation = useAddTier();
  const updateTierMutation = useUpdateTier();
  const deleteTierMutation = useDeleteTier();
  const seedMutation = useSeedLoyaltyProgram();

  const [open, setOpen] = useState(false);
  const [local, setLocal] = useState(null);
  const [expandedSection, setExpandedSection] = useState('banner');
  const [isSaving, setIsSaving] = useState(false);
  const closeRef = useRef(null);

  const openEditor = () => {
    setLocal(program ? JSON.parse(JSON.stringify(program)) : JSON.parse(JSON.stringify(defaultProgram)));
    setOpen(true);
  };

  const closeEditor = () => setOpen(false);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (open && program && !local) {
      setLocal(JSON.parse(JSON.stringify(program)));
    }
  }, [open, program, local]);

  useEffect(() => {
    if (open && closeRef.current) setTimeout(() => closeRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const updateLocalField = (path, value) => {
    setLocal(prev => {
      const copy = { ...(prev || {}) };
      const parts = path.split('.');
      let cur = copy;
      for (let i = 0; i < parts.length - 1; i++) {
        const p = parts[i];
        if (!cur[p]) cur[p] = {};
        cur = cur[p];
      }
      cur[parts[parts.length - 1]] = value;
      return copy;
    });
  };

  // Add tier: optimistic local push, then call server. on success replace local with server response.
  const addTier = async () => {
    // create new tier locally with suggested level
    const newTier = (() => {
      const copy = local ? { ...local } : JSON.parse(JSON.stringify(defaultProgram));
      copy.tiers = Array.isArray(copy.tiers) ? [...copy.tiers] : [];
      const maxLevel = copy.tiers.reduce((m, t) => Math.max(m, Number(t.level || 0)), 0);
      return { ...emptyTier(), level: maxLevel + 1 };
    })();

    // optimistic update
    setLocal(prev => {
      const copy = { ...(prev || {}) };
      copy.tiers = Array.isArray(copy.tiers) ? [...copy.tiers, newTier] : [newTier];
      return copy;
    });

    try {
      // Call server to add tier. Use mutateAsync to await response.
      const updated = await addTierMutation.mutateAsync(newTier);
      // Server returns updated page (per our backend). Replace local with authoritative server data.
      if (updated) {
        setLocal(updated);
      } else {
        // If server returns nothing surprising, we keep optimistic local and show a toast
        // toast.success('Tier added (optimistic)');
      }
    } catch (err) {
      // rollback optimistic change: remove any tier with same level that we just added
      setLocal(prev => {
        const copy = { ...(prev || {}) };
        copy.tiers = (copy.tiers || []).filter(t => Number(t.level) !== Number(newTier.level) || t.name !== newTier.name);
        return copy;
      });
      const msg = err?.response?.data?.message ?? err?.message ?? 'Error adding tier';
      toast.error(msg);
    }
  };

  // updateTier only changes local (user saves whole program using Save Program).
  // If you want per-tier save, we can call updateTierMutation here — currently keep local-only edits.
  const updateTier = (index, field, value) => {
    setLocal(prev => {
      const copy = { ...(prev || {}) };
      copy.tiers = (copy.tiers || []).map((t, i) => i === index ? { ...t, [field]: value } : t);
      return copy;
    });
  };

  // removeTier: if tier exists in backend (matching program.tiers by level) -> call delete API.
  // otherwise remove locally.
  const removeTier = async (index) => {
    const tier = (local?.tiers || [])[index];
    if (!tier) return;

    const level = Number(tier.level);
    const existsInServer = Array.isArray(program?.tiers) && program.tiers.some(t => Number(t.level) === level);

    if (!existsInServer) {
      // Just remove locally
      setLocal(prev => {
        const copy = { ...(prev || {}) };
        copy.tiers = (copy.tiers || []).filter((_, i) => i !== index);
        return copy;
      });
      // toast.success('Tier removed (local)');
      return;
    }

    // Confirm deletion
    if (!confirm(`Delete tier level ${level} from server? This cannot be undone.`)) return;

    // Optionally optimistic remove locally while request ongoing
    const prevLocal = local ? JSON.parse(JSON.stringify(local)) : null;
    setLocal(prev => {
      const copy = { ...(prev || {}) };
      copy.tiers = (copy.tiers || []).filter((_, i) => i !== index);
      return copy;
    });

    try {
      const updated = await deleteTierMutation.mutateAsync(level);
      if (updated) {
        setLocal(updated);
        toast.success('Tier deleted');
      } else {
        // if server doesn't return updated page, refetch via upsert or leave local state
        toast.success('Tier deleted (server)');
      }
    } catch (err) {
      // rollback to previous local state
      if (prevLocal) setLocal(prevLocal);
      const msg = err?.response?.data?.message ?? err?.message ?? 'Error deleting tier';
      toast.error(msg);
    }
  };

  const addHow = () => {
    setLocal(prev => {
      const copy = { ...(prev || {}) };
      copy.how_it_works = Array.isArray(copy.how_it_works) ? [...copy.how_it_works, emptyHow()] : [emptyHow()];
      return copy;
    });
  };

  const updateHow = (index, field, value) => {
    setLocal(prev => {
      const copy = { ...(prev || {}) };
      copy.how_it_works = (copy.how_it_works || []).map((h, i) => i === index ? { ...h, [field]: value } : h);
      return copy;
    });
  };

  const removeHow = (index) => {
    setLocal(prev => {
      const copy = { ...(prev || {}) };
      copy.how_it_works = (copy.how_it_works || []).filter((_, i) => i !== index);
      return copy;
    });
  };

  const saveAll = async () => {
    if (!local || !local.title || !local.loyal_guest?.heading) {
      toast.error('Please provide page title and Loyal Guest heading');
      return;
    }
    setIsSaving(true);
    try {
      const updated = await upsertMutation.mutateAsync(local);
      // mutateAsync will return the response; hooks invalidate queries as well.
      if (updated) setLocal(updated);
      toast.success('Loyalty Program saved');
      setOpen(false);
    } catch (err) {
      const msg = err?.response?.data?.message ?? err?.message ?? 'Save failed';
      toast.error(msg);
    } finally {
      setIsSaving(false);
    }
  };



  if (isLoading) {
    return (
      <button disabled className="px-4 py-2 bg-slate-300 text-slate-600 rounded-lg text-sm font-medium">
        Loading...
      </button>
    );
  }

  return (
    <div>
      <button
        onClick={openEditor}
        className={`myGlobalButton ${isError ? 'bg-red-600 text-white' : 'bg-slate-700 '
          }`}
      >
        Loyalty Program
      </button>

      {open && local !== null && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center p-4 pt-8" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={closeEditor} />

          <div className="relative z-10 w-full max-w-3xl max-h-[85vh] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Loyalty Program Settings</h2>
                <p className="text-sm text-slate-500 mt-1">Manage tiers, benefits, and program details</p>
              </div>
              <button
                ref={closeRef}
                onClick={closeEditor}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-slate-600" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto">
              <div className="divide-y divide-slate-200">
                {/* Banner Section */}
                <div className="border-b border-slate-200">
                  <SectionHeader label="Banner & Hero" section="banner" setExpandedSection={setExpandedSection} expandedSection={expandedSection} />
                  {expandedSection === 'banner' && (
                    <div className="p-6 bg-slate-50 space-y-4">
                      <InputField
                        label="Heading"
                        value={local.title || ''}
                        onChange={(e) => updateLocalField('title', e.target.value)}
                        placeholder="Enter main heading"
                      />
                      <InputField
                        label="Description"
                        value={local.subtitle || ''}
                        onChange={(e) => updateLocalField('subtitle', e.target.value)}
                        placeholder="Enter subtitle or description"
                        rows={3}
                      />
                    </div>
                  )}
                </div>

                {/* Loyal Guest Section */}
                <div className="border-b border-slate-200">
                  <SectionHeader label="Loyal Guest Section" section="loyal" setExpandedSection={setExpandedSection} expandedSection={expandedSection} />
                  {expandedSection === 'loyal' && (
                    <div className="p-6 bg-slate-50 space-y-4">
                      <InputField
                        label="Section Heading"
                        value={local.loyal_guest?.heading || ''}
                        onChange={(e) => updateLocalField('loyal_guest.heading', e.target.value)}
                        placeholder="e.g., Become a Loyal Sunstar Guest"
                      />
                      <InputField
                        label="Section Description"
                        value={local.loyal_guest?.description || ''}
                        onChange={(e) => updateLocalField('loyal_guest.description', e.target.value)}
                        placeholder="Describe the loyalty program benefits"
                        rows={3}
                      />
                    </div>
                  )}
                </div>

                {/* Tiers Section */}
                <div className="border-b border-slate-200">
                  <SectionHeader label="Membership Tiers" section="tiers" count={local.tiers?.length || 0} setExpandedSection={setExpandedSection} expandedSection={expandedSection} />
                  {expandedSection === 'tiers' && (
                    <div className="p-6 bg-slate-50 space-y-4">
                      <button
                        onClick={addTier}
                        className="w-full flex items-center justify-center gap-2 py-2 px-4 border-2 border-dashed border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-100 transition-colors text-slate-700 font-medium text-sm"
                      >
                        <Plus size={16} /> Add Tier
                      </button>

                      <div className="space-y-3">
                        {(local.tiers || []).map((tier, idx) => (
                          <div key={idx} className="bg-white border border-slate-200 rounded-lg p-4 space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <InputField
                                label="Level"
                                type="number"
                                value={tier.level ?? ''}
                                onChange={(e) => updateTier(idx, 'level', Number(e.target.value))}
                                placeholder="e.g., 1"
                              />
                              <InputField
                                label="Tier Name"
                                value={tier.name || ''}
                                onChange={(e) => updateTier(idx, 'name', e.target.value)}
                                placeholder="e.g., Smart Traveller"
                              />
                            </div>
                            <InputField
                              label="Requirement"
                              value={tier.requirement_text || ''}
                              onChange={(e) => updateTier(idx, 'requirement_text', e.target.value)}
                              placeholder="e.g., Complete 5 nights in 365 days"
                            />
                            <InputField
                              label="Benefit"
                              value={tier.benefit_text || ''}
                              onChange={(e) => updateTier(idx, 'benefit_text', e.target.value)}
                              placeholder="e.g., 5% discount on all bookings"
                            />
                            <div className="flex justify-end">
                              <button
                                onClick={() => removeTier(idx)}
                                className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
                              >
                                <Trash2 size={16} /> Remove
                              </button>
                            </div>
                          </div>
                        ))}
                        {(!local.tiers || local.tiers.length === 0) && (
                          <div className="text-center py-8 text-slate-500 text-sm">No tiers configured yet</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* How It Works Section */}
                <div className="border-b border-slate-200">
                  <SectionHeader label="How It Works" section="howitworks" count={local.how_it_works?.length || 0} setExpandedSection={setExpandedSection} expandedSection={expandedSection} />
                  {expandedSection === 'howitworks' && (
                    <div className="p-6 bg-slate-50 space-y-4">
                      <button
                        onClick={addHow}
                        className="w-full flex items-center justify-center gap-2 py-2 px-4 border-2 border-dashed border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-100 transition-colors text-slate-700 font-medium text-sm"
                      >
                        <Plus size={16} /> Add Step
                      </button>

                      <div className="space-y-3">
                        {(local.how_it_works || []).map((h, idx) => (
                          <div key={idx} className="bg-white border border-slate-200 rounded-lg p-4 space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <InputField
                                label="Title"
                                value={h.title || ''}
                                onChange={(e) => updateHow(idx, 'title', e.target.value)}
                                placeholder="Step heading"
                              />
                              <InputField
                                label="Icon Key"
                                value={h.icon || ''}
                                onChange={(e) => updateHow(idx, 'icon', e.target.value)}
                                placeholder="e.g., bed, clock, medal"
                              />
                            </div>
                            <InputField
                              label="Description"
                              value={h.description || ''}
                              onChange={(e) => updateHow(idx, 'description', e.target.value)}
                              placeholder="Explain this step"
                              rows={2}
                            />
                            <div className="flex justify-end">
                              <button
                                onClick={() => removeHow(idx)}
                                className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
                              >
                                <Trash2 size={16} /> Remove
                              </button>
                            </div>
                          </div>
                        ))}
                        {(!local.how_it_works || local.how_it_works.length === 0) && (
                          <div className="text-center py-8 text-slate-500 text-sm">No steps configured yet</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

             
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-200 bg-gradient-to-r from-slate-50 to-white flex items-center justify-between gap-3">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (confirm('Seed example data?')) {
                      seedMutation.mutate(defaultProgram, {
                        onSuccess: () => {
                          toast.success('Seeded with default data');
                          setOpen(false);
                        }
                      });
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors font-medium text-sm"
                >
                  Seed Data
                </button>
                <button
                  onClick={() => {
                    setLocal(JSON.parse(JSON.stringify(program || defaultProgram)));
                    toast.success('Reverted to last saved');
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors font-medium text-sm"
                >
                  <RotateCcw size={16} /> Revert
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={closeEditor}
                  className="px-4 py-2 text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={saveAll}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
                >
                  {isSaving ? (
                    <>
                      <Loader size={16} className="animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} /> Save Program
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
