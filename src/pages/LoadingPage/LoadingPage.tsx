import BarLoader from 'react-spinners/BarLoader';
import { Logo } from '../../assets/images';

function LoadingPage({ loading }: { loading: boolean }) {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center bg-white py-16">
      <div className="mt-8 flex flex-col items-center">
        <img src={Logo} className="w-[200px] animate-bounce rounded-full" />
        <BarLoader width={200} loading={loading} color="#e00303" />
      </div>
    </div>
  );
}

export default LoadingPage;
