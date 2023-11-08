import React, { useState, useEffect } from "react";
import Breadcrumb from "../../Components/Breadcrumb";
import RecentSaleTable from "../../Components/Sale/RecentSaleTable";

const Recent = () => {
  return (
    <>
      {/* path breadcrumbs */}

      <div>
        <Breadcrumb
          showBtn={true}
          icon={false}
          btnText={"Go to Shop"}
          title={"Recent"}
          firstRoute={"Sale"}
          secondRoute={"Recent"}
        />
      </div>
      <RecentSaleTable />
      {/* path breadcrumbs */}
    </>
  );
};

export default Recent;
