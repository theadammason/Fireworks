var fireworks = [];
var gravity;

function setup() {
  createCanvas(400, 400);
  gravity = createVector(0, 0.2);
  background(0);

}

function draw() {
  background(0, 25);
  if (random(1) < 0.05) {
    fireworks.push(new Firework());
  }


  for (var i = fireworks.length-1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    if (fireworks[i].done()){
      fireworks.splice(i, 1);
    }
  }

}

function Firework() {
  this.red = random(1, 255);
  this.green = random(1, 255);
  this.blue = random(1, 255);
  this.firework = new Particle(random(width), height, this.red, this.green, this.blue, true);
  this.exploded = false;
  this.particles = [];

  this.update = function() {
    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.update();
      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }

    for (var i = this.particles.length-1; i >= 0; i--){
      this.particles[i].applyForce(gravity);
      this.particles[i].update();
      if (this.particles[i].done()){
        this.particles.splice(i, 1);
      }
    }
  }

  this.explode = function(){
    for (var i = 0; i < 100; i++){
      var p = new Particle(this.firework.pos.x, this.firework.pos.y, this.red, this.green, this.blue, false);
      this.particles.push(p);
    }
  }

  this.show = function() {
    if (!this.exploded){
      this.firework.show();
    }
    for (var i = 0; i < this.particles.length; i++){
      this.particles[i].show();
    }
  }

  this.done = function(){
    if (this.exploded && this.particles.length === 0){
      return true;
    } else {
      return false;
    }
  }
}

function Particle(x, y, red, green, blue, seed) {

  this.red = red;
  this.green = green;
  this.blue = blue;
  this.pos = createVector(x, y);
  this.lifespan = 255;
  if (seed){
    this.vel = createVector(0, random(-13, -8));
  } else {
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(1, 6));
  }

  this.acc = createVector(0, 0);

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.update = function() {
    if (!seed) {
      this.vel.mult(random(0.85, 1));
      this.lifespan -= 4;
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.done = function() {
    if (this.lifespan<0) {
      return true;
    } else {
      return false;
    }
  }

  this.show = function() {
    if (!seed){
      stroke(red, green, blue, this.lifespan);
      strokeWeight(2);
    } else {
      stroke(red, green, blue);
      strokeWeight(4);
    }

    point(this.pos.x, this.pos.y);
  }
}
