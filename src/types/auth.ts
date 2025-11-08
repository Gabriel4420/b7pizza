export type AuthStore = {
  token: string | null;
  open: boolean;
  setOpen: (newOpen: boolean) => void;
  setToken: (newToken: string | null) => void;
};

export type LoginAreaButtonAttributes = {
  initialState: boolean;
};

export type LoginAreaStep = "EMAIL" | "SIGN_IN" | "SIGN_UP";

export type AttribuitesStepEmail = {
  onValidate: (email: string, hasEmail: boolean) => void;
};