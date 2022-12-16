import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import VesselPane from '../../src/components/VesselPane/VesselPane';
import Vessel from '../../src/models/Vessel';

describe('VesselPane', () => {
  const defaultMovingVessel = {
    inservice: 'True',
    vesselID: 38,
    name: 'Yakima',
    lastdock: 'Lopez Island',
    aterm: 'Anacortes',
    eta: '5:04',
    etaAMPM: 'PM',
    leftdock: '4:20',
    departDelayed: 'N',
    leftdockAMPM: 'PM',
    etaBasis:
      'Vessel Yakima departed Lopez going to Anacortes and using vessel Yakima closest location data from Jan 23 2021  4:43PM',
    nextdep: '4:20',
    nextdepAMPM: 'PM',
    lat: 48.55694,
    lon: -122.850553,
    speed: 15.1,
    headtxt: 'SExS',
  };

  const defaultStoppedVessel = {
    inservice: 'True',
    vesselID: 38,
    name: 'Yakima',
    lastdock: 'Friday Harbor',
    aterm: 'Anacortes',
    eta: 'Calculating',
    etaAMPM: '',
    leftdock: '',
    departDelayed: '',
    leftdockAMPM: '',
    etaBasis: '',
    nextdep: '4:30',
    nextdepAMPM: 'PM',
    lat: 48.5359,
    lon: -123.013825,
    speed: 0.0,
    headtxt: 'Stopped',
  };

  describe('all vessels', () => {
    it('shows the current speed', () => {
      const vessel = new Vessel(defaultMovingVessel);
      render(<VesselPane vessel={vessel} />);

      expect(screen.getByText('15.1')).toBeInTheDocument();
    });

    it('shows the heading', () => {
      const vessel = new Vessel(defaultMovingVessel);
      render(<VesselPane vessel={vessel} />);

      expect(screen.getByText('SExS')).toBeInTheDocument();
    });

    it('gives a link to the appropriate WSDOT vessel page', () => {
      const vessel = new Vessel(defaultMovingVessel);
      render(<VesselPane vessel={vessel} />);

      expect(screen.getByText('Boat Notes').closest('a')).toHaveAttribute(
        'href',
        'https://wsdot.wa.gov/ferries/vesselwatch/VesselDetail.aspx?vessel_id=38',
      );
    });
  });

  describe('a docked vessel', () => {
    const dockedVessel = { ...defaultStoppedVessel };

    it('shows the next departure time if one exists', () => {
      const vessel = new Vessel(dockedVessel);
      render(<VesselPane vessel={vessel} />);

      expect(screen.getByText('Scheduled departure at 4:30 PM')).toBeInTheDocument();
    });

    it('shows the next dock if one exists', () => {
      const vessel = new Vessel(dockedVessel);
      render(<VesselPane vessel={vessel} />);

      expect(screen.getByText('Anacortes')).toBeInTheDocument();
    });

    it('states that the vessel is docked at a specific port', () => {
      const vessel = new Vessel(dockedVessel);
      render(<VesselPane vessel={vessel} />);

      expect(screen.getByText('Docked at Friday Harbor')).toBeInTheDocument();
    });
  });

  describe('an underway vessel', () => {
    const underwayVessel = { ...defaultMovingVessel };

    it('shows the last dock', () => {
      const vessel = new Vessel(underwayVessel);
      render(<VesselPane vessel={vessel} />);

      expect(screen.getByText('Lopez Island')).toBeInTheDocument();
    });

    it('shows the time the vessel left the dock', () => {
      const vessel = new Vessel(underwayVessel);
      render(<VesselPane vessel={vessel} />);

      expect(screen.getByText('4:20 PM')).toBeInTheDocument();
    });

    it('shows the destination dock', () => {
      const vessel = new Vessel(underwayVessel);
      render(<VesselPane vessel={vessel} />);

      expect(screen.getByText('Anacortes')).toBeInTheDocument();
    });

    it('shows the estimated time of arrival at the next dock', () => {
      const vessel = new Vessel(underwayVessel);
      render(<VesselPane vessel={vessel} />);

      expect(screen.getByText('5:04 PM')).toBeInTheDocument();
    });
  });

  describe('an out of service vessel', () => {
    const outOfServiceVessel = { ...defaultStoppedVessel, inservice: 'False' };

    it('shows that the vessel is out of service', () => {
      const vessel = new Vessel(outOfServiceVessel);
      render(<VesselPane vessel={vessel} />);

      expect(screen.getByText('Out of service and docked at Friday Harbor')).toBeInTheDocument();
    });
  });
});
