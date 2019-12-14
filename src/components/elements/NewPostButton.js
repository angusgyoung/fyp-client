import React, {Fragment, useState} from "react";
import ComposePostModal from "./ComposePostModal";
import GenericButton from "./GenericButton";


const NewPostButton = () => {
    const [showModal, setShowModal] = useState(false);

    
    return (
        <Fragment>
            <GenericButton onClick={() => setShowModal(true)}>Compose Post</GenericButton>
            <ComposePostModal showModal={showModal} setShowModal={setShowModal}/>
        </Fragment>
    );
}
export default NewPostButton;
