/*
 Copyright (c) 2004-2016, The JS Foundation All Rights Reserved.
 Available via Academic Free License >= 2.1 OR the modified BSD license.
 see: http://dojotoolkit.org/license for details
 */

//>>built
(function (_1, _2) {
    var _3 = function () {
    }, _4 = function (it) {
        for (var p in it) {
            return 0;
        }
        return 1;
    }, _5 = {}.toString, _6 = function (it) {
        return _5.call(it) == "[object Function]";
    }, _7 = function (it) {
        return _5.call(it) == "[object String]";
    }, _8 = function (it) {
        return _5.call(it) == "[object Array]";
    }, _9 = function (_a, _b) {
        if (_a) {
            for (var i = 0; i < _a.length;) {
                _b(_a[i++]);
            }
        }
    }, _c = function (_d, _e) {
        for (var p in _e) {
            _d[p] = _e[p];
        }
        return _d;
    }, _f = function (_10, _11) {
        return _c(new Error(_10), {src: "dojoLoader", info: _11});
    }, _12 = 1, uid = function () {
        return "_" + _12++;
    }, req = function (_13, _14, _15) {
        return _16(_13, _14, _15, 0, req);
    }, _17 = this, doc = _17.document, _18 = doc && doc.createElement("DiV"), has = req.has = function (_19) {
        return _6(_1a[_19]) ? (_1a[_19] = _1a[_19](_17, doc, _18)) : _1a[_19];
    }, _1a = has.cache = _2.hasCache;
    has.add = function (_1b, _1c, now, _1d) {
        (_1a[_1b] === undefined || _1d) && (_1a[_1b] = _1c);
        return now && has(_1b);
    };
    0 && has.add("host-node", _1.has && "host-node" in _1.has ? _1.has["host-node"] : (typeof process == "object" && process.versions && process.versions.node && process.versions.v8));
    if (0) {
        require("./_base/configNode.js").config(_2);
        _2.loaderPatch.nodeRequire = require;
    }
    0 && has.add("host-rhino", _1.has && "host-rhino" in _1.has ? _1.has["host-rhino"] : (typeof load == "function" && (typeof Packages == "function" || typeof Packages == "object")));
    if (0) {
        for (var _1e = _1.baseUrl || ".", arg, _1f = this.arguments, i = 0; i < _1f.length;) {
            arg = (_1f[i++] + "").split("=");
            if (arg[0] == "baseUrl") {
                _1e = arg[1];
                break;
            }
        }
        load(_1e + "/_base/configRhino.js");
        rhinoDojoConfig(_2, _1e, _1f);
    }
    has.add("host-webworker", ((typeof WorkerGlobalScope !== "undefined") && (self instanceof WorkerGlobalScope)));
    if (has("host-webworker")) {
        _c(_2.hasCache, {
            "host-browser": 0,
            "dom": 0,
            "dojo-dom-ready-api": 0,
            "dojo-sniff": 0,
            "dojo-inject-api": 1,
            "host-webworker": 1,
            "dojo-guarantee-console": 0
        });
        _2.loaderPatch = {
            injectUrl: function (url, _20) {
                try {
                    importScripts(url);
                    _20();
                } catch (e) {
                    console.error(e);
                }
            }
        };
    }
    for (var p in _1.has) {
        has.add(p, _1.has[p], 0, 1);
    }
    var _21 = 1, _22 = 2, _23 = 3, _24 = 4, _25 = 5;
    if (0) {
        _21 = "requested";
        _22 = "arrived";
        _23 = "not-a-module";
        _24 = "executing";
        _25 = "executed";
    }
    var _26 = 0, _27 = "sync", xd = "xd", _28 = [], _29 = 0, _2a = _3, _2b = _3, _2c;
    if (1) {
        req.isXdUrl = _3;
        req.initSyncLoader = function (_2d, _2e, _2f) {
            if (!_29) {
                _29 = _2d;
                _2a = _2e;
                _2b = _2f;
            }
            return {
                sync: _27,
                requested: _21,
                arrived: _22,
                nonmodule: _23,
                executing: _24,
                executed: _25,
                syncExecStack: _28,
                modules: _30,
                execQ: _31,
                getModule: _32,
                injectModule: _33,
                setArrived: _34,
                signal: _35,
                finishExec: _36,
                execModule: _37,
                dojoRequirePlugin: _29,
                getLegacyMode: function () {
                    return _26;
                },
                guardCheckComplete: _38
            };
        };
        if (1 || has("host-webworker")) {
            var _39 = location.protocol, _3a = location.host;
            req.isXdUrl = function (url) {
                if (/^\./.test(url)) {
                    return false;
                }
                if (/^\/\//.test(url)) {
                    return true;
                }
                var _3b = url.match(/^([^\/\:]+\:)\/+([^\/]+)/);
                return _3b && (_3b[1] != _39 || (_3a && _3b[2] != _3a));
            };
            1 || has.add("dojo-xhr-factory", 1);
            has.add("dojo-force-activex-xhr", 1 && !doc.addEventListener && window.location.protocol == "file:");
            has.add("native-xhr", typeof XMLHttpRequest != "undefined");
            if (has("native-xhr") && !has("dojo-force-activex-xhr")) {
                _2c = function () {
                    return new XMLHttpRequest();
                };
            } else {
                for (var _3c = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"], _3d, i = 0; i < 3;) {
                    try {
                        _3d = _3c[i++];
                        if (new ActiveXObject(_3d)) {
                            break;
                        }
                    } catch (e) {
                    }
                }
                _2c = function () {
                    return new ActiveXObject(_3d);
                };
            }
            req.getXhr = _2c;
            has.add("dojo-gettext-api", 1);
            req.getText = function (url, _3e, _3f) {
                var xhr = _2c();
                xhr.open("GET", _40(url), false);
                xhr.send(null);
                if (xhr.status == 200 || (!location.host && !xhr.status)) {
                    if (_3f) {
                        _3f(xhr.responseText, _3e);
                    }
                } else {
                    throw _f("xhrFailed", xhr.status);
                }
                return xhr.responseText;
            };
        }
    } else {
        req.async = 1;
    }
    var _41 = has("csp-restrictions") ? function () {
    } : new Function("return eval(arguments[0]);");
    req.eval = function (_42, _43) {
        return _41(_42 + "\r\n//# sourceURL=" + _43);
    };
    var _44 = {}, _45 = "error", _35 = req.signal = function (_46, _47) {
        var _48 = _44[_46];
        _9(_48 && _48.slice(0), function (_49) {
            _49.apply(null, _8(_47) ? _47 : [_47]);
        });
    }, on = req.on = function (_4a, _4b) {
        var _4c = _44[_4a] || (_44[_4a] = []);
        _4c.push(_4b);
        return {
            remove: function () {
                for (var i = 0; i < _4c.length; i++) {
                    if (_4c[i] === _4b) {
                        _4c.splice(i, 1);
                        return;
                    }
                }
            }
        };
    };
    var _4d = [], _4e = {}, _4f = [], _50 = {}, map = req.map = {}, _51 = [], _30 = {}, _52 = "", _53 = {}, _54 = "url:", _55 = {}, _56 = {}, _57 = 0;
    if (1) {
        var _58 = function (_59, _5a) {
            _5a = _5a !== false;
            var p, _5b, _5c, now, m;
            for (p in _55) {
                _5b = _55[p];
                _5c = p.match(/^url\:(.+)/);
                if (_5c) {
                    _53[_54 + _5d(_5c[1], _59)] = _5b;
                } else {
                    if (p == "*now") {
                        now = _5b;
                    } else {
                        if (p != "*noref") {
                            m = _5e(p, _59, true);
                            _53[m.mid] = _53[_54 + m.url] = _5b;
                        }
                    }
                }
            }
            if (now) {
                now(_5f(_59));
            }
            if (_5a) {
                _55 = {};
            }
        }, _60 = function (s) {
            return s.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, function (c) {
                return "\\" + c;
            });
        }, _61 = function (map, _62) {
            _62.splice(0, _62.length);
            for (var p in map) {
                _62.push([p, map[p], new RegExp("^" + _60(p) + "(/|$)"), p.length]);
            }
            _62.sort(function (lhs, rhs) {
                return rhs[3] - lhs[3];
            });
            return _62;
        }, _63 = function (_64, _65) {
            _9(_64, function (_66) {
                _65.push([_7(_66[0]) ? new RegExp("^" + _60(_66[0]) + "$") : _66[0], _66[1]]);
            });
        }, _67 = function (_68) {
            var _69 = _68.name;
            if (!_69) {
                _69 = _68;
                _68 = {name: _69};
            }
            _68 = _c({main: "main"}, _68);
            _68.location = _68.location ? _68.location : _69;
            if (_68.packageMap) {
                map[_69] = _68.packageMap;
            }
            if (!_68.main.indexOf("./")) {
                _68.main = _68.main.substring(2);
            }
            _50[_69] = _68;
        }, _6a = [], _6b = function (_6c, _6d, _6e) {
            for (var p in _6c) {
                if (p == "waitSeconds") {
                    req.waitms = (_6c[p] || 0) * 1000;
                }
                if (p == "cacheBust") {
                    _52 = _6c[p] ? (_7(_6c[p]) ? _6c[p] : (new Date()).getTime() + "") : "";
                }
                if (p == "baseUrl" || p == "combo") {
                    req[p] = _6c[p];
                }
                if (1 && p == "async") {
                    var _6f = _6c[p];
                    req.legacyMode = _26 = (_7(_6f) && /sync|legacyAsync/.test(_6f) ? _6f : (!_6f ? _27 : false));
                    req.async = !_26;
                }
                if (_6c[p] !== _1a) {
                    req.rawConfig[p] = _6c[p];
                    p != "has" && has.add("config-" + p, _6c[p], 0, _6d);
                }
            }
            if (!req.baseUrl) {
                req.baseUrl = "./";
            }
            if (!/\/$/.test(req.baseUrl)) {
                req.baseUrl += "/";
            }
            for (p in _6c.has) {
                has.add(p, _6c.has[p], 0, _6d);
            }
            _9(_6c.packages, _67);
            for (var _70 in _6c.packagePaths) {
                _9(_6c.packagePaths[_70], function (_71) {
                    var _72 = _70 + "/" + _71;
                    if (_7(_71)) {
                        _71 = {name: _71};
                    }
                    _71.location = _72;
                    _67(_71);
                });
            }
            _61(_c(map, _6c.map), _51);
            _9(_51, function (_73) {
                _73[1] = _61(_73[1], []);
                if (_73[0] == "*") {
                    _51.star = _73;
                }
            });
            _61(_c(_4e, _6c.paths), _4f);
            _63(_6c.aliases, _4d);
            if (_6d) {
                _6a.push({config: _6c.config});
            } else {
                for (p in _6c.config) {
                    var _74 = _32(p, _6e);
                    _74.config = _c(_74.config || {}, _6c.config[p]);
                }
            }
            if (_6c.cache) {
                _58();
                _55 = _6c.cache;
                _58(0, !!_6c.cache["*noref"]);
            }
            _35("config", [_6c, req.rawConfig]);
        };
        if (has("dojo-cdn") || 1) {
            var _75 = doc.getElementsByTagName("script"), i = 0, _76, _77, src, _78;
            while (i < _75.length) {
                _76 = _75[i++];
                if ((src = _76.getAttribute("src")) && (_78 = src.match(/(((.*)\/)|^)dojo\.js(\W|$)/i))) {
                    _77 = _78[3] || "";
                    _2.baseUrl = _2.baseUrl || _77;
                    _57 = _76;
                }
                if ((src = (_76.getAttribute("data-dojo-config") || _76.getAttribute("djConfig")))) {
                    _56 = req.eval("({ " + src + " })", "data-dojo-config");
                    _57 = _76;
                }
                if (0) {
                    if ((src = _76.getAttribute("data-main"))) {
                        _56.deps = _56.deps || [src];
                    }
                }
            }
        }
        if (0) {
            try {
                if (window.parent != window && window.parent.require) {
                    var doh = window.parent.require("doh");
                    doh && _c(_56, doh.testConfig);
                }
            } catch (e) {
            }
        }
        req.rawConfig = {};
        _6b(_2, 1);
        if (has("dojo-cdn")) {
            _50.dojo.location = _77;
            if (_77) {
                _77 += "/";
            }
            _50.dijit.location = _77 + "../dijit/";
            _50.dojox.location = _77 + "../dojox/";
        }
        _6b(_1, 1);
        _6b(_56, 1);
    } else {
        _4e = _2.paths;
        _4f = _2.pathsMapProg;
        _50 = _2.packs;
        _4d = _2.aliases;
        _51 = _2.mapProgs;
        _30 = _2.modules;
        _53 = _2.cache;
        _52 = _2.cacheBust;
        req.rawConfig = _2;
    }
    if (0) {
        req.combo = req.combo || {add: _3};
        var _79 = 0, _7a = [], _7b = null;
    }
    var _7c = function (_7d) {
        _38(function () {
            _9(_7d.deps, _33);
            if (0 && _79 && !_7b) {
                _7b = setTimeout(function () {
                    _79 = 0;
                    _7b = null;
                    req.combo.done(function (_7e, url) {
                        var _7f = function () {
                            _80(0, _7e);
                            _81();
                        };
                        _7a.push(_7e);
                        _82 = _7e;
                        req.injectUrl(url, _7f, _7e);
                        _82 = 0;
                    }, req);
                }, 0);
            }
        });
    }, _16 = function (a1, a2, a3, _83, _84) {
        var _85, _86;
        if (_7(a1)) {
            _85 = _32(a1, _83, true);
            if (_85 && _85.executed) {
                return _85.result;
            }
            throw _f("undefinedModule", a1);
        }
        if (!_8(a1)) {
            _6b(a1, 0, _83);
            a1 = a2;
            a2 = a3;
        }
        if (_8(a1)) {
            if (!a1.length) {
                a2 && a2();
            } else {
                _86 = "require*" + uid();
                for (var mid, _87 = [], i = 0; i < a1.length;) {
                    mid = a1[i++];
                    _87.push(_32(mid, _83));
                }
                _85 = _c(_88("", _86, 0, ""), {
                    injected: _22,
                    deps: _87,
                    def: a2 || _3,
                    require: _83 ? _83.require : req,
                    gc: 1
                });
                _30[_85.mid] = _85;
                _7c(_85);
                var _89 = _8a && _26 != _27;
                _38(function () {
                    _37(_85, _89);
                });
                if (!_85.executed) {
                    _31.push(_85);
                }
                _81();
            }
        }
        return _84;
    }, _5f = function (_8b) {
        if (!_8b) {
            return req;
        }
        var _8c = _8b.require;
        if (!_8c) {
            _8c = function (a1, a2, a3) {
                return _16(a1, a2, a3, _8b, _8c);
            };
            _8b.require = _c(_8c, req);
            _8c.module = _8b;
            _8c.toUrl = function (_8d) {
                return _5d(_8d, _8b);
            };
            _8c.toAbsMid = function (mid) {
                return _bc(mid, _8b);
            };
            if (0) {
                _8c.undef = function (mid) {
                    req.undef(mid, _8b);
                };
            }
            if (1) {
                _8c.syncLoadNls = function (mid) {
                    var _8e = _5e(mid, _8b), _8f = _30[_8e.mid];
                    if (!_8f || !_8f.executed) {
                        _90 = _53[_8e.mid] || _53[_54 + _8e.url];
                        if (_90) {
                            _91(_90);
                            _8f = _30[_8e.mid];
                        }
                    }
                    return _8f && _8f.executed && _8f.result;
                };
            }
        }
        return _8c;
    }, _31 = [], _92 = [], _93 = {}, _94 = function (_95) {
        _95.injected = _21;
        _93[_95.mid] = 1;
        if (_95.url) {
            _93[_95.url] = _95.pack || 1;
        }
        _96();
    }, _34 = function (_97) {
        _97.injected = _22;
        delete _93[_97.mid];
        if (_97.url) {
            delete _93[_97.url];
        }
        if (_4(_93)) {
            _98();
            1 && _26 == xd && (_26 = _27);
        }
    }, _99 = req.idle = function () {
        return !_92.length && _4(_93) && !_31.length && !_8a;
    }, _9a = function (_9b, map) {
        if (map) {
            for (var i = 0; i < map.length; i++) {
                if (map[i][2].test(_9b)) {
                    return map[i];
                }
            }
        }
        return 0;
    }, _9c = function (_9d) {
        var _9e = [], _9f, _a0;
        _9d = _9d.replace(/\\/g, "/").split("/");
        while (_9d.length) {
            _9f = _9d.shift();
            if (_9f == ".." && _9e.length && _a0 != "..") {
                _9e.pop();
                _a0 = _9e[_9e.length - 1];
            } else {
                if (_9f != ".") {
                    _9e.push(_a0 = _9f);
                }
            }
        }
        return _9e.join("/");
    }, _88 = function (pid, mid, _a1, url) {
        if (1) {
            var xd = req.isXdUrl(url);
            return {
                pid: pid,
                mid: mid,
                pack: _a1,
                url: url,
                executed: 0,
                def: 0,
                isXd: xd,
                isAmd: !!(xd || (_50[pid] && _50[pid].isAmd))
            };
        } else {
            return {pid: pid, mid: mid, pack: _a1, url: url, executed: 0, def: 0};
        }
    }, _a2 = function (mid, _a3, _a4, _a5, _a6, _a7, _a8, _a9, _aa, _ab) {
        var pid, _ac, _ad, _ae, url, _af, _b0, _b1;
        _b1 = mid;
        _b0 = /^\./.test(mid);
        if (/(^\/)|(\:)|(\.js$)/.test(mid) || (_b0 && !_a3)) {
            return _88(0, mid, 0, mid);
        } else {
            mid = _9c(_b0 ? (_a3.mid + "/../" + mid) : mid);
            if (/^\./.test(mid)) {
                throw _f("irrationalPath", mid);
            }
            if (!_ab && !_b0 && _a7.star) {
                _ae = _9a(mid, _a7.star[1]);
            }
            if (!_ae && _a3) {
                _ae = _9a(_a3.mid, _a7);
                _ae = _ae && _9a(mid, _ae[1]);
            }
            if (_ae) {
                mid = _ae[1] + mid.substring(_ae[3]);
            }
            _78 = mid.match(/^([^\/]+)(\/(.+))?$/);
            pid = _78 ? _78[1] : "";
            if ((_ac = _a4[pid])) {
                mid = pid + "/" + (_ad = (_78[3] || _ac.main));
            } else {
                pid = "";
            }
            var _b2 = 0, _b3 = 0;
            _9(_a9, function (_b4) {
                var _b5 = mid.match(_b4[0]);
                if (_b5 && _b5.length > _b2) {
                    _b3 = _6(_b4[1]) ? mid.replace(_b4[0], _b4[1]) : _b4[1];
                }
            });
            if (_b3) {
                return _a2(_b3, 0, _a4, _a5, _a6, _a7, _a8, _a9, _aa);
            }
            _af = _a5[mid];
            if (_af) {
                return _aa ? _88(_af.pid, _af.mid, _af.pack, _af.url) : _a5[mid];
            }
        }
        _ae = _9a(mid, _a8);
        if (_ae) {
            url = _ae[1] + mid.substring(_ae[3]);
        } else {
            if (pid) {
                url = _ac.location + "/" + _ad;
            } else {
                if (has("config-tlmSiblingOfDojo")) {
                    url = "../" + mid;
                } else {
                    url = mid;
                }
            }
        }
        if (!(/(^\/)|(\:)/.test(url))) {
            url = _a6 + url;
        }
        url += ".js";
        return _88(pid, mid, _ac, _9c(url));
    }, _5e = function (mid, _b6, _b7) {
        return _a2(mid, _b6, _50, _30, req.baseUrl, _51, _4f, _4d, undefined, _b7);
    }, _b8 = function (_b9, _ba, _bb) {
        return _b9.normalize ? _b9.normalize(_ba, function (mid) {
            return _bc(mid, _bb);
        }) : _bc(_ba, _bb);
    }, _bd = 0, _32 = function (mid, _be, _bf) {
        var _c0, _c1, _c2, _c3;
        _c0 = mid.match(/^(.+?)\!(.*)$/);
        if (_c0) {
            _c1 = _32(_c0[1], _be, _bf);
            if (1 && _26 == _27 && !_c1.executed) {
                _33(_c1);
                if (_c1.injected === _22 && !_c1.executed) {
                    _38(function () {
                        _37(_c1);
                    });
                }
                if (_c1.executed) {
                    _c4(_c1);
                } else {
                    _31.unshift(_c1);
                }
            }
            if (_c1.executed === _25 && !_c1.load) {
                _c4(_c1);
            }
            if (_c1.load) {
                _c2 = _b8(_c1, _c0[2], _be);
                mid = (_c1.mid + "!" + (_c1.dynamic ? ++_bd + "!" : "") + _c2);
            } else {
                _c2 = _c0[2];
                mid = _c1.mid + "!" + (++_bd) + "!waitingForPlugin";
            }
            _c3 = {plugin: _c1, mid: mid, req: _5f(_be), prid: _c2};
        } else {
            _c3 = _5e(mid, _be);
        }
        return _30[_c3.mid] || (!_bf && (_30[_c3.mid] = _c3));
    }, _bc = req.toAbsMid = function (mid, _c5) {
        return _5e(mid, _c5).mid;
    }, _5d = req.toUrl = function (_c6, _c7) {
        var _c8 = _5e(_c6 + "/x", _c7), url = _c8.url;
        return _40(_c8.pid === 0 ? _c6 : url.substring(0, url.length - 5));
    }, _c9 = {injected: _22, executed: _25, def: _23, result: _23}, _ca = function (mid) {
        return _30[mid] = _c({mid: mid}, _c9);
    }, _cb = _ca("require"), _cc = _ca("exports"), _cd = _ca("module"), _ce = function (_cf, _d0) {
        req.trace("loader-run-factory", [_cf.mid]);
        var _d1 = _cf.def, _d2;
        1 && _28.unshift(_cf);
        if (has("config-dojo-loader-catches")) {
            try {
                _d2 = _6(_d1) ? _d1.apply(null, _d0) : _d1;
            } catch (e) {
                _35(_45, _cf.result = _f("factoryThrew", [_cf, e]));
            }
        } else {
            _d2 = _6(_d1) ? _d1.apply(null, _d0) : _d1;
        }
        _cf.result = _d2 === undefined && _cf.cjs ? _cf.cjs.exports : _d2;
        1 && _28.shift(_cf);
    }, _d3 = {}, _d4 = 0, _c4 = function (_d5) {
        var _d6 = _d5.result;
        _d5.dynamic = _d6.dynamic;
        _d5.normalize = _d6.normalize;
        _d5.load = _d6.load;
        return _d5;
    }, _d7 = function (_d8) {
        var map = {};
        _9(_d8.loadQ, function (_d9) {
            var _da = _b8(_d8, _d9.prid, _d9.req.module), mid = _d8.dynamic ? _d9.mid.replace(/waitingForPlugin$/, _da) : (_d8.mid + "!" + _da), _db = _c(_c({}, _d9), {
                mid: mid,
                prid: _da,
                injected: 0
            });
            if (!_30[mid] || !_30[mid].injected) {
                _ed(_30[mid] = _db);
            }
            map[_d9.mid] = _30[mid];
            _34(_d9);
            delete _30[_d9.mid];
        });
        _d8.loadQ = 0;
        var _dc = function (_dd) {
            for (var _de, _df = _dd.deps || [], i = 0; i < _df.length; i++) {
                _de = map[_df[i].mid];
                if (_de) {
                    _df[i] = _de;
                }
            }
        };
        for (var p in _30) {
            _dc(_30[p]);
        }
        _9(_31, _dc);
    }, _36 = function (_e0) {
        req.trace("loader-finish-exec", [_e0.mid]);
        _e0.executed = _25;
        _e0.defOrder = _d4++;
        1 && _9(_e0.provides, function (cb) {
            cb();
        });
        if (_e0.loadQ) {
            _c4(_e0);
            _d7(_e0);
        }
        for (i = 0; i < _31.length;) {
            if (_31[i] === _e0) {
                _31.splice(i, 1);
            } else {
                i++;
            }
        }
        if (/^require\*/.test(_e0.mid)) {
            delete _30[_e0.mid];
        }
    }, _e1 = [], _37 = function (_e2, _e3) {
        if (_e2.executed === _24) {
            req.trace("loader-circular-dependency", [_e1.concat(_e2.mid).join("->")]);
            return (!_e2.def || _e3) ? _d3 : (_e2.cjs && _e2.cjs.exports);
        }
        if (!_e2.executed) {
            if (!_e2.def) {
                return _d3;
            }
            var mid = _e2.mid, _e4 = _e2.deps || [], arg, _e5, _e6 = [], i = 0;
            if (0) {
                _e1.push(mid);
                req.trace("loader-exec-module", ["exec", _e1.length, mid]);
            }
            _e2.executed = _24;
            while ((arg = _e4[i++])) {
                _e5 = ((arg === _cb) ? _5f(_e2) : ((arg === _cc) ? _e2.cjs.exports : ((arg === _cd) ? _e2.cjs : _37(arg, _e3))));
                if (_e5 === _d3) {
                    _e2.executed = 0;
                    req.trace("loader-exec-module", ["abort", mid]);
                    0 && _e1.pop();
                    return _d3;
                }
                _e6.push(_e5);
            }
            _ce(_e2, _e6);
            _36(_e2);
            0 && _e1.pop();
        }
        return _e2.result;
    }, _8a = 0, _38 = function (_e7) {
        try {
            _8a++;
            _e7();
        } catch (e) {
            throw e;
        } finally {
            _8a--;
        }
        if (_99()) {
            _35("idle", []);
        }
    }, _81 = function () {
        if (_8a) {
            return;
        }
        _38(function () {
            _2a();
            for (var _e8, _e9, i = 0; i < _31.length;) {
                _e8 = _d4;
                _e9 = _31[i];
                _37(_e9);
                if (_e8 != _d4) {
                    _2a();
                    i = 0;
                } else {
                    i++;
                }
            }
        });
    };
    if (0) {
        req.undef = function (_ea, _eb) {
            var _ec = _32(_ea, _eb);
            _34(_ec);
            _c(_ec, {def: 0, executed: 0, injected: 0, node: 0, load: 0});
        };
    }
    if (1) {
        if (has("dojo-loader-eval-hint-url") === undefined) {
            has.add("dojo-loader-eval-hint-url", 1);
        }
        var _40 = typeof _1.fixupUrl == "function" ? _1.fixupUrl : function (url) {
            url += "";
            return url + (_52 ? ((/\?/.test(url) ? "&" : "?") + _52) : "");
        }, _ed = function (_ee) {
            var _ef = _ee.plugin;
            if (_ef.executed === _25 && !_ef.load) {
                _c4(_ef);
            }
            var _f0 = function (def) {
                _ee.result = def;
                _34(_ee);
                _36(_ee);
                _81();
            };
            if (_ef.load) {
                _ef.load(_ee.prid, _ee.req, _f0);
            } else {
                if (_ef.loadQ) {
                    _ef.loadQ.push(_ee);
                } else {
                    _ef.loadQ = [_ee];
                    _31.unshift(_ef);
                    _33(_ef);
                }
            }
        }, _90 = 0, _82 = 0, _f1 = 0, _91 = function (_f2, _f3) {
            if (has("config-stripStrict")) {
                _f2 = _f2.replace(/(["'])use strict\1/g, "");
            }
            _f1 = 1;
            if (has("config-dojo-loader-catches")) {
                try {
                    if (_f2 === _90) {
                        _90.call(null);
                    } else {
                        req.eval(_f2, has("dojo-loader-eval-hint-url") ? _f3.url : _f3.mid);
                    }
                } catch (e) {
                    _35(_45, _f("evalModuleThrew", _f3));
                }
            } else {
                if (_f2 === _90) {
                    _90.call(null);
                } else {
                    req.eval(_f2, has("dojo-loader-eval-hint-url") ? _f3.url : _f3.mid);
                }
            }
            _f1 = 0;
        }, _33 = function (_f4) {
            var mid = _f4.mid, url = _f4.url;
            if (_f4.executed || _f4.injected || _93[mid] || (_f4.url && ((_f4.pack && _93[_f4.url] === _f4.pack) || _93[_f4.url] == 1))) {
                return;
            }
            _94(_f4);
            if (0) {
                var _f5 = 0;
                if (_f4.plugin && _f4.plugin.isCombo) {
                    req.combo.add(_f4.plugin.mid, _f4.prid, 0, req);
                    _f5 = 1;
                } else {
                    if (!_f4.plugin) {
                        _f5 = req.combo.add(0, _f4.mid, _f4.url, req);
                    }
                }
                if (_f5) {
                    _79 = 1;
                    return;
                }
            }
            if (_f4.plugin) {
                _ed(_f4);
                return;
            }
            var _f6 = function () {
                _80(_f4);
                if (_f4.injected !== _22) {
                    if (has("dojo-enforceDefine")) {
                        _35(_45, _f("noDefine", _f4));
                        return;
                    }
                    _34(_f4);
                    _c(_f4, _c9);
                    req.trace("loader-define-nonmodule", [_f4.url]);
                }
                if (1 && _26) {
                    !_28.length && _81();
                } else {
                    _81();
                }
            };
            _90 = _53[mid] || _53[_54 + _f4.url];
            if (_90) {
                req.trace("loader-inject", ["cache", _f4.mid, url]);
                _91(_90, _f4);
                _f6();
                return;
            }
            if (1 && _26) {
                if (_f4.isXd) {
                    _26 == _27 && (_26 = xd);
                } else {
                    if (_f4.isAmd && _26 != _27) {
                    } else {
                        var _f7 = function (_f8) {
                            if (_26 == _27) {
                                _28.unshift(_f4);
                                _91(_f8, _f4);
                                _28.shift();
                                _80(_f4);
                                if (!_f4.cjs) {
                                    _34(_f4);
                                    _36(_f4);
                                }
                                if (_f4.finish) {
                                    var _f9 = mid + "*finish", _fa = _f4.finish;
                                    delete _f4.finish;
                                    def(_f9, ["dojo", ("dojo/require!" + _fa.join(",")).replace(/\./g, "/")], function (_fb) {
                                        _9(_fa, function (mid) {
                                            _fb.require(mid);
                                        });
                                    });
                                    _31.unshift(_32(_f9));
                                }
                                _f6();
                            } else {
                                _f8 = _2b(_f4, _f8);
                                if (_f8) {
                                    _91(_f8, _f4);
                                    _f6();
                                } else {
                                    _82 = _f4;
                                    req.injectUrl(_40(url), _f6, _f4);
                                    _82 = 0;
                                }
                            }
                        };
                        req.trace("loader-inject", ["xhr", _f4.mid, url, _26 != _27]);
                        if (has("config-dojo-loader-catches")) {
                            try {
                                req.getText(url, _26 != _27, _f7);
                            } catch (e) {
                                _35(_45, _f("xhrInjectFailed", [_f4, e]));
                            }
                        } else {
                            req.getText(url, _26 != _27, _f7);
                        }
                        return;
                    }
                }
            }
            req.trace("loader-inject", ["script", _f4.mid, url]);
            _82 = _f4;
            req.injectUrl(_40(url), _f6, _f4);
            _82 = 0;
        }, _fc = function (_fd, _fe, def) {
            req.trace("loader-define-module", [_fd.mid, _fe]);
            if (0 && _fd.plugin && _fd.plugin.isCombo) {
                _fd.result = _6(def) ? def() : def;
                _34(_fd);
                _36(_fd);
                return _fd;
            }
            var mid = _fd.mid;
            if (_fd.injected === _22) {
                _35(_45, _f("multipleDefine", _fd));
                return _fd;
            }
            _c(_fd, {
                deps: _fe,
                def: def,
                cjs: {
                    id: _fd.mid, uri: _fd.url, exports: (_fd.result = {}), setExports: function (_ff) {
                        _fd.cjs.exports = _ff;
                    }, config: function () {
                        return _fd.config;
                    }
                }
            });
            for (var i = 0; _fe[i]; i++) {
                _fe[i] = _32(_fe[i], _fd);
            }
            if (1 && _26 && !_93[mid]) {
                _7c(_fd);
                _31.push(_fd);
                _81();
            }
            _34(_fd);
            if (!_6(def) && !_fe.length) {
                _fd.result = def;
                _36(_fd);
            }
            return _fd;
        }, _80 = function (_100, mids) {
            var _101 = [], _102, args;
            while (_92.length) {
                args = _92.shift();
                mids && (args[0] = mids.shift());
                _102 = (args[0] && _32(args[0])) || _100;
                _101.push([_102, args[1], args[2]]);
            }
            _58(_100);
            _9(_101, function (args) {
                _7c(_fc.apply(null, args));
            });
        };
    }
    var _103 = 0, _98 = _3, _96 = _3;
    if (1) {
        _98 = function () {
            _103 && clearTimeout(_103);
            _103 = 0;
        };
        _96 = function () {
            _98();
            if (req.waitms) {
                _103 = _17.setTimeout(function () {
                    _98();
                    _35(_45, _f("timeout", _93));
                }, req.waitms);
            }
        };
    }
    if (1) {
        has.add("ie-event-behavior", doc.attachEvent && typeof Windows === "undefined" && (typeof opera === "undefined" || opera.toString() != "[object Opera]"));
    }
    if (1 && (1 || 1)) {
        var _104 = function (node, _105, _106, _107) {
            if (!has("ie-event-behavior")) {
                node.addEventListener(_105, _107, false);
                return function () {
                    node.removeEventListener(_105, _107, false);
                };
            } else {
                node.attachEvent(_106, _107);
                return function () {
                    node.detachEvent(_106, _107);
                };
            }
        }, _108 = _104(window, "load", "onload", function () {
            req.pageLoaded = 1;
            try {
                doc.readyState != "complete" && (doc.readyState = "complete");
            } catch (e) {
            }
            _108();
        });
        if (1) {
            var _75 = doc.getElementsByTagName("script"), i = 0, _76;
            while (!_57) {
                if (!/^dojo/.test((_76 = _75[i++]) && _76.type)) {
                    _57 = _76;
                }
            }
            req.injectUrl = function (url, _109, _10a) {

                var node = _10a.node = doc.createElement("script"), _10b = function (e) {
                    e = e || window.event;
                    var node = e.target || e.srcElement;
                    if (e.type === "load" || /complete|loaded/.test(node.readyState)) {
                        _10c();
                        _10d();
                        _109 && _109();
                    }
                }, _10c = _104(node, "load", "onreadystatechange", _10b), _10d = _104(node, "error", "onerror", function (e) {
                    _10c();
                    _10d();
                    _35(_45, _f("scriptError", [url, e]));
                });
                node.type = "text/javascript";
                node.charset = "utf-8";
                node.src = url;

                _57.parentNode.insertBefore(node, _57);

                return node;
            };
        }
    }
    if (1) {
        req.log = function () {
            try {
                for (var i = 0; i < arguments.length; i++) {
                }
            } catch (e) {
            }
        };
    } else {
        req.log = _3;
    }
    if (0) {
        var _10e = req.trace = function (_10f, args) {
            if (_10e.on && _10e.group[_10f]) {
                _35("trace", [_10f, args]);
                for (var arg, dump = [], text = "trace:" + _10f + (args.length ? (":" + args[0]) : ""), i = 1; i < args.length;) {
                    arg = args[i++];
                    if (_7(arg)) {
                        text += ", " + arg;
                    } else {
                        dump.push(arg);
                    }
                }
                req.log(text);
                dump.length && dump.push(".");
                req.log.apply(req, dump);
            }
        };
        _c(_10e, {
            on: 1, group: {}, set: function (_110, _111) {
                if (_7(_110)) {
                    _10e.group[_110] = _111;
                } else {
                    _c(_10e.group, _110);
                }
            }
        });
        _10e.set(_c(_c(_c({}, _2.trace), _1.trace), _56.trace));
        on("config", function (_112) {
            _112.trace && _10e.set(_112.trace);
        });
    } else {
        req.trace = _3;
    }
    var def = function (mid, _113, _114) {
        var _115 = arguments.length, _116 = ["require", "exports", "module"], args = [0, mid, _113];
        if (_115 == 1) {
            args = [0, (_6(mid) ? _116 : []), mid];
        } else {
            if (_115 == 2 && _7(mid)) {
                args = [mid, (_6(_113) ? _116 : []), _113];
            } else {
                if (_115 == 3) {
                    args = [mid, _113, _114];
                }
            }
        }
        if (0 && args[1] === _116) {
            args[2].toString().replace(/(\/\*([\s\S]*?)\*\/|\/\/(.*)$)/mg, "").replace(/require\(["']([\w\!\-_\.\/]+)["']\)/g, function (_117, dep) {
                args[1].push(dep);
            });
        }
        req.trace("loader-define", args.slice(0, 2));
        var _118 = args[0] && _32(args[0]), _119;
        if (_118 && !_93[_118.mid]) {
            _7c(_fc(_118, args[1], args[2]));
        } else {
            if (!has("ie-event-behavior") || !1 || _f1) {
                _92.push(args);
            } else {
                _118 = _118 || _82;
                if (!_118) {
                    for (mid in _93) {
                        _119 = _30[mid];
                        if (_119 && _119.node && _119.node.readyState === "interactive") {
                            _118 = _119;
                            break;
                        }
                    }
                    if (0 && !_118) {
                        for (var i = 0; i < _7a.length; i++) {
                            _118 = _7a[i];
                            if (_118.node && _118.node.readyState === "interactive") {
                                break;
                            }
                            _118 = 0;
                        }
                    }
                }
                if (0 && _8(_118)) {
                    _7c(_fc(_32(_118.shift()), args[1], args[2]));
                    if (!_118.length) {
                        _7a.splice(i, 1);
                    }
                } else {
                    if (_118) {
                        _58(_118);
                        _7c(_fc(_118, args[1], args[2]));
                    } else {
                        _35(_45, _f("ieDefineFailed", args[0]));
                    }
                }
                _81();
            }
        }
    };
    def.amd = {vendor: "dojotoolkit.org"};
    if (0) {
        req.def = def;
    }
    _c(_c(req, _2.loaderPatch), _1.loaderPatch);
    on(_45, function (arg) {
        try {
            console.error(arg);
            if (arg instanceof Error) {
                for (var p in arg) {
                }
            }
        } catch (e) {
        }
    });
    _c(req, {uid: uid, cache: _53, packs: _50});
    if (0) {
        _c(req, {
            paths: _4e,
            aliases: _4d,
            modules: _30,
            legacyMode: _26,
            execQ: _31,
            defQ: _92,
            waiting: _93,
            packs: _50,
            mapProgs: _51,
            pathsMapProg: _4f,
            listenerQueues: _44,
            computeMapProg: _61,
            computeAliases: _63,
            runMapProg: _9a,
            compactPath: _9c,
            getModuleInfo: _a2
        });
    }
    if (_17.define) {
        if (1) {
            _35(_45, _f("defineAlreadyDefined", 0));
        }
        return;
    } else {
        _17.define = def;
        _17.require = req;
        if (0) {
            require = req;
        }
    }
    if (0 && req.combo && req.combo.plugins) {
        var _11a = req.combo.plugins, _11b;
        for (_11b in _11a) {
            _c(_c(_32(_11b), _11a[_11b]), {isCombo: 1, executed: "executed", load: 1});
        }
    }
    if (1) {
        _9(_6a, function (c) {
            _6b(c);
        });
        var _11c = _56.deps || _1.deps || _2.deps, _11d = _56.callback || _1.callback || _2.callback;
        req.boot = (_11c || _11d) ? [_11c || [], _11d] : 0;
    }
    if (!1) {
        !req.async && req(["dojo"]);
        req.boot && req.apply(null, req.boot);
    }
})(this.dojoConfig || this.djConfig || this.require || {}, {
    async: 0,
    hasCache: {
        "config-selectorEngine": "acme",
        "config-tlmSiblingOfDojo": 1,
        "dojo-built": 1,
        "dojo-loader": 1,
        dom: 1,
        "host-browser": 1
    },
    packages: [{location: "../dojox", name: "dojox"}, {location: "../dijit", name: "dijit"}, {
        location: ".",
        name: "dojo"
    }, {location: "../themes", name: "themes"}]
});
require({
    cache: {
        "dojo/dom-geometry": function () {
            define(["./sniff", "./_base/window", "./dom", "./dom-style"], function (has, win, dom, _11e) {
                var geom = {};
                geom.boxModel = "content-box";
                if (has("ie")) {
                    geom.boxModel = document.compatMode == "BackCompat" ? "border-box" : "content-box";
                }
                geom.getPadExtents = function getPadExtents(node, _11f) {
                    node = dom.byId(node);
                    var s = _11f || _11e.getComputedStyle(node), px = _11e.toPixelValue, l = px(node, s.paddingLeft), t = px(node, s.paddingTop), r = px(node, s.paddingRight), b = px(node, s.paddingBottom);
                    return {l: l, t: t, r: r, b: b, w: l + r, h: t + b};
                };
                var none = "none";
                geom.getBorderExtents = function getBorderExtents(node, _120) {
                    node = dom.byId(node);
                    var px = _11e.toPixelValue, s = _120 || _11e.getComputedStyle(node), l = s.borderLeftStyle != none ? px(node, s.borderLeftWidth) : 0, t = s.borderTopStyle != none ? px(node, s.borderTopWidth) : 0, r = s.borderRightStyle != none ? px(node, s.borderRightWidth) : 0, b = s.borderBottomStyle != none ? px(node, s.borderBottomWidth) : 0;
                    return {l: l, t: t, r: r, b: b, w: l + r, h: t + b};
                };
                geom.getPadBorderExtents = function getPadBorderExtents(node, _121) {
                    node = dom.byId(node);
                    var s = _121 || _11e.getComputedStyle(node), p = geom.getPadExtents(node, s), b = geom.getBorderExtents(node, s);
                    return {l: p.l + b.l, t: p.t + b.t, r: p.r + b.r, b: p.b + b.b, w: p.w + b.w, h: p.h + b.h};
                };
                geom.getMarginExtents = function getMarginExtents(node, _122) {
                    node = dom.byId(node);
                    var s = _122 || _11e.getComputedStyle(node), px = _11e.toPixelValue, l = px(node, s.marginLeft), t = px(node, s.marginTop), r = px(node, s.marginRight), b = px(node, s.marginBottom);
                    return {l: l, t: t, r: r, b: b, w: l + r, h: t + b};
                };
                geom.getMarginBox = function getMarginBox(node, _123) {
                    node = dom.byId(node);
                    var s = _123 || _11e.getComputedStyle(node), me = geom.getMarginExtents(node, s), l = node.offsetLeft - me.l, t = node.offsetTop - me.t, p = node.parentNode, px = _11e.toPixelValue, pcs;
                    if ((has("ie") == 8 && !has("quirks"))) {
                        if (p) {
                            pcs = _11e.getComputedStyle(p);
                            l -= pcs.borderLeftStyle != none ? px(node, pcs.borderLeftWidth) : 0;
                            t -= pcs.borderTopStyle != none ? px(node, pcs.borderTopWidth) : 0;
                        }
                    }
                    return {l: l, t: t, w: node.offsetWidth + me.w, h: node.offsetHeight + me.h};
                };
                geom.getContentBox = function getContentBox(node, _124) {
                    node = dom.byId(node);
                    var s = _124 || _11e.getComputedStyle(node), w = node.clientWidth, h, pe = geom.getPadExtents(node, s), be = geom.getBorderExtents(node, s), l = node.offsetLeft + pe.l + be.l, t = node.offsetTop + pe.t + be.t;
                    if (!w) {
                        w = node.offsetWidth - be.w;
                        h = node.offsetHeight - be.h;
                    } else {
                        h = node.clientHeight;
                    }
                    if ((has("ie") == 8 && !has("quirks"))) {
                        var p = node.parentNode, px = _11e.toPixelValue, pcs;
                        if (p) {
                            pcs = _11e.getComputedStyle(p);
                            l -= pcs.borderLeftStyle != none ? px(node, pcs.borderLeftWidth) : 0;
                            t -= pcs.borderTopStyle != none ? px(node, pcs.borderTopWidth) : 0;
                        }
                    }
                    return {l: l, t: t, w: w - pe.w, h: h - pe.h};
                };
                function _125(node, l, t, w, h, u) {
                    u = u || "px";
                    var s = node.style;
                    if (!isNaN(l)) {
                        s.left = l + u;
                    }
                    if (!isNaN(t)) {
                        s.top = t + u;
                    }
                    if (w >= 0) {
                        s.width = w + u;
                    }
                    if (h >= 0) {
                        s.height = h + u;
                    }
                };
                function _126(node) {
                    return node.tagName.toLowerCase() == "button" || node.tagName.toLowerCase() == "input" && (node.getAttribute("type") || "").toLowerCase() == "button";
                };
                function _127(node) {
                    return geom.boxModel == "border-box" || node.tagName.toLowerCase() == "table" || _126(node);
                };
                geom.setContentSize = function setContentSize(node, box, _128) {
                    node = dom.byId(node);
                    var w = box.w, h = box.h;
                    if (_127(node)) {
                        var pb = geom.getPadBorderExtents(node, _128);
                        if (w >= 0) {
                            w += pb.w;
                        }
                        if (h >= 0) {
                            h += pb.h;
                        }
                    }
                    _125(node, NaN, NaN, w, h);
                };
                var _129 = {l: 0, t: 0, w: 0, h: 0};
                geom.setMarginBox = function setMarginBox(node, box, _12a) {
                    node = dom.byId(node);
                    var s = _12a || _11e.getComputedStyle(node), w = box.w, h = box.h, pb = _127(node) ? _129 : geom.getPadBorderExtents(node, s), mb = geom.getMarginExtents(node, s);
                    if (has("webkit")) {
                        if (_126(node)) {
                            var ns = node.style;
                            if (w >= 0 && !ns.width) {
                                ns.width = "4px";
                            }
                            if (h >= 0 && !ns.height) {
                                ns.height = "4px";
                            }
                        }
                    }
                    if (w >= 0) {
                        w = Math.max(w - pb.w - mb.w, 0);
                    }
                    if (h >= 0) {
                        h = Math.max(h - pb.h - mb.h, 0);
                    }
                    _125(node, box.l, box.t, w, h);
                };
                geom.isBodyLtr = function isBodyLtr(doc) {
                    doc = doc || win.doc;
                    return (win.body(doc).dir || doc.documentElement.dir || "ltr").toLowerCase() == "ltr";
                };
                geom.docScroll = function docScroll(doc) {
                    doc = doc || win.doc;
                    var node = win.doc.parentWindow || win.doc.defaultView;
                    return "pageXOffset" in node ? {
                        x: node.pageXOffset,
                        y: node.pageYOffset
                    } : (node = has("quirks") ? win.body(doc) : doc.documentElement) && {
                        x: geom.fixIeBiDiScrollLeft(node.scrollLeft || 0, doc),
                        y: node.scrollTop || 0
                    };
                };
                geom.getIeDocumentElementOffset = function (doc) {
                    return {x: 0, y: 0};
                };
                geom.fixIeBiDiScrollLeft = function fixIeBiDiScrollLeft(_12b, doc) {
                    doc = doc || win.doc;
                    var ie = has("ie");
                    if (ie && !geom.isBodyLtr(doc)) {
                        var qk = has("quirks"), de = qk ? win.body(doc) : doc.documentElement, pwin = win.global;
                        if (ie == 6 && !qk && pwin.frameElement && de.scrollHeight > de.clientHeight) {
                            _12b += de.clientLeft;
                        }
                        return (ie < 8 || qk) ? (_12b + de.clientWidth - de.scrollWidth) : -_12b;
                    }
                    return _12b;
                };
                geom.position = function (node, _12c) {
                    node = dom.byId(node);
                    var db = win.body(node.ownerDocument), ret = node.getBoundingClientRect();
                    ret = {x: ret.left, y: ret.top, w: ret.right - ret.left, h: ret.bottom - ret.top};
                    if (has("ie") < 9) {
                        ret.x -= (has("quirks") ? db.clientLeft + db.offsetLeft : 0);
                        ret.y -= (has("quirks") ? db.clientTop + db.offsetTop : 0);
                    }
                    if (_12c) {
                        var _12d = geom.docScroll(node.ownerDocument);
                        ret.x += _12d.x;
                        ret.y += _12d.y;
                    }
                    return ret;
                };
                geom.getMarginSize = function getMarginSize(node, _12e) {
                    node = dom.byId(node);
                    var me = geom.getMarginExtents(node, _12e || _11e.getComputedStyle(node));
                    var size = node.getBoundingClientRect();
                    return {w: (size.right - size.left) + me.w, h: (size.bottom - size.top) + me.h};
                };
                geom.normalizeEvent = function (_12f) {
                    if (!("layerX" in _12f)) {
                        _12f.layerX = _12f.offsetX;
                        _12f.layerY = _12f.offsetY;
                    }
                    if (!("pageX" in _12f)) {
                        var se = _12f.target;
                        var doc = (se && se.ownerDocument) || document;
                        var _130 = has("quirks") ? doc.body : doc.documentElement;
                        _12f.pageX = _12f.clientX + geom.fixIeBiDiScrollLeft(_130.scrollLeft || 0, doc);
                        _12f.pageY = _12f.clientY + (_130.scrollTop || 0);
                    }
                };
                return geom;
            });
        }, "dojo/_base/html": function () {
            define(["./kernel", "../dom", "../dom-style", "../dom-attr", "../dom-prop", "../dom-class", "../dom-construct", "../dom-geometry"], function (dojo, dom, _131, attr, prop, cls, ctr, geom) {
                dojo.byId = dom.byId;
                dojo.isDescendant = dom.isDescendant;
                dojo.setSelectable = dom.setSelectable;
                dojo.getAttr = attr.get;
                dojo.setAttr = attr.set;
                dojo.hasAttr = attr.has;
                dojo.removeAttr = attr.remove;
                dojo.getNodeProp = attr.getNodeProp;
                dojo.attr = function (node, name, _132) {
                    if (arguments.length == 2) {
                        return attr[typeof name == "string" ? "get" : "set"](node, name);
                    }
                    return attr.set(node, name, _132);
                };
                dojo.hasClass = cls.contains;
                dojo.addClass = cls.add;
                dojo.removeClass = cls.remove;
                dojo.toggleClass = cls.toggle;
                dojo.replaceClass = cls.replace;
                dojo._toDom = dojo.toDom = ctr.toDom;
                dojo.place = ctr.place;
                dojo.create = ctr.create;
                dojo.empty = function (node) {
                    ctr.empty(node);
                };
                dojo._destroyElement = dojo.destroy = function (node) {
                    ctr.destroy(node);
                };
                dojo._getPadExtents = dojo.getPadExtents = geom.getPadExtents;
                dojo._getBorderExtents = dojo.getBorderExtents = geom.getBorderExtents;
                dojo._getPadBorderExtents = dojo.getPadBorderExtents = geom.getPadBorderExtents;
                dojo._getMarginExtents = dojo.getMarginExtents = geom.getMarginExtents;
                dojo._getMarginSize = dojo.getMarginSize = geom.getMarginSize;
                dojo._getMarginBox = dojo.getMarginBox = geom.getMarginBox;
                dojo.setMarginBox = geom.setMarginBox;
                dojo._getContentBox = dojo.getContentBox = geom.getContentBox;
                dojo.setContentSize = geom.setContentSize;
                dojo._isBodyLtr = dojo.isBodyLtr = geom.isBodyLtr;
                dojo._docScroll = dojo.docScroll = geom.docScroll;
                dojo._getIeDocumentElementOffset = dojo.getIeDocumentElementOffset = geom.getIeDocumentElementOffset;
                dojo._fixIeBiDiScrollLeft = dojo.fixIeBiDiScrollLeft = geom.fixIeBiDiScrollLeft;
                dojo.position = geom.position;
                dojo.marginBox = function marginBox(node, box) {
                    return box ? geom.setMarginBox(node, box) : geom.getMarginBox(node);
                };
                dojo.contentBox = function contentBox(node, box) {
                    return box ? geom.setContentSize(node, box) : geom.getContentBox(node);
                };
                dojo.coords = function (node, _133) {
                    dojo.deprecated("dojo.coords()", "Use dojo.position() or dojo.marginBox().");
                    node = dom.byId(node);
                    var s = _131.getComputedStyle(node), mb = geom.getMarginBox(node, s);
                    var abs = geom.position(node, _133);
                    mb.x = abs.x;
                    mb.y = abs.y;
                    return mb;
                };
                dojo.getProp = prop.get;
                dojo.setProp = prop.set;
                dojo.prop = function (node, name, _134) {
                    if (arguments.length == 2) {
                        return prop[typeof name == "string" ? "get" : "set"](node, name);
                    }
                    return prop.set(node, name, _134);
                };
                dojo.getStyle = _131.get;
                dojo.setStyle = _131.set;
                dojo.getComputedStyle = _131.getComputedStyle;
                dojo.__toPixelValue = dojo.toPixelValue = _131.toPixelValue;
                dojo.style = function (node, name, _135) {
                    switch (arguments.length) {
                        case 1:
                            return _131.get(node);
                        case 2:
                            return _131[typeof name == "string" ? "get" : "set"](node, name);
                    }
                    return _131.set(node, name, _135);
                };
                return dojo;
            });
        }, "dojo/_base/array": function () {
            define(["./kernel", "../has", "./lang"], function (dojo, has, lang) {
                var _136 = {}, u;

                function _137(fn) {
                    return _136[fn] = new Function("item", "index", "array", fn);
                };
                function _138(some) {
                    var _139 = !some;
                    return function (a, fn, o) {
                        var i = 0, l = a && a.length || 0, _13a;
                        if (l && typeof a == "string") {
                            a = a.split("");
                        }
                        if (typeof fn == "string") {
                            fn = _136[fn] || _137(fn);
                        }
                        if (o) {
                            for (; i < l; ++i) {
                                _13a = !fn.call(o, a[i], i, a);
                                if (some ^ _13a) {
                                    return !_13a;
                                }
                            }
                        } else {
                            for (; i < l; ++i) {
                                _13a = !fn(a[i], i, a);
                                if (some ^ _13a) {
                                    return !_13a;
                                }
                            }
                        }
                        return _139;
                    };
                };
                function _13b(up) {
                    var _13c = 1, _13d = 0, _13e = 0;
                    if (!up) {
                        _13c = _13d = _13e = -1;
                    }
                    return function (a, x, from, last) {
                        if (last && _13c > 0) {
                            return _13f.lastIndexOf(a, x, from);
                        }
                        var l = a && a.length || 0, end = up ? l + _13e : _13d, i;
                        if (from === u) {
                            i = up ? _13d : l + _13e;
                        } else {
                            if (from < 0) {
                                i = l + from;
                                if (i < 0) {
                                    i = _13d;
                                }
                            } else {
                                i = from >= l ? l + _13e : from;
                            }
                        }
                        if (l && typeof a == "string") {
                            a = a.split("");
                        }
                        for (; i != end; i += _13c) {
                            if (a[i] == x) {
                                return i;
                            }
                        }
                        return -1;
                    };
                };
                var _13f = {
                    every: _138(false),
                    some: _138(true),
                    indexOf: _13b(true),
                    lastIndexOf: _13b(false),
                    forEach: function (arr, _140, _141) {
                        var i = 0, l = arr && arr.length || 0;
                        if (l && typeof arr == "string") {
                            arr = arr.split("");
                        }
                        if (typeof _140 == "string") {
                            _140 = _136[_140] || _137(_140);
                        }
                        if (_141) {
                            for (; i < l; ++i) {
                                _140.call(_141, arr[i], i, arr);
                            }
                        } else {
                            for (; i < l; ++i) {
                                _140(arr[i], i, arr);
                            }
                        }
                    },
                    map: function (arr, _142, _143, Ctr) {
                        var i = 0, l = arr && arr.length || 0, out = new (Ctr || Array)(l);
                        if (l && typeof arr == "string") {
                            arr = arr.split("");
                        }
                        if (typeof _142 == "string") {
                            _142 = _136[_142] || _137(_142);
                        }
                        if (_143) {
                            for (; i < l; ++i) {
                                out[i] = _142.call(_143, arr[i], i, arr);
                            }
                        } else {
                            for (; i < l; ++i) {
                                out[i] = _142(arr[i], i, arr);
                            }
                        }
                        return out;
                    },
                    filter: function (arr, _144, _145) {
                        var i = 0, l = arr && arr.length || 0, out = [], _146;
                        if (l && typeof arr == "string") {
                            arr = arr.split("");
                        }
                        if (typeof _144 == "string") {
                            _144 = _136[_144] || _137(_144);
                        }
                        if (_145) {
                            for (; i < l; ++i) {
                                _146 = arr[i];
                                if (_144.call(_145, _146, i, arr)) {
                                    out.push(_146);
                                }
                            }
                        } else {
                            for (; i < l; ++i) {
                                _146 = arr[i];
                                if (_144(_146, i, arr)) {
                                    out.push(_146);
                                }
                            }
                        }
                        return out;
                    },
                    clearCache: function () {
                        _136 = {};
                    }
                };
                1 && lang.mixin(dojo, _13f);
                return _13f;
            });
        }, "dojo/_base/Deferred": function () {
            define(["./kernel", "../Deferred", "../promise/Promise", "../errors/CancelError", "../has", "./lang", "../when"], function (dojo, _147, _148, _149, has, lang, when) {
                var _14a = function () {
                };
                var _14b = Object.freeze || function () {
                    };
                var _14c = dojo.Deferred = function (_14d) {
                    var _14e, _14f, _150, _151, _152, head, _153;
                    var _154 = (this.promise = new _148());

                    function _155(_156) {
                        if (_14f) {
                            throw new Error("This deferred has already been resolved");
                        }
                        _14e = _156;
                        _14f = true;
                        _157();
                    };
                    function _157() {
                        var _158;
                        while (!_158 && _153) {
                            var _159 = _153;
                            _153 = _153.next;
                            if ((_158 = (_159.progress == _14a))) {
                                _14f = false;
                            }
                            var func = (_152 ? _159.error : _159.resolved);
                            if (has("config-useDeferredInstrumentation")) {
                                if (_152 && _147.instrumentRejected) {
                                    _147.instrumentRejected(_14e, !!func);
                                }
                            }
                            if (func) {
                                try {
                                    var _15a = func(_14e);
                                    if (_15a && typeof _15a.then === "function") {
                                        _15a.then(lang.hitch(_159.deferred, "resolve"), lang.hitch(_159.deferred, "reject"), lang.hitch(_159.deferred, "progress"));
                                        continue;
                                    }
                                    var _15b = _158 && _15a === undefined;
                                    if (_158 && !_15b) {
                                        _152 = _15a instanceof Error;
                                    }
                                    _159.deferred[_15b && _152 ? "reject" : "resolve"](_15b ? _14e : _15a);
                                } catch (e) {
                                    _159.deferred.reject(e);
                                }
                            } else {
                                if (_152) {
                                    _159.deferred.reject(_14e);
                                } else {
                                    _159.deferred.resolve(_14e);
                                }
                            }
                        }
                    };
                    this.isResolved = _154.isResolved = function () {
                        return _151 == 0;
                    };
                    this.isRejected = _154.isRejected = function () {
                        return _151 == 1;
                    };
                    this.isFulfilled = _154.isFulfilled = function () {
                        return _151 >= 0;
                    };
                    this.isCanceled = _154.isCanceled = function () {
                        return _150;
                    };
                    this.resolve = this.callback = function (_15c) {
                        this.fired = _151 = 0;
                        this.results = [_15c, null];
                        _155(_15c);
                    };
                    this.reject = this.errback = function (_15d) {
                        _152 = true;
                        this.fired = _151 = 1;
                        if (has("config-useDeferredInstrumentation")) {
                            if (_147.instrumentRejected) {
                                _147.instrumentRejected(_15d, !!_153);
                            }
                        }
                        _155(_15d);
                        this.results = [null, _15d];
                    };
                    this.progress = function (_15e) {
                        var _15f = _153;
                        while (_15f) {
                            var _160 = _15f.progress;
                            _160 && _160(_15e);
                            _15f = _15f.next;
                        }
                    };
                    this.addCallbacks = function (_161, _162) {
                        this.then(_161, _162, _14a);
                        return this;
                    };
                    _154.then = this.then = function (_163, _164, _165) {
                        var _166 = _165 == _14a ? this : new _14c(_154.cancel);
                        var _167 = {resolved: _163, error: _164, progress: _165, deferred: _166};
                        if (_153) {
                            head = head.next = _167;
                        } else {
                            _153 = head = _167;
                        }
                        if (_14f) {
                            _157();
                        }
                        return _166.promise;
                    };
                    var _168 = this;
                    _154.cancel = this.cancel = function () {
                        if (!_14f) {
                            var _169 = _14d && _14d(_168);
                            if (!_14f) {
                                if (!(_169 instanceof Error)) {
                                    _169 = new _149(_169);
                                }
                                _169.log = false;
                                _168.reject(_169);
                            }
                        }
                        _150 = true;
                    };
                    _14b(_154);
                };
                lang.extend(_14c, {
                    addCallback: function (_16a) {
                        return this.addCallbacks(lang.hitch.apply(dojo, arguments));
                    }, addErrback: function (_16b) {
                        return this.addCallbacks(null, lang.hitch.apply(dojo, arguments));
                    }, addBoth: function (_16c) {
                        var _16d = lang.hitch.apply(dojo, arguments);
                        return this.addCallbacks(_16d, _16d);
                    }, fired: -1
                });
                _14c.when = dojo.when = when;
                return _14c;
            });
        }, "dojo/request/watch": function () {
            define(["./util", "../errors/RequestTimeoutError", "../errors/CancelError", "../_base/array", "../_base/window", "../has!host-browser?dom-addeventlistener?:../on:"], function (util, _16e, _16f, _170, win, on) {
                var _171 = null, _172 = [];

                function _173() {
                    var now = +(new Date);
                    for (var i = 0, dfd; i < _172.length && (dfd = _172[i]); i++) {
                        var _174 = dfd.response, _175 = _174.options;
                        if ((dfd.isCanceled && dfd.isCanceled()) || (dfd.isValid && !dfd.isValid(_174))) {
                            _172.splice(i--, 1);
                            _176._onAction && _176._onAction();
                        } else {
                            if (dfd.isReady && dfd.isReady(_174)) {
                                _172.splice(i--, 1);
                                dfd.handleResponse(_174);
                                _176._onAction && _176._onAction();
                            } else {
                                if (dfd.startTime) {
                                    if (dfd.startTime + (_175.timeout || 0) < now) {
                                        _172.splice(i--, 1);
                                        dfd.cancel(new _16e("Timeout exceeded", _174));
                                        _176._onAction && _176._onAction();
                                    }
                                }
                            }
                        }
                    }
                    _176._onInFlight && _176._onInFlight(dfd);
                    if (!_172.length) {
                        clearInterval(_171);
                        _171 = null;
                    }
                };
                function _176(dfd) {
                    if (dfd.response.options.timeout) {
                        dfd.startTime = +(new Date);
                    }
                    if (dfd.isFulfilled()) {
                        return;
                    }
                    _172.push(dfd);
                    if (!_171) {
                        _171 = setInterval(_173, 50);
                    }
                    if (dfd.response.options.sync) {
                        _173();
                    }
                };
                _176.cancelAll = function cancelAll() {
                    try {
                        _170.forEach(_172, function (dfd) {
                            try {
                                dfd.cancel(new _16f("All requests canceled."));
                            } catch (e) {
                            }
                        });
                    } catch (e) {
                    }
                };
                if (win && on && win.doc.attachEvent) {
                    on(win.global, "unload", function () {
                        _176.cancelAll();
                    });
                }
                return _176;
            });
        }, "dojo/uacss": function () {
            define(["./dom-geometry", "./_base/lang", "./domReady", "./sniff", "./_base/window"], function (_177, lang, _178, has, _179) {
                var html = _179.doc.documentElement, ie = has("ie"), _17a = has("trident"), _17b = has("opera"), maj = Math.floor, ff = has("ff"), _17c = _177.boxModel.replace(/-/, ""), _17d = {
                    "dj_quirks": has("quirks"),
                    "dj_opera": _17b,
                    "dj_khtml": has("khtml"),
                    "dj_webkit": has("webkit"),
                    "dj_safari": has("safari"),
                    "dj_chrome": has("chrome"),
                    "dj_edge": has("edge"),
                    "dj_gecko": has("mozilla"),
                    "dj_ios": has("ios"),
                    "dj_android": has("android")
                };
                if (ie) {
                    _17d["dj_ie"] = true;
                    _17d["dj_ie" + maj(ie)] = true;
                    _17d["dj_iequirks"] = has("quirks");
                }
                if (_17a) {
                    _17d["dj_trident"] = true;
                    _17d["dj_trident" + maj(_17a)] = true;
                }
                if (ff) {
                    _17d["dj_ff" + maj(ff)] = true;
                }
                _17d["dj_" + _17c] = true;
                var _17e = "";
                for (var clz in _17d) {
                    if (_17d[clz]) {
                        _17e += clz + " ";
                    }
                }
                html.className = lang.trim(html.className + " " + _17e);
                _178(function () {
                    if (!_177.isBodyLtr()) {
                        var _17f = "dj_rtl dijitRtl " + _17e.replace(/ /g, "-rtl ");
                        html.className = lang.trim(html.className + " " + _17f + "dj_rtl dijitRtl " + _17e.replace(/ /g, "-rtl "));
                    }
                });
                return has;
            });
        }, "dojo/dom": function () {
            define(["./sniff", "./_base/window", "./_base/kernel"], function (has, win, _180) {
                if (has("ie") <= 7) {
                    try {
                        document.execCommand("BackgroundImageCache", false, true);
                    } catch (e) {
                    }
                }
                var dom = {};
                if (has("ie")) {
                    dom.byId = function (id, doc) {
                        if (typeof id != "string") {
                            return id;
                        }
                        var _181 = doc || win.doc, te = id && _181.getElementById(id);
                        if (te && (te.attributes.id.value == id || te.id == id)) {
                            return te;
                        } else {
                            var eles = _181.all[id];
                            if (!eles || eles.nodeName) {
                                eles = [eles];
                            }
                            var i = 0;
                            while ((te = eles[i++])) {
                                if ((te.attributes && te.attributes.id && te.attributes.id.value == id) || te.id == id) {
                                    return te;
                                }
                            }
                        }
                    };
                } else {
                    dom.byId = function (id, doc) {
                        return ((typeof id == "string") ? (doc || win.doc).getElementById(id) : id) || null;
                    };
                }
                var doc = _180.global["document"] || null;
                has.add("dom-contains", !!(doc && doc.contains));
                dom.isDescendant = has("dom-contains") ? function (node, _182) {
                    return !!((_182 = dom.byId(_182)) && _182.contains(dom.byId(node)));
                } : function (node, _183) {
                    try {
                        node = dom.byId(node);
                        _183 = dom.byId(_183);
                        while (node) {
                            if (node == _183) {
                                return true;
                            }
                            node = node.parentNode;
                        }
                    } catch (e) {
                    }
                    return false;
                };
                has.add("css-user-select", function (_184, doc, _185) {
                    if (!_185) {
                        return false;
                    }
                    var _186 = _185.style;
                    var _187 = ["Khtml", "O", "Moz", "Webkit"], i = _187.length, name = "userSelect", _188;
                    do {
                        if (typeof _186[name] !== "undefined") {
                            return name;
                        }
                    } while (i-- && (name = _187[i] + "UserSelect"));
                    return false;
                });
                var _189 = has("css-user-select");
                dom.setSelectable = _189 ? function (node, _18a) {
                    dom.byId(node).style[_189] = _18a ? "" : "none";
                } : function (node, _18b) {
                    node = dom.byId(node);
                    var _18c = node.getElementsByTagName("*"), i = _18c.length;
                    if (_18b) {
                        node.removeAttribute("unselectable");
                        while (i--) {
                            _18c[i].removeAttribute("unselectable");
                        }
                    } else {
                        node.setAttribute("unselectable", "on");
                        while (i--) {
                            _18c[i].setAttribute("unselectable", "on");
                        }
                    }
                };
                return dom;
            });
        }, "dojo/text": function () {
            define(["./_base/kernel", "require", "./has", "./request"], function (dojo, _18d, has, _18e) {
                var _18f;
                if (1) {
                    _18f = function (url, sync, load) {
                        _18e(url, {sync: !!sync, headers: {"X-Requested-With": null}}).then(load);
                    };
                } else {
                    if (_18d.getText) {
                        _18f = _18d.getText;
                    } else {
                        console.error("dojo/text plugin failed to load because loader does not support getText");
                    }
                }
                var _190 = {}, _191 = function (text) {
                    if (text) {
                        text = text.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im, "");
                        var _192 = text.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
                        if (_192) {
                            text = _192[1];
                        }
                    } else {
                        text = "";
                    }
                    return text;
                }, _193 = {}, _194 = {};
                dojo.cache = function (_195, url, _196) {
                    var key;
                    if (typeof _195 == "string") {
                        if (/\//.test(_195)) {
                            key = _195;
                            _196 = url;
                        } else {
                            key = _18d.toUrl(_195.replace(/\./g, "/") + (url ? ("/" + url) : ""));
                        }
                    } else {
                        key = _195 + "";
                        _196 = url;
                    }
                    var val = (_196 != undefined && typeof _196 != "string") ? _196.value : _196, _197 = _196 && _196.sanitize;
                    if (typeof val == "string") {
                        _190[key] = val;
                        return _197 ? _191(val) : val;
                    } else {
                        if (val === null) {
                            delete _190[key];
                            return null;
                        } else {
                            if (!(key in _190)) {
                                _18f(key, true, function (text) {
                                    _190[key] = text;
                                });
                            }
                            return _197 ? _191(_190[key]) : _190[key];
                        }
                    }
                };
                return {
                    dynamic: true, normalize: function (id, _198) {
                        var _199 = id.split("!"), url = _199[0];
                        return (/^\./.test(url) ? _198(url) : url) + (_199[1] ? "!" + _199[1] : "");
                    }, load: function (id, _19a, load) {
                        var _19b = id.split("!"), _19c = _19b.length > 1, _19d = _19b[0], url = _19a.toUrl(_19b[0]), _19e = "url:" + url, text = _193, _19f = function (text) {
                            load(_19c ? _191(text) : text);
                        };
                        if (_19d in _190) {
                            text = _190[_19d];
                        } else {
                            if (_19a.cache && _19e in _19a.cache) {
                                text = _19a.cache[_19e];
                            } else {
                                if (url in _190) {
                                    text = _190[url];
                                }
                            }
                        }
                        if (text === _193) {
                            if (_194[url]) {
                                _194[url].push(_19f);
                            } else {
                                var _1a0 = _194[url] = [_19f];
                                _18f(url, !_19a.async, function (text) {
                                    _190[_19d] = _190[url] = text;
                                    for (var i = 0; i < _1a0.length;) {
                                        _1a0[i++](text);
                                    }
                                    delete _194[url];
                                });
                            }
                        } else {
                            _19f(text);
                        }
                    }
                };
            });
        }, "dojo/dom-style": function () {
            define(["./sniff", "./dom", "./_base/window"], function (has, dom, win) {
                var _1a1, _1a2 = {};
                if (has("webkit")) {
                    _1a1 = function (node) {
                        var s;
                        if (node.nodeType == 1) {
                            var dv = node.ownerDocument.defaultView;
                            s = dv.getComputedStyle(node, null);
                            if (!s && node.style) {
                                node.style.display = "";
                                s = dv.getComputedStyle(node, null);
                            }
                        }
                        return s || {};
                    };
                } else {
                    if (has("ie") && (has("ie") < 9 || has("quirks"))) {
                        _1a1 = function (node) {
                            return node.nodeType == 1 && node.currentStyle ? node.currentStyle : {};
                        };
                    } else {
                        _1a1 = function (node) {
                            var dv = node.ownerDocument.defaultView, w = dv.opener ? dv : win.global.window.parent;
                            return node.nodeType == 1 ? w.getComputedStyle(node, null) : {};
                        };
                    }
                }
                _1a2.getComputedStyle = _1a1;
                var _1a3;
                if (!has("ie")) {
                    _1a3 = function (_1a4, _1a5) {
                        return parseFloat(_1a5) || 0;
                    };
                } else {
                    _1a3 = function (_1a6, _1a7) {
                        if (!_1a7) {
                            return 0;
                        }
                        if (_1a7 == "medium") {
                            return 4;
                        }
                        if (_1a7.slice && _1a7.slice(-2) == "px") {
                            return parseFloat(_1a7);
                        }
                        var s = _1a6.style, rs = _1a6.runtimeStyle, cs = _1a6.currentStyle, _1a8 = s.left, _1a9 = rs.left;
                        rs.left = cs.left;
                        try {
                            s.left = _1a7;
                            _1a7 = s.pixelLeft;
                        } catch (e) {
                            _1a7 = 0;
                        }
                        s.left = _1a8;
                        rs.left = _1a9;
                        return _1a7;
                    };
                }
                _1a2.toPixelValue = _1a3;
                var astr = "DXImageTransform.Microsoft.Alpha";
                var af = function (n, f) {
                    try {
                        return n.filters.item(astr);
                    } catch (e) {
                        return f ? {} : null;
                    }
                };
                var _1aa = has("ie") < 9 || (has("ie") < 10 && has("quirks")) ? function (node) {
                    try {
                        return af(node).Opacity / 100;
                    } catch (e) {
                        return 1;
                    }
                } : function (node) {
                    return _1a1(node).opacity;
                };
                var _1ab = has("ie") < 9 || (has("ie") < 10 && has("quirks")) ? function (node, _1ac) {
                    if (_1ac === "") {
                        _1ac = 1;
                    }
                    var ov = _1ac * 100, _1ad = _1ac === 1;
                    if (_1ad) {
                        node.style.zoom = "";
                        if (af(node)) {
                            node.style.filter = node.style.filter.replace(new RegExp("\\s*progid:" + astr + "\\([^\\)]+?\\)", "i"), "");
                        }
                    } else {
                        node.style.zoom = 1;
                        if (af(node)) {
                            af(node, 1).Opacity = ov;
                        } else {
                            node.style.filter += " progid:" + astr + "(Opacity=" + ov + ")";
                        }
                        af(node, 1).Enabled = true;
                    }
                    if (node.tagName.toLowerCase() == "tr") {
                        for (var td = node.firstChild; td; td = td.nextSibling) {
                            if (td.tagName.toLowerCase() == "td") {
                                _1ab(td, _1ac);
                            }
                        }
                    }
                    return _1ac;
                } : function (node, _1ae) {
                    return node.style.opacity = _1ae;
                };
                var _1af = {left: true, top: true};
                var _1b0 = /margin|padding|width|height|max|min|offset/;

                function _1b1(node, type, _1b2) {
                    type = type.toLowerCase();
                    if (_1b2 == "auto") {
                        if (type == "height") {
                            return node.offsetHeight;
                        }
                        if (type == "width") {
                            return node.offsetWidth;
                        }
                    }
                    if (type == "fontweight") {
                        switch (_1b2) {
                            case 700:
                                return "bold";
                            case 400:
                            default:
                                return "normal";
                        }
                    }
                    if (!(type in _1af)) {
                        _1af[type] = _1b0.test(type);
                    }
                    return _1af[type] ? _1a3(node, _1b2) : _1b2;
                };
                var _1b3 = {cssFloat: 1, styleFloat: 1, "float": 1};
                _1a2.get = function getStyle(node, name) {
                    var n = dom.byId(node), l = arguments.length, op = (name == "opacity");
                    if (l == 2 && op) {
                        return _1aa(n);
                    }
                    name = _1b3[name] ? "cssFloat" in n.style ? "cssFloat" : "styleFloat" : name;
                    var s = _1a2.getComputedStyle(n);
                    return (l == 1) ? s : _1b1(n, name, s[name] || n.style[name]);
                };
                _1a2.set = function setStyle(node, name, _1b4) {
                    var n = dom.byId(node), l = arguments.length, op = (name == "opacity");
                    name = _1b3[name] ? "cssFloat" in n.style ? "cssFloat" : "styleFloat" : name;
                    if (l == 3) {
                        return op ? _1ab(n, _1b4) : n.style[name] = _1b4;
                    }
                    for (var x in name) {
                        _1a2.set(node, x, name[x]);
                    }
                    return _1a2.getComputedStyle(n);
                };
                return _1a2;
            });
        }, "dijit/hccss": function () {
            define(["dojo/dom-class", "dojo/hccss", "dojo/domReady", "dojo/_base/window"], function (_1b5, has, _1b6, win) {
                _1b6(function () {
                    if (has("highcontrast")) {
                        _1b5.add(win.body(), "dijit_a11y");
                    }
                });
                return has;
            });
        }, "dojo/dom-form": function () {
            define(["./_base/lang", "./dom", "./io-query", "./json"], function (lang, dom, ioq, json) {
                function _1b7(obj, name, _1b8) {
                    if (_1b8 === null) {
                        return;
                    }
                    var val = obj[name];
                    if (typeof val == "string") {
                        obj[name] = [val, _1b8];
                    } else {
                        if (lang.isArray(val)) {
                            val.push(_1b8);
                        } else {
                            obj[name] = _1b8;
                        }
                    }
                };
                var _1b9 = "file|submit|image|reset|button";
                var form = {
                    fieldToObject: function fieldToObject(_1ba) {
                        var ret = null;
                        _1ba = dom.byId(_1ba);
                        if (_1ba) {
                            var _1bb = _1ba.name, type = (_1ba.type || "").toLowerCase();
                            if (_1bb && type && !_1ba.disabled) {
                                if (type == "radio" || type == "checkbox") {
                                    if (_1ba.checked) {
                                        ret = _1ba.value;
                                    }
                                } else {
                                    if (_1ba.multiple) {
                                        ret = [];
                                        var _1bc = [_1ba.firstChild];
                                        while (_1bc.length) {
                                            for (var node = _1bc.pop(); node; node = node.nextSibling) {
                                                if (node.nodeType == 1 && node.tagName.toLowerCase() == "option") {
                                                    if (node.selected) {
                                                        ret.push(node.value);
                                                    }
                                                } else {
                                                    if (node.nextSibling) {
                                                        _1bc.push(node.nextSibling);
                                                    }
                                                    if (node.firstChild) {
                                                        _1bc.push(node.firstChild);
                                                    }
                                                    break;
                                                }
                                            }
                                        }
                                    } else {
                                        ret = _1ba.value;
                                    }
                                }
                            }
                        }
                        return ret;
                    }, toObject: function formToObject(_1bd) {
                        var ret = {}, _1be = dom.byId(_1bd).elements;
                        for (var i = 0, l = _1be.length; i < l; ++i) {
                            var item = _1be[i], _1bf = item.name, type = (item.type || "").toLowerCase();
                            if (_1bf && type && _1b9.indexOf(type) < 0 && !item.disabled) {
                                _1b7(ret, _1bf, form.fieldToObject(item));
                                if (type == "image") {
                                    ret[_1bf + ".x"] = ret[_1bf + ".y"] = ret[_1bf].x = ret[_1bf].y = 0;
                                }
                            }
                        }
                        return ret;
                    }, toQuery: function formToQuery(_1c0) {
                        return ioq.objectToQuery(form.toObject(_1c0));
                    }, toJson: function formToJson(_1c1, _1c2) {
                        return json.stringify(form.toObject(_1c1), null, _1c2 ? 4 : 0);
                    }
                };
                return form;
            });
        }, "dojo/request/default": function () {
            define(["exports", "require", "../has"], function (_1c3, _1c4, has) {
                var _1c5 = has("config-requestProvider"), _1c6;
                if (1 || has("host-webworker")) {
                    _1c6 = "./xhr";
                } else {
                    if (0) {
                        _1c6 = "./node";
                    }
                }
                if (!_1c5) {
                    _1c5 = _1c6;
                }
                _1c3.getPlatformDefaultId = function () {
                    return _1c6;
                };
                _1c3.load = function (id, _1c7, _1c8, _1c9) {
                    _1c4([id == "platform" ? _1c6 : _1c5], function (_1ca) {
                        _1c8(_1ca);
                    });
                };
            });
        }, "dojo/parser": function () {
            define(["require", "./_base/kernel", "./_base/lang", "./_base/array", "./_base/config", "./dom", "./_base/window", "./_base/url", "./aspect", "./promise/all", "./date/stamp", "./Deferred", "./has", "./query", "./on", "./ready"], function (_1cb, dojo, _1cc, _1cd, _1ce, dom, _1cf, _1d0, _1d1, all, _1d2, _1d3, has, _1d4, don, _1d5) {
                new Date("X");
                function _1d6(text) {
                    return eval("(" + text + ")");
                };
                var _1d7 = 0;
                _1d1.after(_1cc, "extend", function () {
                    _1d7++;
                }, true);
                function _1d8(ctor) {
                    var map = ctor._nameCaseMap, _1d9 = ctor.prototype;
                    if (!map || map._extendCnt < _1d7) {
                        map = ctor._nameCaseMap = {};
                        for (var name in _1d9) {
                            if (name.charAt(0) === "_") {
                                continue;
                            }
                            map[name.toLowerCase()] = name;
                        }
                        map._extendCnt = _1d7;
                    }
                    return map;
                };
                function _1da(_1db, _1dc) {
                    if (!_1dc) {
                        _1dc = _1cb;
                    }
                    var _1dd = _1dc._dojoParserCtorMap || (_1dc._dojoParserCtorMap = {});
                    var ts = _1db.join();
                    if (!_1dd[ts]) {
                        var _1de = [];
                        for (var i = 0, l = _1db.length; i < l; i++) {
                            var t = _1db[i];
                            _1de[_1de.length] = (_1dd[t] = _1dd[t] || (_1cc.getObject(t) || (~t.indexOf("/") && _1dc(t))));
                        }
                        var ctor = _1de.shift();
                        _1dd[ts] = _1de.length ? (ctor.createSubclass ? ctor.createSubclass(_1de) : ctor.extend.apply(ctor, _1de)) : ctor;
                    }
                    return _1dd[ts];
                };
                var _1df = {
                    _clearCache: function () {
                        _1d7++;
                        _ctorMap = {};
                    }, _functionFromScript: function (_1e0, _1e1) {
                        var _1e2 = "", _1e3 = "", _1e4 = (_1e0.getAttribute(_1e1 + "args") || _1e0.getAttribute("args")), _1e5 = _1e0.getAttribute("with");
                        var _1e6 = (_1e4 || "").split(/\s*,\s*/);
                        if (_1e5 && _1e5.length) {
                            _1cd.forEach(_1e5.split(/\s*,\s*/), function (part) {
                                _1e2 += "with(" + part + "){";
                                _1e3 += "}";
                            });
                        }
                        return new Function(_1e6, _1e2 + _1e0.innerHTML + _1e3);
                    }, instantiate: function (_1e7, _1e8, _1e9) {
                        _1e8 = _1e8 || {};
                        _1e9 = _1e9 || {};
                        var _1ea = (_1e9.scope || dojo._scopeName) + "Type", _1eb = "data-" + (_1e9.scope || dojo._scopeName) + "-", _1ec = _1eb + "type", _1ed = _1eb + "mixins";
                        var list = [];
                        _1cd.forEach(_1e7, function (node) {
                            var type = _1ea in _1e8 ? _1e8[_1ea] : node.getAttribute(_1ec) || node.getAttribute(_1ea);
                            if (type) {
                                var _1ee = node.getAttribute(_1ed), _1ef = _1ee ? [type].concat(_1ee.split(/\s*,\s*/)) : [type];
                                list.push({node: node, types: _1ef});
                            }
                        });
                        return this._instantiate(list, _1e8, _1e9);
                    }, _instantiate: function (_1f0, _1f1, _1f2, _1f3) {
                        var _1f4 = _1cd.map(_1f0, function (obj) {
                            var ctor = obj.ctor || _1da(obj.types, _1f2.contextRequire);
                            if (!ctor) {
                                throw new Error("Unable to resolve constructor for: '" + obj.types.join() + "'");
                            }
                            return this.construct(ctor, obj.node, _1f1, _1f2, obj.scripts, obj.inherited);
                        }, this);

                        function _1f5(_1f6) {
                            if (!_1f1._started && !_1f2.noStart) {
                                _1cd.forEach(_1f6, function (_1f7) {
                                    if (typeof _1f7.startup === "function" && !_1f7._started) {
                                        _1f7.startup();
                                    }
                                });
                            }
                            return _1f6;
                        };
                        if (_1f3) {
                            return all(_1f4).then(_1f5);
                        } else {
                            return _1f5(_1f4);
                        }
                    }, construct: function (ctor, node, _1f8, _1f9, _1fa, _1fb) {
                        var _1fc = ctor && ctor.prototype;
                        _1f9 = _1f9 || {};
                        var _1fd = {};
                        if (_1f9.defaults) {
                            _1cc.mixin(_1fd, _1f9.defaults);
                        }
                        if (_1fb) {
                            _1cc.mixin(_1fd, _1fb);
                        }
                        var _1fe;
                        if (has("dom-attributes-explicit")) {
                            _1fe = node.attributes;
                        } else {
                            if (has("dom-attributes-specified-flag")) {
                                _1fe = _1cd.filter(node.attributes, function (a) {
                                    return a.specified;
                                });
                            } else {
                                var _1ff = /^input$|^img$/i.test(node.nodeName) ? node : node.cloneNode(false), _200 = _1ff.outerHTML.replace(/=[^\s"']+|="[^"]*"|='[^']*'/g, "").replace(/^\s*<[a-zA-Z0-9]*\s*/, "").replace(/\s*>.*$/, "");
                                _1fe = _1cd.map(_200.split(/\s+/), function (name) {
                                    var _201 = name.toLowerCase();
                                    return {
                                        name: name,
                                        value: (node.nodeName == "LI" && name == "value") || _201 == "enctype" ? node.getAttribute(_201) : node.getAttributeNode(_201).value
                                    };
                                });
                            }
                        }
                        var _202 = _1f9.scope || dojo._scopeName, _203 = "data-" + _202 + "-", hash = {};
                        if (_202 !== "dojo") {
                            hash[_203 + "props"] = "data-dojo-props";
                            hash[_203 + "type"] = "data-dojo-type";
                            hash[_203 + "mixins"] = "data-dojo-mixins";
                            hash[_202 + "type"] = "dojotype";
                            hash[_203 + "id"] = "data-dojo-id";
                        }
                        var i = 0, item, _204 = [], _205, _206;
                        while (item = _1fe[i++]) {
                            var name = item.name, _207 = name.toLowerCase(), _208 = item.value;
                            switch (hash[_207] || _207) {
                                case "data-dojo-type":
                                case "dojotype":
                                case "data-dojo-mixins":
                                    break;
                                case "data-dojo-props":
                                    _206 = _208;
                                    break;
                                case "data-dojo-id":
                                case "jsid":
                                    _205 = _208;
                                    break;
                                case "data-dojo-attach-point":
                                case "dojoattachpoint":
                                    _1fd.dojoAttachPoint = _208;
                                    break;
                                case "data-dojo-attach-event":
                                case "dojoattachevent":
                                    _1fd.dojoAttachEvent = _208;
                                    break;
                                case "class":
                                    _1fd["class"] = node.className;
                                    break;
                                case "style":
                                    _1fd["style"] = node.style && node.style.cssText;
                                    break;
                                default:
                                    if (!(name in _1fc)) {
                                        var map = _1d8(ctor);
                                        name = map[_207] || name;
                                    }
                                    if (name in _1fc) {
                                        switch (typeof _1fc[name]) {
                                            case "string":
                                                _1fd[name] = _208;
                                                break;
                                            case "number":
                                                _1fd[name] = _208.length ? Number(_208) : NaN;
                                                break;
                                            case "boolean":
                                                _1fd[name] = _208.toLowerCase() != "false";
                                                break;
                                            case "function":
                                                if (_208 === "" || _208.search(/[^\w\.]+/i) != -1) {
                                                    _1fd[name] = new Function(_208);
                                                } else {
                                                    _1fd[name] = _1cc.getObject(_208, false) || new Function(_208);
                                                }
                                                _204.push(name);
                                                break;
                                            default:
                                                var pVal = _1fc[name];
                                                _1fd[name] = (pVal && "length" in pVal) ? (_208 ? _208.split(/\s*,\s*/) : []) : (pVal instanceof Date) ? (_208 == "" ? new Date("") : _208 == "now" ? new Date() : _1d2.fromISOString(_208)) : (pVal instanceof _1d0) ? (dojo.baseUrl + _208) : _1d6(_208);
                                        }
                                    } else {
                                        _1fd[name] = _208;
                                    }
                            }
                        }
                        for (var j = 0; j < _204.length; j++) {
                            var _209 = _204[j].toLowerCase();
                            node.removeAttribute(_209);
                            node[_209] = null;
                        }
                        if (_206) {
                            try {
                                _206 = _1d6.call(_1f9.propsThis, "{" + _206 + "}");
                                _1cc.mixin(_1fd, _206);
                            } catch (e) {
                                throw new Error(e.toString() + " in data-dojo-props='" + _206 + "'");
                            }
                        }
                        _1cc.mixin(_1fd, _1f8);
                        if (!_1fa) {
                            _1fa = (ctor && (ctor._noScript || _1fc._noScript) ? [] : _1d4("> script[type^='dojo/']", node));
                        }
                        var _20a = [], _20b = [], _20c = [], ons = [];
                        if (_1fa) {
                            for (i = 0; i < _1fa.length; i++) {
                                var _20d = _1fa[i];
                                node.removeChild(_20d);
                                var _20e = (_20d.getAttribute(_203 + "event") || _20d.getAttribute("event")), prop = _20d.getAttribute(_203 + "prop"), _20f = _20d.getAttribute(_203 + "method"), _210 = _20d.getAttribute(_203 + "advice"), _211 = _20d.getAttribute("type"), nf = this._functionFromScript(_20d, _203);
                                if (_20e) {
                                    if (_211 == "dojo/connect") {
                                        _20a.push({method: _20e, func: nf});
                                    } else {
                                        if (_211 == "dojo/on") {
                                            ons.push({event: _20e, func: nf});
                                        } else {
                                            _1fd[_20e] = nf;
                                        }
                                    }
                                } else {
                                    if (_211 == "dojo/aspect") {
                                        _20a.push({method: _20f, advice: _210, func: nf});
                                    } else {
                                        if (_211 == "dojo/watch") {
                                            _20c.push({prop: prop, func: nf});
                                        } else {
                                            _20b.push(nf);
                                        }
                                    }
                                }
                            }
                        }
                        var _212 = ctor.markupFactory || _1fc.markupFactory;
                        var _213 = _212 ? _212(_1fd, node, ctor) : new ctor(_1fd, node);

                        function _214(_215) {
                            if (_205) {
                                _1cc.setObject(_205, _215);
                            }
                            for (i = 0; i < _20a.length; i++) {
                                _1d1[_20a[i].advice || "after"](_215, _20a[i].method, _1cc.hitch(_215, _20a[i].func), true);
                            }
                            for (i = 0; i < _20b.length; i++) {
                                _20b[i].call(_215);
                            }
                            for (i = 0; i < _20c.length; i++) {
                                _215.watch(_20c[i].prop, _20c[i].func);
                            }
                            for (i = 0; i < ons.length; i++) {
                                don(_215, ons[i].event, ons[i].func);
                            }
                            return _215;
                        };
                        if (_213.then) {
                            return _213.then(_214);
                        } else {
                            return _214(_213);
                        }
                    }, scan: function (root, _216) {
                        var list = [], mids = [], _217 = {};
                        var _218 = (_216.scope || dojo._scopeName) + "Type", _219 = "data-" + (_216.scope || dojo._scopeName) + "-", _21a = _219 + "type", _21b = _219 + "textdir", _21c = _219 + "mixins";
                        var node = root.firstChild;
                        var _21d = _216.inherited;
                        if (!_21d) {
                            function _21e(node, attr) {
                                return (node.getAttribute && node.getAttribute(attr)) || (node.parentNode && _21e(node.parentNode, attr));
                            };
                            _21d = {dir: _21e(root, "dir"), lang: _21e(root, "lang"), textDir: _21e(root, _21b)};
                            for (var key in _21d) {
                                if (!_21d[key]) {
                                    delete _21d[key];
                                }
                            }
                        }
                        var _21f = {inherited: _21d};
                        var _220;
                        var _221;

                        function _222(_223) {
                            if (!_223.inherited) {
                                _223.inherited = {};
                                var node = _223.node, _224 = _222(_223.parent);
                                var _225 = {
                                    dir: node.getAttribute("dir") || _224.dir,
                                    lang: node.getAttribute("lang") || _224.lang,
                                    textDir: node.getAttribute(_21b) || _224.textDir
                                };
                                for (var key in _225) {
                                    if (_225[key]) {
                                        _223.inherited[key] = _225[key];
                                    }
                                }
                            }
                            return _223.inherited;
                        };
                        while (true) {
                            if (!node) {
                                if (!_21f || !_21f.node) {
                                    break;
                                }
                                node = _21f.node.nextSibling;
                                _221 = false;
                                _21f = _21f.parent;
                                _220 = _21f.scripts;
                                continue;
                            }
                            if (node.nodeType != 1) {
                                node = node.nextSibling;
                                continue;
                            }
                            if (_220 && node.nodeName.toLowerCase() == "script") {
                                type = node.getAttribute("type");
                                if (type && /^dojo\/\w/i.test(type)) {
                                    _220.push(node);
                                }
                                node = node.nextSibling;
                                continue;
                            }
                            if (_221) {
                                node = node.nextSibling;
                                continue;
                            }
                            var type = node.getAttribute(_21a) || node.getAttribute(_218);
                            var _226 = node.firstChild;
                            if (!type && (!_226 || (_226.nodeType == 3 && !_226.nextSibling))) {
                                node = node.nextSibling;
                                continue;
                            }
                            var _227;
                            var ctor = null;
                            if (type) {
                                var _228 = node.getAttribute(_21c), _229 = _228 ? [type].concat(_228.split(/\s*,\s*/)) : [type];
                                try {
                                    ctor = _1da(_229, _216.contextRequire);
                                } catch (e) {
                                }
                                if (!ctor) {
                                    _1cd.forEach(_229, function (t) {
                                        if (~t.indexOf("/") && !_217[t]) {
                                            _217[t] = true;
                                            mids[mids.length] = t;
                                        }
                                    });
                                }
                                var _22a = ctor && !ctor.prototype._noScript ? [] : null;
                                _227 = {types: _229, ctor: ctor, parent: _21f, node: node, scripts: _22a};
                                _227.inherited = _222(_227);
                                list.push(_227);
                            } else {
                                _227 = {node: node, scripts: _220, parent: _21f};
                            }
                            _220 = _22a;
                            _221 = node.stopParser || (ctor && ctor.prototype.stopParser && !(_216.template));
                            _21f = _227;
                            node = _226;
                        }
                        var d = new _1d3();
                        if (mids.length) {
                            if (has("dojo-debug-messages")) {
                                console.warn("WARNING: Modules being Auto-Required: " + mids.join(", "));
                            }
                            var r = _216.contextRequire || _1cb;
                            r(mids, function () {
                                d.resolve(_1cd.filter(list, function (_22b) {
                                    if (!_22b.ctor) {
                                        try {
                                            _22b.ctor = _1da(_22b.types, _216.contextRequire);
                                        } catch (e) {
                                        }
                                    }
                                    var _22c = _22b.parent;
                                    while (_22c && !_22c.types) {
                                        _22c = _22c.parent;
                                    }
                                    var _22d = _22b.ctor && _22b.ctor.prototype;
                                    _22b.instantiateChildren = !(_22d && _22d.stopParser && !(_216.template));
                                    _22b.instantiate = !_22c || (_22c.instantiate && _22c.instantiateChildren);
                                    return _22b.instantiate;
                                }));
                            });
                        } else {
                            d.resolve(list);
                        }
                        return d.promise;
                    }, _require: function (_22e, _22f) {
                        var hash = _1d6("{" + _22e.innerHTML + "}"), vars = [], mids = [], d = new _1d3();
                        var _230 = (_22f && _22f.contextRequire) || _1cb;
                        for (var name in hash) {
                            vars.push(name);
                            mids.push(hash[name]);
                        }
                        _230(mids, function () {
                            for (var i = 0; i < vars.length; i++) {
                                _1cc.setObject(vars[i], arguments[i]);
                            }
                            d.resolve(arguments);
                        });
                        return d.promise;
                    }, _scanAmd: function (root, _231) {
                        var _232 = new _1d3(), _233 = _232.promise;
                        _232.resolve(true);
                        var self = this;
                        _1d4("script[type='dojo/require']", root).forEach(function (node) {
                            _233 = _233.then(function () {
                                return self._require(node, _231);
                            });
                            node.parentNode.removeChild(node);
                        });
                        return _233;
                    }, parse: function (_234, _235) {
                        if (_234 && typeof _234 != "string" && !("nodeType" in _234)) {
                            _235 = _234;
                            _234 = _235.rootNode;
                        }
                        var root = _234 ? dom.byId(_234) : _1cf.body();
                        _235 = _235 || {};
                        var _236 = _235.template ? {template: true} : {}, _237 = [], self = this;
                        var p = this._scanAmd(root, _235).then(function () {
                            return self.scan(root, _235);
                        }).then(function (_238) {
                            return self._instantiate(_238, _236, _235, true);
                        }).then(function (_239) {
                            return _237 = _237.concat(_239);
                        }).otherwise(function (e) {
                            console.error("dojo/parser::parse() error", e);
                            throw e;
                        });
                        _1cc.mixin(_237, p);
                        return _237;
                    }
                };
                if (1) {
                    dojo.parser = _1df;
                }
                if (_1ce.parseOnLoad) {
                    _1d5(100, _1df, "parse");
                }
                return _1df;
            });
        }, "dojo/promise/Promise": function () {
            define(["../_base/lang"], function (lang) {
                "use strict";
                function _23a() {
                    throw new TypeError("abstract");
                };
                return lang.extend(function Promise() {
                }, {
                    then: function (_23b, _23c, _23d) {
                        _23a();
                    }, cancel: function (_23e, _23f) {
                        _23a();
                    }, isResolved: function () {
                        _23a();
                    }, isRejected: function () {
                        _23a();
                    }, isFulfilled: function () {
                        _23a();
                    }, isCanceled: function () {
                        _23a();
                    }, always: function (_240) {
                        return this.then(_240, _240);
                    }, otherwise: function (_241) {
                        return this.then(null, _241);
                    }, trace: function () {
                        return this;
                    }, traceRejected: function () {
                        return this;
                    }, toString: function () {
                        return "[object Promise]";
                    }
                });
            });
        }, "dojo/request/handlers": function () {
            define(["../json", "../_base/kernel", "../_base/array", "../has", "../selector/_loader"], function (JSON, _242, _243, has) {
                has.add("activex", typeof ActiveXObject !== "undefined");
                has.add("dom-parser", function (_244) {
                    return "DOMParser" in _244;
                });
                var _245;
                if (has("activex")) {
                    var dp = ["Msxml2.DOMDocument.6.0", "Msxml2.DOMDocument.4.0", "MSXML2.DOMDocument.3.0", "MSXML.DOMDocument"];
                    var _246;
                    _245 = function (_247) {
                        var _248 = _247.data;
                        var text = _247.text;
                        if (_248 && has("dom-qsa2.1") && !_248.querySelectorAll && has("dom-parser")) {
                            _248 = new DOMParser().parseFromString(text, "application/xml");
                        }
                        function _249(p) {
                            try {
                                var dom = new ActiveXObject(p);
                                dom.async = false;
                                dom.loadXML(text);
                                _248 = dom;
                                _246 = p;
                            } catch (e) {
                                return false;
                            }
                            return true;
                        };
                        if (!_248 || !_248.documentElement) {
                            if (!_246 || !_249(_246)) {
                                _243.some(dp, _249);
                            }
                        }
                        return _248;
                    };
                }
                var _24a = function (_24b) {
                    if (!has("native-xhr2-blob") && _24b.options.handleAs === "blob" && typeof Blob !== "undefined") {
                        return new Blob([_24b.xhr.response], {type: _24b.xhr.getResponseHeader("Content-Type")});
                    }
                    return _24b.xhr.response;
                };
                var _24c = {
                    "javascript": function (_24d) {
                        return _242.eval(_24d.text || "");
                    }, "json": function (_24e) {
                        return JSON.parse(_24e.text || null);
                    }, "xml": _245, "blob": _24a, "arraybuffer": _24a, "document": _24a
                };

                function _24f(_250) {
                    var _251 = _24c[_250.options.handleAs];
                    _250.data = _251 ? _251(_250) : (_250.data || _250.text);
                    return _250;
                };
                _24f.register = function (name, _252) {
                    _24c[name] = _252;
                };
                return _24f;
            });
        }, "dojo/aspect": function () {
            define([], function () {
                "use strict";
                var _253;

                function _254(_255, type, _256, _257) {
                    var _258 = _255[type];
                    var _259 = type == "around";
                    var _25a;
                    if (_259) {
                        var _25b = _256(function () {
                            return _258.advice(this, arguments);
                        });
                        _25a = {
                            remove: function () {
                                if (_25b) {
                                    _25b = _255 = _256 = null;
                                }
                            }, advice: function (_25c, args) {
                                return _25b ? _25b.apply(_25c, args) : _258.advice(_25c, args);
                            }
                        };
                    } else {
                        _25a = {
                            remove: function () {
                                if (_25a.advice) {
                                    var _25d = _25a.previous;
                                    var next = _25a.next;
                                    if (!next && !_25d) {
                                        delete _255[type];
                                    } else {
                                        if (_25d) {
                                            _25d.next = next;
                                        } else {
                                            _255[type] = next;
                                        }
                                        if (next) {
                                            next.previous = _25d;
                                        }
                                    }
                                    _255 = _256 = _25a.advice = null;
                                }
                            }, id: _255.nextId++, advice: _256, receiveArguments: _257
                        };
                    }
                    if (_258 && !_259) {
                        if (type == "after") {
                            while (_258.next && (_258 = _258.next)) {
                            }
                            _258.next = _25a;
                            _25a.previous = _258;
                        } else {
                            if (type == "before") {
                                _255[type] = _25a;
                                _25a.next = _258;
                                _258.previous = _25a;
                            }
                        }
                    } else {
                        _255[type] = _25a;
                    }
                    return _25a;
                };
                function _25e(type) {
                    return function (_25f, _260, _261, _262) {
                        var _263 = _25f[_260], _264;
                        if (!_263 || _263.target != _25f) {
                            _25f[_260] = _264 = function () {
                                var _265 = _264.nextId;
                                var args = arguments;
                                var _266 = _264.before;
                                while (_266) {
                                    if (_266.advice) {
                                        args = _266.advice.apply(this, args) || args;
                                    }
                                    _266 = _266.next;
                                }
                                if (_264.around) {
                                    var _267 = _264.around.advice(this, args);
                                }
                                var _268 = _264.after;
                                while (_268 && _268.id < _265) {
                                    if (_268.advice) {
                                        if (_268.receiveArguments) {
                                            var _269 = _268.advice.apply(this, args);
                                            _267 = _269 === _253 ? _267 : _269;
                                        } else {
                                            _267 = _268.advice.call(this, _267, args);
                                        }
                                    }
                                    _268 = _268.next;
                                }
                                return _267;
                            };
                            if (_263) {
                                _264.around = {
                                    advice: function (_26a, args) {
                                        return _263.apply(_26a, args);
                                    }
                                };
                            }
                            _264.target = _25f;
                            _264.nextId = _264.nextId || 0;
                        }
                        var _26b = _254((_264 || _263), type, _261, _262);
                        _261 = null;
                        return _26b;
                    };
                };
                var _26c = _25e("after");
                var _26d = _25e("before");
                var _26e = _25e("around");
                return {before: _26d, around: _26e, after: _26c};
            });
        }, "dojo/errors/CancelError": function () {
            define(["./create"], function (_26f) {
                return _26f("CancelError", null, null, {dojoType: "cancel", log: false});
            });
        }, "dijit/a11yclick": function () {
            define(["dojo/keys", "dojo/mouse", "dojo/on", "dojo/touch"], function (keys, _270, on, _271) {
                function _272(e) {
                    if ((e.keyCode === keys.ENTER || e.keyCode === keys.SPACE) && !/input|button|textarea/i.test(e.target.nodeName)) {
                        for (var node = e.target; node; node = node.parentNode) {
                            if (node.dojoClick) {
                                return true;
                            }
                        }
                    }
                };
                var _273;
                on(document, "keydown", function (e) {
                    if (_272(e)) {
                        _273 = e.target;
                        e.preventDefault();
                    } else {
                        _273 = null;
                    }
                });
                on(document, "keyup", function (e) {
                    if (_272(e) && e.target == _273) {
                        _273 = null;
                        on.emit(e.target, "click", {
                            cancelable: true,
                            bubbles: true,
                            ctrlKey: e.ctrlKey,
                            shiftKey: e.shiftKey,
                            metaKey: e.metaKey,
                            altKey: e.altKey,
                            _origType: e.type
                        });
                    }
                });
                var _274 = function (node, _275) {
                    node.dojoClick = true;
                    return on(node, "click", _275);
                };
                _274.click = _274;
                _274.press = function (node, _276) {
                    var _277 = on(node, _271.press, function (evt) {
                        if (evt.type == "mousedown" && !_270.isLeft(evt)) {
                            return;
                        }
                        _276(evt);
                    }), _278 = on(node, "keydown", function (evt) {
                        if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
                            _276(evt);
                        }
                    });
                    return {
                        remove: function () {
                            _277.remove();
                            _278.remove();
                        }
                    };
                };
                _274.release = function (node, _279) {
                    var _27a = on(node, _271.release, function (evt) {
                        if (evt.type == "mouseup" && !_270.isLeft(evt)) {
                            return;
                        }
                        _279(evt);
                    }), _27b = on(node, "keyup", function (evt) {
                        if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
                            _279(evt);
                        }
                    });
                    return {
                        remove: function () {
                            _27a.remove();
                            _27b.remove();
                        }
                    };
                };
                _274.move = _271.move;
                return _274;
            });
        }, "dojo/topic": function () {
            define(["./Evented"], function (_27c) {
                var hub = new _27c;
                return {
                    publish: function (_27d, _27e) {
                        return hub.emit.apply(hub, arguments);
                    }, subscribe: function (_27f, _280) {
                        return hub.on.apply(hub, arguments);
                    }
                };
            });
        }, "dojo/NodeList-dom": function () {
            define(["./_base/kernel", "./query", "./_base/array", "./_base/lang", "./dom-class", "./dom-construct", "./dom-geometry", "./dom-attr", "./dom-style"], function (dojo, _281, _282, lang, _283, _284, _285, _286, _287) {
                var _288 = function (a) {
                    return a.length == 1 && (typeof a[0] == "string");
                };
                var _289 = function (node) {
                    var p = node.parentNode;
                    if (p) {
                        p.removeChild(node);
                    }
                };
                var _28a = _281.NodeList, awc = _28a._adaptWithCondition, aafe = _28a._adaptAsForEach, aam = _28a._adaptAsMap;

                function _28b(_28c) {
                    return function (node, name, _28d) {
                        if (arguments.length == 2) {
                            return _28c[typeof name == "string" ? "get" : "set"](node, name);
                        }
                        return _28c.set(node, name, _28d);
                    };
                };
                lang.extend(_28a, {
                    _normalize: function (_28e, _28f) {
                        var _290 = _28e.parse === true;
                        if (typeof _28e.template == "string") {
                            var _291 = _28e.templateFunc || (dojo.string && dojo.string.substitute);
                            _28e = _291 ? _291(_28e.template, _28e) : _28e;
                        }
                        var type = (typeof _28e);
                        if (type == "string" || type == "number") {
                            _28e = _284.toDom(_28e, (_28f && _28f.ownerDocument));
                            if (_28e.nodeType == 11) {
                                _28e = lang._toArray(_28e.childNodes);
                            } else {
                                _28e = [_28e];
                            }
                        } else {
                            if (!lang.isArrayLike(_28e)) {
                                _28e = [_28e];
                            } else {
                                if (!lang.isArray(_28e)) {
                                    _28e = lang._toArray(_28e);
                                }
                            }
                        }
                        if (_290) {
                            _28e._runParse = true;
                        }
                        return _28e;
                    },
                    _cloneNode: function (node) {
                        return node.cloneNode(true);
                    },
                    _place: function (ary, _292, _293, _294) {
                        if (_292.nodeType != 1 && _293 == "only") {
                            return;
                        }
                        var _295 = _292, _296;
                        var _297 = ary.length;
                        for (var i = _297 - 1; i >= 0; i--) {
                            var node = (_294 ? this._cloneNode(ary[i]) : ary[i]);
                            if (ary._runParse && dojo.parser && dojo.parser.parse) {
                                if (!_296) {
                                    _296 = _295.ownerDocument.createElement("div");
                                }
                                _296.appendChild(node);
                                dojo.parser.parse(_296);
                                node = _296.firstChild;
                                while (_296.firstChild) {
                                    _296.removeChild(_296.firstChild);
                                }
                            }
                            if (i == _297 - 1) {
                                _284.place(node, _295, _293);
                            } else {
                                _295.parentNode.insertBefore(node, _295);
                            }
                            _295 = node;
                        }
                    },
                    position: aam(_285.position),
                    attr: awc(_28b(_286), _288),
                    style: awc(_28b(_287), _288),
                    addClass: aafe(_283.add),
                    removeClass: aafe(_283.remove),
                    toggleClass: aafe(_283.toggle),
                    replaceClass: aafe(_283.replace),
                    empty: aafe(_284.empty),
                    removeAttr: aafe(_286.remove),
                    marginBox: aam(_285.getMarginBox),
                    place: function (_298, _299) {
                        var item = _281(_298)[0];
                        return this.forEach(function (node) {
                            _284.place(node, item, _299);
                        });
                    },
                    orphan: function (_29a) {
                        return (_29a ? _281._filterResult(this, _29a) : this).forEach(_289);
                    },
                    adopt: function (_29b, _29c) {
                        return _281(_29b).place(this[0], _29c)._stash(this);
                    },
                    query: function (_29d) {
                        if (!_29d) {
                            return this;
                        }
                        var ret = new _28a;
                        this.map(function (node) {
                            _281(_29d, node).forEach(function (_29e) {
                                if (_29e !== undefined) {
                                    ret.push(_29e);
                                }
                            });
                        });
                        return ret._stash(this);
                    },
                    filter: function (_29f) {
                        var a = arguments, _2a0 = this, _2a1 = 0;
                        if (typeof _29f == "string") {
                            _2a0 = _281._filterResult(this, a[0]);
                            if (a.length == 1) {
                                return _2a0._stash(this);
                            }
                            _2a1 = 1;
                        }
                        return this._wrap(_282.filter(_2a0, a[_2a1], a[_2a1 + 1]), this);
                    },
                    addContent: function (_2a2, _2a3) {
                        _2a2 = this._normalize(_2a2, this[0]);
                        for (var i = 0, node; (node = this[i]); i++) {
                            if (_2a2.length) {
                                this._place(_2a2, node, _2a3, i > 0);
                            } else {
                                _284.empty(node);
                            }
                        }
                        return this;
                    }
                });
                return _28a;
            });
        }, "dojo/_base/connect": function () {
            define(["./kernel", "../on", "../topic", "../aspect", "./event", "../mouse", "./sniff", "./lang", "../keys"], function (dojo, on, hub, _2a4, _2a5, _2a6, has, lang) {
                has.add("events-keypress-typed", function () {
                    var _2a7 = {charCode: 0};
                    try {
                        _2a7 = document.createEvent("KeyboardEvent");
                        (_2a7.initKeyboardEvent || _2a7.initKeyEvent).call(_2a7, "keypress", true, true, null, false, false, false, false, 9, 3);
                    } catch (e) {
                    }
                    return _2a7.charCode == 0 && !has("opera");
                });
                function _2a8(obj, _2a9, _2aa, _2ab, _2ac) {
                    _2ab = lang.hitch(_2aa, _2ab);
                    if (!obj || !(obj.addEventListener || obj.attachEvent)) {
                        return _2a4.after(obj || dojo.global, _2a9, _2ab, true);
                    }
                    if (typeof _2a9 == "string" && _2a9.substring(0, 2) == "on") {
                        _2a9 = _2a9.substring(2);
                    }
                    if (!obj) {
                        obj = dojo.global;
                    }
                    if (!_2ac) {
                        switch (_2a9) {
                            case "keypress":
                                _2a9 = _2ad;
                                break;
                            case "mouseenter":
                                _2a9 = _2a6.enter;
                                break;
                            case "mouseleave":
                                _2a9 = _2a6.leave;
                                break;
                        }
                    }
                    return on(obj, _2a9, _2ab, _2ac);
                };
                var _2ae = {
                    106: 42,
                    111: 47,
                    186: 59,
                    187: 43,
                    188: 44,
                    189: 45,
                    190: 46,
                    191: 47,
                    192: 96,
                    219: 91,
                    220: 92,
                    221: 93,
                    222: 39,
                    229: 113
                };
                var _2af = has("mac") ? "metaKey" : "ctrlKey";
                var _2b0 = function (evt, _2b1) {
                    var faux = lang.mixin({}, evt, _2b1);
                    _2b2(faux);
                    faux.preventDefault = function () {
                        evt.preventDefault();
                    };
                    faux.stopPropagation = function () {
                        evt.stopPropagation();
                    };
                    return faux;
                };

                function _2b2(evt) {
                    evt.keyChar = evt.charCode ? String.fromCharCode(evt.charCode) : "";
                    evt.charOrCode = evt.keyChar || evt.keyCode;
                };
                var _2ad;
                if (has("events-keypress-typed")) {
                    var _2b3 = function (e, code) {
                        try {
                            return (e.keyCode = code);
                        } catch (e) {
                            return 0;
                        }
                    };
                    _2ad = function (_2b4, _2b5) {
                        var _2b6 = on(_2b4, "keydown", function (evt) {
                            var k = evt.keyCode;
                            var _2b7 = (k != 13) && k != 32 && (k != 27 || !has("ie")) && (k < 48 || k > 90) && (k < 96 || k > 111) && (k < 186 || k > 192) && (k < 219 || k > 222) && k != 229;
                            if (_2b7 || evt.ctrlKey) {
                                var c = _2b7 ? 0 : k;
                                if (evt.ctrlKey) {
                                    if (k == 3 || k == 13) {
                                        return _2b5.call(evt.currentTarget, evt);
                                    } else {
                                        if (c > 95 && c < 106) {
                                            c -= 48;
                                        } else {
                                            if ((!evt.shiftKey) && (c >= 65 && c <= 90)) {
                                                c += 32;
                                            } else {
                                                c = _2ae[c] || c;
                                            }
                                        }
                                    }
                                }
                                var faux = _2b0(evt, {type: "keypress", faux: true, charCode: c});
                                _2b5.call(evt.currentTarget, faux);
                                if (has("ie")) {
                                    _2b3(evt, faux.keyCode);
                                }
                            }
                        });
                        var _2b8 = on(_2b4, "keypress", function (evt) {
                            var c = evt.charCode;
                            c = c >= 32 ? c : 0;
                            evt = _2b0(evt, {charCode: c, faux: true});
                            return _2b5.call(this, evt);
                        });
                        return {
                            remove: function () {
                                _2b6.remove();
                                _2b8.remove();
                            }
                        };
                    };
                } else {
                    if (has("opera")) {
                        _2ad = function (_2b9, _2ba) {
                            return on(_2b9, "keypress", function (evt) {
                                var c = evt.which;
                                if (c == 3) {
                                    c = 99;
                                }
                                c = c < 32 && !evt.shiftKey ? 0 : c;
                                if (evt.ctrlKey && !evt.shiftKey && c >= 65 && c <= 90) {
                                    c += 32;
                                }
                                return _2ba.call(this, _2b0(evt, {charCode: c}));
                            });
                        };
                    } else {
                        _2ad = function (_2bb, _2bc) {
                            return on(_2bb, "keypress", function (evt) {
                                _2b2(evt);
                                return _2bc.call(this, evt);
                            });
                        };
                    }
                }
                var _2bd = {
                    _keypress: _2ad, connect: function (obj, _2be, _2bf, _2c0, _2c1) {
                        var a = arguments, args = [], i = 0;
                        args.push(typeof a[0] == "string" ? null : a[i++], a[i++]);
                        var a1 = a[i + 1];
                        args.push(typeof a1 == "string" || typeof a1 == "function" ? a[i++] : null, a[i++]);
                        for (var l = a.length; i < l; i++) {
                            args.push(a[i]);
                        }
                        return _2a8.apply(this, args);
                    }, disconnect: function (_2c2) {
                        if (_2c2) {
                            _2c2.remove();
                        }
                    }, subscribe: function (_2c3, _2c4, _2c5) {
                        return hub.subscribe(_2c3, lang.hitch(_2c4, _2c5));
                    }, publish: function (_2c6, args) {
                        return hub.publish.apply(hub, [_2c6].concat(args));
                    }, connectPublisher: function (_2c7, obj, _2c8) {
                        var pf = function () {
                            _2bd.publish(_2c7, arguments);
                        };
                        return _2c8 ? _2bd.connect(obj, _2c8, pf) : _2bd.connect(obj, pf);
                    }, isCopyKey: function (e) {
                        return e[_2af];
                    }
                };
                _2bd.unsubscribe = _2bd.disconnect;
                1 && lang.mixin(dojo, _2bd);
                return _2bd;
            });
        }, "dojo/_base/fx": function () {
            define(["./kernel", "./config", "./lang", "../Evented", "./Color", "../aspect", "../sniff", "../dom", "../dom-style"], function (dojo, _2c9, lang, _2ca, _2cb, _2cc, has, dom, _2cd) {
                var _2ce = lang.mixin;
                var _2cf = {};
                var _2d0 = _2cf._Line = function (_2d1, end) {
                    this.start = _2d1;
                    this.end = end;
                };
                _2d0.prototype.getValue = function (n) {
                    return ((this.end - this.start) * n) + this.start;
                };
                var _2d2 = _2cf.Animation = function (args) {
                    _2ce(this, args);
                    if (lang.isArray(this.curve)) {
                        this.curve = new _2d0(this.curve[0], this.curve[1]);
                    }
                };
                _2d2.prototype = new _2ca();
                lang.extend(_2d2, {
                    duration: 350,
                    repeat: 0,
                    rate: 20,
                    _percent: 0,
                    _startRepeatCount: 0,
                    _getStep: function () {
                        var _2d3 = this._percent, _2d4 = this.easing;
                        return _2d4 ? _2d4(_2d3) : _2d3;
                    },
                    _fire: function (evt, args) {
                        var a = args || [];
                        if (this[evt]) {
                            if (_2c9.debugAtAllCosts) {
                                this[evt].apply(this, a);
                            } else {
                                try {
                                    this[evt].apply(this, a);
                                } catch (e) {
                                    console.error("exception in animation handler for:", evt);
                                    console.error(e);
                                }
                            }
                        }
                        return this;
                    },
                    play: function (_2d5, _2d6) {
                        var _2d7 = this;
                        if (_2d7._delayTimer) {
                            _2d7._clearTimer();
                        }
                        if (_2d6) {
                            _2d7._stopTimer();
                            _2d7._active = _2d7._paused = false;
                            _2d7._percent = 0;
                        } else {
                            if (_2d7._active && !_2d7._paused) {
                                return _2d7;
                            }
                        }
                        _2d7._fire("beforeBegin", [_2d7.node]);
                        var de = _2d5 || _2d7.delay, _2d8 = lang.hitch(_2d7, "_play", _2d6);
                        if (de > 0) {
                            _2d7._delayTimer = setTimeout(_2d8, de);
                            return _2d7;
                        }
                        _2d8();
                        return _2d7;
                    },
                    _play: function (_2d9) {
                        var _2da = this;
                        if (_2da._delayTimer) {
                            _2da._clearTimer();
                        }
                        _2da._startTime = new Date().valueOf();
                        if (_2da._paused) {
                            _2da._startTime -= _2da.duration * _2da._percent;
                        }
                        _2da._active = true;
                        _2da._paused = false;
                        var _2db = _2da.curve.getValue(_2da._getStep());
                        if (!_2da._percent) {
                            if (!_2da._startRepeatCount) {
                                _2da._startRepeatCount = _2da.repeat;
                            }
                            _2da._fire("onBegin", [_2db]);
                        }
                        _2da._fire("onPlay", [_2db]);
                        _2da._cycle();
                        return _2da;
                    },
                    pause: function () {
                        var _2dc = this;
                        if (_2dc._delayTimer) {
                            _2dc._clearTimer();
                        }
                        _2dc._stopTimer();
                        if (!_2dc._active) {
                            return _2dc;
                        }
                        _2dc._paused = true;
                        _2dc._fire("onPause", [_2dc.curve.getValue(_2dc._getStep())]);
                        return _2dc;
                    },
                    gotoPercent: function (_2dd, _2de) {
                        var _2df = this;
                        _2df._stopTimer();
                        _2df._active = _2df._paused = true;
                        _2df._percent = _2dd;
                        if (_2de) {
                            _2df.play();
                        }
                        return _2df;
                    },
                    stop: function (_2e0) {
                        var _2e1 = this;
                        if (_2e1._delayTimer) {
                            _2e1._clearTimer();
                        }
                        if (!_2e1._timer) {
                            return _2e1;
                        }
                        _2e1._stopTimer();
                        if (_2e0) {
                            _2e1._percent = 1;
                        }
                        _2e1._fire("onStop", [_2e1.curve.getValue(_2e1._getStep())]);
                        _2e1._active = _2e1._paused = false;
                        return _2e1;
                    },
                    destroy: function () {
                        this.stop();
                    },
                    status: function () {
                        if (this._active) {
                            return this._paused ? "paused" : "playing";
                        }
                        return "stopped";
                    },
                    _cycle: function () {
                        var _2e2 = this;
                        if (_2e2._active) {
                            var curr = new Date().valueOf();
                            var step = _2e2.duration === 0 ? 1 : (curr - _2e2._startTime) / (_2e2.duration);
                            if (step >= 1) {
                                step = 1;
                            }
                            _2e2._percent = step;
                            if (_2e2.easing) {
                                step = _2e2.easing(step);
                            }
                            _2e2._fire("onAnimate", [_2e2.curve.getValue(step)]);
                            if (_2e2._percent < 1) {
                                _2e2._startTimer();
                            } else {
                                _2e2._active = false;
                                if (_2e2.repeat > 0) {
                                    _2e2.repeat--;
                                    _2e2.play(null, true);
                                } else {
                                    if (_2e2.repeat == -1) {
                                        _2e2.play(null, true);
                                    } else {
                                        if (_2e2._startRepeatCount) {
                                            _2e2.repeat = _2e2._startRepeatCount;
                                            _2e2._startRepeatCount = 0;
                                        }
                                    }
                                }
                                _2e2._percent = 0;
                                _2e2._fire("onEnd", [_2e2.node]);
                                !_2e2.repeat && _2e2._stopTimer();
                            }
                        }
                        return _2e2;
                    },
                    _clearTimer: function () {
                        clearTimeout(this._delayTimer);
                        delete this._delayTimer;
                    }
                });
                var ctr = 0, _2e3 = null, _2e4 = {
                    run: function () {
                    }
                };
                lang.extend(_2d2, {
                    _startTimer: function () {
                        if (!this._timer) {
                            this._timer = _2cc.after(_2e4, "run", lang.hitch(this, "_cycle"), true);
                            ctr++;
                        }
                        if (!_2e3) {
                            _2e3 = setInterval(lang.hitch(_2e4, "run"), this.rate);
                        }
                    }, _stopTimer: function () {
                        if (this._timer) {
                            this._timer.remove();
                            this._timer = null;
                            ctr--;
                        }
                        if (ctr <= 0) {
                            clearInterval(_2e3);
                            _2e3 = null;
                            ctr = 0;
                        }
                    }
                });
                var _2e5 = has("ie") ? function (node) {
                    var ns = node.style;
                    if (!ns.width.length && _2cd.get(node, "width") == "auto") {
                        ns.width = "auto";
                    }
                } : function () {
                };
                _2cf._fade = function (args) {
                    args.node = dom.byId(args.node);
                    var _2e6 = _2ce({properties: {}}, args), _2e7 = (_2e6.properties.opacity = {});
                    _2e7.start = !("start" in _2e6) ? function () {
                        return +_2cd.get(_2e6.node, "opacity") || 0;
                    } : _2e6.start;
                    _2e7.end = _2e6.end;
                    var anim = _2cf.animateProperty(_2e6);
                    _2cc.after(anim, "beforeBegin", lang.partial(_2e5, _2e6.node), true);
                    return anim;
                };
                _2cf.fadeIn = function (args) {
                    return _2cf._fade(_2ce({end: 1}, args));
                };
                _2cf.fadeOut = function (args) {
                    return _2cf._fade(_2ce({end: 0}, args));
                };
                _2cf._defaultEasing = function (n) {
                    return 0.5 + ((Math.sin((n + 1.5) * Math.PI)) / 2);
                };
                var _2e8 = function (_2e9) {
                    this._properties = _2e9;
                    for (var p in _2e9) {
                        var prop = _2e9[p];
                        if (prop.start instanceof _2cb) {
                            prop.tempColor = new _2cb();
                        }
                    }
                };
                _2e8.prototype.getValue = function (r) {
                    var ret = {};
                    for (var p in this._properties) {
                        var prop = this._properties[p], _2ea = prop.start;
                        if (_2ea instanceof _2cb) {
                            ret[p] = _2cb.blendColors(_2ea, prop.end, r, prop.tempColor).toCss();
                        } else {
                            if (!lang.isArray(_2ea)) {
                                ret[p] = ((prop.end - _2ea) * r) + _2ea + (p != "opacity" ? prop.units || "px" : 0);
                            }
                        }
                    }
                    return ret;
                };
                _2cf.animateProperty = function (args) {
                    var n = args.node = dom.byId(args.node);
                    if (!args.easing) {
                        args.easing = dojo._defaultEasing;
                    }
                    var anim = new _2d2(args);
                    _2cc.after(anim, "beforeBegin", lang.hitch(anim, function () {
                        var pm = {};
                        for (var p in this.properties) {
                            if (p == "width" || p == "height") {
                                this.node.display = "block";
                            }
                            var prop = this.properties[p];
                            if (lang.isFunction(prop)) {
                                prop = prop(n);
                            }
                            prop = pm[p] = _2ce({}, (lang.isObject(prop) ? prop : {end: prop}));
                            if (lang.isFunction(prop.start)) {
                                prop.start = prop.start(n);
                            }
                            if (lang.isFunction(prop.end)) {
                                prop.end = prop.end(n);
                            }
                            var _2eb = (p.toLowerCase().indexOf("color") >= 0);

                            function _2ec(node, p) {
                                var v = {height: node.offsetHeight, width: node.offsetWidth}[p];
                                if (v !== undefined) {
                                    return v;
                                }
                                v = _2cd.get(node, p);
                                return (p == "opacity") ? +v : (_2eb ? v : parseFloat(v));
                            };
                            if (!("end" in prop)) {
                                prop.end = _2ec(n, p);
                            } else {
                                if (!("start" in prop)) {
                                    prop.start = _2ec(n, p);
                                }
                            }
                            if (_2eb) {
                                prop.start = new _2cb(prop.start);
                                prop.end = new _2cb(prop.end);
                            } else {
                                prop.start = (p == "opacity") ? +prop.start : parseFloat(prop.start);
                            }
                        }
                        this.curve = new _2e8(pm);
                    }), true);
                    _2cc.after(anim, "onAnimate", lang.hitch(_2cd, "set", anim.node), true);
                    return anim;
                };
                _2cf.anim = function (node, _2ed, _2ee, _2ef, _2f0, _2f1) {
                    return _2cf.animateProperty({
                        node: node,
                        duration: _2ee || _2d2.prototype.duration,
                        properties: _2ed,
                        easing: _2ef,
                        onEnd: _2f0
                    }).play(_2f1 || 0);
                };
                if (1) {
                    _2ce(dojo, _2cf);
                    dojo._Animation = _2d2;
                }
                return _2cf;
            });
        }, "dojo/_base/config": function () {
            define(["../has", "require"], function (has, _2f2) {
                var _2f3 = {};
                if (1) {
                    var src = _2f2.rawConfig, p;
                    for (p in src) {
                        _2f3[p] = src[p];
                    }
                } else {
                    var _2f4 = function (_2f5, _2f6, _2f7) {
                        for (p in _2f5) {
                            p != "has" && has.add(_2f6 + p, _2f5[p], 0, _2f7);
                        }
                    };
                    var _2f8 = (function () {
                        return this;
                    })();
                    _2f3 = 1 ? _2f2.rawConfig : _2f8.dojoConfig || _2f8.djConfig || {};
                    _2f4(_2f3, "config", 1);
                    _2f4(_2f3.has, "", 1);
                }
                if (!_2f3.locale && typeof navigator != "undefined") {
                    var _2f9 = (navigator.languages && navigator.languages.length) ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
                    if (_2f9) {
                        _2f3.locale = _2f9.toLowerCase();
                    }
                }
                return _2f3;
            });
        }, "dojo/_base/unload": function () {
            define(["./kernel", "./lang", "../on"], function (dojo, lang, on) {
                var win = window;
                var _2fa = {
                    addOnWindowUnload: function (obj, _2fb) {
                        if (!dojo.windowUnloaded) {
                            on(win, "unload", (dojo.windowUnloaded = function () {
                            }));
                        }
                        on(win, "unload", lang.hitch(obj, _2fb));
                    }, addOnUnload: function (obj, _2fc) {
                        on(win, "beforeunload", lang.hitch(obj, _2fc));
                    }
                };
                dojo.addOnWindowUnload = _2fa.addOnWindowUnload;
                dojo.addOnUnload = _2fa.addOnUnload;
                return _2fa;
            });
        }, "dojo/fx": function () {
            define(["./_base/lang", "./Evented", "./_base/kernel", "./_base/array", "./aspect", "./_base/fx", "./dom", "./dom-style", "./dom-geometry", "./ready", "require"], function (lang, _2fd, dojo, _2fe, _2ff, _300, dom, _301, geom, _302, _303) {
                if (!dojo.isAsync) {
                    _302(0, function () {
                        var _304 = ["./fx/Toggler"];
                        _303(_304);
                    });
                }
                var _305 = dojo.fx = {};
                var _306 = {
                    _fire: function (evt, args) {
                        if (this[evt]) {
                            this[evt].apply(this, args || []);
                        }
                        return this;
                    }
                };
                var _307 = function (_308) {
                    this._index = -1;
                    this._animations = _308 || [];
                    this._current = this._onAnimateCtx = this._onEndCtx = null;
                    this.duration = 0;
                    _2fe.forEach(this._animations, function (a) {
                        if (a) {
                            if (typeof a.duration != "undefined") {
                                this.duration += a.duration;
                            }
                            if (a.delay) {
                                this.duration += a.delay;
                            }
                        }
                    }, this);
                };
                _307.prototype = new _2fd();
                lang.extend(_307, {
                    _onAnimate: function () {
                        this._fire("onAnimate", arguments);
                    }, _onEnd: function () {
                        this._onAnimateCtx.remove();
                        this._onEndCtx.remove();
                        this._onAnimateCtx = this._onEndCtx = null;
                        if (this._index + 1 == this._animations.length) {
                            this._fire("onEnd");
                        } else {
                            this._current = this._animations[++this._index];
                            this._onAnimateCtx = _2ff.after(this._current, "onAnimate", lang.hitch(this, "_onAnimate"), true);
                            this._onEndCtx = _2ff.after(this._current, "onEnd", lang.hitch(this, "_onEnd"), true);
                            this._current.play(0, true);
                        }
                    }, play: function (_309, _30a) {
                        if (!this._current) {
                            this._current = this._animations[this._index = 0];
                        }
                        if (!_30a && this._current.status() == "playing") {
                            return this;
                        }
                        var _30b = _2ff.after(this._current, "beforeBegin", lang.hitch(this, function () {
                            this._fire("beforeBegin");
                        }), true), _30c = _2ff.after(this._current, "onBegin", lang.hitch(this, function (arg) {
                            this._fire("onBegin", arguments);
                        }), true), _30d = _2ff.after(this._current, "onPlay", lang.hitch(this, function (arg) {
                            this._fire("onPlay", arguments);
                            _30b.remove();
                            _30c.remove();
                            _30d.remove();
                        }));
                        if (this._onAnimateCtx) {
                            this._onAnimateCtx.remove();
                        }
                        this._onAnimateCtx = _2ff.after(this._current, "onAnimate", lang.hitch(this, "_onAnimate"), true);
                        if (this._onEndCtx) {
                            this._onEndCtx.remove();
                        }
                        this._onEndCtx = _2ff.after(this._current, "onEnd", lang.hitch(this, "_onEnd"), true);
                        this._current.play.apply(this._current, arguments);
                        return this;
                    }, pause: function () {
                        if (this._current) {
                            var e = _2ff.after(this._current, "onPause", lang.hitch(this, function (arg) {
                                this._fire("onPause", arguments);
                                e.remove();
                            }), true);
                            this._current.pause();
                        }
                        return this;
                    }, gotoPercent: function (_30e, _30f) {
                        this.pause();
                        var _310 = this.duration * _30e;
                        this._current = null;
                        _2fe.some(this._animations, function (a, _311) {
                            if (_310 <= a.duration) {
                                this._current = a;
                                this._index = _311;
                                return true;
                            }
                            _310 -= a.duration;
                            return false;
                        }, this);
                        if (this._current) {
                            this._current.gotoPercent(_310 / this._current.duration);
                        }
                        if (_30f) {
                            this.play();
                        }
                        return this;
                    }, stop: function (_312) {
                        if (this._current) {
                            if (_312) {
                                for (; this._index + 1 < this._animations.length; ++this._index) {
                                    this._animations[this._index].stop(true);
                                }
                                this._current = this._animations[this._index];
                            }
                            var e = _2ff.after(this._current, "onStop", lang.hitch(this, function (arg) {
                                this._fire("onStop", arguments);
                                e.remove();
                            }), true);
                            this._current.stop();
                        }
                        return this;
                    }, status: function () {
                        return this._current ? this._current.status() : "stopped";
                    }, destroy: function () {
                        this.stop();
                        if (this._onAnimateCtx) {
                            this._onAnimateCtx.remove();
                        }
                        if (this._onEndCtx) {
                            this._onEndCtx.remove();
                        }
                    }
                });
                lang.extend(_307, _306);
                _305.chain = function (_313) {
                    return new _307(lang.isArray(_313) ? _313 : Array.prototype.slice.call(_313, 0));
                };
                var _314 = function (_315) {
                    this._animations = _315 || [];
                    this._connects = [];
                    this._finished = 0;
                    this.duration = 0;
                    _2fe.forEach(_315, function (a) {
                        var _316 = a.duration;
                        if (a.delay) {
                            _316 += a.delay;
                        }
                        if (this.duration < _316) {
                            this.duration = _316;
                        }
                        this._connects.push(_2ff.after(a, "onEnd", lang.hitch(this, "_onEnd"), true));
                    }, this);
                    this._pseudoAnimation = new _300.Animation({curve: [0, 1], duration: this.duration});
                    var self = this;
                    _2fe.forEach(["beforeBegin", "onBegin", "onPlay", "onAnimate", "onPause", "onStop", "onEnd"], function (evt) {
                        self._connects.push(_2ff.after(self._pseudoAnimation, evt, function () {
                            self._fire(evt, arguments);
                        }, true));
                    });
                };
                lang.extend(_314, {
                    _doAction: function (_317, args) {
                        _2fe.forEach(this._animations, function (a) {
                            a[_317].apply(a, args);
                        });
                        return this;
                    }, _onEnd: function () {
                        if (++this._finished > this._animations.length) {
                            this._fire("onEnd");
                        }
                    }, _call: function (_318, args) {
                        var t = this._pseudoAnimation;
                        t[_318].apply(t, args);
                    }, play: function (_319, _31a) {
                        this._finished = 0;
                        this._doAction("play", arguments);
                        this._call("play", arguments);
                        return this;
                    }, pause: function () {
                        this._doAction("pause", arguments);
                        this._call("pause", arguments);
                        return this;
                    }, gotoPercent: function (_31b, _31c) {
                        var ms = this.duration * _31b;
                        _2fe.forEach(this._animations, function (a) {
                            a.gotoPercent(a.duration < ms ? 1 : (ms / a.duration), _31c);
                        });
                        this._call("gotoPercent", arguments);
                        return this;
                    }, stop: function (_31d) {
                        this._doAction("stop", arguments);
                        this._call("stop", arguments);
                        return this;
                    }, status: function () {
                        return this._pseudoAnimation.status();
                    }, destroy: function () {
                        this.stop();
                        _2fe.forEach(this._connects, function (_31e) {
                            _31e.remove();
                        });
                    }
                });
                lang.extend(_314, _306);
                _305.combine = function (_31f) {
                    return new _314(lang.isArray(_31f) ? _31f : Array.prototype.slice.call(_31f, 0));
                };
                _305.wipeIn = function (args) {
                    var node = args.node = dom.byId(args.node), s = node.style, o;
                    var anim = _300.animateProperty(lang.mixin({
                        properties: {
                            height: {
                                start: function () {
                                    o = s.overflow;
                                    s.overflow = "hidden";
                                    if (s.visibility == "hidden" || s.display == "none") {
                                        s.height = "1px";
                                        s.display = "";
                                        s.visibility = "";
                                        return 1;
                                    } else {
                                        var _320 = _301.get(node, "height");
                                        return Math.max(_320, 1);
                                    }
                                }, end: function () {
                                    return node.scrollHeight;
                                }
                            }
                        }
                    }, args));
                    var fini = function () {
                        s.height = "auto";
                        s.overflow = o;
                    };
                    _2ff.after(anim, "onStop", fini, true);
                    _2ff.after(anim, "onEnd", fini, true);
                    return anim;
                };
                _305.wipeOut = function (args) {
                    var node = args.node = dom.byId(args.node), s = node.style, o;
                    var anim = _300.animateProperty(lang.mixin({properties: {height: {end: 1}}}, args));
                    _2ff.after(anim, "beforeBegin", function () {
                        o = s.overflow;
                        s.overflow = "hidden";
                        s.display = "";
                    }, true);
                    var fini = function () {
                        s.overflow = o;
                        s.height = "auto";
                        s.display = "none";
                    };
                    _2ff.after(anim, "onStop", fini, true);
                    _2ff.after(anim, "onEnd", fini, true);
                    return anim;
                };
                _305.slideTo = function (args) {
                    var node = args.node = dom.byId(args.node), top = null, left = null;
                    var init = (function (n) {
                        return function () {
                            var cs = _301.getComputedStyle(n);
                            var pos = cs.position;
                            top = (pos == "absolute" ? n.offsetTop : parseInt(cs.top) || 0);
                            left = (pos == "absolute" ? n.offsetLeft : parseInt(cs.left) || 0);
                            if (pos != "absolute" && pos != "relative") {
                                var ret = geom.position(n, true);
                                top = ret.y;
                                left = ret.x;
                                n.style.position = "absolute";
                                n.style.top = top + "px";
                                n.style.left = left + "px";
                            }
                        };
                    })(node);
                    init();
                    var anim = _300.animateProperty(lang.mixin({
                        properties: {
                            top: args.top || 0,
                            left: args.left || 0
                        }
                    }, args));
                    _2ff.after(anim, "beforeBegin", init, true);
                    return anim;
                };
                return _305;
            });
        }, "dojo/selector/_loader": function () {
            define(["../has", "require"], function (has, _321) {
                "use strict";
                if (typeof document !== "undefined") {
                    var _322 = document.createElement("div");
                    has.add("dom-qsa2.1", !!_322.querySelectorAll);
                    has.add("dom-qsa3", function () {
                        try {
                            _322.innerHTML = "<p class='TEST'></p>";
                            return _322.querySelectorAll(".TEST:empty").length == 1;
                        } catch (e) {
                        }
                    });
                }
                var _323;
                var acme = "./acme", lite = "./lite";
                return {
                    load: function (id, _324, _325, _326) {
                        if (_326 && _326.isBuild) {
                            _325();
                            return;
                        }
                        var req = _321;
                        id = id == "default" ? has("config-selectorEngine") || "css3" : id;
                        id = id == "css2" || id == "lite" ? lite : id == "css2.1" ? has("dom-qsa2.1") ? lite : acme : id == "css3" ? has("dom-qsa3") ? lite : acme : id == "acme" ? acme : (req = _324) && id;
                        if (id.charAt(id.length - 1) == "?") {
                            id = id.substring(0, id.length - 1);
                            var _327 = true;
                        }
                        if (_327 && (has("dom-compliant-qsa") || _323)) {
                            return _325(_323);
                        }
                        req([id], function (_328) {
                            if (id != "./lite") {
                                _323 = _328;
                            }
                            _325(_328);
                        });
                    }
                };
            });
        }, "dojo/_base/declare": function () {
            define(["./kernel", "../has", "./lang"], function (dojo, has, lang) {
                var mix = lang.mixin, op = Object.prototype, opts = op.toString, xtor, _329 = 0, _32a = "constructor";
                if (!has("csp-restrictions")) {
                    xtor = new Function;
                } else {
                    xtor = function () {
                    };
                }
                function err(msg, cls) {
                    throw new Error("declare" + (cls ? " " + cls : "") + ": " + msg);
                };
                function _32b(_32c, _32d) {
                    var _32e = [], _32f = [{
                        cls: 0,
                        refs: []
                    }], _330 = {}, _331 = 1, l = _32c.length, i = 0, j, lin, base, top, _332, rec, name, refs;
                    for (; i < l; ++i) {
                        base = _32c[i];
                        if (!base) {
                            err("mixin #" + i + " is unknown. Did you use dojo.require to pull it in?", _32d);
                        } else {
                            if (opts.call(base) != "[object Function]") {
                                err("mixin #" + i + " is not a callable constructor.", _32d);
                            }
                        }
                        lin = base._meta ? base._meta.bases : [base];
                        top = 0;
                        for (j = lin.length - 1; j >= 0; --j) {
                            _332 = lin[j].prototype;
                            if (!_332.hasOwnProperty("declaredClass")) {
                                _332.declaredClass = "uniqName_" + (_329++);
                            }
                            name = _332.declaredClass;
                            if (!_330.hasOwnProperty(name)) {
                                _330[name] = {count: 0, refs: [], cls: lin[j]};
                                ++_331;
                            }
                            rec = _330[name];
                            if (top && top !== rec) {
                                rec.refs.push(top);
                                ++top.count;
                            }
                            top = rec;
                        }
                        ++top.count;
                        _32f[0].refs.push(top);
                    }
                    while (_32f.length) {
                        top = _32f.pop();
                        _32e.push(top.cls);
                        --_331;
                        while (refs = top.refs, refs.length == 1) {
                            top = refs[0];
                            if (!top || --top.count) {
                                top = 0;
                                break;
                            }
                            _32e.push(top.cls);
                            --_331;
                        }
                        if (top) {
                            for (i = 0, l = refs.length; i < l; ++i) {
                                top = refs[i];
                                if (!--top.count) {
                                    _32f.push(top);
                                }
                            }
                        }
                    }
                    if (_331) {
                        err("can't build consistent linearization", _32d);
                    }
                    base = _32c[0];
                    _32e[0] = base ? base._meta && base === _32e[_32e.length - base._meta.bases.length] ? base._meta.bases.length : 1 : 0;
                    return _32e;
                };
                function _333(args, a, f) {
                    var name, _334, _335, _336, meta, base, _337, opf, pos, _338 = this._inherited = this._inherited || {};
                    if (typeof args == "string") {
                        name = args;
                        args = a;
                        a = f;
                    }
                    f = 0;
                    _336 = args.callee;
                    name = name || _336.nom;
                    if (!name) {
                        err("can't deduce a name to call inherited()", this.declaredClass);
                    }
                    meta = this.constructor._meta;
                    _335 = meta.bases;
                    pos = _338.p;
                    if (name != _32a) {
                        if (_338.c !== _336) {
                            pos = 0;
                            base = _335[0];
                            meta = base._meta;
                            if (meta.hidden[name] !== _336) {
                                _334 = meta.chains;
                                if (_334 && typeof _334[name] == "string") {
                                    err("calling chained method with inherited: " + name, this.declaredClass);
                                }
                                do {
                                    meta = base._meta;
                                    _337 = base.prototype;
                                    if (meta && (_337[name] === _336 && _337.hasOwnProperty(name) || meta.hidden[name] === _336)) {
                                        break;
                                    }
                                } while (base = _335[++pos]);
                                pos = base ? pos : -1;
                            }
                        }
                        base = _335[++pos];
                        if (base) {
                            _337 = base.prototype;
                            if (base._meta && _337.hasOwnProperty(name)) {
                                f = _337[name];
                            } else {
                                opf = op[name];
                                do {
                                    _337 = base.prototype;
                                    f = _337[name];
                                    if (f && (base._meta ? _337.hasOwnProperty(name) : f !== opf)) {
                                        break;
                                    }
                                } while (base = _335[++pos]);
                            }
                        }
                        f = base && f || op[name];
                    } else {
                        if (_338.c !== _336) {
                            pos = 0;
                            meta = _335[0]._meta;
                            if (meta && meta.ctor !== _336) {
                                _334 = meta.chains;
                                if (!_334 || _334.constructor !== "manual") {
                                    err("calling chained constructor with inherited", this.declaredClass);
                                }
                                while (base = _335[++pos]) {
                                    meta = base._meta;
                                    if (meta && meta.ctor === _336) {
                                        break;
                                    }
                                }
                                pos = base ? pos : -1;
                            }
                        }
                        while (base = _335[++pos]) {
                            meta = base._meta;
                            f = meta ? meta.ctor : base;
                            if (f) {
                                break;
                            }
                        }
                        f = base && f;
                    }
                    _338.c = f;
                    _338.p = pos;
                    if (f) {
                        return a === true ? f : f.apply(this, a || args);
                    }
                };
                function _339(name, args) {
                    if (typeof name == "string") {
                        return this.__inherited(name, args, true);
                    }
                    return this.__inherited(name, true);
                };
                function _33a(args, a1, a2) {
                    var f = this.getInherited(args, a1);
                    if (f) {
                        return f.apply(this, a2 || a1 || args);
                    }
                };
                var _33b = dojo.config.isDebug ? _33a : _333;

                function _33c(cls) {
                    var _33d = this.constructor._meta.bases;
                    for (var i = 0, l = _33d.length; i < l; ++i) {
                        if (_33d[i] === cls) {
                            return true;
                        }
                    }
                    return this instanceof cls;
                };
                function _33e(_33f, _340) {
                    for (var name in _340) {
                        if (name != _32a && _340.hasOwnProperty(name)) {
                            _33f[name] = _340[name];
                        }
                    }
                    if (has("bug-for-in-skips-shadowed")) {
                        for (var _341 = lang._extraNames, i = _341.length; i;) {
                            name = _341[--i];
                            if (name != _32a && _340.hasOwnProperty(name)) {
                                _33f[name] = _340[name];
                            }
                        }
                    }
                };
                function _342(_343, _344) {
                    var name, t;
                    for (name in _344) {
                        t = _344[name];
                        if ((t !== op[name] || !(name in op)) && name != _32a) {
                            if (opts.call(t) == "[object Function]") {
                                t.nom = name;
                            }
                            _343[name] = t;
                        }
                    }
                    if (has("bug-for-in-skips-shadowed") && _344) {
                        for (var _345 = lang._extraNames, i = _345.length; i;) {
                            name = _345[--i];
                            t = _344[name];
                            if ((t !== op[name] || !(name in op)) && name != _32a) {
                                if (opts.call(t) == "[object Function]") {
                                    t.nom = name;
                                }
                                _343[name] = t;
                            }
                        }
                    }
                    return _343;
                };
                function _346(_347) {
                    _348.safeMixin(this.prototype, _347);
                    return this;
                };
                function _349(_34a, _34b) {
                    if (!(_34a instanceof Array || typeof _34a == "function")) {
                        _34b = _34a;
                        _34a = undefined;
                    }
                    _34b = _34b || {};
                    _34a = _34a || [];
                    return _348([this].concat(_34a), _34b);
                };
                function _34c(_34d, _34e) {
                    return function () {
                        var a = arguments, args = a, a0 = a[0], f, i, m, l = _34d.length, _34f;
                        if (!(this instanceof a.callee)) {
                            return _350(a);
                        }
                        if (_34e && (a0 && a0.preamble || this.preamble)) {
                            _34f = new Array(_34d.length);
                            _34f[0] = a;
                            for (i = 0; ;) {
                                a0 = a[0];
                                if (a0) {
                                    f = a0.preamble;
                                    if (f) {
                                        a = f.apply(this, a) || a;
                                    }
                                }
                                f = _34d[i].prototype;
                                f = f.hasOwnProperty("preamble") && f.preamble;
                                if (f) {
                                    a = f.apply(this, a) || a;
                                }
                                if (++i == l) {
                                    break;
                                }
                                _34f[i] = a;
                            }
                        }
                        for (i = l - 1; i >= 0; --i) {
                            f = _34d[i];
                            m = f._meta;
                            f = m ? m.ctor : f;
                            if (f) {
                                f.apply(this, _34f ? _34f[i] : a);
                            }
                        }
                        f = this.postscript;
                        if (f) {
                            f.apply(this, args);
                        }
                    };
                };
                function _351(ctor, _352) {
                    return function () {
                        var a = arguments, t = a, a0 = a[0], f;
                        if (!(this instanceof a.callee)) {
                            return _350(a);
                        }
                        if (_352) {
                            if (a0) {
                                f = a0.preamble;
                                if (f) {
                                    t = f.apply(this, t) || t;
                                }
                            }
                            f = this.preamble;
                            if (f) {
                                f.apply(this, t);
                            }
                        }
                        if (ctor) {
                            ctor.apply(this, a);
                        }
                        f = this.postscript;
                        if (f) {
                            f.apply(this, a);
                        }
                    };
                };
                function _353(_354) {
                    return function () {
                        var a = arguments, i = 0, f, m;
                        if (!(this instanceof a.callee)) {
                            return _350(a);
                        }
                        for (; f = _354[i]; ++i) {
                            m = f._meta;
                            f = m ? m.ctor : f;
                            if (f) {
                                f.apply(this, a);
                                break;
                            }
                        }
                        f = this.postscript;
                        if (f) {
                            f.apply(this, a);
                        }
                    };
                };
                function _355(name, _356, _357) {
                    return function () {
                        var b, m, f, i = 0, step = 1;
                        if (_357) {
                            i = _356.length - 1;
                            step = -1;
                        }
                        for (; b = _356[i]; i += step) {
                            m = b._meta;
                            f = (m ? m.hidden : b.prototype)[name];
                            if (f) {
                                f.apply(this, arguments);
                            }
                        }
                    };
                };
                function _358(ctor) {
                    xtor.prototype = ctor.prototype;
                    var t = new xtor;
                    xtor.prototype = null;
                    return t;
                };
                function _350(args) {
                    var ctor = args.callee, t = _358(ctor);
                    ctor.apply(t, args);
                    return t;
                };
                function _348(_359, _35a, _35b) {
                    if (typeof _359 != "string") {
                        _35b = _35a;
                        _35a = _359;
                        _359 = "";
                    }
                    _35b = _35b || {};
                    var _35c, i, t, ctor, name, _35d, _35e, _35f = 1, _360 = _35a;
                    if (opts.call(_35a) == "[object Array]") {
                        _35d = _32b(_35a, _359);
                        t = _35d[0];
                        _35f = _35d.length - t;
                        _35a = _35d[_35f];
                    } else {
                        _35d = [0];
                        if (_35a) {
                            if (opts.call(_35a) == "[object Function]") {
                                t = _35a._meta;
                                _35d = _35d.concat(t ? t.bases : _35a);
                            } else {
                                err("base class is not a callable constructor.", _359);
                            }
                        } else {
                            if (_35a !== null) {
                                err("unknown base class. Did you use dojo.require to pull it in?", _359);
                            }
                        }
                    }
                    if (_35a) {
                        for (i = _35f - 1; ; --i) {
                            _35c = _358(_35a);
                            if (!i) {
                                break;
                            }
                            t = _35d[i];
                            (t._meta ? _33e : mix)(_35c, t.prototype);
                            if (has("csp-restrictions")) {
                                ctor = function () {
                                };
                            } else {
                                ctor = new Function;
                            }
                            ctor.superclass = _35a;
                            ctor.prototype = _35c;
                            _35a = _35c.constructor = ctor;
                        }
                    } else {
                        _35c = {};
                    }
                    _348.safeMixin(_35c, _35b);
                    t = _35b.constructor;
                    if (t !== op.constructor) {
                        t.nom = _32a;
                        _35c.constructor = t;
                    }
                    for (i = _35f - 1; i; --i) {
                        t = _35d[i]._meta;
                        if (t && t.chains) {
                            _35e = mix(_35e || {}, t.chains);
                        }
                    }
                    if (_35c["-chains-"]) {
                        _35e = mix(_35e || {}, _35c["-chains-"]);
                    }
                    if (_35a && _35a.prototype && _35a.prototype["-chains-"]) {
                        _35e = mix(_35e || {}, _35a.prototype["-chains-"]);
                    }
                    t = !_35e || !_35e.hasOwnProperty(_32a);
                    _35d[0] = ctor = (_35e && _35e.constructor === "manual") ? _353(_35d) : (_35d.length == 1 ? _351(_35b.constructor, t) : _34c(_35d, t));
                    ctor._meta = {bases: _35d, hidden: _35b, chains: _35e, parents: _360, ctor: _35b.constructor};
                    ctor.superclass = _35a && _35a.prototype;
                    ctor.extend = _346;
                    ctor.createSubclass = _349;
                    ctor.prototype = _35c;
                    _35c.constructor = ctor;
                    _35c.getInherited = _339;
                    _35c.isInstanceOf = _33c;
                    _35c.inherited = _33b;
                    _35c.__inherited = _333;
                    if (_359) {
                        _35c.declaredClass = _359;
                        lang.setObject(_359, ctor);
                    }
                    if (_35e) {
                        for (name in _35e) {
                            if (_35c[name] && typeof _35e[name] == "string" && name != _32a) {
                                t = _35c[name] = _355(name, _35d, _35e[name] === "after");
                                t.nom = name;
                            }
                        }
                    }
                    return ctor;
                };
                dojo.safeMixin = _348.safeMixin = _342;
                dojo.declare = _348;
                return _348;
            });
        }, "dojo/errors/RequestTimeoutError": function () {
            define(["./create", "./RequestError"], function (_361, _362) {
                return _361("RequestTimeoutError", null, _362, {dojoType: "timeout"});
            });
        }, "dojo/json": function () {
            define(["./has"], function (has) {
                "use strict";
                var _363 = typeof JSON != "undefined";
                has.add("json-parse", _363);
                has.add("json-stringify", _363 && JSON.stringify({a: 0}, function (k, v) {
                        return v || 1;
                    }) == "{\"a\":1}");
                if (has("json-stringify")) {
                    return JSON;
                } else {
                    var _364 = function (str) {
                        return ("\"" + str.replace(/(["\\])/g, "\\$1") + "\"").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r");
                    };
                    return {
                        parse: has("json-parse") ? JSON.parse : function (str, _365) {
                            if (_365 && !/^([\s\[\{]*(?:"(?:\\.|[^"])*"|-?\d[\d\.]*(?:[Ee][+-]?\d+)?|null|true|false|)[\s\]\}]*(?:,|:|$))+$/.test(str)) {
                                throw new SyntaxError("Invalid characters in JSON");
                            }
                            return eval("(" + str + ")");
                        }, stringify: function (_366, _367, _368) {
                            var _369;
                            if (typeof _367 == "string") {
                                _368 = _367;
                                _367 = null;
                            }
                            function _36a(it, _36b, key) {
                                if (_367) {
                                    it = _367(key, it);
                                }
                                var val, _36c = typeof it;
                                if (_36c == "number") {
                                    return isFinite(it) ? it + "" : "null";
                                }
                                if (_36c == "boolean") {
                                    return it + "";
                                }
                                if (it === null) {
                                    return "null";
                                }
                                if (typeof it == "string") {
                                    return _364(it);
                                }
                                if (_36c == "function" || _36c == "undefined") {
                                    return _369;
                                }
                                if (typeof it.toJSON == "function") {
                                    return _36a(it.toJSON(key), _36b, key);
                                }
                                if (it instanceof Date) {
                                    return "\"{FullYear}-{Month+}-{Date}T{Hours}:{Minutes}:{Seconds}Z\"".replace(/\{(\w+)(\+)?\}/g, function (t, prop, plus) {
                                        var num = it["getUTC" + prop]() + (plus ? 1 : 0);
                                        return num < 10 ? "0" + num : num;
                                    });
                                }
                                if (it.valueOf() !== it) {
                                    return _36a(it.valueOf(), _36b, key);
                                }
                                var _36d = _368 ? (_36b + _368) : "";
                                var sep = _368 ? " " : "";
                                var _36e = _368 ? "\n" : "";
                                if (it instanceof Array) {
                                    var itl = it.length, res = [];
                                    for (key = 0; key < itl; key++) {
                                        var obj = it[key];
                                        val = _36a(obj, _36d, key);
                                        if (typeof val != "string") {
                                            val = "null";
                                        }
                                        res.push(_36e + _36d + val);
                                    }
                                    return "[" + res.join(",") + _36e + _36b + "]";
                                }
                                var _36f = [];
                                for (key in it) {
                                    var _370;
                                    if (it.hasOwnProperty(key)) {
                                        if (typeof key == "number") {
                                            _370 = "\"" + key + "\"";
                                        } else {
                                            if (typeof key == "string") {
                                                _370 = _364(key);
                                            } else {
                                                continue;
                                            }
                                        }
                                        val = _36a(it[key], _36d, key);
                                        if (typeof val != "string") {
                                            continue;
                                        }
                                        _36f.push(_36e + _36d + _370 + ":" + sep + val);
                                    }
                                }
                                return "{" + _36f.join(",") + _36e + _36b + "}";
                            };
                            return _36a(_366, "", "");
                        }
                    };
                }
            });
        }, "dojo/_base/json": function () {
            define(["./kernel", "../json"], function (dojo, json) {
                dojo.fromJson = function (js) {
                    return eval("(" + js + ")");
                };
                dojo._escapeString = json.stringify;
                dojo.toJsonIndentStr = "\t";
                dojo.toJson = function (it, _371) {
                    return json.stringify(it, function (key, _372) {
                        if (_372) {
                            var tf = _372.__json__ || _372.json;
                            if (typeof tf == "function") {
                                return tf.call(_372);
                            }
                        }
                        return _372;
                    }, _371 && dojo.toJsonIndentStr);
                };
                return dojo;
            });
        }, "dojo/dom-construct": function () {
            define(["exports", "./_base/kernel", "./sniff", "./_base/window", "./dom", "./dom-attr"], function (_373, dojo, has, win, dom, attr) {
                var _374 = {
                    option: ["select"],
                    tbody: ["table"],
                    thead: ["table"],
                    tfoot: ["table"],
                    tr: ["table", "tbody"],
                    td: ["table", "tbody", "tr"],
                    th: ["table", "thead", "tr"],
                    legend: ["fieldset"],
                    caption: ["table"],
                    colgroup: ["table"],
                    col: ["table", "colgroup"],
                    li: ["ul"]
                }, _375 = /<\s*([\w\:]+)/, _376 = {}, _377 = 0, _378 = "__" + dojo._scopeName + "ToDomId";
                for (var _379 in _374) {
                    if (_374.hasOwnProperty(_379)) {
                        var tw = _374[_379];
                        tw.pre = _379 == "option" ? "<select multiple=\"multiple\">" : "<" + tw.join("><") + ">";
                        tw.post = "</" + tw.reverse().join("></") + ">";
                    }
                }
                var _37a;
                if (has("ie") <= 8) {
                    _37a = function (doc) {
                        doc.__dojo_html5_tested = "yes";
                        var div = _37b("div", {innerHTML: "<nav>a</nav>", style: {visibility: "hidden"}}, doc.body);
                        if (div.childNodes.length !== 1) {
                            ("abbr article aside audio canvas details figcaption figure footer header " + "hgroup mark meter nav output progress section summary time video").replace(/\b\w+\b/g, function (n) {
                                doc.createElement(n);
                            });
                        }
                        _37c(div);
                    };
                }
                function _37d(node, ref) {
                    var _37e = ref.parentNode;
                    if (_37e) {
                        _37e.insertBefore(node, ref);
                    }
                };
                function _37f(node, ref) {
                    var _380 = ref.parentNode;
                    if (_380) {
                        if (_380.lastChild == ref) {
                            _380.appendChild(node);
                        } else {
                            _380.insertBefore(node, ref.nextSibling);
                        }
                    }
                };
                _373.toDom = function toDom(frag, doc) {
                    doc = doc || win.doc;
                    var _381 = doc[_378];
                    if (!_381) {
                        doc[_378] = _381 = ++_377 + "";
                        _376[_381] = doc.createElement("div");
                    }
                    if (has("ie") <= 8) {
                        if (!doc.__dojo_html5_tested && doc.body) {
                            _37a(doc);
                        }
                    }
                    frag += "";
                    var _382 = frag.match(_375), tag = _382 ? _382[1].toLowerCase() : "", _383 = _376[_381], wrap, i, fc, df;
                    if (_382 && _374[tag]) {
                        wrap = _374[tag];
                        _383.innerHTML = wrap.pre + frag + wrap.post;
                        for (i = wrap.length; i; --i) {
                            _383 = _383.firstChild;
                        }
                    } else {
                        _383.innerHTML = frag;
                    }
                    if (_383.childNodes.length == 1) {
                        return _383.removeChild(_383.firstChild);
                    }
                    df = doc.createDocumentFragment();
                    while ((fc = _383.firstChild)) {
                        df.appendChild(fc);
                    }
                    return df;
                };
                _373.place = function place(node, _384, _385) {
                    _384 = dom.byId(_384);
                    if (typeof node == "string") {
                        node = /^\s*</.test(node) ? _373.toDom(node, _384.ownerDocument) : dom.byId(node);
                    }
                    if (typeof _385 == "number") {
                        var cn = _384.childNodes;
                        if (!cn.length || cn.length <= _385) {
                            _384.appendChild(node);
                        } else {
                            _37d(node, cn[_385 < 0 ? 0 : _385]);
                        }
                    } else {
                        switch (_385) {
                            case "before":
                                _37d(node, _384);
                                break;
                            case "after":
                                _37f(node, _384);
                                break;
                            case "replace":
                                _384.parentNode.replaceChild(node, _384);
                                break;
                            case "only":
                                _373.empty(_384);
                                _384.appendChild(node);
                                break;
                            case "first":
                                if (_384.firstChild) {
                                    _37d(node, _384.firstChild);
                                    break;
                                }
                            default:
                                _384.appendChild(node);
                        }
                    }
                    return node;
                };
                var _37b = _373.create = function _37b(tag, _386, _387, pos) {
                    var doc = win.doc;
                    if (_387) {
                        _387 = dom.byId(_387);
                        doc = _387.ownerDocument;
                    }
                    if (typeof tag == "string") {
                        tag = doc.createElement(tag);
                    }
                    if (_386) {
                        attr.set(tag, _386);
                    }
                    if (_387) {
                        _373.place(tag, _387, pos);
                    }
                    return tag;
                };

                function _388(node) {
                    if ("innerHTML" in node) {
                        try {
                            node.innerHTML = "";
                            return;
                        } catch (e) {
                        }
                    }
                    for (var c; c = node.lastChild;) {
                        node.removeChild(c);
                    }
                };
                _373.empty = function empty(node) {
                    _388(dom.byId(node));
                };
                function _389(node, _38a) {
                    if (node.firstChild) {
                        _388(node);
                    }
                    if (_38a) {
                        has("ie") && _38a.canHaveChildren && "removeNode" in node ? node.removeNode(false) : _38a.removeChild(node);
                    }
                };
                var _37c = _373.destroy = function _37c(node) {
                    node = dom.byId(node);
                    if (!node) {
                        return;
                    }
                    _389(node, node.parentNode);
                };
            });
        }, "dijit/_WidgetsInTemplateMixin": function () {
            define(["dojo/_base/array", "dojo/aspect", "dojo/_base/declare", "dojo/_base/lang", "dojo/parser"], function (_38b, _38c, _38d, lang, _38e) {
                return _38d("dijit._WidgetsInTemplateMixin", null, {
                    _earlyTemplatedStartup: false,
                    contextRequire: null,
                    _beforeFillContent: function () {
                        if (/dojoType|data-dojo-type/i.test(this.domNode.innerHTML)) {
                            var node = this.domNode;
                            if (this.containerNode && !this.searchContainerNode) {
                                this.containerNode.stopParser = true;
                            }
                            _38e.parse(node, {
                                noStart: !this._earlyTemplatedStartup,
                                template: true,
                                inherited: {dir: this.dir, lang: this.lang, textDir: this.textDir},
                                propsThis: this,
                                contextRequire: this.contextRequire,
                                scope: "dojo"
                            }).then(lang.hitch(this, function (_38f) {
                                this._startupWidgets = _38f;
                                for (var i = 0; i < _38f.length; i++) {
                                    this._processTemplateNode(_38f[i], function (n, p) {
                                        return n[p];
                                    }, function (_390, type, _391) {
                                        if (type in _390) {
                                            return _390.connect(_390, type, _391);
                                        } else {
                                            return _390.on(type, _391, true);
                                        }
                                    });
                                }
                                if (this.containerNode && this.containerNode.stopParser) {
                                    delete this.containerNode.stopParser;
                                }
                            }));
                            if (!this._startupWidgets) {
                                throw new Error(this.declaredClass + ": parser returned unfilled promise (probably waiting for module auto-load), " + "unsupported by _WidgetsInTemplateMixin.   Must pre-load all supporting widgets before instantiation.");
                            }
                        }
                    },
                    _processTemplateNode: function (_392, _393, _394) {
                        if (_393(_392, "dojoType") || _393(_392, "data-dojo-type")) {
                            return true;
                        }
                        return this.inherited(arguments);
                    },
                    startup: function () {
                        _38b.forEach(this._startupWidgets, function (w) {
                            if (w && !w._started && w.startup) {
                                w.startup();
                            }
                        });
                        this._startupWidgets = null;
                        this.inherited(arguments);
                    }
                });
            });
        }, "dojo/_base/browser": function () {
            if (require.has) {
                require.has.add("config-selectorEngine", "acme");
            }
            define(["../ready", "./kernel", "./connect", "./unload", "./window", "./event", "./html", "./NodeList", "../query", "./xhr", "./fx"], function (dojo) {
                return dojo;
            });
        }, "dojo/sniff": function () {
            define(["./has"], function (has) {
                if (1) {
                    var n = navigator, dua = n.userAgent, dav = n.appVersion, tv = parseFloat(dav);
                    has.add("air", dua.indexOf("AdobeAIR") >= 0);
                    has.add("wp", parseFloat(dua.split("Windows Phone")[1]) || undefined);
                    has.add("msapp", parseFloat(dua.split("MSAppHost/")[1]) || undefined);
                    has.add("khtml", dav.indexOf("Konqueror") >= 0 ? tv : undefined);
                    has.add("edge", parseFloat(dua.split("Edge/")[1]) || undefined);
                    has.add("opr", parseFloat(dua.split("OPR/")[1]) || undefined);
                    has.add("webkit", !has("wp") && !has("edge") && parseFloat(dua.split("WebKit/")[1]) || undefined);
                    has.add("chrome", !has("edge") && !has("opr") && parseFloat(dua.split("Chrome/")[1]) || undefined);
                    has.add("android", !has("wp") && parseFloat(dua.split("Android ")[1]) || undefined);
                    has.add("safari", dav.indexOf("Safari") >= 0 && !has("wp") && !has("chrome") && !has("android") && !has("edge") && !has("opr") ? parseFloat(dav.split("Version/")[1]) : undefined);
                    has.add("mac", dav.indexOf("Macintosh") >= 0);
                    has.add("quirks", document.compatMode == "BackCompat");
                    if (!has("wp") && dua.match(/(iPhone|iPod|iPad)/)) {
                        var p = RegExp.$1.replace(/P/, "p");
                        var v = dua.match(/OS ([\d_]+)/) ? RegExp.$1 : "1";
                        var os = parseFloat(v.replace(/_/, ".").replace(/_/g, ""));
                        has.add(p, os);
                        has.add("ios", os);
                    }
                    has.add("bb", (dua.indexOf("BlackBerry") >= 0 || dua.indexOf("BB10") >= 0) && parseFloat(dua.split("Version/")[1]) || undefined);
                    has.add("trident", parseFloat(dav.split("Trident/")[1]) || undefined);
                    has.add("svg", typeof SVGAngle !== "undefined");
                    if (!has("webkit")) {
                        if (dua.indexOf("Opera") >= 0) {
                            has.add("opera", tv >= 9.8 ? parseFloat(dua.split("Version/")[1]) || tv : tv);
                        }
                        if (dua.indexOf("Gecko") >= 0 && !has("wp") && !has("khtml") && !has("trident") && !has("edge")) {
                            has.add("mozilla", tv);
                        }
                        if (has("mozilla")) {
                            has.add("ff", parseFloat(dua.split("Firefox/")[1] || dua.split("Minefield/")[1]) || undefined);
                        }
                        if (document.all && !has("opera")) {
                            var isIE = parseFloat(dav.split("MSIE ")[1]) || undefined;
                            var mode = document.documentMode;
                            if (mode && mode != 5 && Math.floor(isIE) != mode) {
                                isIE = mode;
                            }
                            has.add("ie", isIE);
                        }
                        has.add("wii", typeof opera != "undefined" && opera.wiiremote);
                    }
                }
                return has;
            });
        }, "dojo/_base/event": function () {
            define(["./kernel", "../on", "../has", "../dom-geometry"], function (dojo, on, has, dom) {
                if (on._fixEvent) {
                    var _395 = on._fixEvent;
                    on._fixEvent = function (evt, se) {
                        evt = _395(evt, se);
                        if (evt) {
                            dom.normalizeEvent(evt);
                        }
                        return evt;
                    };
                }
                var ret = {
                    fix: function (evt, _396) {
                        if (on._fixEvent) {
                            return on._fixEvent(evt, _396);
                        }
                        return evt;
                    }, stop: function (evt) {
                        if (has("dom-addeventlistener") || (evt && evt.preventDefault)) {
                            evt.preventDefault();
                            evt.stopPropagation();
                        } else {
                            evt = evt || window.event;
                            evt.cancelBubble = true;
                            on._preventDefault.call(evt);
                        }
                    }
                };
                if (1) {
                    dojo.fixEvent = ret.fix;
                    dojo.stopEvent = ret.stop;
                }
                return ret;
            });
        }, "dojo/Stateful": function () {
            define(["./_base/declare", "./_base/lang", "./_base/array", "./when"], function (_397, lang, _398, when) {
                return _397("dojo.Stateful", null, {
                    _attrPairNames: {}, _getAttrNames: function (name) {
                        var apn = this._attrPairNames;
                        if (apn[name]) {
                            return apn[name];
                        }
                        return (apn[name] = {s: "_" + name + "Setter", g: "_" + name + "Getter"});
                    }, postscript: function (_399) {
                        if (_399) {
                            this.set(_399);
                        }
                    }, _get: function (name, _39a) {
                        return typeof this[_39a.g] === "function" ? this[_39a.g]() : this[name];
                    }, get: function (name) {
                        return this._get(name, this._getAttrNames(name));
                    }, set: function (name, _39b) {
                        if (typeof name === "object") {
                            for (var x in name) {
                                if (name.hasOwnProperty(x) && x != "_watchCallbacks") {
                                    this.set(x, name[x]);
                                }
                            }
                            return this;
                        }
                        var _39c = this._getAttrNames(name), _39d = this._get(name, _39c), _39e = this[_39c.s], _39f;
                        if (typeof _39e === "function") {
                            _39f = _39e.apply(this, Array.prototype.slice.call(arguments, 1));
                        } else {
                            this[name] = _39b;
                        }
                        if (this._watchCallbacks) {
                            var self = this;
                            when(_39f, function () {
                                self._watchCallbacks(name, _39d, _39b);
                            });
                        }
                        return this;
                    }, _changeAttrValue: function (name, _3a0) {
                        var _3a1 = this.get(name);
                        this[name] = _3a0;
                        if (this._watchCallbacks) {
                            this._watchCallbacks(name, _3a1, _3a0);
                        }
                        return this;
                    }, watch: function (name, _3a2) {
                        var _3a3 = this._watchCallbacks;
                        if (!_3a3) {
                            var self = this;
                            _3a3 = this._watchCallbacks = function (name, _3a4, _3a5, _3a6) {
                                var _3a7 = function (_3a8) {
                                    if (_3a8) {
                                        _3a8 = _3a8.slice();
                                        for (var i = 0, l = _3a8.length; i < l; i++) {
                                            _3a8[i].call(self, name, _3a4, _3a5);
                                        }
                                    }
                                };
                                _3a7(_3a3["_" + name]);
                                if (!_3a6) {
                                    _3a7(_3a3["*"]);
                                }
                            };
                        }
                        if (!_3a2 && typeof name === "function") {
                            _3a2 = name;
                            name = "*";
                        } else {
                            name = "_" + name;
                        }
                        var _3a9 = _3a3[name];
                        if (typeof _3a9 !== "object") {
                            _3a9 = _3a3[name] = [];
                        }
                        _3a9.push(_3a2);
                        var _3aa = {};
                        _3aa.unwatch = _3aa.remove = function () {
                            var _3ab = _398.indexOf(_3a9, _3a2);
                            if (_3ab > -1) {
                                _3a9.splice(_3ab, 1);
                            }
                        };
                        return _3aa;
                    }
                });
            });
        }, "dojo/touch": function () {
            define(["./_base/kernel", "./aspect", "./dom", "./dom-class", "./_base/lang", "./on", "./has", "./mouse", "./domReady", "./_base/window"], function (dojo, _3ac, dom, _3ad, lang, on, has, _3ae, _3af, win) {
                var ios4 = has("ios") < 5;
                var _3b0 = has("pointer-events") || has("MSPointer"), _3b1 = (function () {
                    var _3b2 = {};
                    for (var type in {down: 1, move: 1, up: 1, cancel: 1, over: 1, out: 1}) {
                        _3b2[type] = has("MSPointer") ? "MSPointer" + type.charAt(0).toUpperCase() + type.slice(1) : "pointer" + type;
                    }
                    return _3b2;
                })();
                var _3b3 = has("touch-events");
                var _3b4, _3b5, _3b6 = false, _3b7, _3b8, _3b9, _3ba, _3bb, _3bc;
                var _3bd;

                function _3be(_3bf, _3c0, _3c1) {
                    if (_3b0 && _3c1) {
                        return function (node, _3c2) {
                            return on(node, _3c1, _3c2);
                        };
                    } else {
                        if (_3b3) {
                            return function (node, _3c3) {
                                var _3c4 = on(node, _3c0, function (evt) {
                                    _3c3.call(this, evt);
                                    _3bd = (new Date()).getTime();
                                }), _3c5 = on(node, _3bf, function (evt) {
                                    if (!_3bd || (new Date()).getTime() > _3bd + 1000) {
                                        _3c3.call(this, evt);
                                    }
                                });
                                return {
                                    remove: function () {
                                        _3c4.remove();
                                        _3c5.remove();
                                    }
                                };
                            };
                        } else {
                            return function (node, _3c6) {
                                return on(node, _3bf, _3c6);
                            };
                        }
                    }
                };
                function _3c7(node) {
                    do {
                        if (node.dojoClick !== undefined) {
                            return node;
                        }
                    } while (node = node.parentNode);
                };
                function _3c8(e, _3c9, _3ca) {
                    if (_3ae.isRight(e)) {
                        return;
                    }
                    var _3cb = _3c7(e.target);
                    _3b5 = !e.target.disabled && _3cb && _3cb.dojoClick;
                    if (_3b5) {
                        _3b6 = (_3b5 == "useTarget");
                        _3b7 = (_3b6 ? _3cb : e.target);
                        if (_3b6) {
                            e.preventDefault();
                        }
                        _3b8 = e.changedTouches ? e.changedTouches[0].pageX - win.global.pageXOffset : e.clientX;
                        _3b9 = e.changedTouches ? e.changedTouches[0].pageY - win.global.pageYOffset : e.clientY;
                        _3ba = (typeof _3b5 == "object" ? _3b5.x : (typeof _3b5 == "number" ? _3b5 : 0)) || 4;
                        _3bb = (typeof _3b5 == "object" ? _3b5.y : (typeof _3b5 == "number" ? _3b5 : 0)) || 4;
                        if (!_3b4) {
                            _3b4 = true;
                            function _3cc(e) {
                                if (_3b6) {
                                    _3b5 = dom.isDescendant(win.doc.elementFromPoint((e.changedTouches ? e.changedTouches[0].pageX - win.global.pageXOffset : e.clientX), (e.changedTouches ? e.changedTouches[0].pageY - win.global.pageYOffset : e.clientY)), _3b7);
                                } else {
                                    _3b5 = _3b5 && (e.changedTouches ? e.changedTouches[0].target : e.target) == _3b7 && Math.abs((e.changedTouches ? e.changedTouches[0].pageX - win.global.pageXOffset : e.clientX) - _3b8) <= _3ba && Math.abs((e.changedTouches ? e.changedTouches[0].pageY - win.global.pageYOffset : e.clientY) - _3b9) <= _3bb;
                                }
                            };
                            win.doc.addEventListener(_3c9, function (e) {
                                if (_3ae.isRight(e)) {
                                    return;
                                }
                                _3cc(e);
                                if (_3b6) {
                                    e.preventDefault();
                                }
                            }, true);
                            win.doc.addEventListener(_3ca, function (e) {
                                if (_3ae.isRight(e)) {
                                    return;
                                }
                                _3cc(e);
                                if (_3b5) {
                                    _3bc = (new Date()).getTime();
                                    var _3cd = (_3b6 ? _3b7 : e.target);
                                    if (_3cd.tagName === "LABEL") {
                                        _3cd = dom.byId(_3cd.getAttribute("for")) || _3cd;
                                    }
                                    var src = (e.changedTouches) ? e.changedTouches[0] : e;

                                    function _3ce(type) {
                                        var evt = document.createEvent("MouseEvents");
                                        evt._dojo_click = true;
                                        evt.initMouseEvent(type, true, true, e.view, e.detail, src.screenX, src.screenY, src.clientX, src.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null);
                                        return evt;
                                    };
                                    var _3cf = _3ce("mousedown");
                                    var _3d0 = _3ce("mouseup");
                                    var _3d1 = _3ce("click");
                                    setTimeout(function () {
                                        on.emit(_3cd, "mousedown", _3cf);
                                        on.emit(_3cd, "mouseup", _3d0);
                                        on.emit(_3cd, "click", _3d1);
                                        _3bc = (new Date()).getTime();
                                    }, 0);
                                }
                            }, true);
                            function _3d2(type) {
                                win.doc.addEventListener(type, function (e) {
                                    var _3d3 = e.target;
                                    if (_3b5 && !e._dojo_click && (new Date()).getTime() <= _3bc + 1000 && !(_3d3.tagName == "INPUT" && _3ad.contains(_3d3, "dijitOffScreen"))) {
                                        e.stopPropagation();
                                        e.stopImmediatePropagation && e.stopImmediatePropagation();
                                        if (type == "click" && (_3d3.tagName != "INPUT" || (_3d3.type == "radio" && (_3ad.contains(_3d3, "dijitCheckBoxInput") || _3ad.contains(_3d3, "mblRadioButton"))) || (_3d3.type == "checkbox" && (_3ad.contains(_3d3, "dijitCheckBoxInput") || _3ad.contains(_3d3, "mblCheckBox")))) && _3d3.tagName != "TEXTAREA" && _3d3.tagName != "AUDIO" && _3d3.tagName != "VIDEO") {
                                            e.preventDefault();
                                        }
                                    }
                                }, true);
                            };
                            _3d2("click");
                            _3d2("mousedown");
                            _3d2("mouseup");
                        }
                    }
                };
                var _3d4;
                if (has("touch")) {
                    if (_3b0) {
                        _3af(function () {
                            win.doc.addEventListener(_3b1.down, function (evt) {
                                _3c8(evt, _3b1.move, _3b1.up);
                            }, true);
                        });
                    } else {
                        _3af(function () {
                            _3d4 = win.body();
                            win.doc.addEventListener("touchstart", function (evt) {
                                _3bd = (new Date()).getTime();
                                var _3d5 = _3d4;
                                _3d4 = evt.target;
                                on.emit(_3d5, "dojotouchout", {relatedTarget: _3d4, bubbles: true});
                                on.emit(_3d4, "dojotouchover", {relatedTarget: _3d5, bubbles: true});
                                _3c8(evt, "touchmove", "touchend");
                            }, true);
                            function _3d6(evt) {
                                var _3d7 = lang.delegate(evt, {bubbles: true});
                                if (has("ios") >= 6) {
                                    _3d7.touches = evt.touches;
                                    _3d7.altKey = evt.altKey;
                                    _3d7.changedTouches = evt.changedTouches;
                                    _3d7.ctrlKey = evt.ctrlKey;
                                    _3d7.metaKey = evt.metaKey;
                                    _3d7.shiftKey = evt.shiftKey;
                                    _3d7.targetTouches = evt.targetTouches;
                                }
                                return _3d7;
                            };
                            on(win.doc, "touchmove", function (evt) {
                                _3bd = (new Date()).getTime();
                                var _3d8 = win.doc.elementFromPoint(evt.pageX - (ios4 ? 0 : win.global.pageXOffset), evt.pageY - (ios4 ? 0 : win.global.pageYOffset));
                                if (_3d8) {
                                    if (_3d4 !== _3d8) {
                                        on.emit(_3d4, "dojotouchout", {relatedTarget: _3d8, bubbles: true});
                                        on.emit(_3d8, "dojotouchover", {relatedTarget: _3d4, bubbles: true});
                                        _3d4 = _3d8;
                                    }
                                    if (!on.emit(_3d8, "dojotouchmove", _3d6(evt))) {
                                        evt.preventDefault();
                                    }
                                }
                            });
                            on(win.doc, "touchend", function (evt) {
                                _3bd = (new Date()).getTime();
                                var node = win.doc.elementFromPoint(evt.pageX - (ios4 ? 0 : win.global.pageXOffset), evt.pageY - (ios4 ? 0 : win.global.pageYOffset)) || win.body();
                                on.emit(node, "dojotouchend", _3d6(evt));
                            });
                        });
                    }
                }
                var _3d9 = {
                    press: _3be("mousedown", "touchstart", _3b1.down),
                    move: _3be("mousemove", "dojotouchmove", _3b1.move),
                    release: _3be("mouseup", "dojotouchend", _3b1.up),
                    cancel: _3be(_3ae.leave, "touchcancel", _3b0 ? _3b1.cancel : null),
                    over: _3be("mouseover", "dojotouchover", _3b1.over),
                    out: _3be("mouseout", "dojotouchout", _3b1.out),
                    enter: _3ae._eventHandler(_3be("mouseover", "dojotouchover", _3b1.over)),
                    leave: _3ae._eventHandler(_3be("mouseout", "dojotouchout", _3b1.out))
                };
                1 && (dojo.touch = _3d9);
                return _3d9;
            });
        }, "dojo/Deferred": function () {
            define(["./has", "./_base/lang", "./errors/CancelError", "./promise/Promise", "./promise/instrumentation"], function (has, lang, _3da, _3db, _3dc) {
                "use strict";
                var _3dd = 0, _3de = 1, _3df = 2;
                var _3e0 = "This deferred has already been fulfilled.";
                var _3e1 = Object.freeze || function () {
                    };
                var _3e2 = function (_3e3, type, _3e4, _3e5, _3e6) {
                    if (1) {
                        if (type === _3df && _3e7.instrumentRejected && _3e3.length === 0) {
                            _3e7.instrumentRejected(_3e4, false, _3e5, _3e6);
                        }
                    }
                    for (var i = 0; i < _3e3.length; i++) {
                        _3e8(_3e3[i], type, _3e4, _3e5);
                    }
                };
                var _3e8 = function (_3e9, type, _3ea, _3eb) {
                    var func = _3e9[type];
                    var _3ec = _3e9.deferred;
                    if (func) {
                        try {
                            var _3ed = func(_3ea);
                            if (type === _3dd) {
                                if (typeof _3ed !== "undefined") {
                                    _3ee(_3ec, type, _3ed);
                                }
                            } else {
                                if (_3ed && typeof _3ed.then === "function") {
                                    _3e9.cancel = _3ed.cancel;
                                    _3ed.then(_3ef(_3ec, _3de), _3ef(_3ec, _3df), _3ef(_3ec, _3dd));
                                    return;
                                }
                                _3ee(_3ec, _3de, _3ed);
                            }
                        } catch (error) {
                            _3ee(_3ec, _3df, error);
                        }
                    } else {
                        _3ee(_3ec, type, _3ea);
                    }
                    if (1) {
                        if (type === _3df && _3e7.instrumentRejected) {
                            _3e7.instrumentRejected(_3ea, !!func, _3eb, _3ec.promise);
                        }
                    }
                };
                var _3ef = function (_3f0, type) {
                    return function (_3f1) {
                        _3ee(_3f0, type, _3f1);
                    };
                };
                var _3ee = function (_3f2, type, _3f3) {
                    if (!_3f2.isCanceled()) {
                        switch (type) {
                            case _3dd:
                                _3f2.progress(_3f3);
                                break;
                            case _3de:
                                _3f2.resolve(_3f3);
                                break;
                            case _3df:
                                _3f2.reject(_3f3);
                                break;
                        }
                    }
                };
                var _3e7 = function (_3f4) {
                    var _3f5 = this.promise = new _3db();
                    var _3f6 = this;
                    var _3f7, _3f8, _3f9;
                    var _3fa = false;
                    var _3fb = [];
                    if (1 && Error.captureStackTrace) {
                        Error.captureStackTrace(_3f6, _3e7);
                        Error.captureStackTrace(_3f5, _3e7);
                    }
                    this.isResolved = _3f5.isResolved = function () {
                        return _3f7 === _3de;
                    };
                    this.isRejected = _3f5.isRejected = function () {
                        return _3f7 === _3df;
                    };
                    this.isFulfilled = _3f5.isFulfilled = function () {
                        return !!_3f7;
                    };
                    this.isCanceled = _3f5.isCanceled = function () {
                        return _3fa;
                    };
                    this.progress = function (_3fc, _3fd) {
                        if (!_3f7) {
                            _3e2(_3fb, _3dd, _3fc, null, _3f6);
                            return _3f5;
                        } else {
                            if (_3fd === true) {
                                throw new Error(_3e0);
                            } else {
                                return _3f5;
                            }
                        }
                    };
                    this.resolve = function (_3fe, _3ff) {
                        if (!_3f7) {
                            _3e2(_3fb, _3f7 = _3de, _3f8 = _3fe, null, _3f6);
                            _3fb = null;
                            return _3f5;
                        } else {
                            if (_3ff === true) {
                                throw new Error(_3e0);
                            } else {
                                return _3f5;
                            }
                        }
                    };
                    var _400 = this.reject = function (_401, _402) {
                        if (!_3f7) {
                            if (1 && Error.captureStackTrace) {
                                Error.captureStackTrace(_3f9 = {}, _400);
                            }
                            _3e2(_3fb, _3f7 = _3df, _3f8 = _401, _3f9, _3f6);
                            _3fb = null;
                            return _3f5;
                        } else {
                            if (_402 === true) {
                                throw new Error(_3e0);
                            } else {
                                return _3f5;
                            }
                        }
                    };
                    this.then = _3f5.then = function (_403, _404, _405) {
                        var _406 = [_405, _403, _404];
                        _406.cancel = _3f5.cancel;
                        _406.deferred = new _3e7(function (_407) {
                            return _406.cancel && _406.cancel(_407);
                        });
                        if (_3f7 && !_3fb) {
                            _3e8(_406, _3f7, _3f8, _3f9);
                        } else {
                            _3fb.push(_406);
                        }
                        return _406.deferred.promise;
                    };
                    this.cancel = _3f5.cancel = function (_408, _409) {
                        if (!_3f7) {
                            if (_3f4) {
                                var _40a = _3f4(_408);
                                _408 = typeof _40a === "undefined" ? _408 : _40a;
                            }
                            _3fa = true;
                            if (!_3f7) {
                                if (typeof _408 === "undefined") {
                                    _408 = new _3da();
                                }
                                _400(_408);
                                return _408;
                            } else {
                                if (_3f7 === _3df && _3f8 === _408) {
                                    return _408;
                                }
                            }
                        } else {
                            if (_409 === true) {
                                throw new Error(_3e0);
                            }
                        }
                    };
                    _3e1(_3f5);
                };
                _3e7.prototype.toString = function () {
                    return "[object Deferred]";
                };
                if (_3dc) {
                    _3dc(_3e7);
                }
                return _3e7;
            });
        }, "dojo/_base/url": function () {
            define(["./kernel"], function (dojo) {
                var ore = new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$"), ire = new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$"), _40b = function () {
                    var n = null, _40c = arguments, uri = [_40c[0]];
                    for (var i = 1; i < _40c.length; i++) {
                        if (!_40c[i]) {
                            continue;
                        }
                        var _40d = new _40b(_40c[i] + ""), _40e = new _40b(uri[0] + "");
                        if (_40d.path == "" && !_40d.scheme && !_40d.authority && !_40d.query) {
                            if (_40d.fragment != n) {
                                _40e.fragment = _40d.fragment;
                            }
                            _40d = _40e;
                        } else {
                            if (!_40d.scheme) {
                                _40d.scheme = _40e.scheme;
                                if (!_40d.authority) {
                                    _40d.authority = _40e.authority;
                                    if (_40d.path.charAt(0) != "/") {
                                        var path = _40e.path.substring(0, _40e.path.lastIndexOf("/") + 1) + _40d.path;
                                        var segs = path.split("/");
                                        for (var j = 0; j < segs.length; j++) {
                                            if (segs[j] == ".") {
                                                if (j == segs.length - 1) {
                                                    segs[j] = "";
                                                } else {
                                                    segs.splice(j, 1);
                                                    j--;
                                                }
                                            } else {
                                                if (j > 0 && !(j == 1 && segs[0] == "") && segs[j] == ".." && segs[j - 1] != "..") {
                                                    if (j == (segs.length - 1)) {
                                                        segs.splice(j, 1);
                                                        segs[j - 1] = "";
                                                    } else {
                                                        segs.splice(j - 1, 2);
                                                        j -= 2;
                                                    }
                                                }
                                            }
                                        }
                                        _40d.path = segs.join("/");
                                    }
                                }
                            }
                        }
                        uri = [];
                        if (_40d.scheme) {
                            uri.push(_40d.scheme, ":");
                        }
                        if (_40d.authority) {
                            uri.push("//", _40d.authority);
                        }
                        uri.push(_40d.path);
                        if (_40d.query) {
                            uri.push("?", _40d.query);
                        }
                        if (_40d.fragment) {
                            uri.push("#", _40d.fragment);
                        }
                    }
                    this.uri = uri.join("");
                    var r = this.uri.match(ore);
                    this.scheme = r[2] || (r[1] ? "" : n);
                    this.authority = r[4] || (r[3] ? "" : n);
                    this.path = r[5];
                    this.query = r[7] || (r[6] ? "" : n);
                    this.fragment = r[9] || (r[8] ? "" : n);
                    if (this.authority != n) {
                        r = this.authority.match(ire);
                        this.user = r[3] || n;
                        this.password = r[4] || n;
                        this.host = r[6] || r[7];
                        this.port = r[9] || n;
                    }
                };
                _40b.prototype.toString = function () {
                    return this.uri;
                };
                return dojo._Url = _40b;
            });
        }, "dojo/hccss": function () {
            define(["require", "./_base/config", "./dom-class", "./dom-style", "./has", "./domReady", "./_base/window"], function (_40f, _410, _411, _412, has, _413, win) {
                has.add("highcontrast", function () {
                    var div = win.doc.createElement("div");
                    try {
                        div.style.cssText = "border: 1px solid; border-color:red green; position: absolute; height: 5px; top: -999px;" + "background-image: url(\"" + (_410.blankGif || _40f.toUrl("./resources/blank.gif")) + "\");";
                        win.body().appendChild(div);
                        var cs = _412.getComputedStyle(div), _414 = cs.backgroundImage;
                        return cs.borderTopColor == cs.borderRightColor || (_414 && (_414 == "none" || _414 == "url(invalid-url:)"));
                    } catch (e) {
                        console.warn("hccss: exception detecting high-contrast mode, document is likely hidden: " + e.toString());
                        return false;
                    } finally {
                        if (has("ie") <= 8) {
                            div.outerHTML = "";
                        } else {
                            win.body().removeChild(div);
                        }
                    }
                });
                _413(function () {
                    if (has("highcontrast")) {
                        _411.add(win.body(), "dj_a11y");
                    }
                });
                return has;
            });
        }, "dojo/string": function () {
            define(["./_base/kernel", "./_base/lang"], function (_415, lang) {
                var _416 = /[&<>'"\/]/g;
                var _417 = {"&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#x27;", "/": "&#x2F;"};
                var _418 = {};
                lang.setObject("dojo.string", _418);
                _418.escape = function (str) {
                    if (!str) {
                        return "";
                    }
                    return str.replace(_416, function (c) {
                        return _417[c];
                    });
                };
                _418.rep = function (str, num) {
                    if (num <= 0 || !str) {
                        return "";
                    }
                    var buf = [];
                    for (; ;) {
                        if (num & 1) {
                            buf.push(str);
                        }
                        if (!(num >>= 1)) {
                            break;
                        }
                        str += str;
                    }
                    return buf.join("");
                };
                _418.pad = function (text, size, ch, end) {
                    if (!ch) {
                        ch = "0";
                    }
                    var out = String(text), pad = _418.rep(ch, Math.ceil((size - out.length) / ch.length));
                    return end ? out + pad : pad + out;
                };
                _418.substitute = function (_419, map, _41a, _41b) {
                    _41b = _41b || _415.global;
                    _41a = _41a ? lang.hitch(_41b, _41a) : function (v) {
                        return v;
                    };
                    return _419.replace(/\$\{([^\s\:\}]*)(?:\:([^\s\:\}]+))?\}/g, function (_41c, key, _41d) {
                        if (key == "") {
                            return "$";
                        }
                        var _41e = lang.getObject(key, false, map);
                        if (_41d) {
                            _41e = lang.getObject(_41d, false, _41b).call(_41b, _41e, key);
                        }
                        var _41f = _41a(_41e, key);
                        if (typeof _41f === "undefined") {
                            throw new Error("string.substitute could not find key \"" + key + "\" in template");
                        }
                        return _41f.toString();
                    });
                };
                _418.trim = String.prototype.trim ? lang.trim : function (str) {
                    str = str.replace(/^\s+/, "");
                    for (var i = str.length - 1; i >= 0; i--) {
                        if (/\S/.test(str.charAt(i))) {
                            str = str.substring(0, i + 1);
                            break;
                        }
                    }
                    return str;
                };
                return _418;
            });
        }, "dojo/domReady": function () {
            define(["./has"], function (has) {
                var _420 = (function () {
                    return this;
                })(), doc = document, _421 = {
                    "loaded": 1,
                    "complete": 1
                }, _422 = typeof doc.readyState != "string", _423 = !!_421[doc.readyState], _424 = [], _425;

                function _426(_427) {
                    _424.push(_427);
                    if (_423) {
                        _428();
                    }
                };
                _426.load = function (id, req, load) {
                    _426(load);
                };
                _426._Q = _424;
                _426._onQEmpty = function () {
                };
                if (_422) {
                    doc.readyState = "loading";
                }
                function _428() {
                    if (_425) {
                        return;
                    }
                    _425 = true;
                    while (_424.length) {
                        try {
                            (_424.shift())(doc);
                        } catch (err) {
                            console.error(err, "in domReady callback", err.stack);
                        }
                    }
                    _425 = false;
                    _426._onQEmpty();
                };
                if (!_423) {
                    var _429 = [], _42a = function (evt) {
                        evt = evt || _420.event;
                        if (_423 || (evt.type == "readystatechange" && !_421[doc.readyState])) {
                            return;
                        }
                        if (_422) {
                            doc.readyState = "complete";
                        }
                        _423 = 1;
                        _428();
                    }, on = function (node, _42b) {
                        node.addEventListener(_42b, _42a, false);
                        _424.push(function () {
                            node.removeEventListener(_42b, _42a, false);
                        });
                    };
                    if (!has("dom-addeventlistener")) {
                        on = function (node, _42c) {
                            _42c = "on" + _42c;
                            node.attachEvent(_42c, _42a);
                            _424.push(function () {
                                node.detachEvent(_42c, _42a);
                            });
                        };
                        var div = doc.createElement("div");
                        try {
                            if (div.doScroll && _420.frameElement === null) {
                                _429.push(function () {
                                    try {
                                        div.doScroll("left");
                                        return 1;
                                    } catch (e) {
                                    }
                                });
                            }
                        } catch (e) {
                        }
                    }
                    on(doc, "DOMContentLoaded");
                    on(_420, "load");
                    if ("onreadystatechange" in doc) {
                        on(doc, "readystatechange");
                    } else {
                        if (!_422) {
                            _429.push(function () {
                                return _421[doc.readyState];
                            });
                        }
                    }
                    if (_429.length) {
                        var _42d = function () {
                            if (_423) {
                                return;
                            }
                            var i = _429.length;
                            while (i--) {
                                if (_429[i]()) {
                                    _42a("poller");
                                    return;
                                }
                            }
                            setTimeout(_42d, 30);
                        };
                        _42d();
                    }
                }
                return _426;
            });
        }, "dojo/dom-prop": function () {
            define(["exports", "./_base/kernel", "./sniff", "./_base/lang", "./dom", "./dom-style", "./dom-construct", "./_base/connect"], function (_42e, dojo, has, lang, dom, _42f, ctr, conn) {
                var _430 = {}, _431 = 1, _432 = dojo._scopeName + "attrid";
                has.add("dom-textContent", function (_433, doc, _434) {
                    return "textContent" in _434;
                });
                _42e.names = {
                    "class": "className",
                    "for": "htmlFor",
                    tabindex: "tabIndex",
                    readonly: "readOnly",
                    colspan: "colSpan",
                    frameborder: "frameBorder",
                    rowspan: "rowSpan",
                    textcontent: "textContent",
                    valuetype: "valueType"
                };
                function _435(node) {
                    var text = "", ch = node.childNodes;
                    for (var i = 0, n; n = ch[i]; i++) {
                        if (n.nodeType != 8) {
                            if (n.nodeType == 1) {
                                text += _435(n);
                            } else {
                                text += n.nodeValue;
                            }
                        }
                    }
                    return text;
                };
                _42e.get = function getProp(node, name) {
                    node = dom.byId(node);
                    var lc = name.toLowerCase(), _436 = _42e.names[lc] || name;
                    if (_436 == "textContent" && !has("dom-textContent")) {
                        return _435(node);
                    }
                    return node[_436];
                };
                _42e.set = function setProp(node, name, _437) {
                    node = dom.byId(node);
                    var l = arguments.length;
                    if (l == 2 && typeof name != "string") {
                        for (var x in name) {
                            _42e.set(node, x, name[x]);
                        }
                        return node;
                    }
                    var lc = name.toLowerCase(), _438 = _42e.names[lc] || name;
                    if (_438 == "style" && typeof _437 != "string") {
                        _42f.set(node, _437);
                        return node;
                    }
                    if (_438 == "innerHTML") {
                        if (has("ie") && node.tagName.toLowerCase() in {
                                col: 1,
                                colgroup: 1,
                                table: 1,
                                tbody: 1,
                                tfoot: 1,
                                thead: 1,
                                tr: 1,
                                title: 1
                            }) {
                            ctr.empty(node);
                            node.appendChild(ctr.toDom(_437, node.ownerDocument));
                        } else {
                            node[_438] = _437;
                        }
                        return node;
                    }
                    if (_438 == "textContent" && !has("dom-textContent")) {
                        ctr.empty(node);
                        node.appendChild(node.ownerDocument.createTextNode(_437));
                        return node;
                    }
                    if (lang.isFunction(_437)) {
                        var _439 = node[_432];
                        if (!_439) {
                            _439 = _431++;
                            node[_432] = _439;
                        }
                        if (!_430[_439]) {
                            _430[_439] = {};
                        }
                        var h = _430[_439][_438];
                        if (h) {
                            conn.disconnect(h);
                        } else {
                            try {
                                delete node[_438];
                            } catch (e) {
                            }
                        }
                        if (_437) {
                            _430[_439][_438] = conn.connect(node, _438, _437);
                        } else {
                            node[_438] = null;
                        }
                        return node;
                    }
                    node[_438] = _437;
                    return node;
                };
            });
        }, "dijit/_AttachMixin": function () {
            define(["require", "dojo/_base/array", "dojo/_base/connect", "dojo/_base/declare", "dojo/_base/lang", "dojo/mouse", "dojo/on", "dojo/touch", "./_WidgetBase"], function (_43a, _43b, _43c, _43d, lang, _43e, on, _43f, _440) {
                var _441 = lang.delegate(_43f, {
                    "mouseenter": _43e.enter,
                    "mouseleave": _43e.leave,
                    "keypress": _43c._keypress
                });
                var _442;
                var _443 = _43d("dijit._AttachMixin", null, {
                    constructor: function () {
                        this._attachPoints = [];
                        this._attachEvents = [];
                    }, buildRendering: function () {
                        this.inherited(arguments);
                        this._attachTemplateNodes(this.domNode);
                        this._beforeFillContent();
                    }, _beforeFillContent: function () {
                    }, _attachTemplateNodes: function (_444) {
                        var node = _444;
                        while (true) {
                            if (node.nodeType == 1 && (this._processTemplateNode(node, function (n, p) {
                                    return n.getAttribute(p);
                                }, this._attach) || this.searchContainerNode) && node.firstChild) {
                                node = node.firstChild;
                            } else {
                                if (node == _444) {
                                    return;
                                }
                                while (!node.nextSibling) {
                                    node = node.parentNode;
                                    if (node == _444) {
                                        return;
                                    }
                                }
                                node = node.nextSibling;
                            }
                        }
                    }, _processTemplateNode: function (_445, _446, _447) {
                        var ret = true;
                        var _448 = this.attachScope || this, _449 = _446(_445, "dojoAttachPoint") || _446(_445, "data-dojo-attach-point");
                        if (_449) {
                            var _44a, _44b = _449.split(/\s*,\s*/);
                            while ((_44a = _44b.shift())) {
                                if (lang.isArray(_448[_44a])) {
                                    _448[_44a].push(_445);
                                } else {
                                    _448[_44a] = _445;
                                }
                                ret = (_44a != "containerNode");
                                this._attachPoints.push(_44a);
                            }
                        }
                        var _44c = _446(_445, "dojoAttachEvent") || _446(_445, "data-dojo-attach-event");
                        if (_44c) {
                            var _44d, _44e = _44c.split(/\s*,\s*/);
                            var trim = lang.trim;
                            while ((_44d = _44e.shift())) {
                                if (_44d) {
                                    var _44f = null;
                                    if (_44d.indexOf(":") != -1) {
                                        var _450 = _44d.split(":");
                                        _44d = trim(_450[0]);
                                        _44f = trim(_450[1]);
                                    } else {
                                        _44d = trim(_44d);
                                    }
                                    if (!_44f) {
                                        _44f = _44d;
                                    }
                                    this._attachEvents.push(_447(_445, _44d, lang.hitch(_448, _44f)));
                                }
                            }
                        }
                        return ret;
                    }, _attach: function (node, type, func) {
                        type = type.replace(/^on/, "").toLowerCase();
                        if (type == "dijitclick") {
                            type = _442 || (_442 = _43a("./a11yclick"));
                        } else {
                            type = _441[type] || type;
                        }
                        return on(node, type, func);
                    }, _detachTemplateNodes: function () {
                        var _451 = this.attachScope || this;
                        _43b.forEach(this._attachPoints, function (_452) {
                            delete _451[_452];
                        });
                        this._attachPoints = [];
                        _43b.forEach(this._attachEvents, function (_453) {
                            _453.remove();
                        });
                        this._attachEvents = [];
                    }, destroyRendering: function () {
                        this._detachTemplateNodes();
                        this.inherited(arguments);
                    }
                });
                lang.extend(_440, {dojoAttachEvent: "", dojoAttachPoint: ""});
                return _443;
            });
        }, "dojo/keys": function () {
            define(["./_base/kernel", "./sniff"], function (dojo, has) {
                return dojo.keys = {
                    BACKSPACE: 8,
                    TAB: 9,
                    CLEAR: 12,
                    ENTER: 13,
                    SHIFT: 16,
                    CTRL: 17,
                    ALT: 18,
                    META: has("webkit") ? 91 : 224,
                    PAUSE: 19,
                    CAPS_LOCK: 20,
                    ESCAPE: 27,
                    SPACE: 32,
                    PAGE_UP: 33,
                    PAGE_DOWN: 34,
                    END: 35,
                    HOME: 36,
                    LEFT_ARROW: 37,
                    UP_ARROW: 38,
                    RIGHT_ARROW: 39,
                    DOWN_ARROW: 40,
                    INSERT: 45,
                    DELETE: 46,
                    HELP: 47,
                    LEFT_WINDOW: 91,
                    RIGHT_WINDOW: 92,
                    SELECT: 93,
                    NUMPAD_0: 96,
                    NUMPAD_1: 97,
                    NUMPAD_2: 98,
                    NUMPAD_3: 99,
                    NUMPAD_4: 100,
                    NUMPAD_5: 101,
                    NUMPAD_6: 102,
                    NUMPAD_7: 103,
                    NUMPAD_8: 104,
                    NUMPAD_9: 105,
                    NUMPAD_MULTIPLY: 106,
                    NUMPAD_PLUS: 107,
                    NUMPAD_ENTER: 108,
                    NUMPAD_MINUS: 109,
                    NUMPAD_PERIOD: 110,
                    NUMPAD_DIVIDE: 111,
                    F1: 112,
                    F2: 113,
                    F3: 114,
                    F4: 115,
                    F5: 116,
                    F6: 117,
                    F7: 118,
                    F8: 119,
                    F9: 120,
                    F10: 121,
                    F11: 122,
                    F12: 123,
                    F13: 124,
                    F14: 125,
                    F15: 126,
                    NUM_LOCK: 144,
                    SCROLL_LOCK: 145,
                    UP_DPAD: 175,
                    DOWN_DPAD: 176,
                    LEFT_DPAD: 177,
                    RIGHT_DPAD: 178,
                    copyKey: has("mac") && !has("air") ? (has("safari") ? 91 : 224) : 17
                };
            });
        }, "dojo/_base/lang": function () {
            define(["./kernel", "../has", "../sniff"], function (dojo, has) {
                has.add("bug-for-in-skips-shadowed", function () {
                    for (var i in {toString: 1}) {
                        return 0;
                    }
                    return 1;
                });
                var _454 = has("bug-for-in-skips-shadowed") ? "hasOwnProperty.valueOf.isPrototypeOf.propertyIsEnumerable.toLocaleString.toString.constructor".split(".") : [], _455 = _454.length, _456 = function (_457, _458, _459) {
                    if (!_459) {
                        if (_457[0] && dojo.scopeMap[_457[0]]) {
                            _459 = dojo.scopeMap[_457.shift()][1];
                        } else {
                            _459 = dojo.global;
                        }
                    }
                    try {
                        for (var i = 0; i < _457.length; i++) {
                            var p = _457[i];
                            if (!(p in _459)) {
                                if (_458) {
                                    _459[p] = {};
                                } else {
                                    return;
                                }
                            }
                            _459 = _459[p];
                        }
                        return _459;
                    } catch (e) {
                    }
                }, opts = Object.prototype.toString, _45a = function (obj, _45b, _45c) {
                    return (_45c || []).concat(Array.prototype.slice.call(obj, _45b || 0));
                }, _45d = /\{([^\}]+)\}/g;
                var lang = {
                    _extraNames: _454, _mixin: function (dest, _45e, _45f) {
                        var name, s, i, _460 = {};
                        for (name in _45e) {
                            s = _45e[name];
                            if (!(name in dest) || (dest[name] !== s && (!(name in _460) || _460[name] !== s))) {
                                dest[name] = _45f ? _45f(s) : s;
                            }
                        }
                        if (has("bug-for-in-skips-shadowed")) {
                            if (_45e) {
                                for (i = 0; i < _455; ++i) {
                                    name = _454[i];
                                    s = _45e[name];
                                    if (!(name in dest) || (dest[name] !== s && (!(name in _460) || _460[name] !== s))) {
                                        dest[name] = _45f ? _45f(s) : s;
                                    }
                                }
                            }
                        }
                        return dest;
                    }, mixin: function (dest, _461) {
                        if (!dest) {
                            dest = {};
                        }
                        for (var i = 1, l = arguments.length; i < l; i++) {
                            lang._mixin(dest, arguments[i]);
                        }
                        return dest;
                    }, setObject: function (name, _462, _463) {
                        var _464 = name.split("."), p = _464.pop(), obj = _456(_464, true, _463);
                        return obj && p ? (obj[p] = _462) : undefined;
                    }, getObject: function (name, _465, _466) {
                        return !name ? _466 : _456(name.split("."), _465, _466);
                    }, exists: function (name, obj) {
                        return lang.getObject(name, false, obj) !== undefined;
                    }, isString: function (it) {
                        return (typeof it == "string" || it instanceof String);
                    }, isArray: Array.isArray || function (it) {
                        return opts.call(it) == "[object Array]";
                    }, isFunction: function (it) {
                        return opts.call(it) === "[object Function]";
                    }, isObject: function (it) {
                        return it !== undefined && (it === null || typeof it == "object" || lang.isArray(it) || lang.isFunction(it));
                    }, isArrayLike: function (it) {
                        return !!it && !lang.isString(it) && !lang.isFunction(it) && !(it.tagName && it.tagName.toLowerCase() == "form") && (lang.isArray(it) || isFinite(it.length));
                    }, isAlien: function (it) {
                        return it && !lang.isFunction(it) && /\{\s*\[native code\]\s*\}/.test(String(it));
                    }, extend: function (ctor, _467) {
                        for (var i = 1, l = arguments.length; i < l; i++) {
                            lang._mixin(ctor.prototype, arguments[i]);
                        }
                        return ctor;
                    }, _hitchArgs: function (_468, _469) {
                        var pre = lang._toArray(arguments, 2);
                        var _46a = lang.isString(_469);
                        return function () {
                            var args = lang._toArray(arguments);
                            var f = _46a ? (_468 || dojo.global)[_469] : _469;
                            return f && f.apply(_468 || this, pre.concat(args));
                        };
                    }, hitch: function (_46b, _46c) {
                        if (arguments.length > 2) {
                            return lang._hitchArgs.apply(dojo, arguments);
                        }
                        if (!_46c) {
                            _46c = _46b;
                            _46b = null;
                        }
                        if (lang.isString(_46c)) {
                            _46b = _46b || dojo.global;
                            if (!_46b[_46c]) {
                                throw (["lang.hitch: scope[\"", _46c, "\"] is null (scope=\"", _46b, "\")"].join(""));
                            }
                            return function () {
                                return _46b[_46c].apply(_46b, arguments || []);
                            };
                        }
                        return !_46b ? _46c : function () {
                            return _46c.apply(_46b, arguments || []);
                        };
                    }, delegate: (function () {
                        function TMP() {
                        };
                        return function (obj, _46d) {
                            TMP.prototype = obj;
                            var tmp = new TMP();
                            TMP.prototype = null;
                            if (_46d) {
                                lang._mixin(tmp, _46d);
                            }
                            return tmp;
                        };
                    })(), _toArray: has("ie") ? (function () {
                        function slow(obj, _46e, _46f) {
                            var arr = _46f || [];
                            for (var x = _46e || 0; x < obj.length; x++) {
                                arr.push(obj[x]);
                            }
                            return arr;
                        };
                        return function (obj) {
                            return ((obj.item) ? slow : _45a).apply(this, arguments);
                        };
                    })() : _45a, partial: function (_470) {
                        var arr = [null];
                        return lang.hitch.apply(dojo, arr.concat(lang._toArray(arguments)));
                    }, clone: function (src) {
                        if (!src || typeof src != "object" || lang.isFunction(src)) {
                            return src;
                        }
                        if (src.nodeType && "cloneNode" in src) {
                            return src.cloneNode(true);
                        }
                        if (src instanceof Date) {
                            return new Date(src.getTime());
                        }
                        if (src instanceof RegExp) {
                            return new RegExp(src);
                        }
                        var r, i, l;
                        if (lang.isArray(src)) {
                            r = [];
                            for (i = 0, l = src.length; i < l; ++i) {
                                if (i in src) {
                                    r[i] = lang.clone(src[i]);
                                }
                            }
                        } else {
                            r = src.constructor ? new src.constructor() : {};
                        }
                        return lang._mixin(r, src, lang.clone);
                    }, trim: String.prototype.trim ? function (str) {
                        return str.trim();
                    } : function (str) {
                        return str.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
                    }, replace: function (tmpl, map, _471) {
                        return tmpl.replace(_471 || _45d, lang.isFunction(map) ? map : function (_472, k) {
                            return lang.getObject(k, false, map);
                        });
                    }
                };
                1 && lang.mixin(dojo, lang);
                return lang;
            });
        }, "dijit/registry": function () {
            define(["dojo/_base/array", "dojo/_base/window", "./main"], function (_473, win, _474) {
                var _475 = {}, hash = {};
                var _476 = {
                    length: 0, add: function (_477) {
                        if (hash[_477.id]) {
                            throw new Error("Tried to register widget with id==" + _477.id + " but that id is already registered");
                        }
                        hash[_477.id] = _477;
                        this.length++;
                    }, remove: function (id) {
                        if (hash[id]) {
                            delete hash[id];
                            this.length--;
                        }
                    }, byId: function (id) {
                        return typeof id == "string" ? hash[id] : id;
                    }, byNode: function (node) {
                        return hash[node.getAttribute("widgetId")];
                    }, toArray: function () {
                        var ar = [];
                        for (var id in hash) {
                            ar.push(hash[id]);
                        }
                        return ar;
                    }, getUniqueId: function (_478) {
                        var id;
                        do {
                            id = _478 + "_" + (_478 in _475 ? ++_475[_478] : _475[_478] = 0);
                        } while (hash[id]);
                        return _474._scopeName == "dijit" ? id : _474._scopeName + "_" + id;
                    }, findWidgets: function (root, _479) {
                        var _47a = [];

                        function _47b(root) {
                            for (var node = root.firstChild; node; node = node.nextSibling) {
                                if (node.nodeType == 1) {
                                    var _47c = node.getAttribute("widgetId");
                                    if (_47c) {
                                        var _47d = hash[_47c];
                                        if (_47d) {
                                            _47a.push(_47d);
                                        }
                                    } else {
                                        if (node !== _479) {
                                            _47b(node);
                                        }
                                    }
                                }
                            }
                        };
                        _47b(root);
                        return _47a;
                    }, _destroyAll: function () {
                        _474._curFocus = null;
                        _474._prevFocus = null;
                        _474._activeStack = [];
                        _473.forEach(_476.findWidgets(win.body()), function (_47e) {
                            if (!_47e._destroyed) {
                                if (_47e.destroyRecursive) {
                                    _47e.destroyRecursive();
                                } else {
                                    if (_47e.destroy) {
                                        _47e.destroy();
                                    }
                                }
                            }
                        });
                    }, getEnclosingWidget: function (node) {
                        while (node) {
                            var id = node.nodeType == 1 && node.getAttribute("widgetId");
                            if (id) {
                                return hash[id];
                            }
                            node = node.parentNode;
                        }
                        return null;
                    }, _hash: hash
                };
                _474.registry = _476;
                return _476;
            });
        }, "dijit/Destroyable": function () {
            define(["dojo/_base/array", "dojo/aspect", "dojo/_base/declare"], function (_47f, _480, _481) {
                return _481("dijit.Destroyable", null, {
                    destroy: function (_482) {
                        this._destroyed = true;
                    }, own: function () {
                        var _483 = ["destroyRecursive", "destroy", "remove"];
                        _47f.forEach(arguments, function (_484) {
                            var _485;
                            var odh = _480.before(this, "destroy", function (_486) {
                                _484[_485](_486);
                            });
                            var hdhs = [];

                            function _487() {
                                odh.remove();
                                _47f.forEach(hdhs, function (hdh) {
                                    hdh.remove();
                                });
                            };
                            if (_484.then) {
                                _485 = "cancel";
                                _484.then(_487, _487);
                            } else {
                                _47f.forEach(_483, function (_488) {
                                    if (typeof _484[_488] === "function") {
                                        if (!_485) {
                                            _485 = _488;
                                        }
                                        hdhs.push(_480.after(_484, _488, _487, true));
                                    }
                                });
                            }
                        }, this);
                        return arguments;
                    }
                });
            });
        }, "dojo/_base/Color": function () {
            define(["./kernel", "./lang", "./array", "./config"], function (dojo, lang, _489, _48a) {
                var _48b = dojo.Color = function (_48c) {
                    if (_48c) {
                        this.setColor(_48c);
                    }
                };
                _48b.named = {
                    "black": [0, 0, 0],
                    "silver": [192, 192, 192],
                    "gray": [128, 128, 128],
                    "white": [255, 255, 255],
                    "maroon": [128, 0, 0],
                    "red": [255, 0, 0],
                    "purple": [128, 0, 128],
                    "fuchsia": [255, 0, 255],
                    "green": [0, 128, 0],
                    "lime": [0, 255, 0],
                    "olive": [128, 128, 0],
                    "yellow": [255, 255, 0],
                    "navy": [0, 0, 128],
                    "blue": [0, 0, 255],
                    "teal": [0, 128, 128],
                    "aqua": [0, 255, 255],
                    "transparent": _48a.transparentColor || [0, 0, 0, 0]
                };
                lang.extend(_48b, {
                    r: 255, g: 255, b: 255, a: 1, _set: function (r, g, b, a) {
                        var t = this;
                        t.r = r;
                        t.g = g;
                        t.b = b;
                        t.a = a;
                    }, setColor: function (_48d) {
                        if (lang.isString(_48d)) {
                            _48b.fromString(_48d, this);
                        } else {
                            if (lang.isArray(_48d)) {
                                _48b.fromArray(_48d, this);
                            } else {
                                this._set(_48d.r, _48d.g, _48d.b, _48d.a);
                                if (!(_48d instanceof _48b)) {
                                    this.sanitize();
                                }
                            }
                        }
                        return this;
                    }, sanitize: function () {
                        return this;
                    }, toRgb: function () {
                        var t = this;
                        return [t.r, t.g, t.b];
                    }, toRgba: function () {
                        var t = this;
                        return [t.r, t.g, t.b, t.a];
                    }, toHex: function () {
                        var arr = _489.map(["r", "g", "b"], function (x) {
                            var s = this[x].toString(16);
                            return s.length < 2 ? "0" + s : s;
                        }, this);
                        return "#" + arr.join("");
                    }, toCss: function (_48e) {
                        var t = this, rgb = t.r + ", " + t.g + ", " + t.b;
                        return (_48e ? "rgba(" + rgb + ", " + t.a : "rgb(" + rgb) + ")";
                    }, toString: function () {
                        return this.toCss(true);
                    }
                });
                _48b.blendColors = dojo.blendColors = function (_48f, end, _490, obj) {
                    var t = obj || new _48b();
                    _489.forEach(["r", "g", "b", "a"], function (x) {
                        t[x] = _48f[x] + (end[x] - _48f[x]) * _490;
                        if (x != "a") {
                            t[x] = Math.round(t[x]);
                        }
                    });
                    return t.sanitize();
                };
                _48b.fromRgb = dojo.colorFromRgb = function (_491, obj) {
                    var m = _491.toLowerCase().match(/^rgba?\(([\s\.,0-9]+)\)/);
                    return m && _48b.fromArray(m[1].split(/\s*,\s*/), obj);
                };
                _48b.fromHex = dojo.colorFromHex = function (_492, obj) {
                    var t = obj || new _48b(), bits = (_492.length == 4) ? 4 : 8, mask = (1 << bits) - 1;
                    _492 = Number("0x" + _492.substr(1));
                    if (isNaN(_492)) {
                        return null;
                    }
                    _489.forEach(["b", "g", "r"], function (x) {
                        var c = _492 & mask;
                        _492 >>= bits;
                        t[x] = bits == 4 ? 17 * c : c;
                    });
                    t.a = 1;
                    return t;
                };
                _48b.fromArray = dojo.colorFromArray = function (a, obj) {
                    var t = obj || new _48b();
                    t._set(Number(a[0]), Number(a[1]), Number(a[2]), Number(a[3]));
                    if (isNaN(t.a)) {
                        t.a = 1;
                    }
                    return t.sanitize();
                };
                _48b.fromString = dojo.colorFromString = function (str, obj) {
                    var a = _48b.named[str];
                    return a && _48b.fromArray(a, obj) || _48b.fromRgb(str, obj) || _48b.fromHex(str, obj);
                };
                return _48b;
            });
        }, "dojo/_base/loader": function () {
            define(["./kernel", "../has", "require", "module", "../json", "./lang", "./array"], function (dojo, has, _493, _494, json, lang, _495) {
                if (!1) {
                    console.error("cannot load the Dojo v1.x loader with a foreign loader");
                    return 0;
                }
                1 || has.add("dojo-fast-sync-require", 1);
                var _496 = function (id) {
                    return {src: _494.id, id: id};
                }, _497 = function (name) {
                    return name.replace(/\./g, "/");
                }, _498 = /\/\/>>built/, _499 = [], _49a = [], _49b = function (mid, _49c, _49d) {
                    _499.push(_49d);
                    _495.forEach(mid.split(","), function (mid) {
                        var _49e = _49f(mid, _49c.module);
                        _49a.push(_49e);
                        _4a0(_49e);
                    });
                    _4a1();
                }, _4a1 = (1 ? function () {
                    var _4a2, mid;
                    for (mid in _4a3) {
                        _4a2 = _4a3[mid];
                        if (_4a2.noReqPluginCheck === undefined) {
                            _4a2.noReqPluginCheck = /loadInit\!/.test(mid) || /require\!/.test(mid) ? 1 : 0;
                        }
                        if (!_4a2.executed && !_4a2.noReqPluginCheck && _4a2.injected == _4a4) {
                            return;
                        }
                    }
                    _4a5(function () {
                        var _4a6 = _499;
                        _499 = [];
                        _495.forEach(_4a6, function (cb) {
                            cb(1);
                        });
                    });
                } : (function () {
                    var _4a7, _4a8 = function (m) {
                        _4a7[m.mid] = 1;
                        for (var t, _4a9, deps = m.deps || [], i = 0; i < deps.length; i++) {
                            _4a9 = deps[i];
                            if (!(t = _4a7[_4a9.mid])) {
                                if (t === 0 || !_4a8(_4a9)) {
                                    _4a7[m.mid] = 0;
                                    return false;
                                }
                            }
                        }
                        return true;
                    };
                    return function () {
                        var _4aa, mid;
                        _4a7 = {};
                        for (mid in _4a3) {
                            _4aa = _4a3[mid];
                            if (_4aa.executed || _4aa.noReqPluginCheck) {
                                _4a7[mid] = 1;
                            } else {
                                if (_4aa.noReqPluginCheck !== 0) {
                                    _4aa.noReqPluginCheck = /loadInit\!/.test(mid) || /require\!/.test(mid) ? 1 : 0;
                                }
                                if (_4aa.noReqPluginCheck) {
                                    _4a7[mid] = 1;
                                } else {
                                    if (_4aa.injected !== _4d6) {
                                        _4a7[mid] = 0;
                                    }
                                }
                            }
                        }
                        for (var t, i = 0, end = _49a.length; i < end; i++) {
                            _4aa = _49a[i];
                            if (!(t = _4a7[_4aa.mid])) {
                                if (t === 0 || !_4a8(_4aa)) {
                                    return;
                                }
                            }
                        }
                        _4a5(function () {
                            var _4ab = _499;
                            _499 = [];
                            _495.forEach(_4ab, function (cb) {
                                cb(1);
                            });
                        });
                    };
                })()), _4ac = function (mid, _4ad, _4ae) {
                    _4ad([mid], function (_4af) {
                        _4ad(_4af.names, function () {
                            for (var _4b0 = "", args = [], i = 0; i < arguments.length; i++) {
                                _4b0 += "var " + _4af.names[i] + "= arguments[" + i + "]; ";
                                args.push(arguments[i]);
                            }
                            eval(_4b0);
                            var _4b1 = _4ad.module, _4b2 = [], _4b3, _4b4 = {
                                provide: function (_4b5) {
                                    _4b5 = _497(_4b5);
                                    var _4b6 = _49f(_4b5, _4b1);
                                    if (_4b6 !== _4b1) {
                                        _4dc(_4b6);
                                    }
                                }, require: function (_4b7, _4b8) {
                                    _4b7 = _497(_4b7);
                                    _4b8 && (_49f(_4b7, _4b1).result = _4d7);
                                    _4b2.push(_4b7);
                                }, requireLocalization: function (_4b9, _4ba, _4bb) {
                                    if (!_4b3) {
                                        _4b3 = ["dojo/i18n"];
                                    }
                                    _4bb = (_4bb || dojo.locale).toLowerCase();
                                    _4b9 = _497(_4b9) + "/nls/" + (/root/i.test(_4bb) ? "" : _4bb + "/") + _497(_4ba);
                                    if (_49f(_4b9, _4b1).isXd) {
                                        _4b3.push("dojo/i18n!" + _4b9);
                                    }
                                }, loadInit: function (f) {
                                    f();
                                }
                            }, hold = {}, p;
                            try {
                                for (p in _4b4) {
                                    hold[p] = dojo[p];
                                    dojo[p] = _4b4[p];
                                }
                                _4af.def.apply(null, args);
                            } catch (e) {
                                _4bc("error", [_496("failedDojoLoadInit"), e]);
                            } finally {
                                for (p in _4b4) {
                                    dojo[p] = hold[p];
                                }
                            }
                            if (_4b3) {
                                _4b2 = _4b2.concat(_4b3);
                            }
                            if (_4b2.length) {
                                _49b(_4b2.join(","), _4ad, _4ae);
                            } else {
                                _4ae();
                            }
                        });
                    });
                }, _4bd = function (text, _4be, _4bf) {
                    var _4c0 = /\(|\)/g, _4c1 = 1, _4c2;
                    _4c0.lastIndex = _4be;
                    while ((_4c2 = _4c0.exec(text))) {
                        if (_4c2[0] == ")") {
                            _4c1 -= 1;
                        } else {
                            _4c1 += 1;
                        }
                        if (_4c1 == 0) {
                            break;
                        }
                    }
                    if (_4c1 != 0) {
                        throw "unmatched paren around character " + _4c0.lastIndex + " in: " + text;
                    }
                    return [dojo.trim(text.substring(_4bf, _4c0.lastIndex)) + ";\n", _4c0.lastIndex];
                }, _4c3 = /(\/\*([\s\S]*?)\*\/|\/\/(.*)$)/mg, _4c4 = /(^|\s)dojo\.(loadInit|require|provide|requireLocalization|requireIf|requireAfterIf|platformRequire)\s*\(/mg, _4c5 = /(^|\s)(require|define)\s*\(/m, _4c6 = function (text, _4c7) {
                    var _4c8, _4c9, _4ca, _4cb, _4cc = [], _4cd = [], _4ce = [];
                    _4c7 = _4c7 || text.replace(_4c3, function (_4cf) {
                            _4c4.lastIndex = _4c5.lastIndex = 0;
                            return (_4c4.test(_4cf) || _4c5.test(_4cf)) ? "" : _4cf;
                        });
                    while ((_4c8 = _4c4.exec(_4c7))) {
                        _4c9 = _4c4.lastIndex;
                        _4ca = _4c9 - _4c8[0].length;
                        _4cb = _4bd(_4c7, _4c9, _4ca);
                        if (_4c8[2] == "loadInit") {
                            _4cc.push(_4cb[0]);
                        } else {
                            _4cd.push(_4cb[0]);
                        }
                        _4c4.lastIndex = _4cb[1];
                    }
                    _4ce = _4cc.concat(_4cd);
                    if (_4ce.length || !_4c5.test(_4c7)) {
                        return [text.replace(/(^|\s)dojo\.loadInit\s*\(/g, "\n0 && dojo.loadInit("), _4ce.join(""), _4ce];
                    } else {
                        return 0;
                    }
                }, _4d0 = function (_4d1, text) {
                    var _4d2, id, _4d3 = [], _4d4 = [];
                    if (_498.test(text) || !(_4d2 = _4c6(text))) {
                        return 0;
                    }
                    id = _4d1.mid + "-*loadInit";
                    for (var p in _49f("dojo", _4d1).result.scopeMap) {
                        _4d3.push(p);
                        _4d4.push("\"" + p + "\"");
                    }
                    return "// xdomain rewrite of " + _4d1.mid + "\n" + "define('" + id + "',{\n" + "\tnames:" + json.stringify(_4d3) + ",\n" + "\tdef:function(" + _4d3.join(",") + "){" + _4d2[1] + "}" + "});\n\n" + "define(" + json.stringify(_4d3.concat(["dojo/loadInit!" + id])) + ", function(" + _4d3.join(",") + "){\n" + _4d2[0] + "});";
                }, _4d5 = _493.initSyncLoader(_49b, _4a1, _4d0), sync = _4d5.sync, _4a4 = _4d5.requested, _4d6 = _4d5.arrived, _4d7 = _4d5.nonmodule, _4d8 = _4d5.executing, _4d9 = _4d5.executed, _4da = _4d5.syncExecStack, _4a3 = _4d5.modules, _4db = _4d5.execQ, _49f = _4d5.getModule, _4a0 = _4d5.injectModule, _4dc = _4d5.setArrived, _4bc = _4d5.signal, _4dd = _4d5.finishExec, _4de = _4d5.execModule, _4df = _4d5.getLegacyMode, _4a5 = _4d5.guardCheckComplete;
                _49b = _4d5.dojoRequirePlugin;
                dojo.provide = function (mid) {
                    var _4e0 = _4da[0], _4e1 = lang.mixin(_49f(_497(mid), _493.module), {
                        executed: _4d8,
                        result: lang.getObject(mid, true)
                    });
                    _4dc(_4e1);
                    if (_4e0) {
                        (_4e0.provides || (_4e0.provides = [])).push(function () {
                            _4e1.result = lang.getObject(mid);
                            delete _4e1.provides;
                            _4e1.executed !== _4d9 && _4dd(_4e1);
                        });
                    }
                    return _4e1.result;
                };
                has.add("config-publishRequireResult", 1, 0, 0);
                dojo.require = function (_4e2, _4e3) {
                    function _4e4(mid, _4e5) {
                        var _4e6 = _49f(_497(mid), _493.module);
                        if (_4da.length && _4da[0].finish) {
                            _4da[0].finish.push(mid);
                            return undefined;
                        }
                        if (_4e6.executed) {
                            return _4e6.result;
                        }
                        _4e5 && (_4e6.result = _4d7);
                        var _4e7 = _4df();
                        _4a0(_4e6);
                        _4e7 = _4df();
                        if (_4e6.executed !== _4d9 && _4e6.injected === _4d6) {
                            _4d5.guardCheckComplete(function () {
                                _4de(_4e6);
                            });
                        }
                        if (_4e6.executed) {
                            return _4e6.result;
                        }
                        if (_4e7 == sync) {
                            if (_4e6.cjs) {
                                _4db.unshift(_4e6);
                            } else {
                                _4da.length && (_4da[0].finish = [mid]);
                            }
                        } else {
                            _4db.push(_4e6);
                        }
                        return undefined;
                    };
                    var _4e8 = _4e4(_4e2, _4e3);
                    if (has("config-publishRequireResult") && !lang.exists(_4e2) && _4e8 !== undefined) {
                        lang.setObject(_4e2, _4e8);
                    }
                    return _4e8;
                };
                dojo.loadInit = function (f) {
                    f();
                };
                dojo.registerModulePath = function (_4e9, _4ea) {
                    var _4eb = {};
                    _4eb[_4e9.replace(/\./g, "/")] = _4ea;
                    _493({paths: _4eb});
                };
                dojo.platformRequire = function (_4ec) {
                    var _4ed = (_4ec.common || []).concat(_4ec[dojo._name] || _4ec["default"] || []), temp;
                    while (_4ed.length) {
                        if (lang.isArray(temp = _4ed.shift())) {
                            dojo.require.apply(dojo, temp);
                        } else {
                            dojo.require(temp);
                        }
                    }
                };
                dojo.requireIf = dojo.requireAfterIf = function (_4ee, _4ef, _4f0) {
                    if (_4ee) {
                        dojo.require(_4ef, _4f0);
                    }
                };
                dojo.requireLocalization = function (_4f1, _4f2, _4f3) {
                    _493(["../i18n"], function (i18n) {
                        i18n.getLocalization(_4f1, _4f2, _4f3);
                    });
                };
                return {extractLegacyApiApplications: _4c6, require: _49b, loadInit: _4ac};
            });
        }, "dojo/request": function () {
            define(["./request/default!"], function (_4f4) {
                return _4f4;
            });
        }, "dojo/NodeList-fx": function () {
            define(["./query", "./_base/lang", "./aspect", "./_base/fx", "./fx"], function (_4f5, lang, _4f6, _4f7, _4f8) {
                var _4f9 = _4f5.NodeList;
                lang.extend(_4f9, {
                    _anim: function (obj, _4fa, args) {
                        args = args || {};
                        var a = _4f8.combine(this.map(function (item) {
                            var _4fb = {node: item};
                            lang.mixin(_4fb, args);
                            return obj[_4fa](_4fb);
                        }));
                        return args.auto ? a.play() && this : a;
                    }, wipeIn: function (args) {
                        return this._anim(_4f8, "wipeIn", args);
                    }, wipeOut: function (args) {
                        return this._anim(_4f8, "wipeOut", args);
                    }, slideTo: function (args) {
                        return this._anim(_4f8, "slideTo", args);
                    }, fadeIn: function (args) {
                        return this._anim(_4f7, "fadeIn", args);
                    }, fadeOut: function (args) {
                        return this._anim(_4f7, "fadeOut", args);
                    }, animateProperty: function (args) {
                        return this._anim(_4f7, "animateProperty", args);
                    }, anim: function (_4fc, _4fd, _4fe, _4ff, _500) {
                        var _501 = _4f8.combine(this.map(function (item) {
                            return _4f7.animateProperty({
                                node: item,
                                properties: _4fc,
                                duration: _4fd || 350,
                                easing: _4fe
                            });
                        }));
                        if (_4ff) {
                            _4f6.after(_501, "onEnd", _4ff, true);
                        }
                        return _501.play(_500 || 0);
                    }
                });
                return _4f9;
            });
        }, "dojo/mouse": function () {
            define(["./_base/kernel", "./on", "./has", "./dom", "./_base/window"], function (dojo, on, has, dom, win) {
                has.add("dom-quirks", win.doc && win.doc.compatMode == "BackCompat");
                has.add("events-mouseenter", win.doc && "onmouseenter" in win.doc.createElement("div"));
                has.add("events-mousewheel", win.doc && "onmousewheel" in win.doc);
                var _502;
                if ((has("dom-quirks") && has("ie")) || !has("dom-addeventlistener")) {
                    _502 = {
                        LEFT: 1, MIDDLE: 4, RIGHT: 2, isButton: function (e, _503) {
                            return e.button & _503;
                        }, isLeft: function (e) {
                            return e.button & 1;
                        }, isMiddle: function (e) {
                            return e.button & 4;
                        }, isRight: function (e) {
                            return e.button & 2;
                        }
                    };
                } else {
                    _502 = {
                        LEFT: 0, MIDDLE: 1, RIGHT: 2, isButton: function (e, _504) {
                            return e.button == _504;
                        }, isLeft: function (e) {
                            return e.button == 0;
                        }, isMiddle: function (e) {
                            return e.button == 1;
                        }, isRight: function (e) {
                            return e.button == 2;
                        }
                    };
                }
                dojo.mouseButtons = _502;
                function _505(type, _506) {
                    var _507 = function (node, _508) {
                        return on(node, type, function (evt) {
                            if (_506) {
                                return _506(evt, _508);
                            }
                            if (!dom.isDescendant(evt.relatedTarget, node)) {
                                return _508.call(this, evt);
                            }
                        });
                    };
                    _507.bubble = function (_509) {
                        return _505(type, function (evt, _50a) {
                            var _50b = _509(evt.target);
                            var _50c = evt.relatedTarget;
                            if (_50b && (_50b != (_50c && _50c.nodeType == 1 && _509(_50c)))) {
                                return _50a.call(_50b, evt);
                            }
                        });
                    };
                    return _507;
                };
                var _50d;
                if (has("events-mousewheel")) {
                    _50d = "mousewheel";
                } else {
                    _50d = function (node, _50e) {
                        return on(node, "DOMMouseScroll", function (evt) {
                            evt.wheelDelta = -evt.detail;
                            _50e.call(this, evt);
                        });
                    };
                }
                return {
                    _eventHandler: _505,
                    enter: _505("mouseover"),
                    leave: _505("mouseout"),
                    wheel: _50d,
                    isLeft: _502.isLeft,
                    isMiddle: _502.isMiddle,
                    isRight: _502.isRight
                };
            });
        }, "dijit/a11y": function () {
            define(["dojo/_base/array", "dojo/dom", "dojo/dom-attr", "dojo/dom-style", "dojo/_base/lang", "dojo/sniff", "./main"], function (_50f, dom, _510, _511, lang, has, _512) {
                var _513;
                var a11y = {
                    _isElementShown: function (elem) {
                        var s = _511.get(elem);
                        return (s.visibility != "hidden") && (s.visibility != "collapsed") && (s.display != "none") && (_510.get(elem, "type") != "hidden");
                    }, hasDefaultTabStop: function (elem) {
                        switch (elem.nodeName.toLowerCase()) {
                            case "a":
                                return _510.has(elem, "href");
                            case "area":
                            case "button":
                            case "input":
                            case "object":
                            case "select":
                            case "textarea":
                                return true;
                            case "iframe":
                                var body;
                                try {
                                    var _514 = elem.contentDocument;
                                    if ("designMode" in _514 && _514.designMode == "on") {
                                        return true;
                                    }
                                    body = _514.body;
                                } catch (e1) {
                                    try {
                                        body = elem.contentWindow.document.body;
                                    } catch (e2) {
                                        return false;
                                    }
                                }
                                return body && (body.contentEditable == "true" || (body.firstChild && body.firstChild.contentEditable == "true"));
                            default:
                                return elem.contentEditable == "true";
                        }
                    }, effectiveTabIndex: function (elem) {
                        if (_510.get(elem, "disabled")) {
                            return _513;
                        } else {
                            if (_510.has(elem, "tabIndex")) {
                                return +_510.get(elem, "tabIndex");
                            } else {
                                return a11y.hasDefaultTabStop(elem) ? 0 : _513;
                            }
                        }
                    }, isTabNavigable: function (elem) {
                        return a11y.effectiveTabIndex(elem) >= 0;
                    }, isFocusable: function (elem) {
                        return a11y.effectiveTabIndex(elem) >= -1;
                    }, _getTabNavigable: function (root) {
                        var _515, last, _516, _517, _518, _519, _51a = {};

                        function _51b(node) {
                            return node && node.tagName.toLowerCase() == "input" && node.type && node.type.toLowerCase() == "radio" && node.name && node.name.toLowerCase();
                        };
                        var _51c = a11y._isElementShown, _51d = a11y.effectiveTabIndex;
                        var _51e = function (_51f) {
                            for (var _520 = _51f.firstChild; _520; _520 = _520.nextSibling) {
                                if (_520.nodeType != 1 || (has("ie") <= 9 && _520.scopeName !== "HTML") || !_51c(_520)) {
                                    continue;
                                }
                                var _521 = _51d(_520);
                                if (_521 >= 0) {
                                    if (_521 == 0) {
                                        if (!_515) {
                                            _515 = _520;
                                        }
                                        last = _520;
                                    } else {
                                        if (_521 > 0) {
                                            if (!_516 || _521 < _517) {
                                                _517 = _521;
                                                _516 = _520;
                                            }
                                            if (!_518 || _521 >= _519) {
                                                _519 = _521;
                                                _518 = _520;
                                            }
                                        }
                                    }
                                    var rn = _51b(_520);
                                    if (_510.get(_520, "checked") && rn) {
                                        _51a[rn] = _520;
                                    }
                                }
                                if (_520.nodeName.toUpperCase() != "SELECT") {
                                    _51e(_520);
                                }
                            }
                        };
                        if (_51c(root)) {
                            _51e(root);
                        }
                        function rs(node) {
                            return _51a[_51b(node)] || node;
                        };
                        return {first: rs(_515), last: rs(last), lowest: rs(_516), highest: rs(_518)};
                    }, getFirstInTabbingOrder: function (root, doc) {
                        var _522 = a11y._getTabNavigable(dom.byId(root, doc));
                        return _522.lowest ? _522.lowest : _522.first;
                    }, getLastInTabbingOrder: function (root, doc) {
                        var _523 = a11y._getTabNavigable(dom.byId(root, doc));
                        return _523.last ? _523.last : _523.highest;
                    }
                };
                1 && lang.mixin(_512, a11y);
                return a11y;
            });
        }, "dojo/promise/instrumentation": function () {
            define(["./tracer", "../has", "../_base/lang", "../_base/array"], function (_524, has, lang, _525) {
                has.add("config-useDeferredInstrumentation", "report-unhandled-rejections");
                function _526(_527, _528, _529) {
                    if (_527 && _527.log === false) {
                        return;
                    }
                    var _52a = "";
                    if (_527 && _527.stack) {
                        _52a += _527.stack;
                    }
                    if (_528 && _528.stack) {
                        _52a += "\n    ----------------------------------------\n    rejected" + _528.stack.split("\n").slice(1).join("\n").replace(/^\s+/, " ");
                    }
                    if (_529 && _529.stack) {
                        _52a += "\n    ----------------------------------------\n" + _529.stack;
                    }
                    console.error(_527, _52a);
                };
                function _52b(_52c, _52d, _52e, _52f) {
                    if (!_52d) {
                        _526(_52c, _52e, _52f);
                    }
                };
                var _530 = [];
                var _531 = false;
                var _532 = 1000;

                function _533(_534, _535, _536, _537) {
                    if (!_525.some(_530, function (obj) {
                            if (obj.error === _534) {
                                if (_535) {
                                    obj.handled = true;
                                }
                                return true;
                            }
                        })) {
                        _530.push({
                            error: _534,
                            rejection: _536,
                            handled: _535,
                            deferred: _537,
                            timestamp: new Date().getTime()
                        });
                    }
                    if (!_531) {
                        _531 = setTimeout(_538, _532);
                    }
                };
                function _538() {
                    var now = new Date().getTime();
                    var _539 = now - _532;
                    _530 = _525.filter(_530, function (obj) {
                        if (obj.timestamp < _539) {
                            if (!obj.handled) {
                                _526(obj.error, obj.rejection, obj.deferred);
                            }
                            return false;
                        }
                        return true;
                    });
                    if (_530.length) {
                        _531 = setTimeout(_538, _530[0].timestamp + _532 - now);
                    } else {
                        _531 = false;
                    }
                };
                return function (_53a) {
                    var _53b = has("config-useDeferredInstrumentation");
                    if (_53b) {
                        _524.on("resolved", lang.hitch(console, "log", "resolved"));
                        _524.on("rejected", lang.hitch(console, "log", "rejected"));
                        _524.on("progress", lang.hitch(console, "log", "progress"));
                        var args = [];
                        if (typeof _53b === "string") {
                            args = _53b.split(",");
                            _53b = args.shift();
                        }
                        if (_53b === "report-rejections") {
                            _53a.instrumentRejected = _52b;
                        } else {
                            if (_53b === "report-unhandled-rejections" || _53b === true || _53b === 1) {
                                _53a.instrumentRejected = _533;
                                _532 = parseInt(args[0], 10) || _532;
                            } else {
                                throw new Error("Unsupported instrumentation usage <" + _53b + ">");
                            }
                        }
                    }
                };
            });
        }, "dojo/request/xhr": function () {
            define(["../errors/RequestError", "./watch", "./handlers", "./util", "../has"], function (_53c, _53d, _53e, util, has) {
                has.add("native-xhr", function () {
                    return typeof XMLHttpRequest !== "undefined";
                });
                has.add("dojo-force-activex-xhr", function () {
                    return has("activex") && window.location.protocol === "file:";
                });
                has.add("native-xhr2", function () {
                    if (!has("native-xhr") || has("dojo-force-activex-xhr")) {
                        return;
                    }
                    var x = new XMLHttpRequest();
                    return typeof x["addEventListener"] !== "undefined" && (typeof opera === "undefined" || typeof x["upload"] !== "undefined");
                });
                has.add("native-formdata", function () {
                    return typeof FormData !== "undefined";
                });
                has.add("native-response-type", function () {
                    return has("native-xhr") && typeof new XMLHttpRequest().responseType !== "undefined";
                });
                has.add("native-xhr2-blob", function () {
                    if (!has("native-response-type")) {
                        return;
                    }
                    var x = new XMLHttpRequest();
                    x.open("GET", "/", true);
                    x.responseType = "blob";
                    var _53f = x.responseType;
                    x.abort();
                    return _53f === "blob";
                });
                var _540 = {
                    "blob": has("native-xhr2-blob") ? "blob" : "arraybuffer",
                    "document": "document",
                    "arraybuffer": "arraybuffer"
                };

                function _541(_542, _543) {
                    var _544 = _542.xhr;
                    _542.status = _542.xhr.status;
                    try {
                        _542.text = _544.responseText;
                    } catch (e) {
                    }
                    if (_542.options.handleAs === "xml") {
                        _542.data = _544.responseXML;
                    }
                    if (!_543) {
                        try {
                            _53e(_542);
                        } catch (e) {
                            _543 = e;
                        }
                    }
                    var _545;
                    if (_543) {
                        this.reject(_543);
                    } else {
                        try {
                            _53e(_542);
                        } catch (e) {
                            _545 = e;
                        }
                        if (util.checkStatus(_544.status)) {
                            if (!_545) {
                                this.resolve(_542);
                            } else {
                                this.reject(_545);
                            }
                        } else {
                            if (!_545) {
                                _543 = new _53c("Unable to load " + _542.url + " status: " + _544.status, _542);
                                this.reject(_543);
                            } else {
                                _543 = new _53c("Unable to load " + _542.url + " status: " + _544.status + " and an error in handleAs: transformation of response", _542);
                                this.reject(_543);
                            }
                        }
                    }
                };
                var _546, _547, _548, _549;
                if (has("native-xhr2")) {
                    _546 = function (_54a) {
                        return !this.isFulfilled();
                    };
                    _549 = function (dfd, _54b) {
                        _54b.xhr.abort();
                    };
                    _548 = function (_54c, dfd, _54d) {
                        function _54e(evt) {
                            dfd.handleResponse(_54d);
                        };
                        function _54f(evt) {
                            var _550 = evt.target;
                            var _551 = new _53c("Unable to load " + _54d.url + " status: " + _550.status, _54d);
                            dfd.handleResponse(_54d, _551);
                        };
                        function _552(evt) {
                            if (evt.lengthComputable) {
                                _54d.loaded = evt.loaded;
                                _54d.total = evt.total;
                                dfd.progress(_54d);
                            } else {
                                if (_54d.xhr.readyState === 3) {
                                    _54d.loaded = ("loaded" in evt) ? evt.loaded : evt.position;
                                    dfd.progress(_54d);
                                }
                            }
                        };
                        _54c.addEventListener("load", _54e, false);
                        _54c.addEventListener("error", _54f, false);
                        _54c.addEventListener("progress", _552, false);
                        return function () {
                            _54c.removeEventListener("load", _54e, false);
                            _54c.removeEventListener("error", _54f, false);
                            _54c.removeEventListener("progress", _552, false);
                            _54c = null;
                        };
                    };
                } else {
                    _546 = function (_553) {
                        return _553.xhr.readyState;
                    };
                    _547 = function (_554) {
                        return 4 === _554.xhr.readyState;
                    };
                    _549 = function (dfd, _555) {
                        var xhr = _555.xhr;
                        var _556 = typeof xhr.abort;
                        if (_556 === "function" || _556 === "object" || _556 === "unknown") {
                            xhr.abort();
                        }
                    };
                }
                function _557(_558) {
                    return this.xhr.getResponseHeader(_558);
                };
                var _559, _55a = {data: null, query: null, sync: false, method: "GET"};

                function xhr(url, _55b, _55c) {
                    var _55d = has("native-formdata") && _55b && _55b.data && _55b.data instanceof FormData;
                    var _55e = util.parseArgs(url, util.deepCreate(_55a, _55b), _55d);
                    url = _55e.url;
                    _55b = _55e.options;
                    var _55f, last = function () {
                        _55f && _55f();
                    };
                    var dfd = util.deferred(_55e, _549, _546, _547, _541, last);
                    var _560 = _55e.xhr = xhr._create();
                    if (!_560) {
                        dfd.cancel(new _53c("XHR was not created"));
                        return _55c ? dfd : dfd.promise;
                    }
                    _55e.getHeader = _557;
                    if (_548) {
                        _55f = _548(_560, dfd, _55e);
                    }
                    var data = typeof (_55b.data) === "undefined" ? null : _55b.data, _561 = !_55b.sync, _562 = _55b.method;
                    try {
                        _560.open(_562, url, _561, _55b.user || _559, _55b.password || _559);
                        if (_55b.withCredentials) {
                            _560.withCredentials = _55b.withCredentials;
                        }
                        if (has("native-response-type") && _55b.handleAs in _540) {
                            _560.responseType = _540[_55b.handleAs];
                        }
                        var _563 = _55b.headers, _564 = _55d ? false : "application/x-www-form-urlencoded";
                        if (_563) {
                            for (var hdr in _563) {
                                if (hdr.toLowerCase() === "content-type") {
                                    _564 = _563[hdr];
                                } else {
                                    if (_563[hdr]) {
                                        _560.setRequestHeader(hdr, _563[hdr]);
                                    }
                                }
                            }
                        }
                        if (_564 && _564 !== false) {
                            _560.setRequestHeader("Content-Type", _564);
                        }
                        if (!_563 || !("X-Requested-With" in _563)) {
                            _560.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                        }
                        if (util.notify) {
                            util.notify.emit("send", _55e, dfd.promise.cancel);
                        }
                        _560.send(data);
                    } catch (e) {
                        dfd.reject(e);
                    }
                    _53d(dfd);
                    _560 = null;
                    return _55c ? dfd : dfd.promise;
                };
                xhr._create = function () {
                    throw new Error("XMLHTTP not available");
                };
                if (has("native-xhr") && !has("dojo-force-activex-xhr")) {
                    xhr._create = function () {
                        return new XMLHttpRequest();
                    };
                } else {
                    if (has("activex")) {
                        try {
                            new ActiveXObject("Msxml2.XMLHTTP");
                            xhr._create = function () {
                                return new ActiveXObject("Msxml2.XMLHTTP");
                            };
                        } catch (e) {
                            try {
                                new ActiveXObject("Microsoft.XMLHTTP");
                                xhr._create = function () {
                                    return new ActiveXObject("Microsoft.XMLHTTP");
                                };
                            } catch (e) {
                            }
                        }
                    }
                }
                util.addCommonMethods(xhr);
                return xhr;
            });
        }, "dojo/_base/NodeList": function () {
            define(["./kernel", "../query", "./array", "./html", "../NodeList-dom"], function (dojo, _565, _566) {
                var _567 = _565.NodeList, nlp = _567.prototype;
                nlp.connect = _567._adaptAsForEach(function () {
                    return dojo.connect.apply(this, arguments);
                });
                nlp.coords = _567._adaptAsMap(dojo.coords);
                _567.events = ["blur", "focus", "change", "click", "error", "keydown", "keypress", "keyup", "load", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseout", "mouseover", "mouseup", "submit"];
                _566.forEach(_567.events, function (evt) {
                    var _568 = "on" + evt;
                    nlp[_568] = function (a, b) {
                        return this.connect(_568, a, b);
                    };
                });
                dojo.NodeList = _567;
                return _567;
            });
        }, "dojo/_base/kernel": function () {
            define(["../has", "./config", "require", "module"], function (has, _569, _56a, _56b) {
                var i, p, _56c = (function () {
                    return this;
                })(), _56d = {}, _56e = {}, dojo = {config: _569, global: _56c, dijit: _56d, dojox: _56e};
                var _56f = {
                    dojo: ["dojo", dojo],
                    dijit: ["dijit", _56d],
                    dojox: ["dojox", _56e]
                }, _570 = (_56a.map && _56a.map[_56b.id.match(/[^\/]+/)[0]]), item;
                for (p in _570) {
                    if (_56f[p]) {
                        _56f[p][0] = _570[p];
                    } else {
                        _56f[p] = [_570[p], {}];
                    }
                }
                for (p in _56f) {
                    item = _56f[p];
                    item[1]._scopeName = item[0];
                    if (!_569.noGlobals) {
                        _56c[item[0]] = item[1];
                    }
                }
                dojo.scopeMap = _56f;
                dojo.baseUrl = dojo.config.baseUrl = _56a.baseUrl;
                dojo.isAsync = !1 || _56a.async;
                dojo.locale = _569.locale;
                var rev = "$Rev: a1e2d9d $".match(/[0-9a-f]{7,}/);
                dojo.version = {
                    major: 1, minor: 12, patch: 1, flag: "", revision: rev ? rev[0] : NaN, toString: function () {
                        var v = dojo.version;
                        return v.major + "." + v.minor + "." + v.patch + v.flag + " (" + v.revision + ")";
                    }
                };
                1 || has.add("extend-dojo", 1);
                if (!has("csp-restrictions")) {
                    (Function("d", "d.eval = function(){return d.global.eval ? d.global.eval(arguments[0]) : eval(arguments[0]);}"))(dojo);
                }
                if (0) {
                    dojo.exit = function (_571) {
                        quit(_571);
                    };
                } else {
                    dojo.exit = function () {
                    };
                }
                if (!has("host-webworker")) {
                    1 || has.add("dojo-guarantee-console", 1);
                }
                if (1) {
                    has.add("console-as-object", function () {
                        return Function.prototype.bind && console && typeof console.log === "object";
                    });
                    typeof console != "undefined" || (console = {});
                    var cn = ["assert", "count", "debug", "dir", "dirxml", "error", "group", "groupEnd", "info", "profile", "profileEnd", "time", "timeEnd", "trace", "warn", "log"];
                    var tn;
                    i = 0;
                    while ((tn = cn[i++])) {
                        if (!console[tn]) {
                            (function () {
                                var tcn = tn + "";
                                console[tcn] = ("log" in console) ? function () {
                                    var a = Array.prototype.slice.call(arguments);
                                    a.unshift(tcn + ":");
                                    console["log"](a.join(" "));
                                } : function () {
                                };
                                console[tcn]._fake = true;
                            })();
                        } else {
                            if (has("console-as-object")) {
                                console[tn] = Function.prototype.bind.call(console[tn], console);
                            }
                        }
                    }
                }
                has.add("dojo-debug-messages", !!_569.isDebug);
                dojo.deprecated = dojo.experimental = function () {
                };
                if (has("dojo-debug-messages")) {
                    dojo.deprecated = function (_572, _573, _574) {
                        var _575 = "DEPRECATED: " + _572;
                        if (_573) {
                            _575 += " " + _573;
                        }
                        if (_574) {
                            _575 += " -- will be removed in version: " + _574;
                        }
                        console.warn(_575);
                    };
                    dojo.experimental = function (_576, _577) {
                        var _578 = "EXPERIMENTAL: " + _576 + " -- APIs subject to change without notice.";
                        if (_577) {
                            _578 += " " + _577;
                        }
                        console.warn(_578);
                    };
                }
                1 || has.add("dojo-modulePaths", 1);
                if (1) {
                    if (_569.modulePaths) {
                        dojo.deprecated("dojo.modulePaths", "use paths configuration");
                        var _579 = {};
                        for (p in _569.modulePaths) {
                            _579[p.replace(/\./g, "/")] = _569.modulePaths[p];
                        }
                        _56a({paths: _579});
                    }
                }
                1 || has.add("dojo-moduleUrl", 1);
                if (1) {
                    dojo.moduleUrl = function (_57a, url) {
                        dojo.deprecated("dojo.moduleUrl()", "use require.toUrl", "2.0");
                        var _57b = null;
                        if (_57a) {
                            _57b = _56a.toUrl(_57a.replace(/\./g, "/") + (url ? ("/" + url) : "") + "/*.*").replace(/\/\*\.\*/, "") + (url ? "" : "/");
                        }
                        return _57b;
                    };
                }
                dojo._hasResource = {};
                return dojo;
            });
        }, "dojo/errors/create": function () {
            define(["../_base/lang"], function (lang) {
                return function (name, ctor, base, _57c) {
                    base = base || Error;
                    var _57d = function (_57e) {
                        if (base === Error) {
                            if (Error.captureStackTrace) {
                                Error.captureStackTrace(this, _57d);
                            }
                            var err = Error.call(this, _57e), prop;
                            for (prop in err) {
                                if (err.hasOwnProperty(prop)) {
                                    this[prop] = err[prop];
                                }
                            }
                            this.message = _57e;
                            this.stack = err.stack;
                        } else {
                            base.apply(this, arguments);
                        }
                        if (ctor) {
                            ctor.apply(this, arguments);
                        }
                    };
                    _57d.prototype = lang.delegate(base.prototype, _57c);
                    _57d.prototype.name = name;
                    _57d.prototype.constructor = _57d;
                    return _57d;
                };
            });
        }, "dojo/main": function () {
            define(["./_base/kernel", "./has", "require", "./sniff", "./_base/lang", "./_base/array", "./_base/config", "./ready", "./_base/declare", "./_base/connect", "./_base/Deferred", "./_base/json", "./_base/Color", "./has!dojo-firebug?./_firebug/firebug", "./_base/browser", "./_base/loader"], function (_57f, has, _580, _581, lang, _582, _583, _584) {
                if (_583.isDebug) {
                    _580(["./_firebug/firebug"]);
                }
                1 || has.add("dojo-config-require", 1);
                if (1) {
                    var deps = _583.require;
                    if (deps) {
                        deps = _582.map(lang.isArray(deps) ? deps : [deps], function (item) {
                            return item.replace(/\./g, "/");
                        });
                        if (_57f.isAsync) {
                            _580(deps);
                        } else {
                            _584(1, function () {
                                _580(deps);
                            });
                        }
                    }
                }
                return _57f;
            });
        }, "dojo/on": function () {
            define(["./has!dom-addeventlistener?:./aspect", "./_base/kernel", "./sniff"], function (_585, dojo, has) {
                "use strict";
                if (1) {
                    var _586 = window.ScriptEngineMajorVersion;
                    has.add("jscript", _586 && (_586() + ScriptEngineMinorVersion() / 10));
                    has.add("event-orientationchange", has("touch") && !has("android"));
                    has.add("event-stopimmediatepropagation", window.Event && !!window.Event.prototype && !!window.Event.prototype.stopImmediatePropagation);
                    has.add("event-focusin", function (_587, doc, _588) {
                        return "onfocusin" in _588;
                    });
                    if (has("touch")) {
                        has.add("touch-can-modify-event-delegate", function () {
                            var _589 = function () {
                            };
                            _589.prototype = document.createEvent("MouseEvents");
                            try {
                                var _58a = new _589;
                                _58a.target = null;
                                return _58a.target === null;
                            } catch (e) {
                                return false;
                            }
                        });
                    }
                }
                var on = function (_58b, type, _58c, _58d) {
                    if (typeof _58b.on == "function" && typeof type != "function" && !_58b.nodeType) {
                        return _58b.on(type, _58c);
                    }
                    return on.parse(_58b, type, _58c, _58e, _58d, this);
                };
                on.pausable = function (_58f, type, _590, _591) {
                    var _592;
                    var _593 = on(_58f, type, function () {
                        if (!_592) {
                            return _590.apply(this, arguments);
                        }
                    }, _591);
                    _593.pause = function () {
                        _592 = true;
                    };
                    _593.resume = function () {
                        _592 = false;
                    };
                    return _593;
                };
                on.once = function (_594, type, _595, _596) {
                    var _597 = on(_594, type, function () {
                        _597.remove();
                        return _595.apply(this, arguments);
                    });
                    return _597;
                };
                on.parse = function (_598, type, _599, _59a, _59b, _59c) {
                    var _59d;
                    if (type.call) {
                        return type.call(_59c, _598, _599);
                    }
                    if (type instanceof Array) {
                        _59d = type;
                    } else {
                        if (type.indexOf(",") > -1) {
                            _59d = type.split(/\s*,\s*/);
                        }
                    }
                    if (_59d) {
                        var _59e = [];
                        var i = 0;
                        var _59f;
                        while (_59f = _59d[i++]) {
                            _59e.push(on.parse(_598, _59f, _599, _59a, _59b, _59c));
                        }
                        _59e.remove = function () {
                            for (var i = 0; i < _59e.length; i++) {
                                _59e[i].remove();
                            }
                        };
                        return _59e;
                    }
                    return _59a(_598, type, _599, _59b, _59c);
                };
                var _5a0 = /^touch/;

                function _58e(_5a1, type, _5a2, _5a3, _5a4) {
                    var _5a5 = type.match(/(.*):(.*)/);
                    if (_5a5) {
                        type = _5a5[2];
                        _5a5 = _5a5[1];
                        return on.selector(_5a5, type).call(_5a4, _5a1, _5a2);
                    }
                    if (has("touch")) {
                        if (_5a0.test(type)) {
                            _5a2 = _5a6(_5a2);
                        }
                        if (!has("event-orientationchange") && (type == "orientationchange")) {
                            type = "resize";
                            _5a1 = window;
                            _5a2 = _5a6(_5a2);
                        }
                    }
                    if (_5a7) {
                        _5a2 = _5a7(_5a2);
                    }
                    if (_5a1.addEventListener) {
                        var _5a8 = type in _5a9, _5aa = _5a8 ? _5a9[type] : type;
                        _5a1.addEventListener(_5aa, _5a2, _5a8);
                        return {
                            remove: function () {
                                _5a1.removeEventListener(_5aa, _5a2, _5a8);
                            }
                        };
                    }
                    type = "on" + type;
                    if (_5ab && _5a1.attachEvent) {
                        return _5ab(_5a1, type, _5a2);
                    }
                    throw new Error("Target must be an event emitter");
                };
                on.matches = function (node, _5ac, _5ad, _5ae, _5af) {
                    _5af = _5af && (typeof _5af.matches == "function") ? _5af : dojo.query;
                    _5ae = _5ae !== false;
                    if (node.nodeType != 1) {
                        node = node.parentNode;
                    }
                    while (!_5af.matches(node, _5ac, _5ad)) {
                        if (node == _5ad || _5ae === false || !(node = node.parentNode) || node.nodeType != 1) {
                            return false;
                        }
                    }
                    return node;
                };
                on.selector = function (_5b0, _5b1, _5b2) {
                    return function (_5b3, _5b4) {
                        var _5b5 = typeof _5b0 == "function" ? {matches: _5b0} : this, _5b6 = _5b1.bubble;

                        function _5b7(_5b8) {
                            return on.matches(_5b8, _5b0, _5b3, _5b2, _5b5);
                        };
                        if (_5b6) {
                            return on(_5b3, _5b6(_5b7), _5b4);
                        }
                        return on(_5b3, _5b1, function (_5b9) {
                            var _5ba = _5b7(_5b9.target);
                            if (_5ba) {
                                _5b9.selectorTarget = _5ba;
                                return _5b4.call(_5ba, _5b9);
                            }
                        });
                    };
                };
                function _5bb() {
                    this.cancelable = false;
                    this.defaultPrevented = true;
                };
                function _5bc() {
                    this.bubbles = false;
                };
                var _5bd = [].slice, _5be = on.emit = function (_5bf, type, _5c0) {
                    var args = _5bd.call(arguments, 2);
                    var _5c1 = "on" + type;
                    if ("parentNode" in _5bf) {
                        var _5c2 = args[0] = {};
                        for (var i in _5c0) {
                            _5c2[i] = _5c0[i];
                        }
                        _5c2.preventDefault = _5bb;
                        _5c2.stopPropagation = _5bc;
                        _5c2.target = _5bf;
                        _5c2.type = type;
                        _5c0 = _5c2;
                    }
                    do {
                        _5bf[_5c1] && _5bf[_5c1].apply(_5bf, args);
                    } while (_5c0 && _5c0.bubbles && (_5bf = _5bf.parentNode));
                    return _5c0 && _5c0.cancelable && _5c0;
                };
                var _5a9 = has("event-focusin") ? {} : {focusin: "focus", focusout: "blur"};
                if (!has("event-stopimmediatepropagation")) {
                    var _5c3 = function () {
                        this.immediatelyStopped = true;
                        this.modified = true;
                    };
                    var _5a7 = function (_5c4) {
                        return function (_5c5) {
                            if (!_5c5.immediatelyStopped) {
                                _5c5.stopImmediatePropagation = _5c3;
                                return _5c4.apply(this, arguments);
                            }
                        };
                    };
                }
                if (has("dom-addeventlistener")) {
                    on.emit = function (_5c6, type, _5c7) {
                        if (_5c6.dispatchEvent && document.createEvent) {
                            var _5c8 = _5c6.ownerDocument || document;
                            var _5c9 = _5c8.createEvent("HTMLEvents");
                            _5c9.initEvent(type, !!_5c7.bubbles, !!_5c7.cancelable);
                            for (var i in _5c7) {
                                if (!(i in _5c9)) {
                                    _5c9[i] = _5c7[i];
                                }
                            }
                            return _5c6.dispatchEvent(_5c9) && _5c9;
                        }
                        return _5be.apply(on, arguments);
                    };
                } else {
                    on._fixEvent = function (evt, _5ca) {
                        if (!evt) {
                            var w = _5ca && (_5ca.ownerDocument || _5ca.document || _5ca).parentWindow || window;
                            evt = w.event;
                        }
                        if (!evt) {
                            return evt;
                        }
                        try {
                            if (_5cb && evt.type == _5cb.type && evt.srcElement == _5cb.target) {
                                evt = _5cb;
                            }
                        } catch (e) {
                        }
                        if (!evt.target) {
                            evt.target = evt.srcElement;
                            evt.currentTarget = (_5ca || evt.srcElement);
                            if (evt.type == "mouseover") {
                                evt.relatedTarget = evt.fromElement;
                            }
                            if (evt.type == "mouseout") {
                                evt.relatedTarget = evt.toElement;
                            }
                            if (!evt.stopPropagation) {
                                evt.stopPropagation = _5cc;
                                evt.preventDefault = _5cd;
                            }
                            switch (evt.type) {
                                case "keypress":
                                    var c = ("charCode" in evt ? evt.charCode : evt.keyCode);
                                    if (c == 10) {
                                        c = 0;
                                        evt.keyCode = 13;
                                    } else {
                                        if (c == 13 || c == 27) {
                                            c = 0;
                                        } else {
                                            if (c == 3) {
                                                c = 99;
                                            }
                                        }
                                    }
                                    evt.charCode = c;
                                    _5ce(evt);
                                    break;
                            }
                        }
                        return evt;
                    };
                    var _5cb, _5cf = function (_5d0) {
                        this.handle = _5d0;
                    };
                    _5cf.prototype.remove = function () {
                        delete _dojoIEListeners_[this.handle];
                    };
                    var _5d1 = function (_5d2) {
                        return function (evt) {
                            evt = on._fixEvent(evt, this);
                            var _5d3 = _5d2.call(this, evt);
                            if (evt.modified) {
                                if (!_5cb) {
                                    setTimeout(function () {
                                        _5cb = null;
                                    });
                                }
                                _5cb = evt;
                            }
                            return _5d3;
                        };
                    };
                    var _5ab = function (_5d4, type, _5d5) {
                        _5d5 = _5d1(_5d5);
                        if (((_5d4.ownerDocument ? _5d4.ownerDocument.parentWindow : _5d4.parentWindow || _5d4.window || window) != top || has("jscript") < 5.8) && !has("config-_allow_leaks")) {
                            if (typeof _dojoIEListeners_ == "undefined") {
                                _dojoIEListeners_ = [];
                            }
                            var _5d6 = _5d4[type];
                            if (!_5d6 || !_5d6.listeners) {
                                var _5d7 = _5d6;
                                _5d6 = Function("event", "var callee = arguments.callee; for(var i = 0; i<callee.listeners.length; i++){var listener = _dojoIEListeners_[callee.listeners[i]]; if(listener){listener.call(this,event);}}");
                                _5d6.listeners = [];
                                _5d4[type] = _5d6;
                                _5d6.global = this;
                                if (_5d7) {
                                    _5d6.listeners.push(_dojoIEListeners_.push(_5d7) - 1);
                                }
                            }
                            var _5d8;
                            _5d6.listeners.push(_5d8 = (_5d6.global._dojoIEListeners_.push(_5d5) - 1));
                            return new _5cf(_5d8);
                        }
                        return _585.after(_5d4, type, _5d5, true);
                    };
                    var _5ce = function (evt) {
                        evt.keyChar = evt.charCode ? String.fromCharCode(evt.charCode) : "";
                        evt.charOrCode = evt.keyChar || evt.keyCode;
                    };
                    var _5cc = function () {
                        this.cancelBubble = true;
                    };
                    var _5cd = on._preventDefault = function () {
                        this.bubbledKeyCode = this.keyCode;
                        if (this.ctrlKey) {
                            try {
                                this.keyCode = 0;
                            } catch (e) {
                            }
                        }
                        this.defaultPrevented = true;
                        this.returnValue = false;
                        this.modified = true;
                    };
                }
                if (has("touch")) {
                    var _5d9 = function () {
                    };
                    var _5da = window.orientation;
                    var _5a6 = function (_5db) {
                        return function (_5dc) {
                            var _5dd = _5dc.corrected;
                            if (!_5dd) {
                                var type = _5dc.type;
                                try {
                                    delete _5dc.type;
                                } catch (e) {
                                }
                                if (_5dc.type) {
                                    if (has("touch-can-modify-event-delegate")) {
                                        _5d9.prototype = _5dc;
                                        _5dd = new _5d9;
                                    } else {
                                        _5dd = {};
                                        for (var name in _5dc) {
                                            _5dd[name] = _5dc[name];
                                        }
                                    }
                                    _5dd.preventDefault = function () {
                                        _5dc.preventDefault();
                                    };
                                    _5dd.stopPropagation = function () {
                                        _5dc.stopPropagation();
                                    };
                                } else {
                                    _5dd = _5dc;
                                    _5dd.type = type;
                                }
                                _5dc.corrected = _5dd;
                                if (type == "resize") {
                                    if (_5da == window.orientation) {
                                        return null;
                                    }
                                    _5da = window.orientation;
                                    _5dd.type = "orientationchange";
                                    return _5db.call(this, _5dd);
                                }
                                if (!("rotation" in _5dd)) {
                                    _5dd.rotation = 0;
                                    _5dd.scale = 1;
                                }
                                var _5de = _5dd.changedTouches[0];
                                for (var i in _5de) {
                                    delete _5dd[i];
                                    _5dd[i] = _5de[i];
                                }
                            }
                            return _5db.call(this, _5dd);
                        };
                    };
                }
                return on;
            });
        }, "dijit/_Widget": function () {
            define(["dojo/aspect", "dojo/_base/config", "dojo/_base/connect", "dojo/_base/declare", "dojo/has", "dojo/_base/kernel", "dojo/_base/lang", "dojo/query", "dojo/ready", "./registry", "./_WidgetBase", "./_OnDijitClickMixin", "./_FocusMixin", "dojo/uacss", "./hccss"], function (_5df, _5e0, _5e1, _5e2, has, _5e3, lang, _5e4, _5e5, _5e6, _5e7, _5e8, _5e9) {
                function _5ea() {
                };
                function _5eb(_5ec) {
                    return function (obj, _5ed, _5ee, _5ef) {
                        if (obj && typeof _5ed == "string" && obj[_5ed] == _5ea) {
                            return obj.on(_5ed.substring(2).toLowerCase(), lang.hitch(_5ee, _5ef));
                        }
                        return _5ec.apply(_5e1, arguments);
                    };
                };
                _5df.around(_5e1, "connect", _5eb);
                if (_5e3.connect) {
                    _5df.around(_5e3, "connect", _5eb);
                }
                var _5f0 = _5e2("dijit._Widget", [_5e7, _5e8, _5e9], {
                    onClick: _5ea,
                    onDblClick: _5ea,
                    onKeyDown: _5ea,
                    onKeyPress: _5ea,
                    onKeyUp: _5ea,
                    onMouseDown: _5ea,
                    onMouseMove: _5ea,
                    onMouseOut: _5ea,
                    onMouseOver: _5ea,
                    onMouseLeave: _5ea,
                    onMouseEnter: _5ea,
                    onMouseUp: _5ea,
                    constructor: function (_5f1) {
                        this._toConnect = {};
                        for (var name in _5f1) {
                            if (this[name] === _5ea) {
                                this._toConnect[name.replace(/^on/, "").toLowerCase()] = _5f1[name];
                                delete _5f1[name];
                            }
                        }
                    },
                    postCreate: function () {
                        this.inherited(arguments);
                        for (var name in this._toConnect) {
                            this.on(name, this._toConnect[name]);
                        }
                        delete this._toConnect;
                    },
                    on: function (type, func) {
                        if (this[this._onMap(type)] === _5ea) {
                            return _5e1.connect(this.domNode, type.toLowerCase(), this, func);
                        }
                        return this.inherited(arguments);
                    },
                    _setFocusedAttr: function (val) {
                        this._focused = val;
                        this._set("focused", val);
                    },
                    setAttribute: function (attr, _5f2) {
                        _5e3.deprecated(this.declaredClass + "::setAttribute(attr, value) is deprecated. Use set() instead.", "", "2.0");
                        this.set(attr, _5f2);
                    },
                    attr: function (name, _5f3) {
                        var args = arguments.length;
                        if (args >= 2 || typeof name === "object") {
                            return this.set.apply(this, arguments);
                        } else {
                            return this.get(name);
                        }
                    },
                    getDescendants: function () {
                        _5e3.deprecated(this.declaredClass + "::getDescendants() is deprecated. Use getChildren() instead.", "", "2.0");
                        return this.containerNode ? _5e4("[widgetId]", this.containerNode).map(_5e6.byNode) : [];
                    },
                    _onShow: function () {
                        this.onShow();
                    },
                    onShow: function () {
                    },
                    onHide: function () {
                    },
                    onClose: function () {
                        return true;
                    }
                });
                if (has("dijit-legacy-requires")) {
                    _5e5(0, function () {
                        var _5f4 = ["dijit/_base"];
                        require(_5f4);
                    });
                }
                return _5f0;
            });
        }, "dojo/cache": function () {
            define(["./_base/kernel", "./text"], function (dojo) {
                return dojo.cache;
            });
        }, "dijit/_FocusMixin": function () {
            define(["./focus", "./_WidgetBase", "dojo/_base/declare", "dojo/_base/lang"], function (_5f5, _5f6, _5f7, lang) {
                lang.extend(_5f6, {
                    focused: false, onFocus: function () {
                    }, onBlur: function () {
                    }, _onFocus: function () {
                        this.onFocus();
                    }, _onBlur: function () {
                        this.onBlur();
                    }
                });
                return _5f7("dijit._FocusMixin", null, {_focusManager: _5f5});
            });
        }, "dijit/_OnDijitClickMixin": function () {
            define(["dojo/on", "dojo/_base/array", "dojo/keys", "dojo/_base/declare", "dojo/has", "./a11yclick"], function (on, _5f8, keys, _5f9, has, _5fa) {
                var ret = _5f9("dijit._OnDijitClickMixin", null, {
                    connect: function (obj, _5fb, _5fc) {
                        return this.inherited(arguments, [obj, _5fb == "ondijitclick" ? _5fa : _5fb, _5fc]);
                    }
                });
                ret.a11yclick = _5fa;
                return ret;
            });
        }, "dijit/_Templated": function () {
            define(["./_WidgetBase", "./_TemplatedMixin", "./_WidgetsInTemplateMixin", "dojo/_base/array", "dojo/_base/declare", "dojo/_base/lang", "dojo/_base/kernel"], function (_5fd, _5fe, _5ff, _600, _601, lang, _602) {
                lang.extend(_5fd, {waiRole: "", waiState: ""});
                return _601("dijit._Templated", [_5fe, _5ff], {
                    constructor: function () {
                        _602.deprecated(this.declaredClass + ": dijit._Templated deprecated, use dijit._TemplatedMixin and if necessary dijit._WidgetsInTemplateMixin", "", "2.0");
                    }, _processNode: function (_603, _604) {
                        var ret = this.inherited(arguments);
                        var role = _604(_603, "waiRole");
                        if (role) {
                            _603.setAttribute("role", role);
                        }
                        var _605 = _604(_603, "waiState");
                        if (_605) {
                            _600.forEach(_605.split(/\s*,\s*/), function (_606) {
                                if (_606.indexOf("-") != -1) {
                                    var pair = _606.split("-");
                                    _603.setAttribute("aria-" + pair[0], pair[1]);
                                }
                            });
                        }
                        return ret;
                    }
                });
            });
        }, "dojo/query": function () {
            define(["./_base/kernel", "./has", "./dom", "./on", "./_base/array", "./_base/lang", "./selector/_loader", "./selector/_loader!default"], function (dojo, has, dom, on, _607, lang, _608, _609) {
                "use strict";
                has.add("array-extensible", function () {
                    return lang.delegate([], {length: 1}).length == 1 && !has("bug-for-in-skips-shadowed");
                });
                var ap = Array.prototype, aps = ap.slice, apc = ap.concat, _60a = _607.forEach;
                var tnl = function (a, _60b, _60c) {
                    var _60d = new (_60c || this._NodeListCtor || nl)(a);
                    return _60b ? _60d._stash(_60b) : _60d;
                };
                var _60e = function (f, a, o) {
                    a = [0].concat(aps.call(a, 0));
                    o = o || dojo.global;
                    return function (node) {
                        a[0] = node;
                        return f.apply(o, a);
                    };
                };
                var _60f = function (f, o) {
                    return function () {
                        this.forEach(_60e(f, arguments, o));
                        return this;
                    };
                };
                var _610 = function (f, o) {
                    return function () {
                        return this.map(_60e(f, arguments, o));
                    };
                };
                var _611 = function (f, o) {
                    return function () {
                        return this.filter(_60e(f, arguments, o));
                    };
                };
                var _612 = function (f, g, o) {
                    return function () {
                        var a = arguments, body = _60e(f, a, o);
                        if (g.call(o || dojo.global, a)) {
                            return this.map(body);
                        }
                        this.forEach(body);
                        return this;
                    };
                };
                var _613 = function (_614) {
                    var _615 = this instanceof nl && has("array-extensible");
                    if (typeof _614 == "number") {
                        _614 = Array(_614);
                    }
                    var _616 = (_614 && "length" in _614) ? _614 : arguments;
                    if (_615 || !_616.sort) {
                        var _617 = _615 ? this : [], l = _617.length = _616.length;
                        for (var i = 0; i < l; i++) {
                            _617[i] = _616[i];
                        }
                        if (_615) {
                            return _617;
                        }
                        _616 = _617;
                    }
                    lang._mixin(_616, nlp);
                    _616._NodeListCtor = function (_618) {
                        return nl(_618);
                    };
                    return _616;
                };
                var nl = _613, nlp = nl.prototype = has("array-extensible") ? [] : {};
                nl._wrap = nlp._wrap = tnl;
                nl._adaptAsMap = _610;
                nl._adaptAsForEach = _60f;
                nl._adaptAsFilter = _611;
                nl._adaptWithCondition = _612;
                _60a(["slice", "splice"], function (name) {
                    var f = ap[name];
                    nlp[name] = function () {
                        return this._wrap(f.apply(this, arguments), name == "slice" ? this : null);
                    };
                });
                _60a(["indexOf", "lastIndexOf", "every", "some"], function (name) {
                    var f = _607[name];
                    nlp[name] = function () {
                        return f.apply(dojo, [this].concat(aps.call(arguments, 0)));
                    };
                });
                lang.extend(_613, {
                    constructor: nl, _NodeListCtor: nl, toString: function () {
                        return this.join(",");
                    }, _stash: function (_619) {
                        this._parent = _619;
                        return this;
                    }, on: function (_61a, _61b) {
                        var _61c = this.map(function (node) {
                            return on(node, _61a, _61b);
                        });
                        _61c.remove = function () {
                            for (var i = 0; i < _61c.length; i++) {
                                _61c[i].remove();
                            }
                        };
                        return _61c;
                    }, end: function () {
                        if (this._parent) {
                            return this._parent;
                        } else {
                            return new this._NodeListCtor(0);
                        }
                    }, concat: function (item) {
                        var t = aps.call(this, 0), m = _607.map(arguments, function (a) {
                            return aps.call(a, 0);
                        });
                        return this._wrap(apc.apply(t, m), this);
                    }, map: function (func, obj) {
                        return this._wrap(_607.map(this, func, obj), this);
                    }, forEach: function (_61d, _61e) {
                        _60a(this, _61d, _61e);
                        return this;
                    }, filter: function (_61f) {
                        var a = arguments, _620 = this, _621 = 0;
                        if (typeof _61f == "string") {
                            _620 = _622._filterResult(this, a[0]);
                            if (a.length == 1) {
                                return _620._stash(this);
                            }
                            _621 = 1;
                        }
                        return this._wrap(_607.filter(_620, a[_621], a[_621 + 1]), this);
                    }, instantiate: function (_623, _624) {
                        var c = lang.isFunction(_623) ? _623 : lang.getObject(_623);
                        _624 = _624 || {};
                        return this.forEach(function (node) {
                            new c(_624, node);
                        });
                    }, at: function () {
                        var t = new this._NodeListCtor(0);
                        _60a(arguments, function (i) {
                            if (i < 0) {
                                i = this.length + i;
                            }
                            if (this[i]) {
                                t.push(this[i]);
                            }
                        }, this);
                        return t._stash(this);
                    }
                });
                function _625(_626, _627) {
                    var _628 = function (_629, root) {
                        if (typeof root == "string") {
                            root = dom.byId(root);
                            if (!root) {
                                return new _627([]);
                            }
                        }
                        var _62a = typeof _629 == "string" ? _626(_629, root) : _629 ? (_629.end && _629.on) ? _629 : [_629] : [];
                        if (_62a.end && _62a.on) {
                            return _62a;
                        }
                        return new _627(_62a);
                    };
                    _628.matches = _626.match || function (node, _62b, root) {
                            return _628.filter([node], _62b, root).length > 0;
                        };
                    _628.filter = _626.filter || function (_62c, _62d, root) {
                            return _628(_62d, root).filter(function (node) {
                                return _607.indexOf(_62c, node) > -1;
                            });
                        };
                    if (typeof _626 != "function") {
                        var _62e = _626.search;
                        _626 = function (_62f, root) {
                            return _62e(root || document, _62f);
                        };
                    }
                    return _628;
                };
                var _622 = _625(_609, _613);
                dojo.query = _625(_609, function (_630) {
                    return _613(_630);
                });
                _622.load = function (id, _631, _632) {
                    _608.load(id, _631, function (_633) {
                        _632(_625(_633, _613));
                    });
                };
                dojo._filterQueryResult = _622._filterResult = function (_634, _635, root) {
                    return new _613(_622.filter(_634, _635, root));
                };
                dojo.NodeList = _622.NodeList = _613;
                return _622;
            });
        }, "dojo/dom-class": function () {
            define(["./_base/lang", "./_base/array", "./dom"], function (lang, _636, dom) {
                var _637 = "className";
                var cls, _638 = /\s+/, a1 = [""];

                function _639(s) {
                    if (typeof s == "string" || s instanceof String) {
                        if (s && !_638.test(s)) {
                            a1[0] = s;
                            return a1;
                        }
                        var a = s.split(_638);
                        if (a.length && !a[0]) {
                            a.shift();
                        }
                        if (a.length && !a[a.length - 1]) {
                            a.pop();
                        }
                        return a;
                    }
                    if (!s) {
                        return [];
                    }
                    return _636.filter(s, function (x) {
                        return x;
                    });
                };
                var _63a = {};
                cls = {
                    contains: function containsClass(node, _63b) {
                        return ((" " + dom.byId(node)[_637] + " ").indexOf(" " + _63b + " ") >= 0);
                    }, add: function addClass(node, _63c) {
                        node = dom.byId(node);
                        _63c = _639(_63c);
                        var cls = node[_637], _63d;
                        cls = cls ? " " + cls + " " : " ";
                        _63d = cls.length;
                        for (var i = 0, len = _63c.length, c; i < len; ++i) {
                            c = _63c[i];
                            if (c && cls.indexOf(" " + c + " ") < 0) {
                                cls += c + " ";
                            }
                        }
                        if (_63d < cls.length) {
                            node[_637] = cls.substr(1, cls.length - 2);
                        }
                    }, remove: function removeClass(node, _63e) {
                        node = dom.byId(node);
                        var cls;
                        if (_63e !== undefined) {
                            _63e = _639(_63e);
                            cls = " " + node[_637] + " ";
                            for (var i = 0, len = _63e.length; i < len; ++i) {
                                cls = cls.replace(" " + _63e[i] + " ", " ");
                            }
                            cls = lang.trim(cls);
                        } else {
                            cls = "";
                        }
                        if (node[_637] != cls) {
                            node[_637] = cls;
                        }
                    }, replace: function replaceClass(node, _63f, _640) {
                        node = dom.byId(node);
                        _63a[_637] = node[_637];
                        cls.remove(_63a, _640);
                        cls.add(_63a, _63f);
                        if (node[_637] !== _63a[_637]) {
                            node[_637] = _63a[_637];
                        }
                    }, toggle: function toggleClass(node, _641, _642) {
                        node = dom.byId(node);
                        if (_642 === undefined) {
                            _641 = _639(_641);
                            for (var i = 0, len = _641.length, c; i < len; ++i) {
                                c = _641[i];
                                cls[cls.contains(node, c) ? "remove" : "add"](node, c);
                            }
                        } else {
                            cls[_642 ? "add" : "remove"](node, _641);
                        }
                        return _642;
                    }
                };
                return cls;
            });
        }, "dijit/focus": function () {
            define(["dojo/aspect", "dojo/_base/declare", "dojo/dom", "dojo/dom-attr", "dojo/dom-class", "dojo/dom-construct", "dojo/Evented", "dojo/_base/lang", "dojo/on", "dojo/domReady", "dojo/sniff", "dojo/Stateful", "dojo/_base/window", "dojo/window", "./a11y", "./registry", "./main"], function (_643, _644, dom, _645, _646, _647, _648, lang, on, _649, has, _64a, win, _64b, a11y, _64c, _64d) {
                var _64e;
                var _64f;
                var _650 = _644([_64a, _648], {
                    curNode: null, activeStack: [], constructor: function () {
                        var _651 = lang.hitch(this, function (node) {
                            if (dom.isDescendant(this.curNode, node)) {
                                this.set("curNode", null);
                            }
                            if (dom.isDescendant(this.prevNode, node)) {
                                this.set("prevNode", null);
                            }
                        });
                        _643.before(_647, "empty", _651);
                        _643.before(_647, "destroy", _651);
                    }, registerIframe: function (_652) {
                        return this.registerWin(_652.contentWindow, _652);
                    }, registerWin: function (_653, _654) {
                        var _655 = this, body = _653.document && _653.document.body;
                        if (body) {
                            var _656 = has("pointer-events") ? "pointerdown" : has("MSPointer") ? "MSPointerDown" : has("touch-events") ? "mousedown, touchstart" : "mousedown";
                            var mdh = on(_653.document, _656, function (evt) {
                                if (evt && evt.target && evt.target.parentNode == null) {
                                    return;
                                }
                                _655._onTouchNode(_654 || evt.target, "mouse");
                            });
                            var fih = on(body, "focusin", function (evt) {
                                if (!evt.target.tagName) {
                                    return;
                                }
                                var tag = evt.target.tagName.toLowerCase();
                                if (tag == "#document" || tag == "body") {
                                    return;
                                }
                                if (a11y.isFocusable(evt.target)) {
                                    _655._onFocusNode(_654 || evt.target);
                                } else {
                                    _655._onTouchNode(_654 || evt.target);
                                }
                            });
                            var foh = on(body, "focusout", function (evt) {
                                _655._onBlurNode(_654 || evt.target);
                            });
                            return {
                                remove: function () {
                                    mdh.remove();
                                    fih.remove();
                                    foh.remove();
                                    mdh = fih = foh = null;
                                    body = null;
                                }
                            };
                        }
                    }, _onBlurNode: function (node) {
                        var now = (new Date()).getTime();
                        if (now < _64e + 100) {
                            return;
                        }
                        if (this._clearFocusTimer) {
                            clearTimeout(this._clearFocusTimer);
                        }
                        this._clearFocusTimer = setTimeout(lang.hitch(this, function () {
                            this.set("prevNode", this.curNode);
                            this.set("curNode", null);
                        }), 0);
                        if (this._clearActiveWidgetsTimer) {
                            clearTimeout(this._clearActiveWidgetsTimer);
                        }
                        if (now < _64f + 100) {
                            return;
                        }
                        this._clearActiveWidgetsTimer = setTimeout(lang.hitch(this, function () {
                            delete this._clearActiveWidgetsTimer;
                            this._setStack([]);
                        }), 0);
                    }, _onTouchNode: function (node, by) {
                        _64f = (new Date()).getTime();
                        if (this._clearActiveWidgetsTimer) {
                            clearTimeout(this._clearActiveWidgetsTimer);
                            delete this._clearActiveWidgetsTimer;
                        }
                        if (_646.contains(node, "dijitPopup")) {
                            node = node.firstChild;
                        }
                        var _657 = [];
                        try {
                            while (node) {
                                var _658 = _645.get(node, "dijitPopupParent");
                                if (_658) {
                                    node = _64c.byId(_658).domNode;
                                } else {
                                    if (node.tagName && node.tagName.toLowerCase() == "body") {
                                        if (node === win.body()) {
                                            break;
                                        }
                                        node = _64b.get(node.ownerDocument).frameElement;
                                    } else {
                                        var id = node.getAttribute && node.getAttribute("widgetId"), _659 = id && _64c.byId(id);
                                        if (_659 && !(by == "mouse" && _659.get("disabled"))) {
                                            _657.unshift(id);
                                        }
                                        node = node.parentNode;
                                    }
                                }
                            }
                        } catch (e) {
                        }
                        this._setStack(_657, by);
                    }, _onFocusNode: function (node) {
                        if (!node) {
                            return;
                        }
                        if (node.nodeType == 9) {
                            return;
                        }
                        _64e = (new Date()).getTime();
                        if (this._clearFocusTimer) {
                            clearTimeout(this._clearFocusTimer);
                            delete this._clearFocusTimer;
                        }
                        this._onTouchNode(node);
                        if (node == this.curNode) {
                            return;
                        }
                        this.set("prevNode", this.curNode);
                        this.set("curNode", node);
                    }, _setStack: function (_65a, by) {
                        var _65b = this.activeStack, _65c = _65b.length - 1, _65d = _65a.length - 1;
                        if (_65a[_65d] == _65b[_65c]) {
                            return;
                        }
                        this.set("activeStack", _65a);
                        var _65e, i;
                        for (i = _65c; i >= 0 && _65b[i] != _65a[i]; i--) {
                            _65e = _64c.byId(_65b[i]);
                            if (_65e) {
                                _65e._hasBeenBlurred = true;
                                _65e.set("focused", false);
                                if (_65e._focusManager == this) {
                                    _65e._onBlur(by);
                                }
                                this.emit("widget-blur", _65e, by);
                            }
                        }
                        for (i++; i <= _65d; i++) {
                            _65e = _64c.byId(_65a[i]);
                            if (_65e) {
                                _65e.set("focused", true);
                                if (_65e._focusManager == this) {
                                    _65e._onFocus(by);
                                }
                                this.emit("widget-focus", _65e, by);
                            }
                        }
                    }, focus: function (node) {
                        if (node) {
                            try {
                                node.focus();
                            } catch (e) {
                            }
                        }
                    }
                });
                var _65f = new _650();
                _649(function () {
                    var _660 = _65f.registerWin(_64b.get(document));
                    if (has("ie")) {
                        on(window, "unload", function () {
                            if (_660) {
                                _660.remove();
                                _660 = null;
                            }
                        });
                    }
                });
                _64d.focus = function (node) {
                    _65f.focus(node);
                };
                for (var attr in _65f) {
                    if (!/^_/.test(attr)) {
                        _64d.focus[attr] = typeof _65f[attr] == "function" ? lang.hitch(_65f, attr) : _65f[attr];
                    }
                }
                _65f.watch(function (attr, _661, _662) {
                    _64d.focus[attr] = _662;
                });
                return _65f;
            });
        }, "dojo/dom-attr": function () {
            define(["exports", "./sniff", "./_base/lang", "./dom", "./dom-style", "./dom-prop"], function (_663, has, lang, dom, _664, prop) {
                var _665 = {
                    innerHTML: 1,
                    textContent: 1,
                    className: 1,
                    htmlFor: has("ie"),
                    value: 1
                }, _666 = {classname: "class", htmlfor: "for", tabindex: "tabIndex", readonly: "readOnly"};

                function _667(node, name) {
                    var attr = node.getAttributeNode && node.getAttributeNode(name);
                    return !!attr && attr.specified;
                };
                _663.has = function hasAttr(node, name) {
                    var lc = name.toLowerCase();
                    return _665[prop.names[lc] || name] || _667(dom.byId(node), _666[lc] || name);
                };
                _663.get = function getAttr(node, name) {
                    node = dom.byId(node);
                    var lc = name.toLowerCase(), _668 = prop.names[lc] || name, _669 = _665[_668], _66a = node[_668];
                    if (_669 && typeof _66a != "undefined") {
                        return _66a;
                    }
                    if (_668 == "textContent") {
                        return prop.get(node, _668);
                    }
                    if (_668 != "href" && (typeof _66a == "boolean" || lang.isFunction(_66a))) {
                        return _66a;
                    }
                    var _66b = _666[lc] || name;
                    return _667(node, _66b) ? node.getAttribute(_66b) : null;
                };
                _663.set = function setAttr(node, name, _66c) {
                    node = dom.byId(node);
                    if (arguments.length == 2) {
                        for (var x in name) {
                            _663.set(node, x, name[x]);
                        }
                        return node;
                    }
                    var lc = name.toLowerCase(), _66d = prop.names[lc] || name, _66e = _665[_66d];
                    if (_66d == "style" && typeof _66c != "string") {
                        _664.set(node, _66c);
                        return node;
                    }
                    if (_66e || typeof _66c == "boolean" || lang.isFunction(_66c)) {
                        return prop.set(node, name, _66c);
                    }
                    node.setAttribute(_666[lc] || name, _66c);
                    return node;
                };
                _663.remove = function removeAttr(node, name) {
                    dom.byId(node).removeAttribute(_666[name.toLowerCase()] || name);
                };
                _663.getNodeProp = function getNodeProp(node, name) {
                    node = dom.byId(node);
                    var lc = name.toLowerCase(), _66f = prop.names[lc] || name;
                    if ((_66f in node) && _66f != "href") {
                        return node[_66f];
                    }
                    var _670 = _666[lc] || name;
                    return _667(node, _670) ? node.getAttribute(_670) : null;
                };
            });
        }, "dojo/promise/tracer": function () {
            define(["../_base/lang", "./Promise", "../Evented"], function (lang, _671, _672) {
                "use strict";
                var _673 = new _672;
                var emit = _673.emit;
                _673.emit = null;
                function _674(args) {
                    setTimeout(function () {
                        emit.apply(_673, args);
                    }, 0);
                };
                _671.prototype.trace = function () {
                    var args = lang._toArray(arguments);
                    this.then(function (_675) {
                        _674(["resolved", _675].concat(args));
                    }, function (_676) {
                        _674(["rejected", _676].concat(args));
                    }, function (_677) {
                        _674(["progress", _677].concat(args));
                    });
                    return this;
                };
                _671.prototype.traceRejected = function () {
                    var args = lang._toArray(arguments);
                    this.otherwise(function (_678) {
                        _674(["rejected", _678].concat(args));
                    });
                    return this;
                };
                return _673;
            });
        }, "dijit/main": function () {
            define(["dojo/_base/kernel"], function (dojo) {
                return dojo.dijit;
            });
        }, "dojo/date/stamp": function () {
            define(["../_base/lang", "../_base/array"], function (lang, _679) {
                var _67a = {};
                lang.setObject("dojo.date.stamp", _67a);
                _67a.fromISOString = function (_67b, _67c) {
                    if (!_67a._isoRegExp) {
                        _67a._isoRegExp = /^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;
                    }
                    var _67d = _67a._isoRegExp.exec(_67b), _67e = null;
                    if (_67d) {
                        _67d.shift();
                        if (_67d[1]) {
                            _67d[1]--;
                        }
                        if (_67d[6]) {
                            _67d[6] *= 1000;
                        }
                        if (_67c) {
                            _67c = new Date(_67c);
                            _679.forEach(_679.map(["FullYear", "Month", "Date", "Hours", "Minutes", "Seconds", "Milliseconds"], function (prop) {
                                return _67c["get" + prop]();
                            }), function (_67f, _680) {
                                _67d[_680] = _67d[_680] || _67f;
                            });
                        }
                        _67e = new Date(_67d[0] || 1970, _67d[1] || 0, _67d[2] || 1, _67d[3] || 0, _67d[4] || 0, _67d[5] || 0, _67d[6] || 0);
                        if (_67d[0] < 100) {
                            _67e.setFullYear(_67d[0] || 1970);
                        }
                        var _681 = 0, _682 = _67d[7] && _67d[7].charAt(0);
                        if (_682 != "Z") {
                            _681 = ((_67d[8] || 0) * 60) + (Number(_67d[9]) || 0);
                            if (_682 != "-") {
                                _681 *= -1;
                            }
                        }
                        if (_682) {
                            _681 -= _67e.getTimezoneOffset();
                        }
                        if (_681) {
                            _67e.setTime(_67e.getTime() + _681 * 60000);
                        }
                    }
                    return _67e;
                };
                _67a.toISOString = function (_683, _684) {
                    var _685 = function (n) {
                        return (n < 10) ? "0" + n : n;
                    };
                    _684 = _684 || {};
                    var _686 = [], _687 = _684.zulu ? "getUTC" : "get", date = "";
                    if (_684.selector != "time") {
                        var year = _683[_687 + "FullYear"]();
                        date = ["0000".substr((year + "").length) + year, _685(_683[_687 + "Month"]() + 1), _685(_683[_687 + "Date"]())].join("-");
                    }
                    _686.push(date);
                    if (_684.selector != "date") {
                        var time = [_685(_683[_687 + "Hours"]()), _685(_683[_687 + "Minutes"]()), _685(_683[_687 + "Seconds"]())].join(":");
                        var _688 = _683[_687 + "Milliseconds"]();
                        if (_684.milliseconds) {
                            time += "." + (_688 < 100 ? "0" : "") + _685(_688);
                        }
                        if (_684.zulu) {
                            time += "Z";
                        } else {
                            if (_684.selector != "time") {
                                var _689 = _683.getTimezoneOffset();
                                var _68a = Math.abs(_689);
                                time += (_689 > 0 ? "-" : "+") + _685(Math.floor(_68a / 60)) + ":" + _685(_68a % 60);
                            }
                        }
                        _686.push(time);
                    }
                    return _686.join("T");
                };
                return _67a;
            });
        }, "dojo/request/util": function () {
            define(["exports", "../errors/RequestError", "../errors/CancelError", "../Deferred", "../io-query", "../_base/array", "../_base/lang", "../promise/Promise"], function (_68b, _68c, _68d, _68e, _68f, _690, lang, _691) {
                _68b.deepCopy = function deepCopy(_692, _693) {
                    for (var name in _693) {
                        var tval = _692[name], sval = _693[name];
                        if (tval !== sval) {
                            if (tval && typeof tval === "object" && sval && typeof sval === "object") {
                                _68b.deepCopy(tval, sval);
                            } else {
                                _692[name] = sval;
                            }
                        }
                    }
                    return _692;
                };
                _68b.deepCreate = function deepCreate(_694, _695) {
                    _695 = _695 || {};
                    var _696 = lang.delegate(_694), name, _697;
                    for (name in _694) {
                        _697 = _694[name];
                        if (_697 && typeof _697 === "object") {
                            _696[name] = _68b.deepCreate(_697, _695[name]);
                        }
                    }
                    return _68b.deepCopy(_696, _695);
                };
                var _698 = Object.freeze || function (obj) {
                        return obj;
                    };

                function _699(_69a) {
                    return _698(_69a);
                };
                function _69b(_69c) {
                    return _69c.data !== undefined ? _69c.data : _69c.text;
                };
                _68b.deferred = function deferred(_69d, _69e, _69f, _6a0, _6a1, last) {
                    var def = new _68e(function (_6a2) {
                        _69e && _69e(def, _69d);
                        if (!_6a2 || !(_6a2 instanceof _68c) && !(_6a2 instanceof _68d)) {
                            return new _68d("Request canceled", _69d);
                        }
                        return _6a2;
                    });
                    def.response = _69d;
                    def.isValid = _69f;
                    def.isReady = _6a0;
                    def.handleResponse = _6a1;
                    function _6a3(_6a4) {
                        _6a4.response = _69d;
                        throw _6a4;
                    };
                    var _6a5 = def.then(_699).otherwise(_6a3);
                    if (_68b.notify) {
                        _6a5.then(lang.hitch(_68b.notify, "emit", "load"), lang.hitch(_68b.notify, "emit", "error"));
                    }
                    var _6a6 = _6a5.then(_69b);
                    var _6a7 = new _691();
                    for (var prop in _6a6) {
                        if (_6a6.hasOwnProperty(prop)) {
                            _6a7[prop] = _6a6[prop];
                        }
                    }
                    _6a7.response = _6a5;
                    _698(_6a7);
                    if (last) {
                        def.then(function (_6a8) {
                            last.call(def, _6a8);
                        }, function (_6a9) {
                            last.call(def, _69d, _6a9);
                        });
                    }
                    def.promise = _6a7;
                    def.then = _6a7.then;
                    return def;
                };
                _68b.addCommonMethods = function addCommonMethods(_6aa, _6ab) {
                    _690.forEach(_6ab || ["GET", "POST", "PUT", "DELETE"], function (_6ac) {
                        _6aa[(_6ac === "DELETE" ? "DEL" : _6ac).toLowerCase()] = function (url, _6ad) {
                            _6ad = lang.delegate(_6ad || {});
                            _6ad.method = _6ac;
                            return _6aa(url, _6ad);
                        };
                    });
                };
                _68b.parseArgs = function parseArgs(url, _6ae, _6af) {
                    var data = _6ae.data, _6b0 = _6ae.query;
                    if (data && !_6af) {
                        if (typeof data === "object" && !(data instanceof ArrayBuffer || data instanceof Blob)) {
                            _6ae.data = _68f.objectToQuery(data);
                        }
                    }
                    if (_6b0) {
                        if (typeof _6b0 === "object") {
                            _6b0 = _68f.objectToQuery(_6b0);
                        }
                        if (_6ae.preventCache) {
                            _6b0 += (_6b0 ? "&" : "") + "request.preventCache=" + (+(new Date));
                        }
                    } else {
                        if (_6ae.preventCache) {
                            _6b0 = "request.preventCache=" + (+(new Date));
                        }
                    }
                    if (url && _6b0) {
                        url += (~url.indexOf("?") ? "&" : "?") + _6b0;
                    }
                    return {
                        url: url, options: _6ae, getHeader: function (_6b1) {
                            return null;
                        }
                    };
                };
                _68b.checkStatus = function (stat) {
                    stat = stat || 0;
                    return (stat >= 200 && stat < 300) || stat === 304 || stat === 1223 || !stat;
                };
            });
        }, "dojo/io-query": function () {
            define(["./_base/lang"], function (lang) {
                var _6b2 = {};
                return {
                    objectToQuery: function objectToQuery(map) {
                        var enc = encodeURIComponent, _6b3 = [];
                        for (var name in map) {
                            var _6b4 = map[name];
                            if (_6b4 != _6b2[name]) {
                                var _6b5 = enc(name) + "=";
                                if (lang.isArray(_6b4)) {
                                    for (var i = 0, l = _6b4.length; i < l; ++i) {
                                        _6b3.push(_6b5 + enc(_6b4[i]));
                                    }
                                } else {
                                    _6b3.push(_6b5 + enc(_6b4));
                                }
                            }
                        }
                        return _6b3.join("&");
                    }, queryToObject: function queryToObject(str) {
                        var dec = decodeURIComponent, qp = str.split("&"), ret = {}, name, val;
                        for (var i = 0, l = qp.length, item; i < l; ++i) {
                            item = qp[i];
                            if (item.length) {
                                var s = item.indexOf("=");
                                if (s < 0) {
                                    name = dec(item);
                                    val = "";
                                } else {
                                    name = dec(item.slice(0, s));
                                    val = dec(item.slice(s + 1));
                                }
                                if (typeof ret[name] == "string") {
                                    ret[name] = [ret[name]];
                                }
                                if (lang.isArray(ret[name])) {
                                    ret[name].push(val);
                                } else {
                                    ret[name] = val;
                                }
                            }
                        }
                        return ret;
                    }
                };
            });
        }, "dojo/promise/all": function () {
            define(["../_base/array", "../Deferred", "../when"], function (_6b6, _6b7, when) {
                "use strict";
                var some = _6b6.some;
                return function all(_6b8) {
                    var _6b9, _6b6;
                    if (_6b8 instanceof Array) {
                        _6b6 = _6b8;
                    } else {
                        if (_6b8 && typeof _6b8 === "object") {
                            _6b9 = _6b8;
                        }
                    }
                    var _6ba;
                    var _6bb = [];
                    if (_6b9) {
                        _6b6 = [];
                        for (var key in _6b9) {
                            if (Object.hasOwnProperty.call(_6b9, key)) {
                                _6bb.push(key);
                                _6b6.push(_6b9[key]);
                            }
                        }
                        _6ba = {};
                    } else {
                        if (_6b6) {
                            _6ba = [];
                        }
                    }
                    if (!_6b6 || !_6b6.length) {
                        return new _6b7().resolve(_6ba);
                    }
                    var _6bc = new _6b7();
                    _6bc.promise.always(function () {
                        _6ba = _6bb = null;
                    });
                    var _6bd = _6b6.length;
                    some(_6b6, function (_6be, _6bf) {
                        if (!_6b9) {
                            _6bb.push(_6bf);
                        }
                        when(_6be, function (_6c0) {
                            if (!_6bc.isFulfilled()) {
                                _6ba[_6bb[_6bf]] = _6c0;
                                if (--_6bd === 0) {
                                    _6bc.resolve(_6ba);
                                }
                            }
                        }, _6bc.reject);
                        return _6bc.isFulfilled();
                    });
                    return _6bc.promise;
                };
            });
        }, "dojo/ready": function () {
            define(["./_base/kernel", "./has", "require", "./domReady", "./_base/lang"], function (dojo, has, _6c1, _6c2, lang) {
                var _6c3 = 0, _6c4 = [], _6c5 = 0, _6c6 = function () {
                    _6c3 = 1;
                    dojo._postLoad = dojo.config.afterOnLoad = true;
                    _6c7();
                }, _6c7 = function () {
                    if (_6c5) {
                        return;
                    }
                    _6c5 = 1;
                    while (_6c3 && (!_6c2 || _6c2._Q.length == 0) && (_6c1.idle ? _6c1.idle() : true) && _6c4.length) {
                        var f = _6c4.shift();
                        try {
                            f();
                        } catch (e) {
                            e.info = e.message;
                            if (_6c1.signal) {
                                _6c1.signal("error", e);
                            } else {
                                throw e;
                            }
                        }
                    }
                    _6c5 = 0;
                };
                _6c1.on && _6c1.on("idle", _6c7);
                if (_6c2) {
                    _6c2._onQEmpty = _6c7;
                }
                var _6c8 = dojo.ready = dojo.addOnLoad = function (_6c9, _6ca, _6cb) {
                    var _6cc = lang._toArray(arguments);
                    if (typeof _6c9 != "number") {
                        _6cb = _6ca;
                        _6ca = _6c9;
                        _6c9 = 1000;
                    } else {
                        _6cc.shift();
                    }
                    _6cb = _6cb ? lang.hitch.apply(dojo, _6cc) : function () {
                        _6ca();
                    };
                    _6cb.priority = _6c9;
                    for (var i = 0; i < _6c4.length && _6c9 >= _6c4[i].priority; i++) {
                    }
                    _6c4.splice(i, 0, _6cb);
                    _6c7();
                };
                1 || has.add("dojo-config-addOnLoad", 1);
                if (1) {
                    var dca = dojo.config.addOnLoad;
                    if (dca) {
                        _6c8[(lang.isArray(dca) ? "apply" : "call")](dojo, dca);
                    }
                }
                if (1 && dojo.config.parseOnLoad && !dojo.isAsync) {
                    _6c8(99, function () {
                        if (!dojo.parser) {
                            dojo.deprecated("Add explicit require(['dojo/parser']);", "", "2.0");
                            _6c1(["dojo/parser"]);
                        }
                    });
                }
                if (_6c2) {
                    _6c2(_6c6);
                } else {
                    _6c6();
                }
                return _6c8;
            });
        }, "dijit/_TemplatedMixin": function () {
            define(["dojo/cache", "dojo/_base/declare", "dojo/dom-construct", "dojo/_base/lang", "dojo/on", "dojo/sniff", "dojo/string", "./_AttachMixin"], function (_6cd, _6ce, _6cf, lang, on, has, _6d0, _6d1) {
                var _6d2 = _6ce("dijit._TemplatedMixin", _6d1, {
                    templateString: null,
                    templatePath: null,
                    _skipNodeCache: false,
                    searchContainerNode: true,
                    _stringRepl: function (tmpl) {
                        var _6d3 = this.declaredClass, _6d4 = this;
                        return _6d0.substitute(tmpl, this, function (_6d5, key) {
                            if (key.charAt(0) == "!") {
                                _6d5 = lang.getObject(key.substr(1), false, _6d4);
                            }
                            if (typeof _6d5 == "undefined") {
                                throw new Error(_6d3 + " template:" + key);
                            }
                            if (_6d5 == null) {
                                return "";
                            }
                            return key.charAt(0) == "!" ? _6d5 : this._escapeValue("" + _6d5);
                        }, this);
                    },
                    _escapeValue: function (val) {
                        return val.replace(/["'<>&]/g, function (val) {
                            return {"&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#x27;"}[val];
                        });
                    },
                    buildRendering: function () {
                        if (!this._rendered) {
                            if (!this.templateString) {
                                this.templateString = _6cd(this.templatePath, {sanitize: true});
                            }
                            var _6d6 = _6d2.getCachedTemplate(this.templateString, this._skipNodeCache, this.ownerDocument);
                            var node;
                            if (lang.isString(_6d6)) {
                                node = _6cf.toDom(this._stringRepl(_6d6), this.ownerDocument);
                                if (node.nodeType != 1) {
                                    throw new Error("Invalid template: " + _6d6);
                                }
                            } else {
                                node = _6d6.cloneNode(true);
                            }
                            this.domNode = node;
                        }
                        this.inherited(arguments);
                        if (!this._rendered) {
                            this._fillContent(this.srcNodeRef);
                        }
                        this._rendered = true;
                    },
                    _fillContent: function (_6d7) {
                        var dest = this.containerNode;
                        if (_6d7 && dest) {
                            while (_6d7.hasChildNodes()) {
                                dest.appendChild(_6d7.firstChild);
                            }
                        }
                    }
                });
                _6d2._templateCache = {};
                _6d2.getCachedTemplate = function (_6d8, _6d9, doc) {
                    var _6da = _6d2._templateCache;
                    var key = _6d8;
                    var _6db = _6da[key];
                    if (_6db) {
                        try {
                            if (!_6db.ownerDocument || _6db.ownerDocument == (doc || document)) {
                                return _6db;
                            }
                        } catch (e) {
                        }
                        _6cf.destroy(_6db);
                    }
                    _6d8 = _6d0.trim(_6d8);
                    if (_6d9 || _6d8.match(/\$\{([^\}]+)\}/g)) {
                        return (_6da[key] = _6d8);
                    } else {
                        var node = _6cf.toDom(_6d8, doc);
                        if (node.nodeType != 1) {
                            throw new Error("Invalid template: " + _6d8);
                        }
                        return (_6da[key] = node);
                    }
                };
                if (has("ie")) {
                    on(window, "unload", function () {
                        var _6dc = _6d2._templateCache;
                        for (var key in _6dc) {
                            var _6dd = _6dc[key];
                            if (typeof _6dd == "object") {
                                _6cf.destroy(_6dd);
                            }
                            delete _6dc[key];
                        }
                    });
                }
                return _6d2;
            });
        }, "dojo/Evented": function () {
            define(["./aspect", "./on"], function (_6de, on) {
                "use strict";
                var _6df = _6de.after;

                function _6e0() {
                };
                _6e0.prototype = {
                    on: function (type, _6e1) {
                        return on.parse(this, type, _6e1, function (_6e2, type) {
                            return _6df(_6e2, "on" + type, _6e1, true);
                        });
                    }, emit: function (type, _6e3) {
                        var args = [this];
                        args.push.apply(args, arguments);
                        return on.emit.apply(on, args);
                    }
                };
                return _6e0;
            });
        }, "dojo/window": function () {
            define(["./_base/lang", "./sniff", "./_base/window", "./dom", "./dom-geometry", "./dom-style", "./dom-construct"], function (lang, has, _6e4, dom, geom, _6e5, _6e6) {
                has.add("rtl-adjust-position-for-verticalScrollBar", function (win, doc) {
                    var body = _6e4.body(doc), _6e7 = _6e6.create("div", {
                        style: {
                            overflow: "scroll",
                            overflowX: "visible",
                            direction: "rtl",
                            visibility: "hidden",
                            position: "absolute",
                            left: "0",
                            top: "0",
                            width: "64px",
                            height: "64px"
                        }
                    }, body, "last"), div = _6e6.create("div", {
                        style: {
                            overflow: "hidden",
                            direction: "ltr"
                        }
                    }, _6e7, "last"), ret = geom.position(div).x != 0;
                    _6e7.removeChild(div);
                    body.removeChild(_6e7);
                    return ret;
                });
                has.add("position-fixed-support", function (win, doc) {
                    var body = _6e4.body(doc), _6e8 = _6e6.create("span", {
                        style: {
                            visibility: "hidden",
                            position: "fixed",
                            left: "1px",
                            top: "1px"
                        }
                    }, body, "last"), _6e9 = _6e6.create("span", {
                        style: {
                            position: "fixed",
                            left: "0",
                            top: "0"
                        }
                    }, _6e8, "last"), ret = geom.position(_6e9).x != geom.position(_6e8).x;
                    _6e8.removeChild(_6e9);
                    body.removeChild(_6e8);
                    return ret;
                });
                var _6ea = {
                    getBox: function (doc) {
                        doc = doc || _6e4.doc;
                        var _6eb = (doc.compatMode == "BackCompat") ? _6e4.body(doc) : doc.documentElement, _6ec = geom.docScroll(doc), w, h;
                        if (has("touch")) {
                            var _6ed = _6ea.get(doc);
                            w = _6ed.innerWidth || _6eb.clientWidth;
                            h = _6ed.innerHeight || _6eb.clientHeight;
                        } else {
                            w = _6eb.clientWidth;
                            h = _6eb.clientHeight;
                        }
                        return {l: _6ec.x, t: _6ec.y, w: w, h: h};
                    }, get: function (doc) {
                        if (has("ie") && _6ea !== document.parentWindow) {
                            doc.parentWindow.execScript("document._parentWindow = window;", "Javascript");
                            var win = doc._parentWindow;
                            doc._parentWindow = null;
                            return win;
                        }
                        return doc.parentWindow || doc.defaultView;
                    }, scrollIntoView: function (node, pos) {
                        try {
                            node = dom.byId(node);
                            var doc = node.ownerDocument || _6e4.doc, body = _6e4.body(doc), html = doc.documentElement || body.parentNode, isIE = has("ie") || has("trident"), isWK = has("webkit");
                            if (node == body || node == html) {
                                return;
                            }
                            if (!(has("mozilla") || isIE || isWK || has("opera") || has("trident") || has("edge")) && ("scrollIntoView" in node)) {
                                node.scrollIntoView(false);
                                return;
                            }
                            var _6ee = doc.compatMode == "BackCompat", _6ef = Math.min(body.clientWidth || html.clientWidth, html.clientWidth || body.clientWidth), _6f0 = Math.min(body.clientHeight || html.clientHeight, html.clientHeight || body.clientHeight), _6f1 = (isWK || _6ee) ? body : html, _6f2 = pos || geom.position(node), el = node.parentNode, _6f3 = function (el) {
                                return (isIE <= 6 || (isIE == 7 && _6ee)) ? false : (has("position-fixed-support") && (_6e5.get(el, "position").toLowerCase() == "fixed"));
                            }, self = this, _6f4 = function (el, x, y) {
                                if (el.tagName == "BODY" || el.tagName == "HTML") {
                                    self.get(el.ownerDocument).scrollBy(x, y);
                                } else {
                                    x && (el.scrollLeft += x);
                                    y && (el.scrollTop += y);
                                }
                            };
                            if (_6f3(node)) {
                                return;
                            }
                            while (el) {
                                if (el == body) {
                                    el = _6f1;
                                }
                                var _6f5 = geom.position(el), _6f6 = _6f3(el), rtl = _6e5.getComputedStyle(el).direction.toLowerCase() == "rtl";
                                if (el == _6f1) {
                                    _6f5.w = _6ef;
                                    _6f5.h = _6f0;
                                    if (_6f1 == html && (isIE || has("trident")) && rtl) {
                                        _6f5.x += _6f1.offsetWidth - _6f5.w;
                                    }
                                    _6f5.x = 0;
                                    _6f5.y = 0;
                                } else {
                                    var pb = geom.getPadBorderExtents(el);
                                    _6f5.w -= pb.w;
                                    _6f5.h -= pb.h;
                                    _6f5.x += pb.l;
                                    _6f5.y += pb.t;
                                    var _6f7 = el.clientWidth, _6f8 = _6f5.w - _6f7;
                                    if (_6f7 > 0 && _6f8 > 0) {
                                        if (rtl && has("rtl-adjust-position-for-verticalScrollBar")) {
                                            _6f5.x += _6f8;
                                        }
                                        _6f5.w = _6f7;
                                    }
                                    _6f7 = el.clientHeight;
                                    _6f8 = _6f5.h - _6f7;
                                    if (_6f7 > 0 && _6f8 > 0) {
                                        _6f5.h = _6f7;
                                    }
                                }
                                if (_6f6) {
                                    if (_6f5.y < 0) {
                                        _6f5.h += _6f5.y;
                                        _6f5.y = 0;
                                    }
                                    if (_6f5.x < 0) {
                                        _6f5.w += _6f5.x;
                                        _6f5.x = 0;
                                    }
                                    if (_6f5.y + _6f5.h > _6f0) {
                                        _6f5.h = _6f0 - _6f5.y;
                                    }
                                    if (_6f5.x + _6f5.w > _6ef) {
                                        _6f5.w = _6ef - _6f5.x;
                                    }
                                }
                                var l = _6f2.x - _6f5.x, t = _6f2.y - _6f5.y, r = l + _6f2.w - _6f5.w, bot = t + _6f2.h - _6f5.h;
                                var s, old;
                                if (r * l > 0 && (!!el.scrollLeft || el == _6f1 || el.scrollWidth > el.offsetHeight)) {
                                    s = Math[l < 0 ? "max" : "min"](l, r);
                                    if (rtl && ((isIE == 8 && !_6ee) || has("trident") >= 5)) {
                                        s = -s;
                                    }
                                    old = el.scrollLeft;
                                    _6f4(el, s, 0);
                                    s = el.scrollLeft - old;
                                    _6f2.x -= s;
                                }
                                if (bot * t > 0 && (!!el.scrollTop || el == _6f1 || el.scrollHeight > el.offsetHeight)) {
                                    s = Math.ceil(Math[t < 0 ? "max" : "min"](t, bot));
                                    old = el.scrollTop;
                                    _6f4(el, 0, s);
                                    s = el.scrollTop - old;
                                    _6f2.y -= s;
                                }
                                el = (el != _6f1) && !_6f6 && el.parentNode;
                            }
                        } catch (error) {
                            console.error("scrollIntoView: " + error);
                            node.scrollIntoView(false);
                        }
                    }
                };
                1 && lang.setObject("dojo.window", _6ea);
                return _6ea;
            });
        }, "dojo/_base/xhr": function () {
            define(["./kernel", "./sniff", "require", "../io-query", "../dom", "../dom-form", "./Deferred", "./config", "./json", "./lang", "./array", "../on", "../aspect", "../request/watch", "../request/xhr", "../request/util"], function (dojo, has, _6f9, ioq, dom, _6fa, _6fb, _6fc, json, lang, _6fd, on, _6fe, _6ff, _700, util) {
                dojo._xhrObj = _700._create;
                var cfg = dojo.config;
                dojo.objectToQuery = ioq.objectToQuery;
                dojo.queryToObject = ioq.queryToObject;
                dojo.fieldToObject = _6fa.fieldToObject;
                dojo.formToObject = _6fa.toObject;
                dojo.formToQuery = _6fa.toQuery;
                dojo.formToJson = _6fa.toJson;
                dojo._blockAsync = false;
                var _701 = dojo._contentHandlers = dojo.contentHandlers = {
                    "text": function (xhr) {
                        return xhr.responseText;
                    }, "json": function (xhr) {
                        return json.fromJson(xhr.responseText || null);
                    }, "json-comment-filtered": function (xhr) {
                        if (!_6fc.useCommentedJson) {
                            console.warn("Consider using the standard mimetype:application/json." + " json-commenting can introduce security issues. To" + " decrease the chances of hijacking, use the standard the 'json' handler and" + " prefix your json with: {}&&\n" + "Use djConfig.useCommentedJson=true to turn off this message.");
                        }
                        var _702 = xhr.responseText;
                        var _703 = _702.indexOf("/*");
                        var _704 = _702.lastIndexOf("*/");
                        if (_703 == -1 || _704 == -1) {
                            throw new Error("JSON was not comment filtered");
                        }
                        return json.fromJson(_702.substring(_703 + 2, _704));
                    }, "javascript": function (xhr) {
                        return dojo.eval(xhr.responseText);
                    }, "xml": function (xhr) {
                        var _705 = xhr.responseXML;
                        if (_705 && has("dom-qsa2.1") && !_705.querySelectorAll && has("dom-parser")) {
                            _705 = new DOMParser().parseFromString(xhr.responseText, "application/xml");
                        }
                        if (has("ie")) {
                            if ((!_705 || !_705.documentElement)) {
                                var ms = function (n) {
                                    return "MSXML" + n + ".DOMDocument";
                                };
                                var dp = ["Microsoft.XMLDOM", ms(6), ms(4), ms(3), ms(2)];
                                _6fd.some(dp, function (p) {
                                    try {
                                        var dom = new ActiveXObject(p);
                                        dom.async = false;
                                        dom.loadXML(xhr.responseText);
                                        _705 = dom;
                                    } catch (e) {
                                        return false;
                                    }
                                    return true;
                                });
                            }
                        }
                        return _705;
                    }, "json-comment-optional": function (xhr) {
                        if (xhr.responseText && /^[^{\[]*\/\*/.test(xhr.responseText)) {
                            return _701["json-comment-filtered"](xhr);
                        } else {
                            return _701["json"](xhr);
                        }
                    }
                };
                dojo._ioSetArgs = function (args, _706, _707, _708) {
                    var _709 = {args: args, url: args.url};
                    var _70a = null;
                    if (args.form) {
                        var form = dom.byId(args.form);
                        var _70b = form.getAttributeNode("action");
                        _709.url = _709.url || (_70b ? _70b.value : (dojo.doc ? dojo.doc.URL : null));
                        _70a = _6fa.toObject(form);
                    }
                    var _70c = [{}];
                    if (_70a) {
                        _70c.push(_70a);
                    }
                    if (args.content) {
                        _70c.push(args.content);
                    }
                    if (args.preventCache) {
                        _70c.push({"dojo.preventCache": new Date().valueOf()});
                    }
                    _709.query = ioq.objectToQuery(lang.mixin.apply(null, _70c));
                    _709.handleAs = args.handleAs || "text";
                    var d = new _6fb(function (dfd) {
                        dfd.canceled = true;
                        _706 && _706(dfd);
                        var err = dfd.ioArgs.error;
                        if (!err) {
                            err = new Error("request cancelled");
                            err.dojoType = "cancel";
                            dfd.ioArgs.error = err;
                        }
                        return err;
                    });
                    d.addCallback(_707);
                    var ld = args.load;
                    if (ld && lang.isFunction(ld)) {
                        d.addCallback(function (_70d) {
                            return ld.call(args, _70d, _709);
                        });
                    }
                    var err = args.error;
                    if (err && lang.isFunction(err)) {
                        d.addErrback(function (_70e) {
                            return err.call(args, _70e, _709);
                        });
                    }
                    var _70f = args.handle;
                    if (_70f && lang.isFunction(_70f)) {
                        d.addBoth(function (_710) {
                            return _70f.call(args, _710, _709);
                        });
                    }
                    d.addErrback(function (_711) {
                        return _708(_711, d);
                    });
                    if (cfg.ioPublish && dojo.publish && _709.args.ioPublish !== false) {
                        d.addCallbacks(function (res) {
                            dojo.publish("/dojo/io/load", [d, res]);
                            return res;
                        }, function (res) {
                            dojo.publish("/dojo/io/error", [d, res]);
                            return res;
                        });
                        d.addBoth(function (res) {
                            dojo.publish("/dojo/io/done", [d, res]);
                            return res;
                        });
                    }
                    d.ioArgs = _709;
                    return d;
                };
                var _712 = function (dfd) {
                    var ret = _701[dfd.ioArgs.handleAs](dfd.ioArgs.xhr);
                    return ret === undefined ? null : ret;
                };
                var _713 = function (_714, dfd) {
                    if (!dfd.ioArgs.args.failOk) {
                        console.error(_714);
                    }
                    return _714;
                };
                var _715 = function (dfd) {
                    if (_716 <= 0) {
                        _716 = 0;
                        if (cfg.ioPublish && dojo.publish && (!dfd || dfd && dfd.ioArgs.args.ioPublish !== false)) {
                            dojo.publish("/dojo/io/stop");
                        }
                    }
                };
                var _716 = 0;
                _6fe.after(_6ff, "_onAction", function () {
                    _716 -= 1;
                });
                _6fe.after(_6ff, "_onInFlight", _715);
                dojo._ioCancelAll = _6ff.cancelAll;
                dojo._ioNotifyStart = function (dfd) {
                    if (cfg.ioPublish && dojo.publish && dfd.ioArgs.args.ioPublish !== false) {
                        if (!_716) {
                            dojo.publish("/dojo/io/start");
                        }
                        _716 += 1;
                        dojo.publish("/dojo/io/send", [dfd]);
                    }
                };
                dojo._ioWatch = function (dfd, _717, _718, _719) {
                    var args = dfd.ioArgs.options = dfd.ioArgs.args;
                    lang.mixin(dfd, {
                        response: dfd.ioArgs, isValid: function (_71a) {
                            return _717(dfd);
                        }, isReady: function (_71b) {
                            return _718(dfd);
                        }, handleResponse: function (_71c) {
                            return _719(dfd);
                        }
                    });
                    _6ff(dfd);
                    _715(dfd);
                };
                var _71d = "application/x-www-form-urlencoded";
                dojo._ioAddQueryToUrl = function (_71e) {
                    if (_71e.query.length) {
                        _71e.url += (_71e.url.indexOf("?") == -1 ? "?" : "&") + _71e.query;
                        _71e.query = null;
                    }
                };
                dojo.xhr = function (_71f, args, _720) {
                    var rDfd;
                    var dfd = dojo._ioSetArgs(args, function (dfd) {
                        rDfd && rDfd.cancel();
                    }, _712, _713);
                    var _721 = dfd.ioArgs;
                    if ("postData" in args) {
                        _721.query = args.postData;
                    } else {
                        if ("putData" in args) {
                            _721.query = args.putData;
                        } else {
                            if ("rawBody" in args) {
                                _721.query = args.rawBody;
                            } else {
                                if ((arguments.length > 2 && !_720) || "POST|PUT".indexOf(_71f.toUpperCase()) === -1) {
                                    dojo._ioAddQueryToUrl(_721);
                                }
                            }
                        }
                    }
                    var _722 = {
                        method: _71f,
                        handleAs: "text",
                        timeout: args.timeout,
                        withCredentials: args.withCredentials,
                        ioArgs: _721
                    };
                    if (typeof args.headers !== "undefined") {
                        _722.headers = args.headers;
                    }
                    if (typeof args.contentType !== "undefined") {
                        if (!_722.headers) {
                            _722.headers = {};
                        }
                        _722.headers["Content-Type"] = args.contentType;
                    }
                    if (typeof _721.query !== "undefined") {
                        _722.data = _721.query;
                    }
                    if (typeof args.sync !== "undefined") {
                        _722.sync = args.sync;
                    }
                    dojo._ioNotifyStart(dfd);
                    try {
                        rDfd = _700(_721.url, _722, true);
                    } catch (e) {
                        dfd.cancel();
                        return dfd;
                    }
                    dfd.ioArgs.xhr = rDfd.response.xhr;
                    rDfd.then(function () {
                        dfd.resolve(dfd);
                    }).otherwise(function (_723) {
                        _721.error = _723;
                        if (_723.response) {
                            _723.status = _723.response.status;
                            _723.responseText = _723.response.text;
                            _723.xhr = _723.response.xhr;
                        }
                        dfd.reject(_723);
                    });
                    return dfd;
                };
                dojo.xhrGet = function (args) {
                    return dojo.xhr("GET", args);
                };
                dojo.rawXhrPost = dojo.xhrPost = function (args) {
                    return dojo.xhr("POST", args, true);
                };
                dojo.rawXhrPut = dojo.xhrPut = function (args) {
                    return dojo.xhr("PUT", args, true);
                };
                dojo.xhrDelete = function (args) {
                    return dojo.xhr("DELETE", args);
                };
                dojo._isDocumentOk = function (x) {
                    return util.checkStatus(x.status);
                };
                dojo._getText = function (url) {
                    var _724;
                    dojo.xhrGet({
                        url: url, sync: true, load: function (text) {
                            _724 = text;
                        }
                    });
                    return _724;
                };
                lang.mixin(dojo.xhr, {
                    _xhrObj: dojo._xhrObj,
                    fieldToObject: _6fa.fieldToObject,
                    formToObject: _6fa.toObject,
                    objectToQuery: ioq.objectToQuery,
                    formToQuery: _6fa.toQuery,
                    formToJson: _6fa.toJson,
                    queryToObject: ioq.queryToObject,
                    contentHandlers: _701,
                    _ioSetArgs: dojo._ioSetArgs,
                    _ioCancelAll: dojo._ioCancelAll,
                    _ioNotifyStart: dojo._ioNotifyStart,
                    _ioWatch: dojo._ioWatch,
                    _ioAddQueryToUrl: dojo._ioAddQueryToUrl,
                    _isDocumentOk: dojo._isDocumentOk,
                    _getText: dojo._getText,
                    get: dojo.xhrGet,
                    post: dojo.xhrPost,
                    put: dojo.xhrPut,
                    del: dojo.xhrDelete
                });
                return dojo.xhr;
            });
        }, "dojo/has": function () {
            define(["require", "module"], function (_725, _726) {
                var has = _725.has || function () {
                    };
                if (!1) {
                    var _727 = typeof window != "undefined" && typeof location != "undefined" && typeof document != "undefined" && window.location == location && window.document == document, _728 = (function () {
                        return this;
                    })(), doc = _727 && document, _729 = doc && doc.createElement("DiV"), _72a = (_726.config && _726.config()) || {};
                    has = function (name) {
                        return typeof _72a[name] == "function" ? (_72a[name] = _72a[name](_728, doc, _729)) : _72a[name];
                    };
                    has.cache = _72a;
                    has.add = function (name, test, now, _72b) {
                        (typeof _72a[name] == "undefined" || _72b) && (_72a[name] = test);
                        return now && has(name);
                    };
                    1 || has.add("host-browser", _727);
                    0 && has.add("host-node", (typeof process == "object" && process.versions && process.versions.node && process.versions.v8));
                    0 && has.add("host-rhino", (typeof load == "function" && (typeof Packages == "function" || typeof Packages == "object")));
                    1 || has.add("dom", _727);
                    1 || has.add("dojo-dom-ready-api", 1);
                    1 || has.add("dojo-sniff", 1);
                }
                if (1) {
                    has.add("dom-addeventlistener", !!document.addEventListener);
                    has.add("touch", "ontouchstart" in document || ("onpointerdown" in document && navigator.maxTouchPoints > 0) || window.navigator.msMaxTouchPoints);
                    has.add("touch-events", "ontouchstart" in document);
                    has.add("pointer-events", "pointerEnabled" in window.navigator ? window.navigator.pointerEnabled : "PointerEvent" in window);
                    has.add("MSPointer", window.navigator.msPointerEnabled);
                    has.add("device-width", screen.availWidth || innerWidth);
                    var form = document.createElement("form");
                    has.add("dom-attributes-explicit", form.attributes.length == 0);
                    has.add("dom-attributes-specified-flag", form.attributes.length > 0 && form.attributes.length < 40);
                }
                has.clearElement = function (_72c) {
                    _72c.innerHTML = "";
                    return _72c;
                };
                has.normalize = function (id, _72d) {
                    var _72e = id.match(/[\?:]|[^:\?]*/g), i = 0, get = function (skip) {
                        var term = _72e[i++];
                        if (term == ":") {
                            return 0;
                        } else {
                            if (_72e[i++] == "?") {
                                if (!skip && has(term)) {
                                    return get();
                                } else {
                                    get(true);
                                    return get(skip);
                                }
                            }
                            return term || 0;
                        }
                    };
                    id = get();
                    return id && _72d(id);
                };
                has.load = function (id, _72f, _730) {
                    if (id) {
                        _72f([id], _730);
                    } else {
                        _730();
                    }
                };
                return has;
            });
        }, "dojo/_base/sniff": function () {
            define(["./kernel", "./lang", "../sniff"], function (dojo, lang, has) {
                if (!1) {
                    return has;
                }
                dojo._name = "browser";
                lang.mixin(dojo, {
                    isBrowser: true,
                    isFF: has("ff"),
                    isIE: has("ie"),
                    isKhtml: has("khtml"),
                    isWebKit: has("webkit"),
                    isMozilla: has("mozilla"),
                    isMoz: has("mozilla"),
                    isOpera: has("opera"),
                    isSafari: has("safari"),
                    isChrome: has("chrome"),
                    isMac: has("mac"),
                    isIos: has("ios"),
                    isAndroid: has("android"),
                    isWii: has("wii"),
                    isQuirks: has("quirks"),
                    isAir: has("air")
                });
                return has;
            });
        }, "dojo/_base/window": function () {
            define(["./kernel", "./lang", "../sniff"], function (dojo, lang, has) {
                var ret = {
                    global: dojo.global, doc: dojo.global["document"] || null, body: function (doc) {
                        doc = doc || dojo.doc;
                        return doc.body || doc.getElementsByTagName("body")[0];
                    }, setContext: function (_731, _732) {
                        dojo.global = ret.global = _731;
                        dojo.doc = ret.doc = _732;
                    }, withGlobal: function (_733, _734, _735, _736) {
                        var _737 = dojo.global;
                        try {
                            dojo.global = ret.global = _733;
                            return ret.withDoc.call(null, _733.document, _734, _735, _736);
                        } finally {
                            dojo.global = ret.global = _737;
                        }
                    }, withDoc: function (_738, _739, _73a, _73b) {
                        var _73c = ret.doc, oldQ = has("quirks"), _73d = has("ie"), isIE, mode, pwin;
                        try {
                            dojo.doc = ret.doc = _738;
                            dojo.isQuirks = has.add("quirks", dojo.doc.compatMode == "BackCompat", true, true);
                            if (has("ie")) {
                                if ((pwin = _738.parentWindow) && pwin.navigator) {
                                    isIE = parseFloat(pwin.navigator.appVersion.split("MSIE ")[1]) || undefined;
                                    mode = _738.documentMode;
                                    if (mode && mode != 5 && Math.floor(isIE) != mode) {
                                        isIE = mode;
                                    }
                                    dojo.isIE = has.add("ie", isIE, true, true);
                                }
                            }
                            if (_73a && typeof _739 == "string") {
                                _739 = _73a[_739];
                            }
                            return _739.apply(_73a, _73b || []);
                        } finally {
                            dojo.doc = ret.doc = _73c;
                            dojo.isQuirks = has.add("quirks", oldQ, true, true);
                            dojo.isIE = has.add("ie", _73d, true, true);
                        }
                    }
                };
                1 && lang.mixin(dojo, ret);
                return ret;
            });
        }, "dojo/when": function () {
            define(["./Deferred", "./promise/Promise"], function (_73e, _73f) {
                "use strict";
                return function when(_740, _741, _742, _743) {
                    var _744 = _740 && typeof _740.then === "function";
                    var _745 = _744 && _740 instanceof _73f;
                    if (!_744) {
                        if (arguments.length > 1) {
                            return _741 ? _741(_740) : _740;
                        } else {
                            return new _73e().resolve(_740);
                        }
                    } else {
                        if (!_745) {
                            var _746 = new _73e(_740.cancel);
                            _740.then(_746.resolve, _746.reject, _746.progress);
                            _740 = _746.promise;
                        }
                    }
                    if (_741 || _742 || _743) {
                        return _740.then(_741, _742, _743);
                    }
                    return _740;
                };
            });
        }, "dojo/errors/RequestError": function () {
            define(["./create"], function (_747) {
                return _747("RequestError", function (_748, _749) {
                    this.response = _749;
                });
            });
        }, "dijit/_WidgetBase": function () {
            define(["require", "dojo/_base/array", "dojo/aspect", "dojo/_base/config", "dojo/_base/connect", "dojo/_base/declare", "dojo/dom", "dojo/dom-attr", "dojo/dom-class", "dojo/dom-construct", "dojo/dom-geometry", "dojo/dom-style", "dojo/has", "dojo/_base/kernel", "dojo/_base/lang", "dojo/on", "dojo/ready", "dojo/Stateful", "dojo/topic", "dojo/_base/window", "./Destroyable", "dojo/has!dojo-bidi?./_BidiMixin", "./registry"], function (_74a, _74b, _74c, _74d, _74e, _74f, dom, _750, _751, _752, _753, _754, has, _755, lang, on, _756, _757, _758, win, _759, _75a, _75b) {
                has.add("dijit-legacy-requires", !_755.isAsync);
                has.add("dojo-bidi", false);
                if (has("dijit-legacy-requires")) {
                    _756(0, function () {
                        var _75c = ["dijit/_base/manager"];
                        _74a(_75c);
                    });
                }
                var _75d = {};

                function _75e(obj) {
                    var ret = {};
                    for (var attr in obj) {
                        ret[attr.toLowerCase()] = true;
                    }
                    return ret;
                };
                function _75f(attr) {
                    return function (val) {
                        _750[val ? "set" : "remove"](this.domNode, attr, val);
                        this._set(attr, val);
                    };
                };
                function _760(a, b) {
                    return a === b || (a !== a && b !== b);
                };
                var _761 = _74f("dijit._WidgetBase", [_757, _759], {
                    id: "",
                    _setIdAttr: "domNode",
                    lang: "",
                    _setLangAttr: _75f("lang"),
                    dir: "",
                    _setDirAttr: _75f("dir"),
                    "class": "",
                    _setClassAttr: {node: "domNode", type: "class"},
                    _setTypeAttr: null,
                    style: "",
                    title: "",
                    tooltip: "",
                    baseClass: "",
                    srcNodeRef: null,
                    domNode: null,
                    containerNode: null,
                    ownerDocument: null,
                    _setOwnerDocumentAttr: function (val) {
                        this._set("ownerDocument", val);
                    },
                    attributeMap: {},
                    _blankGif: _74d.blankGif || _74a.toUrl("dojo/resources/blank.gif"),
                    textDir: "",
                    _introspect: function () {
                        var ctor = this.constructor;
                        if (!ctor._setterAttrs) {
                            var _762 = ctor.prototype, _763 = ctor._setterAttrs = [], _764 = (ctor._onMap = {});
                            for (var name in _762.attributeMap) {
                                _763.push(name);
                            }
                            for (name in _762) {
                                if (/^on/.test(name)) {
                                    _764[name.substring(2).toLowerCase()] = name;
                                }
                                if (/^_set[A-Z](.*)Attr$/.test(name)) {
                                    name = name.charAt(4).toLowerCase() + name.substr(5, name.length - 9);
                                    if (!_762.attributeMap || !(name in _762.attributeMap)) {
                                        _763.push(name);
                                    }
                                }
                            }
                        }
                    },
                    postscript: function (_765, _766) {
                        this.create(_765, _766);
                    },
                    create: function (_767, _768) {
                        this._introspect();
                        this.srcNodeRef = dom.byId(_768);
                        this._connects = [];
                        this._supportingWidgets = [];
                        if (this.srcNodeRef && this.srcNodeRef.id && (typeof this.srcNodeRef.id == "string")) {
                            this.id = this.srcNodeRef.id;
                        }
                        if (_767) {
                            this.params = _767;
                            lang.mixin(this, _767);
                        }
                        this.postMixInProperties();
                        if (!this.id) {
                            this.id = _75b.getUniqueId(this.declaredClass.replace(/\./g, "_"));
                            if (this.params) {
                                delete this.params.id;
                            }
                        }
                        this.ownerDocument = this.ownerDocument || (this.srcNodeRef ? this.srcNodeRef.ownerDocument : document);
                        this.ownerDocumentBody = win.body(this.ownerDocument);
                        _75b.add(this);
                        this.buildRendering();
                        var _769;
                        if (this.domNode) {
                            this._applyAttributes();
                            var _76a = this.srcNodeRef;
                            if (_76a && _76a.parentNode && this.domNode !== _76a) {
                                _76a.parentNode.replaceChild(this.domNode, _76a);
                                _769 = true;
                            }
                            this.domNode.setAttribute("widgetId", this.id);
                        }
                        this.postCreate();
                        if (_769) {
                            delete this.srcNodeRef;
                        }
                        this._created = true;
                    },
                    _applyAttributes: function () {
                        var _76b = {};
                        for (var key in this.params || {}) {
                            _76b[key] = this._get(key);
                        }
                        _74b.forEach(this.constructor._setterAttrs, function (key) {
                            if (!(key in _76b)) {
                                var val = this._get(key);
                                if (val) {
                                    this.set(key, val);
                                }
                            }
                        }, this);
                        for (key in _76b) {
                            this.set(key, _76b[key]);
                        }
                    },
                    postMixInProperties: function () {
                    },
                    buildRendering: function () {
                        if (!this.domNode) {
                            this.domNode = this.srcNodeRef || this.ownerDocument.createElement("div");
                        }
                        if (this.baseClass) {
                            var _76c = this.baseClass.split(" ");
                            if (!this.isLeftToRight()) {
                                _76c = _76c.concat(_74b.map(_76c, function (name) {
                                    return name + "Rtl";
                                }));
                            }
                            _751.add(this.domNode, _76c);
                        }
                    },
                    postCreate: function () {
                    },
                    startup: function () {
                        if (this._started) {
                            return;
                        }
                        this._started = true;
                        _74b.forEach(this.getChildren(), function (obj) {
                            if (!obj._started && !obj._destroyed && lang.isFunction(obj.startup)) {
                                obj.startup();
                                obj._started = true;
                            }
                        });
                    },
                    destroyRecursive: function (_76d) {
                        this._beingDestroyed = true;
                        this.destroyDescendants(_76d);
                        this.destroy(_76d);
                    },
                    destroy: function (_76e) {
                        this._beingDestroyed = true;
                        this.uninitialize();
                        function _76f(w) {
                            if (w.destroyRecursive) {
                                w.destroyRecursive(_76e);
                            } else {
                                if (w.destroy) {
                                    w.destroy(_76e);
                                }
                            }
                        };
                        _74b.forEach(this._connects, lang.hitch(this, "disconnect"));
                        _74b.forEach(this._supportingWidgets, _76f);
                        if (this.domNode) {
                            _74b.forEach(_75b.findWidgets(this.domNode, this.containerNode), _76f);
                        }
                        this.destroyRendering(_76e);
                        _75b.remove(this.id);
                        this._destroyed = true;
                    },
                    destroyRendering: function (_770) {
                        if (this.bgIframe) {
                            this.bgIframe.destroy(_770);
                            delete this.bgIframe;
                        }
                        if (this.domNode) {
                            if (_770) {
                                _750.remove(this.domNode, "widgetId");
                            } else {
                                _752.destroy(this.domNode);
                            }
                            delete this.domNode;
                        }
                        if (this.srcNodeRef) {
                            if (!_770) {
                                _752.destroy(this.srcNodeRef);
                            }
                            delete this.srcNodeRef;
                        }
                    },
                    destroyDescendants: function (_771) {
                        _74b.forEach(this.getChildren(), function (_772) {
                            if (_772.destroyRecursive) {
                                _772.destroyRecursive(_771);
                            }
                        });
                    },
                    uninitialize: function () {
                        return false;
                    },
                    _setStyleAttr: function (_773) {
                        var _774 = this.domNode;
                        if (lang.isObject(_773)) {
                            _754.set(_774, _773);
                        } else {
                            if (_774.style.cssText) {
                                _774.style.cssText += "; " + _773;
                            } else {
                                _774.style.cssText = _773;
                            }
                        }
                        this._set("style", _773);
                    },
                    _attrToDom: function (attr, _775, _776) {
                        _776 = arguments.length >= 3 ? _776 : this.attributeMap[attr];
                        _74b.forEach(lang.isArray(_776) ? _776 : [_776], function (_777) {
                            var _778 = this[_777.node || _777 || "domNode"];
                            var type = _777.type || "attribute";
                            switch (type) {
                                case "attribute":
                                    if (lang.isFunction(_775)) {
                                        _775 = lang.hitch(this, _775);
                                    }
                                    var _779 = _777.attribute ? _777.attribute : (/^on[A-Z][a-zA-Z]*$/.test(attr) ? attr.toLowerCase() : attr);
                                    if (_778.tagName) {
                                        _750.set(_778, _779, _775);
                                    } else {
                                        _778.set(_779, _775);
                                    }
                                    break;
                                case "innerText":
                                    _778.innerHTML = "";
                                    _778.appendChild(this.ownerDocument.createTextNode(_775));
                                    break;
                                case "innerHTML":
                                    _778.innerHTML = _775;
                                    break;
                                case "class":
                                    _751.replace(_778, _775, this[attr]);
                                    break;
                                case "toggleClass":
                                    _751.toggle(_778, _777.className || attr, _775);
                                    break;
                            }
                        }, this);
                    },
                    get: function (name) {
                        var _77a = this._getAttrNames(name);
                        return this[_77a.g] ? this[_77a.g]() : this._get(name);
                    },
                    set: function (name, _77b) {
                        if (typeof name === "object") {
                            for (var x in name) {
                                this.set(x, name[x]);
                            }
                            return this;
                        }
                        var _77c = this._getAttrNames(name), _77d = this[_77c.s];
                        if (lang.isFunction(_77d)) {
                            var _77e = _77d.apply(this, Array.prototype.slice.call(arguments, 1));
                        } else {
                            var _77f = this.focusNode && !lang.isFunction(this.focusNode) ? "focusNode" : "domNode", tag = this[_77f] && this[_77f].tagName, _780 = tag && (_75d[tag] || (_75d[tag] = _75e(this[_77f]))), map = name in this.attributeMap ? this.attributeMap[name] : _77c.s in this ? this[_77c.s] : ((_780 && _77c.l in _780 && typeof _77b != "function") || /^aria-|^data-|^role$/.test(name)) ? _77f : null;
                            if (map != null) {
                                this._attrToDom(name, _77b, map);
                            }
                            this._set(name, _77b);
                        }
                        return _77e || this;
                    },
                    _attrPairNames: {},
                    _getAttrNames: function (name) {
                        var apn = this._attrPairNames;
                        if (apn[name]) {
                            return apn[name];
                        }
                        var uc = name.replace(/^[a-z]|-[a-zA-Z]/g, function (c) {
                            return c.charAt(c.length - 1).toUpperCase();
                        });
                        return (apn[name] = {
                            n: name + "Node",
                            s: "_set" + uc + "Attr",
                            g: "_get" + uc + "Attr",
                            l: uc.toLowerCase()
                        });
                    },
                    _set: function (name, _781) {
                        var _782 = this[name];
                        this[name] = _781;
                        if (this._created && !_760(_782, _781)) {
                            if (this._watchCallbacks) {
                                this._watchCallbacks(name, _782, _781);
                            }
                            this.emit("attrmodified-" + name, {detail: {prevValue: _782, newValue: _781}});
                        }
                    },
                    _get: function (name) {
                        return this[name];
                    },
                    emit: function (type, _783, _784) {
                        _783 = _783 || {};
                        if (_783.bubbles === undefined) {
                            _783.bubbles = true;
                        }
                        if (_783.cancelable === undefined) {
                            _783.cancelable = true;
                        }
                        if (!_783.detail) {
                            _783.detail = {};
                        }
                        _783.detail.widget = this;
                        var ret, _785 = this["on" + type];
                        if (_785) {
                            ret = _785.apply(this, _784 ? _784 : [_783]);
                        }
                        if (this._started && !this._beingDestroyed) {
                            on.emit(this.domNode, type.toLowerCase(), _783);
                        }
                        return ret;
                    },
                    on: function (type, func) {
                        var _786 = this._onMap(type);
                        if (_786) {
                            return _74c.after(this, _786, func, true);
                        }
                        return this.own(on(this.domNode, type, func))[0];
                    },
                    _onMap: function (type) {
                        var ctor = this.constructor, map = ctor._onMap;
                        if (!map) {
                            map = (ctor._onMap = {});
                            for (var attr in ctor.prototype) {
                                if (/^on/.test(attr)) {
                                    map[attr.replace(/^on/, "").toLowerCase()] = attr;
                                }
                            }
                        }
                        return map[typeof type == "string" && type.toLowerCase()];
                    },
                    toString: function () {
                        return "[Widget " + this.declaredClass + ", " + (this.id || "NO ID") + "]";
                    },
                    getChildren: function () {
                        return this.containerNode ? _75b.findWidgets(this.containerNode) : [];
                    },
                    getParent: function () {
                        return _75b.getEnclosingWidget(this.domNode.parentNode);
                    },
                    connect: function (obj, _787, _788) {
                        return this.own(_74e.connect(obj, _787, this, _788))[0];
                    },
                    disconnect: function (_789) {
                        _789.remove();
                    },
                    subscribe: function (t, _78a) {
                        return this.own(_758.subscribe(t, lang.hitch(this, _78a)))[0];
                    },
                    unsubscribe: function (_78b) {
                        _78b.remove();
                    },
                    isLeftToRight: function () {
                        return this.dir ? (this.dir.toLowerCase() == "ltr") : _753.isBodyLtr(this.ownerDocument);
                    },
                    isFocusable: function () {
                        return this.focus && (_754.get(this.domNode, "display") != "none");
                    },
                    placeAt: function (_78c, _78d) {
                        var _78e = !_78c.tagName && _75b.byId(_78c);
                        if (_78e && _78e.addChild && (!_78d || typeof _78d === "number")) {
                            _78e.addChild(this, _78d);
                        } else {
                            var ref = _78e && ("domNode" in _78e) ? (_78e.containerNode && !/after|before|replace/.test(_78d || "") ? _78e.containerNode : _78e.domNode) : dom.byId(_78c, this.ownerDocument);
                            _752.place(this.domNode, ref, _78d);
                            if (!this._started && (this.getParent() || {})._started) {
                                this.startup();
                            }
                        }
                        return this;
                    },
                    defer: function (fcn, _78f) {
                        var _790 = setTimeout(lang.hitch(this, function () {
                            if (!_790) {
                                return;
                            }
                            _790 = null;
                            if (!this._destroyed) {
                                lang.hitch(this, fcn)();
                            }
                        }), _78f || 0);
                        return {
                            remove: function () {
                                if (_790) {
                                    clearTimeout(_790);
                                    _790 = null;
                                }
                                return null;
                            }
                        };
                    }
                });
                if (has("dojo-bidi")) {
                    _761.extend(_75a);
                }
                return _761;
            });
        }
    }
});
(function () {
    var _791 = this.require;
    _791({cache: {}});
    !_791.async && _791(["dojo"]);
    _791.boot && _791.apply(null, _791.boot);
})();