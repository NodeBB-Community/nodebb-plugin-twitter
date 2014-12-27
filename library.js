 (function(module) {
	"use strict";

	var Twitter = {},
		embed = '<span data-url="https://twitter.com/$2/statuses/$3"></span><script type="text/javascript" src="//api.twitter.com/1/statuses/oembed.json?id=$3&callback=twitterEmbed"></script>';

	Twitter.parse = function(data, callback) {
		var	regularUrl = /<a href="(http|https):\/\/twitter.com\/([^\/"\s]*)\/status\/([^\/"\s]*)(\/photo\/1|)">.+?<\/a>/g
		var postContent = data && data.postData && data.postData.content;

		if (postContent && postContent.match(regularUrl)) {
			data.postData.content = postContent.replace(regularUrl, embed);
		}

		callback(null, data);
	};

	Twitter.init = {
        global: {
            addNavigation: function(custom_header, callback) {
                        custom_header.navigation.push({
                        class: 'hidden',
                        route: "",
                        text: '<script language="javascript" src="//platform.twitter.com/widgets.js"></script>'
                    });

                callback(null, custom_header);
            }
        }
    },

	module.exports = Twitter;
}(module));
