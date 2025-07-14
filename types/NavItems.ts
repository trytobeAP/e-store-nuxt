interface TextNavItem {
  linkSlug: string;
  content: string;
}

interface IconNavItem {
  linkSlug: string;
  iconName: string;
  content?: string;
  classes?: string | string[] | Record<string, boolean>;
}

export type { TextNavItem, IconNavItem };
