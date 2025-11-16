interface TextNavItem {
  linkSlug: string;
  content: string;
}

interface IconNavItem {
  linkSlug: string;
  iconName: string;
  content?: string;
  attrs?: Record<string, string>;
}

export type { TextNavItem, IconNavItem };
