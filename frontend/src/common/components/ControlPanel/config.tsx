import MyTreeIcon from "@mui/icons-material/Park";
// import HomeIcon from "@mui/icons-material/Home";
import HomeSelected from "@mui/icons-material/HomeRounded";
import HomeUnselected from "@mui/icons-material/HomeOutlined";
import SeedIcon from "@mui/icons-material/Adjust";
import DogEarIcon from "@mui/icons-material/Bookmark";
import ContinueReadingIcon from "@mui/icons-material/More";
import ExploreIcon from "@mui/icons-material/Explore";
import SelectableIcon from "../SelectableIcon/SelectableIcon";

import AddIconSelected from "@mui/icons-material/AddCircle";
import AddIconNotSelected from "@mui/icons-material/AddCircleOutlined";

interface MenuItem {
  label: string;
  selectedIcon: () => JSX.Element;
  unselectedIcon: () => JSX.Element;
  link: string;
}

const fontSize = "medium";

export const menu_items: MenuItem[] = [
  {
    label: "Seeds",
    selectedIcon: () => <SeedIcon fontSize={fontSize} />,
    unselectedIcon: () => <SeedIcon fontSize={fontSize} />,
    link: "/my-covers",
  },
  {
    label: "Bookmarks",
    selectedIcon: () => <ContinueReadingIcon fontSize={fontSize} />,
    unselectedIcon: () => <ContinueReadingIcon fontSize={fontSize} />,
    link: "/my-bookmarks",
  },
  {
    label: "Home",
    selectedIcon: () => <HomeSelected fontSize={"large"} />,
    unselectedIcon: () => <HomeUnselected fontSize={"large"} />,
    link: "/browse",
  },
  {
    label: "Dog Ears",
    selectedIcon: () => <DogEarIcon fontSize={fontSize} />,
    unselectedIcon: () => <DogEarIcon fontSize={fontSize} />,
    link: "/my-pages",
  },
  {
    label: "Plant",
    selectedIcon: () => <AddIconSelected fontSize={fontSize} />,
    unselectedIcon: () => <AddIconNotSelected fontSize={fontSize} />,
    link: "/create-cover",
  },
];
