const Loading = () => {
  return (
    <div
      style={{
        width: "2rem",
        height: "2rem",
        background: "transparent",
        border: "none",
      }}
      className="wrapper"
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
        className="box-wrap"
      >
        <div className="box one"></div>
        <div className="box two"></div>
        <div className="box three"></div>
        <div className="box four"></div>
        <div className="box five"></div>
        <div className="box six"></div>
      </div>
    </div>
  );
};

export default Loading;
