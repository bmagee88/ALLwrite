export interface TruncatedTextProps {
  children: string;
  id: string;
  maxLines?: number;
  lineHeight?: string;
  moreText?: string;
  lessText?: string;
  expandButtonStyles?: TruncateTextExpandButtonStyles;
  isReadingMore?: boolean;
  text?: string;
  ref?: React.MutableRefObject<any>;
  isTruncated?: boolean;
  setIsReadingMore: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TruncateTextExpandButtonStyles {
  fontWeight: string;
  fontSize: string;
  color: string;
}
