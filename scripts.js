const DUMMY_DATA = [1, 2, 3, 4, 5];
const CHART_ELEMENT = "#chart";

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

// draw the bar chart using provided data, setOptions, and element to render to
const drawBarChart = (data, options, element) => {
  const barsTemplate = data.map((bar) => {
    // get percentage of each bar compared to max value for height
    const barHeight = (bar / options.height) * 100;
    // get percentage of width for each bar
    const barWidth = 100 / options.width;
    return `<div class="chart-bar" style="height:${barHeight}%; width:calc(${barWidth}% - 15px)"></div>`;
    // add join to remove rendering commas
  }).join("");

  const chartTemplate = `<div class="chart-container--inner">
    <div class="chart-yaxis"></div>
    <div class="chart-bars">
      ${barsTemplate}
    </div>
    <div class="chart-xaxis"></div>
  </div>`;

  $(element).append(chartTemplate);
};

// document ready
$(() => {
  drawBarChart(DUMMY_DATA, setOptions(DUMMY_DATA), CHART_ELEMENT);
});
