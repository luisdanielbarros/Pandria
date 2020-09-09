import React from 'react';
import Form from 'react-bootstrap/form';

const ProductSingleSizes = ({ sizes }) => {
    const sizeList = () => {
        return sizes.map((size, i) => 
            <Form.Check
                key={i}
                type='radio'
                name='productSize'
                value={size}
                label={size}
                inline
                required
            />
        );
    }
    return (
    <Form.Group className="productSingleSizes">
        <Form.Label>
            <h6>Sizes</h6>
        </Form.Label>
        {sizeList()}
    </Form.Group>
    );
}

export default ProductSingleSizes;