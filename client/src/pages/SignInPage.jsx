import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { axiosInstance } from "../middleware/axiosInstance";
import { logo } from "../assets";
import { Toaster } from "sonner";
import { error_toast, info_toast } from "../utils/activateToast";
import { Box } from "@mui/material";
import InputField from "../components/InputField";
import Loading from "../components/Loading";
import Cookies from "js-cookie";

const SignInPage = () => {
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = methods.handleSubmit(async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/signin", {
        username: data.username,
        password: data.password,
      });
      if (response.status === 200) {
        // available time before the current cookie expires
        const expireTime = new Date(new Date().getTime() + 60 * 60 * 1000);
        Cookies.set("accessToken", response.data.data, {
          expires: expireTime,
          secure: true,
        });
        setTimeout(() => {
          info_toast("Logging you in");
        }, 1000);
        setTimeout(() => {
          methods.reset();
          navigate("/", { replace: true });
        }, 3000);
      }
    } catch (error) {
      if (error?.response?.status === 401 || error?.response?.status === 500) {
        setTimeout(() => {
          error_toast(error.response.data);
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
            Sign In
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
              success="valid"
              validation={{
                required: {
                  value: true,
                  message: "required",
                },
              }}
              signin
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
              }}
              signin
            />

            {/* remember me and forgot password */}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "start",
                  gap: "0.5rem",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "1.25rem",
                  }}
                >
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="remember-me-check"
                    required=""
                  />
                </Box>
                <Box
                  sx={{
                    fontSize: "0.875rem",
                    lineHeight: "1.25rem",
                  }}
                >
                  <label htmlFor="remember">Remember me</label>
                </Box>
              </Box>
              <NavLink
                to="#"
                className="forgot-pass-btn"
                onClick={() => info_toast("Opps! Under construction")}
              >
                Forgot password?
              </NavLink>
            </Box>

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
                SIGN IN
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

        {/* Otherwise decorator */}
        <Box
          sx={{
            display: "flex",
            width: "60%",
            alignItems: "center",
            justifyContent: "space-between",
            my: "0.5rem",
            gap: "1rem",
            px: "1rem",
          }}
        >
          <Box
            sx={{
              width: "60%",
              height: "1.5px",
              background: "rgba(100, 116, 139, 0.719)",
              borderRadius: "9999px",
            }}
          ></Box>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: "1.5rem",
              color: "rgba(100, 116, 139, 0.719)",
            }}
          >
            Otherwise
          </p>
          <Box
            sx={{
              width: "60%",
              height: "1.5px",
              background: "rgba(100, 116, 139, 0.719)",
              borderRadius: "9999px",
            }}
          ></Box>
        </Box>

        {/* sign up option */}
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
            Your first time here?
          </p>
          <NavLink to="/signup" className="sign-up-link-btn">
            Sign Up
          </NavLink>
        </Box>
      </Box>
      <Toaster richColors />
    </Box>
  );
};

export default SignInPage;
