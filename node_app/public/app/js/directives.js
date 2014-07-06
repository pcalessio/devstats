'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
  directive('graphs', function(Socket) {
  	return {
  		template: "<div id='viz'></div>",
  		link: function(scope, element, attr) {

  			var n = 243,
          duration = 120,
          now = new Date(Date.now() - duration),
          count = 0,
          data = d3.range(n).map(function() { return 0; });

        var margin = {top: 6, right: 0, bottom: 20, left: 40},
  		    width = 550 - margin.right,
  		    height = 120 - margin.top - margin.bottom;

  			var x = d3.time.scale()
  			    .domain([now - (n - 2) * duration, now - duration])
  			    .range([0, width]);

  			var y = d3.scale.linear()
  			    .range([height, 0]);

  			var line = d3.svg.line()
  			    .interpolate("basis")
  			    .x(function(d, i) { return x(now - (n - 1 - i) * duration); })
  			    .y(function(d, i) { return y(d); });

  			var svg = d3.select("#viz").append("p").append("svg")
  			    .attr("width", width + margin.left + margin.right)
  			    .attr("height", height + margin.top + margin.bottom)
  			    .style("margin-left", -margin.left + "px")
  			  .append("g")
  			    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  			svg.append("defs").append("clipPath")
  			    .attr("id", "clip")
  			  .append("rect")
  			    .attr("width", width)
  			    .attr("height", height);

  			var axis = svg.append("g")
  			    .attr("class", "x axis")
  			    .attr("transform", "translate(0," + height + ")")
  			    .call(x.axis = d3.svg.axis().scale(x).orient("bottom"));

  			var path = svg.append("g")
  			    .attr("clip-path", "url(#clip)")
  			  .append("path")
  			    .data([data])
  			    .attr("class", "line");

  			tick();

	      var socket = io.connect(config.localhost);
	      socket.on('newKeyEvent', function (data) {
	          ++count;
	      });

  			function tick() {
  			  // update the domains
  			  now = new Date();
  			  x.domain([now - (n - 2) * duration, now - duration]);
  			  y.domain([0, d3.max(data)]);

  			  // push the accumulated count onto the back, and reset the count
  			  data.push(Math.min(30, count));
  			  count = 0;

  			  // redraw the line
  			  svg.select(".line")
  			      .attr("d", line)
  			      .attr("transform", null);

  			  // slide the x-axis left
  			  axis.transition()
  			      .duration(duration)
  			      .ease("linear")
  			      .call(x.axis);

  			  // slide the line left
  			  path.transition()
  			      .duration(duration)
  			      .ease("linear")
  			      .attr("transform", "translate(" + x(now - (n - 1) * duration) + ")")
  			      .each("end", tickTimeout);

  			  // pop the old data point off the front
  			  data.shift();

  			}

  			var yes = 0;

  			function tickTimeout() {
  			  tick();
  			}
			}
  	}
  }).
  directive('speed', function(Socket) {
    return {
      template: "<div id='g1'></div>",
      link: function(scope, element, attr) {

        var n = 243,
          duration = 120,
          now = new Date(Date.now() - duration),
          count = 0;

        var g1 = new JustGage({
          id: "g1",
          value: 0,
          min: 0,
          max: 6,
          title: "Lone Ranger",
          label: "miles traveled"
        });

        setInterval(function() {
          tick();
          g1.refresh(2*count);
        }, 200);


        var margin = {top: 6, right: 0, bottom: 20, left: 40},
          width = 550 - margin.right,
          height = 120 - margin.top - margin.bottom;

        tick();

        var socket = io.connect(config.localhost);
        socket.on('newKeyEvent', function (data) {
            ++count;
            g1.refresh(2*count);
        });

        function tick() {
          // update the domains
          now = new Date();
          // push the accumulated count onto the back, and reset the count
          count = 0;
        }

        var yes = 0;

        function tickTimeout() {
          tick();
        }

      }
    }
  })
