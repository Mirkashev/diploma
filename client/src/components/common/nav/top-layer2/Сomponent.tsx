import { AuthContext } from '@/context/auth';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { Button, Container, Dropdown, Icon, Menu } from 'semantic-ui-react'

export default function NavTop2({ title, activeButton }: any){
  const router = useRouter();

  return(
    <>
    <nav style={{
      width:'100%', 
      display:"flex", 
      alignItems:'center', 
      height:'60px',
      background: '#fff',
      marginTop: '70px',
      marginBottom: '10px'
    }}>
      <Container style={{
          display:'flex', 
          alignItems:'center', 
          justifyContent:'space-between', 
          padding:'10px', 
          background:'rgb(213 213 213)', 
          // border:'1px solid #000',
          borderRadius:'4px',
          }}>
        <Button 
          onClick={()=> router.push(router.isReady && router.pathname.match('/admin') ? '/admin/topics' : '/user/topics')}
          style={{background:'rgba(255,255,255,.85)', color:'#000'}}
          >К выбору тем</Button>
        <h1 style={{margin:0, color:'#000'}}>{title || 'Загрузка...'}</h1>
        {activeButton ? activeButton : <div></div>}
      </Container>
    </nav>
    </>

  )
}