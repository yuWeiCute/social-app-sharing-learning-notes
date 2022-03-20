// "rafce" for create component  (first you should download "ES7+ React/Redux/React-Native snippets")
import React from 'react'

import { About, Footer, Header, Skills, Work } from './container';

import './Myhome.scss';


const Myhome = () => {
  return (
    <div className="app">
      <Header />
      <About />
      <Work />
      <Skills />
      <Footer />
    </div>
  )
}

export default Myhome