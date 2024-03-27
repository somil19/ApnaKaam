/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { VictoryPie } from "victory";
import AvatarSelect from "../components/AvatarSelect";
import { useState } from "react";
import { updateName } from "./signUpSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
function SummaryPage() {
  const dispatch = useDispatch();
  const [overAllPerformance, setOverAllPerformance] = useState(false);
  const userName = useSelector((state) => state.signUp.userName);
  const todos = useSelector((state) => state.todo.todos);
  const myDayTodos = todos.filter((todo) => todo.day === "today");
  const myDayCompletedCount = myDayTodos.filter(
    (todo) => todo.completed
  ).length;
  const myDayUncompletedCount = myDayTodos.filter(
    (todo) => !todo.completed
  ).length;
  const totalCompletedCount = todos.filter((todo) => todo.completed).length;
  const totalUncompletedCount = todos.filter((todo) => !todo.completed).length;
  return (
    <div className="min-h-screen flex items-center justify-center py-2 bg-gray-100">
      <div className="p-10 bg-white rounded-lg shadow-md md:w-1/2 w-full">
        <h1 className="text-3xl font-semibold underline text-center text-gray-700 tracking-widest">
          Your Profile
        </h1>
        <div className="w-full flex flex-col justify-center items-center mt-4">
          {" "}
          <AvatarSelect />
        </div>
        <div className="mb-4">
          <h1 className="text-md font-semibold mt-10 text-gray-700">
            Update Your Name <FontAwesomeIcon icon={faPenToSquare} />
          </h1>
          <input
            className="w-full p-2 border  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            value={userName}
            onChange={(e) => {
              dispatch(updateName(e.target.value));
            }}
          />
        </div>
        <div className="mb-4">
          <h1 className="text-2xl font-bold my-8 text-start text-gray-700 ">
            Your Performance Status
          </h1>
          <div className="flex items-center justify-center space-x-4 mb-2">
            <button
              className={`${
                !overAllPerformance
                  ? "bg-white text-black border-2 border-blue-500"
                  : "bg-blue-500 text-white"
              } hover:bg-blue-500  py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
              onClick={() => setOverAllPerformance(true)}
            >
              My Day
            </button>
            <button
              className={`${
                overAllPerformance
                  ? "bg-white text-black border-2 border-blue-500"
                  : "bg-blue-500 text-white"
              } hover:bg-blue-500  py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
              onClick={() => setOverAllPerformance(false)}
            >
              Overall
            </button>
          </div>
          {!overAllPerformance ? (
            <PieChartComponent
              completedCount={totalCompletedCount}
              uncompletedCount={totalUncompletedCount}
              length={todos.length}
            />
          ) : myDayTodos.length > 0 ? (
            <PieChartComponent
              completedCount={myDayCompletedCount}
              uncompletedCount={myDayUncompletedCount}
              length={myDayTodos.length}
            />
          ) : (
            <p className="text-center mt-5">No tasks found for today</p>
          )}
        </div>
      </div>
    </div>
  );
}

function PieChartComponent({ completedCount, uncompletedCount, length }) {
  // const totalCount = todos.length;
  const completedPercentage = ((completedCount / length) * 100).toFixed(0);
  const data = [
    { x: "Completed", y: completedCount },
    { x: "Uncompleted", y: uncompletedCount },
  ];
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="w-full max-w-md ">
        <svg
          viewBox="0 0 500 350"
          className="w-full h-auto shadow-md pb-6 px-4"
        >
          <g transform="translate(50, 0)">
            <VictoryPie
              standalone={false}
              data={data}
              colorScale={["#d8f5ea", "#a347ff"]}
              innerRadius={60}
              padAngle={7}
              labels={({ datum }) =>
                `${datum.x}: ${datum.y} (${((datum.y / length) * 100).toFixed(
                  2
                )}%)`
              }
              labelRadius={150}
              labelPosition={"outside"}
              style={{ labels: { fill: "black", fontSize: 18 } }}
              width={400}
              height={400}
            />
          </g>
        </svg>
      </div>
      <h2 className="text-sm  text-gray-700">Task Completion Status</h2>
      <p className="text-lg text-gray-700">
        Completed: {completedCount} / {length} tasks ({completedPercentage}
        %)
      </p>
    </div>
  );
}
export default SummaryPage;
