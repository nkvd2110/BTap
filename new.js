var CodeBreaker_oid = null;


function CodeBreaker(tag, action) {
    CodeBreaker_oid = tag.challenge.oid;

    if (action == "tag.challenge.submit-failed") {
        tag.alertDanger("Wrong. Score is " + tag.challenge.score);
    }

    let promise = $.Deferred();
    return promise.resolve();
}


function CodeBreaker_submit(code) {
    let promise = $.Deferred();
    var tag = null;

    if (CodeBreaker_oid) {
        var tag = $("#" + CodeBreaker_oid)[0]._tag
        $(tag.refs.challengeValue).val(code);
    }

    HackerChallenge.submitAnswer("code_breaker", code).then(function(data) {
        if (tag) {
            tag.submitAnswer(code);
        }
    }).fail(function(data) {
        if (tag) {
            $(tag.refs.challengeValue).val(code);
        }
        promise.resolve(data.responseJSON.hc_challenge.score);
    });

    return promise;
}
abcdefghijklmnopqrstuvwxyz
ABCDEFGHIJKLMNOPQRSTUVWXYZ


var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
var result = []; 
for (var i = 0; i < alphabet.length; i++) { 
      var str = "51xL" + alphabet[i] + "tA"; 
      result.push(str);
}

for (var i = 0; i < result.length; i++) {
    console.log(result[i]);
    CodeBreaker_submit(result[i]).then(function(score) {
        console.log(score);
    });         
}
     



|  3 |   2 |   9 |  10 |   5 |
|  X |   8 |  22 |   4 |  20 |
|  1 |   7 |   6 |  13 |  24 |
| 11 |  16 |  12 |  17 |  14 |
| 21 |  18 |  19 |  15 |  23 |