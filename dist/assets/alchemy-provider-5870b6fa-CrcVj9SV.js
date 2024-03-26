import {
  e as gs,
  h as yn,
  j as L,
  B as C,
  L as m,
  k as je,
  l as G,
  m as vi,
  o as As,
  s as tt,
  p as ne,
  q as ie,
  r as Z,
  u as le,
  w as T,
  x as Gr,
  y as We,
  z as wn,
  D as Rn,
  C as Tn,
  F as ms,
  N as On,
  I as bs,
  V as Fn,
  _ as ln,
  G as ys,
  H as ws,
  d as xs,
  J as Es,
  K as _s,
} from "./index-bbFr3rTR.js";
var gi = { exports: {} };
/**
 * [js-sha3]{@link https://github.com/emn178/js-sha3}
 *
 * @version 0.8.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2015-2018
 * @license MIT
 */ (function (n) {
  (function () {
    var e = "input is invalid type",
      t = "finalize already called",
      r = typeof window == "object",
      i = r ? window : {};
    i.JS_SHA3_NO_WINDOW && (r = !1);
    var s = !r && typeof self == "object",
      o =
        !i.JS_SHA3_NO_NODE_JS &&
        typeof process == "object" &&
        process.versions &&
        process.versions.node;
    o ? (i = gs) : s && (i = self);
    var a = !i.JS_SHA3_NO_COMMON_JS && !0 && n.exports,
      u = !i.JS_SHA3_NO_ARRAY_BUFFER && typeof ArrayBuffer < "u",
      c = "0123456789abcdef".split(""),
      l = [31, 7936, 2031616, 520093696],
      h = [4, 1024, 262144, 67108864],
      d = [1, 256, 65536, 16777216],
      p = [6, 1536, 393216, 100663296],
      v = [0, 8, 16, 24],
      A = [
        1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0,
        2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136,
        0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905,
        2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648,
        32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896,
        2147483648, 2147483649, 0, 2147516424, 2147483648,
      ],
      k = [224, 256, 384, 512],
      y = [128, 256],
      E = ["hex", "buffer", "arrayBuffer", "array", "digest"],
      O = { 128: 168, 256: 136 };
    (i.JS_SHA3_NO_NODE_JS || !Array.isArray) &&
      (Array.isArray = function (f) {
        return Object.prototype.toString.call(f) === "[object Array]";
      }),
      u &&
        (i.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView) &&
        (ArrayBuffer.isView = function (f) {
          return (
            typeof f == "object" &&
            f.buffer &&
            f.buffer.constructor === ArrayBuffer
          );
        });
    for (
      var M = function (f, g, b) {
          return function (w) {
            return new J(f, g, f).update(w)[b]();
          };
        },
        S = function (f, g, b) {
          return function (w, _) {
            return new J(f, g, _).update(w)[b]();
          };
        },
        q = function (f, g, b) {
          return function (w, _, N, P) {
            return ge["cshake" + f].update(w, _, N, P)[b]();
          };
        },
        ee = function (f, g, b) {
          return function (w, _, N, P) {
            return ge["kmac" + f].update(w, _, N, P)[b]();
          };
        },
        z = function (f, g, b, w) {
          for (var _ = 0; _ < E.length; ++_) {
            var N = E[_];
            f[N] = g(b, w, N);
          }
          return f;
        },
        j = function (f, g) {
          var b = M(f, g, "hex");
          return (
            (b.create = function () {
              return new J(f, g, f);
            }),
            (b.update = function (w) {
              return b.create().update(w);
            }),
            z(b, M, f, g)
          );
        },
        He = function (f, g) {
          var b = S(f, g, "hex");
          return (
            (b.create = function (w) {
              return new J(f, g, w);
            }),
            (b.update = function (w, _) {
              return b.create(_).update(w);
            }),
            z(b, S, f, g)
          );
        },
        Nt = function (f, g) {
          var b = O[f],
            w = q(f, g, "hex");
          return (
            (w.create = function (_, N, P) {
              return !N && !P
                ? ge["shake" + f].create(_)
                : new J(f, g, _).bytepad([N, P], b);
            }),
            (w.update = function (_, N, P, I) {
              return w.create(N, P, I).update(_);
            }),
            z(w, q, f, g)
          );
        },
        Pt = function (f, g) {
          var b = O[f],
            w = ee(f, g, "hex");
          return (
            (w.create = function (_, N, P) {
              return new Vr(f, g, N).bytepad(["KMAC", P], b).bytepad([_], b);
            }),
            (w.update = function (_, N, P, I) {
              return w.create(_, P, I).update(N);
            }),
            z(w, ee, f, g)
          );
        },
        ut = [
          { name: "keccak", padding: d, bits: k, createMethod: j },
          { name: "sha3", padding: p, bits: k, createMethod: j },
          { name: "shake", padding: l, bits: y, createMethod: He },
          { name: "cshake", padding: h, bits: y, createMethod: Nt },
          { name: "kmac", padding: h, bits: y, createMethod: Pt },
        ],
        ge = {},
        _e = [],
        ae = 0;
      ae < ut.length;
      ++ae
    )
      for (var Fe = ut[ae], Ye = Fe.bits, ct = 0; ct < Ye.length; ++ct) {
        var Wr = Fe.name + "_" + Ye[ct];
        if (
          (_e.push(Wr),
          (ge[Wr] = Fe.createMethod(Ye[ct], Fe.padding)),
          Fe.name !== "sha3")
        ) {
          var Bn = Fe.name + Ye[ct];
          _e.push(Bn), (ge[Bn] = ge[Wr]);
        }
      }
    function J(f, g, b) {
      (this.blocks = []),
        (this.s = []),
        (this.padding = g),
        (this.outputBits = b),
        (this.reset = !0),
        (this.finalized = !1),
        (this.block = 0),
        (this.start = 0),
        (this.blockCount = (1600 - (f << 1)) >> 5),
        (this.byteCount = this.blockCount << 2),
        (this.outputBlocks = b >> 5),
        (this.extraBytes = (b & 31) >> 3);
      for (var w = 0; w < 50; ++w) this.s[w] = 0;
    }
    (J.prototype.update = function (f) {
      if (this.finalized) throw new Error(t);
      var g,
        b = typeof f;
      if (b !== "string") {
        if (b === "object") {
          if (f === null) throw new Error(e);
          if (u && f.constructor === ArrayBuffer) f = new Uint8Array(f);
          else if (!Array.isArray(f) && (!u || !ArrayBuffer.isView(f)))
            throw new Error(e);
        } else throw new Error(e);
        g = !0;
      }
      for (
        var w = this.blocks,
          _ = this.byteCount,
          N = f.length,
          P = this.blockCount,
          I = 0,
          Q = this.s,
          B,
          K;
        I < N;

      ) {
        if (this.reset)
          for (this.reset = !1, w[0] = this.block, B = 1; B < P + 1; ++B)
            w[B] = 0;
        if (g)
          for (B = this.start; I < N && B < _; ++I)
            w[B >> 2] |= f[I] << v[B++ & 3];
        else
          for (B = this.start; I < N && B < _; ++I)
            (K = f.charCodeAt(I)),
              K < 128
                ? (w[B >> 2] |= K << v[B++ & 3])
                : K < 2048
                  ? ((w[B >> 2] |= (192 | (K >> 6)) << v[B++ & 3]),
                    (w[B >> 2] |= (128 | (K & 63)) << v[B++ & 3]))
                  : K < 55296 || K >= 57344
                    ? ((w[B >> 2] |= (224 | (K >> 12)) << v[B++ & 3]),
                      (w[B >> 2] |= (128 | ((K >> 6) & 63)) << v[B++ & 3]),
                      (w[B >> 2] |= (128 | (K & 63)) << v[B++ & 3]))
                    : ((K =
                        65536 +
                        (((K & 1023) << 10) | (f.charCodeAt(++I) & 1023))),
                      (w[B >> 2] |= (240 | (K >> 18)) << v[B++ & 3]),
                      (w[B >> 2] |= (128 | ((K >> 12) & 63)) << v[B++ & 3]),
                      (w[B >> 2] |= (128 | ((K >> 6) & 63)) << v[B++ & 3]),
                      (w[B >> 2] |= (128 | (K & 63)) << v[B++ & 3]));
        if (((this.lastByteIndex = B), B >= _)) {
          for (this.start = B - _, this.block = w[P], B = 0; B < P; ++B)
            Q[B] ^= w[B];
          lt(Q), (this.reset = !0);
        } else this.start = B;
      }
      return this;
    }),
      (J.prototype.encode = function (f, g) {
        var b = f & 255,
          w = 1,
          _ = [b];
        for (f = f >> 8, b = f & 255; b > 0; )
          _.unshift(b), (f = f >> 8), (b = f & 255), ++w;
        return g ? _.push(w) : _.unshift(w), this.update(_), _.length;
      }),
      (J.prototype.encodeString = function (f) {
        var g,
          b = typeof f;
        if (b !== "string") {
          if (b === "object") {
            if (f === null) throw new Error(e);
            if (u && f.constructor === ArrayBuffer) f = new Uint8Array(f);
            else if (!Array.isArray(f) && (!u || !ArrayBuffer.isView(f)))
              throw new Error(e);
          } else throw new Error(e);
          g = !0;
        }
        var w = 0,
          _ = f.length;
        if (g) w = _;
        else
          for (var N = 0; N < f.length; ++N) {
            var P = f.charCodeAt(N);
            P < 128
              ? (w += 1)
              : P < 2048
                ? (w += 2)
                : P < 55296 || P >= 57344
                  ? (w += 3)
                  : ((P =
                      65536 +
                      (((P & 1023) << 10) | (f.charCodeAt(++N) & 1023))),
                    (w += 4));
          }
        return (w += this.encode(w * 8)), this.update(f), w;
      }),
      (J.prototype.bytepad = function (f, g) {
        for (var b = this.encode(g), w = 0; w < f.length; ++w)
          b += this.encodeString(f[w]);
        var _ = g - (b % g),
          N = [];
        return (N.length = _), this.update(N), this;
      }),
      (J.prototype.finalize = function () {
        if (!this.finalized) {
          this.finalized = !0;
          var f = this.blocks,
            g = this.lastByteIndex,
            b = this.blockCount,
            w = this.s;
          if (
            ((f[g >> 2] |= this.padding[g & 3]),
            this.lastByteIndex === this.byteCount)
          )
            for (f[0] = f[b], g = 1; g < b + 1; ++g) f[g] = 0;
          for (f[b - 1] |= 2147483648, g = 0; g < b; ++g) w[g] ^= f[g];
          lt(w);
        }
      }),
      (J.prototype.toString = J.prototype.hex =
        function () {
          this.finalize();
          for (
            var f = this.blockCount,
              g = this.s,
              b = this.outputBlocks,
              w = this.extraBytes,
              _ = 0,
              N = 0,
              P = "",
              I;
            N < b;

          ) {
            for (_ = 0; _ < f && N < b; ++_, ++N)
              (I = g[_]),
                (P +=
                  c[(I >> 4) & 15] +
                  c[I & 15] +
                  c[(I >> 12) & 15] +
                  c[(I >> 8) & 15] +
                  c[(I >> 20) & 15] +
                  c[(I >> 16) & 15] +
                  c[(I >> 28) & 15] +
                  c[(I >> 24) & 15]);
            N % f === 0 && (lt(g), (_ = 0));
          }
          return (
            w &&
              ((I = g[_]),
              (P += c[(I >> 4) & 15] + c[I & 15]),
              w > 1 && (P += c[(I >> 12) & 15] + c[(I >> 8) & 15]),
              w > 2 && (P += c[(I >> 20) & 15] + c[(I >> 16) & 15])),
            P
          );
        }),
      (J.prototype.arrayBuffer = function () {
        this.finalize();
        var f = this.blockCount,
          g = this.s,
          b = this.outputBlocks,
          w = this.extraBytes,
          _ = 0,
          N = 0,
          P = this.outputBits >> 3,
          I;
        w ? (I = new ArrayBuffer((b + 1) << 2)) : (I = new ArrayBuffer(P));
        for (var Q = new Uint32Array(I); N < b; ) {
          for (_ = 0; _ < f && N < b; ++_, ++N) Q[N] = g[_];
          N % f === 0 && lt(g);
        }
        return w && ((Q[_] = g[_]), (I = I.slice(0, P))), I;
      }),
      (J.prototype.buffer = J.prototype.arrayBuffer),
      (J.prototype.digest = J.prototype.array =
        function () {
          this.finalize();
          for (
            var f = this.blockCount,
              g = this.s,
              b = this.outputBlocks,
              w = this.extraBytes,
              _ = 0,
              N = 0,
              P = [],
              I,
              Q;
            N < b;

          ) {
            for (_ = 0; _ < f && N < b; ++_, ++N)
              (I = N << 2),
                (Q = g[_]),
                (P[I] = Q & 255),
                (P[I + 1] = (Q >> 8) & 255),
                (P[I + 2] = (Q >> 16) & 255),
                (P[I + 3] = (Q >> 24) & 255);
            N % f === 0 && lt(g);
          }
          return (
            w &&
              ((I = N << 2),
              (Q = g[_]),
              (P[I] = Q & 255),
              w > 1 && (P[I + 1] = (Q >> 8) & 255),
              w > 2 && (P[I + 2] = (Q >> 16) & 255)),
            P
          );
        });
    function Vr(f, g, b) {
      J.call(this, f, g, b);
    }
    (Vr.prototype = new J()),
      (Vr.prototype.finalize = function () {
        return (
          this.encode(this.outputBits, !0), J.prototype.finalize.call(this)
        );
      });
    var lt = function (f) {
      var g,
        b,
        w,
        _,
        N,
        P,
        I,
        Q,
        B,
        K,
        St,
        Ct,
        Bt,
        Rt,
        Tt,
        Ot,
        Ft,
        Dt,
        Mt,
        Lt,
        Ut,
        qt,
        Gt,
        Ht,
        zt,
        Kt,
        Jt,
        Qt,
        Yt,
        jt,
        Wt,
        Vt,
        Xt,
        Zt,
        $t,
        er,
        tr,
        rr,
        nr,
        ir,
        sr,
        or,
        ar,
        fr,
        ur,
        cr,
        lr,
        hr,
        dr,
        pr,
        vr,
        gr,
        Ar,
        mr,
        br,
        yr,
        wr,
        xr,
        Er,
        _r,
        kr,
        Ir,
        Nr;
      for (w = 0; w < 48; w += 2)
        (_ = f[0] ^ f[10] ^ f[20] ^ f[30] ^ f[40]),
          (N = f[1] ^ f[11] ^ f[21] ^ f[31] ^ f[41]),
          (P = f[2] ^ f[12] ^ f[22] ^ f[32] ^ f[42]),
          (I = f[3] ^ f[13] ^ f[23] ^ f[33] ^ f[43]),
          (Q = f[4] ^ f[14] ^ f[24] ^ f[34] ^ f[44]),
          (B = f[5] ^ f[15] ^ f[25] ^ f[35] ^ f[45]),
          (K = f[6] ^ f[16] ^ f[26] ^ f[36] ^ f[46]),
          (St = f[7] ^ f[17] ^ f[27] ^ f[37] ^ f[47]),
          (Ct = f[8] ^ f[18] ^ f[28] ^ f[38] ^ f[48]),
          (Bt = f[9] ^ f[19] ^ f[29] ^ f[39] ^ f[49]),
          (g = Ct ^ ((P << 1) | (I >>> 31))),
          (b = Bt ^ ((I << 1) | (P >>> 31))),
          (f[0] ^= g),
          (f[1] ^= b),
          (f[10] ^= g),
          (f[11] ^= b),
          (f[20] ^= g),
          (f[21] ^= b),
          (f[30] ^= g),
          (f[31] ^= b),
          (f[40] ^= g),
          (f[41] ^= b),
          (g = _ ^ ((Q << 1) | (B >>> 31))),
          (b = N ^ ((B << 1) | (Q >>> 31))),
          (f[2] ^= g),
          (f[3] ^= b),
          (f[12] ^= g),
          (f[13] ^= b),
          (f[22] ^= g),
          (f[23] ^= b),
          (f[32] ^= g),
          (f[33] ^= b),
          (f[42] ^= g),
          (f[43] ^= b),
          (g = P ^ ((K << 1) | (St >>> 31))),
          (b = I ^ ((St << 1) | (K >>> 31))),
          (f[4] ^= g),
          (f[5] ^= b),
          (f[14] ^= g),
          (f[15] ^= b),
          (f[24] ^= g),
          (f[25] ^= b),
          (f[34] ^= g),
          (f[35] ^= b),
          (f[44] ^= g),
          (f[45] ^= b),
          (g = Q ^ ((Ct << 1) | (Bt >>> 31))),
          (b = B ^ ((Bt << 1) | (Ct >>> 31))),
          (f[6] ^= g),
          (f[7] ^= b),
          (f[16] ^= g),
          (f[17] ^= b),
          (f[26] ^= g),
          (f[27] ^= b),
          (f[36] ^= g),
          (f[37] ^= b),
          (f[46] ^= g),
          (f[47] ^= b),
          (g = K ^ ((_ << 1) | (N >>> 31))),
          (b = St ^ ((N << 1) | (_ >>> 31))),
          (f[8] ^= g),
          (f[9] ^= b),
          (f[18] ^= g),
          (f[19] ^= b),
          (f[28] ^= g),
          (f[29] ^= b),
          (f[38] ^= g),
          (f[39] ^= b),
          (f[48] ^= g),
          (f[49] ^= b),
          (Rt = f[0]),
          (Tt = f[1]),
          (cr = (f[11] << 4) | (f[10] >>> 28)),
          (lr = (f[10] << 4) | (f[11] >>> 28)),
          (Qt = (f[20] << 3) | (f[21] >>> 29)),
          (Yt = (f[21] << 3) | (f[20] >>> 29)),
          (_r = (f[31] << 9) | (f[30] >>> 23)),
          (kr = (f[30] << 9) | (f[31] >>> 23)),
          (or = (f[40] << 18) | (f[41] >>> 14)),
          (ar = (f[41] << 18) | (f[40] >>> 14)),
          (Zt = (f[2] << 1) | (f[3] >>> 31)),
          ($t = (f[3] << 1) | (f[2] >>> 31)),
          (Ot = (f[13] << 12) | (f[12] >>> 20)),
          (Ft = (f[12] << 12) | (f[13] >>> 20)),
          (hr = (f[22] << 10) | (f[23] >>> 22)),
          (dr = (f[23] << 10) | (f[22] >>> 22)),
          (jt = (f[33] << 13) | (f[32] >>> 19)),
          (Wt = (f[32] << 13) | (f[33] >>> 19)),
          (Ir = (f[42] << 2) | (f[43] >>> 30)),
          (Nr = (f[43] << 2) | (f[42] >>> 30)),
          (mr = (f[5] << 30) | (f[4] >>> 2)),
          (br = (f[4] << 30) | (f[5] >>> 2)),
          (er = (f[14] << 6) | (f[15] >>> 26)),
          (tr = (f[15] << 6) | (f[14] >>> 26)),
          (Dt = (f[25] << 11) | (f[24] >>> 21)),
          (Mt = (f[24] << 11) | (f[25] >>> 21)),
          (pr = (f[34] << 15) | (f[35] >>> 17)),
          (vr = (f[35] << 15) | (f[34] >>> 17)),
          (Vt = (f[45] << 29) | (f[44] >>> 3)),
          (Xt = (f[44] << 29) | (f[45] >>> 3)),
          (Ht = (f[6] << 28) | (f[7] >>> 4)),
          (zt = (f[7] << 28) | (f[6] >>> 4)),
          (yr = (f[17] << 23) | (f[16] >>> 9)),
          (wr = (f[16] << 23) | (f[17] >>> 9)),
          (rr = (f[26] << 25) | (f[27] >>> 7)),
          (nr = (f[27] << 25) | (f[26] >>> 7)),
          (Lt = (f[36] << 21) | (f[37] >>> 11)),
          (Ut = (f[37] << 21) | (f[36] >>> 11)),
          (gr = (f[47] << 24) | (f[46] >>> 8)),
          (Ar = (f[46] << 24) | (f[47] >>> 8)),
          (fr = (f[8] << 27) | (f[9] >>> 5)),
          (ur = (f[9] << 27) | (f[8] >>> 5)),
          (Kt = (f[18] << 20) | (f[19] >>> 12)),
          (Jt = (f[19] << 20) | (f[18] >>> 12)),
          (xr = (f[29] << 7) | (f[28] >>> 25)),
          (Er = (f[28] << 7) | (f[29] >>> 25)),
          (ir = (f[38] << 8) | (f[39] >>> 24)),
          (sr = (f[39] << 8) | (f[38] >>> 24)),
          (qt = (f[48] << 14) | (f[49] >>> 18)),
          (Gt = (f[49] << 14) | (f[48] >>> 18)),
          (f[0] = Rt ^ (~Ot & Dt)),
          (f[1] = Tt ^ (~Ft & Mt)),
          (f[10] = Ht ^ (~Kt & Qt)),
          (f[11] = zt ^ (~Jt & Yt)),
          (f[20] = Zt ^ (~er & rr)),
          (f[21] = $t ^ (~tr & nr)),
          (f[30] = fr ^ (~cr & hr)),
          (f[31] = ur ^ (~lr & dr)),
          (f[40] = mr ^ (~yr & xr)),
          (f[41] = br ^ (~wr & Er)),
          (f[2] = Ot ^ (~Dt & Lt)),
          (f[3] = Ft ^ (~Mt & Ut)),
          (f[12] = Kt ^ (~Qt & jt)),
          (f[13] = Jt ^ (~Yt & Wt)),
          (f[22] = er ^ (~rr & ir)),
          (f[23] = tr ^ (~nr & sr)),
          (f[32] = cr ^ (~hr & pr)),
          (f[33] = lr ^ (~dr & vr)),
          (f[42] = yr ^ (~xr & _r)),
          (f[43] = wr ^ (~Er & kr)),
          (f[4] = Dt ^ (~Lt & qt)),
          (f[5] = Mt ^ (~Ut & Gt)),
          (f[14] = Qt ^ (~jt & Vt)),
          (f[15] = Yt ^ (~Wt & Xt)),
          (f[24] = rr ^ (~ir & or)),
          (f[25] = nr ^ (~sr & ar)),
          (f[34] = hr ^ (~pr & gr)),
          (f[35] = dr ^ (~vr & Ar)),
          (f[44] = xr ^ (~_r & Ir)),
          (f[45] = Er ^ (~kr & Nr)),
          (f[6] = Lt ^ (~qt & Rt)),
          (f[7] = Ut ^ (~Gt & Tt)),
          (f[16] = jt ^ (~Vt & Ht)),
          (f[17] = Wt ^ (~Xt & zt)),
          (f[26] = ir ^ (~or & Zt)),
          (f[27] = sr ^ (~ar & $t)),
          (f[36] = pr ^ (~gr & fr)),
          (f[37] = vr ^ (~Ar & ur)),
          (f[46] = _r ^ (~Ir & mr)),
          (f[47] = kr ^ (~Nr & br)),
          (f[8] = qt ^ (~Rt & Ot)),
          (f[9] = Gt ^ (~Tt & Ft)),
          (f[18] = Vt ^ (~Ht & Kt)),
          (f[19] = Xt ^ (~zt & Jt)),
          (f[28] = or ^ (~Zt & er)),
          (f[29] = ar ^ (~$t & tr)),
          (f[38] = gr ^ (~fr & cr)),
          (f[39] = Ar ^ (~ur & lr)),
          (f[48] = Ir ^ (~mr & yr)),
          (f[49] = Nr ^ (~br & wr)),
          (f[0] ^= A[w]),
          (f[1] ^= A[w + 1]);
    };
    if (a) n.exports = ge;
    else for (ae = 0; ae < _e.length; ++ae) i[_e[ae]] = ge[_e[ae]];
  })();
})(gi);
var ks = gi.exports;
const Is = yn(ks);
function X(n) {
  return "0x" + Is.keccak_256(L(n));
}
const Ns = "0x0000000000000000000000000000000000000000",
  Ps = C.from(0),
  Ss = "0x0000000000000000000000000000000000000000000000000000000000000000",
  Cs = "strings/5.7.0",
  Ai = new m(Cs);
var wt;
(function (n) {
  (n.current = ""),
    (n.NFC = "NFC"),
    (n.NFD = "NFD"),
    (n.NFKC = "NFKC"),
    (n.NFKD = "NFKD");
})(wt || (wt = {}));
var ue;
(function (n) {
  (n.UNEXPECTED_CONTINUE = "unexpected continuation byte"),
    (n.BAD_PREFIX = "bad codepoint prefix"),
    (n.OVERRUN = "string overrun"),
    (n.MISSING_CONTINUE = "missing continuation byte"),
    (n.OUT_OF_RANGE = "out of UTF-8 range"),
    (n.UTF16_SURROGATE = "UTF-16 surrogate"),
    (n.OVERLONG = "overlong representation");
})(ue || (ue = {}));
function Bs(n, e, t, r, i) {
  return Ai.throwArgumentError(
    `invalid codepoint at offset ${e}; ${n}`,
    "bytes",
    t
  );
}
function mi(n, e, t, r, i) {
  if (n === ue.BAD_PREFIX || n === ue.UNEXPECTED_CONTINUE) {
    let s = 0;
    for (let o = e + 1; o < t.length && t[o] >> 6 === 2; o++) s++;
    return s;
  }
  return n === ue.OVERRUN ? t.length - e - 1 : 0;
}
function Rs(n, e, t, r, i) {
  return n === ue.OVERLONG ? (r.push(i), 0) : (r.push(65533), mi(n, e, t));
}
const Ts = Object.freeze({ error: Bs, ignore: mi, replace: Rs });
function bi(n, e) {
  e == null && (e = Ts.error), (n = L(n));
  const t = [];
  let r = 0;
  for (; r < n.length; ) {
    const i = n[r++];
    if (!(i >> 7)) {
      t.push(i);
      continue;
    }
    let s = null,
      o = null;
    if ((i & 224) === 192) (s = 1), (o = 127);
    else if ((i & 240) === 224) (s = 2), (o = 2047);
    else if ((i & 248) === 240) (s = 3), (o = 65535);
    else {
      (i & 192) === 128
        ? (r += e(ue.UNEXPECTED_CONTINUE, r - 1, n, t))
        : (r += e(ue.BAD_PREFIX, r - 1, n, t));
      continue;
    }
    if (r - 1 + s >= n.length) {
      r += e(ue.OVERRUN, r - 1, n, t);
      continue;
    }
    let a = i & ((1 << (8 - s - 1)) - 1);
    for (let u = 0; u < s; u++) {
      let c = n[r];
      if ((c & 192) != 128) {
        (r += e(ue.MISSING_CONTINUE, r, n, t)), (a = null);
        break;
      }
      (a = (a << 6) | (c & 63)), r++;
    }
    if (a !== null) {
      if (a > 1114111) {
        r += e(ue.OUT_OF_RANGE, r - 1 - s, n, t, a);
        continue;
      }
      if (a >= 55296 && a <= 57343) {
        r += e(ue.UTF16_SURROGATE, r - 1 - s, n, t, a);
        continue;
      }
      if (a <= o) {
        r += e(ue.OVERLONG, r - 1 - s, n, t, a);
        continue;
      }
      t.push(a);
    }
  }
  return t;
}
function Le(n, e = wt.current) {
  e != wt.current && (Ai.checkNormalize(), (n = n.normalize(e)));
  let t = [];
  for (let r = 0; r < n.length; r++) {
    const i = n.charCodeAt(r);
    if (i < 128) t.push(i);
    else if (i < 2048) t.push((i >> 6) | 192), t.push((i & 63) | 128);
    else if ((i & 64512) == 55296) {
      r++;
      const s = n.charCodeAt(r);
      if (r >= n.length || (s & 64512) !== 56320)
        throw new Error("invalid utf-8 string");
      const o = 65536 + ((i & 1023) << 10) + (s & 1023);
      t.push((o >> 18) | 240),
        t.push(((o >> 12) & 63) | 128),
        t.push(((o >> 6) & 63) | 128),
        t.push((o & 63) | 128);
    } else
      t.push((i >> 12) | 224),
        t.push(((i >> 6) & 63) | 128),
        t.push((i & 63) | 128);
  }
  return L(t);
}
function Os(n) {
  return n
    .map(e =>
      e <= 65535
        ? String.fromCharCode(e)
        : ((e -= 65536),
          String.fromCharCode(((e >> 10) & 1023) + 55296, (e & 1023) + 56320))
    )
    .join("");
}
function Hr(n, e) {
  return Os(bi(n, e));
}
function Fs(n, e = wt.current) {
  return bi(Le(n, e));
}
function yi(n) {
  return X(Le(n));
}
const wi = "hash/5.7.0";
function xi(n) {
  n = atob(n);
  const e = [];
  for (let t = 0; t < n.length; t++) e.push(n.charCodeAt(t));
  return L(e);
}
function Ei(n) {
  n = L(n);
  let e = "";
  for (let t = 0; t < n.length; t++) e += String.fromCharCode(n[t]);
  return btoa(e);
}
function _i(n, e) {
  e == null && (e = 1);
  const t = [],
    r = t.forEach,
    i = function (s, o) {
      r.call(s, function (a) {
        o > 0 && Array.isArray(a) ? i(a, o - 1) : t.push(a);
      });
    };
  return i(n, e), t;
}
function Ds(n) {
  const e = {};
  for (let t = 0; t < n.length; t++) {
    const r = n[t];
    e[r[0]] = r[1];
  }
  return e;
}
function Ms(n) {
  let e = 0;
  function t() {
    return (n[e++] << 8) | n[e++];
  }
  let r = t(),
    i = 1,
    s = [0, 1];
  for (let S = 1; S < r; S++) s.push((i += t()));
  let o = t(),
    a = e;
  e += o;
  let u = 0,
    c = 0;
  function l() {
    return u == 0 && ((c = (c << 8) | n[e++]), (u = 8)), (c >> --u) & 1;
  }
  const h = 31,
    d = Math.pow(2, h),
    p = d >>> 1,
    v = p >> 1,
    A = d - 1;
  let k = 0;
  for (let S = 0; S < h; S++) k = (k << 1) | l();
  let y = [],
    E = 0,
    O = d;
  for (;;) {
    let S = Math.floor(((k - E + 1) * i - 1) / O),
      q = 0,
      ee = r;
    for (; ee - q > 1; ) {
      let He = (q + ee) >>> 1;
      S < s[He] ? (ee = He) : (q = He);
    }
    if (q == 0) break;
    y.push(q);
    let z = E + Math.floor((O * s[q]) / i),
      j = E + Math.floor((O * s[q + 1]) / i) - 1;
    for (; !((z ^ j) & p); )
      (k = ((k << 1) & A) | l()), (z = (z << 1) & A), (j = ((j << 1) & A) | 1);
    for (; z & ~j & v; )
      (k = (k & p) | ((k << 1) & (A >>> 1)) | l()),
        (z = (z << 1) ^ p),
        (j = ((j ^ p) << 1) | p | 1);
    (E = z), (O = 1 + j - z);
  }
  let M = r - 4;
  return y.map(S => {
    switch (S - M) {
      case 3:
        return M + 65792 + ((n[a++] << 16) | (n[a++] << 8) | n[a++]);
      case 2:
        return M + 256 + ((n[a++] << 8) | n[a++]);
      case 1:
        return M + n[a++];
      default:
        return S - 1;
    }
  });
}
function Ls(n) {
  let e = 0;
  return () => n[e++];
}
function Us(n) {
  return Ls(Ms(n));
}
function qs(n) {
  return n & 1 ? ~n >> 1 : n >> 1;
}
function Gs(n, e) {
  let t = Array(n);
  for (let r = 0; r < n; r++) t[r] = 1 + e();
  return t;
}
function Dn(n, e) {
  let t = Array(n);
  for (let r = 0, i = -1; r < n; r++) t[r] = i += 1 + e();
  return t;
}
function Hs(n, e) {
  let t = Array(n);
  for (let r = 0, i = 0; r < n; r++) t[r] = i += qs(e());
  return t;
}
function Fr(n, e) {
  let t = Dn(n(), n),
    r = n(),
    i = Dn(r, n),
    s = Gs(r, n);
  for (let o = 0; o < r; o++) for (let a = 0; a < s[o]; a++) t.push(i[o] + a);
  return e ? t.map(o => e[o]) : t;
}
function zs(n) {
  let e = [];
  for (;;) {
    let t = n();
    if (t == 0) break;
    e.push(Js(t, n));
  }
  for (;;) {
    let t = n() - 1;
    if (t < 0) break;
    e.push(Qs(t, n));
  }
  return Ds(_i(e));
}
function Ks(n) {
  let e = [];
  for (;;) {
    let t = n();
    if (t == 0) break;
    e.push(t);
  }
  return e;
}
function ki(n, e, t) {
  let r = Array(n)
    .fill(void 0)
    .map(() => []);
  for (let i = 0; i < e; i++) Hs(n, t).forEach((s, o) => r[o].push(s));
  return r;
}
function Js(n, e) {
  let t = 1 + e(),
    r = e(),
    i = Ks(e),
    s = ki(i.length, 1 + n, e);
  return _i(
    s.map((o, a) => {
      const u = o[0],
        c = o.slice(1);
      return Array(i[a])
        .fill(void 0)
        .map((l, h) => {
          let d = h * r;
          return [u + h * t, c.map(p => p + d)];
        });
    })
  );
}
function Qs(n, e) {
  let t = 1 + e();
  return ki(t, 1 + n, e).map(i => [i[0], i.slice(1)]);
}
function Ys(n) {
  let e = Fr(n).sort((r, i) => r - i);
  return t();
  function t() {
    let r = [];
    for (;;) {
      let c = Fr(n, e);
      if (c.length == 0) break;
      r.push({ set: new Set(c), node: t() });
    }
    r.sort((c, l) => l.set.size - c.set.size);
    let i = n(),
      s = i % 3;
    i = (i / 3) | 0;
    let o = !!(i & 1);
    i >>= 1;
    let a = i == 1,
      u = i == 2;
    return { branches: r, valid: s, fe0f: o, save: a, check: u };
  }
}
function js() {
  return Us(
    xi(
      "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"
    )
  );
}
const zr = js(),
  Ws = new Set(Fr(zr)),
  Vs = new Set(Fr(zr)),
  Xs = zs(zr),
  Zs = Ys(zr),
  Mn = 45,
  Ln = 95;
