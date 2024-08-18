import { FormEventHandler } from "react";
import Modal from "react-modal";
import { Styles } from "react-modal";
import crossLogo from "../../assets/cross.png";
import checkLogo from "../../assets/check.png";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ModalContainerProps extends ModalProps {
  children: React.ReactNode;
  modalTitle: string;
  handleSubmitType?: FormEventHandler<HTMLFormElement>;
}

// Styles provided by React Modal module, which send the size of the modal as well as the overlay color behind
const customStyles: Styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "3%",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0 , 0, 0, 0.5)",
  },
};

// We pass children as prop in order to allow the injection of specific elements whenever necessary.
function ModalContainer({
  isOpen,
  onClose,
  children,
  modalTitle,
  handleSubmitType,
}: ModalContainerProps) {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex items-center justify-center pb-2 mb-2">
          <h1 className="text-3xl font-bold text-1F3D75">{modalTitle}</h1>
        </div>
        <button
          className="absolute top-0 right-1 text-gray-500"
          onClick={onClose}
        >
          X
        </button>
        {handleSubmitType ? (
          <form
            className="flex flex-col items-center space-y-4"
            onSubmit={handleSubmitType}
          >
            {children}

            <div className="flex space-x-36 mt-15">
              <input
                type="image"
                src={crossLogo}
                className="size-6 mt-1"
                onClick={(event) => {
                  event.preventDefault();
                  onClose();
                }}
              />

              <input type="image" src={checkLogo} className="size-6 mt-1" />
            </div>
          </form>
        ) : (
          <>{children}</>
        )}
      </Modal>
    </div>
  );
}

export default ModalContainer;
