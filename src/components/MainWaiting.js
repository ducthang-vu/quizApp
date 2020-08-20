import React, { useRef, useEffect } from 'react';
import '../style/MainWaiting.scss'

function MainWaiting() {
    const canvasRef = useRef()
    useEffect(()=> {
        const canvas = canvasRef.current
        const canvasWrapper = document.getElementById('canvas-wrapper')
        canvas.width = canvasWrapper.offsetWidth;
        canvas.height = canvasWrapper.offsetHeight;

        const c = canvas.getContext('2d')
        
        class CircleDot {
            constructor(x, y, radius, color) {
                this.x = x
                this.y = y
                this.radius = radius
                this.color = color
                this.angle = Math.random() * 2 * Math.PI 
                this.arcAngle = 0.10
            }

            move() {
                this.angle += this.arcAngle / 2
            }

            print() {
                c.beginPath()
                c.strokeStyle = this.color
                c.moveTo(this.x + this.radius * Math.cos(this.angle), this.y + this.radius * Math.sin(this.angle));
                c.lineTo(this.x + this.radius * Math.cos(this.angle + this.arcAngle), this.y + this.radius * Math.sin(this.angle + this.arcAngle));
                c.lineWidth = 2
                c.stroke(); 
            }
        }
        
        class Animation {
            constructor(dotsNumber, maxTranslateSpeed) {
                this.dotsNumber = dotsNumber
                this.translateSpeed = maxTranslateSpeed
                this.dots = []
        
                for (let i = 0; i < dotsNumber; i++) {
                    this.dots.push(new CircleDot(canvas.width / 2, canvas.height / 2, Math.random() * 20 + 50, 'green') )
                }

                this.animate()
            }

            addCanvasLayer() {
                c.beginPath()
                c.rect(0, 0, canvas.width, canvas.height)
                c.fillStyle = 'rgba(242, 240, 242, 0.5)'
                c.fill()
            }
            
            animate() {
                requestAnimationFrame(() => this.animate())

                this.addCanvasLayer()
                for (let dot of this.dots) {
                    dot.move()
                    dot.print()
                }
            }
        }
        new Animation(30, 1)
        }, []
    )

    return(
        <div className="main-waiting">
            <h2>Fetching questions...</h2>
            <div id="canvas-wrapper">
                <canvas id="canvas" ref={canvasRef}></canvas>
            </div>
        </div>
    )
}

export default MainWaiting