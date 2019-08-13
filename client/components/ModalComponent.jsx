/**
 * Created by neilkatz on 3/22/17.
 */

import React from 'react';
import { Modal } from 'react-bootstrap';



const modalTypes = {
    terms:{
        title:'TERMS OF USE',
        body:'Terms of use text'
    },
    privacy:{
        title:'PRIVACY POLICY',
        body:'Privacy policy text'
    }
};


export default class ModalComponent extends React.Component
{

    render()
    {

        const { showHideModal, modalData } = this.props;

        const title = modalData ? modalTypes[modalData].title : "";
        const body = modalData ? modalTypes[modalData].body : "";
        const show = !!modalData;

        if( !show ) return null;

        return (
            <Modal
                animation={false}
                show={show}
                onHide={ showHideModal.bind( null, false )}
                size="lg"
                centered
            >
                <Modal.Header closeButton >
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {body}
                </Modal.Body>

                <Modal.Footer>
                    <button onClick={ showHideModal.bind( null, false )} >CLOSE</button>
                </Modal.Footer>

            </Modal>
        )
    }
};