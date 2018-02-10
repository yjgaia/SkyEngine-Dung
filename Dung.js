require(process.env.UPPERCASE_PATH + '/LOAD.js');

BOOT({
	CONFIG : {
		defaultBoxName : 'Dung',
		
		title : 'Dung',
		
		isDevMode : true,
		webServerPort : 8210
	},
	
	BROWSER_CONFIG : {
		
		SkyEngine : {
			//isDebugMode : true,
			width : 360,
			height : 640
		}
	},
	
	NODE_CONFIG : {
		// 테스트 목적이기 때문에 CPU 클러스터링 기능을 사용하지 않습니다.
		isNotUsingCPUClustering : true
	}
});
