
interface IAdd {
    setOpen: (open: boolean) => void;
    refetch: any;
  }

const AddUser: React.FC<IAdd> = ({ setOpen, refetch }) => {
    return (
        <div>
            add user
        </div>
    );
};

export default AddUser;