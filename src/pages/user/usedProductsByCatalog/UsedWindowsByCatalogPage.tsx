import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import HeaderResponsive from '../../../components/UserPage/HeaderResponsive';
import { Sale } from '../../../assets/image-represent';
import { Button } from 'react-daisyui';
import { FaRegEye } from 'react-icons/fa';
import { Placeholder } from 'semantic-ui-react';
import { WindowsContext } from '../../../context/windows/WindowsContext';
import { slugify } from '../../../components/utils/slugify';
import { scrollToTopSmoothly } from '../../../components/utils/scrollToTopSmoothly';

const UsedWindowsByCatalogPage = () => {
  const { windows, getAllWindows, updateWindowsView } =
    useContext(WindowsContext);
  const [loading, setLoading] = useState(true);
  const { catalog } = useParams();
  const filteredPhones = windows.filter(
    win => slugify(win?.windows_name) === catalog
  );

  useEffect(() => {
    scrollToTopSmoothly();
    if (windows.length === 0) {
      const fetchData = async () => {
        setLoading(true);
        await getAllWindows();
        setLoading(false);
      };

      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div>
      <HeaderResponsive Title_NavbarMobile="Laptop" />
      <div className="py-[60px] xl:pt-0">
        <div className="breadcrumbs px-[10px] py-2 text-sm text-black shadow xl:px-desktop-padding">
          <ul className="font-light">
            <li>
              <Link role="navigation" aria-label="Trang chủ" to="/">
                Trang Chủ
              </Link>
            </li>
            <li>
              <Link role="navigation" aria-label="Laptop" to="">
                Laptop
              </Link>
            </li>
          </ul>
        </div>
        {/*  */}
        <div className="space-y-10 px-2 xl:px-desktop-padding">
          <div className="mt-5 w-full">
            <div className="grid grid-flow-row grid-cols-2 items-start gap-[10px] md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7">
              {loading ? (
                Array.from({ length: 12 }).map((_, index) => (
                  <div key={index} className="w-[195px] p-2">
                    <Placeholder>
                      <Placeholder.Image square />
                      <Placeholder.Line />
                      <Placeholder.Line length="full" />
                      <Placeholder.Line length="full" />
                    </Placeholder>
                  </div>
                ))
              ) : filteredPhones.length > 0 ? (
                filteredPhones.map(win => {
                  const winUrl = slugify(win.windows_name);
                  return (
                    <section
                      onClick={() => updateWindowsView(win._id)}
                      key={win?._id}
                      className="group relative flex h-full flex-col justify-between rounded-md border border-white text-black"
                    >
                      <Link
                        role="navigation"
                        aria-label="Chi tiết sản phẩm"
                        className="flex h-full w-full items-center justify-center rounded-md rounded-b-none bg-white"
                        to={`/windows/${winUrl}/${win?._id}`}
                      >
                        <div className="relative h-[200px] w-full overflow-hidden">
                          <img
                            alt="Hình ảnh"
                            loading="lazy"
                            className="absolute left-0 top-0 z-0 h-full w-full rounded-[5px] rounded-b-none object-cover blur-sm filter"
                            src={win?.windows_img}
                          />
                          <img
                            alt="Hình ảnh"
                            loading="lazy"
                            className="absolute left-0 top-0 z-10 h-full w-full rounded-[5px] rounded-b-none object-contain transition-transform duration-1000 ease-in-out hover:scale-110"
                            src={win?.windows_img}
                          />
                        </div>
                      </Link>
                      {/*  */}
                      <div className="flex flex-col items-start justify-center gap-1 p-1">
                        <Link to={`/iwindows/${winUrl}/${win?._id}`}>
                          <div className="flex w-[50px] items-center justify-start gap-1 rounded-sm p-[2px] text-center text-[12px] text-black">
                            <FaRegEye />
                            <p>{win.windows_view}</p>
                          </div>
                          <p className="xl:group-hover:text-secondary">
                            Laptop {win?.windows_name}
                          </p>
                          <p className="font-[500] text-red-700">
                            {(win?.windows_price * 1000).toLocaleString(
                              'vi-VN'
                            )}
                            ₫ &nbsp;
                            <del className="text-xs text-gray-400">
                              {win?.windows_sale &&
                                `${(win?.windows_sale * 1000).toLocaleString(
                                  'vi-VN'
                                )}₫`}
                            </del>
                          </p>
                        </Link>
                        <Link
                          role="navigation"
                          aria-label="Mua ngay"
                          to="/thanh-toan"
                          className="z-50 w-full"
                        >
                          <Button
                            size="xs"
                            className="w-full rounded-md border-none bg-primary bg-opacity-10 text-primary hover:bg-primary hover:bg-opacity-20"
                          >
                            Mua Ngay
                          </Button>
                        </Link>
                      </div>
                      {/*  */}
                      {win?.windows_status && (
                        <div className="absolute -left-[3px] top-0 z-20">
                          <img alt="" loading="lazy" width={60} src={Sale} />
                          <p className="absolute top-[1px] w-full pl-1 text-xs text-white">
                            {win?.windows_status}
                          </p>
                        </div>
                      )}
                    </section>
                  );
                })
              ) : (
                <div className="col-span-full text-center text-2xl">
                  Rất tiếc. Không tìm thấy sản phẩm nào!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsedWindowsByCatalogPage;
