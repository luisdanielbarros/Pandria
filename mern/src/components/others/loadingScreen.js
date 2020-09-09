import React from "react";
import { Spinner } from 'react-bootstrap';

const LoadingScreen = () => {

    return (
        <div className="loadingScreen">
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    );
}

export default LoadingScreen;