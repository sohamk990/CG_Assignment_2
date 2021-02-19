import { vec3, mat4 } from 'https://cdn.skypack.dev/gl-matrix';

export default class Transform
{
	constructor(Canvas)
	{
		this.Canvas = Canvas;

		this.translate = vec3.fromValues( 0.0, 0.0, 0.0);
		this.scale = vec3.fromValues( 1.0, 1.0, 1.0);
		this.rotationAngle = 0;
		this.rotationAxis = vec3.fromValues( 0, 1, 0);

		this.cameraposition = vec3.fromValues( 1.0, 1.0, 1.0);
		this.cameratarget = vec3.fromValues(0,0,0);
		this.cameraup = vec3.fromValues(0,1,0);

		this.modelMatrix = mat4.create();
		mat4.identity(this.modelMatrix);

		this.projectionMatrix = mat4.create();
		mat4.identity(this.projectionMatrix);
		mat4.perspective(this.projectionMatrix,90*Math.PI/180,this.Canvas.width/this.Canvas.height,1e-4,Infinity);

		this.cameraMatrix = mat4.create();
		mat4.identity(this.cameraMatrix);
		mat4.lookAt(this.cameraMatrix, this.cameraposition,this.cameratarget,this.cameraup);

		this.iviewMatrix = mat4.create();
		mat4.identity(this.iviewMatrix);
		
		this.mvpMatrix = this.modelMatrix;
		this.updateMVPMatrix();
	}

	getMVPMatrix()
	{
		return this.modelMatrix;
	}

	getCameraMatrix()
	{
		// return this.iviewMatrix;
		return this.cameraMatrix;
	}

	getProjectionMatrix()
	{
		return this.projectionMatrix;
	}

	updateMVPMatrix()
	{
		mat4.identity(this.modelMatrix);
		mat4.translate(this.modelMatrix, this.modelMatrix, this.translate);
		mat4.rotate(this.modelMatrix, this.modelMatrix, this.rotationAngle, this.rotationAxis);
		mat4.scale(this.modelMatrix, this.modelMatrix, this.scale);
		mat4.invert(this.iviewMatrix,this.cameraMatrix);		
	}

	setTranslate(translation)
	{
		this.translate = translation;
		this.updateMVPMatrix();
	}

	setRotate(rotationAxis, rotationAngle)
	{
		this.rotationAngle += rotationAngle;
		this.rotationAxis = rotationAxis;
		this.updateMVPMatrix();
	}

	setScale(scaling)
	{
		this.scale += scaling;
		this.updateMVPMatrix();
	}

	setCameraPosition(position)
	{
		this.cameraposition=position;
		mat4.lookAt(this.cameraMatrix,this.cameraposition,this.cameratarget,this.cameraup);
		this.updateMVPMatrix();
	}

	setCameraUp(Up)
	{
		this.cameraUp=Up;
		mat4.lookAt(this.cameraMatrix,this.cameraposition,this.cameratarget,this.cameraup);
		this.updateMVPMatrix();
	}
}