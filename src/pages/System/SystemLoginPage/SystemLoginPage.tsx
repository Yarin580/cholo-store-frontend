import GenericForm, { FormField } from "../../../components/Form/Form";

const SystemLoginPage: React.FC = () => {
  const formFields: FormField[] = [
    {
      name: "username",
      label: "שם משתמש",
      type: "text",
      fullWidth: true,
      required: true,
    },
    {
      name: "password",
      label: "ססמה",
      type: "password",
      fullWidth: true,
      required: true,
    },
  ];

  const handleLoginSubmit = async (formData: object) => {
    console.log(formData);
  };
  return (
    <>
      <div className="w-full min-h-[70vh] flex items-center justify-center p-4">
        <div
          className="max-w-md w-full bg-slate-200 rounded-lg shadow-lg p-8"
          dir="rtl"
        >
          <div className="text-center mb-5">
            <span className="text-3xl">התחברות מערכת</span>
          </div>
          <GenericForm
            fields={formFields}
            onSubmit={handleLoginSubmit}
            submitButtonText="התחבר"
          />
        </div>
      </div>
    </>
  );
};
export default SystemLoginPage;
