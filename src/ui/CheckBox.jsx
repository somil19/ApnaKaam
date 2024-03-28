/* eslint-disable react/prop-types */
// export default function CheckBox() {
//   return (
//     <div className="relative">
//       <div className="cbx">
//         <input
//           checked=""
//           type="checkbox"
//           id="cbx-12"
//           className="appearance-none cursor-pointer m-0 outline-none w-6 h-6 absolute top-0 left-0 border-2 border-gray-400 rounded-full"
//         />
//         <label
//           htmlFor="cbx-12"
//           className="w-6 h-6 bg-none rounded-full absolute top-0 left-0 transform-gpu pointer-events-none"
//         ></label>
//         <svg
//           fill="none"
//           viewBox="0 0 15 14"
//           height="14"
//           width="15"
//           className="absolute top-1.5 left-1 z-10 pointer-events-none"
//         >
//           <path
//             d="M2 8.36364L6.23077 12L13 2"
//             className="stroke-white stroke-3 stroke-linecap-round stroke-linejoin-round stroke-dasharray-19 stroke-dashoffset-19 transition-all ease-out duration-300 delay-200"
//           ></path>
//         </svg>
//       </div>

//       <svg
//         version="1.1"
//         xmlns="http://www.w3.org/2000/svg"
//         className="absolute top-[-130%] left-[-170%] w-28 pointer-events-none"
//       >
//         <defs>
//           <filter id="goo-12">
//             <feGaussianBlur
//               result="blur"
//               stdDeviation="4"
//               in="SourceGraphic"
//             ></feGaussianBlur>
//             <feColorMatrix
//               result="goo-12"
//               values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
//               mode="matrix"
//               in="blur"
//             ></feColorMatrix>
//             <feBlend in2="goo-12" in="SourceGraphic"></feBlend>
//           </filter>
//         </defs>
//       </svg>
//     </div>
//   );
// }

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTodo } from "../features/todoSlice";

function CheckBox({ id, day }) {
  const dispatch = useDispatch();
  const todayTodos = useSelector((state) =>
    state.todo.todos
      .filter((todo) => todo.day === day)
      .find((todo) => todo.id === id)
  );

  const [isChecked, setIsChecked] = useState(todayTodos.completed);
  // console.log(todayTodos.title, todayTodos.completed);
  const handleToggleTodo = () => {
    setIsChecked((pre) => !pre);
    dispatch(toggleTodo(id));
  };

  return (
    <div className="relative">
      {isChecked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6 text-green-500 cursor-pointer"
          onClick={handleToggleTodo}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        <input
          type="checkbox"
          checked={isChecked}
          className=" cursor-pointer form-checkbox h-6 w-6 text-gray-400 rounded-full border-2 border-gray-400 focus:outline-none focus:border-indigo-500"
          onChange={handleToggleTodo}
        />
      )}
    </div>
  );
}

export default CheckBox;
