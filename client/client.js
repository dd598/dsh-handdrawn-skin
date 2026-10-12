// 手绘素描风皮肤 — 浏览器半部（lazy-CJS bundle 协议）。
//
// 设计原则：
//   1. **手绘墨黑**：宿主用品牌蓝 #4176e6 做所有强调色（发送按钮、标签下划线、
//      链接、"deep diving" 状态、气泡高亮…），这里一律换成**墨黑**，
//      不用彩色、也不用暖棕 —— 就是"纸 + 墨"的黑白素描观感。
//   2. 纸色走**同明度暖化**：宿主浅色主题底色本是纯白
//      （--dsw-alias-bg-* → --dsw-static-neutral-bluish-00 = #fff），
//      这里只偏色相、明度压低约 2%（有纸感但不发闷）。
//   3. 手绘质感**全部调淡**：纸纹 3.5%、文字描边 0.15px、细线墨色微加深、
//      墨线只在输入卡片上用 35% 墨色 —— 有质感但不抢戏。
//   4. **不碰布局**：不改圆角、间距、字号、结构，也不给任何元素加实心边框。
//   5. 功能状态色（错误红 / 成功绿 / 警告琥珀）保持宿主默认。
window.__ModuleLoader__.load({
  id: 'dsh-handdrawn-skin',
  factory: (require) => {
    var module = { exports: {} }
    var exports = module.exports
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })

    var BODY_ATTR = 'data-dsh-handdrawn'
    var S = 'body[' + BODY_ATTR + ']'

    // 纸纹：feTurbulence 噪点，3.5% 不透明度。
    var GRAIN = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")"

    var CSS = `
      /* ── 纸 + 墨（浅色）──────────────────────────────────────────────
         注释里的十六进制是宿主原始取值，便于对照与还原。 */
      ${S}{
        /* 纸张：同明度暖化 */
        --dsw-alias-bg-base:#FBF9F4;          /* bluish-00   #fff    */
        --dsw-alias-bg-layer-1:#FBF9F4;       /* bluish-00   #fff    */
        --dsw-alias-bg-layer-2:#FBF9F4;       /* bluish-00   #fff    */
        --dsw-alias-bg-layer-3:#FBF9F4;       /* bluish-00   #fff    */
        --dsw-alias-bg-overlay:#E8E3D8;       /* bluish-150  #e9ecf2 */
        --dsw-specific-sidebar-fill:#F7F4EE;  /* bluish-50   #f9fafb */
        --dsw-specific-input-major:#FBF9F4;   /* bluish-00   #fff    */
        --dsw-specific-selector:#F3EFE7;      /* bluish-60   #f5f6f7 */
        --dsw-specific-bubble:#F1EDE3;        /* deepseek-50 #edf3fe */

        /* 墨：文字与线条 */
        --dsw-alias-label-primary:#14120D;    /* bluish-1000 #0f1115 */
        --dsw-alias-label-secondary:#625E57;  /* bluish-700  #61666b */
        --dsw-alias-label-tertiary:#827D74;   /* bluish-600  #81858c */
        --dsw-alias-brand-primary:#14120D;    /* bluish-1000 #0f1115 */

        /* 细线：墨黑，各加深一点，得到铅笔画线的感觉（不是加边框） */
        --dsw-alias-border-l1:#1C1A1714;      /* #0000000a */
        --dsw-alias-border-l2:#1C1A1724;      /* #0000001a */
        --dsw-alias-border-l2-darkmode-thin:#1C1A1724;
        --dsw-alias-border-l3:#1C1A172E;      /* #0000001f */
        --dsw-alias-border-l4:#1C1A1738;      /* #00000029 */

        /* ── 手绘墨黑：所有强调色一律用墨，不用彩色 ── */
        --dsw-alias-state-business-primary:#26221C;   /* deepseek-500 #4176e6 */
        --dsw-alias-state-business-hover:#141210;     /* deepseek-500 */
        --dsw-alias-state-business-tertiary:#E5E0D5;  /* deepseek-100 #e4edfd */
        --dsw-alias-button-info-fill:#26221C;         /* deepseek-500 */
        --dsw-alias-button-info-hover:#141210;        /* deepseek-400 #7aaaff */
        --dsw-alias-link:#1C1A17;                     /* deepseek-500 */
        --dsw-alias-label-primary-bluish:#26221C;     /* blue-900 */
        --dsw-alias-label-deep-diving:#26221C;        /* mix(deepseek-500 70%, blue-950) */
        --dsw-alias-label-deep-diving-shimmer:#8A857A;
        --dsw-specific-bubble-highlight:#E5E0D5;      /* deepseek-200 #d3e2ff */
        --dsw-specific-sidebar-nav-item-active-accent:#E5E0D5; /* deepseek-100 */
        --dsw-alias-bg-document-selection:color-mix(in srgb, #26221C 30%, transparent);
      }

      /* ── 纸 + 墨（深色）：深色纸上"墨"就是浅色线 ─────────────────── */
      ${S}[data-ds-dark-theme]{
        --dsw-alias-bg-base:#16150F;          /* bluish-950  #151517 */
        --dsw-alias-bg-layer-1:#242219;       /* bluish-875  #232324 */
        --dsw-alias-bg-layer-2:#2D2A24;       /* bluish-850  #2c2c2e */
        --dsw-alias-bg-layer-3:#2D2A24;       /* bluish-850  #2c2c2e */
        --dsw-alias-bg-overlay:#625E57;       /* bluish-700  #61666b */
        --dsw-specific-sidebar-fill:#1C1A16;  /* bluish-900  #1b1b1c */
        --dsw-specific-input-major:#2D2A24;   /* bluish-850  #2c2c2e */
        --dsw-specific-selector:#36332C;      /* bluish-800  #353638 */
        --dsw-specific-bubble:#2D2A24;        /* bluish-850  #2c2c2e */

        --dsw-alias-label-primary:#FAF8F3;    /* bluish-50   #f9fafb */
        --dsw-alias-label-secondary:#D0CCC1;  /* bluish-300  #cfd3d6 */
        --dsw-alias-label-tertiary:#AEA99E;   /* bluish-400  #adb2b8 */
        --dsw-alias-brand-primary:#FAF8F3;    /* bluish-50   #f9fafb */

        --dsw-alias-border-l1:#E8E5DE0f;      /* #ffffff0f */
        --dsw-alias-border-l2:#E8E5DE1f;      /* #ffffff1f */
        --dsw-alias-border-l2-darkmode-thin:#E8E5DE1f;
        --dsw-alias-border-l3:#E8E5DE29;      /* #ffffff29 */
        --dsw-alias-border-l4:#E8E5DE33;      /* #fff3     */

        --dsw-alias-state-business-primary:#E8E5DE;
        --dsw-alias-state-business-hover:#FFFFFF;
        --dsw-alias-state-business-tertiary:#2A2620;
        --dsw-alias-button-info-fill:#E8E5DE;
        --dsw-alias-button-info-hover:#FFFFFF;
        --dsw-alias-link:#E8E5DE;
        --dsw-alias-label-primary-bluish:#E8E5DE;
        --dsw-alias-label-deep-diving:#E8E5DE;
        --dsw-alias-label-deep-diving-shimmer:#6E6A62;
        --dsw-specific-bubble-highlight:#3A362E;
        --dsw-specific-sidebar-nav-item-active-accent:#2A2620;
        --dsw-alias-bg-document-selection:color-mix(in srgb, #E8E5DE 30%, transparent);
      }

      /* ── 手绘质感（都调淡）────────────────────────────────────────── */

      /* 牛皮纸颗粒：固定覆盖层，3.5% 噪点，不挡点击 */
      ${S}::after{
        content:"";
        position:fixed; inset:0;
        pointer-events:none;
        z-index:9999;
        background-image:${GRAIN};
      }

      /* 马克笔式轻描边：0.15px，且只挑文本元素 —— 不碰图标字形 */
      ${S} :is(p,span,li,h1,h2,h3,h4,h5,h6,label,td,th,button,a,blockquote,figcaption){
        -webkit-text-stroke:.15px currentColor;
      }

      /* 手写楷体：只给欢迎页大标题，字重 600（wordmark 不动） */
      ${S} [class*="headline"]{
        font-family:'KaiTi','STKaiti','Kaiti SC','Kai','楷体',cursive;
        font-weight:600;
      }

      /* 输入卡片：描边色换成 35% 墨色；不另加 border，避免叠线 */
      ${S} [data-composer-card]{
        --dsw-elevation-stroke-color:#26221C59;
      }
    `

    function apply() {
      if (typeof document === 'undefined' || document.head === null) return

      var style = document.createElement('style')
      style.setAttribute('data-dsh-skin', 'hand-drawn')
      style.textContent = CSS
      document.head.appendChild(style)

      // 皮肤作用域就是这个属性：摘掉它，整站立刻回到原样。
      document.body.setAttribute(BODY_ATTR, '')

      return function dispose() {
        document.body.removeAttribute(BODY_ATTR)
        style.remove()
      }
    }

    exports.apply = apply
    return module.exports
  }
})
