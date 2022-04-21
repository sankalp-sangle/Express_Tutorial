import React, {useEffect, useState} from 'react';
import Navigationbar from './Navigationbar';
import HomeGrid from './home_components/HomeGrid';
import ExerciseGrid from './home_components/ExerciseGrid';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import Card from 'react-bootstrap/Card';
import { IoIosAddCircleOutline } from "react-icons/io";
import {BsArrowLeftCircle, BsArrowRightCircle} from "react-icons/bs";

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

function Home () {
    const user_id = useLocation().state.id;
    console.log(user_id)
    const dispatch = useDispatch();

    const forceUpdate = useForceUpdate();
    
    let newDate = new Date()
    let date = newDate.getDate().toString();
    let month = (newDate.getMonth() + 1).toString();
    let year = newDate.getFullYear().toString();

    const [curr_date, setCurrDate] = useState(month + "-" + year + "-" + date);
    const [food_list, setFoodList] = useState("");
    const [isLoading, setLoading] = useState(true);

    const request_body = {
        "user_id": user_id,
        "date": new Date().toISOString().slice(0,10) // Date should be in YYYY-MM-DD format
    }

    let retrieveFoods = () => {
        console.log(request_body)
        axios.get('http://localhost:4000/api/meal', {params:request_body})
        .then(response => {
            console.log(response.data);
            let f_list = response.data.map((item) => {
                let temp = {
                    id: item._id,
                    meal_name: item.meal_name,
                    calories: item.calories,
                    ingredients: item.ingr
                }
                return temp;
            })
            console.log(f_list);
            setFoodList(f_list);
            setLoading(false);
        })
        .catch(error => {
            console.log(error);
        });
    }

    function handleChange(id) {
        let newList = food_list.filter((item) => item.id != id);
        retrieveFoods();
    }

    useEffect(() => {
        retrieveFoods();
    }, [""]);

    if (isLoading) {
        return (
        <div >
            <Navigationbar id={user_id}/>
            Loading...
        </div>
        );
    }
    
    return (
    <div>
        <Navigationbar id={user_id}/>
        <div style ={{display: "flex", flexWrap: "wrap", justifyContent:'center', alignItems:'center'}} >
            <h1>{month + "/" + date + "/" + year}</h1>
        </div>
        <div style ={{display: "flex", flexWrap: "wrap", justifyContent:'center', alignItems:'center'}}>
            <BsArrowLeftCircle size={25}/>
            <Card style={{ width: '20rem', 
                            marginLeft: '20px',
                            marginRight: '20px',
                            marginTop: '20px',
                            marginBottom: '20px',
                        }}>
                <Card.Header>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        Blood Pressure
                        <IoIosAddCircleOutline size={25}/>
                    </div>
                </Card.Header>
                <Card.Body>
                    Blood Pressure
                </Card.Body>
            </Card>

            <Card style={{ width: '20rem', 
                            marginLeft: '20px',
                            marginRight: '20px',
                            marginTop: '20px',
                            marginBottom: '20px',
                        }}>
                <Card.Header>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        Total Calories
                        <IoIosAddCircleOutline size={25}/>
                    </div>
                </Card.Header>
                <Card.Body>
                    Some number
                </Card.Body>
            </Card>
            <BsArrowRightCircle size={25}/>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent:'center', alignItems:'center' }}>
            <HomeGrid name={"Breakfast"} user_id={user_id} food_list={food_list} onChange={handleChange}/>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent:'center', alignItems:'center' }}>
            <ExerciseGrid />
        </div>
    </div>
    );

}

export default Home;