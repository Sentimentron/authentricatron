enum AccountKind {
  USER,
  ADMIN,
}

enum AccountLifecycleStage {
  ACCOUNT_REQUIRES_EMAIL_CONFIRMATION,
  ACCOUNT_REQUIRES_APPROVAL,
  ACCOUNT_CREATED,
}

enum AccountRejectedReason {
  REJECTED_VALIDATION_FAILURE,
  REJECTED_EMAIL_NOT_PERMITTED,
}

enum DeleteAccountRejectedReason {
  REJECTED_EMAIL_NOT_MATCHING,
}

enum ApplicationLifecycleStage {
  APPLICATION_REQUIRES_APPROVAL,
  APPLICATION_JOINED,
}

interface INewAccountRequest {
  username: string;
  email: string;
  kind: AccountKind;
  data: JSON;
}

interface INewAccountAcceptedResponse {
  kind: 'newAccountCreated';
  status: AccountLifecycleStage;
}

interface INewAccountRejectedResponse {
  kind: 'newAccountRejected';
  reason: AccountRejectedReason;
}

type INewAccountResponse = INewAccountAcceptedResponse | INewAccountRejectedResponse;

interface IConfirmAccountRequest {
  kind: 'confirmAccount';
  confirmToken: string;
}

interface IConfirmAccountResponse {
  kind: 'newAccountConfirmed';
  status: AccountLifecycleStage;
}

interface IDeleteAccountRequest {
  kind: 'deleteAccount';
  email: string;
}

interface IDeleteAccountAcceptedResponse {
  kind: 'deleteAccountAccepted';
}

interface IDeleteAccountRejectedResponse {
  kind: 'deleteAccountRejected';
  reason: DeleteAccountRejectedReason;
}

type IDeleteAccountResponse = IDeleteAccountRejectedResponse | IDeleteAccountAcceptedResponse;

interface IDeleteAccountConfirmRequest {
  kind: 'deleteAccountConfirm';
  email: string;
  confirmToken: string;
}

interface IDeleteAccountConfirmAcceptedResponse {
  kind: 'deleteAccountConfirmed';
}

enum DeleteAccountConfirmationRejectedReason {
  REJECTED_EMAIL_NOT_MATCHING,
  REJECTED_TOKEN_NOT_MATCHING,
}

interface IDeleteAccountConfirmRejectedResponse {
  kind: 'deleteAccountRejected';
  reason: DeleteAccountConfirmationRejectedReason;
}

type IDeleteAccountConfirmResponse = IDeleteAccountConfirmAcceptedResponse | IDeleteAccountConfirmRejectedResponse;

interface ILoginRequest {
  kind: 'loginRequest';
  email: string;
}

interface ILoginResponseAccepted {
  kind: 'loginAccepted';
}

interface IConfirmLoginRequest {
  kind: 'confirmLogin';
  tempToken: string;
}

interface IConfirmLoginAcceptedResponse {
  kind: 'confirmLoginAccepted';
  jwt: string;
}

enum IConfirmLoginRejectedReason {
  REJECTED_TOKEN_NOT_MATCHING,
}

interface IConfirmLoginRejectedResponse {
  kind: 'confirmLoginRejected';
  reason: IConfirmLoginRejectedReason;
}

type IConfirmLoginResponse = IConfirmLoginRejectedResponse | IConfirmLoginAcceptedResponse;
