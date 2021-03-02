// Disable type-checking as it reports incorrect errors
// @ts-nocheck

// Import the three.js library and components needed
import * as THREE from 'three'

// Parent class
import MeshFactory from './MeshFactory'

/**
 * A class to build cylinder meshes for use with Three.js
 **/
class CylinderFactory extends MeshFactory {
  /**
   * Create a new cylinder Factory object that will use the given subdivision
   * parameter to generate unit cylinders centered at (0, 0, 0) aligned with Y.
   * @param {number} slices The number of subdivisions around the central axis.
   **/
  constructor (slices) {
    super()
    this._count++
    this._name = `Cylinder ${this._count}`
    this._slices = slices || 18
  }

  /**
   * Set the subdivisions around the outside of the cylinder.
   * @param {number} newVal The number of subdivisions around the central axis.
   **/
  set slices (newVal) {
    if (typeof newVal === 'number') {
      this._slices = newVal
    }
  }

  /**
   * Build and return a THREE.Geometry() object representing a cylinder.
   * @override
   * @return {THREE.Geometry} The raw geometry structure (not wrapped with Mesh)
   **/
  makeObjectGeometry () {
    // A fresh, empty Geometry object that will hold the mesh geometry
    var cylGeom = new THREE.Geometry()

    // Creating useful variables
    var normals = []
    let A = ((2 * Math.PI) / this._slices)
    let theta = 0

    let x = 0
    let z = 0
    // Creating the vertices for the top face of the cylinder
    cylGeom.vertices.push(new THREE.Vector3(0, 1, 0))
    normals.push(new THREE.Vector3(0, 1, 0))
    for (var i = 0; i < this._slices; i++) {
      x = Math.cos(theta)
      z = Math.sin(theta)
      cylGeom.vertices.push(new THREE.Vector3(x, 1, z))
      normals.push(new THREE.Vector3(i + 1, 1, i + 1))
      theta += A
    }
    var bottom = cylGeom.vertices.length
    // Creating the vertices for the base face of the cylinder
    cylGeom.vertices.push(new THREE.Vector3(0, -1, 0))
    normals.push(new THREE.Vector3(0, -1, 0))
    for (var j = 0; j < this._slices; j++) {
      x = Math.cos(theta)
      z = Math.sin(theta)
      cylGeom.vertices.push(new THREE.Vector3(x, -1, z))
      normals.push(new THREE.Vector3(j + 1, -1, j + 1))
      theta += A
    }

    // Creating the top face
    for (var k = 0; k < this._slices - 1; k++) {
      cylGeom.faces.push(new THREE.Face3(0, k + 2, k + 1, normals[0]))
    }
    cylGeom.faces.push(new THREE.Face3(0, 1, this._slices, normals[0]))

    // Creating the base face
    for (var l = 0; l < this._slices - 1; l++) {
      cylGeom.faces.push(new THREE.Face3(bottom, bottom + l + 1, bottom + l + 2, normals[bottom]))
    }
    cylGeom.faces.push(new THREE.Face3(bottom, bottom + this._slices, bottom + 1, normals[bottom]))

    // Connecting the faces
    for (let m = 1; m < this._slices; m++) {
      cylGeom.faces.push(new THREE.Face3(bottom + m + 1, bottom + m, m + 1, [normals[bottom + m + 1], normals[bottom + m], normals[m + 1]]))
      cylGeom.faces.push(new THREE.Face3(m, m + 1, bottom + m, [normals[m], normals[m + 1], normals[bottom + m]]))
    }
    cylGeom.faces.push(new THREE.Face3(this._slices, 1, bottom + this._slices, [normals[this._slices], normals[1], normals[bottom + this._slices]]))
    cylGeom.faces.push(new THREE.Face3(bottom + 1, bottom + this._slices, 1, [normals[bottom + 1], normals[bottom + this._slices], normals[1]]))

    // Return finished geometry
    return cylGeom
  }
}

// Export the CylinderFactory class for use in other modules
export default CylinderFactory
