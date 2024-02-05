Sounds = {
	active: false,
	init: function () {
		Sounds.fx = new Howl({
			urls: ['audio/asteroids.' + (Modernizr.audio.m4a ? 'm4a' : 'ogg')],
			sprite: {
				bum1: [0, 1100],
				bum2: [1125, 1000],
				laser: [2150, 290],
				win: [2475, 575],
				thrust: [3100, 290]
			},
			onload: Sounds.loaded
		});
	},
	loaded: function () {
		Sounds.active = true;
	},
	play: function (s) {
		if (Sounds.active) {
			Sounds.fx.play(s);
		}
	}
};