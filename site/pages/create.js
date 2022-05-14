import { Dialog, Button, DialogTitle, DialogContent, DialogContentText, DialogActions, 
    Typography, TextField, Stepper, StepLabel, Step, Container } from '@mui/material';
import {useEffect, useState} from 'react'
import Navbar from '../components/Navbar.js';
import { useRouter } from 'next/router';
import {Box} from '@mui/system';
import TokenSelect from '../components/create/TokenSelect.js';

const steps = ["Choose Tokens", "Details", "Review"];

const Create = () => {
    const router = useRouter();
    const [wallet, setWallet] = useState({});
    useEffect(() => {
        setWallet(window.ethereum);
    }, [])
    
    if(!wallet){
        return(
            <Dialog sx={{padding:'15px'}}
                open={true}
                onClose={()=>(router.back())}
            >
                <DialogTitle>
                {"Install a Wallet"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Download Metamask Wallet to create a Basket.
                </DialogContentText>
                </DialogContent>
                <DialogActions sx={{flexDirection:'column'}} >
                <Button fullWidth href={'https://metamask.io/download/'} 
                target='_blank' sx={{margin:'5px 0px'}}
                autoFocus variant='contained'
                rel='noopener norefferer'>
                    Download
                </Button>
                <Button variant='outlined' fullWidth onClick={()=>(router.back())} sx={{margin:'5px 0px'}} >
                    Go Back
                </Button>
                </DialogActions>
            </Dialog>
        )
    }

    const [formData, setFormData] = useState({
        name:"",
        symbol:"",
        tokens:{}
    });
    const [activeStep, setActiveStep] = useState(0);

    const renderStep =
    ()=>{switch (activeStep) {
    case 0:
        return(
        <>
        <TokenSelect coins={formData.tokens} />
        </>
        )

    default:
        break;
    }}

    return (
    <>
    <Navbar/>
    <Box sx={{minHeight:'100vh', width:'100vw', display:'flex', justifyContent:'center', paddingTop:'120px'}} >
    <Box sx={{maxWidth:'md', width:'100%', padding:'15px'}} >
        <Typography variant='h3' >Create a Basket</Typography>
        <Box sx={{width:'100%',border:'1px solid #ddd', borderRadius:'8px', padding:'15px',margin:'15px 0px'}} >
        
        <Stepper activeStep={activeStep} alternativeLabel >
        {steps.map((step, i)=>(
            <Step key={i}>
                <StepLabel >{step}</StepLabel>
            </Step>
        ))}
        </Stepper>
        
        
        {
            renderStep()
        }
        

        </Box>
    </Box>
    </Box>
    </>
    )
}

export default Create;