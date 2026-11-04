import{o as Wn}from"./librerias-CBEinxWa.js";const Jn=()=>{};var Ve={};/**
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
 */const rn=function(n){const t=[];let e=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?t[e++]=i:i<2048?(t[e++]=i>>6|192,t[e++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),t[e++]=i>>18|240,t[e++]=i>>12&63|128,t[e++]=i>>6&63|128,t[e++]=i&63|128):(t[e++]=i>>12|224,t[e++]=i>>6&63|128,t[e++]=i&63|128)}return t},Qn=function(n){const t=[];let e=0,r=0;for(;e<n.length;){const i=n[e++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=n[e++];t[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=n[e++],u=n[e++],p=n[e++],m=((i&7)<<18|(s&63)<<12|(u&63)<<6|p&63)-65536;t[r++]=String.fromCharCode(55296+(m>>10)),t[r++]=String.fromCharCode(56320+(m&1023))}else{const s=n[e++],u=n[e++];t[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|u&63)}}return t.join("")},sn={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const s=n[i],u=i+1<n.length,p=u?n[i+1]:0,m=i+2<n.length,g=m?n[i+2]:0,y=s>>2,I=(s&3)<<4|p>>4;let w=(p&15)<<2|g>>6,U=g&63;m||(U=64,u||(w=64)),r.push(e[y],e[I],e[w],e[U])}return r.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(rn(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):Qn(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const s=e[n.charAt(i++)],p=i<n.length?e[n.charAt(i)]:0;++i;const g=i<n.length?e[n.charAt(i)]:64;++i;const I=i<n.length?e[n.charAt(i)]:64;if(++i,s==null||p==null||g==null||I==null)throw new Yn;const w=s<<2|p>>4;if(r.push(w),g!==64){const U=p<<4&240|g>>2;if(r.push(U),I!==64){const D=g<<6&192|I;r.push(D)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Yn extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Xn=function(n){const t=rn(n);return sn.encodeByteArray(t,!0)},Ct=function(n){return Xn(n).replace(/\./g,"")},Zn=function(n){try{return sn.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
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
 */function tr(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const er=()=>tr().__FIREBASE_DEFAULTS__,nr=()=>{if(typeof process>"u"||typeof Ve>"u")return;const n=Ve.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},rr=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&Zn(n[1]);return t&&JSON.parse(t)},on=()=>{try{return Jn()||er()||nr()||rr()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},ir=n=>on()?.emulatorHosts?.[n],sr=n=>{const t=ir(n);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),r]:[t.substring(0,e),r]},an=()=>on()?.config;/**
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
 */class or{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,r)=>{e?this.reject(e):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,r))}}}/**
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
 */function ar(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},r=t||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const u={iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Ct(JSON.stringify(e)),Ct(JSON.stringify(u)),""].join(".")}function lr(){try{return typeof indexedDB=="object"}catch{return!1}}function ur(){return new Promise((n,t)=>{try{let e=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),e||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{e=!1},i.onerror=()=>{t(i.error?.message||"")}}catch(e){t(e)}})}/**
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
 */const cr="FirebaseError";class at extends Error{constructor(t,e,r){super(e),this.code=t,this.customData=r,this.name=cr,Object.setPrototypeOf(this,at.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ln.prototype.create)}}class ln{constructor(t,e,r){this.service=t,this.serviceName=e,this.errors=r}create(t,...e){const r=e[0]||{},i=`${this.service}/${t}`,s=this.errors[t],u=s?hr(s,r):"Error",p=`${this.serviceName}: ${u} (${i}).`;return new at(i,p,r)}}function hr(n,t){return n.replace(fr,(e,r)=>{const i=t[r];return i!=null?String(i):`<${r}?>`})}const fr=/\{\$([^}]+)}/g;function Ot(n,t){if(n===t)return!0;const e=Object.keys(n),r=Object.keys(t);for(const i of e){if(!r.includes(i))return!1;const s=n[i],u=t[i];if(Re(s)&&Re(u)){if(!Ot(s,u))return!1}else if(s!==u)return!1}for(const i of r)if(!e.includes(i))return!1;return!0}function Re(n){return n!==null&&typeof n=="object"}/**
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
 */function st(n){return n&&n._delegate?n._delegate:n}/**
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
 */function un(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function dr(n){return(await fetch(n,{credentials:"include"})).ok}class mt{constructor(t,e,r){this.name=t,this.instanceFactory=e,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
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
 */const Z="[DEFAULT]";/**
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
 */class pr{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const r=new or;if(this.instancesDeferred.set(e,r),this.isInitialized(e)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:e});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){const e=this.normalizeInstanceIdentifier(t?.identifier),r=t?.optional??!1;if(this.isInitialized(e)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:e})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(gr(t))try{this.getOrInitializeService({instanceIdentifier:Z})}catch{}for(const[e,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(e);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(t=Z){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=Z){return this.instances.has(t)}getOptions(t=Z){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:e});for(const[s,u]of this.instancesDeferred.entries()){const p=this.normalizeInstanceIdentifier(s);r===p&&u.resolve(i)}return i}onInit(t,e){const r=this.normalizeInstanceIdentifier(e),i=this.onInitCallbacks.get(r)??new Set;i.add(t),this.onInitCallbacks.set(r,i);const s=this.instances.get(r);return s&&t(s,r),()=>{i.delete(t)}}invokeOnInitCallbacks(t,e){const r=this.onInitCallbacks.get(e);if(r)for(const i of r)try{i(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:mr(t),options:e}),this.instances.set(t,r),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=Z){return this.component?this.component.multipleInstances?t:Z:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function mr(n){return n===Z?void 0:n}function gr(n){return n.instantiationMode==="EAGER"}/**
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
 */class _r{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new pr(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var T;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(T||(T={}));const yr={debug:T.DEBUG,verbose:T.VERBOSE,info:T.INFO,warn:T.WARN,error:T.ERROR,silent:T.SILENT},Er=T.INFO,Ir={[T.DEBUG]:"log",[T.VERBOSE]:"log",[T.INFO]:"info",[T.WARN]:"warn",[T.ERROR]:"error"},Ar=(n,t,...e)=>{if(t<n.logLevel)return;const r=new Date().toISOString(),i=Ir[t];if(i)console[i](`[${r}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class cn{constructor(t){this.name=t,this._logLevel=Er,this._logHandler=Ar,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in T))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?yr[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,T.DEBUG,...t),this._logHandler(this,T.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,T.VERBOSE,...t),this._logHandler(this,T.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,T.INFO,...t),this._logHandler(this,T.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,T.WARN,...t),this._logHandler(this,T.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,T.ERROR,...t),this._logHandler(this,T.ERROR,...t)}}/**
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
 */class Tr{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(wr(e)){const r=e.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(e=>e).join(" ")}}function wr(n){return n.getComponent()?.type==="VERSION"}const ee="@firebase/app",Se="0.14.13";/**
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
 */const J=new cn("@firebase/app"),br="@firebase/app-compat",vr="@firebase/analytics-compat",Vr="@firebase/analytics",Rr="@firebase/app-check-compat",Sr="@firebase/app-check",Nr="@firebase/auth",Pr="@firebase/auth-compat",Dr="@firebase/database",Cr="@firebase/data-connect",Or="@firebase/database-compat",kr="@firebase/functions",Fr="@firebase/functions-compat",Mr="@firebase/installations",Lr="@firebase/installations-compat",Ur="@firebase/messaging",xr="@firebase/messaging-compat",$r="@firebase/performance",Br="@firebase/performance-compat",jr="@firebase/remote-config",zr="@firebase/remote-config-compat",qr="@firebase/storage",Gr="@firebase/storage-compat",Hr="@firebase/firestore",Kr="@firebase/ai",Wr="@firebase/firestore-compat",Jr="firebase",Qr="12.14.0";/**
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
 */const ne="[DEFAULT]",Yr={[ee]:"fire-core",[br]:"fire-core-compat",[Vr]:"fire-analytics",[vr]:"fire-analytics-compat",[Sr]:"fire-app-check",[Rr]:"fire-app-check-compat",[Nr]:"fire-auth",[Pr]:"fire-auth-compat",[Dr]:"fire-rtdb",[Cr]:"fire-data-connect",[Or]:"fire-rtdb-compat",[kr]:"fire-fn",[Fr]:"fire-fn-compat",[Mr]:"fire-iid",[Lr]:"fire-iid-compat",[Ur]:"fire-fcm",[xr]:"fire-fcm-compat",[$r]:"fire-perf",[Br]:"fire-perf-compat",[jr]:"fire-rc",[zr]:"fire-rc-compat",[qr]:"fire-gcs",[Gr]:"fire-gcs-compat",[Hr]:"fire-fst",[Wr]:"fire-fst-compat",[Kr]:"fire-vertex","fire-js":"fire-js",[Jr]:"fire-js-all"};/**
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
 */const kt=new Map,Xr=new Map,re=new Map;function Ne(n,t){try{n.container.addComponent(t)}catch(e){J.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function Ft(n){const t=n.name;if(re.has(t))return J.debug(`There were multiple attempts to register component ${t}.`),!1;re.set(t,n);for(const e of kt.values())Ne(e,n);for(const e of Xr.values())Ne(e,n);return!0}function Zr(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function ti(n){return n==null?!1:n.settings!==void 0}/**
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
 */const ei={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Y=new ln("app","Firebase",ei);/**
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
 */class ni{constructor(t,e,r){this._isDeleted=!1,this._options={...t},this._config={...e},this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new mt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw Y.create("app-deleted",{appName:this._name})}}/**
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
 */const ri=Qr;function ii(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const r={name:ne,automaticDataCollectionEnabled:!0,...t},i=r.name;if(typeof i!="string"||!i)throw Y.create("bad-app-name",{appName:String(i)});if(e||(e=an()),!e)throw Y.create("no-options");const s=kt.get(i);if(s){if(Ot(e,s.options)&&Ot(r,s.config))return s;throw Y.create("duplicate-app",{appName:i})}const u=new _r(i);for(const m of re.values())u.addComponent(m);const p=new ni(e,r,u);return kt.set(i,p),p}function si(n=ne){const t=kt.get(n);if(!t&&n===ne&&an())return ii();if(!t)throw Y.create("no-app",{appName:n});return t}function it(n,t,e){let r=Yr[n]??n;e&&(r+=`-${e}`);const i=r.match(/\s|\//),s=t.match(/\s|\//);if(i||s){const u=[`Unable to register library "${r}" with version "${t}":`];i&&u.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&s&&u.push("and"),s&&u.push(`version name "${t}" contains illegal characters (whitespace or "/")`),J.warn(u.join(" "));return}Ft(new mt(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}/**
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
 */const oi="firebase-heartbeat-database",ai=1,gt="firebase-heartbeat-store";let Yt=null;function hn(){return Yt||(Yt=Wn(oi,ai,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(gt)}catch(e){console.warn(e)}}}}).catch(n=>{throw Y.create("idb-open",{originalErrorMessage:n.message})})),Yt}async function li(n){try{const e=(await hn()).transaction(gt),r=await e.objectStore(gt).get(fn(n));return await e.done,r}catch(t){if(t instanceof at)J.warn(t.message);else{const e=Y.create("idb-get",{originalErrorMessage:t?.message});J.warn(e.message)}}}async function Pe(n,t){try{const r=(await hn()).transaction(gt,"readwrite");await r.objectStore(gt).put(t,fn(n)),await r.done}catch(e){if(e instanceof at)J.warn(e.message);else{const r=Y.create("idb-set",{originalErrorMessage:e?.message});J.warn(r.message)}}}function fn(n){return`${n.name}!${n.options.appId}`}/**
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
 */const ui=1024,ci=30;class hi{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new di(e),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const e=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=De();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(i=>i.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:e}),this._heartbeatsCache.heartbeats.length>ci){const i=pi(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(i,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(t){J.warn(t)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=De(),{heartbeatsToSend:e,unsentEntries:r}=fi(this._heartbeatsCache.heartbeats),i=Ct(JSON.stringify({version:2,heartbeats:e}));return this._heartbeatsCache.lastSentHeartbeatDate=t,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return J.warn(t),""}}}function De(){return new Date().toISOString().substring(0,10)}function fi(n,t=ui){const e=[];let r=n.slice();for(const i of n){const s=e.find(u=>u.agent===i.agent);if(s){if(s.dates.push(i.date),Ce(e)>t){s.dates.pop();break}}else if(e.push({agent:i.agent,dates:[i.date]}),Ce(e)>t){e.pop();break}r=r.slice(1)}return{heartbeatsToSend:e,unsentEntries:r}}class di{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return lr()?ur().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await li(this.app);return e?.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return Pe(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return Pe(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...t.heartbeats]})}else return}}function Ce(n){return Ct(JSON.stringify({version:2,heartbeats:n})).length}function pi(n){if(n.length===0)return-1;let t=0,e=n[0].date;for(let r=1;r<n.length;r++)n[r].date<e&&(e=n[r].date,t=r);return t}/**
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
 */function mi(n){Ft(new mt("platform-logger",t=>new Tr(t),"PRIVATE")),Ft(new mt("heartbeat",t=>new hi(t),"PRIVATE")),it(ee,Se,n),it(ee,Se,"esm2020"),it("fire-js","")}mi("");var Oe=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var dn;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(c,o){function l(){}l.prototype=o.prototype,c.F=o.prototype,c.prototype=new l,c.prototype.constructor=c,c.D=function(f,h,d){for(var a=Array(arguments.length-2),X=2;X<arguments.length;X++)a[X-2]=arguments[X];return o.prototype[h].apply(f,a)}}function e(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}t(r,e),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(c,o,l){l||(l=0);const f=Array(16);if(typeof o=="string")for(var h=0;h<16;++h)f[h]=o.charCodeAt(l++)|o.charCodeAt(l++)<<8|o.charCodeAt(l++)<<16|o.charCodeAt(l++)<<24;else for(h=0;h<16;++h)f[h]=o[l++]|o[l++]<<8|o[l++]<<16|o[l++]<<24;o=c.g[0],l=c.g[1],h=c.g[2];let d=c.g[3],a;a=o+(d^l&(h^d))+f[0]+3614090360&4294967295,o=l+(a<<7&4294967295|a>>>25),a=d+(h^o&(l^h))+f[1]+3905402710&4294967295,d=o+(a<<12&4294967295|a>>>20),a=h+(l^d&(o^l))+f[2]+606105819&4294967295,h=d+(a<<17&4294967295|a>>>15),a=l+(o^h&(d^o))+f[3]+3250441966&4294967295,l=h+(a<<22&4294967295|a>>>10),a=o+(d^l&(h^d))+f[4]+4118548399&4294967295,o=l+(a<<7&4294967295|a>>>25),a=d+(h^o&(l^h))+f[5]+1200080426&4294967295,d=o+(a<<12&4294967295|a>>>20),a=h+(l^d&(o^l))+f[6]+2821735955&4294967295,h=d+(a<<17&4294967295|a>>>15),a=l+(o^h&(d^o))+f[7]+4249261313&4294967295,l=h+(a<<22&4294967295|a>>>10),a=o+(d^l&(h^d))+f[8]+1770035416&4294967295,o=l+(a<<7&4294967295|a>>>25),a=d+(h^o&(l^h))+f[9]+2336552879&4294967295,d=o+(a<<12&4294967295|a>>>20),a=h+(l^d&(o^l))+f[10]+4294925233&4294967295,h=d+(a<<17&4294967295|a>>>15),a=l+(o^h&(d^o))+f[11]+2304563134&4294967295,l=h+(a<<22&4294967295|a>>>10),a=o+(d^l&(h^d))+f[12]+1804603682&4294967295,o=l+(a<<7&4294967295|a>>>25),a=d+(h^o&(l^h))+f[13]+4254626195&4294967295,d=o+(a<<12&4294967295|a>>>20),a=h+(l^d&(o^l))+f[14]+2792965006&4294967295,h=d+(a<<17&4294967295|a>>>15),a=l+(o^h&(d^o))+f[15]+1236535329&4294967295,l=h+(a<<22&4294967295|a>>>10),a=o+(h^d&(l^h))+f[1]+4129170786&4294967295,o=l+(a<<5&4294967295|a>>>27),a=d+(l^h&(o^l))+f[6]+3225465664&4294967295,d=o+(a<<9&4294967295|a>>>23),a=h+(o^l&(d^o))+f[11]+643717713&4294967295,h=d+(a<<14&4294967295|a>>>18),a=l+(d^o&(h^d))+f[0]+3921069994&4294967295,l=h+(a<<20&4294967295|a>>>12),a=o+(h^d&(l^h))+f[5]+3593408605&4294967295,o=l+(a<<5&4294967295|a>>>27),a=d+(l^h&(o^l))+f[10]+38016083&4294967295,d=o+(a<<9&4294967295|a>>>23),a=h+(o^l&(d^o))+f[15]+3634488961&4294967295,h=d+(a<<14&4294967295|a>>>18),a=l+(d^o&(h^d))+f[4]+3889429448&4294967295,l=h+(a<<20&4294967295|a>>>12),a=o+(h^d&(l^h))+f[9]+568446438&4294967295,o=l+(a<<5&4294967295|a>>>27),a=d+(l^h&(o^l))+f[14]+3275163606&4294967295,d=o+(a<<9&4294967295|a>>>23),a=h+(o^l&(d^o))+f[3]+4107603335&4294967295,h=d+(a<<14&4294967295|a>>>18),a=l+(d^o&(h^d))+f[8]+1163531501&4294967295,l=h+(a<<20&4294967295|a>>>12),a=o+(h^d&(l^h))+f[13]+2850285829&4294967295,o=l+(a<<5&4294967295|a>>>27),a=d+(l^h&(o^l))+f[2]+4243563512&4294967295,d=o+(a<<9&4294967295|a>>>23),a=h+(o^l&(d^o))+f[7]+1735328473&4294967295,h=d+(a<<14&4294967295|a>>>18),a=l+(d^o&(h^d))+f[12]+2368359562&4294967295,l=h+(a<<20&4294967295|a>>>12),a=o+(l^h^d)+f[5]+4294588738&4294967295,o=l+(a<<4&4294967295|a>>>28),a=d+(o^l^h)+f[8]+2272392833&4294967295,d=o+(a<<11&4294967295|a>>>21),a=h+(d^o^l)+f[11]+1839030562&4294967295,h=d+(a<<16&4294967295|a>>>16),a=l+(h^d^o)+f[14]+4259657740&4294967295,l=h+(a<<23&4294967295|a>>>9),a=o+(l^h^d)+f[1]+2763975236&4294967295,o=l+(a<<4&4294967295|a>>>28),a=d+(o^l^h)+f[4]+1272893353&4294967295,d=o+(a<<11&4294967295|a>>>21),a=h+(d^o^l)+f[7]+4139469664&4294967295,h=d+(a<<16&4294967295|a>>>16),a=l+(h^d^o)+f[10]+3200236656&4294967295,l=h+(a<<23&4294967295|a>>>9),a=o+(l^h^d)+f[13]+681279174&4294967295,o=l+(a<<4&4294967295|a>>>28),a=d+(o^l^h)+f[0]+3936430074&4294967295,d=o+(a<<11&4294967295|a>>>21),a=h+(d^o^l)+f[3]+3572445317&4294967295,h=d+(a<<16&4294967295|a>>>16),a=l+(h^d^o)+f[6]+76029189&4294967295,l=h+(a<<23&4294967295|a>>>9),a=o+(l^h^d)+f[9]+3654602809&4294967295,o=l+(a<<4&4294967295|a>>>28),a=d+(o^l^h)+f[12]+3873151461&4294967295,d=o+(a<<11&4294967295|a>>>21),a=h+(d^o^l)+f[15]+530742520&4294967295,h=d+(a<<16&4294967295|a>>>16),a=l+(h^d^o)+f[2]+3299628645&4294967295,l=h+(a<<23&4294967295|a>>>9),a=o+(h^(l|~d))+f[0]+4096336452&4294967295,o=l+(a<<6&4294967295|a>>>26),a=d+(l^(o|~h))+f[7]+1126891415&4294967295,d=o+(a<<10&4294967295|a>>>22),a=h+(o^(d|~l))+f[14]+2878612391&4294967295,h=d+(a<<15&4294967295|a>>>17),a=l+(d^(h|~o))+f[5]+4237533241&4294967295,l=h+(a<<21&4294967295|a>>>11),a=o+(h^(l|~d))+f[12]+1700485571&4294967295,o=l+(a<<6&4294967295|a>>>26),a=d+(l^(o|~h))+f[3]+2399980690&4294967295,d=o+(a<<10&4294967295|a>>>22),a=h+(o^(d|~l))+f[10]+4293915773&4294967295,h=d+(a<<15&4294967295|a>>>17),a=l+(d^(h|~o))+f[1]+2240044497&4294967295,l=h+(a<<21&4294967295|a>>>11),a=o+(h^(l|~d))+f[8]+1873313359&4294967295,o=l+(a<<6&4294967295|a>>>26),a=d+(l^(o|~h))+f[15]+4264355552&4294967295,d=o+(a<<10&4294967295|a>>>22),a=h+(o^(d|~l))+f[6]+2734768916&4294967295,h=d+(a<<15&4294967295|a>>>17),a=l+(d^(h|~o))+f[13]+1309151649&4294967295,l=h+(a<<21&4294967295|a>>>11),a=o+(h^(l|~d))+f[4]+4149444226&4294967295,o=l+(a<<6&4294967295|a>>>26),a=d+(l^(o|~h))+f[11]+3174756917&4294967295,d=o+(a<<10&4294967295|a>>>22),a=h+(o^(d|~l))+f[2]+718787259&4294967295,h=d+(a<<15&4294967295|a>>>17),a=l+(d^(h|~o))+f[9]+3951481745&4294967295,c.g[0]=c.g[0]+o&4294967295,c.g[1]=c.g[1]+(h+(a<<21&4294967295|a>>>11))&4294967295,c.g[2]=c.g[2]+h&4294967295,c.g[3]=c.g[3]+d&4294967295}r.prototype.v=function(c,o){o===void 0&&(o=c.length);const l=o-this.blockSize,f=this.C;let h=this.h,d=0;for(;d<o;){if(h==0)for(;d<=l;)i(this,c,d),d+=this.blockSize;if(typeof c=="string"){for(;d<o;)if(f[h++]=c.charCodeAt(d++),h==this.blockSize){i(this,f),h=0;break}}else for(;d<o;)if(f[h++]=c[d++],h==this.blockSize){i(this,f),h=0;break}}this.h=h,this.o+=o},r.prototype.A=function(){var c=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);c[0]=128;for(var o=1;o<c.length-8;++o)c[o]=0;o=this.o*8;for(var l=c.length-8;l<c.length;++l)c[l]=o&255,o/=256;for(this.v(c),c=Array(16),o=0,l=0;l<4;++l)for(let f=0;f<32;f+=8)c[o++]=this.g[l]>>>f&255;return c};function s(c,o){var l=p;return Object.prototype.hasOwnProperty.call(l,c)?l[c]:l[c]=o(c)}function u(c,o){this.h=o;const l=[];let f=!0;for(let h=c.length-1;h>=0;h--){const d=c[h]|0;f&&d==o||(l[h]=d,f=!1)}this.g=l}var p={};function m(c){return-128<=c&&c<128?s(c,function(o){return new u([o|0],o<0?-1:0)}):new u([c|0],c<0?-1:0)}function g(c){if(isNaN(c)||!isFinite(c))return I;if(c<0)return C(g(-c));const o=[];let l=1;for(let f=0;c>=l;f++)o[f]=c/l|0,l*=4294967296;return new u(o,0)}function y(c,o){if(c.length==0)throw Error("number format error: empty string");if(o=o||10,o<2||36<o)throw Error("radix out of range: "+o);if(c.charAt(0)=="-")return C(y(c.substring(1),o));if(c.indexOf("-")>=0)throw Error('number format error: interior "-" character');const l=g(Math.pow(o,8));let f=I;for(let d=0;d<c.length;d+=8){var h=Math.min(8,c.length-d);const a=parseInt(c.substring(d,d+h),o);h<8?(h=g(Math.pow(o,h)),f=f.j(h).add(g(a))):(f=f.j(l),f=f.add(g(a)))}return f}var I=m(0),w=m(1),U=m(16777216);n=u.prototype,n.m=function(){if(F(this))return-C(this).m();let c=0,o=1;for(let l=0;l<this.g.length;l++){const f=this.i(l);c+=(f>=0?f:4294967296+f)*o,o*=4294967296}return c},n.toString=function(c){if(c=c||10,c<2||36<c)throw Error("radix out of range: "+c);if(D(this))return"0";if(F(this))return"-"+C(this).toString(c);const o=g(Math.pow(c,6));var l=this;let f="";for(;;){const h=St(l,o).g;l=Vt(l,h.j(o));let d=((l.g.length>0?l.g[0]:l.h)>>>0).toString(c);if(l=h,D(l))return d+f;for(;d.length<6;)d="0"+d;f=d+f}},n.i=function(c){return c<0?0:c<this.g.length?this.g[c]:this.h};function D(c){if(c.h!=0)return!1;for(let o=0;o<c.g.length;o++)if(c.g[o]!=0)return!1;return!0}function F(c){return c.h==-1}n.l=function(c){return c=Vt(this,c),F(c)?-1:D(c)?0:1};function C(c){const o=c.g.length,l=[];for(let f=0;f<o;f++)l[f]=~c.g[f];return new u(l,~c.h).add(w)}n.abs=function(){return F(this)?C(this):this},n.add=function(c){const o=Math.max(this.g.length,c.g.length),l=[];let f=0;for(let h=0;h<=o;h++){let d=f+(this.i(h)&65535)+(c.i(h)&65535),a=(d>>>16)+(this.i(h)>>>16)+(c.i(h)>>>16);f=a>>>16,d&=65535,a&=65535,l[h]=a<<16|d}return new u(l,l[l.length-1]&-2147483648?-1:0)};function Vt(c,o){return c.add(C(o))}n.j=function(c){if(D(this)||D(c))return I;if(F(this))return F(c)?C(this).j(C(c)):C(C(this).j(c));if(F(c))return C(this.j(C(c)));if(this.l(U)<0&&c.l(U)<0)return g(this.m()*c.m());const o=this.g.length+c.g.length,l=[];for(var f=0;f<2*o;f++)l[f]=0;for(f=0;f<this.g.length;f++)for(let h=0;h<c.g.length;h++){const d=this.i(f)>>>16,a=this.i(f)&65535,X=c.i(h)>>>16,ve=c.i(h)&65535;l[2*f+2*h]+=a*ve,Rt(l,2*f+2*h),l[2*f+2*h+1]+=d*ve,Rt(l,2*f+2*h+1),l[2*f+2*h+1]+=a*X,Rt(l,2*f+2*h+1),l[2*f+2*h+2]+=d*X,Rt(l,2*f+2*h+2)}for(c=0;c<o;c++)l[c]=l[2*c+1]<<16|l[2*c];for(c=o;c<2*o;c++)l[c]=0;return new u(l,0)};function Rt(c,o){for(;(c[o]&65535)!=c[o];)c[o+1]+=c[o]>>>16,c[o]&=65535,o++}function ct(c,o){this.g=c,this.h=o}function St(c,o){if(D(o))throw Error("division by zero");if(D(c))return new ct(I,I);if(F(c))return o=St(C(c),o),new ct(C(o.g),C(o.h));if(F(o))return o=St(c,C(o)),new ct(C(o.g),o.h);if(c.g.length>30){if(F(c)||F(o))throw Error("slowDivide_ only works with positive integers.");for(var l=w,f=o;f.l(c)<=0;)l=be(l),f=be(f);var h=nt(l,1),d=nt(f,1);for(f=nt(f,2),l=nt(l,2);!D(f);){var a=d.add(f);a.l(c)<=0&&(h=h.add(l),d=a),f=nt(f,1),l=nt(l,1)}return o=Vt(c,h.j(o)),new ct(h,o)}for(h=I;c.l(o)>=0;){for(l=Math.max(1,Math.floor(c.m()/o.m())),f=Math.ceil(Math.log(l)/Math.LN2),f=f<=48?1:Math.pow(2,f-48),d=g(l),a=d.j(o);F(a)||a.l(c)>0;)l-=f,d=g(l),a=d.j(o);D(d)&&(d=w),h=h.add(d),c=Vt(c,a)}return new ct(h,c)}n.B=function(c){return St(this,c).h},n.and=function(c){const o=Math.max(this.g.length,c.g.length),l=[];for(let f=0;f<o;f++)l[f]=this.i(f)&c.i(f);return new u(l,this.h&c.h)},n.or=function(c){const o=Math.max(this.g.length,c.g.length),l=[];for(let f=0;f<o;f++)l[f]=this.i(f)|c.i(f);return new u(l,this.h|c.h)},n.xor=function(c){const o=Math.max(this.g.length,c.g.length),l=[];for(let f=0;f<o;f++)l[f]=this.i(f)^c.i(f);return new u(l,this.h^c.h)};function be(c){const o=c.g.length+1,l=[];for(let f=0;f<o;f++)l[f]=c.i(f)<<1|c.i(f-1)>>>31;return new u(l,c.h)}function nt(c,o){const l=o>>5;o%=32;const f=c.g.length-l,h=[];for(let d=0;d<f;d++)h[d]=o>0?c.i(d+l)>>>o|c.i(d+l+1)<<32-o:c.i(d+l);return new u(h,c.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,u.prototype.add=u.prototype.add,u.prototype.multiply=u.prototype.j,u.prototype.modulo=u.prototype.B,u.prototype.compare=u.prototype.l,u.prototype.toNumber=u.prototype.m,u.prototype.toString=u.prototype.toString,u.prototype.getBits=u.prototype.i,u.fromNumber=g,u.fromString=y,dn=u}).apply(typeof Oe<"u"?Oe:typeof self<"u"?self:typeof window<"u"?window:{});/**
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
 */let lt="12.14.0";function gi(n){lt=n}/**
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
 */const ot=new cn("@firebase/firestore");function Mt(n,...t){if(ot.logLevel<=T.DEBUG){const e=t.map(fe);ot.debug(`Firestore (${lt}): ${n}`,...e)}}function he(n,...t){if(ot.logLevel<=T.ERROR){const e=t.map(fe);ot.error(`Firestore (${lt}): ${n}`,...e)}}function pn(n,...t){if(ot.logLevel<=T.WARN){const e=t.map(fe);ot.warn(`Firestore (${lt}): ${n}`,...e)}}function fe(n){if(typeof n=="string")return n;try{return(function(e){return JSON.stringify(e)})(n)}catch{return n}}/**
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
 */function b(n,t,e){let r="Unexpected state";typeof t=="string"?r=t:e=t,mn(n,r,e)}function mn(n,t,e){let r=`FIRESTORE (${lt}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(e!==void 0)try{r+=" CONTEXT: "+JSON.stringify(e)}catch{r+=" CONTEXT: "+e}throw he(r),new Error(r)}function x(n,t,e,r){let i="Unexpected state";typeof e=="string"?i=e:r=e,n||mn(t,i,r)}function wt(n,t){return n}/**
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
 */const _={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable"};class E extends at{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class gn{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class _i{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable((()=>e(M.UNAUTHENTICATED)))}shutdown(){}}class yi{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable((()=>e(this.token.user)))}shutdown(){this.changeListener=null}}class Ei{constructor(t){this.auth=null,t.onInit((e=>{this.auth=e}))}getToken(){return this.auth?this.auth.getToken().then((t=>t?(x(typeof t.accessToken=="string",42297,{t}),new gn(t.accessToken,new M(this.auth.getUid()))):null)):Promise.resolve(null)}invalidateToken(){}start(t,e){}shutdown(){}}class Ii{constructor(t,e,r){this.i=t,this.o=e,this.u=r,this.type="FirstParty",this.user=M.FIRST_PARTY,this.l=new Map}h(){return this.u?this.u():null}get headers(){this.l.set("X-Goog-AuthUser",this.i);const t=this.h();return t&&this.l.set("Authorization",t),this.o&&this.l.set("X-Goog-Iam-Authorization-Token",this.o),this.l}}class Ai{constructor(t,e,r){this.i=t,this.o=e,this.u=r}getToken(){return Promise.resolve(new Ii(this.i,this.o,this.u))}start(t,e){t.enqueueRetryable((()=>e(M.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class ke{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Ti{constructor(t,e){this.m=e,this.appCheck=null,this.T=null,ti(t)&&t.settings.appCheckToken&&(this.T=t.settings.appCheckToken),e.onInit((r=>{this.appCheck=r}))}getToken(){return this.T?Promise.resolve(new ke(this.T)):this.appCheck?this.appCheck.getToken().then((t=>t?(x(typeof t.token=="string",3470,{tokenResult:t}),new ke(t.token)):null)):Promise.resolve(null)}invalidateToken(){}start(t,e){}shutdown(){}}/**
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
 */class wi{constructor(t,e,r,i,s,u,p,m,g,y,I){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=u,this.autoDetectLongPolling=p,this.longPollingOptions=m,this.useFetchStreams=g,this.isUsingEmulator=y,this.apiKey=I}}const ie="(default)";class _t{constructor(t,e){this.projectId=t,this.database=e||ie}static empty(){return new _t("","")}get isDefaultDatabase(){return this.database===ie}isEqual(t){return t instanceof _t&&t.projectId===this.projectId&&t.database===this.database}}function bi(n,t){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new E(_.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new _t(n.options.projectId,t)}/**
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
 */function vi(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}/**
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
 */class Vi{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const i=vi(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<e&&(r+=t.charAt(i[s]%62))}return r}}function V(n,t){return n<t?-1:n>t?1:0}function se(n,t){const e=Math.min(n.length,t.length);for(let r=0;r<e;r++){const i=n.charAt(r),s=t.charAt(r);if(i!==s)return Xt(i)===Xt(s)?V(i,s):Xt(i)?1:-1}return V(n.length,t.length)}const Ri=55296,Si=57343;function Xt(n){const t=n.charCodeAt(0);return t>=Ri&&t<=Si}function _n(n,t,e){return n.length===t.length&&n.every(((r,i)=>e(r,t[i])))}/**
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
 */const Fe="__name__";class G{constructor(t,e,r){e===void 0?e=0:e>t.length&&b(637,{offset:e,range:t.length}),r===void 0?r=t.length-e:r>t.length-e&&b(1746,{length:r,range:t.length-e}),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return G.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof G?t.forEach((r=>{e.push(r)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const r=Math.min(t.length,e.length);for(let i=0;i<r;i++){const s=G.compareSegments(t.get(i),e.get(i));if(s!==0)return s}return V(t.length,e.length)}static compareSegments(t,e){const r=G.isNumericId(t),i=G.isNumericId(e);return r&&!i?-1:!r&&i?1:r&&i?G.extractNumericId(t).compare(G.extractNumericId(e)):se(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return dn.fromString(t.substring(4,t.length-2))}}class v extends G{construct(t,e,r){return new v(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const r of t){if(r.indexOf("//")>=0)throw new E(_.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter((i=>i.length>0)))}return new v(e)}static emptyPath(){return new v([])}}const Ni=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class L extends G{construct(t,e,r){return new L(t,e,r)}static isValidIdentifier(t){return Ni.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),L.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Fe}static keyField(){return new L([Fe])}static fromServerFormat(t){const e=[];let r="",i=0;const s=()=>{if(r.length===0)throw new E(_.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""};let u=!1;for(;i<t.length;){const p=t[i];if(p==="\\"){if(i+1===t.length)throw new E(_.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const m=t[i+1];if(m!=="\\"&&m!=="."&&m!=="`")throw new E(_.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=m,i+=2}else p==="`"?(u=!u,i++):p!=="."||u?(r+=p,i++):(s(),i++)}if(s(),u)throw new E(_.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new L(e)}static emptyPath(){return new L([])}}/**
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
 */function yn(n,t,e){if(!e)throw new E(_.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function Me(n){if(!P.isDocumentKey(n))throw new E(_.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Le(n){if(P.isDocumentKey(n))throw new E(_.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function En(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function qt(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=(function(r){return r.constructor?r.constructor.name:null})(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":b(12329,{type:typeof n})}function Gt(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new E(_.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=qt(n);throw new E(_.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}/**
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
 */function In(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
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
 */let Nt=null;function Pi(){return Nt===null?Nt=(function(){return 268435456+Math.round(2147483648*Math.random())})():Nt++,"0x"+Nt.toString(16)}/**
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
 */function Di(n){return n==null}function Lt(n){return n===0&&1/n==-1/0}/**
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
 */const Zt="RestConnection",Ci={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class Oi{get P(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.V=e+"://"+t.host,this.R=`projects/${r}/databases/${i}`,this.A=this.databaseId.database===ie?`project_id=${r}`:`project_id=${r}&database_id=${i}`}I(t,e,r,i,s){const u=Pi(),p=this.p(t,e.toUriEncodedString());Mt(Zt,`Sending RPC '${t}' ${u}:`,p,r);const m={"google-cloud-resource-prefix":this.R,"x-goog-request-params":this.A};this.F(m,i,s);const{host:g}=new URL(p),y=un(g);return this.v(t,p,m,r,y).then((I=>(Mt(Zt,`Received RPC '${t}' ${u}: `,I),I)),(I=>{throw pn(Zt,`RPC '${t}' ${u} failed with error: `,I,"url: ",p,"request:",r),I}))}D(t,e,r,i,s,u){return this.I(t,e,r,i,s)}F(t,e,r){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+lt})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach(((i,s)=>t[s]=i)),r&&r.headers.forEach(((i,s)=>t[s]=i))}p(t,e){const r=Ci[t];let i=`${this.V}/v1/${e}:${r}`;return this.databaseInfo.apiKey&&(i=`${i}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),i}terminate(){}}/**
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
 */var Ue,A;function xe(n){if(n===void 0)return he("RPC_ERROR","HTTP error has no status"),_.UNKNOWN;switch(n){case 200:return _.OK;case 400:return _.FAILED_PRECONDITION;case 401:return _.UNAUTHENTICATED;case 403:return _.PERMISSION_DENIED;case 404:return _.NOT_FOUND;case 409:return _.ABORTED;case 416:return _.OUT_OF_RANGE;case 429:return _.RESOURCE_EXHAUSTED;case 499:return _.CANCELLED;case 500:return _.UNKNOWN;case 501:return _.UNIMPLEMENTED;case 503:return _.UNAVAILABLE;case 504:return _.DEADLINE_EXCEEDED;default:return n>=200&&n<300?_.OK:n>=400&&n<500?_.FAILED_PRECONDITION:n>=500&&n<600?_.INTERNAL:_.UNKNOWN}}/**
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
 */(A=Ue||(Ue={}))[A.OK=0]="OK",A[A.CANCELLED=1]="CANCELLED",A[A.UNKNOWN=2]="UNKNOWN",A[A.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",A[A.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",A[A.NOT_FOUND=5]="NOT_FOUND",A[A.ALREADY_EXISTS=6]="ALREADY_EXISTS",A[A.PERMISSION_DENIED=7]="PERMISSION_DENIED",A[A.UNAUTHENTICATED=16]="UNAUTHENTICATED",A[A.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",A[A.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",A[A.ABORTED=10]="ABORTED",A[A.OUT_OF_RANGE=11]="OUT_OF_RANGE",A[A.UNIMPLEMENTED=12]="UNIMPLEMENTED",A[A.INTERNAL=13]="INTERNAL",A[A.UNAVAILABLE=14]="UNAVAILABLE",A[A.DATA_LOSS=15]="DATA_LOSS";class ki extends Oi{N(t,e){throw new Error("Not supported by FetchConnection")}async v(t,e,r,i,s){const u=JSON.stringify(i);let p;try{const m={method:"POST",headers:r,body:u};s&&(m.credentials="include"),p=await fetch(e,m)}catch(m){const g=m;throw new E(xe(g.status),"Request failed with error: "+g.statusText)}if(!p.ok){let m=await p.json();Array.isArray(m)&&(m=m[0]);const g=m?.error?.message;throw new E(xe(p.status),`Request failed with error: ${g??p.statusText}`)}return p.json()}}/**
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
 */function $e(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function Ht(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}/**
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
 */class Fi extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class Q{constructor(t){this.binaryString=t}static fromBase64String(t){const e=(function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new Fi("Invalid base64 string: "+s):s}})(t);return new Q(e)}static fromUint8Array(t){const e=(function(i){let s="";for(let u=0;u<i.length;++u)s+=String.fromCharCode(i[u]);return s})(t);return new Q(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(e){return btoa(e)})(this.binaryString)}toUint8Array(){return(function(e){const r=new Uint8Array(e.length);for(let i=0;i<e.length;i++)r[i]=e.charCodeAt(i);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return V(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}Q.EMPTY_BYTE_STRING=new Q("");const Mi=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function tt(n){if(x(!!n,39018),typeof n=="string"){let t=0;const e=Mi.exec(n);if(x(!!e,46558,{timestamp:n}),e[1]){let i=e[1];i=(i+"000000000").substr(0,9),t=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:R(n.seconds),nanos:R(n.nanos)}}function R(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function yt(n){return typeof n=="string"?Q.fromBase64String(n):Q.fromUint8Array(n)}/**
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
 */function B(n,t){const e={typeString:n};return t&&(e.value=t),e}function bt(n,t){if(!En(n))throw new E(_.INVALID_ARGUMENT,"JSON must be an object");let e;for(const r in t)if(t[r]){const i=t[r].typeString,s="value"in t[r]?{value:t[r].value}:void 0;if(!(r in n)){e=`JSON missing required field: '${r}'`;break}const u=n[r];if(i&&typeof u!==i){e=`JSON field '${r}' must be a ${i}.`;break}if(s!==void 0&&u!==s.value){e=`Expected '${r}' field to equal '${s.value}'`;break}}if(e)throw new E(_.INVALID_ARGUMENT,e);return!0}/**
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
 */const Be=-62135596800,je=1e6;class S{static now(){return S.fromMillis(Date.now())}static fromDate(t){return S.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),r=Math.floor((t-1e3*e)*je);return new S(e,r)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new E(_.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new E(_.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<Be)throw new E(_.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new E(_.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/je}_compareTo(t){return this.seconds===t.seconds?V(this.nanoseconds,t.nanoseconds):V(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:S._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(bt(t,S._jsonSchema))return new S(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-Be;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}S._jsonSchemaVersion="firestore/timestamp/1.0",S._jsonSchema={type:B("string",S._jsonSchemaVersion),seconds:B("number"),nanoseconds:B("number")};function An(n){return(n?.mapValue?.fields||{}).__type__?.stringValue==="server_timestamp"}function Tn(n){const t=n.mapValue.fields.__previous_value__;return An(t)?Tn(t):t}function Et(n){const t=tt(n.mapValue.fields.__local_write_time__.timestampValue);return new S(t.seconds,t.nanos)}/**
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
 */const wn="__type__",Li="__max__",Pt={},bn="__vector__",Ut="value";function et(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?An(n)?4:(function(e){return(((e.mapValue||{}).fields||{}).__type__||{}).stringValue===Li})(n)?9007199254740991:(function(e){return(e?.mapValue?.fields||{})[wn]?.stringValue===bn})(n)?10:11:b(28295,{value:n})}function xt(n,t){if(n===t)return!0;const e=et(n);if(e!==et(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return Et(n).isEqual(Et(t));case 3:return(function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const u=tt(i.timestampValue),p=tt(s.timestampValue);return u.seconds===p.seconds&&u.nanos===p.nanos})(n,t);case 5:return n.stringValue===t.stringValue;case 6:return(function(i,s){return yt(i.bytesValue).isEqual(yt(s.bytesValue))})(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return(function(i,s){return R(i.geoPointValue.latitude)===R(s.geoPointValue.latitude)&&R(i.geoPointValue.longitude)===R(s.geoPointValue.longitude)})(n,t);case 2:return(function(i,s){if("integerValue"in i&&"integerValue"in s)return R(i.integerValue)===R(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const u=R(i.doubleValue),p=R(s.doubleValue);return u===p?Lt(u)===Lt(p):isNaN(u)&&isNaN(p)}return!1})(n,t);case 9:return _n(n.arrayValue.values||[],t.arrayValue.values||[],xt);case 10:case 11:return(function(i,s){const u=i.mapValue.fields||{},p=s.mapValue.fields||{};if($e(u)!==$e(p))return!1;for(const m in u)if(u.hasOwnProperty(m)&&(p[m]===void 0||!xt(u[m],p[m])))return!1;return!0})(n,t);default:return b(52216,{left:n})}}function It(n,t){return(n.values||[]).find((e=>xt(e,t)))!==void 0}function $t(n,t){if(n===t)return 0;const e=et(n),r=et(t);if(e!==r)return V(e,r);switch(e){case 0:case 9007199254740991:return 0;case 1:return V(n.booleanValue,t.booleanValue);case 2:return(function(s,u){const p=R(s.integerValue||s.doubleValue),m=R(u.integerValue||u.doubleValue);return p<m?-1:p>m?1:p===m?0:isNaN(p)?isNaN(m)?0:-1:1})(n,t);case 3:return ze(n.timestampValue,t.timestampValue);case 4:return ze(Et(n),Et(t));case 5:return se(n.stringValue,t.stringValue);case 6:return(function(s,u){const p=yt(s),m=yt(u);return p.compareTo(m)})(n.bytesValue,t.bytesValue);case 7:return(function(s,u){const p=s.split("/"),m=u.split("/");for(let g=0;g<p.length&&g<m.length;g++){const y=V(p[g],m[g]);if(y!==0)return y}return V(p.length,m.length)})(n.referenceValue,t.referenceValue);case 8:return(function(s,u){const p=V(R(s.latitude),R(u.latitude));return p!==0?p:V(R(s.longitude),R(u.longitude))})(n.geoPointValue,t.geoPointValue);case 9:return qe(n.arrayValue,t.arrayValue);case 10:return(function(s,u){const p=s.fields||{},m=u.fields||{},g=p[Ut]?.arrayValue,y=m[Ut]?.arrayValue,I=V(g?.values?.length||0,y?.values?.length||0);return I!==0?I:qe(g,y)})(n.mapValue,t.mapValue);case 11:return(function(s,u){if(s===Pt&&u===Pt)return 0;if(s===Pt)return 1;if(u===Pt)return-1;const p=s.fields||{},m=Object.keys(p),g=u.fields||{},y=Object.keys(g);m.sort(),y.sort();for(let I=0;I<m.length&&I<y.length;++I){const w=se(m[I],y[I]);if(w!==0)return w;const U=$t(p[m[I]],g[y[I]]);if(U!==0)return U}return V(m.length,y.length)})(n.mapValue,t.mapValue);default:throw b(23264,{S:e})}}function ze(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return V(n,t);const e=tt(n),r=tt(t),i=V(e.seconds,r.seconds);return i!==0?i:V(e.nanos,r.nanos)}function qe(n,t){const e=n.values||[],r=t.values||[];for(let i=0;i<e.length&&i<r.length;++i){const s=$t(e[i],r[i]);if(s)return s}return V(e.length,r.length)}function Ge(n,t){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${t.path.canonicalString()}`}}function vn(n){return!!n&&"arrayValue"in n}function He(n){return!!n&&"nullValue"in n}function Ke(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function te(n){return!!n&&"mapValue"in n}function ht(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const t={mapValue:{fields:{}}};return Ht(n.mapValue.fields,((e,r)=>t.mapValue.fields[e]=ht(r))),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=ht(n.arrayValue.values[e]);return t}return{...n}}class We{constructor(t,e){this.position=t,this.inclusive=e}}/**
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
 */class Vn{}class q extends Vn{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new Ui(t,e,r):e==="array-contains"?new Bi(t,r):e==="in"?new ji(t,r):e==="not-in"?new zi(t,r):e==="array-contains-any"?new qi(t,r):new q(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new xi(t,r):new $i(t,r)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison($t(e,this.value)):e!==null&&et(this.value)===et(e)&&this.matchesComparison($t(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return b(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class vt extends Vn{constructor(t,e){super(),this.filters=t,this.op=e,this.C=null}static create(t,e){return new vt(t,e)}matches(t){return(function(r){return r.op==="and"})(this)?this.filters.find((e=>!e.matches(t)))===void 0:this.filters.find((e=>e.matches(t)))!==void 0}getFlattenedFilters(){return this.C!==null||(this.C=this.filters.reduce(((t,e)=>t.concat(e.getFlattenedFilters())),[])),this.C}getFilters(){return Object.assign([],this.filters)}}class Ui extends q{constructor(t,e,r){super(t,e,r),this.key=P.fromName(r.referenceValue)}matches(t){const e=P.comparator(t.key,this.key);return this.matchesComparison(e)}}class xi extends q{constructor(t,e){super(t,"in",e),this.keys=Rn("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}}class $i extends q{constructor(t,e){super(t,"not-in",e),this.keys=Rn("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}}function Rn(n,t){return(t.arrayValue?.values||[]).map((e=>P.fromName(e.referenceValue)))}class Bi extends q{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return vn(e)&&It(e.arrayValue,this.value)}}class ji extends q{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&It(this.value.arrayValue,e)}}class zi extends q{constructor(t,e){super(t,"not-in",e)}matches(t){if(It(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!It(this.value.arrayValue,e)}}class qi extends q{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!vn(e)||!e.arrayValue.values)&&e.arrayValue.values.some((r=>It(this.value.arrayValue,r)))}}/**
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
 */class oe{constructor(t,e="asc"){this.field=t,this.dir=e}}/**
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
 */class Bt{constructor(t,e){this.comparator=t,this.root=e||k.EMPTY}insert(t,e){return new Bt(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,k.BLACK,null,null))}remove(t){return new Bt(this.comparator,this.root.remove(t,this.comparator).copy(null,null,k.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(t,r.key);if(i===0)return e+r.left.size;i<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((e,r)=>(t(e,r),!1)))}toString(){const t=[];return this.inorderTraversal(((e,r)=>(t.push(`${e}:${r}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Dt(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Dt(this.root,t,this.comparator,!1)}getReverseIterator(){return new Dt(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Dt(this.root,t,this.comparator,!0)}}class Dt{constructor(t,e,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!t.isEmpty();)if(s=e?r(t.key,e):1,e&&i&&(s*=-1),s<0)t=this.isReverse?t.left:t.right;else{if(s===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class k{constructor(t,e,r,i,s){this.key=t,this.value=e,this.color=r??k.RED,this.left=i??k.EMPTY,this.right=s??k.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,i,s){return new k(t??this.key,e??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let i=this;const s=r(t,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(t,e,r),null):s===0?i.copy(null,e,null,null,null):i.copy(null,null,null,null,i.right.insert(t,e,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return k.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,i=this;if(e(t,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(t,e),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),e(t,i.key)===0){if(i.right.isEmpty())return k.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(t,e))}return i.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,k.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,k.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw b(43730,{key:this.key,value:this.value});if(this.right.isRed())throw b(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw b(27949);return t+(this.isRed()?0:1)}}k.EMPTY=null,k.RED=!0,k.BLACK=!1;k.EMPTY=new class{constructor(){this.size=0}get key(){throw b(57766)}get value(){throw b(16141)}get color(){throw b(16727)}get left(){throw b(29726)}get right(){throw b(36894)}copy(t,e,r,i,s){return this}insert(t,e,r){return new k(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class At{constructor(t){this.comparator=t,this.data=new Bt(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((e,r)=>(t(e),!1)))}forEachInRange(t,e){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,t[1])>=0)return;e(i.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Je(this.data.getIterator())}getIteratorFrom(t){return new Je(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach((r=>{e=e.add(r)})),e}isEqual(t){if(!(t instanceof At)||this.size!==t.size)return!1;const e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){const i=e.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const t=[];return this.forEach((e=>{t.push(e)})),t}toString(){const t=[];return this.forEach((e=>t.push(e))),"SortedSet("+t.toString()+")"}copy(t){const e=new At(this.comparator);return e.data=t,e}}class Je{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class Tt{constructor(t){this.fields=t,t.sort(L.comparator)}static empty(){return new Tt([])}unionWith(t){let e=new At(L.comparator);for(const r of this.fields)e=e.add(r);for(const r of t)e=e.add(r);return new Tt(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return _n(this.fields,t.fields,((e,r)=>e.isEqual(r)))}}/**
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
 */class j{constructor(t){this.value=t}static empty(){return new j({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!te(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=ht(e)}setAll(t){let e=L.emptyPath(),r={},i=[];t.forEach(((u,p)=>{if(!e.isImmediateParentOf(p)){const m=this.getFieldsMap(e);this.applyChanges(m,r,i),r={},i=[],e=p.popLast()}u?r[p.lastSegment()]=ht(u):i.push(p.lastSegment())}));const s=this.getFieldsMap(e);this.applyChanges(s,r,i)}delete(t){const e=this.field(t.popLast());te(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return xt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let i=e.mapValue.fields[t.get(r)];te(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=i),e=i}return e.mapValue.fields}applyChanges(t,e,r){Ht(e,((i,s)=>t[i]=s));for(const i of r)delete t[i]}clone(){return new j(ht(this.value))}}/**
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
 */class Gi{constructor(t,e=null,r=[],i=[],s=null,u=null,p=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=u,this.endAt=p,this.O=null}}function Qe(n,t=null,e=[],r=[],i=null,s=null,u=null){return new Gi(n,t,e,r,i,s,u)}/**
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
 */class Sn{constructor(t,e=null,r=[],i=[],s=null,u="F",p=null,m=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=u,this.startAt=p,this.endAt=m,this.q=null,this.L=null,this.B=null,this.startAt,this.endAt}}function Hi(n){return n.collectionGroup!==null}function Ki(n){const t=wt(n);if(t.q===null){t.q=[];const e=new Set;for(const s of t.explicitOrderBy)t.q.push(s),e.add(s.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(u){let p=new At(L.comparator);return u.filters.forEach((m=>{m.getFlattenedFilters().forEach((g=>{g.isInequality()&&(p=p.add(g.field))}))})),p})(t).forEach((s=>{e.has(s.canonicalString())||s.isKeyField()||t.q.push(new oe(s,r))})),e.has(L.keyField().canonicalString())||t.q.push(new oe(L.keyField(),r))}return t.q}function Wi(n){const t=wt(n);return t.L||(t.L=Ji(t,Ki(n))),t.L}function Ji(n,t){if(n.limitType==="F")return Qe(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map((i=>{const s=i.dir==="desc"?"asc":"desc";return new oe(i.field,s)}));const e=n.endAt?new We(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new We(n.startAt.position,n.startAt.inclusive):null;return Qe(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function ae(n,t){const e=n.filters.concat([t]);return new Sn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),e,n.limit,n.limitType,n.startAt,n.endAt)}/**
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
 */function Nn(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Lt(t)?"-0":t}}function Qi(n,t){return(function(r){return typeof r=="number"&&Number.isInteger(r)&&!Lt(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER})(t)?(function(r){return{integerValue:""+r}})(t):Nn(n,t)}/**
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
 */class Kt{constructor(){this._=void 0}}class Pn extends Kt{}class Yi extends Kt{constructor(t){super(),this.elements=t}}class Xi extends Kt{constructor(t){super(),this.elements=t}}class de extends Kt{constructor(t,e){super(),this.serializer=t,this.$=e}}class Zi extends de{}class ts extends de{}class es extends de{}/**
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
 */class ns{constructor(t,e){this.field=t,this.transform=e}}class ft{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new ft}static exists(t){return new ft(void 0,t)}static updateTime(t){return new ft(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}class Wt{}class Dn extends Wt{constructor(t,e,r,i=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Cn extends Wt{constructor(t,e,r,i,s=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}class rs extends Wt{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class is extends Wt{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */const ss={asc:"ASCENDING",desc:"DESCENDING"},os={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},as={and:"AND",or:"OR"};class ls{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function le(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function us(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function cs(n,t){return le(n,t.toTimestamp())}function dt(n){return x(!!n,49232),O.fromTimestamp((function(e){const r=tt(e);return new S(r.seconds,r.nanos)})(n))}function pe(n,t){return ue(n,t).canonicalString()}function ue(n,t){const e=(function(i){return new v(["projects",i.projectId,"databases",i.database])})(n).child("documents");return t===void 0?e:e.child(t)}function jt(n,t){return pe(n.databaseId,t.path)}function ce(n,t){const e=(function(i){const s=v.fromString(i);return x(kn(s),10190,{key:s.toString()}),s})(t);if(e.get(1)!==n.databaseId.projectId)throw new E(_.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new E(_.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new P((function(i){return x(i.length>4&&i.get(4)==="documents",29091,{key:i.toString()}),i.popFirst(5)})(e))}function Ye(n,t,e){return{name:jt(n,t),fields:e.value.mapValue.fields}}function hs(n,t){return"found"in t?(function(r,i){x(!!i.found,43571),i.found.name,i.found.updateTime;const s=ce(r,i.found.name),u=dt(i.found.updateTime),p=i.found.createTime?dt(i.found.createTime):O.min(),m=new j({mapValue:{fields:i.found.fields}});return H.newFoundDocument(s,u,p,m)})(n,t):"missing"in t?(function(r,i){x(!!i.missing,3894),x(!!i.readTime,22933);const s=ce(r,i.missing),u=dt(i.readTime);return H.newNoDocument(s,u)})(n,t):b(7234,{result:t})}function fs(n,t){let e;if(t instanceof Dn)e={update:Ye(n,t.key,t.value)};else if(t instanceof rs)e={delete:jt(n,t.key)};else if(t instanceof Cn)e={update:Ye(n,t.key,t.data),updateMask:_s(t.fieldMask)};else{if(!(t instanceof is))return b(16599,{M:t.type});e={verify:jt(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map((r=>(function(s,u){const p=u.transform;if(p instanceof Pn)return{fieldPath:u.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(p instanceof Yi)return{fieldPath:u.field.canonicalString(),appendMissingElements:{values:p.elements}};if(p instanceof Xi)return{fieldPath:u.field.canonicalString(),removeAllFromArray:{values:p.elements}};if(p instanceof Zi)return{fieldPath:u.field.canonicalString(),increment:p.$};if(p instanceof ts)return{fieldPath:u.field.canonicalString(),minimum:p.$};if(p instanceof es)return{fieldPath:u.field.canonicalString(),maximum:p.$};throw b(20930,{transform:u.transform})})(0,r)))),t.precondition.isNone||(e.currentDocument=(function(i,s){return s.updateTime!==void 0?{updateTime:cs(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:b(27497)})(n,t.precondition)),e}function ds(n,t){const e={structuredQuery:{}},r=t.path;let i;t.collectionGroup!==null?(i=r,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i=r.popLast(),e.structuredQuery.from=[{collectionId:r.lastSegment()}]),e.parent=(function(g,y){return pe(g.databaseId,y)})(n,i);const s=(function(g){if(g.length!==0)return On(vt.create(g,"and"))})(t.filters);s&&(e.structuredQuery.where=s);const u=(function(g){if(g.length!==0)return g.map((y=>(function(w){return{field:rt(w.field),direction:ps(w.dir)}})(y)))})(t.orderBy);u&&(e.structuredQuery.orderBy=u);const p=(function(g,y){return g.useProto3Json||Di(y)?y:{value:y}})(n,t.limit);return p!==null&&(e.structuredQuery.limit=p),t.startAt&&(e.structuredQuery.startAt=(function(g){return{before:g.inclusive,values:g.position}})(t.startAt)),t.endAt&&(e.structuredQuery.endAt=(function(g){return{before:!g.inclusive,values:g.position}})(t.endAt)),{U:e,parent:i}}function ps(n){return ss[n]}function ms(n){return os[n]}function gs(n){return as[n]}function rt(n){return{fieldPath:n.canonicalString()}}function On(n){return n instanceof q?(function(e){if(e.op==="=="){if(Ke(e.value))return{unaryFilter:{field:rt(e.field),op:"IS_NAN"}};if(He(e.value))return{unaryFilter:{field:rt(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(Ke(e.value))return{unaryFilter:{field:rt(e.field),op:"IS_NOT_NAN"}};if(He(e.value))return{unaryFilter:{field:rt(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:rt(e.field),op:ms(e.op),value:e.value}}})(n):n instanceof vt?(function(e){const r=e.getFilters().map((i=>On(i)));return r.length===1?r[0]:{compositeFilter:{op:gs(e.op),filters:r}}})(n):b(54877,{filter:n})}function _s(n){const t=[];return n.fields.forEach((e=>t.push(e.canonicalString()))),{fieldPaths:t}}function kn(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function Fn(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}/**
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
 */function me(n){return new ls(n,!0)}/**
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
 */class ys{}class Es extends ys{constructor(t,e,r,i){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=i,this.k=!1}j(){if(this.k)throw new E(_.FAILED_PRECONDITION,"The client has already been terminated.")}I(t,e,r,i){return this.j(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([s,u])=>this.connection.I(t,ue(e,r),i,s,u))).catch((s=>{throw s.name==="FirebaseError"?(s.code===_.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new E(_.UNKNOWN,s.toString())}))}D(t,e,r,i,s){return this.j(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([u,p])=>this.connection.D(t,ue(e,r),i,u,p,s))).catch((u=>{throw u.name==="FirebaseError"?(u.code===_.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),u):new E(_.UNKNOWN,u.toString())}))}terminate(){this.k=!0,this.connection.terminate()}}async function Is(n,t){const e=wt(n),r={writes:t.map((i=>fs(e.serializer,i)))};await e.I("Commit",e.serializer.databaseId,v.emptyPath(),r)}async function As(n,t){const e=wt(n),r={documents:t.map((p=>jt(e.serializer,p)))},i=await e.D("BatchGetDocuments",e.serializer.databaseId,v.emptyPath(),r,t.length),s=new Map;i.forEach((p=>{const m=hs(e.serializer,p);s.set(m.key.toString(),m)}));const u=[];return t.forEach((p=>{const m=s.get(p.toString());x(!!m,55234,{key:p}),u.push(m)})),u}async function Ts(n,t){const e=wt(n),{U:r,parent:i}=ds(e.serializer,Wi(t));return(await e.D("RunQuery",e.serializer.databaseId,i,{structuredQuery:r.structuredQuery})).filter((s=>!!s.document)).map((s=>(function(p,m,g){const y=ce(p,m.name),I=dt(m.updateTime),w=m.createTime?dt(m.createTime):O.min(),U=new j({mapValue:{fields:m.fields}}),D=H.newFoundDocument(y,I,w,U);return g?D.setHasCommittedMutations():D})(e.serializer,s.document,void 0)))}/**
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
 */const Mn="ComponentProvider",pt=new Map;function ge(n){if(n._terminated)throw new E(_.FAILED_PRECONDITION,"The client has already been terminated.");if(!pt.has(n)){Mt(Mn,"Initializing Datastore");const t=(function(s){return new ki(s)})((function(s,u,p,m,g){return new wi(s,u,p,g.host,g.ssl,g.experimentalForceLongPolling,g.experimentalAutoDetectLongPolling,In(g.experimentalLongPollingOptions),g.useFetchStreams,g.isUsingEmulator,m)})(n._databaseId,n.app.options.appId||"",n._persistenceKey,n.app.options.apiKey,n._freezeSettings())),e=me(n._databaseId),r=(function(s,u,p,m){return new Es(s,u,p,m)})(n._authCredentials,n._appCheckCredentials,t,e);pt.set(n,r)}return pt.get(n)}const ws=1048576,Ln="firestore.googleapis.com",Xe=!0;class Ze{constructor(t){if(t.host===void 0){if(t.ssl!==void 0)throw new E(_.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Ln,this.ssl=Xe}else this.host=t.host,this.ssl=t.ssl??Xe;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<ws)throw new E(_.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}(function(r,i,s,u){if(i===!0&&u===!0)throw new E(_.INVALID_ARGUMENT,`${r} and ${s} cannot be used together.`)})("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=In(t.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new E(_.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new E(_.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new E(_.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(function(r,i){return r.timeoutSeconds===i.timeoutSeconds})(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class Jt{constructor(t,e,r,i){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ze({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new E(_.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new E(_.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ze(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new _i;switch(r.type){case"firstParty":return new Ai(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new E(_.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(e){const r=pt.get(e);r&&(Mt(Mn,"Removing Datastore"),pt.delete(e),r.terminate())})(this),Promise.resolve()}}function js(n,t){const e=typeof n=="object"?n:si(),r=typeof n=="string"?n:"(default)",i=Zr(e,"firestore/lite").getImmediate({identifier:r});if(!i._initialized){const s=sr("firestore");s&&bs(i,...s)}return i}function bs(n,t,e,r={}){n=Gt(n,Jt);const i=un(t),s=n._getSettings(),u={...s,emulatorOptions:n._getEmulatorOptions()},p=`${t}:${e}`;i&&dr(`https://${p}`),s.host!==Ln&&s.host!==p&&pn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const m={...s,host:p,ssl:i,emulatorOptions:r};if(!Ot(m,u)&&(n._setSettings(m),r.mockUserToken)){let g,y;if(typeof r.mockUserToken=="string")g=r.mockUserToken,y=M.MOCK_USER;else{g=ar(r.mockUserToken,n._app?.options.projectId);const I=r.mockUserToken.sub||r.mockUserToken.user_id;if(!I)throw new E(_.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");y=new M(I)}n._authCredentials=new yi(new gn(g,y))}}/**
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
 */class ut{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new ut(this.firestore,t,this._query)}}class N{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new W(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new N(this.firestore,t,this._key)}toJSON(){return{type:N._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,r){if(bt(e,N._jsonSchema))return new N(t,r||null,new P(v.fromString(e.referencePath)))}}N._jsonSchemaVersion="firestore/documentReference/1.0",N._jsonSchema={type:B("string",N._jsonSchemaVersion),referencePath:B("string")};class W extends ut{constructor(t,e,r){super(t,e,(function(s){return new Sn(s)})(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new N(this.firestore,null,new P(t))}withConverter(t){return new W(this.firestore,t,this._path)}}function zs(n,t,...e){if(n=st(n),yn("collection","path",t),n instanceof Jt){const r=v.fromString(t,...e);return Le(r),new W(n,null,r)}{if(!(n instanceof N||n instanceof W))throw new E(_.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(v.fromString(t,...e));return Le(r),new W(n.firestore,null,r)}}function vs(n,t,...e){if(n=st(n),arguments.length===1&&(t=Vi.newId()),yn("doc","path",t),n instanceof Jt){const r=v.fromString(t,...e);return Me(r),new N(n,null,new P(r))}{if(!(n instanceof N||n instanceof W))throw new E(_.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(v.fromString(t,...e));return Me(r),new N(n.firestore,n instanceof W?n.converter:null,new P(r))}}/**
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
 */class Un{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new E(_.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new L(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
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
 */class _e{constructor(t){this._methodName=t}}/**
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
 */class z{constructor(t){this._values=(t||[]).map((e=>e))}toArray(){return this._values.map((t=>t))}isEqual(t){/**
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
*/return(function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0})(this._values,t._values)}toJSON(){return{type:z._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(bt(t,z._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every((e=>typeof e=="number")))return new z(t.vectorValues);throw new E(_.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}z._jsonSchemaVersion="firestore/vectorValue/1.0",z._jsonSchema={type:B("string",z._jsonSchemaVersion),vectorValues:B("object")};/**
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
 */const Vs=/^__.*__$/;class Rs{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return this.fieldMask!==null?new Cn(t,this.data,this.fieldMask,e,this.fieldTransforms):new Dn(t,this.data,e,this.fieldTransforms)}}function xn(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw b(40011,{dataSource:n})}}class ye{constructor(t,e,r,i,s,u){this.settings=t,this.databaseId=e,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.G(),this.fieldTransforms=s||[],this.fieldMask=u||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}ne(t){return new ye({...this.settings,...t},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}J(t){const e=this.path?.child(t),r=this.ne({path:e,arrayElement:!1});return r.H(t),r}Y(t){const e=this.path?.child(t),r=this.ne({path:e,arrayElement:!1});return r.G(),r}X(t){return this.ne({path:void 0,arrayElement:!0})}Z(t){return zt(t,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(t){return this.fieldMask.find((e=>t.isPrefixOf(e)))!==void 0||this.fieldTransforms.find((e=>t.isPrefixOf(e.field)))!==void 0}G(){if(this.path)for(let t=0;t<this.path.length;t++)this.H(this.path.get(t))}H(t){if(t.length===0)throw this.Z("Document fields must not be empty");if(xn(this.dataSource)&&Vs.test(t))throw this.Z('Document fields cannot begin and end with "__"')}}class Ss{constructor(t,e,r){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=r||me(t)}ce(t,e,r,i=!1){return new ye({dataSource:t,methodName:e,targetDoc:r,path:L.emptyPath(),arrayElement:!1,hasConverter:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function $n(n){const t=n._freezeSettings(),e=me(n._databaseId);return new Ss(n._databaseId,!!t.ignoreUndefinedProperties,e)}function Ns(n,t,e,r,i,s={}){const u=n.ce(s.merge||s.mergeFields?2:0,t,e,i);zn("Data must be an object, but it was:",u,r);const p=Bn(r,u);let m,g;if(s.merge)m=new Tt(u.fieldMask),g=u.fieldTransforms;else if(s.mergeFields){const y=[];for(const I of s.mergeFields){const w=Ae(t,I,e);if(!u.contains(w))throw new E(_.INVALID_ARGUMENT,`Field '${w}' is specified in your field mask but missing from your input data.`);Os(y,w)||y.push(w)}m=new Tt(y),g=u.fieldTransforms.filter((I=>m.covers(I.field)))}else m=null,g=u.fieldTransforms;return new Rs(new j(p),m,g)}class Ee extends _e{_toFieldTransform(t){return new ns(t.path,new Pn)}isEqual(t){return t instanceof Ee}}function Ps(n,t,e,r=!1){return Ie(e,n.ce(r?4:3,t))}function Ie(n,t){if(jn(n=st(n)))return zn("Unsupported field value:",t,n),Bn(n,t);if(n instanceof _e)return(function(r,i){if(!xn(i.dataSource))throw i.Z(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Z(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)})(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.arrayElement&&t.dataSource!==4)throw t.Z("Nested arrays are not supported");return(function(r,i){const s=[];let u=0;for(const p of r){let m=Ie(p,i.X(u));m==null&&(m={nullValue:"NULL_VALUE"}),s.push(m),u++}return{arrayValue:{values:s}}})(n,t)}return(function(r,i){if((r=st(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Qi(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=S.fromDate(r);return{timestampValue:le(i.serializer,s)}}if(r instanceof S){const s=new S(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:le(i.serializer,s)}}if(r instanceof K)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof $)return{bytesValue:us(i.serializer,r._byteString)};if(r instanceof N){const s=i.databaseId,u=r.firestore._databaseId;if(!u.isEqual(s))throw i.Z(`Document reference is for database ${u.projectId}/${u.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:pe(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof z)return(function(u,p){const m=u instanceof z?u.toArray():u;return{mapValue:{fields:{[wn]:{stringValue:bn},[Ut]:{arrayValue:{values:m.map((y=>{if(typeof y!="number")throw p.Z("VectorValues must only contain numeric values.");return Nn(p.serializer,y)}))}}}}}})(r,i);if(Fn(r))return r._toProto(i.serializer);throw i.Z(`Unsupported field value: ${qt(r)}`)})(n,t)}function Bn(n,t){const e={};return(function(i){for(const s in i)if(Object.prototype.hasOwnProperty.call(i,s))return!1;return!0})(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):Ht(n,((r,i)=>{const s=Ie(i,t.J(r));s!=null&&(e[r]=s)})),{mapValue:{fields:e}}}function jn(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof S||n instanceof K||n instanceof $||n instanceof N||n instanceof _e||n instanceof z||Fn(n))}function zn(n,t,e){if(!jn(e)||!En(e)){const r=qt(e);throw r==="an object"?t.Z(n+" a custom object"):t.Z(n+" "+r)}}function Ae(n,t,e){if((t=st(t))instanceof Un)return t._internalPath;if(typeof t=="string")return Cs(n,t);throw zt("Field path arguments must be of type string or ",n,!1,void 0,e)}const Ds=new RegExp("[~\\*/\\[\\]]");function Cs(n,t,e){if(t.search(Ds)>=0)throw zt(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new Un(...t.split("."))._internalPath}catch{throw zt(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function zt(n,t,e,r,i){const s=r&&!r.isEmpty(),u=i!==void 0;let p=`Function ${t}() called with invalid data`;e&&(p+=" (via `toFirestore()`)"),p+=". ";let m="";return(s||u)&&(m+=" (found",s&&(m+=` in field ${r}`),u&&(m+=` in document ${i}`),m+=")"),new E(_.INVALID_ARGUMENT,p+n+m)}function Os(n,t){return n.some((e=>e.isEqual(t)))}/**
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
 */class qn{constructor(t,e,r,i,s){this._firestore=t,this._userDataWriter=e,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new N(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new Gn(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){return this._document?.data.clone().value.mapValue.fields??void 0}get(t){if(this._document){const e=this._document.data.field(Ae("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class Gn extends qn{data(){return super.data()}}class ks{constructor(t,e){this._docs=e,this.query=t}get docs(){return[...this._docs]}get size(){return this.docs.length}get empty(){return this.docs.length===0}forEach(t,e){this._docs.forEach(t,e)}}/**
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
 */class Te{}class Fs extends Te{}function qs(n,t,...e){let r=[];t instanceof Te&&r.push(t),r=r.concat(e),(function(s){const u=s.filter((m=>m instanceof we)).length,p=s.filter((m=>m instanceof Qt)).length;if(u>1||u>0&&p>0)throw new E(_.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const i of r)n=i._apply(n);return n}class Qt extends Fs{constructor(t,e,r){super(),this._field=t,this._op=e,this._value=r,this.type="where"}static _create(t,e,r){return new Qt(t,e,r)}_apply(t){const e=this._parse(t);return Hn(t._query,e),new ut(t.firestore,t.converter,ae(t._query,e))}_parse(t){const e=$n(t.firestore);return(function(s,u,p,m,g,y,I){let w;if(g.isKeyField()){if(y==="array-contains"||y==="array-contains-any")throw new E(_.INVALID_ARGUMENT,`Invalid Query. You can't perform '${y}' queries on documentId().`);if(y==="in"||y==="not-in"){en(I,y);const D=[];for(const F of I)D.push(tn(m,s,F));w={arrayValue:{values:D}}}else w=tn(m,s,I)}else y!=="in"&&y!=="not-in"&&y!=="array-contains-any"||en(I,y),w=Ps(p,u,I,y==="in"||y==="not-in");return q.create(g,y,w)})(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}function Gs(n,t,e){const r=t,i=Ae("where",n);return Qt._create(i,r,e)}class we extends Te{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new we(t,e)}_parse(t){const e=this._queryConstraints.map((r=>r._parse(t))).filter((r=>r.getFilters().length>0));return e.length===1?e[0]:vt.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return e.getFilters().length===0?t:((function(i,s){let u=i;const p=s.getFlattenedFilters();for(const m of p)Hn(u,m),u=ae(u,m)})(t._query,e),new ut(t.firestore,t.converter,ae(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function tn(n,t,e){if(typeof(e=st(e))=="string"){if(e==="")throw new E(_.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Hi(t)&&e.indexOf("/")!==-1)throw new E(_.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);const r=t.path.child(v.fromString(e));if(!P.isDocumentKey(r))throw new E(_.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Ge(n,new P(r))}if(e instanceof N)return Ge(n,e._key);throw new E(_.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${qt(e)}.`)}function en(n,t){if(!Array.isArray(n)||n.length===0)throw new E(_.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function Hn(n,t){const e=(function(i,s){for(const u of i)for(const p of u.getFlattenedFilters())if(s.indexOf(p.op)>=0)return p.op;return null})(n.filters,(function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(t.op));if(e!==null)throw e===t.op?new E(_.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new E(_.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${e.toString()}' filters.`)}class Ms{convertValue(t,e="none"){switch(et(t)){case 0:return null;case 1:return t.booleanValue;case 2:return R(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(yt(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw b(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const r={};return Ht(t,((i,s)=>{r[i]=this.convertValue(s,e)})),r}convertVectorValue(t){const e=t.fields?.[Ut].arrayValue?.values?.map((r=>R(r.doubleValue)));return new z(e)}convertGeoPoint(t){return new K(R(t.latitude),R(t.longitude))}convertArray(t,e){return(t.values||[]).map((r=>this.convertValue(r,e)))}convertServerTimestamp(t,e){switch(e){case"previous":const r=Tn(t);return r==null?null:this.convertValue(r,e);case"estimate":return this.convertTimestamp(Et(t));default:return null}}convertTimestamp(t){const e=tt(t);return new S(e.seconds,e.nanos)}convertDocumentKey(t,e){const r=v.fromString(t);x(kn(r),9688,{name:t});const i=new _t(r.get(1),r.get(3)),s=new P(r.popFirst(5));return i.isEqual(e)||he(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),s}}/**
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
 */function Ls(n,t,e){let r;return r=n?n.toFirestore(t):t,r}class Kn extends Ms{constructor(t){super(),this.firestore=t}convertBytes(t){return new $(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new N(this.firestore,null,e)}}function Hs(n){const t=ge((n=Gt(n,N)).firestore),e=new Kn(n.firestore);return As(t,[n._key]).then((r=>{x(r.length===1,15618);const i=r[0];return new qn(n.firestore,e,n._key,i.isFoundDocument()?i:null,n.converter)}))}function Ks(n){(function(i){if(i.limitType==="L"&&i.explicitOrderBy.length===0)throw new E(_.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")})((n=Gt(n,ut))._query);const t=ge(n.firestore),e=new Kn(n.firestore);return Ts(t,n._query).then((r=>{const i=r.map((s=>new Gn(n.firestore,e,s.key,s,n.converter)));return n._query.limitType==="L"&&i.reverse(),new ks(n,i)}))}function Ws(n,t){const e=vs(n=Gt(n,W)),r=Ls(n.converter,t),i=Ns($n(n.firestore),"addDoc",e._key,r,e.converter!==null,{});return Is(ge(n.firestore),[i.toMutation(e._key,ft.exists(!1))]).then((()=>e))}function Js(){return new Ee("serverTimestamp")}const nn="4.15.0";(function(){gi(`${ri}_lite`),Ft(new mt("firestore/lite",((t,{instanceIdentifier:e,options:r})=>{const i=t.getProvider("app").getImmediate(),s=new Jt(new Ei(t.getProvider("auth-internal")),new Ti(i,t.getProvider("app-check-internal")),bi(i,e),i);return r&&s._setSettings(r),s}),"PUBLIC").setMultipleInstances(!0)),it("firestore-lite",nn,""),it("firestore-lite",nn,"esm2020")})();var Us="firebase",xs="12.14.0";/**
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
 */it(Us,xs,"app");export{Ks as a,Hs as b,zs as c,vs as d,Ws as e,js as g,ii as i,qs as q,Js as s,Gs as w};
