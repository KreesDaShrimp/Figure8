// Disable type-checking as it reports incorrect errors
// @ts-nocheck

// Will use the humanoid Factory
import HumanoidFactory from './HumanoidFactory'

/**
 * A class to animate the humanoid mesh.
 **/
class AnimationFactory {
  /**
   * Create a new humanoid factory object.
   **/
  constructor () {
    this._humanoidMaker = new HumanoidFactory()
  }

  /**
   * Extract references to nodes in the hierarchy that contain a particular sub-name
   * in their name parameter (case sensitive).
   *
   * @param {AnimatableMesh} humanoid The hierarchical mesh to Traverse
   * @param {string} subName The name to match and extract from the hierarchy
   * @return {Array} An array of references to meshes in the hierarchy that contain
   *    the specified subName in their name parameter.
   **/
  extractNamedNodes (humanoid, subName) {
    // An array to hold the extracted node
    let nodes = []

    // Traverse the entire hierarchy
    humanoid.traverse((node) => {
      // If the name contains the given sub-name, then grab it
      // Note: we ignore ones with 'Geom' because those are from isolateScale
      if (node.name.includes(subName) && !node.name.includes('Geom')) {
        nodes.push(node)
      }
    })

    // Return an array of the extracted nodes
    return nodes
  }

  generateWalk () {
    // Create a new humanoid object using your factory
    let humanoid = this._humanoidMaker.generateMesh()
    humanoid.name = `Walking ${humanoid.name}`
    var LArm = humanoid.getObjectByName('Left Arm')
    var RArm = humanoid.getObjectByName('Right Arm')
    var LLeg = humanoid.getObjectByName('Left Leg')
    var RLeg = humanoid.getObjectByName('Right Leg')

    // Alters position of humanoid over 120 frames
    humanoid.transform.setPosition(0, -0.7, 0)
    humanoid.saveKeyframe(0)
    humanoid.transform.setPosition(2, -0.7, 0)
    humanoid.saveKeyframe(30)
    humanoid.transform.setPosition(4, -0.7, 0)
    humanoid.saveKeyframe(60)
    humanoid.transform.setPosition(6, -0.7, 0)
    humanoid.saveKeyframe(90)
    humanoid.transform.setPosition(8, -0.7, 0)
    humanoid.saveKeyframe(120)

    // Alters rotation of Left Arm over 120 frames
    LArm.transform.setRotation(0, -70 * Math.PI / 180, -Math.PI / 2)
    LArm.saveKeyframe(0)
    LArm.transform.setRotation(0, 70 * Math.PI / 180, -Math.PI / 2)
    LArm.saveKeyframe(30)
    LArm.transform.setRotation(0, -70 * Math.PI / 180, -Math.PI / 2)
    LArm.saveKeyframe(60)
    LArm.transform.setRotation(0, 70 * Math.PI / 180, -Math.PI / 2)
    LArm.saveKeyframe(90)
    LArm.transform.setRotation(0, -70 * Math.PI / 180, -Math.PI / 2)
    LArm.saveKeyframe(120)

    // Alters rotation of Right Arm over 120 frames
    RArm.transform.setRotation(0, 70 * Math.PI / 180, -Math.PI / 2)
    RArm.saveKeyframe(0)
    RArm.transform.setRotation(0, -70 * Math.PI / 180, -Math.PI / 2)
    RArm.saveKeyframe(30)
    RArm.transform.setRotation(0, 70 * Math.PI / 180, -Math.PI / 2)
    RArm.saveKeyframe(60)
    RArm.transform.setRotation(0, -70 * Math.PI / 180, -Math.PI / 2)
    RArm.saveKeyframe(90)
    RArm.transform.setRotation(0, 70 * Math.PI / 180, -Math.PI / 2)
    RArm.saveKeyframe(120)

    // Alters rotation of Left Leg over 120 frames
    LLeg.transform.setRotation(0, 70 * Math.PI / 180, -Math.PI / 2)
    LLeg.saveKeyframe(0)
    LLeg.transform.setRotation(0, -70 * Math.PI / 180, -Math.PI / 2)
    LLeg.saveKeyframe(30)
    LLeg.transform.setRotation(0, 70 * Math.PI / 180, -Math.PI / 2)
    LLeg.saveKeyframe(60)
    LLeg.transform.setRotation(0, -70 * Math.PI / 180, -Math.PI / 2)
    LLeg.saveKeyframe(90)
    LLeg.transform.setRotation(0, 70 * Math.PI / 180, -Math.PI / 2)
    LLeg.saveKeyframe(120)

    // Alters rotation of Right Leg over 120 frames
    RLeg.transform.setRotation(0, -70 * Math.PI / 180, -Math.PI / 2)
    RLeg.saveKeyframe(0)
    RLeg.transform.setRotation(0, 70 * Math.PI / 180, -Math.PI / 2)
    RLeg.saveKeyframe(30)
    RLeg.transform.setRotation(0, -70 * Math.PI / 180, -Math.PI / 2)
    RLeg.saveKeyframe(60)
    RLeg.transform.setRotation(0, 70 * Math.PI / 180, -Math.PI / 2)
    RLeg.saveKeyframe(90)
    RLeg.transform.setRotation(0, -70 * Math.PI / 180, -Math.PI / 2)
    RLeg.saveKeyframe(120)

    // Return the animated humanoid
    return humanoid
  }

