interface FormAlertProps {
  message: string | null;
}

function FormAlert({message}: FormAlertProps) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className={`border px-4 py-3 rounded-lg text-sm mb-4 bg-red-50 border-red-300 text-red-600`}
    >
      {message}
    </div>
  );
}

export default FormAlert;

