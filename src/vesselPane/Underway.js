function Underway({ vessel }) {
  return (
    <>
      <h3 className="text-xl font-light">{vessel.lastDock}</h3>
      <h5 className="font-semibold text-2xl">{vessel.leftDock}</h5>
      <div className="arrow-down my-2"></div>
      <h3 className="text-xl font-light">{vessel.nextDock}</h3>
      <h5 className="font-semibold text-2xl">{vessel.eta}</h5>
    </>
  )
}

export default Underway