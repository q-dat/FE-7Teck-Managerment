import BarLoader from 'react-spinners/BarLoader';

function LoadingPage({ loading }: { loading: boolean }) {
  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center bg-white py-16">
      <div className="mt-8 flex flex-col items-center">
        <p className="text-sm text-gray-600">Vui lòng chờ...</p>
        <BarLoader width={200} loading={loading} color="#e00303" />
      </div>
    </div>
  );
}

export default LoadingPage;
