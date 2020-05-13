function optionChanged() {
    d3.csv("office_expert_scoreboard.csv").then(function(importedData) {
        
    var dropdownMenu = d3.select("#selDataset");
    
    var selection = dropdownMenu.property("value");

    selectionArr = ['korbinn_nelson', 'brandon_day', 'dale_helling', 'thomas_corcoran', 'abigail_johnson']

    for (var i = 0; i < selectionArr.length; i++) {
        if (selection === selectionArr[i]) {
            var filteredData = importedData.filter(d => d.office_expert === selectionArr[i])
        }
    }
    console.log(filteredData[0])
    
    dates = []
    minutes = []
    rings = []
    collections = []

    dates2 = []
    minutes2 = []
    rings2 = []
    collections2 = []


    filteredData.forEach(function(data) {
        data.date = new Date(data.date)
        data.minutes_on_phone = +data.minutes_on_phone;
        data.rings_to_pickup = +data.rings_to_pickup;
        data.collection_rate = +data.collection_rate;

        dates.push(data.date);
        minutes.push(data.minutes_on_phone);
        rings.push(data.rings_to_pickup);
        collections.push(data.collection_rate);
    });

    var lastMonth = filteredData.slice(-30)

    lastMonth.forEach(function(data) {
        data.date = new Date(data.date)
        data.minutes_on_phone = +data.minutes_on_phone;
        data.rings_to_pickup = +data.rings_to_pickup;
        data.collection_rate = +data.collection_rate;

        dates2.push(data.date);
        minutes2.push(data.minutes_on_phone);
        rings2.push(data.rings_to_pickup);
        collections2.push(data.collection_rate);
    });

    function mean(arr) {
        var total = 0;
        for (var i = 0; i < arr.length; i++) {
            total += arr[i];
        }
        meanValue = total / arr.length;
        return meanValue.toFixed(1);
    }

    function count(arr) {
        var counter = 0;
        for (var i =0; i < arr.length; i++) {
            counter += arr[i];
        }
        return counter
    }

    var target = d3.select("#sample-metadata")
    target.html("")
    target.append("p").html(`Avg Minutes on Phone per Day: <b>${mean(minutes)}</b>`);
    target.append("p").html(`Avg Rings to Pickup: <b>${mean(rings)}</b>`)
    target.append("p").html(`Avg Monthly Collection Rate: <b>${mean(collections)}%</b>`)
    // target.append("p").html(`Avg Time Spent on Qs: <b>${mean(qTime2)} minutes</b>`);
    // target.append("p").html(`Avg Time Spent on Reservices: <b>${mean(rsTime2)} minutes</b>`);
    // target.append("p").html(`Avg Time Spent on Starts: <b>${mean(startTime2)} minutes</b>`);
    // target.append("p").html(`Avg number of Qs per Day: <b>${mean(qCount2)}</b>`);
    // target.append("p").html(`Avg number of Reservices per Day: <b>${mean(rsCount2)}</b>`);
    // target.append("p").html(`Avg number of Starts per Day: <b>${mean(startCount2)}</b>`);
    // target.append("p").html(`Avg amount of Taurus Used per Q: <b>${mean(taurus)} gallons</b>`);
    // target.append("p").html(`Avg amount of Intice used per Q: <b>${mean(intice)}</b>`);
    // target.append("p").html(`Avg amount of Demand G used per Q: <b>${mean(demandG)}</b>`);

    monthArr = [0, 30, 61, 91, 122, 153, 183, 214, 244]
    datesArr = []
    collectionRateArr = []
    minutesArr = []
    
    function getDates(data) {
        for (var i = 0; i < monthArr.length; i++) {
            var firstOfMonth = data[monthArr[i]]
            datesArr.push(firstOfMonth.date);
            collectionRateArr.push(firstOfMonth.collection_rate);
            minutesArr.push(firstOfMonth.minutes_on_phone);
        }
    }

    getDates(filteredData)
    
    var traceA1 = {
        x: datesArr,
        y: collectionRateArr,
        name: "Collection Rate (%)",
        type: "line"
    };
    var traceB1 = {
        x: datesArr,
        y: minutesArr,
        name: "Minutes on Phone per Day (Avg)",
        type: "line"
    };
    // var traceC1 = {
    //     x: datesArr,
    //     y: productivityArr,
    //     name: "Productivity Score",
    //     type: "line"
    // };
    var layout = {
        title: "Collection Rate (By Month)"
    };
    var plot1 = [traceB1, traceA1];
    Plotly.newPlot("plot1", plot1, layout);

    // var traceA2 = {
    //     x: dates2,
    //     y: qTime2,
    //     name: "Quarterlies",
    //     type: "line"
    // };
    // var traceB2 = {
    //     x: dates2,
    //     y: rsTime2,
    //     name: "Reservices",
    //     type: "line"
    // };
    // var traceC2 = {
    //     x: dates2,
    //     y: startTime2,
    //     name: "Starts",
    //     type: "line"
    // }
    // var layout = {
    //     title: "Avg Time Spent on Stops (Last 30 Days)"
    // };
    // var plot2 = [traceC2, traceB2, traceA2];
    // Plotly.newPlot("plot2", plot2, layout);

    // var trace3 = {
    //     values: [count(startCount2), count(rsCount2), count(qCount2)],
    //     labels: ["Starts", "Reservices", "Quarterlies"],
    //     type: "pie"
    // };
    // var layout = {
    //     title: "Breakdown of Completed Stops"
    // };
    // var plot3 = [trace3];
    // Plotly.newPlot("plot3", plot3, layout);
    
    // var traceA4 = {
    //     x: mean(taurus2),
    //     name: "Taurus",
    //     type: "bar",
    //     orientation: "h"
    // };
    // var layout = {
    //     title: "Breakdown of Product Usage"
    // };
    // var plot4 = [traceA4];
    // Plotly.newPlot("plot4", plot4, layout)

    });
}