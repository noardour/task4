import { FC, MouseEventHandler } from "react";
import Container from "./Container";
import Button from "./UI/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import useAppDispatch from "../hooks/useAppDispatch";
import { deleteUsers, unblockUsers } from "../store/users/slice";
import { blockUsers } from "../store/users/actions";

const Tooltip: FC = () => {
  const dispatch = useAppDispatch();

  const handleBlock: MouseEventHandler = () => {
    dispatch(blockUsers());
  };

  const handleRemoveBlock: MouseEventHandler = () => {
    dispatch(unblockUsers());
  };

  const handleDelete: MouseEventHandler = () => {
    dispatch(deleteUsers());
  };

  return (
    <div className="mb-2">
      <Container>
        <div className="bg-[#232323] p-4 rounded-lg">
          <div className="flex gap-3">
            <Button onClick={handleBlock}>
              <FontAwesomeIcon icon={faLock} /> Block
            </Button>
            <Button onClick={handleRemoveBlock}>
              <FontAwesomeIcon icon={faLockOpen} />
            </Button>
            <Button onClick={handleDelete} color="error">
              <FontAwesomeIcon icon={faTrashCan} />
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Tooltip;
