const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-DmXBMqwm.js","assets/index-GzM5P8aq.js","assets/index-BczxmwGr.css"])))=>i.map(i=>d[i]);
import{bd as C,be as k,P as n,N as u,O as b,bf as S,Q as x,bg as A,V as p,_ as g,a1 as E,Z as O,T as _,bh as m,bi as c,M as L,bj as N}from"./index-GzM5P8aq.js";const T=C`
  :host {
    z-index: var(--w3m-z-index);
    display: block;
    backface-visibility: hidden;
    will-change: opacity;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0;
    background-color: var(--wui-cover);
    transition: opacity 0.2s var(--wui-ease-out-power-2);
    will-change: opacity;
  }

  :host(.open) {
    opacity: 1;
  }

  wui-card {
    max-width: var(--w3m-modal-width);
    width: 100%;
    position: relative;
    animation: zoom-in 0.2s var(--wui-ease-out-power-2);
    animation-fill-mode: backwards;
    outline: none;
  }

  wui-card[shake='true'] {
    animation:
      zoom-in 0.2s var(--wui-ease-out-power-2),
      w3m-shake 0.5s var(--wui-ease-out-power-2);
  }

  wui-flex {
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  @media (max-height: 700px) and (min-width: 431px) {
    wui-flex {
      align-items: flex-start;
    }

    wui-card {
      margin: var(--wui-spacing-xxl) 0px;
    }
  }

  @media (max-width: 430px) {
    wui-flex {
      align-items: flex-end;
    }

    wui-card {
      max-width: 100%;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom: none;
      animation: slide-in 0.2s var(--wui-ease-out-power-2);
    }

    wui-card[shake='true'] {
      animation:
        slide-in 0.2s var(--wui-ease-out-power-2),
        w3m-shake 0.5s var(--wui-ease-out-power-2);
    }
  }

  @keyframes zoom-in {
    0% {
      transform: scale(0.95) translateY(0);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes slide-in {
    0% {
      transform: scale(1) translateY(50px);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes w3m-shake {
    0% {
      transform: scale(1) rotate(0deg);
    }
    20% {
      transform: scale(1) rotate(-1deg);
    }
    40% {
      transform: scale(1) rotate(1.5deg);
    }
    60% {
      transform: scale(1) rotate(-1.5deg);
    }
    80% {
      transform: scale(1) rotate(1deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }

  @keyframes w3m-view-height {
    from {
      height: var(--prev-height);
    }
    to {
      height: var(--new-height);
    }
  }
`;var l=function(w,e,t,i){var s=arguments.length,o=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(w,e,t,i);else for(var d=w.length-1;d>=0;d--)(r=w[d])&&(o=(s<3?r(o):s>3?r(e,t,o):r(e,t))||o);return s>3&&o&&Object.defineProperty(e,t,o),o};const y="scroll-lock";let a=class extends k{constructor(){super(),this.unsubscribe=[],this.abortController=void 0,this.open=n.state.open,this.caipAddress=u.state.caipAddress,this.isSiweEnabled=b.state.isSiweEnabled,this.connected=u.state.isConnected,this.loading=n.state.loading,this.shake=n.state.shake,this.initializeTheming(),S.prefetch(),this.unsubscribe.push(n.subscribeKey("open",e=>e?this.onOpen():this.onClose()),n.subscribeKey("shake",e=>this.shake=e),n.subscribeKey("loading",e=>{this.loading=e,this.onNewAddress(u.state.caipAddress)}),u.subscribeKey("isConnected",e=>this.connected=e),u.subscribeKey("caipAddress",e=>this.onNewAddress(e)),b.subscribeKey("isSiweEnabled",e=>this.isSiweEnabled=e)),x.sendEvent({type:"track",event:"MODAL_LOADED"})}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.onRemoveKeyboardListener()}render(){return this.open?A`
          <wui-flex @click=${this.onOverlayClick.bind(this)} data-testid="w3m-modal-overlay">
            <wui-card
              shake="${this.shake}"
              role="alertdialog"
              aria-modal="true"
              tabindex="0"
              data-testid="w3m-modal-card"
            >
              <w3m-header></w3m-header>
              <w3m-router></w3m-router>
              <w3m-snackbar></w3m-snackbar>
            </wui-card>
          </wui-flex>
          <w3m-tooltip></w3m-tooltip>
        `:null}async onOverlayClick(e){e.target===e.currentTarget&&await this.handleClose()}async handleClose(){const e=p.state.view==="ConnectingSiwe",t=p.state.view==="ApproveTransaction";if(this.isSiweEnabled){const{SIWEController:i}=await g(async()=>{const{SIWEController:o}=await import("./index-DmXBMqwm.js");return{SIWEController:o}},__vite__mapDeps([0,1,2]));i.state.status!=="success"&&(e||t)?n.shake():n.close()}else n.close()}initializeTheming(){const{themeVariables:e,themeMode:t}=N.state,i=E.getColorTheme(t);O(e,i)}onClose(){this.open=!1,this.classList.remove("open"),this.onScrollUnlock(),_.hide(),this.onRemoveKeyboardListener()}onOpen(){this.open=!0,this.classList.add("open"),this.onScrollLock(),this.onAddKeyboardListener()}onScrollLock(){const e=document.createElement("style");e.dataset.w3m=y,e.textContent=`
      body {
        touch-action: none;
        overflow: hidden;
        overscroll-behavior: contain;
      }
      w3m-modal {
        pointer-events: auto;
      }
    `,document.head.appendChild(e)}onScrollUnlock(){const e=document.head.querySelector(`style[data-w3m="${y}"]`);e&&e.remove()}onAddKeyboardListener(){var t;this.abortController=new AbortController;const e=(t=this.shadowRoot)==null?void 0:t.querySelector("wui-card");e==null||e.focus(),window.addEventListener("keydown",i=>{if(i.key==="Escape")this.handleClose();else if(i.key==="Tab"){const{tagName:s}=i.target;s&&!s.includes("W3M-")&&!s.includes("WUI-")&&(e==null||e.focus())}},this.abortController)}onRemoveKeyboardListener(){var e;(e=this.abortController)==null||e.abort(),this.abortController=void 0}async onNewAddress(e){var r,d;if(!this.connected||this.loading)return;const t=m.getPlainAddress(this.caipAddress),i=m.getPlainAddress(e),s=m.getNetworkId(this.caipAddress),o=m.getNetworkId(e);if(this.caipAddress=e,this.isSiweEnabled){const{SIWEController:h}=await g(async()=>{const{SIWEController:v}=await import("./index-DmXBMqwm.js");return{SIWEController:v}},__vite__mapDeps([0,1,2])),f=await h.getSession();if(f&&t&&i&&t!==i){(r=h.state._client)!=null&&r.options.signOutOnAccountChange&&(await h.signOut(),this.onSiweNavigation());return}if(f&&s&&o&&s!==o){(d=h.state._client)!=null&&d.options.signOutOnNetworkChange&&(await h.signOut(),this.onSiweNavigation());return}this.onSiweNavigation()}}onSiweNavigation(){this.open?p.push("ConnectingSiwe"):n.open({view:"ConnectingSiwe"})}};a.styles=T;l([c()],a.prototype,"open",void 0);l([c()],a.prototype,"caipAddress",void 0);l([c()],a.prototype,"isSiweEnabled",void 0);l([c()],a.prototype,"connected",void 0);l([c()],a.prototype,"loading",void 0);l([c()],a.prototype,"shake",void 0);a=l([L("w3m-modal")],a);export{a as W3mModal};
