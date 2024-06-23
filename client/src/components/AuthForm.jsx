import { form } from "../constants";
import Input from "./Input";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ authType, type }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [actionMessage, setActionMessage] = useState(type);
  const [, setCookies] = useCookies(["userAccess_token"]);
  const [, setUserIDCookies] = useCookies(["userID"]);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    const formType = type === "Register" ? "register" : "login";
    setActionMessage("Processing");
    setIsDisabled(true);

    try {
      const response = await axios.post(
        `http://localhost:4001/auth/user/${formType}`,
        { email, password }
      );
      const { message, color, token, userID } = response.data;
      setIsDisabled(false);
      setActionMessage(type);

      if (color === "green") {
        setEmail("");
        setPassword("");
      }

      if (token === undefined) {
        setCookies("userAccess_token", null);
        setUserIDCookies("userID", null);
      } else {
        setCookies("userAccess_token", token);
        setUserIDCookies("userID", userID);
      }

      if (token && color === "green") {
        navigate("/");
        window.scrollTo(0, 0);
      }
    } catch (error) {
      setIsDisabled(false);
      console.error(error);
      setActionMessage(type);
    }
  };

  return (
    <div className="flex">
      {form.map((item) =>
        item.title === type ? (
          <div
            key={item.id}
            className="w-[19rem] max-lg:w-full
            h-full px-6 bg-n-8 border border-n-6 rounded-[2rem]
            lg:w-auto py-8 my-4 text-color-1 "
          >
            <h4 className="h4 mb-4 text-center">{item.title}</h4>
            <div className="h-auto mb-6">
              <ul>
                {item.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start py-5 border-t border-n-6"
                  >
                    <Input
                      type={
                        feature === "Email"
                          ? "text"
                          : showPassword
                          ? "text"
                          : "password"
                      }
                      handleChange={
                        feature === "Email" ? setEmail : setPassword
                      }
                      name={feature}
                      placeholder={feature}
                      value={feature === "Email" ? email : password}
                    ></Input>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-center">
              <p
                className="font-code font-semibold
              text-slate-gray mb-5
              text-sm cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {!showPassword ? "Show Password" : "Hide Password"}
              </p>
              <button
                className="px-8 py-4 border flex
              font-montserrat text-lg leading-none bg-black
              rounded-full text-white border-stroke-1"
                disabled={isDisabled}
                onClick={handleSubmit}
              >
                {actionMessage}
              </button>
            </div>
          </div>
        ) : null
      )}
    </div>
  );
};

export default AuthForm;
