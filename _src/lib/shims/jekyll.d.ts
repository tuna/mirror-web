declare module "virtual:jekyll-data" {
  export const options: import("../types").GlobalOptions;
}

declare module "virtual:jekyll-config" {
  export const suffix: string;
  export const hostname: string;
  export const mirrorz_help_link: string;
  export const hide_mirrorz: boolean;
  export const issue_tag: string;
}
