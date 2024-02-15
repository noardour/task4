import { ChangeEventHandler, FC, useEffect, useRef, useState } from "react";
import { IUser } from "../types/IUser";

interface IUserTableRow extends IUser {
  checked: boolean;
}

interface UsersTableProps {
  users: IUser[];
}

const UsersTable: FC<UsersTableProps> = ({ users }) => {
  const [userRows, setUserRows] = useState<IUserTableRow[]>(users.map((user) => ({ ...user, checked: false } as IUserTableRow)));
  const [headCheckbox, setHeadCheckbox] = useState<boolean | "indeterminate">(false);
  const headCheckboxRef = useRef<HTMLInputElement>(null);

  const handleHeadChecked: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUserRows(
      userRows.map((user) => {
        user.checked = e.target.checked;
        return user;
      })
    );
  };

  const handleRowChecked: (id: number) => ChangeEventHandler<HTMLInputElement> = (id: number) => (e) => {
    setUserRows(
      userRows.map((item) => {
        if (item.id == id) item.checked = e.target.checked;
        return item;
      })
    );
  };

  useEffect(() => {
    let acc: boolean | "indeterminate" = userRows[0].checked;
    for (let i = 1; i < userRows.length; i++) {
      if (userRows[i].checked !== acc) {
        acc = "indeterminate";
        break;
      }
    }
    console.log(acc);
    setHeadCheckbox(acc);
  }, [userRows]);

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
            <th className="text-center align-middle w-16 border-r border-zinc-700">
              <input
                type="checkbox"
                onChange={handleHeadChecked}
                className="form-checkbox h-5 w-5 text-gray-600"
                id="checkbox"
                ref={headCheckboxRef}
              />
            </th>
            <th className="p-3 border-r border-zinc-700">Name</th>
            <th className="p-3 border-r border-zinc-700">e-Mail</th>
            <th className="p-3 border-r border-zinc-700">Last Login</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {userRows.map((user) => (
            <tr key={user.id} className="[&:nth-child(2n+1)]:bg-gray-700 [&:nth-child(2n)]:bg-gray-800">
              <td className="text-center align-middle w-16 border-r border-gray-900">
                <input
                  type="checkbox"
                  checked={user.checked}
                  onChange={handleRowChecked(user.id)}
                  className="js-checkbox form-checkbox h-5 w-5 text-gray-600"
                />
              </td>
              <td className="p-3 border-r border-gray-900">{user.name}</td>
              <td className="p-3 border-r border-gray-900">{user.eMail}</td>
              <td className="p-3 border-r border-gray-900 text-right">{user.lastLogin}</td>
              <td className="p-3 border-zinc-600">{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
