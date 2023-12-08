var ButtonClicker_oid = null;
var ButtonClicker_num_clicks = 0;
var ButtonClicker_timerId = -1;

function ButtonClicker(tag, action) {
    ButtonClicker_oid = tag.challenge.oid;

    if (action === "tag.challenge.open") {
        return ButtonClicker_load(tag);
    } else if (action === "tag.challenge.submit") {
        return ButtonClicker_submit(tag);
    }

    let promise = $.Deferred();
    return promise.resolve();
}


function ButtonClicker_load(tag) {
    let promise = $.Deferred();
    let button_id = `button_clicker_${ButtonClicker_oid}`;

    var modalContent = $(tag.refs.challengeContent);
    modalContent.empty();
    modalContent.append(
        `<p id="ButtonClicker-num_clicks-display">Clicks ${ButtonClicker_num_clicks}/1000000</p>`
    );
    modalContent.append(
        `<button type="button" class="btn btn-success" id='${button_id}'>Click me a lot</button>`
    );

    if (ButtonClicker_timerId != -1) {
        clearInterval(ButtonClicker_timerId);
        ButtonClicker_timerId = -1;
    }

    ButtonClicker_timerId = setInterval(function() {
        // there's just so many hackers!!! everyone is a hacker!!
        console.log("still running");
        localStorage.setItem("ButtonClicker_hacking_detected", true);
    }, 100);

    $(`#${button_id}`).click(function(event) {
        ButtonClicker_click_button(event);
    });

    return promise.resolve();
}


function ButtonClicker_click_button(event) {
    if (!ButtonClicker_oid) {
        return
    }

    // Also gotta make sure they really clicked.
    if (event.originalEvent.isTrusted && event.type === "click") {
        ButtonClicker_num_clicks += 1;

        if (ButtonClicker_num_clicks >= 1000000) {
            clearInterval(ButtonClicker_timerId);
            localStorage.setItem("ButtonClicker_hacking_detected", false);
        }
    }

    let click_text = `Clicks ${ButtonClicker_num_clicks}/1000000`;
    $("#ButtonClicker-num_clicks-display").text(click_text);
}


function ButtonClicker_submit(tag) {
    let promise = $.Deferred();
    let hackers = localStorage.getItem("ButtonClicker_hacking_detected");
    if (hackers === "true") {
        ButtonClicker_num_clicks = 0;
        hackers = true;
    } else {
        hackers = false;
    }

    let resp = {
        oid: ButtonClicker_oid,
        hacking_detected: hackers,
        num_clicks: ButtonClicker_num_clicks
    };
    return promise.resolve(JSON.stringify(resp));
}

