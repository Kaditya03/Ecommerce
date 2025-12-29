export default function Register() {
  return (
    <div className="flex h-[700px] w-full">
      <div className="w-full hidden md:inline-block">
        <img
          className="h-full"
          src="/images/login-left_img1.png"
          alt="leftSideImage"
        />
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        <form className="md:w-96 w-80 flex flex-col items-center justify-center">
          <h2 className="text-4xl text-gray-900 font-medium">Sign up</h2>
          <p className="text-sm text-gray-500/90 mt-3">
            Create your account to get started
          </p>

          <button
            type="button"
            className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full"
          >
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
              alt="googleLogo"
            />
          </button>

          <div className="flex items-center gap-4 w-full my-5">
            <div className="w-full h-px bg-gray-300/90"></div>
            <p className="w-full text-nowrap text-sm text-gray-500/90">
              or sign up with email
            </p>
            <div className="w-full h-px bg-gray-300/90"></div>
          </div>

          <div className="flex items-center w-full border border-gray-300/60 h-12 rounded-full pl-6 gap-2">
            <input
              type="text"
              placeholder="Full Name"
              className="bg-transparent text-gray-500/80 outline-none text-sm w-full h-full"
              required
            />
          </div>

          <div className="flex items-center mt-6 w-full border border-gray-300/60 h-12 rounded-full pl-6 gap-2">
            <input
              type="email"
              placeholder="Email id"
              className="bg-transparent text-gray-500/80 outline-none text-sm w-full h-full"
              required
            />
          </div>

          <div className="flex items-center mt-6 w-full border border-gray-300/60 h-12 rounded-full pl-6 gap-2">
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent text-gray-500/80 outline-none text-sm w-full h-full"
              required
            />
          </div>

          <div className="flex items-center mt-6 w-full border border-gray-300/60 h-12 rounded-full pl-6 gap-2">
            <input
              type="password"
              placeholder="Confirm Password"
              className="bg-transparent text-gray-500/80 outline-none text-sm w-full h-full"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90"
          >
            Sign Up
          </button>

          <p className="text-gray-500/90 text-sm mt-4">
            Already have an account?{" "}
            <a className="text-indigo-400 hover:underline" href="login">
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
