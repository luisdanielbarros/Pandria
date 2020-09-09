import React from "react";
import Modal from 'react-bootstrap/modal';
import Button from 'react-bootstrap/button';

const MyModal = ({Title, Content, Close, btnText}) => {

    return(
        <div className="myModal-container">
            <Modal.Dialog className="myModal">
            <Modal.Header>
                <Modal.Title>{Title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>{Content}</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={Close}>{btnText}</Button>
            </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
}

export default MyModal;