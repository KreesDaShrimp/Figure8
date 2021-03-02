// Disable type-checking as it reports incorrect errors
// @ts-nocheck

// Parent class
import MeshFactory from './MeshFactory'

// Base geometry factories
import CylinderFactory from './CylinderFactory'
import SphereFactory from './SphereFactory'
import CubeFactory from './CubeFactory'

/**
 * A class to build a representation of robitic skeletal bipedal character
 * for use with Three.js.  Do not call makeObjectGeometry() on this class
 * as it is left abstract. Use generateMesh() instead.
 **/
class HumanoidFactory extends MeshFactory {
  /**
   * Create a new humanoid factory object.
   **/
  constructor () {
    super()
    this._name = 'Humanoid'
  }

  /**
   * Build and return a THREE.Mesh() object representing a bipedal robot.
   * @override
   * @return {THREE.Mesh} A decorated mesh structure for use with MeshWidget
   **/
  generateMesh () {
    // Empty root object for the entire humanoid character
    var root = MeshFactory.generateEmptyNode('Humanoid')
    root.transform.setPosition(0, -0.7, 0)
    var torsoMaker = new CylinderFactory()
    var torso = torsoMaker.generateMesh()
    torso.name = 'Torso'
    torso.transform.setScale(0.075, 0.5, 0.075)
    torso.transform.setPosition(0, 1, 0)
    torso.transform.setRotation(0, 90 * Math.PI / 180, 0)
    torso = MeshFactory.isolateScale(torso)

    // Makes and sets the head (child of torso)
    var headMaker = new SphereFactory()
    var head = headMaker.generateMesh()
    head.name = 'Head'
    head.transform.setScale(0.2, 0.2, 0.2)
    head.transform.setPosition(0, 0.75, 0)
    head.transform.setPivot(0, 0, 0)
    torso.add(head)

    // Makes and sets the collarbone (child of torso)
    var collarBone = new CylinderFactory()
    var cB = collarBone.generateMesh()
    cB.name = 'Collar Bone'
    cB.transform.setScale(0.1, 0.5, 0.1)
    cB.transform.setPosition(0, 0.5, 0)
    cB.transform.setRotation(0, 0, 90 * Math.PI / 180)
    cB = MeshFactory.isolateScale(cB)
    torso.add(cB)

    // Makes and sets the hip (child of torso)
    var hipMaker = new CylinderFactory()
    var hips = hipMaker.generateMesh()
    hips.name = 'Hips'
    hips.transform.setScale(0.1, 0.35, 0.1)
    hips.transform.setPosition(0, -0.5, 0)
    hips.transform.setRotation(0, 0, 90 * Math.PI / 180)
    hips = MeshFactory.isolateScale(hips)
    torso.add(hips)

    // Makes and sets the right arm (child of collarBone)
    var rightArm = this.buildArm()
    rightArm.name = 'Right Arm'
    rightArm.transform.setPosition(0, 0.175, 0)
    rightArm.transform.setScale(0.1, 0.35, 0.1)
    rightArm.transform.setPivot(0, 0.35, 0)
    rightArm.transform.setRotation(0, 0, -90 * Math.PI / 180)
    rightArm = MeshFactory.isolateScale(rightArm)
    cB.add(rightArm)

    // Makes and sets the right hand (child of rightArm)
    var rightHand = this.buildHand()
    rightHand.name = 'Right Hand'
    rightHand.transform.setPosition(0, -0.4, 0)
    rightHand.transform.setScale(0.1, 0.1, 0.1)
    rightArm.add(rightHand)

    // Makes and sets the left arm (child of collarBone)
    var leftArm = this.buildArm()
    leftArm.name = 'Left Arm'
    leftArm.transform.setPosition(0, -0.85, 0)
    leftArm.transform.setScale(0.1, 0.35, 0.1)
    leftArm.transform.setPivot(0, 0.35, 0)
    leftArm.transform.setRotation(0, 0, -90 * Math.PI / 180)
    leftArm = MeshFactory.isolateScale(leftArm)
    cB.add(leftArm)

    // Makes and sets the left hand (child of leftArm)
    var leftHand = this.buildHand()
    leftHand.name = 'Left Hand'
    leftHand.transform.setPosition(0, -0.4, 0)
    leftHand.transform.setScale(0.1, 0.1, 0.1)
    leftArm.add(leftHand)

    // Makes and sets the right leg (child of hips)
    var legMaker = new CylinderFactory()
    var rightLeg = legMaker.generateMesh()
    rightLeg.name = 'Right Leg'
    rightLeg.transform.setPosition(-0.2, 0.175, 0)
    rightLeg.transform.setScale(0.1, 0.35, 0.1)
    rightLeg.transform.setPivot(0, 0.2, 0)
    rightLeg.transform.setRotation(0, 0, -90 * Math.PI / 180)
    rightLeg = MeshFactory.isolateScale(rightLeg)
    hips.add(rightLeg)

    // Makes and sets the right foot (child of right leg)
    var footMaker = new CubeFactory()
    var rightFoot = footMaker.generateMesh()
    rightFoot.name = 'Right Foot'
    rightFoot.transform.setScale(0.1, 0.05, 0.1)
    rightFoot.transform.setPosition(0, -0.4, 0)
    rightLeg.add(rightFoot)

    // Makes and sets the left leg (child of hips)
    var leftLeg = legMaker.generateMesh()
    leftLeg.name = 'Left Leg'
    leftLeg.transform.setPosition(-0.15, -0.625, 0)
    leftLeg.transform.setScale(0.1, 0.35, 0.1)
    leftLeg.transform.setPivot(0, 0.25, 0)
    leftLeg.transform.setRotation(0, 0, -90 * Math.PI / 180)
    leftLeg = MeshFactory.isolateScale(leftLeg)
    hips.add(leftLeg)

    // Makes and sets the left foot (child of left leg)
    var leftFoot = footMaker.generateMesh()
    leftFoot.name = 'Right Foot'
    leftFoot.transform.setScale(0.1, 0.05, 0.1)
    leftFoot.transform.setPosition(0, -0.4, 0)
    leftLeg.add(leftFoot)

    root.add(torso)

    // Return the completed mesh
    return root
  }
  // Right Arm building function
  buildArm () {
    var root = MeshFactory.generateEmptyNode('Right Arm')
    var armBuilder = new CylinderFactory()
    var arm = armBuilder.generateMesh()
    arm.name = 'Arm'
    arm.transform.setScale(1, 1, 1)
    root.add(arm)
    return root
  }
  // Right hand building function
  buildHand () {
    var root = MeshFactory.generateEmptyNode('Right Hand')
    var handBuilder = new SphereFactory()
    var hand = handBuilder.generateMesh()
    hand.name = 'Hand'
    hand.transform.setScale(1, 1, 1)
    root.add(hand)
    return root
  }
}

// Export the HumanoidFactory class for use in other modules
export default HumanoidFactory
