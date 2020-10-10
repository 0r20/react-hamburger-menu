import React, { useEffect, useState, useRef } from 'react'
import { Close } from '../icons/close'
import { Link, withRouter } from 'react-router-dom'
import { data } from '../data/products'
import { Image } from './image'
import { motion, AnimatePresence } from 'framer-motion'

const transition = { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.9] }

const titleSLideUp = {
  initial: { y: 200 },
  animate: { y: 0 }
}

const parent = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 1
    }
  }
}

const maskAnimation = {
  initial: { width: '100%' },
  animate: { width: 0 }
}

const Menu = ({ menuState, setMenuState, history, x, y, setCursor }) => {

  useEffect(() => {
    history.listen(() => {
      setMenuState(false)
    })
  })

  return (
    <>
      <AnimatePresence>
        {menuState && (
          <>
            <motion.div
              className="products"
              initial={{ visibility: 'hidden' }}
              animate={{ visibility: 'visible', transition: { delay: 1 } }}
              exit={{ visibility: 'hidden', transition: { delay: 1 } }}
            >
              <div className="menu-title">Products</div>
              <div
                className="close"
                onClick={() => setMenuState(false)}
                onMouseEnter={() => setCursor(true)}
                onMouseLeave={() => setCursor(false)}
              >
                <Close />
              </div>
              <div className="menu">
                <div className="container">
                  <div className="menu-inner">
                    <motion.ul
                      variants={parent}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      {data.map((list, index) => (
                        <List
                          key={list.id}
                          alt={list.id}
                          id={index}
                          title={list.title}
                          src={list.src}
                          leftLineFlex={list.leftLineFlex}
                          rightLineFlex={list.rightLineFlex}
                          thumbnailPosition={list.thumbnailPosition}
                          x={x}
                          y={y}
                          offset={list.offset}
                          setCursor={setCursor}
                        />
                      ))}
                    </motion.ul>
                  </div>
                </div>
              </div>
            </motion.div>
            <Panels />
          </>
        )}
      </AnimatePresence>
    </>
  )
}

const List = ({
  id,
  title,
  src,
  alt,
  leftLineFlex,
  rightLineFlex,
  thumbnailPosition,
  x,
  y,
  offset,
  setCursor
}) => {

  let list = useRef()

  const [hoverState, setHoverState] = useState(false)

  const [listPosition, setListPosition] = useState({
    top: 0,
    left: 0
  })

  useEffect(() => {
    setListPosition({
      top: list.current.getBoundingClientRect().top,
      left: list.current.getBoundingClientRect().left
    })
  }, [hoverState])

  return (
    <li ref={list}>
      <Link to={`/product/${id}`}>
        <div className="wrapper">
          <div className={`line left flex-${leftLineFlex}`}>
            <motion.div
              variants={maskAnimation}
              className="mask"
              transition={{ ...transition, duration: 1 }}
            />
          </div>
          <motion.div
            className="title"
            onHoverStart={() => setHoverState(true)}
            onHoverEnd={() => setHoverState(false)}

            onMouseEnter={() => setCursor(true)}
            onMouseLeave={() => setCursor(false)}
          >
            <h2>
              <motion.div
                variants={titleSLideUp}
                className="text"
                transition={transition}
              >{title}</motion.div>
            </h2>
          </motion.div>
          <div className="thumbnail" style={{ left: thumbnailPosition }}>
            <Image src={src} id={alt} />
            <motion.div
              className="mask"
              transition={{ ...transition, duration: 1 }}
              variants={maskAnimation}
            />
          </div>
          <motion.div
            className="floating-image"
            initial={{ opacity: 0 }}
            animate={{
              opacity: hoverState ? 1 : 0,
              x: x - listPosition.left + offset,
              y: y - listPosition.top
            }}
            transition={{
              ease: 'linear'
            }}
          >
            <Image src={src} id={alt} />
          </motion.div>
          <div className={`line right flex-${rightLineFlex}`}>
            <motion.div
              variants={maskAnimation}
              className="mask right"
              transition={{ ...transition, duration: 1 }}
            />
          </div>
        </div>
      </Link>
    </li>
  )
}

const Panels = () => {

  const [panelComplete, setPanelComplete] = useState(false)

  return (
    <>
      <motion.div
        style={{ background: panelComplete ? '#e7e7de' : '#e7dee7' }}
        className="left-panel"
        initial={{ height: 0 }}
        animate={{ height: [0, window.innerHeight, 0], bottom: [null, 0, 0] }}
        exit={{ height: [0, window.innerHeight, 0], top: [null, 0, 0] }}
        transition={{ ...transition, duration: 2, times: [0, 0.5, 1] }}
      />
      <motion.div
        style={{ background: panelComplete ? '#e7e7de' : '#e7dee7' }}
        className="right-panel"
        initial={{ height: 0 }}
        animate={{ height: [0, window.innerHeight, 0], bottom: [0, 0, window.innerHeight] }}
        exit={{ height: [0, window.innerHeight, 0], bottom: [null, 0, 0] }}
        transition={{ ...transition, duration: 2, times: [0, 0.5, 1] }}
        onAnimationComplete={() => {
          setPanelComplete(state => !state)
        }}
      />
    </>
  )
}

export default withRouter(Menu)
