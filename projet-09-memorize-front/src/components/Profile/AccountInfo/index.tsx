import { useState } from "react";
import DeleteAccountModal from "../DeleteAccountModal";
import ButtonsGroup from "../EditAccountForm/ButtonsGroup";

function AccountInfo({ toggleEdit, loggedUser }) {
  const [isDeleteAccountModal, setIsDeleteAccountModal] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleteAccountModal(true);
  };

  return (
    <section className="flex flex-col text-center space-y-2">
      <div>
        <h3 className="text-lg font-semibold text-1F3D75 mb-1">
          Identifiant :
        </h3>
        <p>{loggedUser.username}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-1F3D75 mb-1">
          Email :
        </h3>
        <p>{loggedUser.email}</p>
      </div>
      <ButtonsGroup
        buttons={[
          { text: "Edit", onClick: toggleEdit },
          { text: "Delete my account", onClick: handleDeleteClick },
        ]}
      />
      <DeleteAccountModal
        isOpen={isDeleteAccountModal}
        onClose={() => {
          setIsDeleteAccountModal(false);
        }}
      />
    </section>
  );
}

export default AccountInfo;
