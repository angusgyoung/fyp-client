import React, {useState} from "react";

import theme from "../util/theme";
import Card from "react-bootstrap/Card";
import Collapse from "react-bootstrap/Collapse";
import Moment from 'react-moment';

import GenericButton from '../components/GenericButton';

const PostContainer = (props) => {

    const [open, setOpen] = useState(false);

    let {username, content, timestamp} = props.post;

    return (
        <Card style={styles.postContainer}>
            <Card.Title style={styles.postContainerUser}>
                <div className="float-left">
                    {username}
                </div>
                <div className="text-muted float-right">
                    <Moment unix format="h:mm a · MMM D YYYY">{timestamp}</Moment>
                </div>
            </Card.Title>
            <Card.Text style={styles.postContainerText}>
                {content}
            </Card.Text>
            <Card.Subtitle style={styles.postContainerVerificationBar}>
                <div>
                    <div className="float-left">
                        Integrity
                    </div>
                    <div className="float-right">
                        <GenericButton
                            onClick={() => setOpen(!open)}
                            className="genericButton"
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                        >
                            See Post Hash
                        </GenericButton>
                    </div>
                </div>
            </Card.Subtitle>
            <Collapse in={open} style={styles.verificationExpandView}>
                <div id="example-collapse-text">
                    DonecorcinuncmaximusetrisusetcommodoaccumsanmetusSedsitametesttinciduntauctornuncethendreritpurusSedidconsequattortorVivamusvehiculadiamnislsedconsecteturfelisluctusutPellentesquehabitantmorbitristiquesenectusetnetusetmalesuadafamesacturpisegestasCurabiturtristiqueetmetusvelvestibulumIntegeracnisinonenimdapibuspellentesquevitaesitametnullaCurabiturpretiumminondiamfaucibusquisfringillaloremcommodoUtsitametelementumtellusPhaselluspretiumloreminligulaaliquamconvallisutnectellusNamiaculisseddolornecfacilisisDonecpretiumlectussedconsequatinterdumSuspendisseuteliteudiamfeugiatconsequatategetligulaIntegersagittispurusegestasmagnasagittisvehiculaPraesenteuismodgravidasollicitudinMaecenasbibendumnuncnonhendreritconvallismetusnisitristiqueelitsempercursusipsumestidvelit
                </div>
            </Collapse>
        </Card>
    );
}

const styles = {
    postContainer: {
        backgroundColor: "black",
        borderStyle: "solid",
        borderColor: theme.BORDER_COLOR,
        marginBottom: theme.GLOBAL_MARGIN,
        width: "100%"
    },

    postContainerUser: {
        padding: "0.5rem",
        borderBottomStyle: "solid",
        borderBottomWidth: "1px",
        borderBottomColor: theme.BORDER_COLOR
    },

    postContainerText: {
        padding: theme.GLOBAL_PADDING
    },

    postContainerVerificationBar: {
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        borderTopColor: theme.BORDER_COLOR,
        padding: theme.GLOBAL_PADDING
    },
        
    verificationExpandView: {
        padding: theme.GLOBAL_PADDING,
        backgroundColor: theme.GREY,
        fontFamily: "Consolas,monaco,monospace"
    }
}

export default PostContainer;
