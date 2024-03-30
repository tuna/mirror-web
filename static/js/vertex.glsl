attribute vec3 a_pos;
uniform vec2 u_screen;
uniform vec2 u_mouse;
uniform vec2 u_offset;

void main() {
  vec2 pos_screen = a_pos.xy - u_offset;
  vec2 pos_translated;
  pos_translated.x = pos_screen.x + (pos_screen.x - u_mouse.x) * a_pos.z * 1000;
  pos_translated.y = pos_screen.y + (pos_screen.y - u_mouse.y) * a_pos.z * 1000;
  gl_Position.x = pos_translated.x / u_screen * 2 - 1;
  gl_Position.y = pos_translated.y / u_screen * 2 - 1;
}