import { RuntimeConfig as UserRuntimeConfig, PublicRuntimeConfig as UserPublicRuntimeConfig } from 'nuxt/schema'
import { NuxtModule, ModuleDependencyMeta } from '@nuxt/schema'
  interface SharedRuntimeConfig {
   app: {
      buildId: string,

      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },

   smtpHost: string,

   smtpPort: string,

   smtpUser: string,

   smtpPass: string,

   senderEmail: string,

   recipientEmail: string,

   nitro: {
      envPrefix: string,
   },

   sitemap: {
      cacheMaxAgeSeconds: number,

      debug: boolean,
   },

   "nuxt-site-config": {
      stack: Array<{

      }>,

      version: string,

      debug: boolean,

      multiTenancy: Array<any>,
   },

   "nuxt-robots": {
      version: string,

      isNuxtContentV2: boolean,

      debug: boolean,

      credits: boolean,

      groups: Array<{

      }>,

      sitemap: Array<string>,

      header: boolean,

      robotsEnabledValue: string,

      robotsDisabledValue: string,

      cacheControl: string,

      botDetection: boolean,

      pageMetaRobots: any,
   },
  }
  interface SharedPublicRuntimeConfig {
   siteUrl: string,

   yandexMetrikaId: string,

   googleAnalyticsId: string,

   "nuxt-robots": {
      version: string,

      isNuxtContentV2: boolean,

      debug: boolean,

      credits: boolean,

      groups: Array<{

      }>,

      sitemap: Array<string>,

      header: boolean,

      robotsEnabledValue: string,

      robotsDisabledValue: string,

      cacheControl: string,

      botDetection: boolean,

      pageMetaRobots: any,
   },
  }
