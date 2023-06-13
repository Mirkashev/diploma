import React from "react";
import { Card, Grid, Header } from "semantic-ui-react";
import CourseCard from "@/components/CourseList/CourseCard";

const CourseList = ({ data }: any) => {
  return (
    <>
      <Header size={"huge"}>
        <Header.Content>Доступные курсы</Header.Content>
      </Header>
      <Grid style={{ width: "100%" }}>
        <Grid.Row style={{ width: "100%" }}>
          <Card.Group>
            {data.map((course: any, i: number) =>
              i == 0 ? (
                <>
                  <CourseCard {...course} />
                </>
              ) : undefined
            )}
          </Card.Group>
        </Grid.Row>
      </Grid>

      {/*{JSON.stringify(loading)}*/}
    </>
  );
};

export default CourseList;
