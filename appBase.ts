export const APP_BASE_PATH = '/VK_Marusya/';

export const getAssetPath = (relativePath: string) =>
  `${APP_BASE_PATH}${relativePath.replace(/^\/+/, "")}`;