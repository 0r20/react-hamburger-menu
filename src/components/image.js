import React from 'react'
import Img1 from '../images/shoe1.jpg'
import Img2 from '../images/shoe2.jpg'
import Img3 from '../images/shoe3.jpg'
import Img4 from '../images/shoe4.jpg'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

export const Image = ({src, id}) => {
  return (
    <>
      {src === 1 ? (
        <LazyLoadImage src={Img1} alt={id} effect="opacity"/>
      ) : src === 2 ? (
        <LazyLoadImage src={Img2} alt={id} effect="opacity"/>
      ) : src === 3 ? (
        <LazyLoadImage src={Img3} alt={id} effect="opacity"/>
      ) : (
        <LazyLoadImage src={Img4} alt={id} effect="opacity"/>
      )}
    </>
  )
}
