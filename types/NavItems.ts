interface TextNavItem {
  linkSlug: string;
  content: string;
}

interface IconNavItem {
  linkSlug: string;
  iconName: string;
  content?: string;
}

export type { TextNavItem, IconNavItem };
