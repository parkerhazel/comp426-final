import React, {useState} from 'react';
import axios from 'axios'

function RandomJoke() {
    const [view, setView] = useState(null);

    const options = {
        method: 'GET',
        url: 'https://jokeapi-v2.p.rapidapi.com/joke/Any',
        params: {
          type: 'twopart',
          format: 'json',
          idRange: '0-150',
          blacklistFlags: 'nsfw,racist'
        },
        headers: {
          'x-rapidapi-key': '6e19a19679msh98d7aeadfc3a914p19ac35jsn29445b03c1b6',
          'x-rapidapi-host': 'jokeapi-v2.p.rapidapi.com'
        }
    };

    function handleNewJoke() {
        axios.request(options).then(function (response) {
            console.log(response.data);
            setView(() => {
                return (
                    <div>
                        <div>
                            <h2>Q: {response.data.setup}</h2>
                        </div>
                        <div>
                            <h1>A: {response.data.delivery}</h1>
                        </div>
                    </div>
                )
            })
        }).catch(function (error) {
            console.error(error);
        });
    }
    
    if (view === null) {
        axios.request(options).then(function (response) {
            console.log(response.data);
            setView(() => {
                return (
                    <div>
                        <div>
                            <h2>Q: {response.data.setup}</h2>
                        </div>
                        <div>
                            <h1>A: {response.data.delivery}</h1>
                        </div>
                    </div>
                )
            })
        }).catch(function (error) {
            console.error(error);
        });
    }

    return (
    <div>
        {view}
        <button className='navButton' value={'New Random Joke'} onClick={handleNewJoke} id={'New Random Joke'} key={'New Random Joke'}>{'New Random Joke'}</button>
    </div>
    )
}

export default RandomJoke