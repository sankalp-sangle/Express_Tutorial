import React from 'react';

import axios from 'axios';

import FoodItem from './FoodItem';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { IoIosAddCircleOutline } from "react-icons/io";

class HomeGrid extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            time_of_day: this.props.name,
            food_list: this.props.food_list,
            showPopup: false,
            food_name: "",
            ingredients: "",
        };

        this._onAddClick = this._onAddClick.bind(this);
        this._onPlusClick = this._onPlusClick.bind(this);
        this._onCloseClick = this._onCloseClick.bind(this);
        this._onRemoveClick = this._onRemoveClick.bind(this);
    }

    render () {
        return (
            <div>
                <Modal
                    show={this.state.showPopup}
                    onHide={this._onCloseClick}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group controlId="formFoodName">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                placeholder="Food Title" 
                                value={this.state.food_name}
                                onChange={(e) => this.setState({food_name: e.target.value})}
                            />
                        </Form.Group>

                        <Form.Group controlId="formFoodName">
                            <Form.Label>Ingredient list </Form.Label>
                            <Form.Control 
                                placeholder="1 apple, 2 bananas, 3 coconuts" 
                                value={this.state.ingredients}
                                onChange={(e) => this.setState({ingredients: e.target.value})}
                            />
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this._onCloseClick}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this._onAddClick}>Add</Button>
                    </Modal.Footer>
                </Modal>

                <Card style={{ width: '35rem', 
                               marginLeft: '20px',
                               marginRight: '20px',
                               marginTop: '20px',
                               marginBottom: '20px',
                            }}>
                    <Card.Header>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            {this.props.name}
                            <IoIosAddCircleOutline size={25} onClick={this._onPlusClick}/>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <ListGroup variant="flush"> 
                            {
                                this.state.food_list.map((item) => {
                                    return (
                                        <ListGroup.Item>
                                            <FoodItem key={item._id} item={item} />
                                            <Button variant="secondary" onClick={() => this._onRemoveClick(item.id)}>
                                                Remove
                                            </Button>
                                        </ListGroup.Item>
                                    )
                                })
                            }
                        </ListGroup>
                    </Card.Body>
                </Card>
            </div>
        );
    }

    _onAddClick() {
        //TODO: add item to backend and retrieve back calories and meal id 
        const request_body = {
            "user_id": this.props.user_id,
            "title": this.state.food_name,
            "time_of_day": "morning",
            "ingr": this.state.ingredients
        }

        axios.post('http://localhost:4000/api/meal', request_body)
            .then(response => {
                console.log(response.data);
                if(response.data) {
                    let item = response.data;
                    alert("Meal added!");
                    //create new temp structure for food
                    let temp = [{
                        id: item._id,
                        meal_name: item.meal_name,
                        calories: item.calories,
                        ingredients: item.ingr
                    }]
                    
                    //Set items in component
                    this.setState({
                        food_list: this.state.food_list.concat(temp),
                        food_name: "",
                        ingredients: "",
                        showPopup: false
                    })
                }
                else {
                    alert("Something went wrong with adding the meal");
                }
            })
            .catch(error => {
                console.log(error);
        });
    }
    
    _onRemoveClick(id) {
        console.log("Remove this food item" + id);
        //TODO: Also remove item from backend
        const request_body = {meal_id: id};

        //Filter out list and remove item from current storage
        axios.delete('http://localhost:4000/api/meal', {data:request_body})
            .then(response => {
                if(response.data) {
                    let item = response.data;
                    console.log(item)
                    alert("Meal removed!");

                    let newList = this.state.food_list.filter((item) => item.id != id);

                    //Set new state for list
                    this.setState({
                        food_list: newList
                    });
                    
                    this.props.onChange(item.id);
                }
                else {
                    alert("Something went wrong with removing");
                }
            })
            .catch(error => {
                console.log(error);
        });
    }

    _onCloseClick() {
        //Set state to show the modal window
        this.setState({
            showPopup: false
        });
    }

    _onPlusClick() {
        this.setState({
            showPopup: true
        });
    }


}

export default HomeGrid;