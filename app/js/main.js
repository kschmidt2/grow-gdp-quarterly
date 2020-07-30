// adds social class to get social chart
// let element = document.getElementsByClassName("chart-area");
// for(var i = 0; i < element.length; i++)
// {
//     element[i].className += " social";
// }


Highcharts.setOptions({
    lang: {
      thousandsSep: ','
    }
});

let chartIdGDPQuarterly = document.getElementById("chart-container-gdp-quarterly");

// checks for the chart ID and displays a backup image if the browser can't find it
setTimeout(function() {
    if(chartIdGDPQuarterly.innerHTML === "") {
        // console.log('noId');
        let chartAreaGDPQuarterly = document.getElementsByClassName("chart-area-gdp-quarterly");
        for(var i = 0; i < chartArea.length; i++) {
            chartArea[i].style.display = "none";
        } 
        // insert chart screenshot here
        document.getElementById("chart-fallback").innerHTML += '<img src="https://fm-static.cnbc.com/awsmedia/chart/2019/10/08/chart-error_wide.1570569331252.png" style="width: 100%;max-width:660px">';
    } else {
        // console.log('yesId')
    }
},500);

function drawHighcharts() {
    Highcharts.chart(chartIdGDPQuarterly, {
        chart: {
            type: 'column',
            styledMode: true,
            spacingBottom: 25,
            spacingRight: 100,
            spacingLeft: 0,
            spacingTop: 20
        }, 
        title: {
            text: null
        },
        data: {
            googleSpreadsheetKey: '1EY_-S-brWEy16L4LvDP7_Y8JNaq2XahWj2dUV7FIgjc',
            googleSpreadsheetWorksheet: 1
        },
        // for bar charts only
        plotOptions: {
            series: {
                groupPadding: 0.1
            } 
        },
        // for line charts only
        // plotOptions: {
        //     series: {
        //         lineWidth: 1,
        //         // clip: false,
        //         marker: {
        //             enabled: false,
        //             symbol: 'circle',
        //             fillColor: '#ffffff',
        //             states: {
        //                 hover: {
        //                     fillColor: '#ffffff'
        //                 }
        //             }
        //         }
        //     }
        // },
        legend: {
            enabled: false
        },
        xAxis: {
            labels: {
                style: {
                    whiteSpace: 'nowrap'
                },
                formatter: function () {
                    var s = "";
                    if (Highcharts.dateFormat('%b', this.value) == 'Jan') {
                        s = s + "Q4"
                    };
                    if (Highcharts.dateFormat('%b', this.value) == 'Apr') {
                        s = s + "Q1"
                    };
                    if (Highcharts.dateFormat('%b', this.value) == 'Jul') {
                        s = s + "Q2"
                    };
                    if (Highcharts.dateFormat('%b', this.value) == 'Oct') {
                        s = s + "Q3"
                    };
                    if (Highcharts.dateFormat('%b', this.value) == 'Jan') {
                        s = s + " '" + (Highcharts.dateFormat('%y', this.value)-1);
                    } else {
                        s = s + " '" + Highcharts.dateFormat('%y', this.value);
                    };
                    
                    return s;
                }
            },
            tickLength: 5,
            type: 'datetime',
            // edits xAxis ticks
            // dateTimeLabelFormats: {
            //     week: '%b. %e',
            // },
            // tickInterval: 24 * 3600 * 1000 * 7
        },
        yAxis: {
            title: false,
            labels: {
                useHTML: true,
                overflow: 'allow'
            },
            tickAmount: 6
            // adds commas to thousands
            // formatter: function () {
            //     return Highcharts.numberFormat(this.value,0,'.',',');
            // },
        },
        credits: {
            enabled: false
        },
        tooltip: {
            shadow: false,
            padding: 10,
            formatter: function () {
                return "GDP change: <b>" + this.y + '%</b>'
            }
        },
        responsive: {
            rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                chart: {
                spacingRight: 10
                },
                legend: {
                    align: 'left',
                    x: -18
                },
                tooltip: {
                    enabled: false
                }
            }
            }]
        }
    })
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    drawHighcharts();
} else {
    document.addEventListener("DOMContentLoaded", drawHighcharts);
}