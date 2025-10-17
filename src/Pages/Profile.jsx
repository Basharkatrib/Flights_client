import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from 'react-hot-toast';
import { setUser } from "../store/authSlice";

function Profile() {
  const lang = useSelector(state => state.lang.lang);
  const user = useSelector(state => state.auth.user);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  // Mock saved travelers data
  const [savedTravelers, setSavedTravelers] = useState([
    {
      id: 1,
      name: lang === "ar" ? "أحمد محمد علي" : "Ahmed Mohamed Ali",
      passport: "A12345678",
      nationality: lang === "ar" ? "مصري" : "Egyptian",
      dateOfBirth: "1990-01-15"
    },
    {
      id: 2,
      name: lang === "ar" ? "فاطمة حسن" : "Fatima Hassan",
      passport: "B87654321",
      nationality: lang === "ar" ? "إماراتي" : "Emirati",
      dateOfBirth: "1995-05-20"
    }
  ]);

  // Mock preferences
  const [preferences, setPreferences] = useState({
    seatPreference: 'window',
    mealPreference: 'vegetarian',
    notifications: true,
    newsletter: true
  });

  // Validation schema for profile edit
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, lang === "ar" ? "الاسم قصير جداً" : "Name is too short")
      .required(lang === "ar" ? "الاسم مطلوب" : "Name is required"),
    email: Yup.string()
      .email(lang === "ar" ? "بريد إلكتروني غير صالح" : "Invalid email")
      .required(lang === "ar" ? "البريد الإلكتروني مطلوب" : "Email is required"),
    phone: Yup.string()
      .matches(/^[0-9+\s-()]+$/, lang === "ar" ? "رقم هاتف غير صالح" : "Invalid phone number")
  });

  const formik = useFormik({
    initialValues: {
      username: user?.username || '',
      email: user?.email || '',
      phone: user?.phone || '+971 50 123 4567',
      address: user?.address || ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Update user info in Redux
      dispatch(setUser({ ...user, ...values }));
      toast.success(lang === "ar" ? "تم تحديث البيانات بنجاح!" : "Profile updated successfully!");
      setIsEditing(false);
    }
  });

  const tabs = [
    { id: 'personal', label: lang === "ar" ? "المعلومات الشخصية" : "Personal Info", icon: "👤" },
    { id: 'travelers', label: lang === "ar" ? "المسافرون المحفوظون" : "Saved Travelers", icon: "👥" },
    { id: 'preferences', label: lang === "ar" ? "التفضيلات" : "Preferences", icon: "⚙️" }
  ];

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    toast.success(lang === "ar" ? "تم حفظ التفضيلات" : "Preferences saved");
  };

  const handleRemoveTraveler = (id) => {
    setSavedTravelers(prev => prev.filter(t => t.id !== id));
    toast.success(lang === "ar" ? "تم حذف المسافر" : "Traveler removed");
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16 px-4 mt-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-blue-600">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">
                {lang === "ar" ? `مرحباً، ${user?.username || 'المستخدم'}` : `Welcome, ${user?.username || 'User'}`}
              </h1>
              <p className="text-blue-100 text-sm">
                {user?.email || 'user@flyza.com'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8 pb-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className={`flex ${lang === "ar" ? "flex-row-reverse" : ""} border-b border-slate-200 overflow-x-auto`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-3 font-medium whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white border-b-2 border-blue-600'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Personal Info Tab */}
            {activeTab === 'personal' && (
              <div>
                <div className={`flex justify-between items-center mb-6 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {lang === "ar" ? "معلوماتك الشخصية" : "Your Personal Information"}
                  </h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {isEditing ? (lang === "ar" ? "إلغاء" : "Cancel") : (lang === "ar" ? "تعديل" : "Edit")}
                  </button>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-slate-700 font-semibold mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                        {lang === "ar" ? "الاسم" : "Name"}
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border rounded-lg ${
                          isEditing ? 'bg-white' : 'bg-slate-100'
                        } ${formik.touched.username && formik.errors.username ? 'border-red-500' : 'border-slate-300'}
                        ${lang === "ar" ? "text-right" : "text-left"}`}
                      />
                      {formik.touched.username && formik.errors.username && (
                        <div className={`text-red-500 text-sm mt-1 ${lang === "ar" ? "text-right" : "text-left"}`}>
                          {formik.errors.username}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className={`block text-slate-700 font-semibold mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                        {lang === "ar" ? "البريد الإلكتروني" : "Email"}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border rounded-lg ${
                          isEditing ? 'bg-white' : 'bg-slate-100'
                        } ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-slate-300'}
                        ${lang === "ar" ? "text-right" : "text-left"}`}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <div className={`text-red-500 text-sm mt-1 ${lang === "ar" ? "text-right" : "text-left"}`}>
                          {formik.errors.email}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className={`block text-slate-700 font-semibold mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                        {lang === "ar" ? "رقم الهاتف" : "Phone Number"}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border rounded-lg ${
                          isEditing ? 'bg-white' : 'bg-slate-100'
                        } ${formik.touched.phone && formik.errors.phone ? 'border-red-500' : 'border-slate-300'}
                        ${lang === "ar" ? "text-right" : "text-left"}`}
                      />
                      {formik.touched.phone && formik.errors.phone && (
                        <div className={`text-red-500 text-sm mt-1 ${lang === "ar" ? "text-right" : "text-left"}`}>
                          {formik.errors.phone}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className={`block text-slate-700 font-semibold mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                        {lang === "ar" ? "العنوان" : "Address"}
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border rounded-lg ${
                          isEditing ? 'bg-white' : 'bg-slate-100'
                        } border-slate-300 ${lang === "ar" ? "text-right" : "text-left"}`}
                        placeholder={lang === "ar" ? "أدخل عنوانك" : "Enter your address"}
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-4 justify-end">
                      <button
                        type="submit"
                        className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                      >
                        {lang === "ar" ? "حفظ التغييرات" : "Save Changes"}
                      </button>
                    </div>
                  )}
                </form>
              </div>
            )}

            {/* Saved Travelers Tab */}
            {activeTab === 'travelers' && (
              <div>
                <div className={`flex justify-between items-center mb-6 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {lang === "ar" ? "المسافرون المحفوظون" : "Saved Travelers"}
                  </h2>
                  <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    {lang === "ar" ? "+ إضافة مسافر" : "+ Add Traveler"}
                  </button>
                </div>

                <div className="space-y-4">
                  {savedTravelers.map((traveler) => (
                    <div
                      key={traveler.id}
                      className="bg-slate-50 rounded-lg p-6 border border-slate-200"
                    >
                      <div className="grid md:grid-cols-4 gap-4">
                        <div className={lang === "ar" ? "text-right" : "text-left"}>
                          <p className="text-sm text-slate-600 mb-1">{lang === "ar" ? "الاسم" : "Name"}</p>
                          <p className="font-bold text-slate-900">{traveler.name}</p>
                        </div>
                        <div className={lang === "ar" ? "text-right" : "text-left"}>
                          <p className="text-sm text-slate-600 mb-1">{lang === "ar" ? "رقم الجواز" : "Passport"}</p>
                          <p className="font-bold text-slate-900">{traveler.passport}</p>
                        </div>
                        <div className={lang === "ar" ? "text-right" : "text-left"}>
                          <p className="text-sm text-slate-600 mb-1">{lang === "ar" ? "الجنسية" : "Nationality"}</p>
                          <p className="font-bold text-slate-900">{traveler.nationality}</p>
                        </div>
                        <div className={`flex items-end ${lang === "ar" ? "justify-start" : "justify-end"}`}>
                          <button
                            onClick={() => handleRemoveTraveler(traveler.id)}
                            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            {lang === "ar" ? "حذف" : "Remove"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div>
                <h2 className={`text-2xl font-bold text-slate-900 mb-6 ${lang === "ar" ? "text-right" : "text-left"}`}>
                  {lang === "ar" ? "تفضيلات السفر" : "Travel Preferences"}
                </h2>

                <div className="space-y-6">
                  <div className="bg-slate-50 rounded-lg p-6">
                    <label className={`block text-slate-900 font-semibold mb-4 ${lang === "ar" ? "text-right" : "text-left"}`}>
                      {lang === "ar" ? "تفضيل المقعد" : "Seat Preference"}
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {['window', 'middle', 'aisle'].map((seat) => (
                        <button
                          key={seat}
                          onClick={() => handlePreferenceChange('seatPreference', seat)}
                          className={`px-4 py-3 rounded-lg font-medium ${
                            preferences.seatPreference === seat
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                          }`}
                        >
                          {seat === 'window' ? (lang === "ar" ? "نافذة" : "Window") :
                           seat === 'middle' ? (lang === "ar" ? "وسط" : "Middle") :
                           (lang === "ar" ? "ممر" : "Aisle")}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-6">
                    <label className={`block text-slate-900 font-semibold mb-4 ${lang === "ar" ? "text-right" : "text-left"}`}>
                      {lang === "ar" ? "تفضيل الوجبة" : "Meal Preference"}
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {['regular', 'vegetarian', 'halal'].map((meal) => (
                        <button
                          key={meal}
                          onClick={() => handlePreferenceChange('mealPreference', meal)}
                          className={`px-4 py-3 rounded-lg font-medium ${
                            preferences.mealPreference === meal
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                          }`}
                        >
                          {meal === 'regular' ? (lang === "ar" ? "عادي" : "Regular") :
                           meal === 'vegetarian' ? (lang === "ar" ? "نباتي" : "Vegetarian") :
                           (lang === "ar" ? "حلال" : "Halal")}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-6 space-y-4">
                    <div className={`flex items-center justify-between ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                      <div className={lang === "ar" ? "text-right" : "text-left"}>
                        <p className="font-semibold text-slate-900">{lang === "ar" ? "إشعارات الرحلات" : "Flight Notifications"}</p>
                        <p className="text-sm text-slate-600">{lang === "ar" ? "تلقي إشعارات حول رحلاتك" : "Receive notifications about your flights"}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.notifications}
                          onChange={(e) => handlePreferenceChange('notifications', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-14 h-7 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className={`flex items-center justify-between ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                      <div className={lang === "ar" ? "text-right" : "text-left"}>
                        <p className="font-semibold text-slate-900">{lang === "ar" ? "النشرة البريدية" : "Newsletter"}</p>
                        <p className="text-sm text-slate-600">{lang === "ar" ? "تلقي عروض وأخبار السفر" : "Receive travel offers and news"}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.newsletter}
                          onChange={(e) => handlePreferenceChange('newsletter', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-14 h-7 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="bg-blue-600 text-white rounded-lg p-5 shadow">
            <div className="text-3xl mb-2">✈️</div>
            <div className="text-2xl font-bold mb-1">12</div>
            <div className="text-blue-100 text-sm">{lang === "ar" ? "رحلة مكتملة" : "Completed Trips"}</div>
          </div>
          <div className="bg-purple-600 text-white rounded-lg p-5 shadow">
            <div className="text-3xl mb-2">🌍</div>
            <div className="text-2xl font-bold mb-1">8</div>
            <div className="text-purple-100 text-sm">{lang === "ar" ? "دولة تمت زيارتها" : "Countries Visited"}</div>
          </div>
          <div className="bg-pink-600 text-white rounded-lg p-5 shadow">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-2xl font-bold mb-1">4.9</div>
            <div className="text-pink-100 text-sm">{lang === "ar" ? "متوسط التقييم" : "Average Rating"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;


