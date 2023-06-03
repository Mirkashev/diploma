import { ChapterTestsInterface } from "../../interfaces";
import { Table } from "semantic-ui-react";
import Link from "next/link";
import NavTop2 from "@/components/common/nav/top-layer2/Сomponent";
import SideNav from "@/components/common/nav/left-side";

export default function UserTestComponent({
  tests,
  themeId,
  title
}: ChapterTestsInterface) {
  
  return(
    <>
      <NavTop2 title={title}/>
      <SideNav>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Название теста</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
            <Table.Body>
            {tests?.map((el, i) => 
              <Table.Row key={i + Math.random()}>
                <Table.Cell 
                  style={{padding:0}}
                  >
                  <Link 
                    style={{
                      width:'100%',
                      display:'block',
                      padding:'10px'
                    }} 
                    href={{pathname: `/user/topics/${themeId}/tests/${el.id}`}}>
                    Начать тест: {el.title}
                  </Link> 
                </Table.Cell>
              </Table.Row>)}
          </Table.Body>
        </Table>
      </SideNav>
    </>

  )
}