import { _decorator, BoxCollider2D, Collider2D, Component, Contact2DType, director, dragonBones, IPhysics2DContact, Node, PhysicsSystem2D, PolygonCollider2D, Tween, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Person')
export class Person extends Component {
    @property({ type: dragonBones.ArmatureDisplay })
    GG_PersonDisplay: dragonBones.ArmatureDisplay | null = null

    @property({ type: Node })
    GG_Left: Node | null = null

    @property({ type: Node })
    GG_Right: Node | null = null

    @property({ type: Node })
    GG_CharacterShadowNode: Node | null = null;

    private isAnimationPlaying: boolean = false;

    private moveSpeed = 70;

    private isMoving = false;

    public isMovingForward: boolean = true;

    

    start() {
        // Đăng ký các chức năng gọi lại liên hệ toàn cầu
        if (PhysicsSystem2D.instance && this.GG_PersonDisplay) {
            PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
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

    update(dt) {
        // Kiểm tra xem nhân vật có di chuyển không
        if (this.isMoving) {
            // Lấy vị trí hiện tại của nhân vật
            const characterPosition = this.GG_PersonDisplay.node.position;
            // Cập nhật vị trí của hình đổ bóng (assumed shadowPosition là vị trí của hình đổ bóng)
            const shadowPosition: Vec3  = this.GG_CharacterShadowNode.position; // Thay thế bằng tên thực tế của hình đổ bóng
            shadowPosition.x = characterPosition.x;
            shadowPosition.y = characterPosition.y; // Cập nhật vị trí theo vị trí của nhân vật
            this.GG_CharacterShadowNode.position = shadowPosition; // Đặt lại vị trí của hình đổ bóng
        }
        
    }
    
    btn_onClick() {
        if (this.isAnimationPlaying) {
            this.isAnimationPlaying = false;
            this.GG_PersonDisplay.timeScale = 0; 
        } else {
            this.isAnimationPlaying = true;
            this.GG_PersonDisplay!.node.active = true; 
            this.GG_PersonDisplay.timeScale = 1; 
            this.GG_PersonDisplay.node.setScale(0.3, 0.3);
            this.GG_PersonDisplay.playAnimation('animtion_person_run', 0);
            this.moveCharacter(-500)
        }
    }
    moveCharacter(x: number) {
        if (this.isAnimationPlaying && !this.isMoving) {
            this.isMoving = true;
            const currentPos = this.GG_PersonDisplay.node.position;
            const targetPos = currentPos.clone().add(new Vec3(x, 0, 0));
    
            this.schedule(() => {
                const step = this.moveSpeed * director.getDeltaTime();
                let newX = this.GG_PersonDisplay.node.position.x + (x > 0 ? step : -step);
    
                if ((x > 0 && newX > targetPos.x) || (x < 0 && newX < targetPos.x)) {
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
    

    // moveCharacter(x: number, y: number) {
    //     if (this.isAnimationPlaying && !this.isMoving) {
    //         this.isMoving = true;
    //         const currentPos = this.GG_PersonDisplay.node.position;
    //         const targetPos = currentPos.clone().add(new Vec3(x, y, 0));
    
    //         this.schedule(() => {
    //             const step = this.moveSpeed * director.getDeltaTime();
    //             let newX = this.GG_PersonDisplay.node.position.x + (x > 0 ? step : -step);
    //             let newY = this.GG_PersonDisplay.node.position.y - (y > 0 ? step : -step);
    
    //             if ((x > 0 && newX > targetPos.x) || (x < 0 && newX < targetPos.x)) {
    //                 newX = targetPos.x;
    //             }
    
    //             if ((y > 0 && newY > targetPos.y) || (y < 0 && newY < targetPos.y)) {
    //                 newY = targetPos.y;
    //             }
    
    //             this.GG_PersonDisplay.node.setPosition(new Vec3(newX, newY, currentPos.z));
    //             if (newX === targetPos.x && newY === targetPos.y) {
    //                 this.isMoving = false;
    //                 director.getScheduler().unscheduleAllForTarget(this);
    //             }
    //         }, 0);
    //     }
    // }
    
    

}


