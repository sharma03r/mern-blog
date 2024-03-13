import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import OAuth from "../components/OAuth";

function Signup() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password || !formData.email) {
      return setErrorMessage("All fields are required");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success == "false") {
        setLoading(false);
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen mt-20">
      {/* Right */}
      <div className="w-5/6 md:w-2/5 flex-1 m-auto">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <Label value="Your username" />
            <TextInput
              type="text"
              placeholder="Username"
              id="username"
              onChange={handleChange}
            />
          </div>
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
              "Sign up"
            )}
          </Button>
          <OAuth />
        </form>
        <div className="flex gap-2 text-sm mt-5">
          <span>Already have an account?</span>
          <Link to="/sign-in" className="text-blue-500">
            Sign In
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

export default Signup;
