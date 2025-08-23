import type Vessel from "../../models/Vessel";

interface OutOfServiceProps {
  vessel: Vessel;
}

export default function OutOfService({ vessel }: OutOfServiceProps) {
  return (
    <div className="h-full flex items-center">
      <h3 className="text-xl font-light">Out of service and docked at {vessel.lastDock}</h3>
    </div>
  );
}
