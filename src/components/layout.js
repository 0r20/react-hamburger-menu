import React, {useState} from "react"
import Header from "./header"
import Menu from './menu'
import "../styles/index.scss"
import useMousePosition from '../hooks/useMousePosition'
import { motion } from 'framer-motion'

const Layout = ({ children }) => {

  const [menuState, setMenuState] = useState(false)

  const [cursor, setCursor] = useState(false)

  const { x, y } = useMousePosition()

  return (
    <div className="app">
      <Header 
        setMenuState={setMenuState}
        setCursor={setCursor}
      />
      <motion.div 
        className="cursor"
        initial={{opacity: 0}}
        animate={{opacity: cursor ? 1 : 0, x: x - 16, y: y - 16}}
      />    
      <Menu 
        menuState={menuState} 
        setMenuState={setMenuState}
        x={x}
        y={y}
        setCursor={setCursor}
      />
      <div>
        <main>{children}</main>
      </div>
    </div>
  )
}

export default Layout