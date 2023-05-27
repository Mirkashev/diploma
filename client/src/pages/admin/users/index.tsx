import { Button, Container, Table } from 'semantic-ui-react'
import Page from '@/layouts/page'
import SideNav from '@/components/common/nav/left-side'
import AddUserModal from '@/components/common/modal/user/'
import { useGetData } from '@/hooks/fetching'
import UsersTable from '@/components/common/table/users'

export default function UsersPage(){

  const { data, isLoading, isError } = useGetData('/users/');

  if(isLoading) return <div>...Loading</div>

  if(isError) return <div>There is some error, try to update page</div>

  return (
    <Page title={'Редактировать пользователей'} isAdmin={true}>
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
          <AddUserModal
            method='POST'
            route='/users/'
          />
          <UsersTable
            array={data}
            route='/users/'
          />
        </SideNav>
      </Container>
    </Page>

  )
}