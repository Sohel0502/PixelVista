import React from 'react'
import DashboardSidebar from '../components/DashboardSidebar'
import PhotoManagement from '../components/seller/PhotoManagement'
import Analytic from "../components/Analytic";
import Orders from "../components/Orders";
import { useSelector } from "react-redux";


const SellerDashboard = () => {
  const tab = useSelector((state) => state.nav.tab);
  
  return (
    <div className="flex flex-col sm:flex-row">
      <DashboardSidebar />
      <div>
        {(() => {
          switch (tab) {
            case "photos-management":
              return <PhotoManagement />;
            case "analytic":
              return <Analytic />;
            case "orders":
              return <Orders />;

            default:
              return <PhotoManagement />;
          }
        })()}
      </div>
    </div>
  );
}

export default SellerDashboard;