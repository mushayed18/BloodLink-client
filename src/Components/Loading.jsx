const Loading = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex text-3xl">
                <h1>Loading</h1>
                <span className="loading loading-spinner loading-lg text-sky-500"></span>
            </div>
        </div>
    );
};

export default Loading;