import { FC } from "react";
import Container from "./Container";
import Button from "./UI/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faLockOpen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

const Tooltip: FC = () => (
  <div className="mb-2">
    <Container>
      <div className="bg-[#232323] p-4 rounded-lg">
        <div className="flex gap-3">
          <Button>
            <FontAwesomeIcon icon={faLock} /> Block
          </Button>
          <Button>
            <FontAwesomeIcon icon={faLockOpen} />
          </Button>
          <Button color="red">
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
        </div>
      </div>
    </Container>
  </div>
);

export default Tooltip;