function Ii(n) {
  return Fs(n);
}
function $s(n) {
  return n.filter(e => e != 65039);
}
function Ni(n) {
  for (let e of n.split(".")) {
    let t = Ii(e);
    try {
      for (let r = t.lastIndexOf(Ln) - 1; r >= 0; r--)
        if (t[r] !== Ln) throw new Error("underscore only allowed at start");
      if (t.length >= 4 && t.every(r => r < 128) && t[2] === Mn && t[3] === Mn)
        throw new Error("invalid label extension");
    } catch (r) {
      throw new Error(`Invalid label "${e}": ${r.message}`);
    }
  }
  return n;
}
function eo(n) {
  return Ni(to(n, $s));
}
function to(n, e) {
  let t = Ii(n).reverse(),
    r = [];
  for (; t.length; ) {
    let i = no(t);
    if (i) {
      r.push(...e(i));
      continue;
    }
    let s = t.pop();
    if (Ws.has(s)) {
      r.push(s);
      continue;
    }
    if (Vs.has(s)) continue;
    let o = Xs[s];
    if (o) {
      r.push(...o);
      continue;
    }
    throw new Error(`Disallowed codepoint: 0x${s.toString(16).toUpperCase()}`);
  }
  return Ni(ro(String.fromCodePoint(...r)));
}
function ro(n) {
  return n.normalize("NFC");
}
function no(n, e) {
  var t;
  let r = Zs,
    i,
    s,
    o = [],
    a = n.length;
  for (e && (e.length = 0); a; ) {
    let u = n[--a];
    if (
      ((r =
        (t = r.branches.find(c => c.set.has(u))) === null || t === void 0
          ? void 0
          : t.node),
      !r)
    )
      break;
    if (r.save) s = u;
    else if (r.check && u === s) break;
    o.push(u),
      r.fe0f && (o.push(65039), a > 0 && n[a - 1] == 65039 && a--),
      r.valid &&
        ((i = o.slice()),
        r.valid == 2 && i.splice(1, 1),
        e && e.push(...n.slice(a).reverse()),
        (n.length = a));
  }
  return i;
}
const io = new m(wi),
  Pi = new Uint8Array(32);
Pi.fill(0);
function Un(n) {
  if (n.length === 0) throw new Error("invalid ENS name; empty component");
  return n;
}
function Si(n) {
  const e = Le(eo(n)),
    t = [];
  if (n.length === 0) return t;
  let r = 0;
  for (let i = 0; i < e.length; i++)
    e[i] === 46 && (t.push(Un(e.slice(r, i))), (r = i + 1));
  if (r >= e.length) throw new Error("invalid ENS name; empty component");
  return t.push(Un(e.slice(r))), t;
}
function Br(n) {
  typeof n != "string" &&
    io.throwArgumentError("invalid ENS name; not a string", "name", n);
  let e = Pi;
  const t = Si(n);
  for (; t.length; ) e = X(je([e, X(t.pop())]));
  return G(e);
}
function so(n) {
  return (
    G(
      je(
        Si(n).map(e => {
          if (e.length > 63)
            throw new Error(
              "invalid DNS encoded entry; length exceeds 63 bytes"
            );
          const t = new Uint8Array(e.length + 1);
          return t.set(e, 1), (t[0] = t.length - 1), t;
        })
      )
    ) + "00"
  );
}
const oo = "rlp/5.7.0",
  Ie = new m(oo);
function qn(n) {
  const e = [];
  for (; n; ) e.unshift(n & 255), (n >>= 8);
  return e;
}
function Gn(n, e, t) {
  let r = 0;
  for (let i = 0; i < t; i++) r = r * 256 + n[e + i];
  return r;
}
function Ci(n) {
  if (Array.isArray(n)) {
    let r = [];
    if (
      (n.forEach(function (s) {
        r = r.concat(Ci(s));
      }),
      r.length <= 55)
    )
      return r.unshift(192 + r.length), r;
    const i = qn(r.length);
    return i.unshift(247 + i.length), i.concat(r);
  }
  vi(n) || Ie.throwArgumentError("RLP object must be BytesLike", "object", n);
  const e = Array.prototype.slice.call(L(n));
  if (e.length === 1 && e[0] <= 127) return e;
  if (e.length <= 55) return e.unshift(128 + e.length), e;
  const t = qn(e.length);
  return t.unshift(183 + t.length), t.concat(e);
}
function Kr(n) {
  return G(Ci(n));
}
function Hn(n, e, t, r) {
  const i = [];
  for (; t < e + 1 + r; ) {
    const s = Bi(n, t);
    i.push(s.result),
      (t += s.consumed),
      t > e + 1 + r &&
        Ie.throwError("child data too short", m.errors.BUFFER_OVERRUN, {});
  }
  return { consumed: 1 + r, result: i };
}
function Bi(n, e) {
  if (
    (n.length === 0 &&
      Ie.throwError("data too short", m.errors.BUFFER_OVERRUN, {}),
    n[e] >= 248)
  ) {
    const t = n[e] - 247;
    e + 1 + t > n.length &&
      Ie.throwError(
        "data short segment too short",
        m.errors.BUFFER_OVERRUN,
        {}
      );
    const r = Gn(n, e + 1, t);
    return (
      e + 1 + t + r > n.length &&
        Ie.throwError(
          "data long segment too short",
          m.errors.BUFFER_OVERRUN,
          {}
        ),
      Hn(n, e, e + 1 + t, t + r)
    );
  } else if (n[e] >= 192) {
    const t = n[e] - 192;
    return (
      e + 1 + t > n.length &&
        Ie.throwError("data array too short", m.errors.BUFFER_OVERRUN, {}),
      Hn(n, e, e + 1, t)
    );
  } else if (n[e] >= 184) {
    const t = n[e] - 183;
    e + 1 + t > n.length &&
      Ie.throwError("data array too short", m.errors.BUFFER_OVERRUN, {});
    const r = Gn(n, e + 1, t);
    e + 1 + t + r > n.length &&
      Ie.throwError("data array too short", m.errors.BUFFER_OVERRUN, {});
    const i = G(n.slice(e + 1 + t, e + 1 + t + r));
    return { consumed: 1 + t + r, result: i };
  } else if (n[e] >= 128) {
    const t = n[e] - 128;
    e + 1 + t > n.length &&
      Ie.throwError("data too short", m.errors.BUFFER_OVERRUN, {});
    const r = G(n.slice(e + 1, e + 1 + t));
    return { consumed: 1 + t, result: r };
  }
  return { consumed: 1, result: G(n[e]) };
}
function xn(n) {
  const e = L(n),
    t = Bi(e, 0);
  return (
    t.consumed !== e.length &&
      Ie.throwArgumentError("invalid rlp data", "data", n),
    t.result
  );
}
const ao = "address/5.7.0",
  $e = new m(ao);
function zn(n) {
  ie(n, 20) || $e.throwArgumentError("invalid address", "address", n),
    (n = n.toLowerCase());
  const e = n.substring(2).split(""),
    t = new Uint8Array(40);
  for (let i = 0; i < 40; i++) t[i] = e[i].charCodeAt(0);
  const r = L(X(t));
  for (let i = 0; i < 40; i += 2)
    r[i >> 1] >> 4 >= 8 && (e[i] = e[i].toUpperCase()),
      (r[i >> 1] & 15) >= 8 && (e[i + 1] = e[i + 1].toUpperCase());
  return "0x" + e.join("");
}
const fo = 9007199254740991;
function uo(n) {
  return Math.log10 ? Math.log10(n) : Math.log(n) / Math.LN10;
}
const En = {};
for (let n = 0; n < 10; n++) En[String(n)] = String(n);
for (let n = 0; n < 26; n++) En[String.fromCharCode(65 + n)] = String(10 + n);
const Kn = Math.floor(uo(fo));
function co(n) {
  (n = n.toUpperCase()), (n = n.substring(4) + n.substring(0, 2) + "00");
  let e = n
    .split("")
    .map(r => En[r])
    .join("");
  for (; e.length >= Kn; ) {
    let r = e.substring(0, Kn);
    e = (parseInt(r, 10) % 97) + e.substring(r.length);
  }
  let t = String(98 - (parseInt(e, 10) % 97));
  for (; t.length < 2; ) t = "0" + t;
  return t;
}
function xe(n) {
  let e = null;
  if (
    (typeof n != "string" &&
      $e.throwArgumentError("invalid address", "address", n),
    n.match(/^(0x)?[0-9a-fA-F]{40}$/))
  )
    n.substring(0, 2) !== "0x" && (n = "0x" + n),
      (e = zn(n)),
      n.match(/([A-F].*[a-f])|([a-f].*[A-F])/) &&
        e !== n &&
        $e.throwArgumentError("bad address checksum", "address", n);
  else if (n.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    for (
      n.substring(2, 4) !== co(n) &&
        $e.throwArgumentError("bad icap checksum", "address", n),
        e = As(n.substring(4));
      e.length < 40;

    )
      e = "0" + e;
    e = zn("0x" + e);
  } else $e.throwArgumentError("invalid address", "address", n);
  return e;
}
function lo(n) {
  let e = null;
  try {
    e = xe(n.from);
  } catch {
    $e.throwArgumentError("missing from address", "transaction", n);
  }
  const t = tt(L(C.from(n.nonce).toHexString()));
  return xe(ne(X(Kr([e, t])), 12));
}
const ho = "properties/5.7.0";
var po = function (n, e, t, r) {
  function i(s) {
    return s instanceof t
      ? s
      : new t(function (o) {
          o(s);
        });
  }
  return new (t || (t = Promise))(function (s, o) {
    function a(l) {
      try {
        c(r.next(l));
      } catch (h) {
        o(h);
      }
    }
    function u(l) {
      try {
        c(r.throw(l));
      } catch (h) {
        o(h);
      }
    }
    function c(l) {
      l.done ? s(l.value) : i(l.value).then(a, u);
    }
    c((r = r.apply(n, e || [])).next());
  });
};
const Dr = new m(ho);
function U(n, e, t) {
  Object.defineProperty(n, e, { enumerable: !0, value: t, writable: !1 });
}
function At(n, e) {
  for (let t = 0; t < 32; t++) {
    if (n[e]) return n[e];
    if (!n.prototype || typeof n.prototype != "object") break;
    n = Object.getPrototypeOf(n.prototype).constructor;
  }
  return null;
}
function V(n) {
  return po(this, void 0, void 0, function* () {
    const e = Object.keys(n).map(r => {
      const i = n[r];
      return Promise.resolve(i).then(s => ({ key: r, value: s }));
    });
    return (yield Promise.all(e)).reduce(
      (r, i) => ((r[i.key] = i.value), r),
      {}
    );
  });
}
function vo(n, e) {
  (!n || typeof n != "object") &&
    Dr.throwArgumentError("invalid object", "object", n),
    Object.keys(n).forEach(t => {
      e[t] ||
        Dr.throwArgumentError(
          "invalid object key - " + t,
          "transaction:" + t,
          n
        );
    });
}
function se(n) {
  const e = {};
  for (const t in n) e[t] = n[t];
  return e;
}
const go = { bigint: !0, boolean: !0, function: !0, number: !0, string: !0 };
function Ri(n) {
  if (n == null || go[typeof n]) return !0;
  if (Array.isArray(n) || typeof n == "object") {
    if (!Object.isFrozen(n)) return !1;
    const e = Object.keys(n);
    for (let t = 0; t < e.length; t++) {
      let r = null;
      try {
        r = n[e[t]];
      } catch {
        continue;
      }
      if (!Ri(r)) return !1;
    }
    return !0;
  }
  return Dr.throwArgumentError(`Cannot deepCopy ${typeof n}`, "object", n);
}
function Ao(n) {
  if (Ri(n)) return n;
  if (Array.isArray(n)) return Object.freeze(n.map(e => xt(e)));
  if (typeof n == "object") {
    const e = {};
    for (const t in n) {
      const r = n[t];
      r !== void 0 && U(e, t, xt(r));
    }
    return e;
  }
  return Dr.throwArgumentError(`Cannot deepCopy ${typeof n}`, "object", n);
}
function xt(n) {
  return Ao(n);
}
class mo {
  constructor(e) {
    for (const t in e) this[t] = xt(e[t]);
  }
}
var bo = function (n, e, t, r) {
  function i(s) {
    return s instanceof t
      ? s
      : new t(function (o) {
          o(s);
        });
  }
  return new (t || (t = Promise))(function (s, o) {
    function a(l) {
      try {
        c(r.next(l));
      } catch (h) {
        o(h);
      }
    }
    function u(l) {
      try {
        c(r.throw(l));
      } catch (h) {
        o(h);
      }
    }
    function c(l) {
      l.done ? s(l.value) : i(l.value).then(a, u);
    }
    c((r = r.apply(n, e || [])).next());
  });
};
const H = new m(wi),
  Ti = new Uint8Array(32);
Ti.fill(0);
const yo = C.from(-1),
  Oi = C.from(0),
  Fi = C.from(1),
  wo = C.from(
    "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
  );
function xo(n) {
  const e = L(n),
    t = e.length % 32;
  return t ? le([e, Ti.slice(t)]) : G(e);
}
const Eo = Z(Fi.toHexString(), 32),
  _o = Z(Oi.toHexString(), 32),
  Jn = {
    name: "string",
    version: "string",
    chainId: "uint256",
    verifyingContract: "address",
    salt: "bytes32",
  },
  Xr = ["name", "version", "chainId", "verifyingContract", "salt"];
function Qn(n) {
  return function (e) {
    return (
      typeof e != "string" &&
        H.throwArgumentError(
          `invalid domain value for ${JSON.stringify(n)}`,
          `domain.${n}`,
          e
        ),
      e
    );
  };
}
const ko = {
  name: Qn("name"),
  version: Qn("version"),
  chainId: function (n) {
    try {
      return C.from(n).toString();
    } catch {}
    return H.throwArgumentError(
      'invalid domain value for "chainId"',
      "domain.chainId",
      n
    );
  },
  verifyingContract: function (n) {
    try {
      return xe(n).toLowerCase();
    } catch {}
    return H.throwArgumentError(
      'invalid domain value "verifyingContract"',
      "domain.verifyingContract",
      n
    );
  },
  salt: function (n) {
    try {
      const e = L(n);
      if (e.length !== 32) throw new Error("bad length");
      return G(e);
    } catch {}
    return H.throwArgumentError(
      'invalid domain value "salt"',
      "domain.salt",
      n
    );
  },
};
function Zr(n) {
  {
    const e = n.match(/^(u?)int(\d*)$/);
    if (e) {
      const t = e[1] === "",
        r = parseInt(e[2] || "256");
      (r % 8 !== 0 || r > 256 || (e[2] && e[2] !== String(r))) &&
        H.throwArgumentError("invalid numeric width", "type", n);
      const i = wo.mask(t ? r - 1 : r),
        s = t ? i.add(Fi).mul(yo) : Oi;
      return function (o) {
        const a = C.from(o);
        return (
          (a.lt(s) || a.gt(i)) &&
            H.throwArgumentError(`value out-of-bounds for ${n}`, "value", o),
          Z(a.toTwos(256).toHexString(), 32)
        );
      };
    }
  }
  {
    const e = n.match(/^bytes(\d+)$/);
    if (e) {
      const t = parseInt(e[1]);
      return (
        (t === 0 || t > 32 || e[1] !== String(t)) &&
          H.throwArgumentError("invalid bytes width", "type", n),
        function (r) {
          return (
            L(r).length !== t &&
              H.throwArgumentError(`invalid length for ${n}`, "value", r),
            xo(r)
          );
        }
      );
    }
  }
  switch (n) {
    case "address":
      return function (e) {
        return Z(xe(e), 32);
      };
    case "bool":
      return function (e) {
        return e ? Eo : _o;
      };
    case "bytes":
      return function (e) {
        return X(e);
      };
    case "string":
      return function (e) {
        return yi(e);
      };
  }
  return null;
}
function Yn(n, e) {
  return `${n}(${e.map(({ name: t, type: r }) => r + " " + t).join(",")})`;
}
class fe {
  constructor(e) {
    U(this, "types", Object.freeze(xt(e))),
      U(this, "_encoderCache", {}),
      U(this, "_types", {});
    const t = {},
      r = {},
      i = {};
    Object.keys(e).forEach(a => {
      (t[a] = {}), (r[a] = []), (i[a] = {});
    });
    for (const a in e) {
      const u = {};
      e[a].forEach(c => {
        u[c.name] &&
          H.throwArgumentError(
            `duplicate variable name ${JSON.stringify(c.name)} in ${JSON.stringify(a)}`,
            "types",
            e
          ),
          (u[c.name] = !0);
        const l = c.type.match(/^([^\x5b]*)(\x5b|$)/)[1];
        l === a &&
          H.throwArgumentError(
            `circular type reference to ${JSON.stringify(l)}`,
            "types",
            e
          ),
          !Zr(l) &&
            (r[l] ||
              H.throwArgumentError(
                `unknown type ${JSON.stringify(l)}`,
                "types",
                e
              ),
            r[l].push(a),
            (t[a][l] = !0));
      });
    }
    const s = Object.keys(r).filter(a => r[a].length === 0);
    s.length === 0
      ? H.throwArgumentError("missing primary type", "types", e)
      : s.length > 1 &&
        H.throwArgumentError(
          `ambiguous primary types or unused types: ${s.map(a => JSON.stringify(a)).join(", ")}`,
          "types",
          e
        ),
      U(this, "primaryType", s[0]);
    function o(a, u) {
      u[a] &&
        H.throwArgumentError(
          `circular type reference to ${JSON.stringify(a)}`,
          "types",
          e
        ),
        (u[a] = !0),
        Object.keys(t[a]).forEach(c => {
          r[c] &&
            (o(c, u),
            Object.keys(u).forEach(l => {
              i[l][c] = !0;
            }));
        }),
        delete u[a];
    }
    o(this.primaryType, {});
    for (const a in i) {
      const u = Object.keys(i[a]);
      u.sort(),
        (this._types[a] = Yn(a, e[a]) + u.map(c => Yn(c, e[c])).join(""));
    }
  }
  getEncoder(e) {
    let t = this._encoderCache[e];
    return t || (t = this._encoderCache[e] = this._getEncoder(e)), t;
  }
  _getEncoder(e) {
    {
      const i = Zr(e);
      if (i) return i;
    }
    const t = e.match(/^(.*)(\x5b(\d*)\x5d)$/);
    if (t) {
      const i = t[1],
        s = this.getEncoder(i),
        o = parseInt(t[3]);
      return a => {
        o >= 0 &&
          a.length !== o &&
          H.throwArgumentError(
            "array length mismatch; expected length ${ arrayLength }",
            "value",
            a
          );
        let u = a.map(s);
        return this._types[i] && (u = u.map(X)), X(le(u));
      };
    }
    const r = this.types[e];
    if (r) {
      const i = yi(this._types[e]);
      return s => {
        const o = r.map(({ name: a, type: u }) => {
          const c = this.getEncoder(u)(s[a]);
          return this._types[u] ? X(c) : c;
        });
        return o.unshift(i), le(o);
      };
    }
    return H.throwArgumentError(`unknown type: ${e}`, "type", e);
  }
  encodeType(e) {
    const t = this._types[e];
    return (
      t ||
        H.throwArgumentError(`unknown type: ${JSON.stringify(e)}`, "name", e),
      t
    );
  }
  encodeData(e, t) {
    return this.getEncoder(e)(t);
  }
  hashStruct(e, t) {
    return X(this.encodeData(e, t));
  }
  encode(e) {
    return this.encodeData(this.primaryType, e);
  }
  hash(e) {
    return this.hashStruct(this.primaryType, e);
  }
  _visit(e, t, r) {
    if (Zr(e)) return r(e, t);
    const i = e.match(/^(.*)(\x5b(\d*)\x5d)$/);
    if (i) {
      const o = i[1],
        a = parseInt(i[3]);
      return (
        a >= 0 &&
          t.length !== a &&
          H.throwArgumentError(
            "array length mismatch; expected length ${ arrayLength }",
            "value",
            t
          ),
        t.map(u => this._visit(o, u, r))
      );
    }
    const s = this.types[e];
    return s
      ? s.reduce(
          (o, { name: a, type: u }) => ((o[a] = this._visit(u, t[a], r)), o),
          {}
        )
      : H.throwArgumentError(`unknown type: ${e}`, "type", e);
  }
  visit(e, t) {
    return this._visit(this.primaryType, e, t);
  }
  static from(e) {
    return new fe(e);
  }
  static getPrimaryType(e) {
    return fe.from(e).primaryType;
  }
  static hashStruct(e, t, r) {
    return fe.from(t).hashStruct(e, r);
  }
  static hashDomain(e) {
    const t = [];
    for (const r in e) {
      const i = Jn[r];
      i ||
        H.throwArgumentError(
          `invalid typed-data domain key: ${JSON.stringify(r)}`,
          "domain",
          e
        ),
        t.push({ name: r, type: i });
    }
    return (
      t.sort((r, i) => Xr.indexOf(r.name) - Xr.indexOf(i.name)),
      fe.hashStruct("EIP712Domain", { EIP712Domain: t }, e)
    );
  }
  static encode(e, t, r) {
    return le(["0x1901", fe.hashDomain(e), fe.from(t).hash(r)]);
  }
  static hash(e, t, r) {
    return X(fe.encode(e, t, r));
  }
  static resolveNames(e, t, r, i) {
    return bo(this, void 0, void 0, function* () {
      e = se(e);
      const s = {};
      e.verifyingContract &&
        !ie(e.verifyingContract, 20) &&
        (s[e.verifyingContract] = "0x");
      const o = fe.from(t);
      o.visit(r, (a, u) => (a === "address" && !ie(u, 20) && (s[u] = "0x"), u));
      for (const a in s) s[a] = yield i(a);
      return (
        e.verifyingContract &&
          s[e.verifyingContract] &&
          (e.verifyingContract = s[e.verifyingContract]),
        (r = o.visit(r, (a, u) => (a === "address" && s[u] ? s[u] : u))),
        { domain: e, value: r }
      );
    });
  }
  static getPayload(e, t, r) {
    fe.hashDomain(e);
    const i = {},
      s = [];
    Xr.forEach(u => {
      const c = e[u];
      c != null && ((i[u] = ko[u](c)), s.push({ name: u, type: Jn[u] }));
    });
    const o = fe.from(t),
      a = se(t);
    return (
      a.EIP712Domain
        ? H.throwArgumentError(
            "types must not contain EIP712Domain type",
            "types.EIP712Domain",
            t
          )
        : (a.EIP712Domain = s),
      o.encode(r),
      {
        types: a,
        domain: i,
        primaryType: o.primaryType,
        message: o.visit(r, (u, c) => {
          if (u.match(/^bytes(\d*)/)) return G(L(c));
          if (u.match(/^u?int/)) return C.from(c).toString();
          switch (u) {
            case "address":
              return c.toLowerCase();
            case "bool":
              return !!c;
            case "string":
              return (
                typeof c != "string" &&
                  H.throwArgumentError("invalid string", "value", c),
                c
              );
          }
          return H.throwArgumentError("unsupported type", "type", u);
        }),
      }
    );
  }
}
const Io = "abstract-provider/5.7.0";
var No = function (n, e, t, r) {
  function i(s) {
    return s instanceof t
      ? s
      : new t(function (o) {
          o(s);
        });
  }
  return new (t || (t = Promise))(function (s, o) {
    function a(l) {
      try {
        c(r.next(l));
      } catch (h) {
        o(h);
      }
    }
    function u(l) {
      try {
        c(r.throw(l));
      } catch (h) {
        o(h);
      }
    }
    function c(l) {
      l.done ? s(l.value) : i(l.value).then(a, u);
    }
    c((r = r.apply(n, e || [])).next());
  });
};
const Po = new m(Io);
class So extends mo {
  static isForkEvent(e) {
    return !!(e && e._isForkEvent);
  }
}
class _n {
  constructor() {
    Po.checkAbstract(new.target, _n), U(this, "_isProvider", !0);
  }
  getFeeData() {
    return No(this, void 0, void 0, function* () {
      const { block: e, gasPrice: t } = yield V({
        block: this.getBlock("latest"),
        gasPrice: this.getGasPrice().catch(o => null),
      });
      let r = null,
        i = null,
        s = null;
      return (
        e &&
          e.baseFeePerGas &&
          ((r = e.baseFeePerGas),
          (s = C.from("1500000000")),
          (i = e.baseFeePerGas.mul(2).add(s))),
        {
          lastBaseFeePerGas: r,
          maxFeePerGas: i,
          maxPriorityFeePerGas: s,
          gasPrice: t,
        }
      );
    });
  }
  addListener(e, t) {
    return this.on(e, t);
  }
  removeListener(e, t) {
    return this.off(e, t);
  }
  static isProvider(e) {
    return !!(e && e._isProvider);
  }
}
const Co = "abstract-signer/5.7.0";
var Ae = function (n, e, t, r) {
  function i(s) {
    return s instanceof t
      ? s
      : new t(function (o) {
          o(s);
        });
  }
  return new (t || (t = Promise))(function (s, o) {
    function a(l) {
      try {
        c(r.next(l));
      } catch (h) {
        o(h);
      }
    }
    function u(l) {
      try {
        c(r.throw(l));
      } catch (h) {
        o(h);
      }
    }
    function c(l) {
      l.done ? s(l.value) : i(l.value).then(a, u);
    }
    c((r = r.apply(n, e || [])).next());
  });
};
const me = new m(Co),
  Bo = [
    "accessList",
    "ccipReadEnabled",
    "chainId",
    "customData",
    "data",
    "from",
    "gasLimit",
    "gasPrice",
    "maxFeePerGas",
    "maxPriorityFeePerGas",
    "nonce",
    "to",
    "type",
    "value",
  ],
  Ro = [
    m.errors.INSUFFICIENT_FUNDS,
    m.errors.NONCE_EXPIRED,
    m.errors.REPLACEMENT_UNDERPRICED,
  ];
