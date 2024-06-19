import { useTranslation } from '@/i18n';

import { useGetVehicleByIdQuery } from '../api/getVehicleById';
import { ProposedVehicleSkeleton } from './skeletons/ProposedVehicleSkeleton';


type Props = {
  vehicle: any;
}
/**
 * Renders the vehicle information component.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.vehicle - The vehicle object containing information.
 * @returns {JSX.Element} The rendered vehicle information component.
 */
const VehicleInfo = ({ vehicle }: Props) => {

  const { data, loading } = useGetVehicleByIdQuery({
    variables: {
      id: vehicle.vehicleId
    },
  });

  console.log(data, '!!!!!!!!!!!!!!!!!!!');


  const { t } = useTranslation();
  return loading ?<ProposedVehicleSkeleton /> : (
    <div key={vehicle.id} className="flex items-center rounded border p-4">
      <img src={vehicle.image} alt={vehicle.model} className="mr-4 h-24 w-24" />
      <div className="flex-grow">
        <div className="font-bold">{vehicle.model}</div>
        <div>{vehicle.immatriculationDate}</div>
        <div>{vehicle.availabilityDate}</div>
        <div className={vehicle.available ? 'text-green-500' : 'text-red-500'}>
          {vehicle.available ? t('common.available') : 'common.unavailable'}
        </div>
      </div>
      <div>
        <div className="font-bold">{vehicle.price} € TTC</div>
        <div>{vehicle.kilometers} km</div>
      </div>
    </div>
  );
};

export default VehicleInfo;
