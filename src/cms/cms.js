import CMS from "netlify-cms-app";
import LegacyURL from "./widgets/LegacyURL/LegacyURL.js";
import listConfig from "./widgets/List/List.js";
import PodcastPreview from "./widgets/PodcastPreview/PodcastPreview.js";
import "../css/index.scss";
import "../css/lz-player.scss";
import "../css/podcast-detail-page.scss";

CMS.init();
CMS.registerWidget(...listConfig);
CMS.registerWidget(...LegacyURL);
CMS.registerPreviewTemplate("podcast", PodcastPreview);
