import React from 'react';
import FoodItem from './FoodItem';

import Card from 'react-bootstrap/Card';
import { IoIosAddCircleOutline } from "react-icons/io";

class HomeGrid extends React.Component {
    render () {
        return (
            <div>
                <Card style={{ width: '35rem', 
                               marginLeft: '20px',
                               marginRight: '20px',
                               marginTop: '20px',
                               marginBottom: '20px',
                            }}>
                    <Card.Header>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            Quote   
                            <IoIosAddCircleOutline size={25}/>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                        <p>
                            {' '}
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
                            erat a ante.{' '}
                        </p>
                        <footer className="blockquote-footer">
                            Someone famous in <cite title="Source Title">Source Title</cite>
                        </footer>
                        </blockquote>
                        <FoodItem />
                    </Card.Body>
                </Card>
            </div>
        );
    }


}

export default HomeGrid;