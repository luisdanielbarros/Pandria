import React from 'react';
import Form from 'react-bootstrap/form';

const ProductSingleColors = ({ colors, value, onChange }) => {
    const colorList = () => {
        return colors.map((color, i) => 
            <Form.Check
                key={i}
                type='radio'
                name='productColor'
                value={color}
                label={color}
                inline
                required
            />
        );
    }
    return (
    <Form.Group className="productSingleColors">
        <Form.Label>
            <h6>Colors</h6>
        </Form.Label>
        {colorList()}
    </Form.Group>
    );
}

export default ProductSingleColors;