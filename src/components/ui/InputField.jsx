const InputField = ({ id, label, type = 'text', placeholder, value, onChange, error, required = false, className = '' }) => {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="block font-label-sm text-label-sm text-on-surface">
          {label}{required && <span className="text-error">*</span>}
        </label>
      )}

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 bg-surface-container-lowest border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-body-md text-body-md text-on-surface ${
          error ? 'border-error' : 'border-outline-variant'
        } ${className}`}
      />

      {error && (
        <p className="font-label-sm text-label-sm text-error mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;