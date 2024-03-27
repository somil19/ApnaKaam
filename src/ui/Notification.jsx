/* eslint-disable react/no-unescaped-entities */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  setNotification,
  setNotificationTime,
  setTodoTitle,
} from "../features/Todo/todoFormSlice";
import { faClock, faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

export default function Notification() {
  const dispatch = useDispatch();
  const todoTitle = useSelector((state) => state.todoForm.todoTitle);
  const notificationTime = useSelector(
    (state) => state.todoForm.notificationTime
  );
  function handleNotification() {
    dispatch(setNotification());
    dispatch(setTodoTitle(""));
    dispatch(setNotificationTime(""));
  }
  return (
    <div className="flex justify-center items-center fixed inset-0  bg-gray-900 bg-opacity-50  ">
      <div className="overflow-hidden bg-gray-100 relative text-left border rounded-md max-w-[340px] shadow-md ">
        <button
          className="absolute right-2 top-2 flex justify-center items-center p-1 rounded-full bg-gray-100 h-8 w-8  transition ease-in duration-300 hover:bg-gray-200"
          type="button"
          onClick={handleNotification}
        >
          <FontAwesomeIcon icon={faSquareXmark} size="xl" />
        </button>
        <div className="p-4">
          <div className="flex mx-auto bg-red-400 border-2 border-white flex-shrink-0 justify-center items-center w-28 h-28 rounded-full  ">
            <FontAwesomeIcon icon={faClock} size="5x" className="text-white " />
          </div>

          <div className="text-center mt-3  bg-[#2a6f97] p-3 rounded-lg shadow-xl">
            <span className=" rounded text-2xl text-white   leading-10">
              “Don’t forget: Your Kaam at {notificationTime} !"
            </span>

            <p className="mt-4 text-xl font-bold text-gray-700 bg-[#fdf0d5] rounded-full p-2 leading-tight">
              "{todoTitle}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
