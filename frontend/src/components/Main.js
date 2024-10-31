import React from 'react';

import Banner from '../components/Banner';
import Content from '../components/Content';
import '../App.css';
import '../Base.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Main() {
    return (
        <div className="Main">
            <Banner />
            <Content />
        </div>
    );
}

export default Main;
