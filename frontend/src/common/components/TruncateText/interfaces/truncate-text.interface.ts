export interface TruncatedTextProps {
  children: string;
  id: string;
  maxLines?: number;
  lineHeight?: string;
  moreText?: string;
  lessText?: string;
  expandButtonStyles?: TruncateTextExpandButtonStyles;
}

interface TruncateTextExpandButtonStyles {
  fontWeight: string;
  fontSize: string;
  color: string;
}
