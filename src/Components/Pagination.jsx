import React from 'react'
import { BiChevronLeft, BiChevronRight, BiChevronsLeft, BiChevronsRight } from 'react-icons/bi'

export default function Pagination({currentPage, last_page, setCurrentPage}) {
  return (
    <div>
        <section className="  flex items-center justify-end w-full">
          <div className="flex items-center border border-[#3f4245] rounded ">
            <BiChevronsLeft
              onClick={() => currentPage > 1 && setCurrentPage(1)}
              className={`${
                currentPage === 1 && "text-slate-500"
              } cursor-pointer  w-8 h-7 p-1`}
            />
            <BiChevronLeft
              onClick={() =>
                currentPage > 1 && setCurrentPage((prevPage) => prevPage - 1)
              }
              className={`${
                currentPage === 1 && "text-slate-500"
              } cursor-pointer border-x border-[#3f4245] w-8 h-7 p-1`}
            />
            <p className=" px-5">{`${currentPage}  -  ${last_page== undefined ? `loading..`:  last_page}`}</p>
            <BiChevronRight
              onClick={() =>
                currentPage < last_page &&
                setCurrentPage((prevPage) => prevPage + 1)
              }
              className={`${
                currentPage === last_page && "text-slate-500"
              } cursor-pointer border-x border-[#3f4245] w-8 h-7 p-1`}
            />
            <BiChevronsRight
              onClick={() =>
                currentPage < last_page &&
                setCurrentPage(last_page)
              }
              className={`${
                currentPage === last_page && "text-slate-500"
              } cursor-pointer  w-8 h-7 p-1`}
            />
          </div>
        </section>
    </div>
  )
}
