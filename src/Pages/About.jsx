import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";

function About() {
  const lang = useSelector(state => state.lang.lang);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const stats = [
    { number: "10M+", label: lang === "ar" ? "مسافر سعيد" : "Happy Travelers" },
    { number: "500+", label: lang === "ar" ? "وجهة" : "Destinations" },
    { number: "15+", label: lang === "ar" ? "سنوات خبرة" : "Years Experience" },
    { number: "24/7", label: lang === "ar" ? "دعم العملاء" : "Customer Support" }
  ];

  const values = [
    {
      icon: "🎯",
      title: lang === "ar" ? "مهمتنا" : "Our Mission",
      description: lang === "ar" 
        ? "نسعى لجعل السفر الجوي سهلاً وميسوراً ومريحاً للجميع من خلال توفير أفضل خدمات الحجز والدعم."
        : "We strive to make air travel easy, affordable, and comfortable for everyone through the best booking and support services."
    },
    {
      icon: "👁️",
      title: lang === "ar" ? "رؤيتنا" : "Our Vision",
      description: lang === "ar"
        ? "أن نكون الخيار الأول للمسافرين حول العالم من خلال تقديم تجربة حجز استثنائية وخدمة عملاء متميزة."
        : "To be the first choice for travelers worldwide by providing an exceptional booking experience and outstanding customer service."
    },
    {
      icon: "⭐",
      title: lang === "ar" ? "قيمنا" : "Our Values",
      description: lang === "ar"
        ? "الشفافية، الموثوقية، الابتكار، والتركيز على رضا العملاء هي القيم التي توجه كل ما نقوم به."
        : "Transparency, reliability, innovation, and customer satisfaction are the values that guide everything we do."
    }
  ];

  const team = [
    {
      name: lang === "ar" ? "أحمد محمد" : "Ahmed Mohamed",
      role: lang === "ar" ? "المدير التنفيذي" : "CEO",
      image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      name: lang === "ar" ? "سارة أحمد" : "Sara Ahmed",
      role: lang === "ar" ? "مديرة العمليات" : "COO",
      image: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      name: lang === "ar" ? "محمد علي" : "Mohamed Ali",
      role: lang === "ar" ? "مدير التكنولوجيا" : "CTO",
      image: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      name: lang === "ar" ? "فاطمة حسن" : "Fatima Hassan",
      role: lang === "ar" ? "مديرة خدمة العملاء" : "Customer Service Manager",
      image: "https://randomuser.me/api/portraits/women/2.jpg"
    }
  ];

  return (
    <div className="w-full pt-12 pb-12 overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6" data-aos="fade-down">
            {lang === "ar" ? "من نحن" : "About Us"}
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" data-aos="fade-up">
            {lang === "ar"
              ? "فلايزا إيرويز هي منصة رائدة لحجز الطيران، نربط المسافرين بوجهاتهم المفضلة منذ عام 2010"
              : "Flyza Airways is a leading flight booking platform, connecting travelers to their favorite destinations since 2010"}
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-4 -mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              className="bg-white rounded-2xl shadow-xl p-6 text-center hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-slate-600 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-6xl mx-auto px-4 mt-20">
        <div className={`grid md:grid-cols-2 gap-12 items-center ${lang === "ar" ? "md:flex-row-reverse" : ""}`}>
          <div data-aos="fade-right">
            <img
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800"
              alt="About Flyza"
              className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
            />
          </div>
          <div data-aos="fade-left" className={lang === "ar" ? "text-right" : "text-left"}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              {lang === "ar" ? "قصتنا" : "Our Story"}
            </h2>
            <p className="text-slate-700 text-lg leading-relaxed mb-4">
              {lang === "ar"
                ? "بدأت رحلتنا في عام 2010 بحلم بسيط: جعل السفر الجوي أكثر سهولة وراحة للجميع. منذ ذلك الحين، نمت فلايزا إيرويز لتصبح واحدة من منصات حجز الطيران الرائدة في المنطقة."
                : "Our journey began in 2010 with a simple dream: to make air travel easier and more comfortable for everyone. Since then, Flyza Airways has grown to become one of the leading flight booking platforms in the region."}
            </p>
            <p className="text-slate-700 text-lg leading-relaxed">
              {lang === "ar"
                ? "اليوم، نخدم ملايين المسافرين سنوياً، ونقدم لهم أفضل الأسعار والخدمات لأكثر من 500 وجهة حول العالم."
                : "Today, we serve millions of travelers annually, offering them the best prices and services to over 500 destinations worldwide."}
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gradient-to-b from-white to-slate-50 py-20 mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12" data-aos="fade-up">
            {lang === "ar" ? "مهمتنا، رؤيتنا، وقيمنا" : "Our Mission, Vision & Values"}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 150}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300"
              >
                <div className="text-6xl mb-4 text-center">{value.icon}</div>
                <h3 className={`text-2xl font-bold text-slate-900 mb-4 ${lang === "ar" ? "text-right" : "text-left"}`}>
                  {value.title}
                </h3>
                <p className={`text-slate-700 leading-relaxed ${lang === "ar" ? "text-right" : "text-left"}`}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto px-4 mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12" data-aos="fade-up">
          {lang === "ar" ? "فريقنا" : "Our Team"}
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              className="text-center group"
            >
              <div className="relative overflow-hidden rounded-2xl mb-4 shadow-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{member.name}</h3>
              <p className="text-slate-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 mt-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8" data-aos="fade-up">
            {lang === "ar" ? "إنجازاتنا" : "Our Achievements"}
          </h2>
          <div className={`grid md:grid-cols-3 gap-8 ${lang === "ar" ? "text-right" : "text-left"}`}>
            <div data-aos="fade-up" data-aos-delay="100">
              <div className="text-5xl mb-4 text-center">🏆</div>
              <h3 className="text-xl font-bold mb-2 text-center">
                {lang === "ar" ? "أفضل منصة حجز 2023" : "Best Booking Platform 2023"}
              </h3>
              <p className="text-blue-100 text-center">
                {lang === "ar" ? "جائزة السفر العالمية" : "World Travel Awards"}
              </p>
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
              <div className="text-5xl mb-4 text-center">🌟</div>
              <h3 className="text-xl font-bold mb-2 text-center">
                {lang === "ar" ? "تقييم 4.8/5 نجوم" : "4.8/5 Star Rating"}
              </h3>
              <p className="text-blue-100 text-center">
                {lang === "ar" ? "من أكثر من 50,000 مراجعة" : "From over 50,000 reviews"}
              </p>
            </div>
            <div data-aos="fade-up" data-aos-delay="300">
              <div className="text-5xl mb-4 text-center">💼</div>
              <h3 className="text-xl font-bold mb-2 text-center">
                {lang === "ar" ? "شراكات عالمية" : "Global Partnerships"}
              </h3>
              <p className="text-blue-100 text-center">
                {lang === "ar" ? "مع أكثر من 200 شركة طيران" : "With over 200 airlines"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 mt-20 text-center">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-xl p-8 md:p-12" data-aos="zoom-in">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {lang === "ar" ? "جاهز للسفر؟" : "Ready to Travel?"}
          </h2>
          <p className="text-slate-700 text-lg mb-6">
            {lang === "ar"
              ? "احجز رحلتك القادمة معنا واستمتع بتجربة سفر لا تُنسى"
              : "Book your next trip with us and enjoy an unforgettable travel experience"}
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            {lang === "ar" ? "ابدأ الآن" : "Get Started"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;


