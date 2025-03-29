import * as React from 'react';
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
import { useEffect } from 'react';
import { Login as LoginAction } from '../../store/authSlice';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function Login() {

    const [open, setOpen] = React.useState(false);
    const lang = useSelector(state => state.lang.lang);
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(()=>{
        i18n.changeLanguage(lang);
    },[lang])

      const handleLogin = async (values) => {
            const info = {
              identifier: values.email,
              password: values.password
            };
            
            try {
              const res = await dispatch(LoginAction(info)).unwrap(); 
              console.log("User Login successfully:", res);
              values.email = "";
              values.password = "";
              setOpen(false);
            } catch (error) {
              console.log("Login failed:", error);
            }
          };
          
          const formik = useFormik({
            initialValues: { email: '', password: '' },
            validationSchema: Yup.object({
              email: Yup.string().email('Invalid email address').required('Required'),
              password: Yup.string().required('Required'),
            }),
            onSubmit: handleLogin,
          });

    return (
        <React.Fragment>
            <div className="text-black bg-[#EEEEEE] py-1 px-2 rounded-md cursor-pointer" onClick={() => handleClickOpen()}>
                {t('Log In')}
            </div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    {t('Welcome Back')}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <hr />
                <div className='py-5 px-4'>
                    <form className='w-full flex flex-col gap-3' onSubmit={formik.handleSubmit}>
                        <div className='w-full'>
                        <input
                            className='border-2 w-full p-1 border-gray-300 rounded-lg outline-none'
                            placeholder='Enter Your Email'
                            name='email'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        
                        {formik.touched.email && formik.errors.email ? (
                            <div className='text-red-700'>{formik.errors.email}</div>
                        ) : null}
                        </div>
                        <div className='w-full'>
                        <input
                            className='border-2 w-full p-1 border-gray-300 rounded-lg outline-none'
                            placeholder='Enter Your Password'
                            name='password'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className='text-red-700'>{formik.errors.password}</div>
                        ) : null}
                        </div>
                        <button type='submit' className='bg-slate-700 text-white rounded-md p-1'>{t('Log In')}</button>

                    </form>
                    <GoogleButton />
                </div>

            </BootstrapDialog>
        </React.Fragment>
    );
}
export default Login;