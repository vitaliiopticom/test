import { useTranslation } from '@/i18n';
import { format } from 'date-fns';

import { VehicleDetails } from '../types/vehicleTypes';
import { Button, Image, Modal } from '@/components/elements';
import { FALLBACK_IMAGE } from '@/common/constants';
import { formatDate } from '@/utils/date';


type Props = {
  vehicle: VehicleDetails;
  closeModal: () => void;
  image: string;
}
/**
 * Renders the vehicle information component.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.vehicle - The vehicle object containing information.
 * @returns {JSX.Element} The rendered vehicle information component.
 */
const VehicleInfoModel = ({ vehicle, closeModal, image }: Props) => {
  const { t } = useTranslation();


  return (
    <Modal
      isOpen
      // onClose={closeModal}
      title={`${t('common.vehicle')} ${t('lead.information')}`}
      actions={[<Button className="min-w-[125px]" children={t('common.cancel')} onClick={closeModal} />]}
      className="container mx-auto p-4 w-11/12 max-w-screen-2xl"
    >
      <div key={vehicle.id} className="grid grid-cols-3 gap-4">
        {/* <img src={vehicle.image} alt={vehicleById.name} className="mr-4 h-24 w-24" /> */}

        <Image
          alt="alt"
          className="w-full"
          fallbackPath={FALLBACK_IMAGE}
          src={image || FALLBACK_IMAGE}
        />


        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-8 px-4">
            <div className="flex justify-between text-sm border-solid border-b border-slate-300">
              <span className="text-gray-950">{t('lead.internalRef')}</span>
              <span className="text-gray-500">{vehicle.unitDetails[0].referenceForAd}</span>
            </div>
            <div className="flex justify-between text-sm border-solid border-b border-slate-300">
              <span className="text-gray-950">{t('lead.km')}</span>
              <span className="text-gray-500">{vehicle.unitDetails[0].kilometers}</span>
            </div>
            <div className="flex justify-between text-sm border-solid border-b border-slate-300">
              <span className="text-gray-950">{t('lead.referenceAd')}</span>
              <span className="text-gray-500">{vehicle.unitDetails[0].referenceForAd}</span>
            </div>
            <div className="flex justify-between text-sm border-solid border-b border-slate-300">
              <span className="text-gray-950">{t('lead.firstReg')}</span>
              <span className="text-gray-500">{!!vehicle.unitDetails[0].firstRegistration
                ? formatDate(new Date(vehicle.unitDetails[0].firstRegistration))
                : ""}</span>
            </div>
            <div className="flex justify-between text-sm border-solid border-b border-slate-300">
              <span className="text-gray-950">{t('lead.vinLabel')}</span>
              <span className="text-gray-500">{vehicle.unitDetails[0].vIN}</span>
            </div>
            <div className="flex justify-between text-sm border-solid border-b border-slate-300">
              <span className="text-gray-950">{t('lead.dateAvailable')}</span>
              <span className="text-gray-500">{!!vehicle.unitDetails[0].availableFromDate
                ? formatDate(new Date(vehicle.unitDetails[0].availableFromDate))
                : ""}</span>
            </div>
            <div className="flex justify-between text-sm border-solid border-b border-slate-300">
              <span className="text-gray-950">{`${t('common.vehicle')} ${t('common.status')}`}</span>
              <span className="text-gray-500">{vehicle.unitDetails[0].available ? t('lead.available') : t('lead.unavailable')}</span>
            </div>
            <div className="flex justify-between text-sm border-solid border-b border-slate-300">
              <span className="text-gray-950">{t('lead.priceWT')}</span>
              <span className="text-gray-500">{vehicle.price.grossPrice}</span>
            </div>
            <div className="flex justify-between text-sm border-solid border-b border-slate-300">
              <span className="text-gray-950">{t('lead.location')}</span>
              <span className="text-gray-500">{vehicle.unitDetails[0].localization}</span>
            </div>
            <div className="flex justify-between text-sm border-solid border-b border-slate-300">
              <span className="text-gray-950">{t('lead.color')}</span>
              <span className="text-gray-500">{vehicle.unitDetails[0].colorName}</span>
            </div>




            {/* <div className="font-bold">{vehicle.name}</div>
            {!!vehicle.unitDetails[0].firstRegistration && <div>1st Regis. {format(vehicle.unitDetails[0].firstRegistration, 'do MMM yyyy')}</div>}
            <div>Internal Reference (REF) {vehicle.unitDetails[0].referenceForAd}</div>
            {!!vehicle.unitDetails[0].availableFromDate && <div>Date available {format(vehicle.unitDetails[0].availableFromDate, "do MMM yyyy")}</div>}
            <div className={vehicle.unitDetails[0].available ? 'text-green-500' : 'text-red-500'}>
              {vehicle.unitDetails[0].available ? t('lead.available') : t('lead.unavailable')}
            </div>
            <div className="flex flex-col basis-3/12 h-full">
              <div className="font-bold">{vehicle.price.netPrice} € TTC</div>
              <div className="justify-self-center">{vehicle.unitDetails[0].kilometers} km</div>
            </div> */}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default VehicleInfoModel;
