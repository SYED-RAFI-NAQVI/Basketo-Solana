import { AppBar, Container, Toolbar, Typography, IconButton, Menu, Button } from "@mui/material"
import {Box} from '@mui/system';
import Link from 'next/link';
import {useRouter} from 'next/router';

const Navbar = () => {
  const router = useRouter();

  const menuItems = [
    router.pathname!=='/create' && {link:'/create',name:'Create'},
    router.pathname!=='/learn' && {link:'/learn',name:'Learn'},
    router.pathname!=='/' && {link:'/',name:'Explore'},
  ].filter(Boolean)

  return (
    <>
    <AppBar position="fixed" sx={{backgroundColor:'#fff', borderBottom:'1px solid #eee'}} elevation={0} >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{display:'grid', gridTemplateColumns:'2fr 3fr 2fr',justifyItems:'center'}} >
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/" 
                sx={{color:'#000000'}}
            >
                Basketo
            </Typography>
            <Toolbar sx={{display:'flex',justifyContent: 'center'}} >
                {menuItems.map((item, key)=>(
                    <Link key={key} href={item.link}  >
                    <Button 
                    sx={{color:'#313131', textTransform:'none', cursor:'pointer'}} 
                     >
                        {item.name}
                    </Button>
                    </Link>
                ))}
            </Toolbar>
            
            <Toolbar>
                    <Button variant='text' sx={{margin:'10px'}} >Sign In</Button>
                    <Button variant='contained' sx={{margin:'10px'}} >Get Started</Button>
            </Toolbar>
          

        </Toolbar>
      </Container>
    </AppBar>
    </>
  )
}

export default Navbar