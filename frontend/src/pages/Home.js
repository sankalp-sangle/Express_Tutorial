import React from 'react';
import Navigationbar from './Navigationbar';

import HomeGrid from './home_components/HomeGrid';

function Home () {
    return (
    <div>
        <Navigationbar />
        <h1>Home</h1>
        <div style ={{display: "flex", flexWrap: "wrap", justifyContent:'center', alignItems:'center'}}>
            <div className="rectangle" 
                style = {{
                    width: '90%',
                    height: '200px',
                    background: 'gray',
                    border: '2px solid red',
                }}
            >
                <h1>Graph</h1>
            </div>
            <div className="rectangle" 
                style = {{
                    width: '90%',
                    height: '200px',
                    background: 'gray',
                    border: '2px solid red',
                    marginTop: '20px'
                }}
            >
                <h1>Calorie Tracker</h1>
            </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent:'center', alignItems:'center' }}>
            <HomeGrid />
            <HomeGrid />
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent:'center', alignItems:'center' }}>
            <HomeGrid />
            <HomeGrid />
        </div>
    </div>
    );

}

export default Home;