import { FC, useMemo, useState } from 'react';
import { DataView, createTableColumns } from '@/components/shared';
import { useTranslation } from '@/i18n';
import CountdownTimer from './CountdownTimer';

import { routes } from '@/router/routesList';
import { ActionsMenu, Avatar, Button, Checkbox } from '@/components/elements';
import { useNavigate } from 'react-router-dom';
import { Lead } from '../types/interface';
import LanguageFlag from '@/components/elements/FlagLanguage/FlagLanguage';
import IconPlatform from '@/components/elements/IconPlatform/IconPlatform';
import { differenceInSeconds } from 'date-fns';
import { LeadsListFilters } from './LeadsListFilters';

/**
 * Renders a list of leads.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Lead[]} props.leadsData - The array of leads data.
 * @returns {JSX.Element} - The rendered LeadsList component.
 */

export const LeadsList: FC = () => {
  const { t } = useTranslation();
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
  const [selectedLead, setSelectedLead] = useState<string>("");
  const navigate = useNavigate();

  const handleRowClick = (lead: Lead) => {
    navigate(routes.leadDetail(lead.id));
  };

  const columns = useMemo(
    () =>
      createTableColumns<Lead>((ch) => [
        ch.accessor('createdAt', {
          header: () => t('leads.time'),
          cell: ({ row }) => {
            const createdAt = new Date(row.original.createdAt);
            const timePassedInSeconds = differenceInSeconds(
              new Date(),
              createdAt,
            );
            const timeRemaining = 30 - timePassedInSeconds / 60;
            return (
              <CountdownTimer
                key={row.original.id}
                initialTimeInMinutes={30}
                currentTimeInMinutes={timeRemaining > 0 ? timeRemaining : 0}
              />
            );
          },
        }),

        ch.accessor('clientInfo.lastName', {
          header: () => t('common.lastname'),
          cell: ({ row }) => (
            <div>{row.original.clientInfo.lastName.toUpperCase()}</div>
          ),
        }),
        ch.accessor('clientInfo.firstName', {
          header: () => t('common.firstname'),
        }),
        ch.accessor('platform', {
          header: () => t('contracts.platformAdministrator'),
          cell: ({ row }) => {
            return <IconPlatform platform={row.original.platform} />;
          },
        }),
        ch.accessor('emailInfo.emailSubject', {
          header: () => t('common.subject'),
        }),
        ch.accessor('clientInfo.language', {
          header: () => t('common.defaultLanguage'),
          cell: ({ row }) => {
            return (
              <LanguageFlag
                language={row.original.clientInfo.language.toString()}
              />
            );
          },
        }),
        ch.accessor('agentId', {
          header: () => t('common.agent'),
          cell: ({ row }) => {
            return (
              <div onClick={(e) => e.stopPropagation()}>
                <Avatar name={'User Access'} alt={'User Access'} />
              </div>
            );
          },
        }),
        ch.display({
          id: '_actions',
          header: () => t('common.actions'),
          cell: ({ row }) => {
            return (
              <div onClick={(e) => e.stopPropagation()}>
                <ActionsMenu
                  items={[
                    {
                      label: t('common.detail'),
                      to: routes.leadDetail(row.original.id),
                    },
                    {
                      label: (
                        <span className="text-cerise">
                          {t('common.deactivate')}
                        </span>
                      ),
                      onClick: () => console.log('delete', row.original.id),
                    },
                  ]}
                />
              </div>
            );
          },
        }),
      ]),
    [t],
  );

  return (
    <>
      <div className="mb-5 flex justify-between">
        <DataView.RecordsCount />
        <DataView.FiltersToggle />
      </div>
      <DataView.Filters hasToggle>
        <LeadsListFilters />
      </DataView.Filters>
      <Button
        onClick={() => console.log('delete', selectedLeads)}
        disabled={selectedLeads.size === 0}
      >
        {t('common.deleteSelected')}
      </Button>

      <DataView.Table columns={columns} onRowClick={handleRowClick} />
    </>
  );
};

export default LeadsList;
