import React, { useState } from "react";
import { BsArrowRight, BsDash } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import Breadcrumb from "../../Components/Breadcrumb";
import Pagination from "../../Components/Pagination";
import Cookies from "js-cookie";
import {
  useBannedUserQuery,
  useGetAllUsersQuery,
  useRetoreSingleUserMutation,
} from "../../Feature/API/userApi";
import { useNavigate } from "react-router-dom";
import ManageOverview from "../../Components/ManageOverview";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function BannedUser() {
  const token = Cookies.get("token");
  const [sort, setSort] = useState("asc");
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("name");
  const nav = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useBannedUserQuery({
    token,
    currentPage,
    search,
    orderBy,
    sort,
  });
  const users = data?.users.data;
  console.log(data);
  const [restoreUser]=useRetoreSingleUserMutation();
  const handleRestoreUser=async(id,token)=>{
    Swal.fire({
      title: `Are you sure you want to restore this user?`,
      icon: "question",
      iconColor: "#8AB4F8",
      background: "#161618",
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: "#649cf5",
      cancelButtonColor: "#24262b",
      confirmButtonText: `RESTORE`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const resulted = await restoreUser({ id, token });
          console.log(resulted);
  
          if (resulted.error) {
            // Handle any errors here
            console.error("Error deleting user:", resulted.error);
          } else {
            // Handle success, e.g., update your component state
            toast.success("User restored successfuly!", {
              position: toast.POSITION.BOTTOM_CENTER,
              autoClose: 2000,
  
              hideProgressBar: true,
              theme: "dark",
            });
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }
    });
  
  }

  return (
    <>
      {/* path breadcrumbs */}
      <div>
        <Breadcrumb
          showBtn={true}
          createUser={true}
          icon={true}
          btnText={"Create user"}
          title={"User"}
          firstRoute={"User"}
          secondRoute={"Banned"}
        />
      </div>
      {/* path breadcrumbs */}
      <div>
        <ManageOverview
          tableType={"Banned User Overview"}
          setOrderBy={setOrderBy}
          setSort={setSort}
          search={search}
          setSearch={setSearch}
        />
      </div>
      <main className="border border-[#3f4245] rounded-sm mt-7">
        <table className="w-full text-sm text-center text-[#f5f5f5]">
          <thead className="text-xs text-[#f5f5f5] uppercase">
            <tr className="border-b border-[#3f4245]">
              <th className="px-6 py-4">No.</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Position</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="text-[#f5f5f5]">
            {users?.map((i, index) => {
              return (
                <tr key={i.id} className="border-b border-[#3f4245]">
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{i?.name}</td>
                  <td className="px-6 py-3">{i?.role}</td>
                  <td className="px-6 py-3">{i?.email}</td>
                  <td className="px-6 py-3">
                    <button onClick={()=>handleRestoreUser(i?.id,token)} className="text-[#e8eaed] text-sm px-4 py-1 rounded border border-[#3f4245] hover:bg-[#161618] transition-all">
                      RESTORE
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
      <div className="py-5">
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          last_page={data?.users?.last_page}
        />
      </div>
    </>
  );
}
