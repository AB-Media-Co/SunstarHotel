/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { X, Save, Plus, Trash2, Loader, ListPlus } from 'lucide-react';
import {
  useGetDayUseContent,
  usePatchDayUseHero,
  usePatchDayUseDescCard,
  useAddDayUseBenefit,
  useUpdateDayUseBenefit,
  useDeleteDayUseBenefit,
  useSetDayUseTerms,
  useUpsertDayUseContent,
} from '../../../../ApiHooks/useDayUseRoomHook'; // ← update path if needed

/* ============ UI atoms ============ */
const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-5xl max-h-[92vh] overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-gray-200 bg-gradient-to-r from-slate-50 to-white px-6 py-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            {title}
          </h2>
          <button className="p-2 rounded-lg hover:bg-gray-100" onClick={onClose}>
            <X size={20} className="text-gray-600" />
          </button>
        </div>
        <div className="overflow-y-auto p-6 max-h-[calc(92vh-60px)]">{children}</div>
      </div>
    </div>
  );
};

const Field = ({ label, ...props }) => (
  <label className="block group">
    <span className="text-sm font-semibold text-gray-700 mb-2 block">{label}</span>
    <input
      {...props}
      className={`w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-gray-400 ${props.className || ''}`}
    />
  </label>
);

const Textarea = ({ label, ...props }) => (
  <label className="block">
    <span className="text-sm font-semibold text-gray-700 mb-2 block">{label}</span>
    <textarea
      {...props}
      className={`w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-gray-400 min-h-[90px] resize-none ${props.className || ''}`}
    />
  </label>
);

const SectionCard = ({ title, children, onSave, saving, actions }) => (
  <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      <div className="flex items-center gap-2">
        {actions}
        {onSave && (
          <button
            onClick={onSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-sm font-medium text-white shadow-md hover:shadow-lg disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader size={16} className="animate-spin" />
                Saving…
              </>
            ) : (
              <>
                <Save size={16} />
                Save
              </>
            )}
          </button>
        )}
      </div>
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

const Divider = () => (
  <div className="my-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
);

