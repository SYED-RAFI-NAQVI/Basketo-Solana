import Head from 'next/head';
import Image from 'next/image';
import {Box} from '@mui/system';
import {Paper, Typography} from '@mui/material';
import Navbar from '../components/Navbar.js';

export default function Home() {

  return (
    <>
    <Navbar/>  

    <Box sx={{minHeight:'100vh', width:'100vw', display:'flex', justifyContent:'center', paddingTop:'120px'}} >
      <Box sx={{display:'flex',justifyContent:'center', maxWidth:'lg'}} >
      <Box sx={{display:'grid',gap:'15px',gridTemplateColumns:'1fr 1fr 1fr 1fr', height:'min-content'}} >
      {
        Array.from({length:8}).map((_, i)=>(
          <Paper key={i}
          sx={{border:'1px solid #dddddd', padding:'15px', minWidth:'250px', cursor:'pointer',
          '&:hover':{boxShadow: "4px 4px 20px rgba(0, 0, 0, 0.25)"} }} 
          elevation={0}  >
            <Typography variant='subtitle1' >coin</Typography>
            <Typography variant='h5' >{`coin ${i} coin`}</Typography>
            <Typography variant='caption' >
              <span style={{color:'green'}} >+57.83%</span> price change
            </Typography>
          </Paper>
        ))
      }
      </Box>
      </Box>
    </Box>
    </>
  )
}
