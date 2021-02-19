const vertexShaderSrc =
`
attribute vec3 Position;
attribute vec3 Color;

uniform mat4 Matrix;
uniform mat4 camera;
uniform mat4 projection;

varying vec3 vColor;

void main ()
{
    gl_Position = projection * camera * Matrix * vec4(Position, 1.0);
    vColor = Color;
}
`;
export default vertexShaderSrc;