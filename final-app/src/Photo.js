import React, {useState} from 'react';
import axios from 'axios'

// let runOnce = true;

function Photo() {
    const [view, setView] = useState(null);
    let randomPage = Math.floor(Math.random() * 10)

    const potd = {
        method: 'GET',
        url: 'https://picsum.photos/v2/list?page='+randomPage,
        headers: {
            // 'content-length': "21047", 
            // 'content-type': "text/xml; charset=utf-8"
        }
    }

    // let resp;

    async function getPotd() {
        let response = await axios(potd);
        console.log(response);
        // resp = response.data;
        setView(() => {
            let temp = []
            response.data.forEach(element => {
                temp.push(
                <div key={element.id}>
                    <h2 style={{marginLeft: 'auto', marginRight: 'auto', width: '50%'}}>Photo by: {element.author}</h2>
                    <img src={element.download_url} alt='New' style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '50%'}}/>
                </div>
                )
            });
            temp.sort(() => Math.random() - 0.5);
            return (temp);
        });
        // runOnce = false;
    }

    if (view === null) {
        getPotd()
        // runOnce = false;
    }
//style={{display: 'block', 'margin-left': 'auto', 'margin-right': 'auto', width: '50%'}}
    return (
    <div>
        {view}
    </div>
    )
}

export default Photo;