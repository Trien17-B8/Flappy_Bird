import { _decorator, BoxCollider2D, Collider2D, Component, Contact2DType, director, dragonBones, IPhysics2DContact, Node, PhysicsSystem2D, PolygonCollider2D, Tween, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Person')
export class Person extends Component {
    @property({ type: dragonBones.ArmatureDisplay })
    GG_PersonDisplay: dragonBones.ArmatureDisplay | null = null

    private isAnimationPlaying: boolean = false;

    private moveSpeed = 200;

    private isMoving = false;

    private isMovingForward: boolean = true;


    start() {
        if(this.GG_PersonDisplay){
            this.isAnimationPlaying = true;
            this.GG_PersonDisplay!.node.active = true; 
            this.GG_PersonDisplay.timeScale = 1; 
            this.GG_PersonDisplay.node.setScale(0.3, 0.3);
            this.GG_PersonDisplay.playAnimation('animtion_person_run', 0);
            this.moveCharacter()
            if (PhysicsSystem2D.instance ) {
                PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
                
            }
        }
    }

    onBeginContact(contact: IPhysics2DContact) {
        console.log('onBeginContact');
        if (this.GG_PersonDisplay) {
            this.isMovingForward = true;
            const currentScale = this.node.scale;
            this.node.scale = new Vec3(-currentScale.x, currentScale.y, currentScale.z);
           
        }
    }

    moveCharacter() {
        if (this.isAnimationPlaying && !this.isMoving) {
            this.isMoving = true;
            const currentPos = this.GG_PersonDisplay.node.position;
            const targetPos = currentPos.clone().add(new Vec3(-500, 0, 0));

            this.schedule(() => {
                const step = this.moveSpeed * director.getDeltaTime();
                let newX = this.GG_PersonDisplay.node.position.x - step;
                if (this.isMovingForward && newX < targetPos.x) {
                    newX = targetPos.x;
                }
                if (!this.isMovingForward && newX > targetPos.x) {
                    newX = targetPos.x;
                }
                this.GG_PersonDisplay.node.setPosition(new Vec3(newX, currentPos.y, currentPos.z));
                if (newX === targetPos.x) {
                    this.isMoving = false;
                    director.getScheduler().unscheduleAllForTarget(this);
                }
            }, 0);
        }
    }
    
    

}


