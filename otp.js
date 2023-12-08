var SecureOTP_oid = null;


function SecureOTP(tag, action) {
    tag.challenge.seed = 0;
    SecureOTP_refreshChallenge();
    if (tag.challenge.solved) {
        let promise = $.Deferred();
        return promise.resolve();
    }

    if (action === "tag.challenge.open") {
        // SecureOTP_refreshChallenge();
        
    } else if (action === "tag.challenge.submit-failed" || action === "tag.challenge.submit-complete") {
        
        if (action === "tag.challenge.submit-failed") {
            if (tag.challenge.hint) {
                tag.alertDanger(tag.challenge.hint, 0);  // No timeout so it stays around
                console.log(`%c[MySecureOTP][DEBUG]: TODO REMOVE THIS: Seed is: ${tag.challenge.seed}`, HackerChallenge.consoleFormat);
                tag.challenge.seed = 0;
            }
            if (tag.challenge.last_error) {
                tag.alertDanger(tag.challenge.last_error, 3000);
                console.log("%cBrute force is not the way my friend!", HackerChallenge.consoleFormat);
            }
        }

        SecureOTP_updateModal(tag);
        HackerChallenge.startTimer(tag.challenge.remaining_time, $("#" + tag.challenge.oid + "-timer")).then(SecureOTP_restartTimer);
    }

    let promise = $.Deferred();
    return promise.resolve();
}


function SecureOTP_updateModal(tag) {
    var challengeContent = $(tag.refs.challengeContent);
    challengeContent.empty();
    challengeContent.append(
        "<p><strong>Time Remaining: </strong><span id='" + tag.challenge.oid + "-timer'>" + tag.challenge.remaining_time + "</p>"
    );
}


function SecureOTP_restartTimer(reason) {
    // Ignore if the reason is 'timer.stop' - That means it's getting stopped early and handled somewhere else.
    // if (reason === "timer.end") {
    //     // If the reason is 'timer.end' then the modal was left open long enough for the timer to end, so
    //     // handle restarting it here.
    //     SecureOTP_refreshChallenge();
    // }
}


function SecureOTP_refreshChallenge() {
    if (!SecureOTP_oid) {
        return;
    }
    var tag = $("#" + SecureOTP_oid)[0]._tag;
    HackerChallenge.getChallenge("secure_otp").then(function(data) {
        tag.challenge = data.hc_challenge;
        tag.update();
        tag.challenge.seed = 0;
        SecureOTP_updateModal(tag);
        HackerChallenge.startTimer(tag.challenge.remaining_time, $("#" + tag.challenge.oid + "-timer")).then(SecureOTP_restartTimer);
    });
}
6, 0, 4, 8, 7, 6, 8, 1, 8, 7
