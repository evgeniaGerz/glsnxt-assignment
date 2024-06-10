import { createPortal } from "react-dom";
import "./Modal.css";
import closeIcon from "./assets/times-solid.svg";

function Modal({ onModalClose }) {
  return (
    <div style={{ border: "2px solid black" }}>
      {createPortal(
        <div className="modal-wrapper" role="dialog" aria-modal="true">
          <div className="modal-content">
            <header>
              <h2>title goes here</h2>
              <button onClick={onModalClose}>
                <img width={30} src={closeIcon} />
              </button>
            </header>
            <main>this is a modal's content</main>
            <footer>
              <button onClick={onModalClose}>Close</button>
              <button>Save</button>
            </footer>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

export default Modal;
