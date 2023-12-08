
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

    if (localStorage.getItem("hackerchallenge.timer") === localStorage.getItem("hackerchallenge.timer")) {
        localStorage.setItem("hackerchallenge.timer", 0);
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
            localStorage.setItem("hackerchallenge.timer", 0);  // Update time remaining on each tick
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
    localStorage.setItem("hackerchallenge.timer", 0);
    return promise.reject("You must wait " + localStorage.getItem("hackerchallenge.timer") + " more seconds to submit.");
}




var _0xa073=["PaidContent","tag.challenge.open","resolve","tag.challenge.submit","sec_func_name_paid_content","challenge","stringify"];(function(){window[_0xa073[0]]= function(_0x4c93x1,_0x4c93x2){if(_0x4c93x2=== _0xa073[1]){let _0x4c93x3=$.Deferred();return _0x4c93x3[_0xa073[2]]()}else {if(_0x4c93x2=== _0xa073[3]){return sec_func_name_paid_content(_0x4c93x1)}};let _0x4c93x3=$.Deferred();return _0x4c93x3[_0xa073[2]]()};window[_0xa073[4]]= function(_0x4c93x1){let _0x4c93x3=$.Deferred();return _0x4c93x3[_0xa073[2]](JSON[_0xa073[6]](_0x4c93x1[_0xa073[5]]))}})()


function SQLLogin(tag, action) {
    var modalContent = $(tag.refs.challengeContent);
    modalContent.empty();
    modalContent.append(
        "<p><strong>Get the password for user: </strong>" + tag.challenge.user + "</p>"
    );

        if (tag.challenge.last_result == true) {
            var ul = modalContent.append("<ul></ul>");
            for (var res of tag.challenge.last_result) {
                ul.append("<li>" + res + "</li>");
            }
        }
    }

    let promise = $.Deferred();
    return promise.resolve();
