import { AuthContext } from '@/context/auth';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { Button, Container, Dropdown, Icon } from 'semantic-ui-react'

export default function NavTop2({ children }: any){
  const router = useRouter();
  const [title, setTitle]:any = useState('Тема');
  

  // const { user }:any = useContext(AuthContext);

  useEffect(()=>{
    setTitle(localStorage.getItem('title'));
  }, [])

  return(
    <>

    <nav style={{
      width:'100%', 
      display:"flex", 
      alignItems:'center', 
      height:'60px',
      background: '#fff',
      marginTop: '60px'
    }}>
      <Container style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px'}}>
        <Link href={router.isReady && router.pathname.match('/admin') ? '/admin/topics' : '/user/topics'}>К выбору тем</Link>
        <h1 style={{margin:0}}>{title}</h1>
        <div></div>
      </Container>
    </nav>
    </>

  )
}