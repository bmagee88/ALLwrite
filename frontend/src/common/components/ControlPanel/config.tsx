// import MyTreeIcon from "@mui/icons-material/Park";
// import ExploreIcon from "@mui/icons-material/Explore";
// import HomeIcon from "@mui/icons-material/Home";

import HomeUnselected from "@mui/icons-material/HomeOutlined";
import HomeSelected from "@mui/icons-material/HomeRounded";

import ContinueReadingIconUnselected from "@mui/icons-material/MoreOutlined";
import ContinueReadingIconSelected from "@mui/icons-material/More";

import SeedIconSelected from "@mui/icons-material/ArrowDropDownCircle";
import SeedIconUnselected from "@mui/icons-material/ArrowDropDownCircleOutlined";

import DogEarIconUnselected from "@mui/icons-material/BookmarkBorderOutlined";
import DogEarIconSelected from "@mui/icons-material/Bookmark";

import AddIconSelected from "@mui/icons-material/AddCircle";
import AddIconUnselected from "@mui/icons-material/AddCircleOutlineOutlined";

interface MenuItem {
  label: string;
  selectedIcon: () => JSX.Element;
  unselectedIcon: () => JSX.Element;
  link: string;
}

const fontSize = "medium";
const featuredItemFontSize = "large";

export const menu_items: MenuItem[] = [
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
    label: "Home",
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
