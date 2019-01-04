/*
Copyright (c) 2010 Thomas Replogle

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/*
 * Note: A very significant portion of this code came from OpenTK.
 * http://www.opentk.com/
 */

(function() {

    // Enable strict mode.
    "use strict";
    
    /**
     * @namespace Contains higher-level math objects for use in Javascript.
     */
    var jMath = window.jMath =  { };
    
    /* 
     * Global Math extensions.
     */
    
    // Constants
    
    /**
     * Pi/2
     * @constant
     */
    Math.piOver2 = Math.PI / 2.0;
    
    /**
     * Pi/3
     * @constant
     */
    Math.piOver3 = Math.PI / 3.0;
    
    /**
     * Pi/4
     * @constant
     */
    Math.piOver4 = Math.PI / 4.0;
    
    /**
     * Pi/6
     * @constant
     */
    Math.piOver6 = Math.PI / 6.0;
    
    /**
     * Pi * 2
     * @constant
     */
    Math.twoPi = Math.PI * 2.0;
    
    
    // Functions
     
    /**
     * Converts degrees to radians.
     * @addon
     * @param {Number} degrees The degrees to convert.
     * @returns {Number} The radians.
     */
    Math.rad = function(/*Number*/ degrees) {
        return degrees * (Math.PI / 180.0);
    };
    
    /**
     * Converts radians to degrees.
     * @param {Number} radians The radians to convert.
     * @returns {Number} The degrees.
     */
    Math.deg = function(/*Number*/ radians) {
        return radians * (180.0 / Math.PI);
    };
    
    /*
     * Constructors
     */
    
    /**
     * Represents a 2D vector.
     * @constructor
     * @param {Number} [x=0] The X component.
     * @param {Number} [y=0] The Y component.
     */
    jMath.Vector2 = function(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    };
    
    /**
     * Represents a 3D vector.
     * @constructor
     * @param {Number} [x=0] The X component.
     * @param {Number} [y=0] The Y component.
     * @param {Number} [z=0] The Z component.
     */
    jMath.Vector3 = function(x, y, z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    };
    
    /**
     * Represents a 4D vector.
     * @constructor
     * @param {Number} [x=0] The X component.
     * @param {Number} [y=0] The Y component.
     * @param {Number} [z=0] The Z component.
     * @param {Number} [w=0] The W component.
     */
    jMath.Vector4 = function(x, y, z, w) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.w = w || 0;
    };
    
    /**
     * Represents a quaternion.
     * @constructor
     * @param {Number} [x=0] The X component.
     * @param {Number} [y=0] The Y component.
     * @param {Number} [z=0] The Z component.
     * @param {Number} [w=0] The W component.
     */
    jMath.Quat = function(x, y, z, w) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.w = w || 0;
    };
    
    /**
     * Represents a 2x2 matrix.
     * @constructor
     * @param {Number} [m11=0] First item of the first row of the matrix.
     * @param {Number} [m12=0] Second item of the first row of the matrix.
     * @param {Number} [m21=0] First item of the second row of the matrix.
     * @param {Number} [m22=0] Second item of the second row of the matrix.
     */
    jMath.Matrix2 = function(m11, m12, m21, m22) {
        if (typeof m11 === "undefined") {
            this._11 = 0;
        } else {
            this._11 = m11;
        }
        
        if (typeof m12 === "undefined") {
            this._12 = 0;
        } else {
            this._12 = m12;
        }
        
        if (typeof m21 === "undefined") {
            this._21 = 0;
        } else {
            this._21 = m21;
        }
        
        if (typeof m22 === "undefined") {
            this._22 = 0;
        } else {
            this._22 = m22;
        }
    };
    
    /**
     * Represents a 4x4 matrix.
     * @constructor
     * @param {Vector4} [row0=Vector4.zero()] Top row of the matrix.
     * @param {Vector4} [row1=Vector4.zero()] Second row of the matrix.
     * @param {Vector4} [row2=Vector4.zero()] Third row of the matrix.
     * @param {Vector4} [row3=Vector4.zero()] Fourth row of the matrix.
     */
    jMath.Matrix4 = function(row0, row1, row2, row3) {
        this.row0 = row0 || Vector4.zero();
        this.row1 = row1 || Vector4.zero();
        this.row2 = row2 || Vector4.zero();
        this.row3 = row3 || Vector4.zero();
    };
    
    // Add variables to local namespace for convenience.
    /**
     * @private
     */
    var Vector2 = jMath.Vector2;
    /**
     * @private
     */
    var Vector3 = jMath.Vector3;
    /**
     * @private
     */
    var Vector4 = jMath.Vector4;
    /**
     * @private
     */
    var Matrix2 = jMath.Matrix2;
    /**
     * @private
     */
    var Matrix4 = jMath.Matrix4;
    /**
     * @private
     */
    var Quat = jMath.Quat;
    
    // **********************
    // Vector2
    
    // Static methods/properties
    
    /**
     * Defines a unit-length vector that points towards the X-axis.
     * @static
     * @type jMath.Vector2
     */
    jMath.Vector2.unitx = function() { return new Vector2(1, 0); };
    
    /**
     * Defines a unit-length vector that points towards the Y-axis.
     * @static
     * @type jMath.Vector2
     */
    jMath.Vector2.unity = function() { return new Vector2(0, 1); };
    
    /**
     * Defines a zero length vector.
     * @static
     * @type jMath.Vector2
     */
    jMath.Vector2.zero = function() { return new Vector2(0, 0); };
    
    /**
     * Defines an instance with all components set to 1.
     * @static
     * @type jMath.Vector2
     */
    jMath.Vector2.one = function() { return new Vector2(1, 1); };
    
    /**
     * Adds two vectors or a vector and a number.
     * @static
     * @param {jMath.Vector2|Number} left The left operand.
     * @param {jMath.Vector2|Number} right The right operand.
     * @type jMath.Vector2
     */
    jMath.Vector2.add = function(left, right) {
        if (typeof(left) === "number") {
            return new Vector2(left + right.x, left + right.y);
        } else if (typeof(right) === "number") {
            return new Vector2(left.x + right, left.y + right);
        } else {
            return new Vector2(left.x + right.x, left.y + right.y);
        }
    };
    
    /**
     * Subtracts two vectors or a vector and a number.
     * @static
     * @param {jMath.Vector2} left The left operand.
     * @param {jMath.Vector2|Number} right The right operand.
     * @type jMath.Vector2
     */
    jMath.Vector2.sub = function(left, right) {
        if (typeof(left) === "number") {
            throw("Invalid operation: cannot subtract a vector from a number.");
        } else if (typeof(right) === "number") {
            return new Vector2(left.x - right, left.y - right);
        } else {
            return new Vector2(left.x - right.x, left.y - right.y);
        }
    };
    
    /**
     * Multiplies two vectors or a vector and a number.
     * @static
     * @param {jMath.Vector2|Number} left The left operand.
     * @param {jMath.Vector2|Number} right The right operand.
     * @type jMath.Vector2
     */
    jMath.Vector2.mult = function(left, right) {
        if (typeof(left) === "number") {
            return new Vector2(left * right.x, left * right.y);
        } else if (typeof(right) === "number") {
            return new Vector2(left.x * right, left.y * right);
        } else {
            return new Vector2(left.x * right.x, left.y * right.y);
        }
    };
    
    /**
     * Divides two vectors or a vector and a number.
     * @static
     * @param {jMath.Vector2} left The left operand.
     * @param {jMath.Vector2|Number} right The right operand.
     * @type jMath.Vector2
     */
    jMath.Vector2.div = function(left, right) {
        if (typeof(left) === "number") {
            throw("Invalid operation: cannot divide a number by a vector.");
        } else if (typeof(right) === "number") {
            return new Vector2(left.x / right, left.y / right);
        } else {
            return new Vector2(left.x / right.x, left.y / right.y);
        }
    };
    
    /**
     * Calculates the dot product of two vectors.
     * @static
     * @param {jMath.Vector2} left The left operand.
     * @param {jMath.Vector2} right The right operand.
     * @returns {Number} The dot product.
     */
    jMath.Vector2.dot = function(left, right) {
        return left.x * right.x + left.y * right.y;
    };
    
    /**
     * Returns the given vector with all components negated.
     * @static
     * @param {jMath.Vector2} vec The vector to negate.
     * @returns {jMath.Vector2} The negated vector.
     */
    jMath.Vector2.negative = function(/*Vector2*/ vec) {
        return new Vector2(-vec.x, -vec.y);
    };
    
    /**
     * Returns the normalized version of the given vector.
     * @static
     * @param {jMath.Vector2} vec The vector to normalize.
     * @returns {jMath.Vector2} The normalized vector.
     */
    jMath.Vector2.normal = function(/*Vector2*/ vec) {
        var scale = 1.0 / vec.length();
        return new Vector2(
            vec.x * scale,
            vec.y * scale
        );
    };
    
    /**
     * Determines if two vectors are equal.
     * @static
     * @param {jMath.Vector2} left The left operand.
     * @param {jMath.Vector2} right The right operand.
     * @returns {Boolean} True if the vectors are equal, otherwise false.
     */
    jMath.Vector2.equal = function(/*Vector2*/ left, /*Vector2*/ right) {
        return left.equals(right);
    };
    
    /**
     * Clamps a vector to the specified ranges.
     * @static
     * @param {jMath.Vector2} vec The vector to clamp.
     * @param {jMath.Vector2} min The vector containing the minimum components.
     * @param {jMath.Vector2} max The vector containing the maximum components.
     * @returns {jMath.Vector2} The clamped vector.
     */
    jMath.Vector2.clamp = function(/*Vector2*/ vec, /*Vector2*/ min, /*Vector2*/ max) {
        return new Vector2(
            vec.x < min.x ? min.x : vec.x > max.x ? max.x : vec.x,
            vec.y < min.y ? min.y : vec.y > max.y ? max.y : vec.y
        );
    };
    
    jMath.Vector2.baryCentric = function(/*Vector2*/ a, /*Vector2*/ b, /*Vector2*/ c, /*Number*/ u, /*Number*/ v) {
        return Vector2.add(a, Vector2.add(Vector2.mult(Vector2.sub(c, a), v), Vector2.mult(Vector2.sub(b, a), u)));
    };
    
    jMath.Vector2.compMin = function(/*Vector2*/ a, /*Vector2*/ b) {
        return new Vector2(
            (a.x < b.x) ? a.x : b.x,
            (a.y < b.y) ? a.y : b.y
        );
    };
    
    jMath.Vector2.compMax = function(/*Vector2*/ a, /*Vector2*/ b) {
        return new Vector2(
            (a.x > b.x) ? a.x : b.x,
            (a.y > b.y) ? a.y : b.y
        );
    };
    
    jMath.Vector2.min = function(/*Vector2*/ a, /*Vector2*/ b) {
        return (a.lengthSquared() < b.lengthSquared()) ? a : b;
    };
    
    jMath.Vector2.max = function(/*Vector2*/ a, /*Vector2*/ b) {
        return (a.lengthSquared() >= b.lengthSquared()) ? a : b;
    };
    
    jMath.Vector2.lerp = function(/*Vector2*/ v1, /*Vector2*/ v2, /*Number*/ blend) {
        return new Vector2(
            blend * (v2.x - v1.x) + v1.x,
            blend * (v2.y - v1.y) + v1.y
        );
    };
    
    /**
     * Transforms a vector by a quaternion rotation.
     * @param {Vector2} vec The vector to transform.
     * @param {Quat} quat The quaternion to rotate the vector by.
     * @returns {Vector2} The transformed vector.
     */
    Vector2.transform = function(vec, quat) {
        var v = new Quat(vec.X, vec.Y, 0, 0);
        var i = Quat.invert(quat);
        var t = Quat.mult(quat, v);
        v = Quat.mult(t, i);
    
        return new Vector2(v.x, v.y);
    };
    
    jMath.Vector2.prototype = {
        
        clone: function() {
            return new Vector2(this.x, this.y);
        },
        
        length: function() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        
        lengthSquared: function() {
            return (this.x * this.x + this.y * this.y);
        },
        
        clamp: function(min, max) {
            var res = Vector2.clamp(this, min, max);
            this.x = res.x;
            this.y = res.y;
        },
        
        normal: function() {
            return Vector2.normal(this);
        },
        
        normalize: function() {
            var scale = 1.0 / this.length();
            this.x *= scale;
            this.y *= scale;
            
            return this;
        },
        
        negative: function() {
            return new Vector2(-this.x, -this.y);
        },
        
        equals: function(v) {
            return (this.x == v.x && this.y == v.y);
        },
        
        add: function(v) {
            var res = Vector2.add(this, v);
            this.x = res.x;
            this.y = res.y;
        },
        
        sub: function(v) {
            var res = Vector2.sub(this, v);
            this.x = res.x;
            this.y = res.y;
        },
        
        mult: function(v) {
            var res = Vector2.mult(this, v);
            this.x = res.x;
            this.y = res.y;
        },
        
        div: function(v) {
            var res = Vector2.div(this, v);
            this.x = res.x;
            this.y = res.y;
        },
        
        dot: function(v) {
            var res = Vector2.dot(this, v);
            this.x = res.x;
            this.y = res.y;
        },
        
        perpRight: function() {
            return new Vector2(this.y, -this.x);
        },
        
        perpLeft: function() {
            return new Vector2(-this.y, this.x);
        },
        
        toString: function() {
            return "[" + [this.x, this.y].join(",") + "]";
        }
    };
    
    
    // **********************
    // Vector3
    
    // Static methods/properties
    Vector3.unitx = function() { return new Vector3(1, 0, 0); };
    Vector3.unity = function() { return new Vector3(0, 1, 0); };
    Vector3.unitz = function() { return new Vector3(0, 0, 1); };
    Vector3.zero = function() { return new Vector3(0, 0, 0); };
    Vector3.one = function() { return new Vector3(1, 1, 1); };
    
    Vector3.add = function(/*Vector3,Number*/ left, /*Vector3,Number*/ right) {
        if (typeof(left) === "number") {
            return new Vector3(left + right.x, left + right.y, left + right.z);
        } else if (typeof(right) === "number") {
            return new Vector3(left.x + right, left.y + right, left.z + right);
        } else {
            return new Vector3(left.x + right.x, left.y + right.y, left.z + right.z);
        }
    };
    
    Vector3.sub = function(/*Vector3*/ left, /*Vector3,Number*/ right) {
        if (typeof(left) === "number") {
            throw("Invalid operation: cannot subtract a vector from a number.");
        } else if (typeof(right) === "number") {
            return new Vector3(left.x - right, left.y - right, left.z - right);
        } else {
            return new Vector3(left.x - right.x, left.y - right.y, left.z - right.z);
        }
    };
    
    Vector3.mult = function(/*Vector3,Number*/ left, /*Vector3,Number*/ right) {
        if (typeof(left) === "number") {
            return new Vector3(left * right.x, left * right.y, left * right.z);
        } else if (typeof(right) === "number") {
            return new Vector3(left.x * right, left.y * right, left.z * right);
        } else {
            return new Vector3(left.x * right.x, left.y * right.y, left.z * right.z);
        }
    };
    
    Vector3.div = function(/*Vector3*/ left, /*Vector3,Number*/ right) {
        if (typeof(left) === "number") {
            throw("Invalid operation: cannot divide a number by a vector.");
        } else if (typeof(right) === "number") {
            return new Vector3(left.x / right, left.y / right, left.z / right);
        } else {
            return new Vector3(left.x / right.x, left.y / right.y, left.z / right.z);
        }
    };
    
    Vector3.dot = function(/*Vector3*/ left, /*Vector3*/ right) {
        return left.x * right.x + left.y * right.y + left.z * right.z;
    };
    
    Vector3.cross = function(/*Vector3*/ left, /*Vector3*/ right) {
        return new Vector3(
            left.y * right.z - left.z * right.y,
            left.z * right.x - left.x * right.z,
            left.x * right.y - left.y * right.x
        );
    };
    
    Vector3.negative = function(/*Vector3*/ vec) {
        return new Vector3(-vec.x, -vec.y, -vec.z);
    };
    
    Vector3.normal = function(/*Vector3*/ vec) {
        var scale = 1.0 / vec.length();
        return new Vector3(
            vec.x * scale,
            vec.y * scale,
            vec.z * scale
        );
    };
    
    Vector3.equal = function(/*Vector3*/ left, /*Vector3*/ right) {
        return left.equals(right);
    };
    
    Vector3.clamp = function(/*Vector3*/ vec, /*Vector3*/ min, /*Vector3*/ max) {
        return new Vector3(
            vec.x < min.x ? min.x : vec.x > max.x ? max.x : vec.x,
            vec.y < min.y ? min.y : vec.y > max.y ? max.y : vec.y,
            vec.z < min.z ? min.z : vec.z > max.z ? max.z : vec.z
        );
    };
    
    Vector3.baryCentric = function(/*Vector3*/ a, /*Vector3*/ b, /*Vector3*/ c, /*Number*/ u, /*Number*/ v) {
        return Vector3.add(a, Vector3.add(Vector3.mult(Vector3.sub(c, a), v), Vector3.mult(Vector3.sub(b, a), u)));
    };
    
    Vector3.compMin = function(/*Vector3*/ a, /*Vector3*/ b) {
        return new Vector3(
            (a.x < b.x) ? a.x : b.x,
            (a.y < b.y) ? a.y : b.y,
            (a.z < b.z) ? a.z : b.z
        );
    };
    
    Vector3.compMax = function(/*Vector3*/ a, /*Vector3*/ b) {
        return new Vector3(
            (a.x > b.x) ? a.x : b.x,
            (a.y > b.y) ? a.y : b.y,
            (a.z > b.z) ? a.z : b.z
        );
    };
    
    Vector3.min = function(/*Vector3*/ a, /*Vector3*/ b) {
        return (a.lengthSquared() < b.lengthSquared()) ? a : b;
    };
    
    Vector3.max = function(/*Vector3*/ a, /*Vector3*/ b) {
        return (a.lengthSquared() >= b.lengthSquared()) ? a : b;
    };
    
    Vector3.lerp = function(/*Vector3*/ v1, /*Vector3*/ v2, /*Number*/ blend) {
        return new Vector3(
            blend * (v2.x - v1.x) + v1.x,
            blend * (v2.y - v1.y) + v1.y,
            blend * (v2.z - v1.z) + v1.z
        );
    };
    
    Vector3.transform = function(/*Vector3*/ vec, /*Matrix4,Quat*/ trans) {
        if (typeof(trans.x) !== "undefined") {
            // Quaternion transform.
            // Since vec.W == 0, we can optimize trans * vec * trans^-1 as follows:
            // vec + 2.0 * cross(trans.xyz, cross(trans.xyz, vec) + trans.w * vec)
            var xyz = new Vector3(trans.x, trans.y, trans.z);
            var temp = Vector3.cross(xyz, vec);
            var temp2 = Vector3.mult(vec, trans.w);
            temp.add(temp2);
            temp = Vector3.cross(xyz, temp);
            temp.mult(2);
            return Vector3.add(vec, temp);
        } else {
            // Matrix transform.
            var vec4 = new Vector4(vec.x, vec.y, vec.z, 1.0);
            vec4 = Vector4.transform(vec4, trans);
            return new Vector3(vec4.x, vec4.y, vec4.z);
        }
    };
    
    Vector3.transformVec = function(/*Vector3*/ vec, /*Matrix4*/ mat) {
        var col0 = mat.column0();
        var col1 = mat.column1();
        var col2 = mat.column2();
        
        return new Vector3(
            Vector3.dot(vec, new Vector3(col0.x, col0.y, col0.z)),
            Vector3.dot(vec, new Vector3(col1.x, col1.y, col1.z)),
            Vector3.dot(vec, new Vector3(col2.x, col2.y, col2.z))
        );
    };
    
    Vector3.transformNorm = function(/*Vector3*/ norm, /*Matrix4*/ mat) {
        return Vector3.transformNormInv(norm, Matrix4.inverse(mat));
    };
    
    Vector3.transformNormInv = function(/*Vector3*/ norm, /*Matrix4*/ invMat) {
        return new Vector3(
            Vector3.dot(norm, new Vector3(invMat.row0.x, invMat.row0.y, invMat.row0.z)),
            Vector3.dot(norm, new Vector3(invMat.row1.x, invMat.row1.y, invMat.row1.z)),
            Vector3.dot(norm, new Vector3(invMat.row2.x, invMat.row2.y, invMat.row2.z))
        );
    };
    
    Vector3.transformPos = function(/*Vector3*/ pos, /*Matrix4*/ mat) {
        var col0 = mat.column0();
        var col1 = mat.column1();
        var col2 = mat.column2();
        
        // return new Vector3(
        //     Vector3.dot(pos, new Vector3(col0.x, col0.y, col0.z)) + mat.row3.x,
        //     Vector3.dot(pos, new Vector3(col1.x, col1.y, col1.z)) + mat.row3.y,
        //     Vector3.dot(pos, new Vector3(col2.x, col2.y, col2.z)) + mat.row3.z
        // );

        return {
            x: Vector3.dot(pos, new Vector3(col0.x, col0.y, col0.z)) + mat.row3.x,
            y: Vector3.dot(pos, new Vector3(col1.x, col1.y, col1.z)) + mat.row3.y,
            z: Vector3.dot(pos, new Vector3(col2.x, col2.y, col2.z)) + mat.row3.z
        };
    };
    
    Vector3.transformPers = function(/*Vector3*/ vec, /*Matrix4*/ mat) {
        var v = new Vector4(vec.x, vec.y, vec.z, 0);
        v = Vector4.transform(v, mat);
        
        return new Vector3(
            v.x / v.w,
            v.y / v.w,
            v.z / v.w
        );
    };
    
    Vector3.calcAngle = function(/*Vector3*/ first, /*Vector3*/ second) {
        return Math.acos((Vector3.dot(first, second)) / (first.length() * second.length()));
    };
    
    Vector3.prototype = {
        
        clone: function() {
            return new Vector3(this.x, this.y, this.z);
        },
        
        getXy: function() {
            return new Vector2(this.x, this.y);
        },
        
        length: function() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        },
        
        lengthSquared: function() {
            return (this.x * this.x + this.y * this.y + this.z * this.z);
        },
        
        clamp: function(min, max) {
            var res = Vector3.clamp(this, min, max);
            this.x = res.x;
            this.y = res.y;
            this.z = res.z;
        },
        
        normal: function() {
            return Vector3.normal(this);
        },
        
        normalize: function() {
            var scale = 1.0 / this.length();
            this.x *= scale;
            this.y *= scale;
            this.z *= scale;
            
            return this;
        },
        
        negative: function() {
            return new Vector3(-this.x, -this.y, -this.z);
        },
        
        equals: function(v) {
            return (this.x == v.x && this.y == v.y && this.z == v.z);
        },
        
        add: function(v) {
            var res = Vector3.add(this, v);
            this.x = res.x;
            this.y = res.y;
            this.z = res.z;
        },
        
        sub: function(v) {
            var res = Vector3.sub(this, v);
            this.x = res.x;
            this.y = res.y;
            this.z = res.z;
        },
        
        mult: function(v) {
            var res = Vector3.mult(this, v);
            this.x = res.x;
            this.y = res.y;
            this.z = res.z;
        },
        
        div: function(v) {
            var res = Vector3.div(this, v);
            this.x = res.x;
            this.y = res.y;
            this.z = res.z;
        },
        
        dot: function(v) {
            return this.x * v.x + this.y * v.y + this.z * v.z;
        },
        
        cross: function(v) {
            var res = Vector3.cross(this, v);
            this.x = res.x;
            this.y = res.y;
            this.z = res.z;
        },
        
        toString: function() {
            return "[" + [this.x, this.y, this.z].join(",") + "]";
        }
    };
    
    
    // **********************
    // Vector4
    
    // Static methods and properties.
    Vector4.unitx = function() { return new Vector4(1, 0, 0, 0); };
    Vector4.unity = function() { return new Vector4(0, 1, 0, 0); };
    Vector4.unitz = function() { return new Vector4(0, 0, 1, 0); };
    Vector4.unitw = function() { return new Vector4(0, 0, 0, 1); };
    Vector4.zero = function() { return new Vector4(0, 0, 0, 0); };
    Vector4.one = function() { return new Vector4(1, 1, 1, 1); };
    
    Vector4.add = function(/*Vector4,Number*/ left, /*Vector4,Number*/ right) {
        if (typeof(left) === "number") {
            return new Vector4(left + right.x, left + right.y, left + right.z, left + right.w);
        } else if (typeof(right) === "number") {
            return new Vector4(left.x + right, left.y + right, left.z + right, left.w + right);
        } else {
            return new Vector4(left.x + right.x, left.y + right.y, left.z + right.z, left.w + right.w);
        }
    };
    
    Vector4.sub = function(/*Vector4*/ left, /*Vector4,Number*/ right) {
        if (typeof(left) === "number") {
            throw("Invalid operation: cannot subtract a vector from a number.");
        } else if (typeof(right) === "number") {
            return new Vector4(left.x - right, left.y - right, left.z - right, left.w - right);
        } else {
            return new Vector4(left.x - right.x, left.y - right.y, left.z - right.z, left.w - right.w);
        }
    };
    
    Vector4.mult = function(/*Vector4,Number*/ left, /*Vector4,Number*/ right) {
        if (typeof(left) === "number") {
            return new Vector4(left * right.x, left * right.y, left * right.z, left * right.w);
        } else if (typeof(right) === "number") {
            return new Vector4(left.x * right, left.y * right, left.z * right, left.w * right);
        } else {
            return new Vector4(left.x * right.x, left.y * right.y, left.z * right.z, left.w * right.w);
        }
    };
    
    Vector4.div = function(/*Vector4*/ left, /*Vector4,Number*/ right) {
        if (typeof(left) === "number") {
            throw("Invalid operation: cannot divide a number by a vector.");
        } else if (typeof(right) === "number") {
            return new Vector4(left.x / right, left.y / right, left.z / right, left.w / right);
        } else {
            return new Vector4(left.x / right.x, left.y / right.y, left.z / right.z, left.w / right.w);
        }
    };
    
    Vector4.dot = function(/*Vector4*/ left, /*Vector4*/ right) {
        return left.x * right.x + left.y * right.y + left.z * right.z + left.w * right.w;
    };
    
    Vector4.negative = function(/*Vector4*/ vec) {
        return new Vector4(-vec.x, -vec.y, -vec.z, -vec.w);
    };
    
    Vector4.normal = function(/*Vector4*/ vec) {
        var scale = 1.0 / vec.length();
        return new Vector4(
            vec.x * scale,
            vec.y * scale,
            vec.z * scale,
            vec.w * scale
        );
    };
    
    Vector4.equal = function(/*Vector4*/ left, /*Vector4*/ right) {
        return left.equals(right);
    };
    
    Vector4.clamp = function(/*Vector4*/ vec, /*Vector4*/ min, /*Vector4*/ max) {
        return new Vector4(
            vec.x < min.x ? min.x : vec.x > max.x ? max.x : vec.x,
            vec.y < min.y ? min.y : vec.y > max.y ? max.y : vec.y,
            vec.z < min.z ? min.z : vec.z > max.z ? max.z : vec.z,
            vec.w < min.w ? min.w : vec.w > max.w ? max.w : vec.w
        );
    };
    
    Vector4.baryCentric = function(/*Vector4*/ a, /*Vector4*/ b, /*Vector4*/ c, /*Number*/ u, /*Number*/ v) {
        return Vector4.add(a, Vector4.add(Vector4.mult(Vector4.sub(c, a), v), Vector4.mult(Vector4.sub(b, a), u)));
    };
    
    Vector4.compMin = function(/*Vector4*/ a, /*Vector4*/ b) {
        return new Vector4(
            (a.x < b.x) ? a.x : b.x,
            (a.y < b.y) ? a.y : b.y,
            (a.z < b.z) ? a.z : b.z,
            (a.w < b.w) ? a.w : b.w
        );
    };
    
    Vector4.compMax = function(/*Vector4*/ a, /*Vector4*/ b) {
        return new Vector4(
            (a.x > b.x) ? a.x : b.x,
            (a.y > b.y) ? a.y : b.y,
            (a.z > b.z) ? a.z : b.z,
            (a.w > b.w) ? a.w : b.w
        );
    };
    
    Vector4.min = function(/*Vector4*/ a, /*Vector4*/ b) {
        return (a.lengthSquared() < b.lengthSquared()) ? a : b;
    };
    
    Vector4.max = function(/*Vector4*/ a, /*Vector4*/ b) {
        return (a.lengthSquared() >= b.lengthSquared()) ? a : b;
    };
    
    Vector4.lerp = function(/*Vector4*/ v1, /*Vector4*/ v2, /*Number*/ blend) {
        return new Vector4(
            blend * (v2.x - v1.x) + v1.x,
            blend * (v2.y - v1.y) + v1.y,
            blend * (v2.z - v1.z) + v1.z,
            blend * (v2.w - v1.w) + v1.w
        );
    };
    
    Vector4.transform = function(/*Vector4*/ vec, /*Matrix4,Quat*/ trans) {
        if (typeof(trans.x) !== "undefined") {
            // Quaternion transform.
            var v = new Quat(vec.x, vec.y, vec.z, vec.w);
            var i = trans.inverse();
            var t = Quat.mult(trans, v);
            v = Quat.mult(t, i);
            
            return new Vector4(v.x, v.y, v.z, v.w);
        } else {
            // Matrix transform.
            return new Vector4(
                vec.x * trans.row0.x + vec.y * trans.row1.x + vec.z * trans.row2.x + vec.w * trans.row3.x,
                vec.x * trans.row0.y + vec.y * trans.row1.y + vec.z * trans.row2.y + vec.w * trans.row3.y,
                vec.x * trans.row0.z + vec.y * trans.row1.z + vec.z * trans.row2.z + vec.w * trans.row3.z,
                vec.x * trans.row0.w + vec.y * trans.row1.w + vec.z * trans.row2.w + vec.w * trans.row3.w
            );
        }
    };
    
    Vector4.prototype = {
        clone: function() {
            return new Vector4(this.x, this.y, this.z, this.w);
        },
        
        getXyz: function() {
            return new Vector3(this.x, this.y, this.z);
        },
        
        length: function() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
        },
        
        lengthSquared: function() {
            return (this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
        },
        
        clamp: function(min, max) {
            var res = Vector4.clamp(this, min, max);
            this.x = res.x;
            this.y = res.y;
            this.z = res.z;
            this.w = res.w;
        },
        
        normal: function() {
            return Vector4.normal(this);
        },
        
        normalize: function() {
            var scale = 1.0 / this.length();
            this.x *= scale;
            this.y *= scale;
            this.z *= scale;
            this.w *= scale;
        },
        
        negative: function() {
            return new Vector4(-this.x, -this.y, -this.z, -this.w);
        },
        
        equals: function(v) {
            return (this.x == v.x && this.y == v.y && this.z == v.z && this.w == v.w);
        },
        
        add: function(v) {
            var res = Vector4.add(this, v);
            this.x = res.x;
            this.y = res.y;
            this.z = res.z;
            this.w = res.w;
        },
        
        sub: function(v) {
            var res = Vector4.sub(this, v);
            this.x = res.x;
            this.y = res.y;
            this.z = res.z;
            this.w = res.w;
        },
        
        mult: function(v) {
            var res = Vector4.mult(this, v);
            this.x = res.x;
            this.y = res.y;
            this.z = res.z;
            this.w = res.w;
        },
        
        div: function(v) {
            var res = Vector4.div(this, v);
            this.x = res.x;
            this.y = res.y;
            this.z = res.z;
            this.w = res.w;
        },
        
        dot: function(v) {
            return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
        },
        
        transform: function(/*Matrix4,Quat*/ trans) {
            var res = Vector4.transform(this, trans);
            this.x = res.x;
            this.y = res.y;
            this.z = res.z;
            this.w = res.w;
        },
        
        toString: function() {
            return "[" + [this.x, this.y, this.z, this.w].join(",") + "]";
        }
    };
    
    
    // **********************
    // Quaternion
    
    // Static methods and properties
    Quat.identity = function() { return new Quat(0, 0, 0, 1); };
    Quat.unitx = function() { return new Quat(1, 0, 0, 0); };
    Quat.unity = function() { return new Quat(0, 1, 0, 0); };
    Quat.unitz = function() { return new Quat(0, 0, 1, 0); };
    Quat.unitw = function() { return new Quat(0, 0, 0, 1); };
    Quat.zero = function() { return new Quat(0, 0, 0, 0); };
    Quat.one = function() { return new Quat(1, 1, 1, 1); };
    
    Quat.add = function(/*Quat,Number*/ left, /*Quat,Number*/ right) {
        if (typeof(left) === "number") {
            return new Quat(left + right.x, left + right.y, left + right.z, left + right.w);
        } else if (typeof(right) === "number") {
            return new Quat(left.x + right, left.y + right, left.z + right, left.w + right);
        } else {
            return new Quat(left.x + right.x, left.y + right.y, left.z + right.z, left.w + right.w);
        }
    };
    
    Quat.sub = function(/*Quat*/ left, /*Quat,Number*/ right) {
        if (typeof(left) === "number") {
            throw("Invalid operation: cannot subtract a quaternion from a number.");
        } else if (typeof(right) === "number") {
            return new Quat(left.x - right, left.y - right, left.z - right, left.w - right);
        } else {
            return new Quat(left.x - right.x, left.y - right.y, left.z - right.z, left.w - right.w);
        }
    };
    
    Quat.mult = function(/*Quat,Number*/ left, /*Quat,Number*/ right) {
        if (typeof(left) === "number") {
            return new Quat(left * right.x, left * right.y, left * right.z, left * right.w);
        } else if (typeof(right) === "number") {
            return new Quat(left.x * right, left.y * right, left.z * right, left.w * right);
        } else {
            var lxyz = new Vector3(left.x, left.y, left.z);
            var rxyz = new Vector3(right.x, right.y, right.z);
            var w = left.w * right.w - Vector3.dot(lxyz, rxyz);
            lxyz = Vector3.add(Vector3.add(Vector3.mult(lxyz, right.w), Vector3.mult(rxyz, left.w)), Vector3.cross(lxyz, rxyz));
            return new Quat(lxyz.x, lxyz.y, lxyz.z, w);
        }
    };
    
    Quat.div = function(/*Quat*/ left, /*Quat,Number*/ right) {
        if (typeof(left) === "number") {
            throw("Invalid operation: cannot divide a number by a quaternion.");
        } else if (typeof(right) === "number") {
            return new Quat(left.x / right, left.y / right, left.z / right, left.w / right);
        } else {
            return new Quat(left.x / right.x, left.y / right.y, left.z / right.z, left.w / right.w);
        }
    };
    
    Quat.dot = function(/*Quat*/ left, /*Quat*/ right) {
        return left.x * right.x + left.y * right.y + left.z * right.z + left.w * right.w;
    };
    
    Quat.fromAxisAngle = function(/*Vector3*/ axis, /*Number*/ angle) {
        if (axis.lengthSquared() === 0.0) {
            return Quat.identity();
        }
        
        var result = Quat.identity();
        
        angle *= 0.5;
        axis.normalize();
        axis = axis.mult(Math.sin(angle));
        result.x = axis.x;
        result.y = axis.y;
        result.z = axis.z;
        result.w = Math.cos(angle);
        
        return result.normal();
    };
    
    Quat.toAxisAngle = function(/*Quat*/ quat) {
        var q = quat.clone();
        if (q.w > 1.0) {
            q.normalize();
        }
            
        var result = new Vector4();
    
        result.w = 2.0 * Math.acos(q.w); // angle
        var den = Math.sqrt(1.0 - q.w * q.w);
        if (den > 0.0001) {
            result.x = q.x / den;
            result.y = q.y / den;
            result.z = q.z / den;
        } else {
            // This occurs when the angle is zero. 
            // Not a problem: just set an arbitrary normalized axis.
            result.x = 1;
            result.y = 0;
            result.z = 0;
        }
    
        return result;
    };
    
    Quat.inverse = function(/*Quat*/ quat) {
        var lengthSq = quat.lengthSquared();
        if (lengthSq !== 0.0) {
            var i = 1.0 / lengthSq;
            return new Quat(quat.x * -i, quat.y * -i, quat.z * -i, quat.w * i);
        } else {
            return quat.clone();
        }
    };
    
    Quat.negative = function(/*Quat*/ quat) {
        return new Quat(-quat.x, -quat.y, -quat.z, -quat.w);
    };
    
    Quat.normal = function(/*Quat*/ quat) {
        var scale = 1.0 / quat.length();
        return new Quat(
            quat.x * scale,
            quat.y * scale,
            quat.z * scale,
            quat.w * scale
        );
    };
    
    Quat.slerp = function(/*Quat*/ q1, /*Quat*/ q2, /*Number*/ blend) {
        q1 = q1.clone();
        q2 = q2.clone();
        
        // if either input is zero, return the other.
        if (q1.lengthSquared() === 0.0) {
            if (q2.LengthSquared === 0.0) {
                return Quat.identity();
            }
            return q2;
        } else if (q2.lengthSquared() === 0.0) {
            return q1;
        }
    
        var cosHalfAngle = q1.dot(q2);
    
        if (cosHalfAngle >= 1.0 || cosHalfAngle <= -1.0) {
            // angle = 0.0f, so just return one input.
            return q1;
        } else if (cosHalfAngle < 0.0) {
            q2.x = -q2.x; q2.y = -q2.y; q2.z = -q2.z; q2.w = -q2.w;
            cosHalfAngle = -cosHalfAngle;
        }
    
        var blendA;
        var blendB;
        if (cosHalfAngle < 0.99) {
            // do proper slerp for big angles
            var halfAngle = Math.acos(cosHalfAngle);
            var sinHalfAngle = Math.sin(halfAngle);
            var oneOverSinHalfAngle = 1.0 / sinHalfAngle;
            blendA = Math.sin(halfAngle * (1.0 - blend)) * oneOverSinHalfAngle;
            blendB = Math.sin(halfAngle * blend) * oneOverSinHalfAngle;
        } else {
            // do lerp if angle is really small.
            blendA = 1.0 - blend;
            blendB = blend;
        }
        
        var result = new Quat(
            q1.x * blendA + q2.x * blendB,
            q1.y * blendA + q2.y * blendB,
            q1.z * blendA + q2.z * blendB,
            q1.w * blendA + q2.w * blendB
        );
        
        if (result.lengthSquared() > 0.0) {
            return result.normal();
        } else {
            return Quat.identity();
        }
    };
    
    Quat.prototype = {
        clone: function() {
            return new Quat(this.x, this.y, this.z, this.w);
        },
        
        getXyz: function() {
            return new Vector3(this.x, this.y, this.z);
        },
        
        toAxisAngle: function() {
            return Quat.toAxisAngle(this);
        },
        
        length: function() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
        },
        
        lengthSquared: function() {
            return (this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
        },
        
        invert: function() {
            var q = Quat.inverse(this);
            this.x = q.x;
            this.y = q.y;
            this.z = q.z;
            this.w = q.w;
        },
        
        inverse: function() {
            return Quat.inverse(this);
        },
        
        normal: function() {
            return Quat.normal(this);
        },
        
        normalize: function() {
            var scale = 1.0 / this.length();
            this.x *= scale;
            this.y *= scale;
            this.z *= scale;
            this.w *= scale;
        },
        
        conjugate: function() {
            this.x = -this.x;
            this.y = -this.y;
            this.z = -this.z;
        },
        
        negative: function() {
            return new Quat(-this.x, -this.y, -this.z, -this.w);
        },
        
        equals: function(/*Quat*/ q) {
            return (this.x == q.x && this.y == q.y && this.z == q.z && this.w == q.w);
        },
        
        add: function(/*Number,Quat*/ v) {
            var q = Quat.add(this, v);
            this.x = q.x;
            this.y = q.y;
            this.z = q.z;
            this.w = q.w;
        },
        
        sub: function(/*Number,Quat*/ v) {
            var q = Quat.sub(this, v);
            this.x = q.x;
            this.y = q.y;
            this.z = q.z;
            this.w = q.w;
        },
        
        mult: function(/*Number,Quat*/ v) {
            var q = Quat.mult(this, v);
            this.x = q.x;
            this.y = q.y;
            this.z = q.z;
            this.w = q.w;
        },
        
        div: function(/*Number,Quat*/ v) {
            var q = Quat.div(this, v);
            this.x = q.x;
            this.y = q.y;
            this.z = q.z;
            this.w = q.w;
        },
        
        dot: function(/*Quat*/ q) {
            return this.x * q.x + this.y * q.y + this.z * q.z + this.w * q.w;
        },
        
        toString: function() {
            return "[" + [this.x, this.y, this.z, this.w].join(",") + "]";
        }
    };
    
    
    // **********************
    // Matrix2
    
    // Static methods
    Matrix2.identity = function() {
        return new Matrix2(1, 0, 0, 1);
    };
    
    Matrix2.equal = function(/*Matrix2*/ left, /*Matrix2*/ right) {
        return left.equals(right);
    };
    
    Matrix2.det = function(/*Matrix2*/ m) {
        return m._11 * m._22 - m._12 * m._21;
    };
    
    Matrix2.inverse = function(/*Matrix2*/ m) {
        var out = new Matrix2();
        var det = m.det();
        
        if (det > -0.0001 && det < 0.0001) {
            return  null; 
        }
        
        return new Matrix2(
             m._22 / det,
            -m._12 / det,
            -m._21 / det,
             m._11 / det
        );
    };
    
    Matrix2.prototype = {
        clone: function() {
            return new Matrix2(this._11, this._12, this._21, this._22);
        },
        
        det: function() {
            return this._11 * this._22 - this._12 * this._21;
        },
        
        equals: function(m) {
            return this.m11 == m.m11 && this.m12 == m.m12 && this.m21 == m.m21 && this.m22 == m.m22;
        },
        
        invert: function() {
            var m = Matrix2.inverse(this);
            if (m == null) {
                this._11 = 0;
                this._12 = 0;
                this._21 = 0;
                this._22 = 0;
            } else {
                this._11 = m._11;
                this._12 = m._12;
                this._21 = m._21;
                this._22 = m._22;
            }
        },
        
        m11: function(/*Number*/ v) {
            if (typeof(v) === "number") {
                this._11 = v;
            } else {
                return this._11;
            }
        },
        
        m12: function(/*Number*/ v) {
            if (typeof(v) === "number") {
                this._12 = v;
            } else {
                return this._12;
            }
        },
        
        m22: function(/*Number*/ v) {
            if (typeof(v) === "number") {
                this._22 = v;
            } else {
                return this._22;
            }
        },
        
        m21: function(/*Number*/ v) {
            if (typeof(v) === "number") {
                this._21 = v;
            } else {
                return this._21;
            }
        },
    };
    
    
    // **********************
    // Matrix4
    
    // Static methods
    Matrix4.identity = function() {
        return new Matrix4(
            Vector4.unitx(),
            Vector4.unity(),
            Vector4.unitz(),
            Vector4.unitw()
        );
    };
    
    Matrix4.createFromAxisAngle = function(/*Vector3*/ axis, /*Number*/ angle) {
        var cos = Math.cos(-angle);
        var sin = Math.sin(-angle);
        var t = 1.0 - cos;
        
        axis.normalize();
        
        return new Matrix4(
            new Vector4(t * axis.x * axis.x + cos, t * axis.x * axis.y - sin * axis.z, t * axis.x * axis.z + sin * axis.y, 0.0),
            new Vector4(t * axis.x * axis.y + sin * axis.z, t * axis.y * axis.y + cos, t * axis.y * axis.z - sin * axis.x, 0.0),
            new Vector4(t * axis.x * axis.z - sin * axis.y, t * axis.y * axis.z + sin * axis.x, t * axis.z * axis.z + cos, 0.0),
            new Vector4(0, 0, 0, 1)
        );
    };
    
    Matrix4.createRotX = function(/*Number*/ angle) {
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);
        
        return new Matrix4(
            Vector4.unitx(),
            new Vector4(0.0, cos, sin, 0.0),
            new Vector4(0.0, -sin, cos, 0.0),
            Vector4.unitw()
        );
    };
    
    Matrix4.createRotY = function(/*Number*/ angle) {
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);
        
        return new Matrix4(
            new Vector4(cos, 0.0, -sin, 0.0),
            Vector4.unity(),
            new Vector4(sin, 0.0, cos, 0.0),
            Vector4.unitw()
        );
    };
    
    Matrix4.createRotZ = function(/*Number*/ angle) {
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);
        
        return new Matrix4(
            new Vector4(cos, sin, 0.0, 0.0),
            new Vector4(-sin, cos, 0.0, 0.0),
            Vector4.unitz(),
            Vector4.unitw()
        );
    };
    
    Matrix4.createTranslation = function(/*Vector3,Number*/ x, /*Number*/ y, /*Number*/ z) {
        var m = Matrix4.identity();
        
        if (typeof(x) === "object") {
            m.row3 = new Vector4(x.x, x.y, x.z, 1);
        } else {
            m.row3 = new Vector4(x, y, z, 1);
        }
        
        return m;
    };
    
    Matrix4.createScale = function(/*Vector3,Number*/ x, /*Number*/ y, /*Number*/ z) {
        if (typeof(x) === "object") {
            return new Matrix4(
                Vector4.mult(Vector4.unitx(), x.x),
                Vector4.mult(Vector4.unity(), x.y),
                Vector4.mult(Vector4.unitz(), x.z),
                Vector4.unitw()
            );
        } else {
            return new Matrix4(
                Vector4.mult(Vector4.unitx(), x),
                Vector4.mult(Vector4.unity(), y),
                Vector4.mult(Vector4.unitz(), z),
                Vector4.unitw()
            );
        }
    };
    
    Matrix4.createOrthoOffCenter = function(/*Number*/ left, /*Number*/ right, /*Number*/ bottom, /*Number*/ top, /*Number*/ znear, /*Number*/ zfar) {
        var result = new Matrix4();
    
        var invRL = 1.0 / (right - left);
        var invTB = 1.0 / (top - bottom);
        var invFN = 1.0 / (zfar - znear);
    
        result.m11(2 * invRL);
        result.m22(2 * invTB);
        result.m33(-2 * invFN);
    
        result.m41(-(right + left) * invRL);
        result.m42(-(top + bottom) * invTB);
        result.m43(-(zfar + znear) * invFN);
        result.m44(1.0);
        
        return result;
    };
    
    Matrix4.createOrtho = function(/*Number*/ width, /*Number*/ height, /*Number*/ znear, /*Number*/ zfar) {
        return Matrix4.createOrthoOffCenter(-width / 2, width / 2, -height / 2, height / 2, znear, zfar);
    };
    
    Matrix4.createPerspectiveOffCenter = function(/*Number*/ left, /*Number*/ right, /*Number*/ bottom, /*Number*/ top, /*Number*/ znear, /*Number*/ zfar) {
        if (znear <= 0) {
            throw("znear out of range.");
        } else if (zfar <= 0) {
            throw("zfar out of range.");
        } else if (znear >= zfar) {
            throw("znear out of range.");
        }
        
        var x = (2.0 * znear) / (right - left);
        var y = (2.0 * znear) / (top - bottom);
        var a = (right + left) / (right - left);
        var b = (top + bottom) / (top - bottom);
        var c = -(zfar + znear) / (zfar - znear);
        var d = -(2.0 * zfar * znear) / (zfar - znear);
        
        return new Matrix4(new Vector4(x, 0, 0,  0),
                           new Vector4(0, y, 0,  0),
                           new Vector4(a, b, c, -1),
                           new Vector4(0, 0, d,  0));
    };
    
    Matrix4.createPerspectiveFov = function(/*Number*/ fovy, /*Number*/ aspect, /*Number*/ znear, /*Number*/ zfar) {
        if (fovy <= 0 || fovy > Math.PI) {
            throw("fovy out of range.");
        } else if (aspect <= 0) {
            throw("aspect out of range.");
        } else if (znear <= 0) {
            throw("zNear out of range.");
        } else if (zfar <= 0) {
            throw("zFar out of range.");
        } else if (znear >= zfar) {
            throw("zNear out of range.");
        }
            
        var ymax = znear * Math.tan(0.5 * fovy);
        var ymin = -ymax;
        var xmin = ymin * aspect;
        var xmax = ymax * aspect;
    
        Matrix4.createPerspectiveOffCenter(xmin, xmax, ymin, ymax, znear, zfar);
    };
    
    Matrix4.equal = function(/*Matrix4*/ left, /*Matrix4*/ right) {
        return left.equals(right);
    };
    
    Matrix4.det = function(/*Matrix4*/ mat) {
        return mat.row0.x * mat.row1.y * mat.row2.z * mat.row3.w - mat.row0.x * mat.row1.y * mat.row2.w * mat.row3.z + mat.row0.x * mat.row1.z * mat.row2.w * mat.row3.y - mat.row0.x * mat.row1.z * mat.row2.y * mat.row3.w + 
               mat.row0.x * mat.row1.w * mat.row2.y * mat.row3.z - mat.row0.x * mat.row1.w * mat.row2.z * mat.row3.y - mat.row0.y * mat.row1.z * mat.row2.w * mat.row3.x + mat.row0.y * mat.row1.z * mat.row2.x * mat.row3.w - 
               mat.row0.y * mat.row1.w * mat.row2.x * mat.row3.z + mat.row0.y * mat.row1.w * mat.row2.z * mat.row3.x - mat.row0.y * mat.row1.x * mat.row2.z * mat.row3.w + mat.row0.y * mat.row1.x * mat.row2.w * mat.row3.z + 
               mat.row0.z * mat.row1.w * mat.row2.x * mat.row3.y - mat.row0.z * mat.row1.w * mat.row2.y * mat.row3.x + mat.row0.z * mat.row1.x * mat.row2.y * mat.row3.w - mat.row0.z * mat.row1.x * mat.row2.w * mat.row3.y + 
               mat.row0.z * mat.row1.y * mat.row2.w * mat.row3.x - mat.row0.z * mat.row1.y * mat.row2.x * mat.row3.w - mat.row0.w * mat.row1.x * mat.row2.y * mat.row3.z + mat.row0.w * mat.row1.x * mat.row2.z * mat.row3.y - 
               mat.row0.w * mat.row1.y * mat.row2.z * mat.row3.x + mat.row0.w * mat.row1.y * mat.row2.x * mat.row3.z - mat.row0.w * mat.row1.z * mat.row2.x * mat.row3.y + mat.row0.w * mat.row1.z * mat.row2.y * mat.row3.x;
    };
    
    Matrix4.lookAt = function(/*Vector3*/ eye, /*Vector3*/ target, /*Vector3*/ up) {
        var z = Vector3.sub(eye, target).normal();
        var x = Vector3.cross(up, z).normal();
        var y = Vector3.cross(z, x).normal();
    
        var rot = new Matrix4(new Vector4(x.x, y.x, z.x, 0.0),
                              new Vector4(x.y, y.y, z.y, 0.0),
                              new Vector4(x.z, y.z, z.z, 0.0),
                              Vector4.unitw());
        
        var trans = Matrix4.createTranslation(eye.negative());
        
        return Matrix4.mult(trans, rot);
    };
    
    Matrix4.inverse = function(/*Matrix4*/ m) {
        var colIdx = [ 0, 0, 0, 0 ];
        var rowIdx = [ 0, 0, 0, 0 ];
        var pivotIdx = [ -1, -1, -1, -1 ];
        
        // Loop variables.
        var i, j, k;
        
        // Misc variables.
        var f;
        
        var mat = m.clone();
    
        // convert the matrix to an array for easy looping
        var inverse = [[mat.row0.x, mat.row0.y, mat.row0.z, mat.row0.w],
                        [mat.row1.x, mat.row1.y, mat.row1.z, mat.row1.w],
                        [mat.row2.x, mat.row2.y, mat.row2.z, mat.row2.w],
                        [mat.row3.x, mat.row3.y, mat.row3.z, mat.row3.w]];
        var icol = 0;
        var irow = 0;
        for (i = 0; i < 4; i++) {
            // Find the largest pivot value
            var maxPivot = 0.0;
            for (j = 0; j < 4; j++) {
                if (pivotIdx[j] !== 0) {
                    for (k = 0; k < 4; ++k) {
                        if (pivotIdx[k] == -1) {
                            var absVal = Math.abs(inverse[j][k]);
                            if (absVal > maxPivot) {
                                maxPivot = absVal;
                                irow = j;
                                icol = k;
                            }
                        } else if (pivotIdx[k] > 0) {
                            return mat;
                        }
                    }
                }
            }
    
            ++(pivotIdx[icol]);
    
            // Swap rows over so pivot is on diagonal
            if (irow != icol) {
                for (k = 0; k < 4; ++k) {
                    f = inverse[irow][k];
                    inverse[irow][k] = inverse[icol][k];
                    inverse[icol][k] = f;
                }
            }
    
            rowIdx[i] = irow;
            colIdx[i] = icol;
    
            var pivot = inverse[icol][icol];
            // check for singular matrix
            if (pivot === 0.0) {
                throw("Matrix is singular and cannot be inverted.");
            }
    
            // Scale row so it has a unit diagonal
            var oneOverPivot = 1.0 / pivot;
            inverse[icol][icol] = 1.0;
            for (k = 0; k < 4; ++k) {
                inverse[icol][k] *= oneOverPivot;
            }
    
            // Do elimination of non-diagonal elements
            for (j = 0; j < 4; ++j) {
                // check this isn't on the diagonal
                if (icol != j) {
                    f = inverse[j][icol];
                    inverse[j][icol] = 0.0;
                    for (k = 0; k < 4; ++k) {
                        inverse[j][k] -= inverse[icol][k] * f;
                    }
                }
            }
        }
    
        for (j = 3; j >= 0; --j) {
            var ir = rowIdx[j];
            var ic = colIdx[j];
            for (k = 0; k < 4; ++k) {
                f = inverse[k][ir];
                inverse[k][ir] = inverse[k][ic];
                inverse[k][ic] = f;
            }
        }
    
        mat.row0 = new Vector4(inverse[0][0], inverse[0][1], inverse[0][2], inverse[0][3]);
        mat.row1 = new Vector4(inverse[1][0], inverse[1][1], inverse[1][2], inverse[1][3]);
        mat.row2 = new Vector4(inverse[2][0], inverse[2][1], inverse[2][2], inverse[2][3]);
        mat.row3 = new Vector4(inverse[3][0], inverse[3][1], inverse[3][2], inverse[3][3]);
        return mat;
    };
    
    Matrix4.transpose = function(/*Matrix4*/ mat) {
        return new Matrix4(
            mat.column0(),
            mat.column1(),
            mat.column2(),
            mat.column3()
        );
    };
    
    Matrix4.mult = function(/*Matrix4*/ left, /*Matrix4*/ right) {
        return new Matrix4(
            new Vector4(
                left.m11() * right.m11() + left.m12() * right.m21() + left.m13() * right.m31() + left.m14() * right.m41(),
                left.m11() * right.m12() + left.m12() * right.m22() + left.m13() * right.m32() + left.m14() * right.m42(),
                left.m11() * right.m13() + left.m12() * right.m23() + left.m13() * right.m33() + left.m14() * right.m43(),
                left.m11() * right.m14() + left.m12() * right.m24() + left.m13() * right.m34() + left.m14() * right.m44()
            ),
            new Vector4(
                left.m21() * right.m11() + left.m22() * right.m21() + left.m23() * right.m31() + left.m24() * right.m41(),
                left.m21() * right.m12() + left.m22() * right.m22() + left.m23() * right.m32() + left.m24() * right.m42(),
                left.m21() * right.m13() + left.m22() * right.m23() + left.m23() * right.m33() + left.m24() * right.m43(),
                left.m21() * right.m14() + left.m22() * right.m24() + left.m23() * right.m34() + left.m24() * right.m44()
            ),
            new Vector4(
                left.m31() * right.m11() + left.m32() * right.m21() + left.m33() * right.m31() + left.m34() * right.m41(),
                left.m31() * right.m12() + left.m32() * right.m22() + left.m33() * right.m32() + left.m34() * right.m42(),
                left.m31() * right.m13() + left.m32() * right.m23() + left.m33() * right.m33() + left.m34() * right.m43(),
                left.m31() * right.m14() + left.m32() * right.m24() + left.m33() * right.m34() + left.m34() * right.m44()
            ),
            new Vector4(
                left.m41() * right.m11() + left.m42() * right.m21() + left.m43() * right.m31() + left.m44() * right.m41(),
                left.m41() * right.m12() + left.m42() * right.m22() + left.m43() * right.m32() + left.m44() * right.m42(),
                left.m41() * right.m13() + left.m42() * right.m23() + left.m43() * right.m33() + left.m44() * right.m43(),
                left.m41() * right.m14() + left.m42() * right.m24() + left.m43() * right.m34() + left.m44() * right.m44()
            )
        );
    };
    
    Matrix4.prototype = {
        clone: function() {
            return new Matrix4(
                this.row0,
                this.row1,
                this.row2,
                this.row3
            );
        },
        
        det: function() {
            return Matrix4.det(this);
        },
        
        column0: function() {
            return new Vector4(this.row0.x, this.row1.x, this.row2.x, this.row3.x);
        },
        
        column1: function() {
            return new Vector4(this.row0.y, this.row1.y, this.row2.y, this.row3.y);
        },
        
        column2: function() {
            return new Vector4(this.row0.z, this.row1.z, this.row2.z, this.row3.z);
        },
        
        column3: function() {
            return new Vector4(this.row0.w, this.row1.w, this.row2.w, this.row3.w);
        },
        
        equals: function(m) {
            return (this.row0.equals(m.row0) &&
                    this.row1.equals(m.row1) &&
                    this.row2.equals(m.row2) &&
                    this.row3.equals(m.row3));
        },
        
        invert: function() {
            var m = Matrix4.inverse(this);
            this.row0 = m.row0;
            this.row1 = m.row1;
            this.row2 = m.row2;
            this.row3 = m.row3;
        },
        
        inverse: function() {
            return Matrix4.inverse(this);
        },
        
        transpose: function() {
            var m = Matrix4.transpose(this);
            this.row0 = m.row0;
            this.row1 = m.row1;
            this.row2 = m.row2;
            this.row3 = m.row3;
        },
        
        mult: function(/*Matrix4*/ m) {
            var res = Matrix4.mult(this, m);
            this.row0 = res.row0;
            this.row1 = res.row1;
            this.row2 = res.row2;
            this.row3 = res.row3;
        },
        
        toString: function() {
            return "[" + this.row0.toString() +
                this.row1.toString() + "," +
                this.row2.toString() + "," +
                this.row3.toString() + "]";
        },
        
        // Get/set methods.
        // row 1, column 1
        m11: function(/*Number*/ v) {
            if (typeof(v) === "number") {
                this.row0.x = v;
            } else {
                return this.row0.x;
            }
        },
        // row 1, column 2
        m12: function(/*Number*/ v) {
            if (typeof(v) === "number") {
                this.row0.y = v;
            } else {
                return this.row0.y;
            }
        },
        // row 1, column 3
        m13: function(/*Number*/ v) {
            if (typeof(v) === "number") {
                this.row0.z = v;
            } else {
                return this.row0.z;
            }
        },
        // row 1, column 4
        m14: function(/*Number*/ v) {
            if (typeof(v) === "number") {
                this.row0.w = v;
            } else {
                return this.row0.w;
            }
        },
        // row 2, column 1
        m21: function(/*Number*/ v) {
            if (typeof(v) === "number") {
                this.row1.x = v;
            } else {
                return this.row1.x;
            }
        },
        // row 2, column 2
        m22: function(/*Number*/ v) {
            if (typeof(v) === "number") {
                this.row1.y = v;
            } else {
                return this.row1.y;
            }
        },
        // row 2, column 3
        m23: function(/*Number*/ v) {
            if (typeof(v) === "number") {
                this.row1.z = v;
            } else {
                return this.row1.z;
            }
        },
        // row 2, column 4
        m24: function(/*Number*/ v) {
            if (typeof(v) === "number") {
                this.row1.w = v;
            } else {
                return this.row1.w;
            }
        },
        // row 3, column 1
        m31: function(/*Number*/ v) {
            if (typeof(v) === "number") {
                this.row2.x = v;
            } else {
                return this.row2.x;
            }
        },
        // row 3, column 2
        m32: function(/*Number*/ v) {
            if (typeof(v) === "number") {
                this.row2.y = v;
            } else {
                return this.row2.y;
            }
        },
        // row 3, column 3
        m33: function(/*Number*/ v) {
            if (typeof(v) === "number") {
                this.row2.z = v;
            } else {
                return this.row2.z;
            }
        },
        // row 3, column 4
        m34: function(/*Number*/ v) {
            if (typeof(v) === "number") {
                this.row2.w = v;
            } else {
                return this.row2.w;
            }
        },
        // row 4, column 1
        m41: function(/*Number*/ v) {
            if (typeof(v) === "number") {
                this.row3.x = v;
            } else {
                return this.row3.x;
            }
        },
        // row 4, column 2
        m42: function(/*Number*/ v) {
            if (typeof(v) === "number") {
                this.row3.y = v;
            } else {
                return this.row3.y;
            }
        },
        // row 4, column 3
        m43: function(/*Number*/ v) {
            if (typeof(v) === "number") {
                this.row3.z = v;
            } else {
                return this.row3.z;
            }
        },
        // row 4, column 4
        m44: function(/*Number*/ v) {
            if (typeof(v) === "number") {
                this.row3.w = v;
            } else {
                return this.row3.w;
            }
        }
    };
    
    }());