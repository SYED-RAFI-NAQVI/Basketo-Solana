import {Avatar, IconButton, List, ListItem, ListItemText, 
    TextField, FormControl, InputLabel, Select, MenuItem, Button, Paper, Chip, Checkbox, Snackbar, Alert, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import {Box} from '@mui/system';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const tokenList = [
    {symbol:'BTC', icon:'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=022'},
    {symbol:'ETH', icon:'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=022'},
    {symbol:'MAT', icon:'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=022'},
    {symbol:'SOL', icon:'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=022'},
    {symbol:'ARW', icon:'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=022'},
]

const TokenSelect = ({coins}) => {
    
    const [selectedCoins, setSelectedCoins] = useState({});
    const [alert, setAlert] = useState({open:false, message:'',severity:'success'});

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
            sx={{margin:'15px',borderRadius:'12px', padding:'15px',display:'grid',gap:'15px',gridTemplateColumns:'1fr 1fr 1fr 1fr'}} 
            elevation={2} >
            {
                tokenList?.map((t, i)=>(
                    //individual token card  
                    <Paper key={i}
                    sx={{padding:'15px', display:'flex', justifyContent:'center',alignItems:'center',
                        flexDirection:'column',position:'relative', border:'1px solid #ddd',
                        borderRadius:'12px', aspectRatio:'1 / 1' }} >
                        <Avatar src={t?.icon} alt={t?.symbol} />
                        <Chip label={t?.symbol} 
                              size='small' 
                               />
                        <Checkbox sx={{position:'absolute',top:'0px',right:'0px'}}
                        checkedIcon={<RemoveCircleIcon sx={{color:'error.main'}} />} 
                        icon={<AddCircleIcon sx={{color:'success.main'}} />}
                        checked={ (new Set(Object.keys(selectedCoins))).has(t?.symbol)}
                        onChange={()=>(
                            setSelectedCoins(prev=>{
                                if(Object.keys(prev).includes(t?.symbol)){
                                    delete prev[t?.symbol];
                                    return {...prev}
                                }else{
                                    prev[t?.symbol] = 0;
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
                        icon={<Avatar src={tokenList.find(e=>e.symbol===c)?.icon} alt={c}  />} />
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
        <Box>
        </Box>
    </Box>
   
    
    </>
  )
}

export default TokenSelect;