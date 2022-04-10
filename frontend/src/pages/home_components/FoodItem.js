import React from 'react';

class FoodItem extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            food_id: 0,
            quantity: 0,
            
        };
    }

    render () {
        return (
            <div>
                <h1>FoodItem Test</h1>
            </div>
            );
    }
}

export default FoodItem;