export const isLocked = (path: string, plan?: string): boolean =>
  (path !== "/familyoffices" && path !== "/familyofficescontacts") ||
  (path === "/familyofficescontacts" && plan === "trial");