class kn {
  constructor() {
    me.checkAbstract(new.target, kn), U(this, "_isSigner", !0);
  }
  getBalance(e) {
    return Ae(this, void 0, void 0, function* () {
      return (
        this._checkProvider("getBalance"),
        yield this.provider.getBalance(this.getAddress(), e)
      );
    });
  }
  getTransactionCount(e) {
    return Ae(this, void 0, void 0, function* () {
      return (
        this._checkProvider("getTransactionCount"),
        yield this.provider.getTransactionCount(this.getAddress(), e)
      );
    });
  }
  estimateGas(e) {
    return Ae(this, void 0, void 0, function* () {
      this._checkProvider("estimateGas");
      const t = yield V(this.checkTransaction(e));
      return yield this.provider.estimateGas(t);
    });
  }
  call(e, t) {
    return Ae(this, void 0, void 0, function* () {
      this._checkProvider("call");
      const r = yield V(this.checkTransaction(e));
      return yield this.provider.call(r, t);
    });
  }
  sendTransaction(e) {
    return Ae(this, void 0, void 0, function* () {
      this._checkProvider("sendTransaction");
      const t = yield this.populateTransaction(e),
        r = yield this.signTransaction(t);
      return yield this.provider.sendTransaction(r);
    });
  }
  getChainId() {
    return Ae(this, void 0, void 0, function* () {
      return (
        this._checkProvider("getChainId"),
        (yield this.provider.getNetwork()).chainId
      );
    });
  }
  getGasPrice() {
    return Ae(this, void 0, void 0, function* () {
      return (
        this._checkProvider("getGasPrice"), yield this.provider.getGasPrice()
      );
    });
  }
  getFeeData() {
    return Ae(this, void 0, void 0, function* () {
      return (
        this._checkProvider("getFeeData"), yield this.provider.getFeeData()
      );
    });
  }
  resolveName(e) {
    return Ae(this, void 0, void 0, function* () {
      return (
        this._checkProvider("resolveName"), yield this.provider.resolveName(e)
      );
    });
  }
  checkTransaction(e) {
    for (const r in e)
      Bo.indexOf(r) === -1 &&
        me.throwArgumentError(
          "invalid transaction key: " + r,
          "transaction",
          e
        );
    const t = se(e);
    return (
      t.from == null
        ? (t.from = this.getAddress())
        : (t.from = Promise.all([
            Promise.resolve(t.from),
            this.getAddress(),
          ]).then(
            r => (
              r[0].toLowerCase() !== r[1].toLowerCase() &&
                me.throwArgumentError(
                  "from address mismatch",
                  "transaction",
                  e
                ),
              r[0]
            )
          )),
      t
    );
  }
  populateTransaction(e) {
    return Ae(this, void 0, void 0, function* () {
      const t = yield V(this.checkTransaction(e));
      t.to != null &&
        ((t.to = Promise.resolve(t.to).then(i =>
          Ae(this, void 0, void 0, function* () {
            if (i == null) return null;
            const s = yield this.resolveName(i);
            return (
              s == null &&
                me.throwArgumentError(
                  "provided ENS name resolves to null",
                  "tx.to",
                  i
                ),
              s
            );
          })
        )),
        t.to.catch(i => {}));
      const r = t.maxFeePerGas != null || t.maxPriorityFeePerGas != null;
      if (
        (t.gasPrice != null && (t.type === 2 || r)
          ? me.throwArgumentError(
              "eip-1559 transaction do not support gasPrice",
              "transaction",
              e
            )
          : (t.type === 0 || t.type === 1) &&
            r &&
            me.throwArgumentError(
              "pre-eip-1559 transaction do not support maxFeePerGas/maxPriorityFeePerGas",
              "transaction",
              e
            ),
        (t.type === 2 || t.type == null) &&
          t.maxFeePerGas != null &&
          t.maxPriorityFeePerGas != null)
      )
        t.type = 2;
      else if (t.type === 0 || t.type === 1)
        t.gasPrice == null && (t.gasPrice = this.getGasPrice());
      else {
        const i = yield this.getFeeData();
        if (t.type == null)
          if (i.maxFeePerGas != null && i.maxPriorityFeePerGas != null)
            if (((t.type = 2), t.gasPrice != null)) {
              const s = t.gasPrice;
              delete t.gasPrice,
                (t.maxFeePerGas = s),
                (t.maxPriorityFeePerGas = s);
            } else
              t.maxFeePerGas == null && (t.maxFeePerGas = i.maxFeePerGas),
                t.maxPriorityFeePerGas == null &&
                  (t.maxPriorityFeePerGas = i.maxPriorityFeePerGas);
          else
            i.gasPrice != null
              ? (r &&
                  me.throwError(
                    "network does not support EIP-1559",
                    m.errors.UNSUPPORTED_OPERATION,
                    { operation: "populateTransaction" }
                  ),
                t.gasPrice == null && (t.gasPrice = i.gasPrice),
                (t.type = 0))
              : me.throwError(
                  "failed to get consistent fee data",
                  m.errors.UNSUPPORTED_OPERATION,
                  { operation: "signer.getFeeData" }
                );
        else
          t.type === 2 &&
            (t.maxFeePerGas == null && (t.maxFeePerGas = i.maxFeePerGas),
            t.maxPriorityFeePerGas == null &&
              (t.maxPriorityFeePerGas = i.maxPriorityFeePerGas));
      }
      return (
        t.nonce == null && (t.nonce = this.getTransactionCount("pending")),
        t.gasLimit == null &&
          (t.gasLimit = this.estimateGas(t).catch(i => {
            if (Ro.indexOf(i.code) >= 0) throw i;
            return me.throwError(
              "cannot estimate gas; transaction may fail or may require manual gas limit",
              m.errors.UNPREDICTABLE_GAS_LIMIT,
              { error: i, tx: t }
            );
          })),
        t.chainId == null
          ? (t.chainId = this.getChainId())
          : (t.chainId = Promise.all([
              Promise.resolve(t.chainId),
              this.getChainId(),
            ]).then(
              i => (
                i[1] !== 0 &&
                  i[0] !== i[1] &&
                  me.throwArgumentError(
                    "chainId address mismatch",
                    "transaction",
                    e
                  ),
                i[0]
              )
            )),
        yield V(t)
      );
    });
  }
  _checkProvider(e) {
    this.provider ||
      me.throwError("missing provider", m.errors.UNSUPPORTED_OPERATION, {
        operation: e || "_checkProvider",
      });
  }
  static isSigner(e) {
    return !!(e && e._isSigner);
  }
}
class Di {
  constructor(e) {
    U(this, "alphabet", e),
      U(this, "base", e.length),
      U(this, "_alphabetMap", {}),
      U(this, "_leader", e.charAt(0));
    for (let t = 0; t < e.length; t++) this._alphabetMap[e.charAt(t)] = t;
  }
  encode(e) {
    let t = L(e);
    if (t.length === 0) return "";
    let r = [0];
    for (let s = 0; s < t.length; ++s) {
      let o = t[s];
      for (let a = 0; a < r.length; ++a)
        (o += r[a] << 8), (r[a] = o % this.base), (o = (o / this.base) | 0);
      for (; o > 0; ) r.push(o % this.base), (o = (o / this.base) | 0);
    }
    let i = "";
    for (let s = 0; t[s] === 0 && s < t.length - 1; ++s) i += this._leader;
    for (let s = r.length - 1; s >= 0; --s) i += this.alphabet[r[s]];
    return i;
  }
  decode(e) {
    if (typeof e != "string") throw new TypeError("Expected String");
    let t = [];
    if (e.length === 0) return new Uint8Array(t);
    t.push(0);
    for (let r = 0; r < e.length; r++) {
      let i = this._alphabetMap[e[r]];
      if (i === void 0) throw new Error("Non-base" + this.base + " character");
      let s = i;
      for (let o = 0; o < t.length; ++o)
        (s += t[o] * this.base), (t[o] = s & 255), (s >>= 8);
      for (; s > 0; ) t.push(s & 255), (s >>= 8);
    }
    for (let r = 0; e[r] === this._leader && r < e.length - 1; ++r) t.push(0);
    return L(new Uint8Array(t.reverse()));
  }
}
new Di("abcdefghijklmnopqrstuvwxyz234567");
const hn = new Di("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
var Mi = {},
  D = {},
  kt = Li;
function Li(n, e) {
  if (!n) throw new Error(e || "Assertion failed");
}
Li.equal = function (e, t, r) {
  if (e != t) throw new Error(r || "Assertion failed: " + e + " != " + t);
};
var dn = { exports: {} };
typeof Object.create == "function"
  ? (dn.exports = function (e, t) {
      t &&
        ((e.super_ = t),
        (e.prototype = Object.create(t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0,
          },
        })));
    })
  : (dn.exports = function (e, t) {
      if (t) {
        e.super_ = t;
        var r = function () {};
        (r.prototype = t.prototype),
          (e.prototype = new r()),
          (e.prototype.constructor = e);
      }
    });
var To = dn.exports,
  Oo = kt,
  Fo = To;
D.inherits = Fo;
function Do(n, e) {
  return (n.charCodeAt(e) & 64512) !== 55296 || e < 0 || e + 1 >= n.length
    ? !1
    : (n.charCodeAt(e + 1) & 64512) === 56320;
}
function Mo(n, e) {
  if (Array.isArray(n)) return n.slice();
  if (!n) return [];
  var t = [];
  if (typeof n == "string")
    if (e) {
      if (e === "hex")
        for (
          n = n.replace(/[^a-z0-9]+/gi, ""),
            n.length % 2 !== 0 && (n = "0" + n),
            i = 0;
          i < n.length;
          i += 2
        )
          t.push(parseInt(n[i] + n[i + 1], 16));
    } else
      for (var r = 0, i = 0; i < n.length; i++) {
        var s = n.charCodeAt(i);
        s < 128
          ? (t[r++] = s)
          : s < 2048
            ? ((t[r++] = (s >> 6) | 192), (t[r++] = (s & 63) | 128))
            : Do(n, i)
              ? ((s = 65536 + ((s & 1023) << 10) + (n.charCodeAt(++i) & 1023)),
                (t[r++] = (s >> 18) | 240),
                (t[r++] = ((s >> 12) & 63) | 128),
                (t[r++] = ((s >> 6) & 63) | 128),
                (t[r++] = (s & 63) | 128))
              : ((t[r++] = (s >> 12) | 224),
                (t[r++] = ((s >> 6) & 63) | 128),
                (t[r++] = (s & 63) | 128));
      }
  else for (i = 0; i < n.length; i++) t[i] = n[i] | 0;
  return t;
}
D.toArray = Mo;
function Lo(n) {
  for (var e = "", t = 0; t < n.length; t++) e += qi(n[t].toString(16));
  return e;
}
D.toHex = Lo;
function Ui(n) {
  var e =
    (n >>> 24) |
    ((n >>> 8) & 65280) |
    ((n << 8) & 16711680) |
    ((n & 255) << 24);
  return e >>> 0;
}
D.htonl = Ui;
function Uo(n, e) {
  for (var t = "", r = 0; r < n.length; r++) {
    var i = n[r];
    e === "little" && (i = Ui(i)), (t += Gi(i.toString(16)));
  }
  return t;
}
D.toHex32 = Uo;
function qi(n) {
  return n.length === 1 ? "0" + n : n;
}
D.zero2 = qi;
function Gi(n) {
  return n.length === 7
    ? "0" + n
    : n.length === 6
      ? "00" + n
      : n.length === 5
        ? "000" + n
        : n.length === 4
          ? "0000" + n
          : n.length === 3
            ? "00000" + n
            : n.length === 2
              ? "000000" + n
              : n.length === 1
                ? "0000000" + n
                : n;
}
D.zero8 = Gi;
function qo(n, e, t, r) {
  var i = t - e;
  Oo(i % 4 === 0);
  for (var s = new Array(i / 4), o = 0, a = e; o < s.length; o++, a += 4) {
    var u;
    r === "big"
      ? (u = (n[a] << 24) | (n[a + 1] << 16) | (n[a + 2] << 8) | n[a + 3])
      : (u = (n[a + 3] << 24) | (n[a + 2] << 16) | (n[a + 1] << 8) | n[a]),
      (s[o] = u >>> 0);
  }
  return s;
}
D.join32 = qo;
function Go(n, e) {
  for (
    var t = new Array(n.length * 4), r = 0, i = 0;
    r < n.length;
    r++, i += 4
  ) {
    var s = n[r];
    e === "big"
      ? ((t[i] = s >>> 24),
        (t[i + 1] = (s >>> 16) & 255),
        (t[i + 2] = (s >>> 8) & 255),
        (t[i + 3] = s & 255))
      : ((t[i + 3] = s >>> 24),
        (t[i + 2] = (s >>> 16) & 255),
        (t[i + 1] = (s >>> 8) & 255),
        (t[i] = s & 255));
  }
  return t;
}
D.split32 = Go;
function Ho(n, e) {
  return (n >>> e) | (n << (32 - e));
}
D.rotr32 = Ho;
function zo(n, e) {
  return (n << e) | (n >>> (32 - e));
}
D.rotl32 = zo;
function Ko(n, e) {
  return (n + e) >>> 0;
}
D.sum32 = Ko;
function Jo(n, e, t) {
  return (n + e + t) >>> 0;
}
D.sum32_3 = Jo;
function Qo(n, e, t, r) {
  return (n + e + t + r) >>> 0;
}
D.sum32_4 = Qo;
function Yo(n, e, t, r, i) {
  return (n + e + t + r + i) >>> 0;
}
D.sum32_5 = Yo;
function jo(n, e, t, r) {
  var i = n[e],
    s = n[e + 1],
    o = (r + s) >>> 0,
    a = (o < r ? 1 : 0) + t + i;
  (n[e] = a >>> 0), (n[e + 1] = o);
}
D.sum64 = jo;
function Wo(n, e, t, r) {
  var i = (e + r) >>> 0,
    s = (i < e ? 1 : 0) + n + t;
  return s >>> 0;
}
D.sum64_hi = Wo;
function Vo(n, e, t, r) {
  var i = e + r;
  return i >>> 0;
}
D.sum64_lo = Vo;
function Xo(n, e, t, r, i, s, o, a) {
  var u = 0,
    c = e;
  (c = (c + r) >>> 0),
    (u += c < e ? 1 : 0),
    (c = (c + s) >>> 0),
    (u += c < s ? 1 : 0),
    (c = (c + a) >>> 0),
    (u += c < a ? 1 : 0);
  var l = n + t + i + o + u;
  return l >>> 0;
}
D.sum64_4_hi = Xo;
function Zo(n, e, t, r, i, s, o, a) {
  var u = e + r + s + a;
  return u >>> 0;
}
D.sum64_4_lo = Zo;
function $o(n, e, t, r, i, s, o, a, u, c) {
  var l = 0,
    h = e;
  (h = (h + r) >>> 0),
    (l += h < e ? 1 : 0),
    (h = (h + s) >>> 0),
    (l += h < s ? 1 : 0),
    (h = (h + a) >>> 0),
    (l += h < a ? 1 : 0),
    (h = (h + c) >>> 0),
    (l += h < c ? 1 : 0);
  var d = n + t + i + o + u + l;
  return d >>> 0;
}
D.sum64_5_hi = $o;
function ea(n, e, t, r, i, s, o, a, u, c) {
  var l = e + r + s + a + c;
  return l >>> 0;
}
D.sum64_5_lo = ea;
function ta(n, e, t) {
  var r = (e << (32 - t)) | (n >>> t);
  return r >>> 0;
}
D.rotr64_hi = ta;
function ra(n, e, t) {
  var r = (n << (32 - t)) | (e >>> t);
  return r >>> 0;
}
D.rotr64_lo = ra;
function na(n, e, t) {
  return n >>> t;
}
D.shr64_hi = na;
function ia(n, e, t) {
  var r = (n << (32 - t)) | (e >>> t);
  return r >>> 0;
}
D.shr64_lo = ia;
var st = {},
  jn = D,
  sa = kt;
function Jr() {
  (this.pending = null),
    (this.pendingTotal = 0),
    (this.blockSize = this.constructor.blockSize),
    (this.outSize = this.constructor.outSize),
    (this.hmacStrength = this.constructor.hmacStrength),
    (this.padLength = this.constructor.padLength / 8),
    (this.endian = "big"),
    (this._delta8 = this.blockSize / 8),
    (this._delta32 = this.blockSize / 32);
}
st.BlockHash = Jr;
Jr.prototype.update = function (e, t) {
  if (
    ((e = jn.toArray(e, t)),
    this.pending ? (this.pending = this.pending.concat(e)) : (this.pending = e),
    (this.pendingTotal += e.length),
    this.pending.length >= this._delta8)
  ) {
    e = this.pending;
    var r = e.length % this._delta8;
    (this.pending = e.slice(e.length - r, e.length)),
      this.pending.length === 0 && (this.pending = null),
      (e = jn.join32(e, 0, e.length - r, this.endian));
    for (var i = 0; i < e.length; i += this._delta32)
      this._update(e, i, i + this._delta32);
  }
  return this;
};
Jr.prototype.digest = function (e) {
  return this.update(this._pad()), sa(this.pending === null), this._digest(e);
};
Jr.prototype._pad = function () {
  var e = this.pendingTotal,
    t = this._delta8,
    r = t - ((e + this.padLength) % t),
    i = new Array(r + this.padLength);
  i[0] = 128;
  for (var s = 1; s < r; s++) i[s] = 0;
  if (((e <<= 3), this.endian === "big")) {
    for (var o = 8; o < this.padLength; o++) i[s++] = 0;
    (i[s++] = 0),
      (i[s++] = 0),
      (i[s++] = 0),
      (i[s++] = 0),
      (i[s++] = (e >>> 24) & 255),
      (i[s++] = (e >>> 16) & 255),
      (i[s++] = (e >>> 8) & 255),
      (i[s++] = e & 255);
  } else
    for (
      i[s++] = e & 255,
        i[s++] = (e >>> 8) & 255,
        i[s++] = (e >>> 16) & 255,
        i[s++] = (e >>> 24) & 255,
        i[s++] = 0,
        i[s++] = 0,
        i[s++] = 0,
        i[s++] = 0,
        o = 8;
      o < this.padLength;
      o++
    )
      i[s++] = 0;
  return i;
};
var ot = {},
  Oe = {},
  oa = D,
  Pe = oa.rotr32;
function aa(n, e, t, r) {
  if (n === 0) return Hi(e, t, r);
  if (n === 1 || n === 3) return Ki(e, t, r);
  if (n === 2) return zi(e, t, r);
}
Oe.ft_1 = aa;
function Hi(n, e, t) {
  return (n & e) ^ (~n & t);
}
Oe.ch32 = Hi;
function zi(n, e, t) {
  return (n & e) ^ (n & t) ^ (e & t);
}
Oe.maj32 = zi;
function Ki(n, e, t) {
  return n ^ e ^ t;
}
Oe.p32 = Ki;
function fa(n) {
  return Pe(n, 2) ^ Pe(n, 13) ^ Pe(n, 22);
}
Oe.s0_256 = fa;
function ua(n) {
  return Pe(n, 6) ^ Pe(n, 11) ^ Pe(n, 25);
}
Oe.s1_256 = ua;
function ca(n) {
  return Pe(n, 7) ^ Pe(n, 18) ^ (n >>> 3);
}
Oe.g0_256 = ca;
function la(n) {
  return Pe(n, 17) ^ Pe(n, 19) ^ (n >>> 10);
}
Oe.g1_256 = la;
var rt = D,
  ha = st,
  da = Oe,
  $r = rt.rotl32,
  ht = rt.sum32,
  pa = rt.sum32_5,
  va = da.ft_1,
  Ji = ha.BlockHash,
  ga = [1518500249, 1859775393, 2400959708, 3395469782];
function Be() {
  if (!(this instanceof Be)) return new Be();
  Ji.call(this),
    (this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520]),
    (this.W = new Array(80));
}
rt.inherits(Be, Ji);
var Aa = Be;
Be.blockSize = 512;
Be.outSize = 160;
Be.hmacStrength = 80;
Be.padLength = 64;
Be.prototype._update = function (e, t) {
  for (var r = this.W, i = 0; i < 16; i++) r[i] = e[t + i];
  for (; i < r.length; i++)
    r[i] = $r(r[i - 3] ^ r[i - 8] ^ r[i - 14] ^ r[i - 16], 1);
  var s = this.h[0],
    o = this.h[1],
    a = this.h[2],
    u = this.h[3],
    c = this.h[4];
  for (i = 0; i < r.length; i++) {
    var l = ~~(i / 20),
      h = pa($r(s, 5), va(l, o, a, u), c, r[i], ga[l]);
    (c = u), (u = a), (a = $r(o, 30)), (o = s), (s = h);
  }
  (this.h[0] = ht(this.h[0], s)),
    (this.h[1] = ht(this.h[1], o)),
    (this.h[2] = ht(this.h[2], a)),
    (this.h[3] = ht(this.h[3], u)),
    (this.h[4] = ht(this.h[4], c));
};
Be.prototype._digest = function (e) {
  return e === "hex" ? rt.toHex32(this.h, "big") : rt.split32(this.h, "big");
};
var nt = D,
  ma = st,
  at = Oe,
  ba = kt,
  be = nt.sum32,
  ya = nt.sum32_4,
  wa = nt.sum32_5,
  xa = at.ch32,
  Ea = at.maj32,
  _a = at.s0_256,
  ka = at.s1_256,
  Ia = at.g0_256,
  Na = at.g1_256,
  Qi = ma.BlockHash,
  Pa = [
    1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
    2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987,
    1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774,
    264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
    2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711,
    113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
    1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411,
    3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344,
    430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
    1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424,
    2428436474, 2756734187, 3204031479, 3329325298,
  ];
function Re() {
  if (!(this instanceof Re)) return new Re();
  Qi.call(this),
    (this.h = [
      1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924,
      528734635, 1541459225,
    ]),
    (this.k = Pa),
    (this.W = new Array(64));
}
nt.inherits(Re, Qi);
var Yi = Re;
Re.blockSize = 512;
Re.outSize = 256;
Re.hmacStrength = 192;
Re.padLength = 64;
Re.prototype._update = function (e, t) {
  for (var r = this.W, i = 0; i < 16; i++) r[i] = e[t + i];
  for (; i < r.length; i++)
    r[i] = ya(Na(r[i - 2]), r[i - 7], Ia(r[i - 15]), r[i - 16]);
  var s = this.h[0],
    o = this.h[1],
    a = this.h[2],
    u = this.h[3],
    c = this.h[4],
    l = this.h[5],
    h = this.h[6],
    d = this.h[7];
  for (ba(this.k.length === r.length), i = 0; i < r.length; i++) {
    var p = wa(d, ka(c), xa(c, l, h), this.k[i], r[i]),
      v = be(_a(s), Ea(s, o, a));
    (d = h),
      (h = l),
      (l = c),
      (c = be(u, p)),
      (u = a),
      (a = o),
      (o = s),
      (s = be(p, v));
  }
  (this.h[0] = be(this.h[0], s)),
    (this.h[1] = be(this.h[1], o)),
    (this.h[2] = be(this.h[2], a)),
    (this.h[3] = be(this.h[3], u)),
    (this.h[4] = be(this.h[4], c)),
    (this.h[5] = be(this.h[5], l)),
    (this.h[6] = be(this.h[6], h)),
    (this.h[7] = be(this.h[7], d));
};
Re.prototype._digest = function (e) {
  return e === "hex" ? nt.toHex32(this.h, "big") : nt.split32(this.h, "big");
};
var pn = D,
  ji = Yi;
function Ue() {
  if (!(this instanceof Ue)) return new Ue();
  ji.call(this),
    (this.h = [
      3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025,
      1694076839, 3204075428,
    ]);
}
pn.inherits(Ue, ji);
var Sa = Ue;
Ue.blockSize = 512;
Ue.outSize = 224;
Ue.hmacStrength = 192;
Ue.padLength = 64;
Ue.prototype._digest = function (e) {
  return e === "hex"
    ? pn.toHex32(this.h.slice(0, 7), "big")
    : pn.split32(this.h.slice(0, 7), "big");
};
var oe = D,
  Ca = st,
  Ba = kt,
  Se = oe.rotr64_hi,
  Ce = oe.rotr64_lo,
  Wi = oe.shr64_hi,
  Vi = oe.shr64_lo,
  ze = oe.sum64,
  en = oe.sum64_hi,
  tn = oe.sum64_lo,
  Ra = oe.sum64_4_hi,
  Ta = oe.sum64_4_lo,
  Oa = oe.sum64_5_hi,
  Fa = oe.sum64_5_lo,
  Xi = Ca.BlockHash,
  Da = [
    1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399,
    3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265,
    2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394,
    310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994,
    1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317,
    3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139,
    264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901,
    1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837,
    2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879,
    3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901,
    113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964,
    773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823,
    1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142,
    2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273,
    3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344,
    3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720,
    430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593,
    883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403,
    1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012,
    2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044,
    2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573,
    3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711,
    3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554,
    174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315,
    685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100,
    1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866,
    1607167915, 987167468, 1816402316, 1246189591,
  ];
function Ee() {
  if (!(this instanceof Ee)) return new Ee();
  Xi.call(this),
    (this.h = [
      1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723,
      2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199,
      528734635, 4215389547, 1541459225, 327033209,
    ]),
    (this.k = Da),
    (this.W = new Array(160));
}
oe.inherits(Ee, Xi);
var Zi = Ee;
Ee.blockSize = 1024;
Ee.outSize = 512;
Ee.hmacStrength = 192;
Ee.padLength = 128;
Ee.prototype._prepareBlock = function (e, t) {
  for (var r = this.W, i = 0; i < 32; i++) r[i] = e[t + i];
  for (; i < r.length; i += 2) {
    var s = Ya(r[i - 4], r[i - 3]),
      o = ja(r[i - 4], r[i - 3]),
      a = r[i - 14],
      u = r[i - 13],
      c = Ja(r[i - 30], r[i - 29]),
      l = Qa(r[i - 30], r[i - 29]),
      h = r[i - 32],
      d = r[i - 31];
    (r[i] = Ra(s, o, a, u, c, l, h, d)),
      (r[i + 1] = Ta(s, o, a, u, c, l, h, d));
  }
};
Ee.prototype._update = function (e, t) {
  this._prepareBlock(e, t);
  var r = this.W,
    i = this.h[0],
    s = this.h[1],
    o = this.h[2],
    a = this.h[3],
    u = this.h[4],
    c = this.h[5],
    l = this.h[6],
    h = this.h[7],
    d = this.h[8],
    p = this.h[9],
    v = this.h[10],
    A = this.h[11],
    k = this.h[12],
    y = this.h[13],
    E = this.h[14],
    O = this.h[15];
  Ba(this.k.length === r.length);
  for (var M = 0; M < r.length; M += 2) {
    var S = E,
      q = O,
      ee = za(d, p),
      z = Ka(d, p),
      j = Ma(d, p, v, A, k),
      He = La(d, p, v, A, k, y),
      Nt = this.k[M],
      Pt = this.k[M + 1],
      ut = r[M],
      ge = r[M + 1],
      _e = Oa(S, q, ee, z, j, He, Nt, Pt, ut, ge),
      ae = Fa(S, q, ee, z, j, He, Nt, Pt, ut, ge);
    (S = Ga(i, s)),
      (q = Ha(i, s)),
      (ee = Ua(i, s, o, a, u)),
      (z = qa(i, s, o, a, u, c));
    var Fe = en(S, q, ee, z),
      Ye = tn(S, q, ee, z);
    (E = k),
      (O = y),
      (k = v),
      (y = A),
      (v = d),
      (A = p),
      (d = en(l, h, _e, ae)),
      (p = tn(h, h, _e, ae)),
      (l = u),
      (h = c),
      (u = o),
      (c = a),
      (o = i),
      (a = s),
      (i = en(_e, ae, Fe, Ye)),
      (s = tn(_e, ae, Fe, Ye));
  }
  ze(this.h, 0, i, s),
    ze(this.h, 2, o, a),
    ze(this.h, 4, u, c),
    ze(this.h, 6, l, h),
    ze(this.h, 8, d, p),
    ze(this.h, 10, v, A),
    ze(this.h, 12, k, y),
    ze(this.h, 14, E, O);
};
Ee.prototype._digest = function (e) {
  return e === "hex" ? oe.toHex32(this.h, "big") : oe.split32(this.h, "big");
};
function Ma(n, e, t, r, i) {
  var s = (n & t) ^ (~n & i);
  return s < 0 && (s += 4294967296), s;
}
function La(n, e, t, r, i, s) {
  var o = (e & r) ^ (~e & s);
  return o < 0 && (o += 4294967296), o;
}
function Ua(n, e, t, r, i) {
  var s = (n & t) ^ (n & i) ^ (t & i);
  return s < 0 && (s += 4294967296), s;
}
function qa(n, e, t, r, i, s) {
  var o = (e & r) ^ (e & s) ^ (r & s);
  return o < 0 && (o += 4294967296), o;
}
function Ga(n, e) {
  var t = Se(n, e, 28),
    r = Se(e, n, 2),
    i = Se(e, n, 7),
    s = t ^ r ^ i;
  return s < 0 && (s += 4294967296), s;
}
function Ha(n, e) {
  var t = Ce(n, e, 28),
    r = Ce(e, n, 2),
    i = Ce(e, n, 7),
    s = t ^ r ^ i;
  return s < 0 && (s += 4294967296), s;
}
function za(n, e) {
  var t = Se(n, e, 14),
    r = Se(n, e, 18),
    i = Se(e, n, 9),
    s = t ^ r ^ i;
  return s < 0 && (s += 4294967296), s;
}
function Ka(n, e) {
  var t = Ce(n, e, 14),
    r = Ce(n, e, 18),
    i = Ce(e, n, 9),
    s = t ^ r ^ i;
  return s < 0 && (s += 4294967296), s;
}
function Ja(n, e) {
  var t = Se(n, e, 1),
    r = Se(n, e, 8),
    i = Wi(n, e, 7),
    s = t ^ r ^ i;
  return s < 0 && (s += 4294967296), s;
}
function Qa(n, e) {
  var t = Ce(n, e, 1),
    r = Ce(n, e, 8),
    i = Vi(n, e, 7),
    s = t ^ r ^ i;
  return s < 0 && (s += 4294967296), s;
}
function Ya(n, e) {
  var t = Se(n, e, 19),
    r = Se(e, n, 29),
    i = Wi(n, e, 6),
    s = t ^ r ^ i;
  return s < 0 && (s += 4294967296), s;
}
function ja(n, e) {
  var t = Ce(n, e, 19),
    r = Ce(e, n, 29),
    i = Vi(n, e, 6),
    s = t ^ r ^ i;
  return s < 0 && (s += 4294967296), s;
}
var vn = D,
  $i = Zi;
function qe() {
  if (!(this instanceof qe)) return new qe();
  $i.call(this),
    (this.h = [
      3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999,
      355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025,
      3675008525, 1694076839, 1203062813, 3204075428,
    ]);
}
vn.inherits(qe, $i);
var Wa = qe;
qe.blockSize = 1024;
qe.outSize = 384;
qe.hmacStrength = 192;
qe.padLength = 128;
qe.prototype._digest = function (e) {
  return e === "hex"
    ? vn.toHex32(this.h.slice(0, 12), "big")
    : vn.split32(this.h.slice(0, 12), "big");
};
ot.sha1 = Aa;
ot.sha224 = Sa;
ot.sha256 = Yi;
ot.sha384 = Wa;
ot.sha512 = Zi;
var es = {},
  Ve = D,
  Va = st,
  Pr = Ve.rotl32,
  Wn = Ve.sum32,
  dt = Ve.sum32_3,
  Vn = Ve.sum32_4,
  ts = Va.BlockHash;
function Te() {
  if (!(this instanceof Te)) return new Te();
  ts.call(this),
    (this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520]),
    (this.endian = "little");
}
Ve.inherits(Te, ts);
es.ripemd160 = Te;
Te.blockSize = 512;
Te.outSize = 160;
Te.hmacStrength = 192;
Te.padLength = 64;
Te.prototype._update = function (e, t) {
  for (
    var r = this.h[0],
      i = this.h[1],
      s = this.h[2],
      o = this.h[3],
      a = this.h[4],
      u = r,
      c = i,
      l = s,
      h = o,
      d = a,
      p = 0;
    p < 80;
    p++
  ) {
    var v = Wn(Pr(Vn(r, Xn(p, i, s, o), e[$a[p] + t], Xa(p)), tf[p]), a);
    (r = a),
      (a = o),
      (o = Pr(s, 10)),
      (s = i),
      (i = v),
      (v = Wn(Pr(Vn(u, Xn(79 - p, c, l, h), e[ef[p] + t], Za(p)), rf[p]), d)),
      (u = d),
      (d = h),
      (h = Pr(l, 10)),
      (l = c),
      (c = v);
  }
  (v = dt(this.h[1], s, h)),
    (this.h[1] = dt(this.h[2], o, d)),
    (this.h[2] = dt(this.h[3], a, u)),
    (this.h[3] = dt(this.h[4], r, c)),
    (this.h[4] = dt(this.h[0], i, l)),
    (this.h[0] = v);
};
Te.prototype._digest = function (e) {
  return e === "hex"
    ? Ve.toHex32(this.h, "little")
    : Ve.split32(this.h, "little");
};
function Xn(n, e, t, r) {
  return n <= 15
    ? e ^ t ^ r
    : n <= 31
      ? (e & t) | (~e & r)
      : n <= 47
        ? (e | ~t) ^ r
        : n <= 63
          ? (e & r) | (t & ~r)
          : e ^ (t | ~r);
}
function Xa(n) {
  return n <= 15
    ? 0
    : n <= 31
      ? 1518500249
      : n <= 47
        ? 1859775393
        : n <= 63
          ? 2400959708
          : 2840853838;
}
function Za(n) {
  return n <= 15
    ? 1352829926
    : n <= 31
      ? 1548603684
      : n <= 47
        ? 1836072691
        : n <= 63
          ? 2053994217
          : 0;
}
var $a = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6,
    15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13,
    11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9,
    7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13,
  ],
  ef = [
    5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5,
    10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10,
    0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10,
    4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11,
  ],
  tf = [
    11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9,
    7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13,
    6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9,
    15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6,
  ],
  rf = [
    8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8,
    9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14,
    13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5,
    12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11,
  ],
  nf = D,
  sf = kt;
