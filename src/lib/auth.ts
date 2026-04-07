import { cookies } from "next/headers";

import { siteConfig } from "@/lib/site";

export const ADMIN_COOKIE_NAME = "pisos_admin_session";

export function isGitHubPagesBuild() {
  return process.env.GITHUB_PAGES === "true";
}

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME ?? siteConfig.defaultAdminUser,
    password: process.env.ADMIN_PASSWORD ?? siteConfig.defaultAdminPassword,
    token: process.env.ADMIN_SESSION_TOKEN ?? siteConfig.defaultSessionToken
  };
}

export async function isAdminAuthenticated() {
  if (isGitHubPagesBuild()) {
    return false;
  }

  const store = await cookies();
  const token = store.get(ADMIN_COOKIE_NAME)?.value;

  return token === getAdminCredentials().token;
}
