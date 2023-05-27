import { useRouter } from 'next/router';
import {  Menu } from 'semantic-ui-react'

export default function NavTop3({ children, title }: any){
  const router = useRouter();
  return(
  <Menu attached='top' style={{marginBottom:'12px', marginTop:'0px'}}>
    <Menu.Item
    onClick={()=> router.back()}
    >назад</Menu.Item>
    <Menu.Item position='left' header>{title || 'Загрузка...'}</Menu.Item>
    {children}
  </Menu>
  )
}