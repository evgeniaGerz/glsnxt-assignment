import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import "./Modal.css"
import closeIcon from "./assets/times-solid.svg"
import PropTypes from "prop-types"

function Modal({ onModalClose, isOpen, title, content, triggerButtonRef }) {
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
          if (e.shiftKey) {
            // Handle Shift+Tab
            if (document.activeElement === firstElement) {
              e.preventDefault()
              lastElement.focus()
            }
          } else {
            // Handle Tab
            if (document.activeElement === lastElement) {
              e.preventDefault()
              firstElement.focus()
            }
          }
        }
      }

      // Focus on the first focusable element when the modal opens
      firstElement?.focus()

      window.addEventListener("keydown", handleEscape)
      window.addEventListener("keydown", handleTab)

      const triggerButton = triggerButtonRef.current

      return () => {
        window.removeEventListener("keydown", handleEscape)
        window.removeEventListener("keydown", handleTab)

        // restoring the focus on the "open modal" button after closing
        if (triggerButton) {
          triggerButton.focus()
        }
      }
    }
  }, [isOpen, onModalClose, triggerButtonRef])

  // Added for showing user a 'Saving...' action on click
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

Modal.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  triggerButtonRef: PropTypes.object.isRequired,
}

export default Modal
