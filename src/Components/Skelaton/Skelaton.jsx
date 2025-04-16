import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { Fullscreen } from '@mui/icons-material';
import { useEffect } from 'react';
import {useRef} from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const data = [
  {
    src: 'https://i.ytimg.com/vi/pLqipJNItIo/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBkklsyaw9FxDmMKapyBYCn9tbPNQ',
    title: 'Don Diablo @ Tomorrowland Main Stage 2019 | Official…',
    channel: 'Don Diablo',
    views: '396k views',
    createdAt: 'a week ago',
  },
  {
    src: 'https://i.ytimg.com/vi/_Uu12zY01ts/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLCpX6Jan2rxrCAZxJYDXppTP4MoQA',
    title: 'Queen - Greatest Hits',
    channel: 'Queen Official',
    views: '40M views',
    createdAt: '3 years ago',
  },
  {
    src: 'https://i.ytimg.com/vi/kkLk2XWMBf8/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLB4GZTFu1Ju2EPPPXnhMZtFVvYBaw',
    title: 'Calvin Harris, Sam Smith - Promises (Official Video)',
    channel: 'Calvin Harris',
    views: '130M views',
    createdAt: '10 months ago',
  },
];






function Media({count ,ok ,width}) {

    const screen = useSelector(state => state.screenWidth.screenWidth);
    const [skeletonWidth, setskeletonWidth] = useState();

    useEffect(()=>{
        if(screen > 768){
            setskeletonWidth(width)
        }else{
            setskeletonWidth(100);
        }
    },[screen])
  

  return (
    <div className='w-full p-4 flex flex-col md:flex md:flex-row md:justify-between mt-20 flex-wrap'>
      {(Array.from(new Array(count))).map((item, index) => (
        <div key={index} style={{ width: `${skeletonWidth}%` }} className={`mb-10 md:mb-0`}>
            <Skeleton variant="rectangular"  height={150} />
            <Box sx={{ pt: 0.5, display:ok }}>
              <Skeleton />
              <Skeleton width="100%" />
            </Box>
        </div>
      ))}
      </div>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function Skelaton({count ,ok ,width}) {
  return (
    <div className='w-full flex justify-between'>
      <Media loading count={count} ok={ok} width={width}/>
      </div>
  );
}
