import SpeedSvg from '../assets/speed.svg';
import AccelarationSvg from '../assets/acceleration.svg';
import EnergySvg from '../assets/energy.svg';
import ExchangeSvg from '../assets/exchange.svg';
import ForceSvg from '../assets/force.svg';
import GasolineSvg from '../assets/gasoline.svg';
import HybridSvg from '../assets/hybrid.svg';
import PeopleSvg from '../assets/people.svg';
import CarSvg from '../assets/car.svg';

export function getAccessoryIcon(type: string) {
  switch (type) {
    case 'speed':
      return SpeedSvg;
    case 'acceleration':
      return AccelarationSvg;
    case 'electric_motor':
      return EnergySvg;
    case 'exchange':
      return ExchangeSvg;
    case 'turning_diameter':
      return ForceSvg;
    case 'gasoline_motor':
      return GasolineSvg;
    case 'hybrid_motor':
      return HybridSvg;
    case 'seats':
      return PeopleSvg;
    default:
      return CarSvg;
    }
}