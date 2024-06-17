import { FC, useMemo, useState } from 'react';

import {
  Avatar,
  Button,
  Card,
  Heading,
  Text,
  Upload,
} from '@/components/elements';
import { Form, FormPrompt } from '@/components/shared';
import { useDisclosure, useFormValidation } from '@/hooks';
import { useTranslation } from '@/i18n';
import { PermissionCheck, PERMISSIONS, usePermissions } from '@/modules/auth';
import { getIdsList } from '@/utils/array';

import { useUploadUserPhotoMutation } from '../api/uploadUserPhoto';
import { UpdateUserWithMultipleTenantsForm, UserResponse } from '../types';
import { createFullNameFromUser } from '../utils';

import { OptipixPasswordSetModal } from './OptipixPasswordSetModal';
import { PersonalInfo } from './PersonalInfo';
import { UserManagement } from './UserManagement';

const FILE_CONFIG = {
  accept: {
    'image/jpg': [],
    'image/jpeg': [],
    'image/png': [],
    'application/pdf': [],
  },
  maxSize: 5000000, // 5 MB
};

type Props = {
  onSubmit: (values: UpdateUserWithMultipleTenantsForm) => void;
  isSubmitting: boolean;
  user: UserResponse;
  isCurrentUser?: boolean;
};

export const UserProfileForm: FC<Props> = ({
  onSubmit,
  user,
  isCurrentUser,
}) => {
  const { t } = useTranslation();
  const formValidation = useFormValidation();
  const optipixResetModal = useDisclosure();
  const [photoTimeStamp, setPhotoTimeStamp] = useState(() =>
    new Date().getTime(),
  );
  const [uploadPhoto, uploadPhotoState] = useUploadUserPhotoMutation({
    onCompleted: () => {
      setPhotoTimeStamp(new Date().getTime());
    },
  });
  const canAssignRoles = usePermissions(PERMISSIONS.Users_AssignRoles);
  const canResetPassword = !!isCurrentUser;

  const schema = useMemo(
    () =>
      formValidation
        .schema<UpdateUserWithMultipleTenantsForm>({
          firstname: formValidation.string(),
          lastname: formValidation.string(),
          gender: formValidation.string(),
          email: formValidation.email(),
          defaultLanguageId: formValidation.string(),
          phoneNumber: formValidation.phoneNumber(true),
          mobileNumber: formValidation.phoneNumber(true),
          tenantAssignments: formValidation.elementSchema(),
        })
        .refine(
          (formValues) => !!formValues.phoneNumber || !!formValues.mobileNumber,
          {
            message: t('fieldError.phoneOrMobile'),
            path: ['mobileNumber'],
          },
        ),
    [formValidation, t],
  );

  const defaultValues: Partial<UpdateUserWithMultipleTenantsForm> = useMemo(
    () => ({
      firstname: user?.firstname,
      lastname: user?.lastname,
      gender: user?.gender,
      email: user?.email,
      mobileNumber: user?.mobileNumber || '',
      phoneNumber: user?.phoneNumber || '',
      defaultLanguageId:
        user?.defaultLanguageId === 'en-US' ? 'en' : user?.defaultLanguageId,
      tenantAssignments: user?.tenantAssignments.map(
        ({ tenantId, roleAssignments, name }) => {
          return {
            tenantId,
            name,
            roleAssignments: getIdsList(roleAssignments),
          };
        },
      ),
    }),
    [user],
  );

  const handleUploadPhoto = (photo: File | null) => {
    if (!photo || !user?.id) return;

    uploadPhoto({ variables: { input: { photo, userId: user.id } } });
  };

  return (
    <>
      <Form
        defaultValues={defaultValues}
        id="updateUserForm"
        schema={schema}
        onSubmit={onSubmit}
      >
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
          <section>
            <Card className="mb-5">
              <div>
                <div className="flex justify-between">
                  <Heading className="mb-12" variant="h4">
                    {t('users.personalInfo')}
                  </Heading>
                  <Upload
                    buttonSize="sm"
                    isMultiple={false}
                    isUploading={uploadPhotoState.loading}
                    render={({ node }) => (
                      <div className="z-10 flex max-h-12 flex-col items-center gap-2">
                        <Avatar
                          alt=""
                          imgUrl={
                            user?.photoUrl
                              ? `${user.photoUrl}?${photoTimeStamp}`
                              : undefined
                          }
                          initialsClassName="py-3"
                          name={createFullNameFromUser(
                            user.firstname,
                            user.lastname,
                          )}
                          size="lg"
                        />
                        {node}
                      </div>
                    )}
                    variant="button"
                    onChange={handleUploadPhoto}
                    {...FILE_CONFIG}
                  />
                </div>
                <PersonalInfo disableEmail />
              </div>
            </Card>
            {canResetPassword && (
              <PermissionCheck permission={PERMISSIONS.OptiPix_AccessOptiPix}>
                <Card className="mb-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <Heading variant="h4">
                      {t('users.optipixPassword.title')}
                    </Heading>
                    <Button
                      startIcon="lockClosed"
                      variant="secondary"
                      onClick={optipixResetModal.onOpen}
                    >
                      {t('common.resetPassword')}
                    </Button>
                  </div>
                </Card>
              </PermissionCheck>
            )}
            {isCurrentUser && (
              <Card>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <Heading variant="h4">
                      {t('users.createDesktopIcon')}
                    </Heading>
                    <Text className="text-sm text-secondary-tint-40">
                      {t('users.createDesktopIconHelp')}
                    </Text>
                  </div>
                  <a href={window.location.origin} title="CarOpticom">
                    <div
                      className="h-8 w-8 cursor-grab bg-no-repeat"
                      style={{
                        backgroundImage: "url('/favicon.png')",
                      }}
                    />
                  </a>
                </div>
              </Card>
            )}
          </section>
          <section>
            <Card className="mb-5">
              <Heading className="mb-7" variant="h4">
                {t('common.userManagement')}
              </Heading>
              <UserManagement
                isDisabled={isCurrentUser || !canAssignRoles}
                user={user}
              />
            </Card>
          </section>
        </div>
        <FormPrompt />
      </Form>
      {canResetPassword && (
        <OptipixPasswordSetModal
          isOpen={optipixResetModal.isOpen}
          onClose={optipixResetModal.onClose}
        />
      )}
    </>
  );
};
