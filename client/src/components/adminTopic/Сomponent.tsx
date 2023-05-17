import { Form, Input, Button, Container, Icon, Menu, Segment, Grid, Item } from 'semantic-ui-react'
import styles from './index.module.css'
import  Table  from  '@/components/common/table'
import ChapterTheory from './chapterTheory/index'
import ChapterTest from './chapterTest/index'
import { AdminThemeInterface } from './interfaces';



export default function AdminThemesComponent({ theme, chapter, handleChapter, editorLoaded }: AdminThemeInterface){

  return(
    <Container as='main' className={styles.container} >
      <h1>{theme?.title}</h1>
      <Grid style={{width:'100%'}}>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item
              name='Теория'
              type='theory'
              active={chapter === 'theory'}
              onClick={(e, { type })=> handleChapter(type)}
            />
            <Menu.Item
              name='Тесты'
              type='tests'
              active={chapter === 'tests'}
              onClick={(e, { type })=> handleChapter(type)}
            />
            <Menu.Item
              name='Практика'
              type='practise'
              active={chapter === 'practise'}
              onClick={(e, { type })=> handleChapter(type)}
            />
          </Menu>
        </Grid.Column>
        <Grid.Column width={12}>
          {chapter === 'theory' ? 
          <ChapterTheory
            theme={theme}
            editorLoaded={editorLoaded}
          />
          : chapter === 'tests' ? 
          <ChapterTest
            theme={theme}
          />
          :
          <Segment>
            <h2>Practise</h2>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus doloremque velit incidunt recusandae maxime eligendi numquam rem iste minima repellendus expedita dolorem ratione tenetur ducimus ipsum, aperiam libero nam fugiat?
            This is an stretched grid column. This segment will always match the
            tab height
          </Segment> }
        </Grid.Column>
      </Grid>
    </Container>
  )
}