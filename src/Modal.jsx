import { createPortal } from "react-dom"
import "./Modal.css"
import closeIcon from "./assets/times-solid.svg"

function Modal({ onModalClose }) {
  return createPortal(
    <>
      <div onClick={onModalClose} className="modal-container">
        <div className="modal" role="dialog" aria-modal="true">
          <header>
            <h2>title goes here</h2>
            <button className="close-icon" onClick={onModalClose}>
              <img width={30} src={closeIcon} />
            </button>
          </header>
          <main>this is a modal's content</main>
          <footer>
            <button onClick={onModalClose}>Close</button>
            <button>Save</button>
          </footer>
        </div>
      </div>
    </>,
    document.body
  )
}

export default Modal
