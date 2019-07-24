var ConnectionAuthorizationStatus;
	
	function Connect(AppKey = "AppKeyDemo", port = 43333) {

		if ("WebSocket" in window) {
			var url = "ws://127.0.0.1:" + port;
			var ws = new WebSocket(url);

			ws.onopen = function() {
            ws.send(AppKey); // Send appKey
			}

			ws.onerror = function(error) {
						alert("cannot connect to GazePointer server : start GazePointer( http://gazepointer.sourceforge.net ) " );
			}
		
			ws.onmessage = function(evt) {
				var received_msg = evt.data;
				
				if (typeof ConnectionAuthorizationStatus === 'undefined') {
					ConnectionAuthorizationStatus = received_msg;

					if (ConnectionAuthorizationStatus.substring(0, 2) !== "ok")
						alert("connection status..." + ConnectionAuthorizationStatus);
				} 
				else {
					var GazeData = JSON.parse(received_msg);
					PlotGazeData(GazeData);
				}
			}

			ws.onclose = function() {
				// websocket is closed.
				alert("Connection is closed...");
			};
		} 
		else {
        // The browser doesn't support WebSocket
        alert("WebSocket NOT supported by your Browser!");
		}	
	}


	
	function PlotGazeData(GazeData) {
    document.getElementById("GazeData").innerHTML = "GazeX: " + GazeData.GazeX + " GazeY: " + GazeData.GazeY;
    document.getElementById("HeadPhoseData").innerHTML = " HeadX: " + GazeData.HeadX + " HeadY: " + GazeData.HeadY + " HeadZ: " + GazeData.HeadZ;
    document.getElementById("HeadRotData").innerHTML = " Yaw: " + GazeData.HeadYaw + " Pitch: " + GazeData.HeadPitch + " Roll: " + GazeData.HeadRoll;
	}
	
	function SaveGazeData(GazeData){
	
		
	
	}
	

	
	Connect();