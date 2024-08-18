interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  type: "success" | "danger";
  confirmMessage: any;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmationModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  type,
  confirmMessage,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <h2 className="text-lg text-primary-dark font-semibold mb-4">
          {title}
        </h2>
        <p className="mb-6 text-primary-dark">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            className="text-secondary border border-secondary py-2 px-4 rounded-[8px]"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className={`${
              type === "danger" ? "bg-red" : "bg-secondary"
            } text-white py-2 px-4 rounded-[8px]`}
            onClick={onConfirm}
          >
            {confirmMessage}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
