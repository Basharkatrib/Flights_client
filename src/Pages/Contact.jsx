import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import AOS from "aos";
import "aos/dist/aos.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import toast from 'react-hot-toast';

// Fix for default marker icon in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function Contact() {
  const lang = useSelector(state => state.lang.lang);
  const { t, i18n } = useTranslation();
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    // Force map to re-render when component mounts
    setMapKey(prev => prev + 1);
  }, []);

  // Office locations
  const offices = [
    {
      name: lang === "ar" ? "المكتب الرئيسي - دبي" : "Main Office - Dubai",
      position: [25.2048, 55.2708],
      address: lang === "ar" ? "شارع الشيخ زايد، دبي، الإمارات" : "Sheikh Zayed Road, Dubai, UAE",
      phone: "+971 4 123 4567"
    },
    {
      name: lang === "ar" ? "مكتب القاهرة" : "Cairo Office",
      position: [30.0444, 31.2357],
      address: lang === "ar" ? "وسط البلد، القاهرة، مصر" : "Downtown, Cairo, Egypt",
      phone: "+20 2 1234 5678"
    },
    {
      name: lang === "ar" ? "مكتب الرياض" : "Riyadh Office",
      position: [24.7136, 46.6753],
      address: lang === "ar" ? "طريق الملك فهد، الرياض، السعودية" : "King Fahd Road, Riyadh, Saudi Arabia",
      phone: "+966 11 123 4567"
    }
  ];

  const contactInfo = [
    {
      icon: "📧",
      title: lang === "ar" ? "البريد الإلكتروني" : "Email",
      value: "info@flyza.com",
      link: "mailto:info@flyza.com"
    },
    {
      icon: "📞",
      title: lang === "ar" ? "الهاتف" : "Phone",
      value: "+971 4 123 4567",
      link: "tel:+97141234567"
    },
    {
      icon: "🕐",
      title: lang === "ar" ? "ساعات العمل" : "Working Hours",
      value: lang === "ar" ? "24/7 - على مدار الساعة" : "24/7 - Round the Clock",
      link: null
    },
    {
      icon: "💬",
      title: lang === "ar" ? "الدردشة المباشرة" : "Live Chat",
      value: lang === "ar" ? "متاح الآن" : "Available Now",
      link: "#"
    }
  ];

  // Form validation schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, lang === "ar" ? "الاسم قصير جداً" : "Name is too short")
      .max(50, lang === "ar" ? "الاسم طويل جداً" : "Name is too long")
      .required(lang === "ar" ? "الاسم مطلوب" : "Name is required"),
    email: Yup.string()
      .email(lang === "ar" ? "بريد إلكتروني غير صالح" : "Invalid email address")
      .required(lang === "ar" ? "البريد الإلكتروني مطلوب" : "Email is required"),
    subject: Yup.string()
      .min(3, lang === "ar" ? "الموضوع قصير جداً" : "Subject is too short")
      .required(lang === "ar" ? "الموضوع مطلوب" : "Subject is required"),
    message: Yup.string()
      .min(10, lang === "ar" ? "الرسالة قصيرة جداً" : "Message is too short")
      .required(lang === "ar" ? "الرسالة مطلوبة" : "Message is required")
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      // Simulate form submission
      console.log('Form values:', values);
      toast.success(lang === "ar" ? "تم إرسال رسالتك بنجاح!" : "Message sent successfully!");
      resetForm();
    }
  });

  return (
    <div className="w-full pt-12 pb-12">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6" data-aos="fade-down">
            {lang === "ar" ? "اتصل بنا" : "Contact Us"}
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" data-aos="fade-up">
            {lang === "ar"
              ? "نحن هنا لمساعدتك! تواصل معنا في أي وقت"
              : "We're here to help! Contact us anytime"}
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="max-w-6xl mx-auto px-4 -mt-10">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              className="bg-white rounded-2xl shadow-xl p-6 text-center hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="text-4xl mb-3">{info.icon}</div>
              <h3 className="font-bold text-slate-900 mb-2">{info.title}</h3>
              {info.link ? (
                <a href={info.link} className="text-blue-600 hover:text-blue-700 text-sm break-all">
                  {info.value}
                </a>
              ) : (
                <p className="text-slate-600 text-sm">{info.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form and Map */}
      <div className="max-w-6xl mx-auto px-4 mt-20">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div data-aos="fade-right">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className={`text-3xl font-bold text-slate-900 mb-6 ${lang === "ar" ? "text-right" : "text-left"}`}>
                {lang === "ar" ? "أرسل لنا رسالة" : "Send us a Message"}
              </h2>
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div>
                  <label className={`block text-slate-700 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                    {lang === "ar" ? "الاسم" : "Name"}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-slate-300'
                    } ${lang === "ar" ? "text-right" : "text-left"}`}
                    placeholder={lang === "ar" ? "أدخل اسمك" : "Enter your name"}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className={`text-red-500 text-sm mt-1 ${lang === "ar" ? "text-right" : "text-left"}`}>
                      {formik.errors.name}
                    </div>
                  )}
                </div>

                <div>
                  <label className={`block text-slate-700 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                    {lang === "ar" ? "البريد الإلكتروني" : "Email"}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-slate-300'
                    } ${lang === "ar" ? "text-right" : "text-left"}`}
                    placeholder={lang === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email"}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className={`text-red-500 text-sm mt-1 ${lang === "ar" ? "text-right" : "text-left"}`}>
                      {formik.errors.email}
                    </div>
                  )}
                </div>

                <div>
                  <label className={`block text-slate-700 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                    {lang === "ar" ? "الموضوع" : "Subject"}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formik.touched.subject && formik.errors.subject ? 'border-red-500' : 'border-slate-300'
                    } ${lang === "ar" ? "text-right" : "text-left"}`}
                    placeholder={lang === "ar" ? "موضوع الرسالة" : "Message subject"}
                  />
                  {formik.touched.subject && formik.errors.subject && (
                    <div className={`text-red-500 text-sm mt-1 ${lang === "ar" ? "text-right" : "text-left"}`}>
                      {formik.errors.subject}
                    </div>
                  )}
                </div>

                <div>
                  <label className={`block text-slate-700 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                    {lang === "ar" ? "الرسالة" : "Message"}
                  </label>
                  <textarea
                    name="message"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    rows="5"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                      formik.touched.message && formik.errors.message ? 'border-red-500' : 'border-slate-300'
                    } ${lang === "ar" ? "text-right" : "text-left"}`}
                    placeholder={lang === "ar" ? "اكتب رسالتك هنا..." : "Write your message here..."}
                  />
                  {formik.touched.message && formik.errors.message && (
                    <div className={`text-red-500 text-sm mt-1 ${lang === "ar" ? "text-right" : "text-left"}`}>
                      {formik.errors.message}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  {lang === "ar" ? "إرسال الرسالة" : "Send Message"}
                </button>
              </form>
            </div>
          </div>

          {/* Office Locations Info */}
          <div data-aos="fade-left">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className={`text-3xl font-bold text-slate-900 mb-6 ${lang === "ar" ? "text-right" : "text-left"}`}>
                {lang === "ar" ? "مكاتبنا" : "Our Offices"}
              </h2>
              <div className="space-y-6">
                {offices.map((office, index) => (
                  <div key={index} className={`pb-6 ${index !== offices.length - 1 ? 'border-b border-slate-200' : ''}`}>
                    <h3 className={`text-xl font-bold text-slate-900 mb-3 ${lang === "ar" ? "text-right" : "text-left"}`}>
                      {office.name}
                    </h3>
                    <div className={`space-y-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                      <p className="text-slate-700 flex items-center gap-2">
                        <span>📍</span>
                        <span>{office.address}</span>
                      </p>
                      <p className="text-slate-700 flex items-center gap-2">
                        <span>📞</span>
                        <a href={`tel:${office.phone}`} className="text-blue-600 hover:text-blue-700">
                          {office.phone}
                        </a>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-6xl mx-auto px-4 mt-20">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-8" data-aos="fade-up">
          {lang === "ar" ? "مواقعنا على الخريطة" : "Find Us on Map"}
        </h2>
        <div className="rounded-2xl overflow-hidden shadow-2xl" data-aos="zoom-in">
          <MapContainer
            key={mapKey}
            center={[25.2048, 55.2708]}
            zoom={5}
            style={{ height: '500px', width: '100%' }}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {offices.map((office, index) => (
              <Marker key={index} position={office.position}>
                <Popup>
                  <div className="text-center p-2">
                    <h3 className="font-bold text-slate-900 mb-2">{office.name}</h3>
                    <p className="text-sm text-slate-700 mb-1">{office.address}</p>
                    <p className="text-sm text-blue-600">{office.phone}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* FAQ Link Section */}
      <div className="max-w-4xl mx-auto px-4 mt-20 text-center">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-xl p-8" data-aos="zoom-in">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            {lang === "ar" ? "هل لديك أسئلة؟" : "Have Questions?"}
          </h3>
          <p className="text-slate-700 mb-6">
            {lang === "ar"
              ? "تحقق من الأسئلة الشائعة للحصول على إجابات سريعة"
              : "Check our FAQ section for quick answers"}
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            {lang === "ar" ? "الأسئلة الشائعة" : "View FAQ"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contact;


