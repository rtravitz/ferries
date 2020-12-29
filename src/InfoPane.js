import compass from './assets/compass.svg'
import speedometer from './assets/speedometer.svg'

function InfoPanel({ vessel }) {
  return (
    <section className="fixed bottom-0 z-50 w-full">
      <div className="bg-ferry bg-center bg-contain bg-no-repeat h-20 flex flew-row justify-center items-center">
        <h1 className="font-sans font-bold text-xl text-gray-200 mt-6 text-center">{vessel.name}</h1>
      </div>
      <div className="flex">
        <div className="w-1/2 p-2 flex flex-col items-center text-center bg-gray-transparent-200">
          <h3 className="text-xl font-light">{vessel.lastDock}</h3>
          <h5 className="font-semibold text-2xl">{vessel.leftDock}</h5>
          <div className="arrow-down my-2"></div>
          <h3 className="text-xl font-light">{vessel.nextDock}</h3>
          <h5 className="font-semibold text-2xl">{vessel.eta}</h5>
        </div>
        <div className="w-1/2 p-2 flex flex-col items-center justify-between bg-gray-transparent-300">
          <div>
            <div className="flex items-end mb-2">
              <img className="w-10 mr-1" src={speedometer} alt="speedometer" />
              <h3 className="font-semibold text-2xl">
                {vessel.speed}
                <span className="font-light text-sm ml-1">MPH</span>
              </h3>
            </div>
            <div className="flex items-end">
              <img className="w-10 mr-1" src={compass} alt="compass" />
              <h3 className="font-semibold text-2xl">{vessel.headingText}</h3>
            </div>
          </div>
          <button className="bg-green-ferry py-2 px-4 mt-4 mb-2 font-semibold shadow rounded-lg text-gray-200">Boat Notes</button>
        </div>
      </div>
    </section>
  )
}

export default InfoPanel