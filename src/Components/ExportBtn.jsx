import React from "react";
import { PiExportDuotone } from "react-icons/pi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
// import * as fileSaver from "file-saver";
// import XLSX from "sheetjs-style";

const ExportBtn = (
  // { excelData, fileName }
  ) => {
  // const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"; // Corrected MIME type
  // const fileExtension = ".xlsx";

  // const exportToExcel = async () => {
  //   const ws = XLSX.utils.json_to_sheet(excelData);
  //   const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  //   const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  //   const data = new Blob([excelBuffer], { type: fileType });
  //   fileSaver.saveAs(data, fileName + fileExtension);
  // };

  return (
    <div title="Excel Export">
      <button
        // onClick={() => exportToExcel()} // Removed the argument
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="text-white border border-[#7E7F80] font-medium rounded-lg text-sm px-5 py-3.5 text-center inline-flex items-center"
        type="button"
      >
        <PiExportDuotone className="text-[#8AB4F8] h-5 w-5 me-2" />
        Export
        <MdOutlineKeyboardArrowDown className="h-5 w-5 ms-2" />
      </button>
    </div>
  );
};

export default ExportBtn;
