import React, {useContext} from 'react';
import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react';
import {AuthContext} from "@/context/auth";
import UserInfo from "@/components/common/nav/SideBar/UserInfo";
import {useRouter} from "next/router";

const SideBar = ({children}) => {

    const router = useRouter();

    const {user} = useContext(AuthContext);

    const onRoute = (path) => {
        router.push(path)
    }

    return (
        <div style={{display: 'flex'}}>
            <div style={{
                height: '100vh',
                padding: '16px'
            }}>
                <div style={{
                    padding: '10px',
                    marginTop: '24px',
                    display: 'flex',
                    justifyContent: 'center',

                }}>
                    <Icon
                        name={['student', 'lab', 'settings'][['student', 'teacher', 'admin'].indexOf(user?.role)]}
                        size={'huge'}
                    />
                </div>
                <div>
                    <UserInfo/>
                </div>
                <Menu vertical>
                    {/* Student Items */}
                    {
                        user?.role === 'student' ?
                            (
                                <>
                                    <Menu.Item>
                                        Дэшборд
                                    </Menu.Item>
                                    <Menu.Item>
                                        Статистика
                                    </Menu.Item>
                                </>
                            ) : undefined
                    }

                    {/* Teachers Items */}
                    {
                        user?.role === 'teacher' ?
                            (
                                <>
                                    <Menu.Item onClick={() => onRoute('/teacher/users')}>
                                        Редактировать пользователей
                                    </Menu.Item>
                                    <Menu.Item onClick={() => onRoute('/teacher/stats')}>
                                        Статистика
                                    </Menu.Item>
                                </>
                            ) : undefined
                    }
                    {/* Admins Only Items */}
                    {user?.role === 'admin' ? (
                        <>
                            <Menu.Item onClick={() => onRoute('/admin/users')}>
                                Список пользователей
                            </Menu.Item>
                            <Menu.Item onClick={() => onRoute('/admin/topics')}>
                                Редактировать темы
                            </Menu.Item>
                            <Menu.Item onClick={() => onRoute('/admin/stats')}>
                            Статистика
                            </Menu.Item>
                        </>
                    ) : undefined}
                    <Menu.Item>
                        Выход
                    </Menu.Item>
                </Menu>
            </div>
            <div>
                {children}
            </div>
        </div>

    )
}

export default SideBar
