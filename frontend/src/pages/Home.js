import React, {useState} from 'react';
import Navigationbar from './Navigationbar';

import HomeGrid from './home_components/HomeGrid';
import ExerciseGrid from './home_components/ExerciseGrid';
import { useDispatch, useSelector } from 'react-redux';

function Home () {
    //const user_id = useSelector(state => state.id);
    //const dispatch = useDispatch();
    //console.log(user_id);

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
                <h1>Blood Pressure</h1>
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
            <HomeGrid name={"Breakfast"}/>
            <HomeGrid name={"Lunch"}/>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent:'center', alignItems:'center' }}>
            <HomeGrid name={"Dinner"}/>
            <ExerciseGrid />
        </div>
    </div>
    );

}

export default Home;