function it(n, e, t) {
  if (!(this instanceof it)) return new it(n, e, t);
  (this.Hash = n),
    (this.blockSize = n.blockSize / 8),
    (this.outSize = n.outSize / 8),
    (this.inner = null),
    (this.outer = null),
    this._init(nf.toArray(e, t));
}
var of = it;
it.prototype._init = function (e) {
  e.length > this.blockSize && (e = new this.Hash().update(e).digest()),
    sf(e.length <= this.blockSize);
  for (var t = e.length; t < this.blockSize; t++) e.push(0);
  for (t = 0; t < e.length; t++) e[t] ^= 54;
  for (this.inner = new this.Hash().update(e), t = 0; t < e.length; t++)
    e[t] ^= 106;
  this.outer = new this.Hash().update(e);
};
it.prototype.update = function (e, t) {
  return this.inner.update(e, t), this;
};
it.prototype.digest = function (e) {
  return this.outer.update(this.inner.digest()), this.outer.digest(e);
};
(function (n) {
  var e = n;
  (e.utils = D),
    (e.common = st),
    (e.sha = ot),
    (e.ripemd = es),
    (e.hmac = of),
    (e.sha1 = e.sha.sha1),
    (e.sha256 = e.sha.sha256),
    (e.sha224 = e.sha.sha224),
    (e.sha384 = e.sha.sha384),
    (e.sha512 = e.sha.sha512),
    (e.ripemd160 = e.ripemd.ripemd160);
})(Mi);
const ke = yn(Mi);
function Zn(n) {
  return "0x" + ke.sha256().update(L(n)).digest("hex");
}
function ft(n, e, t) {
  return (
    (t = {
      path: e,
      exports: {},
      require: function (r, i) {
        return af(r, i ?? t.path);
      },
    }),
    n(t, t.exports),
    t.exports
  );
}
function af() {
  throw new Error(
    "Dynamic requires are not currently supported by @rollup/plugin-commonjs"
  );
}
var In = rs;
function rs(n, e) {
  if (!n) throw new Error(e || "Assertion failed");
}
rs.equal = function (e, t, r) {
  if (e != t) throw new Error(r || "Assertion failed: " + e + " != " + t);
};
var we = ft(function (n, e) {
    var t = e;
    function r(o, a) {
      if (Array.isArray(o)) return o.slice();
      if (!o) return [];
      var u = [];
      if (typeof o != "string") {
        for (var c = 0; c < o.length; c++) u[c] = o[c] | 0;
        return u;
      }
      if (a === "hex") {
        (o = o.replace(/[^a-z0-9]+/gi, "")),
          o.length % 2 !== 0 && (o = "0" + o);
        for (var c = 0; c < o.length; c += 2)
          u.push(parseInt(o[c] + o[c + 1], 16));
      } else
        for (var c = 0; c < o.length; c++) {
          var l = o.charCodeAt(c),
            h = l >> 8,
            d = l & 255;
          h ? u.push(h, d) : u.push(d);
        }
      return u;
    }
    t.toArray = r;
    function i(o) {
      return o.length === 1 ? "0" + o : o;
    }
    t.zero2 = i;
    function s(o) {
      for (var a = "", u = 0; u < o.length; u++) a += i(o[u].toString(16));
      return a;
    }
    (t.toHex = s),
      (t.encode = function (a, u) {
        return u === "hex" ? s(a) : a;
      });
  }),
  he = ft(function (n, e) {
    var t = e;
    (t.assert = In),
      (t.toArray = we.toArray),
      (t.zero2 = we.zero2),
      (t.toHex = we.toHex),
      (t.encode = we.encode);
    function r(u, c, l) {
      var h = new Array(Math.max(u.bitLength(), l) + 1);
      h.fill(0);
      for (var d = 1 << (c + 1), p = u.clone(), v = 0; v < h.length; v++) {
        var A,
          k = p.andln(d - 1);
        p.isOdd()
          ? (k > (d >> 1) - 1 ? (A = (d >> 1) - k) : (A = k), p.isubn(A))
          : (A = 0),
          (h[v] = A),
          p.iushrn(1);
      }
      return h;
    }
    t.getNAF = r;
    function i(u, c) {
      var l = [[], []];
      (u = u.clone()), (c = c.clone());
      for (var h = 0, d = 0, p; u.cmpn(-h) > 0 || c.cmpn(-d) > 0; ) {
        var v = (u.andln(3) + h) & 3,
          A = (c.andln(3) + d) & 3;
        v === 3 && (v = -1), A === 3 && (A = -1);
        var k;
        v & 1
          ? ((p = (u.andln(7) + h) & 7),
            (p === 3 || p === 5) && A === 2 ? (k = -v) : (k = v))
          : (k = 0),
          l[0].push(k);
        var y;
        A & 1
          ? ((p = (c.andln(7) + d) & 7),
            (p === 3 || p === 5) && v === 2 ? (y = -A) : (y = A))
          : (y = 0),
          l[1].push(y),
          2 * h === k + 1 && (h = 1 - h),
          2 * d === y + 1 && (d = 1 - d),
          u.iushrn(1),
          c.iushrn(1);
      }
      return l;
    }
    t.getJSF = i;
    function s(u, c, l) {
      var h = "_" + c;
      u.prototype[c] = function () {
        return this[h] !== void 0 ? this[h] : (this[h] = l.call(this));
      };
    }
    t.cachedProperty = s;
    function o(u) {
      return typeof u == "string" ? t.toArray(u, "hex") : u;
    }
    t.parseBytes = o;
    function a(u) {
      return new T(u, "hex", "le");
    }
    t.intFromLE = a;
  }),
  Mr = he.getNAF,
  ff = he.getJSF,
  Lr = he.assert;
function Qe(n, e) {
  (this.type = n),
    (this.p = new T(e.p, 16)),
    (this.red = e.prime ? T.red(e.prime) : T.mont(this.p)),
    (this.zero = new T(0).toRed(this.red)),
    (this.one = new T(1).toRed(this.red)),
    (this.two = new T(2).toRed(this.red)),
    (this.n = e.n && new T(e.n, 16)),
    (this.g = e.g && this.pointFromJSON(e.g, e.gRed)),
    (this._wnafT1 = new Array(4)),
    (this._wnafT2 = new Array(4)),
    (this._wnafT3 = new Array(4)),
    (this._wnafT4 = new Array(4)),
    (this._bitLength = this.n ? this.n.bitLength() : 0);
  var t = this.n && this.p.div(this.n);
  !t || t.cmpn(100) > 0
    ? (this.redN = null)
    : ((this._maxwellTrick = !0), (this.redN = this.n.toRed(this.red)));
}
var Xe = Qe;
Qe.prototype.point = function () {
  throw new Error("Not implemented");
};
Qe.prototype.validate = function () {
  throw new Error("Not implemented");
};
Qe.prototype._fixedNafMul = function (e, t) {
  Lr(e.precomputed);
  var r = e._getDoubles(),
    i = Mr(t, 1, this._bitLength),
    s = (1 << (r.step + 1)) - (r.step % 2 === 0 ? 2 : 1);
  s /= 3;
  var o = [],
    a,
    u;
  for (a = 0; a < i.length; a += r.step) {
    u = 0;
    for (var c = a + r.step - 1; c >= a; c--) u = (u << 1) + i[c];
    o.push(u);
  }
  for (
    var l = this.jpoint(null, null, null),
      h = this.jpoint(null, null, null),
      d = s;
    d > 0;
    d--
  ) {
    for (a = 0; a < o.length; a++)
      (u = o[a]),
        u === d
          ? (h = h.mixedAdd(r.points[a]))
          : u === -d && (h = h.mixedAdd(r.points[a].neg()));
    l = l.add(h);
  }
  return l.toP();
};
Qe.prototype._wnafMul = function (e, t) {
  var r = 4,
    i = e._getNAFPoints(r);
  r = i.wnd;
  for (
    var s = i.points,
      o = Mr(t, r, this._bitLength),
      a = this.jpoint(null, null, null),
      u = o.length - 1;
    u >= 0;
    u--
  ) {
    for (var c = 0; u >= 0 && o[u] === 0; u--) c++;
    if ((u >= 0 && c++, (a = a.dblp(c)), u < 0)) break;
    var l = o[u];
    Lr(l !== 0),
      e.type === "affine"
        ? l > 0
          ? (a = a.mixedAdd(s[(l - 1) >> 1]))
          : (a = a.mixedAdd(s[(-l - 1) >> 1].neg()))
        : l > 0
          ? (a = a.add(s[(l - 1) >> 1]))
          : (a = a.add(s[(-l - 1) >> 1].neg()));
  }
  return e.type === "affine" ? a.toP() : a;
};
Qe.prototype._wnafMulAdd = function (e, t, r, i, s) {
  var o = this._wnafT1,
    a = this._wnafT2,
    u = this._wnafT3,
    c = 0,
    l,
    h,
    d;
  for (l = 0; l < i; l++) {
    d = t[l];
    var p = d._getNAFPoints(e);
    (o[l] = p.wnd), (a[l] = p.points);
  }
  for (l = i - 1; l >= 1; l -= 2) {
    var v = l - 1,
      A = l;
    if (o[v] !== 1 || o[A] !== 1) {
      (u[v] = Mr(r[v], o[v], this._bitLength)),
        (u[A] = Mr(r[A], o[A], this._bitLength)),
        (c = Math.max(u[v].length, c)),
        (c = Math.max(u[A].length, c));
      continue;
    }
    var k = [t[v], null, null, t[A]];
    t[v].y.cmp(t[A].y) === 0
      ? ((k[1] = t[v].add(t[A])), (k[2] = t[v].toJ().mixedAdd(t[A].neg())))
      : t[v].y.cmp(t[A].y.redNeg()) === 0
        ? ((k[1] = t[v].toJ().mixedAdd(t[A])), (k[2] = t[v].add(t[A].neg())))
        : ((k[1] = t[v].toJ().mixedAdd(t[A])),
          (k[2] = t[v].toJ().mixedAdd(t[A].neg())));
    var y = [-3, -1, -5, -7, 0, 7, 5, 1, 3],
      E = ff(r[v], r[A]);
    for (
      c = Math.max(E[0].length, c),
        u[v] = new Array(c),
        u[A] = new Array(c),
        h = 0;
      h < c;
      h++
    ) {
      var O = E[0][h] | 0,
        M = E[1][h] | 0;
      (u[v][h] = y[(O + 1) * 3 + (M + 1)]), (u[A][h] = 0), (a[v] = k);
    }
  }
  var S = this.jpoint(null, null, null),
    q = this._wnafT4;
  for (l = c; l >= 0; l--) {
    for (var ee = 0; l >= 0; ) {
      var z = !0;
      for (h = 0; h < i; h++) (q[h] = u[h][l] | 0), q[h] !== 0 && (z = !1);
      if (!z) break;
      ee++, l--;
    }
    if ((l >= 0 && ee++, (S = S.dblp(ee)), l < 0)) break;
    for (h = 0; h < i; h++) {
      var j = q[h];
      j !== 0 &&
        (j > 0
          ? (d = a[h][(j - 1) >> 1])
          : j < 0 && (d = a[h][(-j - 1) >> 1].neg()),
        d.type === "affine" ? (S = S.mixedAdd(d)) : (S = S.add(d)));
    }
  }
  for (l = 0; l < i; l++) a[l] = null;
  return s ? S : S.toP();
};
function pe(n, e) {
  (this.curve = n), (this.type = e), (this.precomputed = null);
}
Qe.BasePoint = pe;
pe.prototype.eq = function () {
  throw new Error("Not implemented");
};
pe.prototype.validate = function () {
  return this.curve.validate(this);
};
Qe.prototype.decodePoint = function (e, t) {
  e = he.toArray(e, t);
  var r = this.p.byteLength();
  if ((e[0] === 4 || e[0] === 6 || e[0] === 7) && e.length - 1 === 2 * r) {
    e[0] === 6
      ? Lr(e[e.length - 1] % 2 === 0)
      : e[0] === 7 && Lr(e[e.length - 1] % 2 === 1);
    var i = this.point(e.slice(1, 1 + r), e.slice(1 + r, 1 + 2 * r));
    return i;
  } else if ((e[0] === 2 || e[0] === 3) && e.length - 1 === r)
    return this.pointFromX(e.slice(1, 1 + r), e[0] === 3);
  throw new Error("Unknown point format");
};
pe.prototype.encodeCompressed = function (e) {
  return this.encode(e, !0);
};
pe.prototype._encode = function (e) {
  var t = this.curve.p.byteLength(),
    r = this.getX().toArray("be", t);
  return e
    ? [this.getY().isEven() ? 2 : 3].concat(r)
    : [4].concat(r, this.getY().toArray("be", t));
};
pe.prototype.encode = function (e, t) {
  return he.encode(this._encode(t), e);
};
pe.prototype.precompute = function (e) {
  if (this.precomputed) return this;
  var t = { doubles: null, naf: null, beta: null };
  return (
    (t.naf = this._getNAFPoints(8)),
    (t.doubles = this._getDoubles(4, e)),
    (t.beta = this._getBeta()),
    (this.precomputed = t),
    this
  );
};
pe.prototype._hasDoubles = function (e) {
  if (!this.precomputed) return !1;
  var t = this.precomputed.doubles;
  return t ? t.points.length >= Math.ceil((e.bitLength() + 1) / t.step) : !1;
};
pe.prototype._getDoubles = function (e, t) {
  if (this.precomputed && this.precomputed.doubles)
    return this.precomputed.doubles;
  for (var r = [this], i = this, s = 0; s < t; s += e) {
    for (var o = 0; o < e; o++) i = i.dbl();
    r.push(i);
  }
  return { step: e, points: r };
};
pe.prototype._getNAFPoints = function (e) {
  if (this.precomputed && this.precomputed.naf) return this.precomputed.naf;
  for (
    var t = [this], r = (1 << e) - 1, i = r === 1 ? null : this.dbl(), s = 1;
    s < r;
    s++
  )
    t[s] = t[s - 1].add(i);
  return { wnd: e, points: t };
};
pe.prototype._getBeta = function () {
  return null;
};
pe.prototype.dblp = function (e) {
  for (var t = this, r = 0; r < e; r++) t = t.dbl();
  return t;
};
var Nn = ft(function (n) {
    typeof Object.create == "function"
      ? (n.exports = function (t, r) {
          r &&
            ((t.super_ = r),
            (t.prototype = Object.create(r.prototype, {
              constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0,
              },
            })));
        })
      : (n.exports = function (t, r) {
          if (r) {
            t.super_ = r;
            var i = function () {};
            (i.prototype = r.prototype),
              (t.prototype = new i()),
              (t.prototype.constructor = t);
          }
        });
  }),
  uf = he.assert;