  generateOther () {
    // Create a new humanoid object using your factory
    let humanoid = this._humanoidMaker.generateMesh()
    humanoid.name = `Other-ing ${humanoid.name}`
    var LArm = humanoid.getObjectByName('Left Arm')
    var RArm = humanoid.getObjectByName('Right Arm')
    var LLeg = humanoid.getObjectByName('Left Leg')
    var RLeg = humanoid.getObjectByName('Right Leg')

    // Alters position, rotation, and pivot of humanoid over 120 frames
    humanoid.transform.setPosition(3, -0.7, 0)
    humanoid.transform.setRotation(0, Math.PI, 0)
    humanoid.transform.setPivot(0, -1, -3)
    humanoid.saveKeyframe(0)
    humanoid.transform.setPosition(-3, -0.7, 0)
    humanoid.transform.setRotation(0, -Math.PI * 3, 0)
    humanoid.transform.setPivot(0, -1, 3)
    humanoid.saveKeyframe(120)

    // Alters rotation of Left Arm over 120 frames
    LArm.transform.setRotation(-90 * Math.PI / 180, -180 * Math.PI / 180, -Math.PI / 2)
    LArm.saveKeyframe(0)
    LArm.transform.setRotation(0, -90 * Math.PI / 180, -Math.PI / 2)
    LArm.saveKeyframe(20)
    LArm.transform.setRotation(50 * Math.PI / 180, -90 * Math.PI / 180, -Math.PI / 2)
    LArm.saveKeyframe(40)
    LArm.transform.setRotation(50 * Math.PI / 180, -90 * Math.PI / 180, -Math.PI / 2)
    LArm.saveKeyframe(80)
    LArm.transform.setRotation(0, -90 * Math.PI / 180, -Math.PI / 2)
    LArm.saveKeyframe(100)
    LArm.transform.setRotation(-90 * Math.PI / 180, -180 * Math.PI / 180, -Math.PI / 2)
    LArm.saveKeyframe(120)

    // Alters rotation of Right Arm over 120 frames
    RArm.transform.setRotation(90 * Math.PI / 180, -180 * Math.PI / 180, -Math.PI / 2)
    RArm.saveKeyframe(0)
    RArm.transform.setRotation(0, -90 * Math.PI / 180, -Math.PI / 2)
    RArm.saveKeyframe(20)
    RArm.transform.setRotation(-50 * Math.PI / 180, -90 * Math.PI / 180, -Math.PI / 2)
    RArm.saveKeyframe(40)
    RArm.transform.setRotation(-50 * Math.PI / 180, -90 * Math.PI / 180, -Math.PI / 2)
    RArm.saveKeyframe(80)
    RArm.transform.setRotation(0, -90 * Math.PI / 180, -Math.PI / 2)
    RArm.saveKeyframe(100)
    RArm.transform.setRotation(90 * Math.PI / 180, -180 * Math.PI / 180, -Math.PI / 2)
    RArm.saveKeyframe(120)

    // Alters rotation of Left Leg over 120 frames
    LLeg.transform.setRotation(0, 30 * Math.PI / 180, -Math.PI / 2)
    LLeg.saveKeyframe(0)
    LLeg.transform.setRotation(0, -90 * Math.PI / 180, -Math.PI / 2)
    LLeg.saveKeyframe(30)
    LLeg.transform.setRotation(0, -90 * Math.PI / 180, -Math.PI / 2)
    LLeg.saveKeyframe(90)
    LLeg.transform.setRotation(0, 0, -Math.PI / 2)
    LLeg.saveKeyframe(120)

    // Sets the rotation of the Right Leg for all frames
    RLeg.transform.setRotation(0, 30 * Math.PI / 180, -Math.PI / 2)

    // Return the animated robot
    return humanoid
  }
}

// Export the HumanoidFactory class for use in other modules
export default AnimationFactory
