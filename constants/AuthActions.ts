import type { AuthAction } from "~/types/AuthAction";

export const UNAUTHORIZED_ACTION: AuthAction = {
  isLink: true,
  text: "Log In",
  icon: "local-custom:account",
  link: "/account",
};

export const AUTHORIZED_ACTION: AuthAction = {
  isLink: false,
  text: "Log Out",
  icon: "local-custom:logout",
};
