import React, { Fragment, useState } from "react";
import SetKeypairModal from "./SetKeypairModal";
import GenericButton from "./GenericButton";


const SetKeypairButton = () => {
    const [showModal, setShowModal] = useState(false);


    return (
        <Fragment>
            <GenericButton onClick={() => setShowModal(true)}>Set Keypair</GenericButton>
            <SetKeypairModal showModal={showModal} setShowModal={setShowModal} />
        </Fragment>
    );
}
export default SetKeypairButton;
