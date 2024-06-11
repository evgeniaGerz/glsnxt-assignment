import { useState } from "react"
import glsnextLogo from "./assets/glsnxt-logo.svg"
import "./App.css"
import Modal from "./Modal"

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false)

  return (
    <div className="app">
      {/* <div className="container">
        <a href="https://www.glsnxt.com/" target="_blank">
          <img src={glsnextLogo} className="logo" alt="glsnxt logo" />
        </a>∏
      </div> */}
      <button
        className="openModal-button"
        onClick={() => setIsModalVisible(true)}
      >
        open modal
      </button>
      {isModalVisible && (
        <Modal onModalClose={() => setIsModalVisible(false)} />
      )}
    </div>
  )
}

export default App
