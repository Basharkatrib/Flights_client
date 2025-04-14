import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function Spinner() {
  return (
    <div className='w-full flex justify-center items-center h-[100vh]'>
      <CircularProgress size="5rem" />
    </div>
  );
}