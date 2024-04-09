import { useState } from "react";
import { UserContext } from "./context";
import UserTable from "./table";
import UserFormModal from "./modals/UserForm";

const UserModule = () => {
  const [openModal, setOpenModal] = useState<any>({
    modal: false,
    modalInfor: false,
  });

  const handleModal = (name: string) => {
    setOpenModal((old: any) => ({ ...old, [name]: !openModal[name] }));
  };

  return (
    <UserContext.Provider value={{ openModal, handleModal }}>
      <UserTable />
      <UserFormModal />
    </UserContext.Provider>
  );
};

export default UserModule;
