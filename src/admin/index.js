import config from './config.yml'
import isEpisodeConfig from './widgets/IsEpisode/IsEpisode.js'
import listConfig from './widgets/List/List.js'

CMS.registerWidget(...isEpisodeConfig);
CMS.registerWidget(...listConfig);