Dung.Game = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		let point = 0;
		let pointPanel;
		
		let player;
		let rootNode = SkyEngine.Node({
			c : [
			SkyEngine.Background({
				src : Dung.R('bg.png')
			}),
			
			player = SkyEngine.StateSet({
				y : 200,
				stateNodes : {
					idle : SkyEngine.Image({
						src : Dung.R('man0.png')
					}),
					run : SkyEngine.Sprite({
						srcs : [
							Dung.R('man0.png'),
							Dung.R('man1.png'),
							Dung.R('man2.png'),
							Dung.R('man3.png'),
							Dung.R('man4.png'),
							Dung.R('man5.png')
						],
						fps : 10
					}),
					dead : SkyEngine.Image({
						y : 50,
						src : Dung.R('man_down.png')
					})
				},
				baseState : 'idle',
				collider : SkyEngine.Rect({
					width : 20,
					height : 90
				})
			}),
			
			SkyEngine.Node({
				y : -290,
				dom : pointPanel = DIV({
					style : {
						color : '#000',
						fontSize : 25
					},
					c : '점수: 0'
				})
			})]
		}).appendTo(SkyEngine.Screen);
		
		let keydownEvent = EVENT('keydown', (e) => {
			
			if (player.getState() !== 'dead') {
				
				if (e.getKey() === 'ArrowLeft') {
					player.setScaleX(-1);
					player.setState('run');
					player.moveLeft({
						toX : -180,
						speed : 300
					});
				}
				
				if (e.getKey() === 'ArrowRight') {
					player.setScaleX(1);
					player.setState('run');
					player.moveRight({
						toX : 180,
						speed : 300
					});
				}
			}
		});
		
		let keyupEvent = EVENT('keyup', (e) => {
			
			if (player.getState() !== 'dead') {
				
				if (e.getKey() === 'ArrowLeft') {
					if (player.getScaleX() < 0) {
						player.setState('idle');
						player.stopLeft(1000);
					}
				}
				
				if (e.getKey() === 'ArrowRight') {
					if (player.getScaleX() > 0) {
						player.setState('idle');
						player.stopRight(1000);
					}
				}
			}
		});
		
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
