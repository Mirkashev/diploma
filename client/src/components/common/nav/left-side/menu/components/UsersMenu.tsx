import { Menu } from "semantic-ui-react";

export default function MenuUsers ({pathname, handlePage}: any){
  return (
    <Menu fluid vertical tabular>
      <Menu.Item
        name='Пользователи'
        type=''
        active={!pathname?.match('/users/')}
        onClick={handlePage}
      />
      {/* <Menu.Item
        name='Студенты'
        type='students'
        active={!!pathname?.match('students')}
        onClick={handlePage}
      />
      <Menu.Item
        name='Преподаватели'
        type='teachers'
        active={!!pathname?.match('teachers')}
        onClick={handlePage}
      /> */}
      <Menu.Item
        name='Группы'
        type='groups'
        active={!!pathname?.match('groups')}
        onClick={handlePage}
      />
    </Menu>
  )
}