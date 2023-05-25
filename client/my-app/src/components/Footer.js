import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



function Footer (){
    return(
        <div className='footer'>
            <div className='footer-inner'>
                <div className='top-footer-block'>
                    <div className='footer-1st-row'>
                        <h5 style={{ fontFamily: 'Josefin Sans', fontSize: '22px', fontStyle: 'normal', fontWeight: 'bold' }} >connect with us!</h5>
                    </div>
                    <div className='footer-2nd-row'>
                        <a>CONTACT </a>
                        <a> FAQ</a>
                    </div>
                    <div className='footer-block-row' >
                        <p>© 2023 VineFetcher LLC, All Rights Reserved</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;
