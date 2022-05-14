import {Avatar, IconButton, List, ListItem, ListItemText, 
    TextField, FormControl, InputLabel, Select, MenuItem, Button, Paper, Chip, Checkbox, Snackbar, Alert, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import {Box} from '@mui/system';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';
import RatioChart from './RatioChart.js';

const TokenSelect = ({coins}) => {
    
    const [selectedCoins, setSelectedCoins] = useState({});
    const [alert, setAlert] = useState({open:false, message:'',severity:'success'});
    const [coinList, setCoinList] = useState([]);

    useEffect(() => {
        const fetchCoinList = async()=>{
            const data = await axios.get('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD')
            setCoinList(data.data?.Data);
        }
        try {
            fetchCoinList();
        } catch (error) { console.log(error); }
    }, []);
    

  return (
    <>
    <Snackbar onClose={()=>(setAlert(prev=>({...prev, open:false})))}
    open={alert.open}
    autoHideDuration={6000}
    anchorOrigin={{vertical:'bottom', horizontal:'center'}}
    >
        <Alert  severity={alert?.severity} 
        sx={{ width: '100%' }}>
        {alert?.message}
        </Alert>
    </Snackbar>
    {/* grid  */}
    <Box sx={{display:'grid', gridTemplateColumns:'1fr 1fr'}} >
        {/* form at left */}
        <Box sx={{width:'100%'}} >

            {/* picking coins*/}
            <Paper 
            sx={{margin:'15px',borderRadius:'12px', padding:'15px',display:'grid',
                gap:'15px',gridTemplateColumns:'1fr 1fr 1fr 1fr',maxHeight:'350px',overflowY:'scroll'}} 
            elevation={2} >
            {
                coinList?.map((coin, i)=>(
                    //individual coin card  
                    <Paper key={i}
                    sx={{padding:'15px', display:'flex', justifyContent:'center',alignItems:'center',
                        flexDirection:'column',position:'relative', 
                        border:`2px solid ${(new Set(Object.keys(selectedCoins))).has(coin?.CoinInfo?.Name) ? 'green':'#ddd'}`,
                        borderRadius:'12px',maxWidth:'100px' }} >
                        <Avatar src={`https://www.cryptocompare.com/${coin?.CoinInfo?.ImageUrl}`} 
                        alt={coin?.CoinInfo?.FullName} 
                        sx={{width:'50px',height:'50px'}}
                        />
                        <Chip label={coin?.CoinInfo?.Name} 
                              size='small' 
                        />
                        <Checkbox sx={{position:'absolute',top:'0px',right:'0px'}}
                        checkedIcon={<RemoveCircleIcon sx={{color:'error.main'}} />} 
                        icon={<AddCircleIcon sx={{color:'success.main'}} />}
                        checked={ (new Set(Object.keys(selectedCoins))).has(coin?.CoinInfo?.Name)}
                        onChange={()=>(
                            setSelectedCoins(prev=>{
                                if(Object.keys(prev).includes(coin?.CoinInfo?.Name)){
                                    delete prev[coin?.CoinInfo?.Name];
                                    return {...prev}
                                }else{
                                    prev[coin?.CoinInfo?.Name] = 0;
                                    return {...prev};
                                }
                            })
                        )}
                        />
                    </Paper>
                ))
            }
            </Paper>

            {/* list of selected tokens and ratio input  */}

            { Object.keys(selectedCoins).length>0 && <Paper sx={{margin:'15px',borderRadius:'12px'}} >
            <List>
            {
                Object.keys(selectedCoins).map((c, i)=>(
                    <ListItem key={i} sx={{display:'flex', justifyContent:'space-between'}}  >
                        <Chip sx={{backgroundColor:'inherit'}}
                        label={c} 
                        icon={
                        <Avatar src={`https://www.cryptocompare.com/${coinList.find(e=>e?.CoinInfo?.Name===c)?.CoinInfo.ImageUrl}`} 
                        alt={c}/>} 
                        />
                        <Box>
                        <TextField value={selectedCoins[c]} sx={{minWidth:'90px'}}
                        label='Percentage' size='small' type='number'
                        InputProps={{ inputProps: { min: 0, max: 100 - Object.values(selectedCoins).reduce((a, b) => a + b, 0) } }}
                        onChange={(e)=>(
                            setSelectedCoins(prev=>{
                                if( Number(e.target.value) <= 100-(Object.values(selectedCoins).reduce((a, b) => a + b, 0)-selectedCoins[c])){
                                    prev[c] = Number(e.target.value);setAlert(prev=>({...prev, open:false}));
                                }
                                else setAlert({open:true,message:'Sum of Percentages exceeds 100.', severity:'error'});
                                return {...prev};
                            }))}
                        />
                        <IconButton onClick={()=>(
                            setSelectedCoins(prev=>{
                                delete prev[c];
                                return {...prev}
                            })
                        )} >
                            <RemoveCircleIcon sx={{color:'error.main'}} />
                        </IconButton>
                        </Box>
                    </ListItem>
                ))
            }
            </List>
            </Paper>}

            {/* Next button  */}
            <Button fullWidth variant='contained' 
            disabled={Object.keys(selectedCoins)===0 || Object.values(selectedCoins).reduce((a, b) => a + b, 0)<100} >
                Next
            </Button>
            {Object.keys(selectedCoins).length===0 ?
            <Typography variant='caption' sx={{color:'error.main'}} >Select atleast One Coin to continue.</Typography>
            :
            Object.values(selectedCoins).reduce((a, b) => a + b, 0)!==100 &&
            <Typography variant='caption' sx={{color:'error.main'}} >Sum of Percentages must equal 100</Typography>
            }
        </Box>

        {/* Graphs at right  */}
        <Box sx={{display:'flex',justifyContent:'center'}} >
            <RatioChart data={selectedCoins} />
        </Box>
    </Box>
   
    
    </>
  )
}

export default TokenSelect;