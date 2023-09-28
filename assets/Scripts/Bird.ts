import {
  _decorator,
  CCFloat,
  Component,
  Node,
  Vec3,
  Animation,
  tween,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("Bird")
export class Bird extends Component {
  @property({
    type: CCFloat,
    tooltip: "How high does the fly",
  })
  public jumHeight: number = 3.5;

  @property({
    type: CCFloat,
    tooltip: "How long does the fly",
  })
  public jumDuration: number = 3.5;

  public birdAnimation: Animation;
  public birdLocation: Vec3;

  public hitSomething: boolean;

  // Hàm chạy đầu tiên
  onLoad() {
    //console.log("onLoad()-bird");
    this.resetBird();
    this.birdAnimation = this.getComponent(Animation);
  }

  // Hàm set vị trí đầu tiên của bird
  resetBird() {
    this.birdLocation = new Vec3(0, 0, 0); // Set vị trí của bird ngay lúc đầu cũng như việc sau khi quay lại
    this.birdLocation = new Vec3(0, 250, 0); // Set vị trí của bird tùy theo ý thích
    this.node.setPosition(this.birdLocation);
    this.hitSomething = false;
  }

  // Bird sẽ chuyển động tùy theo ví trí mà mình chọn
  fly() {
    this.birdAnimation.stop();
    tween(this.node.position) // tween tạo cho chuyển động mượt mà
      .to(
        // Di chuyển đến vị trí
        this.jumDuration,

        new Vec3(
          // 20,50,0
          this.node.position.x,
          this.node.position.y + this.jumHeight,
          0
        ),
        {
          easing: "smooth",
          onUpdate: (target: Vec3, ratio: number) => {
            this.node.position = target;
          },
        }
      )
      .start();
    this.birdAnimation.play();
  }
}
