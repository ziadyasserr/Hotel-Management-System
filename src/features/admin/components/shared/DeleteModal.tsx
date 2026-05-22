
interface DeleteModalProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function DeleteModal({
  isOpen,
  title = "Delete Item",
  description = "Are you sure you want to delete this item?",
  loading = false,
  onConfirm,
  onCancel,
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      
      <div className="bg-white w-[90%] max-w-md rounded-lg p-6 shadow-lg">

        {/* TITLE */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {title}
        </h2>

        {/* DESCRIPTION */}
        <p className="text-gray-600 mb-6">
          {description}
        </p>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3">

          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>
      </div>
    </div>
  );
}

export default DeleteModal;