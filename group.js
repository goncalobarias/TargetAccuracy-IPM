// Group class: represents a group of targets and how they are placed on the canvas
class Group {
  constructor(c) {
    this.targets = [];
    this.color = c;
  }

  addTarget(new_target) {
    this.targets.push(new_target);
  }

  sortTargets() {
    this.targets.sort((a, b) => {
      if (a.label < b.label) {
        return -1;
      } else {
        return 1;
      }
    });
  }

  calculateSize() {
    if (this.targets.length >= 1 && this.targets.length <= 3) {
      this.width = target_size + 2 / separator_size;
      this.n_width = 1;
      this.height = (this.targets.length * 1) / separator_size + this.targets.length * target_size;
      this.n_height = this.targets.length;
    } else if (this.targets.length > 3 && this.targets.length <= 6) {
      this.width = 2 * target_size + 3 / separator_size;
      this.n_width = 2;
      this.height = 3 * target_size + 4 / separator_size;
      this.n_height = 3;
    } else if (this.targets.length > 6 && this.targets.length <= 9) {
      this.width = 3 * target_size + 4 / separator_size;
      this.n_width = 3;
      this.height = 3 * target_size + 4 / separator_size;
      this.n_height = 3;
    } else if (this.targets.length > 9 && this.targets.length <= 12) {
      this.width = 8 + 5 / separator_size;
      this.n_width = 4;
      this.height = 3 * target_size + 4 / separator_size;
      this.n_height = 3;
    }
  }

  setPosition(group_x, group_y) {
    this.x = group_x;
    this.y = group_y;
    let group_separator = PPCM / separator_size;
    let t_size = target_size * PPCM;

    for (let r = 0; r < this.n_height; r++) {
      for (let c = 0; c < this.n_width; c++) {
        if (c + this.n_width * r >= this.targets.length) {
          break;
        }

        let target_x = this.x + group_separator + (group_separator + t_size) * c + t_size / 2;
        let target_y = this.y + group_separator + (group_separator + t_size) * r + t_size / 2;

        this.targets[c + this.n_width * r].setPosition(target_x, target_y);
      }
    }
  }

  draw(mouse_x, mouse_y) {
    for (let i = 0; i < this.targets.length; i++) {
      this.targets[i].draw(mouse_x, mouse_y);
    }
  }
}
