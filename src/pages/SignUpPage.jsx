/* eslint-disable react/no-unescaped-entities */
import apnaKaam from "../assets/apna-kaam.png";
import { useDispatch, useSelector } from "react-redux";
import { signUpSuccess, updateName } from "./signUpSlice";
import AvatarSelect from "../components/AvatarSelect";
import { useNavigate } from "react-router-dom";
import begin from "../assets/begin.mp3";
// import { useNavigate } from "react-router-dom";
export default function SignUpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector((state) => state.signUp.userName);
  const beginSound = new Audio(begin);
  const handleUserName = (e) => {
    //console.log(e.target.value);
    dispatch(updateName(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    beginSound.play();
    dispatch(signUpSuccess(true));
    navigate("/welcome");
  };

  return (
    <div>
      {/* Radhe Radhe! */}
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="mt-12 flex flex-col items-center">
              <img src={apnaKaam} alt="" height="500px" width="300px" />{" "}
              <div className="w-full flex flex-col justify-center items-center mt-10">
                {" "}
                <AvatarSelect />
              </div>
              <div className="w-full  mt-10">
                <form className="mx-auto max-w-xs" onSubmit={handleSubmit}>
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="Name"
                    value={userName}
                    onChange={handleUserName}
                    required
                  />

                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span className="ml-3">Let's Begin</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-indigo-100 text-end hidden  lg:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  " url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg'",
              }}
            >
              <span className="text-3xl font-mono font-semibold bg-purple-300 py-2 px-6 rounded-full">
                APNA TIME AYEGA !
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
