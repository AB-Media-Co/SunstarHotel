// src/components/ToursAndTravelModal.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useGetTourAndTravel, useUpsertTourAndTravel } from '../../../../ApiHooks/useTourAndTravel';
import toast from 'react-hot-toast';

const emptyForm = {
  hero: { title: '', desc: '' },
  advantages: [
    // example structure:
    // { title: '', desc: '', types: [{ title: '', desc: '' }] }
  ],
};

function shallowEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

const ToursAndTravel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [initial, setInitial] = useState(null); // to detect changes
  const modalRef = useRef(null);

  // React Query hooks
  const { data, isLoading: isLoadingGet, isFetching, refetch } = useGetTourAndTravel();
  const upsert = useUpsertTourAndTravel();

  // When modal opens, fetch (useGetTourAndTravel already runs on mount, but refetch on open to be safe)
  useEffect(() => {
    if (isOpen) {
      refetch();
    }
  }, [isOpen, refetch]);

  // Populate form when data arrives
  useEffect(() => {
    if (data) {
      // normalize data shape to ensure fields exist
      const normalized = {
        hero: {
          title: data.hero?.title ?? '',
          desc: data.hero?.desc ?? ''
        },
        advantages: Array.isArray(data.advantages)
          ? data.advantages.map(sec => ({
              title: sec.title ?? '',
              desc: sec.desc ?? '',
              types: Array.isArray(sec.types)
                ? sec.types.map(t => ({ title: t.title ?? '', desc: t.desc ?? '' }))
                : []
            }))
          : []
      };
      setForm(normalized);
      setInitial(normalized);
    } else if (!isLoadingGet && !data) {
      // no data -> start with empty
      setForm(emptyForm);
      setInitial(emptyForm);
    }
  }, [data, isLoadingGet]);

  // Close on ESC
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  // Overlay click to close (but not when clicking modal content)
  function onOverlayClick(e) {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  }

  // Handlers for form editing
  const setHeroField = (field, value) => {
    setForm(prev => ({ ...prev, hero: { ...prev.hero, [field]: value } }));
  };

  const addSection = () => {
    setForm(prev => ({
      ...prev,
      advantages: [...(prev.advantages || []), { title: '', desc: '', types: [] }]
    }));
  };

  const removeSection = (index) => {
    setForm(prev => ({
      ...prev,
      advantages: prev.advantages.filter((_, i) => i !== index)
    }));
  };

  const setSectionField = (index, field, value) => {
    setForm(prev => {
      const adv = [...(prev.advantages || [])];
      adv[index] = { ...adv[index], [field]: value };
      return { ...prev, advantages: adv };
    });
  };

  const addType = (sectionIndex) => {
    setForm(prev => {
      const adv = [...(prev.advantages || [])];
      adv[sectionIndex] = { ...adv[sectionIndex], types: [...(adv[sectionIndex].types || []), { title: '', desc: '' }] };
      return { ...prev, advantages: adv };
    });
  };

  const removeType = (sectionIndex, typeIndex) => {
    setForm(prev => {
      const adv = [...(prev.advantages || [])];
      adv[sectionIndex] = { ...adv[sectionIndex], types: adv[sectionIndex].types.filter((_, i) => i !== typeIndex) };
      return { ...prev, advantages: adv };
    });
  };

  const setTypeField = (sectionIndex, typeIndex, field, value) => {
    setForm(prev => {
      const adv = [...(prev.advantages || [])];
      const types = [...(adv[sectionIndex].types || [])];
      types[typeIndex] = { ...types[typeIndex], [field]: value };
      adv[sectionIndex] = { ...adv[sectionIndex], types };
      return { ...prev, advantages: adv };
    });
  };

  // Validation: require hero.title and require section.title & type.title when they exist
  const validate = () => {
    if (!form.hero.title || form.hero.title.trim() === '') {
      toast.error('Hero title is required');
      return false;
    }
    for (let i = 0; i < (form.advantages || []).length; i++) {
      const sec = form.advantages[i];
      if (!sec.title || sec.title.trim() === '') {
        toast.error(`Section #${i + 1} title is required`);
        return false;
      }
      for (let j = 0; j < (sec.types || []).length; j++) {
        const t = sec.types[j];
        if (!t.title || t.title.trim() === '') {
          toast.error(`Type #${j + 1} in section #${i + 1} needs a title`);
          return false;
        }
      }
    }
    return true;
  };

  // Save (upsert)
  const onSave = async () => {
    if (!validate()) return;
    try {
      await upsert.mutateAsync(form);
      toast.success('Tour & Travel content saved');
      // update initial to current to reflect saved state
      setInitial(form);
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || 'Failed to save');
    }
  };

  const hasChanges = !shallowEqual(form, initial);

  return (
    <>
      <button
        className="myGlobalButton"
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        Tours & Travel
      </button>

      {isOpen && (
        <div
          className="tt-modal-overlay"
          onMouseDown={onOverlayClick}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000
          }}
          aria-modal="true"
          role="dialog"
          aria-label="Edit Tours and Travel content"
        >
          <div
            ref={modalRef}
            className="tt-modal"
            onMouseDown={(e) => e.stopPropagation()}
            style={{
              background: '#fff',
              width: 'min(1000px, 96%)',
              maxHeight: '90vh',
              overflowY: 'auto',
              borderRadius: 8,
              padding: 20,
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h2 style={{ margin: 0 }}>Edit Tours & Travel</h2>
              <div>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close"
                  style={{ background: 'transparent', border: 'none', fontSize: 18, cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Loading / Fetch status */}
            {isLoadingGet || isFetching ? (
              <div style={{ padding: 20 }}>Loading content…</div>
            ) : (
              <div>
                {/* Hero */}
                <section style={{ marginBottom: 18 }}>
                  <h3 style={{ marginBottom: 8 }}>Hero</h3>
                  <label style={{ display: 'block', marginBottom: 6 }}>
                    <div style={{ fontSize: 13, marginBottom: 4 }}>Title <span style={{ color: 'red' }}>*</span></div>
                    <input
                      type="text"
                      value={form.hero.title}
                      onChange={(e) => setHeroField('title', e.target.value)}
                      placeholder="Hero title"
                      style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ddd' }}
                    />
                  </label>
                  <label style={{ display: 'block' }}>
                    <div style={{ fontSize: 13, marginBottom: 4 }}>Description</div>
                    <textarea
                      value={form.hero.desc}
                      onChange={(e) => setHeroField('desc', e.target.value)}
                      placeholder="Hero description"
                      rows={3}
                      style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ddd' }}
                    />
                  </label>
                </section>

                {/* Advantages */}
                <section>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ marginBottom: 8 }}>Advantages</h3>
                    {/* <div>
                      <button
                        onClick={addSection}
                        style={{
                          padding: '6px 10px',
                          borderRadius: 6,
                          border: '1px solid #ccc',
                          background: '#fff',
                          cursor: 'pointer'
                        }}
                      >
                        + Add section
                      </button>
                    </div> */}
                  </div>

                  {(form.advantages || []).length === 0 && (
                    <div style={{ color: '#666', padding: '8px 0' }}>No advantage sections yet. Add one to begin.</div>
                  )}

                  {(form.advantages || []).map((sec, sIdx) => (
                    <div key={sIdx} style={{ border: '1px solid #eee', padding: 12, borderRadius: 6, marginBottom: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                        <div style={{ flex: 1 }}>
                          <label style={{ display: 'block', marginBottom: 6 }}>
                            <div style={{ fontSize: 13, marginBottom: 4 }}>Section title <span style={{ color: 'red' }}>*</span></div>
                            <input
                              type="text"
                              value={sec.title}
                              onChange={(e) => setSectionField(sIdx, 'title', e.target.value)}
                              placeholder="Section title"
                              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ddd' }}
                            />
                          </label>
                          <label style={{ display: 'block' }}>
                            <div style={{ fontSize: 13, marginBottom: 4 }}>Section description</div>
                            <textarea
                              value={sec.desc}
                              onChange={(e) => setSectionField(sIdx, 'desc', e.target.value)}
                              placeholder="Section description"
                              rows={2}
                              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ddd' }}
                            />
                          </label>
                        </div>

                        {/* <div style={{ marginLeft: 12 }}>
                          <button
                            onClick={() => removeSection(sIdx)}
                            title="Remove section"
                            style={{ background: '#ffecec', border: '1px solid #f5c2c2', padding: '6px 8px', borderRadius: 6, cursor: 'pointer' }}
                          >
                            Remove
                          </button>
                        </div> */}
                      </div>

                      {/* types */}
                      <div style={{ marginTop: 10 }}>
                        {/* <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <strong>Types</strong>
                          <button
                            onClick={() => addType(sIdx)}
                            style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #ccc', cursor: 'pointer' }}
                          >
                            + Add type
                          </button>
                        </div> */}

                        {Array.isArray(sec.types) && sec.types.length === 0 && (
                          <div style={{ color: '#666', marginTop: 8 }}>No types yet for this section.</div>
                        )}

                        {sec.types && sec.types.map((t, tIdx) => (
                          <div key={tIdx} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, marginTop: 8, alignItems: 'start' }}>
                            <div>
                              <input
                                type="text"
                                value={t.title}
                                onChange={(e) => setTypeField(sIdx, tIdx, 'title', e.target.value)}
                                placeholder="Type title"
                                style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ddd', marginBottom: 6 }}
                              />
                              <textarea
                                value={t.desc}
                                onChange={(e) => setTypeField(sIdx, tIdx, 'desc', e.target.value)}
                                placeholder="Type description (optional)"
                                rows={2}
                                style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ddd' }}
                              />
                            </div>
                            {/* <div>
                              <button
                                onClick={() => removeType(sIdx, tIdx)}
                                title="Remove type"
                                style={{ background: '#fff5f5', border: '1px solid #f4c2c2', padding: '6px 8px', borderRadius: 6, cursor: 'pointer' }}
                              >
                                Remove
                              </button>
                            </div> */}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </section>

                {/* Footer actions */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
                  <button
                    onClick={() => {
                      setForm(initial ?? emptyForm);
                    }}
                    disabled={!hasChanges}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 6,
                      border: '1px solid #ccc',
                      background: hasChanges ? '#fff' : '#f5f5f5',
                      cursor: hasChanges ? 'pointer' : 'not-allowed'
                    }}
                  >
                    Reset
                  </button>
                  <button
                    onClick={onSave}
                    disabled={upsert.isLoading || !hasChanges}
                    style={{
                      padding: '8px 14px',
                      borderRadius: 6,
                      border: 'none',
                      background: upsert.isLoading || !hasChanges ? '#aaa' : '#0070f3',
                      color: '#fff',
                      cursor: upsert.isLoading || !hasChanges ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {upsert.isLoading ? 'Saving…' : 'Save'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ToursAndTravel;
