import axios from "axios";

export interface TemplateURLs {
  VITE_TEMPLATE_REPO_URL: string;
  NEXT_TEMPLATE_REPO_URL: string;
}

export type LocalDependeciesResolveType = "COMPONENT" | "HOOK" | "UTILS";

export type LocalDependeciesResolve = {
  type: LocalDependeciesResolveType;
  path: string;
};

export type ComponentType = {
  path: string;
  dependencies?: string[];
  localDependenciesResolve?: LocalDependeciesResolve[];
};

export type RegistryJsonType = {
  TEMPLATE_URLS: Record<string, string>;
  COMPONENT: Record<string, ComponentType>;
  APPS: Record<string, string>;
};

async function fetchRegistryJson(): Promise<RegistryJsonType> {
  const response = await axios.get(
    "https://raw.githubusercontent.com/LyzrCore/lyfe/main/packages/registry.json?t=" +
      Date.now() // hardcoded url for now, pointing to public repo
  );
  return response.data;
}

export async function fetchTemplateUrls(): Promise<TemplateURLs> {
  const registryJson = await fetchRegistryJson();
  const templateUrls = registryJson.TEMPLATE_URLS;

  return {
    VITE_TEMPLATE_REPO_URL: templateUrls.VITE_TEMPLATE_URL,
    NEXT_TEMPLATE_REPO_URL: templateUrls.NEXT_TEMPLATE_URL,
  };
}

export async function fetchComponentInfo(
  component: string
): Promise<ComponentType | undefined> {
  const registryJson = await fetchRegistryJson();
  const cmp = registryJson.COMPONENT?.[component];
  return cmp ?? undefined;
}

const basePath =
  "https://raw.githubusercontent.com/LyzrCore/lyfe/main/apps/docs/src/lyfe-shared/";
export async function fetchComponentPath(component: string) {
  return basePath + component;
}

export async function fetchHooksPath(name: string) {
  return basePath + "hooks/" + name;
}

export async function fetchUtilsPath(name: string) {
  return basePath + "utils/" + name;
}

export async function fetchLocalDependencyPath(name: string) {
  const basePath =
    "https://raw.githubusercontent.com/LyzrCore/lyfe/main/apps/docs/src/";
  return basePath + name;
}
