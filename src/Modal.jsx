import { createPortal } from 'react-dom';
import './Modal.css'


function Modal({ onModalClose }) {
  return (
    <div style={{ border: '2px solid black' }}>
      {createPortal(
      <div className='modal-wrapper' role="dialog"><div className='modal-content'>
        <header>title will be added here</header>
        <div>this is a modal's content</div>
        <footer>
          <button>Save</button>
          <button onClick={onModalClose}>Close</button>
        </footer>
        </div></div>,
      document.body
    )}
    </div>
  )
}

export default Modal