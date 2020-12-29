function OutOfService({ vessel }) {
  return (
    <div className="h-full flex items-center">
      <h3 className="text-xl font-light">Out of service and docked at {vessel.lastDock}</h3>
    </div>
  )
}

export default OutOfService
