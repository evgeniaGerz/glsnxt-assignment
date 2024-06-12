import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import "./Modal.css"
import closeIcon from "./assets/times-solid.svg"

function Modal({ onModalClose, isOpen, title, content }) {
  const [isSaving, setIsSaving] = useState(false)
  const modalRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      const modalElements = modalRef.current
      const focusableElements = modalElements.querySelectorAll(
        'button:not([disabled]), [tabindex]:not([tabindex="-1"])' // later other element can be added - [href], input, select, textarea, a,
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
        // TODO: restoring the focus on the " open modal" button
      }
    }
  }, [isOpen, onModalClose])

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      onModalClose()
    }, 1500)
  }

  return createPortal(
    <>
      <div
        onClick={onModalClose}
        className="modal-container"
        aria-label="backdrop"
      >
        <div
          className="modal"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
          ref={modalRef}
          aria-labelledby="my-modal-label"
        >
          <header>
            <h2>{title}</h2>
            <button
              className="close-icon"
              onClick={onModalClose}
              aria-label="Close"
            >
              <img width={30} src={closeIcon} />
            </button>
          </header>
          <main>
            <p>{content}</p>
          </main>
          <footer>
            <button onClick={onModalClose} type="button">
              Close
            </button>
            <button onClick={handleSave} type="button" aria-live="polite">
              {isSaving ? "Saving..." : "Save"}
            </button>
          </footer>
        </div>
      </div>
    </>,
    document.body
  )
}

export default Modal
