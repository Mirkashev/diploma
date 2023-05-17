import { Form, Input, Button, Container } from 'semantic-ui-react'
import styles from './index.module.css'

export default function AdminStatsComponent(){

  return(
    <>
      <Container as='main' className={styles.container} >
        <h1>Admin Stats</h1>
      </Container>
    </>
  )
}