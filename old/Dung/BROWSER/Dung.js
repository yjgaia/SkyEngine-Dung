Dung.Dung = CLASS({
	
	preset : () => {
		return SkyEngine.Image;
	},
	
	params : () => {
		return {
			x : RANDOM({
				min : -180,
				max : 180
			}),
			y : -320,
			src : Dung.R('dung.png'),
			collider : SkyEngine.Rect({
				width : 40,
				height : 40
			})
		};
	},
	
	init : (inner, self, dropHandler) => {
		
		self.moveDown({
			toY : 235,
			accel : 1000
		}, () => {
			
			SOUND_ONCE({
				wav : Dung.R('sound_drop_dung_' + RANDOM({
					min : 1,
					max : 3
				}) + '.wav')
			});
			
			self.setSrc(Dung.R('dung_down.png'));
			self.getCollider().remove();
			
			dropHandler();
		});
	}
})