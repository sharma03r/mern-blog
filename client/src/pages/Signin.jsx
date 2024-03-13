import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

function Signin() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.password || !formData.email) {
      dispatch(signInFailure("All fields are required"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success == "false") {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="min-h-screen mt-40">
      {/* Right */}
      <div className="w-5/6 md:w-2/5 flex-1 m-auto">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <Label value="Your email" />
            <TextInput
              type="email"
              placeholder="name@company.com"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div>
            <Label value="Your password" />
            <TextInput
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
            />
          </div>
          <Button
            outline
            gradientDuoTone="purpleToBlue"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" /> <span className="pl-3">Loading...</span>
              </>
            ) : (
              "Sign in"
            )}
          </Button>
          <OAuth />
        </form>
        <div className="flex gap-2 text-sm mt-5">
          <span>Don't have an account?</span>
          <Link to="/sign-up" className="text-blue-500">
            Sign Up
          </Link>
        </div>
        {errorMessage && (
          <Alert className="mt-5" color="failure">
            {errorMessage}
          </Alert>
        )}
      </div>
    </div>
  );
}
export default Signin;
