import React from 'react';

import CourseList from './Component.tsx'
import {useGetData} from "@/hooks/fetching";
import {Loader} from "semantic-ui-react";

const ConnectedCourseList = (props) => {

    const { data, isLoading} = useGetData('/course')


    if(isLoading) return <Loader/>

    return (
        <CourseList {...props} data={data} loading={isLoading}/>
    )
}

export default ConnectedCourseList
