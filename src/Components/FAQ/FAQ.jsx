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
    <div className="w-full p-4 mt-16">
      <div className={`${lang === "ar" ? "text-right" : "text-left"} text-[32px] font-bold mb-6`}>
        {t('faq.title')}
      </div>
      <div className="max-w-4xl mx-auto">
        {faqs.map((q, index) => (
          <div key={index} data-aos="fade-up" className="border-b border-slate-200 py-4">
            <button
              onClick={() => toggle(index)}
              className={`w-full flex items-center justify-between text-left ${lang === "ar" ? "flex-row-reverse" : ""}`}
            >
              <span className="text-[18px] font-semibold text-slate-900">{q.question}</span>
              <span className="text-slate-500">{openIndex === index ? '-' : '+'}</span>
            </button>
            {openIndex === index && (
              <div className={`mt-2 text-[15px] leading-7 text-slate-700 ${lang === "ar" ? "text-right" : "text-left"}`}>
                {q.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;


