!function(t){var e={};function s(i){if(e[i])return e[i].exports;var a=e[i]={i:i,l:!1,exports:{}};return t[i].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)s.d(i,a,function(e){return t[e]}.bind(null,a));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=3)}([function(t,e,s){"use strict";s.d(e,"a",(function(){return i}));class i{constructor(t,e={}){this._initDone=!1;this._gradients={classic:{bgColor:"#111",colorStops:["hsl( 0, 100%, 50% )",{pos:.6,color:"hsl( 60, 100%, 50% )"},"hsl( 120, 100%, 50% )"]},prism:{bgColor:"#111",colorStops:["hsl( 0, 100%, 50% )","hsl( 60, 100%, 50% )","hsl( 120, 100%, 50% )","hsl( 180, 100%, 50% )","hsl( 240, 100%, 50% )"]},rainbow:{bgColor:"#111",dir:"h",colorStops:["hsl( 0, 100%, 50% )","hsl( 60, 100%, 50% )","hsl( 120, 100%, 50% )","hsl( 180, 100%, 47% )","hsl( 240, 100%, 58% )","hsl( 300, 100%, 50% )","hsl( 360, 100%, 50% )"]}},this._container=t||document.body,this._defaultWidth=this._container.clientWidth||640,this._defaultHeight=this._container.clientHeight||270;const s=window.AudioContext||window.webkitAudioContext;if(e.hasOwnProperty("audioCtx")){if(!(e.audioCtx instanceof s))throw new a("ERR_INVALID_AUDIO_CONTEXT","Provided audio context is not valid");this._audioCtx=e.audioCtx}else try{this._audioCtx=new s}catch(t){throw new a("ERR_AUDIO_CONTEXT_FAIL","Could not create audio context. Web Audio API not supported?")}this._analyzer=this._audioCtx.createAnalyser(),this._audioSource=e.source?this.connectAudio(e.source):void 0,this._analyzer.connect(this._audioCtx.destination),this._canvas=document.createElement("canvas"),this._canvas.style="max-width: 100%;",this._container.appendChild(this._canvas),this._canvasCtx=this._canvas.getContext("2d"),this._ledsMask=document.createElement("canvas"),this._ledsCtx=this._ledsMask.getContext("2d"),this._labels=document.createElement("canvas"),this._labelsCtx=this._labels.getContext("2d"),window.addEventListener("resize",()=>{this._width&&this._height||this._setCanvas("resize")}),this._canvas.addEventListener("fullscreenchange",()=>this._setCanvas("fschange")),this._setProperties(e,{mode:0,fftSize:8192,minFreq:20,maxFreq:22e3,smoothing:.5,gradient:"classic",minDecibels:-85,maxDecibels:-25,showBgColor:!0,showLeds:!1,showScale:!0,showPeaks:!0,showFPS:!1,lumiBars:!1,loRes:!1,reflexRatio:0,reflexAlpha:.15,reflexFit:!0,lineWidth:0,fillAlpha:1,barSpace:.1,overlay:!1,bgAlpha:.7,start:!0}),this._initDone=!0,this._setCanvas("create")}get barSpace(){return this._barSpace}set barSpace(t){this._barSpace=Number(t),this._calculateBarSpacePx(),this._createLedMask()}get fftSize(){return this._analyzer.fftSize}set fftSize(t){this._analyzer.fftSize=t,this._dataArray=new Uint8Array(this._analyzer.frequencyBinCount),this._precalculateBarPositions()}get gradient(){return this._gradient}set gradient(t){if(!this._gradients.hasOwnProperty(t))throw new a("ERR_UNKNOWN_GRADIENT",`Unknown gradient: '${t}'`);this._gradient=t}get height(){return this._height}set height(t){this._height=t,this._setCanvas("user")}get width(){return this._width}set width(t){this._width=t,this._setCanvas("user")}get mode(){return this._mode}set mode(t){const e=Number(t);if(!(e>=0&&e<=10&&9!=e))throw new a("ERR_INVALID_MODE",`Invalid mode: ${e}`);this._mode=e,this._precalculateBarPositions(),this._reflexRatio>0&&this._generateGradients()}get loRes(){return this._loRes}set loRes(t){this._loRes=Boolean(t),this._setCanvas("lores")}get lumiBars(){return this._lumiBars}set lumiBars(t){this._lumiBars=Boolean(t),this._reflexRatio>0&&(this._generateGradients(),this._createLedMask())}get reflexRatio(){return this._reflexRatio}set reflexRatio(t){if((t=Number(t))<0||t>=1)throw new a("ERR_REFLEX_OUT_OF_RANGE","Reflex ratio must be >= 0 and < 1");this._reflexRatio=t,this._generateGradients(),this._createLedMask()}get minFreq(){return this._minFreq}set minFreq(t){if(t<1)throw new a("ERR_FREQUENCY_TOO_LOW","Frequency values must be >= 1");this._minFreq=t,this._precalculateBarPositions()}get maxFreq(){return this._maxFreq}set maxFreq(t){if(t<1)throw new a("ERR_FREQUENCY_TOO_LOW","Frequency values must be >= 1");this._maxFreq=t,this._precalculateBarPositions()}get minDecibels(){return this._analyzer.minDecibels}set minDecibels(t){this._analyzer.minDecibels=t}get maxDecibels(){return this._analyzer.maxDecibels}set maxDecibels(t){this._analyzer.maxDecibels=t}get smoothing(){return this._analyzer.smoothingTimeConstant}set smoothing(t){this._analyzer.smoothingTimeConstant=t}get analyzer(){return this._analyzer}get audioCtx(){return this._audioCtx}get audioSource(){return this._audioSource}get canvas(){return this._canvas}get canvasCtx(){return this._canvasCtx}get dataArray(){return this._dataArray}get fsWidth(){return this._fsWidth}get fsHeight(){return this._fsHeight}get fps(){return this._fps}get isFullscreen(){return document.fullscreenElement?document.fullscreenElement===this._canvas:!!document.webkitFullscreenElement&&document.webkitFullscreenElement===this._canvas}get isOn(){return void 0!==this._animationReq}get pixelRatio(){return this._pixelRatio}get version(){return"2.2.0"}connectAudio(t){const e=this._audioCtx.createMediaElementSource(t);return e.connect(this._analyzer),e}registerGradient(t,e){if("string"!=typeof t||0==t.trim().length)throw new a("ERR_GRADIENT_INVALID_NAME","Gradient name must be a non-empty string");if("object"!=typeof e)throw new a("ERR_GRADIENT_NOT_AN_OBJECT","Gradient options must be an object");if(void 0===e.colorStops||e.colorStops.length<2)throw new a("ERR_GRADIENT_MISSING_COLOR","Gradient must define at least two colors");this._gradients[t]={},void 0!==e.bgColor?this._gradients[t].bgColor=e.bgColor:this._gradients[t].bgColor="#111",void 0!==e.dir&&(this._gradients[t].dir=e.dir),this._gradients[t].colorStops=e.colorStops,this._generateGradients()}setCanvasSize(t,e){this._width=t,this._height=e,this._setCanvas("user")}setFreqRange(t,e){if(t<1||e<1)throw new a("ERR_FREQUENCY_TOO_LOW","Frequency values must be >= 1");this._minFreq=Math.min(t,e),this._maxFreq=Math.max(t,e),this._precalculateBarPositions()}setOptions(t){this._setProperties(t)}setSensitivity(t,e){this._analyzer.minDecibels=Math.min(t,e),this._analyzer.maxDecibels=Math.max(t,e)}toggleAnalyzer(t){const e=this.isOn;return void 0===t&&(t=!e),e&&!t?(cancelAnimationFrame(this._animationReq),this._animationReq=void 0):!e&&t&&(this._frame=this._fps=0,this._time=performance.now(),this._animationReq=requestAnimationFrame(t=>this._draw(t))),this.isOn}toggleFullscreen(){this.isFullscreen?document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen&&document.webkitExitFullscreen():this._canvas.requestFullscreen?this._canvas.requestFullscreen():this._canvas.webkitRequestFullscreen&&this._canvas.webkitRequestFullscreen()}_calculateBarSpacePx(){this._barSpacePx=Math.min(this._barWidth-1,this._barSpace>0&&this._barSpace<1?this._barWidth*this._barSpace:this._barSpace)}_createLedMask(){if(this._mode%10==0||!this._initDone)return;const t=this._lumiBars?this._canvas.height:this._canvas.height*(1-this._reflexRatio)|0;let e,s=Math.min(6,t/(90*this._pixelRatio)|0);switch(this._mode){case 8:s=Math.min(16,t/(33*this._pixelRatio)|0),e=24;break;case 7:s=Math.min(8,t/(67*this._pixelRatio)|0),e=48;break;case 6:e=64;break;case 5:case 4:e=80;break;case 3:e=96;break;case 2:s=Math.min(4,t/(135*this._pixelRatio)|0),e=128;break;case 1:s=Math.min(3,Math.max(2,t/(180*this._pixelRatio)|0)),e=128}s*=this._pixelRatio,e=Math.min(e,(t+s)/(2*s)|0),this._ledOptions={nLeds:e,spaceH:this._barWidth*(1==this._mode?.45:this._mode<5?.225:.125),spaceV:s,ledHeight:(t+s)/e-s};const i=Math.max(this._ledOptions.spaceH,this._barSpacePx);this._ledsMask.width|=0,this._analyzerBars.forEach(e=>this._ledsCtx.fillRect(e.posX-i/2,0,i,t)),this._ledsCtx.fillRect(this._analyzerBars[this._analyzerBars.length-1].posX+this._barWidth-i/2,0,i,t);for(let e=this._ledOptions.ledHeight;e<t;e+=this._ledOptions.ledHeight+this._ledOptions.spaceV)this._ledsCtx.fillRect(0,e,this._canvas.width,this._ledOptions.spaceV)}_draw(t){const e=this._mode%10!=0,s=this.showLeds&&e,i=this._lumiBars&&e,a=this._canvas.height*(1-this._reflexRatio)|0;this.overlay&&(this._canvasCtx.clearRect(0,0,this._canvas.width,this._canvas.height),this._canvasCtx.globalAlpha=this.bgAlpha),this.showBgColor?this._canvasCtx.fillStyle=s?"#111":this._gradients[this._gradient].bgColor:this._canvasCtx.fillStyle="#000",this.overlay&&!this.showBgColor||this._canvasCtx.fillRect(0,0,this._canvas.width,i?this._canvas.height:a),this._canvasCtx.globalAlpha=1,this._analyzer.getByteFrequencyData(this._dataArray),this._canvasCtx.fillStyle=this._gradients[this._gradient].gradient,10==this._mode&&(this._canvasCtx.beginPath(),this._canvasCtx.moveTo(-this.lineWidth,a));let n,h,r=this._barWidth-(e?Math.max(s?this._ledOptions.spaceH:0,this._barSpacePx):0);0!=this._barSpace||s||(r|=0);const o=this._analyzerBars.length;for(let t=0;t<o;t++){if(n=this._analyzerBars[t],0==n.endIdx)h=this._dataArray[n.dataIdx],n.factor&&(h+=(this._dataArray[n.dataIdx+1]-h)*n.factor);else{h=0;for(let t=n.dataIdx;t<=n.endIdx;t++)h=Math.max(h,this._dataArray[t])}i&&(this._canvasCtx.globalAlpha=h/255),h=s?(h/255*this._ledOptions.nLeds|0)*(this._ledOptions.ledHeight+this._ledOptions.spaceV)-this._ledOptions.spaceV:h/255*a|0,h>=n.peak&&(n.peak=h,n.hold=30,n.accel=0);let e=n.posX,o=r;10==this._mode?this._canvasCtx.lineTo(n.posX,a-h):(this._mode>0&&(s?e+=Math.max(this._ledOptions.spaceH/2,this._barSpacePx/2):0==this._barSpace?(e|=0,t>0&&e>this._analyzerBars[t-1].posX+r&&(e--,o++)):e+=this._barSpacePx/2),i?(this._canvasCtx.fillRect(e,0,o,this._canvas.height),this._canvasCtx.globalAlpha=1):this._canvasCtx.fillRect(e,a,o,-h)),n.peak>0&&(this.showPeaks&&!i&&(s?this._canvasCtx.fillRect(e,(this._ledOptions.nLeds-n.peak/(a+this._ledOptions.spaceV)*this._ledOptions.nLeds|0)*(this._ledOptions.ledHeight+this._ledOptions.spaceV),r,this._ledOptions.ledHeight):this._canvasCtx.fillRect(e,a-n.peak,o,2)),n.hold?n.hold--:(n.accel++,n.peak-=n.accel))}if(10==this._mode?(this._canvasCtx.lineTo(n.posX+this.lineWidth,a),this.lineWidth>0&&(this._canvasCtx.lineWidth=this.lineWidth,this._canvasCtx.strokeStyle=this._canvasCtx.fillStyle,this._canvasCtx.stroke()),this.fillAlpha>0&&(this._canvasCtx.globalAlpha=this.fillAlpha,this._canvasCtx.fill(),this._canvasCtx.globalAlpha=1)):s&&(this.overlay&&(this._canvasCtx.globalCompositeOperation="destination-out"),this._canvasCtx.drawImage(this._ledsMask,0,0),this._canvasCtx.globalCompositeOperation="source-over"),this._reflexRatio>0&&!i){let t,e;this.reflexFit?(t=0,e=this._canvas.height-a):(t=this._canvas.height-2*a,e=a),(!this.overlay||this.showBgColor&&this.reflexAlpha<1)&&(this._canvasCtx.fillStyle="#000",this.overlay&&(this._canvasCtx.globalAlpha=this.bgAlpha),this._canvasCtx.fillRect(0,a,this._canvas.width,this._canvas.height-a)),this._canvasCtx.globalAlpha=this.reflexAlpha,this._canvasCtx.setTransform(1,0,0,-1,0,this._canvas.height),this._canvasCtx.drawImage(this._canvas,0,0,this._canvas.width,a,0,t,this._canvas.width,e),this._canvasCtx.setTransform(),this._canvasCtx.globalAlpha=1}this.showScale&&this._canvasCtx.drawImage(this._labels,0,this._canvas.height-this._labels.height),this._frame++;const l=t-this._time;if(l>=1e3&&(this._fps=this._frame/(l/1e3),this._frame=0,this._time=t),this.showFPS){const t=20*this._pixelRatio;this._canvasCtx.font=`bold ${t}px sans-serif`,this._canvasCtx.fillStyle="#0f0",this._canvasCtx.textAlign="right",this._canvasCtx.fillText(Math.round(this._fps),this._canvas.width-t,2*t)}this.onCanvasDraw&&(this._canvasCtx.save(),this.onCanvasDraw(this),this._canvasCtx.restore()),this._animationReq=requestAnimationFrame(t=>this._draw(t))}_findFrequencyBin(t,e){const s=t*this._analyzer.fftSize/this._audioCtx.sampleRate;return["floor","ceil"].includes(e)||(e="round"),Math[e](s)}_findBinFrequency(t){return t*this._audioCtx.sampleRate/this._analyzer.fftSize}_generateGradients(){let t;const e=this._lumiBars&&this._mode%10?this._canvas.height:this._canvas.height*(1-this._reflexRatio)|0;Object.keys(this._gradients).forEach(s=>{t=this._gradients[s].dir&&"h"==this._gradients[s].dir?this._canvasCtx.createLinearGradient(0,0,this._canvas.width,0):this._canvasCtx.createLinearGradient(0,0,0,e),this._gradients[s].colorStops&&this._gradients[s].colorStops.forEach((e,i)=>{"object"==typeof e?t.addColorStop(e.pos,e.color):t.addColorStop(i/(this._gradients[s].colorStops.length-1),e)}),this._gradients[s].gradient=t})}_precalculateBarPositions(){if(!this._initDone)return;let t,e;if(this._analyzerBars=[],this._mode%10==0){this._barWidth=1,t=Math.log10(this._minFreq),e=this._canvas.width/(Math.log10(this._maxFreq)-t);const s=this._findFrequencyBin(this._minFreq,"floor"),i=Math.min(this._findFrequencyBin(this._maxFreq),this._analyzer.frequencyBinCount-1);let a=-999;for(let n=s;n<=i;n++){let s=this._findBinFrequency(n),i=Math.round(e*(Math.log10(s)-t));i>a?(this._analyzerBars.push({posX:i,dataIdx:n,endIdx:0,factor:0,peak:0,hold:0,accel:0}),a=i):this._analyzerBars.length&&(this._analyzerBars[this._analyzerBars.length-1].endIdx=n)}}else{let s;s=8==this._mode?24:7==this._mode?12:6==this._mode?8:5==this._mode?6:this._mode;const i=2**(1/24),a=440*i**-114;let n,h=[],r=0;for(;(n=a*i**r)<=this._maxFreq;)n>=this._minFreq&&r%s==0&&h.push(n),r++;t=Math.log10(h[0]),e=this._canvas.width/(Math.log10(h[h.length-1])-t),this._barWidth=this._canvas.width/h.length,this._calculateBarSpacePx();let o=0,l=-1,c=0;h.forEach((t,e)=>{const s=this._findFrequencyBin(t);let i,a;if(i=o>0&&o+1<=s?o+1:s,i==l)c++;else{if(c>1)for(let t=1;t<=c;t++)this._analyzerBars[this._analyzerBars.length-t].factor=(c-t)/c;l=i,c=1}o=a=s,void 0!==h[e+1]&&(a=this._findFrequencyBin(h[e+1]),a-s>1&&(o+=Math.round((a-s)/2)));const n=o-i>0?o:0;this._analyzerBars.push({posX:e*this._barWidth,dataIdx:i,endIdx:n,factor:0,peak:0,hold:0,accel:0})})}this._createLedMask(),this._labels.width|=0,this._labelsCtx.fillStyle="#000c",this._labelsCtx.fillRect(0,0,this._labels.width,this._labels.height),this._labelsCtx.fillStyle="#fff",this._labelsCtx.font=`${this._labels.height/2}px sans-serif`,this._labelsCtx.textAlign="center";const s=[16,31,63,125,250,500,1e3,2e3,4e3,8e3,16e3];for(const i of s)this._labelsCtx.fillText(i>=1e3?`${i/1e3}k`:i,e*(Math.log10(i)-t),.75*this._labels.height)}_setCanvas(t){this._initDone&&(this._pixelRatio=window.devicePixelRatio,this._loRes&&(this._pixelRatio/=2),this._fsWidth=Math.max(window.screen.width,window.screen.height)*this._pixelRatio,this._fsHeight=Math.min(window.screen.height,window.screen.width)*this._pixelRatio,this.isFullscreen?(this._canvas.width=this._fsWidth,this._canvas.height=this._fsHeight):(this._canvas.width=(this._width||this._container.clientWidth||this._defaultWidth)*this._pixelRatio,this._canvas.height=(this._height||this._container.clientHeight||this._defaultHeight)*this._pixelRatio),2==this._pixelRatio&&window.screen.height<=540&&(this._pixelRatio=1),this.overlay||(this._canvasCtx.fillStyle="#000",this._canvasCtx.fillRect(0,0,this._canvas.width,this._canvas.height)),this._canvasCtx.lineJoin="bevel",this._generateGradients(),this._ledsMask.width=this._canvas.width,this._ledsMask.height=this._canvas.height,this._labels.width=this._canvas.width,this._labels.height=this._pixelRatio*(this.isFullscreen?40:20),this._precalculateBarPositions(),this.onCanvasResize&&this.onCanvasResize(t,this))}_setProperties(t,e){const s=["onCanvasDraw","onCanvasResize"],i=["audioCtx","start"];e&&(t=Object.assign(e,t));for(const e of Object.keys(t))-1!==s.indexOf(e)&&"function"!=typeof t[e]?this[e]=void 0:-1===i.indexOf(e)&&(this[e]=t[e]);void 0!==t.start&&this.toggleAnalyzer(t.start)}}class a extends Error{constructor(t,e){super(e),this.name="AudioMotionError",this.code=t}}},,,function(t,e,s){"use strict";s.r(e);var i=s(0);const a=document.getElementById("video"),n=document.getElementById("container"),h=document.getElementById("presets"),r=[{name:"Classic LEDs",options:{mode:3,barSpace:.5,bgAlpha:.2,gradient:"classic",lumiBars:!1,reflexRatio:0,showBgColor:!1,showLeds:!0,showPeaks:!0,overlay:!0}},{name:"Mirror wave",options:{mode:10,bgAlpha:.7,fillAlpha:.6,gradient:"rainbow",lineWidth:2,lumiBars:!1,reflexAlpha:1,reflexRatio:.5,showBgColor:!1,showPeaks:!1,overlay:!0}},{name:"Reflex Bars",options:{mode:5,barSpace:.25,bgAlpha:.8,lumiBars:!1,reflexAlpha:.5,reflexFit:!0,reflexRatio:.3,showBgColor:!1,showLeds:!1,showPeaks:!0,overlay:!0}}];try{var o=new i.a(n,{source:a,maxFreq:16e3,overlay:!0,showScale:!1})}catch(t){n.innerHTML=`<p>audioMotion-analyzer failed with error: <em>${t}</em></p>`}function l(t){const e=t.nextElementSibling;e&&"value"==e.className&&(e.innerText=t.value)}function c(){document.querySelectorAll("[data-setting]").forEach(t=>t.value=o[t.dataset.setting]),document.getElementById("area_options").disabled=10!=o.mode,document.getElementById("bar_options").disabled=0==o.mode||10==o.mode,document.querySelectorAll('input[type="range"]').forEach(t=>l(t)),document.querySelectorAll("button[data-prop]").forEach(t=>{const e=o[t.dataset.prop];t.classList.toggle("active","isOn"==t.dataset.prop?!e:e)})}document.getElementById("version").innerText=o.version,document.querySelectorAll("button[data-prop]").forEach(t=>{t.addEventListener("click",()=>{t.dataset.func?o[t.dataset.func]():o[t.dataset.prop]=!o[t.dataset.prop],t.classList.toggle("active")})}),document.querySelectorAll("[data-setting]").forEach(t=>{t.addEventListener("change",()=>{o[t.dataset.setting]=t.value,"mode"==t.dataset.setting&&(document.getElementById("area_options").disabled=10!=o.mode,document.getElementById("bar_options").disabled=0==o.mode||10==o.mode)})}),h.addEventListener("change",()=>{o.setOptions(r[h.value].options),c()}),document.querySelectorAll('input[type="range"]').forEach(t=>t.addEventListener("change",()=>l(t))),document.getElementById("btn_fullscr").addEventListener("click",()=>{document.fullscreenElement?document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen&&document.webkitExitFullscreen():n.requestFullscreen?n.requestFullscreen():n.webkitRequestFullscreen&&n.webkitRequestFullscreen()}),r.forEach((t,e)=>{const s=new Option(t.name,e);h.append(s)}),o.setOptions(r[1].options),h.value=1,c(),window.addEventListener("click",()=>{"suspended"==o.audioCtx.state&&o.audioCtx.resume()})}]);