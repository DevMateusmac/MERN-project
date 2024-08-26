/* eslint-disable react/prop-types */
import { createPortal } from "react-dom";
import Backdrop from "./Backdrop";
import { CSSTransition } from "react-transition-group";

import "./Modal.css";

function ModalOverlay({
  className,
  headerClass,
  header,
  onSubmit,
  contentClass,
  footerClass,
  footer,
  children,
}) {
  return createPortal(
    <div className={`modal ${className}`}>
      <header className={`modal__header ${headerClass}`}>
        <h2>{header}</h2>
      </header>
      <form onSubmit={onSubmit ? onSubmit : (ev) => ev.preventDefault()}>
        <div className={`modal__content ${contentClass}`}>{children}</div>
        <footer className={`modal__footer ${footerClass}`}>{footer}</footer>
      </form>
    </div>,
    document.getElementById("modal-hook")
  );
}

export default function Modal({
  show,
  onCancel,
  className,
  headerClass,
  header,
  onSubmit,
  contentClass,
  footerClass,
  footer,
  children
}) {
  return (
    <>
      {show && <Backdrop onClick={onCancel} />}
      <CSSTransition
        in={show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay
          className={className}
          headerClass={headerClass}
          header={header}
          onSubmit={onSubmit}
          contentClass={contentClass}
          footerClass={footerClass}
          footer={footer}
          children={children}
        />
      </CSSTransition>
    </>
  );
}



