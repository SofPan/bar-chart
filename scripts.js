const DUMMY_DATA = [1, 2, 3, 4, 5];
const CHART_ELEMENT = "#chart";
const $title = $("#title");
const $yaxis = $("#yaxis");
const $xaxis = $("#xaxis");
// chart width and height are dependent on the data being passed in
const setOptions = (data) => {
  let width = data.length;
  let height = data.sort((a, b) => {
    return b > a;
  });
  height = height[height.length - 1];
  return {
    width: width,
    height: height,
  };
};

$("#submit").on("click", (e) => {
  e.preventDefault();
  $(CHART_ELEMENT).empty();
  const data = $("#data").val().split(",");
  drawBarChart(data, setOptions(data), CHART_ELEMENT);
  if ($title.val().length > 0) {
    $("#chart-title").text($title.val());
  }
  if ($yaxis.val().length > 0) {
    $("#y-title").text($yaxis.val());
  }
  if ($xaxis.val().length > 0) {
    $("#x-title").text($xaxis.val());
  }
});
// draw the bar chart using provided data, setOptions, and element to render to
const drawBarChart = (data, options, element) => {
  // template to add correct number of bars and their values
  const barsTemplate = data
    .map((bar) => {
      // get percentage of each bar compared to max value for height
      const barHeight = (bar / options.height) * 100;
      // get percentage of width for each bar
      const barWidth = 100 / options.width;
      return `<div class="chart-bar mid" style="height:${barHeight}%; width:calc(${barWidth}% - 15px)"><span class="chart-bar--value">${bar}</span></div>`;
      // add join to remove rendering commas
    })
    .join("");
  const yVals = [];
  const markerSpacing = options.height / data.length;
  for (let i = 0; i <= options.height; i = i + markerSpacing) {
    yVals.push(i);
  }
  // chart template to bring all the elements together
  const chartTemplate = `<div class="chart-container--inner">
  <div class="y-axis">
  <span id="y-title" class="chart-yaxis--title">y-axis</span>
    <div class="chart-yaxis">
      ${yVals
        .map((y) => {
          return `<span>${y}</span>`;
        })
        .join("")}
    </div>
    </div>
    <div class="chart-bars">
      ${barsTemplate}
    </div>
    <div class="x-axis">
    <span id="x-title" class="chart-xaxis--title">x-axis</span>
    <div class="chart-xaxis">
      ${data
        .map((x) => {
          return `<span>${x}</span>`;
        })
        .join("")}
    </div>
    </div>
  </div>`;

  // add the chart to the specified DOM element
  $(element).append(chartTemplate);
};

// document ready
$(() => {
  // drawBarChart(data, setOptions(data), CHART_ELEMENT);
});
