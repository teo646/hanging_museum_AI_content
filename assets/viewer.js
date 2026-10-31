/*! snap3d-viewer 0.1.0 | Apache-2.0 | https://teo646.github.io/snap3d-viewer/ */
(()=>{var Ft=Object.defineProperty;var bt=(t,e)=>{for(var r in e)Ft(t,r,{get:e[r],enumerable:!0})};var it={};bt(it,{CONTROL_DEFAULTS:()=>vt,OrbitCamera:()=>B,OrbitControls:()=>C,PIPELINE_GLSL_SHA256:()=>Z,Snap3dViewer:()=>et,VERSION:()=>ie,VERTEX_SHADER:()=>J,VIEWER_DEFAULTS:()=>xt,createRenderer:()=>tt,fragmentShader:()=>Q,horizontalBasis:()=>j,loadBundle:()=>K,mat4:()=>q,readGlb:()=>H,readKtx2:()=>F,vertexFrameAttributes:()=>X});var Ot={5126:Float32Array,5125:Uint32Array,5123:Uint16Array},$t={SCALAR:1,VEC2:2,VEC3:3};function H(t){var m,b,y;let e=new DataView(t);if(e.getUint32(0,!0)!==1179937895||e.getUint32(4,!0)!==2)throw new Error("not a glTF 2.0 binary file");let r=new Map;for(let v=12;v+8<=t.byteLength;){let d=e.getUint32(v,!0),_=e.getUint32(v+4,!0);r.set(_,{offset:v+8,length:d}),v+=8+d}let i=r.get(1313821514),s=r.get(5130562);if(!i||!s)throw new Error("glb is missing its JSON or BIN chunk");let n=JSON.parse(new TextDecoder().decode(new Uint8Array(t,i.offset,i.length))),o=v=>{var l,T;let d=n.accessors[v],_=n.bufferViews[d.bufferView];if(_.byteStride!==void 0||d.sparse)throw new Error("strided or sparse accessors are not supported");let p=Ot[d.componentType];if(!p)throw new Error(`unsupported componentType ${d.componentType}`);let E=$t[d.type];if(!E)throw new Error(`unsupported accessor type ${d.type}`);let g=s.offset+((l=_.byteOffset)!=null?l:0)+((T=d.byteOffset)!=null?T:0),w=d.count*E;return g%p.BYTES_PER_ELEMENT===0?new p(t,g,w):new p(t.slice(g,g+w*p.BYTES_PER_ELEMENT))},c=(y=(b=(m=n.meshes)==null?void 0:m[0])==null?void 0:b.primitives)==null?void 0:y[0];if(!c)throw new Error("glb has no mesh primitive");let a=o(c.attributes.POSITION),h=o(c.attributes.TEXCOORD_0),u=o(c.indices);return u instanceof Uint32Array||(u=Uint32Array.from(u)),{positions:a,uv:h,indices:u,vertexCount:a.length/3,faceCount:u.length/3}}var Gt=[171,75,84,88,32,50,48,187,13,10,26,10],Tt={76:1,83:2,97:4},Rt={9:1,16:2,37:4},Yt={0:null,1:"BasisLZ",2:"Zstandard",3:"ZLIB"};async function Vt(t,e){if(typeof DecompressionStream>"u")throw new Error("DecompressionStream is unavailable, so the ZLIB-supercompressed texture cannot be read. It needs Chrome 80+, Firefox 113+ or Safari 16.4+.");let r=new Blob([t]).stream().pipeThrough(new DecompressionStream("deflate")),i=new Uint8Array(await new Response(r).arrayBuffer());if(i.byteLength!==e)throw new Error(`inflated ${i.byteLength} bytes, level index says ${e}`);return i}async function F(t){var w;let e=new Uint8Array(t);if(Gt.some((l,T)=>e[T]!==l))throw new Error("not a KTX2 file");let r=new DataView(t),i=l=>r.getUint32(l,!0),s=l=>i(l)+i(l+4)*4294967296,n=i(12),o=i(20),c=i(24),a=i(28),h=i(32),u=i(36),m=i(40),b=i(44),y=Tt[n]?"float16":Rt[n]?"unorm8":null;if(!y)throw new Error(`vkFormat ${n} is not a float16 or UNORM8 format this reader handles`);let v=y==="float16"?Tt[n]:Rt[n];if(a||u!==1||m>1)throw new Error("only single-level 2D (array) textures are supported");let d=s(80),_=s(88),p=s(96),E=new Uint8Array(t,d,_);if(b===3)E=await Vt(E,p);else if(b!==0)throw new Error(`supercompression scheme ${b} (${(w=Yt[b])!=null?w:"unknown"}) is not supported`);let g;if(y==="float16"){let l=E.byteOffset%2===0?E:new Uint8Array(E);g=new Uint16Array(l.buffer,l.byteOffset,l.byteLength/2)}else g=E;return{data:g,type:y,width:o,height:c,layers:h||1,channels:v,isArray:h>0}}function X(t,e,r){let i=t.length/3,s=r.length/3,n=new Float64Array(i*3),o=new Float64Array(i*3),c=new Float64Array(i*3);for(let a=0;a<s;a++){let h=r[a*3]*3,u=r[a*3+1]*3,m=r[a*3+2]*3,b=t[h],y=t[h+1],v=t[h+2],d=t[u]-b,_=t[u+1]-y,p=t[u+2]-v,E=t[m]-b,g=t[m+1]-y,w=t[m+2]-v,l=_*w-p*g,T=p*E-d*w,M=d*g-_*E,R=Math.hypot(l,T,M);R>0&&(l/=R,T/=R,M/=R);let f=r[a*3]*3,x=r[a*3+1]*3,z=r[a*3+2]*3,Mt=[[f,x,z],[x,z,f],[z,f,x]];for(let L=0;L<3;L++){let[P,rt,st]=Mt[L],nt=t[rt]-t[P],ot=t[rt+1]-t[P+1],at=t[rt+2]-t[P+2],ht=t[st]-t[P],ct=t[st+1]-t[P+1],ut=t[st+2]-t[P+2],lt=Math.hypot(nt,ot,at)||1,dt=Math.hypot(ht,ct,ut)||1;nt/=lt,ot/=lt,at/=lt,ht/=dt,ct/=dt,ut/=dt;let ft=Math.acos(Math.min(1,Math.max(-1,nt*ht+ot*ct+at*ut)));n[P]+=l*ft,n[P+1]+=T*ft,n[P+2]+=M*ft}let O=r[a*3]*2,Et=r[a*3+1]*2,gt=r[a*3+2]*2,$=e[Et]-e[O],G=e[Et+1]-e[O+1],Y=e[gt]-e[O],V=e[gt+1]-e[O+1],wt=$*V-Y*G,k=Math.abs(wt)<1e-12?0:1/wt,Ut=(d*V-E*G)*k,Dt=(_*V-g*G)*k,kt=(p*V-w*G)*k,Nt=(E*$-d*Y)*k,Bt=(g*$-_*Y)*k,Ct=(w*$-p*Y)*k;for(let L of[h,u,m])o[L]+=Ut,o[L+1]+=Dt,o[L+2]+=kt,c[L]+=Nt,c[L+1]+=Bt,c[L+2]+=Ct}for(let a=0;a<i*3;a+=3){let h=Math.hypot(n[a],n[a+1],n[a+2]);h>0&&(n[a]/=h,n[a+1]/=h,n[a+2]/=h)}return{normal:Float32Array.from(n),tangent:Float32Array.from(o),bitangent:Float32Array.from(c)}}var Ht="sh_texture_bundle/";async function Xt(t,e){if(!t.body)return t.arrayBuffer();let r=[],i=t.body.getReader(),s=0;for(;;){let{done:c,value:a}=await i.read();if(c)break;r.push(a),s+=a.byteLength,e(a.byteLength)}let n=new Uint8Array(s),o=0;for(let c of r)n.set(c,o),o+=c.byteLength;return n.buffer}function At(t,e,r,i,s){let n=e*s,o=new t.constructor(n);for(let c=0;c<i;c++){let a=c*r*n;for(let h=0;h<r>>1;h++){let u=a+h*n,m=a+(r-1-h)*n;o.set(t.subarray(u,u+n)),t.copyWithin(u,m,m+n),t.set(o,m)}}return t}async function K(t,e=()=>{}){var R;let r=String(t).replace(/\/+$/,""),i=/\.json$/i.test(r)?r:`${r}/config.json`,s=i.slice(0,i.lastIndexOf("/")),n=await fetch(i);if(!n.ok)throw new Error(`${i}: ${n.status} ${n.statusText}`);let o=await n.json().catch(()=>{throw new Error(`${i} is not JSON - is that a bundle?`)});if(!String(o.format).startsWith(Ht))throw new Error(`${s} is not a snap3d bundle (format "${o.format}")`);let c=["mesh","sh","height"],a=await Promise.all(c.map(async f=>{let x=`${s}/${o.files[f]}`,z=await fetch(x);if(!z.ok)throw new Error(`${x}: ${z.status} ${z.statusText}`);return z})),h=a.reduce((f,x)=>f+(Number(x.headers.get("content-length"))||0),0),u=0;e(0,h);let m=await Promise.all(a.map(f=>Xt(f,x=>{u+=x,e(u,h||u)})));e(h||u,h||u);let[b,y,v]=m,d=H(b),[_,p]=await Promise.all([F(y),F(v)]),[E,g]=o.texture_resolution;for(let[f,x]of[["sh",_],["height",p]])if(x.width!==E||x.height!==g)throw new Error(`${f}.ktx2 is ${x.width}x${x.height}, config says ${E}x${g}`);if(_.layers!==o.sh.coefficients)throw new Error(`sh.ktx2 has ${_.layers} layers, config says ${o.sh.coefficients} coefficients`);let w=(R=o.sh.storage)!=null?R:"float16";if(w!=="float16"&&w!=="unorm8")throw new Error(`config sh.storage "${w}" is not one this viewer reads`);if(_.type!==w)throw new Error(`sh.ktx2 holds ${_.type} samples, config says sh.storage "${w}"`);if(w==="unorm8")for(let f of["offset","scale"]){let x=o.sh[f];if(!Array.isArray(x)||x.length!==o.sh.coefficients||x.some(z=>z.length!==3))throw new Error(`config sh.${f} must be ${o.sh.coefficients} x 3 for unorm8 storage`)}if(p.type!=="float16")throw new Error(`height.ktx2 must be float16, got ${p.type}`);At(_.data,_.width,_.height,_.layers,_.channels),At(p.data,p.width,p.height,1,p.channels);let l=Float32Array.from(d.uv);for(let f=1;f<l.length;f+=2)l[f]=1-l[f];let T=X(d.positions,l,d.indices),M=0;for(let f=1;f<p.data.length;f+=p.channels)p.data[f]!==0&&M++;return{config:o,geometry:{position:d.positions,uv:l,indices:d.indices,...T},textures:{sh:_,height:p},stats:{vertices:d.vertexCount,faces:d.faceCount,coverage:M/(E*g),bytes:h||m.reduce((f,x)=>f+x.byteLength,0)}}}var q={};bt(q,{add:()=>N,cross:()=>U,dot:()=>A,length:()=>St,lookAt:()=>_t,multiply:()=>mt,normalize:()=>S,perspective:()=>pt,rotateAbout:()=>zt,rotatePointAbout:()=>W,scale:()=>I,sub:()=>D});function _t(t,e,r){let i=S(D(e,t)),s=S(U(i,r)),n=U(s,i),o=new Float32Array(16);return o[0]=s[0],o[4]=s[1],o[8]=s[2],o[12]=-A(s,t),o[1]=n[0],o[5]=n[1],o[9]=n[2],o[13]=-A(n,t),o[2]=-i[0],o[6]=-i[1],o[10]=-i[2],o[14]=A(i,t),o[15]=1,o}function pt(t,e,r,i){let s=1/Math.tan(t*Math.PI/360),n=new Float32Array(16);return n[0]=s/e,n[5]=s,n[10]=(i+r)/(r-i),n[11]=-1,n[14]=2*i*r/(r-i),n}function mt(t,e){let r=new Float32Array(16);for(let i=0;i<4;i++)for(let s=0;s<4;s++)r[i*4+s]=t[s]*e[i*4]+t[4+s]*e[i*4+1]+t[8+s]*e[i*4+2]+t[12+s]*e[i*4+3];return r}var N=(t,e)=>[t[0]+e[0],t[1]+e[1],t[2]+e[2]],D=(t,e)=>[t[0]-e[0],t[1]-e[1],t[2]-e[2]],I=(t,e)=>[t[0]*e,t[1]*e,t[2]*e],A=(t,e)=>t[0]*e[0]+t[1]*e[1]+t[2]*e[2],U=(t,e)=>[t[1]*e[2]-t[2]*e[1],t[2]*e[0]-t[0]*e[2],t[0]*e[1]-t[1]*e[0]],St=t=>Math.hypot(t[0],t[1],t[2]);function zt(t,e,r){let i=Math.cos(r),s=Math.sin(r),n=A(e,t)*(1-i),o=U(e,t);return[t[0]*i+o[0]*s+e[0]*n,t[1]*i+o[1]*s+e[1]*n,t[2]*i+o[2]*s+e[2]*n]}function W(t,e,r,i){return N(e,zt(D(t,e),r,i))}function S(t,e=0){return I(t,1/(St(t)+e))}var Kt=[[0,0,1],[1,0,0],[0,1,0]],Wt=.9;function j(t){let e=Kt.find(i=>Math.abs(A(i,t))<Wt),r=S(D(e,I(t,A(e,t))));return[U(t,r),r]}var B=class{constructor(e,r,i){this.origin=[...e],this.radius=r,this.azimuth=45,this.elevation=20,this.up=S(i),[this._right,this._forward]=j(this.up)}get position(){let e=this.azimuth*Math.PI/180,r=this.elevation*Math.PI/180,i=N(I(N(I(this._right,Math.sin(e)),I(this._forward,Math.cos(e))),Math.cos(r)),I(this.up,Math.sin(r)));return N(this.origin,I(i,this.radius))}setPose(e,r){this.origin=[...r];let i=D(e,r);if(this.radius=Math.hypot(i[0],i[1],i[2]),this.radius<1e-9)return this;let s=I(i,1/this.radius);return this.elevation=Math.asin(Math.min(1,Math.max(-1,A(s,this.up))))*180/Math.PI,this.azimuth=Math.atan2(A(s,this._right),A(s,this._forward))*180/Math.PI,this}setUp(e){return this.up=S(e),[this._right,this._forward]=j(this.up),this}get forwardAxes(){let e=S(D(this.origin,this.position),1e-10),r=S(U(e,this.up),1e-10);return[r,U(r,e)]}viewMatrix(){return _t(this.position,this.origin,this.up)}};var vt={orbitDegreesPerPixel:.3,zoomPerTick:.9,zoomRange:[.05,8],panPerSecond:1.2,keys:!0,elevationLimit:89.9},Lt={KeyW:[1,1],ArrowUp:[1,1],KeyS:[1,-1],ArrowDown:[1,-1],KeyA:[0,-1],ArrowLeft:[0,-1],KeyD:[0,1],ArrowRight:[0,1]},C=class{constructor(e,r,i={}){var s,n;this.element=e,this.camera=r,this.options={...vt,...i},this.enabled=!0,this.onChange=(s=i.onChange)!=null?s:(()=>{}),this.onInteract=(n=i.onInteract)!=null?n:(()=>{}),this._radius0=r.radius,this._pointers=new Map,this._keys=new Set,this._pinch=0,this._unbind=[],this.home=this.readCamera(),this._bind()}get active(){return this.enabled&&(this._pointers.size>0||this._keys.size>0)}readCamera(){let{azimuth:e,elevation:r,radius:i,origin:s}=this.camera;return{azimuth:e,elevation:r,radius:i,target:[...s]}}setCamera(e){e.azimuth!==void 0&&(this.camera.azimuth=e.azimuth),e.elevation!==void 0&&(this.camera.elevation=this._clampElevation(e.elevation)),e.radius!==void 0&&(this.camera.radius=this._clampRadius(e.radius)),e.target!==void 0&&(this.camera.origin=[...e.target]),this.onChange()}reset(){this.setCamera(this.home)}zoom(e){this.camera.radius=this._clampRadius(this.camera.radius*this.options.zoomPerTick**e),this.onChange()}orbit(e,r){let i=this.options.orbitDegreesPerPixel;this.camera.azimuth-=e*i,this.camera.elevation=this._clampElevation(this.camera.elevation+r*i),this.onChange()}update(e){if(!this.enabled||this._keys.size===0)return!1;let r=this.camera.forwardAxes,i=this.camera.radius*this.options.panPerSecond*e,s=!1;for(let n of this._keys){let o=Lt[n];if(!o)continue;let[c,a]=o;this.camera.origin=this.camera.origin.map((h,u)=>h+a*i*r[c][u]),s=!0}return s&&this.onChange(),s}dispose(){for(let e of this._unbind)e();this._unbind=[],this._pointers.clear(),this._keys.clear()}_clampRadius(e){let[r,i]=this.options.zoomRange;return Math.min(Math.max(e,this._radius0*r),this._radius0*i)}_clampElevation(e){let r=this.options.elevationLimit;return r===null?e:Math.min(Math.max(e,-r),r)}_on(e,r,i,s){e.addEventListener(r,i,s),this._unbind.push(()=>e.removeEventListener(r,i,s))}_bind(){let e=this.element;this._on(e,"pointerdown",i=>{var s,n;this.enabled&&(i.preventDefault(),this.onInteract(),(s=e.setPointerCapture)==null||s.call(e,i.pointerId),this._pointers.set(i.pointerId,i),e.classList.add("shs-dragging"),this.options.keys&&((n=e.focus)==null||n.call(e,{preventScroll:!0})))}),this._on(e,"pointermove",i=>{let s=this._pointers.get(i.pointerId);if(!(!s||!this.enabled)){if(i.preventDefault(),this._pointers.set(i.pointerId,i),this._pointers.size>=2){let[n,o]=[...this._pointers.values()],c=Math.hypot(n.clientX-o.clientX,n.clientY-o.clientY);this._pinch>0&&c>0&&this.zoom(Math.log(this._pinch/c)/Math.log(this.options.zoomPerTick)),this._pinch=c;return}this.orbit(i.clientX-s.clientX,i.clientY-s.clientY)}});let r=i=>{this._pointers.delete(i.pointerId),this._pointers.size<2&&(this._pinch=0),this._pointers.size===0&&e.classList.remove("shs-dragging")};this._on(e,"pointerup",r),this._on(e,"pointercancel",r),this._on(e,"touchstart",i=>{this.enabled&&i.preventDefault()},{passive:!1}),this._on(e,"touchmove",i=>{this.enabled&&i.preventDefault()},{passive:!1}),this._on(e,"wheel",i=>{this.enabled&&(this.onInteract(),i.preventDefault(),this.zoom(-i.deltaY/(i.deltaMode===1?3:100)))},{passive:!1}),this.options.keys&&(e.hasAttribute("tabindex")||(e.tabIndex=0),this._on(e,"keydown",i=>{this.enabled&&(i.code==="KeyR"&&(this.onInteract(),this.reset()),Lt[i.code]&&(this.onInteract(),i.preventDefault(),this._keys.add(i.code),this.onChange()))}),this._on(e,"keyup",i=>this._keys.delete(i.code)),this._on(e,"blur",()=>{this._keys.clear(),this._pointers.clear()}))}};var Z="2059de21010f65119cd3c06e46bebfcecc7482a518ab6dd445468dcc640567d9",J=`#version 300 es

in vec3 in_pos;
in vec2 in_uv;
in vec3 in_normal;
in vec3 in_tangent;    // RAW dP/du: length = world units per UV-u unit
in vec3 in_bitangent;  // RAW dP/dv
uniform mat4 u_mvp;
out vec2 v_uv;
out vec3 v_world_pos;
// All three interpolated and NOT normalized here: the fragment needs the tangents'
// lengths (see uv_geometry.vertex_frame_attributes), and normalizing per vertex would
// throw exactly that away.
out vec3 v_normal;
out vec3 v_tangent;
out vec3 v_bitangent;
void main(){
    v_uv = in_uv;
    v_world_pos = in_pos;
    v_normal = in_normal;
    v_tangent = in_tangent;
    v_bitangent = in_bitangent;
    gl_Position = u_mvp * vec4(in_pos, 1.0);
}
`,qt=`
uniform vec3      u_cam_pos;
uniform vec2      u_tex_size;      // (W, H) - the texture's real texel dimensions
uniform float     u_height_range;
uniform float     u_layer_step;    // 2*height_range / NUM_STEPS
uniform sampler2D u_height_tex;

const float VZ_MIN = 0.15;  // matches the reference repo's render.RESOLVE VZ_MIN

vec2 xy_per_height(vec3 t_raw, vec3 b_raw){
    return vec2(u_tex_size.x / max(length(t_raw), 1e-12), -u_tex_size.y / max(length(b_raw), 1e-12));
}

vec2 xy_to_uv(vec2 xy){
    return vec2((xy.x + 0.5) / u_tex_size.x, 1.0 - (xy.y + 0.5) / u_tex_size.y);
}

vec2 uv_to_xy(vec2 uv){
    return vec2(uv.x * u_tex_size.x - 0.5, (1.0 - uv.y) * u_tex_size.y - 0.5);
}

float sample_height(vec2 xy){
    return texture(u_height_tex, xy_to_uv(xy)).r;
}

vec2 resolve_parallax_uv(vec2 uv0, vec3 flat_pos0, vec3 n0, vec3 t_raw, vec3 b_raw){
    vec2 xy0 = uv_to_xy(uv0);
    vec3 N0 = normalize(n0);
    vec3 T0 = normalize(t_raw);
    vec3 B0 = normalize(b_raw);
    vec2 xy_per_h = xy_per_height(t_raw, b_raw);

    vec3 view_world = normalize(u_cam_pos - flat_pos0);
    vec3 view_local = vec3(dot(view_world, T0), dot(view_world, B0), dot(view_world, N0));
    float vz = max(view_local.z, VZ_MIN);
    vec2 dir_xy = (view_local.xy / vz) * xy_per_h;

    float probe_h = u_height_range;
    vec2 probe_xy = xy0 + probe_h * dir_xy;
    float surf_h = sample_height(probe_xy);

    float prev_h = probe_h;
    float prev_surf_h = surf_h;
    vec2 prev_xy = probe_xy;

    for (int i = 0; i < NUM_STEPS; ++i){
        if (surf_h >= probe_h){
            break;  // already past the surface - stop, don't fold this step into prev
        }
        prev_h = probe_h;
        prev_surf_h = surf_h;
        prev_xy = probe_xy;
        probe_h -= u_layer_step;
        probe_xy = xy0 + probe_h * dir_xy;
        surf_h = sample_height(probe_xy);
    }

    float prev_diff = prev_surf_h - prev_h;
    float cur_diff = surf_h - probe_h;
    float denom = prev_diff - cur_diff;
    float weight = 0.0;
    if (abs(denom) > 1e-8){
        weight = clamp(prev_diff / denom, 0.0, 1.0);
    }
    return xy_to_uv(prev_xy * (1.0 - weight) + probe_xy * weight);
}
`,jt=`
uniform sampler2DArray u_coeffs;
uniform vec3 u_backface_color; // see the file header - defaults to the Python literal
#ifdef SH_UNORM8
// Bundle sh_storage "unorm8": the array holds RGBA8 UNORM samples, and each coefficient
// is offset + scale * sample. Affine, so applying it after the GPU's bilinear filter is
// the same as filtering the dequantized values.
uniform vec3 u_sh_offset[K_COEFFS];
uniform vec3 u_sh_scale[K_COEFFS];
#endif

vec3 eval_sh(vec2 uv, vec3 view_local){
    vec3 v = normalize(view_local);
    // hsh_remap (sh_math.py): z clamped to [0,1] (hemisphere boundary, not
    // extrapolated), then folded onto the full sphere - matches training exactly.

    // flat: backface (or through a hole into the mesh interior)
    if(v.z <= 0.0){  // PORT: was \`<= 0\`; ES 3.00 has no implicit int->float compare
        return u_backface_color;
    }
    float hz = clamp(v.z, 0.0, 1.0);
    vec3 d = vec3(2.0 * v.x * hz, 2.0 * v.y * hz, 2.0 * hz * hz - 1.0);
    float x = d.x, y = d.y, z = d.z;
    float Y[K_COEFFS];
    Y[0] = 0.28209479177387814;
    #if DEGREE >= 1
      Y[1] = -0.4886025119029199 * y;
      Y[2] =  0.4886025119029199 * z;
      Y[3] = -0.4886025119029199 * x;
    #endif
    #if DEGREE >= 2
      float xx = x*x, yy = y*y, zz = z*z, xy = x*y, yz = y*z, xz = x*z;
      Y[4] =  1.0925484305920792  * xy;
      Y[5] = -1.0925484305920792  * yz;
      Y[6] =  0.31539156525252005 * (2.0*zz - xx - yy);
      Y[7] = -1.0925484305920792  * xz;
      Y[8] =  0.5462742152960396  * (xx - yy);
    #endif
    #if DEGREE >= 3
      Y[9]  = -0.5900435899266435 * y * (3.0*xx - yy);
      Y[10] =  2.890611442640554  * xy * z;
      Y[11] = -0.4570457994644658 * y * (4.0*zz - xx - yy);
      Y[12] =  0.3731763325901154 * z * (2.0*zz - 3.0*xx - 3.0*yy);
      Y[13] = -0.4570457994644658 * x * (4.0*zz - xx - yy);
      Y[14] =  1.445305721320277  * z * (xx - yy);
      Y[15] = -0.5900435899266435 * x * (xx - 3.0*yy);
    #endif
    vec3 color = vec3(0.0);
    for (int k = 0; k < K_COEFFS; ++k){
        vec3 c = texture(u_coeffs, vec3(uv, float(k))).rgb;
        #ifdef SH_UNORM8
        c = u_sh_offset[k] + u_sh_scale[k] * c;
        #endif
        color += Y[k] * c;
    }
    return clamp(color, 0.0, 1.0);
}
`,Zt=`
in vec2 v_uv;
in vec3 v_world_pos;
in vec3 v_normal;
in vec3 v_tangent;
in vec3 v_bitangent;
out vec4 f_color;

void main(){
    vec3 N = normalize(v_normal);
    vec2 resolved_uv = resolve_parallax_uv(v_uv, v_world_pos, N, v_tangent, v_bitangent);
    // g of the relief texture is the atlas coverage - chart interiors plus their
    // gutter. discard, not a debug colour: this viewer shows what a consumer would ship.
    if (texture(u_height_tex, resolved_uv).g < 0.5) discard;

    vec3 view_w = normalize(u_cam_pos - v_world_pos);
    // Gram-Schmidt against N, then B derived by cross product - not the interpolated
    // v_bitangent, whose sign follows the UV chart's handedness and flips on the ~46%
    // of charts xatlas mirrors. The fit used this frame; the march above uses the raw
    // tangents for their lengths.
    vec3 T = normalize(v_tangent - N * dot(v_tangent, N));
    vec3 B = cross(N, T);
    vec3 view_l = vec3(dot(view_w, T), dot(view_w, B), dot(view_w, N));
    f_color = vec4(eval_sh(resolved_uv, view_l), 1.0);
}
`;function Q({degree:t,kCoeffs:e,numSteps:r,shUnorm8:i=!1}){return`#version 300 es
precision highp float;
precision highp sampler2D;
precision highp sampler2DArray;
#define DEGREE ${t}
#define K_COEFFS ${e}
#define NUM_STEPS ${r}
`+(i?`#define SH_UNORM8
`:"")+qt+jt+Zt}var Jt=[.35,.33,.3],Qt=[["in_pos","position",3],["in_uv","uv",2],["in_normal","normal",3],["in_tangent","tangent",3],["in_bitangent","bitangent",3]];function It(t,e,r){let i=t.createShader(e);if(t.shaderSource(i,r),t.compileShader(i),!t.getShaderParameter(i,t.COMPILE_STATUS)){let s=t.getShaderInfoLog(i),n=e===t.VERTEX_SHADER?"vertex":"fragment",o=r.split(`
`).map((c,a)=>`${String(a+1).padStart(4)} | ${c}`).join(`
`);throw new Error(`${n} shader failed to compile:
${s}

${o}`)}return i}function te(t,e){let r=Q({degree:e.sh.degree,kCoeffs:e.sh.coefficients,numSteps:e.height.num_steps,shUnorm8:e.sh.storage==="unorm8"}),i=t.createProgram();if(t.attachShader(i,It(t,t.VERTEX_SHADER,J)),t.attachShader(i,It(t,t.FRAGMENT_SHADER,r)),t.linkProgram(i),!t.getProgramParameter(i,t.LINK_STATUS))throw new Error(`program failed to link:
${t.getProgramInfoLog(i)}`);return i}function Pt(t,e){t.texParameteri(e,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(e,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(e,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(e,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),e===t.TEXTURE_2D_ARRAY&&t.texParameteri(e,t.TEXTURE_WRAP_R,t.CLAMP_TO_EDGE)}function tt(t,e){let{config:r,geometry:i,textures:s}=e,[n,o]=r.texture_resolution,c=r.sh.coefficients,a=[];r.glsl_sha256&&r.glsl_sha256!==Z&&a.push("This bundle was built by a pipeline whose GLSL differs from the port in shaders.js - colours may be subtly wrong. Re-port pipeline/core/slf_shaders.py.");let h=te(t,r);t.useProgram(h),t.pixelStorei(t.UNPACK_ALIGNMENT,1);let u=l=>t.getUniformLocation(h,l),m=t.createTexture();t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,m),t.texStorage2D(t.TEXTURE_2D,1,t.RG16F,n,o),t.texSubImage2D(t.TEXTURE_2D,0,0,0,n,o,t.RG,t.HALF_FLOAT,s.height.data),Pt(t,t.TEXTURE_2D);let b=r.sh.storage==="unorm8",y=t.createTexture();t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D_ARRAY,y),b?(t.texStorage3D(t.TEXTURE_2D_ARRAY,1,t.RGBA8,n,o,c),t.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,n,o,c,t.RGBA,t.UNSIGNED_BYTE,s.sh.data),t.uniform3fv(u("u_sh_offset"),new Float32Array(r.sh.offset.flat())),t.uniform3fv(u("u_sh_scale"),new Float32Array(r.sh.scale.flat()))):(t.texStorage3D(t.TEXTURE_2D_ARRAY,1,t.RGBA16F,n,o,c),t.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,n,o,c,t.RGBA,t.HALF_FLOAT,s.sh.data)),Pt(t,t.TEXTURE_2D_ARRAY),t.uniform1i(u("u_height_tex"),0),t.uniform1i(u("u_coeffs"),2),t.uniform2f(u("u_tex_size"),n,o),t.uniform1f(u("u_height_range"),r.height.range),t.uniform1f(u("u_layer_step"),2*r.height.range/r.height.num_steps);let v=Array.isArray(r.back_face_color)&&r.back_face_color.length===3&&r.back_face_color.every(Number.isFinite)?r.back_face_color:Jt;t.uniform3f(u("u_backface_color"),v[0],v[1],v[2]);let d=[],_=t.createVertexArray();t.bindVertexArray(_);for(let[l,T,M]of Qt){let R=t.getAttribLocation(h,l);if(R<0)continue;let f=t.createBuffer();d.push(f),t.bindBuffer(t.ARRAY_BUFFER,f),t.bufferData(t.ARRAY_BUFFER,i[T],t.STATIC_DRAW),t.enableVertexAttribArray(R),t.vertexAttribPointer(R,M,t.FLOAT,!1,0,0)}let p=t.createBuffer();d.push(p),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,p),t.bufferData(t.ELEMENT_ARRAY_BUFFER,i.indices,t.STATIC_DRAW),t.bindVertexArray(null);let E=i.indices.length,g=u("u_mvp"),w=u("u_cam_pos");return{warnings:a,draw(l,T){t.useProgram(h),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,m),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D_ARRAY,y),t.bindVertexArray(_),t.uniformMatrix4fv(g,!1,l),t.uniform3f(w,T[0],T[1],T[2]),t.drawElements(t.TRIANGLES,E,t.UNSIGNED_INT,0),t.bindVertexArray(null)},dispose(){t.deleteVertexArray(_);for(let l of d)t.deleteBuffer(l);for(let l of[m,y])t.deleteTexture(l);t.deleteProgram(h)}}}var xt={controls:!0,autoStart:!0,maxPixelRatio:2,antialias:!0,fov:null,contextAttributes:null,loadingIndicator:!0,passthrough:!1,autoRotate:!0,autoRotateSpeed:25,onProgress:null,onReady:null,onError:null,onWarning:null},ee="WebGL2 is unavailable in this browser. The viewer needs it for 2D array textures, 16-bit float textures, and 32-bit indices.",et=class{constructor(e,r,i={}){var s;if(this.canvas=typeof e=="string"?document.querySelector(e):e,!this.canvas)throw new Error(`Snap3dViewer: no canvas matching ${e}`);if(this.url=String(r).replace(/\/+$/,""),this.options={...xt,...i},this.config=null,this.stats=null,this.camera=null,this.controls=null,this.warnings=[],this.spin=0,this._renderer=null,this._raf=0,this._dirty=!0,this._running=this.options.autoStart,this._disposed=!1,this._loadSeq=0,this._last=0,this._autoRotating=!1,this._frame=this._frame.bind(this),this.gl=this.canvas.getContext("webgl2",{antialias:this.options.antialias,depth:!0,...(s=this.options.contextAttributes)!=null?s:{}}),!this.gl)throw new Error(ee);this._bindContextEvents(),this._observeSize(),this.options.passthrough&&this._bindPassthrough(),this._overlayHost=null,this._loadingEl=null,this._loadingBarEl=null,this._loadingTextEl=null,this._loadingPendingHide=!1,this.options.loadingIndicator&&this._showLoadingIndicator(),this.ready=this._load().catch(n=>{throw this._reportError(n),n})}get isReady(){return this._renderer!==null}get rotation(){return!this.camera||!this.config?null:{center:this.camera.origin,axis:S(this.config.up_vector)}}get textureBytes(){if(!this.config)return 0;let[e,r]=this.config.texture_resolution,i=this.config.sh.storage==="unorm8"?1:2;return e*r*(i*4*this.config.sh.coefficients+4)}requestRender(){this._dirty=!0,this._schedule()}start(){return this._running=!0,this.requestRender(),this}stop(){return this._running=!1,this._raf&&cancelAnimationFrame(this._raf),this._raf=0,this}load(e){var r,i;return this.url=String(e).replace(/\/+$/,""),this.options.loadingIndicator&&this._showLoadingIndicator(),(r=this._renderer)==null||r.dispose(),this._renderer=null,(i=this.controls)==null||i.dispose(),this.controls=null,this.camera=null,this.config=null,this.stats=null,this.warnings=[],this.ready=this._load().catch(s=>{throw this._reportError(s),s}),this.ready}renderFrame(){return this._renderer&&this._draw(),this}setCamera(e){return this.controls?this.controls.setCamera(e):this.camera&&(e.azimuth!==void 0&&(this.camera.azimuth=e.azimuth),e.elevation!==void 0&&(this.camera.elevation=e.elevation),e.radius!==void 0&&(this.camera.radius=e.radius),e.target!==void 0&&(this.camera.origin=[...e.target])),this.requestRender(),this}spinBy(e){if(!this.camera||!this.rotation||!e)return this;let{center:r,axis:i}=this.rotation,s=-e*Math.PI/180;return this.camera.setPose(W(this.camera.position,r,i,s),W(this.camera.origin,r,i,s)),this.spin=(this.spin+e)%360,this.requestRender(),this}focus(){var e,r;return(r=(e=this.canvas).focus)==null||r.call(e,{preventScroll:!0}),this}resize(){let e=Math.min(devicePixelRatio||1,this.options.maxPixelRatio),r=Math.max(1,Math.round((this.canvas.clientWidth||this.canvas.width)*e)),i=Math.max(1,Math.round((this.canvas.clientHeight||this.canvas.height)*e));return this.canvas.width===r&&this.canvas.height===i?!1:(this.canvas.width=r,this.canvas.height=i,this.requestRender(),!0)}dispose(){var e,r,i,s,n,o;this._disposed=!0,this.stop(),(e=this.controls)==null||e.dispose(),(r=this._resizeObserver)==null||r.disconnect(),(i=this._loadingEl)==null||i.remove();for(let c of(s=this._unbind)!=null?s:[])c();this._unbind=[],(n=this._renderer)==null||n.dispose(),this._renderer=null,(o=this.gl.getExtension("WEBGL_lose_context"))==null||o.loseContext()}async _load(){var s,n;let e=++this._loadSeq,r=await K(this.url,(o,c)=>{var a,h;this._updateLoadingIndicator(o,c),(h=(a=this.options).onProgress)==null||h.call(a,o,c)});if(this._disposed||e!==this._loadSeq)return this;this.config=r.config,this.stats=r.stats,this._renderer=tt(this.gl,r),this.warnings=this._renderer.warnings;for(let o of this.warnings)this._warn(o);let i=this.config.initial_camera;return this.spin=0,this.camera||(this.camera=new B(i.target,i.radius,this.config.up_vector),this.camera.azimuth=i.azimuth_deg,this.camera.elevation=i.elevation_deg,this._autoRotating=this.options.autoRotate,this.options.controls&&(this.controls=new C(this.canvas,this.camera,{...this.options.controls===!0?{}:this.options.controls,onChange:()=>this.requestRender(),onInteract:()=>{this._autoRotating=!1}}))),this.gl.enable(this.gl.DEPTH_TEST),this.resize(),this.requestRender(),(n=(s=this.options).onReady)==null||n.call(s,this),this}_warn(e){this.options.onWarning?this.options.onWarning(e):console.warn(`Snap3dViewer: ${e}`)}_schedule(){this._raf||!this._running||this._disposed||!this._renderer||(this._raf=requestAnimationFrame(this._frame))}_frame(e){var i,s;if(this._raf=0,this._disposed||!this._renderer)return;let r=this._last?Math.min((e-this._last)/1e3,.1):0;this._last=e,(i=this.controls)==null||i.update(r),this._autoRotating&&(this.spinBy(this.options.autoRotateSpeed*r),this._dirty=!0),this._dirty&&(this._dirty=!1,this._draw()),(s=this.controls)!=null&&s.active||this._autoRotating?this._schedule():this._last=0}_draw(){var o;let{gl:e,canvas:r,camera:i,config:s}=this;e.viewport(0,0,r.width,r.height),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT);let n=pt((o=this.options.fov)!=null?o:s.initial_camera.fov_deg,r.width/r.height,i.radius*.02,i.radius*20);this._renderer.draw(mt(n,i.viewMatrix()),i.position),this._loadingPendingHide&&(this._loadingPendingHide=!1,this._hideLoadingIndicator())}_showLoadingIndicator(){let e=this.options.loadingIndicator,r=e&&typeof e=="object"&&e.color||"#3b82f6";if(!this._loadingEl){let i=this._ensureOverlayHost(),s=document.createElement("div");s.style.cssText="position:absolute; left:50%; bottom:16px; transform:translateX(-50%); z-index:2147483000; display:flex; flex-direction:column; align-items:center; gap:8px; padding:10px 16px; border-radius:10px; background:rgba(15,15,17,0.72); backdrop-filter:blur(6px); -webkit-backdrop-filter:blur(6px); pointer-events:none; transition:opacity 0.3s ease; font:12px/1.4 ui-monospace,SFMono-Regular,Consolas,monospace;";let n=document.createElement("div");n.style.cssText="width:140px; height:3px; border-radius:2px; background:rgba(255,255,255,0.2); overflow:hidden;";let o=document.createElement("div");o.style.cssText="width:0%; height:100%; transition:width 0.15s linear;",n.appendChild(o);let c=document.createElement("div");c.style.cssText="color:rgba(255,255,255,0.85); white-space:nowrap;",s.append(n,c),i.appendChild(s),this._loadingEl=s,this._loadingTrackEl=n,this._loadingBarEl=o,this._loadingTextEl=c}this._loadingTrackEl.style.display="",this._loadingBarEl.style.width="0%",this._loadingBarEl.style.background=r,this._loadingTextEl.textContent="loading\u2026",this._loadingTextEl.style.color="",this._loadingEl.style.display="",this._loadingEl.style.opacity="1",this._loadingPendingHide=!0}_updateLoadingIndicator(e,r){this._loadingBarEl&&(this._loadingBarEl.style.width=`${r?e/r*100:0}%`,this._loadingTextEl.textContent=e<r?`${(e/1e6).toFixed(1)} / ${(r/1e6).toFixed(1)} MB`:"decompressing\u2026")}_hideLoadingIndicator(){this._loadingEl&&(this._loadingEl.style.opacity="0")}_reportError(e){var r,i,s;this._loadingEl&&(this._loadingPendingHide=!1,this._loadingTrackEl.style.display="none",this._loadingTextEl.textContent=String((r=e==null?void 0:e.message)!=null?r:e),this._loadingTextEl.style.color="#f87171",this._loadingEl.style.display="",this._loadingEl.style.opacity="1"),(s=(i=this.options).onError)==null||s.call(i,e)}_ensureOverlayHost(){if(this._overlayHost)return this._overlayHost;let e=this.canvas.parentNode;if(["relative","absolute","fixed","sticky"].includes(e&&getComputedStyle(e).position))this._overlayHost=e;else{let i=document.createElement("div");i.style.cssText="position:relative;",e.insertBefore(i,this.canvas),i.appendChild(this.canvas),this._overlayHost=i}return this._overlayHost}_observeSize(){var e;if(typeof ResizeObserver>"u"){let r=()=>this.resize();addEventListener("resize",r),this._unbind=[...(e=this._unbind)!=null?e:[],()=>removeEventListener("resize",r)];return}this._resizeObserver=new ResizeObserver(()=>this.resize()),this._resizeObserver.observe(this.canvas)}_bindContextEvents(){var i;this._unbind=(i=this._unbind)!=null?i:[];let e=s=>{s.preventDefault(),this.stop(),this._renderer=null,this._warn("WebGL context lost; reloading the bundle when it comes back.")},r=()=>{this._running=this.options.autoStart,this._load().catch(s=>{var n,o;return(o=(n=this.options).onError)==null?void 0:o.call(n,s)})};this.canvas.addEventListener("webglcontextlost",e),this.canvas.addEventListener("webglcontextrestored",r),this._unbind.push(()=>this.canvas.removeEventListener("webglcontextlost",e),()=>this.canvas.removeEventListener("webglcontextrestored",r))}_bindPassthrough(){this.canvas.style.touchAction="auto";let e=new Set,r=(a,h)=>{if(!this._renderer||!this.camera)return!1;let u=this.canvas.getBoundingClientRect(),m=this.canvas.width/u.width,b=Math.round((a-u.left)*m),y=Math.round((u.bottom-h)*m);if(b<0||y<0||b>=this.canvas.width||y>=this.canvas.height)return!1;this._draw();let v=new Uint8Array(4);return this.gl.readPixels(b,y,1,1,this.gl.RGBA,this.gl.UNSIGNED_BYTE,v),v[3]<=8},i=a=>{var u;if(!r(a.clientX,a.clientY))return;a.stopImmediatePropagation(),this.canvas.style.pointerEvents="none";let h=document.elementFromPoint(a.clientX,a.clientY);this.canvas.style.pointerEvents="",(u=h==null?void 0:h.closest('a, button, label, input, select, textarea, [role="button"]'))==null||u.click()},s=a=>[...a].every(h=>e.has(h.identifier)),n=a=>{for(let h of a.changedTouches)r(h.clientX,h.clientY)&&e.add(h.identifier);s(a.touches)&&a.stopImmediatePropagation()},o=a=>{s(a.touches)&&a.stopImmediatePropagation()},c=a=>{for(let h of a.changedTouches)e.delete(h.identifier)};this.canvas.addEventListener("pointerdown",i,{capture:!0}),this.canvas.addEventListener("touchstart",n,{capture:!0,passive:!1}),this.canvas.addEventListener("touchmove",o,{capture:!0,passive:!1}),this.canvas.addEventListener("touchend",c,{capture:!0}),this.canvas.addEventListener("touchcancel",c,{capture:!0}),this._unbind.push(()=>this.canvas.removeEventListener("pointerdown",i,{capture:!0}),()=>this.canvas.removeEventListener("touchstart",n,{capture:!0,passive:!1}),()=>this.canvas.removeEventListener("touchmove",o,{capture:!0,passive:!1}),()=>this.canvas.removeEventListener("touchend",c,{capture:!0}),()=>this.canvas.removeEventListener("touchcancel",c,{capture:!0}))}};var ie="0.1.0";var{Snap3dViewer:yt}=it;for(let[t,e]of Object.entries(it))t!=="Snap3dViewer"&&(yt[t]=e);globalThis.Snap3dViewer=yt;var Me=yt;})();
//# sourceMappingURL=viewer.js.map
