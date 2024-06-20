import { useTranslation } from '@/i18n';
import { format } from 'date-fns';

import { useGetVehicleByIdQuery } from '../api/getVehicleById';
import { ProposedVehicleSkeleton } from './skeletons/ProposedVehicleSkeleton';
import { VehicleDetails } from '../types/vehicleTypes';


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
  const vehicleById: VehicleDetails = data?.vehicleById as VehicleDetails;


  const { t } = useTranslation();
  return loading ?<ProposedVehicleSkeleton /> : (
    <div key={vehicleById.id} className="flex gap-2 items-center rounded border p-4">
      <img src={vehicle.image} alt={vehicleById.name} className="mr-4 h-24 w-24" />
      <div className="flex flex-col basis-9/12">
        <div className="font-bold">{vehicleById.name}</div>
        {!!vehicleById.unitDetails[0].firstRegistration && <div>1st Regis. {format(vehicleById.unitDetails[0].firstRegistration, 'do MMM yyyy')}</div>}
        <div>Internal Reference (REF) {vehicleById.unitDetails[0].referenceForAd}</div>
        {!!vehicleById.unitDetails[0].availableFromDate && <div>Date available {format(vehicleById.unitDetails[0].availableFromDate, "do MMM yyyy")}</div>}
        <div className={vehicleById.unitDetails[0].available ? 'text-green-500' : 'text-red-500'}>
          {vehicleById.unitDetails[0].available ? t('common.available') : 'common.unavailable'}
        </div>
      </div>
      <div className="flex flex-col basis-3/12 h-full">
        <div className="font-bold">{vehicleById.price.netPrice} € TTC</div>
        <div className="justify-self-center">{vehicleById.unitDetails[0].kilometers} km</div>
      </div>
    </div>
  );
};

export default VehicleInfo;
