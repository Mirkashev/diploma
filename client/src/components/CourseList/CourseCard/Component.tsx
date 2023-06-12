import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'
import styles from './index.module.css';
import {useRouter} from "next/router";

const CourseCard = ({name, description, author, id}) => {

    const router = useRouter();

    const onClick = () => {
        router.push('/user/topics')
    }

    return (
        <Card className={styles.card} onClick={onClick}>
            <Image src='https://cdn-icons-png.flaticon.com/512/167/167756.png' wrapped ui={false} />
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Meta>
                    <span className='date'>2022-2023</span>
                </Card.Meta>
                <Card.Description>
                    {description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a>
                    <Icon name='user' />
                    {author}
                </a>
            </Card.Content>
        </Card>
    )
}

export default CourseCard
