import React from "react";
import Button from "react-bootstrap/Button";
import "./GenericButton.css"

const GenericButton = (props) => {
    return (
        <Button className="genericButton" type={props.type} onClick={props.onClick}>{props.children}</Button>
    );
}

export default GenericButton;