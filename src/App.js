import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { SocialIcon } from 'react-social-icons';
import { FaQuoteRight } from 'react-icons/fa';

function App() {
  const [isLoading, setIsLoading]=useState(true);
  const [Reviews, setReviews]=useState([]);
  const [value, setValue]=useState(0);
  useEffect(() => {
    fetch("https://emad-trending-api.herokuapp.com/Trending")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoading(false);
          setReviews(result);
        },

        (error) => {
          setIsLoading(true);

        }
      )
  }, [])


  useEffect(() => {
    let slider=setInterval(() => {
      setValue(move(value, Reviews.length-1, "F"));

    }, 4000);
    return () => clearInterval(slider);

  }, [value])

  // move in both directions last Parameter defines whether it should move forward or backward
  const move=(num, max, dir) => {
    if (dir==="F") {
      if (num===max) {
        return 0;

      }
      else {
        return num+1
      }
    }
    else {
      if (num===0) {
        return max;
      }
      else {
        return num-1;
      }

    }

  }

  if (isLoading) {
    return (
      <div>
        <h1> Loading...!</h1>
      </div>
    );
  }


  return (

    <section className="section">
      <div className="title">
        <h2> <span> <SocialIcon url="https://twitter.com/" /></span>Trending</h2>
      </div>
      <div className="section-center">
        {Reviews.map((review, reviewIndex) => {
          const { id, name, title, quote, image }=review;

          let position='nextSlide';
          if (reviewIndex===value) { position='activeSlide' }
          if (reviewIndex===value-1||(value===0&&reviewIndex===Reviews.length-1)) { position='lastSlide' }
          return (<article className={position} key={id}>
            <img className="person-img" src={image} alt={name} />
            <h4>{name}</h4>
            <p className="title">{title}</p>
            <p className="text">{quote}</p>
            <FaQuoteRight className='icon' />
          </article>);
        })}
        <button className="next" onClick={() => { setValue(move(value, Reviews.length-1, "F")) }}><FiChevronRight /></button>
        <button className="prev" onClick={() => { setValue(move(value, Reviews.length-1, "B")) }}><FiChevronLeft></FiChevronLeft></button>


      </div>


    </section>);
}

export default App;
