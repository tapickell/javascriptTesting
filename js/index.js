/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        document.getElementById("start_button").onclick = onStartButtonPress;
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

var total_time = 0;
var pom_time = 25;
var break_time = 5;
var start_time;


function onStartButtonPress() {
    start_timer();
}

function start_timer() {
    //disable button or set to pause here
    start_time = Date.now();
    comsole.log("START_TIME: " + start_time.getTime());
    //need way to start break when pom is done
    timer(pom_time);
    timer(break_time);
}

function timer(stage_time) {
    var current_time = Date.now();

    total_time += current_time.getTime() - start_time.getTime();
    start_time.getTime() = current_time.getTime();

    var time_to_display = (total_time / 1000) + start_time.getTime();
    updateLabel(time_to_display);

    console.log("TOTAL_TIME: " + total_time);

    if ((total_time / 1000) >= stage_time) {
        stopTimer();
        return;
    };
}

function updateLabel(time_to_display) {
    var my_label = document.getElementById("label");
    my_label.innerHTML = "<h1>" + time_to_display + "</h1>";
}

function stopTimer() {
    total_time = 0;
}