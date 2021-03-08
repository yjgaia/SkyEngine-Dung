Dung.Home = CLASS((cls) => {
	
	// bgm
	SOUND({
		mp3 : Dung.R('bgm.mp3'),
		isLoop : true
	}).play();
	
	return {
		
		preset : () => {
			return VIEW;
		},
		
		init : (inner) => {
			
			let rootNode = SkyEngine.Node({
				c : [
				SkyEngine.Background({
					speedX : -100,
					src : Dung.R('bg.png')
				}),
				
				SkyEngine.Image({
					y : -200,
					src : Dung.R('title.png')
				}),
				
				SkyEngine.Node({
					y : -120,
					dom : DIV({
						style : {
							fontSize : 25,
							color : '#000'
						},
						c : '제작: 심영재'
					})
				}),
				
				SkyEngine.Node({
					y : 110,
					dom : A({
						c : IMG({
							src : Dung.R('start_button.png')
						}),
						on : {
							tap : () => {
								Dung.GO('game');
								
								SOUND_ONCE({
									wav : Dung.R('sound_start_game.wav')
								});
							}
						}
					})
				})]
			}).appendTo(SkyEngine.Screen);
			
			inner.on('close', () => {
				rootNode.remove();
			});
		}
	};
});
