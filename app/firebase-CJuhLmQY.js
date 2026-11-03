import{o as qr}from"./librerias-CEAL7kXT.js";const Gr=()=>{};var we={};/**
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
 */const er=function(r){const t=[];let e=0;for(let n=0;n<r.length;n++){let i=r.charCodeAt(n);i<128?t[e++]=i:i<2048?(t[e++]=i>>6|192,t[e++]=i&63|128):(i&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(i=65536+((i&1023)<<10)+(r.charCodeAt(++n)&1023),t[e++]=i>>18|240,t[e++]=i>>12&63|128,t[e++]=i>>6&63|128,t[e++]=i&63|128):(t[e++]=i>>12|224,t[e++]=i>>6&63|128,t[e++]=i&63|128)}return t},Hr=function(r){const t=[];let e=0,n=0;for(;e<r.length;){const i=r[e++];if(i<128)t[n++]=String.fromCharCode(i);else if(i>191&&i<224){const s=r[e++];t[n++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=r[e++],u=r[e++],p=r[e++],m=((i&7)<<18|(s&63)<<12|(u&63)<<6|p&63)-65536;t[n++]=String.fromCharCode(55296+(m>>10)),t[n++]=String.fromCharCode(56320+(m&1023))}else{const s=r[e++],u=r[e++];t[n++]=String.fromCharCode((i&15)<<12|(s&63)<<6|u&63)}}return t.join("")},rr={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,t){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let i=0;i<r.length;i+=3){const s=r[i],u=i+1<r.length,p=u?r[i+1]:0,m=i+2<r.length,g=m?r[i+2]:0,y=s>>2,I=(s&3)<<4|p>>4;let w=(p&15)<<2|g>>6,U=g&63;m||(U=64,u||(w=64)),n.push(e[y],e[I],e[w],e[U])}return n.join("")},encodeString(r,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(r):this.encodeByteArray(er(r),t)},decodeString(r,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(r):Hr(this.decodeStringToByteArray(r,t))},decodeStringToByteArray(r,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let i=0;i<r.length;){const s=e[r.charAt(i++)],p=i<r.length?e[r.charAt(i)]:0;++i;const g=i<r.length?e[r.charAt(i)]:64;++i;const I=i<r.length?e[r.charAt(i)]:64;if(++i,s==null||p==null||g==null||I==null)throw new Kr;const w=s<<2|p>>4;if(n.push(w),g!==64){const U=p<<4&240|g>>2;if(n.push(U),I!==64){const D=g<<6&192|I;n.push(D)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class Kr extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Wr=function(r){const t=er(r);return rr.encodeByteArray(t,!0)},Pt=function(r){return Wr(r).replace(/\./g,"")},Jr=function(r){try{return rr.decodeString(r,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
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
 */function Qr(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Yr=()=>Qr().__FIREBASE_DEFAULTS__,Xr=()=>{if(typeof process>"u"||typeof we>"u")return;const r=we.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},Zr=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=r&&Jr(r[1]);return t&&JSON.parse(t)},nr=()=>{try{return Gr()||Yr()||Xr()||Zr()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},tn=r=>nr()?.emulatorHosts?.[r],en=r=>{const t=tn(r);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const n=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),n]:[t.substring(0,e),n]},ir=()=>nr()?.config;/**
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
 */class rn{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,n)=>{e?this.reject(e):this.resolve(n),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,n))}}}/**
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
 */function nn(r,t){if(r.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},n=t||"demo-project",i=r.iat||0,s=r.sub||r.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const u={iss:`https://securetoken.google.com/${n}`,aud:n,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...r};return[Pt(JSON.stringify(e)),Pt(JSON.stringify(u)),""].join(".")}function sn(){try{return typeof indexedDB=="object"}catch{return!1}}function on(){return new Promise((r,t)=>{try{let e=!0;const n="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(n);i.onsuccess=()=>{i.result.close(),e||self.indexedDB.deleteDatabase(n),r(!0)},i.onupgradeneeded=()=>{e=!1},i.onerror=()=>{t(i.error?.message||"")}}catch(e){t(e)}})}/**
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
 */const an="FirebaseError";class at extends Error{constructor(t,e,n){super(e),this.code=t,this.customData=n,this.name=an,Object.setPrototypeOf(this,at.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,sr.prototype.create)}}class sr{constructor(t,e,n){this.service=t,this.serviceName=e,this.errors=n}create(t,...e){const n=e[0]||{},i=`${this.service}/${t}`,s=this.errors[t],u=s?ln(s,n):"Error",p=`${this.serviceName}: ${u} (${i}).`;return new at(i,p,n)}}function ln(r,t){return r.replace(un,(e,n)=>{const i=t[n];return i!=null?String(i):`<${n}?>`})}const un=/\{\$([^}]+)}/g;function Dt(r,t){if(r===t)return!0;const e=Object.keys(r),n=Object.keys(t);for(const i of e){if(!n.includes(i))return!1;const s=r[i],u=t[i];if(be(s)&&be(u)){if(!Dt(s,u))return!1}else if(s!==u)return!1}for(const i of n)if(!e.includes(i))return!1;return!0}function be(r){return r!==null&&typeof r=="object"}/**
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
 */function st(r){return r&&r._delegate?r._delegate:r}/**
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
 */function or(r){try{return(r.startsWith("http://")||r.startsWith("https://")?new URL(r).hostname:r).endsWith(".cloudworkstations.dev")}catch{return!1}}async function cn(r){return(await fetch(r,{credentials:"include"})).ok}class pt{constructor(t,e,n){this.name=t,this.instanceFactory=e,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
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
 */class hn{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const n=new rn;if(this.instancesDeferred.set(e,n),this.isInitialized(e)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:e});i&&n.resolve(i)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){const e=this.normalizeInstanceIdentifier(t?.identifier),n=t?.optional??!1;if(this.isInitialized(e)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:e})}catch(i){if(n)return null;throw i}else{if(n)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(dn(t))try{this.getOrInitializeService({instanceIdentifier:Z})}catch{}for(const[e,n]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(e);try{const s=this.getOrInitializeService({instanceIdentifier:i});n.resolve(s)}catch{}}}}clearInstance(t=Z){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=Z){return this.instances.has(t)}getOptions(t=Z){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,n=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:n,options:e});for(const[s,u]of this.instancesDeferred.entries()){const p=this.normalizeInstanceIdentifier(s);n===p&&u.resolve(i)}return i}onInit(t,e){const n=this.normalizeInstanceIdentifier(e),i=this.onInitCallbacks.get(n)??new Set;i.add(t),this.onInitCallbacks.set(n,i);const s=this.instances.get(n);return s&&t(s,n),()=>{i.delete(t)}}invokeOnInitCallbacks(t,e){const n=this.onInitCallbacks.get(e);if(n)for(const i of n)try{i(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let n=this.instances.get(t);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:fn(t),options:e}),this.instances.set(t,n),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(n,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,n)}catch{}return n||null}normalizeInstanceIdentifier(t=Z){return this.component?this.component.multipleInstances?t:Z:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function fn(r){return r===Z?void 0:r}function dn(r){return r.instantiationMode==="EAGER"}/**
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
 */class pn{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new hn(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var T;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(T||(T={}));const mn={debug:T.DEBUG,verbose:T.VERBOSE,info:T.INFO,warn:T.WARN,error:T.ERROR,silent:T.SILENT},gn=T.INFO,_n={[T.DEBUG]:"log",[T.VERBOSE]:"log",[T.INFO]:"info",[T.WARN]:"warn",[T.ERROR]:"error"},yn=(r,t,...e)=>{if(t<r.logLevel)return;const n=new Date().toISOString(),i=_n[t];if(i)console[i](`[${n}]  ${r.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class ar{constructor(t){this.name=t,this._logLevel=gn,this._logHandler=yn,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in T))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?mn[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,T.DEBUG,...t),this._logHandler(this,T.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,T.VERBOSE,...t),this._logHandler(this,T.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,T.INFO,...t),this._logHandler(this,T.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,T.WARN,...t),this._logHandler(this,T.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,T.ERROR,...t),this._logHandler(this,T.ERROR,...t)}}/**
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
 */class En{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(In(e)){const n=e.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(e=>e).join(" ")}}function In(r){return r.getComponent()?.type==="VERSION"}const Xt="@firebase/app",ve="0.14.13";/**
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
 */const K=new ar("@firebase/app"),An="@firebase/app-compat",Tn="@firebase/analytics-compat",wn="@firebase/analytics",bn="@firebase/app-check-compat",vn="@firebase/app-check",Vn="@firebase/auth",Rn="@firebase/auth-compat",Sn="@firebase/database",Nn="@firebase/data-connect",Pn="@firebase/database-compat",Dn="@firebase/functions",Cn="@firebase/functions-compat",On="@firebase/installations",kn="@firebase/installations-compat",Fn="@firebase/messaging",Mn="@firebase/messaging-compat",Ln="@firebase/performance",Un="@firebase/performance-compat",xn="@firebase/remote-config",$n="@firebase/remote-config-compat",Bn="@firebase/storage",jn="@firebase/storage-compat",zn="@firebase/firestore",qn="@firebase/ai",Gn="@firebase/firestore-compat",Hn="firebase",Kn="12.14.0";/**
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
 */const Zt="[DEFAULT]",Wn={[Xt]:"fire-core",[An]:"fire-core-compat",[wn]:"fire-analytics",[Tn]:"fire-analytics-compat",[vn]:"fire-app-check",[bn]:"fire-app-check-compat",[Vn]:"fire-auth",[Rn]:"fire-auth-compat",[Sn]:"fire-rtdb",[Nn]:"fire-data-connect",[Pn]:"fire-rtdb-compat",[Dn]:"fire-fn",[Cn]:"fire-fn-compat",[On]:"fire-iid",[kn]:"fire-iid-compat",[Fn]:"fire-fcm",[Mn]:"fire-fcm-compat",[Ln]:"fire-perf",[Un]:"fire-perf-compat",[xn]:"fire-rc",[$n]:"fire-rc-compat",[Bn]:"fire-gcs",[jn]:"fire-gcs-compat",[zn]:"fire-fst",[Gn]:"fire-fst-compat",[qn]:"fire-vertex","fire-js":"fire-js",[Hn]:"fire-js-all"};/**
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
 */const Ct=new Map,Jn=new Map,te=new Map;function Ve(r,t){try{r.container.addComponent(t)}catch(e){K.debug(`Component ${t.name} failed to register with FirebaseApp ${r.name}`,e)}}function Ot(r){const t=r.name;if(te.has(t))return K.debug(`There were multiple attempts to register component ${t}.`),!1;te.set(t,r);for(const e of Ct.values())Ve(e,r);for(const e of Jn.values())Ve(e,r);return!0}function Qn(r,t){const e=r.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),r.container.getProvider(t)}function Yn(r){return r==null?!1:r.settings!==void 0}/**
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
 */const Xn={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Q=new sr("app","Firebase",Xn);/**
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
 */class Zn{constructor(t,e,n){this._isDeleted=!1,this._options={...t},this._config={...e},this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new pt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw Q.create("app-deleted",{appName:this._name})}}/**
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
 */const ti=Kn;function ei(r,t={}){let e=r;typeof t!="object"&&(t={name:t});const n={name:Zt,automaticDataCollectionEnabled:!0,...t},i=n.name;if(typeof i!="string"||!i)throw Q.create("bad-app-name",{appName:String(i)});if(e||(e=ir()),!e)throw Q.create("no-options");const s=Ct.get(i);if(s){if(Dt(e,s.options)&&Dt(n,s.config))return s;throw Q.create("duplicate-app",{appName:i})}const u=new pn(i);for(const m of te.values())u.addComponent(m);const p=new Zn(e,n,u);return Ct.set(i,p),p}function ri(r=Zt){const t=Ct.get(r);if(!t&&r===Zt&&ir())return ei();if(!t)throw Q.create("no-app",{appName:r});return t}function it(r,t,e){let n=Wn[r]??r;e&&(n+=`-${e}`);const i=n.match(/\s|\//),s=t.match(/\s|\//);if(i||s){const u=[`Unable to register library "${n}" with version "${t}":`];i&&u.push(`library name "${n}" contains illegal characters (whitespace or "/")`),i&&s&&u.push("and"),s&&u.push(`version name "${t}" contains illegal characters (whitespace or "/")`),K.warn(u.join(" "));return}Ot(new pt(`${n}-version`,()=>({library:n,version:t}),"VERSION"))}/**
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
 */const ni="firebase-heartbeat-database",ii=1,mt="firebase-heartbeat-store";let Wt=null;function lr(){return Wt||(Wt=qr(ni,ii,{upgrade:(r,t)=>{switch(t){case 0:try{r.createObjectStore(mt)}catch(e){console.warn(e)}}}}).catch(r=>{throw Q.create("idb-open",{originalErrorMessage:r.message})})),Wt}async function si(r){try{const e=(await lr()).transaction(mt),n=await e.objectStore(mt).get(ur(r));return await e.done,n}catch(t){if(t instanceof at)K.warn(t.message);else{const e=Q.create("idb-get",{originalErrorMessage:t?.message});K.warn(e.message)}}}async function Re(r,t){try{const n=(await lr()).transaction(mt,"readwrite");await n.objectStore(mt).put(t,ur(r)),await n.done}catch(e){if(e instanceof at)K.warn(e.message);else{const n=Q.create("idb-set",{originalErrorMessage:e?.message});K.warn(n.message)}}}function ur(r){return`${r.name}!${r.options.appId}`}/**
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
 */const oi=1024,ai=30;class li{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new ci(e),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){try{const e=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),n=Se();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===n||this._heartbeatsCache.heartbeats.some(i=>i.date===n))return;if(this._heartbeatsCache.heartbeats.push({date:n,agent:e}),this._heartbeatsCache.heartbeats.length>ai){const i=hi(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(i,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(t){K.warn(t)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Se(),{heartbeatsToSend:e,unsentEntries:n}=ui(this._heartbeatsCache.heartbeats),i=Pt(JSON.stringify({version:2,heartbeats:e}));return this._heartbeatsCache.lastSentHeartbeatDate=t,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return K.warn(t),""}}}function Se(){return new Date().toISOString().substring(0,10)}function ui(r,t=oi){const e=[];let n=r.slice();for(const i of r){const s=e.find(u=>u.agent===i.agent);if(s){if(s.dates.push(i.date),Ne(e)>t){s.dates.pop();break}}else if(e.push({agent:i.agent,dates:[i.date]}),Ne(e)>t){e.pop();break}n=n.slice(1)}return{heartbeatsToSend:e,unsentEntries:n}}class ci{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return sn()?on().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await si(this.app);return e?.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const n=await this.read();return Re(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const n=await this.read();return Re(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...t.heartbeats]})}else return}}function Ne(r){return Pt(JSON.stringify({version:2,heartbeats:r})).length}function hi(r){if(r.length===0)return-1;let t=0,e=r[0].date;for(let n=1;n<r.length;n++)r[n].date<e&&(e=r[n].date,t=n);return t}/**
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
 */function fi(r){Ot(new pt("platform-logger",t=>new En(t),"PRIVATE")),Ot(new pt("heartbeat",t=>new li(t),"PRIVATE")),it(Xt,ve,r),it(Xt,ve,"esm2020"),it("fire-js","")}fi("");var Pe=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var cr;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(c,o){function l(){}l.prototype=o.prototype,c.F=o.prototype,c.prototype=new l,c.prototype.constructor=c,c.D=function(f,h,d){for(var a=Array(arguments.length-2),X=2;X<arguments.length;X++)a[X-2]=arguments[X];return o.prototype[h].apply(f,a)}}function e(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}t(n,e),n.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(c,o,l){l||(l=0);const f=Array(16);if(typeof o=="string")for(var h=0;h<16;++h)f[h]=o.charCodeAt(l++)|o.charCodeAt(l++)<<8|o.charCodeAt(l++)<<16|o.charCodeAt(l++)<<24;else for(h=0;h<16;++h)f[h]=o[l++]|o[l++]<<8|o[l++]<<16|o[l++]<<24;o=c.g[0],l=c.g[1],h=c.g[2];let d=c.g[3],a;a=o+(d^l&(h^d))+f[0]+3614090360&4294967295,o=l+(a<<7&4294967295|a>>>25),a=d+(h^o&(l^h))+f[1]+3905402710&4294967295,d=o+(a<<12&4294967295|a>>>20),a=h+(l^d&(o^l))+f[2]+606105819&4294967295,h=d+(a<<17&4294967295|a>>>15),a=l+(o^h&(d^o))+f[3]+3250441966&4294967295,l=h+(a<<22&4294967295|a>>>10),a=o+(d^l&(h^d))+f[4]+4118548399&4294967295,o=l+(a<<7&4294967295|a>>>25),a=d+(h^o&(l^h))+f[5]+1200080426&4294967295,d=o+(a<<12&4294967295|a>>>20),a=h+(l^d&(o^l))+f[6]+2821735955&4294967295,h=d+(a<<17&4294967295|a>>>15),a=l+(o^h&(d^o))+f[7]+4249261313&4294967295,l=h+(a<<22&4294967295|a>>>10),a=o+(d^l&(h^d))+f[8]+1770035416&4294967295,o=l+(a<<7&4294967295|a>>>25),a=d+(h^o&(l^h))+f[9]+2336552879&4294967295,d=o+(a<<12&4294967295|a>>>20),a=h+(l^d&(o^l))+f[10]+4294925233&4294967295,h=d+(a<<17&4294967295|a>>>15),a=l+(o^h&(d^o))+f[11]+2304563134&4294967295,l=h+(a<<22&4294967295|a>>>10),a=o+(d^l&(h^d))+f[12]+1804603682&4294967295,o=l+(a<<7&4294967295|a>>>25),a=d+(h^o&(l^h))+f[13]+4254626195&4294967295,d=o+(a<<12&4294967295|a>>>20),a=h+(l^d&(o^l))+f[14]+2792965006&4294967295,h=d+(a<<17&4294967295|a>>>15),a=l+(o^h&(d^o))+f[15]+1236535329&4294967295,l=h+(a<<22&4294967295|a>>>10),a=o+(h^d&(l^h))+f[1]+4129170786&4294967295,o=l+(a<<5&4294967295|a>>>27),a=d+(l^h&(o^l))+f[6]+3225465664&4294967295,d=o+(a<<9&4294967295|a>>>23),a=h+(o^l&(d^o))+f[11]+643717713&4294967295,h=d+(a<<14&4294967295|a>>>18),a=l+(d^o&(h^d))+f[0]+3921069994&4294967295,l=h+(a<<20&4294967295|a>>>12),a=o+(h^d&(l^h))+f[5]+3593408605&4294967295,o=l+(a<<5&4294967295|a>>>27),a=d+(l^h&(o^l))+f[10]+38016083&4294967295,d=o+(a<<9&4294967295|a>>>23),a=h+(o^l&(d^o))+f[15]+3634488961&4294967295,h=d+(a<<14&4294967295|a>>>18),a=l+(d^o&(h^d))+f[4]+3889429448&4294967295,l=h+(a<<20&4294967295|a>>>12),a=o+(h^d&(l^h))+f[9]+568446438&4294967295,o=l+(a<<5&4294967295|a>>>27),a=d+(l^h&(o^l))+f[14]+3275163606&4294967295,d=o+(a<<9&4294967295|a>>>23),a=h+(o^l&(d^o))+f[3]+4107603335&4294967295,h=d+(a<<14&4294967295|a>>>18),a=l+(d^o&(h^d))+f[8]+1163531501&4294967295,l=h+(a<<20&4294967295|a>>>12),a=o+(h^d&(l^h))+f[13]+2850285829&4294967295,o=l+(a<<5&4294967295|a>>>27),a=d+(l^h&(o^l))+f[2]+4243563512&4294967295,d=o+(a<<9&4294967295|a>>>23),a=h+(o^l&(d^o))+f[7]+1735328473&4294967295,h=d+(a<<14&4294967295|a>>>18),a=l+(d^o&(h^d))+f[12]+2368359562&4294967295,l=h+(a<<20&4294967295|a>>>12),a=o+(l^h^d)+f[5]+4294588738&4294967295,o=l+(a<<4&4294967295|a>>>28),a=d+(o^l^h)+f[8]+2272392833&4294967295,d=o+(a<<11&4294967295|a>>>21),a=h+(d^o^l)+f[11]+1839030562&4294967295,h=d+(a<<16&4294967295|a>>>16),a=l+(h^d^o)+f[14]+4259657740&4294967295,l=h+(a<<23&4294967295|a>>>9),a=o+(l^h^d)+f[1]+2763975236&4294967295,o=l+(a<<4&4294967295|a>>>28),a=d+(o^l^h)+f[4]+1272893353&4294967295,d=o+(a<<11&4294967295|a>>>21),a=h+(d^o^l)+f[7]+4139469664&4294967295,h=d+(a<<16&4294967295|a>>>16),a=l+(h^d^o)+f[10]+3200236656&4294967295,l=h+(a<<23&4294967295|a>>>9),a=o+(l^h^d)+f[13]+681279174&4294967295,o=l+(a<<4&4294967295|a>>>28),a=d+(o^l^h)+f[0]+3936430074&4294967295,d=o+(a<<11&4294967295|a>>>21),a=h+(d^o^l)+f[3]+3572445317&4294967295,h=d+(a<<16&4294967295|a>>>16),a=l+(h^d^o)+f[6]+76029189&4294967295,l=h+(a<<23&4294967295|a>>>9),a=o+(l^h^d)+f[9]+3654602809&4294967295,o=l+(a<<4&4294967295|a>>>28),a=d+(o^l^h)+f[12]+3873151461&4294967295,d=o+(a<<11&4294967295|a>>>21),a=h+(d^o^l)+f[15]+530742520&4294967295,h=d+(a<<16&4294967295|a>>>16),a=l+(h^d^o)+f[2]+3299628645&4294967295,l=h+(a<<23&4294967295|a>>>9),a=o+(h^(l|~d))+f[0]+4096336452&4294967295,o=l+(a<<6&4294967295|a>>>26),a=d+(l^(o|~h))+f[7]+1126891415&4294967295,d=o+(a<<10&4294967295|a>>>22),a=h+(o^(d|~l))+f[14]+2878612391&4294967295,h=d+(a<<15&4294967295|a>>>17),a=l+(d^(h|~o))+f[5]+4237533241&4294967295,l=h+(a<<21&4294967295|a>>>11),a=o+(h^(l|~d))+f[12]+1700485571&4294967295,o=l+(a<<6&4294967295|a>>>26),a=d+(l^(o|~h))+f[3]+2399980690&4294967295,d=o+(a<<10&4294967295|a>>>22),a=h+(o^(d|~l))+f[10]+4293915773&4294967295,h=d+(a<<15&4294967295|a>>>17),a=l+(d^(h|~o))+f[1]+2240044497&4294967295,l=h+(a<<21&4294967295|a>>>11),a=o+(h^(l|~d))+f[8]+1873313359&4294967295,o=l+(a<<6&4294967295|a>>>26),a=d+(l^(o|~h))+f[15]+4264355552&4294967295,d=o+(a<<10&4294967295|a>>>22),a=h+(o^(d|~l))+f[6]+2734768916&4294967295,h=d+(a<<15&4294967295|a>>>17),a=l+(d^(h|~o))+f[13]+1309151649&4294967295,l=h+(a<<21&4294967295|a>>>11),a=o+(h^(l|~d))+f[4]+4149444226&4294967295,o=l+(a<<6&4294967295|a>>>26),a=d+(l^(o|~h))+f[11]+3174756917&4294967295,d=o+(a<<10&4294967295|a>>>22),a=h+(o^(d|~l))+f[2]+718787259&4294967295,h=d+(a<<15&4294967295|a>>>17),a=l+(d^(h|~o))+f[9]+3951481745&4294967295,c.g[0]=c.g[0]+o&4294967295,c.g[1]=c.g[1]+(h+(a<<21&4294967295|a>>>11))&4294967295,c.g[2]=c.g[2]+h&4294967295,c.g[3]=c.g[3]+d&4294967295}n.prototype.v=function(c,o){o===void 0&&(o=c.length);const l=o-this.blockSize,f=this.C;let h=this.h,d=0;for(;d<o;){if(h==0)for(;d<=l;)i(this,c,d),d+=this.blockSize;if(typeof c=="string"){for(;d<o;)if(f[h++]=c.charCodeAt(d++),h==this.blockSize){i(this,f),h=0;break}}else for(;d<o;)if(f[h++]=c[d++],h==this.blockSize){i(this,f),h=0;break}}this.h=h,this.o+=o},n.prototype.A=function(){var c=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);c[0]=128;for(var o=1;o<c.length-8;++o)c[o]=0;o=this.o*8;for(var l=c.length-8;l<c.length;++l)c[l]=o&255,o/=256;for(this.v(c),c=Array(16),o=0,l=0;l<4;++l)for(let f=0;f<32;f+=8)c[o++]=this.g[l]>>>f&255;return c};function s(c,o){var l=p;return Object.prototype.hasOwnProperty.call(l,c)?l[c]:l[c]=o(c)}function u(c,o){this.h=o;const l=[];let f=!0;for(let h=c.length-1;h>=0;h--){const d=c[h]|0;f&&d==o||(l[h]=d,f=!1)}this.g=l}var p={};function m(c){return-128<=c&&c<128?s(c,function(o){return new u([o|0],o<0?-1:0)}):new u([c|0],c<0?-1:0)}function g(c){if(isNaN(c)||!isFinite(c))return I;if(c<0)return C(g(-c));const o=[];let l=1;for(let f=0;c>=l;f++)o[f]=c/l|0,l*=4294967296;return new u(o,0)}function y(c,o){if(c.length==0)throw Error("number format error: empty string");if(o=o||10,o<2||36<o)throw Error("radix out of range: "+o);if(c.charAt(0)=="-")return C(y(c.substring(1),o));if(c.indexOf("-")>=0)throw Error('number format error: interior "-" character');const l=g(Math.pow(o,8));let f=I;for(let d=0;d<c.length;d+=8){var h=Math.min(8,c.length-d);const a=parseInt(c.substring(d,d+h),o);h<8?(h=g(Math.pow(o,h)),f=f.j(h).add(g(a))):(f=f.j(l),f=f.add(g(a)))}return f}var I=m(0),w=m(1),U=m(16777216);r=u.prototype,r.m=function(){if(F(this))return-C(this).m();let c=0,o=1;for(let l=0;l<this.g.length;l++){const f=this.i(l);c+=(f>=0?f:4294967296+f)*o,o*=4294967296}return c},r.toString=function(c){if(c=c||10,c<2||36<c)throw Error("radix out of range: "+c);if(D(this))return"0";if(F(this))return"-"+C(this).toString(c);const o=g(Math.pow(c,6));var l=this;let f="";for(;;){const h=Vt(l,o).g;l=bt(l,h.j(o));let d=((l.g.length>0?l.g[0]:l.h)>>>0).toString(c);if(l=h,D(l))return d+f;for(;d.length<6;)d="0"+d;f=d+f}},r.i=function(c){return c<0?0:c<this.g.length?this.g[c]:this.h};function D(c){if(c.h!=0)return!1;for(let o=0;o<c.g.length;o++)if(c.g[o]!=0)return!1;return!0}function F(c){return c.h==-1}r.l=function(c){return c=bt(this,c),F(c)?-1:D(c)?0:1};function C(c){const o=c.g.length,l=[];for(let f=0;f<o;f++)l[f]=~c.g[f];return new u(l,~c.h).add(w)}r.abs=function(){return F(this)?C(this):this},r.add=function(c){const o=Math.max(this.g.length,c.g.length),l=[];let f=0;for(let h=0;h<=o;h++){let d=f+(this.i(h)&65535)+(c.i(h)&65535),a=(d>>>16)+(this.i(h)>>>16)+(c.i(h)>>>16);f=a>>>16,d&=65535,a&=65535,l[h]=a<<16|d}return new u(l,l[l.length-1]&-2147483648?-1:0)};function bt(c,o){return c.add(C(o))}r.j=function(c){if(D(this)||D(c))return I;if(F(this))return F(c)?C(this).j(C(c)):C(C(this).j(c));if(F(c))return C(this.j(C(c)));if(this.l(U)<0&&c.l(U)<0)return g(this.m()*c.m());const o=this.g.length+c.g.length,l=[];for(var f=0;f<2*o;f++)l[f]=0;for(f=0;f<this.g.length;f++)for(let h=0;h<c.g.length;h++){const d=this.i(f)>>>16,a=this.i(f)&65535,X=c.i(h)>>>16,Te=c.i(h)&65535;l[2*f+2*h]+=a*Te,vt(l,2*f+2*h),l[2*f+2*h+1]+=d*Te,vt(l,2*f+2*h+1),l[2*f+2*h+1]+=a*X,vt(l,2*f+2*h+1),l[2*f+2*h+2]+=d*X,vt(l,2*f+2*h+2)}for(c=0;c<o;c++)l[c]=l[2*c+1]<<16|l[2*c];for(c=o;c<2*o;c++)l[c]=0;return new u(l,0)};function vt(c,o){for(;(c[o]&65535)!=c[o];)c[o+1]+=c[o]>>>16,c[o]&=65535,o++}function ct(c,o){this.g=c,this.h=o}function Vt(c,o){if(D(o))throw Error("division by zero");if(D(c))return new ct(I,I);if(F(c))return o=Vt(C(c),o),new ct(C(o.g),C(o.h));if(F(o))return o=Vt(c,C(o)),new ct(C(o.g),o.h);if(c.g.length>30){if(F(c)||F(o))throw Error("slowDivide_ only works with positive integers.");for(var l=w,f=o;f.l(c)<=0;)l=Ae(l),f=Ae(f);var h=rt(l,1),d=rt(f,1);for(f=rt(f,2),l=rt(l,2);!D(f);){var a=d.add(f);a.l(c)<=0&&(h=h.add(l),d=a),f=rt(f,1),l=rt(l,1)}return o=bt(c,h.j(o)),new ct(h,o)}for(h=I;c.l(o)>=0;){for(l=Math.max(1,Math.floor(c.m()/o.m())),f=Math.ceil(Math.log(l)/Math.LN2),f=f<=48?1:Math.pow(2,f-48),d=g(l),a=d.j(o);F(a)||a.l(c)>0;)l-=f,d=g(l),a=d.j(o);D(d)&&(d=w),h=h.add(d),c=bt(c,a)}return new ct(h,c)}r.B=function(c){return Vt(this,c).h},r.and=function(c){const o=Math.max(this.g.length,c.g.length),l=[];for(let f=0;f<o;f++)l[f]=this.i(f)&c.i(f);return new u(l,this.h&c.h)},r.or=function(c){const o=Math.max(this.g.length,c.g.length),l=[];for(let f=0;f<o;f++)l[f]=this.i(f)|c.i(f);return new u(l,this.h|c.h)},r.xor=function(c){const o=Math.max(this.g.length,c.g.length),l=[];for(let f=0;f<o;f++)l[f]=this.i(f)^c.i(f);return new u(l,this.h^c.h)};function Ae(c){const o=c.g.length+1,l=[];for(let f=0;f<o;f++)l[f]=c.i(f)<<1|c.i(f-1)>>>31;return new u(l,c.h)}function rt(c,o){const l=o>>5;o%=32;const f=c.g.length-l,h=[];for(let d=0;d<f;d++)h[d]=o>0?c.i(d+l)>>>o|c.i(d+l+1)<<32-o:c.i(d+l);return new u(h,c.h)}n.prototype.digest=n.prototype.A,n.prototype.reset=n.prototype.u,n.prototype.update=n.prototype.v,u.prototype.add=u.prototype.add,u.prototype.multiply=u.prototype.j,u.prototype.modulo=u.prototype.B,u.prototype.compare=u.prototype.l,u.prototype.toNumber=u.prototype.m,u.prototype.toString=u.prototype.toString,u.prototype.getBits=u.prototype.i,u.fromNumber=g,u.fromString=y,cr=u}).apply(typeof Pe<"u"?Pe:typeof self<"u"?self:typeof window<"u"?window:{});/**
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
 */let lt="12.14.0";function di(r){lt=r}/**
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
 */const ot=new ar("@firebase/firestore");function kt(r,...t){if(ot.logLevel<=T.DEBUG){const e=t.map(ue);ot.debug(`Firestore (${lt}): ${r}`,...e)}}function le(r,...t){if(ot.logLevel<=T.ERROR){const e=t.map(ue);ot.error(`Firestore (${lt}): ${r}`,...e)}}function hr(r,...t){if(ot.logLevel<=T.WARN){const e=t.map(ue);ot.warn(`Firestore (${lt}): ${r}`,...e)}}function ue(r){if(typeof r=="string")return r;try{return(function(e){return JSON.stringify(e)})(r)}catch{return r}}/**
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
 */function b(r,t,e){let n="Unexpected state";typeof t=="string"?n=t:e=t,fr(r,n,e)}function fr(r,t,e){let n=`FIRESTORE (${lt}) INTERNAL ASSERTION FAILED: ${t} (ID: ${r.toString(16)})`;if(e!==void 0)try{n+=" CONTEXT: "+JSON.stringify(e)}catch{n+=" CONTEXT: "+e}throw le(n),new Error(n)}function Y(r,t,e,n){let i="Unexpected state";typeof e=="string"?i=e:n=e,r||fr(t,i,n)}function Bt(r,t){return r}/**
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
 */class dr{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class pi{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable((()=>e(M.UNAUTHENTICATED)))}shutdown(){}}class mi{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable((()=>e(this.token.user)))}shutdown(){this.changeListener=null}}class gi{constructor(t){this.auth=null,t.onInit((e=>{this.auth=e}))}getToken(){return this.auth?this.auth.getToken().then((t=>t?(Y(typeof t.accessToken=="string",42297,{t}),new dr(t.accessToken,new M(this.auth.getUid()))):null)):Promise.resolve(null)}invalidateToken(){}start(t,e){}shutdown(){}}class _i{constructor(t,e,n){this.i=t,this.o=e,this.u=n,this.type="FirstParty",this.user=M.FIRST_PARTY,this.l=new Map}h(){return this.u?this.u():null}get headers(){this.l.set("X-Goog-AuthUser",this.i);const t=this.h();return t&&this.l.set("Authorization",t),this.o&&this.l.set("X-Goog-Iam-Authorization-Token",this.o),this.l}}class yi{constructor(t,e,n){this.i=t,this.o=e,this.u=n}getToken(){return Promise.resolve(new _i(this.i,this.o,this.u))}start(t,e){t.enqueueRetryable((()=>e(M.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class De{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Ei{constructor(t,e){this.m=e,this.appCheck=null,this.T=null,Yn(t)&&t.settings.appCheckToken&&(this.T=t.settings.appCheckToken),e.onInit((n=>{this.appCheck=n}))}getToken(){return this.T?Promise.resolve(new De(this.T)):this.appCheck?this.appCheck.getToken().then((t=>t?(Y(typeof t.token=="string",3470,{tokenResult:t}),new De(t.token)):null)):Promise.resolve(null)}invalidateToken(){}start(t,e){}shutdown(){}}/**
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
 */class Ii{constructor(t,e,n,i,s,u,p,m,g,y,I){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=i,this.ssl=s,this.forceLongPolling=u,this.autoDetectLongPolling=p,this.longPollingOptions=m,this.useFetchStreams=g,this.isUsingEmulator=y,this.apiKey=I}}const ee="(default)";class gt{constructor(t,e){this.projectId=t,this.database=e||ee}static empty(){return new gt("","")}get isDefaultDatabase(){return this.database===ee}isEqual(t){return t instanceof gt&&t.projectId===this.projectId&&t.database===this.database}}function Ai(r,t){if(!Object.prototype.hasOwnProperty.apply(r.options,["projectId"]))throw new E(_.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new gt(r.options.projectId,t)}/**
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
 */function Ti(r){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(r);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let n=0;n<r;n++)e[n]=Math.floor(256*Math.random());return e}/**
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
 */class wi{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let n="";for(;n.length<20;){const i=Ti(40);for(let s=0;s<i.length;++s)n.length<20&&i[s]<e&&(n+=t.charAt(i[s]%62))}return n}}function v(r,t){return r<t?-1:r>t?1:0}function re(r,t){const e=Math.min(r.length,t.length);for(let n=0;n<e;n++){const i=r.charAt(n),s=t.charAt(n);if(i!==s)return Jt(i)===Jt(s)?v(i,s):Jt(i)?1:-1}return v(r.length,t.length)}const bi=55296,vi=57343;function Jt(r){const t=r.charCodeAt(0);return t>=bi&&t<=vi}function pr(r,t,e){return r.length===t.length&&r.every(((n,i)=>e(n,t[i])))}/**
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
 */const Ce="__name__";class z{constructor(t,e,n){e===void 0?e=0:e>t.length&&b(637,{offset:e,range:t.length}),n===void 0?n=t.length-e:n>t.length-e&&b(1746,{length:n,range:t.length-e}),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return z.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof z?t.forEach((n=>{e.push(n)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let i=0;i<n;i++){const s=z.compareSegments(t.get(i),e.get(i));if(s!==0)return s}return v(t.length,e.length)}static compareSegments(t,e){const n=z.isNumericId(t),i=z.isNumericId(e);return n&&!i?-1:!n&&i?1:n&&i?z.extractNumericId(t).compare(z.extractNumericId(e)):re(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return cr.fromString(t.substring(4,t.length-2))}}class R extends z{construct(t,e,n){return new R(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new E(_.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter((i=>i.length>0)))}return new R(e)}static emptyPath(){return new R([])}}const Vi=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class L extends z{construct(t,e,n){return new L(t,e,n)}static isValidIdentifier(t){return Vi.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),L.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Ce}static keyField(){return new L([Ce])}static fromServerFormat(t){const e=[];let n="",i=0;const s=()=>{if(n.length===0)throw new E(_.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let u=!1;for(;i<t.length;){const p=t[i];if(p==="\\"){if(i+1===t.length)throw new E(_.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const m=t[i+1];if(m!=="\\"&&m!=="."&&m!=="`")throw new E(_.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=m,i+=2}else p==="`"?(u=!u,i++):p!=="."||u?(n+=p,i++):(s(),i++)}if(s(),u)throw new E(_.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new L(e)}static emptyPath(){return new L([])}}/**
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
 */class N{constructor(t){this.path=t}static fromPath(t){return new N(R.fromString(t))}static fromName(t){return new N(R.fromString(t).popFirst(5))}static empty(){return new N(R.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&R.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return R.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new N(new R(t.slice()))}}/**
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
 */function mr(r,t,e){if(!e)throw new E(_.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${t}.`)}function Oe(r){if(!N.isDocumentKey(r))throw new E(_.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function ke(r){if(N.isDocumentKey(r))throw new E(_.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function gr(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}function jt(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const t=(function(n){return n.constructor?n.constructor.name:null})(r);return t?`a custom ${t} object`:"an object"}}return typeof r=="function"?"a function":b(12329,{type:typeof r})}function ce(r,t){if("_delegate"in r&&(r=r._delegate),!(r instanceof t)){if(t.name===r.constructor.name)throw new E(_.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=jt(r);throw new E(_.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return r}/**
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
 */function _r(r){const t={};return r.timeoutSeconds!==void 0&&(t.timeoutSeconds=r.timeoutSeconds),t}/**
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
 */let Rt=null;function Ri(){return Rt===null?Rt=(function(){return 268435456+Math.round(2147483648*Math.random())})():Rt++,"0x"+Rt.toString(16)}/**
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
 */function Si(r){return r==null}function Ft(r){return r===0&&1/r==-1/0}/**
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
 */const Qt="RestConnection",Ni={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class Pi{get P(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.V=e+"://"+t.host,this.R=`projects/${n}/databases/${i}`,this.A=this.databaseId.database===ee?`project_id=${n}`:`project_id=${n}&database_id=${i}`}I(t,e,n,i,s){const u=Ri(),p=this.p(t,e.toUriEncodedString());kt(Qt,`Sending RPC '${t}' ${u}:`,p,n);const m={"google-cloud-resource-prefix":this.R,"x-goog-request-params":this.A};this.F(m,i,s);const{host:g}=new URL(p),y=or(g);return this.v(t,p,m,n,y).then((I=>(kt(Qt,`Received RPC '${t}' ${u}: `,I),I)),(I=>{throw hr(Qt,`RPC '${t}' ${u} failed with error: `,I,"url: ",p,"request:",n),I}))}D(t,e,n,i,s,u){return this.I(t,e,n,i,s)}F(t,e,n){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+lt})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach(((i,s)=>t[s]=i)),n&&n.headers.forEach(((i,s)=>t[s]=i))}p(t,e){const n=Ni[t];let i=`${this.V}/v1/${e}:${n}`;return this.databaseInfo.apiKey&&(i=`${i}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),i}terminate(){}}/**
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
 */var Fe,A;function Me(r){if(r===void 0)return le("RPC_ERROR","HTTP error has no status"),_.UNKNOWN;switch(r){case 200:return _.OK;case 400:return _.FAILED_PRECONDITION;case 401:return _.UNAUTHENTICATED;case 403:return _.PERMISSION_DENIED;case 404:return _.NOT_FOUND;case 409:return _.ABORTED;case 416:return _.OUT_OF_RANGE;case 429:return _.RESOURCE_EXHAUSTED;case 499:return _.CANCELLED;case 500:return _.UNKNOWN;case 501:return _.UNIMPLEMENTED;case 503:return _.UNAVAILABLE;case 504:return _.DEADLINE_EXCEEDED;default:return r>=200&&r<300?_.OK:r>=400&&r<500?_.FAILED_PRECONDITION:r>=500&&r<600?_.INTERNAL:_.UNKNOWN}}/**
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
 */(A=Fe||(Fe={}))[A.OK=0]="OK",A[A.CANCELLED=1]="CANCELLED",A[A.UNKNOWN=2]="UNKNOWN",A[A.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",A[A.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",A[A.NOT_FOUND=5]="NOT_FOUND",A[A.ALREADY_EXISTS=6]="ALREADY_EXISTS",A[A.PERMISSION_DENIED=7]="PERMISSION_DENIED",A[A.UNAUTHENTICATED=16]="UNAUTHENTICATED",A[A.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",A[A.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",A[A.ABORTED=10]="ABORTED",A[A.OUT_OF_RANGE=11]="OUT_OF_RANGE",A[A.UNIMPLEMENTED=12]="UNIMPLEMENTED",A[A.INTERNAL=13]="INTERNAL",A[A.UNAVAILABLE=14]="UNAVAILABLE",A[A.DATA_LOSS=15]="DATA_LOSS";class Di extends Pi{N(t,e){throw new Error("Not supported by FetchConnection")}async v(t,e,n,i,s){const u=JSON.stringify(i);let p;try{const m={method:"POST",headers:n,body:u};s&&(m.credentials="include"),p=await fetch(e,m)}catch(m){const g=m;throw new E(Me(g.status),"Request failed with error: "+g.statusText)}if(!p.ok){let m=await p.json();Array.isArray(m)&&(m=m[0]);const g=m?.error?.message;throw new E(Me(p.status),`Request failed with error: ${g??p.statusText}`)}return p.json()}}/**
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
 */function Le(r){let t=0;for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t++;return t}function zt(r,t){for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t(e,r[e])}/**
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
 */class Ci extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class W{constructor(t){this.binaryString=t}static fromBase64String(t){const e=(function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new Ci("Invalid base64 string: "+s):s}})(t);return new W(e)}static fromUint8Array(t){const e=(function(i){let s="";for(let u=0;u<i.length;++u)s+=String.fromCharCode(i[u]);return s})(t);return new W(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(e){return btoa(e)})(this.binaryString)}toUint8Array(){return(function(e){const n=new Uint8Array(e.length);for(let i=0;i<e.length;i++)n[i]=e.charCodeAt(i);return n})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return v(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}W.EMPTY_BYTE_STRING=new W("");const Oi=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function tt(r){if(Y(!!r,39018),typeof r=="string"){let t=0;const e=Oi.exec(r);if(Y(!!e,46558,{timestamp:r}),e[1]){let i=e[1];i=(i+"000000000").substr(0,9),t=Number(i)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:t}}return{seconds:V(r.seconds),nanos:V(r.nanos)}}function V(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function _t(r){return typeof r=="string"?W.fromBase64String(r):W.fromUint8Array(r)}/**
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
 */function $(r,t){const e={typeString:r};return t&&(e.value=t),e}function Tt(r,t){if(!gr(r))throw new E(_.INVALID_ARGUMENT,"JSON must be an object");let e;for(const n in t)if(t[n]){const i=t[n].typeString,s="value"in t[n]?{value:t[n].value}:void 0;if(!(n in r)){e=`JSON missing required field: '${n}'`;break}const u=r[n];if(i&&typeof u!==i){e=`JSON field '${n}' must be a ${i}.`;break}if(s!==void 0&&u!==s.value){e=`Expected '${n}' field to equal '${s.value}'`;break}}if(e)throw new E(_.INVALID_ARGUMENT,e);return!0}/**
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
 */const Ue=-62135596800,xe=1e6;class S{static now(){return S.fromMillis(Date.now())}static fromDate(t){return S.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor((t-1e3*e)*xe);return new S(e,n)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new E(_.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new E(_.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<Ue)throw new E(_.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new E(_.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/xe}_compareTo(t){return this.seconds===t.seconds?v(this.nanoseconds,t.nanoseconds):v(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:S._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(Tt(t,S._jsonSchema))return new S(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-Ue;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}S._jsonSchemaVersion="firestore/timestamp/1.0",S._jsonSchema={type:$("string",S._jsonSchemaVersion),seconds:$("number"),nanoseconds:$("number")};function yr(r){return(r?.mapValue?.fields||{}).__type__?.stringValue==="server_timestamp"}function Er(r){const t=r.mapValue.fields.__previous_value__;return yr(t)?Er(t):t}function yt(r){const t=tt(r.mapValue.fields.__local_write_time__.timestampValue);return new S(t.seconds,t.nanos)}/**
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
 */const Ir="__type__",ki="__max__",St={},Ar="__vector__",Mt="value";function et(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?yr(r)?4:(function(e){return(((e.mapValue||{}).fields||{}).__type__||{}).stringValue===ki})(r)?9007199254740991:(function(e){return(e?.mapValue?.fields||{})[Ir]?.stringValue===Ar})(r)?10:11:b(28295,{value:r})}function Lt(r,t){if(r===t)return!0;const e=et(r);if(e!==et(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===t.booleanValue;case 4:return yt(r).isEqual(yt(t));case 3:return(function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const u=tt(i.timestampValue),p=tt(s.timestampValue);return u.seconds===p.seconds&&u.nanos===p.nanos})(r,t);case 5:return r.stringValue===t.stringValue;case 6:return(function(i,s){return _t(i.bytesValue).isEqual(_t(s.bytesValue))})(r,t);case 7:return r.referenceValue===t.referenceValue;case 8:return(function(i,s){return V(i.geoPointValue.latitude)===V(s.geoPointValue.latitude)&&V(i.geoPointValue.longitude)===V(s.geoPointValue.longitude)})(r,t);case 2:return(function(i,s){if("integerValue"in i&&"integerValue"in s)return V(i.integerValue)===V(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const u=V(i.doubleValue),p=V(s.doubleValue);return u===p?Ft(u)===Ft(p):isNaN(u)&&isNaN(p)}return!1})(r,t);case 9:return pr(r.arrayValue.values||[],t.arrayValue.values||[],Lt);case 10:case 11:return(function(i,s){const u=i.mapValue.fields||{},p=s.mapValue.fields||{};if(Le(u)!==Le(p))return!1;for(const m in u)if(u.hasOwnProperty(m)&&(p[m]===void 0||!Lt(u[m],p[m])))return!1;return!0})(r,t);default:return b(52216,{left:r})}}function Et(r,t){return(r.values||[]).find((e=>Lt(e,t)))!==void 0}function Ut(r,t){if(r===t)return 0;const e=et(r),n=et(t);if(e!==n)return v(e,n);switch(e){case 0:case 9007199254740991:return 0;case 1:return v(r.booleanValue,t.booleanValue);case 2:return(function(s,u){const p=V(s.integerValue||s.doubleValue),m=V(u.integerValue||u.doubleValue);return p<m?-1:p>m?1:p===m?0:isNaN(p)?isNaN(m)?0:-1:1})(r,t);case 3:return $e(r.timestampValue,t.timestampValue);case 4:return $e(yt(r),yt(t));case 5:return re(r.stringValue,t.stringValue);case 6:return(function(s,u){const p=_t(s),m=_t(u);return p.compareTo(m)})(r.bytesValue,t.bytesValue);case 7:return(function(s,u){const p=s.split("/"),m=u.split("/");for(let g=0;g<p.length&&g<m.length;g++){const y=v(p[g],m[g]);if(y!==0)return y}return v(p.length,m.length)})(r.referenceValue,t.referenceValue);case 8:return(function(s,u){const p=v(V(s.latitude),V(u.latitude));return p!==0?p:v(V(s.longitude),V(u.longitude))})(r.geoPointValue,t.geoPointValue);case 9:return Be(r.arrayValue,t.arrayValue);case 10:return(function(s,u){const p=s.fields||{},m=u.fields||{},g=p[Mt]?.arrayValue,y=m[Mt]?.arrayValue,I=v(g?.values?.length||0,y?.values?.length||0);return I!==0?I:Be(g,y)})(r.mapValue,t.mapValue);case 11:return(function(s,u){if(s===St&&u===St)return 0;if(s===St)return 1;if(u===St)return-1;const p=s.fields||{},m=Object.keys(p),g=u.fields||{},y=Object.keys(g);m.sort(),y.sort();for(let I=0;I<m.length&&I<y.length;++I){const w=re(m[I],y[I]);if(w!==0)return w;const U=Ut(p[m[I]],g[y[I]]);if(U!==0)return U}return v(m.length,y.length)})(r.mapValue,t.mapValue);default:throw b(23264,{S:e})}}function $e(r,t){if(typeof r=="string"&&typeof t=="string"&&r.length===t.length)return v(r,t);const e=tt(r),n=tt(t),i=v(e.seconds,n.seconds);return i!==0?i:v(e.nanos,n.nanos)}function Be(r,t){const e=r.values||[],n=t.values||[];for(let i=0;i<e.length&&i<n.length;++i){const s=Ut(e[i],n[i]);if(s)return s}return v(e.length,n.length)}function je(r,t){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${t.path.canonicalString()}`}}function Tr(r){return!!r&&"arrayValue"in r}function ze(r){return!!r&&"nullValue"in r}function qe(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function Yt(r){return!!r&&"mapValue"in r}function ht(r){if(r.geoPointValue)return{geoPointValue:{...r.geoPointValue}};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:{...r.timestampValue}};if(r.mapValue){const t={mapValue:{fields:{}}};return zt(r.mapValue.fields,((e,n)=>t.mapValue.fields[e]=ht(n))),t}if(r.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(r.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=ht(r.arrayValue.values[e]);return t}return{...r}}class Ge{constructor(t,e){this.position=t,this.inclusive=e}}/**
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
 */class wr{}class j extends wr{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,n):new Fi(t,e,n):e==="array-contains"?new Ui(t,n):e==="in"?new xi(t,n):e==="not-in"?new $i(t,n):e==="array-contains-any"?new Bi(t,n):new j(t,e,n)}static createKeyFieldInFilter(t,e,n){return e==="in"?new Mi(t,n):new Li(t,n)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(Ut(e,this.value)):e!==null&&et(this.value)===et(e)&&this.matchesComparison(Ut(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return b(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class wt extends wr{constructor(t,e){super(),this.filters=t,this.op=e,this.C=null}static create(t,e){return new wt(t,e)}matches(t){return(function(n){return n.op==="and"})(this)?this.filters.find((e=>!e.matches(t)))===void 0:this.filters.find((e=>e.matches(t)))!==void 0}getFlattenedFilters(){return this.C!==null||(this.C=this.filters.reduce(((t,e)=>t.concat(e.getFlattenedFilters())),[])),this.C}getFilters(){return Object.assign([],this.filters)}}class Fi extends j{constructor(t,e,n){super(t,e,n),this.key=N.fromName(n.referenceValue)}matches(t){const e=N.comparator(t.key,this.key);return this.matchesComparison(e)}}class Mi extends j{constructor(t,e){super(t,"in",e),this.keys=br("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}}class Li extends j{constructor(t,e){super(t,"not-in",e),this.keys=br("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}}function br(r,t){return(t.arrayValue?.values||[]).map((e=>N.fromName(e.referenceValue)))}class Ui extends j{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Tr(e)&&Et(e.arrayValue,this.value)}}class xi extends j{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&Et(this.value.arrayValue,e)}}class $i extends j{constructor(t,e){super(t,"not-in",e)}matches(t){if(Et(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!Et(this.value.arrayValue,e)}}class Bi extends j{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Tr(e)||!e.arrayValue.values)&&e.arrayValue.values.some((n=>Et(this.value.arrayValue,n)))}}/**
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
 */class ne{constructor(t,e="asc"){this.field=t,this.dir=e}}/**
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
 */class k{static fromTimestamp(t){return new k(t)}static min(){return new k(new S(0,0))}static max(){return new k(new S(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */class xt{constructor(t,e){this.comparator=t,this.root=e||O.EMPTY}insert(t,e){return new xt(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,O.BLACK,null,null))}remove(t){return new xt(this.comparator,this.root.remove(t,this.comparator).copy(null,null,O.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(n===0)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const i=this.comparator(t,n.key);if(i===0)return e+n.left.size;i<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((e,n)=>(t(e,n),!1)))}toString(){const t=[];return this.inorderTraversal(((e,n)=>(t.push(`${e}:${n}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Nt(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Nt(this.root,t,this.comparator,!1)}getReverseIterator(){return new Nt(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Nt(this.root,t,this.comparator,!0)}}class Nt{constructor(t,e,n,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!t.isEmpty();)if(s=e?n(t.key,e):1,e&&i&&(s*=-1),s<0)t=this.isReverse?t.left:t.right;else{if(s===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class O{constructor(t,e,n,i,s){this.key=t,this.value=e,this.color=n??O.RED,this.left=i??O.EMPTY,this.right=s??O.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,i,s){return new O(t??this.key,e??this.value,n??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let i=this;const s=n(t,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(t,e,n),null):s===0?i.copy(null,e,null,null,null):i.copy(null,null,null,null,i.right.insert(t,e,n)),i.fixUp()}removeMin(){if(this.left.isEmpty())return O.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,i=this;if(e(t,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(t,e),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),e(t,i.key)===0){if(i.right.isEmpty())return O.EMPTY;n=i.right.min(),i=i.copy(n.key,n.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(t,e))}return i.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,O.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,O.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw b(43730,{key:this.key,value:this.value});if(this.right.isRed())throw b(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw b(27949);return t+(this.isRed()?0:1)}}O.EMPTY=null,O.RED=!0,O.BLACK=!1;O.EMPTY=new class{constructor(){this.size=0}get key(){throw b(57766)}get value(){throw b(16141)}get color(){throw b(16727)}get left(){throw b(29726)}get right(){throw b(36894)}copy(t,e,n,i,s){return this}insert(t,e,n){return new O(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class It{constructor(t){this.comparator=t,this.data=new xt(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((e,n)=>(t(e),!1)))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const i=n.getNext();if(this.comparator(i.key,t[1])>=0)return;e(i.key)}}forEachWhile(t,e){let n;for(n=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new He(this.data.getIterator())}getIteratorFrom(t){return new He(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach((n=>{e=e.add(n)})),e}isEqual(t){if(!(t instanceof It)||this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const i=e.getNext().key,s=n.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const t=[];return this.forEach((e=>{t.push(e)})),t}toString(){const t=[];return this.forEach((e=>t.push(e))),"SortedSet("+t.toString()+")"}copy(t){const e=new It(this.comparator);return e.data=t,e}}class He{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class At{constructor(t){this.fields=t,t.sort(L.comparator)}static empty(){return new At([])}unionWith(t){let e=new It(L.comparator);for(const n of this.fields)e=e.add(n);for(const n of t)e=e.add(n);return new At(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return pr(this.fields,t.fields,((e,n)=>e.isEqual(n)))}}/**
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
 */class q{constructor(t){this.value=t}static empty(){return new q({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!Yt(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=ht(e)}setAll(t){let e=L.emptyPath(),n={},i=[];t.forEach(((u,p)=>{if(!e.isImmediateParentOf(p)){const m=this.getFieldsMap(e);this.applyChanges(m,n,i),n={},i=[],e=p.popLast()}u?n[p.lastSegment()]=ht(u):i.push(p.lastSegment())}));const s=this.getFieldsMap(e);this.applyChanges(s,n,i)}delete(t){const e=this.field(t.popLast());Yt(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Lt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let i=e.mapValue.fields[t.get(n)];Yt(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=i),e=i}return e.mapValue.fields}applyChanges(t,e,n){zt(e,((i,s)=>t[i]=s));for(const i of n)delete t[i]}clone(){return new q(ht(this.value))}}/**
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
 */class J{constructor(t,e,n,i,s,u,p){this.key=t,this.documentType=e,this.version=n,this.readTime=i,this.createTime=s,this.data=u,this.documentState=p}static newInvalidDocument(t){return new J(t,0,k.min(),k.min(),k.min(),q.empty(),0)}static newFoundDocument(t,e,n,i){return new J(t,1,e,k.min(),n,i,0)}static newNoDocument(t,e){return new J(t,2,e,k.min(),k.min(),q.empty(),0)}static newUnknownDocument(t,e){return new J(t,3,e,k.min(),k.min(),q.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(k.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=q.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=q.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=k.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof J&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new J(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class ji{constructor(t,e=null,n=[],i=[],s=null,u=null,p=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=i,this.limit=s,this.startAt=u,this.endAt=p,this.O=null}}function Ke(r,t=null,e=[],n=[],i=null,s=null,u=null){return new ji(r,t,e,n,i,s,u)}/**
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
 */class vr{constructor(t,e=null,n=[],i=[],s=null,u="F",p=null,m=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=i,this.limit=s,this.limitType=u,this.startAt=p,this.endAt=m,this.q=null,this.L=null,this.B=null,this.startAt,this.endAt}}function zi(r){return r.collectionGroup!==null}function qi(r){const t=Bt(r);if(t.q===null){t.q=[];const e=new Set;for(const s of t.explicitOrderBy)t.q.push(s),e.add(s.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(u){let p=new It(L.comparator);return u.filters.forEach((m=>{m.getFlattenedFilters().forEach((g=>{g.isInequality()&&(p=p.add(g.field))}))})),p})(t).forEach((s=>{e.has(s.canonicalString())||s.isKeyField()||t.q.push(new ne(s,n))})),e.has(L.keyField().canonicalString())||t.q.push(new ne(L.keyField(),n))}return t.q}function Gi(r){const t=Bt(r);return t.L||(t.L=Hi(t,qi(r))),t.L}function Hi(r,t){if(r.limitType==="F")return Ke(r.path,r.collectionGroup,t,r.filters,r.limit,r.startAt,r.endAt);{t=t.map((i=>{const s=i.dir==="desc"?"asc":"desc";return new ne(i.field,s)}));const e=r.endAt?new Ge(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new Ge(r.startAt.position,r.startAt.inclusive):null;return Ke(r.path,r.collectionGroup,t,r.filters,r.limit,e,n)}}function ie(r,t){const e=r.filters.concat([t]);return new vr(r.path,r.collectionGroup,r.explicitOrderBy.slice(),e,r.limit,r.limitType,r.startAt,r.endAt)}/**
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
 */function Vr(r,t){if(r.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ft(t)?"-0":t}}function Ki(r,t){return(function(n){return typeof n=="number"&&Number.isInteger(n)&&!Ft(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER})(t)?(function(n){return{integerValue:""+n}})(t):Vr(r,t)}/**
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
 */class qt{constructor(){this._=void 0}}class Rr extends qt{}class Wi extends qt{constructor(t){super(),this.elements=t}}class Ji extends qt{constructor(t){super(),this.elements=t}}class he extends qt{constructor(t,e){super(),this.serializer=t,this.$=e}}class Qi extends he{}class Yi extends he{}class Xi extends he{}/**
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
 */class Zi{constructor(t,e){this.field=t,this.transform=e}}class ft{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new ft}static exists(t){return new ft(void 0,t)}static updateTime(t){return new ft(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}class Gt{}class Sr extends Gt{constructor(t,e,n,i=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Nr extends Gt{constructor(t,e,n,i,s=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}class ts extends Gt{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class es extends Gt{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */const rs={asc:"ASCENDING",desc:"DESCENDING"},ns={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},is={and:"AND",or:"OR"};class ss{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function se(r,t){return r.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function os(r,t){return r.useProto3Json?t.toBase64():t.toUint8Array()}function as(r,t){return se(r,t.toTimestamp())}function We(r){return Y(!!r,49232),k.fromTimestamp((function(e){const n=tt(e);return new S(n.seconds,n.nanos)})(r))}function fe(r,t){return oe(r,t).canonicalString()}function oe(r,t){const e=(function(i){return new R(["projects",i.projectId,"databases",i.database])})(r).child("documents");return t===void 0?e:e.child(t)}function ae(r,t){return fe(r.databaseId,t.path)}function ls(r,t){const e=(function(i){const s=R.fromString(i);return Y(Dr(s),10190,{key:s.toString()}),s})(t);if(e.get(1)!==r.databaseId.projectId)throw new E(_.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+r.databaseId.projectId);if(e.get(3)!==r.databaseId.database)throw new E(_.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+r.databaseId.database);return new N((function(i){return Y(i.length>4&&i.get(4)==="documents",29091,{key:i.toString()}),i.popFirst(5)})(e))}function Je(r,t,e){return{name:ae(r,t),fields:e.value.mapValue.fields}}function us(r,t){let e;if(t instanceof Sr)e={update:Je(r,t.key,t.value)};else if(t instanceof ts)e={delete:ae(r,t.key)};else if(t instanceof Nr)e={update:Je(r,t.key,t.data),updateMask:ps(t.fieldMask)};else{if(!(t instanceof es))return b(16599,{M:t.type});e={verify:ae(r,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map((n=>(function(s,u){const p=u.transform;if(p instanceof Rr)return{fieldPath:u.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(p instanceof Wi)return{fieldPath:u.field.canonicalString(),appendMissingElements:{values:p.elements}};if(p instanceof Ji)return{fieldPath:u.field.canonicalString(),removeAllFromArray:{values:p.elements}};if(p instanceof Qi)return{fieldPath:u.field.canonicalString(),increment:p.$};if(p instanceof Yi)return{fieldPath:u.field.canonicalString(),minimum:p.$};if(p instanceof Xi)return{fieldPath:u.field.canonicalString(),maximum:p.$};throw b(20930,{transform:u.transform})})(0,n)))),t.precondition.isNone||(e.currentDocument=(function(i,s){return s.updateTime!==void 0?{updateTime:as(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:b(27497)})(r,t.precondition)),e}function cs(r,t){const e={structuredQuery:{}},n=t.path;let i;t.collectionGroup!==null?(i=n,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i=n.popLast(),e.structuredQuery.from=[{collectionId:n.lastSegment()}]),e.parent=(function(g,y){return fe(g.databaseId,y)})(r,i);const s=(function(g){if(g.length!==0)return Pr(wt.create(g,"and"))})(t.filters);s&&(e.structuredQuery.where=s);const u=(function(g){if(g.length!==0)return g.map((y=>(function(w){return{field:nt(w.field),direction:hs(w.dir)}})(y)))})(t.orderBy);u&&(e.structuredQuery.orderBy=u);const p=(function(g,y){return g.useProto3Json||Si(y)?y:{value:y}})(r,t.limit);return p!==null&&(e.structuredQuery.limit=p),t.startAt&&(e.structuredQuery.startAt=(function(g){return{before:g.inclusive,values:g.position}})(t.startAt)),t.endAt&&(e.structuredQuery.endAt=(function(g){return{before:!g.inclusive,values:g.position}})(t.endAt)),{U:e,parent:i}}function hs(r){return rs[r]}function fs(r){return ns[r]}function ds(r){return is[r]}function nt(r){return{fieldPath:r.canonicalString()}}function Pr(r){return r instanceof j?(function(e){if(e.op==="=="){if(qe(e.value))return{unaryFilter:{field:nt(e.field),op:"IS_NAN"}};if(ze(e.value))return{unaryFilter:{field:nt(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(qe(e.value))return{unaryFilter:{field:nt(e.field),op:"IS_NOT_NAN"}};if(ze(e.value))return{unaryFilter:{field:nt(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:nt(e.field),op:fs(e.op),value:e.value}}})(r):r instanceof wt?(function(e){const n=e.getFilters().map((i=>Pr(i)));return n.length===1?n[0]:{compositeFilter:{op:ds(e.op),filters:n}}})(r):b(54877,{filter:r})}function ps(r){const t=[];return r.fields.forEach((e=>t.push(e.canonicalString()))),{fieldPaths:t}}function Dr(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}function Cr(r){return!!r&&typeof r._toProto=="function"&&r._protoValueType==="ProtoValue"}/**
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
 */function de(r){return new ss(r,!0)}/**
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
 */class ms{}class gs extends ms{constructor(t,e,n,i){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=n,this.serializer=i,this.k=!1}j(){if(this.k)throw new E(_.FAILED_PRECONDITION,"The client has already been terminated.")}I(t,e,n,i){return this.j(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([s,u])=>this.connection.I(t,oe(e,n),i,s,u))).catch((s=>{throw s.name==="FirebaseError"?(s.code===_.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new E(_.UNKNOWN,s.toString())}))}D(t,e,n,i,s){return this.j(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([u,p])=>this.connection.D(t,oe(e,n),i,u,p,s))).catch((u=>{throw u.name==="FirebaseError"?(u.code===_.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),u):new E(_.UNKNOWN,u.toString())}))}terminate(){this.k=!0,this.connection.terminate()}}async function _s(r,t){const e=Bt(r),n={writes:t.map((i=>us(e.serializer,i)))};await e.I("Commit",e.serializer.databaseId,R.emptyPath(),n)}async function ys(r,t){const e=Bt(r),{U:n,parent:i}=cs(e.serializer,Gi(t));return(await e.D("RunQuery",e.serializer.databaseId,i,{structuredQuery:n.structuredQuery})).filter((s=>!!s.document)).map((s=>(function(p,m,g){const y=ls(p,m.name),I=We(m.updateTime),w=m.createTime?We(m.createTime):k.min(),U=new q({mapValue:{fields:m.fields}}),D=J.newFoundDocument(y,I,w,U);return g?D.setHasCommittedMutations():D})(e.serializer,s.document,void 0)))}/**
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
 */const Or="ComponentProvider",dt=new Map;function kr(r){if(r._terminated)throw new E(_.FAILED_PRECONDITION,"The client has already been terminated.");if(!dt.has(r)){kt(Or,"Initializing Datastore");const t=(function(s){return new Di(s)})((function(s,u,p,m,g){return new Ii(s,u,p,g.host,g.ssl,g.experimentalForceLongPolling,g.experimentalAutoDetectLongPolling,_r(g.experimentalLongPollingOptions),g.useFetchStreams,g.isUsingEmulator,m)})(r._databaseId,r.app.options.appId||"",r._persistenceKey,r.app.options.apiKey,r._freezeSettings())),e=de(r._databaseId),n=(function(s,u,p,m){return new gs(s,u,p,m)})(r._authCredentials,r._appCheckCredentials,t,e);dt.set(r,n)}return dt.get(r)}const Es=1048576,Fr="firestore.googleapis.com",Qe=!0;class Ye{constructor(t){if(t.host===void 0){if(t.ssl!==void 0)throw new E(_.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Fr,this.ssl=Qe}else this.host=t.host,this.ssl=t.ssl??Qe;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<Es)throw new E(_.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}(function(n,i,s,u){if(i===!0&&u===!0)throw new E(_.INVALID_ARGUMENT,`${n} and ${s} cannot be used together.`)})("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=_r(t.experimentalLongPollingOptions??{}),(function(n){if(n.timeoutSeconds!==void 0){if(isNaN(n.timeoutSeconds))throw new E(_.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (must not be NaN)`);if(n.timeoutSeconds<5)throw new E(_.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (minimum allowed value is 5)`);if(n.timeoutSeconds>30)throw new E(_.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(function(n,i){return n.timeoutSeconds===i.timeoutSeconds})(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class Ht{constructor(t,e,n,i){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=n,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ye({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new E(_.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new E(_.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ye(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=(function(n){if(!n)return new pi;switch(n.type){case"firstParty":return new yi(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new E(_.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(e){const n=dt.get(e);n&&(kt(Or,"Removing Datastore"),dt.delete(e),n.terminate())})(this),Promise.resolve()}}function $s(r,t){const e=typeof r=="object"?r:ri(),n=typeof r=="string"?r:"(default)",i=Qn(e,"firestore/lite").getImmediate({identifier:n});if(!i._initialized){const s=en("firestore");s&&Is(i,...s)}return i}function Is(r,t,e,n={}){r=ce(r,Ht);const i=or(t),s=r._getSettings(),u={...s,emulatorOptions:r._getEmulatorOptions()},p=`${t}:${e}`;i&&cn(`https://${p}`),s.host!==Fr&&s.host!==p&&hr("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const m={...s,host:p,ssl:i,emulatorOptions:n};if(!Dt(m,u)&&(r._setSettings(m),n.mockUserToken)){let g,y;if(typeof n.mockUserToken=="string")g=n.mockUserToken,y=M.MOCK_USER;else{g=nn(n.mockUserToken,r._app?.options.projectId);const I=n.mockUserToken.sub||n.mockUserToken.user_id;if(!I)throw new E(_.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");y=new M(I)}r._authCredentials=new mi(new dr(g,y))}}/**
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
 */class ut{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new ut(this.firestore,t,this._query)}}class P{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new H(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new P(this.firestore,t,this._key)}toJSON(){return{type:P._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,n){if(Tt(e,P._jsonSchema))return new P(t,n||null,new N(R.fromString(e.referencePath)))}}P._jsonSchemaVersion="firestore/documentReference/1.0",P._jsonSchema={type:$("string",P._jsonSchemaVersion),referencePath:$("string")};class H extends ut{constructor(t,e,n){super(t,e,(function(s){return new vr(s)})(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new P(this.firestore,null,new N(t))}withConverter(t){return new H(this.firestore,t,this._path)}}function Bs(r,t,...e){if(r=st(r),mr("collection","path",t),r instanceof Ht){const n=R.fromString(t,...e);return ke(n),new H(r,null,n)}{if(!(r instanceof P||r instanceof H))throw new E(_.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(R.fromString(t,...e));return ke(n),new H(r.firestore,null,n)}}function As(r,t,...e){if(r=st(r),arguments.length===1&&(t=wi.newId()),mr("doc","path",t),r instanceof Ht){const n=R.fromString(t,...e);return Oe(n),new P(r,null,new N(n))}{if(!(r instanceof P||r instanceof H))throw new E(_.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(R.fromString(t,...e));return Oe(n),new P(r.firestore,r instanceof H?r.converter:null,new N(n))}}/**
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
 */class x{constructor(t){this._byteString=t}static fromBase64String(t){try{return new x(W.fromBase64String(t))}catch(e){throw new E(_.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new x(W.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:x._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(Tt(t,x._jsonSchema))return x.fromBase64String(t.bytes)}}x._jsonSchemaVersion="firestore/bytes/1.0",x._jsonSchema={type:$("string",x._jsonSchemaVersion),bytes:$("string")};/**
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
 */class Mr{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new E(_.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new L(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
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
 */class pe{constructor(t){this._methodName=t}}/**
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
 */class G{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new E(_.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new E(_.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return v(this._lat,t._lat)||v(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:G._jsonSchemaVersion}}static fromJSON(t){if(Tt(t,G._jsonSchema))return new G(t.latitude,t.longitude)}}G._jsonSchemaVersion="firestore/geoPoint/1.0",G._jsonSchema={type:$("string",G._jsonSchemaVersion),latitude:$("number"),longitude:$("number")};/**
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
 */class B{constructor(t){this._values=(t||[]).map((e=>e))}toArray(){return this._values.map((t=>t))}isEqual(t){/**
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
*/return(function(n,i){if(n.length!==i.length)return!1;for(let s=0;s<n.length;++s)if(n[s]!==i[s])return!1;return!0})(this._values,t._values)}toJSON(){return{type:B._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(Tt(t,B._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every((e=>typeof e=="number")))return new B(t.vectorValues);throw new E(_.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}B._jsonSchemaVersion="firestore/vectorValue/1.0",B._jsonSchema={type:$("string",B._jsonSchemaVersion),vectorValues:$("object")};/**
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
 */const Ts=/^__.*__$/;class ws{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return this.fieldMask!==null?new Nr(t,this.data,this.fieldMask,e,this.fieldTransforms):new Sr(t,this.data,e,this.fieldTransforms)}}function Lr(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw b(40011,{dataSource:r})}}class me{constructor(t,e,n,i,s,u){this.settings=t,this.databaseId=e,this.serializer=n,this.ignoreUndefinedProperties=i,s===void 0&&this.G(),this.fieldTransforms=s||[],this.fieldMask=u||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}ne(t){return new me({...this.settings,...t},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}J(t){const e=this.path?.child(t),n=this.ne({path:e,arrayElement:!1});return n.H(t),n}Y(t){const e=this.path?.child(t),n=this.ne({path:e,arrayElement:!1});return n.G(),n}X(t){return this.ne({path:void 0,arrayElement:!0})}Z(t){return $t(t,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(t){return this.fieldMask.find((e=>t.isPrefixOf(e)))!==void 0||this.fieldTransforms.find((e=>t.isPrefixOf(e.field)))!==void 0}G(){if(this.path)for(let t=0;t<this.path.length;t++)this.H(this.path.get(t))}H(t){if(t.length===0)throw this.Z("Document fields must not be empty");if(Lr(this.dataSource)&&Ts.test(t))throw this.Z('Document fields cannot begin and end with "__"')}}class bs{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=n||de(t)}ce(t,e,n,i=!1){return new me({dataSource:t,methodName:e,targetDoc:n,path:L.emptyPath(),arrayElement:!1,hasConverter:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Ur(r){const t=r._freezeSettings(),e=de(r._databaseId);return new bs(r._databaseId,!!t.ignoreUndefinedProperties,e)}function vs(r,t,e,n,i,s={}){const u=r.ce(s.merge||s.mergeFields?2:0,t,e,i);Br("Data must be an object, but it was:",u,n);const p=xr(n,u);let m,g;if(s.merge)m=new At(u.fieldMask),g=u.fieldTransforms;else if(s.mergeFields){const y=[];for(const I of s.mergeFields){const w=ye(t,I,e);if(!u.contains(w))throw new E(_.INVALID_ARGUMENT,`Field '${w}' is specified in your field mask but missing from your input data.`);Ns(y,w)||y.push(w)}m=new At(y),g=u.fieldTransforms.filter((I=>m.covers(I.field)))}else m=null,g=u.fieldTransforms;return new ws(new q(p),m,g)}class ge extends pe{_toFieldTransform(t){return new Zi(t.path,new Rr)}isEqual(t){return t instanceof ge}}function Vs(r,t,e,n=!1){return _e(e,r.ce(n?4:3,t))}function _e(r,t){if($r(r=st(r)))return Br("Unsupported field value:",t,r),xr(r,t);if(r instanceof pe)return(function(n,i){if(!Lr(i.dataSource))throw i.Z(`${n._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Z(`${n._methodName}() is not currently supported inside arrays`);const s=n._toFieldTransform(i);s&&i.fieldTransforms.push(s)})(r,t),null;if(r===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),r instanceof Array){if(t.settings.arrayElement&&t.dataSource!==4)throw t.Z("Nested arrays are not supported");return(function(n,i){const s=[];let u=0;for(const p of n){let m=_e(p,i.X(u));m==null&&(m={nullValue:"NULL_VALUE"}),s.push(m),u++}return{arrayValue:{values:s}}})(r,t)}return(function(n,i){if((n=st(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return Ki(i.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const s=S.fromDate(n);return{timestampValue:se(i.serializer,s)}}if(n instanceof S){const s=new S(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:se(i.serializer,s)}}if(n instanceof G)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof x)return{bytesValue:os(i.serializer,n._byteString)};if(n instanceof P){const s=i.databaseId,u=n.firestore._databaseId;if(!u.isEqual(s))throw i.Z(`Document reference is for database ${u.projectId}/${u.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:fe(n.firestore._databaseId||i.databaseId,n._key.path)}}if(n instanceof B)return(function(u,p){const m=u instanceof B?u.toArray():u;return{mapValue:{fields:{[Ir]:{stringValue:Ar},[Mt]:{arrayValue:{values:m.map((y=>{if(typeof y!="number")throw p.Z("VectorValues must only contain numeric values.");return Vr(p.serializer,y)}))}}}}}})(n,i);if(Cr(n))return n._toProto(i.serializer);throw i.Z(`Unsupported field value: ${jt(n)}`)})(r,t)}function xr(r,t){const e={};return(function(i){for(const s in i)if(Object.prototype.hasOwnProperty.call(i,s))return!1;return!0})(r)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):zt(r,((n,i)=>{const s=_e(i,t.J(n));s!=null&&(e[n]=s)})),{mapValue:{fields:e}}}function $r(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof S||r instanceof G||r instanceof x||r instanceof P||r instanceof pe||r instanceof B||Cr(r))}function Br(r,t,e){if(!$r(e)||!gr(e)){const n=jt(e);throw n==="an object"?t.Z(r+" a custom object"):t.Z(r+" "+n)}}function ye(r,t,e){if((t=st(t))instanceof Mr)return t._internalPath;if(typeof t=="string")return Ss(r,t);throw $t("Field path arguments must be of type string or ",r,!1,void 0,e)}const Rs=new RegExp("[~\\*/\\[\\]]");function Ss(r,t,e){if(t.search(Rs)>=0)throw $t(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,e);try{return new Mr(...t.split("."))._internalPath}catch{throw $t(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,e)}}function $t(r,t,e,n,i){const s=n&&!n.isEmpty(),u=i!==void 0;let p=`Function ${t}() called with invalid data`;e&&(p+=" (via `toFirestore()`)"),p+=". ";let m="";return(s||u)&&(m+=" (found",s&&(m+=` in field ${n}`),u&&(m+=` in document ${i}`),m+=")"),new E(_.INVALID_ARGUMENT,p+r+m)}function Ns(r,t){return r.some((e=>e.isEqual(t)))}/**
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
 */class Ps{constructor(t,e,n,i,s){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new P(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new jr(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){return this._document?.data.clone().value.mapValue.fields??void 0}get(t){if(this._document){const e=this._document.data.field(ye("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class jr extends Ps{data(){return super.data()}}class Ds{constructor(t,e){this._docs=e,this.query=t}get docs(){return[...this._docs]}get size(){return this.docs.length}get empty(){return this.docs.length===0}forEach(t,e){this._docs.forEach(t,e)}}/**
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
 */class Ee{}class Cs extends Ee{}function js(r,t,...e){let n=[];t instanceof Ee&&n.push(t),n=n.concat(e),(function(s){const u=s.filter((m=>m instanceof Ie)).length,p=s.filter((m=>m instanceof Kt)).length;if(u>1||u>0&&p>0)throw new E(_.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(n);for(const i of n)r=i._apply(r);return r}class Kt extends Cs{constructor(t,e,n){super(),this._field=t,this._op=e,this._value=n,this.type="where"}static _create(t,e,n){return new Kt(t,e,n)}_apply(t){const e=this._parse(t);return zr(t._query,e),new ut(t.firestore,t.converter,ie(t._query,e))}_parse(t){const e=Ur(t.firestore);return(function(s,u,p,m,g,y,I){let w;if(g.isKeyField()){if(y==="array-contains"||y==="array-contains-any")throw new E(_.INVALID_ARGUMENT,`Invalid Query. You can't perform '${y}' queries on documentId().`);if(y==="in"||y==="not-in"){Ze(I,y);const D=[];for(const F of I)D.push(Xe(m,s,F));w={arrayValue:{values:D}}}else w=Xe(m,s,I)}else y!=="in"&&y!=="not-in"&&y!=="array-contains-any"||Ze(I,y),w=Vs(p,u,I,y==="in"||y==="not-in");return j.create(g,y,w)})(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}function zs(r,t,e){const n=t,i=ye("where",r);return Kt._create(i,n,e)}class Ie extends Ee{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new Ie(t,e)}_parse(t){const e=this._queryConstraints.map((n=>n._parse(t))).filter((n=>n.getFilters().length>0));return e.length===1?e[0]:wt.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return e.getFilters().length===0?t:((function(i,s){let u=i;const p=s.getFlattenedFilters();for(const m of p)zr(u,m),u=ie(u,m)})(t._query,e),new ut(t.firestore,t.converter,ie(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function Xe(r,t,e){if(typeof(e=st(e))=="string"){if(e==="")throw new E(_.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!zi(t)&&e.indexOf("/")!==-1)throw new E(_.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);const n=t.path.child(R.fromString(e));if(!N.isDocumentKey(n))throw new E(_.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return je(r,new N(n))}if(e instanceof P)return je(r,e._key);throw new E(_.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${jt(e)}.`)}function Ze(r,t){if(!Array.isArray(r)||r.length===0)throw new E(_.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function zr(r,t){const e=(function(i,s){for(const u of i)for(const p of u.getFlattenedFilters())if(s.indexOf(p.op)>=0)return p.op;return null})(r.filters,(function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(t.op));if(e!==null)throw e===t.op?new E(_.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new E(_.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${e.toString()}' filters.`)}class Os{convertValue(t,e="none"){switch(et(t)){case 0:return null;case 1:return t.booleanValue;case 2:return V(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(_t(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw b(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const n={};return zt(t,((i,s)=>{n[i]=this.convertValue(s,e)})),n}convertVectorValue(t){const e=t.fields?.[Mt].arrayValue?.values?.map((n=>V(n.doubleValue)));return new B(e)}convertGeoPoint(t){return new G(V(t.latitude),V(t.longitude))}convertArray(t,e){return(t.values||[]).map((n=>this.convertValue(n,e)))}convertServerTimestamp(t,e){switch(e){case"previous":const n=Er(t);return n==null?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(yt(t));default:return null}}convertTimestamp(t){const e=tt(t);return new S(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=R.fromString(t);Y(Dr(n),9688,{name:t});const i=new gt(n.get(1),n.get(3)),s=new N(n.popFirst(5));return i.isEqual(e)||le(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),s}}/**
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
 */function ks(r,t,e){let n;return n=r?r.toFirestore(t):t,n}class Fs extends Os{constructor(t){super(),this.firestore=t}convertBytes(t){return new x(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new P(this.firestore,null,e)}}function qs(r){(function(i){if(i.limitType==="L"&&i.explicitOrderBy.length===0)throw new E(_.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")})((r=ce(r,ut))._query);const t=kr(r.firestore),e=new Fs(r.firestore);return ys(t,r._query).then((n=>{const i=n.map((s=>new jr(r.firestore,e,s.key,s,r.converter)));return r._query.limitType==="L"&&i.reverse(),new Ds(r,i)}))}function Gs(r,t){const e=As(r=ce(r,H)),n=ks(r.converter,t),i=vs(Ur(r.firestore),"addDoc",e._key,n,e.converter!==null,{});return _s(kr(r.firestore),[i.toMutation(e._key,ft.exists(!1))]).then((()=>e))}function Hs(){return new ge("serverTimestamp")}const tr="4.15.0";(function(){di(`${ti}_lite`),Ot(new pt("firestore/lite",((t,{instanceIdentifier:e,options:n})=>{const i=t.getProvider("app").getImmediate(),s=new Ht(new gi(t.getProvider("auth-internal")),new Ei(i,t.getProvider("app-check-internal")),Ai(i,e),i);return n&&s._setSettings(n),s}),"PUBLIC").setMultipleInstances(!0)),it("firestore-lite",tr,""),it("firestore-lite",tr,"esm2020")})();var Ms="firebase",Ls="12.14.0";/**
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
 */it(Ms,Ls,"app");export{qs as a,Gs as b,Bs as c,$s as g,ei as i,js as q,Hs as s,zs as w};
