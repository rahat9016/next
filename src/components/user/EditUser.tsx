import { FC } from "react";

interface IEditProps {
    setEditModalOpen: Function;
    refetch: any;
  }

  const EditUser: FC<IEditProps> = ({ setEditModalOpen, refetch }) => {

    return (
        <div>
            Edit user
        </div>
    );
};

export default EditUser;