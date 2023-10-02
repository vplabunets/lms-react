import React from "react";
import {Outlet} from "react-router";
import {DrawerEl} from "./DrawerEl/DrawerEl";
import {selectUser} from '../redux/auth/authSelectors';
import {useSelector} from "react-redux";

export const Layout = () => {
    const user = useSelector(selectUser)
    console.log(user)
    return (
        <div>
            <DrawerEl user={user}/>
            <Outlet/>
        </div>
    )


}
