import Elements from "../components/interactiveMenu/interactiveItems/Elements";
import Image from "../components/interactiveMenu/interactiveItems/Image";
import Size from "../components/interactiveMenu/interactiveItems/Size";
import Sound from "../components/interactiveMenu/interactiveItems/Sound";
import Text from "../components/interactiveMenu/interactiveItems/Text";
import Video from "../components/interactiveMenu/interactiveItems/Video";
import MediaMenu from "../components/topMenu/topLeftMenu/MediaMenu";
import ShapeMenu from "../components/topMenu/topLeftMenu/ShapeMenu";
import TextMenu from "../components/topMenu/topLeftMenu/TextMenu";

export const MENU_ITEMS = {
    text: Text,
    customize: Size,
    images: Image,
    sounds: Sound,
    videos: Video,
    elements: Elements,
}

export const TOP_LEFT_ITEMS = {
    'textbox': <TextMenu/>,
    'rect': <ShapeMenu/>,
    'circle': <ShapeMenu/>,
    'triangle': <ShapeMenu/>,
    'polygon': <ShapeMenu/>,
    'image': <MediaMenu/>,
    'activeSelection': <div className="text-second text-semibold">
        Multiple
    </div>
}