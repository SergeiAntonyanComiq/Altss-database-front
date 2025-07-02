import {
  Auth0ContextInterface,
  User,
  RedirectLoginOptions,
} from "@auth0/auth0-react";

let auth0Ref: Auth0ContextInterface<User> | null = null;

export const setAuth0 = (auth0: Auth0ContextInterface<User>) => {
  auth0Ref = auth0;
};

export const getAccessToken = async (): Promise<string | null> => {
  if (!auth0Ref) return null;
  try {
    return await auth0Ref.getAccessTokenSilently();
  } catch {
    return null;
  }
};

export const triggerLogin = (options?: RedirectLoginOptions) => {
  if (auth0Ref) {
    auth0Ref.loginWithRedirect({
      appState: { returnTo: window.location.pathname },
      ...options,
    });
  }
};
