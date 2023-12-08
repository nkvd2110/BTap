
function Timer(tag, action) {
    if (action === "tag.challenge.open") {
        return Timer_load(tag);
    } else if (action === "tag.challenge.submit") {
        return Timer_submit(tag);
    }

    let promise = $.Deferred();
    return promise.resolve();
}


function Timer_load(tag) {
    let promise = $.Deferred();

    localStorage.setItem("hackerchallenge.timer.resp", tag.challenge.resp);

    if (localStorage.getItem("hackerchallenge.timer") === null) {
        localStorage.setItem("hackerchallenge.timer", 3155760);
    }

    var modalContent = $(tag.refs.challengeContent);
    modalContent.empty();
    modalContent.append(
        "<p><strong>Time Remaining: </strong><span id='" + tag.challenge.oid + "-timer'>" + localStorage.getItem("hackerchallenge.timer") + "</span></p>"
    );

    HackerChallenge.startTimer(
        localStorage.getItem("hackerchallenge.timer"),
        $("#" + tag.challenge.oid + "-timer"),
        tick_cb=function(seconds) {
            localStorage.setItem("hackerchallenge.timer", seconds);  // Update time remaining on each tick
        }
    );

    return promise.resolve();
}

function Timer_submit(tag) {
    if (localStorage.getItem("hackerchallenge.timer") === undefined) {
        return Timer_load(tag);
    }

    let promise = $.Deferred();
    if (parseInt(localStorage.getItem("hackerchallenge.timer")) === 0) {
        return promise.resolve(localStorage.getItem("hackerchallenge.timer.resp"));
    }

    return promise.reject("You must wait " + localStorage.getItem("hackerchallenge.timer") + " more seconds to submit.");
}
