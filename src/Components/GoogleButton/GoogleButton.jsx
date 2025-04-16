import React, { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { load } from "../../store/handleGoogleSlice";
const GoogleButton = () => {

      const lang = useSelector(state => state.lang.lang);
      const loadGoogle = useSelector(state => state.googleLoad.load);
      const dispatch = useDispatch();

      const { t, i18n } = useTranslation();

       useEffect(()=>{
              i18n.changeLanguage(lang);
          },[lang])


  

  const handleLogin = () => {
    dispatch(load());
    window.location.href = "https://flights-server.onrender.com/api/connect/google";
    
  };

  return (
    <div>
      <button className="border-2 flex justify-center items-center gap-2 py-1 text-slate-700 border-slate-700 mt-3 rounded-md w-full" onClick={handleLogin} >
       {loadGoogle ? 'Loding...' : t('Continue With Google')}  <svg xmlns="http://www.w3.org/2000/svg" className="w-4" viewBox="0 0 488 512"><path fill="#334155" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg>
      </button>
    </div>
  );
};

export default GoogleButton;