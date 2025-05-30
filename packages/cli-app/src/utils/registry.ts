import axios from "axios";

export interface TemplateURLs {
  VITE_TEMPLATE_REPO_URL: string;
  NEXT_TEMPLATE_REPO_URL: string;
}

type RegistryJsonType = {
  TEMPLATE_URLS: Record<string, string>;
};

async function fetchRegistryJson(): Promise<RegistryJsonType> {
  const response = await axios.get(
    "https://raw.githubusercontent.com/LyzrCore/lyfe/main/packages/registry.json" // hardcoded url for now, pointing to public repo
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