/* ============ Main ============ */
const ManageeDayUseRoom = () => {
  const [open, setOpen] = useState(false);

  // Queries
  const { data, isFetching } = useGetDayUseContent({ enabled: open });

  // Mutations
  const patchHero = usePatchDayUseHero();
  const patchDesc = usePatchDayUseDescCard();
  const addBenefit = useAddDayUseBenefit();
  const updateBenefit = useUpdateDayUseBenefit();
  const deleteBenefit = useDeleteDayUseBenefit();
  const setTerms = useSetDayUseTerms();
  const upsertAll = useUpsertDayUseContent();

  // Local editable state
  const [hero, setHero] = useState({ heading: '', description: '' });
  const [descCard, setDescCard] = useState({ heading: '', description: '' });
  const benefits = useMemo(() => data?.benefits ?? [], [data]);
  const [termsInput, setTermsInput] = useState(''); // textarea for T&C points bulk

  useEffect(() => {
    if (!data) return;
    setHero({
      heading: data?.hero?.heading ?? '',
      description: data?.hero?.description ?? '',
    });
    setDescCard({
      heading: data?.descCard?.heading ?? '',
      description: data?.descCard?.description ?? '',
    });
    setTermsInput((data?.tandc?.points ?? []).join('\n'));
  }, [data]);

  const handleSaveTerms = () => {
    const points = termsInput
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);
    setTerms.mutate({ points });
  };

  const handleBulkUpsert = () => {
    const points = termsInput
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    upsertAll.mutate({
      hero,
      descCard,
      // benefits: keep doc’s benefits as-is; bulk replace only if you pass an array
      // benefits: benefits.map(b => ({ _id: b._id, title: b.title })), // optional
      tandc: { points },
    });
  };

  return (
    <div>
      <button
        className="myGlobalButton"
        onClick={() => setOpen(true)}
      >
        Manage Day Use Rooms
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="Manage Day-Use Rooms Content">
        {isFetching && (
          <div className="mb-6 rounded-lg border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-4 flex items-center gap-3">
            <Loader size={18} className="text-amber-600 animate-spin" />
            <p className="text-sm font-medium text-amber-800">Loading latest data…</p>
          </div>
        )}

        {/* HERO */}
        <SectionCard
          title="Hero"
          onSave={() => patchHero.mutate(hero)}
          saving={patchHero.isPending}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field
              label="Heading"
              value={hero.heading}
              onChange={(e) => setHero((s) => ({ ...s, heading: e.target.value }))}
            />
            <Textarea
              label="Description"
              value={hero.description}
              onChange={(e) => setHero((s) => ({ ...s, description: e.target.value }))}
            />
          </div>
        </SectionCard>

        <Divider />

        {/* DESC CARD */}
        <SectionCard
          title="Description Card"
          onSave={() => patchDesc.mutate(descCard)}
          saving={patchDesc.isPending}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field
              label="Heading"
              value={descCard.heading}
              onChange={(e) => setDescCard((s) => ({ ...s, heading: e.target.value }))}
            />
            <Textarea
              label="Description"
              value={descCard.description}
              onChange={(e) => setDescCard((s) => ({ ...s, description: e.target.value }))}
            />
          </div>
        </SectionCard>

        <Divider />

        {/* BENEFITS CRUD */}
        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Benefits</h3>
            <button
              onClick={() => addBenefit.mutate({ title: 'New benefit' })}
              disabled={addBenefit.isPending}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 px-4 py-2 text-sm font-medium text-white shadow-md hover:shadow-lg disabled:opacity-60"
            >
              {addBenefit.isPending ? (
                <>
                  <Loader size={16} className="animate-spin" />
                  Adding…
                </>
              ) : (
                <>
                  <Plus size={16} />
                  Add Benefit
                </>
              )}
            </button>
          </div>

          <ul className="space-y-3">
            {benefits.length > 0 ? (
              benefits.map((b) => (
                <li
                  key={b._id}
                  className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto]">
                    <Field
                      label="Title"
                      value={b.title}
                      onChange={(e) =>
                        updateBenefit.mutate({ benefitId: b._id, title: e.target.value })
                      }
                    />
                    <div className="flex items-end justify-end">
                      <button
                        onClick={() => deleteBenefit.mutate(b._id)}
                        className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="rounded-lg border border-dashed border-gray-300 py-8 text-center">
                <p className="text-sm text-gray-500">No benefits yet. Add your first one!</p>
              </li>
            )}
          </ul>
        </div>

        <Divider />

        {/* T&C POINTS */}
        <SectionCard
          title="Terms & Conditions (Points)"
          actions={
            <button
              onClick={() =>
                setTermsInput((prev) =>
                  (prev ? prev + '\n' : '') + '• Example: Valid govt. ID required at check-in.'
                )
              }
              className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
            >
              <ListPlus size={16} />
              Add Example Line
            </button>
          }
          onSave={handleSaveTerms}
          saving={setTerms.isPending}
        >
          <Textarea
            label="Points (one per line)"
            placeholder={`Valid government ID required at check-in.\nStandard check-in after 8 AM; last check-out by 8 PM.\nRates vary by duration and availability.`}
            value={termsInput}
            onChange={(e) => setTermsInput(e.target.value)}
            className="min-h-[140px]"
          />
          <p className="text-xs text-gray-500">
            Tip: Write each point on a new line. Bullets will be rendered on the frontend.
          </p>
        </SectionCard>

        <Divider />

        {/* BULK UPSERT (optional one-tap save) */}
        <div className="flex items-center justify-end">
          <button
            onClick={handleBulkUpsert}
            disabled={upsertAll.isPending}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg disabled:opacity-60"
          >
            {upsertAll.isPending ? (
              <>
                <Loader size={16} className="animate-spin" />
                Saving All…
              </>
            ) : (
              <>
                <Save size={16} />
                Save All Changes
              </>
            )}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ManageeDayUseRoom;
