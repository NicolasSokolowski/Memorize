import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import EditAccountForm from "./EditAccountForm";
import AccountInfo from "./AccountInfo";
import { getUser } from "../../store/actions/user/getUser";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useAppDispatch();

  const toggleEdit = () => setIsEditing(!isEditing);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const loggedUser = useAppSelector((state) => state.user);

  return (
    <section className="mx-auto bg-F5E9E0 p-10 rounded-xl flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 text-1F3D75">Page de Profil</h1>
      {isEditing ? (
        <EditAccountForm toggleEdit={toggleEdit} />
      ) : (
        <AccountInfo toggleEdit={toggleEdit} loggedUser={loggedUser} />
      )}
    </section>
  );
}

export default Profile;
