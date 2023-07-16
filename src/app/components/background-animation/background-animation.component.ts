import { Component, OnInit,  ElementRef, Renderer2} from '@angular/core';

import * as THREE from 'three'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'

@Component({
  selector: 'app-background-animation',
  templateUrl: './background-animation.component.html',
  styleUrls: ['./background-animation.component.css']
})
export class BackgroundAnimationComponent implements OnInit {
  SEPARATION = 40;
  AMOUNTX = 130;
  AMOUNTY = 55;

  canvas!: HTMLDivElement;
  camera!: THREE.PerspectiveCamera;
  scene!: THREE.Scene;
  renderer!: THREE.WebGLRenderer;
  particles: THREE.Sprite[] = [];
  count = 0;


  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {}

  ngOnInit(): void {
    this.canvas = this.elementRef.nativeElement.querySelector('#canvas');
    if(this.canvas){
      this.createCanvasBox();
      this.animate();
    }
    
  }

  createCanvasBox(): void {
    this.camera = new THREE.PerspectiveCamera(
      120,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    this.camera.position.y = 250;
    this.camera.position.z = 500;
    this.camera.rotation.x = 0.45;

    this.scene = new THREE.Scene();
    this.particles = new Array<THREE.Sprite>();

    
    const material = new THREE.SpriteMaterial({
      color: 0x939393,
      map: new THREE.TextureLoader().load('./assets/images/circle.png'), 
      opacity: 1.0,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
    

    let i = 0;
    for (let ix = 0; ix < this.AMOUNTX; ix++) {
      for (let iy = 0; iy < this.AMOUNTY; iy++) {
        const particle = new THREE.Sprite(material);
        particle.position.x =
          ix * this.SEPARATION - (this.AMOUNTX * this.SEPARATION) / 2;
        particle.position.z =
          iy * this.SEPARATION - (this.AMOUNTY * this.SEPARATION) - 10;
        this.particles[i++] = particle;
        this.scene.add(particle);
      }
    }

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    const canvas = this.renderer.domElement;
    this.renderer2.appendChild(this.canvas, canvas)

    this.renderer.setClearColor(0x000000, 1);
    // this.canvas.appendChild(this.renderer.domElement);

    window.addEventListener('resize', this.onWindowResize.bind(this), false);

    
  }

  onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;

    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate(): void {
    requestAnimationFrame(this.animate.bind(this));
    this.render();
  }

  render(): void {
    let i = 0;

    for (let ix = 0; ix < this.AMOUNTX; ix++) {
      for (let iy = 0; iy < this.AMOUNTY; iy++) {
        const particle = this.particles[i++];
        particle.position.y =
          Math.sin((ix + this.count) * 0.5) * 20 +
          Math.sin((iy + this.count) * 0.5) * 20;
        particle.scale.set(
          (Math.sin((ix + this.count) * 0.3) + 2) * 4 +
            (Math.sin((iy + this.count) * 0.5) + 1) * 4,
          (Math.sin((ix + this.count) * 0.3) + 2) * 4 +
            (Math.sin((iy + this.count) * 0.5) + 1) * 4,
          1
        );
      }
    }

    this.renderer.render(this.scene, this.camera);

    this.count += 0.2;
  }

}
