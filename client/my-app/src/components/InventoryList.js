import React, {useState} from 'react';
import { Pagination } from 'react-bootstrap';

//Child Components
import InventoryItem from './InventoryItem'

function InventoryList({user, inventory} ){
    
    const [activePage, setActivePage] = useState(1);
    const ww = inventory
    const pageSize = 9;
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
            <div className="cards">
                {productsOnPage !== undefined ? productsOnPage.map((item) => <InventoryItem handleClick_ID {...item} key={item.id}/> )  : null }
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

 