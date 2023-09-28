import { _decorator, Component, Node, Prefab, NodePool, instantiate } from "cc";
const { ccclass, property } = _decorator;
// decorator là một đối tượng quản lý của toàn bộ luồng và trò chơi
// Nó cung cấp các thuộc tính phương thức của trò chơi, cũng như quản lý các cảnh của trò chơi

import { Pipes } from "./Pipes";

@ccclass("PipePool")
export class PipePool extends Component {
  @property({
    type: Prefab, // Từ bản gôc dùng để nhân ra các bản tiếp theo
  })
  public prefabPipes = null;

  @property({
    type: Node, // Node dùng để mô tả thuộc tính của đối tượng
  })
  public pipePoolHome;

  public pool = new NodePool(); // Tái sử dụng lại và hạn chế việc tạo mới

  public createPipe;

  initPool() {
    let initCount = 3; // Số lượng nút là số lượng tối đa
    for (let i = 0; i < initCount; i++) {
      this.createPipe = instantiate(this.prefabPipes); // Tạo ra một bản sao từ bản gốc có sẵn
      if (i == 0) {
        this.pipePoolHome.addChild(this.createPipe);
      } else {
        this.pool.put(this.createPipe);
      }
    }
  }

  addPool() {
    if (this.pool.size() > 0) {
      this.createPipe = this.pool.get();
    } else {
      this.createPipe = instantiate(this.prefabPipes);
    }

    this.pipePoolHome.addChild(this.createPipe);
  }

  reset() {
    this.pipePoolHome.removeAllChildren();
    this.pool.clear();
    this.initPool();
  }
}
