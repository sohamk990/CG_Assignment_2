import Transform from './transform.js'
import { vec3, vec4, mat4 } from 'https://cdn.skypack.dev/gl-matrix';

export default class Rectangle
{
	constructor(gl,shader,Canvas,coordinates,indices,color)
	{
        this.Canvas = Canvas;        
        this.gl = gl;
        this.shader = shader;
        
        this.transform = new Transform(this.Canvas);
        this.centroid=[0.0,0.0,0.0]        
        
        this.rotationAngle = 0;        
        this.translation = vec3.fromValues(...this.centroid);
        this.scale = vec3.fromValues( 1.0, 1.0, 1.0);
        this.rotationAxis = vec3.fromValues( 0, 0, 1);        
        
        this.vertexData = new Float32Array(coordinates);
        this.vertexIndices = new Uint16Array(indices);
        
        this.color = new Float32Array([...color]);
        var carr = [];
        for(let i=0 ; i<this.vertexData.length; i+=3) carr.push(...this.color,);        
                
        this.colorData = new Float32Array ([...carr]);
        
        console.log(this.vertexData);
        console.log(this.vertexIndices);
        console.log(this.colorData);

		this.vertexBuffer = this.gl.createBuffer();
		if (!this.vertexBuffer)
		{
			throw new Error("Buffer for vertex attributes could not be allocated");
        }        

		this.colorBuffer = this.gl.createBuffer();
		if (!this.colorBuffer)
		{
			throw new Error("Buffer for color attributes could not be allocated");
        }

        this.transform.setTranslate(this.translation);
        this.transform.setScale(this.scale);
        this.transform.setRotate(this.rotationAxis,this.rotationAngle);
        this.transform.updateMVPMatrix();
        this.draw();
	}


	draw()
	{
		let elementPerVertex = 3;
		
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertexData, this.gl.DYNAMIC_DRAW);

		const Position = this.shader.attribute("Position");
        this.gl.enableVertexAttribArray(Position);
		this.gl.vertexAttribPointer(Position, elementPerVertex, this.gl.FLOAT, false, 0, 0);
        
        
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.colorData, this.gl.DYNAMIC_DRAW);

		const Color = this.shader.attribute("Color");
        this.gl.enableVertexAttribArray(Color);
        this.gl.vertexAttribPointer(Color, elementPerVertex, this.gl.FLOAT, false, 0, 0);
                
        
        const Matrix = this.shader.uniform("Matrix");
        this.shader.setUniformMatrix4fv(Matrix, this.transform.getMVPMatrix());

        const camera = this.shader.uniform("camera");
        this.shader.setUniformMatrix4fv(camera, this.transform.getCameraMatrix());
        
        const projection = this.shader.uniform("projection");
        this.shader.setUniformMatrix4fv(projection, this.transform.getProjectionMatrix());

        const indexBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this.vertexIndices, this.gl.DYNAMIC_DRAW);

        this.gl.drawElements (this.gl.TRIANGLES,this.vertexIndices.length, this.gl.UNSIGNED_SHORT, indexBuffer);
    }

    getTransform()
    {
        return this.transform;
    }

    // Rotate(pos,dir)
    // {
    //     let angle = dir*Math.PI/4.0;
    //     this.rotationAngle+=angle;

    //     let px=this.translation[0];
    //     let py=this.translation[1];

    //     let ox=pos[0];
    //     let oy=pos[1];
        
    //     let pnx = Math.cos(angle) * (px-ox) - Math.sin(angle) * (py-oy) + ox
    //     let pny = Math.sin(angle) * (px-ox) + Math.cos(angle) * (py-oy) + oy
        
    //     this.translation[0]=pnx;
    //     this.translation[1]=pny;
        
    //     this.transform.setTranslate(this.translation);
    //     this.transform.setRotate(this.rotationAxis,this.rotationAngle);
    //     this.transform.updateMVPMatrix();
    //     this.draw();
    // }

    get_centroid()
    {
        return this.translation;
    }

    get_cooridantes()
    {
        let px = this.translation[0];
        let py = this.translation[1];

        return new Float32Array ([px+0.5*this.scale,px-0.5*this.scale,py+1*this.scale,py-1*this.scale]);
    }
}