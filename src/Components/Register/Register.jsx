import * as React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import GoogleButton from '../GoogleButton/GoogleButton';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { Register as RegisterAction } from '../../store/authSlice';
import axios from 'axios';
import { Link } from 'react-router-dom';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function Register() {

    const [open, setOpen] = useState(false);
    const [dirRight, setDirRight] = useState();
    const [dirLeft, setDirLeft] = useState();

    const lang = useSelector(state => state.lang.lang);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
      
    };


    useEffect(() => {
        i18n.changeLanguage(lang);
    }, [lang]);




    const handleRegister = async (values) => {
        const info = {
            username: values.name,
            email: values.email,
            password: values.password
        };

        try {
            const res = await dispatch(RegisterAction(info)).unwrap();
            values.name = "";
            values.email = "";
            values.password = "";
            setOpen(false);
            toast.success('Successfully registeration!')
        } catch (error) {
            console.log("Registration failed:", error);
            toast.error("Change your email!")
        }
    };

    const formik = useFormik({
        initialValues: { name: '', email: '', password: '' },
        validationSchema: Yup.object({
            name: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required'),
        }),
        onSubmit: handleRegister,
    });

    useEffect(()=>{
        if(lang === "ar"){
            setDirLeft(8);
            setDirRight(null)
        }else{
            setDirLeft(null);
            setDirRight(8);
        }
    },[lang])




    return (
        <React.Fragment>
            <div className="text-black text-center bg-[#EEEEEE] py-1 px-2 rounded-md cursor-pointer" onClick={() => handleClickOpen()}>
                {t('Register')}
            </div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth
                maxWidth="sm"
                className={`${lang === "ar"? "text-right" : "text-left"}`}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    {t('Create An Account')}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: dirRight,
                        left: dirLeft,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <hr />
                <div className='py-5 px-4'>
                    <form className={`w-full flex flex-col gap-3 `} onSubmit={formik.handleSubmit}>
                        <div className='w-full'>
                            <input
                                className={`w-full border-2 p-1 border-gray-300 rounded-lg outline-none ${lang === "ar" ? "text-right" : "text-left"}`}
                                placeholder={t('Enter Your Name')}
                                name='name'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div className={`text-red-700 ${lang === "ar" ? "text-right" : "text-left"}`}>{t(formik.errors.name)}</div>
                            ) : null}
                        </div>
                        <div className='w-full'>
                            <input
                                className={`border-2 w-full p-1 border-gray-300 rounded-lg outline-none ${lang === "ar" ? "text-right" : "text-left"}`}
                                placeholder={t('Enter Your Email')}
                                name='email'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />

                            {formik.touched.email && formik.errors.email ? (
                                <div className={`text-red-700 ${lang === "ar" ? "text-right" : "text-left"}`}>{t(formik.errors.email)}</div>
                            ) : null}
                        </div>
                        <div className='w-full'>
                            <input
                                className={`border-2 w-full p-1 border-gray-300 rounded-lg outline-none ${lang === "ar" ? "text-right" : "text-left"}`}
                                placeholder={t('Enter Your Password')}
                                name='password'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className={`text-red-700 ${lang === "ar" ? "text-right" : "text-left"}`}>{t(formik.errors.password)}</div>
                            ) : null}
                        </div>
                        <button type='submit' className='bg-slate-700 text-white rounded-md py-1'>{t('Register')}</button>

                    </form>
                    <GoogleButton />
                </div>

            </BootstrapDialog>
        </React.Fragment>
    );
}
export default Register;