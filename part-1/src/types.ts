export enum InsertUserCode {
  USER_ALREADY_REGISTERED = "USER_ALREADY_REGISTERED",
  INVALID_NAME = "INVALID_NAME",
  INVALID_DATE_OF_BIRTH = "INVALID_DATE_OF_BIRTH",
  INVALID_EMAIL = "INVALID_EMAIL",
  INVALID_PASSWORD = "INVALID_PASSWORD",
}

export interface InsertUserResult {
  result: boolean;
  code?: InsertUserCode;
}
