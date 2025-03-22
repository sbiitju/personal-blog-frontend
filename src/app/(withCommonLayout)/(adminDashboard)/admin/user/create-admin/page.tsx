import { HiOutlineUserCircle } from "react-icons/hi2";

const CreateAdmin = () => {
  return (
    <div className="w-full min-h-[calc(100vh-30px)] flex justify-center items-center">
      <div className="max-w-5xl flex flex-col md:flex-row md:items-center gap-7 md:gap-10 md:shadow-2xl rounded-lg p-2 md:p-6">
        <div className="space-y-4 flex flex-col justify-center items-center">
          <HiOutlineUserCircle className="text-[150px]" />
          <h1 className="text-4xl xl:text-5xl font-bold text-center">
            Create Admin
          </h1>
          <p className="text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, eum.
            Lorem ipsum dolor sit amet consectetur adipisicing elit
          </p>
        </div>
        <div className="bg-white min-h-[450px] min-w-[360px] lg:min-w-[400px] flex items-center rounded-lg">
          <form className="space-y-3 w-full">
            <h2 className="font-bold text-xl md:text-2xl">Create an Account</h2>
            <div>
              <p className="mb-2">Enter Your Name</p>
              <input
                className="p-2 w-full outline-blue-500 border-2 rounded-lg"
                type="text"
                required
              />
            </div>
            <div>
              <p className="mb-2">Enter Your Email</p>
              <input
                className="p-2 w-full outline-blue-500 border-2 rounded-lg"
                type="email"
                required
              />
            </div>
            <div>
              <p className="mb-2">Enter Your Phone</p>
              <input
                className="p-2 w-full outline-blue-500 border-2 rounded-lg"
                type="number"
                required
              />
            </div>
            <div>
              <p className="mb-2">Enter Domain</p>
              <input
                className="p-2 w-full outline-blue-500 border-2 rounded-lg"
                type="text"
                required
              />
            </div>
            <button className="bg-blue-600 hover:bg-gray-300 hover:text-black text-white font-bold uppercase rounded-lg py-2 text-center w-full cursor-pointer transition-all duration-300">
              Create Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAdmin;
