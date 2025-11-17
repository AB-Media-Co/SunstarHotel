import { useEffect, useMemo, useState } from 'react';
import { Save, X, Loader } from 'lucide-react';
import EditableCardList from '../../../components/EditableCardList';
import {
  useGetTravelAgentPage,
  usePatchTAHero,
  useAddTACard,
  useBulkAddTACards,
  useUpdateTACard,
  useDeleteTACard,
} from '../../../../ApiHooks/useTravelAgentPage';

/* ============ UI atoms ============ */
const Modal = ({ open, onClose, children, title, footer }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-5xl max-h-[92vh] overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-gray-200 bg-gradient-to-r from-slate-50 to-white px-6 py-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{title}</h2>
          <button className="p-2 rounded-lg hover:bg-gray-100" onClick={onClose}><X size={20} className="text-gray-600" /></button>
        </div>
        <div className="overflow-y-auto p-6 max-h-[calc(92vh-60px)]">{children}</div>
        {footer && (
          <div className="border-t border-gray-200 bg-white px-6 py-4">{footer}</div>
        )}
      </div>
    </div>
  );
};

const Field = ({ label, ...props }) => (
  <label className="block group">
    <span className="text-sm font-semibold text-gray-700 mb-2 block">{label}</span>
    <input {...props} className={`w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-gray-400 ${props.className || ''}`} />
  </label>
);

const Textarea = ({ label, ...props }) => (
  <label className="block">
    <span className="text-sm font-semibold text-gray-700 mb-2 block">{label}</span>
    <textarea {...props} className={`w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-gray-400 min-h-[90px] resize-none ${props.className || ''}`} />
  </label>
);

const SectionCard = ({ title, children, onSave, saving, actions }) => (
  <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      <div className="flex gap-2 items-center">
        {actions}
        {onSave && (
          <button onClick={onSave} disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-sm font-medium text-white shadow-md hover:shadow-lg disabled:opacity-60">
            {saving ? (<><Loader size={16} className="animate-spin"/>Saving…</>) : (<><Save size={16}/>Save</>)}
          </button>
        )}
      </div>
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);


/* ============ Component ============ */
const ManageTravelAgent = () => {
  const [open, setOpen] = useState(false);

  // queries
  const { data, isFetching } = useGetTravelAgentPage({ enabled: open });

  // mutations
  const patchHero = usePatchTAHero();
  const addCard = useAddTACard();
  const bulkAddCards = useBulkAddTACards();
  const updateCard = useUpdateTACard();
  const deleteCard = useDeleteTACard();

  const [hero, setHero] = useState({ heading: '', description: '' });

  const partnerCards = useMemo(() => data?.partnerWithUs?.cards ?? [], [data]);
  const howItWorksCards = useMemo(() => data?.howItWorks?.cards ?? [], [data]);

  useEffect(() => {
    if (!data) return;
    setHero({ heading: data?.hero?.heading ?? '', description: data?.hero?.description ?? '' });
  }, [data]);

  // bulk modal state
  const [bulkOpen, setBulkOpen] = useState(null); // 'partner' | 'howitworks' | null
  const [bulkText, setBulkText] = useState('');

  const runBulk = async () => {
    const lines = bulkText.split('\n').map(l => l.trim()).filter(Boolean);
    const cards = lines.map((line) => {
      const [t, ...rest] = line.split(':');
      if (rest.length) return { title: t.trim(), description: rest.join(':').trim() };
      const title = line.split(' ').slice(0, 3).join(' ');
      return { title, description: line };
    });
    await bulkAddCards.mutateAsync({ section: bulkOpen, cards });
    setBulkText('');
    setBulkOpen(null);
  };

  return (
    <div>
      <button onClick={() => setOpen(true)} 
      className="myGlobalButton">
     Manage Travel Agent
      </button>

      {/* Main modal */}
      <Modal open={open} onClose={() => setOpen(false)} title="Manage Travel Agent">
        {isFetching && (
          <div className="mb-6 rounded-lg border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-4 flex items-center gap-3">
            <Loader size={18} className="text-amber-600 animate-spin" />
            <p className="text-sm font-medium text-amber-800">Loading latest data…</p>
          </div>
        )}

        {/* HERO */}
        <SectionCard title="Hero" onSave={() => patchHero.mutate(hero)} saving={patchHero.isPending}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Heading" value={hero.heading} onChange={(e) => setHero((s) => ({ ...s, heading: e.target.value }))} />
            <Textarea label="Description" value={hero.description} onChange={(e) => setHero((s) => ({ ...s, description: e.target.value }))} />
          </div>
        </SectionCard>

        {/* PARTNER WITH US */}
        <EditableCardList
          title="Partner With Us — Cards"
          cards={partnerCards}
          onAdd={() => addCard.mutate({ section: 'partner', title: 'New Partner Benefit', description: 'Describe the partner benefit…' })}
          adding={addCard.isPending}
          onUpdate={(cardId, update) => updateCard.mutate({ section: 'partner', cardId, update })}
          onDelete={(cardId) => deleteCard.mutate({ section: 'partner', cardId })}
          emptyMessage="No partner cards yet."
          fields={[
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'description', label: 'Description', type: 'textarea' }
          ]}
        />

        {/* HOW IT WORKS */}
        <EditableCardList
          title="How It Works — Cards"
          cards={howItWorksCards}
          onAdd={() => addCard.mutate({ section: 'howitworks', title: 'Step title', description: 'Explain the step…' })}
          adding={addCard.isPending}
          onUpdate={(cardId, update) => updateCard.mutate({ section: 'howitworks', cardId, update })}
          onDelete={(cardId) => deleteCard.mutate({ section: 'howitworks', cardId })}
          emptyMessage="No how-it-works cards yet."
          fields={[
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'description', label: 'Description', type: 'textarea' }
          ]}
        />
      </Modal>

      {/* Bulk modal */}
      <Modal
        open={!!bulkOpen}
        onClose={() => setBulkOpen(null)}
        title={bulkOpen === 'partner' ? 'Bulk Add — Partner With Us' : 'Bulk Add — How It Works'}
      >
        <div className="space-y-4">
        
          <Textarea label="Items" placeholder={`Sign Up: Create your partner account\nApprove: Get verified and start\nEarn: Send bookings & earn`} value={bulkText} onChange={(e) => setBulkText(e.target.value)} />
          <div className="flex justify-end gap-2">
            <button className="rounded-lg px-4 py-2 bg-gray-100 hover:bg-gray-200" onClick={() => setBulkOpen(null)}>Cancel</button>
            <button className="rounded-lg px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60" disabled={!bulkText.trim() || bulkAddCards.isPending} onClick={runBulk}>
              {bulkAddCards.isPending ? 'Adding…' : 'Add Items'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManageTravelAgent;
