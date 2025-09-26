interface ImportMetaWithEnv extends ImportMeta {
  env: ImportMetaEnv & {
    VITE_BASE_URL: string;
    VITE_CUSTOMER_ROLE: string;
  };
}

const clientConfig = {
  base_url: (import.meta as ImportMetaWithEnv).env.VITE_BASE_URL,
  customer_role: (import.meta as ImportMetaWithEnv).env.VITE_CUSTOMER_ROLE,
};

export default clientConfig;
