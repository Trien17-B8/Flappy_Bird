import {
  _decorator,
  Component,
  Node,
  Vec3,
  screen,
  find,
  UITransform,
} from "cc";
const { ccclass, property } = _decorator;

const random = (min, max) => {
  return Math.random() * (max - min) + min;
};
import { GameCtrl } from "./GameCtrl";

@ccclass("Pipes")
export class Pipes extends Component {
  @property({
    type: Node,
    tooltip: "Top Pipe",
  })
  public topPipe: Node;

  @property({
    type: Node,
    tooltip: "Bottom Pipe",
  })
  public bottomPipe: Node;

  public tempStartLocationUp: Vec3 = new Vec3(0, 0, 0);
  public tempStartLocationDown: Vec3 = new Vec3(0, 0, 0);
  public scene = screen.windowSize;

  public game;
  public pipeSpeed: number; // final speed of the pipes
  public tempSpeed: number;

  isPass: boolean;

  // Di chuyển các đường ống trên màn hình
  onLoad() {
    this.game = find("GameCtrl").getComponent("GameCtrl"); // Tìm thành phần node trong cocos
    this.pipeSpeed = this.game.pipeSpeed; // Tất cả đều được khai báo ,quản lý tại GameCtrl
    this.initPos();
    this.isPass = false;
  }

  start() {
    this.initPos();
  }

  initPos() {
    // Vị trí bắt đầu của các đường ống.
    this.tempStartLocationUp.x =
      this.topPipe.getComponent(UITransform).width + this.scene.width; // Lấy tham chiếu từ thành phần này đến phần tử được gắn node
    this.tempStartLocationDown.x =
      this.topPipe.getComponent(UITransform).width + this.scene.width;

    //Đặt vị trí của 2 cột ngay tại giữa màn hình
    // this.tempStartLocationUp = new Vec3(0, 0, 0); // Set vị trí của cả 2 cột vào chính giữa
    // this.tempStartLocationDown = new Vec3(0, 0, 0);
    // let gap = random(90, 100);
    // let topHeight = random(0, 450);
    let gap = random(90, 100);
    let topHeight = random(0, 450);

    this.tempStartLocationUp.y = topHeight;
    let grap2: number = gap * 10;
    this.tempStartLocationDown.y = topHeight - grap2;

    this.bottomPipe.setPosition(this.tempStartLocationDown);
    this.topPipe.setPosition(this.tempStartLocationUp);
  }

  update(deltaTime) {
    // Di chuyển đường ống trên khung hình
    this.tempSpeed = this.pipeSpeed * deltaTime;
    this.tempStartLocationDown = this.bottomPipe.position;
    this.tempStartLocationUp = this.topPipe.position;

    this.tempStartLocationDown.x -= this.tempSpeed;
    this.tempStartLocationUp.x -= this.tempSpeed;

    this.bottomPipe.setPosition(this.tempStartLocationDown);
    this.topPipe.setPosition(this.tempStartLocationUp);

    if (this.isPass == false && this.topPipe.position.x <= 0) {
      this.isPass = true;
      this.game.passPipe();
    }

    if (this.topPipe.position.x < 0 - this.scene.width) {
      this.game.createPipe();
      this.destroy();
    }
  }
}
