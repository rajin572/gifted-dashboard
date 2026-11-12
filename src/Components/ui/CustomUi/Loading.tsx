import SpinLoader from "./SpinLoader";

const Loading = () => {
  return (
    <div className="isolate h-screen w-full bg-primary-color/40 backdrop-blur flex justify-center items-center">
      <SpinLoader />
    </div>
  );
};

export default Loading;
