import React from 'react'
import Button from '../../Components/Button'
import { MdOutlineEdit } from 'react-icons/md'
import { useSelector } from 'react-redux'

const ThirdStepEdit = ({toggleShow}) => {
  const {photo} = useSelector(state => state.productSlice)
  console.log(photo)
  
  return (
    <div>
    <section
          className={`w-full bg-[#161618]`}
        >
          <div className="w-full flex flex-col items-center justify-center ">
            <h2 className="my-10">Upload Photo</h2>
            <div
              className={`w-40 h-40 relative rounded-full border-2 border-dashed p-1 flex justify-center items-center`}
            >
              <img
                 className={`w-full h-full object-cover rounded-full`}
                src={photo ? photo : `https://img.icons8.com/?size=512&id=108652&format=png`}
                alt=""
              />
              <div
                onClick={toggleShow}
                className={`flex justify-center cursor-pointer absolute bg-[#202124] right-3  bottom-1 items-center text-xs gap-1 border-2 rounded-full w-8 h-8 px-1 py-0.5`}
              >
                <MdOutlineEdit />
                <input className="file hidden" type="file" name="" id="" />
              </div>
            </div>
            <div className="my-10">
              <Button
                text={"Clear Photo"}
                className={`border border-gray-400 `}
              />
            </div>
          </div>
        </section>
</div>
  )
}

export default ThirdStepEdit
