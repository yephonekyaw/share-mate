import { useFormContext } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { MdError, MdCheckCircle } from "react-icons/md";
import { Box } from "@mui/material";

const InputField = ({ type, label, id, validation, name, success, signin }) => {
  const {
    register,
    getFieldState,
    formState: { errors },
  } = useFormContext();

  const findInputError = (errors, name) => {
    return Object.keys(errors)
      .filter((key) => key.includes(name))
      .reduce(
        (prev, cur_key) => Object.assign(prev, { error: errors[cur_key] }),
        {}
      );
  };

  const isFormInvalid = (error) => {
    return Object.keys(error).length > 0 || false;
  };

  const inputError = findInputError(errors, name);
  const isInvalid = isFormInvalid(inputError);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "2.5rem",
      }}
    >
      <input
        className="auth-input"
        type={type}
        id={id}
        required
        {...register(name, validation)}
      />
      <div className="underline"></div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <AnimatePresence mode="wait" initial={false}>
        {/* error or success message */}
        {isInvalid ? (
          <InputError
            message={inputError.error.message}
            key={inputError.error.message}
          />
        ) : (
          getFieldState(name).isDirty &&
          !signin && <InputSuccess message={success} key={success} />
        )}
      </AnimatePresence>
    </Box>
  );
};

const InputError = ({ message }) => {
  return (
    <motion.p
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        top: "0.5rem",
        right: 0,
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
        padding: "0.5rem",
        fontWeight: 600,
        color: "rgb(239 68 68)",
        pointerEvents: "none",
      }}
      {...framer_error}
    >
      <MdError />
      {message}
    </motion.p>
  );
};

const InputSuccess = ({ message }) => {
  return (
    <motion.p
      style={{
        position: "absolute",
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        top: "0.5rem",
        right: 0,
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
        padding: "0.5rem",
        fontWeight: 600,
        color: "rgb(34 197 94)",
        pointerEvents: "none",
      }}
    >
      <MdCheckCircle />
      {message}
    </motion.p>
  );
};

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
};

export default InputField;
