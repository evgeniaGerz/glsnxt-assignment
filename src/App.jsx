import { useRef, useState } from "react"
import "./App.css"
import Modal from "./Modal"
import { TEXTS } from "./text.constants"

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const openModalButtonRef = useRef(null)

  return (
    <div className="app" aria-hidden={isModalVisible}>
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
          triggerButtonRef={openModalButtonRef}
        />
      )}
    </div>
  )
}

export default App
