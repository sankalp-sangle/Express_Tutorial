import React from 'react';

class FoodItem extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            name: ""
        };
    }

    render () {
        return (
            <div>
                <div>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: 'space-between'}}>
                    <h1>{this.props.item.name}</h1>
                    <h1>{this.props.item.duration}</h1>
                </div>
            </div>
            </div>
            );
    }
}

export default FoodItem;