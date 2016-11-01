
import React from 'react';

const remote = require('electron').remote;

var styles = {
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: -1,
    left: 0,
    top: 0,
  }
};

var now, start = Date.now();

var Background = React.createClass({

  componentDidMount: function () {
    const self = this;

    function resize () {
      self.animation && self.animation.renderer.element.parentElement.removeChild(
        self.animation.renderer.element
      );
      // self.animation.renderer.gl.finish();

      self.animation = getAnimation();

      self.animation.renderer.setSize(
        self.animation.renderer.element.parentElement.clientWidth,
        self.animation.renderer.element.parentElement.clientHeight
      );

      self.animate();
    }

    remote.getCurrentWindow().on('show', resize);
    remote.getCurrentWindow().on('resize', resize);
  },

  animate: function () {
    now = Date.now() - start;
    this.animation.update();
    this.animation.renderer.render(this.animation.scene);
    requestAnimationFrame(this.animate);
  },

  render: function () {
    return (
      <div className="background" style={styles.container}></div>
    );
  }
})

export default Background;












var MESH = {
  width: 1.2,
  height: 1.2,
  depth: 10,
  segments: 16,
  slices: 8,
  xRange: 0.18,
  yRange: 0.3,
  zRange: 1.0,
  ambient: '#555555',
  diffuse: '#FFFFFF',
  speed: 0.0008
};

var LIGHT = {
  count: 1,
  xyScalar: 1,
  zOffset: 100,
  ambient: '#61054a',
  diffuse: '#844c0c',
  speed: 0.001,
  gravity: 1200,
  dampening: 0.95,
  minLimit: 10,
  maxLimit: null,
  minDistance: 20,
  maxDistance: 400,
  autopilot: false,
  draw: true,
  bounds: FSS.Vector3.create(),
  step: FSS.Vector3.create(
    Math.randomInRange(0.2, 1.0),
    Math.randomInRange(0.2, 1.0),
    Math.randomInRange(0.2, 1.0)
  )
};

function createMesh (renderer) {
  var geometry = new FSS.Plane(MESH.width * renderer.width, MESH.height * renderer.height, MESH.segments, MESH.slices);
  var material = new FSS.Material(MESH.ambient, MESH.diffuse);
  var mesh = new FSS.Mesh(geometry, material);
  var v, vertex;
  for (v = geometry.vertices.length - 1; v >= 0; v--) {
    vertex = geometry.vertices[v];
    vertex.anchor = FSS.Vector3.clone(vertex.position);
    vertex.step = FSS.Vector3.create(
      Math.randomInRange(0.2, 1.0),
      Math.randomInRange(0.2, 1.0),
      Math.randomInRange(0.2, 1.0)
    );
    vertex.time = Math.randomInRange(0, Math.PIM2);
  }

  return mesh;
}

function createLights(scene, renderer) {
  var l, light;
  for (l = scene.lights.length - 1; l >= 0; l--) {
    light = scene.lights[l];
    scene.remove(light);
  }
  renderer.clear();
  for (l = 0; l < LIGHT.count; l++) {
    light = new FSS.Light(LIGHT.ambient, LIGHT.diffuse);
    light.ambientHex = light.ambient.format();
    light.diffuseHex = light.diffuse.format();
    scene.add(light);

    // Augment light for animation
    light.mass = Math.randomInRange(0.5, 1);
    light.velocity = FSS.Vector3.create();
    light.acceleration = FSS.Vector3.create();
    light.force = FSS.Vector3.create();

    // Ring SVG Circle
    light.ring = document.createElementNS(FSS.SVGNS, 'circle');
    light.ring.setAttributeNS(null, 'stroke', light.ambientHex);
    light.ring.setAttributeNS(null, 'stroke-width', '0.5');
    light.ring.setAttributeNS(null, 'fill', 'none');
    light.ring.setAttributeNS(null, 'r', '10');

    // Core SVG Circle
    light.core = document.createElementNS(FSS.SVGNS, 'circle');
    light.core.setAttributeNS(null, 'fill', light.diffuseHex);
    light.core.setAttributeNS(null, 'r', '4');
  }
}


function getAnimation () {
  // 1) Create a Renderer for the context you would like to render to.
  //    You can use either the WebGLRenderer, CanvasRenderer or SVGRenderer.
  var renderer = new FSS.WebGLRenderer();

  // 2) Add the Renderer's element to the DOM:
  var container = document.getElementsByClassName('background')[0];
  container.appendChild(renderer.element);
  renderer.setSize(window.innerWidth, window.innerHeight);

  var center = FSS.Vector3.create();
  var attractor = FSS.Vector3.create();

  // 3) Create a Scene:
  var scene = new FSS.Scene();

  var mesh = createMesh(renderer);
  var geometry = mesh.geometry;
  scene.add(mesh);

  createLights(scene, renderer)

  function update() {
    var ox, oy, oz, l, light, v, vertex, offset = MESH.depth/2;

    // Update Bounds
    FSS.Vector3.copy(LIGHT.bounds, center);
    FSS.Vector3.multiplyScalar(LIGHT.bounds, LIGHT.xyScalar);

    // Update Attractor
    FSS.Vector3.setZ(attractor, LIGHT.zOffset);

    // Overwrite the Attractor position
    if (LIGHT.autopilot) {
      ox = Math.sin(LIGHT.step[0] * now * LIGHT.speed);
      oy = Math.cos(LIGHT.step[1] * now * LIGHT.speed);
      FSS.Vector3.set(attractor,
        LIGHT.bounds[0]*ox,
        LIGHT.bounds[1]*oy,
        LIGHT.zOffset);
    }

    // Animate Lights
    for (l = scene.lights.length - 1; l >= 0; l--) {
      light = scene.lights[l];

      // Reset the z position of the light
      FSS.Vector3.setZ(light.position, LIGHT.zOffset);

      // Calculate the force Luke!
      var D = Math.clamp(FSS.Vector3.distanceSquared(light.position, attractor), LIGHT.minDistance, LIGHT.maxDistance);
      var F = LIGHT.gravity * light.mass / D;
      FSS.Vector3.subtractVectors(light.force, attractor, light.position);
      FSS.Vector3.normalise(light.force);
      FSS.Vector3.multiplyScalar(light.force, F);

      // Update the light position
      FSS.Vector3.set(light.acceleration);
      FSS.Vector3.add(light.acceleration, light.force);
      FSS.Vector3.add(light.velocity, light.acceleration);
      FSS.Vector3.multiplyScalar(light.velocity, LIGHT.dampening);
      FSS.Vector3.limit(light.velocity, LIGHT.minLimit, LIGHT.maxLimit);
      FSS.Vector3.add(light.position, light.velocity);
    }

    // Animate Vertices
    for (v = geometry.vertices.length - 1; v >= 0; v--) {
      vertex = geometry.vertices[v];
      ox = Math.sin(vertex.time + vertex.step[0] * now * MESH.speed);
      oy = Math.cos(vertex.time + vertex.step[1] * now * MESH.speed);
      oz = Math.sin(vertex.time + vertex.step[2] * now * MESH.speed);
      FSS.Vector3.set(vertex.position,
        MESH.xRange*geometry.segmentWidth*ox,
        MESH.yRange*geometry.sliceHeight*oy,
        MESH.zRange*offset*oz - offset);
      FSS.Vector3.add(vertex.position, vertex.anchor);
    }

    // Set the Geometry to dirty
    geometry.dirty = true;
  }

  return {
    renderer: renderer,
    update: update,
    scene: scene
  }
}