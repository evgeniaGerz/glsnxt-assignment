import { createPortal } from "react-dom"
import "./Modal.css"
import closeIcon from "./assets/times-solid.svg"

function Modal({ onModalClose, title, content }) {
  return createPortal(
    <>
      <div onClick={onModalClose} className="modal-container">
        <div
          className="modal"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          <header>
            <h2>{title}</h2>
            <button className="close-icon" onClick={onModalClose}>
              <img width={30} src={closeIcon} />
            </button>
          </header>
          <main>
            <p>{content}</p>
          </main>
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
