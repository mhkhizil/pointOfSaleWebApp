import Cookies from "js-cookie";
import React, { useRef, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button";
import { useAddingStockQuantityMutation } from "../../Feature/API/productApi";
import { toast } from "react-toastify";
import { useCreateBrandMutation } from "../../Feature/API/brandApi";
import { MdOutlineEdit } from "react-icons/md";
import { useGetMediaQuery } from "../../Feature/API/mediaApi";
import { RxCross1 } from "react-icons/rx";

const BrandAdding = () => {
    const fileInputRef = useRef(null);
    const uploadPhoto = () => {
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
      };
     
 
  const nav = useNavigate();
  const token = Cookies.get("token");
  const { data } = useGetMediaQuery(token);
  const [addBrand] = useCreateBrandMutation();
  const image = data?.data.map((i) => i);
  const [brandData, setBrandData] = useState({
    name: null,
    company: null,
    information: null,
    photo: null,
    agent: null,
    phone: null,
  });
  const [show, setShow] = useState(false);
  const toggleShow = () => {
    setShow(!show);
  };
  console.log(brandData);
  const handleCreateBrand= async (e) => {
      e.preventDefault();
     const brand =await addBrand({token,brandData})
      console.log(brand?.data.message)
     if(brand?.data.error){
      console.log('error',error);
     }else{
      console.log(brand?.data.message);
      nav('/brand-overview');
      toast.success("Brand added! !", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 2000,

        hideProgressBar: true,
        theme: "dark",
      });
     }
    };
  return (
    <div>
         <div
        className={`${
          show ? "scale-y-1" : "scale-y-0"
        } transition-all duration-400 origin-center absolute z-20 items-center bg-[#202124] justify-center`}
      >
         <main className="w-[46.5rem] h-fit bg-transparent flex justify-center absolute border">
      <div className={`w-full bg-[#161618]`}>
        <div className="flex w-full items-center justify-between p-5">
          <h4>Select an Image</h4>
          <RxCross1 onClick={toggleShow} className="cursor-pointer" />
        </div>
        <div className="p-5 w-full bg-[#202124] flex flex-wrap gap-5">
          <div className="flex flex-col w-40 h-36 rounded border justify-center items-center gap-2">
            <div className="w-16 h-16 p-3 flex justify-center items-center bg-[#323336] rounded-full ">
              <img
                className={`w-full h-full border border-dashed bg-[#434446] rounded-full p-2`}
                src={`https://img.icons8.com/?size=512&id=ddNYRJULh0RO&format=png`}
                alt=""
              />
            </div>
            <div>
              <p
                onClick={uploadPhoto}
                className="text-sm text-blue-600 underline cursor-pointer"
              >
                upload
              </p>
              <input
                ref={fileInputRef}
                // onChange={(e) =>
                //   e.target.files &&
                //   dispatch(addPhoto({ user_photo: e.target.files[0] }))
                // }
                className="file hidden"
                type="file"
              />
            </div>
            <div>
              <img src="" alt="" />
            </div>
          </div>
          {image?.map((i) => {
            return (
              <div onClick={() => {
                toggleShow();
                setBrandData((prevState) => ({
                    ...prevState,
                    photo: i.url,
                  }))
               }}
                key={i.id}
                className="flex flex-col w-40 h-36 rounded overflow-hidden cursor-pointer justify-center items-center gap-2"
              >
                <img
                  className={`w-full h-full object-cover`}
                  src={i.url}
                  alt=""
                />
              </div>
            );
          })}
        </div>
      </div>
    </main>
      </div>
      <section className={`flex flex-col gap-5 bg-[#161618] p-10 w-full`}>
       <div className=" w-[100% flex justify-center items-center my-6">
       <div
          className={`w-40 h-40 relative rounded-full border-2 border-dashed flex justify-center items-center`}
        >
          <img
            className={`w-full h-full object-cover rounded-full`}
            src={brandData?.photo ? brandData.photo :`https://cdn.shopify.com/s/files/1/0513/1226/3362/products/Asset2_grande.jpg?v=1619802039`}
            alt=""
          />
          <div
            onClick={toggleShow}
            className={`flex justify-center cursor-pointer z-50 absolute bg-slate-50 text-slate-900 right-3  bottom-1 items-center text-xs gap-1 border-2 rounded-full w-8 h-8 px-1 py-0.5`}
          >
            <MdOutlineEdit />
          </div>
        </div>
       </div>
        <div className="flex">
          <label className="w-[30%]">Brand Name:</label>

          <input
            onChange={(e) =>
                setBrandData((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }))
            }
            placeholder="Enter your Stock of product"
            className={`w-[70%] outline-none border rounded px-5 py-2`}
            type="text"
            name=""
            id=""
          />
        </div>

        <div className="flex">
          <label className="w-[30%]">Company Name:</label>

          <input
            onChange={(e) =>
                setBrandData((prevState) => ({
                    ...prevState,
                    company: e.target.value,
                  }))
            }
            placeholder="Enter your Stock of product"
            className={`w-[70%] outline-none border rounded px-5 py-2`}
            type="text"
            name=""
            id=""
          />
        </div>

        <div className="flex">
          <label className="w-[30%]">Agent:</label>

          <input
            onChange={(e) =>
                setBrandData((prevState) => ({
                    ...prevState,
                    agent: e.target.value,
                  }))
            }
            placeholder="Enter your Stock of product"
            className={`w-[70%] outline-none border rounded px-5 py-2`}
            type="text"
            name=""
            id=""
          />
        </div>

        <div className="flex">
          <label className="w-[30%]">Phone:</label>

          <input
            onChange={(e) =>
                setBrandData((prevState) => ({
                    ...prevState,
                    phone: e.target.value,
                  }))
            }
            placeholder="Enter your Stock of product"
            className={`w-[70%] outline-none border rounded px-5 py-2`}
            type="number"
            name=""
            id=""
          />
        </div>

        <div className="flex">
          <label className="w-[30%]">Description:</label>
          <textarea
            onChange={(e) =>
                setBrandData((prevState) => ({
                    ...prevState,
                    information: e.target.value,
                  }))
            }
            rows={3}
            placeholder="Enter more info about the product"
            className={`w-[70%] bg-[#202124] outline-none border rounded px-5 py-2`}
            type="phone"
            name=""
            id=""
          />
        </div>
        <div
          onClick={handleCreateBrand}
          className="w-[100%]  mt-6 flex items-center justify-center cursor-pointer"
        >
          <Button icon={true} text={"Add Stock"} />
        </div>
      </section>
    </div>
  );
};

export default BrandAdding;
