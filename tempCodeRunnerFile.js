function SecureOTP(tag, action) {
    SecureOTP_oid = tag.challenge.oid;
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