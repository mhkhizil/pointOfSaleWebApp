import React, { useEffect, useState } from "react";
import { BsArrowRight, BsDash } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import Breadcrumb from "../../Components/Breadcrumb";
import Pagination from "../../Components/Pagination";
import Cookies from "js-cookie";
import { useBanSingleUserMutation, useDeleteUserMutation, useGetAllUsersQuery } from "../../Feature/API/userApi";
import { useNavigate } from "react-router-dom";
import ManageOverview from "../../Components/ManageOverview";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function UserList() {
  const token = Cookies.get("token");
  const nav = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [sort,setSort]=useState("asc");
  const [search,setSearch]=useState("");
  const [orderBy,setOrderBy]=useState("name");
  const { data } = useGetAllUsersQuery({ token, currentPage,search,orderBy,sort });
  const [banUser]=useBanSingleUserMutation();
  const users = data?.users.data;
  console.log(data);
const handleDeleteUser=async(id,token)=>{
  Swal.fire({
    title: `Are you sure you want to ban this user?`,
    icon: "question",
    iconColor: "#d33",
    background: "#161618",
    showCancelButton: true,
    showCloseButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#24262b",
    confirmButtonText: `BAN`,
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const resulted = await banUser({ id, token });
        console.log(resulted);

        if (resulted.error) {
          // Handle any errors here
          console.error("Error deleting user:", resulted.error);
        } else {
          // Handle success, e.g., update your component state
          toast.success("User deleted successfuly!", {
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
console.log(data);
const lastPage=data?.users?.last_page;

console.log("Sort"+ sort);
console.log("order"+ orderBy)


 

  return (
    <>
      {/* path breadcrumbs */}
      <div>
        <Breadcrumb
           showBtn={true} createUser={true}
          icon={true}
          btnText={"Create user"}
          title={"User"}
          firstRoute={"User"}
          secondRoute={"Overview"}
        />
      </div>
      {/* path breadcrumbs */}
      <div>
        <ManageOverview tableType={"Staff Overview"} setOrderBy={setOrderBy} setSort={setSort} search={search} setSearch={setSearch} />
      </div>
      <main className="border border-[#3f4245] rounded-sm mt-7">
        <table className="w-full text-sm text-center text-[#f5f5f5]">
          <thead className="text-xs text-[#f5f5f5] uppercase"
          >
            <tr className="border-b border-[#3f4245]">
              <th className="px-6 py-4" >No.</th>
              <th className="px-6 py-4" >Name</th>
              <th className="px-6 py-4" >Position</th>
              <th className="px-6 py-4" >Email</th>
              <th className="px-6 py-4" ></th>
            </tr>
          </thead>
          <tbody className="text-[#f5f5f5]">
            {users?.map((i,index)=>{
              return(
                <tr key={i.id} className="border-b border-[#3f4245]">
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3">{i.name}</td>
                <td className="px-6 py-3">{i.role}</td>
                <td className="px-6 py-3">{i.email}</td>
                <td  className="flex gap-5 px-6 py-3">
                  <BsDash onClick={()=>{handleDeleteUser(i.id,token)}} className="text-3xl hover:bg-gray-50 hover:text-gray-500 rounded-full bg-gray-500 text-gray-50 p-1.5 cursor-pointer transition-all duration-200 ease-in" />
                  <MdOutlineEdit
                    onClick={() => nav(`/edit-user/${i.id}`)}
                    className="text-3xl hover:bg-gray-50 hover:text-gray-500 rounded-full bg-gray-500 text-gray-50 p-1.5 cursor-pointer transition-all duration-200 ease-in"
                  />
                  <BsArrowRight
                    onClick={() => nav(`/user-detail/${i.id}`)}
                    className="text-3xl hover:bg-gray-50 hover:text-gray-500 rounded-full bg-gray-500 text-gray-50 p-1.5 cursor-pointer transition-all duration-200 ease-in"
                  />
                </td>
              </tr>
              )
            })}
          </tbody>
        </table>
      </main>
      <div>

      <div className="flex justify-end my-3 ">
        
        <div className=" py-5">
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
              last_page={lastPage}
        />
        </div>
      </div>
       
      </div>
    </>
  );
}
