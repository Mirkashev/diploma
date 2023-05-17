import { Container } from 'semantic-ui-react'
import styles from './index.module.css'

export default function HomeComponent(){
  return(
    <Container as='main' className={styles.container}>
      <h1>Home page</h1>
    </Container>
  )
}