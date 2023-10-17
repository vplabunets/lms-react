import React from 'react';
import { useLocation } from 'react-router-dom';

export const Lessons = () => {
    // const [course, setCourse] = useState('js');
    let { pathname } = useLocation();

    // setCourse(() => {});

    const js = pathname.includes('js');
    const react = pathname.includes('react');

    return (
        <>
            {js && 'JS'}
            {react && 'REACT'}
        </>
    );
};
