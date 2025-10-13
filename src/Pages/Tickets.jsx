import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import logo from "../assets/images/FlyzaAirways.svg";

function Tickets() {
    const { t, i18n } = useTranslation();
    const lang = useSelector(state => state.lang.lang);
    const flight = useSelector((state) => state.flightselect.selectedFlight);
    const passengers = JSON.parse(localStorage.getItem("passengersData")) || [];

    useEffect(() => {
        i18n.changeLanguage(lang);
    }, [lang]);

    const f = (flight && flight[0]) || {};
    const ticketRefs = useRef([]);
    const [exportingIndex, setExportingIndex] = useState(null);

    const ensureLibsLoaded = async () => {
        if (!window.html2canvas) {
            await new Promise((resolve) => {
                const s = document.createElement('script');
                s.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
                s.onload = resolve;
                document.body.appendChild(s);
            });
        }
        if (!window.jspdf) {
            await new Promise((resolve) => {
                const s = document.createElement('script');
                s.src = 'https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js';
                s.onload = resolve;
                document.body.appendChild(s);
            });
        }
    };

    const handleDownload = async (index) => {
        setExportingIndex(index);
        await ensureLibsLoaded();
        await new Promise(r => setTimeout(r, 60));
        const node = ticketRefs.current[index];
        if (!node) return;
        const canvas = await window.html2canvas(node, { scale: 2, background: '#ffffff', useCORS: true });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new window.jspdf.jsPDF('p', 'mm', 'a4');
        const pageWidth = 210;
        const pageHeight = 297;
        const margin = 10;
        const availableW = pageWidth - margin * 2;
        const availableH = pageHeight - margin * 2;
        const imgH = (canvas.height * availableW) / canvas.width;
        if (imgH > availableH) {
            const scale = availableH / imgH;
            const w = availableW * scale;
            const h = availableH;
            const x = (pageWidth - w) / 2;
            const y = margin;
            pdf.addImage(imgData, 'PNG', x, y, w, h);
        } else {
            const w = availableW;
            const h = imgH;
            const x = (pageWidth - w) / 2;
            const y = (pageHeight - h) / 2;
            pdf.addImage(imgData, 'PNG', x, y, w, h);
        }
        pdf.save(`ticket-${index + 1}.pdf`);
        setExportingIndex(null);
    };

    return (
        <div className={`w-full flex flex-col pt-20 pb-8 ${lang === "ar" ? 'text-right' : 'text-left'} px-4`}> 
            <div className="max-w-6xl w-full mx-auto">
                <div className="flex items-center justify-between mb-4">
                    <div className="font-bold text-[22px] md:text-[26px]">{t('Tickets')}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {passengers.map((p, idx) => (
                        <div ref={(el) => ticketRefs.current[idx] = el} key={idx} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <div className="text-sm text-slate-500">{t('Passenger')} #{idx + 1}</div>
                                <div className="flex items-center gap-3">
                                    <div className="text-xs text-slate-500">{f.date || '-'}</div>
                                    {exportingIndex === idx ? null : (
                                        <button type="button" onClick={() => handleDownload(idx)} className="px-2 py-1 rounded-md border border-slate-300 bg-white hover:border-slate-500 text-xs font-semibold">
                                            {t('Download PDF')}
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className={`w-full flex ${lang === "ar" ? 'flex-row-reverse' : ''} items-center justify-between mb-3`}>
                                <img src={logo} alt="logo" className="h-6" />
                                <div className="text-xs text-slate-500">{f.documentId || f.id || ''}</div>
                            </div>
                            <div className="font-bold text-lg mb-3">{p.name || '-'}</div>
                            <div className={`w-full flex ${lang === "ar" ? 'flex-row-reverse' : ''} justify-between mb-1`}>
                                <div className="font-semibold">{t('From')}</div>
                                <div>{f.departure_airport || '-'}</div>
                            </div>
                            <div className={`w-full flex ${lang === "ar" ? 'flex-row-reverse' : ''} justify-between mb-1`}>
                                <div className="font-semibold">{t('Departure Time :')}</div>
                                <div>{f.departure_time || '-'}</div>
                            </div>
                            <div className={`w-full flex ${lang === "ar" ? 'flex-row-reverse' : ''} justify-between mb-1`}>
                                <div className="font-semibold">{t('To')}</div>
                                <div>{f.arrival_airport || '-'}</div>
                            </div>
                            <div className={`w-full flex ${lang === "ar" ? 'flex-row-reverse' : ''} justify-between mb-1`}>
                                <div className="font-semibold">{t('Arrival Time :')}</div>
                                <div>{f.arrival_time || '-'}</div>
                            </div>
                            <div className="mt-3 text-xs text-slate-500">DOB: {p.date || '-'}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Tickets;


