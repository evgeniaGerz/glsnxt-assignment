import { useState } from 'react'
import glsnextLogo from './assets/glsnxt-logo.svg'
import './App.css'
import Modal from './Modal'

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false)

  return (
    <>
    <div className='page-wrapper'>
      <div className='container'>
        <a href="https://www.glsnxt.com/" target="_blank">
          <img src={glsnextLogo} className="logo" alt="glsnxt logo" />
        </a>
      </div>
      <div className="card">
        <button onClick={() => setIsModalVisible(true)}>
          open modal
        </button>
      </div>
      {isModalVisible && <Modal onModalClose={() => setIsModalVisible(false)} />}

    </div>
    </>
  )
}

export default App
