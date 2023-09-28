import {
  _decorator,
  CCInteger,
  Component,
  director,
  EventKeyboard,
  input,
  Input,
  KeyCode,
  Node,
  Contact2DType,
  Collider2D,
  IPhysics2DContact,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;
import { Ground } from "./Ground";
import { Results } from "./Results";
import { Bird } from "./Bird";
import { PipePool } from "./PipePool";
import { BirdAudio } from "./BirdAudio";

@ccclass("GameCtrl")
export class GameCtrl extends Component {
  @property({
    type: Component,
    tooltip: "This is ground",
  })
  public ground: Ground;

  @property({
    type: Results,
    tooltip: "Results go here",
  })
  public results: Results;

  @property({
    type: Bird,
  })
  public bird: Bird;

  @property({
    type: PipePool,
  })
  public pipeQueue: PipePool;

  @property({
    type: BirdAudio,
  })
  public clip: BirdAudio;

  @property({
    type: CCInteger,
  })
  public speed: number = 300;

  @property({
    type: CCInteger,
  })
  public pipeSpeed: number = 200;

  public isOver: boolean;

  /**
    Vòng đời Life Cycle Callbacks
    onLoad(): Hàm được gọi đầu tiên
    onEnable(): 
    start(): Hàm được gọi kích hoạt lần đầu tiên, thường dùng để khởi tạo một số dữ liệu trạng thái trung gian
    update(): Hàm update là hàm được dùng để cập nhật hành vi cũng như trạng thái và hướng của đối tượng trước mỗi khung hình hiển thị
    lateUpdate()
    onDisable()
    onDestroy()

   */

  onLoad() {
    this.initListener();
    this.results.resestScore();
    this.isOver = true;
    // this.pipeQueue.reset(); // Hàm này dùng để set vị trí cột vào chính giữa
    director.pause();
  }

  initListener() {
    // input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

    this.node.on(Node.EventType.TOUCH_START, () => {
      if (this.isOver == true) {
        this.resetGame();
        this.bird.resetBird();
        this.startGame();
      }
      if (this.isOver == false) {
        this.bird.fly();
        this.clip.onAudioQueue(0);
      }
    });
  }

  // onKeyDown(event: EventKeyboard) {
  //   switch (event.keyCode) {
  //     case KeyCode.KEY_A:
  //       this.gameOver();
  //       break;
  //     case KeyCode.KEY_P:
  //       this.results.addScore();
  //       break;
  //     case KeyCode.KEY_Q:
  //       this.resetGame();
  //       this.bird.resetBird();
  //   }
  // }

  startGame() {
    console.log("startGame()");
    this.results.hideResults();
    director.resume();
  }

  gameOver() {
    this.results.showResults();
    this.isOver = true;
    this.clip.onAudioQueue(3);
    director.pause();
  }

  resetGame() {
    this.results.resestScore();
    this.pipeQueue.reset();
    this.isOver = false;
    this.startGame();
  }

  passPipe() {
    this.results.addScore();
    this.clip.onAudioQueue(1);
  }

  createPipe() {
    this.pipeQueue.addPool();
  }

  contactGroundPipe() {
    let collider = this.bird.getComponent(Collider2D);

    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
  }
  onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    this.bird.hitSomething = true;
    this.clip.onAudioQueue(2);
  }

  birdStruck() {
    this.contactGroundPipe();
    if (this.bird.hitSomething == true) {
      this.gameOver();
    }
  }

  update() {
    if (this.isOver == false) {
      this.birdStruck();
    }
  }
}
