import React, {useContext} from 'react';

import UserInfo from './Component.tsx'
import {AuthContext} from "@/context/auth";
import {useGetData} from "@/hooks/fetching";

const ConnectedUserInfo = (props) => {

    const {user} = useContext(AuthContext);
    if(!user) return null;
    const { data} = useGetData(`/users/${user.sub}`)
    if(!data) return null;
    return (
        <UserInfo {...props} data={data[0]}/>
    )
}

export default ConnectedUserInfo;
