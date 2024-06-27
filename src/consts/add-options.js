import { PiBellSimpleZ, PiGridFourFill } from "react-icons/pi";
import { PiImageFill } from "react-icons/pi";
import { PiVideoCameraFill } from "react-icons/pi";
import { PiTextTFill } from "react-icons/pi";
import { PiMusicNotesFill } from "react-icons/pi";
import { PiShapesFill } from "react-icons/pi";
import { PiUploadFill } from "react-icons/pi";
import { PiArrowsOutBold } from "react-icons/pi";
import { PiSlidersHorizontalBold } from "react-icons/pi";

export const VIDEO_PANEL_ITEMS = [
  {
    id: "uploads",
    name: "Uploads",
    Icon: PiUploadFill,
  },

  {
    id: "templates",
    name: "Templates",
    Icon: PiGridFourFill,
  },
  {
    id: "text",
    name: "Text",
    Icon: PiTextTFill,
  },
  {
    id: "elements",
    name: "Elements",
    Icon: PiShapesFill,
  },
  {
    id: "images",
    name: "Images",
    Icon: PiImageFill,
  },
  {
    id: "videos",
    name: "Videos",
    Icon: PiVideoCameraFill,
  },

  {
    id: "sounds",
    name: "Sounds",
    Icon: PiMusicNotesFill,
  },

  {
    id: "customize",
    name: "Customize",
    Icon: PiSlidersHorizontalBold,
  }
];