declare module '@nuxt/schema' {
  interface ModuleDependencies {
    ["vueuse"]?: ModuleDependencyMeta<typeof import("@vueuse/nuxt").default extends NuxtModule<infer O> ? O | false : Record<string, unknown>> | false
    ["nuxt-site-config"]?: ModuleDependencyMeta<typeof import("nuxt-site-config").default extends NuxtModule<infer O> ? O | false : Record<string, unknown>> | false
    ["@nuxtjs/sitemap"]?: ModuleDependencyMeta<typeof import("@nuxtjs/sitemap").default extends NuxtModule<infer O> ? O | false : Record<string, unknown>> | false
    ["nuxt-site-config"]?: ModuleDependencyMeta<typeof import("nuxt-site-config").default extends NuxtModule<infer O> ? O | false : Record<string, unknown>> | false
    ["@nuxtjs/robots"]?: ModuleDependencyMeta<typeof import("@nuxtjs/robots").default extends NuxtModule<infer O> ? O | false : Record<string, unknown>> | false
    ["@nuxt/image"]?: ModuleDependencyMeta<typeof import("@nuxt/image").default extends NuxtModule<infer O> ? O | false : Record<string, unknown>> | false
    ["@nuxt/devtools"]?: ModuleDependencyMeta<typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? O | false : Record<string, unknown>> | false
    ["@nuxt/telemetry"]?: ModuleDependencyMeta<typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? O | false : Record<string, unknown>> | false
    ["nuxt-site-config"]?: ModuleDependencyMeta<typeof import("nuxt-site-config").default extends NuxtModule<infer O> ? O | false : Record<string, unknown>> | false
  }
  interface NuxtOptions {
    /**
     * Configuration for `@vueuse/nuxt`
     */
    ["vueuse"]: typeof import("@vueuse/nuxt").default extends NuxtModule<infer O, unknown, boolean> ? O | false : Record<string, any> | false
    /**
     * Configuration for `nuxt-site-config`
     */
    ["site"]: typeof import("nuxt-site-config").default extends NuxtModule<infer O, unknown, boolean> ? O | false : Record<string, any> | false
    /**
     * Configuration for `@nuxtjs/sitemap`
     */
    ["sitemap"]: typeof import("@nuxtjs/sitemap").default extends NuxtModule<infer O, unknown, boolean> ? O | false : Record<string, any> | false
    /**
     * Configuration for `nuxt-site-config`
     */
    ["site"]: typeof import("nuxt-site-config").default extends NuxtModule<infer O, unknown, boolean> ? O | false : Record<string, any> | false
    /**
     * Configuration for `@nuxtjs/robots`
     */
    ["robots"]: typeof import("@nuxtjs/robots").default extends NuxtModule<infer O, unknown, boolean> ? O | false : Record<string, any> | false
    /**
     * Configuration for `@nuxt/image`
     */
    ["image"]: typeof import("@nuxt/image").default extends NuxtModule<infer O, unknown, boolean> ? O | false : Record<string, any> | false
    /**
     * Configuration for `@nuxt/devtools`
     */
    ["devtools"]: typeof import("@nuxt/devtools").default extends NuxtModule<infer O, unknown, boolean> ? O | false : Record<string, any> | false
    /**
     * Configuration for `@nuxt/telemetry`
     */
    ["telemetry"]: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O, unknown, boolean> ? O | false : Record<string, any> | false
    /**
     * Configuration for `nuxt-site-config`
     */
    ["site"]: typeof import("nuxt-site-config").default extends NuxtModule<infer O, unknown, boolean> ? O | false : Record<string, any> | false
  }
  interface NuxtConfig {
    /**
     * Configuration for `@vueuse/nuxt`
     */
    ["vueuse"]?: typeof import("@vueuse/nuxt").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> | false : Record<string, any> | false
    /**
     * Configuration for `nuxt-site-config`
     */
    ["site"]?: typeof import("nuxt-site-config").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> | false : Record<string, any> | false
    /**
     * Configuration for `@nuxtjs/sitemap`
     */
    ["sitemap"]?: typeof import("@nuxtjs/sitemap").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> | false : Record<string, any> | false
    /**
     * Configuration for `nuxt-site-config`
     */
    ["site"]?: typeof import("nuxt-site-config").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> | false : Record<string, any> | false
    /**
     * Configuration for `@nuxtjs/robots`
     */
    ["robots"]?: typeof import("@nuxtjs/robots").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> | false : Record<string, any> | false
    /**
     * Configuration for `@nuxt/image`
     */
    ["image"]?: typeof import("@nuxt/image").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> | false : Record<string, any> | false
    /**
     * Configuration for `@nuxt/devtools`
     */
    ["devtools"]?: typeof import("@nuxt/devtools").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> | false : Record<string, any> | false
    /**
     * Configuration for `@nuxt/telemetry`
     */
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> | false : Record<string, any> | false
    /**
     * Configuration for `nuxt-site-config`
     */
    ["site"]?: typeof import("nuxt-site-config").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> | false : Record<string, any> | false
    modules?: (undefined | null | false | NuxtModule<any> | string | [NuxtModule | string, Record<string, any>] | ["@vueuse/nuxt", Exclude<NuxtConfig["vueuse"], boolean>] | ["D:/вм/project-03b78a3c/nuxt-svai/node_modules/nuxt-site-config/dist/module.mjs", Exclude<NuxtConfig["site"], boolean>] | ["@nuxtjs/sitemap", Exclude<NuxtConfig["sitemap"], boolean>] | ["D:/вм/project-03b78a3c/nuxt-svai/node_modules/nuxt-site-config/dist/module.mjs", Exclude<NuxtConfig["site"], boolean>] | ["@nuxtjs/robots", Exclude<NuxtConfig["robots"], boolean>] | ["@nuxt/image", Exclude<NuxtConfig["image"], boolean>] | ["@nuxt/devtools", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>] | ["nuxt-site-config", Exclude<NuxtConfig["site"], boolean>])[],
  }
  interface RuntimeConfig extends UserRuntimeConfig {}
  interface PublicRuntimeConfig extends UserPublicRuntimeConfig {}
}
declare module 'nuxt/schema' {
  interface ModuleDependencies {
    ["vueuse"]?: ModuleDependencyMeta<typeof import("@vueuse/nuxt").default extends NuxtModule<infer O> ? O | false : Record<string, unknown>> | false
    ["nuxt-site-config"]?: ModuleDependencyMeta<typeof import("nuxt-site-config").default extends NuxtModule<infer O> ? O | false : Record<string, unknown>> | false
    ["@nuxtjs/sitemap"]?: ModuleDependencyMeta<typeof import("@nuxtjs/sitemap").default extends NuxtModule<infer O> ? O | false : Record<string, unknown>> | false
    ["nuxt-site-config"]?: ModuleDependencyMeta<typeof import("nuxt-site-config").default extends NuxtModule<infer O> ? O | false : Record<string, unknown>> | false
    ["@nuxtjs/robots"]?: ModuleDependencyMeta<typeof import("@nuxtjs/robots").default extends NuxtModule<infer O> ? O | false : Record<string, unknown>> | false
    ["@nuxt/image"]?: ModuleDependencyMeta<typeof import("@nuxt/image").default extends NuxtModule<infer O> ? O | false : Record<string, unknown>> | false
    ["@nuxt/devtools"]?: ModuleDependencyMeta<typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? O | false : Record<string, unknown>> | false
    ["@nuxt/telemetry"]?: ModuleDependencyMeta<typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? O | false : Record<string, unknown>> | false
    ["nuxt-site-config"]?: ModuleDependencyMeta<typeof import("nuxt-site-config").default extends NuxtModule<infer O> ? O | false : Record<string, unknown>> | false
  }
  interface NuxtOptions {
    /**
     * Configuration for `@vueuse/nuxt`
     * @see https://www.npmjs.com/package/@vueuse/nuxt
     */
    ["vueuse"]: typeof import("@vueuse/nuxt").default extends NuxtModule<infer O, unknown, boolean> ? O | false : Record<string, any> | false
    /**
     * Configuration for `nuxt-site-config`
     */
    ["site"]: typeof import("nuxt-site-config").default extends NuxtModule<infer O, unknown, boolean> ? O | false : Record<string, any> | false
    /**
     * Configuration for `@nuxtjs/sitemap`
     * @see https://www.npmjs.com/package/@nuxtjs/sitemap
     */
    ["sitemap"]: typeof import("@nuxtjs/sitemap").default extends NuxtModule<infer O, unknown, boolean> ? O | false : Record<string, any> | false
    /**
     * Configuration for `nuxt-site-config`
     */
    ["site"]: typeof import("nuxt-site-config").default extends NuxtModule<infer O, unknown, boolean> ? O | false : Record<string, any> | false
    /**
     * Configuration for `@nuxtjs/robots`
     * @see https://www.npmjs.com/package/@nuxtjs/robots
     */
    ["robots"]: typeof import("@nuxtjs/robots").default extends NuxtModule<infer O, unknown, boolean> ? O | false : Record<string, any> | false
    /**
     * Configuration for `@nuxt/image`
     * @see https://www.npmjs.com/package/@nuxt/image
     */
    ["image"]: typeof import("@nuxt/image").default extends NuxtModule<infer O, unknown, boolean> ? O | false : Record<string, any> | false
    /**
     * Configuration for `@nuxt/devtools`
     * @see https://www.npmjs.com/package/@nuxt/devtools
     */
    ["devtools"]: typeof import("@nuxt/devtools").default extends NuxtModule<infer O, unknown, boolean> ? O | false : Record<string, any> | false
    /**
     * Configuration for `@nuxt/telemetry`
     * @see https://www.npmjs.com/package/@nuxt/telemetry
     */
    ["telemetry"]: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O, unknown, boolean> ? O | false : Record<string, any> | false
    /**
     * Configuration for `nuxt-site-config`
     * @see https://www.npmjs.com/package/nuxt-site-config
     */
    ["site"]: typeof import("nuxt-site-config").default extends NuxtModule<infer O, unknown, boolean> ? O | false : Record<string, any> | false
  }
  interface NuxtConfig {
    /**
     * Configuration for `@vueuse/nuxt`
     * @see https://www.npmjs.com/package/@vueuse/nuxt
     */
    ["vueuse"]?: typeof import("@vueuse/nuxt").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> | false : Record<string, any> | false
    /**
     * Configuration for `nuxt-site-config`
     */
    ["site"]?: typeof import("nuxt-site-config").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> | false : Record<string, any> | false
    /**
     * Configuration for `@nuxtjs/sitemap`
     * @see https://www.npmjs.com/package/@nuxtjs/sitemap
     */
    ["sitemap"]?: typeof import("@nuxtjs/sitemap").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> | false : Record<string, any> | false
    /**
     * Configuration for `nuxt-site-config`
     */
    ["site"]?: typeof import("nuxt-site-config").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> | false : Record<string, any> | false
    /**
     * Configuration for `@nuxtjs/robots`
     * @see https://www.npmjs.com/package/@nuxtjs/robots
     */
    ["robots"]?: typeof import("@nuxtjs/robots").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> | false : Record<string, any> | false
    /**
     * Configuration for `@nuxt/image`
     * @see https://www.npmjs.com/package/@nuxt/image
     */
    ["image"]?: typeof import("@nuxt/image").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> | false : Record<string, any> | false
    /**
     * Configuration for `@nuxt/devtools`
     * @see https://www.npmjs.com/package/@nuxt/devtools
     */
    ["devtools"]?: typeof import("@nuxt/devtools").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> | false : Record<string, any> | false
    /**
     * Configuration for `@nuxt/telemetry`
     * @see https://www.npmjs.com/package/@nuxt/telemetry
     */
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> | false : Record<string, any> | false
    /**
     * Configuration for `nuxt-site-config`
     * @see https://www.npmjs.com/package/nuxt-site-config
     */
    ["site"]?: typeof import("nuxt-site-config").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> | false : Record<string, any> | false
    modules?: (undefined | null | false | NuxtModule<any> | string | [NuxtModule | string, Record<string, any>] | ["@vueuse/nuxt", Exclude<NuxtConfig["vueuse"], boolean>] | ["D:/вм/project-03b78a3c/nuxt-svai/node_modules/nuxt-site-config/dist/module.mjs", Exclude<NuxtConfig["site"], boolean>] | ["@nuxtjs/sitemap", Exclude<NuxtConfig["sitemap"], boolean>] | ["D:/вм/project-03b78a3c/nuxt-svai/node_modules/nuxt-site-config/dist/module.mjs", Exclude<NuxtConfig["site"], boolean>] | ["@nuxtjs/robots", Exclude<NuxtConfig["robots"], boolean>] | ["@nuxt/image", Exclude<NuxtConfig["image"], boolean>] | ["@nuxt/devtools", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>] | ["nuxt-site-config", Exclude<NuxtConfig["site"], boolean>])[],
  }
  interface RuntimeConfig extends SharedRuntimeConfig {}
  interface PublicRuntimeConfig extends SharedPublicRuntimeConfig {}
}
declare module 'vue' {
        interface ComponentCustomProperties {
          $config: UserRuntimeConfig
        }
      }