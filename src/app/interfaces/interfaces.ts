export interface TokenData {
  hash1: string | undefined,
  hash2: string | undefined,
  refreshToken: string | undefined,
  refreshTokenExpiredIn: number | undefined,
  token: string | undefined,
  tokenExpiredIn: number | undefined
}

export interface UserData {
  name: string,
  surname: string,
  inviteCode: string,
  email: string,
  shortPhone: string,
  phone: string,
  password: string,
  passConfirmation: string | undefined,
  confirmationId: string | undefined,
  code: string | undefined,
  accessCode: string,
  forceCode: string
}

export enum ParamNames {
  userData = "userData",
  tokenData = "tokenData"
}

