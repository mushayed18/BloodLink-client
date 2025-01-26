import { Puff } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Puff
        visible={true}
        height="80"
        width="80"
        color="red"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loading;
