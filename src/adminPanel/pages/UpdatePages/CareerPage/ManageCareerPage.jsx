import { useEffect, useMemo, useState } from 'react';
import { Save, X, Loader } from 'lucide-react';
import axiosInstance from '../../../../services/axiosInstance';
import EditableCardList from '../../../components/EditableCardList';
import {
  useGetCareersPage,
  usePatchHero,
  usePatchBenefitsMeta,
  usePatchJoinTeam,
  usePatchReadyToJoin,
  useAddBenefitCard,
  useUpdateBenefitCard,
  useDeleteBenefitCard,
  useAddSimpleCard,
  useUpdateSimpleCard,
  useDeleteSimpleCard,
} from '../../../../ApiHooks/use-Career-Page';

/* ============ Basic UI atoms ============ */
const Modal = ({ open, onClose, children, title }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-gray-200 bg-gradient-to-r from-slate-50 to-white px-6 py-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            {title}
          </h2>
          <button className="p-2 rounded-lg hover:bg-gray-100" onClick={onClose}>
            <X size={20} className="text-gray-600" />
          </button>
        </div>
        <div className="p-6">{children}</div>
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

const SectionCard = ({ title, children, onSave, saving, icon: Icon }) => (
  <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {Icon && <Icon size={24} className="text-blue-600" />}
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      </div>
      {onSave && (
        <button
          onClick={onSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-sm font-medium text-white shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-60"
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
    <div className="space-y-4">{children}</div>
  </div>
);

const Divider = () => <div className="my-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />;

/* ============ Component ============ */
const ManageCareerPage = () => {
  const [open, setOpen] = useState(false);

  // queries
  const { data, isFetching } = useGetCareersPage({ enabled: open });

  // mutations
  const patchHero = usePatchHero();
  const patchBenefitsMeta = usePatchBenefitsMeta();
  const patchJoinTeam = usePatchJoinTeam();
  const patchReadyToJoin = usePatchReadyToJoin();

  const addBenefitCard = useAddBenefitCard();
  const updateBenefitCard = useUpdateBenefitCard();
  const deleteBenefitCard = useDeleteBenefitCard();

  const addSimpleCard = useAddSimpleCard();
  const updateSimpleCard = useUpdateSimpleCard();
  const deleteSimpleCard = useDeleteSimpleCard();

  // local state
  const [hero, setHero] = useState({ heading: '', description: '' });
  const [benefitsMeta, setBenefitsMeta] = useState({ heading: '', description: '' });
  const [joinTeam, setJoinTeam] = useState({ heading: '', description: '' });
  const [readyToJoin, setReadyToJoin] = useState({ heading: '', description: '', email: '' });

  const benefitCards = useMemo(() => data?.benefits?.cards ?? [], [data]);
  const simpleCards = useMemo(() => data?.simpleCards ?? [], [data]);

  useEffect(() => {
    if (!data) return;
    setHero({ heading: data?.hero?.heading ?? '', description: data?.hero?.description ?? '' });
    setBenefitsMeta({ heading: data?.benefits?.heading ?? '', description: data?.benefits?.description ?? '' });
    setJoinTeam({ heading: data?.joinTeam?.heading ?? '', description: data?.joinTeam?.description ?? '' });
    setReadyToJoin({
      heading: data?.readyToJoin?.heading ?? '',
      description: data?.readyToJoin?.description ?? '',
      email: data?.readyToJoin?.email ?? '',
    });
  }, [data]);

  /* ------- bulk helpers (optional) ------- */
  const bulkAddBenefitCards = async (lines) => {
    const cards = lines
      .map((l) => l.trim())
      .filter(Boolean)
      .map((text) => {
        // support "Heading: Description" OR just "Description" (then heading="Item")
        const [maybeH, ...rest] = text.split(':');
        if (rest.length) {
          return { heading: maybeH.trim(), description: rest.join(':').trim() };
        }
        return { heading: 'Item', description: text };
      });

    try {
      // try bulk endpoint; fallback to multiple posts
      await axiosInstance.post('/api/careers/benefit-cards/bulk', { cards });
    } catch {
      await Promise.all(cards.map((c) => addBenefitCard.mutateAsync(c)));
    }
  };

  const bulkAddSimpleCards = async (lines) => {
    const cards = lines
      .map((l) => l.trim())
      .filter(Boolean)
      .map((text) => {
        // support "Title: Description" OR just "Description" → title from first few words
        const [maybeT, ...rest] = text.split(':');
        if (rest.length) {
          return { title: maybeT.trim(), description: rest.join(':').trim() };
        }
        const title = text.split(' ').slice(0, 3).join(' ');
        return { title, description: text };
      });

    try {
      await axiosInstance.post('/api/careers/simple-cards/bulk', { cards });
    } catch {
      await Promise.all(cards.map((c) => addSimpleCard.mutateAsync(c)));
    }
  };

  // bulk modal local UI
  const [bulkOpen, setBulkOpen] = useState(null); // 'benefit' | 'simple' | null
  const [bulkText, setBulkText] = useState('');

  const runBulk = async () => {
    const lines = bulkText.split('\n');
    if (bulkOpen === 'benefit') await bulkAddBenefitCards(lines);
    if (bulkOpen === 'simple') await bulkAddSimpleCards(lines);
    setBulkText('');
    setBulkOpen(null);
  };

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="myGlobalButton"
      >
        {/* <ChevronDown size={18} /> */}
        Manage Career Page
      </button>

      {/* Main modal */}
      <Modal open={open} onClose={() => setOpen(false)} title="Manage Careers Page">
        {isFetching && (
          <div className="mb-6 rounded-lg border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-4 flex items-center gap-3">
            <Loader size={18} className="text-amber-600 animate-spin" />
            <p className="text-sm font-medium text-amber-800">Loading latest data…</p>
          </div>
        )}

        {/* HERO */}
        <SectionCard title="Hero Section" onSave={() => patchHero.mutate(hero)} saving={patchHero.isPending}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Heading" value={hero.heading} onChange={(e) => setHero((s) => ({ ...s, heading: e.target.value }))} />
            <Textarea label="Description" value={hero.description} onChange={(e) => setHero((s) => ({ ...s, description: e.target.value }))} />
          </div>
        </SectionCard>

        <Divider />

        {/* BENEFITS HEADER */}
        <SectionCard
          title="Benefits Section Header"
          onSave={() => patchBenefitsMeta.mutate(benefitsMeta)}
          saving={patchBenefitsMeta.isPending}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Heading" value={benefitsMeta.heading} onChange={(e) => setBenefitsMeta((s) => ({ ...s, heading: e.target.value }))} />
            <Textarea label="Description" value={benefitsMeta.description} onChange={(e) => setBenefitsMeta((s) => ({ ...s, description: e.target.value }))} />
          </div>
        </SectionCard>

        {/* BENEFIT CARDS */}
        <EditableCardList
          title="Benefit Cards"
          cards={benefitCards}
          onAdd={() => addBenefitCard.mutate({ heading: 'New Benefit', description: 'Describe the benefit…' })}
          adding={addBenefitCard.isPending}
          onUpdate={(cardId, updateData) => updateBenefitCard.mutate({ cardId, updateData })}
          onDelete={(cardId) => deleteBenefitCard.mutate(cardId)}
          emptyMessage="No benefit cards yet. Create one to get started!"
          fields={[
            { name: 'heading', label: 'Card Heading', type: 'text' },
            { name: 'description', label: 'Card Description', type: 'textarea' }
          ]}
        />

        <Divider />

        {/* JOIN TEAM */}
        <SectionCard title="Join Team Section" onSave={() => patchJoinTeam.mutate(joinTeam)} saving={patchJoinTeam.isPending}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Heading" value={joinTeam.heading} onChange={(e) => setJoinTeam((s) => ({ ...s, heading: e.target.value }))} />
            <Textarea label="Description" value={joinTeam.description} onChange={(e) => setJoinTeam((s) => ({ ...s, description: e.target.value }))} />
          </div>
        </SectionCard>

        <Divider />

        {/* READY TO JOIN */}
        <SectionCard title="Ready to Join Section" onSave={() => patchReadyToJoin.mutate(readyToJoin)} saving={patchReadyToJoin.isPending}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Field label="Heading" value={readyToJoin.heading} onChange={(e) => setReadyToJoin((s) => ({ ...s, heading: e.target.value }))} />
            <Textarea label="Description" value={readyToJoin.description} onChange={(e) => setReadyToJoin((s) => ({ ...s, description: e.target.value }))} />
            <Field label="Contact Email" type="email" value={readyToJoin.email} onChange={(e) => setReadyToJoin((s) => ({ ...s, email: e.target.value }))} />
          </div>
        </SectionCard>

        <Divider />

        {/* SIMPLE CARDS */}
        <EditableCardList
          title="Bottom Simple Cards"
          cards={simpleCards}
          onAdd={() => addSimpleCard.mutate({ title: 'New Card', description: 'New point…' })}
          adding={addSimpleCard.isPending}
          onUpdate={(cardId, updateData) => updateSimpleCard.mutate({ cardId, updateData })}
          onDelete={(cardId) => deleteSimpleCard.mutate(cardId)}
          emptyMessage="No simple cards yet. Add highlights about your company!"
          fields={[
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'description', label: 'Description', type: 'textarea' }
          ]}
        />
      </Modal>

      {/* Bulk Add Modal */}
      <Modal
        open={!!bulkOpen}
        onClose={() => setBulkOpen(null)}
        title={bulkOpen === 'benefit' ? 'Bulk Add Benefit Cards' : 'Bulk Add Simple Cards'}
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Enter one item per line.
            <br />
            <span className="font-medium">Benefit:</span> <code>Heading: Description</code> or just <code>Description</code>
            <br />
            <span className="font-medium">Simple:</span> <code>Title: Description</code> or just <code>Description</code>
          </p>
          <Textarea
            label="Items"
            placeholder="Integrity: We always do what's right&#10;Respect for All: We respect everyone&#10;Excellence: We serve with heart and honesty"
            value={bulkText}
            onChange={(e) => setBulkText(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button className="rounded-lg px-4 py-2 bg-gray-100 hover:bg-gray-200" onClick={() => setBulkOpen(null)}>
              Cancel
            </button>
            <button
              className="rounded-lg px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700"
              onClick={runBulk}
              disabled={!bulkText.trim()}
            >
              Add Items
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManageCareerPage;
