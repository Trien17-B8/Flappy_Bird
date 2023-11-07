import { _decorator, Component, dragonBones, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GG_Bear')
export class GG_Bear extends Component {
    @property({ type: dragonBones.ArmatureDisplay })
    armDisplay: dragonBones.ArmatureDisplay | null = null

    private isAnimationPlaying: boolean = false;

    
    start() {
        // this.armDisplay!.node.active = false;

        if (this.armDisplay.animationName) {
            this.armDisplay.playAnimation('walk', 0); 
            this.armDisplay.timeScale = 0; // Dừng animation
        }
    }

    btn_onClick() {
        if (this.isAnimationPlaying) {
            this.isAnimationPlaying = false;
            this.armDisplay.timeScale = 0; 
            
        } else {
            // Nếu animation đang tắt, bật nó
            this.isAnimationPlaying = true;
            this.armDisplay!.node.active = true; 
            this.armDisplay.timeScale = 1; 
            this.armDisplay.playAnimation('turn face', 0);
        }
    }


    btn_left() {
        // Xử lý khi nút btn_left được bấm
        if (this.isAnimationPlaying) {
            // Di chuyển vị trí animation sang trái
            // this.armDisplay.node.setPosition(this.armDisplay.node.position.x - 5, this.armDisplay.node.position.y);
            this.isAnimationPlaying = true;
            this.armDisplay!.node.active = true; 
            this.armDisplay.timeScale = 1; 
            this.armDisplay.playAnimation('walk', 0);
        }
    }

    btn_right() {
        if (this.isAnimationPlaying) {
            // Di chuyển vị trí animation sang phải
            // this.armDisplay.node.setPosition(this.armDisplay.node.position.x + 10, this.armDisplay.node.position.y);
            this.isAnimationPlaying = true;
            this.armDisplay!.node.active = true; 
            this.armDisplay.timeScale = 1; 
            this.armDisplay.playAnimation('stand', 0);
        }
    }
}


