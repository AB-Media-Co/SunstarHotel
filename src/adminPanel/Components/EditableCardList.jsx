import { useEffect, useCallback, useRef } from 'react';
import { Plus, Trash2, Loader } from 'lucide-react';

/* ============ Debounce hook ============ */
const useDebounce = (callback, delay = 500) => {
  const timeoutRef = useRef(null);
  
  const debouncedCallback = useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
  
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  return debouncedCallback;
};

/* ============ UI Components ============ */
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

/* ============ Main Component ============ */
/**
 * EditableCardList - Reusable component for managing card lists with debounced updates
 * 
 * @param {Object} props
 * @param {string} props.title - Section title
 * @param {Array} props.cards - Array of card objects
 * @param {Function} props.onAdd - Handler for adding new card
 * @param {boolean} props.adding - Loading state for add operation
 * @param {Function} props.onUpdate - Handler for updating card (receives cardId and update object)
 * @param {Function} props.onDelete - Handler for deleting card (receives cardId)
 * @param {string} props.emptyMessage - Message to show when no cards exist
 * @param {Array} props.fields - Array of field definitions [{ name: 'title', label: 'Title', type: 'text' }, { name: 'description', label: 'Description', type: 'textarea' }]
 * @param {Function} props.onBulk - Optional bulk add handler
 */
const EditableCardList = ({
  title,
  cards,
  onAdd,
  adding,
  onUpdate,
  onDelete,
  emptyMessage,
  fields = [],
  onBulk
}) => {
  // Debounced update handler
  const debouncedUpdate = useDebounce((cardId, fieldName, value) => {
    onUpdate(cardId, { [fieldName]: value });
  });

  const renderField = (card, field) => {
    const commonProps = {
      label: field.label,
      value: card[field.name] ?? '',
      onChange: (e) => debouncedUpdate(card._id, field.name, e.target.value)
    };

    if (field.type === 'textarea') {
      return <Textarea key={field.name} {...commonProps} />;
    }
    
    return <Field key={field.name} type={field.type || 'text'} {...commonProps} />;
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <div className="flex gap-2">
          {/* Uncomment if bulk add is needed
          {onBulk && (
            <button
              onClick={onBulk}
              className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
            >
              <ListPlus size={16} />
              Bulk Add
            </button>
          )} */}
          <button
            onClick={onAdd}
            disabled={adding}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 px-4 py-2 text-sm font-medium text-white shadow-md hover:shadow-lg disabled:opacity-60"
          >
            {adding ? (
              <>
                <Loader size={16} className="animate-spin" />
                Adding…
              </>
            ) : (
              <>
                <Plus size={16} />
                Add Card
              </>
            )}
          </button>
        </div>
      </div>
      
      <ul className="space-y-3">
        {cards.length > 0 ? (
          cards.map((card) => (
            <li key={card._id} className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow duration-200">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {fields.map((field) => renderField(card, field))}
              </div>
              <div className="mt-3 flex justify-end">
                <button
                  onClick={() => onDelete(card._id)}
                  className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="rounded-lg border border-dashed border-gray-300 py-8 text-center">
            <p className="text-sm text-gray-500">{emptyMessage}</p>
          </li>
        )}
      </ul>
    </div>
  );
};

export default EditableCardList;
