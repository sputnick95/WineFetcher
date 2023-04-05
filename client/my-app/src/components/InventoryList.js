import React, {useState} from 'react';
import { Pagination } from 'react-bootstrap';

//Child Components
import InventoryItem from './InventoryItem'


function InventoryList(inventory){

    console.log(inventory.inventory.white_wines)
    const ww = inventory.inventory.white_wines

    let wineries;
        if (ww !== undefined) {
            wineries = ww.map((item) => item.winery)
            // console.log(wineries)
        }

    // const [activePage, setActivePage] = useState(1);
    // const pageSize = 10;
    // const totalPages = Math.ceil(inventory.length / pageSize);
    // const startIndex = (activePage - 1) * pageSize;
    // const productsOnPage = inventory.slice(startIndex, startIndex + pageSize);


    // figure out how to get length of object
    console.log(typeof wineries)
        
        



    return(
        <>
            <div>
                <h1>Inventory</h1>
            </div>
            <div className="cards">
                {ww !== undefined ? ww.map((item) => <InventoryItem {...item} key={item.id}/> )  : null }
            </div>

        </>
    )
}

export default InventoryList;

