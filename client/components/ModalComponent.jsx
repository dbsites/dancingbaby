
import React from 'react';
import { TweenLite } from 'gsap';



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

    componentDidUpdate()
    {
        this.showModal();
    }

    showModal = () =>
    {
        const { modalData } = this.props;
        const show = !!modalData;

        if( !show ) return null;

        TweenLite.fromTo( '.modal', .5, { opacity:0, y:-40 }, { opacity:1, y:0 } );
        TweenLite.fromTo( '.modal-background', .5, { opacity:0 }, { opacity:1 } );
    };

    render()
    {
        const { showHideModal, modalData } = this.props;

        const title = modalData ? modalTypes[modalData].title : "";
        const body = modalData ? modalTypes[modalData].body : "";
        const show = !!modalData;

        if( !show ) return null;

        return (
            <div className='modalComponent'>
                <div className='modal-background'/>
                <div className='modal'>

                    <div className='modal-header' >
                        <div className='modal-title'>{title}</div>
                    </div>

                    <div className='modal-body'>
                        {body}
                    </div>

                    <div className='modal-footer'>
                        <button onClick={ showHideModal.bind( null, false )} >CLOSE</button>
                    </div>

                </div>
            </div>
        )
    }
};