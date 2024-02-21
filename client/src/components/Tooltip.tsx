import { FC, HTMLAttributes, MouseEventHandler } from "react";
import Container from "./Container";
import Button from "./UI/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import useAppDispatch from "../hooks/useAppDispatch";
import { blockUsers, deleteUsers, unblockUsers } from "../store/users/actions";
import Paper from "./UI/Paper";
import classNames from "classnames";

interface TooltipProps extends HTMLAttributes<HTMLDivElement> {}

const Tooltip: FC<TooltipProps> = ({ className, ...props }) => {
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
    <div className={classNames(className)} {...props}>
      <Container>
        <Paper>
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
        </Paper>
      </Container>
    </div>
  );
};

export default Tooltip;
