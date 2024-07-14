// import MyTreeIcon from "@mui/icons-material/Park";
// import ExploreIcon from "@mui/icons-material/Explore";
// import HomeIcon from "@mui/icons-material/Home";
// import HomeUnselected from "@mui/icons-material/HomeOutlined";

import PushPinIcon from "@mui/icons-material/PushPin";
import NoteIcon from "@mui/icons-material/Note";
import BorderColorIcon from "@mui/icons-material/BorderColor";

/** top nav */

import AddCoverUnselected from "@mui/icons-material/AddCircleOutlineOutlined";
import AddCoverSelected from "@mui/icons-material/AddCircle";

import ContributionUnselected from "@mui/icons-material/BorderColorOutlined";
import ContributionSelected from "@mui/icons-material/BorderColor";

import ExploreUnselected from "@mui/icons-material/ExploreOutlined";
import ExploreSelected from "@mui/icons-material/Explore";

import PinnedUnselected from "@mui/icons-material/PushPinOutlined";
import PinnedSelected from "@mui/icons-material/PushPin";

import ContinueReadingUnselected from "@mui/icons-material/MoreOutlined";
import ContinueReadingSelected from "@mui/icons-material/More";

/** bottom nav */
import ShareUnselected from "@mui/icons-material/ShareOutlined";
import ShareSelected from "@mui/icons-material/Share";

import DonateUnselected from "@mui/icons-material/FavoriteBorderOutlined";
import DonateSelected from "@mui/icons-material/Favorite";

import FeedbackUnselected from "@mui/icons-material/ThumbUpAltOutlined";
import FeedbackSelected from "@mui/icons-material/ThumbUpAlt";

// import Adjustment from "../Adjustment/Adjustment";
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
    label: "Create Cover",
    selectedIcon: () => <AddCoverSelected fontSize={fontSize} />,
    unselectedIcon: () => <AddCoverUnselected fontSize={fontSize} />,
    link: "/dashboard/create-cover",
  },
  {
    label: "My Contributions",
    selectedIcon: () => <ContributionSelected fontSize={fontSize} />,
    unselectedIcon: () => <ContributionUnselected fontSize={fontSize} />,
    link: "/dashboard/my-covers",
  },
  {
    label: "Explore",
    selectedIcon: () => <ExploreSelected fontSize={featuredItemFontSize} />,
    unselectedIcon: () => <ExploreUnselected fontSize={featuredItemFontSize} />,
    link: "/dashboard/browse",
  },
  {
    label: "Pinned Pages",
    selectedIcon: () => <PinnedSelected fontSize={fontSize} />,
    unselectedIcon: () => <PinnedUnselected fontSize={fontSize} />,
    link: "/dashboard/my-pages",
  },
  {
    label: "Continue",
    selectedIcon: () => (
      <ContinueReadingSelected
        sx={{ transform: "scaleX(-1)" }}
        fontSize={fontSize}
      />
    ),
    unselectedIcon: () => (
      // <Adjustment flipHorizontal={true}>
      <ContinueReadingUnselected
        sx={{ transform: "scaleX(-1)" }}
        fontSize={fontSize}
      />
      // </Adjustment>
    ),
    link: "/dashboard/my-bookmarks",
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
