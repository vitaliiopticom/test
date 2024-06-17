export type UploadFile = {
  id: string;
  name: string;
  sizeInBytes: number;
  contentType: string;
  createdAt?: string;
  uri: string;
  thumbnailUri?: string;
};
