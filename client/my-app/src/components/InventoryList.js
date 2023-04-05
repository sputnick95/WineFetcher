import React from 'react';
import InventoryItem from './InventoryItem'


function InventoryList(inventory){

    console.log(inventory.inventory.white_wines)
    const ww = inventory.inventory.white_wines

    let wineries;
        if (ww !== undefined) {
            wineries = ww.map((item) => item.winery)
            console.log(wineries)
        }
        
        



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

