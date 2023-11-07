import {
  _decorator,
  Collider2D,
  Component,
  Contact2DType,
  Input,
  input,
  IPhysics2DContact,
  Node,
  systemEvent,
  SystemEvent,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("CollisionManager")
export class sdsadsad extends Component {
  start() {}

  onTouchStart() {}

  update(deltaTime: number) {}

  onBeginContact(
    sefCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    // console.log("onBeginContacts" + otherCollider.name);
  }
}
