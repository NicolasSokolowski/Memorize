import ModalContainer, { ModalProps } from "../../ModalContainer";
import { useAppDispatch } from "../../../hooks/redux";
import { deleteUser } from "../../../store/actions/user/deleteUser";
import { useNavigate } from "react-router-dom";

const DeleteAccountModal = ({ isOpen, onClose }: ModalProps) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const deleteUserAccount = (e) => {
    e.preventDefault();
    dispatch(deleteUser());
    onClose();
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      modalTitle="Supprimer votre compte"
      handleSubmitType={deleteUserAccount}
    >
      <p>Êtes vous sûr de vouloir supprimer votre compte</p>
    </ModalContainer>
  );
};

export default DeleteAccountModal;
