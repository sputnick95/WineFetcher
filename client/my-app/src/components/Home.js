import React from 'react';
import Container from 'react-bootstrap/Container';

function Homepage(){
    const videoID = 'PNJBv6Ibj7suqfm2'
    const autoplay = 1;
    const loop = 1;
    // const time = '13s'
    const videoUrl = `https://www.youtube.com/embed/${videoID}?autoplay=${autoplay}&loop=${loop}`

    return(
        <div>

            <h1>Homepage</h1>   
            <Container>
                <div className='bg-image' >
                    
                </div>
            </Container>

            {/* <Container fluid className="p-0">
                <div className="video-container">
                    <iframe
                        src={videoUrl}
                        frameBorder="0"
                        allowFullScreen
                        title="background-video"
                    ></iframe>
                </div>
            </Container> */}
        </div>
    )
}

export default Homepage;