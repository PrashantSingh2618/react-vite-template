type ActiveConfigType = {
  apiUrl: string;
};

export type ActiveEnvironmentType = 'staging' | 'production';

export type ConfigurationsList = Record<
  ActiveEnvironmentType,
  ActiveConfigType
>;

const configurations: ConfigurationsList = {
  staging: {
    apiUrl: 'https://nowornever.live/',
  },
  production: {
    apiUrl: 'https://nowornever.live/',
  },
};

class Configuration {
  activeConfig: ActiveConfigType;

  activeEnv: string;

  constructor() {
    this.activeConfig = this.isStagingEnv()
      ? configurations.staging
      : configurations.production;
    this.activeEnv = this.isStagingEnv() ? 'staging' : 'production';
  }

  // eslint-disable-next-line class-methods-use-this
  isStagingEnv() {
    return window.location.origin
      .split(/[//:.-]/)
      .some((word) => ['staging', 'localhost'].includes(word.toLowerCase()));
  }
}

const config = new Configuration();

export default config;
