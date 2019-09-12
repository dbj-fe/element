<script>
  import { tintColor } from './util';
  const THEME_COLOR = {
    green: '#00BF53',
    gray: '#999999'
  };
  export default {
    name: 'ElTag',
    props: {
      type: String,
      closable: Boolean,
      corner: Boolean,
      disableTransitions: Boolean,
      color: String
    },
    methods: {
      handleClose(event) {
        event.stopPropagation();
        this.$emit('close', event);
      },
      handleClick(event) {
        event.stopPropagation();
        this.$emit('click', event);
      }
    },
    computed: {
      themeColor() {
        return THEME_COLOR[this.color] || this.color;
      },
      frontColor() {
        if (!this.themeColor) {
          return '';
        }
        if (this.type === 'primary') {
          return '#FFFFFF';
        }
        if (this.type === 'secondary') {
          return this.themeColor;
        }
        return this.corner ? '#FFFFFF' : this.themeColor;
      },
      backgroundColor() {
        if (!this.themeColor) {
          return '';
        }
        if (this.type === 'primary') {
          return this.themeColor;
        }
        if (this.type === 'secondary') {
          return tintColor(this.themeColor, 0.8);
        }
        return this.corner ? this.themeColor : '';
      },
      borderColor() {
        if (!this.themeColor) {
          return '';
        }
        if (this.type === 'primary') {
          return this.themeColor;
        }
        if (this.type === 'secondary') {
          return tintColor(this.themeColor, 0.8);
        }
        return this.themeColor;
      }
    },
    render(h) {
      const classes = [ 'el-tag', this.type ? `el-tag--${this.type}` : '',
        {
          'el-tag--closable': this.closable,
          'is-corner': this.corner
        }
      ];
      let tagEl = (
        <span
          class={classes}
          style={{backgroundColor: this.backgroundColor, borderColor: this.borderColor, color: this.frontColor}}
          on-click={this.handleClick}>
          { this.$slots.default }
          {
            this.closable &&
              <i class="el-tag__close el-icon-close"
                style={{color: this.frontColor}}
                on-click={this.handleClose}
              ></i>
          }
        </span>
      );
      if (this.corner) {
        tagEl = <div class="el-tag-wrapper--corner">{ tagEl }</div>;
      }

      return this.disableTransitions ? tagEl : <transition name="el-zoom-in-center">{ tagEl }</transition>;
    }
  };
</script>
