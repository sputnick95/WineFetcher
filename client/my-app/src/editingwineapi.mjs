import fetch from 'node-fetch';
import fs from 'fs';

function editingwineapi(){

    fetch('http://localhost:3000/white_wines')
    .then(resp => resp.json())
    .then(api => {
        const newData = api.map(object => ({
            ...object,
            price: Math.round(((Math.random()*10001)+100)/100)*100,
            comments: [],
            stock: Math.floor(Math.random()*20)+1
        }));

        const newdataString = JSON.stringify(newData, null, 2)

        fs.writeFile('updatedData.json',newdataString, (err) => {
            if (err) throw err;
            console.log('Data written to file')
        })
    })
    .catch(err => console.error(err))
}


editingwineapi()