import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { axiosInstance } from "../middleware/axiosInstance";
import { logo } from "../assets";
import { Toaster } from "sonner";
import { success_toast, error_toast, info_toast } from "../utils/activateToast";
import ReCAPTCHA from "react-google-recaptcha";
import { Box } from "@mui/material";
import InputField from "../components/InputField";
import Loading from "../components/Loading";

const SignUpPage = () => {
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm: "",
    },
  });

  const [usernames, setUsernames] = useState([]);
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const recaptcha = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const getDataToValidate = async () => {
      try {
        const response = await axiosInstance.get("/api/users");
        if (response.status === 200) {
          const allNames = response.data.data.map((item) => item.username);
          const allEmails = response.data.data.map((item) => item.email);
          setUsernames((prev) => [...prev, ...allNames]);
          setEmails((prev) => [...prev, ...allEmails]);
        } else {
          error_toast("Server error");
        }
      } catch (error) {
        error_toast(error);
      }
    };
    getDataToValidate();
  }, []);

  // handling the submission
  const onSubmit = methods.handleSubmit(async (data) => {
    const captchaValue = recaptcha.current.getValue();
    if (!captchaValue) {
      error_toast("Robot detected");
      recaptcha.current.focus();
      return;
    }
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/signup", {
        username: data.username,
        email: data.email,
        password: data.password,
        captcha: captchaValue,
      });

      if (response.status === 200) {
        setTimeout(() => {
          success_toast(response.data.message);
        }, 1000);
        setTimeout(() => {
          methods.reset();
          navigate("/signin", { replace: true });
        }, 3000);
      }
    } catch (error) {
      if (error?.response?.status === 401 || error?.response?.status === 500) {
        setTimeout(() => {
          error_toast(error.response.data);
          info_toast("Please try again later");
          setLoading(false);
        }, 3000);
      } else {
        error_toast(error);
        setLoading(false);
      }
    }
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        width: "100%",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        color: "#48466D",
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          zIndex: 1,
          width: { xs: "28rem", md: "34rem" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          py: "0.5rem",
          borderRadius: "1rem",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;",
          minWidth: "30rem",
          gap: "1rem",
        }}
      >
        {/* icon and title section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "80%",
            gap: "1rem",
          }}
        >
          <img
            style={{ display: "block", width: "4rem", height: "4rem" }}
            src={logo}
            alt=""
            width={190}
            height={40}
          />
          <p
            style={{
              fontSize: "2.25rem",
              lineHeight: "2.5rem",
              fontWeight: 700,
            }}
          >
            Sign Up
          </p>
        </Box>

        {/* form section */}
        <FormProvider {...methods}>
          <form
            onSubmit={(e) => e.preventDefault()}
            noValidate
            autoComplete="off"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
              gap: "1.5rem",
              width: "60%",
            }}
          >
            {/* input fields */}
            <InputField
              type="text"
              label="username"
              id="username"
              name="username"
              success="available"
              validation={{
                required: {
                  value: true,
                  message: "required",
                },
                minLength: {
                  value: 6,
                  message: "at least 6",
                },
                maxLength: {
                  value: 20,
                  message: "at most 20",
                },
                validate: (fieldValue) => {
                  return !usernames.includes(fieldValue) || "taken";
                },
              }}
            />
            <InputField
              type="text"
              label="email"
              id="email"
              name="email"
              success="valid"
              validation={{
                required: {
                  value: true,
                  message: "required",
                },
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "invalid",
                },
                validate: (fieldValue) => {
                  return !emails.includes(fieldValue) || "registered";
                },
              }}
            />
            <InputField
              type="password"
              label="password"
              id="password"
              name="password"
              success="strong"
              validation={{
                required: {
                  value: true,
                  message: "required",
                },
                minLength: {
                  value: 8,
                  message: "at least 8",
                },
                pattern: {
                  value:
                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                  message: "still weak",
                },
              }}
            />
            <InputField
              type="password"
              label="confirm"
              id="confirm"
              name="confirm"
              success="match"
              validation={{
                required: {
                  value: true,
                  message: "required",
                },
                validate: (fieldValue) => {
                  return (
                    methods.getValues("password") === fieldValue || "not match"
                  );
                },
              }}
            />

            {/* ReCAPTCHA */}
            <ReCAPTCHA
              ref={recaptcha}
              sitekey={import.meta.env.VITE_SITE_KEY}
            />

            {/* button */}
            <Box
              sx={{
                width: "70%",
                height: "3.5rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "3px solid rgb(139 92 246)",
                borderRadius: "9999px",
              }}
            >
              <button
                style={{
                  display: `${!loading ? "block" : "none"}`,
                }}
                onClick={onSubmit}
                className="auth-submit-button"
              >
                SIGN UP
              </button>
              <div
                style={{
                  display: `${!loading ? "none" : "block"}`,
                }}
              >
                <Loading />
              </div>
            </Box>
          </form>
        </FormProvider>

        {/* sign in option */}
        <Box
          sx={{
            display: "flex",
            width: "80%",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            px: "0.5rem",
          }}
        >
          <p
            style={{
              fontSize: "1rem",
              lineHeight: "1.5rem",
              color: "rgba(100, 116, 139, 0.719)",
            }}
          >
            Already have an account?
          </p>
          <NavLink to="/signin" className="sign-up-link-btn">
            Sign In
          </NavLink>
        </Box>
      </Box>
      <Toaster richColors />
    </Box>
  );
};

export default SignUpPage;
