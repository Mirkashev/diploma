import { Menu } from "semantic-ui-react";

export default function MenuTopics ({pathname, handlePage}: any){
  return (
    <Menu fluid vertical tabular>
      <Menu.Item
        name='Теория'
        type='theory'
        active={!!pathname?.match('theory')}
        onClick={handlePage}
      />
      <Menu.Item
        name='Тесты'
        type='tests'
        active={!!pathname?.match('tests')}
        onClick={handlePage}
      />
      <Menu.Item
        name='Практика'
        type='exercises'
        active={!!pathname?.match('exercises')}
        onClick={handlePage}
      />
    </Menu>
  )
}