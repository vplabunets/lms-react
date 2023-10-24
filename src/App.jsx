import React from 'react';
import { Route, Routes } from 'react-router';
import { PublicRoute } from './routes/PublicRoute';
import { RegisterPage } from './pages/RegisterPage';
import { PrivateRoute } from './routes/PrivateRoute';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Dashboard } from './components/Dashboard';
import { Layout } from './components/Layout/Layout';
import { TechnicalArticles } from './components/TechnicalArticles';
import { Lessons } from './components/Lessons';
import { Homeworks } from './components/Homeworks';
import { TechnicalArticle } from './components/TechnicalArticle/TechnicalArticle';
import { Lesson } from './components/Lesson';
import { Homework } from './components/Homework';

function App() {
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <PublicRoute
                            redirectTo="/dashboard"
                            component={LoginPage}
                        />
                    }
                />

                <Route
                    path="/register"
                    element={
                        <PublicRoute
                            redirectTo="/dashboard"
                            component={RegisterPage}
                        />
                    }
                />

                <Route element={<Layout />}>
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute
                                component={Dashboard}
                                redirectTo="/"
                            />
                        }
                    />
                    <Route
                        path="/js/lessons"
                        element={
                            <PrivateRoute component={Lessons} redirectTo="/" />
                        }
                    />
                    <Route
                        path="/:course/lessons/:number"
                        element={
                            <PrivateRoute component={Lesson} redirectTo="/" />
                        }
                    />
                    <Route
                        path="/js/homeworks"
                        element={
                            <PrivateRoute
                                component={Homeworks}
                                redirectTo="/"
                            />
                        }
                    />
                    <Route
                        path="/react/lessons"
                        element={
                            <PrivateRoute component={Lessons} redirectTo="/" />
                        }
                    />
                    <Route
                        path="/react/homeworks"
                        element={
                            <PrivateRoute
                                component={Homeworks}
                                redirectTo="/"
                            />
                        }
                    />
                    <Route
                        path="/:course/homeworks/:number"
                        element={
                            <PrivateRoute component={Homework} redirectTo="/" />
                        }
                    />
                    <Route
                        path="/technical-articles"
                        element={
                            <PrivateRoute
                                component={TechnicalArticles}
                                redirectTo="/"
                            />
                        }
                    />
                    <Route
                        path="/technical-articles/:category/:title"
                        element={
                            <PrivateRoute
                                component={TechnicalArticle}
                                redirectTo="/"
                            />
                        }
                    />
                </Route>

                <Route path="/*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
}

export default App;
