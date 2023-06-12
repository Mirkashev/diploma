import React from 'react';
import {Container, Header} from "semantic-ui-react";
import CourseList from "@/components/CourseList";

const DashboardView = ({}) => {
    return (
        <Container
            as="main"
            style={{
                flexGrow: 1,
                maxWidth: "720px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginTop: "72px",
                position: "relative",
            }}
        >
            <CourseList/>
        </Container>
    )
}

export default DashboardView
