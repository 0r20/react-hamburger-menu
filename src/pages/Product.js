import React from 'react'
import {useRouteMatch} from 'react-router-dom'
import Img1 from '../images/shoe1.jpg'
import Img2 from '../images/shoe2.jpg'
import Img3 from '../images/shoe3.jpg'
import Img4 from '../images/shoe4.jpg'

const Product = () => {

  const images = [
    {
      title: 'Air Max 90',
      img: Img1
    },
    {
      title: 'New Balance X-90',
      img: Img2
    },
    {
      title: 'Air Max 97 x Off-White',
      img: Img3
    },
    {
      title: 'Yeezy 700 Geode',
      img: Img4
    }
  ]

  const match = useRouteMatch('/product/:id')

  return (
    <>
      <div className="banner">
        <div className="inner-banner">
          <div className="container">
            <h1 className="main-headline">{images[match.params.id].title}</h1>
            <div className="image">
              <img src={images[match.params.id].img} alt={images[match.params.id].title}/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Product