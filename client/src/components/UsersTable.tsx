import { ChangeEventHandler, FC, PropsWithChildren, TdHTMLAttributes, ThHTMLAttributes, useEffect, useRef, useState } from "react";
import useAppSelector from "../hooks/useAppSelector";
import { selectUsers } from "../store/users/selectors";
import useAppDispatch from "../hooks/useAppDispatch";
import { setChecked, setCheckedToAll } from "../store/users/slice";
import { fetchUsers } from "../store/users/actions";
import classNames from "classnames";

interface UserHeadCellProps extends ThHTMLAttributes<HTMLTableCellElement> {}
const UserHeadCell: FC<PropsWithChildren<UserHeadCellProps>> = ({ className, children, ...props }) => (
  <th className={classNames("p-3 [&:not(:last-child)]:border-r border-zinc-700", className)} {...props}>
    {children}
  </th>
);

interface UserCellProps extends TdHTMLAttributes<HTMLTableCellElement> {}
const UserCell: FC<PropsWithChildren<UserCellProps>> = ({ className, children, ...props }) => (
  <td className={classNames("p-3 [&:not(:last-child)]:border-r border-gray-900", className)} {...props}>
    {children}
  </td>
);

const UsersTable: FC = () => {
  const users = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();
  const [headCheckbox, setHeadCheckbox] = useState<boolean | "indeterminate">(false);
  const headCheckboxRef = useRef<HTMLInputElement>(null);

  const handleHeadChecked: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(setCheckedToAll(e.target.checked));
  };

  const handleRowChecked: (id: number) => ChangeEventHandler<HTMLInputElement> = (id: number) => (e) => {
    dispatch(setChecked({ id, value: e.target.checked }));
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    let acc: boolean | "indeterminate" = users[0]?.checked;
    for (let i = 1; i < users.length; i++) {
      if (users[i].checked !== acc) {
        acc = "indeterminate";
        break;
      }
    }
    setHeadCheckbox(acc);
  }, [users]);

  useEffect(() => {
    if (headCheckboxRef.current) {
      headCheckboxRef.current.indeterminate = headCheckbox == "indeterminate";
      headCheckboxRef.current.checked = headCheckbox != "indeterminate" && headCheckbox;
    }
  }, [headCheckbox]);

  return (
    <div>
      <table className="border-separate w-full rounded-lg border-spacing-0 overflow-hidden">
        <thead>
          <tr className="bg-[#232323]">
            <UserHeadCell className="text-center align-middle w-16">
              <input
                type="checkbox"
                onChange={handleHeadChecked}
                className="form-checkbox h-5 w-5 text-gray-600"
                id="checkbox"
                ref={headCheckboxRef}
              />
            </UserHeadCell>
            <UserHeadCell>Name</UserHeadCell>
            <UserHeadCell>e-Mail</UserHeadCell>
            <UserHeadCell>Last Login</UserHeadCell>
            <UserHeadCell>Status</UserHeadCell>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="[&:nth-child(2n+1)]:bg-gray-700 [&:nth-child(2n)]:bg-gray-800">
              <UserCell className="text-center align-middle w-16">
                <input
                  type="checkbox"
                  checked={user.checked}
                  onChange={handleRowChecked(user.id)}
                  className="js-checkbox form-checkbox h-5 w-5 text-gray-600"
                />
              </UserCell>
              <UserCell>{user.name}</UserCell>
              <UserCell>{user.email}</UserCell>
              <UserCell>{user.regesteredAt}</UserCell>
              <UserCell>{user.status}</UserCell>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
