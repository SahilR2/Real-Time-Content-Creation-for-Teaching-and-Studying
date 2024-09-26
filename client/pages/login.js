import { useCallback } from "react";
import { TextField, Button } from "@mui/material";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  // Redirect to landing page on login button click
  const handleLoginClick = useCallback(() => {
    router.push("/landing-page");
  }, [router]);
  const handleLoginClick1 = useCallback(() => {
    router.push("/sign-up");
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray1-800 text-white relative overflow-hidden">
      {/* Blurred Circles for background design */}
      <div className="absolute top-[74px] left-[1081px] blur-[78.89px] rounded-full bg-moccasin-200 w-[426px] h-[426px]" />
      <div className="absolute top-[475px] left-[-140px] blur-[93.52px] rounded-full bg-moccasin-100 w-[505px] h-[505px]" />

      {/* Logo and Text */}
      <div className="absolute top-10 flex items-center gap-2">
        <img
          className="w-[48.6px] h-[45px]"
          alt="logo"
          src="/icon-3.svg"
        />
        <a
          className=" [text-decoration:none] text-lg font-semibold text-[inherit]"
          href="#"
        >
          LOGO
        </a>
      </div>

      {/* Space between logo and form */}
      <div className="mt-20" /> {/* This creates a vertical space */}

      {/* Login form container */}
      <div className="relative bg-dimgray rounded-[41.79px]  pt-8 pl-8 mb-4 w-[90%] max-w-[900px] z-10">
        <div className="bg-gray1-700 rounded-[33.43px] p-7 flex flex-col items-center gap-6">
          <div className="max-w-[600px]">
            <h1 className="text-4xl text-center font-semibold">Log In </h1>
            <p className="text-xl text-lightslategray">
              Welcome back! Please enter your details.
            </p>

            {/* Form inputs */}
            <div className="flex flex-col w-full gap-4">
              <label className="block text-white-300 mb-2" htmlFor="email">
                Email
              </label>
              <TextField
                placeholder="example@gmail.com"
                fullWidth
                variant="outlined"
                sx={textFieldStyles}
              />
              <label className="block text-white-300 mb-2" htmlFor="password">
                Password
              </label>
              <TextField
                placeholder="••••••••••"
                fullWidth
                type="password"
                variant="outlined"
                sx={textFieldStyles}
              />
              {/* Login Button */}
              <Button
                variant="contained"
                fullWidth
                sx={buttonStyles}
                onClick={handleLoginClick}
              >
                Log In
              </Button>
            </div>
          </div>
          <div className="flex justify-center ">
            <span className="text-white-300">Don't have an account? </span>
            <span
              className="text-mediumslateblue cursor-pointer ml-2"
              onClick={handleLoginClick1}
            >
              Sign Up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Tailwind CSS-based MUI TextField styling
const textFieldStyles = {
  "& fieldset": { borderColor: "#1f1e1a" },
  "& .MuiInputBase-root": {
    backgroundColor: "#0c0c0c",
    borderRadius: "16.72px",
    fontSize: "19.5px",
  },
  "& .MuiInputBase-input": { color: "#5b657e" },
};

// Tailwind CSS-based MUI Button styling
const buttonStyles = {
  textTransform: "none",
  backgroundColor: "#313131",
  color: "#fff",
  height: 56,
  borderRadius: "11.14px",
  "&:hover": { background: "#313131" },
};

export default Login;