function ve(n) {
  Xe.call(this, "short", n),
    (this.a = new T(n.a, 16).toRed(this.red)),
    (this.b = new T(n.b, 16).toRed(this.red)),
    (this.tinv = this.two.redInvm()),
    (this.zeroA = this.a.fromRed().cmpn(0) === 0),
    (this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0),
    (this.endo = this._getEndomorphism(n)),
    (this._endoWnafT1 = new Array(4)),
    (this._endoWnafT2 = new Array(4));
}
Nn(ve, Xe);
var cf = ve;
ve.prototype._getEndomorphism = function (e) {
  if (!(!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)) {
    var t, r;
    if (e.beta) t = new T(e.beta, 16).toRed(this.red);
    else {
      var i = this._getEndoRoots(this.p);
      (t = i[0].cmp(i[1]) < 0 ? i[0] : i[1]), (t = t.toRed(this.red));
    }
    if (e.lambda) r = new T(e.lambda, 16);
    else {
      var s = this._getEndoRoots(this.n);
      this.g.mul(s[0]).x.cmp(this.g.x.redMul(t)) === 0
        ? (r = s[0])
        : ((r = s[1]), uf(this.g.mul(r).x.cmp(this.g.x.redMul(t)) === 0));
    }
    var o;
    return (
      e.basis
        ? (o = e.basis.map(function (a) {
            return { a: new T(a.a, 16), b: new T(a.b, 16) };
          }))
        : (o = this._getEndoBasis(r)),
      { beta: t, lambda: r, basis: o }
    );
  }
};
ve.prototype._getEndoRoots = function (e) {
  var t = e === this.p ? this.red : T.mont(e),
    r = new T(2).toRed(t).redInvm(),
    i = r.redNeg(),
    s = new T(3).toRed(t).redNeg().redSqrt().redMul(r),
    o = i.redAdd(s).fromRed(),
    a = i.redSub(s).fromRed();
  return [o, a];
};
ve.prototype._getEndoBasis = function (e) {
  for (
    var t = this.n.ushrn(Math.floor(this.n.bitLength() / 2)),
      r = e,
      i = this.n.clone(),
      s = new T(1),
      o = new T(0),
      a = new T(0),
      u = new T(1),
      c,
      l,
      h,
      d,
      p,
      v,
      A,
      k = 0,
      y,
      E;
    r.cmpn(0) !== 0;

  ) {
    var O = i.div(r);
    (y = i.sub(O.mul(r))), (E = a.sub(O.mul(s)));
    var M = u.sub(O.mul(o));
    if (!h && y.cmp(t) < 0) (c = A.neg()), (l = s), (h = y.neg()), (d = E);
    else if (h && ++k === 2) break;
    (A = y), (i = r), (r = y), (a = s), (s = E), (u = o), (o = M);
  }
  (p = y.neg()), (v = E);
  var S = h.sqr().add(d.sqr()),
    q = p.sqr().add(v.sqr());
  return (
    q.cmp(S) >= 0 && ((p = c), (v = l)),
    h.negative && ((h = h.neg()), (d = d.neg())),
    p.negative && ((p = p.neg()), (v = v.neg())),
    [
      { a: h, b: d },
      { a: p, b: v },
    ]
  );
};
ve.prototype._endoSplit = function (e) {
  var t = this.endo.basis,
    r = t[0],
    i = t[1],
    s = i.b.mul(e).divRound(this.n),
    o = r.b.neg().mul(e).divRound(this.n),
    a = s.mul(r.a),
    u = o.mul(i.a),
    c = s.mul(r.b),
    l = o.mul(i.b),
    h = e.sub(a).sub(u),
    d = c.add(l).neg();
  return { k1: h, k2: d };
};
ve.prototype.pointFromX = function (e, t) {
  (e = new T(e, 16)), e.red || (e = e.toRed(this.red));
  var r = e.redSqr().redMul(e).redIAdd(e.redMul(this.a)).redIAdd(this.b),
    i = r.redSqrt();
  if (i.redSqr().redSub(r).cmp(this.zero) !== 0)
    throw new Error("invalid point");
  var s = i.fromRed().isOdd();
  return ((t && !s) || (!t && s)) && (i = i.redNeg()), this.point(e, i);
};
ve.prototype.validate = function (e) {
  if (e.inf) return !0;
  var t = e.x,
    r = e.y,
    i = this.a.redMul(t),
    s = t.redSqr().redMul(t).redIAdd(i).redIAdd(this.b);
  return r.redSqr().redISub(s).cmpn(0) === 0;
};
ve.prototype._endoWnafMulAdd = function (e, t, r) {
  for (
    var i = this._endoWnafT1, s = this._endoWnafT2, o = 0;
    o < e.length;
    o++
  ) {
    var a = this._endoSplit(t[o]),
      u = e[o],
      c = u._getBeta();
    a.k1.negative && (a.k1.ineg(), (u = u.neg(!0))),
      a.k2.negative && (a.k2.ineg(), (c = c.neg(!0))),
      (i[o * 2] = u),
      (i[o * 2 + 1] = c),
      (s[o * 2] = a.k1),
      (s[o * 2 + 1] = a.k2);
  }
  for (var l = this._wnafMulAdd(1, i, s, o * 2, r), h = 0; h < o * 2; h++)
    (i[h] = null), (s[h] = null);
  return l;
};
function W(n, e, t, r) {
  Xe.BasePoint.call(this, n, "affine"),
    e === null && t === null
      ? ((this.x = null), (this.y = null), (this.inf = !0))
      : ((this.x = new T(e, 16)),
        (this.y = new T(t, 16)),
        r && (this.x.forceRed(this.curve.red), this.y.forceRed(this.curve.red)),
        this.x.red || (this.x = this.x.toRed(this.curve.red)),
        this.y.red || (this.y = this.y.toRed(this.curve.red)),
        (this.inf = !1));
}
Nn(W, Xe.BasePoint);
ve.prototype.point = function (e, t, r) {
  return new W(this, e, t, r);
};
ve.prototype.pointFromJSON = function (e, t) {
  return W.fromJSON(this, e, t);
};
W.prototype._getBeta = function () {
  if (this.curve.endo) {
    var e = this.precomputed;
    if (e && e.beta) return e.beta;
    var t = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
    if (e) {
      var r = this.curve,
        i = function (s) {
          return r.point(s.x.redMul(r.endo.beta), s.y);
        };
      (e.beta = t),
        (t.precomputed = {
          beta: null,
          naf: e.naf && { wnd: e.naf.wnd, points: e.naf.points.map(i) },
          doubles: e.doubles && {
            step: e.doubles.step,
            points: e.doubles.points.map(i),
          },
        });
    }
    return t;
  }
};
W.prototype.toJSON = function () {
  return this.precomputed
    ? [
        this.x,
        this.y,
        this.precomputed && {
          doubles: this.precomputed.doubles && {
            step: this.precomputed.doubles.step,
            points: this.precomputed.doubles.points.slice(1),
          },
          naf: this.precomputed.naf && {
            wnd: this.precomputed.naf.wnd,
            points: this.precomputed.naf.points.slice(1),
          },
        },
      ]
    : [this.x, this.y];
};
W.fromJSON = function (e, t, r) {
  typeof t == "string" && (t = JSON.parse(t));
  var i = e.point(t[0], t[1], r);
  if (!t[2]) return i;
  function s(a) {
    return e.point(a[0], a[1], r);
  }
  var o = t[2];
  return (
    (i.precomputed = {
      beta: null,
      doubles: o.doubles && {
        step: o.doubles.step,
        points: [i].concat(o.doubles.points.map(s)),
      },
      naf: o.naf && { wnd: o.naf.wnd, points: [i].concat(o.naf.points.map(s)) },
    }),
    i
  );
};
W.prototype.inspect = function () {
  return this.isInfinity()
    ? "<EC Point Infinity>"
    : "<EC Point x: " +
        this.x.fromRed().toString(16, 2) +
        " y: " +
        this.y.fromRed().toString(16, 2) +
        ">";
};
W.prototype.isInfinity = function () {
  return this.inf;
};
W.prototype.add = function (e) {
  if (this.inf) return e;
  if (e.inf) return this;
  if (this.eq(e)) return this.dbl();
  if (this.neg().eq(e)) return this.curve.point(null, null);
  if (this.x.cmp(e.x) === 0) return this.curve.point(null, null);
  var t = this.y.redSub(e.y);
  t.cmpn(0) !== 0 && (t = t.redMul(this.x.redSub(e.x).redInvm()));
  var r = t.redSqr().redISub(this.x).redISub(e.x),
    i = t.redMul(this.x.redSub(r)).redISub(this.y);
  return this.curve.point(r, i);
};
W.prototype.dbl = function () {
  if (this.inf) return this;
  var e = this.y.redAdd(this.y);
  if (e.cmpn(0) === 0) return this.curve.point(null, null);
  var t = this.curve.a,
    r = this.x.redSqr(),
    i = e.redInvm(),
    s = r.redAdd(r).redIAdd(r).redIAdd(t).redMul(i),
    o = s.redSqr().redISub(this.x.redAdd(this.x)),
    a = s.redMul(this.x.redSub(o)).redISub(this.y);
  return this.curve.point(o, a);
};
W.prototype.getX = function () {
  return this.x.fromRed();
};
W.prototype.getY = function () {
  return this.y.fromRed();
};
W.prototype.mul = function (e) {
  return (
    (e = new T(e, 16)),
    this.isInfinity()
      ? this
      : this._hasDoubles(e)
        ? this.curve._fixedNafMul(this, e)
        : this.curve.endo
          ? this.curve._endoWnafMulAdd([this], [e])
          : this.curve._wnafMul(this, e)
  );
};
W.prototype.mulAdd = function (e, t, r) {
  var i = [this, t],
    s = [e, r];
  return this.curve.endo
    ? this.curve._endoWnafMulAdd(i, s)
    : this.curve._wnafMulAdd(1, i, s, 2);
};
W.prototype.jmulAdd = function (e, t, r) {
  var i = [this, t],
    s = [e, r];
  return this.curve.endo
    ? this.curve._endoWnafMulAdd(i, s, !0)
    : this.curve._wnafMulAdd(1, i, s, 2, !0);
};
W.prototype.eq = function (e) {
  return (
    this === e ||
    (this.inf === e.inf &&
      (this.inf || (this.x.cmp(e.x) === 0 && this.y.cmp(e.y) === 0)))
  );
};
W.prototype.neg = function (e) {
  if (this.inf) return this;
  var t = this.curve.point(this.x, this.y.redNeg());
  if (e && this.precomputed) {
    var r = this.precomputed,
      i = function (s) {
        return s.neg();
      };
    t.precomputed = {
      naf: r.naf && { wnd: r.naf.wnd, points: r.naf.points.map(i) },
      doubles: r.doubles && {
        step: r.doubles.step,
        points: r.doubles.points.map(i),
      },
    };
  }
  return t;
};
W.prototype.toJ = function () {
  if (this.inf) return this.curve.jpoint(null, null, null);
  var e = this.curve.jpoint(this.x, this.y, this.curve.one);
  return e;
};
function $(n, e, t, r) {
  Xe.BasePoint.call(this, n, "jacobian"),
    e === null && t === null && r === null
      ? ((this.x = this.curve.one),
        (this.y = this.curve.one),
        (this.z = new T(0)))
      : ((this.x = new T(e, 16)),
        (this.y = new T(t, 16)),
        (this.z = new T(r, 16))),
    this.x.red || (this.x = this.x.toRed(this.curve.red)),
    this.y.red || (this.y = this.y.toRed(this.curve.red)),
    this.z.red || (this.z = this.z.toRed(this.curve.red)),
    (this.zOne = this.z === this.curve.one);
}
Nn($, Xe.BasePoint);
ve.prototype.jpoint = function (e, t, r) {
  return new $(this, e, t, r);
};
$.prototype.toP = function () {
  if (this.isInfinity()) return this.curve.point(null, null);
  var e = this.z.redInvm(),
    t = e.redSqr(),
    r = this.x.redMul(t),
    i = this.y.redMul(t).redMul(e);
  return this.curve.point(r, i);
};
$.prototype.neg = function () {
  return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
};
$.prototype.add = function (e) {
  if (this.isInfinity()) return e;
  if (e.isInfinity()) return this;
  var t = e.z.redSqr(),
    r = this.z.redSqr(),
    i = this.x.redMul(t),
    s = e.x.redMul(r),
    o = this.y.redMul(t.redMul(e.z)),
    a = e.y.redMul(r.redMul(this.z)),
    u = i.redSub(s),
    c = o.redSub(a);
  if (u.cmpn(0) === 0)
    return c.cmpn(0) !== 0 ? this.curve.jpoint(null, null, null) : this.dbl();
  var l = u.redSqr(),
    h = l.redMul(u),
    d = i.redMul(l),
    p = c.redSqr().redIAdd(h).redISub(d).redISub(d),
    v = c.redMul(d.redISub(p)).redISub(o.redMul(h)),
    A = this.z.redMul(e.z).redMul(u);
  return this.curve.jpoint(p, v, A);
};
$.prototype.mixedAdd = function (e) {
  if (this.isInfinity()) return e.toJ();
  if (e.isInfinity()) return this;
  var t = this.z.redSqr(),
    r = this.x,
    i = e.x.redMul(t),
    s = this.y,
    o = e.y.redMul(t).redMul(this.z),
    a = r.redSub(i),
    u = s.redSub(o);
  if (a.cmpn(0) === 0)
    return u.cmpn(0) !== 0 ? this.curve.jpoint(null, null, null) : this.dbl();
  var c = a.redSqr(),
    l = c.redMul(a),
    h = r.redMul(c),
    d = u.redSqr().redIAdd(l).redISub(h).redISub(h),
    p = u.redMul(h.redISub(d)).redISub(s.redMul(l)),
    v = this.z.redMul(a);
  return this.curve.jpoint(d, p, v);
};
$.prototype.dblp = function (e) {
  if (e === 0) return this;
  if (this.isInfinity()) return this;
  if (!e) return this.dbl();
  var t;
  if (this.curve.zeroA || this.curve.threeA) {
    var r = this;
    for (t = 0; t < e; t++) r = r.dbl();
    return r;
  }
  var i = this.curve.a,
    s = this.curve.tinv,
    o = this.x,
    a = this.y,
    u = this.z,
    c = u.redSqr().redSqr(),
    l = a.redAdd(a);
  for (t = 0; t < e; t++) {
    var h = o.redSqr(),
      d = l.redSqr(),
      p = d.redSqr(),
      v = h.redAdd(h).redIAdd(h).redIAdd(i.redMul(c)),
      A = o.redMul(d),
      k = v.redSqr().redISub(A.redAdd(A)),
      y = A.redISub(k),
      E = v.redMul(y);
    E = E.redIAdd(E).redISub(p);
    var O = l.redMul(u);
    t + 1 < e && (c = c.redMul(p)), (o = k), (u = O), (l = E);
  }
  return this.curve.jpoint(o, l.redMul(s), u);
};
$.prototype.dbl = function () {
  return this.isInfinity()
    ? this
    : this.curve.zeroA
      ? this._zeroDbl()
      : this.curve.threeA
        ? this._threeDbl()
        : this._dbl();
};
$.prototype._zeroDbl = function () {
  var e, t, r;
  if (this.zOne) {
    var i = this.x.redSqr(),
      s = this.y.redSqr(),
      o = s.redSqr(),
      a = this.x.redAdd(s).redSqr().redISub(i).redISub(o);
    a = a.redIAdd(a);
    var u = i.redAdd(i).redIAdd(i),
      c = u.redSqr().redISub(a).redISub(a),
      l = o.redIAdd(o);
    (l = l.redIAdd(l)),
      (l = l.redIAdd(l)),
      (e = c),
      (t = u.redMul(a.redISub(c)).redISub(l)),
      (r = this.y.redAdd(this.y));
  } else {
    var h = this.x.redSqr(),
      d = this.y.redSqr(),
      p = d.redSqr(),
      v = this.x.redAdd(d).redSqr().redISub(h).redISub(p);
    v = v.redIAdd(v);
    var A = h.redAdd(h).redIAdd(h),
      k = A.redSqr(),
      y = p.redIAdd(p);
    (y = y.redIAdd(y)),
      (y = y.redIAdd(y)),
      (e = k.redISub(v).redISub(v)),
      (t = A.redMul(v.redISub(e)).redISub(y)),
      (r = this.y.redMul(this.z)),
      (r = r.redIAdd(r));
  }
  return this.curve.jpoint(e, t, r);
};
$.prototype._threeDbl = function () {
  var e, t, r;
  if (this.zOne) {
    var i = this.x.redSqr(),
      s = this.y.redSqr(),
      o = s.redSqr(),
      a = this.x.redAdd(s).redSqr().redISub(i).redISub(o);
    a = a.redIAdd(a);
    var u = i.redAdd(i).redIAdd(i).redIAdd(this.curve.a),
      c = u.redSqr().redISub(a).redISub(a);
    e = c;
    var l = o.redIAdd(o);
    (l = l.redIAdd(l)),
      (l = l.redIAdd(l)),
      (t = u.redMul(a.redISub(c)).redISub(l)),
      (r = this.y.redAdd(this.y));
  } else {
    var h = this.z.redSqr(),
      d = this.y.redSqr(),
      p = this.x.redMul(d),
      v = this.x.redSub(h).redMul(this.x.redAdd(h));
    v = v.redAdd(v).redIAdd(v);
    var A = p.redIAdd(p);
    A = A.redIAdd(A);
    var k = A.redAdd(A);
    (e = v.redSqr().redISub(k)),
      (r = this.y.redAdd(this.z).redSqr().redISub(d).redISub(h));
    var y = d.redSqr();
    (y = y.redIAdd(y)),
      (y = y.redIAdd(y)),
      (y = y.redIAdd(y)),
      (t = v.redMul(A.redISub(e)).redISub(y));
  }
  return this.curve.jpoint(e, t, r);
};
$.prototype._dbl = function () {
  var e = this.curve.a,
    t = this.x,
    r = this.y,
    i = this.z,
    s = i.redSqr().redSqr(),
    o = t.redSqr(),
    a = r.redSqr(),
    u = o.redAdd(o).redIAdd(o).redIAdd(e.redMul(s)),
    c = t.redAdd(t);
  c = c.redIAdd(c);
  var l = c.redMul(a),
    h = u.redSqr().redISub(l.redAdd(l)),
    d = l.redISub(h),
    p = a.redSqr();
  (p = p.redIAdd(p)), (p = p.redIAdd(p)), (p = p.redIAdd(p));
  var v = u.redMul(d).redISub(p),
    A = r.redAdd(r).redMul(i);
  return this.curve.jpoint(h, v, A);
};
$.prototype.trpl = function () {
  if (!this.curve.zeroA) return this.dbl().add(this);
  var e = this.x.redSqr(),
    t = this.y.redSqr(),
    r = this.z.redSqr(),
    i = t.redSqr(),
    s = e.redAdd(e).redIAdd(e),
    o = s.redSqr(),
    a = this.x.redAdd(t).redSqr().redISub(e).redISub(i);
  (a = a.redIAdd(a)), (a = a.redAdd(a).redIAdd(a)), (a = a.redISub(o));
  var u = a.redSqr(),
    c = i.redIAdd(i);
  (c = c.redIAdd(c)), (c = c.redIAdd(c)), (c = c.redIAdd(c));
  var l = s.redIAdd(a).redSqr().redISub(o).redISub(u).redISub(c),
    h = t.redMul(l);
  (h = h.redIAdd(h)), (h = h.redIAdd(h));
  var d = this.x.redMul(u).redISub(h);
  (d = d.redIAdd(d)), (d = d.redIAdd(d));
  var p = this.y.redMul(l.redMul(c.redISub(l)).redISub(a.redMul(u)));
  (p = p.redIAdd(p)), (p = p.redIAdd(p)), (p = p.redIAdd(p));
  var v = this.z.redAdd(a).redSqr().redISub(r).redISub(u);
  return this.curve.jpoint(d, p, v);
};
$.prototype.mul = function (e, t) {
  return (e = new T(e, t)), this.curve._wnafMul(this, e);
};
$.prototype.eq = function (e) {
  if (e.type === "affine") return this.eq(e.toJ());
  if (this === e) return !0;
  var t = this.z.redSqr(),
    r = e.z.redSqr();
  if (this.x.redMul(r).redISub(e.x.redMul(t)).cmpn(0) !== 0) return !1;
  var i = t.redMul(this.z),
    s = r.redMul(e.z);
  return this.y.redMul(s).redISub(e.y.redMul(i)).cmpn(0) === 0;
};
$.prototype.eqXToP = function (e) {
  var t = this.z.redSqr(),
    r = e.toRed(this.curve.red).redMul(t);
  if (this.x.cmp(r) === 0) return !0;
  for (var i = e.clone(), s = this.curve.redN.redMul(t); ; ) {
    if ((i.iadd(this.curve.n), i.cmp(this.curve.p) >= 0)) return !1;
    if ((r.redIAdd(s), this.x.cmp(r) === 0)) return !0;
  }
};
$.prototype.inspect = function () {
  return this.isInfinity()
    ? "<EC JPoint Infinity>"
    : "<EC JPoint x: " +
        this.x.toString(16, 2) +
        " y: " +
        this.y.toString(16, 2) +
        " z: " +
        this.z.toString(16, 2) +
        ">";
};
$.prototype.isInfinity = function () {
  return this.z.cmpn(0) === 0;
};
var Rr = ft(function (n, e) {
    var t = e;
    (t.base = Xe), (t.short = cf), (t.mont = null), (t.edwards = null);
  }),
  Tr = ft(function (n, e) {
    var t = e,
      r = he.assert;
    function i(a) {
      a.type === "short"
        ? (this.curve = new Rr.short(a))
        : a.type === "edwards"
          ? (this.curve = new Rr.edwards(a))
          : (this.curve = new Rr.mont(a)),
        (this.g = this.curve.g),
        (this.n = this.curve.n),
        (this.hash = a.hash),
        r(this.g.validate(), "Invalid curve"),
        r(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O");
    }
    t.PresetCurve = i;
    function s(a, u) {
      Object.defineProperty(t, a, {
        configurable: !0,
        enumerable: !0,
        get: function () {
          var c = new i(u);
          return (
            Object.defineProperty(t, a, {
              configurable: !0,
              enumerable: !0,
              value: c,
            }),
            c
          );
        },
      });
    }
    s("p192", {
      type: "short",
      prime: "p192",
      p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
      a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
      b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
      n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
      hash: ke.sha256,
      gRed: !1,
      g: [
        "188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012",
        "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811",
      ],
    }),
      s("p224", {
        type: "short",
        prime: "p224",
        p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
        a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
        b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
        n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
        hash: ke.sha256,
        gRed: !1,
        g: [
          "b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21",
          "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34",
        ],
      }),
      s("p256", {
        type: "short",
        prime: null,
        p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
        a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
        b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
        n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
        hash: ke.sha256,
        gRed: !1,
        g: [
          "6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296",
          "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5",
        ],
      }),
      s("p384", {
        type: "short",
        prime: null,
        p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
        a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
        b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
        n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
        hash: ke.sha384,
        gRed: !1,
        g: [
          "aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7",
          "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f",
        ],
      }),
      s("p521", {
        type: "short",
        prime: null,
        p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
        a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
        b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
        n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
        hash: ke.sha512,
        gRed: !1,
        g: [
          "000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66",
          "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650",
        ],
      }),
      s("curve25519", {
        type: "mont",
        prime: "p25519",
        p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
        a: "76d06",
        b: "1",
        n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
        hash: ke.sha256,
        gRed: !1,
        g: ["9"],
      }),
      s("ed25519", {
        type: "edwards",
        prime: "p25519",
        p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
        a: "-1",
        c: "1",
        d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
        n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
        hash: ke.sha256,
        gRed: !1,
        g: [
          "216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a",
          "6666666666666666666666666666666666666666666666666666666666666658",
        ],
      });
    var o;
    try {
      o = null.crash();
    } catch {
      o = void 0;
    }
    s("secp256k1", {
      type: "short",
      prime: "k256",
      p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
      a: "0",
      b: "7",
      n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
      h: "1",
      hash: ke.sha256,
      beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
      lambda:
        "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
      basis: [
        {
          a: "3086d221a7d46bcde86c90e49284eb15",
          b: "-e4437ed6010e88286f547fa90abfe4c3",
        },
        {
          a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
          b: "3086d221a7d46bcde86c90e49284eb15",
        },
      ],
      gRed: !1,
      g: [
        "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
        "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
        o,
      ],
    });
  });
function Je(n) {
  if (!(this instanceof Je)) return new Je(n);
  (this.hash = n.hash),
    (this.predResist = !!n.predResist),
    (this.outLen = this.hash.outSize),
    (this.minEntropy = n.minEntropy || this.hash.hmacStrength),
    (this._reseed = null),
    (this.reseedInterval = null),
    (this.K = null),
    (this.V = null);
  var e = we.toArray(n.entropy, n.entropyEnc || "hex"),
    t = we.toArray(n.nonce, n.nonceEnc || "hex"),
    r = we.toArray(n.pers, n.persEnc || "hex");
  In(
    e.length >= this.minEntropy / 8,
    "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
  ),
    this._init(e, t, r);
}
var ns = Je;
Je.prototype._init = function (e, t, r) {
  var i = e.concat(t).concat(r);
  (this.K = new Array(this.outLen / 8)), (this.V = new Array(this.outLen / 8));
  for (var s = 0; s < this.V.length; s++) (this.K[s] = 0), (this.V[s] = 1);
  this._update(i), (this._reseed = 1), (this.reseedInterval = 281474976710656);
};
Je.prototype._hmac = function () {
  return new ke.hmac(this.hash, this.K);
};
Je.prototype._update = function (e) {
  var t = this._hmac().update(this.V).update([0]);
  e && (t = t.update(e)),
    (this.K = t.digest()),
    (this.V = this._hmac().update(this.V).digest()),
    e &&
      ((this.K = this._hmac().update(this.V).update([1]).update(e).digest()),
      (this.V = this._hmac().update(this.V).digest()));
};
Je.prototype.reseed = function (e, t, r, i) {
  typeof t != "string" && ((i = r), (r = t), (t = null)),
    (e = we.toArray(e, t)),
    (r = we.toArray(r, i)),
    In(
      e.length >= this.minEntropy / 8,
      "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
    ),
    this._update(e.concat(r || [])),
    (this._reseed = 1);
};
Je.prototype.generate = function (e, t, r, i) {
  if (this._reseed > this.reseedInterval) throw new Error("Reseed is required");
  typeof t != "string" && ((i = r), (r = t), (t = null)),
    r && ((r = we.toArray(r, i || "hex")), this._update(r));
  for (var s = []; s.length < e; )
    (this.V = this._hmac().update(this.V).digest()), (s = s.concat(this.V));
  var o = s.slice(0, e);
  return this._update(r), this._reseed++, we.encode(o, t);
};
var gn = he.assert;
function re(n, e) {
  (this.ec = n),
    (this.priv = null),
    (this.pub = null),
    e.priv && this._importPrivate(e.priv, e.privEnc),
    e.pub && this._importPublic(e.pub, e.pubEnc);
}
var Pn = re;
re.fromPublic = function (e, t, r) {
  return t instanceof re ? t : new re(e, { pub: t, pubEnc: r });
};
re.fromPrivate = function (e, t, r) {
  return t instanceof re ? t : new re(e, { priv: t, privEnc: r });
};
re.prototype.validate = function () {
  var e = this.getPublic();
  return e.isInfinity()
    ? { result: !1, reason: "Invalid public key" }
    : e.validate()
      ? e.mul(this.ec.curve.n).isInfinity()
        ? { result: !0, reason: null }
        : { result: !1, reason: "Public key * N != O" }
      : { result: !1, reason: "Public key is not a point" };
};
re.prototype.getPublic = function (e, t) {
  return (
    typeof e == "string" && ((t = e), (e = null)),
    this.pub || (this.pub = this.ec.g.mul(this.priv)),
    t ? this.pub.encode(t, e) : this.pub
  );
};
re.prototype.getPrivate = function (e) {
  return e === "hex" ? this.priv.toString(16, 2) : this.priv;
};
re.prototype._importPrivate = function (e, t) {
  (this.priv = new T(e, t || 16)),
    (this.priv = this.priv.umod(this.ec.curve.n));
};
re.prototype._importPublic = function (e, t) {
  if (e.x || e.y) {
    this.ec.curve.type === "mont"
      ? gn(e.x, "Need x coordinate")
      : (this.ec.curve.type === "short" || this.ec.curve.type === "edwards") &&
        gn(e.x && e.y, "Need both x and y coordinate"),
      (this.pub = this.ec.curve.point(e.x, e.y));
    return;
  }
  this.pub = this.ec.curve.decodePoint(e, t);
};
re.prototype.derive = function (e) {
  return (
    e.validate() || gn(e.validate(), "public point not validated"),
    e.mul(this.priv).getX()
  );
};
re.prototype.sign = function (e, t, r) {
  return this.ec.sign(e, this, t, r);
};
re.prototype.verify = function (e, t) {
  return this.ec.verify(e, t, this);
};
re.prototype.inspect = function () {
  return (
    "<Key priv: " +
    (this.priv && this.priv.toString(16, 2)) +
    " pub: " +
    (this.pub && this.pub.inspect()) +
    " >"
  );
};
var lf = he.assert;
function Qr(n, e) {
  if (n instanceof Qr) return n;
  this._importDER(n, e) ||
    (lf(n.r && n.s, "Signature without r or s"),
    (this.r = new T(n.r, 16)),
    (this.s = new T(n.s, 16)),
    n.recoveryParam === void 0
      ? (this.recoveryParam = null)
      : (this.recoveryParam = n.recoveryParam));
}
var Yr = Qr;
function hf() {
  this.place = 0;
}
function rn(n, e) {
  var t = n[e.place++];
  if (!(t & 128)) return t;
  var r = t & 15;
  if (r === 0 || r > 4) return !1;
  for (var i = 0, s = 0, o = e.place; s < r; s++, o++)
    (i <<= 8), (i |= n[o]), (i >>>= 0);
  return i <= 127 ? !1 : ((e.place = o), i);
}
function $n(n) {
  for (var e = 0, t = n.length - 1; !n[e] && !(n[e + 1] & 128) && e < t; ) e++;
  return e === 0 ? n : n.slice(e);
}
Qr.prototype._importDER = function (e, t) {
  e = he.toArray(e, t);
  var r = new hf();
  if (e[r.place++] !== 48) return !1;
  var i = rn(e, r);
  if (i === !1 || i + r.place !== e.length || e[r.place++] !== 2) return !1;
  var s = rn(e, r);
  if (s === !1) return !1;
  var o = e.slice(r.place, s + r.place);
  if (((r.place += s), e[r.place++] !== 2)) return !1;
  var a = rn(e, r);
  if (a === !1 || e.length !== a + r.place) return !1;
  var u = e.slice(r.place, a + r.place);
  if (o[0] === 0)
    if (o[1] & 128) o = o.slice(1);
    else return !1;
  if (u[0] === 0)
    if (u[1] & 128) u = u.slice(1);
    else return !1;
  return (
    (this.r = new T(o)), (this.s = new T(u)), (this.recoveryParam = null), !0
  );
};
function nn(n, e) {
  if (e < 128) {
    n.push(e);
    return;
  }
  var t = 1 + ((Math.log(e) / Math.LN2) >>> 3);
  for (n.push(t | 128); --t; ) n.push((e >>> (t << 3)) & 255);
  n.push(e);
}
Qr.prototype.toDER = function (e) {
  var t = this.r.toArray(),
    r = this.s.toArray();
  for (
    t[0] & 128 && (t = [0].concat(t)),
      r[0] & 128 && (r = [0].concat(r)),
      t = $n(t),
      r = $n(r);
    !r[0] && !(r[1] & 128);

  )
    r = r.slice(1);
  var i = [2];
  nn(i, t.length), (i = i.concat(t)), i.push(2), nn(i, r.length);
  var s = i.concat(r),
    o = [48];
  return nn(o, s.length), (o = o.concat(s)), he.encode(o, e);
};
var df = function () {
    throw new Error("unsupported");
  },
  is = he.assert;
function de(n) {
  if (!(this instanceof de)) return new de(n);
  typeof n == "string" &&
    (is(Object.prototype.hasOwnProperty.call(Tr, n), "Unknown curve " + n),
    (n = Tr[n])),
    n instanceof Tr.PresetCurve && (n = { curve: n }),
    (this.curve = n.curve.curve),
    (this.n = this.curve.n),
    (this.nh = this.n.ushrn(1)),
    (this.g = this.curve.g),
    (this.g = n.curve.g),
    this.g.precompute(n.curve.n.bitLength() + 1),
    (this.hash = n.hash || n.curve.hash);
}
var pf = de;
de.prototype.keyPair = function (e) {
  return new Pn(this, e);
};
de.prototype.keyFromPrivate = function (e, t) {
  return Pn.fromPrivate(this, e, t);
};
de.prototype.keyFromPublic = function (e, t) {
  return Pn.fromPublic(this, e, t);
};
de.prototype.genKeyPair = function (e) {
  e || (e = {});
  for (
    var t = new ns({
        hash: this.hash,
        pers: e.pers,
        persEnc: e.persEnc || "utf8",
        entropy: e.entropy || df(this.hash.hmacStrength),
        entropyEnc: (e.entropy && e.entropyEnc) || "utf8",
        nonce: this.n.toArray(),
      }),
      r = this.n.byteLength(),
      i = this.n.sub(new T(2));
    ;

  ) {
    var s = new T(t.generate(r));
    if (!(s.cmp(i) > 0)) return s.iaddn(1), this.keyFromPrivate(s);
  }
};
de.prototype._truncateToN = function (e, t) {
  var r = e.byteLength() * 8 - this.n.bitLength();
  return (
    r > 0 && (e = e.ushrn(r)), !t && e.cmp(this.n) >= 0 ? e.sub(this.n) : e
  );
};
de.prototype.sign = function (e, t, r, i) {
  typeof r == "object" && ((i = r), (r = null)),
    i || (i = {}),
    (t = this.keyFromPrivate(t, r)),
    (e = this._truncateToN(new T(e, 16)));
  for (
    var s = this.n.byteLength(),
      o = t.getPrivate().toArray("be", s),
      a = e.toArray("be", s),
      u = new ns({
        hash: this.hash,
        entropy: o,
        nonce: a,
        pers: i.pers,
        persEnc: i.persEnc || "utf8",
      }),
      c = this.n.sub(new T(1)),
      l = 0;
    ;
    l++
  ) {
    var h = i.k ? i.k(l) : new T(u.generate(this.n.byteLength()));
    if (((h = this._truncateToN(h, !0)), !(h.cmpn(1) <= 0 || h.cmp(c) >= 0))) {
      var d = this.g.mul(h);
      if (!d.isInfinity()) {
        var p = d.getX(),
          v = p.umod(this.n);
        if (v.cmpn(0) !== 0) {
          var A = h.invm(this.n).mul(v.mul(t.getPrivate()).iadd(e));
          if (((A = A.umod(this.n)), A.cmpn(0) !== 0)) {
            var k = (d.getY().isOdd() ? 1 : 0) | (p.cmp(v) !== 0 ? 2 : 0);
            return (
              i.canonical &&
                A.cmp(this.nh) > 0 &&
                ((A = this.n.sub(A)), (k ^= 1)),
              new Yr({ r: v, s: A, recoveryParam: k })
            );
          }
        }
      }
    }
  }
};
de.prototype.verify = function (e, t, r, i) {
  (e = this._truncateToN(new T(e, 16))),
    (r = this.keyFromPublic(r, i)),
    (t = new Yr(t, "hex"));
  var s = t.r,
    o = t.s;
  if (
    s.cmpn(1) < 0 ||
    s.cmp(this.n) >= 0 ||
    o.cmpn(1) < 0 ||
    o.cmp(this.n) >= 0
  )
    return !1;
  var a = o.invm(this.n),
    u = a.mul(e).umod(this.n),
    c = a.mul(s).umod(this.n),
    l;
  return this.curve._maxwellTrick
    ? ((l = this.g.jmulAdd(u, r.getPublic(), c)),
      l.isInfinity() ? !1 : l.eqXToP(s))
    : ((l = this.g.mulAdd(u, r.getPublic(), c)),
      l.isInfinity() ? !1 : l.getX().umod(this.n).cmp(s) === 0);
};
de.prototype.recoverPubKey = function (n, e, t, r) {
  is((3 & t) === t, "The recovery param is more than two bits"),
    (e = new Yr(e, r));
  var i = this.n,
    s = new T(n),
    o = e.r,
    a = e.s,
    u = t & 1,
    c = t >> 1;
  if (o.cmp(this.curve.p.umod(this.curve.n)) >= 0 && c)
    throw new Error("Unable to find sencond key candinate");
  c
    ? (o = this.curve.pointFromX(o.add(this.curve.n), u))
    : (o = this.curve.pointFromX(o, u));
  var l = e.r.invm(i),
    h = i.sub(s).mul(l).umod(i),
    d = a.mul(l).umod(i);
  return this.g.mulAdd(h, o, d);
};
de.prototype.getKeyRecoveryParam = function (n, e, t, r) {
  if (((e = new Yr(e, r)), e.recoveryParam !== null)) return e.recoveryParam;
  for (var i = 0; i < 4; i++) {
    var s;
    try {
      s = this.recoverPubKey(n, e, i);
    } catch {
      continue;
    }
    if (s.eq(t)) return i;
  }
  throw new Error("Unable to find valid recovery factor");
};
var vf = ft(function (n, e) {
    var t = e;
    (t.version = "6.5.4"),
      (t.utils = he),
      (t.rand = function () {
        throw new Error("unsupported");
      }),
      (t.curve = Rr),
      (t.curves = Tr),
      (t.ec = pf),
      (t.eddsa = null);
  }),
  gf = vf.ec;
const Af = "signing-key/5.7.0",
  An = new m(Af);
let sn = null;
function Ne() {
  return sn || (sn = new gf("secp256k1")), sn;
}
class mf {
  constructor(e) {
    U(this, "curve", "secp256k1"),
      U(this, "privateKey", G(e)),
      We(this.privateKey) !== 32 &&
        An.throwArgumentError(
          "invalid private key",
          "privateKey",
          "[[ REDACTED ]]"
        );
    const t = Ne().keyFromPrivate(L(this.privateKey));
    U(this, "publicKey", "0x" + t.getPublic(!1, "hex")),
      U(this, "compressedPublicKey", "0x" + t.getPublic(!0, "hex")),
      U(this, "_isSigningKey", !0);
  }
  _addPoint(e) {
    const t = Ne().keyFromPublic(L(this.publicKey)),
      r = Ne().keyFromPublic(L(e));
    return "0x" + t.pub.add(r.pub).encodeCompressed("hex");
  }
  signDigest(e) {
    const t = Ne().keyFromPrivate(L(this.privateKey)),
      r = L(e);
    r.length !== 32 && An.throwArgumentError("bad digest length", "digest", e);
    const i = t.sign(r, { canonical: !0 });
    return Gr({
      recoveryParam: i.recoveryParam,
      r: Z("0x" + i.r.toString(16), 32),
      s: Z("0x" + i.s.toString(16), 32),
    });
  }
  computeSharedSecret(e) {
    const t = Ne().keyFromPrivate(L(this.privateKey)),
      r = Ne().keyFromPublic(L(ss(e)));
    return Z("0x" + t.derive(r.getPublic()).toString(16), 32);
  }
  static isSigningKey(e) {
    return !!(e && e._isSigningKey);
  }
}
function bf(n, e) {
  const t = Gr(e),
    r = { r: L(t.r), s: L(t.s) };
  return "0x" + Ne().recoverPubKey(L(n), r, t.recoveryParam).encode("hex", !1);
}
function ss(n, e) {
  const t = L(n);
  if (t.length === 32) {
    const r = new mf(t);
    return e ? "0x" + Ne().keyFromPrivate(t).getPublic(!0, "hex") : r.publicKey;
  } else {
    if (t.length === 33)
      return e ? G(t) : "0x" + Ne().keyFromPublic(t).getPublic(!1, "hex");
    if (t.length === 65)
      return e ? "0x" + Ne().keyFromPublic(t).getPublic(!0, "hex") : G(t);
  }
  return An.throwArgumentError(
    "invalid public or private key",
    "key",
    "[REDACTED]"
  );
}
const yf = "transactions/5.7.0",
  Ge = new m(yf);
var ei;
(function (n) {
  (n[(n.legacy = 0)] = "legacy"),
    (n[(n.eip2930 = 1)] = "eip2930"),
    (n[(n.eip1559 = 2)] = "eip1559");
})(ei || (ei = {}));
function Sn(n) {
  return n === "0x" ? null : xe(n);
}
function te(n) {
  return n === "0x" ? Ps : C.from(n);
}
function wf(n) {
  const e = ss(n);
  return xe(ne(X(ne(e, 1)), 12));
}
function os(n, e) {
  return wf(bf(L(n), e));
}
function ce(n, e) {
  const t = tt(C.from(n).toHexString());
  return (
    t.length > 32 &&
      Ge.throwArgumentError("invalid length for " + e, "transaction:" + e, n),
    t
  );
}
function on(n, e) {
  return {
    address: xe(n),
    storageKeys: (e || []).map(
      (t, r) => (
        We(t) !== 32 &&
          Ge.throwArgumentError(
            "invalid access list storageKey",
            `accessList[${n}:${r}]`,
            t
          ),
        t.toLowerCase()
      )
    ),
  };
}
function It(n) {
  if (Array.isArray(n))
    return n.map((t, r) =>
      Array.isArray(t)
        ? (t.length > 2 &&
            Ge.throwArgumentError(
              "access list expected to be [ address, storageKeys[] ]",
              `value[${r}]`,
              t
            ),
          on(t[0], t[1]))
        : on(t.address, t.storageKeys)
    );
  const e = Object.keys(n).map(t => {
    const r = n[t].reduce((i, s) => ((i[s] = !0), i), {});
    return on(t, Object.keys(r).sort());
  });
  return e.sort((t, r) => t.address.localeCompare(r.address)), e;
}
function as(n) {
  return It(n).map(e => [e.address, e.storageKeys]);
}
function xf(n, e) {
  if (n.gasPrice != null) {
    const r = C.from(n.gasPrice),
      i = C.from(n.maxFeePerGas || 0);
    r.eq(i) ||
      Ge.throwArgumentError(
        "mismatch EIP-1559 gasPrice != maxFeePerGas",
        "tx",
        { gasPrice: r, maxFeePerGas: i }
      );
  }
  const t = [
    ce(n.chainId || 0, "chainId"),
    ce(n.nonce || 0, "nonce"),
    ce(n.maxPriorityFeePerGas || 0, "maxPriorityFeePerGas"),
    ce(n.maxFeePerGas || 0, "maxFeePerGas"),
    ce(n.gasLimit || 0, "gasLimit"),
    n.to != null ? xe(n.to) : "0x",
    ce(n.value || 0, "value"),
    n.data || "0x",
    as(n.accessList || []),
  ];
  if (e) {
    const r = Gr(e);
    t.push(ce(r.recoveryParam, "recoveryParam")),
      t.push(tt(r.r)),
      t.push(tt(r.s));
  }
  return le(["0x02", Kr(t)]);
}
function Ef(n, e) {
  const t = [
    ce(n.chainId || 0, "chainId"),
    ce(n.nonce || 0, "nonce"),
    ce(n.gasPrice || 0, "gasPrice"),
    ce(n.gasLimit || 0, "gasLimit"),
    n.to != null ? xe(n.to) : "0x",
    ce(n.value || 0, "value"),
    n.data || "0x",
    as(n.accessList || []),
  ];
  if (e) {
    const r = Gr(e);
    t.push(ce(r.recoveryParam, "recoveryParam")),
      t.push(tt(r.r)),
      t.push(tt(r.s));
  }
  return le(["0x01", Kr(t)]);
}
function fs(n, e, t) {
  try {
    const r = te(e[0]).toNumber();
    if (r !== 0 && r !== 1) throw new Error("bad recid");
    n.v = r;
  } catch {
    Ge.throwArgumentError("invalid v for transaction type: 1", "v", e[0]);
  }
  (n.r = Z(e[1], 32)), (n.s = Z(e[2], 32));
  try {
    const r = X(t(n));
    n.from = os(r, { r: n.r, s: n.s, recoveryParam: n.v });
  } catch {}
}
function _f(n) {
  const e = xn(n.slice(1));
  e.length !== 9 &&
    e.length !== 12 &&
    Ge.throwArgumentError(
      "invalid component count for transaction type: 2",
      "payload",
      G(n)
    );
  const t = te(e[2]),
    r = te(e[3]),
    i = {
      type: 2,
      chainId: te(e[0]).toNumber(),
      nonce: te(e[1]).toNumber(),
      maxPriorityFeePerGas: t,
      maxFeePerGas: r,
      gasPrice: null,
      gasLimit: te(e[4]),
      to: Sn(e[5]),
      value: te(e[6]),
      data: e[7],
      accessList: It(e[8]),
    };
  return e.length === 9 || ((i.hash = X(n)), fs(i, e.slice(9), xf)), i;
}
function kf(n) {
  const e = xn(n.slice(1));
  e.length !== 8 &&
    e.length !== 11 &&
    Ge.throwArgumentError(
      "invalid component count for transaction type: 1",
      "payload",
      G(n)
    );
  const t = {
    type: 1,
    chainId: te(e[0]).toNumber(),
    nonce: te(e[1]).toNumber(),
    gasPrice: te(e[2]),
    gasLimit: te(e[3]),
    to: Sn(e[4]),
    value: te(e[5]),
    data: e[6],
    accessList: It(e[7]),
  };
  return e.length === 8 || ((t.hash = X(n)), fs(t, e.slice(8), Ef)), t;
}
function If(n) {
  const e = xn(n);
  e.length !== 9 &&
    e.length !== 6 &&
    Ge.throwArgumentError("invalid raw transaction", "rawTransaction", n);
  const t = {
    nonce: te(e[0]).toNumber(),
    gasPrice: te(e[1]),
    gasLimit: te(e[2]),
    to: Sn(e[3]),
    value: te(e[4]),
    data: e[5],
    chainId: 0,
  };
  if (e.length === 6) return t;
  try {
    t.v = C.from(e[6]).toNumber();
  } catch {
    return t;
  }
  if (
    ((t.r = Z(e[7], 32)),
    (t.s = Z(e[8], 32)),
    C.from(t.r).isZero() && C.from(t.s).isZero())
  )
    (t.chainId = t.v), (t.v = 0);
  else {
    (t.chainId = Math.floor((t.v - 35) / 2)), t.chainId < 0 && (t.chainId = 0);
    let r = t.v - 27;
    const i = e.slice(0, 6);
    t.chainId !== 0 &&
      (i.push(G(t.chainId)),
      i.push("0x"),
      i.push("0x"),
      (r -= t.chainId * 2 + 8));
    const s = X(Kr(i));
    try {
      t.from = os(s, { r: G(t.r), s: G(t.s), recoveryParam: r });
    } catch {}
    t.hash = X(n);
  }
  return (t.type = null), t;
}
function Nf(n) {
  const e = L(n);
  if (e[0] > 127) return If(e);
  switch (e[0]) {
    case 1:
      return kf(e);
    case 2:
      return _f(e);
  }
  return Ge.throwError(
    `unsupported transaction type: ${e[0]}`,
    m.errors.UNSUPPORTED_OPERATION,
    { operation: "parseTransaction", transactionType: e[0] }
  );
}
const Pf = "networks/5.7.1",
  ti = new m(Pf);
function Sf(n) {
  return n && typeof n.renetwork == "function";
}
function Me(n) {
  const e = function (t, r) {
    r == null && (r = {});
    const i = [];
    if (t.InfuraProvider && r.infura !== "-")
      try {
        i.push(new t.InfuraProvider(n, r.infura));
      } catch {}
    if (t.EtherscanProvider && r.etherscan !== "-")
      try {
        i.push(new t.EtherscanProvider(n, r.etherscan));
      } catch {}
    if (t.AlchemyProvider && r.alchemy !== "-")
      try {
        i.push(new t.AlchemyProvider(n, r.alchemy));
      } catch {}
    if (t.PocketProvider && r.pocket !== "-") {
      const s = ["goerli", "ropsten", "rinkeby", "sepolia"];
      try {
        const o = new t.PocketProvider(n, r.pocket);
        o.network && s.indexOf(o.network.name) === -1 && i.push(o);
      } catch {}
    }
    if (t.CloudflareProvider && r.cloudflare !== "-")
      try {
        i.push(new t.CloudflareProvider(n));
      } catch {}
    if (t.AnkrProvider && r.ankr !== "-")
      try {
        const s = ["ropsten"],
          o = new t.AnkrProvider(n, r.ankr);
        o.network && s.indexOf(o.network.name) === -1 && i.push(o);
      } catch {}
    if (i.length === 0) return null;
    if (t.FallbackProvider) {
      let s = 1;
      return (
        r.quorum != null ? (s = r.quorum) : n === "homestead" && (s = 2),
        new t.FallbackProvider(i, s)
      );
    }
    return i[0];
  };
  return (
    (e.renetwork = function (t) {
      return Me(t);
    }),
    e
  );
}
function Ur(n, e) {
  const t = function (r, i) {
    return r.JsonRpcProvider ? new r.JsonRpcProvider(n, e) : null;
  };
  return (
    (t.renetwork = function (r) {
      return Ur(n, r);
    }),
    t
  );
}
const ri = {
    chainId: 1,
    ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    name: "homestead",
    _defaultProvider: Me("homestead"),
  },
  ni = {
    chainId: 3,
    ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    name: "ropsten",
    _defaultProvider: Me("ropsten"),
  },
  ii = {
    chainId: 63,
    name: "classicMordor",
    _defaultProvider: Ur(
      "https://www.ethercluster.com/mordor",
      "classicMordor"
    ),
  },
  Sr = {
    unspecified: { chainId: 0, name: "unspecified" },
    homestead: ri,
    mainnet: ri,
    morden: { chainId: 2, name: "morden" },
    ropsten: ni,
    testnet: ni,
    rinkeby: {
      chainId: 4,
      ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
      name: "rinkeby",
      _defaultProvider: Me("rinkeby"),
    },
    kovan: { chainId: 42, name: "kovan", _defaultProvider: Me("kovan") },
    goerli: {
      chainId: 5,
      ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
      name: "goerli",
      _defaultProvider: Me("goerli"),
    },
    kintsugi: { chainId: 1337702, name: "kintsugi" },
    sepolia: {
      chainId: 11155111,
      name: "sepolia",
      _defaultProvider: Me("sepolia"),
    },
    classic: {
      chainId: 61,
      name: "classic",
      _defaultProvider: Ur("https://www.ethercluster.com/etc", "classic"),
    },
    classicMorden: { chainId: 62, name: "classicMorden" },
    classicMordor: ii,
    classicTestnet: ii,
    classicKotti: {
      chainId: 6,
      name: "classicKotti",
      _defaultProvider: Ur(
        "https://www.ethercluster.com/kotti",
        "classicKotti"
      ),
    },
    xdai: { chainId: 100, name: "xdai" },
    matic: { chainId: 137, name: "matic", _defaultProvider: Me("matic") },
    maticmum: { chainId: 80001, name: "maticmum" },
    optimism: {
      chainId: 10,
      name: "optimism",
      _defaultProvider: Me("optimism"),
    },
    "optimism-kovan": { chainId: 69, name: "optimism-kovan" },
    "optimism-goerli": { chainId: 420, name: "optimism-goerli" },
    arbitrum: { chainId: 42161, name: "arbitrum" },
    "arbitrum-rinkeby": { chainId: 421611, name: "arbitrum-rinkeby" },
    "arbitrum-goerli": { chainId: 421613, name: "arbitrum-goerli" },
    bnb: { chainId: 56, name: "bnb" },
    bnbt: { chainId: 97, name: "bnbt" },
  };
function us(n) {
  if (n == null) return null;
  if (typeof n == "number") {
    for (const r in Sr) {
      const i = Sr[r];
      if (i.chainId === n)
        return {
          name: i.name,
          chainId: i.chainId,
          ensAddress: i.ensAddress || null,
          _defaultProvider: i._defaultProvider || null,
        };
    }
    return { chainId: n, name: "unknown" };
  }
  if (typeof n == "string") {
    const r = Sr[n];
    return r == null
      ? null
      : {
          name: r.name,
          chainId: r.chainId,
          ensAddress: r.ensAddress,
          _defaultProvider: r._defaultProvider || null,
        };
  }
  const e = Sr[n.name];
  if (!e)
    return (
      typeof n.chainId != "number" &&
        ti.throwArgumentError("invalid network chainId", "network", n),
      n
    );
  n.chainId !== 0 &&
    n.chainId !== e.chainId &&
    ti.throwArgumentError("network chainId mismatch", "network", n);
  let t = n._defaultProvider || null;
  return (
    t == null &&
      e._defaultProvider &&
      (Sf(e._defaultProvider)
        ? (t = e._defaultProvider.renetwork(n))
        : (t = e._defaultProvider)),
    {
      name: n.name,
      chainId: e.chainId,
      ensAddress: n.ensAddress || e.ensAddress || null,
      _defaultProvider: t,
    }
  );
}
const Cf = "web/5.7.1";
var Bf = function (n, e, t, r) {
  function i(s) {
    return s instanceof t
      ? s
      : new t(function (o) {
          o(s);
        });
  }
  return new (t || (t = Promise))(function (s, o) {
    function a(l) {
      try {
        c(r.next(l));
      } catch (h) {
        o(h);
      }
    }
    function u(l) {
      try {
        c(r.throw(l));
      } catch (h) {
        o(h);
      }
    }
    function c(l) {
      l.done ? s(l.value) : i(l.value).then(a, u);
    }
    c((r = r.apply(n, e || [])).next());
  });
};
function Rf(n, e) {
  return Bf(this, void 0, void 0, function* () {
    e == null && (e = {});
    const t = {
      method: e.method || "GET",
      headers: e.headers || {},
      body: e.body || void 0,
    };
    if (
      (e.skipFetchSetup !== !0 &&
        ((t.mode = "cors"),
        (t.cache = "no-cache"),
        (t.credentials = "same-origin"),
        (t.redirect = "follow"),
        (t.referrer = "client")),
      e.fetchOptions != null)
    ) {
      const o = e.fetchOptions;
      o.mode && (t.mode = o.mode),
        o.cache && (t.cache = o.cache),
        o.credentials && (t.credentials = o.credentials),
        o.redirect && (t.redirect = o.redirect),
        o.referrer && (t.referrer = o.referrer);
    }
    const r = yield fetch(n, t),
      i = yield r.arrayBuffer(),
      s = {};
    return (
      r.headers.forEach
        ? r.headers.forEach((o, a) => {
            s[a.toLowerCase()] = o;
          })
        : r.headers.keys().forEach(o => {
            s[o.toLowerCase()] = r.headers.get(o);
          }),
      {
        headers: s,
        statusCode: r.status,
        statusMessage: r.statusText,
        body: L(new Uint8Array(i)),
      }
    );
  });
}
var Tf = function (n, e, t, r) {
  function i(s) {
    return s instanceof t
      ? s
      : new t(function (o) {
          o(s);
        });
  }
  return new (t || (t = Promise))(function (s, o) {
    function a(l) {
      try {
        c(r.next(l));
      } catch (h) {
        o(h);
      }
    }
    function u(l) {
      try {
        c(r.throw(l));
      } catch (h) {
        o(h);
      }
    }
    function c(l) {
      l.done ? s(l.value) : i(l.value).then(a, u);
    }
    c((r = r.apply(n, e || [])).next());
  });
};
const ye = new m(Cf);
function si(n) {
  return new Promise(e => {
    setTimeout(e, n);
  });
}
function Ke(n, e) {
  if (n == null) return null;
  if (typeof n == "string") return n;
  if (vi(n)) {
    if (
      e &&
      (e.split("/")[0] === "text" ||
        e.split(";")[0].trim() === "application/json")
    )
      try {
        return Hr(n);
      } catch {}
    return G(n);
  }
  return n;
}
function Of(n) {
  return Le(
    n.replace(/%([0-9a-f][0-9a-f])/gi, (e, t) =>
      String.fromCharCode(parseInt(t, 16))
    )
  );
}
function Ff(n, e, t) {
  const r =
    typeof n == "object" && n.throttleLimit != null ? n.throttleLimit : 12;
  ye.assertArgument(
    r > 0 && r % 1 === 0,
    "invalid connection throttle limit",
    "connection.throttleLimit",
    r
  );
  const i = typeof n == "object" ? n.throttleCallback : null,
    s =
      typeof n == "object" && typeof n.throttleSlotInterval == "number"
        ? n.throttleSlotInterval
        : 100;
  ye.assertArgument(
    s > 0 && s % 1 === 0,
    "invalid connection throttle slot interval",
    "connection.throttleSlotInterval",
    s
  );
  const o = typeof n == "object" ? !!n.errorPassThrough : !1,
    a = {};
  let u = null;
  const c = { method: "GET" };
  let l = !1,
    h = 2 * 60 * 1e3;
  if (typeof n == "string") u = n;
  else if (typeof n == "object") {
    if (
      ((n == null || n.url == null) &&
        ye.throwArgumentError("missing URL", "connection.url", n),
      (u = n.url),
      typeof n.timeout == "number" && n.timeout > 0 && (h = n.timeout),
      n.headers)
    )
      for (const y in n.headers)
        (a[y.toLowerCase()] = { key: y, value: String(n.headers[y]) }),
          ["if-none-match", "if-modified-since"].indexOf(y.toLowerCase()) >=
            0 && (l = !0);
    if (((c.allowGzip = !!n.allowGzip), n.user != null && n.password != null)) {
      u.substring(0, 6) !== "https:" &&
        n.allowInsecureAuthentication !== !0 &&
        ye.throwError(
          "basic authentication requires a secure https url",
          m.errors.INVALID_ARGUMENT,
          { argument: "url", url: u, user: n.user, password: "[REDACTED]" }
        );
      const y = n.user + ":" + n.password;
      a.authorization = { key: "Authorization", value: "Basic " + Ei(Le(y)) };
    }
    n.skipFetchSetup != null && (c.skipFetchSetup = !!n.skipFetchSetup),
      n.fetchOptions != null && (c.fetchOptions = se(n.fetchOptions));
  }
  const d = new RegExp("^data:([^;:]*)?(;base64)?,(.*)$", "i"),
    p = u ? u.match(d) : null;
  if (p)
    try {
      const y = {
        statusCode: 200,
        statusMessage: "OK",
        headers: { "content-type": p[1] || "text/plain" },
        body: p[2] ? xi(p[3]) : Of(p[3]),
      };
      let E = y.body;
      return t && (E = t(y.body, y)), Promise.resolve(E);
    } catch (y) {
      ye.throwError("processing response error", m.errors.SERVER_ERROR, {
        body: Ke(p[1], p[2]),
        error: y,
        requestBody: null,
        requestMethod: "GET",
        url: u,
      });
    }
  e &&
    ((c.method = "POST"),
    (c.body = e),
    a["content-type"] == null &&
      (a["content-type"] = {
        key: "Content-Type",
        value: "application/octet-stream",
      }),
    a["content-length"] == null &&
      (a["content-length"] = {
        key: "Content-Length",
        value: String(e.length),
      }));
  const v = {};
  Object.keys(a).forEach(y => {
    const E = a[y];
    v[E.key] = E.value;
  }),
    (c.headers = v);
  const A = (function () {
      let y = null;
      return {
        promise: new Promise(function (M, S) {
          h &&
            (y = setTimeout(() => {
              y != null &&
                ((y = null),
                S(
                  ye.makeError("timeout", m.errors.TIMEOUT, {
                    requestBody: Ke(c.body, v["content-type"]),
                    requestMethod: c.method,
                    timeout: h,
                    url: u,
                  })
                ));
            }, h));
        }),
        cancel: function () {
          y != null && (clearTimeout(y), (y = null));
        },
      };
    })(),
    k = (function () {
      return Tf(this, void 0, void 0, function* () {
        for (let y = 0; y < r; y++) {
          let E = null;
          try {
            if (((E = yield Rf(u, c)), y < r)) {
              if (E.statusCode === 301 || E.statusCode === 302) {
                const M = E.headers.location || "";
                if (c.method === "GET" && M.match(/^https:/)) {
                  u = E.headers.location;
                  continue;
                }
              } else if (E.statusCode === 429) {
                let M = !0;
                if ((i && (M = yield i(y, u)), M)) {
                  let S = 0;
                  const q = E.headers["retry-after"];
                  typeof q == "string" && q.match(/^[1-9][0-9]*$/)
                    ? (S = parseInt(q) * 1e3)
                    : (S =
                        s * parseInt(String(Math.random() * Math.pow(2, y)))),
                    yield si(S);
                  continue;
                }
              }
            }
          } catch (M) {
            (E = M.response),
              E == null &&
                (A.cancel(),
                ye.throwError("missing response", m.errors.SERVER_ERROR, {
                  requestBody: Ke(c.body, v["content-type"]),
                  requestMethod: c.method,
                  serverError: M,
                  url: u,
                }));
          }
          let O = E.body;
          if (
            (l && E.statusCode === 304
              ? (O = null)
              : !o &&
                (E.statusCode < 200 || E.statusCode >= 300) &&
                (A.cancel(),
                ye.throwError("bad response", m.errors.SERVER_ERROR, {
                  status: E.statusCode,
                  headers: E.headers,
                  body: Ke(O, E.headers ? E.headers["content-type"] : null),
                  requestBody: Ke(c.body, v["content-type"]),
                  requestMethod: c.method,
                  url: u,
                })),
            t)
          )
            try {
              const M = yield t(O, E);
              return A.cancel(), M;
            } catch (M) {
              if (M.throttleRetry && y < r) {
                let S = !0;
                if ((i && (S = yield i(y, u)), S)) {
                  const q =
                    s * parseInt(String(Math.random() * Math.pow(2, y)));
                  yield si(q);
                  continue;
                }
              }
              A.cancel(),
                ye.throwError(
                  "processing response error",
                  m.errors.SERVER_ERROR,
                  {
                    body: Ke(O, E.headers ? E.headers["content-type"] : null),
                    error: M,
                    requestBody: Ke(c.body, v["content-type"]),
                    requestMethod: c.method,
                    url: u,
                  }
                );
            }
          return A.cancel(), O;
        }
        return ye.throwError("failed response", m.errors.SERVER_ERROR, {
          requestBody: Ke(c.body, v["content-type"]),
          requestMethod: c.method,
          url: u,
        });
      });
    })();
  return Promise.race([A.promise, k]);
}
function Et(n, e, t) {
  let r = (s, o) => {
      let a = null;
      if (s != null)
        try {
          a = JSON.parse(Hr(s));
        } catch (u) {
          ye.throwError("invalid JSON", m.errors.SERVER_ERROR, {
            body: s,
            error: u,
          });
        }
      return t && (a = t(a, o)), a;
    },
    i = null;
  if (e != null) {
    i = Le(e);
    const s = typeof n == "string" ? { url: n } : se(n);
    s.headers
      ? Object.keys(s.headers).filter(a => a.toLowerCase() === "content-type")
          .length !== 0 ||
        ((s.headers = se(s.headers)),
        (s.headers["content-type"] = "application/json"))
      : (s.headers = { "content-type": "application/json" }),
      (n = s);
  }
  return Ff(n, i, r);
}
function mt(n, e) {
  return (
    e || (e = {}),
    (e = se(e)),
    e.floor == null && (e.floor = 0),
    e.ceiling == null && (e.ceiling = 1e4),
    e.interval == null && (e.interval = 250),
    new Promise(function (t, r) {
      let i = null,
        s = !1;
      const o = () => (s ? !1 : ((s = !0), i && clearTimeout(i), !0));
      e.timeout &&
        (i = setTimeout(() => {
          o() && r(new Error("timeout"));
        }, e.timeout));
      const a = e.retryLimit;
      let u = 0;
      function c() {
        return n().then(
          function (l) {
            if (l !== void 0) o() && t(l);
            else if (e.oncePoll) e.oncePoll.once("poll", c);
            else if (e.onceBlock) e.onceBlock.once("block", c);
            else if (!s) {
              if ((u++, u > a)) {
                o() && r(new Error("retry limit reached"));
                return;
              }
              let h =
                e.interval * parseInt(String(Math.random() * Math.pow(2, u)));
              h < e.floor && (h = e.floor),
                h > e.ceiling && (h = e.ceiling),
                setTimeout(c, h);
            }
            return null;
          },
          function (l) {
            o() && r(l);
          }
        );
      }
      c();
    })
  );
}
var qr = "qpzry9x8gf2tvdw0s3jn54khce6mua7l",
  mn = {};
for (var Cr = 0; Cr < qr.length; Cr++) {
  var an = qr.charAt(Cr);
  if (mn[an] !== void 0) throw new TypeError(an + " is ambiguous");
  mn[an] = Cr;
}
function et(n) {
  var e = n >> 25;
  return (
    ((n & 33554431) << 5) ^
    (-((e >> 0) & 1) & 996825010) ^
    (-((e >> 1) & 1) & 642813549) ^
    (-((e >> 2) & 1) & 513874426) ^
    (-((e >> 3) & 1) & 1027748829) ^
    (-((e >> 4) & 1) & 705979059)
  );
}
function cs(n) {
  for (var e = 1, t = 0; t < n.length; ++t) {
    var r = n.charCodeAt(t);
    if (r < 33 || r > 126) return "Invalid prefix (" + n + ")";
    e = et(e) ^ (r >> 5);
  }
  for (e = et(e), t = 0; t < n.length; ++t) {
    var i = n.charCodeAt(t);
    e = et(e) ^ (i & 31);
  }
  return e;
}
function Df(n, e, t) {
  if (((t = t || 90), n.length + 7 + e.length > t))
    throw new TypeError("Exceeds length limit");
  n = n.toLowerCase();
  var r = cs(n);
  if (typeof r == "string") throw new Error(r);
  for (var i = n + "1", s = 0; s < e.length; ++s) {
    var o = e[s];
    if (o >> 5) throw new Error("Non 5-bit word");
    (r = et(r) ^ o), (i += qr.charAt(o));
  }
  for (s = 0; s < 6; ++s) r = et(r);
  for (r ^= 1, s = 0; s < 6; ++s) {
    var a = (r >> ((5 - s) * 5)) & 31;
    i += qr.charAt(a);
  }
  return i;
}
function ls(n, e) {
  if (((e = e || 90), n.length < 8)) return n + " too short";
  if (n.length > e) return "Exceeds length limit";
  var t = n.toLowerCase(),
    r = n.toUpperCase();
  if (n !== t && n !== r) return "Mixed-case string " + n;
  n = t;
  var i = n.lastIndexOf("1");
  if (i === -1) return "No separator character for " + n;
  if (i === 0) return "Missing prefix for " + n;
  var s = n.slice(0, i),
    o = n.slice(i + 1);
  if (o.length < 6) return "Data too short";
  var a = cs(s);
  if (typeof a == "string") return a;
  for (var u = [], c = 0; c < o.length; ++c) {
    var l = o.charAt(c),
      h = mn[l];
    if (h === void 0) return "Unknown character " + l;
    (a = et(a) ^ h), !(c + 6 >= o.length) && u.push(h);
  }
  return a !== 1 ? "Invalid checksum for " + n : { prefix: s, words: u };
}
function Mf() {
  var n = ls.apply(null, arguments);
  if (typeof n == "object") return n;
}
function Lf(n) {
  var e = ls.apply(null, arguments);
  if (typeof e == "object") return e;
  throw new Error(e);
}
function jr(n, e, t, r) {
  for (var i = 0, s = 0, o = (1 << t) - 1, a = [], u = 0; u < n.length; ++u)
    for (i = (i << e) | n[u], s += e; s >= t; ) (s -= t), a.push((i >> s) & o);
  if (r) s > 0 && a.push((i << (t - s)) & o);
  else {
    if (s >= e) return "Excess padding";
    if ((i << (t - s)) & o) return "Non-zero padding";
  }
  return a;
}
function Uf(n) {
  var e = jr(n, 8, 5, !0);
  if (Array.isArray(e)) return e;
}
function qf(n) {
  var e = jr(n, 8, 5, !0);
  if (Array.isArray(e)) return e;
  throw new Error(e);
}
function Gf(n) {
  var e = jr(n, 5, 8, !1);
  if (Array.isArray(e)) return e;
}
function Hf(n) {
  var e = jr(n, 5, 8, !1);
  if (Array.isArray(e)) return e;
  throw new Error(e);
}
var zf = {
  decodeUnsafe: Mf,
  decode: Lf,
  encode: Df,
  toWordsUnsafe: Uf,
  toWords: qf,
  fromWordsUnsafe: Gf,
  fromWords: Hf,
};
const oi = yn(zf),
  Cn = "providers/5.7.2",
  pt = new m(Cn);
class x {
  constructor() {
    this.formats = this.getDefaultFormats();
  }
  getDefaultFormats() {
    const e = {},
      t = this.address.bind(this),
      r = this.bigNumber.bind(this),
      i = this.blockTag.bind(this),
      s = this.data.bind(this),
      o = this.hash.bind(this),
      a = this.hex.bind(this),
      u = this.number.bind(this),
      c = this.type.bind(this),
      l = h => this.data(h, !0);
    return (
      (e.transaction = {
        hash: o,
        type: c,
        accessList: x.allowNull(this.accessList.bind(this), null),
        blockHash: x.allowNull(o, null),
        blockNumber: x.allowNull(u, null),
        transactionIndex: x.allowNull(u, null),
        confirmations: x.allowNull(u, null),
        from: t,
        gasPrice: x.allowNull(r),
        maxPriorityFeePerGas: x.allowNull(r),
        maxFeePerGas: x.allowNull(r),
        gasLimit: r,
        to: x.allowNull(t, null),
        value: r,
        nonce: u,
        data: s,
        r: x.allowNull(this.uint256),
        s: x.allowNull(this.uint256),
        v: x.allowNull(u),
        creates: x.allowNull(t, null),
        raw: x.allowNull(s),
      }),
      (e.transactionRequest = {
        from: x.allowNull(t),
        nonce: x.allowNull(u),
        gasLimit: x.allowNull(r),
        gasPrice: x.allowNull(r),
        maxPriorityFeePerGas: x.allowNull(r),
        maxFeePerGas: x.allowNull(r),
        to: x.allowNull(t),
        value: x.allowNull(r),
        data: x.allowNull(l),
        type: x.allowNull(u),
        accessList: x.allowNull(this.accessList.bind(this), null),
      }),
      (e.receiptLog = {
        transactionIndex: u,
        blockNumber: u,
        transactionHash: o,
        address: t,
        topics: x.arrayOf(o),
        data: s,
        logIndex: u,
        blockHash: o,
      }),
      (e.receipt = {
        to: x.allowNull(this.address, null),
        from: x.allowNull(this.address, null),
        contractAddress: x.allowNull(t, null),
        transactionIndex: u,
        root: x.allowNull(a),
        gasUsed: r,
        logsBloom: x.allowNull(s),
        blockHash: o,
        transactionHash: o,
        logs: x.arrayOf(this.receiptLog.bind(this)),
        blockNumber: u,
        confirmations: x.allowNull(u, null),
        cumulativeGasUsed: r,
        effectiveGasPrice: x.allowNull(r),
        status: x.allowNull(u),
        type: c,
      }),
      (e.block = {
        hash: x.allowNull(o),
        parentHash: o,
        number: u,
        timestamp: u,
        nonce: x.allowNull(a),
        difficulty: this.difficulty.bind(this),
        gasLimit: r,
        gasUsed: r,
        miner: x.allowNull(t),
        extraData: s,
        transactions: x.allowNull(x.arrayOf(o)),
        baseFeePerGas: x.allowNull(r),
      }),
      (e.blockWithTransactions = se(e.block)),
      (e.blockWithTransactions.transactions = x.allowNull(
        x.arrayOf(this.transactionResponse.bind(this))
      )),
      (e.filter = {
        fromBlock: x.allowNull(i, void 0),
        toBlock: x.allowNull(i, void 0),
        blockHash: x.allowNull(o, void 0),
        address: x.allowNull(t, void 0),
        topics: x.allowNull(this.topics.bind(this), void 0),
      }),
      (e.filterLog = {
        blockNumber: x.allowNull(u),
        blockHash: x.allowNull(o),
        transactionIndex: u,
        removed: x.allowNull(this.boolean.bind(this)),
        address: t,
        data: x.allowFalsish(s, "0x"),
        topics: x.arrayOf(o),
        transactionHash: o,
        logIndex: u,
      }),
      e
    );
  }
  accessList(e) {
    return It(e || []);
  }
  number(e) {
    return e === "0x" ? 0 : C.from(e).toNumber();
  }
  type(e) {
    return e === "0x" || e == null ? 0 : C.from(e).toNumber();
  }
  bigNumber(e) {
    return C.from(e);
  }
  boolean(e) {
    if (typeof e == "boolean") return e;
    if (typeof e == "string") {
      if (((e = e.toLowerCase()), e === "true")) return !0;
      if (e === "false") return !1;
    }
    throw new Error("invalid boolean - " + e);
  }
  hex(e, t) {
    return typeof e == "string" &&
      (!t && e.substring(0, 2) !== "0x" && (e = "0x" + e), ie(e))
      ? e.toLowerCase()
      : pt.throwArgumentError("invalid hash", "value", e);
  }
  data(e, t) {
    const r = this.hex(e, t);
    if (r.length % 2 !== 0) throw new Error("invalid data; odd-length - " + e);
    return r;
  }
  address(e) {
    return xe(e);
  }
  callAddress(e) {
    if (!ie(e, 32)) return null;
    const t = xe(ne(e, 12));
    return t === Ns ? null : t;
  }
  contractAddress(e) {
    return lo(e);
  }
  blockTag(e) {
    if (e == null) return "latest";
    if (e === "earliest") return "0x0";
    switch (e) {
      case "earliest":
        return "0x0";
      case "latest":
      case "pending":
      case "safe":
      case "finalized":
        return e;
    }
    if (typeof e == "number" || ie(e)) return wn(e);
    throw new Error("invalid blockTag");
  }
  hash(e, t) {
    const r = this.hex(e, t);
    return We(r) !== 32 ? pt.throwArgumentError("invalid hash", "value", e) : r;
  }
  difficulty(e) {
    if (e == null) return null;
    const t = C.from(e);
    try {
      return t.toNumber();
    } catch {}
    return null;
  }
  uint256(e) {
    if (!ie(e)) throw new Error("invalid uint256");
    return Z(e, 32);
  }
  _block(e, t) {
    e.author != null && e.miner == null && (e.miner = e.author);
    const r = e._difficulty != null ? e._difficulty : e.difficulty,
      i = x.check(t, e);
    return (i._difficulty = r == null ? null : C.from(r)), i;
  }
  block(e) {
    return this._block(e, this.formats.block);
  }
  blockWithTransactions(e) {
    return this._block(e, this.formats.blockWithTransactions);
  }
  transactionRequest(e) {
    return x.check(this.formats.transactionRequest, e);
  }
  transactionResponse(e) {
    e.gas != null && e.gasLimit == null && (e.gasLimit = e.gas),
      e.to &&
        C.from(e.to).isZero() &&
        (e.to = "0x0000000000000000000000000000000000000000"),
      e.input != null && e.data == null && (e.data = e.input),
      e.to == null &&
        e.creates == null &&
        (e.creates = this.contractAddress(e)),
      (e.type === 1 || e.type === 2) &&
        e.accessList == null &&
        (e.accessList = []);
    const t = x.check(this.formats.transaction, e);
    if (e.chainId != null) {
      let r = e.chainId;
      ie(r) && (r = C.from(r).toNumber()), (t.chainId = r);
    } else {
      let r = e.networkId;
      r == null && t.v == null && (r = e.chainId),
        ie(r) && (r = C.from(r).toNumber()),
        typeof r != "number" &&
          t.v != null &&
          ((r = (t.v - 35) / 2), r < 0 && (r = 0), (r = parseInt(r))),
        typeof r != "number" && (r = 0),
        (t.chainId = r);
    }
    return (
      t.blockHash &&
        t.blockHash.replace(/0/g, "") === "x" &&
        (t.blockHash = null),
      t
    );
  }
  transaction(e) {
    return Nf(e);
  }
  receiptLog(e) {
    return x.check(this.formats.receiptLog, e);
  }
  receipt(e) {
    const t = x.check(this.formats.receipt, e);
    if (t.root != null)
      if (t.root.length <= 4) {
        const r = C.from(t.root).toNumber();
        r === 0 || r === 1
          ? (t.status != null &&
              t.status !== r &&
              pt.throwArgumentError(
                "alt-root-status/status mismatch",
                "value",
                { root: t.root, status: t.status }
              ),
            (t.status = r),
            delete t.root)
          : pt.throwArgumentError(
              "invalid alt-root-status",
              "value.root",
              t.root
            );
      } else
        t.root.length !== 66 &&
          pt.throwArgumentError("invalid root hash", "value.root", t.root);
    return t.status != null && (t.byzantium = !0), t;
  }
  topics(e) {
    return Array.isArray(e)
      ? e.map(t => this.topics(t))
      : e != null
        ? this.hash(e, !0)
        : null;
  }
  filter(e) {
    return x.check(this.formats.filter, e);
  }
  filterLog(e) {
    return x.check(this.formats.filterLog, e);
  }
  static check(e, t) {
    const r = {};
    for (const i in e)
      try {
        const s = e[i](t[i]);
        s !== void 0 && (r[i] = s);
      } catch (s) {
        throw ((s.checkKey = i), (s.checkValue = t[i]), s);
      }
    return r;
  }
  static allowNull(e, t) {
    return function (r) {
      return r == null ? t : e(r);
    };
  }
  static allowFalsish(e, t) {
    return function (r) {
      return r ? e(r) : t;
    };
  }
  static arrayOf(e) {
    return function (t) {
      if (!Array.isArray(t)) throw new Error("not an array");
      const r = [];
      return (
        t.forEach(function (i) {
          r.push(e(i));
        }),
        r
      );
    };
  }
}
var R = function (n, e, t, r) {
  function i(s) {
    return s instanceof t
      ? s
      : new t(function (o) {
          o(s);
        });
  }
  return new (t || (t = Promise))(function (s, o) {
    function a(l) {
      try {
        c(r.next(l));
      } catch (h) {
        o(h);
      }
    }
    function u(l) {
      try {
        c(r.throw(l));
      } catch (h) {
        o(h);
      }
    }
    function c(l) {
      l.done ? s(l.value) : i(l.value).then(a, u);
    }
    c((r = r.apply(n, e || [])).next());
  });
};
const F = new m(Cn),
  Kf = 10;
function ai(n) {
  return n == null
    ? "null"
    : (We(n) !== 32 && F.throwArgumentError("invalid topic", "topic", n),
      n.toLowerCase());
}
function fi(n) {
  for (n = n.slice(); n.length > 0 && n[n.length - 1] == null; ) n.pop();
  return n
    .map(e => {
      if (Array.isArray(e)) {
        const t = {};
        e.forEach(i => {
          t[ai(i)] = !0;
        });
        const r = Object.keys(t);
        return r.sort(), r.join("|");
      } else return ai(e);
    })
    .join("&");
}
function Jf(n) {
  return n === ""
    ? []
    : n.split(/&/g).map(e => {
        if (e === "") return [];
        const t = e.split("|").map(r => (r === "null" ? null : r));
        return t.length === 1 ? t[0] : t;
      });
}
function Ze(n) {
  if (typeof n == "string") {
    if (((n = n.toLowerCase()), We(n) === 32)) return "tx:" + n;
    if (n.indexOf(":") === -1) return n;
  } else {
    if (Array.isArray(n)) return "filter:*:" + fi(n);
    if (So.isForkEvent(n))
      throw (F.warn("not implemented"), new Error("not implemented"));
    if (n && typeof n == "object")
      return "filter:" + (n.address || "*") + ":" + fi(n.topics || []);
  }
  throw new Error("invalid event - " + n);
}
function vt() {
  return new Date().getTime();
}
function ui(n) {
  return new Promise(e => {
    setTimeout(e, n);
  });
}
const Qf = ["block", "network", "pending", "poll"];
class Yf {
  constructor(e, t, r) {
    U(this, "tag", e),
      U(this, "listener", t),
      U(this, "once", r),
      (this._lastBlockNumber = -2),
      (this._inflight = !1);
  }
  get event() {
    switch (this.type) {
      case "tx":
        return this.hash;
      case "filter":
        return this.filter;
    }
    return this.tag;
  }
  get type() {
    return this.tag.split(":")[0];
  }
  get hash() {
    const e = this.tag.split(":");
    return e[0] !== "tx" ? null : e[1];
  }
  get filter() {
    const e = this.tag.split(":");
    if (e[0] !== "filter") return null;
    const t = e[1],
      r = Jf(e[2]),
      i = {};
    return r.length > 0 && (i.topics = r), t && t !== "*" && (i.address = t), i;
  }
  pollable() {
    return this.tag.indexOf(":") >= 0 || Qf.indexOf(this.tag) >= 0;
  }
}
const jf = {
  0: { symbol: "btc", p2pkh: 0, p2sh: 5, prefix: "bc" },
  2: { symbol: "ltc", p2pkh: 48, p2sh: 50, prefix: "ltc" },
  3: { symbol: "doge", p2pkh: 30, p2sh: 22 },
  60: { symbol: "eth", ilk: "eth" },
  61: { symbol: "etc", ilk: "eth" },
  700: { symbol: "xdai", ilk: "eth" },
};
function fn(n) {
  return Z(C.from(n).toHexString(), 32);
}
function ci(n) {
  return hn.encode(je([n, ne(Zn(Zn(n)), 0, 4)]));
}
const hs = new RegExp("^(ipfs)://(.*)$", "i"),
  li = [
    new RegExp("^(https)://(.*)$", "i"),
    new RegExp("^(data):(.*)$", "i"),
    hs,
    new RegExp("^eip155:[0-9]+/(erc[0-9]+):(.*)$", "i"),
  ];
function Or(n, e) {
  try {
    return Hr(_t(n, e));
  } catch {}
  return null;
}
function _t(n, e) {
  if (n === "0x") return null;
  const t = C.from(ne(n, e, e + 32)).toNumber(),
    r = C.from(ne(n, t, t + 32)).toNumber();
  return ne(n, t + 32, t + 32 + r);
}
function un(n) {
  return (
    n.match(/^ipfs:\/\/ipfs\//i)
      ? (n = n.substring(12))
      : n.match(/^ipfs:\/\//i)
        ? (n = n.substring(7))
        : F.throwArgumentError("unsupported IPFS format", "link", n),
    `https://gateway.ipfs.io/ipfs/${n}`
  );
}
function hi(n) {
  const e = L(n);
  if (e.length > 32) throw new Error("internal; should not happen");
  const t = new Uint8Array(32);
  return t.set(e, 32 - e.length), t;
}
function Wf(n) {
  if (n.length % 32 === 0) return n;
  const e = new Uint8Array(Math.ceil(n.length / 32) * 32);
  return e.set(n), e;
}
function ds(n) {
  const e = [];
  let t = 0;
  for (let r = 0; r < n.length; r++) e.push(null), (t += 32);
  for (let r = 0; r < n.length; r++) {
    const i = L(n[r]);
    (e[r] = hi(t)),
      e.push(hi(i.length)),
      e.push(Wf(i)),
      (t += 32 + Math.ceil(i.length / 32) * 32);
  }
  return le(e);
}
class di {
  constructor(e, t, r, i) {
    U(this, "provider", e),
      U(this, "name", r),
      U(this, "address", e.formatter.address(t)),
      U(this, "_resolvedAddress", i);
  }
  supportsWildcard() {
    return (
      this._supportsEip2544 ||
        (this._supportsEip2544 = this.provider
          .call({
            to: this.address,
            data: "0x01ffc9a79061b92300000000000000000000000000000000000000000000000000000000",
          })
          .then(e => C.from(e).eq(1))
          .catch(e => {
            if (e.code === m.errors.CALL_EXCEPTION) return !1;
            throw ((this._supportsEip2544 = null), e);
          })),
      this._supportsEip2544
    );
  }
  _fetch(e, t) {
    return R(this, void 0, void 0, function* () {
      const r = {
        to: this.address,
        ccipReadEnabled: !0,
        data: le([e, Br(this.name), t || "0x"]),
      };
      let i = !1;
      (yield this.supportsWildcard()) &&
        ((i = !0), (r.data = le(["0x9061b923", ds([so(this.name), r.data])])));
      try {
        let s = yield this.provider.call(r);
        return (
          L(s).length % 32 === 4 &&
            F.throwError("resolver threw error", m.errors.CALL_EXCEPTION, {
              transaction: r,
              data: s,
            }),
          i && (s = _t(s, 0)),
          s
        );
      } catch (s) {
        if (s.code === m.errors.CALL_EXCEPTION) return null;
        throw s;
      }
    });
  }
  _fetchBytes(e, t) {
    return R(this, void 0, void 0, function* () {
      const r = yield this._fetch(e, t);
      return r != null ? _t(r, 0) : null;
    });
  }
  _getAddress(e, t) {
    const r = jf[String(e)];
    if (
      (r == null &&
        F.throwError(
          `unsupported coin type: ${e}`,
          m.errors.UNSUPPORTED_OPERATION,
          { operation: `getAddress(${e})` }
        ),
      r.ilk === "eth")
    )
      return this.provider.formatter.address(t);
    const i = L(t);
    if (r.p2pkh != null) {
      const s = t.match(/^0x76a9([0-9a-f][0-9a-f])([0-9a-f]*)88ac$/);
      if (s) {
        const o = parseInt(s[1], 16);
        if (s[2].length === o * 2 && o >= 1 && o <= 75)
          return ci(je([[r.p2pkh], "0x" + s[2]]));
      }
    }
    if (r.p2sh != null) {
      const s = t.match(/^0xa9([0-9a-f][0-9a-f])([0-9a-f]*)87$/);
      if (s) {
        const o = parseInt(s[1], 16);
        if (s[2].length === o * 2 && o >= 1 && o <= 75)
          return ci(je([[r.p2sh], "0x" + s[2]]));
      }
    }
    if (r.prefix != null) {
      const s = i[1];
      let o = i[0];
      if (
        (o === 0 ? s !== 20 && s !== 32 && (o = -1) : (o = -1),
        o >= 0 && i.length === 2 + s && s >= 1 && s <= 75)
      ) {
        const a = oi.toWords(i.slice(2));
        return a.unshift(o), oi.encode(r.prefix, a);
      }
    }
    return null;
  }
  getAddress(e) {
    return R(this, void 0, void 0, function* () {
      if ((e == null && (e = 60), e === 60))
        try {
          const i = yield this._fetch("0x3b3b57de");
          return i === "0x" || i === Ss
            ? null
            : this.provider.formatter.callAddress(i);
        } catch (i) {
          if (i.code === m.errors.CALL_EXCEPTION) return null;
          throw i;
        }
      const t = yield this._fetchBytes("0xf1cb7e06", fn(e));
      if (t == null || t === "0x") return null;
      const r = this._getAddress(e, t);
      return (
        r == null &&
          F.throwError(
            "invalid or unsupported coin data",
            m.errors.UNSUPPORTED_OPERATION,
            { operation: `getAddress(${e})`, coinType: e, data: t }
          ),
        r
      );
    });
  }
  getAvatar() {
    return R(this, void 0, void 0, function* () {
      const e = [{ type: "name", content: this.name }];
      try {
        const t = yield this.getText("avatar");
        if (t == null) return null;
        for (let r = 0; r < li.length; r++) {
          const i = t.match(li[r]);
          if (i == null) continue;
          const s = i[1].toLowerCase();
          switch (s) {
            case "https":
              return (
                e.push({ type: "url", content: t }), { linkage: e, url: t }
              );
            case "data":
              return (
                e.push({ type: "data", content: t }), { linkage: e, url: t }
              );
            case "ipfs":
              return (
                e.push({ type: "ipfs", content: t }), { linkage: e, url: un(t) }
              );
            case "erc721":
            case "erc1155": {
              const o = s === "erc721" ? "0xc87b56dd" : "0x0e89341c";
              e.push({ type: s, content: t });
              const a = this._resolvedAddress || (yield this.getAddress()),
                u = (i[2] || "").split("/");
              if (u.length !== 2) return null;
              const c = yield this.provider.formatter.address(u[0]),
                l = Z(C.from(u[1]).toHexString(), 32);
              if (s === "erc721") {
                const A = this.provider.formatter.callAddress(
                  yield this.provider.call({
                    to: c,
                    data: le(["0x6352211e", l]),
                  })
                );
                if (a !== A) return null;
                e.push({ type: "owner", content: A });
              } else if (s === "erc1155") {
                const A = C.from(
                  yield this.provider.call({
                    to: c,
                    data: le(["0x00fdd58e", Z(a, 32), l]),
                  })
                );
                if (A.isZero()) return null;
                e.push({ type: "balance", content: A.toString() });
              }
              const h = {
                to: this.provider.formatter.address(u[0]),
                data: le([o, l]),
              };
              let d = Or(yield this.provider.call(h), 0);
              if (d == null) return null;
              e.push({ type: "metadata-url-base", content: d }),
                s === "erc1155" &&
                  ((d = d.replace("{id}", l.substring(2))),
                  e.push({ type: "metadata-url-expanded", content: d })),
                d.match(/^ipfs:/i) && (d = un(d)),
                e.push({ type: "metadata-url", content: d });
              const p = yield Et(d);
              if (!p) return null;
              e.push({ type: "metadata", content: JSON.stringify(p) });
              let v = p.image;
              if (typeof v != "string") return null;
              if (!v.match(/^(https:\/\/|data:)/i)) {
                if (v.match(hs) == null) return null;
                e.push({ type: "url-ipfs", content: v }), (v = un(v));
              }
              return (
                e.push({ type: "url", content: v }), { linkage: e, url: v }
              );
            }
          }
        }
      } catch {}
      return null;
    });
  }
  getContentHash() {
    return R(this, void 0, void 0, function* () {
      const e = yield this._fetchBytes("0xbc1c58d1");
      if (e == null || e === "0x") return null;
      const t = e.match(
        /^0xe3010170(([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f]*))$/
      );
      if (t) {
        const o = parseInt(t[3], 16);
        if (t[4].length === o * 2) return "ipfs://" + hn.encode("0x" + t[1]);
      }
      const r = e.match(
        /^0xe5010172(([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f]*))$/
      );
      if (r) {
        const o = parseInt(r[3], 16);
        if (r[4].length === o * 2) return "ipns://" + hn.encode("0x" + r[1]);
      }
      const i = e.match(/^0xe40101fa011b20([0-9a-f]*)$/);
      if (i && i[1].length === 32 * 2) return "bzz://" + i[1];
      const s = e.match(/^0x90b2c605([0-9a-f]*)$/);
      if (s && s[1].length === 34 * 2) {
        const o = { "=": "", "+": "-", "/": "_" };
        return "sia://" + Ei("0x" + s[1]).replace(/[=+\/]/g, u => o[u]);
      }
      return F.throwError(
        "invalid or unsupported content hash data",
        m.errors.UNSUPPORTED_OPERATION,
        { operation: "getContentHash()", data: e }
      );
    });
  }
  getText(e) {
    return R(this, void 0, void 0, function* () {
      let t = Le(e);
      (t = je([fn(64), fn(t.length), t])),
        t.length % 32 !== 0 && (t = je([t, Z("0x", 32 - (e.length % 32))]));
      const r = yield this._fetchBytes("0x59d1d43c", G(t));
      return r == null || r === "0x" ? null : Hr(r);
    });
  }
}
let cn = null,
  Vf = 1;
class Xf extends _n {
  constructor(e) {
    if (
      (super(),
      (this._events = []),
      (this._emitted = { block: -2 }),
      (this.disableCcipRead = !1),
      (this.formatter = new.target.getFormatter()),
      U(this, "anyNetwork", e === "any"),
      this.anyNetwork && (e = this.detectNetwork()),
      e instanceof Promise)
    )
      (this._networkPromise = e),
        e.catch(t => {}),
        this._ready().catch(t => {});
    else {
      const t = At(new.target, "getNetwork")(e);
      t
        ? (U(this, "_network", t), this.emit("network", t, null))
        : F.throwArgumentError("invalid network", "network", e);
    }
    (this._maxInternalBlockNumber = -1024),
      (this._lastBlockNumber = -2),
      (this._maxFilterBlockRange = 10),
      (this._pollingInterval = 4e3),
      (this._fastQueryDate = 0);
  }
  _ready() {
    return R(this, void 0, void 0, function* () {
      if (this._network == null) {
        let e = null;
        if (this._networkPromise)
          try {
            e = yield this._networkPromise;
          } catch {}
        e == null && (e = yield this.detectNetwork()),
          e || F.throwError("no network detected", m.errors.UNKNOWN_ERROR, {}),
          this._network == null &&
            (this.anyNetwork ? (this._network = e) : U(this, "_network", e),
            this.emit("network", e, null));
      }
      return this._network;
    });
  }
  get ready() {
    return mt(() =>
      this._ready().then(
        e => e,
        e => {
          if (!(e.code === m.errors.NETWORK_ERROR && e.event === "noNetwork"))
            throw e;
        }
      )
    );
  }
  static getFormatter() {
    return cn == null && (cn = new x()), cn;
  }
  static getNetwork(e) {
    return us(e ?? "homestead");
  }
  ccipReadFetch(e, t, r) {
    return R(this, void 0, void 0, function* () {
      if (this.disableCcipRead || r.length === 0) return null;
      const i = e.to.toLowerCase(),
        s = t.toLowerCase(),
        o = [];
      for (let a = 0; a < r.length; a++) {
        const u = r[a],
          c = u.replace("{sender}", i).replace("{data}", s),
          l =
            u.indexOf("{data}") >= 0
              ? null
              : JSON.stringify({ data: s, sender: i }),
          h = yield Et(
            { url: c, errorPassThrough: !0 },
            l,
            (p, v) => ((p.status = v.statusCode), p)
          );
        if (h.data) return h.data;
        const d = h.message || "unknown error";
        if (h.status >= 400 && h.status < 500)
          return F.throwError(
            `response not found during CCIP fetch: ${d}`,
            m.errors.SERVER_ERROR,
            { url: u, errorMessage: d }
          );
        o.push(d);
      }
      return F.throwError(
        `error encountered during CCIP fetch: ${o.map(a => JSON.stringify(a)).join(", ")}`,
        m.errors.SERVER_ERROR,
        { urls: r, errorMessages: o }
      );
    });
  }
  _getInternalBlockNumber(e) {
    return R(this, void 0, void 0, function* () {
      if ((yield this._ready(), e > 0))
        for (; this._internalBlockNumber; ) {
          const i = this._internalBlockNumber;
          try {
            const s = yield i;
            if (vt() - s.respTime <= e) return s.blockNumber;
            break;
          } catch {
            if (this._internalBlockNumber === i) break;
          }
        }
      const t = vt(),
        r = V({
          blockNumber: this.perform("getBlockNumber", {}),
          networkError: this.getNetwork().then(
            i => null,
            i => i
          ),
        }).then(({ blockNumber: i, networkError: s }) => {
          if (s)
            throw (
              (this._internalBlockNumber === r &&
                (this._internalBlockNumber = null),
              s)
            );
          const o = vt();
          return (
            (i = C.from(i).toNumber()),
            i < this._maxInternalBlockNumber &&
              (i = this._maxInternalBlockNumber),
            (this._maxInternalBlockNumber = i),
            this._setFastBlockNumber(i),
            { blockNumber: i, reqTime: t, respTime: o }
          );
        });
      return (
        (this._internalBlockNumber = r),
        r.catch(i => {
          this._internalBlockNumber === r && (this._internalBlockNumber = null);
        }),
        (yield r).blockNumber
      );
    });
  }
  poll() {
    return R(this, void 0, void 0, function* () {
      const e = Vf++,
        t = [];
      let r = null;
      try {
        r = yield this._getInternalBlockNumber(100 + this.pollingInterval / 2);
      } catch (i) {
        this.emit("error", i);
        return;
      }
      if (
        (this._setFastBlockNumber(r),
        this.emit("poll", e, r),
        r === this._lastBlockNumber)
      ) {
        this.emit("didPoll", e);
        return;
      }
      if (
        (this._emitted.block === -2 && (this._emitted.block = r - 1),
        Math.abs(this._emitted.block - r) > 1e3)
      )
        F.warn(
          `network block skew detected; skipping block events (emitted=${this._emitted.block} blockNumber${r})`
        ),
          this.emit(
            "error",
            F.makeError("network block skew detected", m.errors.NETWORK_ERROR, {
              blockNumber: r,
              event: "blockSkew",
              previousBlockNumber: this._emitted.block,
            })
          ),
          this.emit("block", r);
      else
        for (let i = this._emitted.block + 1; i <= r; i++)
          this.emit("block", i);
      this._emitted.block !== r &&
        ((this._emitted.block = r),
        Object.keys(this._emitted).forEach(i => {
          if (i === "block") return;
          const s = this._emitted[i];
          s !== "pending" && r - s > 12 && delete this._emitted[i];
        })),
        this._lastBlockNumber === -2 && (this._lastBlockNumber = r - 1),
        this._events.forEach(i => {
          switch (i.type) {
            case "tx": {
              const s = i.hash;
              let o = this.getTransactionReceipt(s)
                .then(
                  a => (
                    !a ||
                      a.blockNumber == null ||
                      ((this._emitted["t:" + s] = a.blockNumber),
                      this.emit(s, a)),
                    null
                  )
                )
                .catch(a => {
                  this.emit("error", a);
                });
              t.push(o);
              break;
            }
            case "filter": {
              if (!i._inflight) {
                (i._inflight = !0),
                  i._lastBlockNumber === -2 && (i._lastBlockNumber = r - 1);
                const s = i.filter;
                (s.fromBlock = i._lastBlockNumber + 1), (s.toBlock = r);
                const o = s.toBlock - this._maxFilterBlockRange;
                o > s.fromBlock && (s.fromBlock = o),
                  s.fromBlock < 0 && (s.fromBlock = 0);
                const a = this.getLogs(s)
                  .then(u => {
                    (i._inflight = !1),
                      u.length !== 0 &&
                        u.forEach(c => {
                          c.blockNumber > i._lastBlockNumber &&
                            (i._lastBlockNumber = c.blockNumber),
                            (this._emitted["b:" + c.blockHash] = c.blockNumber),
                            (this._emitted["t:" + c.transactionHash] =
                              c.blockNumber),
                            this.emit(s, c);
                        });
                  })
                  .catch(u => {
                    this.emit("error", u), (i._inflight = !1);
                  });
                t.push(a);
              }
              break;
            }
          }
        }),
        (this._lastBlockNumber = r),
        Promise.all(t)
          .then(() => {
            this.emit("didPoll", e);
          })
          .catch(i => {
            this.emit("error", i);
          });
    });
  }
  resetEventsBlock(e) {
    (this._lastBlockNumber = e - 1), this.polling && this.poll();
  }
  get network() {
    return this._network;
  }
  detectNetwork() {
    return R(this, void 0, void 0, function* () {
      return F.throwError(
        "provider does not support network detection",
        m.errors.UNSUPPORTED_OPERATION,
        { operation: "provider.detectNetwork" }
      );
    });
  }
  getNetwork() {
    return R(this, void 0, void 0, function* () {
      const e = yield this._ready(),
        t = yield this.detectNetwork();
      if (e.chainId !== t.chainId) {
        if (this.anyNetwork)
          return (
            (this._network = t),
            (this._lastBlockNumber = -2),
            (this._fastBlockNumber = null),
            (this._fastBlockNumberPromise = null),
            (this._fastQueryDate = 0),
            (this._emitted.block = -2),
            (this._maxInternalBlockNumber = -1024),
            (this._internalBlockNumber = null),
            this.emit("network", t, e),
            yield ui(0),
            this._network
          );
        const r = F.makeError(
          "underlying network changed",
          m.errors.NETWORK_ERROR,
          { event: "changed", network: e, detectedNetwork: t }
        );
        throw (this.emit("error", r), r);
      }
      return e;
    });
  }
  get blockNumber() {
    return (
      this._getInternalBlockNumber(100 + this.pollingInterval / 2).then(
        e => {
          this._setFastBlockNumber(e);
        },
        e => {}
      ),
      this._fastBlockNumber != null ? this._fastBlockNumber : -1
    );
  }
  get polling() {
    return this._poller != null;
  }
  set polling(e) {
    e && !this._poller
      ? ((this._poller = setInterval(() => {
          this.poll();
        }, this.pollingInterval)),
        this._bootstrapPoll ||
          (this._bootstrapPoll = setTimeout(() => {
            this.poll(),
              (this._bootstrapPoll = setTimeout(() => {
                this._poller || this.poll(), (this._bootstrapPoll = null);
              }, this.pollingInterval));
          }, 0)))
      : !e &&
        this._poller &&
        (clearInterval(this._poller), (this._poller = null));
  }
  get pollingInterval() {
    return this._pollingInterval;
  }
  set pollingInterval(e) {
    if (typeof e != "number" || e <= 0 || parseInt(String(e)) != e)
      throw new Error("invalid polling interval");
    (this._pollingInterval = e),
      this._poller &&
        (clearInterval(this._poller),
        (this._poller = setInterval(() => {
          this.poll();
        }, this._pollingInterval)));
  }
  _getFastBlockNumber() {
    const e = vt();
    return (
      e - this._fastQueryDate > 2 * this._pollingInterval &&
        ((this._fastQueryDate = e),
        (this._fastBlockNumberPromise = this.getBlockNumber().then(
          t => (
            (this._fastBlockNumber == null || t > this._fastBlockNumber) &&
              (this._fastBlockNumber = t),
            this._fastBlockNumber
          )
        ))),
      this._fastBlockNumberPromise
    );
  }
  _setFastBlockNumber(e) {
    (this._fastBlockNumber != null && e < this._fastBlockNumber) ||
      ((this._fastQueryDate = vt()),
      (this._fastBlockNumber == null || e > this._fastBlockNumber) &&
        ((this._fastBlockNumber = e),
        (this._fastBlockNumberPromise = Promise.resolve(e))));
  }
  waitForTransaction(e, t, r) {
    return R(this, void 0, void 0, function* () {
      return this._waitForTransaction(e, t ?? 1, r || 0, null);
    });
  }
  _waitForTransaction(e, t, r, i) {
    return R(this, void 0, void 0, function* () {
      const s = yield this.getTransactionReceipt(e);
      return (s ? s.confirmations : 0) >= t
        ? s
        : new Promise((o, a) => {
            const u = [];
            let c = !1;
            const l = function () {
                return c
                  ? !0
                  : ((c = !0),
                    u.forEach(d => {
                      d();
                    }),
                    !1);
              },
              h = d => {
                d.confirmations < t || l() || o(d);
              };
            if (
              (this.on(e, h),
              u.push(() => {
                this.removeListener(e, h);
              }),
              i)
            ) {
              let d = i.startBlock,
                p = null;
              const v = A =>
                R(this, void 0, void 0, function* () {
                  c ||
                    (yield ui(1e3),
                    this.getTransactionCount(i.from).then(
                      k =>
                        R(this, void 0, void 0, function* () {
                          if (!c) {
                            if (k <= i.nonce) d = A;
                            else {
                              {
                                const y = yield this.getTransaction(e);
                                if (y && y.blockNumber != null) return;
                              }
                              for (
                                p == null &&
                                ((p = d - 3),
                                p < i.startBlock && (p = i.startBlock));
                                p <= A;

                              ) {
                                if (c) return;
                                const y =
                                  yield this.getBlockWithTransactions(p);
                                for (
                                  let E = 0;
                                  E < y.transactions.length;
                                  E++
                                ) {
                                  const O = y.transactions[E];
                                  if (O.hash === e) return;
                                  if (
                                    O.from === i.from &&
                                    O.nonce === i.nonce
                                  ) {
                                    if (c) return;
                                    const M = yield this.waitForTransaction(
                                      O.hash,
                                      t
                                    );
                                    if (l()) return;
                                    let S = "replaced";
                                    O.data === i.data &&
                                    O.to === i.to &&
                                    O.value.eq(i.value)
                                      ? (S = "repriced")
                                      : O.data === "0x" &&
                                        O.from === O.to &&
                                        O.value.isZero() &&
                                        (S = "cancelled"),
                                      a(
                                        F.makeError(
                                          "transaction was replaced",
                                          m.errors.TRANSACTION_REPLACED,
                                          {
                                            cancelled:
                                              S === "replaced" ||
                                              S === "cancelled",
                                            reason: S,
                                            replacement:
                                              this._wrapTransaction(O),
                                            hash: e,
                                            receipt: M,
                                          }
                                        )
                                      );
                                    return;
                                  }
                                }
                                p++;
                              }
                            }
                            c || this.once("block", v);
                          }
                        }),
                      k => {
                        c || this.once("block", v);
                      }
                    ));
                });
              if (c) return;
              this.once("block", v),
                u.push(() => {
                  this.removeListener("block", v);
                });
            }
            if (typeof r == "number" && r > 0) {
              const d = setTimeout(() => {
                l() ||
                  a(
                    F.makeError("timeout exceeded", m.errors.TIMEOUT, {
                      timeout: r,
                    })
                  );
              }, r);
              d.unref && d.unref(),
                u.push(() => {
                  clearTimeout(d);
                });
            }
          });
    });
  }
  getBlockNumber() {
    return R(this, void 0, void 0, function* () {
      return this._getInternalBlockNumber(0);
    });
  }
  getGasPrice() {
    return R(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const e = yield this.perform("getGasPrice", {});
      try {
        return C.from(e);
      } catch (t) {
        return F.throwError("bad result from backend", m.errors.SERVER_ERROR, {
          method: "getGasPrice",
          result: e,
          error: t,
        });
      }
    });
  }
  getBalance(e, t) {
    return R(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const r = yield V({
          address: this._getAddress(e),
          blockTag: this._getBlockTag(t),
        }),
        i = yield this.perform("getBalance", r);
      try {
        return C.from(i);
      } catch (s) {
        return F.throwError("bad result from backend", m.errors.SERVER_ERROR, {
          method: "getBalance",
          params: r,
          result: i,
          error: s,
        });
      }
    });
  }
  getTransactionCount(e, t) {
    return R(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const r = yield V({
          address: this._getAddress(e),
          blockTag: this._getBlockTag(t),
        }),
        i = yield this.perform("getTransactionCount", r);
      try {
        return C.from(i).toNumber();
      } catch (s) {
        return F.throwError("bad result from backend", m.errors.SERVER_ERROR, {
          method: "getTransactionCount",
          params: r,
          result: i,
          error: s,
        });
      }
    });
  }
  getCode(e, t) {
    return R(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const r = yield V({
          address: this._getAddress(e),
          blockTag: this._getBlockTag(t),
        }),
        i = yield this.perform("getCode", r);
      try {
        return G(i);
      } catch (s) {
        return F.throwError("bad result from backend", m.errors.SERVER_ERROR, {
          method: "getCode",
          params: r,
          result: i,
          error: s,
        });
      }
    });
  }
  getStorageAt(e, t, r) {
    return R(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const i = yield V({
          address: this._getAddress(e),
          blockTag: this._getBlockTag(r),
          position: Promise.resolve(t).then(o => wn(o)),
        }),
        s = yield this.perform("getStorageAt", i);
      try {
        return G(s);
      } catch (o) {
        return F.throwError("bad result from backend", m.errors.SERVER_ERROR, {
          method: "getStorageAt",
          params: i,
          result: s,
          error: o,
        });
      }
    });
  }
  _wrapTransaction(e, t, r) {
    if (t != null && We(t) !== 32)
      throw new Error("invalid response - sendTransaction");
    const i = e;
    return (
      t != null &&
        e.hash !== t &&
        F.throwError(
          "Transaction hash mismatch from Provider.sendTransaction.",
          m.errors.UNKNOWN_ERROR,
          { expectedHash: e.hash, returnedHash: t }
        ),
      (i.wait = (s, o) =>
        R(this, void 0, void 0, function* () {
          s == null && (s = 1), o == null && (o = 0);
          let a;
          s !== 0 &&
            r != null &&
            (a = {
              data: e.data,
              from: e.from,
              nonce: e.nonce,
              to: e.to,
              value: e.value,
              startBlock: r,
            });
          const u = yield this._waitForTransaction(e.hash, s, o, a);
          return u == null && s === 0
            ? null
            : ((this._emitted["t:" + e.hash] = u.blockNumber),
              u.status === 0 &&
                F.throwError("transaction failed", m.errors.CALL_EXCEPTION, {
                  transactionHash: e.hash,
                  transaction: e,
                  receipt: u,
                }),
              u);
        })),
      i
    );
  }
  sendTransaction(e) {
    return R(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const t = yield Promise.resolve(e).then(s => G(s)),
        r = this.formatter.transaction(e);
      r.confirmations == null && (r.confirmations = 0);
      const i = yield this._getInternalBlockNumber(
        100 + 2 * this.pollingInterval
      );
      try {
        const s = yield this.perform("sendTransaction", {
          signedTransaction: t,
        });
        return this._wrapTransaction(r, s, i);
      } catch (s) {
        throw ((s.transaction = r), (s.transactionHash = r.hash), s);
      }
    });
  }
  _getTransactionRequest(e) {
    return R(this, void 0, void 0, function* () {
      const t = yield e,
        r = {};
      return (
        ["from", "to"].forEach(i => {
          t[i] != null &&
            (r[i] = Promise.resolve(t[i]).then(s =>
              s ? this._getAddress(s) : null
            ));
        }),
        [
          "gasLimit",
          "gasPrice",
          "maxFeePerGas",
          "maxPriorityFeePerGas",
          "value",
        ].forEach(i => {
          t[i] != null &&
            (r[i] = Promise.resolve(t[i]).then(s => (s ? C.from(s) : null)));
        }),
        ["type"].forEach(i => {
          t[i] != null && (r[i] = Promise.resolve(t[i]).then(s => s ?? null));
        }),
        t.accessList &&
          (r.accessList = this.formatter.accessList(t.accessList)),
        ["data"].forEach(i => {
          t[i] != null &&
            (r[i] = Promise.resolve(t[i]).then(s => (s ? G(s) : null)));
        }),
        this.formatter.transactionRequest(yield V(r))
      );
    });
  }
  _getFilter(e) {
    return R(this, void 0, void 0, function* () {
      e = yield e;
      const t = {};
      return (
        e.address != null && (t.address = this._getAddress(e.address)),
        ["blockHash", "topics"].forEach(r => {
          e[r] != null && (t[r] = e[r]);
        }),
        ["fromBlock", "toBlock"].forEach(r => {
          e[r] != null && (t[r] = this._getBlockTag(e[r]));
        }),
        this.formatter.filter(yield V(t))
      );
    });
  }
  _call(e, t, r) {
    return R(this, void 0, void 0, function* () {
      r >= Kf &&
        F.throwError(
          "CCIP read exceeded maximum redirections",
          m.errors.SERVER_ERROR,
          { redirects: r, transaction: e }
        );
      const i = e.to,
        s = yield this.perform("call", { transaction: e, blockTag: t });
      if (
        r >= 0 &&
        t === "latest" &&
        i != null &&
        s.substring(0, 10) === "0x556f1830" &&
        We(s) % 32 === 4
      )
        try {
          const o = ne(s, 4),
            a = ne(o, 0, 32);
          C.from(a).eq(i) ||
            F.throwError(
              "CCIP Read sender did not match",
              m.errors.CALL_EXCEPTION,
              {
                name: "OffchainLookup",
                signature:
                  "OffchainLookup(address,string[],bytes,bytes4,bytes)",
                transaction: e,
                data: s,
              }
            );
          const u = [],
            c = C.from(ne(o, 32, 64)).toNumber(),
            l = C.from(ne(o, c, c + 32)).toNumber(),
            h = ne(o, c + 32);
          for (let y = 0; y < l; y++) {
            const E = Or(h, y * 32);
            E == null &&
              F.throwError(
                "CCIP Read contained corrupt URL string",
                m.errors.CALL_EXCEPTION,
                {
                  name: "OffchainLookup",
                  signature:
                    "OffchainLookup(address,string[],bytes,bytes4,bytes)",
                  transaction: e,
                  data: s,
                }
              ),
              u.push(E);
          }
          const d = _t(o, 64);
          C.from(ne(o, 100, 128)).isZero() ||
            F.throwError(
              "CCIP Read callback selector included junk",
              m.errors.CALL_EXCEPTION,
              {
                name: "OffchainLookup",
                signature:
                  "OffchainLookup(address,string[],bytes,bytes4,bytes)",
                transaction: e,
                data: s,
              }
            );
          const p = ne(o, 96, 100),
            v = _t(o, 128),
            A = yield this.ccipReadFetch(e, d, u);
          A == null &&
            F.throwError(
              "CCIP Read disabled or provided no URLs",
              m.errors.CALL_EXCEPTION,
              {
                name: "OffchainLookup",
                signature:
                  "OffchainLookup(address,string[],bytes,bytes4,bytes)",
                transaction: e,
                data: s,
              }
            );
          const k = { to: i, data: le([p, ds([A, v])]) };
          return this._call(k, t, r + 1);
        } catch (o) {
          if (o.code === m.errors.SERVER_ERROR) throw o;
        }
      try {
        return G(s);
      } catch (o) {
        return F.throwError("bad result from backend", m.errors.SERVER_ERROR, {
          method: "call",
          params: { transaction: e, blockTag: t },
          result: s,
          error: o,
        });
      }
    });
  }
  call(e, t) {
    return R(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const r = yield V({
        transaction: this._getTransactionRequest(e),
        blockTag: this._getBlockTag(t),
        ccipReadEnabled: Promise.resolve(e.ccipReadEnabled),
      });
      return this._call(r.transaction, r.blockTag, r.ccipReadEnabled ? 0 : -1);
    });
  }
  estimateGas(e) {
    return R(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const t = yield V({ transaction: this._getTransactionRequest(e) }),
        r = yield this.perform("estimateGas", t);
      try {
        return C.from(r);
      } catch (i) {
        return F.throwError("bad result from backend", m.errors.SERVER_ERROR, {
          method: "estimateGas",
          params: t,
          result: r,
          error: i,
        });
      }
    });
  }
  _getAddress(e) {
    return R(this, void 0, void 0, function* () {
      (e = yield e),
        typeof e != "string" &&
          F.throwArgumentError("invalid address or ENS name", "name", e);
      const t = yield this.resolveName(e);
      return (
        t == null &&
          F.throwError(
            "ENS name not configured",
            m.errors.UNSUPPORTED_OPERATION,
            { operation: `resolveName(${JSON.stringify(e)})` }
          ),
        t
      );
    });
  }
  _getBlock(e, t) {
    return R(this, void 0, void 0, function* () {
      yield this.getNetwork(), (e = yield e);
      let r = -128;
      const i = { includeTransactions: !!t };
      if (ie(e, 32)) i.blockHash = e;
      else
        try {
          (i.blockTag = yield this._getBlockTag(e)),
            ie(i.blockTag) && (r = parseInt(i.blockTag.substring(2), 16));
        } catch {
          F.throwArgumentError(
            "invalid block hash or block tag",
            "blockHashOrBlockTag",
            e
          );
        }
      return mt(
        () =>
          R(this, void 0, void 0, function* () {
            const s = yield this.perform("getBlock", i);
            if (s == null)
              return (i.blockHash != null &&
                this._emitted["b:" + i.blockHash] == null) ||
                (i.blockTag != null && r > this._emitted.block)
                ? null
                : void 0;
            if (t) {
              let o = null;
              for (let u = 0; u < s.transactions.length; u++) {
                const c = s.transactions[u];
                if (c.blockNumber == null) c.confirmations = 0;
                else if (c.confirmations == null) {
                  o == null &&
                    (o = yield this._getInternalBlockNumber(
                      100 + 2 * this.pollingInterval
                    ));
                  let l = o - c.blockNumber + 1;
                  l <= 0 && (l = 1), (c.confirmations = l);
                }
              }
              const a = this.formatter.blockWithTransactions(s);
              return (
                (a.transactions = a.transactions.map(u =>
                  this._wrapTransaction(u)
                )),
                a
              );
            }
            return this.formatter.block(s);
          }),
        { oncePoll: this }
      );
    });
  }
  getBlock(e) {
    return this._getBlock(e, !1);
  }
  getBlockWithTransactions(e) {
    return this._getBlock(e, !0);
  }
  getTransaction(e) {
    return R(this, void 0, void 0, function* () {
      yield this.getNetwork(), (e = yield e);
      const t = { transactionHash: this.formatter.hash(e, !0) };
      return mt(
        () =>
          R(this, void 0, void 0, function* () {
            const r = yield this.perform("getTransaction", t);
            if (r == null)
              return this._emitted["t:" + e] == null ? null : void 0;
            const i = this.formatter.transactionResponse(r);
            if (i.blockNumber == null) i.confirmations = 0;
            else if (i.confirmations == null) {
              let o =
                (yield this._getInternalBlockNumber(
                  100 + 2 * this.pollingInterval
                )) -
                i.blockNumber +
                1;
              o <= 0 && (o = 1), (i.confirmations = o);
            }
            return this._wrapTransaction(i);
          }),
        { oncePoll: this }
      );
    });
  }
  getTransactionReceipt(e) {
    return R(this, void 0, void 0, function* () {
      yield this.getNetwork(), (e = yield e);
      const t = { transactionHash: this.formatter.hash(e, !0) };
      return mt(
        () =>
          R(this, void 0, void 0, function* () {
            const r = yield this.perform("getTransactionReceipt", t);
            if (r == null)
              return this._emitted["t:" + e] == null ? null : void 0;
            if (r.blockHash == null) return;
            const i = this.formatter.receipt(r);
            if (i.blockNumber == null) i.confirmations = 0;
            else if (i.confirmations == null) {
              let o =
                (yield this._getInternalBlockNumber(
                  100 + 2 * this.pollingInterval
                )) -
                i.blockNumber +
                1;
              o <= 0 && (o = 1), (i.confirmations = o);
            }
            return i;
          }),
        { oncePoll: this }
      );
    });
  }
  getLogs(e) {
    return R(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const t = yield V({ filter: this._getFilter(e) }),
        r = yield this.perform("getLogs", t);
      return (
        r.forEach(i => {
          i.removed == null && (i.removed = !1);
        }),
        x.arrayOf(this.formatter.filterLog.bind(this.formatter))(r)
      );
    });
  }
  getEtherPrice() {
    return R(this, void 0, void 0, function* () {
      return yield this.getNetwork(), this.perform("getEtherPrice", {});
    });
  }
  _getBlockTag(e) {
    return R(this, void 0, void 0, function* () {
      if (((e = yield e), typeof e == "number" && e < 0)) {
        e % 1 && F.throwArgumentError("invalid BlockTag", "blockTag", e);
        let t = yield this._getInternalBlockNumber(
          100 + 2 * this.pollingInterval
        );
        return (t += e), t < 0 && (t = 0), this.formatter.blockTag(t);
      }
      return this.formatter.blockTag(e);
    });
  }
  getResolver(e) {
    return R(this, void 0, void 0, function* () {
      let t = e;
      for (;;) {
        if (t === "" || t === "." || (e !== "eth" && t === "eth")) return null;
        const r = yield this._getResolver(t, "getResolver");
        if (r != null) {
          const i = new di(this, r, e);
          return t !== e && !(yield i.supportsWildcard()) ? null : i;
        }
        t = t.split(".").slice(1).join(".");
      }
    });
  }
  _getResolver(e, t) {
    return R(this, void 0, void 0, function* () {
      t == null && (t = "ENS");
      const r = yield this.getNetwork();
      r.ensAddress ||
        F.throwError(
          "network does not support ENS",
          m.errors.UNSUPPORTED_OPERATION,
          { operation: t, network: r.name }
        );
      try {
        const i = yield this.call({
          to: r.ensAddress,
          data: "0x0178b8bf" + Br(e).substring(2),
        });
        return this.formatter.callAddress(i);
      } catch {}
      return null;
    });
  }
  resolveName(e) {
    return R(this, void 0, void 0, function* () {
      e = yield e;
      try {
        return Promise.resolve(this.formatter.address(e));
      } catch (r) {
        if (ie(e)) throw r;
      }
      typeof e != "string" &&
        F.throwArgumentError("invalid ENS name", "name", e);
      const t = yield this.getResolver(e);
      return t ? yield t.getAddress() : null;
    });
  }
  lookupAddress(e) {
    return R(this, void 0, void 0, function* () {
      (e = yield e), (e = this.formatter.address(e));
      const t = e.substring(2).toLowerCase() + ".addr.reverse",
        r = yield this._getResolver(t, "lookupAddress");
      if (r == null) return null;
      const i = Or(
        yield this.call({ to: r, data: "0x691f3431" + Br(t).substring(2) }),
        0
      );
      return (yield this.resolveName(i)) != e ? null : i;
    });
  }
  getAvatar(e) {
    return R(this, void 0, void 0, function* () {
      let t = null;
      if (ie(e)) {
        const s =
            this.formatter.address(e).substring(2).toLowerCase() +
            ".addr.reverse",
          o = yield this._getResolver(s, "getAvatar");
        if (!o) return null;
        t = new di(this, o, s);
        try {
          const a = yield t.getAvatar();
          if (a) return a.url;
        } catch (a) {
          if (a.code !== m.errors.CALL_EXCEPTION) throw a;
        }
        try {
          const a = Or(
            yield this.call({ to: o, data: "0x691f3431" + Br(s).substring(2) }),
            0
          );
          t = yield this.getResolver(a);
        } catch (a) {
          if (a.code !== m.errors.CALL_EXCEPTION) throw a;
          return null;
        }
      } else if (((t = yield this.getResolver(e)), !t)) return null;
      const r = yield t.getAvatar();
      return r == null ? null : r.url;
    });
  }
  perform(e, t) {
    return F.throwError(e + " not implemented", m.errors.NOT_IMPLEMENTED, {
      operation: e,
    });
  }
  _startEvent(e) {
    this.polling = this._events.filter(t => t.pollable()).length > 0;
  }
  _stopEvent(e) {
    this.polling = this._events.filter(t => t.pollable()).length > 0;
  }
  _addEventListener(e, t, r) {
    const i = new Yf(Ze(e), t, r);
    return this._events.push(i), this._startEvent(i), this;
  }
  on(e, t) {
    return this._addEventListener(e, t, !1);
  }
  once(e, t) {
    return this._addEventListener(e, t, !0);
  }
  emit(e, ...t) {
    let r = !1,
      i = [],
      s = Ze(e);
    return (
      (this._events = this._events.filter(o =>
        o.tag !== s
          ? !0
          : (setTimeout(() => {
              o.listener.apply(this, t);
            }, 0),
            (r = !0),
            o.once ? (i.push(o), !1) : !0)
      )),
      i.forEach(o => {
        this._stopEvent(o);
      }),
      r
    );
  }
  listenerCount(e) {
    if (!e) return this._events.length;
    let t = Ze(e);
    return this._events.filter(r => r.tag === t).length;
  }
  listeners(e) {
    if (e == null) return this._events.map(r => r.listener);
    let t = Ze(e);
    return this._events.filter(r => r.tag === t).map(r => r.listener);
  }
  off(e, t) {
    if (t == null) return this.removeAllListeners(e);
    const r = [];
    let i = !1,
      s = Ze(e);
    return (
      (this._events = this._events.filter(o =>
        o.tag !== s || o.listener != t || i ? !0 : ((i = !0), r.push(o), !1)
      )),
      r.forEach(o => {
        this._stopEvent(o);
      }),
      this
    );
  }
  removeAllListeners(e) {
    let t = [];
    if (e == null) (t = this._events), (this._events = []);
    else {
      const r = Ze(e);
      this._events = this._events.filter(i =>
        i.tag !== r ? !0 : (t.push(i), !1)
      );
    }
    return (
      t.forEach(r => {
        this._stopEvent(r);
      }),
      this
    );
  }
}
var De = function (n, e, t, r) {
  function i(s) {
    return s instanceof t
      ? s
      : new t(function (o) {
          o(s);
        });
  }
  return new (t || (t = Promise))(function (s, o) {
    function a(l) {
      try {
        c(r.next(l));
      } catch (h) {
        o(h);
      }
    }
    function u(l) {
      try {
        c(r.throw(l));
      } catch (h) {
        o(h);
      }
    }
    function c(l) {
      l.done ? s(l.value) : i(l.value).then(a, u);
    }
    c((r = r.apply(n, e || [])).next());
  });
};
const Y = new m(Cn),
  Zf = ["call", "estimateGas"];
