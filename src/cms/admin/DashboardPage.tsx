import React from 'react';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import NavbarAdmin from '../../components/admin/responsiveUI/mobile/NavbarAdminMobile';

interface DashboardCardProps {
  Icons: React.ReactNode;
  Value: string;
  Label: string;
  Percentage: string;
  isLoading: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ Icons, Value, Label, Percentage, isLoading }) => {
  return (
    <div className="flex w-full flex-row items-center justify-center rounded-lg bg-white to-primary to-90% p-7 shadow-md md:space-x-4">
      <img loading="lazy" width={`50px`} height={`auto`} src={`${Icons}`} alt="" />
      <div className="text-start">
        {isLoading ? (
          <div className="text-md font-semibold text-black">Đang tải...</div>
        ) : (
          <>
            <div className="text-xl font-semibold text-black">{Value}</div>
            <div className="text-xs text-gray-800">{Label}</div>
            <div className="text-[10px] text-gray-800">{Percentage}</div>
          </>
        )}
      </div>
    </div>
  );
};

const DashboardPage: React.FC<{}> = () => {
  return (
    <div className="w-full pb-10 xl:pb-0">
      <NavbarAdmin Title_NavbarAdmin="Dashboard" />
      <div className="">
        <NavtitleAdmin Title_NavtitleAdmin={'Dashboard'} Btn_Create={``} />

        <div className="grid grid-cols-2 gap-4 px-2 md:grid-cols-4 xl:px-0">
          <DashboardCard
            Icons="https://cdn-icons-png.flaticon.com/128/4394/4394574.png"
            Label="Danh sách"
            Percentage="4% (30 days)"
            Value={'1'}
            isLoading={false}
          />
          <DashboardCard
            Icons="https://cdn-icons-png.flaticon.com/128/3082/3082854.png"
            Label="Danh sách"
            Percentage="4% (30 days)"
            Value={'2'}
            isLoading={false}
          />
          <DashboardCard
            Icons="https://cdn-icons-png.flaticon.com/128/9028/9028221.png"
            Percentage="25% (30 days)"
            Value={'3'}
            Label={'Danh sách'}
            isLoading={false}
          />
          <DashboardCard
            Icons="https://cdn-icons-png.flaticon.com/128/4256/4256900.png"
            Label="Danh sách"
            Percentage="12% (30 days)"
            Value={'4'}
            isLoading={false}
          />
        </div>

        {/* Title */}
        <div className="flex flex-col px-2 py-6 xl:px-0">
          <h1 className="text-[25px] font-bold text-black dark:text-white">Danh sách tạo gần đây</h1>
          <p className="text-xs text-gray-500">Xem danh sách tạo gần đây.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
