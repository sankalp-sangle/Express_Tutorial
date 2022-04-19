import React from 'react';
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
            food_list: [
                {
                    id: "1",
                    name: "food1",
                    calories: 10,
                    ingredients: "the souls of my enemies"
                },
                {
                    id: "2",
                    name: "food2",
                    calories: 10,
                    ingredients: "zebras"
                }
            ],
            showPopup: false,
            food_name: "",
            calories: "",
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
                            <Form.Label>Calories</Form.Label>
                            <Form.Control 
                                placeholder="Number of calories" 
                                value={this.state.calories}
                                onChange={(e) => this.setState({calories: e.target.value})}
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
                                            <FoodItem key={item.id} item={item} />
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

        //section gets new id
        //replace this section with what is retrieved from the api
        let len = this.state.food_list.length;
        let new_id = (len == 0 ? 1 : parseInt(this.state.food_list[len-1].id) + 1)
        console.log("This is on add" + new_id)
        // end section here

        //create new temp structure for food
        let temp = [{
            id: new_id+"",
            name: this.state.food_name,
            calories: this.state.calories,
            ingredients: this.state.ingredients
        }]

        //Set items in component
        this.setState({
            food_list: this.state.food_list.concat(temp),
            food_name: "",
            calories: "",
            ingredients: "",
            showPopup: false
        })
    }
    
    _onRemoveClick(id) {
        console.log(id);
        //TODO: Also remove item from backend

        //Filter out list and remove item from current storage
        let newList = this.state.food_list.filter((item) => item.id != id);

        //Set new state for list
        this.setState({
            food_list: newList
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