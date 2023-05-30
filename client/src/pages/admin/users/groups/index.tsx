import { Container } from 'semantic-ui-react'
import Page from '@/layouts/page'
import SideNav from '@/components/common/nav/left-side'
import AddGroupModal from '@/components/common/modal'
import TableComponent from '@/components/common/table'
import { useGetData } from '@/hooks/fetching'


export default function UsersGroupPage(){
  const { data, isLoading, isError } = useGetData('/groups/');

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
          <AddGroupModal
            method='POST'
            route='/groups/'
          />
          <TableComponent
            array={data}
            pathname='/admin/users/groups/'
            route='/groups/'
            mutateRoute='/groups/'
          />
        </SideNav>
      </Container>
    </Page>

  )
}