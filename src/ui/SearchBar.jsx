import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = () => {
  return (
    <div className=" max-w-sm mx-auto  ">
      <div className=" w-full flex items-center rounded-full bg-gradient-to-br from-blue-300 to-blue-200">
        <input
          className=" px-4 py-2 placeholder-gray-500 w-full bg-gradient-to-br from-blue-300 to-blue-200 rounded-full outline-none focus:bg-gradient-to-br focus:from-blue-200"
          type="text"
          placeholder="search your todos..."
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-4 pl-2" />
      </div>
    </div>
  );
};

export default SearchBar;
