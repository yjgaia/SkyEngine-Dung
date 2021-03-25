
		
		let joystic = SkyJoystick.LeftAndRight({
			img : IMG({
				style : {
					opacity : 0.5
				},
				src : Dung.R('leftandright.png')
			}),
			on : {
				
				left : () => {
					
					if (player.getState() !== 'dead') {
						
						player.setScaleX(-1);
						player.setState('run');
						player.moveLeft({
							toX : -180,
							speed : 300
						});
					}
				},
				
				right : () => {
					
					if (player.getState() !== 'dead') {
						
						player.setScaleX(1);
						player.setState('run');
						player.moveRight({
							toX : 180,
							speed : 300
						});
					}
				},
				
				touchend : () => {
					
					if (player.getState() !== 'dead') {
						
						if (player.getSpeedX() < 0) {
							player.setState('idle');
							player.stopLeft(1000);
						}
						
						if (player.getSpeedX() > 0) {
							player.setState('idle');
							player.stopRight(1000);
						}
					}
				}
			}
		}).appendTo(BODY);
		
		let period = 5;
		let dungInterval = SkyEngine.Interval(0.1, (interval, count) => {
			
			if (count % period === 0) {
				rootNode.append(Dung.Dung(() => {
					if (player.getState() !== 'dead') {
						point += 1;
						pointPanel.empty();
						pointPanel.append('점수: ' + point);
					}
				}));
			}
			
			if (period > 1 && count % 100 === 0) {
				period -= 1;
			}
		});
		
		player.onMeet(Dung.Dung, () => {
			
			if (player.getState() !== 'dead') {
				
				player.setState('dead');
				
				if (player.getSpeedX() < 0) {
					player.stopLeft(1000);
				}
				if (player.getSpeedX() > 0) {
					player.stopRight(1000);
				}
				
				SOUND_ONCE({
					wav : Dung.R('sound_game_over.wav')
				});
				
				rootNode.append(SkyEngine.Node({
					y : -120,
					dom : DIV({
						style : {
							fontSize : 25,
							color : '#000'
						},
						c : '제작: 심영재'
					})
				}));
				
				rootNode.append(SkyEngine.Node({
					y : 110,
					dom : A({
						c : IMG({
							src : Dung.R('start_button.png')
						}),
						on : {
							tap : () => {
								Dung.REFRESH('game');
								
								SOUND_ONCE({
									wav : Dung.R('sound_start_game.wav')
								});
							}
						}
					})
				}));
			}
		});
		
		inner.on('close', () => {
			rootNode.remove();
			
			keydownEvent.remove();
			keyupEvent.remove();
			joystic.remove();
			
			dungInterval.remove();
		});
	}
});
