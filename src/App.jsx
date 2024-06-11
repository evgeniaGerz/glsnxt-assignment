import { useState } from "react"
import glsnextLogo from "./assets/glsnxt-logo.svg"
import "./App.css"
import Modal from "./Modal"
import { TEXTS } from "./text.constants"

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false)

  return (
    <div className="app" aria-hidden={isModalVisible}>
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
        <Modal
          title={TEXTS.newModal.title}
          content={TEXTS.newModal.body}
          onModalClose={() => setIsModalVisible(false)}
          isOpen={isModalVisible}
        />
      )}
    </div>
  )
}

export default App