function bt(n, e) {
  if (n == null) return null;
  if (typeof n.message == "string" && n.message.match("reverted")) {
    const t = ie(n.data) ? n.data : null;
    if (!e || t) return { message: n.message, data: t };
  }
  if (typeof n == "object") {
    for (const t in n) {
      const r = bt(n[t], e);
      if (r) return r;
    }
    return null;
  }
  if (typeof n == "string")
    try {
      return bt(JSON.parse(n), e);
    } catch {}
  return null;
}
function ps(n, e, t) {
  const r = t.transaction || t.signedTransaction;
  if (n === "call") {
    const s = bt(e, !0);
    if (s) return s.data;
    Y.throwError(
      "missing revert data in call exception; Transaction reverted without a reason string",
      m.errors.CALL_EXCEPTION,
      { data: "0x", transaction: r, error: e }
    );
  }
  if (n === "estimateGas") {
    let s = bt(e.body, !1);
    s == null && (s = bt(e, !1)),
      s &&
        Y.throwError(
          "cannot estimate gas; transaction may fail or may require manual gas limit",
          m.errors.UNPREDICTABLE_GAS_LIMIT,
          { reason: s.message, method: n, transaction: r, error: e }
        );
  }
  let i = e.message;
  throw (
    (e.code === m.errors.SERVER_ERROR &&
    e.error &&
    typeof e.error.message == "string"
      ? (i = e.error.message)
      : typeof e.body == "string"
        ? (i = e.body)
        : typeof e.responseText == "string" && (i = e.responseText),
    (i = (i || "").toLowerCase()),
    i.match(
      /insufficient funds|base fee exceeds gas limit|InsufficientFunds/i
    ) &&
      Y.throwError(
        "insufficient funds for intrinsic transaction cost",
        m.errors.INSUFFICIENT_FUNDS,
        { error: e, method: n, transaction: r }
      ),
    i.match(/nonce (is )?too low/i) &&
      Y.throwError("nonce has already been used", m.errors.NONCE_EXPIRED, {
        error: e,
        method: n,
        transaction: r,
      }),
    i.match(
      /replacement transaction underpriced|transaction gas price.*too low/i
    ) &&
      Y.throwError(
        "replacement fee too low",
        m.errors.REPLACEMENT_UNDERPRICED,
        { error: e, method: n, transaction: r }
      ),
    i.match(/only replay-protected/i) &&
      Y.throwError(
        "legacy pre-eip-155 transactions not supported",
        m.errors.UNSUPPORTED_OPERATION,
        { error: e, method: n, transaction: r }
      ),
    Zf.indexOf(n) >= 0 &&
      i.match(
        /gas required exceeds allowance|always failing transaction|execution reverted|revert/
      ) &&
      Y.throwError(
        "cannot estimate gas; transaction may fail or may require manual gas limit",
        m.errors.UNPREDICTABLE_GAS_LIMIT,
        { error: e, method: n, transaction: r }
      ),
    e)
  );
}
function pi(n) {
  return new Promise(function (e) {
    setTimeout(e, n);
  });
}
function $f(n) {
  if (n.error) {
    const e = new Error(n.error.message);
    throw ((e.code = n.error.code), (e.data = n.error.data), e);
  }
  return n.result;
}
function gt(n) {
  return n && n.toLowerCase();
}
const bn = {};
class vs extends kn {
  constructor(e, t, r) {
    if ((super(), e !== bn))
      throw new Error(
        "do not call the JsonRpcSigner constructor directly; use provider.getSigner"
      );
    U(this, "provider", t),
      r == null && (r = 0),
      typeof r == "string"
        ? (U(this, "_address", this.provider.formatter.address(r)),
          U(this, "_index", null))
        : typeof r == "number"
          ? (U(this, "_index", r), U(this, "_address", null))
          : Y.throwArgumentError(
              "invalid address or index",
              "addressOrIndex",
              r
            );
  }
  connect(e) {
    return Y.throwError(
      "cannot alter JSON-RPC Signer connection",
      m.errors.UNSUPPORTED_OPERATION,
      { operation: "connect" }
    );
  }
  connectUnchecked() {
    return new eu(bn, this.provider, this._address || this._index);
  }
  getAddress() {
    return this._address
      ? Promise.resolve(this._address)
      : this.provider
          .send("eth_accounts", [])
          .then(
            e => (
              e.length <= this._index &&
                Y.throwError(
                  "unknown account #" + this._index,
                  m.errors.UNSUPPORTED_OPERATION,
                  { operation: "getAddress" }
                ),
              this.provider.formatter.address(e[this._index])
            )
          );
  }
  sendUncheckedTransaction(e) {
    e = se(e);
    const t = this.getAddress().then(r => (r && (r = r.toLowerCase()), r));
    if (e.gasLimit == null) {
      const r = se(e);
      (r.from = t), (e.gasLimit = this.provider.estimateGas(r));
    }
    return (
      e.to != null &&
        (e.to = Promise.resolve(e.to).then(r =>
          De(this, void 0, void 0, function* () {
            if (r == null) return null;
            const i = yield this.provider.resolveName(r);
            return (
              i == null &&
                Y.throwArgumentError(
                  "provided ENS name resolves to null",
                  "tx.to",
                  r
                ),
              i
            );
          })
        )),
      V({ tx: V(e), sender: t }).then(({ tx: r, sender: i }) => {
        r.from != null
          ? r.from.toLowerCase() !== i &&
            Y.throwArgumentError("from address mismatch", "transaction", e)
          : (r.from = i);
        const s = this.provider.constructor.hexlifyTransaction(r, { from: !0 });
        return this.provider.send("eth_sendTransaction", [s]).then(
          o => o,
          o => (
            typeof o.message == "string" &&
              o.message.match(/user denied/i) &&
              Y.throwError(
                "user rejected transaction",
                m.errors.ACTION_REJECTED,
                { action: "sendTransaction", transaction: r }
              ),
            ps("sendTransaction", o, s)
          )
        );
      })
    );
  }
  signTransaction(e) {
    return Y.throwError(
      "signing transactions is unsupported",
      m.errors.UNSUPPORTED_OPERATION,
      { operation: "signTransaction" }
    );
  }
  sendTransaction(e) {
    return De(this, void 0, void 0, function* () {
      const t = yield this.provider._getInternalBlockNumber(
          100 + 2 * this.provider.pollingInterval
        ),
        r = yield this.sendUncheckedTransaction(e);
      try {
        return yield mt(
          () =>
            De(this, void 0, void 0, function* () {
              const i = yield this.provider.getTransaction(r);
              if (i !== null) return this.provider._wrapTransaction(i, r, t);
            }),
          { oncePoll: this.provider }
        );
      } catch (i) {
        throw ((i.transactionHash = r), i);
      }
    });
  }
  signMessage(e) {
    return De(this, void 0, void 0, function* () {
      const t = typeof e == "string" ? Le(e) : e,
        r = yield this.getAddress();
      try {
        return yield this.provider.send("personal_sign", [
          G(t),
          r.toLowerCase(),
        ]);
      } catch (i) {
        throw (
          (typeof i.message == "string" &&
            i.message.match(/user denied/i) &&
            Y.throwError("user rejected signing", m.errors.ACTION_REJECTED, {
              action: "signMessage",
              from: r,
              messageData: e,
            }),
          i)
        );
      }
    });
  }
  _legacySignMessage(e) {
    return De(this, void 0, void 0, function* () {
      const t = typeof e == "string" ? Le(e) : e,
        r = yield this.getAddress();
      try {
        return yield this.provider.send("eth_sign", [r.toLowerCase(), G(t)]);
      } catch (i) {
        throw (
          (typeof i.message == "string" &&
            i.message.match(/user denied/i) &&
            Y.throwError("user rejected signing", m.errors.ACTION_REJECTED, {
              action: "_legacySignMessage",
              from: r,
              messageData: e,
            }),
          i)
        );
      }
    });
  }
  _signTypedData(e, t, r) {
    return De(this, void 0, void 0, function* () {
      const i = yield fe.resolveNames(e, t, r, o =>
          this.provider.resolveName(o)
        ),
        s = yield this.getAddress();
      try {
        return yield this.provider.send("eth_signTypedData_v4", [
          s.toLowerCase(),
          JSON.stringify(fe.getPayload(i.domain, t, i.value)),
        ]);
      } catch (o) {
        throw (
          (typeof o.message == "string" &&
            o.message.match(/user denied/i) &&
            Y.throwError("user rejected signing", m.errors.ACTION_REJECTED, {
              action: "_signTypedData",
              from: s,
              messageData: { domain: i.domain, types: t, value: i.value },
            }),
          o)
        );
      }
    });
  }
  unlock(e) {
    return De(this, void 0, void 0, function* () {
      const t = this.provider,
        r = yield this.getAddress();
      return t.send("personal_unlockAccount", [r.toLowerCase(), e, null]);
    });
  }
}
class eu extends vs {
  sendTransaction(e) {
    return this.sendUncheckedTransaction(e).then(t => ({
      hash: t,
      nonce: null,
      gasLimit: null,
      gasPrice: null,
      data: null,
      value: null,
      chainId: null,
      confirmations: 0,
      from: null,
      wait: r => this.provider.waitForTransaction(t, r),
    }));
  }
}
const tu = {
  chainId: !0,
  data: !0,
  gasLimit: !0,
  gasPrice: !0,
  nonce: !0,
  to: !0,
  value: !0,
  type: !0,
  accessList: !0,
  maxFeePerGas: !0,
  maxPriorityFeePerGas: !0,
};
class ru extends Xf {
  constructor(e, t) {
    let r = t;
    r == null &&
      (r = new Promise((i, s) => {
        setTimeout(() => {
          this.detectNetwork().then(
            o => {
              i(o);
            },
            o => {
              s(o);
            }
          );
        }, 0);
      })),
      super(r),
      e || (e = At(this.constructor, "defaultUrl")()),
      typeof e == "string"
        ? U(this, "connection", Object.freeze({ url: e }))
        : U(this, "connection", Object.freeze(se(e))),
      (this._nextId = 42);
  }
  get _cache() {
    return (
      this._eventLoopCache == null && (this._eventLoopCache = {}),
      this._eventLoopCache
    );
  }
  static defaultUrl() {
    return "http://localhost:8545";
  }
  detectNetwork() {
    return (
      this._cache.detectNetwork ||
        ((this._cache.detectNetwork = this._uncachedDetectNetwork()),
        setTimeout(() => {
          this._cache.detectNetwork = null;
        }, 0)),
      this._cache.detectNetwork
    );
  }
  _uncachedDetectNetwork() {
    return De(this, void 0, void 0, function* () {
      yield pi(0);
      let e = null;
      try {
        e = yield this.send("eth_chainId", []);
      } catch {
        try {
          e = yield this.send("net_version", []);
        } catch {}
      }
      if (e != null) {
        const t = At(this.constructor, "getNetwork");
        try {
          return t(C.from(e).toNumber());
        } catch (r) {
          return Y.throwError(
            "could not detect network",
            m.errors.NETWORK_ERROR,
            { chainId: e, event: "invalidNetwork", serverError: r }
          );
        }
      }
      return Y.throwError("could not detect network", m.errors.NETWORK_ERROR, {
        event: "noNetwork",
      });
    });
  }
  getSigner(e) {
    return new vs(bn, this, e);
  }
  getUncheckedSigner(e) {
    return this.getSigner(e).connectUnchecked();
  }
  listAccounts() {
    return this.send("eth_accounts", []).then(e =>
      e.map(t => this.formatter.address(t))
    );
  }
  send(e, t) {
    const r = { method: e, params: t, id: this._nextId++, jsonrpc: "2.0" };
    this.emit("debug", { action: "request", request: xt(r), provider: this });
    const i = ["eth_chainId", "eth_blockNumber"].indexOf(e) >= 0;
    if (i && this._cache[e]) return this._cache[e];
    const s = Et(this.connection, JSON.stringify(r), $f).then(
      o => (
        this.emit("debug", {
          action: "response",
          request: r,
          response: o,
          provider: this,
        }),
        o
      ),
      o => {
        throw (
          (this.emit("debug", {
            action: "response",
            error: o,
            request: r,
            provider: this,
          }),
          o)
        );
      }
    );
    return (
      i &&
        ((this._cache[e] = s),
        setTimeout(() => {
          this._cache[e] = null;
        }, 0)),
      s
    );
  }
  prepareRequest(e, t) {
    switch (e) {
      case "getBlockNumber":
        return ["eth_blockNumber", []];
      case "getGasPrice":
        return ["eth_gasPrice", []];
      case "getBalance":
        return ["eth_getBalance", [gt(t.address), t.blockTag]];
      case "getTransactionCount":
        return ["eth_getTransactionCount", [gt(t.address), t.blockTag]];
      case "getCode":
        return ["eth_getCode", [gt(t.address), t.blockTag]];
      case "getStorageAt":
        return [
          "eth_getStorageAt",
          [gt(t.address), Z(t.position, 32), t.blockTag],
        ];
      case "sendTransaction":
        return ["eth_sendRawTransaction", [t.signedTransaction]];
      case "getBlock":
        return t.blockTag
          ? ["eth_getBlockByNumber", [t.blockTag, !!t.includeTransactions]]
          : t.blockHash
            ? ["eth_getBlockByHash", [t.blockHash, !!t.includeTransactions]]
            : null;
      case "getTransaction":
        return ["eth_getTransactionByHash", [t.transactionHash]];
      case "getTransactionReceipt":
        return ["eth_getTransactionReceipt", [t.transactionHash]];
      case "call":
        return [
          "eth_call",
          [
            At(this.constructor, "hexlifyTransaction")(t.transaction, {
              from: !0,
            }),
            t.blockTag,
          ],
        ];
      case "estimateGas":
        return [
          "eth_estimateGas",
          [
            At(this.constructor, "hexlifyTransaction")(t.transaction, {
              from: !0,
            }),
          ],
        ];
      case "getLogs":
        return (
          t.filter &&
            t.filter.address != null &&
            (t.filter.address = gt(t.filter.address)),
          ["eth_getLogs", [t.filter]]
        );
    }
    return null;
  }
  perform(e, t) {
    return De(this, void 0, void 0, function* () {
      if (e === "call" || e === "estimateGas") {
        const i = t.transaction;
        if (
          i &&
          i.type != null &&
          C.from(i.type).isZero() &&
          i.maxFeePerGas == null &&
          i.maxPriorityFeePerGas == null
        ) {
          const s = yield this.getFeeData();
          s.maxFeePerGas == null &&
            s.maxPriorityFeePerGas == null &&
            ((t = se(t)), (t.transaction = se(i)), delete t.transaction.type);
        }
      }
      const r = this.prepareRequest(e, t);
      r == null &&
        Y.throwError(e + " not implemented", m.errors.NOT_IMPLEMENTED, {
          operation: e,
        });
      try {
        return yield this.send(r[0], r[1]);
      } catch (i) {
        return ps(e, i, t);
      }
    });
  }
  _startEvent(e) {
    e.tag === "pending" && this._startPending(), super._startEvent(e);
  }
  _startPending() {
    if (this._pendingFilter != null) return;
    const e = this,
      t = this.send("eth_newPendingTransactionFilter", []);
    (this._pendingFilter = t),
      t
        .then(function (r) {
          function i() {
            e.send("eth_getFilterChanges", [r])
              .then(function (s) {
                if (e._pendingFilter != t) return null;
                let o = Promise.resolve();
                return (
                  s.forEach(function (a) {
                    (e._emitted["t:" + a.toLowerCase()] = "pending"),
                      (o = o.then(function () {
                        return e.getTransaction(a).then(function (u) {
                          return e.emit("pending", u), null;
                        });
                      }));
                  }),
                  o.then(function () {
                    return pi(1e3);
                  })
                );
              })
              .then(function () {
                if (e._pendingFilter != t) {
                  e.send("eth_uninstallFilter", [r]);
                  return;
                }
                return (
                  setTimeout(function () {
                    i();
                  }, 0),
                  null
                );
              })
              .catch(s => {});
          }
          return i(), r;
        })
        .catch(r => {});
  }
  _stopEvent(e) {
    e.tag === "pending" &&
      this.listenerCount("pending") === 0 &&
      (this._pendingFilter = null),
      super._stopEvent(e);
  }
  static hexlifyTransaction(e, t) {
    const r = se(tu);
    if (t) for (const s in t) t[s] && (r[s] = !0);
    vo(e, r);
    const i = {};
    return (
      [
        "chainId",
        "gasLimit",
        "gasPrice",
        "type",
        "maxFeePerGas",
        "maxPriorityFeePerGas",
        "nonce",
        "value",
      ].forEach(function (s) {
        if (e[s] == null) return;
        const o = wn(C.from(e[s]));
        s === "gasLimit" && (s = "gas"), (i[s] = o);
      }),
      ["from", "to", "data"].forEach(function (s) {
        e[s] != null && (i[s] = G(e[s]));
      }),
      e.accessList && (i.accessList = It(e.accessList)),
      i
    );
  }
}
const nu = 100,
  iu = 10;
