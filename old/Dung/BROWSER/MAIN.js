Dung.MAIN = METHOD({

	run : (params) => {
		
		Dung.MATCH_VIEW({
			uri : '',
			target : Dung.Home
		});
		
		Dung.MATCH_VIEW({
			uri : 'game',
			target : Dung.Game
		});
	}
});
