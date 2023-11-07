import { _decorator, Button, Component, dragonBones, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GG_Btn')
export class GG_Btn extends Component {

    @property({ type: dragonBones.ArmatureDisplay })
    armDisplay: dragonBones.ArmatureDisplay | null = null

    private isAnimationPlaying: boolean = false;

    
    start() {
        // this.armDisplay!.node.active = false;

        if (this.armDisplay.animationName) {
            this.armDisplay.playAnimation('Arm_ske', 0); 
            this.armDisplay.timeScale = 0; // Dừng animation
        }
    }

    btn_onClick() {
        if (this.isAnimationPlaying) {
            this.isAnimationPlaying = false;
            this.armDisplay.timeScale = 0; // Dừng animation
            // this.armDisplay!.node.active = false; // Ẩn Armature
        } else {
            // Nếu animation đang tắt, bật nó
            this.isAnimationPlaying = true;
            this.armDisplay!.node.active = true; 
            this.armDisplay.timeScale = 1; 
            this.armDisplay.playAnimation('Arm_ske', 0);
        }
    }


    btn_left() {
        // Xử lý khi nút btn_left được bấm
        if (this.isAnimationPlaying) {
            this.armDisplay.node.setPosition(this.armDisplay.node.position.x - 100, this.armDisplay.node.position.y);
        }
    }

    btn_right() {
        // Xử lý khi nút btn_right được bấm
        if (this.isAnimationPlaying) {
            // Di chuyển vị trí animation sang phải
            this.armDisplay.node.setPosition(this.armDisplay.node.position.x + 100, this.armDisplay.node.position.y);
        }
    }
}


