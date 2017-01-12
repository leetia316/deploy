import './index.css';

export default {
  name: 'diff-list',
  props: {
    diffSet: Array
  },
  data () {
    return {
      activeIndex: -1,
      dirs: [],
      extraDirs: []
    }
  },
  methods: {
    onFileClick (entry, i) {
      this.activeIndex = i;
      this.$emit('fileClick', entry);
    },
    toggleExtra (dir) {
      const index = this.extraDirs.indexOf(dir);
      if (index < 0) {
        this.extraDirs.push(dir);
      } else {
        this.extraDirs.splice(index, 1);
      }
    }
  },
  
  render (h) {
    const diffSet = this.diffSet || [];
    const diffList = diffSet.map((entry, i) => {
      if (this.dirs.indexOf(entry.fullname) < 0 && (entry.type1 === 'directory' || entry.type2 === 'directory')) {
        if (entry.level <= 1) {
          this.dirs.push(entry.fullname);
        }
        return;
      }
      if (entry.state !== 'equal' && (entry.type1 === 'file' || entry.type2 === 'file')) {
        const state = {
          'left' : '新增',
          'right' : '删除',
          'distinct' : '修改'
        }[entry.state];
        const txt = `${state}文件：${entry.fullname}`;
        let show = true;
        this.extraDirs.forEach(dir => {
          if (entry.relativePath.indexOf(dir) >= 0) {
            show = false;
          }
        });
        if (show) {
          return (
            <li class={{ file_diff_item: true, active: this.activeIndex === i }}><a href="javascript:;" onClick={this.onFileClick.bind(this, entry, i)}>{txt}</a></li>
          );
        }
      }
    }).filter(item => typeof item !== 'undefined');

    const extraDirList = this.dirs.map(dir => {
      return (
        <a href="javascript:;" class={{ file_diff_extra_lk: true, active: this.extraDirs.indexOf(dir) >= 0 }} onClick={this.toggleExtra.bind(this, dir)}>{dir}</a>
      );
    });
    return (
      <div class="file_diff">
        <div class="file_diff_extra">
          <p>选择需要忽略的目录</p>
          <div class="file_diff_extra_dirs">{extraDirList}</div>
        </div>
        <ul class="file_diff_list">
          {diffList}
        </ul>
      </div>
    );
  }
};