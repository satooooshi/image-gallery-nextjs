/* eslint-disable no-unused-vars */
export interface ImageProps {
  id: number
  height: string
  width: string
  public_id: string
  format: string
  blurDataUrl?: string
}

export interface SharedModalProps {
  index: number
  images?: ImageProps[]
  currentPhoto?: ImageProps
  changePhotoId: (newVal: number) => void
  closeModal: () => void
  navigation: boolean
  direction?: number
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}
export interface User {
  uid?: number;
  displayName?: string;
  email?: string;
  photoURL?:string;
  birthdate?: string; // format: 2023-12-12
  gender?: Gender;
  password?:string;
}