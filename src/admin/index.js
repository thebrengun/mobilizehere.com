import config from './config.yml';
import isEpisodeConfig from './widgets/IsEpisode/IsEpisode.js';
import UniqueID from './widgets/UniqueID/UniqueID.js';
import listConfig from './widgets/List/List.js';
import PodcastPreview from './widgets/PodcastPreview/PodcastPreview.js';
import mainStyles from '!css-loader!sass-loader!../css/index.scss';
import playerStyles from '!css-loader!sass-loader!../css/lz-player.scss';
import podcastPreviewStyles from '!css-loader!sass-loader!../css/podcast-detail-page.scss';

window.CMS.registerWidget(...isEpisodeConfig);
window.CMS.registerWidget(...listConfig);
window.CMS.registerWidget(...UniqueID);
window.CMS.registerPreviewStyle(`${mainStyles.toString()} ${playerStyles.toString()} ${podcastPreviewStyles.toString()}`, { raw: true });
window.CMS.registerPreviewTemplate('podcast', PodcastPreview);