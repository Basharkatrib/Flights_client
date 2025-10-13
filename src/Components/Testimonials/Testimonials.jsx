import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";

function Testimonials() {
  const lang = useSelector(state => state.lang.lang);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  useEffect(() => {
    AOS.init({ duration: 3000 });
  }, []);

  const testimonials = t('testimonials.items', { returnObjects: true }) || [];

  return (
    <div className="w-full p-4 mt-16">
      <div className={`${lang === "ar" ? "text-right" : "text-left"} text-[32px] font-bold mb-6`}>
        {t('testimonials.title')}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {testimonials.map((item, index) => (
          <div
            key={index}
            data-aos="fade-up"
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="text-[16px] text-slate-700 leading-7">{item.text}</div>
            <div className="mt-4 flex items-center justify-between">
              <div className={`${lang === "ar" ? "text-right" : "text-left"}`}>
                <div className="text-[14px] font-semibold text-slate-900">{item.name}</div>
                <div className="text-[12px] text-slate-500">{item.role}</div>
              </div>
              <div className="flex items-center gap-1 text-yellow-500">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;


