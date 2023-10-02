import React from "react";
import './App.css';
import {Route, Routes} from "react-router";
import {Layout} from "./components/Layout";
import {PublicRoute} from "./components/PublicRoute";
import {RegisterPage} from "./pages/RegisterPage";
import {PrivateRoute} from "./components/PrivateRoute";
import {Lessons} from "./pages/Lessons";
import {LoginPage} from "./pages/LoginPage";
import {NotFoundPage} from "./pages/NotFoundPage";

function App() {
    return <>
        <Routes>
            <Route index element={<LoginPage/>}/>
            <Route
                path="/register"
                element={
                    <PublicRoute component={RegisterPage} redirectTo="/lessons"/>
                }
            />
            <Route
                path="/login"
                element={
                    <PublicRoute component={LoginPage} redirectTo="/lessons"/>
                }
            />
            <Route path="/" element={<Layout/>}>

                <Route
                    path="/lessons"
                    element={
                        <PrivateRoute component={Lessons} redirectTo="/lessons"/>
                    }
                />
            </Route>
            <Route path="/*" element={<NotFoundPage/>}/>
        </Routes>
    </>;
}

export default App;
// <Routes>
//     <Route path="/" element={<Layout/>}>
//         <Route index element={<HomePage/>}/>
//         <Route
//             path="/register"
//             element={
//                 <RestrictedRoute component={RegisterPage} redirectTo="/contacts"/>
//             }
//         />
//         <Route
//             path="/login"
//             element={
//                 <RestrictedRoute component={LoginPage} redirectTo="/contacts"/>
//             }
//         />
//         <Route
//             path="/contacts"
//             element={
//                 <PrivateRoute component={ContactsPage} redirectTo="/login"/>
//             }
//         />
//     </Route>
// </Routes>