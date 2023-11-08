import React from "react";
import { RxCross1 } from "react-icons/rx";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function ConfirmBox({ ban, success, restore, setAlert }) {
  const nav = useNavigate();
  return (
    <main className="w-[30rem] h-fit bg- flex justify-center absolute border">
      <div className={`w-full bg-[#161618]`}>
        <div className="flex w-full items-center justify-between p-5">
          <h4>
            {(ban && "Ban User") ||
              (success && "Create An Account") ||
              (restore && "Restore User")}
          </h4>
          <RxCross1
            onClick={() => setAlert(false)}
            className="cursor-pointer"
          />
        </div>
        <div className="p-5 w-full bg-[#202124] flex flex-col items-center   justify-center">
          <div className="w-36 h-36 p-5 flex justify-center items-center bg-[#323336] rounded-full ">
            <img
              className={`w-20 h-20 border bg-[#434446] rounded-full p-5 ${
                (ban && "border-red-500") ||
                (restore && "border-slate-50") ||
                (success && "border-green-500")
              }`}
              src={
                (ban &&
                  "https://cdn4.iconfinder.com/data/icons/social-messaging-ui-coloricon-1/21/41-256.png") ||
                (success &&
                  "https://img.icons8.com/?size=512&id=sz8cPVwzLrMP&format=png") ||
                (restore &&
                  "https://cdn3.iconfinder.com/data/icons/leto-arrows-1/64/_restore_time_machine_undo-256.png")
              }
              alt=""
            />
          </div>
          <div>
            <h4 className="my-5">
              {(ban && "Do you want to ban this user?") ||
                (success && "Successfully created an account.") ||
                (restore && "Do you want to restore this user?")}
            </h4>
            {(ban && (
              <div className="flex items-center justify-center gap-10">
                <Button text={"CANCEL"} className={"bg-transparent border"} />
                <Button text={"BAN USER"} className={"bg-red-600"} />
              </div>
            )) ||
              (restore && (
                <div className="flex items-center justify-center gap-10">
                  <Button text={"CANCEL"} className={"bg-transparent border"} />
                  <Button
                    text={"RESTORE"}
                    className={"bg-slate-50 text-slate-700"}
                  />
                </div>
              )) ||
              (success && (
                <div
                  onClick={() => {
                    setAlert(false);
                    nav(`/user-overview`);
                  }}
                  className="flex items-center justify-center "
                >
                  <Button text={"SEE ALL USERS"} className={""} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
