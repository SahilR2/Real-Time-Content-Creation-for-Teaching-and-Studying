import { useCallback } from "react";
import { TextField, Button } from "@mui/material";
import { useRouter } from "next/router";

const SignUp = () => {
  const router = useRouter();

  // Redirect to login page on login button click
  const handleLoginClick = useCallback(() => {
    router.push("/login");
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray1-800 text-white relative overflow-hidden">
      {/* Blurred Circles for background design */}
      <div className="absolute top-[5%] left-[70%] blur-[80px] rounded-full bg-moccasin-200 w-[400px] h-[400px]" />
      <div className="absolute bottom-[10%] left-[-10%] blur-[90px] rounded-full bg-moccasin-100 w-[450px] h-[450px]" />

      {/* Logo and Text */}
      <div className="absolute top-8 flex items-center gap-2">
        <img
          className="w-[50px] h-[50px]"
          alt="logo"
          src="/icon-3.svg"
        />
        <a
          className="[text-decoration:none] text-lg font-semibold text-[inherit]"
          href="#"
        >
          LOGO
        </a>
      </div>

      {/* Space between logo and form */}
      <div className="mt-24" /> {/* Creates vertical space */}

      {/* Sign-Up form container with adjusted width and spacing */}
      <div className="relative bg-dimgray rounded-[40px]  pt-8 pl-8 mb-4 w-[90%] max-w-[1000px] z-10">
        <div className="bg-gray1-700 rounded-[30px] p-10  flex flex-col  items-center gap-6">
          <div className="max-w-[600px]">
            <h1 className="text-4xl text-center font-semibold">Sign Up</h1>
            <p className="text-lg text-lightslategray">
              Welcome! Please enter your details to create an account.
            </p>

            {/* Form inputs */}
            <div className="flex flex-col w-full gap-5">
              <label className="block text-white-300" htmlFor="username">
                Username
              </label>
              <TextField
                placeholder="example123"
                fullWidth
                variant="outlined"
                sx={textFieldStyles}
              />
              <label className="block text-white-300" htmlFor="email">
                Email
              </label>
              <TextField
                placeholder="example@gmail.com"
                fullWidth
                variant="outlined"
                sx={textFieldStyles}
              />
              <label className="block text-white-300" htmlFor="password">
                Password
              </label>
              <TextField
                placeholder="••••••••••"
                fullWidth
                type="password"
                variant="outlined"
                sx={textFieldStyles}
              />
              <label className="block text-white-300" htmlFor="confirm-password">
                Confirm Password
              </label>
              <TextField
                placeholder="••••••••••"
                fullWidth
                type="password"
                variant="outlined"
                sx={textFieldStyles}
              />

              {/* Sign Up Button */}
              <Button
                variant="contained"
                fullWidth
                sx={buttonStyles}
              >
                Sign Up
              </Button>
            </div>
          </div>
          <div className="flex justify-center ">
            <span className="text-white-300">Already have an account? </span>
            <span
              className="text-mediumslateblue cursor-pointer ml-2"
              onClick={handleLoginClick}
            >
              Log In
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
    borderRadius: "12px",
    fontSize: "18px",
  },
  "& .MuiInputBase-input": { color: "#5b657e" },
};

// Tailwind CSS-based MUI Button styling
const buttonStyles = {
  textTransform: "none",
  backgroundColor: "#313131",
  color: "#fff",
  height: 56,
  borderRadius: "10px",
  "&:hover": { background: "#313131" },
};

export default SignUp;