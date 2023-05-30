import { Table } from "semantic-ui-react";
import { ChapterExercisesInterface } from "../../interfaces";
import Link from "next/link";

export default function UserExComponent({ exercises, themeId, pathname}: ChapterExercisesInterface) {
  return(
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Название</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
        <Table.Body>
        {exercises?.map((el, i) => 
          <Table.Row key={i + Math.random()}>
            <Table.Cell>
              <Link href={{pathname: pathname + '/' + el?.id}} >
                Начать упражнение: {el.title}
              </Link> 
            </Table.Cell>
          </Table.Row>)}
      </Table.Body>
    </Table>
  )
}