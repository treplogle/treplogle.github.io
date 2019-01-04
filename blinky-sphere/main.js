
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const backgroundColor = "black";
const lineColor = "grey";
const discColor = "white";
const rayColor = "grey";

const halfWidth = canvas.width * 0.5;
const halfHeight = canvas.height * 0.5;

function clearScreen() {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawLine(p1, p2) {
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
}

function distance(p1, p2) {
    const x = p2.x - p1.x;
    const y = p2.y - p1.y;
    return Math.sqrt(x * x + y * y);
}

const center = {x: halfWidth, y: halfHeight};
function centerDistance(p) {
    return distance(p, center);
}

function vecToCenter(p) {
    return {
        x: center.x - p.x,
        y: center.y - p.y
    };
}

function vecFromCenter(p) {
    return {
        x: p.x - center.x,
        y: p.y - center.y
    };
}

function normal(v) {
    const length = Math.sqrt(v.x * v.x + v.y * v.y);
    if (length === 0) {
        return {x: 0, y: 0};
    }

    return {
        x: Math.abs(v.x) / length,
        y: Math.abs(v.y) / length
    };
}

function toCenter(pt) {
    return {
        x: pt.x + halfWidth,
        y: pt.y + halfHeight,
        z: pt.z
    };
}

function IcoSphere(recursion, size) {
    const self = this;
    this.geometry = { positions: [], faces: [], centers: [] };
    let index = 0;
    const cache = {};

    function addVertex(p) {
        const length = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
        self.geometry.positions.push({ x: p.x / length, y: p.y / length, z: p.z / length });
        return index++;
    }

    function getMidPoint(p1, p2) {
        const firstIsSmaller = p1 < p2;
        const smallerIndex = firstIsSmaller ? p1 : p2;
        const greaterIndex = firstIsSmaller ? p2 : p1;
        const key = (smallerIndex << 16) + greaterIndex;

        const ret = cache[key];
        if (typeof ret !== "undefined") {
            return ret;
        }

        const point1 = self.geometry.positions[p1];
        const point2 = self.geometry.positions[p2];

        const middle = {
            x: (point1.x + point2.x) / 2.0,
            y: (point1.y + point2.y) / 2.0,
            z: (point1.z + point2.z) / 2.0
        };

        const i = addVertex(middle);
        cache[key] = i;
        return i;
    }

    function create() {
        const t = (1.0 + Math.sqrt(5.0)) / 2.0;

        // Create 12 vertices of an icosahedron.
        addVertex({ x: -1, y: t, z: 0 });
        addVertex({ x: 1, y: t, z: 0 });
        addVertex({ x: -1, y: -t, z: 0 });
        addVertex({ x: 1, y: -t, z: 0 });
        addVertex({ x: 0, y: -1, z: t });
        addVertex({ x: 0, y: 1, z: t });
        addVertex({ x: 0, y: -1, z: -t });
        addVertex({ x: 0, y: 1, z: -t });
        addVertex({ x: t, y: 0, z: -1 });
        addVertex({ x: t, y: 0, z: 1 });
        addVertex({ x: -t, y: 0, z: -1 });
        addVertex({ x: -t, y: 0, z: 1 });

        // Create 20 triangles of the icosahedron.
        let faces = [];

        // 5 faces around point 0
        faces.push({ v1: 0, v2: 11, v3: 5 });
        faces.push({ v1: 0, v2: 5, v3: 1 });
        faces.push({ v1: 0, v2: 1, v3: 7 });
        faces.push({ v1: 0, v2: 7, v3: 10 });
        faces.push({ v1: 0, v2: 10, v3: 11 });

        // 5 adjacent faces 
        faces.push({ v1: 1, v2: 5, v3: 9 });
        faces.push({ v1: 5, v2: 11, v3: 4 });
        faces.push({ v1: 11, v2: 10, v3: 2 });
        faces.push({ v1: 10, v2: 7, v3: 6 });
        faces.push({ v1: 7, v2: 1, v3: 8 });

        // 5 faces around point 3
        faces.push({ v1: 3, v2: 9, v3: 4 });
        faces.push({ v1: 3, v2: 4, v3: 2 });
        faces.push({ v1: 3, v2: 2, v3: 6 });
        faces.push({ v1: 3, v2: 6, v3: 8 });
        faces.push({ v1: 3, v2: 8, v3: 9 });

        // 5 adjacent faces 
        faces.push({ v1: 4, v2: 9, v3: 5 });
        faces.push({ v1: 2, v2: 4, v3: 11 });
        faces.push({ v1: 6, v2: 2, v3: 10 });
        faces.push({ v1: 8, v2: 6, v3: 7 });
        faces.push({ v1: 9, v2: 8, v3: 1 });

        // Refine triangles
        for (let i = 0; i < recursion; i++) {
            
            const faces2 = [];
            for (let f = 0; f < faces.length; f++) {

                // Replace triangle by 4 triangles.
                const a = getMidPoint(faces[f].v1, faces[f].v2);
                const b = getMidPoint(faces[f].v2, faces[f].v3);
                const c = getMidPoint(faces[f].v3, faces[f].v1);

                faces2.push({v1: faces[f].v1, v2: a, v3: c});
                faces2.push({v1: faces[f].v2, v2: b, v3: a});
                faces2.push({v1: faces[f].v3, v2: c, v3: b});
                faces2.push({v1: a, v2: b, v3: c});
            }
            faces = faces2;
        }

        // Add triangles to mesh
        for (let f = 0; f < faces.length; f++) {
            self.geometry.faces.push(faces[f]);
            
            const p1 = self.geometry.positions[faces[f].v1];
            const p2 = self.geometry.positions[faces[f].v2];
            const p3 = self.geometry.positions[faces[f].v3];
            
            const x = (p1.x * size + p2.x * size + p3.x * size) / 3;
            const y = (p1.y * size + p2.y * size + p3.y * size) / 3;
            const z = (p1.z * size + p2.z * size + p3.z * size) / 3;
            
            self.geometry.centers.push({
                x: x,
                y: y,
                z: z,
                discSize: Math.random(),
                discDir: 1,
                rayLength: 0,
                rayDir: 1,
                theta: (x === 0 ? 0 : Math.atan2(y, x)) / Math.twoPi, // Convert to 0 .. 1
                phi: (z === 0 ? 0 : Math.atan2(Math.sqrt(x * x + y * y), z)) / Math.twoPi
            });
        }

        for (let p = 0; p < self.geometry.positions.length; p++) {
            const pos = self.geometry.positions[p];
            pos.x *= size;
            pos.y *= size;
            pos.z *= size;
        }
    }

    create();
}

function noiseToAlpha(n) {
    // -1 to 1
    return (n + 1.0) / 2.0;
}

function noiseToByte(n) {
    // -1 to 1
    return Math.round(255 * ((n + 1.0) / 2.0));
}

function toRgbString(r, g, b) {
    return "rgb(" + noiseToByte(r) + "," + noiseToByte(g) + "," + noiseToByte(b) + ")";
}

function toHslString(h, s, l) {
    return "hsl(" + noiseToByte(h) + "," + s + "%," + l + "%)";
}

function randomRotation() {
    return Math.random() * 0.01 - 0.005;
}

const rotation = {
    x: randomRotation(),
    y: randomRotation(),
    z: randomRotation()
};

noise.seed(Math.random());
const sphereSize = 200; // Half
const is = new IcoSphere(2, sphereSize);
const transform = jMath.Matrix4.identity();

ctx.strokeStyle = lineColor;
ctx.lineWidth = 1;

let colorMode = true;

function setColor() {
    colorMode = true;
}

function setWhite() {
    colorMode = false;
}

let lastFrame = new Date();
let noiseTime = 0;
function loop() {
    let now = new Date();
    let elapsed = (now.getTime() - lastFrame.getTime()) / 1000.0;
    if (elapsed > 0.5) {
        elapsed = 0.5;
    }
    lastFrame = now;

    noiseTime += elapsed * 0.5;

    clearScreen();

    transform.mult(jMath.Matrix4.createRotX(rotation.x));
    transform.mult(jMath.Matrix4.createRotY(rotation.y));
    transform.mult(jMath.Matrix4.createRotZ(rotation.z));
    const positions = [];
    const rawPositions = [];

    for (let p = 0; p < is.geometry.positions.length; p++) {
        const pos = jMath.Vector3.transformPos(is.geometry.positions[p], transform);
        rawPositions.push(pos);
        positions.push(toCenter(pos));
    }

    let centers = [];
    ctx.fillStyle = discColor;
    for (let p = 0; p < is.geometry.centers.length; p++) {
        
        const pt = is.geometry.centers[p];
        let trans = jMath.Vector3.transformPos(pt, transform);
        centers.push(trans);

        if (trans.z < 0) {
            continue;
        }

        pt.discSize += pt.discDir * elapsed * 2;
        if (pt.discDir > 0 && pt.discSize >= 1) {
            pt.discDir = -1;
        } else if (pt.discDir < 0 && pt.discSize <= 0.25) {
            pt.discDir = 1;
            pt.discSize = 0.25;
        }

        let size = pt.discSize;

        let angle = Math.atan2(trans.y, trans.x);

        trans = toCenter(trans);

        let dist = centerDistance(trans) / sphereSize;
        let curveScale = 1 + Math.log10(-dist * 0.9 + 1);
        if (curveScale > 1) {
            curveScale = 1;
        } else if (curveScale < 0) {
            curveScale = 0;
        }

        ctx.beginPath();
        if (colorMode) {
            pt.color = toHslString(noise.simplex3(pt.theta, pt.phi, noiseTime), 100, 50);
            ctx.fillStyle = pt.color;
        }
        ctx.ellipse(trans.x, trans.y, size * curveScale * 8, size * 8, angle, 0, 2 * Math.PI);
        ctx.fill();
    }

    ctx.beginPath();
    ctx.strokeStyle = lineColor;
    const min = -15;
    for (let f = 0; f < is.geometry.faces.length; f++) {
        const p1 = positions[is.geometry.faces[f].v1];
        const p2 = positions[is.geometry.faces[f].v2];
        
        if (p1.z >= min || p2.z >= min) {
            drawLine(p1, p2);
        }
        
        const p3 = positions[is.geometry.faces[f].v3];
        if (p3.z >= min) {
            drawLine(p2, p3);
        }
    }
    ctx.stroke();

    ctx.fillStyle = "black";
    for (let f = 0; f < is.geometry.faces.length; f++) {
        let p = positions[is.geometry.faces[f].v1];
        if (p.z >= 0) {
            const ap = rawPositions[is.geometry.faces[f].v1];
            const angle = Math.atan2(ap.y, ap.x);
            const dist = centerDistance(p) / sphereSize;
            const curveScale = 1 + Math.log10(-dist * 0.9 + 1);
            if (curveScale > 1) {
                curveScale = 1;
            } else if (curveScale < 0) {
                curveScale = 0;
            }

            ctx.beginPath();
            ctx.ellipse(p.x, p.y, curveScale * 15, 15, angle, 0, 2 * Math.PI);
            ctx.fill();
        }

        p = positions[is.geometry.faces[f].v2];
        if (p.z >= 0) {
            const ap = rawPositions[is.geometry.faces[f].v2];
            const angle = Math.atan2(ap.y, ap.x);
            const dist = centerDistance(p) / sphereSize;
            const curveScale = 1 + Math.log10(-dist * 0.9 + 1);
            if (curveScale > 1) {
                curveScale = 1;
            } else if (curveScale < 0) {
                curveScale = 0;
            }

            ctx.beginPath();
            ctx.ellipse(p.x, p.y, curveScale * 15, 15, angle, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    if (!colorMode) {
        ctx.beginPath();
        ctx.strokeStyle = rayColor;
    }
    
    for (let p = 0; p < centers.length; p++) {
        let pt = centers[p];
        const ray = is.geometry.centers[p];
        
        if (pt.z < 0) {
            continue;
        }

        ray.rayLength += ray.rayDir * elapsed * 150;
        if (ray.rayDir > 0 && (ray.rayLength >= 75 || Math.random() < 0.05)) {
            if (ray.rayLength > 75) {
                ray.rayLength = 75;
            }
            ray.rayDir = -1;
        } else if (ray.rayDir < 0 && ray.rayLength <= 0) {
            ray.rayDir = 1;
            ray.rayLength = 0;
        }

        const length = ray.rayLength;

        pt = toCenter(pt);
        const dist = centerDistance(pt) / sphereSize;
        const vec = normal(vecFromCenter(pt));
        if (pt.x < halfWidth) {
            vec.x *= -1;
        }
        if (pt.y < halfHeight) {
            vec.y *= -1;
        }
        const lengthScale = 1 + Math.log10(dist * 0.9 + 0.1);

        const pt2 = {
            x: pt.x + vec.x * lengthScale * length,
            y: pt.y + vec.y * lengthScale * length
        };

        if (colorMode) {
            ctx.beginPath();
            ctx.strokeStyle = ray.color;
            drawLine(pt, pt2);
            ctx.stroke();
        } else {
            drawLine(pt, pt2);
        }
    }

    if (!colorMode) {
        ctx.stroke();
    }

    window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);