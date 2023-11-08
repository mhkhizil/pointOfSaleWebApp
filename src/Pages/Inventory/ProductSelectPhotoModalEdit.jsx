
import Cookies from "js-cookie";
import React, { useEffect, useRef } from "react";
import { RxCross1 } from "react-icons/rx";
import { useGetMediaQuery } from '../../Feature/API/mediaApi'
import { useDispatch, useSelector } from "react-redux";
import { addProductPhoto } from "../../Feature/Service/productSlice";
const ProductSelectPhotoModalEdit = ({toggleShow,editProduct,setEditProduct }) => {
    const token = Cookies.get("token");
    const fileInputRef = useRef(null);
    const dispatch = useDispatch()
    const uploadPhoto = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };
    useEffect(()=>{
      console.log(editProduct?.photo);
      dispatch(addProductPhoto({photo:editProduct?.photo}))
     
      },[editProduct]);
      useSelector(state=>console.log(state?.productSlice?.photo))
    const { data } = useGetMediaQuery(token);
    const image = data?.data.map((i) => i);
    console.log(image);
  return (
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
                toggleShow()
                setEditProduct((prevState) => ({
                  ...prevState,
                  photo: i.url
                }))
               }}
                key={i.id}
                className="flex flex-col w-40 h-36 rounded overflow-hidden cursor-pointer justify-center items-center gap-2"
              >
                <img onChange={()=>{
                  
                }}
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
  )
}

export default ProductSelectPhotoModalEdit