class su {
  constructor(e, t = nu) {
    (this.sendBatchFn = e), (this.maxBatchSize = t), (this.pendingBatch = []);
  }
  enqueueRequest(e) {
    return ln(this, void 0, void 0, function* () {
      const t = { request: e, resolve: void 0, reject: void 0 },
        r = new Promise((i, s) => {
          (t.resolve = i), (t.reject = s);
        });
      return (
        this.pendingBatch.push(t),
        this.pendingBatch.length === this.maxBatchSize
          ? this.sendBatchRequest()
          : this.pendingBatchTimer ||
            (this.pendingBatchTimer = setTimeout(
              () => this.sendBatchRequest(),
              iu
            )),
        r
      );
    });
  }
  sendBatchRequest() {
    return ln(this, void 0, void 0, function* () {
      const e = this.pendingBatch;
      (this.pendingBatch = []),
        this.pendingBatchTimer &&
          (clearTimeout(this.pendingBatchTimer),
          (this.pendingBatchTimer = void 0));
      const t = e.map(r => r.request);
      return this.sendBatchFn(t).then(
        r => {
          e.forEach((i, s) => {
            const o = r[s];
            if (o.error) {
              const a = new Error(o.error.message);
              (a.code = o.error.code), (a.data = o.error.data), i.reject(a);
            } else i.resolve(o.result);
          });
        },
        r => {
          e.forEach(i => {
            i.reject(r);
          });
        }
      );
    });
  }
}
class yt extends ru {
  constructor(e) {
    const t = yt.getApiKey(e.apiKey),
      r = yt.getAlchemyNetwork(e.network),
      i = yt.getAlchemyConnectionInfo(r, t, "http");
    e.url !== void 0 && (i.url = e.url), (i.throttleLimit = e.maxRetries);
    const s = xs[r];
    super(i, s),
      (this.apiKey = e.apiKey),
      (this.maxRetries = e.maxRetries),
      (this.batchRequests = e.batchRequests);
    const o = Object.assign(Object.assign({}, this.connection), {
        headers: Object.assign(Object.assign({}, this.connection.headers), {
          "Alchemy-Ethers-Sdk-Method": "batchSend",
        }),
      }),
      a = u => Et(o, JSON.stringify(u));
    (this.batcher = new su(a)), this.modifyFormatter();
  }
  static getApiKey(e) {
    if (e == null) return Rn;
    if (e && typeof e != "string")
      throw new Error(
        `Invalid apiKey '${e}' provided. apiKey must be a string.`
      );
    return e;
  }
  static getNetwork(e) {
    return typeof e == "string" && e in Tn ? Tn[e] : us(e);
  }
  static getAlchemyNetwork(e) {
    if (e === void 0) return ms;
    if (typeof e == "number")
      throw new Error(
        `Invalid network '${e}' provided. Network must be a string.`
      );
    if (!Object.values(On).includes(e))
      throw new Error(
        `Invalid network '${e}' provided. Network must be one of: ${Object.values(On).join(", ")}.`
      );
    return e;
  }
  static getAlchemyConnectionInfo(e, t, r) {
    const i = r === "http" ? Es(e, t) : _s(e, t);
    return {
      headers: bs
        ? { "Alchemy-Ethers-Sdk-Version": Fn }
        : { "Alchemy-Ethers-Sdk-Version": Fn, "Accept-Encoding": "gzip" },
      allowGzip: !0,
      url: i,
    };
  }
  detectNetwork() {
    const e = Object.create(null, {
      detectNetwork: { get: () => super.detectNetwork },
    });
    return ln(this, void 0, void 0, function* () {
      let t = this.network;
      if (t == null && ((t = yield e.detectNetwork.call(this)), !t))
        throw new Error("No network detected");
      return t;
    });
  }
  _startPending() {
    ys("WARNING: Alchemy Provider does not support pending filters");
  }
  isCommunityResource() {
    return this.apiKey === Rn;
  }
  send(e, t) {
    return this._send(e, t, "send");
  }
  _send(e, t, r, i = !1) {
    const s = { method: e, params: t, id: this._nextId++, jsonrpc: "2.0" },
      o = Object.assign({}, this.connection);
    if (((o.headers["Alchemy-Ethers-Sdk-Method"] = r), this.batchRequests || i))
      return this.batcher.enqueueRequest(s);
    this.emit("debug", { action: "request", request: ws(s), provider: this });
    const a = ["eth_chainId", "eth_blockNumber"].indexOf(e) >= 0;
    if (a && this._cache[e]) return this._cache[e];
    const u = Et(this.connection, JSON.stringify(s), ou).then(
      c => (
        this.emit("debug", {
          action: "response",
          request: s,
          response: c,
          provider: this,
        }),
        c
      ),
      c => {
        throw (
          (this.emit("debug", {
            action: "response",
            error: c,
            request: s,
            provider: this,
          }),
          c)
        );
      }
    );
    return (
      a &&
        ((this._cache[e] = u),
        setTimeout(() => {
          this._cache[e] = null;
        }, 0)),
      u
    );
  }
  modifyFormatter() {
    this.formatter.formats.receiptLog.removed = e => {
      if (typeof e == "boolean") return e;
    };
  }
}
function ou(n) {
  if (n.error) {
    const e = new Error(n.error.message);
    throw ((e.code = n.error.code), (e.data = n.error.data), e);
  }
  return n.result;
}
const fu = Object.freeze(
  Object.defineProperty(
    { __proto__: null, AlchemyProvider: yt },
    Symbol.toStringTag,
    { value: "Module" }
  )
);
export { yt as A, ru as J, fu as a, U as d, us as g, Cn as v };
