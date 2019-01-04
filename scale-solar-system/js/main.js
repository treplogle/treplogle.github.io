;(function(){

	let scale = 15000;  // Pixels per km.
	let center = 0;
	
	let widthKM, halfWidthKM, leftKM;
	
	let canvas, ctx;
	let canvasWidth, canvasHeight;
	
	function updateCanvasDim() {
		canvas.width = document.body.clientWidth;
		canvas.height = document.body.clientHeight;
		canvasWidth = canvas.width;
		canvasHeight = canvas.height;
	}
	
	function update() {
		widthKM = canvasWidth * scale;
		halfWidthKM = widthKM / 2;
		leftKM = center - halfWidthKM;
		rightKM = center + halfWidthKM;
		
		clearScreen();
		draw();
	}
	
	function clearScreen() {
		ctx.fillStyle = "rgb(0,0,0)";
		ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	}
	
	function draw() {
		for (let i = 0; i < bodies.length; i++) {
			drawBody(bodies[i], 0);
		}
		
		drawScale();
	}

	
	function drawBody(body, parentDistance) {
		const bodyDistance = parentDistance + body.Distance;
		
		const pos = (bodyDistance - leftKM) / scale;
		const size = body.Diameter / scale;
		
		const distRatio = body.Distance / widthKM;
		
		if (body.Distance > 0 && distRatio < 0.01) { return; }
		
		const orbitCenter = (parentDistance - leftKM) / scale;
		const orbitSize = body.Distance / scale;
		
		if (orbitSize < canvasWidth * 2 && (typeof(body.NoOrbit) === "undefined" || !body.NoOrbit)) {
			ctx.strokeStyle = "rgb(255,255,255)";
			ctx.beginPath();
			ctx.arc(orbitCenter, canvasHeight / 2, body.Distance / scale, 0, 2 * Math.PI);
			ctx.stroke();
		}
		
		if (size > 20 && typeof(body.Image) !== "undefined") {
			if (typeof(body.Image.Img) === "undefined") {
				body.Image.Img = new Image();
				body.Image.Ready = false;
				body.Image.Img.src = "img/" + body.Image.Name;
				
				body.Image.Img.onload = function() {
					body.Image.Ready = true;
					update();
				};
				
				drawCircle(body.Color, pos, size / 2);
			} else if (!body.Image.Ready) {
				drawCircle(body.Color, pos, size / 2);
			} else {
				const w = size * body.Image.Scale;
				const h = size * body.Image.Scale;
				ctx.drawImage(body.Image.Img, pos - (w/2), (canvasHeight / 2) - (h/2), w, h);
			}
		} else {
			drawCircle(body.Color, pos, size / 2);
		}
		
		let drawName = false;
		
		if (body.Distance == 0 || distRatio >= 0.05) {
			drawName = true;
		}
		
		if (drawName) {
			ctx.fillStyle = "rgb(255,255,255)";
			ctx.font = "20px Georgia";

			const yOffset = (parentDistance == 0) ? 50 : 25;
			let textX = pos - ctx.measureText(body.Name).width / 2;
			let textY = (canvasHeight / 2) - (size / 2) - yOffset;
			if (textY < 20) textY = 20;
			
			ctx.fillText(body.Name, textX, textY);
		}
		
		if (typeof(body.Satellites) !== "undefined") {
			for (let i = 0; i < body.Satellites.length; i++) {
				drawBody(body.Satellites[i], body.Distance + parentDistance);
			}
		}
		
		if (typeof(body.Regions) !== "undefined") {
			for (let i = 0; i < body.Regions.length; i++) {
				drawRegion(body.Regions[i], parentDistance);
			}
		}
	}
	
	function drawRegion(region, parentDistance) {
		const center = (parentDistance - leftKM) / scale;
		const startRadius = region.Start / scale;
		const endRadius = region.Stop / scale;
		const radius = (startRadius + endRadius) / 2;
		
		ctx.save();
		ctx.strokeStyle = region.Color;
		ctx.lineWidth = (endRadius - startRadius);
		ctx.beginPath();
		ctx.arc(center, canvasHeight / 2, radius, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.restore();
		
		const distRatio = (region.Stop - region.Start) / widthKM;
		let drawName = false;
		if (distRatio >= 0.05) {
			drawName = true;
		}
		
		if (drawName) {
			ctx.fillStyle = "rgb(255,255,255)";
			ctx.font = "20px Georgia";

			const textSize = ctx.measureText(region.Name);
			let textX = (center + radius) - textSize.width / 2;
			let textY = (canvasHeight / 2);
			if (textY < 20) textY = 20;
			
			ctx.fillText(region.Name, textX, textY);
		}
	}
	
	function drawScale() {
		let scaleLengthPixels = canvasWidth / 5;
		let scaleLengthKM = parseInt(scaleLengthPixels * scale);
		
		scaleLengthKM = roundToMostSignficant(scaleLengthKM);
		scaleLengthPixels = parseInt(scaleLengthKM / scale);
		
		ctx.strokeStyle = "rgb(255,255,255)";
		ctx.beginPath();
        ctx.moveTo(30, 30);
        ctx.lineTo(30 + scaleLengthPixels, 30);
		ctx.moveTo(30, 30);
		ctx.lineTo(30, 25);
		ctx.moveTo(30 + scaleLengthPixels, 30);
		ctx.lineTo(30 + scaleLengthPixels, 25);
        ctx.stroke();
		
		let text;
		
		if (scaleLengthKM >= 100000) {
			let scaleText = scaleLengthKM.toExponential();
			scaleText = scaleText.replace("e+", " x 10^");
			text = "Scale: " + scaleText + " km";
		} else {
			text = "Scale: " + scaleLengthKM + " km";
		}
		
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.font = "14px Georgia";
		const textSize = ctx.measureText(text);
		
		ctx.fillText(text, 30 + (scaleLengthPixels / 2) - (textSize.width / 2), 20);
	}
	
	function roundToMagnitude(x) {
		return Math.pow(10, Math.ceil(Math.log(x) / Math.LN10));
	}
	
	function roundToMostSignficant(number) {
		const digits = parseInt(number).toString().length - 1;
		const d = Math.pow(10, digits);
		return Math.round(number / d) * d;
	}
	
	function drawCircle(color, pos, radius) {
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(pos, canvasHeight / 2, radius, 0, 2 * Math.PI);
		ctx.fill();
	}

	function init() {
		canvas = document.getElementById("canvas");
		ctx = canvas.getContext("2d");
		log = document.getElementById("log");
		
		updateCanvasDim();
		
		let lastPanX = null;
		
		const mc = new Hammer(canvas);
		const pinch = new Hammer.Pinch();
		mc.add(pinch);
		
		mc.on("panstart panend panleft panright", function (e) {
			switch (e.type) {
				case "panstart":
					lastPanX = e.center.x;
					break;
				case "panend":
					lastPanX = null;
					break;
				case "panleft":
				case "panright":
					if (lastPanX != null) {
						const diff = e.center.x - lastPanX;
						lastPanX = e.center.x;
						center -= (diff * scale);
						update();
					} else {
						lastPanX = e.center.x;
					}
					break;
			}
		});
		
		mc.on("pinch", function(e) {
			e.preventDefault();
			
			const offset = ((e.center.x * scale) + leftKM) - center;
			const oldScale = scale;
			
			if (e.scale < 1) { // pinch in, zoom out
				scale += (scale / 30);
			} else if (e.scale > 1) {  // pinch, zoom in
				scale -= (scale / 30);
			}
			
			if (scale < 0.005) {
				scale = oldScale;
				return;
			}
			
			center += offset / 20;
			update();
		});
		
		canvas.addEventListener("mousewheel", function(e) {
			
			const mouseOffset = ((e.clientX * scale) + leftKM) - center;
			const oldScale = scale;
			
			const scaleDif = 3;
			
			if (e.wheelDelta < 0) {
				scale += (scale / scaleDif);
			} else if (e.wheelDelta > 0) {
				scale -= (scale / scaleDif);
			} else {
				return;
			}
			
			if (scale < 0.005) {
				scale = oldScale;
				return;
			}
			
			center += mouseOffset / scaleDif;
			
			update();
			
		}, false);
		
		window.addEventListener("resize", function(e) { updateCanvasDim(); update(); });
		
		update();
	};

	// Initialize
	init();
})();