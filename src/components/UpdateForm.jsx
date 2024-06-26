/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTodo } from "../features/todoSlice";
import {
  closeUpdateForm,
  setNotification,
  setNotificationTime,
  setTodoTitle,
} from "../features/todoFormSlice";
import save from "../assets/save.mp3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as solidStar,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import clockSound from "../assets/alarm-sound.mp3";

export default function UpdateForm({ todoToUpdate }) {
  const [title, setTitle] = useState(todoToUpdate.title);
  const [dueReminder, setDueReminder] = useState(todoToUpdate.dueReminder);
  const [showRemBtn, setShowRemBtn] = useState(true);
  const [category, setCategory] = useState(todoToUpdate.category);
  const [priority, setPriority] = useState(todoToUpdate.priority);
  const [notes, setNotes] = useState(todoToUpdate.notes);

  const dispatch = useDispatch();

  const playAlarmSound = () => {
    const alarmSound = new Audio(clockSound);
    alarmSound.play();
  };
  const handleUpdateTodo = (e) => {
    e.preventDefault();
    dispatch(
      updateTodo({
        id: todoToUpdate.id,
        title,
        reminder: dueReminder,
        priority,
        category,
        notes,
      })
    );
    const saveSound = new Audio(save);
    saveSound.play();
    scheduleReminder(dueReminder);

    dispatch(closeUpdateForm());
  };
  const scheduleReminder = (reminderDateTime) => {
    const reminderTime = new Date(reminderDateTime).getTime();
    const currentTime = new Date().getTime();
    const timeUntilReminder = reminderTime - currentTime;
    const newTime = new Date(reminderDateTime);

    // Get hours and minutes from the date
    const hours = newTime.getHours();
    const minutes = newTime.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formatedTime = `${hours}:${minutes}${ampm}`;
    dispatch(setTodoTitle(title));
    dispatch(setNotificationTime(formatedTime));
    if (timeUntilReminder > 0) {
      setTimeout(() => {
        dispatch(setNotification());
        playAlarmSound();
      }, timeUntilReminder);
    }
  };
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full space-y-4">
        <div className="flex items-center justify-between py-6">
          <h2 className="text-2xl font-bold text-gray-800">Update Todo</h2>
          <FontAwesomeIcon
            icon={priority ? solidStar : regularStar}
            size="2x"
            onClick={() => setPriority(!priority)}
            style={{ color: "gold", cursor: "pointer" }}
          />
        </div>
        <div className="flex flex-col space-y-2 w-1/3">
          {" "}
          <span
            className={` text-center rounded-full border border-gray-300  px-2 py-2 text-sm font-semibold mx-2 `}
          >
            Tags
          </span>
          <div>
            {priority && <Tag text={"priority"} />}
            {category && <Tag text={`${category}`} />}
          </div>
        </div>
        <form onSubmit={handleUpdateTodo} className="space-y-4">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              placeholder="Title"
            />
          </div>
          <div className="flex items-center space-x-4">
            {showRemBtn ? (
              <button
                className="bg-red-400 text-black px-4 py-2 rounded-full hover:bg-red-300 w-full focus:ring-3 focus:ring-red-500"
                onClick={() => setShowRemBtn(false)}
              >
                Remind Me at..
                <FontAwesomeIcon
                  icon={faBell}
                  size="1x"
                  style={{ marginLeft: "5px", color: "purple" }}
                  shake={true}
                />
              </button>
            ) : (
              <>
                <label htmlFor="category" className="text-gray-600">
                  Add Date and Time
                </label>
                <input
                  type="datetime-local"
                  id="dueDate"
                  name="dueDate"
                  value={dueReminder}
                  onChange={(e) => setDueReminder(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  style={{
                    // Style the calendar picker indicator
                    WebkitAppearance: "none", // Disable default appearance
                    appearance: "none",
                    paddingLeft: "0.5rem", // Adjust padding to prevent overlap with the indicator
                    color: "black",
                    backgroundColor: "lightblue",
                  }}
                />
                <button
                  onClick={() => setShowRemBtn(true)}
                  className="bg-gray-200 px-2 py-1 rounded-full"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="grocery">Grocery List</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Notes"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                // Handle closing the form if needed
                dispatch(closeUpdateForm());
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mr-4"
            >
              Discard
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const Tag = ({ text }) => {
  let bgColor;
  switch (text) {
    case "priority":
      bgColor = "bg-yellow-400";
      break;
    case "personal":
      bgColor = "bg-red-400";
      break;
    case "work":
      bgColor = "bg-blue-400";
      break;
    case "grocery":
      bgColor = "bg-green-400";
      break;
  }
  return (
    <span
      className={`  rounded-full ${bgColor}  px-3 py-1 text-sm font-semibold mx-2 `}
    >
      {text}
    </span>
  );
};
