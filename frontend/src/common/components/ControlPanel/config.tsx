// import MyTreeIcon from "@mui/icons-material/Park";
// import ExploreIcon from "@mui/icons-material/Explore";
// import HomeIcon from "@mui/icons-material/Home";
// import HomeUnselected from "@mui/icons-material/HomeOutlined";

/** top nav */
import HomeUnselected from "@mui/icons-material/ExploreOutlined";
import HomeSelected from "@mui/icons-material/Explore";

import ContinueReadingIconUnselected from "@mui/icons-material/MoreOutlined";
import ContinueReadingIconSelected from "@mui/icons-material/More";

import SeedIconSelected from "@mui/icons-material/ArrowDropDownCircle";
import SeedIconUnselected from "@mui/icons-material/ArrowDropDownCircleOutlined";

import DogEarIconUnselected from "@mui/icons-material/BookmarkBorderOutlined";
import DogEarIconSelected from "@mui/icons-material/Bookmark";

import AddIconSelected from "@mui/icons-material/AddCircle";
import AddIconUnselected from "@mui/icons-material/AddCircleOutlineOutlined";

/** bottom nav */
import ShareSelected from "@mui/icons-material/Share";
import ShareUnselected from "@mui/icons-material/ShareOutlined";

import DonateSelected from "@mui/icons-material/Favorite";
import DonateUnselected from "@mui/icons-material/FavoriteBorderOutlined";

import FeedbackSelected from "@mui/icons-material/ThumbUpAlt";
import FeedbackUnselected from "@mui/icons-material/ThumbUpAltOutlined";

export interface MenuItem {
  label: string;
  selectedIcon: () => JSX.Element;
  unselectedIcon: () => JSX.Element;
  link: string;
}

const fontSize = "medium";
const featuredItemFontSize = "large";

export const topNavItems: MenuItem[] = [
  {
    label: "Seeds",
    selectedIcon: () => <SeedIconSelected fontSize={fontSize} />,
    unselectedIcon: () => <SeedIconUnselected fontSize={fontSize} />,
    link: "/dashboard/my-covers",
  },
  {
    label: "Bookmarks",
    selectedIcon: () => <ContinueReadingIconSelected fontSize={fontSize} />,
    unselectedIcon: () => <ContinueReadingIconUnselected fontSize={fontSize} />,
    link: "/dashboard/my-bookmarks",
  },
  {
    label: "Explore",
    selectedIcon: () => <HomeSelected fontSize={featuredItemFontSize} />,
    unselectedIcon: () => <HomeUnselected fontSize={featuredItemFontSize} />,
    link: "/dashboard/browse",
  },
  {
    label: "Dog Ears",
    selectedIcon: () => <DogEarIconSelected fontSize={fontSize} />,
    unselectedIcon: () => <DogEarIconUnselected fontSize={fontSize} />,
    link: "/dashboard/my-pages",
  },
  {
    label: "Plant",
    selectedIcon: () => <AddIconSelected fontSize={fontSize} />,
    unselectedIcon: () => <AddIconUnselected fontSize={fontSize} />,
    link: "/dashboard/create-cover",
  },
];

export const bottomNavItems: MenuItem[] = [
  {
    label: "Share",
    selectedIcon: () => <ShareSelected fontSize={fontSize} />,
    unselectedIcon: () => <ShareUnselected fontSize={fontSize} />,
    link: "/dashboard/share",
  },
  {
    label: "Donate",
    selectedIcon: () => <DonateSelected fontSize={fontSize} />,
    unselectedIcon: () => <DonateUnselected fontSize={fontSize} />,
    link: "/dashboard/donate",
  },
  {
    label: "Feedback",
    selectedIcon: () => <FeedbackSelected fontSize={fontSize} />,
    unselectedIcon: () => <FeedbackUnselected fontSize={fontSize} />,
    link: "/dashboard/feedback",
  },
];
