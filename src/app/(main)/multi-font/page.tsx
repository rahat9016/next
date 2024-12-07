const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-6 p-6 bg-white rounded-lg shadow-lg max-w-3xl">
        <p className="text-4xl font-bold text-gray-800">Font Showcase</p>
        <p className="text-lg text-gray-600">
          Explore the different fonts applied to the text below:
        </p>
        <div className="flex flex-col gap-4 text-center w-full">
          <p className="text-gray-800 text-4xl font-bold ">Default Poppins Font</p>
          <p className="comfortaa text-secondary text-4xl font-bold ">
            This is Comfortaa Font
          </p>
          <p className="roboto text-cyan-700 text-4xl font-bold ">This is Roboto Font</p>
        </div>
      </div>
    </div>
  );
};

export default page;
