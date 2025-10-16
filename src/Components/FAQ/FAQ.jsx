import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";

function FAQ() {
  const lang = useSelector(state => state.lang.lang);
  const { t, i18n } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  useEffect(() => {
    AOS.init({ duration: 3000 });
  }, []);

  const faqs = t('faq.items', { returnObjects: true }) || [];

  const toggle = (index) => {
    setOpenIndex(prev => prev === index ? null : index);
  };

  return (
    <div className="w-full px-4 py-12 mt-16 bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto">
        {/* Header Section */}
        <div className={`${lang === "ar" ? "text-right" : "text-left"} mb-12 text-center`}>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {t('faq.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">
            {lang === "ar" ? "الأسئلة الأكثر شيوعاً" : "Find answers to common questions"}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((q, index) => (
            <div 
              key={index} 
              data-aos="fade-up" 
              data-aos-delay={index * 100}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100"
            >
              <button
                onClick={() => toggle(index)}
                className={`w-full flex items-center justify-between p-6 text-left ${lang === "ar" ? "flex-row-reverse" : ""} group transition-colors duration-300 ${openIndex === index ? 'bg-gradient-to-r from-blue-50 to-purple-50' : 'hover:bg-slate-50'}`}
              >
                <span className={`text-lg md:text-xl font-semibold text-slate-900 flex-1 ${lang === "ar" ? "mr-4" : "mr-4"} group-hover:text-blue-600 transition-colors duration-300`}>
                  {q.question}
                </span>
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === index ? 'bg-gradient-to-r from-blue-500 to-purple-500 rotate-180' : 'bg-slate-200 group-hover:bg-blue-100'}`}>
                  <svg 
                    className={`w-5 h-5 transition-colors duration-300 ${openIndex === index ? 'text-white' : 'text-slate-600 group-hover:text-blue-600'}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              <div 
                className={`transition-all duration-500 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className={`px-6 pb-6 pt-2 text-base md:text-lg leading-relaxed text-slate-700 bg-gradient-to-r from-blue-50/50 to-purple-50/50 ${lang === "ar" ? "text-right" : "text-left"}`}>
                  <div className="border-t border-slate-200 pt-4">
                    {q.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-12 text-center p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-md">
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            {lang === "ar" ? "لا تزال لديك أسئلة؟" : "Still have questions?"}
          </h3>
          <p className="text-slate-600 mb-4">
            {lang === "ar" ? "تواصل معنا وسنكون سعداء بمساعدتك" : "Contact us and we'll be happy to help"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FAQ;


