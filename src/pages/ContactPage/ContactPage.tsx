import { Phone, Mail, MapPin } from "lucide-react";
import Form from "../../components/Form/Form";

const ContactPage = () => {
  const validateField = (name: string, value: string) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "שם מלא הוא שדה חובה";
        if (value.length < 2) return "שם חייב להכיל לפחות 2 תווים";
        if (!/^[\u0590-\u05FF\s'"-]+$|^[a-zA-Z\s'"-]+$/.test(value.trim()))
          return "שם יכול להכיל רק אותיות בעברית או באנגלית";
        return "";

      case "email":
        if (!value.trim()) return 'דוא"ל הוא שדה חובה';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return 'כתובת דוא"ל לא תקינה';
        return "";

      case "phone":
        if (!value.trim()) return "מספר טלפון הוא שדה חובה";
        if (!/^0[2-9]\d{7,8}$/.test(value.replace(/[-\s]/g, "")))
          return "מספר טלפון לא תקין";
        return "";

      case "subject":
        if (!value.trim()) return "נושא הפנייה הוא שדה חובה";
        if (value.length < 2) return "נושא חייב להכיל לפחות 2 תווים";
        return "";

      case "message":
        if (!value.trim()) return "תוכן ההודעה הוא שדה חובה";
        if (value.length < 10) return "ההודעה חייבת להכיל לפחות 10 תווים";
        return "";

      default:
        return "";
    }
  };

  const formFields = [
    {
      name: "name",
      label: "שם מלא",
      type: "text",
      required: true,
    },
    {
      name: "phone",
      label: "טלפון",
      type: "tel",
      required: true,
      placeholder: "050-1234567",
    },
    {
      name: "email",
      label: 'דוא"ל',
      type: "email",
      required: true,
      placeholder: "your@email.com",
    },
    {
      name: "subject",
      label: "נושא הפנייה",
      type: "text",
      required: true,
    },
    {
      name: "message",
      label: "תוכן ההודעה",
      type: "textarea",
      required: true,
      fullWidth: true,
      rows: 5,
    },
  ];

  const handleSubmit = async (formData: object) => {
    // כאן תהיה קריאת ה-API האמיתית
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* כותרת ראשית */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">צור קשר</h1>
          <p className="text-lg text-gray-600">
            נשמח לעמוד לשירותכם בכל שאלה או בקשה
          </p>
        </div>

        {/* תיבות מידע */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <Phone className="w-8 h-8 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">טלפון</h3>
            <p className="text-gray-600">03-1234567</p>
            <p className="text-gray-600">054-1234567</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">כתובת</h3>
            <p className="text-gray-600">רחוב העופרים 38</p>
            <p className="text-gray-600">גדרה</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <Mail className="w-8 h-8 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">מייל לפניות נוספות:</h3>
            <p className="text-gray-600">info@example.com</p>
          </div>
        </div>

        {/* טופס יצירת קשר */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <Form
            fields={formFields}
            onSubmit={handleSubmit}
            validateField={validateField}
            submitButtonText="שלח הודעה"
            loadingButtonText="שולח..."
            className="max-w-2xl mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
