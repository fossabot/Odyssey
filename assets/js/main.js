/*
	Original Base from Read Only by html5up.net | @n33co, released under CCA 3.0
	Major modifications by Tim DuBois. Any content not falling under CCA 3.0 is released under the MIT license.
*/

(function($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 1024px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});

	var photos = [],
	   asc = true,
		 prop = "date";
	! function() {
	  m = d3.behavior.zoom();
	  function t(t, n, e) {
	      var a = t.translate(),
	          o = Math.atan2(n[1] - a[1], n[0] - a[0]) - Math.atan2(e[1] - a[1], e[0] - a[0]);
	      return [Math.cos(o / 2), 0, 0, Math.sin(o / 2)]
	  }

	  function n(t, n) {
	      var e = t.invert(n);
	      return e && isFinite(e[0]) && isFinite(e[1]) && i(e)
	  }

	  function e(t) {
	      var n = .5 * t[0] * d,
	          e = .5 * t[1] * d,
	          a = .5 * t[2] * d,
	          o = Math.sin(n),
	          r = Math.cos(n),
	          c = Math.sin(e),
	          i = Math.cos(e),
	          s = Math.sin(a),
	          l = Math.cos(a);
	      return [r * i * l + o * c * s, o * i * l - r * c * s, r * c * l + o * i * s, r * i * s - o * c * l]
	  }

	  function a(t, n) {
	      var e = t[0],
	          a = t[1],
	          o = t[2],
	          r = t[3],
	          c = n[0],
	          i = n[1],
	          s = n[2],
	          l = n[3];
	      return [e * c - a * i - o * s - r * l, e * i + a * c + o * l - r * s, e * s - a * l + o * c + r * i, e * l + a * s - o * i + r * c]
	  }

	    function o(t, n) {
	        if (t && n) {
	            var e = l(t, n),
	                a = Math.sqrt(s(e, e)),
	                o = .5 * Math.acos(Math.max(-1, Math.min(1, s(t, n)))),
	                r = Math.sin(o) / a;
	            return a && [Math.cos(o), e[2] * r, -e[1] * r, e[0] * r]
	        }
	    }

	    function r(t, n) {
	        var e = Math.max(-1, Math.min(1, s(t, n))),
	            a = 0 > e ? -1 : 1,
	            o = Math.acos(a * e),
	            r = Math.sin(o);
	        return r ? function(e) {
	            var c = a * Math.sin((1 - e) * o) / r,
	                i = Math.sin(e * o) / r;
	            return [t[0] * c + n[0] * i, t[1] * c + n[1] * i, t[2] * c + n[2] * i, t[3] * c + n[3] * i]
	        } : function() {
	            return t
	        }
	    }

	    function c(t) {
	        return [Math.atan2(2 * (t[0] * t[1] + t[2] * t[3]), 1 - 2 * (t[1] * t[1] + t[2] * t[2])) * h, Math.asin(Math.max(-1, Math.min(1, 2 * (t[0] * t[2] - t[3] * t[1])))) * h, Math.atan2(2 * (t[0] * t[3] + t[1] * t[2]), 1 - 2 * (t[2] * t[2] + t[3] * t[3])) * h]
	    }

	    function i(t) {
	        var n = t[0] * d,
	            e = t[1] * d,
	            a = Math.cos(e);
	        return [a * Math.cos(n), a * Math.sin(n), Math.sin(e)]
	    }

	    function s(t, n) {
	        for (var e = 0, a = t.length, o = 0; a > e; ++e) o += t[e] * n[e];
	        return o
	    }

	    function l(t, n) {
	        return [t[1] * n[2] - t[2] * n[1], t[2] * n[0] - t[0] * n[2], t[0] * n[1] - t[1] * n[0]]
	    }

	    function u(t) {
	        for (var n = 0, e = arguments.length, a = []; ++n < e;) a.push(arguments[n]);
	        var o = d3.dispatch.apply(null, a);
	        return o.of = function(n, e) {
	            return function(a) {
	                try {
	                    var r = a.sourceEvent = d3.event;
	                    a.target = t, d3.event = a, o[a.type].apply(n, e)
	                } finally {
	                    d3.event = r
	                }
	            }
	        }, o
	    }
	    var d = Math.PI / 180,
	        h = 180 / Math.PI;
	    d3.geo.zoom = function() {
	        function s(t) { v++ || t({ type: "zoomstart" }) }
	        function l(t) { t({ type: "zoom" }) }
	        function d(t) { --v || t({ type: "zoomend" }) }
	        var h, f, p, v = 0,
	            g = u(m, "zoomstart", "zoom", "zoomend");
	            m.on("zoomstart", function() {
	                var r = d3.mouse(this),
	                    i = e(h.rotate()),
	                    u = n(h, r);
	                u && (p = u), M.call(m, "zoom", function() {
	                    h.scale(z.k = d3.event.scale);
	                    var e = d3.mouse(this),
	                        s = o(p, n(h, e));
	                    h.rotate(z.r = c(i = s ? a(i, s) : a(t(h, r, e), i))), r = e, l(g.of(this, arguments))
	                }), s(g.of(this, arguments))
	            }).on("zoomend", function() {
	                M.call(m, "zoom", null), d(g.of(this, arguments))
	            }),
	            M = m.on,
	            z = {
	                r: [0, 0, 0],
	                k: 1
	            };
	        return m.rotateTo = function(t) {
	            var n = o(i(t), i([-z.r[0], -z.r[1]]));
	            return c(a(e(z.r), n))
	        }, m.projection = function(t) {
	            return arguments.length ? (h = t, z = {
	                r: h.rotate(),
	                k: h.scale()
	            }, m.scale(z.k)) : h
	        }, m.duration = function(t) {
	            return arguments.length ? (f = t, m) : f
	        }, m.event = function(t) {
	            t.each(function() {
	                var t = d3.select(this),
	                    n = g.of(this, arguments),
	                    a = z,
	                    o = d3.transition(t);
	                if (o !== t) {
	                    o.each("start.zoom", function() {
	                        this.__chart__ && (z = this.__chart__), h.rotate(z.r).scale(z.k), s(n)
	                    }).tween("zoom:zoom", function() {
	                        var t = m.size()[0],
	                            i = r(e(z.r), e(a.r)),
	                            s = d3.geo.distance(z.r, a.r),
	                            u = d3.interpolateZoom([0, 0, t / z.k], [s, 0, t / a.k]);
	                        return f && o.duration(f(.001 * u.duration)),
	                            function(e) {
	                                var a = u(e);
	                                this.__chart__ = z = {
	                                    r: c(i(a[0] / s)),
	                                    k: t / a[2]
	                                }, h.rotate(z.r).scale(z.k), m.scale(z.k), l(n)
	                            }
	                    }).each("end.zoom", function() {
	                        d(n)
	                    });
	                    try {
	                        o.each("interrupt.zoom", function() {
	                            d(n)
	                        })
	                    } catch (i) {}
	                } else this.__chart__ = z, s(n), l(n), d(n)
	            })
	        }, d3.rebind(m, g, "on")
	    }
	}(),
	function() {
	  function t(t, n, e) {
	      var a = n.projection();
	      t.append("path").datum(d3.geo.graticule()).attr("class", "graticule").attr("d", n),
	      t.append("path").datum({type: "Sphere"}).attr("class", "foreground").attr("d", n).on("mousedown.grab", function() {
	          var n;
	          e && (n = t.insert("path", ".foreground").datum({type: "Point", coordinates: a.invert(d3.mouse(this))}).attr("class", "point").attr("d", o));
	          var o = d3.select(this).classed("zooming", !0),
	              r = d3.select(window).on("mouseup.grab", function() {
	                o.classed("zooming", !1), r.on("mouseup.grab", null), e && n.remove()
	              })
	      })
	  }
	  function n(t, n) {
	       return d3.geo.orthographic().precision(.5).clipAngle(90).clipExtent([ [-1, -1], [t + 1, n + 1] ]).translate([t / 2, n / 2]).scale(t / 2 - 10)
	   }

	   function sphereRotate() {
	    var x0, y0, cy0, sy0, kx0, ky0,
	        x1, y1, cy1, sy1, kx1, ky1,
	        d,
	        k;

	    function interpolate(t) {
	      var B = Math.sin(t *= d) * k,
	          A = Math.sin(d - t) * k,
	          x = A * kx0 + B * kx1,
	          y = A * ky0 + B * ky1,
	          z = A * sy0 + B * sy1;
	      return [ Math.atan2(y, x) / d3_radians, Math.atan2(z, Math.sqrt(x * x + y * y)) / d3_radians ];
	    }

	    interpolate.distance = function() {
	      if (d == null) k = 1 / Math.sin(d = Math.acos(Math.max(-1, Math.min(1, sy0 * sy1 + cy0 * cy1 * Math.cos(x1 - x0)))));
	      return d;
	    };

	    interpolate.source = function(_) {
	      var cx0 = Math.cos(x0 = _[0] * d3_radians),
	          sx0 = Math.sin(x0);
	      cy0 = Math.cos(y0 = _[1] * d3_radians);
	      sy0 = Math.sin(y0);
	      kx0 = cy0 * cx0;
	      ky0 = cy0 * sx0;
	      d = null;
	      return interpolate;
	    };

	    interpolate.target = function(_) {
	      var cx1 = Math.cos(x1 = _[0] * d3_radians),
	          sx1 = Math.sin(x1);
	      cy1 = Math.cos(y1 = _[1] * d3_radians);
	      sy1 = Math.sin(y1);
	      kx1 = cy1 * cx1;
	      ky1 = cy1 * sx1;
	      d = null;
	      return interpolate;
	    };

	    return interpolate;
	  }
	   function getRotation(coords) {
	     var lat = 0,
	         long = 0;
	     for (var i = 0, len = coords.length; i < len; i++) {
	       lat += coords[i][0];
	       long += coords[i][1];
	     };
	     lat /= coords.length;
	     long /= coords.length;
	     return [-lat,-long];
	   }
	    var a = 400,
	        o = 400,
	        tripName = "A15",
	        proj = n(a, o),
	        r = d3.dispatch("world"),
	        c = -1,
	        d3_radians = Math.PI / 180;

	    d3.selectAll("#map").data([proj]).append("svg").attr("preserveAspectRatio", "xMinYMin meet").attr("viewBox","0 0 " + a + " " + o).each(function(p) {
	        var e = d3.geo.path().projection(p),
	            a = d3.select(this).call(t, e, !0);
	        a.selectAll(".foreground").call(d3.geo.zoom().projection(p).scaleExtent([.7 * p.scale(), 10 * p.scale()]).on("zoom.redraw", function() {
	            d3.event.sourceEvent.preventDefault && d3.event.sourceEvent.preventDefault(),
	            a.selectAll("path").attr("d", e)
	        })),
	        r.on("world." + ++c, function() {
	            a.selectAll("path").attr("d", e)
	        })
	    }),

	    $("#sub").on("click",function(){
	        var coords = [],
	            selected = $("#Trips").val(),
	            interp = sphereRotate();
	       if (selected !== tripName) {
	           d3.selectAll(".route").each( function(d, i){
	              if(d.properties.name == selected){
	                d3.select(this).attr("visibility", "visible");
	                coords = getRotation(d.geometry.coordinates);
	              } else {
	                d3.select(this).attr("visibility", "hidden");
	              }
	          });

						$("#gallery").empty();
						$("#gallery").chromatic(photos.filter(function (el) {
									return el.trip == selected;
						}));
						
	          d3.transition().delay(250).duration(2250)
	              .tween("rotate", function() {
	                interp.source(proj.rotate()).target(coords).distance();
	                var sc = d3.interpolate(proj.scale(), a / 2 - 10);
	                return function(i) {
	                     proj.rotate(interp(i)).scale(sc(i));
	                     m.scale(sc(i));//update the zoom in the zoom behavior this will sop the jumping effect
	                     d3.select("#map").selectAll("path").attr("d", d3.geo.path().projection(proj));
	                   };
	              });
	          tripName = selected;
	      }
	    }),

	    d3.json("assets/data/world.json", function(t, n) {
	        d3.selectAll("svg").insert("path", ".graticule").datum({type: "Sphere"}).attr("class", "ocean"),
	        d3.selectAll("svg").insert("path", ".foreground").datum(topojson.feature(n, n.objects.countries)).attr("class", "countries"),
	        d3.selectAll("svg").insert("path", ".foreground").datum(topojson.feature(n, n.objects.cities)).attr("class", "cities").selectAll("LineString").attr("class", "route"),
	        d3.selectAll("svg").insert("g", ".cities").attr("id", "routes"),
	        d3.selectAll("#routes").selectAll("path").data(topojson.feature(n, n.objects.trips).features).enter()
	              .append("path").attr("id", function(d) { return d.properties.name; }).attr("class", "route")
	              .attr("visibility", function(d) {
	                if (d.properties.name == tripName) {
	                  proj.rotate(getRotation(d.geometry.coordinates));
	                  return "visible";
	                } else {
	                  return "hidden";
	                }
	              }),
	        r.world()
	    })
	}();

	$(function() {

		var $body = $('body'),
			$header = $('#header'),
			$nav = $('#nav'), $nav_a = $nav.find('a'),
			$wrapper = $('#wrapper');

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Header.
			var ids = [];

			// Set up nav items.
				$nav_a
					.scrolly({ offset: 44 })
					.on('click', function(event) {

						var $this = $(this),
							href = $this.attr('href');

						// Not an internal link? Bail.
							if (href.charAt(0) != '#')
								return;

						// Prevent default behavior.
							event.preventDefault();

						// Remove active class from all links and mark them as locked (so scrollzer leaves them alone).
							$nav_a
								.removeClass('active')
								.addClass('scrollzer-locked');

						// Set active class on this link.
							$this.addClass('active');

					})
					.each(function() {

						var $this = $(this),
							href = $this.attr('href'),
							id;

						// Not an internal link? Bail.
							if (href.charAt(0) != '#')
								return;

						// Add to scrollzer ID list.
							id = href.substring(1);
							$this.attr('id', id + '-link');
							ids.push(id);

					});

			// Initialize scrollzer.
				$.scrollzer(ids, { pad: 300, lastHack: true });

		// Off-Canvas Navigation.

			// Title Bar.
				$(
					'<div id="titleBar">' +
						'<a href="#header" class="toggle"></a>' +
						'<span class="title">' + $('#logo').html() + '</span>' +
					'</div>'
				)
					.appendTo($body);

			// Header.
				$('#header')
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'right',
						target: $body,
						visibleClass: 'header-visible'
					});

			// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#titleBar, #header, #wrapper')
						.css('transition', 'none');

			//  Gallery
				var sortfn = function(a,b) {
					if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
					else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
				}

				$.getJSON('assets/data/manifest.json', function(p) {
							photos = p.sort(sortfn);
							$("#gallery").chromatic(photos);
				});

				$("#inv").on("click",function(){
						asc = !asc;
						$("#gallery").empty();
						$("#gallery").chromatic(photos.sort(sortfn));

				});
	});

})(jQuery);
