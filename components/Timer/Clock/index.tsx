const Clock = () => (
  <section>
    <div className="inner">
      <div className="svg-inner">
        <svg height="100%" width="100%">
          <circle
            cx="50%"
            cy="50%"
            r="48%"
            strokeLinecap="round"
            strokeDashoffset="0%"
          />
        </svg>
      </div>
    </div>
    <div className="numbers-inner">
      <span style={{ color: "white" }}>30:00</span>
    </div>
  </section>
);

export default Clock;
