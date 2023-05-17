import { Form, Input, Button, Container } from 'semantic-ui-react'
import styles from './index.module.css'
import Heads from '@/components/head/Сomponent'
import Nav from '@/components/nav/Сomponent'

interface authProps {
  authQuery: (e: any) => void,
  showPassword: (e: any) => void,
  isShownPass: string,
  title: string
}

export default function AuthorizationComponent({showPassword, authQuery, isShownPass, title}: authProps){

  return(
    <>
      <Heads title={title}/>
      <Container as='main' className={styles.container} >
        <Form className={styles.form} onSubmit={authQuery} action=''>
          <Form.Field 
            label='Введите логин'
            control={Input}
            type='text'
            name='login'
            required>
          </Form.Field>
          <Form.Field 
            label='Введите пароль'
            action={{icon: 'eye', onClick: showPassword}}
            control={Input}
            type={isShownPass}
            name='password'
            required>
          </Form.Field>
          <Container textAlign='center'>
            <Button className={styles.button} >Войти</Button>
          </Container>
        </Form>
      </Container>
    </>
  )
}