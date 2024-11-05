import React from 'react';

import Banner from '../user/Banner';
import Content from '../user/Content';
import '../../App.css';
import '../../Base.css';
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
