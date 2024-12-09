import React, { useState } from "react";

export interface FormField {
  name: string;
  label: string;
  initialValue?: string;
  type: string;
  required?: boolean;
  className?: string;
  fullWidth?: boolean;
  resetOnSubmit?: boolean;
}

interface FormProps {
  fields: FormField[];
  onSubmit: (formData: any) => Promise<void>;
  submitButtonText?: string;
  loadingButtonText?: string;
  className?: string;
  validateField?: (name: string, value: string) => string;
}

const GenericForm: React.FC<FormProps> = ({
  fields,
  onSubmit,
  submitButtonText = "שלח",
  loadingButtonText = "שולח...",
  className = "",
  validateField,
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  // אתחול ערכים התחלתיים
  useState(() => {
    const initialData = {};
    fields.forEach((field) => {
      initialData[field.name] = field.initialValue || "";
    });
    setFormData(initialData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name] && validateField) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    if (validateField) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const validateForm = () => {
    if (!validateField) return true;

    const newErrors = {};
    fields.forEach((field) => {
      const error = validateField(field.name, formData[field.name]);
      if (error) newErrors[field.name] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    if (!validateForm()) {
      setIsSubmitting(false);
      const allTouched = fields.reduce(
        (acc, field) => ({
          ...acc,
          [field.name]: true,
        }),
        {}
      );
      setTouched(allTouched);
      return;
    }

    try {
      await onSubmit(formData);
      setSubmitStatus("success");

      // איפוס הטופס אם נדרש
      if (fields.some((field) => field.resetOnSubmit === true)) {
        const resetData = {};
        fields.forEach((field) => {
          resetData[field.name] =
            field.resetOnSubmit !== false
              ? field.initialValue || ""
              : formData[field.name];
        });
        setFormData(resetData);
        setTouched({});
        setErrors({});
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClassName = (name: string) => `
    w-full px-4 py-2 border rounded-md outline-none transition-shadow
    ${
      touched[name] && errors[name]
        ? "border-red-500 focus:ring-2 focus:ring-red-200"
        : "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    }
  `;

  return (
    <div className={className}>
      {/* {submitStatus === "success" && successMessage (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md text-green-700 px-4">
          {successMessage}
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
          {errorMessage}
        </div>
      )} */}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((field) => (
            <div
              key={field.name}
              className={
                field.className || (field.fullWidth ? "md:col-span-2" : "")
              }
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {field.label} {field.required && "*"}
              </label>

              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={field.rows || 5}
                  placeholder={field.placeholder}
                  className={getInputClassName(field.name)}
                  required={field.required}
                />
              ) : (
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={field.placeholder}
                  className={getInputClassName(field.name)}
                  required={field.required}
                />
              )}

              {touched[field.name] && errors[field.name] && (
                <p className="mt-1 text-sm text-red-500">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full md:w-auto px-8 py-3 text-white rounded-md transition-colors duration-200
              ${
                isSubmitting
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {isSubmitting ? loadingButtonText : submitButtonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GenericForm;
