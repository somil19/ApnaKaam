/* eslint-disable react/prop-types */
import { useState } from "react";
import Select from "react-select";
import boy from "../assets/boy.png";
import girl from "../assets/girl.png";
import boy1 from "../assets/boy1.png";
import girl1 from "../assets/girl1.png";
import girl2 from "../assets/girl2.png";
import man from "../assets/man.png";
import women from "../assets/women.png";
import user from "../assets/user.png";
import { useDispatch, useSelector } from "react-redux";
import { updateAva } from "../features/signUpSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const avatarOptions = [
  {
    value: "user",
    label: "user",
    imgUrl: user,
  },
  {
    value: "man",
    label: "man",
    imgUrl: man,
  },
  {
    value: "girl",
    label: "girl",
    imgUrl: girl,
  },
  {
    value: "women",
    label: "women",
    imgUrl: women,
  },
  {
    value: "boy",
    label: "boy",
    imgUrl: boy,
  },
  {
    value: "boy1",
    label: "boy1",
    imgUrl: boy1,
  },
  {
    value: "girl1",
    label: "girl1",
    imgUrl: girl1,
  },
  {
    value: "girl2",
    label: "girl2",
    imgUrl: girl2,
  },
];
function AvatarSelect() {
  const dispatch = useDispatch();
  const avatar = useSelector((state) => state.signUp.avatar);

  const [showText, setShowText] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(avatar);
  const handleChange = (selectedOption) => {
    setSelectedAvatar(selectedOption);
    dispatch(updateAva(selectedOption));
    setShowText(false);
  };

  return (
    <>
      <div className="mr-14">
        <Select
          value={selectedAvatar}
          onChange={handleChange}
          options={avatarOptions}
          className="w-24"
          isSearchable={false}
          placeholder="Select an avatar"
          components={{
            Option: Img,
            SingleValue,
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          styles={{
            control: (provided) => ({
              ...provided,
              width: 150,
              height: 150,
              border: "2px solid gray",
              paddingLeft: "0.6rem",
              boxShadow: "none",
            }),
            option: (provided) => ({
              ...provided,
              width: 150,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }),
            menu: (provided) => ({
              ...provided,
              width: 150,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }),
          }}
        />
      </div>

      {showText && (
        <p className="text-gray-600 font-serif mt-4">
          {avatar ? "Update" : "Add"} Your Avatar{" "}
          <FontAwesomeIcon icon={faPenToSquare} />
        </p>
      )}
    </>
  );
}

function Img(props) {
  const { data, selectOption } = props;
  const { value, imgUrl } = data;

  return (
    <div onClick={() => selectOption(data)}>
      <img
        src={imgUrl} // Use imgSrc here
        alt={value}
        className="h-28 w-28"
        style={{
          borderRadius: "10%",
          cursor: "pointer",
          padding: "5px",
          textAlign: "center",
        }}
      />
    </div>
  );
}
function SingleValue(props) {
  const { data } = props;
  const { value, imgUrl } = data;

  return (
    <div>
      <img
        src={imgUrl}
        alt={value}
        className="h-28 w-28"
        style={{ borderRadius: "10%" }}
      />
    </div>
  );
}
export default AvatarSelect;
