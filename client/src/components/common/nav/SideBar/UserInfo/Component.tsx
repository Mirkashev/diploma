import React from 'react';

const UserInfo = ({data}) => {

    const roles = ['Студент', 'Администратор', 'Преподаватель'];

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: '12px'
        }}>
            <span>
                {data?.lastName} {data?.firstName} {data?.surname}
            </span>
            <br/>
            <span>
                {roles[['studen', 'admin', 'teacher'].indexOf(data?.role)]}
            </span>
        </div>
    )
}

export default UserInfo
