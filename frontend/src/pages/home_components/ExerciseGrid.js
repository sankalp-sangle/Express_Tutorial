import React from 'react';
import ExerciseItem from './ExerciseItem';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { IoIosAddCircleOutline } from "react-icons/io";

class ExerciseGrid extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            exercise_list: [
                {
                    name: "stairmasters",
                    duration: "10 minutes"
                }
            ],
            showForum: false,
        };

        this._onAddClick = this._onAddClick.bind(this);
        this._onPlusClick = this._onPlusClick.bind(this);
        this._onCloseClick = this._onCloseClick.bind(this);
    }

    render () {
        return (
            <div>
                <Modal
                    show={this.state.showForum}
                    onHide={this._onCloseClick}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group controlId="formExerciseName">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                placeholder="Exercise Name" 
                                value={this.state.exercise_name}
                                onChange={(e) => this.setState({exercise_name: e.target.value})}
                            />
                        </Form.Group>

                        <Form.Group controlId="formExerciseName">
                            <Form.Label>Duration</Form.Label>
                            <Form.Control 
                                placeholder="Duration/Reps of Exercise" 
                                value={this.state.duration}
                                onChange={(e) => this.setState({duration: e.target.value})}
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
                            Exercise
                            <IoIosAddCircleOutline size={25}  onClick={this._onPlusClick}/>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <ListGroup variant="flush"> 
                            {
                                this.state.exercise_list.map((item, key) => {
                                    return (
                                        <ListGroup.Item><ExerciseItem key={key} item={item} /></ListGroup.Item>
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
        let temp = [{
            name: this.state.exercise_name,
            duration: this.state.duration
        }]
        this.setState({exercise_list: this.state.exercise_list.concat(temp)})
        this.setState({
            exercise_name: "",
            duration: ""
        })
    }

    _onCloseClick() {
        this.setState({
            showForum: false
        });
    }

    _onPlusClick() {
        this.setState({
            showForum: true
        });
    }


}

export default ExerciseGrid;