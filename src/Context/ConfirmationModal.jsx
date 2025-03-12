
const ConfirmationModal = ({ show, onHide, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-medium mb-4">Confirm Cancel</h2>
        <p className="text-gray-600 mb-6">Your booking is ongoing. Are you sure you want to exit?</p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            onClick={onHide}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-primary-dark-green text-white rounded "
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;