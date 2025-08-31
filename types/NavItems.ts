interface TextNavItem {
  linkSlug: string;
  content: string;
  classes?: string | string[] | Record<string, boolean>;
}

interface IconNavItem {
  linkSlug: string;
  iconName: string;
  content?: string;
  classes?: string | string[] | Record<string, boolean>;
}

export type { TextNavItem, IconNavItem };
