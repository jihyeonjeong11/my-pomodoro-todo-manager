const NewClock = () => {
  return (
    <button className="clock-button spacing">
      <svg id="time-progress" viewBox="0 0 100 100" className="absolute top-0">
        {/* <circle
          className="fill-current text-darkestblue"
          fill="gray"
          cx="50"
          cy="50"
          r="48"
        ></circle>
        <circle
          className={`duration-500 ease-linear origin-center transform -rotate-90 stroke-current transition-stroke-dashoffset`}
          cx="50"
          cy="50"
          r="44"
          fill="none"
          strokeDasharray="276.5 276.5"
          strokeLinecap="round"
          strokeWidth="3"
          strokeDashoffset={300}
        ></circle> */}
      </svg>
      <span
        className={`fill-current text-lightblue`}
        fontSize="150%"
        textAnchor="middle"
        x="50%"
        y="50%"
        dy=".3em"
      >
        30:00
      </span>
      <span>PAUSE</span>
    </button>
  );
};

export default NewClock;
