import { AuthContext } from '@/context/auth';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Container, Dropdown, Icon } from 'semantic-ui-react'

export default function Nav({ buttons }: any){
  const { logout }:any = useContext(AuthContext);
  const router = useRouter();

  return(
  <header style={{zIndex:2}}>
    <nav style={{
      width:'100%', 
      display:"flex", 
      alignItems:'center', 
      position:'fixed', 
      borderBottom:'1px solid rgb(199 199 199)',
      height:'60px',
      background: '#fff'
    }}>
      <Container style={{display:'flex', justifyContent:'space-between'}}>
        <Link href='/'><b style={{color:'#000'}}>Education-service</b></Link>
        <Dropdown icon={<Icon name='content' />}>
          <Dropdown.Menu style={{left:'-150%'}}>
            {buttons.map((el: {title: string, href: string}, ind: number) => <Dropdown.Item 
                key={'nav-menu-item: ' + ind}
                onClick={()=> {
                  if(router.isReady) router.push(el.href);
                }}
              >
                {el.title}
              </Dropdown.Item>)}
            <Dropdown.Divider />
            <Dropdown.Item>
              <Link href='/auth' onClick={()=>logout()}>Выйти из системы</Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </nav>
  </header>
  )
}