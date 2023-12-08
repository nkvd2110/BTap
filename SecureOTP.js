var SecureOTP_oid = null;


function SecureOTP(tag, action) {
    SecureOTP_oid = tag.challenge.oid;

    if (tag.challenge.solved) {
        let promise = $.Deferred();
        return promise.resolve();
    }
    
    tag.challenge.seed = 0;
    console.log(tag.challenge);
    if (action === "tag.challenge.open") {
    } else if (action === "tag.challenge.submit-failed" || action === "tag.challenge.submit-complete") {
        if (action === "tag.challenge.submit-failed") {
            if (tag.challenge.hint) {
                tag.alertDanger(tag.challenge.hint, 1);  // No timeout so it stays around
                console.log(`%c[MySecureOTP][DEBUG]: TODO REMOVE THIS: Seed is: ${tag.challenge.seed}`, HackerChallenge.consoleFormat);
            }
        }

        SecureOTP_updateModal(tag);
        tag.challenge.remaining_time = 0;
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

}


function SecureOTP_refreshChallenge() {
    if (!SecureOTP_oid) {
        return;
    }
    var tag = $("#" + SecureOTP_oid)[0]._tag;
    HackerChallenge.getChallenge("secure_otp").then(function(data) {
        tag.challenge = data.hc_challenge;
        tag.update();
        SecureOTP_updateModal(tag);
        HackerChallenge.startTimer(tag.challenge.remaining_time, $("#" + tag.challenge.oid + "-timer")).then(SecureOTP_restartTimer);
    });
}
