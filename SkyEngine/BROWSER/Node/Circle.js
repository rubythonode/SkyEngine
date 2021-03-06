/**
 * 원형 노드
 */
SkyEngine.Circle = CLASS({
	
	preset : function() {
		'use strict';

		return SkyEngine.Node;
	},

	init : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		
		//OPTIONAL: params.x
		//OPTIONAL: params.y
		//OPTIONAL: params.z
		//OPTIONAL: params.speedX
		//OPTIONAL: params.speedY
		//OPTIONAL: params.accelX
		//OPTIONAL: params.accelY
		//OPTIONAL: params.minSpeedX
		//OPTIONAL: params.minSpeedY
		//OPTIONAL: params.maxSpeedX
		//OPTIONAL: params.maxSpeedY
		//OPTIONAL: params.toX
		//OPTIONAL: params.toY
		
		//OPTIONAL: params.scale
		//OPTIONAL: params.scaleX
		//OPTIONAL: params.scaleY
		//OPTIONAL: params.scalingSpeed
		//OPTIONAL: params.scalingSpeedX
		//OPTIONAL: params.scalingSpeedY
		//OPTIONAL: params.scalingAccel
		//OPTIONAL: params.scalingAccelX
		//OPTIONAL: params.scalingAccelY
		//OPTIONAL: params.minScalingSpeed
		//OPTIONAL: params.minScalingSpeedX
		//OPTIONAL: params.minScalingSpeedY
		//OPTIONAL: params.maxScalingSpeed
		//OPTIONAL: params.maxScalingSpeedX
		//OPTIONAL: params.maxScalingSpeedY
		//OPTIONAL: params.toScale
		//OPTIONAL: params.toScaleX
		//OPTIONAL: params.toScaleY
		
		//OPTIONAL: params.angle
		//OPTIONAL: params.rotationSpeed
		//OPTIONAL: params.rotationAccel
		//OPTIONAL: params.minRotationSpeed
		//OPTIONAL: params.maxRotationSpeed
		//OPTIONAL: params.toAngle
		
		//OPTIONAL: params.alpha
		//OPTIONAL: params.fadingSpeed
		//OPTIONAL: params.fadingAccel
		//OPTIONAL: params.minFadingSpeed
		//OPTIONAL: params.maxFadingSpeed
		//OPTIONAL: params.toAlpha
		
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트
		
		//OPTIONAL: params.width
		//OPTIONAL: params.height
		//OPTIONAL: params.color
		
		var
		// width
		width,
		
		// height
		height,
		
		// color
		color,
		
		// set width.
		setWidth,
		
		// get width.
		getWidth,
		
		// set height.
		setHeight,
		
		// get height.
		getHeight,
		
		// check point circle.
		checkPointCircle = SkyEngine.Util.Collision.checkPointCircle,
		
		// check rect circle.
		checkRectCircle = SkyEngine.Util.Collision.checkRectCircle,
		
		// check circle circle.
		checkCircleCircle = SkyEngine.Util.Collision.checkCircleCircle,
		
		// check point.
		checkPoint,
		
		// check area.
		checkArea,
		
		// draw.
		draw;
		
		if (params !== undefined) {
			width = params.width;
			height = params.height;
			color = params.color;
		}
		
		if (width === undefined) {
			width = 0;
		}
		
		if (height === undefined) {
			height = 0;
		}
		
		if (color === undefined) {
			color = '#000';
		}
		
		self.setWidth = setWidth = function(_width) {
			width = _width;
		};
		
		self.getWidth = getWidth = function() {
			return width;
		};
		
		self.setHeight = setHeight = function(_height) {
			height = _height;
		};
		
		self.getHeight = getHeight = function() {
			return height;
		};
		
		self.checkPoint = checkPoint = function(touchX, touchY) {
			
			return checkPointCircle(
				touchX,
				touchY,
				self.getRealX(),
				self.getRealY(),
				width * self.getRealScaleX(),
				height * self.getRealScaleY(),
				self.getRealRadian()
			);
		};
		
		OVERRIDE(self.checkArea, function(origin) {
			
			self.checkArea = checkArea = function(collider) {
				// target이 Rect인 경우 작동
				// target이 같은 Circle인 경우 작동
				
				if (collider.type === SkyEngine.Rect) {
					
					if (checkRectCircle(
						collider.getRealX(), collider.getRealY(), collider.getWidth() * collider.getRealScaleX(), collider.getHeight() * collider.getRealScaleY(), collider.getRealRadian(),
						self.getRealX(), self.getRealY(), width * self.getRealScaleX(), height * self.getRealScaleY(), self.getRealRadian()
					) === true) {
						return true;
					}
				}
				
				else if (collider.type === SkyEngine.Circle) {
					
					if (checkCircleCircle(
						self.getRealX(), self.getRealY(), width * self.getRealScaleX(), height * self.getRealScaleY(), self.getRealRadian(),
						collider.getRealX(), collider.getRealY(), collider.getWidth() * collider.getRealScaleX(), collider.getHeight() * collider.getRealScaleY(), collider.getRealRadian()
					) === true) {
						return true;
					}
				}
				
				return origin();
			};
		});
		
		OVERRIDE(self.draw, function(origin) {
			
			self.draw = draw = function(context, realX, realY, realScaleX, realScaleY, realRadian, realAlpha) {
				
				context.beginPath();
				context.ellipse(0, 0, width / 2, height / 2, 0, 0, 2 * Math.PI);
				
				context.fillStyle = color;
				context.fill();
				
				origin(context, realX, realY, realScaleX, realScaleY, realRadian, realAlpha);
			};
		});
	}
});
