import { Container } from 'semantic-ui-react'
import Page from '@/layouts/page'
import SideNav from '@/components/common/nav/left-side'

export default function UsersPage(){
  return (
    <Page title={'Редактировать преподавателей'} isAdmin={true}>
      <Container as='main' style={{
        flexGrow: 1,
        maxWidth: '720px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: '72px',
        position: 'relative'
      }} >
        <SideNav pageType='adminUsers'>
          <div>список преподавателей</div>
        </SideNav>
      </Container>
    </Page>

  )
}