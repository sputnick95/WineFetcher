import React, {useEffect, useState} from 'react';
import { Pagination } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';

//Child Components
import InventoryItem from './InventoryItem'

function InventoryList({user, inventory, itemNumber, setItemNumber, userCart, selectedItem, setItem} ){
    const [activePage, setActivePage] = useState(1);
    const [showToast, setShowToast] = useState(false)



    const ww = inventory
    const pageSize = 12;
    let totalPages;
    let productsOnPage;
    let startIndex;


    if (ww !== undefined) {
        totalPages = Math.ceil(Object.keys(ww).length / pageSize);
        startIndex = (activePage - 1) * pageSize;
        productsOnPage = ww.slice(startIndex, startIndex + pageSize);
    }
    
    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber)
    };


        return(
        <>
            <div>
                <h1>Inventory</h1>
            </div>

            <div>
                <Toast 
                    show={showToast} 
                    onClose={() => setShowToast(false)} 
                    delay={3000} autohide
                    style={{ position: "fixed", zIndex: 9999}}
                    z
                >
                    <Toast.Header>
                        <strong className="me-auto">Notification</strong>
                    </Toast.Header>
                    <Toast.Body>Item has been added to your cart!</Toast.Body>
                </Toast>
            </div>
            
            <div className="cards">
                {productsOnPage !== undefined ? productsOnPage.map((item) => <InventoryItem selectedItem={selectedItem} setItem={setItem} userCart={userCart} itemNumber={itemNumber} setItemNumber={setItemNumber} showToast={showToast} setShowToast={setShowToast} {...item} key={item.id} user={user}/> )  : null }
            </div>
            <Pagination className="justify-content-center" >
                {Array.from({ length: totalPages}, (_, i) => (
                    <Pagination.Item key={i} active={i + 1 === activePage} onClick={() => handlePageChange(i +1)}>
                        {i + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </>
    )
}
export default InventoryList;



 