import React from 'react';
import { useState, useEffect } from 'react';
import '../css/contentModal.scss'
import axios from 'axios';

const ContentModal = ({ content }) => {

    const [tagline, setTagline] = useState();
    const [video, setVideo] = useState();

    const fetchVideo = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${content.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        const official = data.results.filter(trailer =>{
            return (trailer.official === true || trailer.type ==="Trailer");
        } )
        setVideo(official[0]?.key);
    }

    const fetchTagline = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${content.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        setTagline(data.tagline);
    }

    if(content){
        useEffect(() => {
            fetchVideo();
            fetchTagline();
        }, [])
    }

    return (
        <div className='contentModalContainer'>
            {content.backdrop_path &&
                <div className="faded faded-bottom">
                    <img
                        className='poster'
                        src={`https://image.tmdb.org/t/p/w500/${content.backdrop_path}`}
                    />
                </div>
            }

            {content.title && !content.backdrop_path &&
                <img
                    className='poster'
                    src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
                />
            }

            {content.title &&
                <h1 className='title'>{content.title}</h1>
            }

            {tagline &&
                <h3 className='tagline'>{tagline}</h3>
            }

            {content.overview &&
                <p className='overview'>{content.overview}</p>
            }

            {video &&
                <a
                    className='playButton'
                    target='__blank'
                    href={`https://www.youtube.com/watch?v=${video}`}
                >
                    Watch the Trailer
                </a>
            }
        </div>
    )
}

export default ContentModal