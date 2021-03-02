// Disable type-checking as it reports incorrect errors
// @ts-nocheck

// Import the three.js library and components needed
import * as THREE from 'three'

// Parent class
import MeshFactory from './MeshFactory'

/**
 * A class to build sphere meshes for use with Three.js
 **/
class SphereFactory extends MeshFactory {
  /**
   * Create a new sphere factory object that will use the given subdivision
   * parameters to generate unit spheres centered at (0, 0, 0).
   * @param {number} slices The number of subdivisions around the equator.
   * @param {number} stacks The number of subdivisions between the poles.
   **/
  constructor(slices, stacks) {
    super()
    this._count++
    this._name = `Sphere ${this._count}`
    this._slices = slices || 36
    this._stacks = stacks || 18
  }

  /**
   * Set the subdivisions around the equator of the sphere.
   * @param {number} newVal The number of subdivisions around the equator.
   **/
  set slices(newVal) {
    if (typeof newVal === 'number') {
      this._slices = newVal
    }
  }

  /**
   * Set the subdivisions between the poles of the sphere.
   * @param {number} newVal The number of subdivisions between the poles.
   **/
  set stacks(newVal) {
    if (typeof newVal === 'number') {
      this._stacks = newVal
    }
  }

  /**
   * Build and return a THREE.Geometry() object representing a sphere.
   * @override
   **/
  makeObjectGeometry() {
    // A fresh, empty Geometry object that will hold the mesh geometry
    var cylGeom = new THREE.Geometry()
    // Creating necessary variables
    var normals = []
    var dT = (2 * Math.PI / this._slices)
    var dP = (Math.PI / this._stacks)
    var theta = 0
    var phi = dP
    var x = 0
    var y = 0
    var z = 0
    var a = 0
    var b = 0
    var c = 0
    var d = 0

    // Creatiing all of the sphere vertices and top of the spheres
    cylGeom.vertices.push(new THREE.Vector3(0, 1, 0))
    normals.push(new THREE.Vector3(0, 1, 0))
    for (var i = 1; i < this._stacks; i++) {
      theta = 0
      for (var j = 0; j < this._slices; j++) {
        x = Math.sin(phi) * Math.sin(theta)
        y = Math.cos(phi)
        z = Math.sin(phi) * Math.cos(theta)
        cylGeom.vertices.push(new THREE.Vector3(x, y, z))
        normals.push(new THREE.Vector3(x, y, z))
        theta += dT
      }
      phi += dP
    }
    // Bottom sphere vertices
    var bottom = cylGeom.vertices.length
    cylGeom.vertices.push(new THREE.Vector3(0, -1, 0))
    normals.push(new THREE.Vector3(0, -1, 0))

    // Faces for the Top
    for (var k = 0; k < this._slices - 1; k++) {
      cylGeom.faces.push(new THREE.Face3(0, k + 1, k + 2, [normals[0], normals[k + 1], normals[k + 2]]))
    }
    cylGeom.faces.push(new THREE.Face3(0, this._slices, 1, [normals[0], normals[this._slices], normals[1]]))

    // Faces for the Bottom
    for (let l = bottom; l > bottom - this._slices + 1; l--) {
      cylGeom.faces.push(new THREE.Face3(bottom, l - 1, l - 2, [normals[bottom], normals[l - 1], normals[l - 2]]))
    }
    cylGeom.faces.push(new THREE.Face3(bottom, bottom - this._slices, bottom - 1, [normals[bottom], normals[bottom - this._slices], normals[bottom - 1]]))

    var slices = this._slices
    var q = 0
    var test = 1
    while (test <= this._stacks - 2) {
      // Faces for every slice of the sphere per stack except last one
      for (var m = 1; m <= this._slices - 1; m++) {
        a = q + m
        b = a + 1
        c = a + slices
        d = c + 1
        cylGeom.faces.push(
          new THREE.Face3(a, c, d, [normals[a], normals[c], normals[d]]),
          new THREE.Face3(a, d, b, [normals[a], normals[d], normals[b]])
        )
      }
      // Faces for final slice of current stack
      a = q + slices
      b = q + slices - slices + 1
      c = q + slices + slices
      d = q + slices + 1
      cylGeom.faces.push(
        new THREE.Face3(a, c, d, [normals[a], normals[c], normals[d]]),
        new THREE.Face3(a, d, b, [normals[a], normals[d], normals[b]])
      )
      q += slices
      test++
    }
    // Return finished geometry
    return cylGeom
  }
}

// Export the SphereFactory class for use in other modules
export default SphereFactory
