import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import "./Modal.css"
import closeIcon from "./assets/times-solid.svg"

function Modal({ onModalClose, isOpen, title, content }) {
  const modalRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      const modalElements = modalRef.current
      const focusableElements = modalElements.querySelectorAll(
        'button, [tabindex]:not([tabindex="-1"])' // later other element can be added - [href], input, select, textarea,
      )
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      const handleEscape = (e) => {
        if (e.key === "Escape") {
          onModalClose()
        }
      }

      const handleTab = (e) => {
        if (e.key === "Tab") {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }

      window.addEventListener("keydown", handleEscape)
      window.addEventListener("keydown", handleTab)

      return () => {
        window.removeEventListener("keydown", handleEscape)
        window.removeEventListener("keydown", handleTab)
      }
    }
  }, [isOpen])

  return createPortal(
    <>
      <div onClick={onModalClose} className="modal-container">
        <div
          className="modal"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
          ref={modalRef}
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
