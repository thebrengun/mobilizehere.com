import 'autotrack/lib/plugins/event-tracker'
import 'autotrack/lib/plugins/outbound-link-tracker'
import 'autotrack/lib/plugins/url-change-tracker'

ga('create', 'UA-93560224-1', 'auto');

ga('require', 'eventTracker');
ga('require', 'outboundLinkTracker');
ga('require', 'urlChangeTracker');

ga('send', 'pageview');