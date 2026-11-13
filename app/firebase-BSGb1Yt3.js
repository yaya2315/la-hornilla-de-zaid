import{o as Yn}from"./librerias-mJnfh6NE.js";const Xn=()=>{};var Pe={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ln=function(n){const t=[];let e=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?t[e++]=i:i<2048?(t[e++]=i>>6|192,t[e++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),t[e++]=i>>18|240,t[e++]=i>>12&63|128,t[e++]=i>>6&63|128,t[e++]=i&63|128):(t[e++]=i>>12|224,t[e++]=i>>6&63|128,t[e++]=i&63|128)}return t},Zn=function(n){const t=[];let e=0,r=0;for(;e<n.length;){const i=n[e++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=n[e++];t[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=n[e++],u=n[e++],p=n[e++],m=((i&7)<<18|(s&63)<<12|(u&63)<<6|p&63)-65536;t[r++]=String.fromCharCode(55296+(m>>10)),t[r++]=String.fromCharCode(56320+(m&1023))}else{const s=n[e++],u=n[e++];t[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|u&63)}}return t.join("")},un={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const s=n[i],u=i+1<n.length,p=u?n[i+1]:0,m=i+2<n.length,g=m?n[i+2]:0,y=s>>2,I=(s&3)<<4|p>>4;let w=(p&15)<<2|g>>6,U=g&63;m||(U=64,u||(w=64)),r.push(e[y],e[I],e[w],e[U])}return r.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(ln(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):Zn(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const s=e[n.charAt(i++)],p=i<n.length?e[n.charAt(i)]:0;++i;const g=i<n.length?e[n.charAt(i)]:64;++i;const I=i<n.length?e[n.charAt(i)]:64;if(++i,s==null||p==null||g==null||I==null)throw new tr;const w=s<<2|p>>4;if(r.push(w),g!==64){const U=p<<4&240|g>>2;if(r.push(U),I!==64){const D=g<<6&192|I;r.push(D)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class tr extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const er=function(n){const t=ln(n);return un.encodeByteArray(t,!0)},Ct=function(n){return er(n).replace(/\./g,"")},nr=function(n){try{return un.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rr(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ir=()=>rr().__FIREBASE_DEFAULTS__,sr=()=>{if(typeof process>"u"||typeof Pe>"u")return;const n=Pe.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},or=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&nr(n[1]);return t&&JSON.parse(t)},cn=()=>{try{return Xn()||ir()||sr()||or()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},ar=n=>cn()?.emulatorHosts?.[n],lr=n=>{const t=ar(n);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),r]:[t.substring(0,e),r]},hn=()=>cn()?.config;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ur{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,r)=>{e?this.reject(e):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cr(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},r=t||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const u={iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Ct(JSON.stringify(e)),Ct(JSON.stringify(u)),""].join(".")}function hr(){try{return typeof indexedDB=="object"}catch{return!1}}function fr(){return new Promise((n,t)=>{try{let e=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),e||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{e=!1},i.onerror=()=>{t(i.error?.message||"")}}catch(e){t(e)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dr="FirebaseError";class lt extends Error{constructor(t,e,r){super(e),this.code=t,this.customData=r,this.name=dr,Object.setPrototypeOf(this,lt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,fn.prototype.create)}}class fn{constructor(t,e,r){this.service=t,this.serviceName=e,this.errors=r}create(t,...e){const r=e[0]||{},i=`${this.service}/${t}`,s=this.errors[t],u=s?pr(s,r):"Error",p=`${this.serviceName}: ${u} (${i}).`;return new lt(i,p,r)}}function pr(n,t){return n.replace(mr,(e,r)=>{const i=t[r];return i!=null?String(i):`<${r}?>`})}const mr=/\{\$([^}]+)}/g;function Ot(n,t){if(n===t)return!0;const e=Object.keys(n),r=Object.keys(t);for(const i of e){if(!r.includes(i))return!1;const s=n[i],u=t[i];if(De(s)&&De(u)){if(!Ot(s,u))return!1}else if(s!==u)return!1}for(const i of r)if(!e.includes(i))return!1;return!0}function De(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ot(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function gr(n){return(await fetch(n,{credentials:"include"})).ok}class mt{constructor(t,e,r){this.name=t,this.instanceFactory=e,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _r{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const r=new ur;if(this.instancesDeferred.set(e,r),this.isInitialized(e)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:e});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){const e=this.normalizeInstanceIdentifier(t?.identifier),r=t?.optional??!1;if(this.isInitialized(e)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:e})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(Er(t))try{this.getOrInitializeService({instanceIdentifier:tt})}catch{}for(const[e,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(e);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(t=tt){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=tt){return this.instances.has(t)}getOptions(t=tt){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:e});for(const[s,u]of this.instancesDeferred.entries()){const p=this.normalizeInstanceIdentifier(s);r===p&&u.resolve(i)}return i}onInit(t,e){const r=this.normalizeInstanceIdentifier(e),i=this.onInitCallbacks.get(r)??new Set;i.add(t),this.onInitCallbacks.set(r,i);const s=this.instances.get(r);return s&&t(s,r),()=>{i.delete(t)}}invokeOnInitCallbacks(t,e){const r=this.onInitCallbacks.get(e);if(r)for(const i of r)try{i(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:yr(t),options:e}),this.instances.set(t,r),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=tt){return this.component?this.component.multipleInstances?t:tt:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function yr(n){return n===tt?void 0:n}function Er(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ir{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new _r(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var T;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(T||(T={}));const Ar={debug:T.DEBUG,verbose:T.VERBOSE,info:T.INFO,warn:T.WARN,error:T.ERROR,silent:T.SILENT},Tr=T.INFO,wr={[T.DEBUG]:"log",[T.VERBOSE]:"log",[T.INFO]:"info",[T.WARN]:"warn",[T.ERROR]:"error"},br=(n,t,...e)=>{if(t<n.logLevel)return;const r=new Date().toISOString(),i=wr[t];if(i)console[i](`[${r}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class pn{constructor(t){this.name=t,this._logLevel=Tr,this._logHandler=br,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in T))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?Ar[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,T.DEBUG,...t),this._logHandler(this,T.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,T.VERBOSE,...t),this._logHandler(this,T.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,T.INFO,...t),this._logHandler(this,T.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,T.WARN,...t),this._logHandler(this,T.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,T.ERROR,...t),this._logHandler(this,T.ERROR,...t)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vr{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(Vr(e)){const r=e.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(e=>e).join(" ")}}function Vr(n){return n.getComponent()?.type==="VERSION"}const ie="@firebase/app",Ce="0.14.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const J=new pn("@firebase/app"),Rr="@firebase/app-compat",Sr="@firebase/analytics-compat",Nr="@firebase/analytics",Pr="@firebase/app-check-compat",Dr="@firebase/app-check",Cr="@firebase/auth",Or="@firebase/auth-compat",kr="@firebase/database",Fr="@firebase/data-connect",Mr="@firebase/database-compat",Lr="@firebase/functions",Ur="@firebase/functions-compat",xr="@firebase/installations",$r="@firebase/installations-compat",Br="@firebase/messaging",jr="@firebase/messaging-compat",qr="@firebase/performance",zr="@firebase/performance-compat",Gr="@firebase/remote-config",Hr="@firebase/remote-config-compat",Kr="@firebase/storage",Wr="@firebase/storage-compat",Jr="@firebase/firestore",Qr="@firebase/ai",Yr="@firebase/firestore-compat",Xr="firebase",Zr="12.14.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const se="[DEFAULT]",ti={[ie]:"fire-core",[Rr]:"fire-core-compat",[Nr]:"fire-analytics",[Sr]:"fire-analytics-compat",[Dr]:"fire-app-check",[Pr]:"fire-app-check-compat",[Cr]:"fire-auth",[Or]:"fire-auth-compat",[kr]:"fire-rtdb",[Fr]:"fire-data-connect",[Mr]:"fire-rtdb-compat",[Lr]:"fire-fn",[Ur]:"fire-fn-compat",[xr]:"fire-iid",[$r]:"fire-iid-compat",[Br]:"fire-fcm",[jr]:"fire-fcm-compat",[qr]:"fire-perf",[zr]:"fire-perf-compat",[Gr]:"fire-rc",[Hr]:"fire-rc-compat",[Kr]:"fire-gcs",[Wr]:"fire-gcs-compat",[Jr]:"fire-fst",[Yr]:"fire-fst-compat",[Qr]:"fire-vertex","fire-js":"fire-js",[Xr]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kt=new Map,ei=new Map,oe=new Map;function Oe(n,t){try{n.container.addComponent(t)}catch(e){J.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function Ft(n){const t=n.name;if(oe.has(t))return J.debug(`There were multiple attempts to register component ${t}.`),!1;oe.set(t,n);for(const e of kt.values())Oe(e,n);for(const e of ei.values())Oe(e,n);return!0}function ni(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function ri(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ii={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Y=new fn("app","Firebase",ii);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class si{constructor(t,e,r){this._isDeleted=!1,this._options={...t},this._config={...e},this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new mt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw Y.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oi=Zr;function ai(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const r={name:se,automaticDataCollectionEnabled:!0,...t},i=r.name;if(typeof i!="string"||!i)throw Y.create("bad-app-name",{appName:String(i)});if(e||(e=hn()),!e)throw Y.create("no-options");const s=kt.get(i);if(s){if(Ot(e,s.options)&&Ot(r,s.config))return s;throw Y.create("duplicate-app",{appName:i})}const u=new Ir(i);for(const m of oe.values())u.addComponent(m);const p=new si(e,r,u);return kt.set(i,p),p}function li(n=se){const t=kt.get(n);if(!t&&n===se&&hn())return ai();if(!t)throw Y.create("no-app",{appName:n});return t}function st(n,t,e){let r=ti[n]??n;e&&(r+=`-${e}`);const i=r.match(/\s|\//),s=t.match(/\s|\//);if(i||s){const u=[`Unable to register library "${r}" with version "${t}":`];i&&u.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&s&&u.push("and"),s&&u.push(`version name "${t}" contains illegal characters (whitespace or "/")`),J.warn(u.join(" "));return}Ft(new mt(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ui="firebase-heartbeat-database",ci=1,gt="firebase-heartbeat-store";let te=null;function mn(){return te||(te=Yn(ui,ci,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(gt)}catch(e){console.warn(e)}}}}).catch(n=>{throw Y.create("idb-open",{originalErrorMessage:n.message})})),te}async function hi(n){try{const e=(await mn()).transaction(gt),r=await e.objectStore(gt).get(gn(n));return await e.done,r}catch(t){if(t instanceof lt)J.warn(t.message);else{const e=Y.create("idb-get",{originalErrorMessage:t?.message});J.warn(e.message)}}}async function ke(n,t){try{const r=(await mn()).transaction(gt,"readwrite");await r.objectStore(gt).put(t,gn(n)),await r.done}catch(e){if(e instanceof lt)J.warn(e.message);else{const r=Y.create("idb-set",{originalErrorMessage:e?.message});J.warn(r.message)}}}function gn(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fi=1024,di=30;class pi{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new gi(e),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const e=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Fe();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(i=>i.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:e}),this._heartbeatsCache.heartbeats.length>di){const i=_i(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(i,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(t){J.warn(t)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Fe(),{heartbeatsToSend:e,unsentEntries:r}=mi(this._heartbeatsCache.heartbeats),i=Ct(JSON.stringify({version:2,heartbeats:e}));return this._heartbeatsCache.lastSentHeartbeatDate=t,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return J.warn(t),""}}}function Fe(){return new Date().toISOString().substring(0,10)}function mi(n,t=fi){const e=[];let r=n.slice();for(const i of n){const s=e.find(u=>u.agent===i.agent);if(s){if(s.dates.push(i.date),Me(e)>t){s.dates.pop();break}}else if(e.push({agent:i.agent,dates:[i.date]}),Me(e)>t){e.pop();break}r=r.slice(1)}return{heartbeatsToSend:e,unsentEntries:r}}class gi{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return hr()?fr().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await hi(this.app);return e?.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return ke(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return ke(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...t.heartbeats]})}else return}}function Me(n){return Ct(JSON.stringify({version:2,heartbeats:n})).length}function _i(n){if(n.length===0)return-1;let t=0,e=n[0].date;for(let r=1;r<n.length;r++)n[r].date<e&&(e=n[r].date,t=r);return t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yi(n){Ft(new mt("platform-logger",t=>new vr(t),"PRIVATE")),Ft(new mt("heartbeat",t=>new pi(t),"PRIVATE")),st(ie,Ce,n),st(ie,Ce,"esm2020"),st("fire-js","")}yi("");var Le=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var _n;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(c,o){function l(){}l.prototype=o.prototype,c.F=o.prototype,c.prototype=new l,c.prototype.constructor=c,c.D=function(f,h,d){for(var a=Array(arguments.length-2),Z=2;Z<arguments.length;Z++)a[Z-2]=arguments[Z];return o.prototype[h].apply(f,a)}}function e(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}t(r,e),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(c,o,l){l||(l=0);const f=Array(16);if(typeof o=="string")for(var h=0;h<16;++h)f[h]=o.charCodeAt(l++)|o.charCodeAt(l++)<<8|o.charCodeAt(l++)<<16|o.charCodeAt(l++)<<24;else for(h=0;h<16;++h)f[h]=o[l++]|o[l++]<<8|o[l++]<<16|o[l++]<<24;o=c.g[0],l=c.g[1],h=c.g[2];let d=c.g[3],a;a=o+(d^l&(h^d))+f[0]+3614090360&4294967295,o=l+(a<<7&4294967295|a>>>25),a=d+(h^o&(l^h))+f[1]+3905402710&4294967295,d=o+(a<<12&4294967295|a>>>20),a=h+(l^d&(o^l))+f[2]+606105819&4294967295,h=d+(a<<17&4294967295|a>>>15),a=l+(o^h&(d^o))+f[3]+3250441966&4294967295,l=h+(a<<22&4294967295|a>>>10),a=o+(d^l&(h^d))+f[4]+4118548399&4294967295,o=l+(a<<7&4294967295|a>>>25),a=d+(h^o&(l^h))+f[5]+1200080426&4294967295,d=o+(a<<12&4294967295|a>>>20),a=h+(l^d&(o^l))+f[6]+2821735955&4294967295,h=d+(a<<17&4294967295|a>>>15),a=l+(o^h&(d^o))+f[7]+4249261313&4294967295,l=h+(a<<22&4294967295|a>>>10),a=o+(d^l&(h^d))+f[8]+1770035416&4294967295,o=l+(a<<7&4294967295|a>>>25),a=d+(h^o&(l^h))+f[9]+2336552879&4294967295,d=o+(a<<12&4294967295|a>>>20),a=h+(l^d&(o^l))+f[10]+4294925233&4294967295,h=d+(a<<17&4294967295|a>>>15),a=l+(o^h&(d^o))+f[11]+2304563134&4294967295,l=h+(a<<22&4294967295|a>>>10),a=o+(d^l&(h^d))+f[12]+1804603682&4294967295,o=l+(a<<7&4294967295|a>>>25),a=d+(h^o&(l^h))+f[13]+4254626195&4294967295,d=o+(a<<12&4294967295|a>>>20),a=h+(l^d&(o^l))+f[14]+2792965006&4294967295,h=d+(a<<17&4294967295|a>>>15),a=l+(o^h&(d^o))+f[15]+1236535329&4294967295,l=h+(a<<22&4294967295|a>>>10),a=o+(h^d&(l^h))+f[1]+4129170786&4294967295,o=l+(a<<5&4294967295|a>>>27),a=d+(l^h&(o^l))+f[6]+3225465664&4294967295,d=o+(a<<9&4294967295|a>>>23),a=h+(o^l&(d^o))+f[11]+643717713&4294967295,h=d+(a<<14&4294967295|a>>>18),a=l+(d^o&(h^d))+f[0]+3921069994&4294967295,l=h+(a<<20&4294967295|a>>>12),a=o+(h^d&(l^h))+f[5]+3593408605&4294967295,o=l+(a<<5&4294967295|a>>>27),a=d+(l^h&(o^l))+f[10]+38016083&4294967295,d=o+(a<<9&4294967295|a>>>23),a=h+(o^l&(d^o))+f[15]+3634488961&4294967295,h=d+(a<<14&4294967295|a>>>18),a=l+(d^o&(h^d))+f[4]+3889429448&4294967295,l=h+(a<<20&4294967295|a>>>12),a=o+(h^d&(l^h))+f[9]+568446438&4294967295,o=l+(a<<5&4294967295|a>>>27),a=d+(l^h&(o^l))+f[14]+3275163606&4294967295,d=o+(a<<9&4294967295|a>>>23),a=h+(o^l&(d^o))+f[3]+4107603335&4294967295,h=d+(a<<14&4294967295|a>>>18),a=l+(d^o&(h^d))+f[8]+1163531501&4294967295,l=h+(a<<20&4294967295|a>>>12),a=o+(h^d&(l^h))+f[13]+2850285829&4294967295,o=l+(a<<5&4294967295|a>>>27),a=d+(l^h&(o^l))+f[2]+4243563512&4294967295,d=o+(a<<9&4294967295|a>>>23),a=h+(o^l&(d^o))+f[7]+1735328473&4294967295,h=d+(a<<14&4294967295|a>>>18),a=l+(d^o&(h^d))+f[12]+2368359562&4294967295,l=h+(a<<20&4294967295|a>>>12),a=o+(l^h^d)+f[5]+4294588738&4294967295,o=l+(a<<4&4294967295|a>>>28),a=d+(o^l^h)+f[8]+2272392833&4294967295,d=o+(a<<11&4294967295|a>>>21),a=h+(d^o^l)+f[11]+1839030562&4294967295,h=d+(a<<16&4294967295|a>>>16),a=l+(h^d^o)+f[14]+4259657740&4294967295,l=h+(a<<23&4294967295|a>>>9),a=o+(l^h^d)+f[1]+2763975236&4294967295,o=l+(a<<4&4294967295|a>>>28),a=d+(o^l^h)+f[4]+1272893353&4294967295,d=o+(a<<11&4294967295|a>>>21),a=h+(d^o^l)+f[7]+4139469664&4294967295,h=d+(a<<16&4294967295|a>>>16),a=l+(h^d^o)+f[10]+3200236656&4294967295,l=h+(a<<23&4294967295|a>>>9),a=o+(l^h^d)+f[13]+681279174&4294967295,o=l+(a<<4&4294967295|a>>>28),a=d+(o^l^h)+f[0]+3936430074&4294967295,d=o+(a<<11&4294967295|a>>>21),a=h+(d^o^l)+f[3]+3572445317&4294967295,h=d+(a<<16&4294967295|a>>>16),a=l+(h^d^o)+f[6]+76029189&4294967295,l=h+(a<<23&4294967295|a>>>9),a=o+(l^h^d)+f[9]+3654602809&4294967295,o=l+(a<<4&4294967295|a>>>28),a=d+(o^l^h)+f[12]+3873151461&4294967295,d=o+(a<<11&4294967295|a>>>21),a=h+(d^o^l)+f[15]+530742520&4294967295,h=d+(a<<16&4294967295|a>>>16),a=l+(h^d^o)+f[2]+3299628645&4294967295,l=h+(a<<23&4294967295|a>>>9),a=o+(h^(l|~d))+f[0]+4096336452&4294967295,o=l+(a<<6&4294967295|a>>>26),a=d+(l^(o|~h))+f[7]+1126891415&4294967295,d=o+(a<<10&4294967295|a>>>22),a=h+(o^(d|~l))+f[14]+2878612391&4294967295,h=d+(a<<15&4294967295|a>>>17),a=l+(d^(h|~o))+f[5]+4237533241&4294967295,l=h+(a<<21&4294967295|a>>>11),a=o+(h^(l|~d))+f[12]+1700485571&4294967295,o=l+(a<<6&4294967295|a>>>26),a=d+(l^(o|~h))+f[3]+2399980690&4294967295,d=o+(a<<10&4294967295|a>>>22),a=h+(o^(d|~l))+f[10]+4293915773&4294967295,h=d+(a<<15&4294967295|a>>>17),a=l+(d^(h|~o))+f[1]+2240044497&4294967295,l=h+(a<<21&4294967295|a>>>11),a=o+(h^(l|~d))+f[8]+1873313359&4294967295,o=l+(a<<6&4294967295|a>>>26),a=d+(l^(o|~h))+f[15]+4264355552&4294967295,d=o+(a<<10&4294967295|a>>>22),a=h+(o^(d|~l))+f[6]+2734768916&4294967295,h=d+(a<<15&4294967295|a>>>17),a=l+(d^(h|~o))+f[13]+1309151649&4294967295,l=h+(a<<21&4294967295|a>>>11),a=o+(h^(l|~d))+f[4]+4149444226&4294967295,o=l+(a<<6&4294967295|a>>>26),a=d+(l^(o|~h))+f[11]+3174756917&4294967295,d=o+(a<<10&4294967295|a>>>22),a=h+(o^(d|~l))+f[2]+718787259&4294967295,h=d+(a<<15&4294967295|a>>>17),a=l+(d^(h|~o))+f[9]+3951481745&4294967295,c.g[0]=c.g[0]+o&4294967295,c.g[1]=c.g[1]+(h+(a<<21&4294967295|a>>>11))&4294967295,c.g[2]=c.g[2]+h&4294967295,c.g[3]=c.g[3]+d&4294967295}r.prototype.v=function(c,o){o===void 0&&(o=c.length);const l=o-this.blockSize,f=this.C;let h=this.h,d=0;for(;d<o;){if(h==0)for(;d<=l;)i(this,c,d),d+=this.blockSize;if(typeof c=="string"){for(;d<o;)if(f[h++]=c.charCodeAt(d++),h==this.blockSize){i(this,f),h=0;break}}else for(;d<o;)if(f[h++]=c[d++],h==this.blockSize){i(this,f),h=0;break}}this.h=h,this.o+=o},r.prototype.A=function(){var c=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);c[0]=128;for(var o=1;o<c.length-8;++o)c[o]=0;o=this.o*8;for(var l=c.length-8;l<c.length;++l)c[l]=o&255,o/=256;for(this.v(c),c=Array(16),o=0,l=0;l<4;++l)for(let f=0;f<32;f+=8)c[o++]=this.g[l]>>>f&255;return c};function s(c,o){var l=p;return Object.prototype.hasOwnProperty.call(l,c)?l[c]:l[c]=o(c)}function u(c,o){this.h=o;const l=[];let f=!0;for(let h=c.length-1;h>=0;h--){const d=c[h]|0;f&&d==o||(l[h]=d,f=!1)}this.g=l}var p={};function m(c){return-128<=c&&c<128?s(c,function(o){return new u([o|0],o<0?-1:0)}):new u([c|0],c<0?-1:0)}function g(c){if(isNaN(c)||!isFinite(c))return I;if(c<0)return C(g(-c));const o=[];let l=1;for(let f=0;c>=l;f++)o[f]=c/l|0,l*=4294967296;return new u(o,0)}function y(c,o){if(c.length==0)throw Error("number format error: empty string");if(o=o||10,o<2||36<o)throw Error("radix out of range: "+o);if(c.charAt(0)=="-")return C(y(c.substring(1),o));if(c.indexOf("-")>=0)throw Error('number format error: interior "-" character');const l=g(Math.pow(o,8));let f=I;for(let d=0;d<c.length;d+=8){var h=Math.min(8,c.length-d);const a=parseInt(c.substring(d,d+h),o);h<8?(h=g(Math.pow(o,h)),f=f.j(h).add(g(a))):(f=f.j(l),f=f.add(g(a)))}return f}var I=m(0),w=m(1),U=m(16777216);n=u.prototype,n.m=function(){if(F(this))return-C(this).m();let c=0,o=1;for(let l=0;l<this.g.length;l++){const f=this.i(l);c+=(f>=0?f:4294967296+f)*o,o*=4294967296}return c},n.toString=function(c){if(c=c||10,c<2||36<c)throw Error("radix out of range: "+c);if(D(this))return"0";if(F(this))return"-"+C(this).toString(c);const o=g(Math.pow(c,6));var l=this;let f="";for(;;){const h=St(l,o).g;l=Vt(l,h.j(o));let d=((l.g.length>0?l.g[0]:l.h)>>>0).toString(c);if(l=h,D(l))return d+f;for(;d.length<6;)d="0"+d;f=d+f}},n.i=function(c){return c<0?0:c<this.g.length?this.g[c]:this.h};function D(c){if(c.h!=0)return!1;for(let o=0;o<c.g.length;o++)if(c.g[o]!=0)return!1;return!0}function F(c){return c.h==-1}n.l=function(c){return c=Vt(this,c),F(c)?-1:D(c)?0:1};function C(c){const o=c.g.length,l=[];for(let f=0;f<o;f++)l[f]=~c.g[f];return new u(l,~c.h).add(w)}n.abs=function(){return F(this)?C(this):this},n.add=function(c){const o=Math.max(this.g.length,c.g.length),l=[];let f=0;for(let h=0;h<=o;h++){let d=f+(this.i(h)&65535)+(c.i(h)&65535),a=(d>>>16)+(this.i(h)>>>16)+(c.i(h)>>>16);f=a>>>16,d&=65535,a&=65535,l[h]=a<<16|d}return new u(l,l[l.length-1]&-2147483648?-1:0)};function Vt(c,o){return c.add(C(o))}n.j=function(c){if(D(this)||D(c))return I;if(F(this))return F(c)?C(this).j(C(c)):C(C(this).j(c));if(F(c))return C(this.j(C(c)));if(this.l(U)<0&&c.l(U)<0)return g(this.m()*c.m());const o=this.g.length+c.g.length,l=[];for(var f=0;f<2*o;f++)l[f]=0;for(f=0;f<this.g.length;f++)for(let h=0;h<c.g.length;h++){const d=this.i(f)>>>16,a=this.i(f)&65535,Z=c.i(h)>>>16,Ne=c.i(h)&65535;l[2*f+2*h]+=a*Ne,Rt(l,2*f+2*h),l[2*f+2*h+1]+=d*Ne,Rt(l,2*f+2*h+1),l[2*f+2*h+1]+=a*Z,Rt(l,2*f+2*h+1),l[2*f+2*h+2]+=d*Z,Rt(l,2*f+2*h+2)}for(c=0;c<o;c++)l[c]=l[2*c+1]<<16|l[2*c];for(c=o;c<2*o;c++)l[c]=0;return new u(l,0)};function Rt(c,o){for(;(c[o]&65535)!=c[o];)c[o+1]+=c[o]>>>16,c[o]&=65535,o++}function ct(c,o){this.g=c,this.h=o}function St(c,o){if(D(o))throw Error("division by zero");if(D(c))return new ct(I,I);if(F(c))return o=St(C(c),o),new ct(C(o.g),C(o.h));if(F(o))return o=St(c,C(o)),new ct(C(o.g),o.h);if(c.g.length>30){if(F(c)||F(o))throw Error("slowDivide_ only works with positive integers.");for(var l=w,f=o;f.l(c)<=0;)l=Se(l),f=Se(f);var h=rt(l,1),d=rt(f,1);for(f=rt(f,2),l=rt(l,2);!D(f);){var a=d.add(f);a.l(c)<=0&&(h=h.add(l),d=a),f=rt(f,1),l=rt(l,1)}return o=Vt(c,h.j(o)),new ct(h,o)}for(h=I;c.l(o)>=0;){for(l=Math.max(1,Math.floor(c.m()/o.m())),f=Math.ceil(Math.log(l)/Math.LN2),f=f<=48?1:Math.pow(2,f-48),d=g(l),a=d.j(o);F(a)||a.l(c)>0;)l-=f,d=g(l),a=d.j(o);D(d)&&(d=w),h=h.add(d),c=Vt(c,a)}return new ct(h,c)}n.B=function(c){return St(this,c).h},n.and=function(c){const o=Math.max(this.g.length,c.g.length),l=[];for(let f=0;f<o;f++)l[f]=this.i(f)&c.i(f);return new u(l,this.h&c.h)},n.or=function(c){const o=Math.max(this.g.length,c.g.length),l=[];for(let f=0;f<o;f++)l[f]=this.i(f)|c.i(f);return new u(l,this.h|c.h)},n.xor=function(c){const o=Math.max(this.g.length,c.g.length),l=[];for(let f=0;f<o;f++)l[f]=this.i(f)^c.i(f);return new u(l,this.h^c.h)};function Se(c){const o=c.g.length+1,l=[];for(let f=0;f<o;f++)l[f]=c.i(f)<<1|c.i(f-1)>>>31;return new u(l,c.h)}function rt(c,o){const l=o>>5;o%=32;const f=c.g.length-l,h=[];for(let d=0;d<f;d++)h[d]=o>0?c.i(d+l)>>>o|c.i(d+l+1)<<32-o:c.i(d+l);return new u(h,c.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,u.prototype.add=u.prototype.add,u.prototype.multiply=u.prototype.j,u.prototype.modulo=u.prototype.B,u.prototype.compare=u.prototype.l,u.prototype.toNumber=u.prototype.m,u.prototype.toString=u.prototype.toString,u.prototype.getBits=u.prototype.i,u.fromNumber=g,u.fromString=y,_n=u}).apply(typeof Le<"u"?Le:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}M.UNAUTHENTICATED=new M(null),M.GOOGLE_CREDENTIALS=new M("google-credentials-uid"),M.FIRST_PARTY=new M("first-party-uid"),M.MOCK_USER=new M("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ut="12.14.0";function Ei(n){ut=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const at=new pn("@firebase/firestore");function Mt(n,...t){if(at.logLevel<=T.DEBUG){const e=t.map(pe);at.debug(`Firestore (${ut}): ${n}`,...e)}}function de(n,...t){if(at.logLevel<=T.ERROR){const e=t.map(pe);at.error(`Firestore (${ut}): ${n}`,...e)}}function yn(n,...t){if(at.logLevel<=T.WARN){const e=t.map(pe);at.warn(`Firestore (${ut}): ${n}`,...e)}}function pe(n){if(typeof n=="string")return n;try{return(function(e){return JSON.stringify(e)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function b(n,t,e){let r="Unexpected state";typeof t=="string"?r=t:e=t,En(n,r,e)}function En(n,t,e){let r=`FIRESTORE (${ut}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(e!==void 0)try{r+=" CONTEXT: "+JSON.stringify(e)}catch{r+=" CONTEXT: "+e}throw de(r),new Error(r)}function x(n,t,e,r){let i="Unexpected state";typeof e=="string"?i=e:r=e,n||En(t,i,r)}function wt(n,t){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable"};class E extends lt{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class In{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class Ii{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable((()=>e(M.UNAUTHENTICATED)))}shutdown(){}}class Ai{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable((()=>e(this.token.user)))}shutdown(){this.changeListener=null}}class Ti{constructor(t){this.auth=null,t.onInit((e=>{this.auth=e}))}getToken(){return this.auth?this.auth.getToken().then((t=>t?(x(typeof t.accessToken=="string",42297,{t}),new In(t.accessToken,new M(this.auth.getUid()))):null)):Promise.resolve(null)}invalidateToken(){}start(t,e){}shutdown(){}}class wi{constructor(t,e,r){this.i=t,this.o=e,this.u=r,this.type="FirstParty",this.user=M.FIRST_PARTY,this.l=new Map}h(){return this.u?this.u():null}get headers(){this.l.set("X-Goog-AuthUser",this.i);const t=this.h();return t&&this.l.set("Authorization",t),this.o&&this.l.set("X-Goog-Iam-Authorization-Token",this.o),this.l}}class bi{constructor(t,e,r){this.i=t,this.o=e,this.u=r}getToken(){return Promise.resolve(new wi(this.i,this.o,this.u))}start(t,e){t.enqueueRetryable((()=>e(M.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Ue{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class vi{constructor(t,e){this.m=e,this.appCheck=null,this.T=null,ri(t)&&t.settings.appCheckToken&&(this.T=t.settings.appCheckToken),e.onInit((r=>{this.appCheck=r}))}getToken(){return this.T?Promise.resolve(new Ue(this.T)):this.appCheck?this.appCheck.getToken().then((t=>t?(x(typeof t.token=="string",3470,{tokenResult:t}),new Ue(t.token)):null)):Promise.resolve(null)}invalidateToken(){}start(t,e){}shutdown(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vi{constructor(t,e,r,i,s,u,p,m,g,y,I){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=u,this.autoDetectLongPolling=p,this.longPollingOptions=m,this.useFetchStreams=g,this.isUsingEmulator=y,this.apiKey=I}}const ae="(default)";class _t{constructor(t,e){this.projectId=t,this.database=e||ae}static empty(){return new _t("","")}get isDefaultDatabase(){return this.database===ae}isEqual(t){return t instanceof _t&&t.projectId===this.projectId&&t.database===this.database}}function Ri(n,t){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new E(_.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new _t(n.options.projectId,t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Si(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ni{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const i=Si(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<e&&(r+=t.charAt(i[s]%62))}return r}}function V(n,t){return n<t?-1:n>t?1:0}function le(n,t){const e=Math.min(n.length,t.length);for(let r=0;r<e;r++){const i=n.charAt(r),s=t.charAt(r);if(i!==s)return ee(i)===ee(s)?V(i,s):ee(i)?1:-1}return V(n.length,t.length)}const Pi=55296,Di=57343;function ee(n){const t=n.charCodeAt(0);return t>=Pi&&t<=Di}function An(n,t,e){return n.length===t.length&&n.every(((r,i)=>e(r,t[i])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xe="__name__";class G{constructor(t,e,r){e===void 0?e=0:e>t.length&&b(637,{offset:e,range:t.length}),r===void 0?r=t.length-e:r>t.length-e&&b(1746,{length:r,range:t.length-e}),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return G.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof G?t.forEach((r=>{e.push(r)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const r=Math.min(t.length,e.length);for(let i=0;i<r;i++){const s=G.compareSegments(t.get(i),e.get(i));if(s!==0)return s}return V(t.length,e.length)}static compareSegments(t,e){const r=G.isNumericId(t),i=G.isNumericId(e);return r&&!i?-1:!r&&i?1:r&&i?G.extractNumericId(t).compare(G.extractNumericId(e)):le(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return _n.fromString(t.substring(4,t.length-2))}}class v extends G{construct(t,e,r){return new v(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const r of t){if(r.indexOf("//")>=0)throw new E(_.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter((i=>i.length>0)))}return new v(e)}static emptyPath(){return new v([])}}const Ci=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class L extends G{construct(t,e,r){return new L(t,e,r)}static isValidIdentifier(t){return Ci.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),L.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===xe}static keyField(){return new L([xe])}static fromServerFormat(t){const e=[];let r="",i=0;const s=()=>{if(r.length===0)throw new E(_.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""};let u=!1;for(;i<t.length;){const p=t[i];if(p==="\\"){if(i+1===t.length)throw new E(_.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const m=t[i+1];if(m!=="\\"&&m!=="."&&m!=="`")throw new E(_.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=m,i+=2}else p==="`"?(u=!u,i++):p!=="."||u?(r+=p,i++):(s(),i++)}if(s(),u)throw new E(_.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new L(e)}static emptyPath(){return new L([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P{constructor(t){this.path=t}static fromPath(t){return new P(v.fromString(t))}static fromName(t){return new P(v.fromString(t).popFirst(5))}static empty(){return new P(v.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&v.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return v.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new P(new v(t.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tn(n,t,e){if(!e)throw new E(_.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function $e(n){if(!P.isDocumentKey(n))throw new E(_.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Be(n){if(P.isDocumentKey(n))throw new E(_.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function wn(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Gt(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=(function(r){return r.constructor?r.constructor.name:null})(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":b(12329,{type:typeof n})}function Ht(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new E(_.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=Gt(n);throw new E(_.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bn(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Nt=null;function Oi(){return Nt===null?Nt=(function(){return 268435456+Math.round(2147483648*Math.random())})():Nt++,"0x"+Nt.toString(16)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ki(n){return n==null}function Lt(n){return n===0&&1/n==-1/0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ne="RestConnection",Fi={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class Mi{get P(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.V=e+"://"+t.host,this.R=`projects/${r}/databases/${i}`,this.A=this.databaseId.database===ae?`project_id=${r}`:`project_id=${r}&database_id=${i}`}I(t,e,r,i,s){const u=Oi(),p=this.p(t,e.toUriEncodedString());Mt(ne,`Sending RPC '${t}' ${u}:`,p,r);const m={"google-cloud-resource-prefix":this.R,"x-goog-request-params":this.A};this.F(m,i,s);const{host:g}=new URL(p),y=dn(g);return this.v(t,p,m,r,y).then((I=>(Mt(ne,`Received RPC '${t}' ${u}: `,I),I)),(I=>{throw yn(ne,`RPC '${t}' ${u} failed with error: `,I,"url: ",p,"request:",r),I}))}D(t,e,r,i,s,u){return this.I(t,e,r,i,s)}F(t,e,r){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+ut})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach(((i,s)=>t[s]=i)),r&&r.headers.forEach(((i,s)=>t[s]=i))}p(t,e){const r=Fi[t];let i=`${this.V}/v1/${e}:${r}`;return this.databaseInfo.apiKey&&(i=`${i}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),i}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var je,A;function qe(n){if(n===void 0)return de("RPC_ERROR","HTTP error has no status"),_.UNKNOWN;switch(n){case 200:return _.OK;case 400:return _.FAILED_PRECONDITION;case 401:return _.UNAUTHENTICATED;case 403:return _.PERMISSION_DENIED;case 404:return _.NOT_FOUND;case 409:return _.ABORTED;case 416:return _.OUT_OF_RANGE;case 429:return _.RESOURCE_EXHAUSTED;case 499:return _.CANCELLED;case 500:return _.UNKNOWN;case 501:return _.UNIMPLEMENTED;case 503:return _.UNAVAILABLE;case 504:return _.DEADLINE_EXCEEDED;default:return n>=200&&n<300?_.OK:n>=400&&n<500?_.FAILED_PRECONDITION:n>=500&&n<600?_.INTERNAL:_.UNKNOWN}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(A=je||(je={}))[A.OK=0]="OK",A[A.CANCELLED=1]="CANCELLED",A[A.UNKNOWN=2]="UNKNOWN",A[A.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",A[A.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",A[A.NOT_FOUND=5]="NOT_FOUND",A[A.ALREADY_EXISTS=6]="ALREADY_EXISTS",A[A.PERMISSION_DENIED=7]="PERMISSION_DENIED",A[A.UNAUTHENTICATED=16]="UNAUTHENTICATED",A[A.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",A[A.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",A[A.ABORTED=10]="ABORTED",A[A.OUT_OF_RANGE=11]="OUT_OF_RANGE",A[A.UNIMPLEMENTED=12]="UNIMPLEMENTED",A[A.INTERNAL=13]="INTERNAL",A[A.UNAVAILABLE=14]="UNAVAILABLE",A[A.DATA_LOSS=15]="DATA_LOSS";class Li extends Mi{N(t,e){throw new Error("Not supported by FetchConnection")}async v(t,e,r,i,s){const u=JSON.stringify(i);let p;try{const m={method:"POST",headers:r,body:u};s&&(m.credentials="include"),p=await fetch(e,m)}catch(m){const g=m;throw new E(qe(g.status),"Request failed with error: "+g.statusText)}if(!p.ok){let m=await p.json();Array.isArray(m)&&(m=m[0]);const g=m?.error?.message;throw new E(qe(p.status),`Request failed with error: ${g??p.statusText}`)}return p.json()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ze(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function Kt(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ui extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q{constructor(t){this.binaryString=t}static fromBase64String(t){const e=(function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new Ui("Invalid base64 string: "+s):s}})(t);return new Q(e)}static fromUint8Array(t){const e=(function(i){let s="";for(let u=0;u<i.length;++u)s+=String.fromCharCode(i[u]);return s})(t);return new Q(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(e){return btoa(e)})(this.binaryString)}toUint8Array(){return(function(e){const r=new Uint8Array(e.length);for(let i=0;i<e.length;i++)r[i]=e.charCodeAt(i);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return V(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}Q.EMPTY_BYTE_STRING=new Q("");const xi=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function et(n){if(x(!!n,39018),typeof n=="string"){let t=0;const e=xi.exec(n);if(x(!!e,46558,{timestamp:n}),e[1]){let i=e[1];i=(i+"000000000").substr(0,9),t=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:R(n.seconds),nanos:R(n.nanos)}}function R(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function yt(n){return typeof n=="string"?Q.fromBase64String(n):Q.fromUint8Array(n)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function B(n,t){const e={typeString:n};return t&&(e.value=t),e}function bt(n,t){if(!wn(n))throw new E(_.INVALID_ARGUMENT,"JSON must be an object");let e;for(const r in t)if(t[r]){const i=t[r].typeString,s="value"in t[r]?{value:t[r].value}:void 0;if(!(r in n)){e=`JSON missing required field: '${r}'`;break}const u=n[r];if(i&&typeof u!==i){e=`JSON field '${r}' must be a ${i}.`;break}if(s!==void 0&&u!==s.value){e=`Expected '${r}' field to equal '${s.value}'`;break}}if(e)throw new E(_.INVALID_ARGUMENT,e);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ge=-62135596800,He=1e6;class S{static now(){return S.fromMillis(Date.now())}static fromDate(t){return S.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),r=Math.floor((t-1e3*e)*He);return new S(e,r)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new E(_.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new E(_.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<Ge)throw new E(_.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new E(_.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/He}_compareTo(t){return this.seconds===t.seconds?V(this.nanoseconds,t.nanoseconds):V(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:S._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(bt(t,S._jsonSchema))return new S(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-Ge;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}S._jsonSchemaVersion="firestore/timestamp/1.0",S._jsonSchema={type:B("string",S._jsonSchemaVersion),seconds:B("number"),nanoseconds:B("number")};function vn(n){return(n?.mapValue?.fields||{}).__type__?.stringValue==="server_timestamp"}function Vn(n){const t=n.mapValue.fields.__previous_value__;return vn(t)?Vn(t):t}function Et(n){const t=et(n.mapValue.fields.__local_write_time__.timestampValue);return new S(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rn="__type__",$i="__max__",Pt={},Sn="__vector__",Ut="value";function nt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?vn(n)?4:(function(e){return(((e.mapValue||{}).fields||{}).__type__||{}).stringValue===$i})(n)?9007199254740991:(function(e){return(e?.mapValue?.fields||{})[Rn]?.stringValue===Sn})(n)?10:11:b(28295,{value:n})}function xt(n,t){if(n===t)return!0;const e=nt(n);if(e!==nt(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return Et(n).isEqual(Et(t));case 3:return(function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const u=et(i.timestampValue),p=et(s.timestampValue);return u.seconds===p.seconds&&u.nanos===p.nanos})(n,t);case 5:return n.stringValue===t.stringValue;case 6:return(function(i,s){return yt(i.bytesValue).isEqual(yt(s.bytesValue))})(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return(function(i,s){return R(i.geoPointValue.latitude)===R(s.geoPointValue.latitude)&&R(i.geoPointValue.longitude)===R(s.geoPointValue.longitude)})(n,t);case 2:return(function(i,s){if("integerValue"in i&&"integerValue"in s)return R(i.integerValue)===R(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const u=R(i.doubleValue),p=R(s.doubleValue);return u===p?Lt(u)===Lt(p):isNaN(u)&&isNaN(p)}return!1})(n,t);case 9:return An(n.arrayValue.values||[],t.arrayValue.values||[],xt);case 10:case 11:return(function(i,s){const u=i.mapValue.fields||{},p=s.mapValue.fields||{};if(ze(u)!==ze(p))return!1;for(const m in u)if(u.hasOwnProperty(m)&&(p[m]===void 0||!xt(u[m],p[m])))return!1;return!0})(n,t);default:return b(52216,{left:n})}}function It(n,t){return(n.values||[]).find((e=>xt(e,t)))!==void 0}function $t(n,t){if(n===t)return 0;const e=nt(n),r=nt(t);if(e!==r)return V(e,r);switch(e){case 0:case 9007199254740991:return 0;case 1:return V(n.booleanValue,t.booleanValue);case 2:return(function(s,u){const p=R(s.integerValue||s.doubleValue),m=R(u.integerValue||u.doubleValue);return p<m?-1:p>m?1:p===m?0:isNaN(p)?isNaN(m)?0:-1:1})(n,t);case 3:return Ke(n.timestampValue,t.timestampValue);case 4:return Ke(Et(n),Et(t));case 5:return le(n.stringValue,t.stringValue);case 6:return(function(s,u){const p=yt(s),m=yt(u);return p.compareTo(m)})(n.bytesValue,t.bytesValue);case 7:return(function(s,u){const p=s.split("/"),m=u.split("/");for(let g=0;g<p.length&&g<m.length;g++){const y=V(p[g],m[g]);if(y!==0)return y}return V(p.length,m.length)})(n.referenceValue,t.referenceValue);case 8:return(function(s,u){const p=V(R(s.latitude),R(u.latitude));return p!==0?p:V(R(s.longitude),R(u.longitude))})(n.geoPointValue,t.geoPointValue);case 9:return We(n.arrayValue,t.arrayValue);case 10:return(function(s,u){const p=s.fields||{},m=u.fields||{},g=p[Ut]?.arrayValue,y=m[Ut]?.arrayValue,I=V(g?.values?.length||0,y?.values?.length||0);return I!==0?I:We(g,y)})(n.mapValue,t.mapValue);case 11:return(function(s,u){if(s===Pt&&u===Pt)return 0;if(s===Pt)return 1;if(u===Pt)return-1;const p=s.fields||{},m=Object.keys(p),g=u.fields||{},y=Object.keys(g);m.sort(),y.sort();for(let I=0;I<m.length&&I<y.length;++I){const w=le(m[I],y[I]);if(w!==0)return w;const U=$t(p[m[I]],g[y[I]]);if(U!==0)return U}return V(m.length,y.length)})(n.mapValue,t.mapValue);default:throw b(23264,{S:e})}}function Ke(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return V(n,t);const e=et(n),r=et(t),i=V(e.seconds,r.seconds);return i!==0?i:V(e.nanos,r.nanos)}function We(n,t){const e=n.values||[],r=t.values||[];for(let i=0;i<e.length&&i<r.length;++i){const s=$t(e[i],r[i]);if(s)return s}return V(e.length,r.length)}function Je(n,t){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${t.path.canonicalString()}`}}function Nn(n){return!!n&&"arrayValue"in n}function Qe(n){return!!n&&"nullValue"in n}function Ye(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function re(n){return!!n&&"mapValue"in n}function ht(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const t={mapValue:{fields:{}}};return Kt(n.mapValue.fields,((e,r)=>t.mapValue.fields[e]=ht(r))),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=ht(n.arrayValue.values[e]);return t}return{...n}}class Xe{constructor(t,e){this.position=t,this.inclusive=e}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pn{}class z extends Pn{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new Bi(t,e,r):e==="array-contains"?new zi(t,r):e==="in"?new Gi(t,r):e==="not-in"?new Hi(t,r):e==="array-contains-any"?new Ki(t,r):new z(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new ji(t,r):new qi(t,r)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison($t(e,this.value)):e!==null&&nt(this.value)===nt(e)&&this.matchesComparison($t(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return b(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class vt extends Pn{constructor(t,e){super(),this.filters=t,this.op=e,this.C=null}static create(t,e){return new vt(t,e)}matches(t){return(function(r){return r.op==="and"})(this)?this.filters.find((e=>!e.matches(t)))===void 0:this.filters.find((e=>e.matches(t)))!==void 0}getFlattenedFilters(){return this.C!==null||(this.C=this.filters.reduce(((t,e)=>t.concat(e.getFlattenedFilters())),[])),this.C}getFilters(){return Object.assign([],this.filters)}}class Bi extends z{constructor(t,e,r){super(t,e,r),this.key=P.fromName(r.referenceValue)}matches(t){const e=P.comparator(t.key,this.key);return this.matchesComparison(e)}}class ji extends z{constructor(t,e){super(t,"in",e),this.keys=Dn("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}}class qi extends z{constructor(t,e){super(t,"not-in",e),this.keys=Dn("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}}function Dn(n,t){return(t.arrayValue?.values||[]).map((e=>P.fromName(e.referenceValue)))}class zi extends z{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Nn(e)&&It(e.arrayValue,this.value)}}class Gi extends z{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&It(this.value.arrayValue,e)}}class Hi extends z{constructor(t,e){super(t,"not-in",e)}matches(t){if(It(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!It(this.value.arrayValue,e)}}class Ki extends z{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Nn(e)||!e.arrayValue.values)&&e.arrayValue.values.some((r=>It(this.value.arrayValue,r)))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(t,e="asc"){this.field=t,this.dir=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O{static fromTimestamp(t){return new O(t)}static min(){return new O(new S(0,0))}static max(){return new O(new S(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jt{constructor(t,e){this.comparator=t,this.root=e||k.EMPTY}insert(t,e){return new jt(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,k.BLACK,null,null))}remove(t){return new jt(this.comparator,this.root.remove(t,this.comparator).copy(null,null,k.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(t,r.key);if(i===0)return e+r.left.size;i<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((e,r)=>(t(e,r),!1)))}toString(){const t=[];return this.inorderTraversal(((e,r)=>(t.push(`${e}:${r}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Dt(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Dt(this.root,t,this.comparator,!1)}getReverseIterator(){return new Dt(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Dt(this.root,t,this.comparator,!0)}}class Dt{constructor(t,e,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!t.isEmpty();)if(s=e?r(t.key,e):1,e&&i&&(s*=-1),s<0)t=this.isReverse?t.left:t.right;else{if(s===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class k{constructor(t,e,r,i,s){this.key=t,this.value=e,this.color=r??k.RED,this.left=i??k.EMPTY,this.right=s??k.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,i,s){return new k(t??this.key,e??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let i=this;const s=r(t,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(t,e,r),null):s===0?i.copy(null,e,null,null,null):i.copy(null,null,null,null,i.right.insert(t,e,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return k.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,i=this;if(e(t,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(t,e),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),e(t,i.key)===0){if(i.right.isEmpty())return k.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(t,e))}return i.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,k.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,k.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw b(43730,{key:this.key,value:this.value});if(this.right.isRed())throw b(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw b(27949);return t+(this.isRed()?0:1)}}k.EMPTY=null,k.RED=!0,k.BLACK=!1;k.EMPTY=new class{constructor(){this.size=0}get key(){throw b(57766)}get value(){throw b(16141)}get color(){throw b(16727)}get left(){throw b(29726)}get right(){throw b(36894)}copy(t,e,r,i,s){return this}insert(t,e,r){return new k(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{constructor(t){this.comparator=t,this.data=new jt(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((e,r)=>(t(e),!1)))}forEachInRange(t,e){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,t[1])>=0)return;e(i.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Ze(this.data.getIterator())}getIteratorFrom(t){return new Ze(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach((r=>{e=e.add(r)})),e}isEqual(t){if(!(t instanceof At)||this.size!==t.size)return!1;const e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){const i=e.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const t=[];return this.forEach((e=>{t.push(e)})),t}toString(){const t=[];return this.forEach((e=>t.push(e))),"SortedSet("+t.toString()+")"}copy(t){const e=new At(this.comparator);return e.data=t,e}}class Ze{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(t){this.fields=t,t.sort(L.comparator)}static empty(){return new Tt([])}unionWith(t){let e=new At(L.comparator);for(const r of this.fields)e=e.add(r);for(const r of t)e=e.add(r);return new Tt(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return An(this.fields,t.fields,((e,r)=>e.isEqual(r)))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{constructor(t){this.value=t}static empty(){return new j({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!re(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=ht(e)}setAll(t){let e=L.emptyPath(),r={},i=[];t.forEach(((u,p)=>{if(!e.isImmediateParentOf(p)){const m=this.getFieldsMap(e);this.applyChanges(m,r,i),r={},i=[],e=p.popLast()}u?r[p.lastSegment()]=ht(u):i.push(p.lastSegment())}));const s=this.getFieldsMap(e);this.applyChanges(s,r,i)}delete(t){const e=this.field(t.popLast());re(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return xt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let i=e.mapValue.fields[t.get(r)];re(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=i),e=i}return e.mapValue.fields}applyChanges(t,e,r){Kt(e,((i,s)=>t[i]=s));for(const i of r)delete t[i]}clone(){return new j(ht(this.value))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H{constructor(t,e,r,i,s,u,p){this.key=t,this.documentType=e,this.version=r,this.readTime=i,this.createTime=s,this.data=u,this.documentState=p}static newInvalidDocument(t){return new H(t,0,O.min(),O.min(),O.min(),j.empty(),0)}static newFoundDocument(t,e,r,i){return new H(t,1,e,O.min(),r,i,0)}static newNoDocument(t,e){return new H(t,2,e,O.min(),O.min(),j.empty(),0)}static newUnknownDocument(t,e){return new H(t,3,e,O.min(),O.min(),j.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(O.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=j.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=j.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=O.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof H&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new H(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wi{constructor(t,e=null,r=[],i=[],s=null,u=null,p=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=u,this.endAt=p,this.O=null}}function tn(n,t=null,e=[],r=[],i=null,s=null,u=null){return new Wi(n,t,e,r,i,s,u)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt{constructor(t,e=null,r=[],i=[],s=null,u="F",p=null,m=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=u,this.startAt=p,this.endAt=m,this.q=null,this.L=null,this.B=null,this.startAt,this.endAt}}function Ji(n){return n.collectionGroup!==null}function Qi(n){const t=wt(n);if(t.q===null){t.q=[];const e=new Set;for(const s of t.explicitOrderBy)t.q.push(s),e.add(s.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(u){let p=new At(L.comparator);return u.filters.forEach((m=>{m.getFlattenedFilters().forEach((g=>{g.isInequality()&&(p=p.add(g.field))}))})),p})(t).forEach((s=>{e.has(s.canonicalString())||s.isKeyField()||t.q.push(new Bt(s,r))})),e.has(L.keyField().canonicalString())||t.q.push(new Bt(L.keyField(),r))}return t.q}function Yi(n){const t=wt(n);return t.L||(t.L=Xi(t,Qi(n))),t.L}function Xi(n,t){if(n.limitType==="F")return tn(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map((i=>{const s=i.dir==="desc"?"asc":"desc";return new Bt(i.field,s)}));const e=n.endAt?new Xe(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Xe(n.startAt.position,n.startAt.inclusive):null;return tn(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function ue(n,t){const e=n.filters.concat([t]);return new Wt(n.path,n.collectionGroup,n.explicitOrderBy.slice(),e,n.limit,n.limitType,n.startAt,n.endAt)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cn(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Lt(t)?"-0":t}}function Zi(n,t){return(function(r){return typeof r=="number"&&Number.isInteger(r)&&!Lt(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER})(t)?(function(r){return{integerValue:""+r}})(t):Cn(n,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt{constructor(){this._=void 0}}class On extends Jt{}class ts extends Jt{constructor(t){super(),this.elements=t}}class es extends Jt{constructor(t){super(),this.elements=t}}class me extends Jt{constructor(t,e){super(),this.serializer=t,this.$=e}}class ns extends me{}class rs extends me{}class is extends me{}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ss{constructor(t,e){this.field=t,this.transform=e}}class ft{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new ft}static exists(t){return new ft(void 0,t)}static updateTime(t){return new ft(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}class Qt{}class kn extends Qt{constructor(t,e,r,i=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Fn extends Qt{constructor(t,e,r,i,s=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}class os extends Qt{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class as extends Qt{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ls={asc:"ASCENDING",desc:"DESCENDING"},us={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},cs={and:"AND",or:"OR"};class hs{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function ce(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function fs(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function ds(n,t){return ce(n,t.toTimestamp())}function dt(n){return x(!!n,49232),O.fromTimestamp((function(e){const r=et(e);return new S(r.seconds,r.nanos)})(n))}function ge(n,t){return he(n,t).canonicalString()}function he(n,t){const e=(function(i){return new v(["projects",i.projectId,"databases",i.database])})(n).child("documents");return t===void 0?e:e.child(t)}function qt(n,t){return ge(n.databaseId,t.path)}function fe(n,t){const e=(function(i){const s=v.fromString(i);return x(Ln(s),10190,{key:s.toString()}),s})(t);if(e.get(1)!==n.databaseId.projectId)throw new E(_.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new E(_.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new P((function(i){return x(i.length>4&&i.get(4)==="documents",29091,{key:i.toString()}),i.popFirst(5)})(e))}function en(n,t,e){return{name:qt(n,t),fields:e.value.mapValue.fields}}function ps(n,t){return"found"in t?(function(r,i){x(!!i.found,43571),i.found.name,i.found.updateTime;const s=fe(r,i.found.name),u=dt(i.found.updateTime),p=i.found.createTime?dt(i.found.createTime):O.min(),m=new j({mapValue:{fields:i.found.fields}});return H.newFoundDocument(s,u,p,m)})(n,t):"missing"in t?(function(r,i){x(!!i.missing,3894),x(!!i.readTime,22933);const s=fe(r,i.missing),u=dt(i.readTime);return H.newNoDocument(s,u)})(n,t):b(7234,{result:t})}function ms(n,t){let e;if(t instanceof kn)e={update:en(n,t.key,t.value)};else if(t instanceof os)e={delete:qt(n,t.key)};else if(t instanceof Fn)e={update:en(n,t.key,t.data),updateMask:Is(t.fieldMask)};else{if(!(t instanceof as))return b(16599,{M:t.type});e={verify:qt(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map((r=>(function(s,u){const p=u.transform;if(p instanceof On)return{fieldPath:u.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(p instanceof ts)return{fieldPath:u.field.canonicalString(),appendMissingElements:{values:p.elements}};if(p instanceof es)return{fieldPath:u.field.canonicalString(),removeAllFromArray:{values:p.elements}};if(p instanceof ns)return{fieldPath:u.field.canonicalString(),increment:p.$};if(p instanceof rs)return{fieldPath:u.field.canonicalString(),minimum:p.$};if(p instanceof is)return{fieldPath:u.field.canonicalString(),maximum:p.$};throw b(20930,{transform:u.transform})})(0,r)))),t.precondition.isNone||(e.currentDocument=(function(i,s){return s.updateTime!==void 0?{updateTime:ds(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:b(27497)})(n,t.precondition)),e}function gs(n,t){const e={structuredQuery:{}},r=t.path;let i;t.collectionGroup!==null?(i=r,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i=r.popLast(),e.structuredQuery.from=[{collectionId:r.lastSegment()}]),e.parent=(function(g,y){return ge(g.databaseId,y)})(n,i);const s=(function(g){if(g.length!==0)return Mn(vt.create(g,"and"))})(t.filters);s&&(e.structuredQuery.where=s);const u=(function(g){if(g.length!==0)return g.map((y=>(function(w){return{field:it(w.field),direction:_s(w.dir)}})(y)))})(t.orderBy);u&&(e.structuredQuery.orderBy=u);const p=(function(g,y){return g.useProto3Json||ki(y)?y:{value:y}})(n,t.limit);return p!==null&&(e.structuredQuery.limit=p),t.startAt&&(e.structuredQuery.startAt=(function(g){return{before:g.inclusive,values:g.position}})(t.startAt)),t.endAt&&(e.structuredQuery.endAt=(function(g){return{before:!g.inclusive,values:g.position}})(t.endAt)),{U:e,parent:i}}function _s(n){return ls[n]}function ys(n){return us[n]}function Es(n){return cs[n]}function it(n){return{fieldPath:n.canonicalString()}}function Mn(n){return n instanceof z?(function(e){if(e.op==="=="){if(Ye(e.value))return{unaryFilter:{field:it(e.field),op:"IS_NAN"}};if(Qe(e.value))return{unaryFilter:{field:it(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(Ye(e.value))return{unaryFilter:{field:it(e.field),op:"IS_NOT_NAN"}};if(Qe(e.value))return{unaryFilter:{field:it(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:it(e.field),op:ys(e.op),value:e.value}}})(n):n instanceof vt?(function(e){const r=e.getFilters().map((i=>Mn(i)));return r.length===1?r[0]:{compositeFilter:{op:Es(e.op),filters:r}}})(n):b(54877,{filter:n})}function Is(n){const t=[];return n.fields.forEach((e=>t.push(e.canonicalString()))),{fieldPaths:t}}function Ln(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function Un(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _e(n){return new hs(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class As{}class Ts extends As{constructor(t,e,r,i){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=i,this.k=!1}j(){if(this.k)throw new E(_.FAILED_PRECONDITION,"The client has already been terminated.")}I(t,e,r,i){return this.j(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([s,u])=>this.connection.I(t,he(e,r),i,s,u))).catch((s=>{throw s.name==="FirebaseError"?(s.code===_.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new E(_.UNKNOWN,s.toString())}))}D(t,e,r,i,s){return this.j(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([u,p])=>this.connection.D(t,he(e,r),i,u,p,s))).catch((u=>{throw u.name==="FirebaseError"?(u.code===_.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),u):new E(_.UNKNOWN,u.toString())}))}terminate(){this.k=!0,this.connection.terminate()}}async function ws(n,t){const e=wt(n),r={writes:t.map((i=>ms(e.serializer,i)))};await e.I("Commit",e.serializer.databaseId,v.emptyPath(),r)}async function bs(n,t){const e=wt(n),r={documents:t.map((p=>qt(e.serializer,p)))},i=await e.D("BatchGetDocuments",e.serializer.databaseId,v.emptyPath(),r,t.length),s=new Map;i.forEach((p=>{const m=ps(e.serializer,p);s.set(m.key.toString(),m)}));const u=[];return t.forEach((p=>{const m=s.get(p.toString());x(!!m,55234,{key:p}),u.push(m)})),u}async function vs(n,t){const e=wt(n),{U:r,parent:i}=gs(e.serializer,Yi(t));return(await e.D("RunQuery",e.serializer.databaseId,i,{structuredQuery:r.structuredQuery})).filter((s=>!!s.document)).map((s=>(function(p,m,g){const y=fe(p,m.name),I=dt(m.updateTime),w=m.createTime?dt(m.createTime):O.min(),U=new j({mapValue:{fields:m.fields}}),D=H.newFoundDocument(y,I,w,U);return g?D.setHasCommittedMutations():D})(e.serializer,s.document,void 0)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xn="ComponentProvider",pt=new Map;function ye(n){if(n._terminated)throw new E(_.FAILED_PRECONDITION,"The client has already been terminated.");if(!pt.has(n)){Mt(xn,"Initializing Datastore");const t=(function(s){return new Li(s)})((function(s,u,p,m,g){return new Vi(s,u,p,g.host,g.ssl,g.experimentalForceLongPolling,g.experimentalAutoDetectLongPolling,bn(g.experimentalLongPollingOptions),g.useFetchStreams,g.isUsingEmulator,m)})(n._databaseId,n.app.options.appId||"",n._persistenceKey,n.app.options.apiKey,n._freezeSettings())),e=_e(n._databaseId),r=(function(s,u,p,m){return new Ts(s,u,p,m)})(n._authCredentials,n._appCheckCredentials,t,e);pt.set(n,r)}return pt.get(n)}const Vs=1048576,$n="firestore.googleapis.com",nn=!0;class rn{constructor(t){if(t.host===void 0){if(t.ssl!==void 0)throw new E(_.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=$n,this.ssl=nn}else this.host=t.host,this.ssl=t.ssl??nn;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<Vs)throw new E(_.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}(function(r,i,s,u){if(i===!0&&u===!0)throw new E(_.INVALID_ARGUMENT,`${r} and ${s} cannot be used together.`)})("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=bn(t.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new E(_.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new E(_.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new E(_.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(function(r,i){return r.timeoutSeconds===i.timeoutSeconds})(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class Yt{constructor(t,e,r,i){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new rn({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new E(_.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new E(_.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new rn(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new Ii;switch(r.type){case"firstParty":return new bi(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new E(_.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(e){const r=pt.get(e);r&&(Mt(xn,"Removing Datastore"),pt.delete(e),r.terminate())})(this),Promise.resolve()}}function zs(n,t){const e=typeof n=="object"?n:li(),r=typeof n=="string"?n:"(default)",i=ni(e,"firestore/lite").getImmediate({identifier:r});if(!i._initialized){const s=lr("firestore");s&&Rs(i,...s)}return i}function Rs(n,t,e,r={}){n=Ht(n,Yt);const i=dn(t),s=n._getSettings(),u={...s,emulatorOptions:n._getEmulatorOptions()},p=`${t}:${e}`;i&&gr(`https://${p}`),s.host!==$n&&s.host!==p&&yn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const m={...s,host:p,ssl:i,emulatorOptions:r};if(!Ot(m,u)&&(n._setSettings(m),r.mockUserToken)){let g,y;if(typeof r.mockUserToken=="string")g=r.mockUserToken,y=M.MOCK_USER;else{g=cr(r.mockUserToken,n._app?.options.projectId);const I=r.mockUserToken.sub||r.mockUserToken.user_id;if(!I)throw new E(_.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");y=new M(I)}n._authCredentials=new Ai(new In(g,y))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new X(this.firestore,t,this._query)}}class N{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new W(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new N(this.firestore,t,this._key)}toJSON(){return{type:N._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,r){if(bt(e,N._jsonSchema))return new N(t,r||null,new P(v.fromString(e.referencePath)))}}N._jsonSchemaVersion="firestore/documentReference/1.0",N._jsonSchema={type:B("string",N._jsonSchemaVersion),referencePath:B("string")};class W extends X{constructor(t,e,r){super(t,e,(function(s){return new Wt(s)})(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new N(this.firestore,null,new P(t))}withConverter(t){return new W(this.firestore,t,this._path)}}function Gs(n,t,...e){if(n=ot(n),Tn("collection","path",t),n instanceof Yt){const r=v.fromString(t,...e);return Be(r),new W(n,null,r)}{if(!(n instanceof N||n instanceof W))throw new E(_.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(v.fromString(t,...e));return Be(r),new W(n.firestore,null,r)}}function Ss(n,t,...e){if(n=ot(n),arguments.length===1&&(t=Ni.newId()),Tn("doc","path",t),n instanceof Yt){const r=v.fromString(t,...e);return $e(r),new N(n,null,new P(r))}{if(!(n instanceof N||n instanceof W))throw new E(_.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(v.fromString(t,...e));return $e(r),new N(n.firestore,n instanceof W?n.converter:null,new P(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ${constructor(t){this._byteString=t}static fromBase64String(t){try{return new $(Q.fromBase64String(t))}catch(e){throw new E(_.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new $(Q.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:$._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(bt(t,$._jsonSchema))return $.fromBase64String(t.bytes)}}$._jsonSchemaVersion="firestore/bytes/1.0",$._jsonSchema={type:B("string",$._jsonSchemaVersion),bytes:B("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bn{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new E(_.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new L(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ee{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new E(_.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new E(_.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return V(this._lat,t._lat)||V(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:K._jsonSchemaVersion}}static fromJSON(t){if(bt(t,K._jsonSchema))return new K(t.latitude,t.longitude)}}K._jsonSchemaVersion="firestore/geoPoint/1.0",K._jsonSchema={type:B("string",K._jsonSchemaVersion),latitude:B("number"),longitude:B("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q{constructor(t){this._values=(t||[]).map((e=>e))}toArray(){return this._values.map((t=>t))}isEqual(t){/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return(function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0})(this._values,t._values)}toJSON(){return{type:q._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(bt(t,q._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every((e=>typeof e=="number")))return new q(t.vectorValues);throw new E(_.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}q._jsonSchemaVersion="firestore/vectorValue/1.0",q._jsonSchema={type:B("string",q._jsonSchemaVersion),vectorValues:B("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ns=/^__.*__$/;class Ps{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return this.fieldMask!==null?new Fn(t,this.data,this.fieldMask,e,this.fieldTransforms):new kn(t,this.data,e,this.fieldTransforms)}}function jn(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw b(40011,{dataSource:n})}}class Ie{constructor(t,e,r,i,s,u){this.settings=t,this.databaseId=e,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.G(),this.fieldTransforms=s||[],this.fieldMask=u||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}ne(t){return new Ie({...this.settings,...t},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}J(t){const e=this.path?.child(t),r=this.ne({path:e,arrayElement:!1});return r.H(t),r}Y(t){const e=this.path?.child(t),r=this.ne({path:e,arrayElement:!1});return r.G(),r}X(t){return this.ne({path:void 0,arrayElement:!0})}Z(t){return zt(t,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(t){return this.fieldMask.find((e=>t.isPrefixOf(e)))!==void 0||this.fieldTransforms.find((e=>t.isPrefixOf(e.field)))!==void 0}G(){if(this.path)for(let t=0;t<this.path.length;t++)this.H(this.path.get(t))}H(t){if(t.length===0)throw this.Z("Document fields must not be empty");if(jn(this.dataSource)&&Ns.test(t))throw this.Z('Document fields cannot begin and end with "__"')}}class Ds{constructor(t,e,r){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=r||_e(t)}ce(t,e,r,i=!1){return new Ie({dataSource:t,methodName:e,targetDoc:r,path:L.emptyPath(),arrayElement:!1,hasConverter:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function qn(n){const t=n._freezeSettings(),e=_e(n._databaseId);return new Ds(n._databaseId,!!t.ignoreUndefinedProperties,e)}function Cs(n,t,e,r,i,s={}){const u=n.ce(s.merge||s.mergeFields?2:0,t,e,i);Hn("Data must be an object, but it was:",u,r);const p=zn(r,u);let m,g;if(s.merge)m=new Tt(u.fieldMask),g=u.fieldTransforms;else if(s.mergeFields){const y=[];for(const I of s.mergeFields){const w=Xt(t,I,e);if(!u.contains(w))throw new E(_.INVALID_ARGUMENT,`Field '${w}' is specified in your field mask but missing from your input data.`);Ms(y,w)||y.push(w)}m=new Tt(y),g=u.fieldTransforms.filter((I=>m.covers(I.field)))}else m=null,g=u.fieldTransforms;return new Ps(new j(p),m,g)}class Ae extends Ee{_toFieldTransform(t){return new ss(t.path,new On)}isEqual(t){return t instanceof Ae}}function Os(n,t,e,r=!1){return Te(e,n.ce(r?4:3,t))}function Te(n,t){if(Gn(n=ot(n)))return Hn("Unsupported field value:",t,n),zn(n,t);if(n instanceof Ee)return(function(r,i){if(!jn(i.dataSource))throw i.Z(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Z(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)})(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.arrayElement&&t.dataSource!==4)throw t.Z("Nested arrays are not supported");return(function(r,i){const s=[];let u=0;for(const p of r){let m=Te(p,i.X(u));m==null&&(m={nullValue:"NULL_VALUE"}),s.push(m),u++}return{arrayValue:{values:s}}})(n,t)}return(function(r,i){if((r=ot(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Zi(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=S.fromDate(r);return{timestampValue:ce(i.serializer,s)}}if(r instanceof S){const s=new S(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:ce(i.serializer,s)}}if(r instanceof K)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof $)return{bytesValue:fs(i.serializer,r._byteString)};if(r instanceof N){const s=i.databaseId,u=r.firestore._databaseId;if(!u.isEqual(s))throw i.Z(`Document reference is for database ${u.projectId}/${u.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:ge(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof q)return(function(u,p){const m=u instanceof q?u.toArray():u;return{mapValue:{fields:{[Rn]:{stringValue:Sn},[Ut]:{arrayValue:{values:m.map((y=>{if(typeof y!="number")throw p.Z("VectorValues must only contain numeric values.");return Cn(p.serializer,y)}))}}}}}})(r,i);if(Un(r))return r._toProto(i.serializer);throw i.Z(`Unsupported field value: ${Gt(r)}`)})(n,t)}function zn(n,t){const e={};return(function(i){for(const s in i)if(Object.prototype.hasOwnProperty.call(i,s))return!1;return!0})(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):Kt(n,((r,i)=>{const s=Te(i,t.J(r));s!=null&&(e[r]=s)})),{mapValue:{fields:e}}}function Gn(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof S||n instanceof K||n instanceof $||n instanceof N||n instanceof Ee||n instanceof q||Un(n))}function Hn(n,t,e){if(!Gn(e)||!wn(e)){const r=Gt(e);throw r==="an object"?t.Z(n+" a custom object"):t.Z(n+" "+r)}}function Xt(n,t,e){if((t=ot(t))instanceof Bn)return t._internalPath;if(typeof t=="string")return Fs(n,t);throw zt("Field path arguments must be of type string or ",n,!1,void 0,e)}const ks=new RegExp("[~\\*/\\[\\]]");function Fs(n,t,e){if(t.search(ks)>=0)throw zt(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new Bn(...t.split("."))._internalPath}catch{throw zt(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function zt(n,t,e,r,i){const s=r&&!r.isEmpty(),u=i!==void 0;let p=`Function ${t}() called with invalid data`;e&&(p+=" (via `toFirestore()`)"),p+=". ";let m="";return(s||u)&&(m+=" (found",s&&(m+=` in field ${r}`),u&&(m+=` in document ${i}`),m+=")"),new E(_.INVALID_ARGUMENT,p+n+m)}function Ms(n,t){return n.some((e=>e.isEqual(t)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn{constructor(t,e,r,i,s){this._firestore=t,this._userDataWriter=e,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new N(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new Wn(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){return this._document?.data.clone().value.mapValue.fields??void 0}get(t){if(this._document){const e=this._document.data.field(Xt("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class Wn extends Kn{data(){return super.data()}}class Ls{constructor(t,e){this._docs=e,this.query=t}get docs(){return[...this._docs]}get size(){return this.docs.length}get empty(){return this.docs.length===0}forEach(t,e){this._docs.forEach(t,e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class we{}class be extends we{}function Hs(n,t,...e){let r=[];t instanceof we&&r.push(t),r=r.concat(e),(function(s){const u=s.filter((m=>m instanceof ve)).length,p=s.filter((m=>m instanceof Zt)).length;if(u>1||u>0&&p>0)throw new E(_.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const i of r)n=i._apply(n);return n}class Zt extends be{constructor(t,e,r){super(),this._field=t,this._op=e,this._value=r,this.type="where"}static _create(t,e,r){return new Zt(t,e,r)}_apply(t){const e=this._parse(t);return Jn(t._query,e),new X(t.firestore,t.converter,ue(t._query,e))}_parse(t){const e=qn(t.firestore);return(function(s,u,p,m,g,y,I){let w;if(g.isKeyField()){if(y==="array-contains"||y==="array-contains-any")throw new E(_.INVALID_ARGUMENT,`Invalid Query. You can't perform '${y}' queries on documentId().`);if(y==="in"||y==="not-in"){on(I,y);const D=[];for(const F of I)D.push(sn(m,s,F));w={arrayValue:{values:D}}}else w=sn(m,s,I)}else y!=="in"&&y!=="not-in"&&y!=="array-contains-any"||on(I,y),w=Os(p,u,I,y==="in"||y==="not-in");return z.create(g,y,w)})(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}function Ks(n,t,e){const r=t,i=Xt("where",n);return Zt._create(i,r,e)}class ve extends we{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new ve(t,e)}_parse(t){const e=this._queryConstraints.map((r=>r._parse(t))).filter((r=>r.getFilters().length>0));return e.length===1?e[0]:vt.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return e.getFilters().length===0?t:((function(i,s){let u=i;const p=s.getFlattenedFilters();for(const m of p)Jn(u,m),u=ue(u,m)})(t._query,e),new X(t.firestore,t.converter,ue(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Ve extends be{constructor(t,e){super(),this._field=t,this._direction=e,this.type="orderBy"}static _create(t,e){return new Ve(t,e)}_apply(t){const e=(function(i,s,u){if(i.startAt!==null)throw new E(_.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new E(_.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Bt(s,u)})(t._query,this._field,this._direction);return new X(t.firestore,t.converter,(function(i,s){const u=i.explicitOrderBy.concat([s]);return new Wt(i.path,i.collectionGroup,u,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)})(t._query,e))}}function Ws(n,t="asc"){const e=t,r=Xt("orderBy",n);return Ve._create(r,e)}class Re extends be{constructor(t,e,r){super(),this.type=t,this._limit=e,this._limitType=r}static _create(t,e,r){return new Re(t,e,r)}_apply(t){return new X(t.firestore,t.converter,(function(r,i,s){return new Wt(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),i,s,r.startAt,r.endAt)})(t._query,this._limit,this._limitType))}}function Js(n){return Re._create("limit",n,"F")}function sn(n,t,e){if(typeof(e=ot(e))=="string"){if(e==="")throw new E(_.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Ji(t)&&e.indexOf("/")!==-1)throw new E(_.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);const r=t.path.child(v.fromString(e));if(!P.isDocumentKey(r))throw new E(_.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Je(n,new P(r))}if(e instanceof N)return Je(n,e._key);throw new E(_.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Gt(e)}.`)}function on(n,t){if(!Array.isArray(n)||n.length===0)throw new E(_.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function Jn(n,t){const e=(function(i,s){for(const u of i)for(const p of u.getFlattenedFilters())if(s.indexOf(p.op)>=0)return p.op;return null})(n.filters,(function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(t.op));if(e!==null)throw e===t.op?new E(_.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new E(_.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${e.toString()}' filters.`)}class Us{convertValue(t,e="none"){switch(nt(t)){case 0:return null;case 1:return t.booleanValue;case 2:return R(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(yt(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw b(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const r={};return Kt(t,((i,s)=>{r[i]=this.convertValue(s,e)})),r}convertVectorValue(t){const e=t.fields?.[Ut].arrayValue?.values?.map((r=>R(r.doubleValue)));return new q(e)}convertGeoPoint(t){return new K(R(t.latitude),R(t.longitude))}convertArray(t,e){return(t.values||[]).map((r=>this.convertValue(r,e)))}convertServerTimestamp(t,e){switch(e){case"previous":const r=Vn(t);return r==null?null:this.convertValue(r,e);case"estimate":return this.convertTimestamp(Et(t));default:return null}}convertTimestamp(t){const e=et(t);return new S(e.seconds,e.nanos)}convertDocumentKey(t,e){const r=v.fromString(t);x(Ln(r),9688,{name:t});const i=new _t(r.get(1),r.get(3)),s=new P(r.popFirst(5));return i.isEqual(e)||de(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xs(n,t,e){let r;return r=n?n.toFirestore(t):t,r}class Qn extends Us{constructor(t){super(),this.firestore=t}convertBytes(t){return new $(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new N(this.firestore,null,e)}}function Qs(n){const t=ye((n=Ht(n,N)).firestore),e=new Qn(n.firestore);return bs(t,[n._key]).then((r=>{x(r.length===1,15618);const i=r[0];return new Kn(n.firestore,e,n._key,i.isFoundDocument()?i:null,n.converter)}))}function Ys(n){(function(i){if(i.limitType==="L"&&i.explicitOrderBy.length===0)throw new E(_.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")})((n=Ht(n,X))._query);const t=ye(n.firestore),e=new Qn(n.firestore);return vs(t,n._query).then((r=>{const i=r.map((s=>new Wn(n.firestore,e,s.key,s,n.converter)));return n._query.limitType==="L"&&i.reverse(),new Ls(n,i)}))}function Xs(n,t){const e=Ss(n=Ht(n,W)),r=xs(n.converter,t),i=Cs(qn(n.firestore),"addDoc",e._key,r,e.converter!==null,{});return ws(ye(n.firestore),[i.toMutation(e._key,ft.exists(!1))]).then((()=>e))}function Zs(){return new Ae("serverTimestamp")}const an="4.15.0";(function(){Ei(`${oi}_lite`),Ft(new mt("firestore/lite",((t,{instanceIdentifier:e,options:r})=>{const i=t.getProvider("app").getImmediate(),s=new Yt(new Ti(t.getProvider("auth-internal")),new vi(i,t.getProvider("app-check-internal")),Ri(i,e),i);return r&&s._setSettings(r),s}),"PUBLIC").setMultipleInstances(!0)),st("firestore-lite",an,""),st("firestore-lite",an,"esm2020")})();var $s="firebase",Bs="12.14.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */st($s,Bs,"app");export{Ys as a,Qs as b,Gs as c,Ss as d,Xs as e,zs as g,ai as i,Js as l,Ws as o,Hs as q,Zs as s,Ks as w};
