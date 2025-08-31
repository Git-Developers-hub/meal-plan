const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="w-12 h-12 border-4 border-t-transparent border-pink-500 border-solid rounded-full animate-spin"></div>

      <p className="mt-4 text-lg font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
        Loading delicious recipes...
      </p>
    </div>
  );
};

export default Loader;
